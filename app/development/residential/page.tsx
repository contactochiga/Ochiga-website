import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import StudyCard from "@/app/components/StudyCard";
import TrustDisclaimer from "@/app/components/TrustDisclaimer";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentResidential);

export default function ResidentialPage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Residential"
        title="Residential development is Ochiga's current focus."
        description="Ochiga is concentrating on premium residential development first, where architecture, land economics and Oyi's operating layer combine most directly."
      />

      <SectionBlock eyebrow="Current Direction" title="Two residential studies, two different scales.">
        <div className="grid gap-8 md:grid-cols-2">
          <StudyCard
            index="01"
            name="Prime Vertical Living"
            summary="An approximately 18–21 storey high-end residential concept for sites where location, planning and land economics support vertical density."
            specs={["Premium apartments", "Family residences", "Penthouses", "Wellness, pool, gym", "Residents' lounge", "Concierge", "Smart access", "Parking", "Intelligent utilities", "Oyi throughout"]}
          />
          <StudyCard
            index="02"
            name="Contemporary Residential Community"
            summary="A concept for approximately 40 premium homes on larger sites, subject to feasibility."
            specs={["Terraces", "Townhouses", "Duplexes", "Selective low-rise apartments", "Landscaped communal space", "Clubhouse", "Wellness & recreation", "Smart infrastructure", "Oyi integration"]}
          />
        </div>
      </SectionBlock>

      <SectionBlock width="content">
        <TrustDisclaimer>
          These are development studies and concepts — not acquired sites, approved projects, developments
          under construction, or an existing Ochiga portfolio. Working names are internal and subject to
          trademark and domain review.
        </TrustDisclaimer>
        <div className="mt-8">
          <CTAButton href="/development/studies">View all Development Studies</CTAButton>
        </div>
      </SectionBlock>
    </main>
  );
}
