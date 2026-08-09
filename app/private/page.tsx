import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import CTABand from "@/app/components/CTABand";
import TrustDisclaimer from "@/app/components/TrustDisclaimer";
import FullBleedMedia from "@/app/components/FullBleedMedia";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.private);

const opportunityTypes = [
  { title: "Acquisition Opportunities", body: "Selected property acquisition opportunities." },
  { title: "Joint Venture Developments", body: "Landowner/developer structured developments." },
  { title: "Development Opportunities", body: "Participation around qualifying new developments." },
  { title: "Income-Generating Assets", body: "Assets positioned around recurring rental, hospitality or operating income." },
  { title: "Capital Appreciation", body: "Longer-term value-led assets." },
  { title: "Property Transformation & Conversion", body: "Redevelopment, repositioning or conversion opportunities." },
  { title: "Strategic Property Trading", body: "Selected acquisition and exit strategies where appropriate." },
  { title: "Off-Plan / Early-Stage Access", body: "Priority access to selected development inventory." },
];

export default function PrivatePage() {
  return (
    <main>
      <PageHero
        eyebrow="Ochiga Private"
        title="Private access to real estate opportunities."
        description="A private investment circle connecting selected investors to carefully considered real-estate opportunities, development partnerships and property strategies across the built environment."
      >
        <CTAButton href="/private/membership">Request Membership Requirements</CTAButton>
      </PageHero>

      <FullBleedMedia
        eyebrow="Ochiga Private"
        title="A private circle, considered from every angle."
        description="From portfolio review to acquisition strategy, every Ochiga Private engagement begins with a clear view of the opportunity — and the discipline to walk away from the wrong one."
        surfaceLabel="Ochiga Private"
        tone="black"
        imageSrc="/images/private/ochiga-private-lounge-skyline.webp"
        imageAlt="Ochiga Private client lounge at dusk with a curated real-estate and capital-strategy dashboard, overlooking a city skyline"
      />

      <SectionBlock eyebrow="Opportunity Types" title="Opportunities across the real-estate value cycle.">
        <TileGrid columns={4}>
          {opportunityTypes.map((item) => (
            <TileCard key={item.title} title={item.title} body={item.body} />
          ))}
        </TileGrid>
        <p className="mt-8 text-xs text-ochiga-white/40">
          Future asset sectors may include residential, hospitality, commercial, healthcare and other
          mixed-use built-environment sectors relevant to Ochiga and Oyi.
        </p>
      </SectionBlock>

      <SectionBlock eyebrow="Approach" title="Discover, underwrite, structure, develop, create value, hold or exit.">
        <ProcessFlow numbered steps={["Discover", "Underwrite", "Structure", "Develop / Operate", "Create Value", "Hold / Exit"]} />
        <div className="mt-8">
          <CTAButton href="/private/investment-approaches" variant="secondary">See investment approaches</CTAButton>
        </div>
      </SectionBlock>

      <SectionBlock width="content">
        <TrustDisclaimer>
          Ochiga Private membership is by application and review. Opportunities and access are not
          guaranteed, availability is not guaranteed, and investments carry risk. Opportunities may
          involve separate documentation. Ochiga does not provide investment advice — independent legal
          and financial advice should be obtained before making any investment decision.
        </TrustDisclaimer>
      </SectionBlock>

      <CTABand
        eyebrow="Membership"
        title="Membership by request."
        description="Tell us a little about yourself and we'll share the appropriate membership information."
        ctas={[{ label: "Request Membership Requirements", href: "/private/membership" }]}
      />
    </main>
  );
}
