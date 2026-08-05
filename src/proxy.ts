import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Next.js 16 renamed `middleware.ts` to `proxy.ts` (same mechanism). This
// file — and the auth cookie/session machinery it drives — is scoped to
// /admin/** only via `config.matcher` below; the public site never loads
// the Convex Auth client, cookies, or this proxy at all. `apiRoute` is
// pointed under /admin/api/auth (instead of the library's default
// /api/auth) specifically so that boundary can stay a single clean prefix.
const isAdminLoginRoute = createRouteMatcher(["/admin/login"]);

export default convexAuthNextjsMiddleware(
  async (request, { convexAuth }) => {
    const authenticated = await convexAuth.isAuthenticated();

    if (isAdminLoginRoute(request)) {
      if (authenticated) return nextjsMiddlewareRedirect(request, "/admin");
      return;
    }

    if (!authenticated) {
      return nextjsMiddlewareRedirect(request, "/admin/login");
    }
  },
  { apiRoute: "/admin/api/auth" }
);

export const config = {
  matcher: ["/admin/:path*"],
};
