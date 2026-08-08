import type { Metadata } from "next";
import type React from "react";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import { TileGrid } from "@/app/components/TileCard";
import TileCard from "@/app/components/TileCard";
import ContactIcon from "@/app/components/ContactIcon";
import GeneralContactForm from "@/app/components/forms/GeneralContactForm";
import JsonLd from "@/app/components/JsonLd";
import { companyInfo } from "@/lib/company";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.contact);

const pathways = [
  { title: "Propose a Development", body: "Landowners and JV partners — bring us a strategically located site.", href: "/partnerships/landowners", tag: "Landowners / JV" },
  { title: "Request Membership Requirements", body: "Start an Ochiga Private membership request.", href: "/private/membership", tag: "Ochiga Private" },
  { title: "Request Oyi Deployment", body: "Considering Oyi for a building or portfolio.", href: "/oyi#deployment", tag: "Oyi" },
  { title: "Work With Ochiga", body: "Architecture, engineering, construction, sales, finance, legal and technology partners.", href: "/partnerships/professional", tag: "Professional Partners" },
  { title: "General Enquiry", body: "Anything else — we'll route it to the right team.", href: "#general", tag: "General" },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[]} />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Partner with Ochiga."
          description="Choose the pathway that fits, and we'll route your enquiry to the right team. Phase 3 adds structured forms for each pathway below — for now, every path reaches us directly."
        />

        <SectionBlock eyebrow="Choose a pathway" title="Five ways to start a conversation.">
          <TileGrid columns={2}>
            {pathways.map((item) => (
              <TileCard key={item.href} href={item.href} tag={item.tag} title={item.title} body={item.body} />
            ))}
          </TileGrid>
        </SectionBlock>

        <SectionBlock eyebrow="Direct channels" title="Reach Ochiga directly.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard icon="email" label="Email" value={companyInfo.contactEmail} href={`mailto:${companyInfo.contactEmail}`} />
            <ContactCard icon="phone" label="Phone" value={companyInfo.phone} href={`tel:${companyInfo.phone.replace(/[^\d+]/g, "")}`} />
            <ContactCard icon="whatsapp" label="WhatsApp" value={companyInfo.whatsapp} href={`https://wa.me/${companyInfo.whatsapp.replace(/[^\d]/g, "")}`} />
            <ContactCard icon="location" label="Location" value={companyInfo.location} />
          </div>
        </SectionBlock>

        <SectionBlock id="general" eyebrow="General Enquiry" title="Send us a message." width="content">
          <GeneralContactForm />
        </SectionBlock>
      </main>
    </>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ComponentProps<typeof ContactIcon>["name"]; label: string; value: string; href?: string }) {
  const content = (
    <>
      <span className="mb-3 block h-5 w-5 text-ochiga-red">
        <ContactIcon name={icon} />
      </span>
      <p className="text-xs uppercase tracking-wide text-ochiga-white/40">{label}</p>
      <p className="mt-1 text-sm text-ochiga-white">{value}</p>
    </>
  );

  return href ? (
    <a href={href} className="rounded border border-ochiga-white/10 p-5 transition-colors duration-base hover:border-ochiga-white/30">
      {content}
    </a>
  ) : (
    <div className="rounded border border-ochiga-white/10 p-5">{content}</div>
  );
}
