import Section from "@/app/components/Section";

export default function Architecture() {
  return (
    <Section title="System Architecture">
      <p>
        Ochiga sits beneath applications, dashboards, and devices as a unified
        control layer for physical infrastructure.
      </p>

      <pre>
Applications / Dashboards / Devices
            │
           APIs
            │
        OYI CORE
(Identity · Assets · Events · Wallets)
            │
   Physical Infrastructure
      </pre>
    </Section>
  );
}
