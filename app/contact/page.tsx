import type { Metadata } from "next";
import Link from "next/link";
import CorporatePage from "@/app/components/CorporatePage";
import JsonLd from "@/app/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { buildMetadata, faqJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.contact);

const contactFaq = [
  {
    question: "What should I prepare before contacting Ochiga?",
    answer: "Prepare the estate or project location, rough unit count, current access or facility problems, existing smart device providers, and the operational team responsible for the site.",
  },
  {
    question: "Does Ochiga handle small deployments?",
    answer: "Ochiga reviews each deployment manually. Single properties, existing estates, new developments, and command-center projects can all be evaluated if the operational need is serious.",
  },
  {
    question: "Is the first conversation a sales demo?",
    answer: "The first conversation is usually an infrastructure fit review: context, constraints, workflows, source readiness, and what would be required for a responsible deployment.",
  },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(contactFaq)} />
      <CorporatePage
      eyebrow="Contact"
      title="Talk to Ochiga about serious infrastructure."
      description="For estates, buildings, command centers, digital twins, and operational infrastructure deployments, reach the Ochiga team through the channels below."
    >
      <div className="space-y-10 text-white/68">
        <section>
          <h2 className="text-xl font-medium text-white">Deployment enquiries</h2>
          <p className="mt-3 leading-7">
            If you are planning a new estate, upgrading an existing property, or evaluating the Oyi platform for facility operations, start with a deployment request.
          </p>
          <Link href="/deployments" className="btn-primary mt-6 inline-block">
            Request Deployment
          </Link>
        </section>

        <div className="divider-hairline" />

        <section className="grid gap-5 md:grid-cols-2">
          <ContactCard label="General email" value={companyInfo.contactEmail} href={`mailto:${companyInfo.contactEmail}`} />
          <ContactCard label="Support" value={companyInfo.supportEmail} href={`mailto:${companyInfo.supportEmail}`} />
          <ContactCard label="Location" value={companyInfo.location} />
          <ContactCard label="Website" value={companyInfo.website} href={companyInfo.website} />
        </section>

        <p className="rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-sm leading-6 text-white/52">
          Ochiga reviews deployment and partnership requests manually. This keeps the process aligned with real infrastructure constraints, operator readiness, and long-term system ownership.
        </p>
      <div className="divider-hairline" />

        <section>
          <h2 className="text-xl font-medium text-white">Contact FAQ</h2>
          <div className="mt-5 space-y-4">
            {contactFaq.map((item) => (
              <div key={item.question} className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <h3 className="text-white/86">{item.question}</h3>
                <p className="mt-3 text-sm leading-6 text-white/56">{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </CorporatePage>
    </>
  );
}

function ContactCard({ label, value, href }: { label: string; value: string; href?: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-white/35">{label}</p>
      {href ? (
        <a className="mt-3 block text-white/82 hover:text-white" href={href}>
          {value}
        </a>
      ) : (
        <p className="mt-3 text-white/82">{value}</p>
      )}
    </div>
  );
}
