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
    <main className="bg-black text-white">
      <section className="px-5 pb-28 pt-36 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <p className="mb-6 text-xs uppercase tracking-[0.22em] text-[#ff8c2a]">
            {eyebrow}
          </p>
          <h1 className="max-w-3xl text-4xl font-medium leading-tight tracking-[-0.04em] md:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-white/64 md:text-lg">
            {description}
          </p>

          <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.025] p-6 shadow-2xl shadow-black/40 md:p-9">
              {children}
            </div>
            <aside className="h-fit rounded-[28px] border border-white/10 bg-white/[0.035] p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/38">
                Company
              </p>
              <div className="mt-5 space-y-4 text-sm leading-6 text-white/62">
                <p>
                  <strong className="block text-white">{companyInfo.legalName}</strong>
                  Digital infrastructure for intelligent buildings, estates, and operational environments.
                </p>
                <p>
                  <span className="block text-white/38">Email</span>
                  <a className="text-white/82 hover:text-white" href={`mailto:${companyInfo.contactEmail}`}>
                    {companyInfo.contactEmail}
                  </a>
                </p>
                <p>
                  <span className="block text-white/38">Support</span>
                  <a className="text-white/82 hover:text-white" href={`mailto:${companyInfo.supportEmail}`}>
                    {companyInfo.supportEmail}
                  </a>
                </p>
                <p>
                  <span className="block text-white/38">Location</span>
                  {companyInfo.location}
                </p>
              </div>
              <Link href="/deployments" className="btn-primary mt-8 inline-block">
                Request Deployment
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
