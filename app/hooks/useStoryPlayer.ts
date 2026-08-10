"use client";

// Shared discrete-slide autoplay state machine: elapsed-time-aware
// pause/resume (a pause never loses progress, a resume continues the
// same countdown rather than restarting it), prefers-reduced-motion
// detection, and tab-visibility auto-pause with user-pause persistence
// (a manual pause is never overridden by the page becoming visible
// again). This is pure state/logic — no DOM refs, no scroll APIs of
// any kind — so nothing built on it can accidentally move the page's
// scroll position the way scrollIntoView-based code can.
//
// Extracted for the Development Insights story (app/components/
// DevelopmentInsightsStory.tsx). The homepage/Development hero
// carousels (HomeHeroCarousel.tsx, StoryCarousel.tsx) keep their own
// inline copy of this same pattern — both are out of scope to edit.
import { useCallback, useEffect, useRef, useState } from "react";

export function useStoryPlayer(count: number, autoplayMs = 8000) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(count > 1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const pausedByRef = useRef<"user" | "system" | null>(null);
  const elapsedRef = useRef(0);
  const startedAtRef = useRef<number | null>(null);
  const multiSlide = count > 1;

  useEffect(() => {
    if (!multiSlide) return;
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
  }, [multiSlide]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  useEffect(() => {
    elapsedRef.current = 0;
  }, [activeIndex]);

  useEffect(() => {
    if (!multiSlide || !isPlaying) {
      if (startedAtRef.current !== null) {
        elapsedRef.current += Date.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
      return;
    }
    startedAtRef.current = Date.now();
    const remaining = Math.max(autoplayMs - elapsedRef.current, 0);
    const timer = setTimeout(goNext, remaining);
    return () => {
      clearTimeout(timer);
      if (startedAtRef.current !== null) {
        elapsedRef.current += Date.now() - startedAtRef.current;
        startedAtRef.current = null;
      }
    };
  }, [multiSlide, isPlaying, activeIndex, goNext, autoplayMs]);

  useEffect(() => {
    if (!multiSlide) return;
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
  }, [multiSlide, isPlaying]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pausedByRef.current = "user";
      setIsPlaying(false);
    } else {
      pausedByRef.current = null;
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return { activeIndex, isPlaying, reducedMotion, multiSlide, goTo, goNext, goPrev, togglePlay };
}
