import type { MutationCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";

export const DOC_MIME_TYPES: Record<string, "PDF" | "DOCX"> = {
  "application/pdf": "PDF",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "DOCX",
};
export const IMAGE_MIME_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

export const MAX_DOC_BYTES = 20 * 1024 * 1024; // 20MB
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

// The authoritative check — client-side mime/size checks are UX only.
// Deletes the blob and throws if it fails validation, so a rejected upload
// never lingers as an orphan.
async function getValidatedMetadata(ctx: MutationCtx, storageId: Id<"_storage">) {
  const metadata = await ctx.db.system.get("_storage", storageId);
  if (metadata === null) {
    throw new Error("Uploaded file not found.");
  }
  return metadata;
}

export async function validateDocUpload(ctx: MutationCtx, storageId: Id<"_storage">) {
  const metadata = await getValidatedMetadata(ctx, storageId);
  const fileType = metadata.contentType ? DOC_MIME_TYPES[metadata.contentType] : undefined;
  if (!fileType || metadata.size > MAX_DOC_BYTES) {
    await ctx.storage.delete(storageId);
    throw new Error("File must be a PDF or DOCX under 20MB.");
  }
  return { fileType, fileSize: metadata.size };
}

export async function validateImageUpload(ctx: MutationCtx, storageId: Id<"_storage">) {
  const metadata = await getValidatedMetadata(ctx, storageId);
  if (!metadata.contentType || !IMAGE_MIME_TYPES.has(metadata.contentType) || metadata.size > MAX_IMAGE_BYTES) {
    await ctx.storage.delete(storageId);
    throw new Error("Image must be PNG, JPEG, or WEBP under 5MB.");
  }
}
