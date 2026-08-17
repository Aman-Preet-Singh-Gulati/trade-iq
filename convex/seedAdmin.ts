import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { createAccount } from "@convex-dev/auth/server";
import { assertStrongPassword } from "./lib/passwordPolicy";

// Never exposed to any client — this is the ONLY place an admin account can
// be created. Run once per admin from the CLI, e.g.:
//   npx convex run seedAdmin:run '{"email":"team@example.com","password":"...","name":"..."}'
//
// This file is for FIRST-TIME account creation only. To rotate the password
// of an admin account that already exists, use convex/rotateAdminPassword.ts
// instead — calling this action again for an existing email will fail (or
// create a duplicate account) rather than update the existing credential.
export const run = internalAction({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    assertStrongPassword(args.password);
    await createAccount(ctx, {
      provider: "admin-credentials",
      account: { id: email, secret: args.password },
      profile: { email, name: args.name ?? email },
    });
    return null;
  },
});
