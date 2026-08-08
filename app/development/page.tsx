import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import SplitSection from "@/app/components/SplitSection";
import StatementBlock from "@/app/components/StatementBlock";
import StudyCard from "@/app/components/StudyCard";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTABand from "@/app/components/CTABand";
import CTAButton from "@/app/components/CTAButton";
import FullBleedMedia from "@/app/components/FullBleedMedia";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.development);

const capabilities = [
  "Land", "Development strategy", "Design", "Professional teams",
  "Capital structuring", "Construction", "Sales / Offtake", "Technology", "Operations",
];

export default function DevelopmentPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Development", path: "/development" }])} />
      <PageHero
        eyebrow="Ochiga Development"
        title="Development built for what comes next."
        description="Ochiga originates, structures and delivers intelligent real-estate developments through direct development, joint ventures and strategic partnerships."
      >
        <div className="flex flex-wrap gap-4">
          <CTAButton href="/development/studies">View Development Studies</CTAButton>
          <CTAButton href="/partnerships/landowners" variant="secondary">Propose a Development</CTAButton>
        </div>
      </PageHero>

      <SectionBlock eyebrow="What Ochiga Brings Together" title="One team, across the full development chain.">
        <div className="flex flex-wrap gap-3">
          {capabilities.map((item) => (
            <span key={item} className="rounded border border-ochiga-white/15 px-4 py-2 text-sm text-ochiga-white/70">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ochiga-white/45">
          Ochiga does not currently operate a large existing development portfolio. This is a
          disciplined, deliberately staged build-out — see Development Studies below for where that
          starts.
        </p>
      </SectionBlock>

      <FullBleedMedia
        eyebrow="Ochiga Development"
        title="Development originated, structured and delivered — not simply built."
        surfaceLabel="Ochiga Development"
        tone="charcoal"
        imageSrc="/images/development/development-construction-network.webp"
        imageAlt="Illustrative concept render of a high-rise under construction overlaid with a connected technology network"
      />

      <SectionBlock eyebrow="Development Studies" title="Current development direction.">
        <div className="grid gap-8 md:grid-cols-2">
          <StudyCard
            index="01"
            name="Prime Vertical Living"
            summary="Approximately 18–21 storeys of high-end residential development, for sites where location, planning and land economics support vertical density."
            specs={["Premium apartments", "Family residences", "Penthouses", "Oyi throughout"]}
            href="/development/studies"
          />
          <StudyCard
            index="02"
            name="Contemporary Residential Community"
            summary="Approximately 40 premium homes on larger sites, subject to feasibility — terraces, townhouses, duplexes and landscaped communal space."
            specs={["Clubhouse", "Wellness & recreation", "Smart infrastructure", "Oyi integration"]}
            href="/development/studies"
          />
        </div>
      </SectionBlock>

      <StatementBlock
        eyebrow="Technology-Enabled by Design"
        statement="Every Ochiga development is conceived to run on Oyi from day one — not retrofitted after handover."
      />

      <SectionBlock eyebrow="Explore Development" title="">
        <TileGrid columns={4}>
          <TileCard href="/development/residential" tag="Residential" title="Residential Focus" body="Ochiga's current development direction." />
          <TileCard href="/development/mixed-use" tag="Future Sectors" title="Mixed Use" body="Where the development capability may extend next." />
          <TileCard href="/development/approach" tag="Approach" title="How We Develop" body="Opportunity through to operations." />
          <TileCard href="/development/joint-ventures" tag="Joint Ventures" title="Unlock Your Land" body="Structured partnerships with landowners." />
        </TileGrid>
      </SectionBlock>

      <CTABand
        eyebrow="Joint Ventures"
        title="Unlock the potential of your land."
        description="Ochiga evaluates strategically located real estate for structured development partnerships."
        ctas={[{ label: "Propose a Development", href: "/partnerships/landowners" }]}
      />
    </main>
  );
}
