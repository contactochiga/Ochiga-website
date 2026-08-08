import type { Metadata } from "next";
import CorporatePage from "@/app/components/CorporatePage";
import { companyInfo } from "@/lib/company";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.terms);

export default function TermsPage() {
  return (
    <CorporatePage
      eyebrow="Terms"
      title="Terms for using the Ochiga website."
      description="This website provides public information about Ochiga Development, Oyi, and Ochiga Private, and about how to start a conversation with Ochiga."
    >
      <div className="space-y-8 text-ochiga-white/65">
        <Section title="Website information" text="The content on this website is provided for general business and technical information. It does not create a deployment agreement, service contract, warranty, or binding implementation commitment." />
        <Section title="Deployment requests" text="Submitting a deployment request starts a review process. Ochiga may accept, decline, or request further information based on project fit, feasibility, location, operational scope, and commercial readiness." />
        <Section title="Intellectual property" text="Ochiga names, product descriptions, visual systems, diagrams, and website content are owned by or licensed to Ochiga unless otherwise stated." />
        <Section title="External services" text="The website may use external infrastructure for forms, analytics, communication widgets, or operational routing. These services are used to support legitimate business communication." />
        <Section title="Ochiga Private" text="References to Ochiga Private describe a private, application-based real estate opportunity network. Membership and access are subject to individual review, are not guaranteed, and do not constitute investment advice, a guarantee of returns, or a public offer of securities. Independent legal and financial advice should be obtained before making any investment decision." />
        <Section title="Contact" text={`Questions about these terms can be sent to ${companyInfo.contactEmail}.`} />
      </div>
    </CorporatePage>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h2 className="text-lg font-medium text-ochiga-white">{title}</h2>
      <p className="mt-3 leading-7">{text}</p>
    </section>
  );
}
