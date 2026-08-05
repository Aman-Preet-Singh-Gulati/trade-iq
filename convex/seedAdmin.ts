import { v } from "convex/values";
import { internalAction } from "./_generated/server";
import { createAccount } from "@convex-dev/auth/server";

// Never exposed to any client — this is the ONLY place an admin account can
// be created. Run once per admin from the CLI, e.g.:
//   npx convex run seedAdmin:run '{"email":"team@example.com","password":"...","name":"..."}'
export const run = internalAction({
  args: {
    email: v.string(),
    password: v.string(),
    name: v.optional(v.string()),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const email = args.email.trim().toLowerCase();
    if (args.password.length < 8) {
      throw new Error("Password must be at least 8 characters.");
    }
    await createAccount(ctx, {
      provider: "admin-credentials",
      account: { id: email, secret: args.password },
      profile: { email, name: args.name ?? email },
    });
    return null;
  },
});
