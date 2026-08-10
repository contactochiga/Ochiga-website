"use client";

// Continuous technology-capability marquee for the Technology page.
// Deliberately a fresh component rather than a reuse/import of
// app/components/OyiCapabilitySection.tsx — that file's rail is
// explicitly out of scope to edit on this pass, so this mirrors its
// proven interaction pattern (same reasons, same fixes) without
// touching it: motion is driven ONLY by this element's own
// `scrollLeft`, tracked in a float ref rather than read back from the
// (integer-rounded) DOM property, so it can never affect the page's
// vertical scroll position and never stalls at a sub-pixel-per-frame
// speed. Icons are white line-art with a restrained blue accent
// (this page's technology accent, distinct from Ochiga red).
import { useCallback, useEffect, useRef, useState, type PointerEvent, type ReactElement, type ReactNode } from "react";

const SPEED_PX_PER_SECOND = 28;
const RESUME_DELAY_MS = 1200;
const TOUCH_RESUME_DELAY_MS = 2000;

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
    description: "Connect Oyi with the systems and services a building already uses.",
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
    description: "Deploy, configure and extend technology around each building.",
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
  {
    key: "device-integration",
    title: "Device Integration",
    description: "Bring lighting, HVAC, sensors and building devices onto one connected layer.",
    icon: () => (
      <IconShell>
        <rect x="4" y="8" width="7" height="7" rx="1" />
        <rect x="13" y="8" width="7" height="7" rx="1" />
        <path d="M7.5 4v4M16.5 4v4M7.5 15v5M16.5 15v5" />
      </IconShell>
    ),
  },
  {
    key: "maintenance-workflows",
    title: "Maintenance Workflows",
    description: "Route work orders, service requests and maintenance activity to the right team.",
    icon: () => (
      <IconShell>
        <path d="M14.5 3.5a2.1 2.1 0 1 1 3 3L7 17l-4 1 1-4L14.5 3.5z" />
        <path d="M4 20h9" />
      </IconShell>
    ),
  },
  {
    key: "reporting-audit",
    title: "Reporting & Audit",
    description: "A clear record of building activity, decisions and outcomes over time.",
    icon: () => (
      <IconShell>
        <rect x="5" y="3" width="14" height="18" rx="1.5" />
        <path d="M8.5 8h7M8.5 12h7M8.5 16h4" />
      </IconShell>
    ),
  },
  {
    key: "edge-intelligence",
    title: "Edge / Local Intelligence",
    description: "Awareness and decisions that can run close to the building, not only in the cloud.",
    icon: () => (
      <IconShell>
        <rect x="8" y="8" width="8" height="8" rx="1" />
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.5 5.5l2 2M16.5 5.5l-2 2M5.5 18.5l2-2M16.5 18.5l-2-2" />
      </IconShell>
    ),
  },
];

function CapabilityContent({ capability }: { capability: Capability }) {
  return (
    <>
      <span className="text-ochiga-white/85">
        <capability.icon />
      </span>
      <p className="mt-5 text-sm font-medium text-ochiga-white">{capability.title}</p>
      <p className="mt-2 text-sm leading-relaxed text-ochiga-white/50">{capability.description}</p>
    </>
  );
}

function itemClassName(index: number) {
  return `w-[220px] flex-shrink-0 px-6 first:pl-0 md:w-[230px] ${index > 0 ? "border-l border-ochiga-white/10" : ""}`;
}

export default function TechnologyCapabilityRail() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const resumeAtRef = useRef(0);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollLeftRef = useRef(0);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => setReducedMotion(query.matches);
    applyPreference();
    query.addEventListener("change", applyPreference);
    return () => query.removeEventListener("change", applyPreference);
  }, []);

  const onPointerMove = useCallback((event: globalThis.PointerEvent) => {
    if (!isDraggingRef.current || !railRef.current) return;
    const delta = event.clientX - dragStartXRef.current;
    railRef.current.scrollLeft = dragStartScrollLeftRef.current - delta;
  }, []);

  const onPointerUp = useCallback(() => {
    isDraggingRef.current = false;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
    resumeAtRef.current = Date.now() + RESUME_DELAY_MS;
  }, [onPointerMove]);

  useEffect(() => {
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  // Moves ONLY this element's own scrollLeft — never window/document
  // scroll, and never scrollIntoView. Position is tracked in a float
  // ref rather than by reading back element.scrollLeft each frame,
  // since scrollLeft is rounded to an integer pixel and the per-frame
  // increment at this speed is under 1px.
  useEffect(() => {
    if (reducedMotion) return;
    const rail = railRef.current;
    const firstSet = firstSetRef.current;
    if (!rail || !firstSet) return;

    scrollPositionRef.current = rail.scrollLeft;

    const step = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time;
      const deltaMs = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (document.hidden || isDraggingRef.current || Date.now() < resumeAtRef.current) {
        scrollPositionRef.current = rail.scrollLeft;
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      const setWidth = firstSet.scrollWidth;
      if (setWidth > 0) {
        let next = scrollPositionRef.current + (SPEED_PX_PER_SECOND * deltaMs) / 1000;
        if (next >= setWidth) next -= setWidth;
        scrollPositionRef.current = next;
        rail.scrollLeft = next;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [reducedMotion]);

  const onPointerEnter = () => {
    resumeAtRef.current = Infinity;
  };

  const onPointerLeave = () => {
    if (!isDraggingRef.current) resumeAtRef.current = Date.now() + RESUME_DELAY_MS;
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") {
      resumeAtRef.current = Date.now() + TOUCH_RESUME_DELAY_MS;
      return;
    }
    isDraggingRef.current = true;
    resumeAtRef.current = Infinity;
    dragStartXRef.current = event.clientX;
    dragStartScrollLeftRef.current = railRef.current?.scrollLeft || 0;
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onWheel = () => {
    resumeAtRef.current = Date.now() + RESUME_DELAY_MS;
  };

  if (reducedMotion) {
    return (
      <div aria-label="Technology capabilities" className="no-scrollbar flex overflow-x-auto pb-2 text-left">
        {CAPABILITIES.map((capability, index) => (
          <div key={capability.key} className={itemClassName(index)}>
            <CapabilityContent capability={capability} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={railRef}
      aria-label="Technology capabilities"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onWheel={onWheel}
      className="no-scrollbar flex cursor-grab overflow-x-auto pb-2 text-left active:cursor-grabbing"
    >
      <div ref={firstSetRef} className="flex flex-shrink-0">
        {CAPABILITIES.map((capability, index) => (
          <div key={`a-${capability.key}`} className={itemClassName(index)}>
            <CapabilityContent capability={capability} />
          </div>
        ))}
      </div>
      <div aria-hidden className="flex flex-shrink-0">
        {CAPABILITIES.map((capability) => (
          <div key={`b-${capability.key}`} className="w-[220px] flex-shrink-0 border-l border-ochiga-white/10 px-6 md:w-[230px]">
            <CapabilityContent capability={capability} />
          </div>
        ))}
      </div>
    </div>
  );
}
