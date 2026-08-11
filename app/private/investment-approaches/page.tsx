import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.privateInvestmentApproaches);

const approaches = [
  { title: "Acquisition Opportunities", body: "Selected property acquisition opportunities, reviewed for fit before they are shared." },
  { title: "Joint Venture Developments", body: "Landowner/developer structured developments originated or structured by Ochiga." },
  { title: "Development Opportunities", body: "Participation around qualifying new developments, including Ochiga's own studies." },
  { title: "Income-Generating Assets", body: "Assets positioned around recurring rental, hospitality or operating income." },
  { title: "Capital Appreciation", body: "Longer-term, value-led assets selected for durability rather than speculation." },
  { title: "Property Transformation & Conversion", body: "Redevelopment, repositioning or conversion opportunities." },
  { title: "Strategic Property Trading", body: "Selected acquisition and exit strategies where the opportunity supports it." },
  { title: "Off-Plan / Early-Stage Access", body: "Priority access to selected development inventory ahead of general release." },
];

export default function InvestmentApproachesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ochiga Private / Investment Approaches"
        title="Access across different stages of the real-estate value cycle."
        description="Ochiga Private gives selected members access to opportunities across different stages of the real-estate value cycle — from origination through to hold or exit."
      />

      <SectionBlock eyebrow="Approach" title="A consistent process, applied selectively.">
        <ProcessFlow numbered steps={["Discover", "Underwrite", "Structure", "Develop / Operate", "Create Value", "Hold / Exit"]} />
      </SectionBlock>

      <SectionBlock eyebrow="Opportunity Types" title="Where members typically engage.">
        <TileGrid columns={4}>
          {approaches.map((item) => (
            <TileCard key={item.title} title={item.title} body={item.body} />
          ))}
        </TileGrid>
        <div className="mt-8">
          <CTAButton href="/private#membership">Request Membership</CTAButton>
        </div>
      </SectionBlock>
    </main>
  );
}
