import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import StatementBlock from "@/app/components/StatementBlock";
import SplitSection from "@/app/components/SplitSection";
import EngineTriad from "@/app/components/EngineTriad";
import TrustDisclaimer from "@/app/components/TrustDisclaimer";
import CTABand from "@/app/components/CTABand";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.about);

const journey = [
  { mark: "2013", title: "Built environment beginnings", body: "Ochiga's journey in the built environment began through specialist construction finishes, flooring and project delivery." },
  { mark: "Then", title: "Broader construction & delivery", body: "That experience expanded into broader construction, interiors and project delivery work." },
  { mark: "Then", title: "Building technology", body: "Ochiga moved into building technology and connected environments — understanding buildings as systems, not just structures." },
  { mark: "Then", title: "Oyi", body: "That technology path led to Oyi, Ochiga's building operating technology." },
  { mark: "Now", title: "Development + Oyi + Ochiga Private", body: "Ochiga is bringing its built-environment experience, development ambition and technology capability together through three connected engines." },
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Ochiga"
        title="Development. Technology. Private Capital."
        description="Ochiga develops and powers intelligent places, bringing together real estate development, building technology and strategic investment partnerships."
      />

      <SectionBlock eyebrow="What Ochiga Is" title="Three connected engines, not three businesses.">
        <EngineTriad />
      </SectionBlock>

      <SectionBlock id="journey" eyebrow="Our Journey" title="A progression, not a pivot.">
        <ol className="space-y-10">
          {journey.map((step, index) => (
            <li key={step.title} className="flex gap-6 border-t border-ochiga-white/10 pt-6">
              <span className="w-16 shrink-0 text-xs uppercase tracking-wide text-ochiga-red">{step.mark}</span>
              <div>
                <h3 className="font-display text-lg text-ochiga-white md:text-xl">{step.title}</h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ochiga-white/60">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 text-xs text-ochiga-white/40">
          This is a narrative progression, not a precisely dated corporate timeline. Ochiga does not
          claim project counts, development values, awards, or a large existing high-rise portfolio.
        </p>
      </SectionBlock>

      <StatementBlock
        eyebrow="Technology Meets Architecture"
        statement="Ochiga's original brand line now describes the intersection of Ochiga Development and Oyi — architecture and operating technology, designed together."
      />

      <SplitSection
        id="philosophy"
        eyebrow="Philosophy"
        title="Architecture first. Technology revealed within it."
        description="Ochiga Development creates the physical asset. Oyi powers and operates the intelligent environment. Ochiga Private connects selected investors, buyers, landowners and strategic partners with real-estate opportunities. These are interconnected parts of one Ochiga ecosystem — not three unrelated businesses."
        surfaceLabel="Ochiga Philosophy"
        tone="black"
      />

      <SectionBlock id="trust" eyebrow="Trust & Governance" title="Conservative by design." tone="light">
        <div className="space-y-6 text-ochiga-black/70">
          <p className="leading-relaxed">
            Ochiga Private membership and access are subject to individual review and are never
            guaranteed. Opportunities may involve separate documentation, and availability is not
            guaranteed.
          </p>
          <p className="leading-relaxed">
            Ochiga does not provide investment advice, and independent legal and financial advice should
            be obtained before making any investment decision. Nothing on this website constitutes a
            public offer of securities, a guarantee of returns, or a guarantee of funding.
          </p>
        </div>
      </SectionBlock>

      <CTABand
        eyebrow="Partner With Ochiga"
        title="Start a conversation with Ochiga."
        ctas={[{ label: "Partner With Ochiga", href: "/contact" }]}
      />
    </main>
  );
}
