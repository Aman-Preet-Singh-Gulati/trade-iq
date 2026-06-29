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
    <footer className="border-t border-outline-variant pt-margin-lg pb-4 bg-primary-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_0.8fr_1.8fr] gap-gutter-md px-gutter-md max-w-container-max mx-auto text-center sm:text-left">
        <div>
          <h4 className="font-headline-lg text-headline-lg font-bold text-on-primary mb-4">TradeIQ</h4>
          <p className="font-body-sm text-on-primary-container max-w-xs mx-auto sm:mx-0">
            Empowering traders with institutional-grade education, AI-powered trading systems, and data-driven strategies to build consistency, confidence, and long-term success in the financial markets.
          </p>

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
      <div className="mt-margin-lg pt-base border-t border-on-primary-container/20 flex flex-col items-center px-gutter-md pb-4">
        <p className="font-body-sm text-body-sm text-on-primary-container text-center mb-4">© 2026 TradeIQ Financial Education. All rights reserved.</p>
        <p className="text-xs text-on-primary-container opacity-60 text-center max-w-4xl leading-relaxed">
          Trading in financial markets involves risk. TradeIQ provides educational content only and does not offer investment or financial advice.
        </p>
      </div>
    </footer>
  );
}
