"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

export interface StrategyFormInput {
  slug: string;
  title: string;
  category: string;
  icon: string;
  coverImage?: { kind: "external"; url: string } | { kind: "storage"; storageId: Id<"_storage"> };
  fileStorageId: Id<"_storage">;
  fileName: string;
  excerpt: string;
  summary: string;
  content: string;
  publishedAt: number;
  status: "DRAFT" | "PUBLISHED";
}

export type ActionResult = { ok: true } | { ok: false; error: string };

// { expire: 0 } forces true immediate invalidation (read-your-own-writes),
// as opposed to the "max" profile's stale-while-revalidate semantics —
// documented as the right choice for this "just wrote, want it fresh now"
// case. Staying on the pre-Cache-Components model (unstable_cache + this)
// rather than opting the whole app into `cacheComponents`/`'use cache'`.
function revalidateStrategy(slug: string) {
  revalidateTag("strategies-list", { expire: 0 });
  revalidateTag(`strategy:${slug}`, { expire: 0 });
  revalidatePath("/strategies");
  revalidatePath(`/strategy/${slug}`);
}

export async function createStrategyAction(input: StrategyFormInput): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.strategies.create, input, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to create strategy." };
  }
  revalidateStrategy(input.slug);
  redirect("/admin/strategies");
}

export async function updateStrategyAction(
  id: Id<"strategies">,
  previousSlug: string,
  input: StrategyFormInput
): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.strategies.update, { id, ...input }, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to update strategy." };
  }
  revalidateStrategy(previousSlug);
  if (input.slug !== previousSlug) revalidateStrategy(input.slug);
  redirect("/admin/strategies");
}

export async function deleteStrategyAction(id: Id<"strategies">, slug: string): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.strategies.remove, { id }, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete strategy." };
  }
  revalidateStrategy(slug);
  return { ok: true };
}
