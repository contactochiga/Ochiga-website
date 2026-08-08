import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import SplitSection from "@/app/components/SplitSection";
import StatementBlock from "@/app/components/StatementBlock";
import CTABand from "@/app/components/CTABand";
import CTAButton from "@/app/components/CTAButton";
import ProcessFlow from "@/app/components/ProcessFlow";
import JsonLd from "@/app/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { buildMetadata, seoPages, softwareApplicationJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.oyi);

const domains = [
  "Residents & users", "Facility teams", "Access", "Visitors", "Utilities",
  "Energy", "Security", "Devices", "Maintenance", "Services", "Operational intelligence",
];

export default function OyiPage() {
  return (
    <main>
      <JsonLd data={softwareApplicationJsonLd()} />
      <PageHero
        eyebrow="Oyi"
        title="Oyi is Ochiga's building operating technology."
        description="People × Buildings × Infrastructure × Hardware × Intelligence. Oyi powers how Ochiga developments operate, learn and evolve."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href={companyInfo.oyiWebsite} external>Explore Oyi at getoyi.com</CTAButton>
          <CTAButton href="#deployment" variant="secondary">Request Oyi Deployment</CTAButton>
        </div>
      </PageHero>

      <StatementBlock
        eyebrow="Why Oyi Matters to Ochiga"
        statement="A building should not stop evolving at handover."
      />

      <SectionBlock eyebrow="The Shift" title="From a finished building to a living one.">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs uppercase tracking-wide text-ochiga-white/40">Traditional development</p>
            <ProcessFlow steps={["Design", "Build", "Handover"]} />
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-wide text-ochiga-red">Ochiga</p>
            <ProcessFlow numbered steps={["Design", "Build", "Connect", "Operate", "Learn", "Improve"]} />
          </div>
        </div>
      </SectionBlock>

      <SplitSection
        eyebrow="Operational Domains"
        title="What Oyi connects."
        description="Oyi can connect residents, facility teams, access, visitors, utilities, energy, security, devices, maintenance, services and operational intelligence — the full operating layer beneath a building."
        surfaceLabel="Oyi — Operating Layer"
        tone="red"
      >
        <div className="flex flex-wrap gap-2.5">
          {domains.map((domain) => (
            <span key={domain} className="rounded border border-ochiga-white/15 px-3.5 py-1.5 text-xs text-ochiga-white/65">
              {domain}
            </span>
          ))}
        </div>
      </SplitSection>

      <SectionBlock eyebrow="Where to Go Deeper" title="ochiga.com.ng explains why. getoyi.com explains how.">
        <p className="max-w-2xl text-ochiga-white/65 leading-relaxed">
          This page keeps Oyi&apos;s strategic relationship to Ochiga developments concise on purpose — full
          product depth, technical documentation, and platform detail live at getoyi.com.
        </p>
        <div className="mt-6">
          <CTAButton href={companyInfo.oyiWebsite} variant="secondary" external>Visit getoyi.com</CTAButton>
        </div>
      </SectionBlock>

      <div id="deployment">
        <CTABand
          eyebrow="Deploy Oyi"
          title="Considering Oyi for a building or portfolio?"
          description="Oyi deployment enquiries are qualified here and directed to the right team."
          ctas={[
            { label: "Request Oyi Deployment", href: "/contact" },
            { label: "Visit getoyi.com", href: companyInfo.oyiWebsite, variant: "secondary", external: true },
          ]}
        />
      </div>
    </main>
  );
}
