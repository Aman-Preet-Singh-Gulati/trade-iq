"use client";

import { useEffect } from "react";
import { incrementReadCountAction } from "./actions";

// Fires client-side, after hydration — keeps the page itself free of a
// server-side write so it can stay statically generated + ISR instead of
// being forced fully dynamic by a mutation running during render.
export default function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    incrementReadCountAction(slug);
  }, [slug]);

  return null;
}
