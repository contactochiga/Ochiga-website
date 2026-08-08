import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnershipsProfessional);

const partnerTypes = [
  "Architecture", "Structural Engineering", "MEP", "Quantity Surveying", "Construction",
  "Sales & Marketing", "Finance", "Legal", "Valuation", "Facility Management", "Hardware", "Technology", "Other",
];

export default function ProfessionalPartnersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships / Professional"
        title="Work with Ochiga."
        description="Ochiga works with operators who are responsible for real infrastructure and real estate outcomes — engagement is structured, deliberate, and aligned with long-term delivery."
      >
        <CTAButton href="/contact">Work With Ochiga</CTAButton>
      </PageHero>
      <SectionBlock eyebrow="Partner Types" title="Disciplines Ochiga engages.">
        <div className="flex flex-wrap gap-3">
          {partnerTypes.map((type) => (
            <span key={type} className="rounded border border-ochiga-white/15 px-4 py-2 text-sm text-ochiga-white/70">{type}</span>
          ))}
        </div>
      </SectionBlock>
    </main>
  );
}
