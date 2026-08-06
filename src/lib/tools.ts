import { unstable_cache } from "next/cache";
import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import type { Category } from "@/lib/blog-format";

export type { Category } from "@/lib/blog-format";

export type ToolCardDTO = {
  id: string;
  title: string;
  description: string;
  icon: string;
  coverImageUrl?: string;
  externalUrl: string;
  featured: boolean;
  pricing?: "FREE" | "FREEMIUM" | "PAID";
  publishedAt: string;
  category: { name: string; slug: string };
};

type ConvexToolMeta = {
  _id: string;
  title: string;
  description: string;
  coverImageUrl: string | null;
  externalUrl: string;
  category: string;
  icon: string;
  featured: boolean;
  pricing?: "FREE" | "FREEMIUM" | "PAID";
  publishedAt: number;
  status: "DRAFT" | "PUBLISHED";
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toCardDTO(doc: ConvexToolMeta): ToolCardDTO {
  return {
    id: doc._id,
    title: doc.title,
    description: doc.description,
    icon: doc.icon,
    coverImageUrl: doc.coverImageUrl ?? undefined,
    externalUrl: doc.externalUrl,
    featured: doc.featured,
    pricing: doc.pricing,
    publishedAt: new Date(doc.publishedAt).toISOString(),
    category: { name: doc.category, slug: slugify(doc.category) },
  };
}

// Metadata-only cache, mirrors strategies/posts. Tagged for on-demand
// invalidation from the admin Server Actions on publish/edit. No per-item
// tag/cache — Tools has no detail route to invalidate independently.
const loadPublishedTools = unstable_cache(
  async (): Promise<ConvexToolMeta[]> => fetchQuery(api.tools.listPublished, {}),
  ["tools-list"],
  { tags: ["tools-list"], revalidate: 3600 }
);

interface GetToolsParams {
  categorySlug?: string;
  q?: string;
}

export async function getTools({ categorySlug, q }: GetToolsParams = {}): Promise<ToolCardDTO[]> {
  const searchWords = q ? q.trim().toLowerCase().split(/\s+/).filter(Boolean) : [];
  const all = await loadPublishedTools();

  const filtered = all.filter((tool) => {
    if (categorySlug && slugify(tool.category) !== categorySlug) return false;
    if (searchWords.length > 0) {
      const haystack = `${tool.title} ${tool.description}`.toLowerCase();
      if (!searchWords.some((word) => haystack.includes(word))) return false;
    }
    return true;
  });

  return filtered.map(toCardDTO);
}

export async function getToolCategories(): Promise<Category[]> {
  const all = await loadPublishedTools();
  const bySlug = new Map<string, Category>();
  for (const tool of all) {
    const slug = slugify(tool.category);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, { id: slug, name: tool.category, slug });
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getFeaturedTool(): Promise<ToolCardDTO | null> {
  const all = await loadPublishedTools();
  const featured = all.find((t) => t.featured);
  return featured ? toCardDTO(featured) : null;
}
