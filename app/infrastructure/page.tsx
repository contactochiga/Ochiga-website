"use client";

import Link from "next/link";

const domains = [
  { title: "Power", body: "Generator, grid, backup, source state, and outage context where live telemetry exists." },
  { title: "Access", body: "Residents, visitors, gate flows, roles, invitations, verification, and audit visibility." },
  { title: "Security", body: "Cameras, alerts, incidents, operator workflows, and emergency posture." },
  { title: "Maintenance", body: "Requests, work orders, scheduling, ownership, notes, and status history." },
  { title: "Utilities", body: "Water, network, environmental sources, service state, and operational alerts." },
  { title: "Devices", body: "Provider imports, Oyi Edge discovery, assignment, capability state, and room context." },
  { title: "Residents", body: "Home context, services, community, wallet, visitors, and verified access lifecycle." },
  { title: "Command Centers", body: "Attention queues, estate health, infrastructure posture, and staff action routing." },
];

const flow = ["Map", "Connect", "Assign", "Monitor", "Operate"];

export default function InfrastructurePage() {
  return (
    <main className="inner-page">
      <section className="inner-hero inner-hero-infra">
        <div className="inner-hero-copy animate-fade-up">
          <p>Infrastructure</p>
          <h1>Connect the physical and digital estate.</h1>
          <span>
            Ochiga links built-environment systems: structure, access, utilities, devices, services, maintenance, security, residents, and the teams responsible for operating them.
          </span>
          <div className="inner-hero-actions">
            <Link href="/deployments" className="btn-primary">Request deployment</Link>
            <Link href="/command-center" className="btn-secondary">Command center</Link>
          </div>
        </div>
        <div className="inner-arch-panel infra-map" aria-hidden="true">
          <i className="infra-road" />
          <i className="infra-core" />
          <i className="infra-zone zone-a" />
          <i className="infra-zone zone-b" />
          <i className="infra-zone zone-c" />
          <i className="infra-zone zone-d" />
          <span>Access</span>
          <span>Utilities</span>
          <span>Security</span>
          <span>Residents</span>
        </div>
      </section>

      <section className="inner-section">
        <div className="inner-section-head">
          <p>Built-environment system map</p>
          <h2>What physical and digital systems does Ochiga connect?</h2>
          <span>Ochiga is designed for the operational life of estates and intelligent buildings, not only their interface layer.</span>
        </div>
        <div className="inner-feature-grid eight">
          {domains.map((domain) => (
            <article key={domain.title} className="inner-glass-card">
              <span>{domain.title}</span>
              <p>{domain.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-section inner-process">
        <div className="inner-section-head compact">
          <p>Deployment infrastructure flow</p>
          <h2>Deployment starts with truth.</h2>
          <span>A strong deployment identifies what exists, what is connected, what is pending, who owns each workflow, and what residents should experience.</span>
        </div>
        <div className="inner-timeline">
          {flow.map((step, index) => (
            <article key={step}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="inner-cta-band">
        <div>
          <p>Command relationship</p>
          <h2>Infrastructure feeds the command center.</h2>
        </div>
        <div className="inner-cta-actions">
          <Link href="/command-center" className="btn-secondary">Command Center</Link>
          <Link href="/papers/infrastructure-operating-systems" className="btn-secondary">Infrastructure OS paper</Link>
          <Link href="/deployments" className="btn-primary">Request deployment</Link>
        </div>
      </section>
    </main>
  );
}
