import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, seoPages } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(seoPages.trust);

const trustFaq = [
  {
    question: "Does Ochiga claim external security certifications on this website?",
    answer: "No. Ochiga only describes implemented product principles and deployment standards here. External certifications are not claimed unless they are actually completed.",
  },
  {
    question: "Who should own estate and resident data?",
    answer: "Ochiga's position is that operational data should remain accountable to the estate, operator, and resident context that created it, with clear permissions and auditability.",
  },
  {
    question: "Does Ochiga treat missing telemetry as live data?",
    answer: "No. Source states such as awaiting telemetry, pending configuration, no live source, and permission required are shown honestly instead of being replaced by fake metrics.",
  },
];

const sections = [
  {
    title: "Security posture",
    body: "Ochiga systems are designed around authenticated access, role-aware interfaces, protected operational routes, session handling, audit visibility, and explicit permission boundaries.",
    items: ["Authenticated operational access", "Role and permission awareness", "Audit-first sensitive workflows", "No token or provider-secret exposure in public UI"],
  },
  {
    title: "Privacy principles",
    body: "Resident and operator experiences should expose only the context needed for the task. Home membership, invite state, device visibility, and facility workflows are treated as scoped operational data.",
    items: ["Context-limited resident surfaces", "Invite-first residential activation", "No public signup-first production posture", "No sensitive utility or gate metadata in public previews"],
  },
  {
    title: "Data ownership",
    body: "Infrastructure data must be durable and accountable. Homes, rooms, residents, devices, cameras, edge nodes, incidents, and maintenance records require stable ownership relationships.",
    items: ["Estate and home context", "Stable provider device identity", "Assignment history", "Operational audit trails"],
  },
  {
    title: "Deployment standards",
    body: "Ochiga deployments should start with real site context: estate structure, resident lifecycle, infrastructure sources, operator roles, device providers, and source-quality expectations.",
    items: ["Discovery before automation", "Source-state honesty", "No fake telemetry", "Manual review of deployment requests"],
  },
];

export default function TrustPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Trust", path: "/trust" },
          ]),
          faqJsonLd(trustFaq),
        ]}
      />
      <main className="bg-black text-white">
        <section className="pt-28 pb-32 px-6 md:px-8">
          <div className="mx-auto max-w-6xl">
            <header className="mb-16 max-w-3xl">
              <p className="mb-5 text-xs uppercase tracking-[0.22em] text-white/38">Trust</p>
              <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.04em] mb-6">
                Trust for infrastructure systems.
              </h1>
              <p className="text-white/68 text-lg leading-relaxed">
                Ochiga's trust posture is built around security, privacy, data ownership, source honesty, and deployment standards. No invented certifications. No inflated claims.
              </p>
            </header>

            <div className="grid gap-5 md:grid-cols-2">
              {sections.map((section) => (
                <article key={section.title} className="rounded-[30px] border border-white/10 bg-white/[0.02] p-7">
                  <h2 className="text-2xl font-medium">{section.title}</h2>
                  <p className="mt-4 text-white/60 leading-7">{section.body}</p>
                  <ul className="mt-6 space-y-3 text-sm text-white/54">
                    {section.items.map((item) => <li key={item}>• {item}</li>)}
                  </ul>
                </article>
              ))}
            </div>

            <section className="mt-16 rounded-[30px] border border-orange-300/20 bg-[radial-gradient(circle_at_top_left,rgba(255,140,42,0.14),transparent_36%),rgba(255,255,255,0.025)] p-7 md:p-8">
              <h2 className="text-2xl font-medium">Infrastructure philosophy</h2>
              <p className="mt-4 max-w-3xl text-white/62 leading-7">
                Ochiga does not treat trust as a badge layer added after product work. Trust is expressed through how accounts are activated, how permissions are enforced, how devices are assigned, how source states are represented, and how operational actions are logged.
              </p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link href="/papers/digital-identity-for-physical-spaces" className="btn-secondary">Read identity paper</Link>
                <Link href="/deployments" className="btn-primary">Prepare a deployment</Link>
              </div>
            </section>

            <section className="mt-16 max-w-3xl">
              <h2 className="mb-6 text-2xl font-medium">Trust FAQ</h2>
              <div className="space-y-5">
                {trustFaq.map((item) => (
                  <div key={item.question} className="rounded-[24px] border border-white/10 bg-white/[0.02] p-6">
                    <h3 className="font-medium">{item.question}</h3>
                    <p className="mt-3 text-white/58 leading-7">{item.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
