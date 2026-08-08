import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import StrategicPartnerForm from "@/app/components/forms/StrategicPartnerForm";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.partnershipsProfessional);

const partnerTypes = [
  "Architecture", "Structural Engineering", "MEP", "Quantity Surveying", "Construction",
  "Valuation", "Legal", "Finance", "Sales & Marketing", "Facility Management", "Hardware", "Technology",
];

export default function ProfessionalPartnersPage() {
  return (
    <main>
      <PageHero
        eyebrow="Partnerships / Professional"
        title="Work with Ochiga."
        description="Ochiga works with operators who are responsible for real infrastructure and real estate outcomes — engagement is structured, deliberate, and aligned with long-term delivery."
      >
        <CTAButton href="#work-with-us">Work With Ochiga</CTAButton>
      </PageHero>
      <SectionBlock eyebrow="Disciplines" title="Where Ochiga typically engages professional partners.">
        <TileGrid columns={4}>
          {partnerTypes.map((type) => (
            <TileCard key={type} title={type} body="Engaged on a per-project basis as development studies progress." />
          ))}
        </TileGrid>
      </SectionBlock>

      <SectionBlock id="work-with-us" eyebrow="Work With Ochiga" title="Tell us about your practice." width="content">
        <StrategicPartnerForm />
      </SectionBlock>
    </main>
  );
}
