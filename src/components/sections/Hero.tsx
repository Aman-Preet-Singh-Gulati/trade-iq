"use client";

import React from 'react';
// import { useState } from 'react'; // needed again once the video block below is restored

function HeroShowcaseGraphic() {
  const bars = [
    { x: 40, y: 140, h: 50, delay: '0ms' },
    { x: 72, y: 110, h: 80, delay: '80ms' },
    { x: 104, y: 150, h: 40, delay: '160ms' },
    { x: 136, y: 95, h: 95, delay: '240ms' },
    { x: 168, y: 120, h: 70, delay: '320ms' },
    { x: 200, y: 75, h: 115, delay: '400ms' },
    { x: 232, y: 105, h: 85, delay: '480ms' },
    { x: 264, y: 60, h: 130, delay: '560ms' },
  ];

  return (
    <div className="relative aspect-video bg-gradient-to-br from-primary-container to-primary rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl ring-1 ring-primary-fixed/20">
      <div className="absolute -right-10 -top-10 w-56 h-56 bg-primary-fixed/20 rounded-full blur-3xl animate-chart-glow-drift" />
      <div
        className="absolute -left-8 -bottom-12 w-48 h-48 bg-primary-fixed/10 rounded-full blur-3xl animate-chart-glow-drift"
        style={{ animationDelay: '-4.5s' }}
      />

      {/* Slow light sweep for a "live dashboard" feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-chart-scan" />
      </div>

      <svg
        className="absolute inset-0 w-full h-full opacity-40"
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g className="stroke-primary-fixed/20" strokeWidth="1">
          <line x1="0" y1="56" x2="400" y2="56" />
          <line x1="0" y1="112" x2="400" y2="112" />
          <line x1="0" y1="168" x2="400" y2="168" />
        </g>
        <g className="fill-primary-fixed/30">
          {bars.map((bar) => (
            <rect
              key={bar.x}
              x={bar.x}
              y={bar.y}
              width="14"
              height={bar.h}
              rx="2"
              className="animate-chart-bar-rise"
              style={{ transformOrigin: 'bottom', transformBox: 'fill-box', animationDelay: bar.delay }}
            />
          ))}
        </g>
        <path
          d="M30 150 L95 100 L160 130 L225 70 L290 95 L360 45"
          className="stroke-primary-fixed/70 animate-chart-draw"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
        />
        <g>
          <circle cx="360" cy="45" r="7" className="fill-primary-fixed/40 animate-ping" style={{ animationDelay: '2.7s', transformOrigin: '360px 45px', transformBox: 'fill-box' }} />
          <circle cx="360" cy="45" r="4" className="fill-primary-fixed" />
        </g>
      </svg>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative bg-primary-container py-16 md:py-24 px-gutter-md overflow-hidden" id="hero">
      <div className="max-w-container-max mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="contents lg:block text-on-primary">
            <div className="order-1 lg:order-none">
              <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary-fixed/20 text-primary-fixed font-label-caps text-label-caps border border-primary-fixed/30">
                INSTITUTIONAL-STYLE ALGO TRADING PROGRAM
              </div>
              <h1 className="font-headline-xl text-4xl lg:text-[40px] font-extrabold mb-6 leading-[1.1]">
                Eliminate Emotional Bias. Trade Like Institutions.<br /> Execute Like an Algorithm.
              </h1>
              <p className="font-body-md text-on-primary-container text-lg mb-8 max-w-xl opacity-90">
                Discover a structured trading framework that blends institutional market knowledge with algorithmic strategies, enabling disciplined execution, effective risk management, and long-term consistency.
              </p>
            </div>
            <div className="order-3 lg:order-none w-full">
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-lg font-bold text-center hover:bg-primary-fixed-dim transition-all shadow-lg hover:-translate-y-0.5" href="#register">
                Enroll now
              </a>
              <a className="border border-on-primary-container text-on-primary px-8 py-4 rounded-lg font-bold text-center hover:bg-on-primary-container hover:text-primary transition-all" href="#curriculum">
                View Course Modules
              </a>
            </div>
            <div className="flex items-center gap-4 py-4 border-t border-on-primary-container/20">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface-container-high overflow-hidden">
                  <img alt="Student" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfdEv10KEkf7kCSbRLV2B8IUvnr_1AiS75wmaHrFPKSGlaRA9qC4PRl8ASMyQZNX-hFh-vvRlz5ULenT5cn4Cudnp74Yl6ml2zIX_L1xFSwE2FwzJHoj-g1B1HrhwlVYrI1QPvcbjaibRVdXWsA3_YtsE1Nif_qaRfLb2z6zemLQBwDINK_udIhqrbfAgAjg4mAxmxihje-WgKih-uq9St2a3T-ZT3i0PQbBLCsbZsIhCFMM6Q73oa_tRnIWez7XSz83MCHINSbQ" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface-container-high overflow-hidden">
                  <img alt="Student" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIqba4A_HAIK8wWcjWYkrsfIAj3ouRN9qZ1Oi8ylIrr8ukTsHKaecLYXYKeFvdM0jdpKEvyAXU3OzefoGJUIqonR3ZbBvwSRwdJs6e4Z0PIQqeTHzArX2Ip62A_M0awfmRPfs56rlAv9bxZF_tyUuUZcldoX45SYZ5twT2pYxdjj8eG3o_PxtgXLonyGnPwGv3nJqAL6tF98RaSOz5nbYLXvyy-OEUDNzXiPWuFuUGkanwu_-DqZUv9qMzI-dcAdx2J4hcOOgW2w" />
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-primary-container bg-surface-container-high overflow-hidden">
                  <img alt="Student" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuNOydKWXkt3peWZ3hlBxOirWEOuOlmSRB2RjllciMvkB8RJBI1ZMUFK9sutFXpNqws6OoDfR1jFlGKZ0vOTGjzLqd5E0md3sLSp_dUEUdj6tErF7vm-79n1aYm5DN6CFd4k1ZJ49Xr67R5qgIbUw2YVquKL0JcZUP1SiYdZJJHm7GJ-tkPB5MqMbpCwkuWRDujuwnlSKgQb7FMzZ_RbApuqlhUzPKHm5CSR8dO4siIuD_P_kTqNC1lknpwr2V9Og2FOoZhi6Ifw" />
                </div>
              </div>
              <div className="text-sm font-label-caps text-on-primary-container">
                <span className="text-primary-fixed font-bold">250+ TRADERS</span> ENROLLED WORLDWIDE
              </div>
            </div>
            </div>
          </div>
          {/*
            VIDEO SHOWCASE — disabled until the team delivers the updated recording.
            To restore: uncomment this block, uncomment the `useState` import and
            `isPlaying` state near the top of this file, and remove the
            HeroShowcaseGraphic placeholder block below.

          <div className="relative order-2 lg:order-none w-full">
            <div className="relative group aspect-video bg-black rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl ring-1 ring-primary-fixed/20">
              {isPlaying ? (
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/5GXC4P4hTBc?autoplay=1"
                  title="TradeIQ Session Recording"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <>
                  <div className="absolute inset-0 bg-cover bg-center opacity-70 group-hover:scale-105 transition-transform duration-700" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAbC3RbESKrmWXzVnXO0_IgsXYmWTHDJjOBUSCvYqwRmZjsaxgcpCJjefOvx5opP79H0XzafsUg_XfWkhoiqX6VL6dmHIJpnVc3kl1fMDqAAb-YvgeT2lBEk2OIdPxDwYnSp3w16Y_22NiozaPAf6Wlre3YN-AeofGhTefv7aIW9E-zQBRXsD84UHlvwicAh_ndKzZD9uZQg41GRv7XNAPLSICWxHT4u_nD67rybcL9P7nubeVaEZ0MEeooqWhn0_JfIkE_Sx_59w')" }}></div>
                  <div className="absolute inset-0 bg-primary/20 flex items-center justify-center transition-all group-hover:bg-primary/30">
                    <button
                      className="w-20 h-20 bg-primary-fixed text-on-primary-fixed rounded-full flex items-center justify-center shadow-2xl transform transition-transform group-hover:scale-110"
                      onClick={() => setIsPlaying(true)}
                    >
                      <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-fixed/10 rounded-full blur-3xl -z-10"></div>
          </div>
          */}

          {/* Desktop-only placeholder graphic in place of the video; hidden on mobile so nothing awkward sits in its spot */}
          <div className="hidden lg:block relative order-2 lg:order-none w-full">
            <HeroShowcaseGraphic />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-fixed/10 rounded-full blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] -z-0">
        <svg height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern height="40" id="grid" patternUnits="userSpaceOnUse" width="40">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"></path>
            </pattern>
          </defs>
          <rect fill="url(#grid)" height="100%" width="100%"></rect>
        </svg>
      </div>
    </section>
  );
}
