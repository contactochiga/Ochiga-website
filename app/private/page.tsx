import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import ProcessFlow from "@/app/components/ProcessFlow";
import CTAButton from "@/app/components/CTAButton";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.private);

const opportunityTypes = [
  { title: "Acquisition Opportunities", body: "Selected property acquisition opportunities." },
  { title: "Joint Venture Developments", body: "Landowner/developer structured developments." },
  { title: "Development Opportunities", body: "Participation around qualifying new developments." },
  { title: "Income-Generating Assets", body: "Assets positioned around recurring rental, hospitality or operating income." },
  { title: "Capital Appreciation", body: "Longer-term value-led assets." },
  { title: "Property Transformation & Conversion", body: "Redevelopment, repositioning or conversion opportunities." },
  { title: "Strategic Property Trading", body: "Selected acquisition and exit strategies where appropriate." },
  { title: "Off-Plan / Early-Stage Access", body: "Priority access to selected development inventory." },
];

export default function PrivatePage() {
  return (
    <main>
      <PageHero
        eyebrow="Ochiga Private"
        title="Private access to real estate opportunities."
        description="A private investment circle connecting selected investors to carefully considered real-estate opportunities, development partnerships and property strategies across the built environment."
      >
        <CTAButton href="/private/membership">Request Membership Requirements</CTAButton>
      </PageHero>

      <SectionBlock eyebrow="Opportunity Types" title="Opportunities across the real-estate value cycle.">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {opportunityTypes.map((item) => (
            <div key={item.title} className="rounded border border-ochiga-white/10 p-6">
              <h3 className="font-display text-base text-ochiga-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ochiga-white/55">{item.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 text-xs text-ochiga-white/40">
          Future asset sectors may include residential, hospitality, commercial, healthcare and other
          mixed-use built-environment sectors relevant to Ochiga and Oyi.
        </p>
      </SectionBlock>

      <SectionBlock eyebrow="Approach" title="Discover, underwrite, structure, develop, create value, hold or exit.">
        <ProcessFlow steps={["Discover", "Underwrite", "Structure", "Develop / Operate", "Create Value", "Hold / Exit"]} />
      </SectionBlock>

      <SectionBlock width="content" tone="light">
        <p className="text-sm leading-relaxed text-ochiga-black/70">
          Ochiga Private membership is by application and review. Opportunities and access are not
          guaranteed, availability is not guaranteed, and investments carry risk. Opportunities may
          involve separate documentation. Independent legal and financial advice should be obtained.
        </p>
      </SectionBlock>
    </main>
  );
}
