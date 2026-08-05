"use client";

import Link from "next/link";
import { PanelLeft } from "lucide-react";
import SignOutButton from "./SignOutButton";
import { useSidebar } from "./AdminShell";

export default function AdminTopBar() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 sm:px-6 border-b border-outline-variant bg-surface-container-lowest/95 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          title="Toggle sidebar (Ctrl/Cmd+B)"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-secondary hover:text-primary hover:bg-surface-container transition-colors"
        >
          <PanelLeft size={18} />
        </button>
        <Link href="/admin" className="font-headline-lg-mobile text-primary font-bold">
          TradeIQ Admin
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" target="_blank" className="font-body-sm text-secondary hover:text-primary transition-colors">
          View site
        </Link>
        <SignOutButton />
      </div>
    </header>
  );
}
