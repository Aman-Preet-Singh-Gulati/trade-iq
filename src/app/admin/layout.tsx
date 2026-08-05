import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server";
import ConvexClientProvider from "./ConvexClientProvider";
import type { ReactNode } from "react";

// Providers only, no visual chrome — wraps everything under /admin/**,
// including /admin/login. The dashboard chrome (sidebar, auth re-check)
// lives in admin/(dashboard)/layout.tsx so the login page doesn't inherit it.
export default function AdminRootLayout({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsServerProvider apiRoute="/admin/api/auth">
      <ConvexClientProvider>{children}</ConvexClientProvider>
    </ConvexAuthNextjsServerProvider>
  );
}
