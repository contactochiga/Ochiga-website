import type { ReactElement, ReactNode } from "react";
import CTAButton from "@/app/components/CTAButton";
import AbstractSurface from "@/app/components/AbstractSurface";
import PlaceholderNotice from "@/app/components/PlaceholderNotice";
import { ctas } from "@/lib/company";

// "Technology-Enabled by Design" — sells Oyi as infrastructure for any
// development, Ochiga's own or third-party. The capability list below
// is deliberately just data: appending a sixth (or tenth) capability
// later is a one-line addition, not a section rebuild.
type Capability = { key: string; title: string; description: string; icon: () => ReactElement };

function IconShell({ children }: { children: ReactNode }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
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
        <path d="M9 3v5M15 3v5M7 8h10v4a5 5 0 0 1-10 0V8z" />
        <path d="M12 17v4" />
      </IconShell>
    ),
  },
  {
    key: "facility-operations",
    title: "Facility Operations",
    description: "One operating layer for infrastructure, assets, utilities and building teams.",
    icon: () => (
      <IconShell>
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
      </IconShell>
    ),
  },
  {
    key: "resident-experience",
    title: "Resident Experience",
    description: "One connected interface for residents, services and everyday building interaction.",
    icon: () => (
      <IconShell>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c0-4 3-6 7-6s7 2 7 6" />
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
        <path d="M4 6h9M4 18h6" />
        <path d="M4 12h16" />
        <circle cx="16" cy="6" r="2" />
        <circle cx="12" cy="18" r="2" />
        <circle cx="9" cy="12" r="2" />
      </IconShell>
    ),
  },
];

function TechnologyVisualPlaceholder() {
  return (
    <div className="relative overflow-hidden rounded border border-ochiga-white/10">
      <AbstractSurface tone="black" aspect="aspect-[16/7]" />
      <svg
        aria-hidden
        viewBox="0 0 400 175"
        className="absolute inset-0 h-full w-full text-ochiga-white/25"
        preserveAspectRatio="xMidYMid meet"
      >
        <path d="M150 140V60l50-25 50 25v80" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M150 90h100M150 115h100" stroke="currentColor" strokeWidth="1" />
        <g stroke="currentColor" strokeWidth="1">
          <path d="M200 35V15M80 60l70-16M320 60l-70-16M80 150l70-45M320 150l-70-45" />
        </g>
        <circle cx="200" cy="15" r="4" className="text-ochiga-red" fill="currentColor" stroke="none" />
        <circle cx="80" cy="60" r="3.5" fill="currentColor" />
        <circle cx="320" cy="60" r="3.5" fill="currentColor" />
        <circle cx="80" cy="150" r="3.5" fill="currentColor" />
        <circle cx="320" cy="150" r="3.5" fill="currentColor" />
      </svg>
      <PlaceholderNotice note="technology visual — replace this SVG placeholder with a clean 2D architectural/building diagram with subtle connected technology/data overlays once that asset exists in the repository. No fabricated telemetry." />
    </div>
  );
}

export default function OyiCapabilitySection() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-24">
      <div className="mx-auto max-w-wide text-center">
        <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">Technology-Enabled by Design</p>
        <h2 className="mx-auto mt-4 max-w-2xl font-display text-3xl leading-tight tracking-tight text-ochiga-white md:text-4xl">
          Build intelligence into your development from day one.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Oyi connects building operations, resident experiences, infrastructure and services through
          an open platform designed to integrate early and evolve long after handover.
        </p>

        <div className="mt-12 flex gap-4 overflow-x-auto pb-2 text-left md:grid md:grid-cols-5 md:overflow-visible">
          {CAPABILITIES.map((capability) => (
            <div
              key={capability.key}
              className="min-w-[230px] flex-shrink-0 rounded border border-ochiga-white/10 bg-ochiga-white/5 p-5 backdrop-blur-sm md:min-w-0"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/70">
                <capability.icon />
              </span>
              <p className="mt-4 text-sm font-medium text-ochiga-white">{capability.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-ochiga-white/55">{capability.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <TechnologyVisualPlaceholder />
        </div>

        <div className="mt-12">
          <CTAButton href={ctas.requestOyiDeployment.href}>Build with Oyi →</CTAButton>
        </div>
      </div>
    </section>
  );
}
