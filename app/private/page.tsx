import type { Metadata } from "next";
import SectionBlock from "@/app/components/SectionBlock";
import StatementBlock from "@/app/components/StatementBlock";
import CTAButton from "@/app/components/CTAButton";
import SplitSection from "@/app/components/SplitSection";
import ProjectPreviewCard from "@/app/components/ProjectPreviewCard";
import DevelopmentJourney, { type JourneyStage } from "@/app/components/DevelopmentJourney";
import TrustDisclaimer from "@/app/components/TrustDisclaimer";
import PerspectiveRail from "@/app/components/PerspectiveRail";
import StoryCarousel, { type StorySlide } from "@/app/components/StoryCarousel";
import PrivateMembershipForm from "@/app/components/forms/PrivateMembershipForm";
import JsonLd from "@/app/components/JsonLd";
import { buildMetadata, breadcrumbJsonLd, seoPages } from "@/lib/seo";
import { getPrivateInsights } from "@/lib/content";

export const metadata: Metadata = buildMetadata(seoPages.private);

const TRADITIONAL_STAGES: JourneyStage[] = [
  { key: "project", label: "Project" },
  { key: "marketing", label: "Marketing" },
  { key: "buyer", label: "Buyer" },
  { key: "sales", label: "Sale" },
];

const PRIVATE_STAGES: JourneyStage[] = [
  { key: "member", label: "Member" },
  { key: "profile", label: "Profile" },
  { key: "opportunity", label: "Opportunity" },
  { key: "participation", label: "Participation" },
  { key: "relationship", label: "Relationship" },
  { key: "future", label: "Future Opportunities" },
];

const HOW_IT_WORKS_STAGES: JourneyStage[] = [
  { key: "apply", label: "Apply" },
  { key: "qualify", label: "Qualify" },
  { key: "access", label: "Access" },
  { key: "participation", label: "Participate" },
  { key: "grow", label: "Grow" },
];

const HOW_IT_WORKS_DETAIL = [
  { title: "Apply", body: "Request membership and tell us about yourself and your interests." },
  { title: "Qualify", body: "We review the profile and understand what kind of relationship and opportunities may be relevant." },
  { title: "Access", body: "Relevant opportunities and relationships may be introduced to appropriate members." },
  { title: "Participate", body: "Members independently decide whether an opportunity fits their objectives." },
  { title: "Grow", body: "The relationship continues across future opportunities." },
];

type OpportunityCategory = {
  key: string;
  name: string;
  typeLine: string;
  story: string;
  imageTone: "black" | "charcoal" | "red";
};

const OPPORTUNITY_CATEGORIES: OpportunityCategory[] = [
  {
    key: "income",
    name: "Income",
    typeLine: "Recurring Property Income",
    story: "Property opportunities oriented around recurring property income and long-term ownership.",
    imageTone: "charcoal",
  },
  {
    key: "appreciation",
    name: "Appreciation",
    typeLine: "Longer-Term Value Growth",
    story: "Property positioned around longer-term value growth.",
    imageTone: "black",
  },
  {
    key: "development",
    name: "Development",
    typeLine: "Development-Linked Opportunities",
    story: "Selected development-linked, early-stage and property-development opportunities.",
    imageTone: "red",
  },
  {
    key: "strategic",
    name: "Strategic",
    typeLine: "Institutional & Strategic Participation",
    story: "Bespoke opportunities, larger relationships and institutional or strategic participation where appropriate.",
    imageTone: "charcoal",
  },
];

const ECOSYSTEM = [
  {
    key: "development",
    name: "Ochiga Development",
    body: "We design, structure, construct and develop real estate.",
    href: "/development",
  },
  {
    key: "technology",
    name: "Ochiga Technology",
    body: "We connect, operate and intelligently manage buildings through Oyi.",
    href: "/technology",
  },
  {
    key: "private",
    name: "Ochiga Private",
    body: "We build private relationships around property, ownership, capital and long-term participation.",
    href: null,
  },
];

const privateHeroSlides: StorySlide[] = [
  {
    key: "private",
    eyebrow: "Ochiga Private",
    title: "The best opportunities don't always begin in the public market.",
    description: "Some opportunities begin through relationships — between property, people, capital and timing.",
    ctaLabel: "Request Membership",
    ctaHref: "/private#membership",
    tone: "charcoal",
    image: {
      src: "/images/development/development-skyline-dusk.webp",
      alt: "Premium residential skyline at dusk along a waterfront",
      position: "object-[55%_45%]",
    },
  },
  {
    key: "membership",
    eyebrow: "Membership",
    title: "A private network built around people, property and opportunity.",
    description: "Ochiga Private builds long-term relationships with individuals, institutions, property owners and partners around selected real-estate opportunities.",
    ctaLabel: "Request Membership",
    ctaHref: "/private#membership",
    tone: "black",
    surfaceLabel: "Ochiga Private — Membership",
  },
  {
    key: "opportunity",
    eyebrow: "Opportunity",
    title: "Access selected opportunities across the Ochiga ecosystem.",
    description:
      "From development and early property opportunities to income, appreciation and strategic participation, members can be introduced to opportunities relevant to their interests and profile.",
    ctaLabel: "See Opportunity Types",
    ctaHref: "#opportunities",
    tone: "charcoal",
    image: {
      src: "/images/development/development-skyline-dusk.webp",
      alt: "Premium residential skyline at dusk along a waterfront",
      position: "object-[40%_55%]",
    },
  },
  {
    key: "capital-relationships",
    eyebrow: "Capital + Relationships",
    title: "Capital meets opportunity through the right relationships.",
    description:
      "Ochiga Private connects selected property and development opportunities with relevant capital relationships, buyers, partners and strategic participation across the network.",
    ctaLabel: "See How It Works",
    ctaHref: "#how-it-works",
    tone: "red",
    surfaceLabel: "Ochiga Private — Capital & Relationships",
  },
  {
    key: "long-term",
    eyebrow: "Long-Term Relationship",
    title: "Built beyond a single transaction.",
    description: "Ochiga Private learns what members are looking for and builds relationships around future opportunities, participation and long-term value.",
    ctaLabel: "Request Membership",
    ctaHref: "/private#membership",
    tone: "black",
    surfaceLabel: "Ochiga Private — Long-Term Relationship",
  },
];

export default async function PrivatePage() {
  const insights = (await getPrivateInsights()).slice(0, 6);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Ochiga Private", path: "/private" }])} />

      <StoryCarousel
        slides={privateHeroSlides}
        ariaLabel="Ochiga Private highlights"
        sectionId="private-hero"
        sectionClassName="relative flex min-h-[88vh] flex-col justify-end overflow-hidden border-b border-ochiga-white/10 bg-ochiga-black px-6 pb-24 pt-40 md:px-10 md:pb-28"
      />

      <StatementBlock eyebrow="Why Private" statement="Real-estate relationships should extend beyond a single transaction.">
        <p className="max-w-xl text-base leading-relaxed text-ochiga-white/65">
          We start with the relationship — not the project.
        </p>
      </StatementBlock>

      <SectionBlock id="why-private" eyebrow="Why Private">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Traditional property marketing starts with a project. A project becomes available, it is
          marketed, a buyer enters, a transaction happens — and the relationship often ends there.
          Ochiga Private reverses that logic. We take time to understand who a member is, what they
          are interested in, the property strategies they prefer, and what might be relevant to them in
          future — so the relationship can continue across multiple opportunities over time.
        </p>

        <div className="mt-14 space-y-12">
          <div>
            <p className="mb-6 text-xs uppercase tracking-eyebrow text-ochiga-white/45">Traditional</p>
            <DevelopmentJourney stages={TRADITIONAL_STAGES} />
          </div>
          <div>
            <p className="mb-6 text-xs uppercase tracking-eyebrow text-ochiga-white/45">Ochiga Private</p>
            <DevelopmentJourney stages={PRIVATE_STAGES} />
          </div>
        </div>
      </SectionBlock>

      <SectionBlock id="how-it-works" eyebrow="How Private Works" title="From request to long-term relationship.">
        <DevelopmentJourney stages={HOW_IT_WORKS_STAGES} />
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {HOW_IT_WORKS_DETAIL.map((item) => (
            <div key={item.title} className="border-t border-ochiga-white/10 pt-5">
              <h3 className="text-sm font-medium uppercase tracking-wide text-ochiga-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ochiga-white/60">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 max-w-2xl text-sm leading-relaxed text-ochiga-white/45">
          Qualification simply means Ochiga understands a member, their interests and whether a
          relationship or opportunity is appropriate. Approval is never guaranteed, and not every member
          receives every opportunity.
        </p>
      </SectionBlock>

      <SectionBlock id="opportunities" eyebrow="Selected Around Your Interests" title="Property interests, not a marketplace listing.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Ochiga Private opportunities are shared selectively, based on the interests, strategy and
          profile a member has indicated — not broadly marketed or listed.
        </p>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {OPPORTUNITY_CATEGORIES.map((category) => (
            <ProjectPreviewCard
              key={category.key}
              name={category.name}
              typeLine={category.typeLine}
              story={category.story}
              imageTone={category.imageTone}
            />
          ))}
        </div>
      </SectionBlock>

      <SectionBlock id="network" eyebrow="Two Sides of the Network" title="Capital and opportunity, both find their way in.">
        <p className="max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Ochiga Private is not only capital looking for opportunity — it also connects those who
          control a viable opportunity with the right relationships.
        </p>
      </SectionBlock>

      <SplitSection
        eyebrow="Looking For Opportunity"
        title="For individuals and institutions seeking selected opportunities."
        description="Members can be introduced to selected property and development opportunities relevant to their interests and profile."
        surfaceLabel="Ochiga Private — Members"
        tone="charcoal"
      >
        <CTAButton href="/private#membership">Request Membership</CTAButton>
      </SplitSection>

      <SplitSection
        eyebrow="Have An Opportunity"
        title="For property owners, developers and partners."
        description="Land, existing developments, development opportunities, income-producing property and other strategic real-estate opportunities can be introduced to relevant relationships across the Ochiga Private network and wider Ochiga ecosystem. Not every opportunity submitted will be appropriate, and Ochiga Private does not guarantee capital or funding."
        surfaceLabel="Ochiga Private — Opportunity Holders"
        tone="red"
        reverse
      >
        <CTAButton href="/partnerships/landowners#propose" variant="secondary">Introduce an Opportunity</CTAButton>
      </SplitSection>

      <SectionBlock eyebrow="The Ochiga Ecosystem" title="One company. Three connected capabilities.">
        <div className="grid gap-px overflow-hidden rounded border border-ochiga-white/10 bg-ochiga-white/10 md:grid-cols-3">
          {ECOSYSTEM.map((item) => {
            const content = (
              <>
                <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">{item.name}</p>
                <p className="mt-5 text-sm leading-relaxed text-ochiga-white/65">{item.body}</p>
                {item.href ? (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-ochiga-white/70 group-hover:text-ochiga-white">
                    Learn more →
                  </span>
                ) : (
                  <span className="mt-6 inline-flex items-center gap-2 text-sm text-ochiga-white/35">You are here</span>
                )}
              </>
            );
            return item.href ? (
              <a key={item.key} href={item.href} className="group flex flex-col justify-between bg-ochiga-black p-8 transition-colors duration-base hover:bg-ochiga-charcoal md:p-10">
                {content}
              </a>
            ) : (
              <div key={item.key} className="flex flex-col justify-between bg-ochiga-charcoal p-8 md:p-10">
                {content}
              </div>
            );
          })}
        </div>
      </SectionBlock>

      <SectionBlock id="membership" eyebrow="Request Membership" title="Tell us about yourself and how you'd like to participate.">
        <p className="mb-10 max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
          Tell us about yourself, what you are interested in and how you would like to participate in
          the Ochiga Private network.
        </p>
        <div className="mb-10 max-w-2xl">
          <TrustDisclaimer>
            We do not initially request proof of funds, bank statements, exact net worth, passport or
            KYC documentation, and membership is never automatically approved. Requests are considered
            individually; our team will review and share further information where appropriate.
          </TrustDisclaimer>
        </div>
        <div className="max-w-2xl">
          <PrivateMembershipForm />
        </div>
      </SectionBlock>

      {insights.length ? (
        <SectionBlock eyebrow="Ochiga Perspective" title="Ochiga perspectives on private real estate.">
          <PerspectiveRail insights={insights} />
        </SectionBlock>
      ) : null}
    </main>
  );
}
