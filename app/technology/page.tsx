import type { Metadata } from "next";
import SectionBlock from "@/app/components/SectionBlock";
import StatementBlock from "@/app/components/StatementBlock";
import CTAButton from "@/app/components/CTAButton";
import ProjectPreviewCard from "@/app/components/ProjectPreviewCard";
import DevelopmentJourney, { type JourneyStage } from "@/app/components/DevelopmentJourney";
import TechnologyCapabilityRail from "@/app/components/TechnologyCapabilityRail";
import TechnologyConnectDiagram from "@/app/components/TechnologyConnectDiagram";
import PerspectiveRail from "@/app/components/PerspectiveRail";
import StoryCarousel, { type StorySlide } from "@/app/components/StoryCarousel";
import OyiDeploymentForm from "@/app/components/forms/OyiDeploymentForm";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";
import { companyInfo } from "@/lib/company";
import { getTechnologyInsights } from "@/lib/content";

export const metadata: Metadata = buildMetadata(seoPages.technology);

const CONSTRUCTION_LIFECYCLE: JourneyStage[] = [
  { key: "design", label: "Design" },
  { key: "build", label: "Build" },
  { key: "handover", label: "Handover" },
];

const CONNECTED_BUILDING_LIFECYCLE: JourneyStage[] = [
  { key: "connect", label: "Connect" },
  { key: "operate", label: "Operate" },
  { key: "learn", label: "Learn" },
  { key: "improve", label: "Improve" },
];

const FULL_LIFECYCLE: JourneyStage[] = [
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
  imagePosition?: string;
  tourHref: string;
};

const TECHNOLOGY_PRODUCTS: TechnologyProduct[] = [
  {
    key: "facility-os",
    name: "Oyi Facility OS",
    typeLine: "Building & Facility Operations",
    story:
      "One operating environment for building and facility teams — infrastructure, assets, utilities, maintenance and access, coordinated in one place instead of scattered across disconnected systems.",
    imageSrc: "/images/oyi/oyi-facility-os-command-centre.webp",
    imageAlt: "Oyi Facility OS command centre dashboard for a residential building, alongside connected access and metering hardware",
    imagePosition: "object-[68%_38%]",
    tourHref: "/technology/facility-os",
  },
  {
    key: "experience",
    name: "Oyi Experience",
    typeLine: "Resident & Occupant Experience",
    story:
      "A connected experience for the people who live in, work in and visit a building — access, devices, services and everyday building life in one interface.",
    imageSrc: "/images/oyi/oyi-experience-devices-floorplan.webp",
    imageAlt: "Oyi Experience app open on a tablet, phone and watch, showing a home overview and room-level floor plan",
    imagePosition: "object-[60%_50%]",
    tourHref: "/technology/experience",
  },
  {
    key: "core",
    name: "Oyi Core",
    typeLine: "Building Intelligence",
    story:
      "The intelligence and orchestration layer beneath Oyi — interpreting what is happening across a building and coordinating a secure, permissioned response.",
    imageSrc: "/images/oyi/oyi-core-digital-twin.webp",
    imageAlt: "Oyi Core digital twin connecting lighting, HVAC, security, energy, water, elevators, access and fire-safety systems",
    imagePosition: "object-[38%_48%]",
    tourHref: "/technology/core",
  },
];

type BuildingEnvironment = { key: string; label: string; description?: string };

const BUILDING_ENVIRONMENTS: BuildingEnvironment[] = [
  { key: "residential-towers", label: "Residential Towers" },
  { key: "residential-communities", label: "Residential Communities" },
  { key: "mixed-use", label: "Mixed-Use Developments" },
  { key: "commercial", label: "Commercial Buildings" },
  { key: "hospitality", label: "Hospitality" },
  { key: "portfolios", label: "Managed Building Portfolios" },
  { key: "custom", label: "Custom Deployment", description: "Configured around your building, infrastructure and operating model." },
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

// A five-frame sales story, not a generic corporate carousel: Facility
// Operations → Resident Experience → Building Intelligence → Connected
// Infrastructure → the Integrator Program. Same StoryCarousel engine as
// Development — no new control system. Image weight is biased toward
// the right (via objectPosition) on the two slides that call for it
// explicitly; hero copy always sits bottom-left.
const technologyHeroSlides: StorySlide[] = [
  {
    key: "facility-os",
    eyebrow: "Oyi Facility OS",
    title: "One connected operating view for the building.",
    description:
      "Infrastructure, assets, utilities, maintenance and access — coordinated in one place for the teams who run a building.",
    ctaLabel: "Explore Facility OS →",
    ctaHref: "/technology/facility-os",
    tone: "charcoal",
    image: {
      src: "/images/oyi/oyi-facility-os-command-centre.webp",
      alt: "Oyi Facility OS command centre dashboard for a residential building, showing building status, system health and real-time activity, alongside connected access and metering hardware",
      position: "object-[85%_45%] md:object-[65%_42%]",
    },
  },
  {
    key: "experience",
    eyebrow: "Oyi Experience",
    title: "A smart living experience, in your pocket and on your wrist.",
    description: "Devices, scenes, access and everyday building life — connected across phone, tablet and watch.",
    ctaLabel: "Explore Oyi Experience →",
    ctaHref: "/technology/experience",
    tone: "red",
    image: {
      src: "/images/oyi/oyi-experience-devices-floorplan.webp",
      alt: "Oyi Experience app open on a tablet, phone and watch, showing a home overview and room-level floor plan, in front of a modern residence at dusk",
      position: "object-[70%_75%] md:object-[62%_55%]",
    },
  },
  {
    key: "core",
    eyebrow: "Oyi Core",
    title: "The intelligence layer beneath every building system.",
    description:
      "Oyi Core senses, understands and coordinates a building's systems — lighting, HVAC, security, energy, water, elevators, access and fire safety — as one connected picture.",
    ctaLabel: "Explore Oyi Core →",
    ctaHref: "/technology/core",
    tone: "charcoal",
    image: {
      src: "/images/oyi/oyi-core-digital-twin.webp",
      alt: "Oyi Core digital twin of a building connecting lighting, HVAC, security, energy, water, elevators, access and fire-safety systems into one operating view",
      position: "object-[32%_50%] md:object-[40%_48%]",
    },
  },
  {
    key: "infrastructure",
    eyebrow: "Connected Infrastructure",
    title: "Software that reaches the real building.",
    description:
      "Oyi connects to the devices, meters, sensors and access systems already running inside a building — not just a screen, but the infrastructure behind it.",
    ctaLabel: "See What Oyi Connects →",
    ctaHref: "#connects",
    tone: "black",
    image: {
      src: "/images/oyi/oyi-connected-devices-residence.webp",
      alt: "Oyi app on a phone, tablet and watch in front of a modern residence at dusk, controlling the building's lighting, climate and security",
      position: "object-[68%_80%] md:object-[64%_55%]",
    },
  },
  {
    key: "integrator-program",
    eyebrow: "Oyi Integrator Program",
    title: "Deploy intelligent building technology with Oyi.",
    description: "For installers, systems integrators and technical partners who want to deliver connected building experiences using Oyi.",
    ctaLabel: "Become an Integrator →",
    ctaHref: "/technology?intent=integrator-program#deployment",
    tone: "charcoal",
    image: {
      src: "/images/oyi/oyi-integrator-program.webp",
      alt: "A team of Oyi integrators reviewing a building floor plan alongside connected devices, sensors and installation tools",
      position: "object-[35%_65%] md:object-[42%_45%]",
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

      <StatementBlock eyebrow="Why Technology Matters" statement="A building should not stop evolving at handover.">
        <p className="max-w-xl text-base leading-relaxed text-ochiga-white/65">
          Construction may end at handover, but the building continues to operate every day.
        </p>
      </StatementBlock>

      <SectionBlock id="why-technology-matters" eyebrow="The Problem" title="Buildings run on fragmented systems, teams and data.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          The issue is rarely that a building has no systems — most have several. Utilities, access,
          maintenance, residents, services, infrastructure and building teams all continue generating
          activity long after handover. When those systems operate separately, the building becomes
          harder to understand, coordinate and improve. Ochiga Technology connects those layers into
          one more coherent operating environment.
        </p>

        <div className="mt-14 space-y-12">
          <div>
            <p className="mb-6 text-xs uppercase tracking-eyebrow text-ochiga-white/45">Construction Lifecycle</p>
            <DevelopmentJourney stages={CONSTRUCTION_LIFECYCLE} />
          </div>
          <div>
            <p className="mb-6 text-xs uppercase tracking-eyebrow text-ochiga-white/45">Connected Building Lifecycle</p>
            <DevelopmentJourney stages={CONNECTED_BUILDING_LIFECYCLE} />
          </div>
          <div>
            <p className="mb-6 text-xs uppercase tracking-eyebrow text-ochiga-white/45">The Full Lifecycle</p>
            <DevelopmentJourney stages={FULL_LIFECYCLE} />
          </div>
        </div>

        <div className="mt-12 max-w-2xl rounded border border-oyi-blue/25 bg-oyi-blue/[0.06] p-6">
          <p className="text-sm leading-relaxed text-ochiga-white/80">
            Oyi can be designed into a development from the beginning, or integrated later into an
            existing operating building. Either way, the goal is the same: connect, operate, learn and
            improve — not just design, build and hand over.
          </p>
        </div>
      </SectionBlock>

      <SectionBlock id="our-technology" eyebrow="Our Technology" title="One building operating technology. A growing set of capabilities.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Oyi connects infrastructure, building operations, resident experience and intelligence
          through one operating layer. It can be designed into new developments or integrated into
          existing buildings and portfolios.
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
              imagePosition={product.imagePosition}
              tourHref={product.tourHref}
            />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="connects" eyebrow="What Oyi Connects" title="One operating layer. Everything around the building connected.">
        <div className="mt-2">
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
            <div key={environment.key} className="flex items-start gap-3">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/15 text-ochiga-white/70">
                <EnvironmentIcon />
              </span>
              <span>
                <span className="block text-sm text-ochiga-white/70">{environment.label}</span>
                {environment.description ? (
                  <span className="mt-1 block text-xs leading-relaxed text-ochiga-white/45">{environment.description}</span>
                ) : null}
              </span>
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
