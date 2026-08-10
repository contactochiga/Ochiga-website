import EngineTriad from "@/app/components/EngineTriad";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import StatementBlock from "@/app/components/StatementBlock";
import SplitSection from "@/app/components/SplitSection";
import CTABand from "@/app/components/CTABand";
import InsightCard from "@/app/components/InsightCard";
import HomeHeroCarousel from "@/app/components/HomeHeroCarousel";
import { ctas } from "@/lib/company";
import { getAllInsights, getFeaturedInsight } from "@/lib/content";

export default async function HomePage() {
  const [insights, featuredInsight] = await Promise.all([
    getAllInsights().then((all) => all.slice(0, 3)),
    getFeaturedInsight(),
  ]);

  return (
    <main>
      {/* HERO — Phase 4A cinematic story carousel (Development / Oyi /
          Ochiga Private / Insights). See app/components/HomeHeroCarousel.tsx. */}
      <HomeHeroCarousel insight={featuredInsight} />

      {/* THREE ENGINES */}
      <SectionBlock eyebrow="The Ochiga Ecosystem" title="Three engines. One ecosystem.">
        <EngineTriad />
      </SectionBlock>

      {/* FROM LAND TO LIVING ASSET */}
      <SectionBlock
        eyebrow="From Land to Living Asset"
        title="Land, capital, expertise, technology and market access, brought together deliberately."
        description="Ochiga brings together land, capital, specialist expertise, technology and market access around carefully selected development opportunities."
      >
        <ProcessFlow numbered steps={["Opportunity", "JV", "Design", "Capital", "Development", "Sales / Offtake", "Oyi Integration", "Operations"]} />
      </SectionBlock>

      {/* DEVELOPMENT PREVIEW */}
      <SplitSection
        eyebrow="Ochiga Development"
        title="Development built for what comes next."
        description="Ochiga originates, structures and delivers intelligent real-estate developments through direct development, joint ventures and strategic partnerships — starting with a disciplined residential focus."
        surfaceLabel="Prime Vertical Living — Development Study"
        tone="charcoal"
        imageSrc="/images/development/development-skyline-dusk.webp"
        imageAlt="Illustrative concept render of a premium waterfront residential skyline at dusk"
      >
        <CTAButton href="/development" variant="secondary">Explore Development</CTAButton>
      </SplitSection>

      {/* OYI PREVIEW */}
      <SplitSection
        eyebrow="Oyi"
        title="Buildings that continue to evolve."
        description="Traditional development ends at handover. Ochiga developments continue: design, build, connect, operate, learn, improve — with Oyi as the operating layer."
        surfaceLabel="Oyi — Building Operating Technology"
        tone="red"
        reverse
        imageSrc="/images/oyi/oyi-smart-lobby-dashboard.webp"
        imageAlt="Illustrative concept render of an Oyi-powered building lobby showing residents, access and utility data"
      >
        <CTAButton href="/technology" variant="secondary">Discover Oyi</CTAButton>
      </SplitSection>

      {/* OCHIGA PRIVATE PREVIEW */}
      <SectionBlock
        eyebrow="Ochiga Private"
        title="Private access to real estate opportunities."
        description="A private investment circle connecting selected investors to carefully considered real-estate opportunities and development partnerships."
        tone="light"
      >
        <CTAButton href={ctas.requestMembership.href}>{ctas.requestMembership.label}</CTAButton>
      </SectionBlock>

      {/* PARTNER WITH OCHIGA */}
      <CTABand
        eyebrow="Partner With Ochiga"
        title="Pathways to work with us."
        description="Landowners, capital partners, buyers and professional partners — Ochiga works through a structured ecosystem, not a single generic enquiry form."
        ctas={[
          { label: "Landowner", href: "/partnerships/landowners", variant: "secondary" },
          { label: "Capital Partner", href: "/partnerships/capital", variant: "secondary" },
          { label: "Buyer", href: "/partnerships/buyers", variant: "secondary" },
          { label: "Professional Partner", href: "/partnerships/professional", variant: "secondary" },
        ]}
      />

      {/* OUR JOURNEY */}
      <SectionBlock eyebrow="Our Journey" title="Built environment experience, brought into an integrated ecosystem.">
        <p className="max-w-2xl text-ochiga-white/65 leading-relaxed">
          Ochiga&apos;s journey began in the built environment, through specialist construction finishes,
          flooring and project delivery — expanding through broader construction delivery, building
          technology, and Oyi, into the integrated development and technology company Ochiga is today.
        </p>
        <CTAButton href="/about" variant="ghost">Read our journey →</CTAButton>
      </SectionBlock>

      {/* INSIGHTS */}
      {insights.length ? (
        <SectionBlock eyebrow="Insights" title="Recent Ochiga perspectives.">
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((insight) => (
              <InsightCard key={insight.slug} insight={insight} />
            ))}
          </div>
        </SectionBlock>
      ) : null}

      {/* FINAL CTA */}
      <StatementBlock eyebrow="Ochiga" statement="We Build Intelligent Places.">
        <CTAButton href={ctas.primary.href}>{ctas.primary.label}</CTAButton>
      </StatementBlock>
    </main>
  );
}
