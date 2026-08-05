import { cache } from "react";
import { unstable_cache } from "next/cache";
import { fetchQuery } from "convex/nextjs";
import { fetchMutation } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import type { Category, PostCardDTO } from "@/lib/blog-format";

export type { Category, PostCardDTO } from "@/lib/blog-format";
export { formatReadCount, formatArticleDate } from "@/lib/blog-format";

export const DEFAULT_PAGE_SIZE = 4;
export const MAX_PAGE_SIZE = 24;

type ConvexPostMeta = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImageUrl: string;
  readTimeMinutes: number;
  publishedAt: number;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED";
  readCount: number;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCardDTO(doc: ConvexPostMeta): PostCardDTO {
  return {
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    coverImageUrl: doc.coverImageUrl,
    readTimeMinutes: doc.readTimeMinutes,
    publishedAt: new Date(doc.publishedAt).toISOString(),
    readCount: doc.readCount,
    category: { name: doc.category, slug: slugify(doc.category) },
  };
}

// Metadata-only cache, mirrors the strategies pattern. Tagged for on-demand
// invalidation from the admin Server Actions on publish/edit.
const loadPublishedPosts = unstable_cache(
  async (): Promise<ConvexPostMeta[]> => fetchQuery(api.blogPosts.listPublished, {}),
  ["blog-list"],
  { tags: ["blog-list"], revalidate: 3600 }
);

interface GetPostsPageParams {
  categorySlug?: string;
  q?: string;
  page?: number;
  limit?: number;
}

export async function getPublishedPostsPage({
  categorySlug,
  q,
  page = 1,
  limit = DEFAULT_PAGE_SIZE,
}: GetPostsPageParams): Promise<{ posts: PostCardDTO[]; hasMore: boolean }> {
  const clampedLimit = Math.min(Math.max(limit, 1), MAX_PAGE_SIZE);
  const clampedPage = Math.max(page, 1);

  const searchWords = q ? q.trim().toLowerCase().split(/\s+/).filter(Boolean) : [];

  const all = await loadPublishedPosts();
  const filtered = all.filter((post) => {
    if (categorySlug && slugify(post.category) !== categorySlug) return false;
    if (searchWords.length > 0) {
      const haystack = `${post.title} ${post.excerpt}`.toLowerCase();
      if (!searchWords.some((word) => haystack.includes(word))) return false;
    }
    return true;
  });

  const total = filtered.length;
  const start = (clampedPage - 1) * clampedLimit;
  const pageRows = filtered.slice(start, start + clampedLimit);
  const hasMore = clampedPage * clampedLimit < total;

  return { posts: pageRows.map(toCardDTO), hasMore };
}

export async function getFeaturedPost(): Promise<PostCardDTO | null> {
  const all = await loadPublishedPosts();
  const featured = all.find((p) => p.featured);
  return featured ? toCardDTO(featured) : null;
}

export async function getTrendingPosts(limit = 3): Promise<PostCardDTO[]> {
  const all = await loadPublishedPosts();
  const sorted = all.slice().sort((a, b) => b.readCount - a.readCount);
  return sorted.slice(0, limit).map(toCardDTO);
}

export async function getCategories(): Promise<Category[]> {
  // Published-only (unlike the old fs-based version, which included DRAFT
  // posts here too) — with real admin-created drafts now possible, leaking
  // draft-only category names into the public filter pills isn't desirable.
  const all = await loadPublishedPosts();
  const bySlug = new Map<string, Category>();
  for (const post of all) {
    const slug = slugify(post.category);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, { id: slug, name: post.category, slug });
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  const all = await loadPublishedPosts();
  return all.map((p) => p.slug);
}

// Per-slug content cache + per-request dedup, mirrors strategies.ts.
export const getPublishedPostBySlug = cache(async (slug: string) => {
  const loadBySlug = unstable_cache(
    async (s: string) => fetchQuery(api.blogPosts.getBySlug, { slug: s }),
    ["blog-post-by-slug", slug],
    { tags: [`blog:${slug}`], revalidate: 3600 }
  );
  const doc = await loadBySlug(slug);
  if (!doc) return null;
  return {
    ...toCardDTO(doc),
    content: doc.content,
    featured: doc.featured,
    status: doc.status,
  };
});

// Fire-and-forget: called from the blog detail page on render. Not part of
// the cached read path above (it's a write, and shouldn't affect caching).
export async function incrementPostReadCount(slug: string): Promise<void> {
  try {
    await fetchMutation(api.blogPosts.incrementReadCount, { slug });
  } catch {
    // Non-critical — a missed view-count increment shouldn't break the page.
  }
}
