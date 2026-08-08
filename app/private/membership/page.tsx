import type { Metadata } from "next";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import TrustDisclaimer from "@/app/components/TrustDisclaimer";
import PrivateMembershipForm from "@/app/components/forms/PrivateMembershipForm";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.privateMembership);

export default function MembershipPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ochiga Private / Membership"
        title="Membership by request."
        description="Ochiga Private membership is by application. Tell us a little about yourself and we'll share the appropriate membership information."
      >
        <CTAButton href="#request">Request Membership Requirements</CTAButton>
      </PageHero>

      <SectionBlock width="content">
        <TrustDisclaimer>
          We do not initially request proof of funds, bank statements, exact net worth, passport or KYC
          documentation, and membership is never automatically approved. Requests are considered
          individually; our team will review and share further information where appropriate.
        </TrustDisclaimer>
      </SectionBlock>

      <SectionBlock id="request" eyebrow="Request Membership Requirements" title="Tell us a little about yourself." width="content">
        <PrivateMembershipForm />
      </SectionBlock>
    </main>
  );
}
