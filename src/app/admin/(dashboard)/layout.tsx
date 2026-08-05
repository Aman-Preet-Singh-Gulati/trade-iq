import { redirect } from "next/navigation";
import { isAuthenticatedNextjs } from "@convex-dev/auth/nextjs/server";
import AdminShell from "@/components/admin/AdminShell";
import AdminTopBar from "@/components/admin/AdminTopBar";
import AdminSidebarNav from "@/components/admin/AdminSidebarNav";
import type { ReactNode } from "react";

// The proxy (src/proxy.ts) already redirects unauthenticated requests to
// /admin/login on every request. This is the defense-in-depth re-check Next's
// own docs recommend (auth checks shouldn't rely on the proxy alone) — cheap,
// since it just reads the session cookie, no extra Convex round trip.
export default async function AdminDashboardLayout({ children }: { children: ReactNode }) {
  if (!(await isAuthenticatedNextjs())) {
    redirect("/admin/login");
  }

  return (
    <AdminShell>
      <div className="min-h-screen flex flex-col">
        <AdminTopBar />
        <div className="flex flex-1">
          <AdminSidebarNav />
          <main className="flex-1 p-8 min-w-0">{children}</main>
        </div>
      </div>
    </AdminShell>
  );
}
