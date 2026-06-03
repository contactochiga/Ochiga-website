import type { Metadata } from "next";
import Link from "next/link";
import CorporatePage from "@/app/components/CorporatePage";
import { companyInfo } from "@/lib/company";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.contact);

export default function ContactPage() {
  return (
    <CorporatePage
      eyebrow="Contact"
      title="Talk to Ochiga about serious infrastructure."
      description="For estates, buildings, command centers, digital twins, and operational infrastructure deployments, reach the Ochiga team through the channels below."
    >
      <div className="space-y-10 text-white/68">
        <section>
          <h2 className="text-xl font-medium text-white">Deployment enquiries</h2>
          <p className="mt-3 leading-7">
            If you are planning a new estate, upgrading an existing property, or evaluating Oyi OS for facility operations, start with a deployment request.
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
      </div>
    </CorporatePage>
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
