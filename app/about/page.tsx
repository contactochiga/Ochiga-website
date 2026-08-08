import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.about);

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About Ochiga"
        title="Development. Technology. Private Capital."
        description="Ochiga develops and powers intelligent places, bringing together real estate development, building technology and strategic investment partnerships."
      />

      <SectionBlock id="journey" eyebrow="Our Journey" title="From the built environment to an integrated ecosystem." width="content">
        <p className="text-ochiga-white/65 leading-relaxed">
          The Ochiga journey in the built environment began in 2013 through specialist construction
          finishes, flooring and project delivery. That experience expanded into broader construction,
          interiors and building delivery, then into building technology and connected environments —
          a path that led to Oyi. Ochiga is now bringing its built-environment experience, development
          ambition and technology capability together through Ochiga Development, Oyi and Ochiga Private.
        </p>
      </SectionBlock>

      <SectionBlock id="philosophy" eyebrow="Philosophy" title="Architecture first. Technology revealed within it." width="content">
        <p className="text-ochiga-white/65 leading-relaxed">
          Ochiga Development creates the physical asset. Oyi powers and operates the intelligent
          environment. Ochiga Private connects selected investors, buyers, landowners and strategic
          partners with real-estate opportunities. These are interconnected parts of one Ochiga
          ecosystem — not three unrelated businesses.
        </p>
      </SectionBlock>

      <SectionBlock id="trust" eyebrow="Trust & Governance" title="Conservative by design." width="content" tone="light">
        <p className="text-ochiga-black/70 leading-relaxed">
          Ochiga Private membership and access are subject to individual review and are never
          guaranteed. Opportunities may involve separate documentation, and availability is not
          guaranteed. Ochiga does not provide investment advice, and independent legal and financial
          advice should be obtained before making any investment decision. Nothing on this website
          constitutes a public offer of securities, a guarantee of returns, or a guarantee of funding.
        </p>
      </SectionBlock>
    </main>
  );
}
