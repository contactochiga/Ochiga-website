// The connected development-journey diagram for "What Ochiga Brings
// Together" — thin line-icon nodes on a single horizontal line.
// Distinct from ProcessFlow (which renders the pill-and-arrow style
// used elsewhere, e.g. the homepage) so that pattern stays untouched.
//
// Stages carry a stable `key` (not the label text) so the icon lookup
// below survives future copy edits. Nodes are plain, non-interactive
// markers today; the hover state and per-node structure are already in
// place so a later pass can make the active stage clickable/animated
// without reworking this component.
import type { ReactElement, ReactNode } from "react";

export type JourneyStage = { key: string; label: string };

function IconShell({ children }: { children: ReactNode }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      {children}
    </svg>
  );
}

const ICONS: Record<string, () => ReactElement> = {
  land: () => (
    <IconShell>
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </IconShell>
  ),
  strategy: () => (
    <IconShell>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <path d="M12 10v4M10 12h4" />
    </IconShell>
  ),
  design: () => (
    <IconShell>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </IconShell>
  ),
  capital: () => (
    <IconShell>
      <path d="M4 20V14M10 20V9M16 20V5M2 20h20" />
    </IconShell>
  ),
  delivery: () => (
    <IconShell>
      <path d="M2 9h13v8H2z" />
      <path d="M15 12h3l3 3v2h-6z" />
      <circle cx="6.5" cy="19" r="1.5" />
      <circle cx="17.5" cy="19" r="1.5" />
    </IconShell>
  ),
  sales: () => (
    <IconShell>
      <path d="M4 7h13M14 4l3 3-3 3" />
      <path d="M20 17H7M10 14l-3 3 3 3" />
    </IconShell>
  ),
  technology: () => (
    <IconShell>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
    </IconShell>
  ),
  operations: () => (
    <IconShell>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </IconShell>
  ),
  // Additive keys for the Technology page's Traditional-vs-Ochiga
  // process comparison — the eight keys above are untouched, so
  // Development's existing usage renders identically.
  build: () => (
    <IconShell>
      <path d="M3 21h18" />
      <path d="M6 21V10l6-5 6 5v11" />
      <path d="M10 21v-6h4v6" />
    </IconShell>
  ),
  connect: () => (
    <IconShell>
      <circle cx="6" cy="6" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="12" cy="18" r="2.5" />
      <path d="M8.2 7.3 10.5 16M15.8 7.3 13.5 16M8.5 6h7" />
    </IconShell>
  ),
  handover: () => (
    <IconShell>
      <path d="M3 12h12" />
      <path d="M11 7l4 5-4 5" />
      <path d="M17 5v14" />
    </IconShell>
  ),
  operate: () => (
    <IconShell>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </IconShell>
  ),
  learn: () => (
    <IconShell>
      <path d="M2 8l10-4 10 4-10 4-10-4z" />
      <path d="M6 10v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
    </IconShell>
  ),
  improve: () => (
    <IconShell>
      <path d="M3 17l5-5 4 4 8-8" />
      <path d="M15 7h5v5" />
    </IconShell>
  ),
  // Additive keys for the Private page's traditional-vs-private
  // relationship comparison and its Apply→Qualify→Access→Participate→
  // Grow sequence — the keys above are untouched, so Development and
  // Technology render identically.
  project: () => (
    <IconShell>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v3h3" />
      <path d="M9 12h6M9 15h6M9 9h3" />
    </IconShell>
  ),
  marketing: () => (
    <IconShell>
      <path d="M3 11v2a2 2 0 0 0 2 2h1l2 5 2-1-1.5-4H10l7 4V7l-7 4H6a2 2 0 0 0-2 2z" />
      <path d="M19 9a4 4 0 0 1 0 6" />
    </IconShell>
  ),
  buyer: () => (
    <IconShell>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    </IconShell>
  ),
  member: () => (
    <IconShell>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="10.5" r="2.6" />
      <path d="M7 17.5c1-2 2.8-3 5-3s4 1 5 3" />
    </IconShell>
  ),
  profile: () => (
    <IconShell>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <circle cx="9.5" cy="10" r="2" />
      <path d="M6.5 16c.7-1.6 2-2.4 3-2.4s2.3.8 3 2.4" />
      <path d="M14.5 9h3M14.5 12h3" />
    </IconShell>
  ),
  opportunity: () => (
    <IconShell>
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5z" />
    </IconShell>
  ),
  participation: () => (
    <IconShell>
      <circle cx="8.5" cy="9" r="3" />
      <circle cx="15.5" cy="9" r="3" />
      <path d="M4 19c.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4" />
      <path d="M11 19c.6-2.6 2.4-4 4.5-4s3.9 1.4 4.5 4" />
    </IconShell>
  ),
  relationship: () => (
    <IconShell>
      <circle cx="9" cy="12" r="5" />
      <circle cx="15" cy="12" r="5" />
    </IconShell>
  ),
  future: () => (
    <IconShell>
      <path d="M4 12h13" />
      <path d="M13 7l4 5-4 5" />
      <path d="M4 7v10" />
    </IconShell>
  ),
  apply: () => (
    <IconShell>
      <path d="M6 3h9l3 3v15H6z" />
      <path d="M15 3v3h3" />
      <path d="M14.5 3.5a2.1 2.1 0 1 1 3 3L14 10l-3 1 1-3z" />
    </IconShell>
  ),
  qualify: () => (
    <IconShell>
      <path d="M12 3l7 3v6c0 5-3.5 7.5-7 9-3.5-1.5-7-4-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </IconShell>
  ),
  access: () => (
    <IconShell>
      <rect x="5" y="11" width="14" height="9" rx="1.5" />
      <path d="M8 11V8a4 4 0 0 1 7.4-2" />
      <circle cx="12" cy="15.5" r="1.4" />
    </IconShell>
  ),
  grow: () => (
    <IconShell>
      <path d="M3 21h18" />
      <path d="M6 21v-6c3 0 3-3 6-3s3 3 6 3v6" />
    </IconShell>
  ),
};

export default function DevelopmentJourney({ stages }: { stages: JourneyStage[] }) {
  return (
    <div className="overflow-x-auto">
      <ol aria-label="Ochiga development process" className="flex min-w-max items-start md:min-w-0">
        {stages.map((stage, index) => {
          const isFirst = index === 0;
          const Icon = ICONS[stage.key] || ICONS.land;
          return (
            <li key={stage.key} className="group flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-4 px-2 md:px-1">
                <span
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border transition-colors duration-base md:h-16 md:w-16 ${
                    isFirst
                      ? "border-ochiga-red text-ochiga-red"
                      : "border-ochiga-white/25 text-ochiga-white group-hover:border-ochiga-red/60 group-hover:text-ochiga-red"
                  }`}
                >
                  <Icon />
                </span>
                <span className="whitespace-nowrap text-sm text-ochiga-white/70">{stage.label}</span>
              </div>
              {index < stages.length - 1 ? (
                <span aria-hidden className="mx-2 h-px flex-1 bg-ochiga-white/15 md:mx-4" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
