"use server";

import { incrementPostReadCount } from "@/lib/posts";

export async function incrementReadCountAction(slug: string): Promise<void> {
  await incrementPostReadCount(slug);
}
