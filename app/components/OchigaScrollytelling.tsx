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
  { title: "Future Communities", kicker: "Designed together", body: "Developments where architecture, construction, infrastructure, resident experience, and intelligence begin from the same blueprint." },
];

const oyiSurfaces = ["Oyi Home", "Oyi Facility", "Oyi Watch", "Oyi Edge", "Oyi Intelligence"];
const journey = ["Discover", "Design", "Connect", "Operate", "Evolve"];

export default function OchigaScrollytelling() {
  return (
    <main className="arch-site va-site">
      <section className="arch-hero va-hero">
        <div className="va-volumetric-light" />
        <div className="va-blueprint" aria-hidden="true" />
        <div className="va-particles" aria-hidden="true">
          {Array.from({ length: 22 }).map((_, index) => <i key={index} />)}
        </div>

        <div className="va-architectural-scene" aria-hidden="true">
          <div className="va-ground-plane" />
          <div className="va-massing va-massing-a"><MassingWindows count={44} /></div>
          <div className="va-massing va-massing-b"><MassingWindows count={24} /></div>
          <div className="va-massing va-massing-c"><MassingWindows count={30} /></div>
          <div className="va-floating-slab va-slab-a" />
          <div className="va-floating-slab va-slab-b" />
          <div className="va-twin-outline" />
          <div className="va-waterfront" />
        </div>

        <div className="arch-hero-copy va-hero-copy">
          <p>Technology Meets Architecture</p>
          <h1>Technology Meets Architecture.</h1>
          <span>Ochiga creates digital infrastructure for intelligent buildings, estates, and future smart communities.</span>
          <div className="arch-hero-actions">
            <Link href="/deployments" className="btn-primary">Request Deployment</Link>
            <Link href="/oyi" className="btn-secondary">Explore Oyi</Link>
          </div>
        </div>

        <aside className="arch-holo va-holo va-holo-structure">
          <strong>Architectural Twin</strong>
          <span>Building · Estate · Utility layers</span>
        </aside>
        <aside className="arch-holo va-holo va-holo-source">
          <strong>Infrastructure Intelligence</strong>
          <span>Telemetry, context, ownership, action</span>
        </aside>
        <aside className="arch-holo va-holo va-holo-community">
          <strong>Future Community</strong>
          <span>Architecture first, intelligence second</span>
        </aside>
      </section>

      <section className="arch-section arch-intelligence va-legible">
        <div className="arch-section-head">
          <p>Physical Infrastructure Becomes Legible</p>
          <h2>The building reveals its systems.</h2>
          <span>Architecture remains visible while digital intelligence appears as a quiet overlay: source states, utilities, access, resident life, and spatial context connected into one environment.</span>
        </div>
        <div className="va-layer-stage">
          <div className="va-layer-building" aria-hidden="true" />
          <div className="va-layer-lines" aria-hidden="true" />
          <div className="va-layer-panels">
            {intelligenceLayers.map((layer, index) => (
              <article key={layer.title} style={{ "--i": index } as React.CSSProperties}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{layer.title}</h3>
                <p>{layer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="arch-section va-build-section">
        <div className="arch-section-head">
          <p>What We Build</p>
          <h2>Architecture-first technology for real environments.</h2>
        </div>
        <div className="va-build-grid">
          {buildCards.map((card, index) => (
            <article key={card.title} style={{ "--card": index } as React.CSSProperties}>
              <div className="va-card-architecture" aria-hidden="true" />
              <span>{card.kicker}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="arch-section arch-oyi-section va-oyi-section">
        <div className="arch-section-head">
          <p>Oyi Ecosystem</p>
          <h2>The platform flows through the building.</h2>
          <span>Oyi powers the operating layer beneath Ochiga's architectural vision. It connects residents, operators, edge infrastructure, digital twins, and intelligence without becoming the whole company story.</span>
        </div>
        <div className="va-oyi-flow">
          <div className="va-flow-building" aria-hidden="true"><MassingWindows count={36} /></div>
          <div className="va-flow-twin">Digital Twin</div>
          <div className="va-flow-spine" aria-hidden="true" />
          <div className="va-flow-products">
            {oyiSurfaces.map((surface) => <span key={surface}>{surface}</span>)}
          </div>
        </div>
        <div className="arch-oyi-actions">
          <Link href="/oyi" className="btn-secondary">Explore Oyi Platform</Link>
          <Link href="/papers/infrastructure-intelligence" className="btn-primary">Read Intelligence Paper</Link>
        </div>
      </section>

      <section className="arch-section arch-spartan va-spartan">
        <div>
          <p>Future Intelligence Layer</p>
          <h2>Spartan is the next intelligence horizon.</h2>
        </div>
        <div className="va-spartan-copy">
          <p>Spartan is Ochiga's future intelligence layer for spatial reasoning, infrastructure simulation, and autonomous operational insight. It is positioned as a future capability, not a production-deployed claim.</p>
          <div className="va-simulation" aria-hidden="true">
            <i className="va-sim-building" />
            <i className="va-sim-trajectory one" />
            <i className="va-sim-trajectory two" />
            <i className="va-sim-trajectory three" />
            <span>Future-state simulation</span>
          </div>
        </div>
      </section>

      <section className="arch-section arch-journey va-journey">
        <div className="arch-section-head">
          <p>Deployment Journey</p>
          <h2>From architecture to operation.</h2>
        </div>
        <div className="va-journey-track">
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

function MassingWindows({ count }: { count: number }) {
  return <>{Array.from({ length: count }).map((_, index) => <i key={index} />)}</>;
}
