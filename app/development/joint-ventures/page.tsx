import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import TrustDisclaimer from "@/app/components/TrustDisclaimer";
import StatementBlock from "@/app/components/StatementBlock";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentJointVentures);

const model = [
  { title: "Landowner Contribution", body: "Land is contributed into the structured partnership as the foundation of the opportunity." },
  { title: "Developer Execution", body: "Ochiga leads development strategy, design coordination, delivery and technology integration." },
  { title: "Project-Specific Capital", body: "Capital is structured around the specific opportunity, not a generic fund." },
  { title: "Professional Delivery", body: "Architecture, engineering, construction and delivery managed to institutional standard." },
  { title: "Sales / Offtake", body: "A dedicated sales and offtake strategy for the completed development." },
  { title: "Technology Integration", body: "Oyi is built into the development from the outset, not added afterward." },
];

export default function JointVenturesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Joint Ventures"
        title="Unlock the potential of your land."
        description="Ochiga evaluates strategically located land for structured development partnerships — bringing development discipline, capital structuring and technology to sites landowners could not unlock alone."
      >
        <CTAButton href="/partnerships/landowners">Propose a Development</CTAButton>
      </PageHero>

      <SectionBlock eyebrow="Process" title="From submission to structured partnership.">
        <ProcessFlow numbered steps={["Submit", "Review", "Feasibility", "Structure", "JV", "Development"]} />
      </SectionBlock>

      <SectionBlock eyebrow="What a Joint Venture Can Include" title="Every opportunity is independently underwritten.">
        <TileGrid columns={3}>
          {model.map((item) => (
            <TileCard key={item.title} title={item.title} body={item.body} />
          ))}
        </TileGrid>
      </SectionBlock>

      <StatementBlock
        tone="light"
        statement="Structures are assessed opportunity by opportunity — Ochiga does not publish a universal joint venture split or standard terms."
      />

      <SectionBlock width="content">
        <TrustDisclaimer>
          Joint venture structures, contribution ratios and terms vary by opportunity and are determined
          through individual review and feasibility. Nothing on this page constitutes an offer or a
          commitment to structure any specific transaction.
        </TrustDisclaimer>
      </SectionBlock>
    </main>
  );
}
