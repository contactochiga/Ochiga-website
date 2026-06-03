import type { Metadata } from "next";
import Link from "next/link";
import CorporatePage from "@/app/components/CorporatePage";
import { companyInfo } from "@/lib/company";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.support);

export default function SupportPage() {
  return (
    <CorporatePage
      eyebrow="Support"
      title="Support for Ochiga enquiries and deployments."
      description="Use this page to find the right support path for deployment enquiries, active conversations, and enterprise infrastructure support."
    >
      <div className="space-y-8 text-white/68">
        <SupportPath title="Deployment support" text="For new infrastructure, estate, facility, command center, or digital twin deployments, submit a deployment request so the team receives the project context." href="/deployments" cta="Request Deployment" />
        <SupportPath title="General support" text={`For general support, email ${companyInfo.supportEmail}. Include your organization, project name, and the issue you need help with.`} href={`mailto:${companyInfo.supportEmail}`} cta="Email Support" />
        <SupportPath title="Existing conversations" text="If you are already speaking with Ochiga, reply in the same email thread where possible. This preserves context and helps route your request correctly." />
        <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-white/52">
          Ochiga does not operate public self-serve emergency support from this website. Active estate, resident, and facility support channels are managed through the relevant Oyi operational systems.
        </div>
      </div>
    </CorporatePage>
  );
}

function SupportPath({ title, text, href, cta }: { title: string; text: string; href?: string; cta?: string }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <h2 className="text-lg font-medium text-white">{title}</h2>
      <p className="mt-3 leading-7">{text}</p>
      {href && cta ? (
        <Link href={href} className="mt-5 inline-block text-sm text-[#ff8c2a] hover:text-white">
          {cta} →
        </Link>
      ) : null}
    </section>
  );
}
