import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import type { Category, PostCardDTO } from "@/lib/blog-format";

export type { Category, PostCardDTO } from "@/lib/blog-format";
export { formatReadCount, formatArticleDate } from "@/lib/blog-format";

export const DEFAULT_PAGE_SIZE = 4;
export const MAX_PAGE_SIZE = 24;

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  category: z.string().min(1),
  excerpt: z.string().min(1),
  coverImageUrl: z.string().url(),
  publishedAt: z.coerce.date(),
  readTimeMinutes: z.number().int().positive(),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
  readCount: z.number().int().nonnegative().default(0),
});

type FullPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  readTimeMinutes: number;
  publishedAt: Date;
  featured: boolean;
  status: "DRAFT" | "PUBLISHED";
  readCount: number;
  category: Category;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

let cachedPosts: FullPost[] | undefined;

function loadAllPosts(): FullPost[] {
  if (cachedPosts) return cachedPosts;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(raw);

    const parsed = frontmatterSchema.safeParse(data);
    if (!parsed.success) {
      throw new Error(
        `Invalid frontmatter in content/blog/${file}: ${parsed.error.issues
          .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
          .join(", ")}`
      );
    }

    const fm = parsed.data;
    const categorySlug = slugify(fm.category);

    return {
      id: fm.slug,
      slug: fm.slug,
      title: fm.title,
      excerpt: fm.excerpt,
      content: content.trim(),
      coverImageUrl: fm.coverImageUrl,
      readTimeMinutes: fm.readTimeMinutes,
      publishedAt: fm.publishedAt,
      featured: fm.featured,
      status: fm.status,
      readCount: fm.readCount,
      category: { id: categorySlug, name: fm.category, slug: categorySlug },
    } satisfies FullPost;
  });

  const slugs = new Set<string>();
  for (const post of posts) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate blog post slug: "${post.slug}"`);
    }
    slugs.add(post.slug);
  }

  posts.sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());

  cachedPosts = posts;
  return posts;
}

function toCardDTO(post: FullPost): PostCardDTO {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImageUrl: post.coverImageUrl,
    readTimeMinutes: post.readTimeMinutes,
    publishedAt: post.publishedAt.toISOString(),
    readCount: post.readCount,
    category: { name: post.category.name, slug: post.category.slug },
  };
}

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

  const searchWords = q
    ? q.trim().toLowerCase().split(/\s+/).filter(Boolean)
    : [];

  const filtered = loadAllPosts().filter((post) => {
    if (post.status !== "PUBLISHED") return false;
    if (categorySlug && post.category.slug !== categorySlug) return false;
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
  const post = loadAllPosts().find((p) => p.status === "PUBLISHED" && p.featured);
  return post ? toCardDTO(post) : null;
}

export async function getTrendingPosts(limit = 3): Promise<PostCardDTO[]> {
  const posts = loadAllPosts()
    .filter((p) => p.status === "PUBLISHED")
    .slice()
    .sort((a, b) => b.readCount - a.readCount)
    .slice(0, limit);
  return posts.map(toCardDTO);
}

export async function getCategories(): Promise<Category[]> {
  const bySlug = new Map<string, Category>();
  for (const post of loadAllPosts()) {
    if (!bySlug.has(post.category.slug)) {
      bySlug.set(post.category.slug, post.category);
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllPublishedSlugs(): Promise<string[]> {
  return loadAllPosts()
    .filter((p) => p.status === "PUBLISHED")
    .map((p) => p.slug);
}

export async function getPublishedPostBySlug(slug: string) {
  const post = loadAllPosts().find((p) => p.slug === slug);
  if (!post || post.status !== "PUBLISHED") {
    return null;
  }
  return post;
}
