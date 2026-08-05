import { getAuthUserId } from "@convex-dev/auth/server";
import type { QueryCtx, MutationCtx } from "../_generated/server";
import type { Id } from "../_generated/dataModel";

// Every authenticated user is an admin — there are no roles, only predefined
// shared credentials seeded via convex/seedAdmin.ts. This is the one place
// that check lives; every mutation that writes to strategies/blogPosts must
// call this first.
export async function requireAdmin(ctx: QueryCtx | MutationCtx): Promise<Id<"users">> {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new Error("Unauthorized: admin sign-in required.");
  }
  return userId;
}
