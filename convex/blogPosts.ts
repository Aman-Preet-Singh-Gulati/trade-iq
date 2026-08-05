import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { requireAdmin } from "./lib/authGuard";
import { validateImageUpload } from "./lib/fileValidation";
import type { QueryCtx, MutationCtx } from "./_generated/server";
import type { Doc } from "./_generated/dataModel";

const coverImageValidator = v.union(
  v.object({ kind: v.literal("external"), url: v.string() }),
  v.object({ kind: v.literal("storage"), storageId: v.id("_storage") })
);

const statusValidator = v.union(v.literal("DRAFT"), v.literal("PUBLISHED"));

async function resolveCoverImageUrl(
  ctx: QueryCtx | MutationCtx,
  coverImage: Doc<"blogPosts">["coverImage"]
): Promise<string | null> {
  if (coverImage.kind === "external") return coverImage.url;
  return await ctx.storage.getUrl(coverImage.storageId);
}

const metaShape = {
  _id: v.id("blogPosts"),
  slug: v.string(),
  title: v.string(),
  category: v.string(),
  excerpt: v.string(),
  coverImageUrl: v.string(),
  readTimeMinutes: v.number(),
  publishedAt: v.number(),
  featured: v.boolean(),
  status: statusValidator,
  readCount: v.number(),
};

async function toMeta(ctx: QueryCtx | MutationCtx, doc: Doc<"blogPosts">) {
  return {
    _id: doc._id,
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    excerpt: doc.excerpt,
    coverImageUrl: (await resolveCoverImageUrl(ctx, doc.coverImage)) ?? "",
    readTimeMinutes: doc.readTimeMinutes,
    publishedAt: doc.publishedAt,
    featured: doc.featured,
    status: doc.status,
    readCount: doc.readCount,
  };
}

// ---- Public queries (no auth) — metadata only ----

export const listPublished = query({
  args: {},
  returns: v.array(v.object(metaShape)),
  handler: async (ctx) => {
    const docs = await ctx.db
      .query("blogPosts")
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
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (!doc || doc.status !== "PUBLISHED") return null;
    const meta = await toMeta(ctx, doc);
    return { ...meta, content: doc.content };
  },
});

export const incrementReadCount = mutation({
  args: { slug: v.string() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const doc = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (doc && doc.status === "PUBLISHED") {
      await ctx.db.patch("blogPosts", doc._id, { readCount: doc.readCount + 1 });
    }
    return null;
  },
});

// ---- Admin queries (auth required) — includes the raw coverImage (not just
// the resolved URL) so the edit form can implement "keep existing image
// unless replaced." ----

const adminMetaShape = { ...metaShape, coverImage: coverImageValidator };

async function toAdminMeta(ctx: QueryCtx | MutationCtx, doc: Doc<"blogPosts">) {
  const meta = await toMeta(ctx, doc);
  return { ...meta, coverImage: doc.coverImage };
}

export const listAll = query({
  args: {},
  returns: v.array(v.object(adminMetaShape)),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const docs = await ctx.db.query("blogPosts").order("desc").take(500);
    return Promise.all(docs.map((doc) => toAdminMeta(ctx, doc)));
  },
});

export const getById = query({
  args: { id: v.id("blogPosts") },
  returns: v.union(v.object({ ...adminMetaShape, content: v.string() }), v.null()),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const doc = await ctx.db.get("blogPosts", args.id);
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
  excerpt: v.string(),
  content: v.string(),
  coverImage: coverImageValidator,
  readTimeMinutes: v.number(),
  publishedAt: v.number(),
  featured: v.boolean(),
  status: statusValidator,
};

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const create = mutation({
  args: writableFields,
  returns: v.id("blogPosts"),
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx);
    if (!slugRegex.test(args.slug)) {
      throw new Error("Slug must be lowercase kebab-case.");
    }
    const existing = await ctx.db
      .query("blogPosts")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .unique();
    if (existing) throw new Error(`Slug "${args.slug}" is already in use.`);

    if (args.coverImage.kind === "storage") {
      await validateImageUpload(ctx, args.coverImage.storageId);
    }

    return await ctx.db.insert("blogPosts", {
      slug: args.slug,
      title: args.title,
      category: args.category,
      excerpt: args.excerpt,
      content: args.content,
      coverImage: args.coverImage,
      readTimeMinutes: args.readTimeMinutes,
      publishedAt: args.publishedAt,
      featured: args.featured,
      status: args.status,
      readCount: 0,
      createdBy: userId,
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: { id: v.id("blogPosts"), ...writableFields },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get("blogPosts", args.id);
    if (!existing) throw new Error("Blog post not found.");
    if (!slugRegex.test(args.slug)) {
      throw new Error("Slug must be lowercase kebab-case.");
    }
    if (args.slug !== existing.slug) {
      const slugTaken = await ctx.db
        .query("blogPosts")
        .withIndex("by_slug", (q) => q.eq("slug", args.slug))
        .unique();
      if (slugTaken) throw new Error(`Slug "${args.slug}" is already in use.`);
    }

    const nextStorageId = args.coverImage.kind === "storage" ? args.coverImage.storageId : undefined;
    const prevStorageId = existing.coverImage.kind === "storage" ? existing.coverImage.storageId : undefined;
    if (nextStorageId && nextStorageId !== prevStorageId) {
      await validateImageUpload(ctx, nextStorageId);
    }
    if (prevStorageId && prevStorageId !== nextStorageId) {
      await ctx.storage.delete(prevStorageId); // orphan cleanup
    }

    await ctx.db.patch("blogPosts", args.id, {
      slug: args.slug,
      title: args.title,
      category: args.category,
      excerpt: args.excerpt,
      content: args.content,
      coverImage: args.coverImage,
      readTimeMinutes: args.readTimeMinutes,
      publishedAt: args.publishedAt,
      featured: args.featured,
      status: args.status,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("blogPosts") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get("blogPosts", args.id);
    if (!existing) return null;
    if (existing.coverImage.kind === "storage") {
      await ctx.storage.delete(existing.coverImage.storageId);
    }
    await ctx.db.delete("blogPosts", args.id);
    return null;
  },
});
