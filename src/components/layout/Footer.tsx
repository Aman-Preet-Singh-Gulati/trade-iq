"use client";

import React from 'react';
import NewsletterForm from '@/components/shared/NewsletterForm';

export default function Footer() {
  return (
    <footer className="border-t border-outline-variant pt-margin-lg pb-4 bg-background">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_0.8fr_1.8fr] gap-gutter-md px-gutter-md max-w-container-max mx-auto text-center sm:text-left">
        <div>
          <h4 className="font-headline-lg text-headline-lg font-bold text-on-primary-container mb-4">TradeIQ</h4>
          <p className="font-body-sm text-on-primary-container max-w-xs mx-auto sm:mx-0">
            Empowering traders with institutional-grade education, AI-powered trading systems, and data-driven strategies to build consistency, confidence, and long-term success in the financial markets.
          </p>

        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-primary-container mb-4">LEARNING PATHWAYS</span>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/strategies">Free Strategy Library</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/strategies?category=python">Python Strategies</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/strategies?category=options">Options Strategies</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/strategies?category=risk-management">Risk Management Tools</a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-primary-container mb-4">SITE MAP</span>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="#hero">Home</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="#curriculum">Curriculum</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="#register">Join Program</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="#faq">FAQ</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/blog">Blog</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/strategies">Strategies</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/tools">Tools</a>
        </div>
        <div>
          <span className="font-label-caps text-label-caps text-on-primary-container mb-4">STAY UPDATED</span>
          <p className="font-body-sm text-on-primary-container mb-4">Join our newsletter</p>

          <NewsletterForm />

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
