import ThreeLanding from "@/app/components/ThreeLanding";
import TwinFrame from "@/app/components/TwinFrame";
import CapabilityCard from "@/app/components/CapabilityCard";

export default function Home() {
  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        <h1>The Operating System for Physical Infrastructure</h1>
        <p>
          Ochiga governs people, assets, access, payments, events,
          and digital twins across real-world environments.
        </p>
        <strong>This is infrastructure.</strong>
      </section>

      {/* TWIN */}
      <section className="twin-section">
        <TwinFrame>
          <ThreeLanding />
        </TwinFrame>
      </section>

      {/* CAPABILITIES */}
      <section className="caps">
        <CapabilityCard
          title="Smart Home"
          color="#00E5FF"
          description="Unified control of residential devices and access."
        />
        <CapabilityCard
          title="Smart Safety"
          color="#FFB300"
          description="Emergency systems, alerts, and incident response."
        />
        <CapabilityCard
          title="Smart Security"
          color="#FF3B3B"
          description="Identity-driven access control and surveillance."
        />
        <CapabilityCard
          title="Utilities"
          color="#9C27B0"
          description="Power, water, gas, and infrastructure monitoring."
        />
      </section>

    </main>
  );
}
