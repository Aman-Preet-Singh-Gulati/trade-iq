import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { cache } from "react";
import type { Category } from "@/lib/blog-format";

export type { Category } from "@/lib/blog-format";

const CONTENT_DIR = path.join(process.cwd(), "content", "strategies");
const FILES_DIR = path.join(process.cwd(), "public", "strategies");

const frontmatterSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  category: z.string().min(1),
  icon: z.string().min(1),
  coverImageUrl: z.string().min(1).optional(),
  fileName: z
    .string()
    .min(1)
    .regex(/\.(pdf|docx)$/i, "fileName must end in .pdf or .docx"),
  excerpt: z.string().min(1),
  summary: z.string().min(1),
  publishedAt: z.coerce.date(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

export type StrategyCardDTO = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  icon: string;
  coverImageUrl?: string;
  fileName: string;
  fileType: "PDF" | "DOCX";
  fileSizeLabel: string;
  publishedAt: string;
  category: { name: string; slug: string };
};

type StrategyMeta = StrategyCardDTO & {
  summary: string;
  status: "DRAFT" | "PUBLISHED";
};

type FullStrategy = StrategyMeta & {
  content: string;
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFileType(fileName: string): "PDF" | "DOCX" {
  const ext = path.extname(fileName).toLowerCase();
  if (ext === ".pdf") return "PDF";
  if (ext === ".docx") return "DOCX";
  throw new Error(`Unsupported strategy file extension: ${fileName}`);
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

function buildMeta(file: string, data: unknown): StrategyMeta {
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in content/strategies/${file}: ${parsed.error.issues
        .map((issue) => `${issue.path.join(".")} - ${issue.message}`)
        .join(", ")}`
    );
  }

  const fm = parsed.data;
  const filePath = path.join(FILES_DIR, fm.fileName);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `content/strategies/${file} references fileName "${fm.fileName}" but public/strategies/${fm.fileName} does not exist.`
    );
  }

  const categorySlug = slugify(fm.category);

  return {
    id: fm.slug,
    slug: fm.slug,
    title: fm.title,
    excerpt: fm.excerpt,
    summary: fm.summary,
    icon: fm.icon,
    coverImageUrl: fm.coverImageUrl,
    fileName: fm.fileName,
    fileType: getFileType(fm.fileName),
    fileSizeLabel: formatFileSize(fs.statSync(filePath).size),
    publishedAt: fm.publishedAt.toISOString(),
    category: { name: fm.category, slug: categorySlug },
    status: fm.status,
  } satisfies StrategyMeta;
}

// Metadata-only cache: powers the listing page, category filters, and
// generateStaticParams without ever reading a strategy's full markdown body.
let cachedMetaList: StrategyMeta[] | undefined;

function loadStrategyMetaList(): StrategyMeta[] {
  if (cachedMetaList) return cachedMetaList;

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".md"));

  const metas = files.map((file) => {
    const fullPath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf-8");
    const { data } = matter(raw);
    return buildMeta(file, data);
  });

  const slugs = new Set<string>();
  for (const meta of metas) {
    if (slugs.has(meta.slug)) {
      throw new Error(`Duplicate strategy slug: "${meta.slug}"`);
    }
    slugs.add(meta.slug);
  }

  metas.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  cachedMetaList = metas;
  return metas;
}

function toCardDTO(meta: StrategyMeta): StrategyCardDTO {
  return {
    id: meta.id,
    slug: meta.slug,
    title: meta.title,
    excerpt: meta.excerpt,
    icon: meta.icon,
    coverImageUrl: meta.coverImageUrl,
    fileName: meta.fileName,
    fileType: meta.fileType,
    fileSizeLabel: meta.fileSizeLabel,
    publishedAt: meta.publishedAt,
    category: meta.category,
  };
}

interface GetStrategiesParams {
  categorySlug?: string;
  q?: string;
}

export async function getStrategies({
  categorySlug,
  q,
}: GetStrategiesParams = {}): Promise<StrategyCardDTO[]> {
  const searchWords = q ? q.trim().toLowerCase().split(/\s+/).filter(Boolean) : [];

  const filtered = loadStrategyMetaList().filter((strategy) => {
    if (strategy.status !== "PUBLISHED") return false;
    if (categorySlug && strategy.category.slug !== categorySlug) return false;
    if (searchWords.length > 0) {
      const haystack = `${strategy.title} ${strategy.excerpt}`.toLowerCase();
      if (!searchWords.some((word) => haystack.includes(word))) return false;
    }
    return true;
  });

  return filtered.map(toCardDTO);
}

export async function getStrategyCategories(): Promise<Category[]> {
  const bySlug = new Map<string, Category>();
  for (const strategy of loadStrategyMetaList()) {
    if (strategy.status !== "PUBLISHED") continue;
    if (!bySlug.has(strategy.category.slug)) {
      bySlug.set(strategy.category.slug, { id: strategy.category.slug, ...strategy.category });
    }
  }
  return Array.from(bySlug.values()).sort((a, b) => a.name.localeCompare(b.name));
}

export async function getAllPublishedStrategySlugs(): Promise<string[]> {
  return loadStrategyMetaList()
    .filter((s) => s.status === "PUBLISHED")
    .map((s) => s.slug);
}

// Per-slug content cache: reading one strategy's full body never touches the
// other strategies' markdown files (no directory scan, no shared array).
const strategyContentCache = new Map<string, FullStrategy | null>();

function readStrategyFile(slug: string): FullStrategy | null {
  if (strategyContentCache.has(slug)) {
    return strategyContentCache.get(slug) ?? null;
  }

  const fullPath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    strategyContentCache.set(slug, null);
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = matter(raw);
  const meta = buildMeta(`${slug}.md`, data);

  if (meta.slug !== slug) {
    throw new Error(
      `content/strategies/${slug}.md frontmatter slug "${meta.slug}" does not match its file name.`
    );
  }

  const full: FullStrategy = { ...meta, content: content.trim() };
  strategyContentCache.set(slug, full);
  return full;
}

export const getStrategyBySlug = cache(async (slug: string): Promise<FullStrategy | null> => {
  const strategy = readStrategyFile(slug);
  if (!strategy || strategy.status !== "PUBLISHED") return null;
  return strategy;
});
