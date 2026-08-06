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
const pricingValidator = v.union(v.literal("FREE"), v.literal("FREEMIUM"), v.literal("PAID"));

// No slug/detail page for tools — cards link straight to `externalUrl`, so
// there's nothing to route to internally and no getBySlug is needed.

function isValidExternalUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

async function resolveCoverImageUrl(
  ctx: QueryCtx | MutationCtx,
  coverImage: Doc<"tools">["coverImage"]
): Promise<string | null> {
  if (!coverImage) return null;
  if (coverImage.kind === "external") return coverImage.url;
  return await ctx.storage.getUrl(coverImage.storageId);
}

const metaShape = {
  _id: v.id("tools"),
  title: v.string(),
  description: v.string(),
  coverImageUrl: v.union(v.string(), v.null()),
  externalUrl: v.string(),
  category: v.string(),
  icon: v.string(),
  featured: v.boolean(),
  pricing: v.optional(pricingValidator),
  publishedAt: v.number(),
  status: statusValidator,
};

async function toMeta(ctx: QueryCtx | MutationCtx, doc: Doc<"tools">) {
  return {
    _id: doc._id,
    title: doc.title,
    description: doc.description,
    coverImageUrl: await resolveCoverImageUrl(ctx, doc.coverImage),
    externalUrl: doc.externalUrl,
    category: doc.category,
    icon: doc.icon,
    featured: doc.featured,
    pricing: doc.pricing,
    publishedAt: doc.publishedAt,
    status: doc.status,
  };
}

// ---- Public queries (no auth) — metadata only ----

export const listPublished = query({
  args: {},
  returns: v.array(v.object(metaShape)),
  handler: async (ctx) => {
    const docs = await ctx.db
      .query("tools")
      .withIndex("by_status_and_publishedAt", (q) => q.eq("status", "PUBLISHED"))
      .order("desc")
      .take(500);
    return Promise.all(docs.map((doc) => toMeta(ctx, doc)));
  },
});

// ---- Admin queries (auth required) — used by /admin/tools. Includes the
// raw coverImage (not just the resolved URL) so the edit form can implement
// "keep existing image unless replaced." ----

const adminMetaShape = { ...metaShape, coverImage: v.optional(coverImageValidator) };

async function toAdminMeta(ctx: QueryCtx | MutationCtx, doc: Doc<"tools">) {
  const meta = await toMeta(ctx, doc);
  return { ...meta, coverImage: doc.coverImage };
}

export const listAll = query({
  args: {},
  returns: v.array(v.object(adminMetaShape)),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    const docs = await ctx.db.query("tools").order("desc").take(500);
    return Promise.all(docs.map((doc) => toAdminMeta(ctx, doc)));
  },
});

export const getById = query({
  args: { id: v.id("tools") },
  returns: v.union(v.object(adminMetaShape), v.null()),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const doc = await ctx.db.get("tools", args.id);
    if (!doc) return null;
    return toAdminMeta(ctx, doc);
  },
});

// ---- Admin mutations ----

const writableFields = {
  title: v.string(),
  description: v.string(),
  coverImage: v.optional(coverImageValidator),
  externalUrl: v.string(),
  category: v.string(),
  icon: v.string(),
  featured: v.boolean(),
  pricing: v.optional(pricingValidator),
  publishedAt: v.number(),
  status: statusValidator,
};

export const create = mutation({
  args: writableFields,
  returns: v.id("tools"),
  handler: async (ctx, args) => {
    const userId = await requireAdmin(ctx);
    if (!isValidExternalUrl(args.externalUrl)) {
      throw new Error("External URL must be a valid http(s) link.");
    }
    if (args.coverImage?.kind === "storage") {
      await validateImageUpload(ctx, args.coverImage.storageId);
    }

    return await ctx.db.insert("tools", {
      title: args.title,
      description: args.description,
      coverImage: args.coverImage,
      externalUrl: args.externalUrl,
      category: args.category,
      icon: args.icon,
      featured: args.featured,
      pricing: args.pricing,
      publishedAt: args.publishedAt,
      status: args.status,
      createdBy: userId,
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: { id: v.id("tools"), ...writableFields },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get("tools", args.id);
    if (!existing) throw new Error("Tool not found.");
    if (!isValidExternalUrl(args.externalUrl)) {
      throw new Error("External URL must be a valid http(s) link.");
    }

    const nextStorageId = args.coverImage?.kind === "storage" ? args.coverImage.storageId : undefined;
    const prevStorageId = existing.coverImage?.kind === "storage" ? existing.coverImage.storageId : undefined;
    if (nextStorageId && nextStorageId !== prevStorageId) {
      await validateImageUpload(ctx, nextStorageId);
    }
    if (prevStorageId && prevStorageId !== nextStorageId) {
      await ctx.storage.delete(prevStorageId); // orphan cleanup
    }

    await ctx.db.patch("tools", args.id, {
      title: args.title,
      description: args.description,
      coverImage: args.coverImage,
      externalUrl: args.externalUrl,
      category: args.category,
      icon: args.icon,
      featured: args.featured,
      pricing: args.pricing,
      publishedAt: args.publishedAt,
      status: args.status,
      updatedAt: Date.now(),
    });
    return null;
  },
});

export const remove = mutation({
  args: { id: v.id("tools") },
  returns: v.null(),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    const existing = await ctx.db.get("tools", args.id);
    if (!existing) return null;
    if (existing.coverImage?.kind === "storage") {
      await ctx.storage.delete(existing.coverImage.storageId);
    }
    await ctx.db.delete("tools", args.id);
    return null;
  },
});
