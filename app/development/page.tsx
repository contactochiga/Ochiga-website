import type { Metadata } from "next";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import ProjectPreviewCard from "@/app/components/ProjectPreviewCard";
import DevelopmentJourney, { type JourneyStage } from "@/app/components/DevelopmentJourney";
import OyiCapabilitySection from "@/app/components/OyiCapabilitySection";
import PerspectiveRail from "@/app/components/PerspectiveRail";
import StoryCarousel, { type StorySlide } from "@/app/components/StoryCarousel";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";
import { ctas } from "@/lib/company";
import { getDevelopmentInsights } from "@/lib/content";
import { getDevelopmentProjectOverrides } from "@/lib/development";

export const metadata: Metadata = buildMetadata(seoPages.development);

const JOURNEY_STAGES: JourneyStage[] = [
  { key: "land", label: "Land" },
  { key: "strategy", label: "Strategy" },
  { key: "design", label: "Design" },
  { key: "capital", label: "Capital" },
  { key: "delivery", label: "Delivery" },
  { key: "sales", label: "Sales" },
  { key: "technology", label: "Technology" },
  { key: "operations", label: "Operations" },
];

const STATUS_STAGES = ["Concept", "Design Development", "Project Preview", "Delivery"];

// Base card content for Current Developments. Office-managed overrides
// (status, milestone stage, order, cover image) are merged in per-slug
// at render time by mergeCurrentDevelopmentCard below; a missing or
// unavailable override leaves this hardcoded content untouched.
type CurrentDevelopmentCard = {
  slug: string;
  name: string;
  typeLine: string;
  location: string;
  status: string;
  story: string;
  imageSrc: string;
  imageAlt: string;
  statusStages: string[];
  statusActiveIndex: number;
  tourHref: string;
  order: number;
};

const CURRENT_DEVELOPMENTS: CurrentDevelopmentCard[] = [
  {
    slug: "havana",
    name: "Havana Residences",
    typeLine: "Premium Vertical Living",
    location: "Victoria Island, Lagos, Nigeria",
    status: "In Design Development",
    story:
      "A new generation of vertical living combining contemporary architecture, intelligent infrastructure and long-term operational thinking.",
    imageSrc: "/images/development/havana-tower-dusk.webp",
    imageAlt: "Havana Residences tower at dusk on the Lagos waterfront",
    statusStages: STATUS_STAGES,
    statusActiveIndex: 1,
    tourHref: "/development/havana",
    order: 0,
  },
  {
    slug: "green-gardens",
    name: "Green Gardens",
    typeLine: "Contemporary Residential Community",
    location: "Ikoyi, Lagos, Nigeria",
    status: "In Design Development",
    story:
      "A thoughtfully planned residential community where modern homes, landscape, privacy and intelligent infrastructure are designed as one complete environment.",
    imageSrc: "/images/development/green-gardens-estate-dusk.webp",
    imageAlt: "Green Gardens residential community entrance at dusk",
    statusStages: STATUS_STAGES,
    statusActiveIndex: 1,
    tourHref: "/development/green-gardens",
    order: 1,
  },
  {
    slug: "central-one",
    name: "Central One",
    typeLine: "Mixed-Use Urban Development",
    location: "Central Area, Abuja, Nigeria",
    status: "In Design Development",
    story:
      "Central One brings together contemporary residences, hospitality, commercial activity, landscaped outdoor spaces and lifestyle amenities within one connected development.",
    imageSrc: "/images/development/central-one-aerial-night.webp",
    imageAlt: "Central One mixed-use development, aerial night render",
    statusStages: STATUS_STAGES,
    statusActiveIndex: 1,
    tourHref: "/development/central-one",
    order: 2,
  },
];

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

export default async function DevelopmentPage() {
  const insights = (await getDevelopmentInsights()).slice(0, 6);
  const overrides = await getDevelopmentProjectOverrides();
  const currentDevelopments = CURRENT_DEVELOPMENTS.map((card) => {
    const override = overrides[card.slug];
    if (!override) return card;
    return {
      ...card,
      name: override.name || card.name,
      typeLine: override.typeLine || card.typeLine,
      location: override.location || card.location,
      status: override.status || card.status,
      imageSrc: override.coverImage?.src || card.imageSrc,
      imageAlt: override.coverImage?.alt || card.imageAlt,
      statusStages: override.statusStages || card.statusStages,
      statusActiveIndex: override.statusActiveIndex ?? card.statusActiveIndex,
      order: override.order ?? card.order,
    };
  }).sort((a, b) => a.order - b.order);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Development", path: "/development" }])} />

      <StoryCarousel
        slides={developmentHeroSlides}
        ariaLabel="Ochiga Development highlights"
        sectionId="development-hero"
        sectionClassName="relative flex min-h-[88vh] flex-col justify-end overflow-hidden border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-24 pt-40 md:px-10 md:pb-28"
      />

      <SectionBlock eyebrow="What Ochiga Brings Together" title="One development. One integrated team.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          From land and development strategy through design, capital, construction, sales and
          long-term operations, Ochiga brings the disciplines required to move a development from
          opportunity to operating asset.
        </p>
        <div className="mt-12">
          <DevelopmentJourney stages={JOURNEY_STAGES} />
        </div>
      </SectionBlock>

      <SectionBlock id="current-developments" eyebrow="Current Developments">
        <div className="grid gap-8 md:grid-cols-3">
          {currentDevelopments.map((card) => (
            <ProjectPreviewCard
              key={card.slug}
              name={card.name}
              typeLine={card.typeLine}
              location={card.location}
              status={card.status}
              story={card.story}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              statusStages={card.statusStages}
              statusActiveIndex={card.statusActiveIndex}
              tourHref={card.tourHref}
            />
          ))}
        </div>
      </SectionBlock>

      <OyiCapabilitySection />

      <SectionBlock eyebrow="Explore Development" title="Have a development opportunity?">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          From land and early-stage concepts to structured partnerships, development delivery and
          technology-enabled operations, Ochiga works with landowners, developers and partners to
          shape viable developments.
        </p>
        <div className="mt-8">
          <CTAButton href={ctas.proposeDevelopment.href}>{ctas.proposeDevelopment.label} →</CTAButton>
        </div>
      </SectionBlock>

      {insights.length ? (
        <SectionBlock eyebrow="Ochiga Perspective" title="Ochiga perspectives on development.">
          <PerspectiveRail insights={insights} />
        </SectionBlock>
      ) : null}
    </main>
  );
}
