import { convexAuth } from "@convex-dev/auth/server";
import { ConvexCredentials } from "@convex-dev/auth/providers/ConvexCredentials";
import { retrieveAccount } from "@convex-dev/auth/server";
import { Scrypt } from "lucia";
import { RateLimiter, MINUTE } from "@convex-dev/rate-limiter";
import { components } from "./_generated/api";

// Brute-force throttle on admin sign-in attempts, keyed by the normalized
// email. Fixed window: 5 attempts per 15 minutes per email. Consumed before
// every retrieveAccount call below, including attempts with a wrong password
// — this is what actually rate-limits login now (previously only implied by
// a comment, not enforced).
//
// Known, accepted tradeoff: `email` is unauthenticated client input, so
// anyone who knows the admin's login email can trip this limiter with 5
// wrong-password requests and lock out the real admin for the 15-minute
// window (repeatable indefinitely). This can only deny login, never grant
// access — accepted for a single-admin app rather than adding per-IP
// limiting or a global secondary bucket. Revisit if this ever becomes a
// multi-admin app or the login email is otherwise made discoverable.
const rateLimiter = new RateLimiter(components.rateLimiter, {
  adminLoginAttempt: { kind: "fixed window", rate: 5, period: 15 * MINUTE },
});

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

    const { ok } = await rateLimiter.limit(ctx, "adminLoginAttempt", { key: email });
    if (!ok) {
      // Rate limited — fail exactly like a wrong password/unknown account
      // below, so a client can never distinguish "too many attempts" from
      // "wrong credentials".
      return null;
    }

    try {
      const { user } = await retrieveAccount(ctx, {
        provider: "admin-credentials",
        account: { id: email, secret: password },
      });
      return { userId: user._id };
    } catch {
      // Wrong password or unknown account — fails closed, indistinguishable
      // from the rate-limited case above.
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
