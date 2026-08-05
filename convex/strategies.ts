import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./lib/authGuard";
import { validateDocUpload, validateImageUpload } from "./lib/fileValidation";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import type { Doc, Id } from "./_generated/dataModel";

const coverImageValidator = v.union(
  v.object({ kind: v.literal("external"), url: v.string() }),
  v.object({ kind: v.literal("storage"), storageId: v.id("_storage") })
);

const statusValidator = v.union(v.literal("DRAFT"), v.literal("PUBLISHED"));
const fileTypeValidator = v.union(v.literal("PDF"), v.literal("DOCX"));

// ---- Shared shaping helpers ----

async function resolveCoverImageUrl(
  ctx: QueryCtx | MutationCtx,
  coverImage: Doc<"strategies">["coverImage"]
): Promise<string | null> {
  if (!coverImage) return null;
  if (coverImage.kind === "external") return coverImage.url;
  return await ctx.storage.getUrl(coverImage.storageId);
}

const metaShape = {
  _id: v.id("strategies"),
  slug: v.string(),
  title: v.string(),
  category: v.string(),
  icon: v.string(),
  coverImageUrl: v.union(v.string(), v.null()),
  fileUrl: v.union(v.string(), v.null()),
  fileName: v.string(),
  fileType: fileTypeValidator,
  fileSize: v.number(),
  excerpt: v.string(),
  summary: v.string(),
  publishedAt: v.number(),
  status: statusValidator,
};

async function toMeta(ctx: QueryCtx | MutationCtx, doc: Doc<"strategies">) {
  return {
    _id: doc._id,
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    icon: doc.icon,
    coverImageUrl: await resolveCoverImageUrl(ctx, doc.coverImage),
    fileUrl: await ctx.storage.getUrl(doc.fileStorageId),
    fileName: doc.fileName,
    fileType: doc.fileType,
    fileSize: doc.fileSize,
    excerpt: doc.excerpt,
    summary: doc.summary,
    publishedAt: doc.publishedAt,
    status: doc.status,
  };
}

// ---- Public queries (no auth) — metadata only, mirrors the old
// metadata-only cache: never touches `content`. ----

export const listPublished = query({
  args: {},
  returns: v.array(v.object(metaShape)),
  handler: async (ctx) => {
    const docs = await ctx.db
      .query("strategies")
      .withIndex("by_status_and_publishedAt", (q) => q.eq("status", "PUBLISHED"))
      .order("desc")
      .take(500);
    return Promise.all(docs.map((doc) => toMeta(ctx, doc)));
  },
});

export const getBySlug = query({
  args: { slug: v.string() },
  returns: v.union(v.object({ ...metaShape, content: v.string() }), v.null()),
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("strategies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!doc || doc.status !== "PUBLISHED") return null;
    const meta = await toMeta(ctx, doc);
    return { ...meta, content: doc.content };
  },
});

// ---- Admin queries (auth required) — used by /admin/strategies.
// Includes the raw fileStorageId/coverImage (not just resolved URLs) so the
// edit form can implement "keep existing file unless replaced." Fine to
// expose here since these are opaque, non-secret handles and this query is
// already behind requireAdmin. ----

const adminMetaShape = {
  ...metaShape,
  fileStorageId: v.id("_storage"),
  coverImage: v.optional(coverImageValidator),
};

async function toAdminMeta(ctx: QueryCtx | MutationCtx, doc: Doc<"strategies">) {
  const meta = await toMeta(ctx, doc);
  return { ...meta, fileStorageId: doc.fileStorageId, coverImage: doc.coverImage };
}

export const listAll = query({
  args: {},
  returns: v.array(v.object(adminMetaShape)),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const docs = await ctx.db.query("strategies").order("desc").take(500);
    return Promise.all(docs.map((doc) => toAdminMeta(ctx, doc)));
  },
});

export const getById = query({
  args: { id: v.id("strategies") },
  returns: v.union(v.object({ ...adminMetaShape, content: v.string() }), v.null()),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const doc = await ctx.db.get("strategies", args.id);
    if (!doc) return null;
    const meta = await toAdminMeta(ctx, doc);
    return { ...meta, content: doc.content };
  },
});

// ---- Admin mutations ----

const writableFields = {
  slug: v.string(),
  title: v.string(),
  category: v.string(),
  icon: v.string(),
  coverImage: v.optional(coverImageValidator),
  fileStorageId: v.id("_storage"),
  fileName: v.string(),
  excerpt: v.string(),
  summary: v.string(),
  content: v.string(),
  publishedAt: v.number(),
  status: statusValidator,
};

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const create = mutation({
  args: writableFields,
  returns: v.id("strategies"),
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx);
    if (!slugRegex.test(args.slug)) {
      throw new Error("Slug must be lowercase kebab-case.");
    }
    const existing = await ctx.db
      .query("strategies")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) throw new Error(`Slug "${args.slug}" is already in use.`);

    const { fileType, fileSize } = await validateDocUpload(ctx, args.fileStorageId);
    if (args.coverImage?.kind === "storage") {
      await validateImageUpload(ctx, args.coverImage.storageId);
    }

    return await ctx.db.insert("strategies", {
      slug: args.slug,
      title: args.title,
      category: args.category,
      icon: args.icon,
      coverImage: args.coverImage,
      fileStorageId: args.fileStorageId,
      fileName: args.fileName,
      fileType,
      fileSize,
      excerpt: args.excerpt,
      summary: args.summary,
      content: args.content,
      publishedAt: args.publishedAt,
      status: args.status,
      createdBy: userId,
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: { id: v.id("strategies"), ...writableFields },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get("strategies", args.id);
    if (!existing) throw new Error("Strategy not found.");
    if (!slugRegex.test(args.slug)) {
      throw new Error("Slug must be lowercase kebab-case.");
    }
    if (args.slug !== existing.slug) {
      const slugTaken = await ctx.db
        .query("strategies")
        .withIndex("by_slug", (q) => q.eq("slug", args.slug))
        .unique();
      if (slugTaken) throw new Error(`Slug "${args.slug}" is already in use.`);
    }

    let fileType = existing.fileType;
    let fileSize = existing.fileSize;
    if (args.fileStorageId !== existing.fileStorageId) {
      const validated = await validateDocUpload(ctx, args.fileStorageId);
      fileType = validated.fileType;
      fileSize = validated.fileSize;
      await ctx.storage.delete(existing.fileStorageId); // orphan cleanup
    }

    if (args.coverImage?.kind === "storage" && args.coverImage.storageId !== (existing.coverImage?.kind === "storage" ? existing.coverImage.storageId : undefined)) {
      await validateImageUpload(ctx, args.coverImage.storageId);
    }
    if (existing.coverImage?.kind === "storage" && existing.coverImage.storageId !== (args.coverImage?.kind === "storage" ? args.coverImage.storageId : undefined)) {
      await ctx.storage.delete(existing.coverImage.storageId); // orphan cleanup
    }

    await ctx.db.patch("strategies", args.id, {
      slug: args.slug,
      title: args.title,
      category: args.category,
      icon: args.icon,
      coverImage: args.coverImage,
      fileStorageId: args.fileStorageId,
      fileName: args.fileName,
      fileType,
      fileSize,
      excerpt: args.excerpt,
      summary: args.summary,
      content: args.content,
      publishedAt: args.publishedAt,
      status: args.status,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("strategies") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get("strategies", args.id);
    if (!existing) return null;
    await ctx.storage.delete(existing.fileStorageId);
    if (existing.coverImage?.kind === "storage") {
      await ctx.storage.delete(existing.coverImage.storageId);
    }
    await ctx.db.delete("strategies", args.id);
    return null;
  },
});
