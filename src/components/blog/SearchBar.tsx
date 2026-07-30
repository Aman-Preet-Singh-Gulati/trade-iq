"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SearchBarProps {
  initialQuery?: string;
  activeCategory?: string;
}

export default function SearchBar({ initialQuery = '', activeCategory }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (activeCategory) params.set('category', activeCategory);
    const trimmed = query.trim();
    if (trimmed) params.set('q', trimmed);
    const qs = params.toString();
    router.push(qs ? `/blog?${qs}` : '/blog');
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary">
        search
      </span>
      <input
        className="w-full pl-10 pr-4 py-3 bg-white border border-outline-variant rounded focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none transition-all"
        placeholder="Search articles..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}
