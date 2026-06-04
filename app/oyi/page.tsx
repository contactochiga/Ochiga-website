"use client";

import Link from "next/link";

const surfaces = [
  { title: "Consumer", body: "Resident-facing Oyi Home for invite-first activation, home context, visitors, community, devices, wallet, services, and AI assistance." },
  { title: "Facility", body: "Operational web console for homes, residents, invitations, devices, cameras, maintenance, incidents, communications, and administration." },
  { title: "Watch", body: "Companion watch experience for glanceable home status, notifications, diagnostics, and durable sync with the iPhone app." },
  { title: "Edge", body: "On-site infrastructure layer for local discovery, heartbeat, device-provider maturity, and future offline execution." },
  { title: "Digital Twin", body: "Spatial and operational record for estates, homes, rooms, devices, cameras, edge nodes, incidents, maintenance, and infrastructure layers." },
];

export default function OyiPage() {
  return (
    <main className="bg-black text-white">
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">
          <img src="/media/oyi-os-command-center.png" className="hero-bg" alt="Oyi platform command layer" />
          <div className="hero-overlay" />
          <div className="hero-gradient" />
          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">Oyi Platform</h1>
            <p className="hero-description">
              The operating system for managed estates, residents, facility teams, devices, access, and infrastructure intelligence.
            </p>
            <div className="hero-cta">
              <Link href="/deployments" className="btn-primary">Request Deployment</Link>
              <Link href="/papers/infrastructure-operating-systems" className="btn-secondary">Read the framework</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">A product system, not a single app.</h2>
          <p className="text-lg text-white/68 leading-relaxed">
            Oyi connects the resident experience with facility operations and the physical infrastructure beneath both. The goal is simple: make the estate governable, usable, and traceable without splitting daily operations across disconnected tools.
          </p>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <p className="mb-8 text-xs uppercase tracking-[0.22em] text-white/38">Product surfaces</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {surfaces.map((surface) => (
              <article key={surface.title} className="rounded-[28px] border border-white/10 bg-white/[0.02] p-7">
                <h3 className="text-2xl font-medium">{surface.title}</h3>
                <p className="mt-4 text-white/58 leading-7">{surface.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <Panel title="Residents" body="Activate through facility-issued links or QR codes, enter a verified home context, and use Oyi as the daily interface for estate living." />
          <Panel title="Operators" body="Manage structure, access, workflows, incidents, devices, cameras, services, utilities, community, and audit visibility from Facility OS." />
          <Panel title="Infrastructure" body="Preserve the relationships between buildings, homes, rooms, assets, providers, edge nodes, telemetry, and the digital twin." />
        </div>
      </section>

      <section className="px-4 md:px-8 pb-40">
        <div className="hero-frame">
          <img src="/media/infrastructure-operators.png" className="hero-bg" alt="Infrastructure operators" />
          <div className="hero-overlay" />
          <div className="hero-gradient" />
          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">Deploy a system your estate can actually operate.</h1>
            <p className="hero-description">Start with structure, identity, devices, source quality, and operator readiness.</p>
            <div className="hero-cta">
              <Link href="/deployments" className="btn-primary">Request Deployment</Link>
              <Link href="/technology" className="btn-secondary">See Technology</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Panel({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-[28px] border border-white/10 bg-black/28 p-7">
      <h3 className="text-2xl font-medium">{title}</h3>
      <p className="mt-4 text-white/58 leading-7">{body}</p>
    </article>
  );
}
