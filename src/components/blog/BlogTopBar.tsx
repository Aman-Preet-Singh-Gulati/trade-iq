"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import MobileNavDrawer from '@/components/layout/MobileNavDrawer';

const navLinks = [
  { id: 'hero', label: 'Home', href: '/' },
  { id: 'curriculum', label: 'Curriculum', href: '/#curriculum' },
  { id: 'register', label: 'Join', href: '/#register' },
  { id: 'faq', label: 'FAQ', href: '/#faq' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'strategies', label: 'Strategies', href: '/strategies' },
  { id: 'tools', label: 'Tools', href: '/tools' },
];

export default function BlogTopBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  const pathname = usePathname();
  const isStrategiesActive = pathname === '/strategies' || (pathname?.startsWith('/strategy/') ?? false);
  const isToolsActive = pathname === '/tools';

  const isLinkActive = (id: string) => {
    if (id === 'blog') return true;
    if (id === 'strategies') return isStrategiesActive;
    if (id === 'tools') return isToolsActive;
    return false;
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/blog?q=${encodeURIComponent(trimmed)}` : '/blog');
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background md:bg-background/90 md:backdrop-blur-md border-b border-outline-variant md:transition-all">
      <div className="flex justify-between items-center h-24 px-gutter-md max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <img
            alt="TradeIQ Logo"
            className="h-20 w-auto object-contain rounded-md scale-110"
            src="/Icon-dark-mode.png"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              className={`font-label-caps text-base tracking-widest transition-colors duration-200 border-b-2 py-1 whitespace-nowrap ${isLinkActive(link.id)
                  ? 'text-primary-fixed font-extrabold border-primary-fixed'
                  : 'text-secondary font-bold border-transparent hover:text-primary-fixed'
                }`}
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4 md:gap-6">
          <form onSubmit={handleSearchSubmit} className="hidden xl:flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">
                search
              </span>
              <input
                className="pl-10 pr-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed w-64 transition-all"
                placeholder="Search insights..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-primary-fixed text-on-primary-fixed px-6 py-2 rounded-lg font-bold text-body-sm hover:opacity-90 transition-opacity"
            >
              Search
            </button>
          </form>
          <div className="flex items-center gap-2">
            <a href="#blog-search" className="xl:hidden p-2 text-secondary" aria-label="Search articles">
              <span className="material-symbols-outlined">search</span>
            </a>
            <button
              className="lg:hidden p-2"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined text-primary">menu</span>
            </button>
          </div>
        </div>
      </div>

      <MobileNavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}
