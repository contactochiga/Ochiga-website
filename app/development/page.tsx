import type { Metadata } from "next";
import SectionBlock from "@/app/components/SectionBlock";
import StatementBlock from "@/app/components/StatementBlock";
import ProjectPreviewCard from "@/app/components/ProjectPreviewCard";
import StoryCarousel, { type StorySlide } from "@/app/components/StoryCarousel";
import CTABand from "@/app/components/CTABand";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.development);

const capabilities = [
  "Land", "Development strategy", "Design", "Professional teams",
  "Capital structuring", "Construction", "Sales / Offtake", "Technology", "Operations",
];

const STATUS_STAGES = ["Concept", "Design Development", "Project Preview", "Delivery"];

const developmentHeroSlides: StorySlide[] = [
  {
    key: "mission",
    eyebrow: "Ochiga Development",
    title: "We create places designed for how people will live next.",
    description:
      "Development, architecture, engineering and technology are considered together from the outset — so a building is designed not only to be delivered, but to operate and evolve.",
    ctaLabel: "See Current Developments",
    ctaHref: "#current-developments",
    tone: "charcoal",
    image: {
      src: "/images/development/development-construction-network.webp",
      alt: "High-rise development under construction, overlaid with a connected technology network",
    },
  },
  {
    key: "havana",
    eyebrow: "Havana Residences",
    title: "Premium vertical living, considered from the ground up.",
    description:
      "Havana Residences explores a new generation of vertical living — contemporary residential architecture, generous private spaces and intelligent-building infrastructure within one development. In design development.",
    ctaLabel: "Take a Tour",
    ctaHref: "/development/havana",
    tone: "charcoal",
    image: {
      src: "/images/development/havana-tower-dusk.webp",
      alt: "Havana Residences tower at dusk on the Lagos waterfront",
      position: "object-[55%_40%] md:object-[62%_38%]",
    },
  },
  {
    key: "green-gardens",
    eyebrow: "Green Gardens",
    title: "A contemporary residential community, designed as one living environment.",
    description:
      "Green Gardens brings modern homes, landscape, privacy and intelligent infrastructure together as a complete living environment. In design development.",
    ctaLabel: "Take a Tour",
    ctaHref: "/development/green-gardens",
    tone: "red",
    image: {
      src: "/images/development/green-gardens-estate-dusk.webp",
      alt: "Green Gardens residential community entrance at dusk",
      position: "object-[45%_45%] md:object-[52%_42%]",
    },
  },
];

export default function DevelopmentPage() {
  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Development", path: "/development" }])} />

      <StoryCarousel
        slides={developmentHeroSlides}
        ariaLabel="Ochiga Development highlights"
        sectionId="development-hero"
        sectionClassName="relative flex min-h-[88vh] flex-col justify-end overflow-hidden border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-24 pt-40 md:px-10 md:pb-28"
      />

      <SectionBlock eyebrow="What Ochiga Brings Together" title="One team, across the full development chain.">
        <div className="flex flex-wrap gap-3">
          {capabilities.map((item) => (
            <span key={item} className="rounded border border-ochiga-white/15 px-4 py-2 text-sm text-ochiga-white/70">
              {item}
            </span>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-sm text-ochiga-white/45">
          Ochiga does not currently operate a large existing development portfolio. Havana Residences
          and Green Gardens below are its current developments in design development — this is a
          disciplined, deliberately staged build-out.
        </p>
      </SectionBlock>

      <SectionBlock id="current-developments" eyebrow="Current Developments" title="Two developments, in design development.">
        <div className="grid gap-8 md:grid-cols-2">
          <ProjectPreviewCard
            name="Havana Residences"
            typeLine="Premium Vertical Living"
            location="Lagos, Nigeria"
            status="In Design Development"
            story="Havana Residences explores a new generation of vertical living — combining contemporary residential architecture, generous private spaces, intelligent-building infrastructure and long-term operational thinking within one development."
            imageSrc="/images/development/havana-tower-dusk.webp"
            imageAlt="Havana Residences tower at dusk on the Lagos waterfront"
            statusStages={STATUS_STAGES}
            statusActiveIndex={1}
            tourHref="/development/havana"
          />
          <ProjectPreviewCard
            name="Green Gardens"
            typeLine="Contemporary Residential Community"
            location="Lagos, Nigeria"
            status="In Design Development"
            story="Green Gardens is conceived as a contemporary residential community where modern homes, landscape, privacy and intelligent infrastructure are designed as a complete living environment rather than as isolated houses."
            imageSrc="/images/development/green-gardens-estate-dusk.webp"
            imageAlt="Green Gardens residential community entrance at dusk"
            statusStages={STATUS_STAGES}
            statusActiveIndex={1}
            tourHref="/development/green-gardens"
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
