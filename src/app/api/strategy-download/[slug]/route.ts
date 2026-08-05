import { NextResponse } from "next/server";
import { getStrategyBySlug } from "@/lib/strategies";

// Convex Storage URLs don't send Content-Disposition: attachment, so the
// HTML `download` attribute isn't honored cross-origin (confirmed via a
// HEAD request during verification — PDFs in particular would open inline
// instead of downloading). This route re-streams the file through the
// site's own origin with an explicit attachment header so downloads behave
// consistently regardless of file type.
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const strategy = await getStrategyBySlug(slug);

  if (!strategy || !strategy.fileUrl) {
    return new NextResponse("Not found", { status: 404 });
  }

  const upstream = await fetch(strategy.fileUrl);
  if (!upstream.ok || !upstream.body) {
    return new NextResponse("Failed to fetch file", { status: 502 });
  }

  return new NextResponse(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("content-type") ?? "application/octet-stream",
      "Content-Disposition": `attachment; filename="${strategy.fileName}"`,
      ...(upstream.headers.get("content-length")
        ? { "Content-Length": upstream.headers.get("content-length")! }
        : {}),
    },
  });
}
