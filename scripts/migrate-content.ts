/**
 * One-time migration: content/strategies/*.md + content/blog/*.md (and their
 * public/strategies/*.{pdf,docx} downloads) -> Convex.
 *
 * Usage:
 *   npx tsx scripts/migrate-content.ts --dry-run
 *   MIGRATION_ADMIN_EMAIL=... MIGRATION_ADMIN_PASSWORD=... npx tsx scripts/migrate-content.ts
 *
 * Requires an admin account already seeded via `npx convex run seedAdmin:run`
 * — this script signs in as that admin (exactly like the admin UI would) and
 * calls the same public create mutations, so migrated content goes through
 * the identical validation path as anything created by hand later.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

const ROOT = path.resolve(__dirname, "..");

// .env.local isn't auto-loaded outside the Next.js process — load it here.
function loadEnvLocal() {
  const envPath = path.join(ROOT, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}
loadEnvLocal();

const DRY_RUN = process.argv.includes("--dry-run");
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
if (!CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not set (expected in .env.local).");
}

const STRATEGIES_CONTENT_DIR = path.join(ROOT, "content", "strategies");
const STRATEGIES_FILES_DIR = path.join(ROOT, "public", "strategies");
const BLOG_CONTENT_DIR = path.join(ROOT, "content", "blog");

// Duplicated (not imported) from src/lib/strategies.ts / posts.ts on purpose:
// this script is a one-time snapshot of the pre-Convex file format and
// shouldn't be coupled to those files, which get rewritten to read from
// Convex as part of this same migration.
const strategySchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  category: z.string().min(1),
  icon: z.string().min(1),
  coverImageUrl: z.string().min(1).optional(),
  fileName: z.string().min(1).regex(/\.(pdf|docx)$/i, "fileName must end in .pdf or .docx"),
  excerpt: z.string().min(1),
  summary: z.string().min(1),
  publishedAt: z.coerce.date(),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

const postSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be lowercase kebab-case"),
  category: z.string().min(1),
  excerpt: z.string().min(1),
  coverImageUrl: z.string().url(),
  publishedAt: z.coerce.date(),
  readTimeMinutes: z.number().int().positive(),
  featured: z.boolean().default(false),
  status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
});

function mimeForExt(fileName: string): string {
  switch (path.extname(fileName).toLowerCase()) {
    case ".pdf":
      return "application/pdf";
    case ".docx":
      return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    default:
      throw new Error(`Unsupported file type: ${fileName}`);
  }
}

async function uploadFile(client: ConvexHttpClient, filePath: string): Promise<Id<"_storage">> {
  const bytes = fs.readFileSync(filePath);
  const uploadUrl: string = await client.mutation(api.files.generateUploadUrl, {});
  const res = await fetch(uploadUrl, {
    method: "POST",
    headers: { "Content-Type": mimeForExt(filePath) },
    body: bytes,
  });
  if (!res.ok) {
    throw new Error(`Upload failed for ${filePath}: HTTP ${res.status}`);
  }
  const { storageId } = (await res.json()) as { storageId: Id<"_storage"> };
  return storageId;
}

async function migrateStrategies(client: ConvexHttpClient | null) {
  const files = fs.readdirSync(STRATEGIES_CONTENT_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(STRATEGIES_CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const fm = strategySchema.parse(data); // throws on invalid frontmatter — fail loud, don't guess

    const filePath = path.join(STRATEGIES_FILES_DIR, fm.fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`${file} references fileName "${fm.fileName}" but ${filePath} does not exist.`);
    }

    console.log(`${DRY_RUN ? "[dry-run] " : ""}strategy: ${fm.slug} — "${fm.title}"`);
    if (DRY_RUN || !client) continue;

    const fileStorageId = await uploadFile(client, filePath);
    await client.mutation(api.strategies.create, {
      slug: fm.slug,
      title: fm.title,
      category: fm.category,
      icon: fm.icon,
      coverImage: fm.coverImageUrl ? { kind: "external" as const, url: fm.coverImageUrl } : undefined,
      fileStorageId,
      fileName: fm.fileName,
      excerpt: fm.excerpt,
      summary: fm.summary,
      content: content.trim(),
      publishedAt: fm.publishedAt.getTime(),
      status: fm.status,
    });
    console.log(`  -> inserted`);
  }
}

async function migrateBlogPosts(client: ConvexHttpClient | null) {
  const files = fs.readdirSync(BLOG_CONTENT_DIR).filter((f) => f.endsWith(".md"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const fm = postSchema.parse(data);

    console.log(`${DRY_RUN ? "[dry-run] " : ""}blog post: ${fm.slug} — "${fm.title}"`);
    if (DRY_RUN || !client) continue;

    await client.mutation(api.blogPosts.create, {
      slug: fm.slug,
      title: fm.title,
      category: fm.category,
      excerpt: fm.excerpt,
      content: content.trim(),
      coverImage: { kind: "external" as const, url: fm.coverImageUrl },
      readTimeMinutes: fm.readTimeMinutes,
      publishedAt: fm.publishedAt.getTime(),
      featured: fm.featured,
      status: fm.status,
      // readCount intentionally not carried over — starts at 0 and accrues
      // via the real incrementReadCount mutation from here on.
    });
    console.log(`  -> inserted`);
  }
}

async function main() {
  if (DRY_RUN) {
    console.log("Dry run — validating only, no writes.\n");
    await migrateStrategies(null);
    await migrateBlogPosts(null);
    console.log("\nDry run complete. Re-run without --dry-run to write.");
    return;
  }

  const email = process.env.MIGRATION_ADMIN_EMAIL;
  const password = process.env.MIGRATION_ADMIN_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "Set MIGRATION_ADMIN_EMAIL and MIGRATION_ADMIN_PASSWORD (a seeded admin account) to run for real."
    );
  }

  const client = new ConvexHttpClient(CONVEX_URL!);
  const result = await client.action(api.auth.signIn, {
    provider: "admin-credentials",
    params: { email, password },
  });
  const token = result?.tokens?.token;
  if (!token) {
    throw new Error("Sign-in failed — check MIGRATION_ADMIN_EMAIL/PASSWORD and that the account was seeded.");
  }
  client.setAuth(token);

  await migrateStrategies(client);
  await migrateBlogPosts(client);
  console.log("\nMigration complete.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
