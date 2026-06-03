import type { Metadata } from "next";
import CorporatePage from "@/app/components/CorporatePage";
import { companyInfo } from "@/lib/company";

export const metadata: Metadata = {
  title: "Terms — Ochiga",
  description: "Ochiga website terms for public information, deployment enquiries, and infrastructure conversations.",
};

export default function TermsPage() {
  return (
    <CorporatePage
      eyebrow="Terms"
      title="Terms for using the Ochiga website."
      description="This website provides public information about Ochiga, Oyi OS, infrastructure deployments, digital twins, command centers, and related services."
    >
      <div className="space-y-8 text-white/68">
        <Section title="Website information" text="The content on this website is provided for general business and technical information. It does not create a deployment agreement, service contract, warranty, or binding implementation commitment." />
        <Section title="Deployment requests" text="Submitting a deployment request starts a review process. Ochiga may accept, decline, or request further information based on project fit, feasibility, location, operational scope, and commercial readiness." />
        <Section title="Intellectual property" text="Ochiga names, product descriptions, visual systems, diagrams, and website content are owned by or licensed to Ochiga Systems unless otherwise stated." />
        <Section title="External services" text="The website may use external infrastructure for forms, analytics, communication widgets, or operational routing. These services are used to support legitimate business communication." />
        <Section title="Contact" text={`Questions about these terms can be sent to ${companyInfo.contactEmail}.`} />
      </div>
    </CorporatePage>
  );
}

function Section({ title, text }: { title: string; text: string }) {
  return (
    <section>
      <h2 className="text-lg font-medium text-white">{title}</h2>
      <p className="mt-3 leading-7">{text}</p>
    </section>
  );
}
