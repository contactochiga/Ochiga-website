"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import Link from "next/link";
import AbstractSurface from "@/app/components/AbstractSurface";
import type { Insight } from "@/lib/content";

const AUTOPLAY_MS = 8000;
const SWIPE_THRESHOLD_PX = 48;

type Slide = {
  key: string;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  tone: "black" | "charcoal" | "red";
  image?: {
    src: string;
    alt: string;
    position?: string;
    // Desktop-only crop bias (md:scale + md:origin) that nudges busy
    // interface/dashboard content further right without the aggressive
    // zoom a pure crop would need to hide it entirely.
    desktopCrop?: string;
    // Directional left→right legibility scrim (not a flat darken) so the
    // hero copy's corner stays readable while the right side of the image
    // stays fully vivid. CSS linear-gradient() value.
    leftScrim?: string;
  };
  surfaceLabel?: string;
};

function buildSlides(insight: Insight | null): Slide[] {
  return [
    {
      key: "development",
      eyebrow: "Ochiga Development",
      title: "We develop real estate. We create intelligent places.",
      description:
        "Architecture, engineering and technology are designed together from the outset — so every Ochiga development is built to operate, learn and evolve, not just to be handed over.",
      ctaLabel: "Explore Development",
      ctaHref: "/development",
      tone: "charcoal",
      image: {
        src: "/images/development/development-construction-network.webp",
        alt: "High-rise development under construction, overlaid with a connected technology network",
      },
    },
    {
      key: "oyi",
      eyebrow: "Oyi",
      title: "Buildings should not stop evolving after construction.",
      description:
        "Oyi is Ochiga's operating technology — the intelligence layer connecting people, buildings, infrastructure and hardware, long after handover.",
      ctaLabel: "Discover Oyi",
      ctaHref: "/oyi",
      tone: "red",
      image: {
        src: "/images/oyi/oyi-hero-operating-intelligence.webp",
        alt: "Smart building lobby with live Oyi intelligence overlays for access control, energy, climate and security",
        // Mobile crop is unchanged from the previous pass. Desktop gets a
        // mild rightward bias plus the desktopCrop/leftScrim below —
        // pure object-position can't do more here because the hero
        // container and this image share the same ~16:9 aspect on most
        // desktop viewports, so there's little natural overflow to shift.
        position: "object-[58%_42%] md:object-[70%_44%]",
        desktopCrop: "md:scale-[1.14] md:origin-[78%_46%]",
        leftScrim:
          "linear-gradient(to right, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.5) 32%, rgba(5,5,5,0.16) 55%, rgba(5,5,5,0) 68%)",
      },
    },
    {
      key: "private",
      eyebrow: "Ochiga Private",
      title: "Private access to curated real-estate opportunity.",
      description:
        "A membership-by-request circle connecting selected investors to carefully considered acquisition, development and joint-venture opportunities — from income-generating assets to longer-term capital appreciation.",
      ctaLabel: "Request Membership",
      ctaHref: "/private/membership",
      tone: "black",
      image: {
        src: "/images/private/ochiga-private-hero.webp",
        alt: "Ochiga Private client lounge with a global investment-opportunities dashboard, lounge seating and a city skyline view",
        position: "object-[60%_44%] md:object-[68%_44%]",
        desktopCrop: "md:scale-[1.14] md:origin-[76%_46%]",
        leftScrim:
          "linear-gradient(to right, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0.48) 30%, rgba(5,5,5,0.15) 52%, rgba(5,5,5,0) 65%)",
      },
    },
    {
      key: "insights",
      eyebrow: insight?.category || "Insights",
      title: insight?.title || "Ochiga Insights.",
      description:
        insight?.summary ||
        "Ochiga perspectives on real estate development, building technology and African urbanisation.",
      ctaLabel: "Read Insight",
      ctaHref: insight ? `/insights/${insight.slug}` : "/insights",
      tone: "charcoal",
      surfaceLabel: "Ochiga Insights",
    },
  ];
}

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
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
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M6 4.5v15l13-7.5-13-7.5z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false">
      <path d="M6 4.5h4v15H6v-15zm8 0h4v15h-4v-15z" />
    </svg>
  );
}

export default function HomeHeroCarousel({ insight }: { insight: Insight | null }) {
  const slides = buildSlides(insight);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pausedByRef = useRef<"user" | "system" | null>(null);
  const touchStartXRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const startedAtRef = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      setReducedMotion(query.matches);
      if (query.matches) {
        pausedByRef.current = null;
        setIsPlaying(false);
      }
    };
    applyPreference();
    query.addEventListener("change", applyPreference);
    return () => query.removeEventListener("change", applyPreference);
  }, []);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % slides.length) + slides.length) % slides.length);
    },
    [slides.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  // A fresh slide always starts its progress at zero — whether it became
  // active via autoplay advancing or via manual navigation.
  useEffect(() => {
    elapsedRef.current = 0;
  }, [activeIndex]);

  // Schedules the next advance for whatever time remains out of the full
  // AUTOPLAY_MS, so pausing and resuming continues the same slide's
  // countdown instead of restarting it (matches the progress-pill fill,
  // which — via animation-play-state below — resumes from the same point
  // for the same reason).
  useEffect(() => {
    if (!isPlaying) {
      if (startedAtRef.current !== null) {
        elapsedRef.current += Date.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
      return;
    }
    startedAtRef.current = Date.now();
    const remaining = Math.max(AUTOPLAY_MS - elapsedRef.current, 0);
    const timer = setTimeout(goNext, remaining);
    return () => {
      clearTimeout(timer);
      if (startedAtRef.current !== null) {
        elapsedRef.current += Date.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
    };
  }, [isPlaying, activeIndex, goNext]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (isPlaying) {
          pausedByRef.current = "system";
          setIsPlaying(false);
        }
      } else if (pausedByRef.current === "system") {
        pausedByRef.current = null;
        setIsPlaying(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      pausedByRef.current = "user";
      setIsPlaying(false);
    } else {
      pausedByRef.current = null;
      setIsPlaying(true);
    }
  };

  const onTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: TouchEvent<HTMLElement>) => {
    const startX = touchStartXRef.current;
    touchStartXRef.current = null;
    if (startX === null) return;
    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined) return;
    const delta = endX - startX;
    if (Math.abs(delta) < SWIPE_THRESHOLD_PX) return;
    if (delta < 0) goNext();
    else goPrev();
  };

  const active = slides[activeIndex];

  return (
    <section
      id="hero-stage"
      aria-label="Ochiga highlights"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-24 pt-40 md:px-10 md:pb-28"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Background stack — always fully mounted so slides can cross-fade;
          purely decorative, so hidden from assistive tech (the accessible
          story lives in the single text block below). */}
      <div aria-hidden className="absolute inset-0">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.key}
              className={`absolute inset-0 transition-opacity duration-cinematic ease-editorial ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                className={`h-full w-full transition-transform duration-cinematic ease-editorial ${
                  reducedMotion ? "" : isActive ? "scale-100" : "scale-[1.06]"
                }`}
              >
                {/* Static per-slide desktop composition bias — not motion,
                    so it applies regardless of reduced-motion preference. */}
                <div className={`h-full w-full ${slide.image?.desktopCrop || ""}`}>
                  <AbstractSurface
                    tone={slide.tone}
                    aspect="h-full w-full"
                    src={slide.image?.src}
                    alt={slide.image?.alt}
                    label={slide.image ? undefined : slide.surfaceLabel}
                    objectPosition={slide.image?.position}
                  />
                </div>
              </div>
              {slide.image?.leftScrim ? (
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ backgroundImage: slide.image.leftScrim }}
                />
              ) : null}
            </div>
          );
        })}
        <div className="absolute inset-0 bg-gradient-to-t from-ochiga-black via-ochiga-black/55 to-ochiga-black/15" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(246,243,236,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(246,243,236,0.5) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      {/* Content — only the active slide's text is ever mounted, so the
          page has exactly one h1 regardless of which slide is showing. */}
      <div className="relative z-10 mx-auto w-full max-w-cinematic">
        <div
          key={active.key}
          id="hero-slide-panel"
          role="group"
          aria-label={`Slide ${activeIndex + 1} of ${slides.length}: ${active.eyebrow}`}
          className={reducedMotion ? "" : "animate-hero-in"}
        >
          <p className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">{active.eyebrow}</p>
          <h1 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ochiga-white md:text-7xl">
            {active.title}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ochiga-white/65">{active.description}</p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href={active.ctaHref}
              className="inline-flex items-center justify-center rounded bg-ochiga-red px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:bg-ochiga-red-bright"
            >
              {active.ctaLabel}
            </Link>
          </div>
        </div>
      </div>

      {/* Hero navigation arrows — pinned to the hero's left/right edges,
          vertically centered, independent of the control capsule below. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-10 flex items-center justify-between px-2 md:px-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous slide"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-ochiga-white/10 bg-ochiga-black/40 text-ochiga-white/70 backdrop-blur-md transition-colors duration-base hover:border-ochiga-white/30 hover:text-ochiga-white md:h-11 md:w-11"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next slide"
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-ochiga-white/10 bg-ochiga-black/40 text-ochiga-white/70 backdrop-blur-md transition-colors duration-base hover:border-ochiga-white/30 hover:text-ochiga-white md:h-11 md:w-11"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>

      {/* Floating control capsule — pause/play + one indicator per slide.
          Inactive slides are dots; the active slide expands into a short
          pill that fills left-to-right over the slide's autoplay duration. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center px-6 md:bottom-8">
        <div
          role="group"
          aria-label="Hero autoplay controls"
          className="pointer-events-auto flex max-w-[calc(100vw-2rem)] items-center gap-3 rounded-full border border-ochiga-white/10 bg-ochiga-black/55 px-3 py-2 backdrop-blur-md md:gap-4 md:px-4 md:py-2.5"
        >
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause autoplay" : "Play autoplay"}
            className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-ochiga-white/10 text-ochiga-white/80 transition-colors duration-base hover:bg-ochiga-white/20 hover:text-ochiga-white md:h-9 md:w-9"
          >
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <div role="tablist" aria-label="Hero slides" className="flex items-center gap-2 md:gap-2.5">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={slide.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="hero-slide-panel"
                  aria-label={`Go to slide ${index + 1}: ${slide.eyebrow}`}
                  onClick={() => goTo(index)}
                  className="group flex h-8 items-center justify-center p-1.5"
                >
                  <span
                    aria-hidden
                    className={`relative block overflow-hidden rounded-full transition-all duration-base ease-editorial ${
                      isActive ? "h-2 w-9 bg-ochiga-white/20 md:w-10" : "h-1.5 w-1.5 bg-ochiga-white/40 group-hover:bg-ochiga-white/70"
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
      </div>
    </section>
  );
}
