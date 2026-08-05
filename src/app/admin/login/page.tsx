"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";

export default function AdminLoginPage() {
  const { signIn } = useAuthActions();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await signIn("admin-credentials", { email, password });
      router.push("/admin");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-surface-container-low px-gutter-md">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-surface-container-lowest border border-outline-variant rounded-xl p-8"
      >
        <h1 className="font-headline-lg text-headline-lg text-primary mb-1">TradeIQ Admin</h1>
        <p className="font-body-sm text-secondary mb-6">Sign in to manage strategies and blog content.</p>

        <label className="block mb-4">
          <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Email</span>
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </label>

        <label className="block mb-6">
          <span className="block font-label-caps text-label-caps text-secondary mb-1.5">Password</span>
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2.5 bg-surface-container border border-outline-variant rounded-lg font-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
          />
        </label>

        {error && <p className="font-body-sm text-red-600 mb-4">{error}</p>}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-primary text-on-primary font-bold py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
