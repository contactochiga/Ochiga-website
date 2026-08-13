import Image from "next/image";
import Link from "next/link";
import type React from "react";
import ContactIcon from "@/app/components/ContactIcon";
import { companyInfo, footerNavigation } from "@/lib/company";

export default function Footer() {
  return (
    <footer className="border-t border-ochiga-white/10 bg-ochiga-black">
      <div className="mx-auto flex max-w-cinematic flex-col gap-14 px-6 pb-12 pt-16 md:px-10">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="max-w-md">
            <Link href="/" aria-label="Ochiga home">
              <Image
                src="/brand/ochiga-logo-dark.png"
                alt="Ochiga"
                width={2048}
                height={768}
                className="mb-5 h-9 w-auto"
              />
            </Link>

            <p className="text-sm leading-relaxed text-ochiga-white/55">
              {companyInfo.supportingStatement}
            </p>

            <div className="mt-6 flex flex-col gap-3 text-sm text-ochiga-white/60">
              <FooterContact href={`mailto:${companyInfo.contactEmail}`} icon="email" label={companyInfo.contactEmail} />
              <FooterContact href={`tel:${companyInfo.phone.replace(/[^\d+]/g, "")}`} icon="phone" label={companyInfo.phone} />
              <FooterContact href={`https://wa.me/${companyInfo.whatsapp.replace(/[^\d]/g, "")}`} icon="whatsapp" label="WhatsApp" />
              <FooterContact icon="location" label={companyInfo.location} />
              <div className="mt-2 flex gap-4">
                <FooterSocial href={companyInfo.social.instagram} icon="instagram" label="Instagram" />
                <FooterSocial href={companyInfo.social.facebook} icon="facebook" label="Facebook" />
              </div>
            </div>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-x-10 gap-y-10 text-sm sm:grid-cols-4">
            <FooterGroup title="Development" links={footerNavigation.development} />
            <FooterGroup title="Ecosystem" links={footerNavigation.ecosystem} />
            <FooterGroup title="Company" links={footerNavigation.company} />
            <FooterGroup title="Legal" links={footerNavigation.legal} />
          </nav>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-ochiga-white/15 to-transparent" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-ochiga-white/40">
          <span>© {new Date().getFullYear()} {companyInfo.legalName}</span>
          <span>{companyInfo.tagline}</span>
        </div>
      </div>
    </footer>
  );
}

function FooterContact({ href, icon, label }: { href?: string; icon: React.ComponentProps<typeof ContactIcon>["name"]; label: string }) {
  const content = (
    <span className="flex items-center gap-2.5">
      <span className="h-4 w-4 shrink-0">
        <ContactIcon name={icon} />
      </span>
      <span>{label}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} className="transition-colors duration-fast hover:text-ochiga-white">
        {content}
      </a>
    );
  }

  return content;
}

function FooterSocial({ href, icon, label }: { href: string; icon: React.ComponentProps<typeof ContactIcon>["name"]; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="flex h-4 w-4 items-center text-ochiga-white/55 transition-colors duration-fast hover:text-ochiga-white"
    >
      <ContactIcon name={icon} />
    </a>
  );
}

function FooterGroup({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs uppercase tracking-eyebrow text-ochiga-white/35">{title}</span>
      {links.map((link) => (
        <Link key={link.href} href={link.href} className="text-ochiga-white/65 transition-colors duration-fast hover:text-ochiga-white">
          {link.label}
        </Link>
      ))}
    </div>
  );
}
