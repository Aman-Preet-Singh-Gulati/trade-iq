"use client";

import React, { useState } from 'react';

export default function TopAppBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('hero');

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'curriculum', label: 'Curriculum' },
    { id: 'register', label: 'Join' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleNavClick = (id: string) => {
    setActiveItem(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background border-b border-outline-variant">
      <div className="flex justify-between items-center h-24 px-gutter-md max-w-container-max mx-auto">
        <div className="flex items-center gap-2">
          <img alt="TradeIQ Logo" className="h-20 w-auto object-contain rounded-md scale-110" src="/Icon-removebg-preview.png" />
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={`font-label-caps text-base tracking-widest transition-colors duration-200 border-b-2 py-1 ${activeItem === link.id
                  ? 'text-primary font-extrabold border-primary'
                  : 'text-secondary font-bold border-transparent hover:text-primary'
                }`}
              href={`#${link.id}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 text-primary">
            <a
              href="https://www.instagram.com/tradeiq.with.nitz?igsh=bmN0MTJ2NHE1YWJ3"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/share/1KA2rs3miV/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
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

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-outline-variant shadow-lg flex flex-col py-6 px-gutter-md gap-6">
          {navLinks.map((link) => (
            <a
              key={link.id}
              className={`font-label-caps text-base tracking-widest transition-colors duration-200 ${activeItem === link.id
                  ? 'text-primary font-extrabold'
                  : 'text-secondary font-bold hover:text-primary'
                }`}
              href={`#${link.id}`}
              onClick={() => handleNavClick(link.id)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
