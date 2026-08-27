"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNavDrawer from '@/components/layout/MobileNavDrawer';

export default function TopAppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('hero');
  const pathname = usePathname();
  const isBlogActive = pathname?.startsWith('/blog') ?? false;
  const isStrategiesActive = pathname === '/strategies' || (pathname?.startsWith('/strategy/') ?? false);
  const isToolsActive = pathname === '/tools';

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'register', label: 'Join' },
    { id: 'faq', label: 'FAQ' },
    { id: 'blog', label: 'Blog', href: '/blog' },
    { id: 'strategies', label: 'Strategies', href: '/strategies' },
    { id: 'tools', label: 'Tools', href: '/tools' },
  ];

  const handleNavClick = (id: string) => {
    setActiveItem(id);
    setIsMobileMenuOpen(false);
  };

  const isLinkActive = (id: string) => {
    if (id === 'blog') return isBlogActive;
    if (id === 'strategies') return isStrategiesActive;
    if (id === 'tools') return isToolsActive;
    return !isBlogActive && !isStrategiesActive && !isToolsActive && activeItem === id;
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
      <div className="flex justify-between items-center h-24 px-gutter-md max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={() => handleNavClick('hero')}>
          <img alt="TradeIQ Logo" className="h-20 w-auto object-contain rounded-md scale-110" src="/Icon-dark-mode.png" />
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              className={`font-label-caps text-base tracking-widest transition-colors duration-200 border-b-2 py-1 ${isLinkActive(link.id)
                  ? 'text-primary-fixed font-extrabold border-primary-fixed'
                  : 'text-secondary font-bold border-transparent hover:text-primary-fixed'
                }`}
              href={link.href || `#${link.id}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">

          <div className="md:hidden flex items-center">
            <button
              className="material-symbols-outlined text-primary p-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? 'close' : 'menu'}
            </button>
          </div>
        </div>
      </div>

      <MobileNavDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
}
