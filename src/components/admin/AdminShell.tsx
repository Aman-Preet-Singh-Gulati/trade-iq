"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";

interface SidebarContextValue {
  collapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within <AdminShell>");
  return ctx;
}

const STORAGE_KEY = "admin-sidebar-collapsed";

// Shares collapsed state between AdminTopBar (the trigger) and
// AdminSidebarNav (the panel) — modeled on shadcn's SidebarProvider/useSidebar
// pattern, trimmed down to what this two-link admin nav actually needs.
export default function AdminShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  // Restored client-side only (after mount) so server/first-paint markup
  // always matches — a brief default-state flash on load beats a
  // hydration mismatch for a one-time preference like this.
  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "true") {
      setCollapsed(true);
    }
  }, []);

  const toggleSidebar = useCallback(() => {
    setCollapsed((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  // Cmd/Ctrl+B, matching the shadcn sidebar convention this is modeled on.
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key.toLowerCase() === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [toggleSidebar]);

  return <SidebarContext.Provider value={{ collapsed, toggleSidebar }}>{children}</SidebarContext.Provider>;
}
