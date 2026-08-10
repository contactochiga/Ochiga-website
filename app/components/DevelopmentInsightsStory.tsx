"use client";

// Development Insights story — reuses the site's hero/story control
// language (pause/play, dot->pill progress, prev/next) via the shared
// useStoryPlayer hook. Backed by the same generic getAllInsights()
// architecture the homepage already uses; there is no supported
// "Development" category in the current Sanity schema or fallback
// content to filter on (checked lib/content.ts, sanity/schemas/
// category.ts, lib/papers.ts, lib/insights.ts — categories are
// editor-defined free text, none of it "Development"), so this
// deliberately does not invent a filter that would silently show
// nothing. Each story still surfaces its own real category as its
// eyebrow.
import Link from "next/link";
import AbstractSurface from "@/app/components/AbstractSurface";
import { useStoryPlayer } from "@/app/hooks/useStoryPlayer";
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

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M6 4.5v15l13-7.5-13-7.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M6 4.5h4v15H6v-15zm8 0h4v15h-4v-15z" />
    </svg>
  );
}

const AUTOPLAY_MS = 7000;
const PANEL_ID = "development-insights-panel";

export default function DevelopmentInsightsStory({ insights }: { insights: Insight[] }) {
  const { activeIndex, isPlaying, reducedMotion, multiSlide, goTo, goNext, goPrev, togglePlay } = useStoryPlayer(
    insights.length,
    AUTOPLAY_MS
  );

  if (insights.length === 0) return null;
  const active = insights[activeIndex];

  return (
    <div className="mx-auto max-w-wide">
      <div key={active.slug} className={reducedMotion ? "" : "animate-hero-in"}>
        <div className="overflow-hidden rounded border border-ochiga-white/10">
          <AbstractSurface tone="charcoal" aspect="aspect-[16/6]" label={active.category} />
        </div>
        <div className="mx-auto mt-8 max-w-2xl text-center">
          <p id={PANEL_ID} className="text-xs uppercase tracking-wide text-ochiga-red">
            {active.category}
          </p>
          <h3 className="mt-3 font-display text-2xl text-ochiga-white md:text-3xl">{active.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-ochiga-white/60 md:text-base">{active.summary}</p>
          <Link
            href={`/insights/${active.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ochiga-white transition-colors duration-base hover:text-ochiga-white/75"
          >
            Read Insight
            <ArrowIcon direction="right" />
          </Link>
        </div>
      </div>

      {multiSlide ? (
        <div className="mt-10 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous insight"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/60 transition-colors duration-base hover:border-ochiga-white/35 hover:text-ochiga-white"
          >
            <ArrowIcon direction="left" />
          </button>

          <div
            role="group"
            aria-label="Development Insights controls"
            className="flex items-center gap-3 rounded-full border border-ochiga-white/10 bg-ochiga-white/5 px-3 py-2"
          >
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
              className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ochiga-white/10 text-ochiga-white/80 transition-colors duration-base hover:bg-ochiga-white/20 hover:text-ochiga-white"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            <div role="tablist" aria-label="Development Insights" className="flex items-center gap-2">
              {insights.map((insight, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={insight.slug}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={PANEL_ID}
                    aria-label={`Go to insight: ${insight.title}`}
                    onClick={() => goTo(index)}
                    className="group flex h-7 items-center justify-center p-1"
                  >
                    <span
                      aria-hidden
                      className={`relative block overflow-hidden rounded-full transition-all duration-base ease-editorial ${
                        isActive ? "h-1.5 w-7 bg-ochiga-white/25" : "h-1.5 w-1.5 bg-ochiga-white/30 group-hover:bg-ochiga-white/55"
                      }`}
                    >
                      {isActive && !reducedMotion ? (
                        <span
                          key={`fill-${activeIndex}`}
                          className="absolute inset-y-0 left-0 block rounded-full bg-ochiga-red"
                          style={{
                            width: "0%",
                            animationName: "hero-progress",
                            animationDuration: `${AUTOPLAY_MS}ms`,
                            animationTimingFunction: "linear",
                            animationFillMode: "forwards",
                            animationPlayState: isPlaying ? "running" : "paused",
                          }}
                        />
                      ) : null}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next insight"
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/60 transition-colors duration-base hover:border-ochiga-white/35 hover:text-ochiga-white"
          >
            <ArrowIcon direction="right" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
