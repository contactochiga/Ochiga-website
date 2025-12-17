import Section from "../../components/Section";
import Pillar from "../../components/Pillar";

export default function Infrastructure() {
  return (
    <Section title="Infrastructure, Not Software">
      <div className="grid">
        <Pillar title="Identity & Authority" text="People, roles, permissions." />
        <Pillar title="Access & Events" text="Movement, actions, logs." />
        <Pillar title="Financial Rails" text="Wallets, billing, audits." />
        <Pillar title="Digital Twin Engine" text="Real-time + historical state." />
        <Pillar title="Integration Layer" text="Devices and external systems." />
      </div>
    </Section>
  );
}
