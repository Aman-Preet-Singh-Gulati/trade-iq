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
            Empowering traders with institutional-grade education, AI-powered trading systems, and data-driven strategies to build consistency, confidence, and long-term success in the financial markets.
          </p>
          <div className="flex justify-center sm:justify-start gap-4 mt-6">
            <a
              href="https://chat.whatsapp.com/Jt0LW1gIwSC5UyUvq0txGA"
              target="_blank"
              rel="noopener noreferrer"
              className="text-on-primary hover:opacity-70 transition-opacity"
              aria-label="WhatsApp Community"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
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
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#curriculum">Strategy Building & Backtesting</a>
          <a className="font-body-sm text-on-primary-container hover:text-on-primary transition-colors" href="#curriculum">Professional Trading Psychology</a>
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
          <p className="font-body-sm text-on-primary-container mb-4">Join our newsletter</p>

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

          <p className="font-body-sm text-primary-fixed mt-8 font-bold">
            Institutional Knowledge. AI-Powered Edge. Rule-Based Execution.
          </p>
        </div>
      </div>
      <div className="mt-margin-lg pt-base border-t border-on-primary-container/20 flex flex-col items-center px-gutter-md pb-8">
        <p className="font-body-sm text-body-sm text-on-primary-container text-center">© 2026 TradeIQ Financial Education. All rights reserved.</p>
      </div>
    </footer>
  );
}
