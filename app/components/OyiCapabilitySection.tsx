"use client";

// "Technology-Enabled by Design" — sells Oyi as infrastructure for any
// development, Ochiga's own or third-party. The capability rail below
// is data-driven (CAPABILITIES array) so a ninth/tenth item is a
// one-line addition, not a section rebuild.
//
// The rail's story controls (pause/play, dot->pill indicator, prev/
// next) intentionally mirror the interaction language established by
// the homepage/Development hero (StoryCarousel / HomeHeroCarousel),
// adapted locally here rather than by editing either of those files —
// both are explicitly out of scope for this pass.
import { useCallback, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import Link from "next/link";
import { ctas } from "@/lib/company";

const AUTOPLAY_MS = 8000;
const SCROLL_SYNC_DEBOUNCE_MS = 120;

type Capability = { key: string; title: string; description: string; icon: () => ReactElement };

function IconShell({ children }: { children: ReactNode }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      {children}
    </svg>
  );
}

const CAPABILITIES: Capability[] = [
  {
    key: "open-api",
    title: "Open API",
    description: "Connect Oyi with the systems and services a development already uses.",
    icon: () => (
      <IconShell>
        <circle cx="12" cy="12" r="2.2" />
        <circle cx="12" cy="4" r="1.6" />
        <circle cx="5" cy="16" r="1.6" />
        <circle cx="19" cy="16" r="1.6" />
        <path d="M12 6.2V10M10.3 13.3 6.4 15M13.7 13.3l3.9 1.7" />
      </IconShell>
    ),
  },
  {
    key: "facility-operations",
    title: "Facility Operations",
    description: "One operating layer for infrastructure, assets, utilities and building teams.",
    icon: () => (
      <IconShell>
        <rect x="5" y="4" width="14" height="17" rx="1" />
        <path d="M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1" />
      </IconShell>
    ),
  },
  {
    key: "resident-experience",
    title: "Resident Experience",
    description: "One connected interface for residents, services and everyday building interaction.",
    icon: () => (
      <IconShell>
        <path d="M4 11.5 12 5l8 6.5" />
        <path d="M6 10v10h12V10" />
        <circle cx="12" cy="14.2" r="1.6" />
        <path d="M9 19c0-2 1.3-3.2 3-3.2s3 1.2 3 3.2" />
      </IconShell>
    ),
  },
  {
    key: "real-time-intelligence",
    title: "Real-Time Intelligence",
    description: "Turn live building data into awareness, decisions and action.",
    icon: () => (
      <IconShell>
        <path d="M3 12h4l2-7 4 14 2-7h6" />
      </IconShell>
    ),
  },
  {
    key: "developer-control",
    title: "Developer Control",
    description: "Deploy, configure and extend technology around each development.",
    icon: () => (
      <IconShell>
        <path d="M4 6h16" />
        <circle cx="9" cy="6" r="1.8" fill="currentColor" stroke="none" />
        <path d="M4 12h16" />
        <circle cx="15" cy="12" r="1.8" fill="currentColor" stroke="none" />
        <path d="M4 18h16" />
        <circle cx="11" cy="18" r="1.8" fill="currentColor" stroke="none" />
      </IconShell>
    ),
  },
  {
    key: "utilities-metering",
    title: "Utilities & Metering",
    description: "Connect electricity, water, energy monitoring, smart meters and infrastructure services.",
    icon: () => (
      <IconShell>
        <path d="M8 3c0 4-4 6-4 10a4 4 0 0 0 8 0c0-4-4-6-4-10z" />
        <path d="M16.5 9 14 13h3l-2.5 4" />
      </IconShell>
    ),
  },
  {
    key: "access-security",
    title: "Access & Security",
    description: "Coordinate access control, visitors, locks, cameras and security events across the building.",
    icon: () => (
      <IconShell>
        <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
        <circle cx="12" cy="12" r="1.4" />
        <path d="M12 13.4V16" />
      </IconShell>
    ),
  },
  {
    key: "automation-services",
    title: "Automation & Services",
    description: "Connect devices, maintenance, service workflows and intelligent automation into one operating environment.",
    icon: () => (
      <IconShell>
        <path d="M12 3l7 4v10l-7 4-7-4V7l7-4z" />
        <path d="M12 3v18M5 7l7 4 7-4" />
      </IconShell>
    ),
  },
];

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

function CapabilityRail() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pausedByRef = useRef<"user" | "system" | null>(null);
  const elapsedRef = useRef(0);
  const startedAtRef = useRef<number | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const scrollSyncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = "oyi-capability-panel";

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

  const goTo = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const next = ((index % CAPABILITIES.length) + CAPABILITIES.length) % CAPABILITIES.length;
    setActiveIndex(next);
    itemRefs.current[next]?.scrollIntoView({ behavior, inline: "start", block: "nearest" });
  }, []);

  const goNext = useCallback(() => goTo(activeIndex + 1, reducedMotion ? "auto" : "smooth"), [goTo, activeIndex, reducedMotion]);
  const goPrev = useCallback(() => goTo(activeIndex - 1, reducedMotion ? "auto" : "smooth"), [goTo, activeIndex, reducedMotion]);

  useEffect(() => {
    elapsedRef.current = 0;
  }, [activeIndex]);

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

  // Keeps the active dot in sync when a visitor swipes/scrolls the rail
  // natively instead of using the controls.
  const onRailScroll = () => {
    if (scrollSyncTimer.current) clearTimeout(scrollSyncTimer.current);
    scrollSyncTimer.current = setTimeout(() => {
      const rail = railRef.current;
      if (!rail) return;
      let closest = 0;
      let closestDistance = Infinity;
      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        const distance = Math.abs(item.offsetLeft - rail.scrollLeft);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = index;
        }
      });
      setActiveIndex((current) => (current === closest ? current : closest));
    }, SCROLL_SYNC_DEBOUNCE_MS);
  };

  return (
    <div>
      <div
        ref={railRef}
        role="tabpanel"
        id={panelId}
        onScroll={onRailScroll}
        className="flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth pb-2 text-left"
      >
        {CAPABILITIES.map((capability, index) => (
          <div
            key={capability.key}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            className={`w-[220px] flex-shrink-0 snap-start px-6 first:pl-0 md:w-[230px] ${
              index > 0 ? "border-l border-ochiga-white/10" : ""
            }`}
          >
            <span className="text-ochiga-white/85">
              <capability.icon />
            </span>
            <p className="mt-5 text-sm font-medium text-ochiga-white">{capability.title}</p>
            <p className="mt-2 text-sm leading-relaxed text-ochiga-white/50">{capability.description}</p>
          </div>
        ))}
      </div>

      {/* Story controls — same interaction language as the site's hero
          carousels (pause/play, dot->pill progress, prev/next), laid
          out inline here rather than floating over a background. */}
      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous capability"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/60 transition-colors duration-base hover:border-ochiga-white/35 hover:text-ochiga-white"
        >
          <ArrowIcon direction="left" />
        </button>

        <div
          role="group"
          aria-label="Oyi capability controls"
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

          <div role="tablist" aria-label="Oyi capabilities" className="flex items-center gap-2">
            {CAPABILITIES.map((capability, index) => {
              const isActive = index === activeIndex;
              return (
                <button
                  key={capability.key}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={panelId}
                  aria-label={`Go to ${capability.title}`}
                  onClick={() => goTo(index, reducedMotion ? "auto" : "smooth")}
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
                        className="absolute inset-y-0 left-0 block rounded-full bg-oyi-blue"
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
          aria-label="Next capability"
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/60 transition-colors duration-base hover:border-ochiga-white/35 hover:text-ochiga-white"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </div>
  );
}

export default function OyiCapabilitySection() {
  return (
    <section className="px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-wide text-center">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">Technology-Enabled by Design</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight tracking-tight text-ochiga-white md:text-4xl">
          Build intelligence into your development from day one.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Oyi connects building operations, resident experiences, infrastructure and services through
          an open platform designed to integrate early and evolve long after handover.
        </p>

        <div className="mt-12">
          <CapabilityRail />
        </div>

        <div className="mt-10">
          <Link href={ctas.requestOyiDeployment.href} className="text-sm font-medium text-oyi-blue transition-colors duration-base hover:text-oyi-blue-bright">
            Build with Oyi →
          </Link>
        </div>
      </div>
    </section>
  );
}
