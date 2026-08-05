"use client";

import { useRouter } from "next/navigation";
import { useAuthActions } from "@convex-dev/auth/react";

export default function SignOutButton() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/admin/login");
      }}
      className="font-body-sm text-secondary hover:text-primary transition-colors"
    >
      Sign out
    </button>
  );
}
