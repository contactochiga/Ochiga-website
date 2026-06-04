"use client";

import Link from "next/link";

const intelligenceLayers = [
  { title: "Architecture", body: "Built form, rooms, structures, zones, and estate hierarchy become the base layer." },
  { title: "Estate Systems", body: "Access, visitors, services, residents, maintenance, and operators connect to one place model." },
  { title: "Utilities", body: "Power, water, network, environment, and shared infrastructure gain source-aware visibility." },
  { title: "Digital Twin", body: "The spatial record preserves relationships between buildings, homes, assets, events, and systems." },
  { title: "Resident Life", body: "Daily living surfaces stay simple while the infrastructure underneath remains governed." },
  { title: "Intelligence", body: "AI and future Spartan reasoning help operators understand state, risk, and next action." },
];

const buildCards = [
  { title: "Intelligent Buildings", kicker: "Architecture-aware", body: "Modern buildings with digital structure, access context, utility posture, and operational memory." },
  { title: "Intelligent Estates", kicker: "Real estate systems", body: "Residential and mixed-use communities where residents, operators, visitors, and shared services work through one governed layer." },
  { title: "Digital Infrastructure", kicker: "Connected foundations", body: "Identity, rooms, devices, cameras, utilities, payments, incidents, and audit trails held together as infrastructure." },
  { title: "Command Centers", kicker: "Operational visibility", body: "Cinematic control environments for estate health, security, incidents, utilities, and staff response." },
  { title: "Digital Twins", kicker: "Spatial memory", body: "Authoritative spatial and operational records for buildings, homes, rooms, assets, and events." },
  { title: "Future Smart Communities", kicker: "Designed together", body: "Developments where architecture, construction, infrastructure, resident experience, and intelligence begin from the same blueprint." },
];

const oyiSurfaces = [
  "Oyi Home",
  "Oyi Facility",
  "Oyi Watch",
  "Oyi Edge",
  "Oyi Twin",
  "Oyi Intelligence",
];

const journey = ["Discover", "Design", "Connect", "Operate", "Evolve"];

export default function OchigaScrollytelling() {
  return (
    <main className="arch-site">
      <section className="arch-hero">
        <div className="arch-hero-sky" />
        <div className="arch-estate" aria-hidden="true">
          <div className="arch-building arch-building-main">
            {Array.from({ length: 42 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="arch-building arch-building-left">
            {Array.from({ length: 20 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="arch-building arch-building-right">
            {Array.from({ length: 24 }).map((_, index) => <i key={index} />)}
          </div>
          <div className="arch-water" />
          <div className="arch-ground-grid" />
        </div>
        <div className="arch-trace arch-trace-one" />
        <div className="arch-trace arch-trace-two" />
        <div className="arch-orb" />

        <div className="arch-hero-copy">
          <p>Technology Meets Architecture</p>
          <h1>Technology Meets Architecture.</h1>
          <span>Ochiga creates digital infrastructure for intelligent buildings, estates, and future smart communities.</span>
          <div className="arch-hero-actions">
            <Link href="/deployments" className="btn-primary">Request Deployment</Link>
            <Link href="/oyi" className="btn-secondary">Explore Oyi</Link>
          </div>
        </div>

        <aside className="arch-holo arch-holo-status">
          <strong>Intelligent Estate Layer</strong>
          <span>Architecture · Utilities · Access · Twin</span>
        </aside>
        <aside className="arch-holo arch-holo-map">
          <strong>Digital Infrastructure</strong>
          <span>Spatial context active</span>
        </aside>
        <aside className="arch-holo arch-holo-source">
          <strong>Source Honesty</strong>
          <span>Live / pending / unavailable states</span>
        </aside>
      </section>

      <section className="arch-section arch-intelligence">
        <div className="arch-section-head">
          <p>Built Environment Intelligence</p>
          <h2>Physical infrastructure becomes legible.</h2>
          <span>Technology appears as a quiet intelligence layer over the built environment, not as a dashboard pasted on top of it.</span>
        </div>
        <div className="arch-layer-stage">
          <div className="arch-mini-estate" aria-hidden="true" />
          <div className="arch-layer-grid">
            {intelligenceLayers.map((layer) => (
              <article key={layer.title}>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="arch-section">
        <div className="arch-section-head">
          <p>What We Build</p>
          <h2>Architecture-first technology for real environments.</h2>
        </div>
        <div className="arch-build-grid">
          {buildCards.map((card) => (
            <article key={card.title}>
              <span>{card.kicker}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="arch-section arch-oyi-section">
        <div className="arch-section-head">
          <p>Oyi Platform</p>
          <h2>The product ecosystem powering the vision.</h2>
          <span>Oyi is not the company story. It is Ochiga's platform layer for residents, operators, devices, edge infrastructure, spatial context, and intelligence.</span>
        </div>
        <div className="arch-oyi-orbit">
          <div className="arch-oyi-core">Oyi</div>
          {oyiSurfaces.map((surface) => <span key={surface}>{surface}</span>)}
        </div>
        <div className="arch-oyi-actions">
          <Link href="/oyi" className="btn-secondary">Explore Oyi Platform</Link>
          <Link href="/papers/infrastructure-intelligence" className="btn-primary">Read Intelligence Paper</Link>
        </div>
      </section>

      <section className="arch-section arch-spartan">
        <div>
          <p>Future Intelligence Layer</p>
          <h2>Spartan is the next intelligence horizon.</h2>
        </div>
        <p>
          Spartan is Ochiga's future intelligence layer for spatial reasoning, infrastructure simulation, and autonomous operational insight. It is positioned as a future capability, not a production-deployed claim.
        </p>
      </section>

      <section className="arch-section arch-journey">
        <div className="arch-section-head">
          <p>Deployment Journey</p>
          <h2>Structured like architecture. Operated like infrastructure.</h2>
        </div>
        <div className="arch-journey-line">
          {journey.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
        <Link href="/deployments" className="btn-primary arch-final-cta">Start a Deployment Conversation</Link>
      </section>
    </main>
  );
}
