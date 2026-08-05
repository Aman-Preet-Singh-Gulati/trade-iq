"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Newspaper } from "lucide-react";

const links = [
  { href: "/admin/strategies", label: "Strategies", icon: BookOpen },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
];

export default function AdminSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1 w-48 shrink-0">
      {links.map(({ href, label, icon: Icon }) => {
        const active = pathname?.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg font-body-sm transition-colors ${
              active ? "bg-surface-container text-primary font-bold" : "text-secondary hover:text-primary hover:bg-surface-container"
            }`}
          >
            <Icon size={16} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
