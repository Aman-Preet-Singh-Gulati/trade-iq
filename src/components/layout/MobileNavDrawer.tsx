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
  { id: 'blog', label: 'Blog', href: '/blog', external: true },
  { id: 'strategies', label: 'Strategies', href: '/strategies', external: true },
];

export default function MobileNavDrawer({ isOpen, onClose }: MobileNavDrawerProps) {
  const pathname = usePathname();

  const isActive = (id: string) => {
    if (id === 'blog') return pathname?.startsWith('/blog') ?? false;
    if (id === 'strategies') {
      return pathname === '/strategies' || (pathname?.startsWith('/strategy/') ?? false);
    }
    if (id === 'home') return pathname === '/';
    return false;
  };

  return (
    <div
      className={`fixed inset-0 z-[60] bg-primary transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full p-gutter-md">
        <div className="flex justify-between items-center mb-12">
          <span className="font-headline-lg-mobile text-headline-lg-mobile font-extrabold text-on-primary">
            TradeIQ
          </span>
          <button className="text-on-primary p-2" onClick={onClose} aria-label="Close menu">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <nav className="flex flex-col gap-8">
          {drawerLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={onClose}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className={`font-headline-lg text-on-primary ${isActive(link.id) ? '' : 'opacity-60'}`}
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
