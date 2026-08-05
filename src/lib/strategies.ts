import { cache } from "react";
import { unstable_cache } from "next/cache";
import { fetchQuery } from "convex/nextjs";
import { api } from "@convex/_generated/api";
import type { Category } from "@/lib/blog-format";

export type { Category } from "@/lib/blog-format";

export type StrategyCardDTO = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  icon: string;
  coverImageUrl?: string;
  fileUrl: string;
  fileName: string;
  fileType: "PDF" | "DOCX";
  fileSizeLabel: string;
  publishedAt: string;
  category: { name: string; slug: string };
};

type FullStrategy = StrategyCardDTO & {
  content: string;
  summary: string;
  status: "DRAFT" | "PUBLISHED";
};

type ConvexStrategyMeta = {
  slug: string;
  title: string;
  category: string;
  icon: string;
  coverImageUrl: string | null;
  fileUrl: string | null;
  fileName: string;
  fileType: "PDF" | "DOCX";
  fileSize: number;
  excerpt: string;
  summary: string;
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

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function toCardDTO(doc: ConvexStrategyMeta): StrategyCardDTO {
  return {
    id: doc.slug,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    icon: doc.icon,
    coverImageUrl: doc.coverImageUrl ?? undefined,
    fileUrl: doc.fileUrl ?? "",
    fileName: doc.fileName,
    fileType: doc.fileType,
    fileSizeLabel: formatFileSize(doc.fileSize),
    publishedAt: new Date(doc.publishedAt).toISOString(),
    category: { name: doc.category, slug: slugify(doc.category) },
  };
}

// Metadata-only cache: powers the listing page, category filters, and
// generateStaticParams without ever reading a strategy's full markdown body
// — mirrors the previous fs-based metadata/content split. Tagged for
// on-demand invalidation from the admin Server Actions on publish/edit.
const loadPublishedStrategies = unstable_cache(
  async (): Promise<ConvexStrategyMeta[]> => fetchQuery(api.strategies.listPublished, {}),
  ["strategies-list"],
  { tags: ["strategies-list"], revalidate: 3600 }
);

interface GetStrategiesParams {
  categorySlug?: string;
  q?: string;
}

export async function getStrategies({ categorySlug, q }: GetStrategiesParams = {}): Promise<StrategyCardDTO[]> {
  const searchWords = q ? q.trim().toLowerCase().split(/\s+/).filter(Boolean) : [];
  const all = await loadPublishedStrategies();

  const filtered = all.filter((strategy) => {
    if (categorySlug && slugify(strategy.category) !== categorySlug) return false;
    if (searchWords.length > 0) {
      const haystack = `${strategy.title} ${strategy.excerpt}`.toLowerCase();
      if (!searchWords.some((word) => haystack.includes(word))) return false;
    }
    return true;
  });

  return filtered.map(toCardDTO);
}

export async function getStrategyCategories(): Promise<Category[]> {
  const all = await loadPublishedStrategies();
  const bySlug = new Map<string, Category>();
  for (const strategy of all) {
    const slug = slugify(strategy.category);
    if (!bySlug.has(slug)) {
      bySlug.set(slug, { id: slug, name: strategy.category, slug });
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllPublishedStrategySlugs(): Promise<string[]> {
  const all = await loadPublishedStrategies();
  return all.map((s) => s.slug);
}

// Per-slug content cache: reading one strategy's full body never triggers a
// read of the other strategies. React's cache() also dedupes repeated calls
// (e.g. generateMetadata + the page component) within one request.
export const getStrategyBySlug = cache(async (slug: string): Promise<FullStrategy | null> => {
  const loadBySlug = unstable_cache(
    async (s: string) => fetchQuery(api.strategies.getBySlug, { slug: s }),
    ["strategy-by-slug", slug],
    { tags: [`strategy:${slug}`], revalidate: 3600 }
  );
  const doc = await loadBySlug(slug);
  if (!doc) return null;
  return {
    ...toCardDTO(doc),
    content: doc.content,
    summary: doc.summary,
    status: doc.status,
  };
});
