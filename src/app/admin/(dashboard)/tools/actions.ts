"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { convexAuthNextjsToken } from "@convex-dev/auth/nextjs/server";
import { api } from "@convex/_generated/api";
import type { Id } from "@convex/_generated/dataModel";

export interface ToolFormInput {
  title: string;
  description: string;
  category: string;
  icon: string;
  externalUrl: string;
  coverImage?: { kind: "external"; url: string } | { kind: "storage"; storageId: Id<"_storage"> };
  featured: boolean;
  pricing?: "FREE" | "FREEMIUM" | "PAID";
  publishedAt: number;
  status: "DRAFT" | "PUBLISHED";
}

export type ActionResult = { ok: true } | { ok: false; error: string };

// Single tag, no per-item tag/path — Tools has no detail route to invalidate
// independently (cards link straight to an external URL).
function revalidateTools() {
  revalidateTag("tools-list", { expire: 0 });
  revalidatePath("/tools");
}

export async function createToolAction(input: ToolFormInput): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.tools.create, input, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to create tool." };
  }
  revalidateTools();
  redirect("/admin/tools");
}

export async function updateToolAction(id: Id<"tools">, input: ToolFormInput): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.tools.update, { id, ...input }, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to update tool." };
  }
  revalidateTools();
  redirect("/admin/tools");
}

export async function deleteToolAction(id: Id<"tools">): Promise<ActionResult> {
  const token = await convexAuthNextjsToken();
  try {
    await fetchMutation(api.tools.remove, { id }, { token });
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to delete tool." };
  }
  revalidateTools();
  return { ok: true };
}
