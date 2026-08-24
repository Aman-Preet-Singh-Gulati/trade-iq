"use client";

import React from 'react';
import NewsletterForm from '@/components/shared/NewsletterForm';

export default function BlogFooter() {
  return (
    <footer className="border-t border-outline-variant pt-margin-lg pb-4 bg-primary-container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[2fr_1.3fr_0.8fr_1.8fr] gap-gutter-md px-gutter-md max-w-container-max mx-auto text-center sm:text-left">
        <div>
          <h4 className="font-headline-lg text-headline-lg font-bold text-on-primary-container mb-4">TradeIQ</h4>
          <p className="font-body-sm text-on-primary-container max-w-xs mx-auto sm:mx-0">
            Institutional-grade market analysis, risk management frameworks, and trading psychology insights, published every week by the TradeIQ research team.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-primary-container mb-4">BROWSE TOPICS</span>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/blog?category=market-analysis">Market Analysis</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/blog?category=risk-management">Risk Management</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/blog?category=technical-analysis">Technical Analysis</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/blog?category=trading-psychology">Trading Psychology</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/blog">All Articles</a>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-primary-container mb-4">EXPLORE</span>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/blog">Latest Stories</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/tools">Tools</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/">Home</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/#curriculum">Curriculum</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/#register">Join Program</a>
          <a className="font-body-sm text-on-primary-container hover:text-primary-fixed transition-colors" href="/#faq">FAQ</a>
        </div>
        <div>
          <span className="font-label-caps text-label-caps text-on-primary-container mb-4">STAY UPDATED</span>
          <p className="font-body-sm text-on-primary-container mb-4">Get weekly market insights</p>

          <NewsletterForm />

          <p className="font-body-sm text-primary-fixed mt-8 font-bold">
            New Insights Every Week. Institutional Rigor, Applied.
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
