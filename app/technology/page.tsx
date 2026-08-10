import type { Metadata } from "next";
import SectionBlock from "@/app/components/SectionBlock";
import StatementBlock from "@/app/components/StatementBlock";
import CTAButton from "@/app/components/CTAButton";
import ProjectPreviewCard from "@/app/components/ProjectPreviewCard";
import DevelopmentJourney, { type JourneyStage } from "@/app/components/DevelopmentJourney";
import TechnologyCapabilityRail from "@/app/components/TechnologyCapabilityRail";
import TechnologyConnectDiagram from "@/app/components/TechnologyConnectDiagram";
import PilotPromoBanner from "@/app/components/PilotPromoBanner";
import PerspectiveRail from "@/app/components/PerspectiveRail";
import StoryCarousel, { type StorySlide } from "@/app/components/StoryCarousel";
import OyiDeploymentForm from "@/app/components/forms/OyiDeploymentForm";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";
import { companyInfo } from "@/lib/company";
import { getTechnologyInsights } from "@/lib/content";

export const metadata: Metadata = buildMetadata(seoPages.technology);

// Set to false (or delete the <PilotPromoBanner /> line below and this
// file) to remove the pilot offer without touching anything else.
const SHOW_PILOT_PROMO = true;

const TRADITIONAL_STAGES: JourneyStage[] = [
  { key: "design", label: "Design" },
  { key: "build", label: "Build" },
  { key: "handover", label: "Handover" },
];

const OCHIGA_STAGES: JourneyStage[] = [
  { key: "design", label: "Design" },
  { key: "build", label: "Build" },
  { key: "connect", label: "Connect" },
  { key: "operate", label: "Operate" },
  { key: "learn", label: "Learn" },
  { key: "improve", label: "Improve" },
];

// Data-driven so future technology offerings can be appended as cards
// without touching the section that renders them.
type TechnologyProduct = {
  key: string;
  name: string;
  typeLine: string;
  story: string;
  imageSrc: string;
  imageAlt: string;
  tourHref: string;
};

const TECHNOLOGY_PRODUCTS: TechnologyProduct[] = [
  {
    key: "facility-os",
    name: "Oyi Facility OS",
    typeLine: "Building & Facility Operations",
    story:
      "One operating environment for building and facility teams — infrastructure, assets, utilities, maintenance and access, coordinated in one place instead of scattered across disconnected systems.",
    imageSrc: "/images/oyi/oyi-command-center.webp",
    imageAlt: "Building operations command centre with a wall of monitors showing live building data",
    tourHref: "/technology/facility-os",
  },
  {
    key: "experience",
    name: "Oyi Experience",
    typeLine: "Resident & Occupant Experience",
    story:
      "A connected experience for the people who live in, work in and visit a building — access, devices, services and everyday building life in one interface.",
    imageSrc: "/images/oyi/oyi-smart-lobby-dashboard.webp",
    imageAlt: "Building lobby overlaid with resident access, visitor and utility interface elements",
    tourHref: "/technology/experience",
  },
  {
    key: "core",
    name: "Oyi Core",
    typeLine: "Building Intelligence",
    story:
      "The intelligence and orchestration layer beneath Oyi — interpreting what is happening across a building and coordinating a secure, permissioned response.",
    imageSrc: "/images/oyi/oyi-digital-twin-preview.webp",
    imageAlt: "Live digital twin of a building with asset status and alert data panels",
    tourHref: "/technology/core",
  },
];

const BUILDING_ENVIRONMENTS = [
  { key: "residential-towers", label: "Residential Towers" },
  { key: "residential-communities", label: "Residential Communities" },
  { key: "mixed-use", label: "Mixed-Use Developments" },
  { key: "hospitality", label: "Hospitality" },
  { key: "commercial", label: "Commercial Buildings" },
  { key: "portfolios", label: "Managed Building Portfolios" },
];

function EnvironmentIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d="M4 21V7l8-4 8 4v14" />
      <path d="M9 21V13h6v8" />
      <path d="M4 21h16" />
    </svg>
  );
}

const technologyHeroSlides: StorySlide[] = [
  {
    key: "ochiga-technology",
    eyebrow: "Ochiga Technology",
    title: "Buildings should keep getting smarter after they're built.",
    description:
      "Ochiga's technology division designs the operating layer that lets a development keep evolving long after handover — starting with Oyi.",
    ctaLabel: "Explore Our Technology",
    ctaHref: "#our-technology",
    tone: "charcoal",
    image: {
      src: "/images/oyi/oyi-hero-operating-intelligence.webp",
      alt: "Smart building lobby overlaid with access control, energy, climate and security interface elements",
    },
  },
  {
    key: "operating-technology",
    eyebrow: "Building Operating Technology",
    title: "One operating layer for every building system.",
    description:
      "Oyi connects access, energy, climate, utilities and building infrastructure into a single coordinated layer — the technology foundation beneath every Ochiga environment.",
    ctaLabel: "See How It Works",
    ctaHref: "#evolving",
    tone: "charcoal",
    image: {
      src: "/images/oyi/oyi-command-center-ui.webp",
      alt: "Building operations desk with monitors overlooking a residential skyline",
      position: "object-[50%_35%]",
    },
  },
  {
    key: "operations",
    eyebrow: "Operations",
    title: "Command and clarity for the teams who run a building.",
    description:
      "Facility and building teams get one place to see infrastructure, assets, maintenance and utilities — instead of stitching together disconnected systems.",
    ctaLabel: "Explore Oyi Facility OS",
    ctaHref: "/technology/facility-os",
    tone: "black",
    image: {
      src: "/images/oyi/oyi-command-center.webp",
      alt: "Building operations control room with a wall of monitors showing live building data",
    },
  },
  {
    key: "experience",
    eyebrow: "Experience",
    title: "A connected experience for the people who live and work there.",
    description:
      "Residents, tenants and guests get one interface for access, services, devices and everyday building life.",
    ctaLabel: "Explore Oyi Experience",
    ctaHref: "/technology/experience",
    tone: "red",
    image: {
      src: "/images/oyi/oyi-smart-lobby-dashboard.webp",
      alt: "Building lobby overlaid with resident access, visitor and utility interface elements",
    },
  },
  {
    key: "intelligence",
    eyebrow: "Intelligence",
    title: "Awareness that turns building data into action.",
    description:
      "Oyi Core interprets what's happening across a building and coordinates a secure, permissioned response — the intelligence layer beneath the experience.",
    ctaLabel: "Explore Oyi Core",
    ctaHref: "/technology/core",
    tone: "charcoal",
    image: {
      src: "/images/oyi/oyi-digital-twin-preview.webp",
      alt: "Live digital twin of a building with asset status and alert data panels",
    },
  },
];

export default async function TechnologyPage() {
  const insights = (await getTechnologyInsights()).slice(0, 6);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Technology", path: "/technology" }])} />

      <StoryCarousel
        slides={technologyHeroSlides}
        ariaLabel="Ochiga Technology highlights"
        sectionId="technology-hero"
        sectionClassName="relative flex min-h-[88vh] flex-col justify-end overflow-hidden border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-24 pt-40 md:px-10 md:pb-28"
      />

      {SHOW_PILOT_PROMO ? <PilotPromoBanner /> : null}

      <StatementBlock eyebrow="Ochiga Technology" statement="A building should not stop evolving at handover.">
        <p className="max-w-xl text-base leading-relaxed text-ochiga-white/65">From a finished building to a living one.</p>
      </StatementBlock>

      <SectionBlock id="evolving" eyebrow="Why Oyi Exists" title="Traditional development ends at handover. Ochiga developments continue.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Most developments are designed, built and handed over — after that, how the building runs is
          someone else&apos;s problem. Ochiga designs technology into a development from the outset, so
          the same team that designs and builds a building can also help it connect, operate, learn and
          improve once people are living and working in it.
        </p>

        <div className="mt-14 space-y-12">
          <div>
            <p className="mb-6 text-xs uppercase tracking-eyebrow text-ochiga-white/45">Traditional Development</p>
            <DevelopmentJourney stages={TRADITIONAL_STAGES} />
          </div>
          <div>
            <p className="mb-6 text-xs uppercase tracking-eyebrow text-ochiga-white/45">Ochiga, with Oyi</p>
            <DevelopmentJourney stages={OCHIGA_STAGES} />
          </div>
        </div>

        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ochiga-white/50">
          This does not mean every Ochiga development has every Oyi capability deployed on day one —
          it means the option to connect, operate, learn and improve is designed in from the start,
          rather than retrofitted later.
        </p>
      </SectionBlock>

      <SectionBlock id="our-technology" eyebrow="Our Technology" title="One technology company. A growing set of capabilities.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Oyi is Ochiga&apos;s flagship building operating technology today. It is delivered as a set of
          connected products, each addressing a different part of how a building runs.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {TECHNOLOGY_PRODUCTS.map((product) => (
            <ProjectPreviewCard
              key={product.key}
              name={product.name}
              typeLine={product.typeLine}
              story={product.story}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              tourHref={product.tourHref}
            />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="What Oyi Connects" title="One operating layer, connected to everything around a building.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Oyi sits at the centre of a building&apos;s operating environment — connecting the people, teams
          and systems that keep it running.
        </p>
        <div className="mt-12">
          <TechnologyConnectDiagram />
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Technology Capabilities" title="A connected technology layer, not a list of disconnected features.">
        <TechnologyCapabilityRail />
      </SectionBlock>

      <SectionBlock eyebrow="Where Oyi Applies" title="Built for different building environments.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Oyi is designed to apply across the environments Ochiga and its partners build and manage —
          not claims about where it has already been deployed.
        </p>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3">
          {BUILDING_ENVIRONMENTS.map((environment) => (
            <div key={environment.key} className="flex items-center gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/70">
                <EnvironmentIcon />
              </span>
              <span className="text-sm text-ochiga-white/70">{environment.label}</span>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="Explore Oyi" title="Go deeper into the Oyi experience.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Oyi is Ochiga&apos;s complete building operating platform — the full product experience, in
          depth, lives on its own dedicated home.
        </p>
        <div className="mt-8">
          <CTAButton href={companyInfo.oyiWebsite} variant="secondary" external>
            Explore Oyi →
          </CTAButton>
        </div>
      </SectionBlock>

      <SectionBlock id="deployment" eyebrow="Technology Deployment" title="Bring Ochiga technology into your building.">
        <p className="mb-12 max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Tell us about your building and requirements, and our team will follow up with the
          appropriate next step.
        </p>
        <OyiDeploymentForm />
      </SectionBlock>

      {insights.length ? (
        <SectionBlock eyebrow="Ochiga Perspective" title="Ochiga perspectives on technology.">
          <PerspectiveRail insights={insights} />
        </SectionBlock>
      ) : null}
    </main>
  );
}
