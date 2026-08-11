import type { Metadata } from "next";
import SectionBlock from "@/app/components/SectionBlock";
import StatementBlock from "@/app/components/StatementBlock";
import ProjectPreviewCard from "@/app/components/ProjectPreviewCard";
import DevelopmentJourney, { type JourneyStage } from "@/app/components/DevelopmentJourney";
import PartnershipEcosystemDiagram from "@/app/components/PartnershipEcosystemDiagram";
import PerspectiveRail from "@/app/components/PerspectiveRail";
import StoryCarousel, { type StorySlide } from "@/app/components/StoryCarousel";
import StrategicPartnerForm from "@/app/components/forms/StrategicPartnerForm";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";
import { getPartnershipsInsights } from "@/lib/content";

export const metadata: Metadata = buildMetadata(seoPages.partnerships);

const HOW_IT_BEGINS_STAGES: JourneyStage[] = [
  { key: "introduce", label: "Introduce" },
  { key: "review", label: "Review" },
  { key: "structure", label: "Structure" },
  { key: "align", label: "Align" },
  { key: "execute", label: "Execute" },
];

const HOW_IT_BEGINS_DETAIL = [
  { title: "Introduce", body: "Tell us what you bring or what opportunity you want to discuss." },
  { title: "Review", body: "Ochiga reviews the opportunity, capability or proposed relationship." },
  { title: "Structure", body: "Where there is a fit, we determine an appropriate commercial or operating structure." },
  { title: "Align", body: "Scope, responsibilities, economics and expectations are aligned." },
  { title: "Execute", body: "The relationship moves into implementation." },
];

type PartnershipPath = {
  key: string;
  name: string;
  typeLine: string;
  story: string;
  imageTone: "black" | "charcoal" | "red";
  tourHref: string;
  tourLabel: string;
};

// Six paths into the Ochiga ecosystem. Each routes to the most coherent
// existing intake rather than a new duplicate form: Landowners keeps
// its specialist JV form, Delivery keeps the professional-disciplines
// form, Technology/Oyi routes into the Technology page's existing
// integrator flow, and Capital/Buyer-Offtake/Strategic share the
// generalized Partnership intake below (#partner-with-ochiga).
const PARTNERSHIP_PATHS: PartnershipPath[] = [
  {
    key: "landowners",
    name: "Landowners & Joint Ventures",
    typeLine: "Land & Development Partnership",
    story: "For landowners and property owners interested in structuring development relationships with Ochiga — land contribution, joint development, redevelopment and other development relationships.",
    imageTone: "charcoal",
    tourHref: "/partnerships/landowners#propose",
    tourLabel: "Discuss a Development Partnership",
  },
  {
    key: "capital",
    name: "Capital Partners",
    typeLine: "Direct Corporate Partnership",
    story: "For individuals, institutions, family offices, financiers and strategic capital relationships interested in selected Ochiga development opportunities.",
    imageTone: "black",
    tourHref: "/partnerships?type=capital#partner-with-ochiga",
    tourLabel: "Discuss Capital Partnership",
  },
  {
    key: "buyers-offtake",
    name: "Buyers & Offtake",
    typeLine: "Acquisition & Sales Relationships",
    story: "For organisations, institutions, corporate buyers, brokers and sales partners that may participate in property acquisition or structured project offtake.",
    imageTone: "red",
    tourHref: "/partnerships?type=buyer-offtake#partner-with-ochiga",
    tourLabel: "Discuss Offtake / Sales Partnership",
  },
  {
    key: "delivery",
    name: "Delivery Professionals",
    typeLine: "Architecture, Engineering & Construction",
    story: "Architects, engineers, quantity surveyors, project managers, contractors, specialists and suppliers Ochiga assembles capable teams around specific opportunities.",
    imageTone: "charcoal",
    tourHref: "/partnerships/professional#work-with-us",
    tourLabel: "Work With Ochiga",
  },
  {
    key: "technology",
    name: "Technology & Oyi Integrators",
    typeLine: "Building Technology Ecosystem",
    story: "Oyi integrators, installers, IoT and building-automation professionals, hardware/OEM relationships and technology companies deploying Oyi into buildings.",
    imageTone: "black",
    tourHref: "/technology?intent=integrator-program#deployment",
    tourLabel: "Become an Oyi Integrator",
  },
  {
    key: "strategic",
    name: "Strategic Partners",
    typeLine: "Institutional & Strategic Relationships",
    story: "For organisations whose capabilities can strengthen or extend the Ochiga ecosystem — technology companies, financial institutions, hospitality operators and other strategic relationships.",
    imageTone: "red",
    tourHref: "/partnerships?type=strategic#partner-with-ochiga",
    tourLabel: "Explore Strategic Partnership",
  },
];

const PARTNERSHIP_TYPES = [
  "Landowner / Joint Venture",
  "Capital Partner",
  "Buyer / Offtake",
  "Delivery / Professional",
  "Technology / Oyi Integrator",
  "Strategic Partner",
];

const TYPE_PREFILL_MAP: Record<string, string> = {
  capital: "Capital Partner",
  "buyer-offtake": "Buyer / Offtake",
  strategic: "Strategic Partner",
};

const partnershipsHeroSlides: StorySlide[] = [
  {
    key: "ecosystem",
    eyebrow: "Partnerships",
    title: "Built through partnership.",
    description: "Ochiga brings together property, capital, technology, professional expertise and market relationships around viable opportunities.",
    ctaLabel: "Partner With Ochiga",
    ctaHref: "/partnerships#partner-with-ochiga",
    tone: "charcoal",
    image: {
      src: "/images/development/development-skyline-dusk.webp",
      alt: "Premium residential skyline at dusk along a waterfront",
      position: "object-[55%_45%]",
    },
  },
  {
    key: "land-development",
    eyebrow: "Land + Development",
    title: "Opportunity starts with the right foundation.",
    description: "We work with landowners, property owners, developers and partners to structure selected development opportunities.",
    ctaLabel: "Discuss a Development Partnership",
    ctaHref: "/partnerships/landowners#propose",
    tone: "charcoal",
    image: {
      src: "/images/partnerships/partnerships-jv-handshake.webp",
      alt: "A landowner and an Ochiga representative reviewing architectural plans and a building model together",
      position: "object-[50%_40%]",
    },
  },
  {
    key: "capital-market",
    eyebrow: "Capital + Market",
    title: "Projects move when opportunity meets capital and market access.",
    description: "Ochiga works with capital relationships, buyers, institutions, sales partners and offtake relationships around selected opportunities.",
    ctaLabel: "Discuss Capital Partnership",
    ctaHref: "/partnerships?type=capital#partner-with-ochiga",
    tone: "black",
    surfaceLabel: "Ochiga Partnerships — Capital & Market",
  },
  {
    key: "delivery-technology",
    eyebrow: "Delivery + Technology",
    title: "Execution takes more than one capability.",
    description: "Architects, engineers, contractors, consultants, suppliers, technology partners and Oyi integrators help turn opportunity into operating reality.",
    ctaLabel: "See Partnership Paths",
    ctaHref: "#partnership-paths",
    tone: "charcoal",
    image: {
      src: "/images/oyi/oyi-integrator-program.webp",
      alt: "A team of professionals reviewing a building floor plan alongside connected devices, sensors and installation tools",
      position: "object-[38%_45%]",
    },
  },
  {
    key: "partner-with-ochiga",
    eyebrow: "Partner With Ochiga",
    title: "Different capabilities. One ecosystem.",
    description: "Whether you bring property, capital, expertise, technology, market access or strategic capability, the conversation begins with finding the right fit.",
    ctaLabel: "Partner With Ochiga",
    ctaHref: "/partnerships#partner-with-ochiga",
    tone: "red",
    surfaceLabel: "Ochiga Partnerships",
  },
];

export default async function PartnershipsPage() {
  const insights = (await getPartnershipsInsights()).slice(0, 6);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Partnerships", path: "/partnerships" }])} />

      <StoryCarousel
        slides={partnershipsHeroSlides}
        ariaLabel="Ochiga Partnerships highlights"
        sectionId="partnerships-hero"
        sectionClassName="relative flex min-h-[88vh] flex-col justify-end overflow-hidden border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-24 pt-40 md:px-10 md:pb-28"
      />

      <StatementBlock eyebrow="Our Ecosystem" statement="Ochiga works through an ecosystem.">
        <p className="max-w-xl text-base leading-relaxed text-ochiga-white/65">
          The question is not where a relationship begins — it&apos;s whether it aligns around a viable
          opportunity.
        </p>
      </StatementBlock>

      <SectionBlock eyebrow="Our Ecosystem" title="One ecosystem. Multiple ways to build together.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Ochiga works across development, technology and private real-estate relationships. Because of
          that, partnership can begin from different positions — land, capital, technology, professional
          expertise, market access, an opportunity, or a strategic capability.
        </p>
        <div className="mt-12">
          <PartnershipEcosystemDiagram />
        </div>
      </SectionBlock>

      <SectionBlock id="partnership-paths" eyebrow="Partnership Paths" title="Six ways to build with Ochiga.">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {PARTNERSHIP_PATHS.map((path) => (
            <ProjectPreviewCard
              key={path.key}
              name={path.name}
              typeLine={path.typeLine}
              story={path.story}
              imageTone={path.imageTone}
              tourHref={path.tourHref}
              tourLabel={path.tourLabel}
            />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock eyebrow="How A Partnership Begins" title="From introduction to implementation.">
        <DevelopmentJourney stages={HOW_IT_BEGINS_STAGES} />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {HOW_IT_BEGINS_DETAIL.map((item) => (
            <div key={item.title} className="border-t border-ochiga-white/10 pt-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-ochiga-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ochiga-white/60">{item.body}</p>
            </div>
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="partner-with-ochiga" eyebrow="Partner With Ochiga" title="Tell us what you bring or the opportunity you&apos;d like to discuss.">
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Landowner and Oyi integrator enquiries route to their specialist forms above. For every other
          partnership path, start the conversation here.
        </p>
        <div className="max-w-2xl">
          <StrategicPartnerForm
            partnerTypeOptions={PARTNERSHIP_TYPES}
            partnerTypeLabel="Partnership type"
            descriptionLabel="Short description / proposal"
            typePrefillMap={TYPE_PREFILL_MAP}
            submitLabel="Partner With Ochiga"
          />
        </div>
      </SectionBlock>

      {insights.length ? (
        <SectionBlock eyebrow="Ochiga Perspective" title="Ochiga perspectives on partnership.">
          <PerspectiveRail insights={insights} />
        </SectionBlock>
      ) : null}
    </main>
  );
}
