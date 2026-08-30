"use client";

import React, { useEffect, useRef, useState } from 'react';
import { curriculumSteps } from '@/constants/curriculum';

export default function Curriculum() {
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [revealed, setRevealed] = useState<boolean[]>(
    () => curriculumSteps.map(() => false)
  );

  useEffect(() => {
    // Reduced-motion users see everything rendered up-front via the
    // `motion-reduce:*` utilities below, so no special-casing is needed here.
    const els = itemRefs.current.filter(Boolean) as HTMLLIElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.index);
          setRevealed((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.3, rootMargin: '0px 0px -10% 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-margin-lg px-gutter-md bg-background overflow-hidden" id="curriculum">
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-12">
          <span className="font-label-caps text-label-caps text-primary-fixed mb-2 block">CURRICULUM OVERVIEW</span>
          <h2 className="font-headline-lg text-headline-lg text-primary mb-4">A Comprehensive Roadmap to Mastery</h2>
          <div className="w-20 h-1.5 bg-primary-fixed mx-auto rounded-full"></div>
          <p className="font-body-md text-secondary mt-6 max-w-2xl mx-auto">
            8 specialized modules designed to take you from market basics to building your own AI-powered trading systems.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-14 max-w-5xl mx-auto">
          {curriculumSteps.map((s, i) => {
            // Rail runs from the first dot to the last dot of each column.
            // Mobile = one column (first: 0, last: 7); md = two columns
            // (firsts: 0 & 1, lasts: 6 & 7).
            const railTop =
              i === 0
                ? 'top-1/2 md:top-1/2'
                : i === 1
                ? 'top-0 md:top-1/2'
                : 'top-0';
            const railBottom =
              i === 7
                ? 'bottom-1/2 md:bottom-1/2'
                : i === 6
                ? 'bottom-0 md:bottom-1/2'
                : 'bottom-0';

            return (
              <li
                key={s.step}
                ref={(el) => { itemRefs.current[i] = el; }}
                data-index={i}
                className="relative pl-8 md:pl-9 py-5"
              >
                {/* base rail */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[5px] w-px -translate-x-1/2 bg-outline-variant ${railTop} ${railBottom}`}
                />
                {/* progress fill */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[5px] w-px -translate-x-1/2 origin-top bg-primary-fixed transition-transform duration-700 ease-out motion-reduce:transition-none motion-reduce:scale-y-100 ${railTop} ${railBottom} ${
                    revealed[i] ? 'scale-y-100' : 'scale-y-0'
                  }`}
                />
                {/* node dot */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[5px] top-1/2 z-10 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ring-4 ring-background transition-colors duration-500 motion-reduce:transition-none motion-reduce:bg-primary-fixed ${
                    revealed[i] ? 'bg-primary-fixed' : 'bg-outline-variant'
                  }`}
                />

                {/* pill */}
                <div
                  className={`group flex w-full min-h-[3.75rem] items-center gap-3 rounded-full border border-outline-variant bg-surface-container px-5 py-3 transition-all duration-500 ease-out hover:-translate-y-0.5 hover:border-primary-fixed hover:bg-surface-container-high hover:shadow-[0_10px_28px_-10px] hover:shadow-primary-fixed/40 motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:opacity-100 ${
                    revealed[i] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'
                  }`}
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold transition-transform duration-300 group-hover:scale-110">
                    {s.step}
                  </span>
                  <span className="font-bold text-sm lg:text-base leading-snug text-primary">
                    {s.title}
                  </span>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
