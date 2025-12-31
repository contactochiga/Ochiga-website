import ConsoleFrame from "@/app/components/ConsoleFrame";
import ThreeLanding from "@/app/components/ThreeLanding";
import Link from "next/link";

export default function Home() {
  return (
    <ConsoleFrame>

      {/* HERO */}
      <section style={{ marginBottom: "140px" }}>
        <h1>The Operating System for Physical Infrastructure</h1>

        <p>
          Ochiga builds the foundational systems that govern people, assets,
          access, payments, events, and digital twins across estates,
          utilities, and cities.
        </p>

        <p>
          This is not an application.
          <br />
          <strong>This is infrastructure.</strong>
        </p>
      </section>

      {/* DIGITAL TWIN */}
      <section style={{ marginBottom: "160px" }}>
        <small>LIVE SYSTEM VIEW</small>
        <h2>Digital Twin Layer</h2>

        <p>
          A real-time spatial representation of physical assets,
          infrastructure nodes, and operational zones.
        </p>

        <div style={{ height: "520px", marginTop: "40px" }}>
          <ThreeLanding />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ marginBottom: "160px" }}>
        <h2>How Ochiga Works</h2>

        <pre>
Identity & Authority
        │
Assets & Locations
        │
Events & Automation
        │
Wallets & Payments
        │
Digital Twins & Control
        </pre>

        <p>
          Every action in the system is authenticated, logged, auditable,
          and linked to a real-world entity.
        </p>
      </section>

      {/* READ ONLY CONSOLE */}
      <section style={{ marginBottom: "160px" }}>
        <small>READ-ONLY MODE</small>
        <h2>Infrastructure Console</h2>

        <p>
          Operators, administrators, and authorities observe system state
          without direct intervention.
        </p>

        <Link href="/twin">View Live Twin →</Link>
      </section>

      {/* DEPLOYMENTS */}
      <section>
        <h2>Designed for Scale</h2>

        <ul>
          <li>Smart estates & large residential developments</li>
          <li>Utility networks & service providers</li>
          <li>Government & public infrastructure</li>
        </ul>

        <p>
          Typical deployment: <strong>10,000+ physical assets</strong>
        </p>
      </section>

    </ConsoleFrame>
  );
}
