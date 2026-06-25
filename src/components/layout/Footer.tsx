"use client";

import React, { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: "" }), // website is honeypot
      });

      const contentType = res.headers.get("content-type");
      let data: any = {};
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      }

      if (!res.ok) {
        throw new Error(data.error || `Server Error (${res.status}). Please try again.`);
      }

      setIsSuccess(true);
      setEmail("");
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="border-t border-outline-variant py-margin-lg bg-primary-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_0.8fr_1.8fr] gap-gutter-md px-gutter-md max-w-container-max mx-auto text-center sm:text-left">
        <div>
          <h4 className="font-headline-lg text-headline-lg font-bold text-on-primary mb-4">TradeIQ</h4>
          <p className="font-body-sm text-on-primary-container max-w-xs mx-auto sm:mx-0">
            Empowering the next generation of financial professionals with precision and institutional strategies.
          </p>
          <div className="flex justify-center sm:justify-start gap-4 mt-6">
            <a
              href="https://www.instagram.com/tradeiq.with.nitz?igsh=bmN0MTJ2NHE1YWJ3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-primary hover:opacity-70 transition-opacity"
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
              className="text-on-primary hover:opacity-70 transition-opacity"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-primary mb-4">LEARNING PATHWAYS</span>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#curriculum">Price Action & Structure</a>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#curriculum">Python for Algo Trading</a>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#curriculum">AI Co-Pilot Systems</a>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#curriculum">Quantitative Models</a>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#curriculum">Institutional Risk Controls</a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-primary mb-4">SITE MAP</span>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#hero">Home</a>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#curriculum">Curriculum</a>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#register">Join Program</a>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#faq">FAQ</a>
        </div>
        <div>
          <span className="font-label-caps text-label-caps text-on-primary mb-4">STAY UPDATED</span>
          <p className="font-body-sm text-on-primary-container mb-4">Join our newsletter for weekly market insights.</p>

          <form onSubmit={handleSubscribe} className="flex flex-col">
            <div className="flex">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant border-r-0 rounded-l p-2 outline-none focus:border-primary-fixed text-on-surface"
                placeholder="Email"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary-fixed text-on-primary-fixed px-4 rounded-r font-label-caps text-[10px] hover:bg-primary-fixed-dim transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "WAIT" : "JOIN"}
              </button>
            </div>

            {isSuccess && (
              <p className="text-[#4caf50] font-body-sm mt-2">Successfully subscribed!</p>
            )}

            {errorMessage && (
              <p className="text-error font-body-sm mt-2">{errorMessage}</p>
            )}
          </form>

        </div>
      </div>
      <div className="mt-margin-lg pt-base border-t border-on-primary-container/20 text-center px-gutter-md">
        <p className="font-body-sm text-body-sm text-on-primary-container">© 2026 TradeIQ Financial Education. All rights reserved.</p>
      </div>
    </footer>
  );
}
