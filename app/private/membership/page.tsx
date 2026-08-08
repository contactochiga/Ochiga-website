import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import PlaceholderNotice from "@/app/components/PlaceholderNotice";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.privateMembership);

const fields = [
  "Full name", "Email", "Phone / WhatsApp",
  "Investor profile (Individual, Institutional, Family Office, Corporate)",
  "Preferred investment strategy (multi-select)",
  "Real estate / investment experience",
  "Anything you'd like us to know? (optional)",
];

export default function MembershipPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ochiga Private / Membership"
        title="Membership is by application."
        description="Ochiga Private membership is by application. Tell us a little about yourself and we'll share the appropriate membership information."
      >
        <CTAButton href="/contact">Request Membership Requirements</CTAButton>
      </PageHero>

      <SectionBlock eyebrow="What we ask" title="A deliberately simple first step." width="content">
        <ul className="space-y-3 text-sm text-ochiga-white/65">
          {fields.map((field) => (
            <li key={field} className="border-b border-ochiga-white/10 pb-3">{field}</li>
          ))}
        </ul>
        <p className="mt-8 text-xs text-ochiga-white/40">
          We do not initially request proof of funds, bank statements, exact net worth, passport or KYC
          documentation, and membership is never automatically approved. Requests are considered
          individually; our team will review and share further information where appropriate.
        </p>
      </SectionBlock>

      <PlaceholderNotice note="the interactive membership request form is generalized lead-capture work planned for Phase 3 (see lib/company.ts ctas + app/api/deployments/route.ts pattern). Use the CTA above to reach us in the meantime." />
    </main>
  );
}
