import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import StudyCard from "@/app/components/StudyCard";
import TrustDisclaimer from "@/app/components/TrustDisclaimer";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.developmentStudies);

export default function DevelopmentStudiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Development / Studies"
        title="Ochiga's current development studies."
        description="Coming soon. These are development studies and concepts — not acquired sites, approved projects, developments under construction, or an existing Ochiga portfolio."
      />
      <SectionBlock>
        <div className="grid gap-8 md:grid-cols-2">
          <StudyCard
            index="01"
            status="Development Study 01 — Concept"
            name="Prime Vertical Living"
            summary="Approximately 18–21 storeys of high-end residential development for sites where location, planning and land economics support vertical density. Premium apartments, larger family residences, penthouses, wellness, pool, gym, residents' lounge, concierge, smart access, parking, intelligent utilities and Oyi throughout."
          />
          <StudyCard
            index="02"
            status="Development Study 02 — Concept"
            name="Contemporary Residential Community"
            summary="Approximately 40 premium homes on larger sites, subject to feasibility. Terraces, townhouses, duplexes and low-rise apartments where appropriate, landscaped communal space, a clubhouse, wellness and recreation, smart infrastructure and Oyi integration."
          />
        </div>
        <div className="mt-10">
          <TrustDisclaimer>
            Coming Soon / Future Development Direction. Working names are internal and subject to
            trademark and domain review before any public launch.
          </TrustDisclaimer>
        </div>
      </SectionBlock>
    </main>
  );
}
