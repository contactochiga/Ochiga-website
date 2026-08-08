import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import JsonLd from "@/app/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { buildMetadata, seoPages, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.oyi);

const domains = [
  "Residents & users", "Facility teams", "Access", "Visitors", "Utilities",
  "Energy", "Security", "Devices", "Maintenance", "Services",
  "Infrastructure", "Operational intelligence",
];

export default function OyiPage() {
  return (
    <main>
      <JsonLd data={softwareApplicationJsonLd()} />
      <PageHero
        eyebrow="Oyi"
        title="Oyi is the building operating technology developed by Ochiga."
        description="Oyi powers how Ochiga developments operate, learn and evolve — the intelligence layer beneath people, buildings, infrastructure and hardware."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href={companyInfo.oyiWebsite} external>Explore Oyi at getoyi.com</CTAButton>
          <CTAButton href="/development" variant="secondary">See Oyi-enabled developments</CTAButton>
        </div>
      </PageHero>

      <SectionBlock
        eyebrow="Why Oyi Matters to Ochiga"
        title="Buildings that continue to evolve."
        description="Traditional development ends at handover: design, build, handover. Ochiga developments continue: design, build, connect, operate, learn, improve."
      />

      <SectionBlock eyebrow="Operational Domains" title="People × Buildings × Infrastructure × Hardware × Intelligence">
        <div className="flex flex-wrap gap-3">
          {domains.map((domain) => (
            <span key={domain} className="rounded border border-ochiga-white/15 px-4 py-2 text-sm text-ochiga-white/70">
              {domain}
            </span>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock
        id="deployment"
        eyebrow="Deploy Oyi"
        title="Considering Oyi for a building or portfolio?"
        description="Oyi deployment enquiries are qualified here and directed to the right team — full technical depth lives at getoyi.com."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href="/contact">Request Oyi Deployment</CTAButton>
          <CTAButton href={companyInfo.oyiWebsite} variant="secondary" external>Visit getoyi.com</CTAButton>
        </div>
      </SectionBlock>
    </main>
  );
}
