"use client";

// A horizontal story rail of Insight cards — reuses InsightCard (the
// same component the homepage's "Recent Ochiga perspectives" section
// uses) rather than a parallel implementation. As more Sanity articles
// are added the rail simply becomes more scrollable, never forcing the
// page layout to change.
//
// The control line (prev/next + a scroll-position indicator) moves
// ONLY this element's own scrollLeft via scrollBy() — never
// scrollIntoView, so it can never touch the page's vertical scroll
// position. There's no fixed slide count to drive per-item dots (the
// list can grow), so the indicator is a simple proportional bar
// instead, in the same restrained visual language as the site's other
// progress tracks.
import { useEffect, useRef, useState } from "react";
import InsightCard from "@/app/components/InsightCard";
import type { Insight } from "@/lib/content";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d={direction === "left" ? "M14 6l-6 6 6 6" : "M10 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function PerspectiveRail({ insights }: { insights: Insight[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [scrollFraction, setScrollFraction] = useState(0);
  const [canScroll, setCanScroll] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const updateScrollState = () => {
    const rail = railRef.current;
    if (!rail) return;
    const max = rail.scrollWidth - rail.clientWidth;
    setCanScroll(max > 4);
    setScrollFraction(max > 0 ? rail.scrollLeft / max : 0);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insights.length]);

  const scrollByPage = (direction: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * rail.clientWidth * 0.9, behavior: reducedMotion ? "auto" : "smooth" });
  };

  if (insights.length === 0) return null;

  return (
    <div>
      <div
        ref={railRef}
        onScroll={updateScrollState}
        role="group"
        aria-label="Ochiga Perspective stories"
        className="no-scrollbar flex gap-6 overflow-x-auto pb-2"
      >
        {insights.map((insight) => (
          <div key={insight.slug} className="w-[300px] flex-shrink-0 md:w-[340px]">
            <InsightCard insight={insight} />
          </div>
        ))}
      </div>

      {canScroll ? (
        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => scrollByPage(-1)}
            aria-label="Previous stories"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/60 transition-colors duration-base hover:border-ochiga-white/35 hover:text-ochiga-white"
          >
            <ArrowIcon direction="left" />
          </button>

          <div className="h-1.5 w-28 overflow-hidden rounded-full bg-ochiga-white/10">
            <div
              className="h-full rounded-full bg-ochiga-red transition-[width] duration-base ease-editorial"
              style={{ width: `${Math.max(10, scrollFraction * 100)}%` }}
            />
          </div>

          <button
            type="button"
            onClick={() => scrollByPage(1)}
            aria-label="Next stories"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/60 transition-colors duration-base hover:border-ochiga-white/35 hover:text-ochiga-white"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
