"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Newspaper, Wrench } from "lucide-react";
import { useSidebar } from "./AdminShell";

const links = [
  { href: "/admin/strategies", label: "Strategies", icon: BookOpen },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/tools", label: "Tools", icon: Wrench },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();
  const { collapsed } = useSidebar();

  return (
    <aside
      className={`shrink-0 border-r border-outline-variant bg-surface-container-lowest overflow-hidden transition-[width] duration-200 ease-linear ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Fixed at the expanded width regardless of collapsed state — the
          `aside` above clips it via overflow-hidden as it shrinks, so icons
          (left-aligned) stay put while labels slide out of view instead of
          reflowing/wrapping mid-transition. */}
      <nav className="flex flex-col gap-1 p-3 w-64">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname?.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-body-sm whitespace-nowrap transition-colors ${
                active ? "bg-surface-container text-primary font-bold" : "text-secondary hover:text-primary hover:bg-surface-container"
              }`}
            >
              <Icon size={18} className="shrink-0" />
              <span className={`transition-opacity duration-150 ${collapsed ? "opacity-0" : "opacity-100"}`}>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
