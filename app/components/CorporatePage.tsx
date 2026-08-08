import Link from "next/link";
import { companyInfo } from "@/lib/company";

type CorporatePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function CorporatePage({
  eyebrow,
  title,
  description,
  children,
}: CorporatePageProps) {
  return (
    <main className="bg-ochiga-black text-ochiga-white">
      <section className="px-5 pb-28 pt-36 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-xs uppercase tracking-[0.22em] text-ochiga-red">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-ochiga-white/65 md:text-lg">
            {description}
          </p>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-lg border border-ochiga-white/10 bg-ochiga-white/[0.025] p-6 shadow-2xl shadow-black/40 md:p-9">
              {children}
            </div>
            <aside className="h-fit rounded-lg border border-ochiga-white/10 bg-ochiga-white/[0.035] p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-ochiga-white/40">
                Company
              </p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-ochiga-white/60">
                <p>
                  <strong className="block text-white">{companyInfo.legalName}</strong>
                  Digital infrastructure for intelligent buildings, estates, and operational environments.
                </p>
                <p>
                  <span className="block text-ochiga-white/40">Email</span>
                  <a className="text-ochiga-white/80 hover:text-white" href={`mailto:${companyInfo.contactEmail}`}>
                    {companyInfo.contactEmail}
                  </a>
                </p>
                <p>
                  <span className="block text-ochiga-white/40">Phone / WhatsApp</span>
                  <a className="text-ochiga-white/80 hover:text-white" href={`tel:${companyInfo.phone.replace(/[^\d+]/g, "")}`}>
                    {companyInfo.phone}
                  </a>
                </p>
                <p>
                  <span className="block text-ochiga-white/40">Location</span>
                  {companyInfo.location}
                </p>
                <p>
                  <span className="block text-ochiga-white/40">Social</span>
                  <a className="text-ochiga-white/80 hover:text-white" href={companyInfo.social.instagram} target="_blank" rel="noreferrer">
                    Instagram — {companyInfo.socialLabels.instagram}
                  </a>
                  <br />
                  <a className="text-ochiga-white/80 hover:text-white" href={companyInfo.social.facebook} target="_blank" rel="noreferrer">
                    Facebook — {companyInfo.socialLabels.facebook}
                  </a>
                </p>
              </div>
              <Link href="/contact" className="mt-8 inline-block rounded bg-ochiga-red px-5 py-2.5 text-sm font-medium text-ochiga-white">
                Partner With Ochiga
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
