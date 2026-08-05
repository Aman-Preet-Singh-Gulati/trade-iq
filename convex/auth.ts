import { convexAuth } from "@convex-dev/auth/server";
import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { retrieveAccount } from "@convex-dev/auth/server";
import { Scrypt } from "lucia";

// Sign-in only. There is no "signUp" flow implemented anywhere in this file,
// on purpose: admin accounts are created exclusively via the internal
// `seedAdmin.run` action (convex/seedAdmin.ts), which is never callable from
// a public client. This provider only ever reads an existing account via
// retrieveAccount — it never calls createAccount — so no code path here can
// register a new admin from the outside.
const AdminCredentials = ConvexCredentials({
  id: "admin-credentials",
  authorize: async (credentials, ctx) => {
    const email = typeof credentials.email === "string" ? credentials.email.trim().toLowerCase() : undefined;
    const password = typeof credentials.password === "string" ? credentials.password : undefined;
    if (!email || !password) return null;

    try {
      const { user } = await retrieveAccount(ctx, {
        provider: "admin-credentials",
        account: { id: email, secret: password },
      });
      return { userId: user._id };
    } catch {
      // Wrong password, unknown account, or rate-limited — all fail closed.
      return null;
    }
  },
  // Same hashing (Scrypt via lucia) the built-in Password provider uses.
  // Required explicitly — ConvexCredentials has no default and throws
  // without it.
  crypto: {
    async hashSecret(password: string) {
      return await new Scrypt().hash(password);
    },
    async verifySecret(password: string, hash: string) {
      return await new Scrypt().verify(hash, password);
    },
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [AdminCredentials],
});
