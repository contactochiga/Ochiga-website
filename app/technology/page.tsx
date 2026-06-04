"use client";

import Link from "next/link";

const layers = [
  { title: "Realtime", body: "Event awareness where sources exist, with calm fallback states when a live source is not configured." },
  { title: "Data Context", body: "Homes, rooms, devices, residents, visitors, and operators are tied to the physical estate record." },
  { title: "Security", body: "Invite-first activation, scoped access, protected routes, permissions, and audit trails shape every surface." },
  { title: "Devices", body: "Provider sync, registry identity, assignment, capabilities, and edge readiness keep assets governable." },
  { title: "AI", body: "AI resolves through context, permissions, source state, and safe command paths instead of floating above the system." },
  { title: "Digital Twin", body: "Spatial relationships preserve how buildings, homes, rooms, assets, incidents, and utilities connect." },
];

const stack = ["Building", "Estate Record", "Oyi Ecosystem", "Realtime Sources", "Edge + Devices", "Twin + AI"];

export default function TechnologyPage() {
  return (
    <main className="inner-page">
      <section className="inner-hero inner-hero-tech">
        <div className="inner-hero-copy animate-fade-up">
          <p>Technology</p>
          <h1>How buildings become intelligent.</h1>
          <span>
            Ochiga creates the digital infrastructure layer that lets buildings and estates understand identity, devices, access, source state, operations, and intelligence.
          </span>
          <div className="inner-hero-actions">
            <Link href="/papers/ai-for-built-environments" className="btn-primary">Read AI paper</Link>
            <Link href="/trust" className="btn-secondary">Trust posture</Link>
          </div>
        </div>
        <div className="inner-arch-panel tech-stack-visual" aria-hidden="true">
          <div className="tech-core-building" />
          <div className="tech-orbit orbit-a" />
          <div className="tech-orbit orbit-b" />
          <div className="tech-orbit orbit-c" />
          {stack.map((item, index) => (
            <span key={item} style={{ "--i": index } as React.CSSProperties}>{item}</span>
          ))}
        </div>
      </section>

      <section className="inner-section">
        <div className="inner-section-head">
          <p>Architecture-aware systems</p>
          <h2>Ochiga makes the building legible before it makes it automated.</h2>
          <span>Every intelligent action needs context: where the asset lives, who owns it, which source is live, and what permissions apply.</span>
        </div>
        <div className="inner-feature-grid">
            {layers.map((layer) => (
              <article key={layer.title} className="inner-glass-card">
                <span>{layer.title}</span>
                <p>{layer.body}</p>
              </article>
            ))}
        </div>
      </section>

      <section className="inner-section inner-split">
        <div className="inner-arch-diagram" aria-hidden="true">
          <i className="diagram-building" />
          <i className="diagram-line line-one" />
          <i className="diagram-line line-two" />
          <i className="diagram-line line-three" />
          <span className="diagram-chip chip-one">Identity</span>
          <span className="diagram-chip chip-two">Telemetry</span>
          <span className="diagram-chip chip-three">Permissions</span>
          <span className="diagram-chip chip-four">AI Context</span>
        </div>
        <div className="inner-copy-card">
          <p>Technology boundaries</p>
          <h2>Honest source states are part of the product.</h2>
          <ul>
            <li>Cloud provider sync imports device registry data where provider access exists.</li>
            <li>Oyi Edge supports deeper local discovery, heartbeat, and future offline execution.</li>
            <li>Digital Twin rendering is separate from placement, entity relationships, and source state.</li>
            <li>AI actions resolve through the same safe command paths as the rest of the platform.</li>
          </ul>
          </div>
      </section>

      <section className="inner-cta-band">
        <div>
          <p>Next</p>
          <h2>Plan the intelligence layer around your real estate.</h2>
        </div>
        <div className="inner-cta-actions">
          <Link href="/papers/infrastructure-intelligence" className="btn-secondary">Infrastructure intelligence</Link>
          <Link href="/deployments" className="btn-primary">Plan a deployment</Link>
        </div>
      </section>
    </main>
  );
}
