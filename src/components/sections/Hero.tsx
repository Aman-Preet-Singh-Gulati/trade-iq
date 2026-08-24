"use client";

import React from 'react';
// import { useState } from 'react'; // needed again once the video block below is restored

function HeroNodeGraph() {
  const nodes: { cx: number; cy: number; r: number; color: "primary" | "tertiary"; delay: string }[] = [
    { cx: 60, cy: 80, r: 4, color: "primary", delay: "0s" },
    { cx: 380, cy: 90, r: 5, color: "primary", delay: ".6s" },
    { cx: 420, cy: 300, r: 4, color: "primary", delay: "1.2s" },
    { cx: 680, cy: 120, r: 4, color: "primary", delay: "1.8s" },
    { cx: 100, cy: 420, r: 4, color: "primary", delay: "2.4s" },
    { cx: 560, cy: 60, r: 3, color: "primary", delay: "3s" },
    { cx: 220, cy: 140, r: 5, color: "tertiary", delay: ".3s" },
    { cx: 140, cy: 260, r: 4, color: "tertiary", delay: ".9s" },
    { cx: 520, cy: 180, r: 5, color: "tertiary", delay: "1.5s" },
    { cx: 260, cy: 340, r: 4, color: "tertiary", delay: "2.1s" },
    { cx: 740, cy: 260, r: 4, color: "tertiary", delay: "2.7s" },
    { cx: 600, cy: 380, r: 4, color: "tertiary", delay: "3.3s" },
    { cx: 340, cy: 440, r: 3, color: "tertiary", delay: "3.9s" },
    { cx: 760, cy: 380, r: 3, color: "tertiary", delay: "4.5s" },
  ];
  const lines: [number, number, number, number, string?][] = [
    [60, 80, 220, 140],
    [220, 140, 140, 260],
    [220, 140, 380, 90],
    [380, 90, 520, 180],
    [520, 180, 420, 300],
    [420, 300, 260, 340],
    [260, 340, 140, 260],
    [520, 180, 680, 120],
    [680, 120, 740, 260],
    [420, 300, 600, 380],
    [600, 380, 740, 260],
    [60, 80, 140, 260],
    [380, 90, 260, 340, "2 4"],
    [100, 420, 260, 340],
    [340, 440, 600, 380],
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="stroke-primary-fixed/35" strokeWidth="1">
        {lines.map(([x1, y1, x2, y2, dash], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeDasharray={dash} />
        ))}
      </g>
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          className={n.color === "primary" ? "fill-primary-fixed animate-node-drift" : "fill-tertiary animate-node-drift"}
          style={{ animationDelay: n.delay, transformBox: "fill-box", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}

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
    <div className="relative aspect-video bg-surface-container rounded-2xl overflow-hidden border border-outline-variant shadow-2xl">
      {/* "LIVE" badge — matches the mockup's chart panel treatment */}
      <span className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 border border-white/10 text-[10px] font-mono font-bold tracking-wider text-primary-fixed">
        <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-pulse" />
        LIVE
      </span>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 225"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <g className="stroke-outline-variant" strokeWidth="1" opacity="0.6">
          <line x1="0" y1="56" x2="400" y2="56" />
          <line x1="0" y1="112" x2="400" y2="112" />
          <line x1="0" y1="168" x2="400" y2="168" />
        </g>
        <g className="fill-primary-fixed/55">
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
          className="stroke-primary-fixed animate-chart-draw"
          fill="none"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray={1}
        />
        <g>
          <circle cx="360" cy="45" r="7" className="fill-primary-fixed/35 animate-ping" style={{ animationDelay: '2.7s', transformOrigin: '360px 45px', transformBox: 'fill-box' }} />
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
          <div className="contents lg:block text-on-primary-container">
            <div className="order-1 lg:order-none">
              <div className="w-fit mb-6">
                <div className="flex flex-wrap justify-between gap-y-2 mb-3" aria-hidden="true">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary-fixed/70"
                      style={{ animation: `pulse-dot 1.8s ease-in-out ${i * 0.12}s infinite` }}
                    />
                  ))}
                </div>
                <div className="px-4 py-1.5 rounded-full bg-primary-fixed/20 text-primary-fixed font-label-caps text-label-caps border border-primary-fixed/30">
                  INSTITUTIONAL-STYLE ALGO TRADING PROGRAM
                </div>
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
              <a className="bg-primary-fixed text-on-primary-fixed px-8 py-4 rounded-lg font-bold text-center hover:opacity-90 transition-all shadow-lg" href="#register">
                Enroll now
              </a>
              <a className="border border-on-primary-container text-on-primary-container px-8 py-4 rounded-lg font-bold text-center hover:border-primary-fixed hover:text-primary-fixed transition-all" href="#curriculum">
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
                  <div className="absolute inset-0 bg-background/20 flex items-center justify-center transition-all group-hover:bg-background/30">
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
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-0">
        <HeroNodeGraph />
      </div>
    </section>
  );
}
