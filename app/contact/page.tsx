import type { Metadata } from "next";
import type React from "react";
import Link from "next/link";
import ContactIcon from "@/app/components/ContactIcon";
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
      <main className="inner-page">
        <section className="inner-hero inner-hero-contact">
          <div className="inner-hero-copy animate-fade-up">
            <p>Contact</p>
            <h1>Talk to Ochiga about serious infrastructure.</h1>
            <span>
              For intelligent buildings, estates, command centers, digital twins, and operational infrastructure deployments, reach the Ochiga team through the channels below.
            </span>
            <div className="inner-hero-actions">
              <Link href="/deployments" className="btn-primary">Request deployment</Link>
              <a href={`https://wa.me/${companyInfo.whatsapp.replace(/[^\d]/g, "")}`} className="btn-secondary">WhatsApp</a>
            </div>
          </div>
          <div className="inner-arch-panel contact-visual" aria-hidden="true">
            <i />
            <span>Lagos, Nigeria</span>
            <span>Built Environment</span>
            <span>Deployment Review</span>
          </div>
        </section>

        <section className="inner-section contact-grid">
          <ContactCard icon="email" label="Email" value={companyInfo.contactEmail} href={`mailto:${companyInfo.contactEmail}`} />
          <ContactCard icon="phone" label="Phone" value={companyInfo.phone} href={`tel:${companyInfo.phone.replace(/[^\d+]/g, "")}`} />
          <ContactCard icon="whatsapp" label="WhatsApp" value={companyInfo.whatsapp} href={`https://wa.me/${companyInfo.whatsapp.replace(/[^\d]/g, "")}`} />
          <ContactCard icon="location" label="Location" value={companyInfo.location} />
          <ContactCard icon="website" label="Website" value={companyInfo.website} href={companyInfo.website} />
          <ContactCard icon="instagram" label="Instagram" value={companyInfo.socialLabels.instagram} href={companyInfo.social.instagram} />
          <ContactCard icon="facebook" label="Facebook" value={companyInfo.socialLabels.facebook} href={companyInfo.social.facebook} />
        </section>

        <section className="inner-section inner-split contact-lane">
          <div className="inner-copy-card">
            <p>Deployment enquiries</p>
            <h2>Start with project context, not a sales demo.</h2>
            <ul>
              <li>Estate or building location.</li>
              <li>Approximate unit count and operator structure.</li>
              <li>Current access, utility, device, facility, or resident workflow issues.</li>
              <li>Deployment ambition and source readiness.</li>
            </ul>
            <Link href="/deployments" className="btn-primary">Request Deployment</Link>
          </div>
          <div className="contact-faq-panel">
            <h2>Contact FAQ</h2>
            {contactFaq.map((item) => (
              <article key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function ContactCard({ icon, label, value, href }: { icon: React.ComponentProps<typeof ContactIcon>["name"]; label: string; value: string; href?: string }) {
  return (
    <article className="contact-card">
      <span>
        <ContactIcon name={icon} />
      </span>
      <p>{label}</p>
      {href ? (
        <a href={href}>
          {value}
        </a>
      ) : (
        <strong>{value}</strong>
      )}
    </article>
  );
}
