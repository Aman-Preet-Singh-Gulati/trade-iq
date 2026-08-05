import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireAdmin } from "./lib/authGuard";

// Shared by strategy downloads and cover images (both content types). The
// browser POSTs the file directly to the returned URL, then submits the
// resulting storageId — actual mime/size validation happens server-side,
// inside strategies.ts/blogPosts.ts, at the moment the storageId is attached
// to a document (see convex/lib/fileValidation.ts).
export const generateUploadUrl = mutation({
  args: {},
  returns: v.string(),
  handler: async (ctx) => {
    await requireAdmin(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

// Resolves a storageId to a fetchable URL right after upload. Needed for
// inline body images: unlike coverImage/fileStorageId (resolved server-side
// at read time once attached to a document), inline images are embedded
// directly into the markdown `content` string as ![alt](URL) by the rich
// editor, so the client needs a real URL immediately, not just a storageId.
export const getUrl = query({
  args: { storageId: v.id("_storage") },
  returns: v.union(v.string(), v.null()),
  handler: async (ctx, args) => {
    await requireAdmin(ctx);
    return await ctx.storage.getUrl(args.storageId);
  },
});
