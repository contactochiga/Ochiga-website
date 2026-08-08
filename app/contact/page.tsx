import type { Metadata } from "next";
import type React from "react";
import PageHero from "@/app/components/PageHero";
import SectionBlock from "@/app/components/SectionBlock";
import CTAButton from "@/app/components/CTAButton";
import ContactIcon from "@/app/components/ContactIcon";
import JsonLd from "@/app/components/JsonLd";
import { companyInfo, ctas } from "@/lib/company";
import { buildMetadata, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.contact);

const contextualCtas = [
  { label: ctas.exploreDevelopment.label, href: ctas.exploreDevelopment.href, body: "Talk to us about a development study, joint venture, or the Ochiga approach." },
  { label: ctas.discoverOyi.label, href: ctas.discoverOyi.href, body: "Understand how Oyi powers Ochiga developments, or explore getoyi.com directly." },
  { label: ctas.requestMembership.label, href: ctas.requestMembership.href, body: "Start an Ochiga Private membership request." },
  { label: ctas.proposeDevelopment.label, href: ctas.proposeDevelopment.href, body: "Landowners and JV partners — bring us a site." },
];

export default function ContactPage() {
  return (
    <>
      <JsonLd data={[]} />
      <main>
        <PageHero eyebrow="Contact" title="Partner with Ochiga." description="Start a conversation about development, Oyi, Ochiga Private, or a professional partnership.">
          <CTAButton href={`mailto:${companyInfo.helloEmail}`}>Email {companyInfo.helloEmail}</CTAButton>
        </PageHero>

        <SectionBlock eyebrow="Choose a pathway" title="Contextual ways to reach the right team.">
          <div className="grid gap-6 md:grid-cols-2">
            {contextualCtas.map((item) => (
              <a key={item.href} href={item.href} className="rounded border border-ochiga-white/10 p-6 transition-colors duration-base hover:border-ochiga-white/30">
                <h3 className="font-display text-lg text-ochiga-white">{item.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ochiga-white/60">{item.body}</p>
              </a>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock eyebrow="Direct channels" title="Reach Ochiga directly.">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ContactCard icon="email" label="Email" value={companyInfo.contactEmail} href={`mailto:${companyInfo.contactEmail}`} />
            <ContactCard icon="phone" label="Phone" value={companyInfo.phone} href={`tel:${companyInfo.phone.replace(/[^\d+]/g, "")}`} />
            <ContactCard icon="whatsapp" label="WhatsApp" value={companyInfo.whatsapp} href={`https://wa.me/${companyInfo.whatsapp.replace(/[^\d]/g, "")}`} />
            <ContactCard icon="location" label="Location" value={companyInfo.location} />
          </div>
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
