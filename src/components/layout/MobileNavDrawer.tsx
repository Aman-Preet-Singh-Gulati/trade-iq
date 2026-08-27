"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MobileNavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const drawerLinks = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'curriculum', label: 'Curriculum', href: '/#curriculum' },
  { id: 'register', label: 'Join', href: '/#register' },
  { id: 'faq', label: 'FAQ', href: '/#faq' },
  { id: 'blog', label: 'Blog', href: '/blog' },
  { id: 'strategies', label: 'Strategies', href: '/strategies' },
  { id: 'tools', label: 'Tools', href: '/tools' },
];

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();

  const isActive = (id: string) => {
    if (id === 'blog') return pathname?.startsWith('/blog') ?? false;
    if (id === 'strategies') {
      return pathname === '/strategies' || (pathname?.startsWith('/strategy/') ?? false);
    }
    if (id === 'home') return pathname === '/';
    if (id === 'tools') return pathname === '/tools';
    return false;
  };

  return (
    <div
      className={`fixed inset-0 z-[60] bg-surface transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full p-gutter-md">
        <div className="flex justify-between items-center mb-12">
          <span className="font-headline-lg-mobile text-headline-lg-mobile font-extrabold text-on-surface">
            TradeIQ
          </span>
          <button className="text-on-surface p-2" onClick={onClose} aria-label="Close menu">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-8">
          {drawerLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={onClose}
              className={`font-headline-lg transition-colors hover:text-primary-fixed ${isActive(link.id) ? 'text-primary-fixed' : 'text-on-surface opacity-60'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-12 border-t border-white/10">
          <Link
            href="/#register"
            onClick={onClose}
            className="block w-full py-4 bg-primary-fixed text-on-primary-fixed font-bold text-center rounded-lg"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}
