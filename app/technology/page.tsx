"use client";

import Link from "next/link";

const layers = [
  { title: "Realtime operations", body: "Socket-backed event awareness where available, with polling fallback and honest degraded states when live sources are missing." },
  { title: "AI command layer", body: "AI is grounded in permissions, context, device identity, and safe command routing instead of free-floating chat behavior." },
  { title: "Device integrations", body: "Provider sync, registry identity, assignment, capabilities, and Oyi Edge readiness keep devices governable after discovery." },
  { title: "Security model", body: "Invite-first activation, protected operational routes, scoped context, audit trails, and permission-aware interfaces shape the platform." },
];

export default function TechnologyPage() {
  return (
    <main className="bg-black text-white">
      <section className="px-4 md:px-8 pt-24 md:pt-28">
        <div className="hero-frame">
          <img src="/media/infrastructure.png" className="hero-bg" alt="Ochiga technology" />
          <div className="hero-overlay" />
          <div className="hero-gradient" />
          <div className="hero-content animate-fade-up">
            <h1 className="hero-title">Technology</h1>
            <p className="hero-description">The digital infrastructure layer behind intelligent buildings: realtime operations, AI, device integration, edge readiness, security, and digital twin foundations.</p>
            <div className="hero-cta">
              <Link href="/papers/ai-for-built-environments" className="btn-primary">Read AI paper</Link>
              <Link href="/trust" className="btn-secondary">Trust posture</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-5xl font-medium mb-6">Architecture for real operating conditions.</h2>
          <p className="text-lg text-white/68 leading-relaxed">
            Ochiga technology is designed around identity, source quality, assignments, auditability, and operational continuity. It avoids pretending that every integration is live until the source exists.
          </p>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2">
            {layers.map((layer) => (
              <article key={layer.title} className="rounded-[30px] border border-white/10 bg-white/[0.02] p-8">
                <h2 className="text-2xl font-medium">{layer.title}</h2>
                <p className="mt-4 text-white/58 leading-7">{layer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-grid bg-radial-glow section-core">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-medium mb-8">Technology boundaries</h2>
          <div className="space-y-6 text-white/64 leading-7">
            <p>Cloud provider sync is useful for imported device registries. Oyi Edge is required for deeper local discovery, site-level heartbeat, and future offline execution.</p>
            <p>Digital Twin rendering is one layer. Placement persistence, entity relationships, incident mapping, and source states are the operational foundation.</p>
            <p>AI actions should resolve through the same command paths as the rest of the product. If a source or permission is missing, the system should say so.</p>
          </div>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/papers/infrastructure-intelligence" className="btn-secondary">Infrastructure intelligence</Link>
            <Link href="/deployments" className="btn-primary">Plan a deployment</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
