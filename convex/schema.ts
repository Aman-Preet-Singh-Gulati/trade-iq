import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const coverImage = v.union(
  v.object({ kind: v.literal("external"), url: v.string() }),
  v.object({ kind: v.literal("storage"), storageId: v.id("_storage") })
);

export default defineSchema({
  ...authTables,

  strategies: defineTable({
    slug: v.string(),
    title: v.string(),
    category: v.string(),
    icon: v.string(),
    coverImage: v.optional(coverImage),
    fileStorageId: v.id("_storage"),
    fileName: v.string(),
    fileType: v.union(v.literal("PDF"), v.literal("DOCX")),
    fileSize: v.number(),
    excerpt: v.string(),
    summary: v.string(),
    content: v.string(),
    publishedAt: v.number(),
    status: v.union(v.literal("DRAFT"), v.literal("PUBLISHED")),
    createdBy: v.id("users"),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status_and_publishedAt", ["status", "publishedAt"])
    .index("by_category_and_status", ["category", "status"]),

  blogPosts: defineTable({
    slug: v.string(),
    title: v.string(),
    category: v.string(),
    excerpt: v.string(),
    content: v.string(),
    coverImage: coverImage,
    readTimeMinutes: v.number(),
    publishedAt: v.number(),
    featured: v.boolean(),
    status: v.union(v.literal("DRAFT"), v.literal("PUBLISHED")),
    readCount: v.number(),
    createdBy: v.id("users"),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_status_and_publishedAt", ["status", "publishedAt"])
    .index("by_status_and_featured", ["status", "featured"])
    .index("by_category_and_status", ["category", "status"]),

  tools: defineTable({
    title: v.string(),
    description: v.string(),
    coverImage: v.optional(coverImage),
    externalUrl: v.string(),
    category: v.string(),
    icon: v.string(),
    featured: v.boolean(),
    pricing: v.optional(v.union(v.literal("FREE"), v.literal("FREEMIUM"), v.literal("PAID"))),
    publishedAt: v.number(),
    status: v.union(v.literal("DRAFT"), v.literal("PUBLISHED")),
    createdBy: v.id("users"),
    updatedAt: v.number(),
  })
    .index("by_status_and_publishedAt", ["status", "publishedAt"])
    .index("by_category_and_status", ["category", "status"]),
});
