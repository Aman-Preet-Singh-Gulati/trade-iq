"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MobileNavDrawer from '@/components/layout/MobileNavDrawer';

export default function BlogTopBar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

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
            src="/Icon-removebg-preview.png"
          />
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center gap-3">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-lg">
                search
              </span>
              <input
                className="pl-10 pr-4 py-2 bg-surface-container border border-outline-variant rounded-lg text-body-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-64 transition-all"
                placeholder="Search insights..."
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-on-primary px-6 py-2.5 rounded-lg font-label-caps tracking-widest hover:bg-primary-container transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              SEARCH
            </button>
          </form>
          <div className="md:hidden flex items-center gap-2">
            <a href="#blog-search" className="p-2 text-secondary" aria-label="Search articles">
              <span className="material-symbols-outlined">search</span>
            </a>
            <button
              className="material-symbols-outlined text-primary p-2"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Open menu"
            >
              menu
            </button>
          </div>
        </div>
      </div>

      <MobileNavDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}
