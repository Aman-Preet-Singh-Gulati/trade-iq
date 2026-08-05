"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

export interface BlogPostFormInput {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: { kind: "external"; url: string } | { kind: "storage"; storageId: Id<"_storage"> };
  readTimeMinutes: number;
  publishedAt: number;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED";
}

export type ActionResult = { ok: true } | { ok: false; error: string };

function revalidateBlogPost(slug: string) {
  revalidateTag("blog-list", { expire: 0 });
  revalidateTag(`blog:${slug}`, { expire: 0 });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function createBlogPostAction(input: BlogPostFormInput): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.blogPosts.create, input, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to create post." };
  }
  revalidateBlogPost(input.slug);
  redirect("/admin/blog");
}

export async function updateBlogPostAction(
  id: Id<"blogPosts">,
  previousSlug: string,
  input: BlogPostFormInput
): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.blogPosts.update, { id, ...input }, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to update post." };
  }
  revalidateBlogPost(previousSlug);
  if (input.slug !== previousSlug) revalidateBlogPost(input.slug);
  redirect("/admin/blog");
}

export async function deleteBlogPostAction(id: Id<"blogPosts">, slug: string): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.blogPosts.remove, { id }, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete post." };
  }
  revalidateBlogPost(slug);
  return { ok: true };
}
