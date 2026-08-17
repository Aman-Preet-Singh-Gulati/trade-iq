import { v } from "convex/values";
import { internalAction, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";
import { modifyAccountCredentials, invalidateSessions } from "@convex-dev/auth/server";
import { assertStrongPassword } from "./lib/passwordPolicy";
import type { Id } from "./_generated/dataModel";

// Never exposed to any client — this is the ONLY way to rotate the password
// of an admin account that already exists (convex/seedAdmin.ts is for
// first-time account creation only; re-running it against an existing email
// does not update the stored credential). Run from the CLI, e.g.:
//   npx convex run rotateAdminPassword:run '{"email":"team@example.com","newPassword":"..."}'
//
// As a security measure, this invalidates every existing session for the
// account, so anyone (including the legitimate admin) signed in under the
// old password is signed out and must sign in again with the new one.
export const run = internalAction({
  args: {
    email: v.string(),
    newPassword: v.string(),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    assertStrongPassword(args.newPassword);

    // Resolve userId from the authAccounts row actually being modified below
    // (not a parallel users.email lookup) so there's no implicit assumption
    // that the two tables agree on which user this email belongs to.
    const userId: Id<"users"> | null = await ctx.runQuery(
      internal.rotateAdminPassword.getUserIdForAdminAccount,
      { email }
    );
    if (userId === null) {
      throw new Error(`No admin account found for email "${email}".`);
    }

    await modifyAccountCredentials(ctx, {
      provider: "admin-credentials",
      account: { id: email, secret: args.newPassword },
    });

    await invalidateSessions(ctx, { userId });
    return null;
  },
});

// Internal helper: looks up the userId that owns the admin-credentials
// authAccounts row for this email, via the `providerAndAccountId` index
// @convex-dev/auth's authTables declares on `authAccounts` (fields:
// userId, provider, providerAccountId — verified against
// node_modules/@convex-dev/auth/dist/server/implementation/types.js).
// Reading userId straight off this row (rather than a separate users.email
// lookup) guarantees invalidateSessions always targets the same account
// modifyAccountCredentials just rotated.
export const getUserIdForAdminAccount = internalQuery({
  args: { email: v.string() },
  returns: v.union(v.id("users"), v.null()),
  handler: async (ctx, args) => {
    const account = await ctx.db
      .query("authAccounts")
      .withIndex("providerAndAccountId", (q) =>
        q.eq("provider", "admin-credentials").eq("providerAccountId", args.email)
      )
      .unique();
    return account?.userId ?? null;
  },
});
