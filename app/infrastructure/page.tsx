"use client";

import Link from "next/link";

const domains = [
  { title: "Estate operations", body: "Homes, residents, invitations, visitors, community, maintenance, services, and access lifecycle managed as one operating environment." },
  { title: "Deployment model", body: "Site structure, operator roles, resident onboarding, device providers, edge readiness, and source quality are defined before automation is promised." },
  { title: "Command systems", body: "Overview, attention queues, camera/security posture, device health, utility states, and staff workflows converge into operational command surfaces." },
  { title: "Infrastructure lifecycle", body: "Buildings, homes, rooms, devices, cameras, utilities, incidents, and maintenance records remain traceable across years of operation." },
];

export default function InfrastructurePage() {
  return (
    <main className="bg-black text-white">
      <section className="pt-28 pb-32 px-6 md:px-8">
        <div className="mx-auto max-w-6xl">
          <header className="mb-16 max-w-3xl">
            <p className="mb-5 text-xs uppercase tracking-[0.22em] text-white/38">Infrastructure</p>
            <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.04em] mb-6">Operate the estate as a system.</h1>
            <p className="text-white/68 text-lg leading-relaxed">
              Ochiga focuses on the operational lifecycle of real environments: structure, access, utilities, devices, services, incidents, payments, and the teams responsible for them.
            </p>
          </header>

          <div className="grid gap-5 md:grid-cols-2">
            {domains.map((domain) => (
              <article key={domain.title} className="rounded-[30px] border border-white/10 bg-white/[0.02] p-8">
                <h2 className="text-2xl font-medium">{domain.title}</h2>
                <p className="mt-4 text-white/58 leading-7">{domain.body}</p>
              </article>
            ))}
          </div>

          <section className="mt-20 rounded-[34px] border border-orange-300/20 bg-[radial-gradient(circle_at_top_left,rgba(255,140,42,0.14),transparent_34%),rgba(255,255,255,0.025)] p-8 md:p-10">
            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.04em]">Deployment starts with truth.</h2>
            <p className="mt-5 max-w-3xl text-white/62 leading-7">
              A strong deployment identifies what exists, what is connected, what is pending, who owns each workflow, and what residents should experience. Ochiga does not replace missing infrastructure with fake telemetry.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-3 text-sm text-white/58">
              <span className="rounded-2xl border border-white/10 bg-black/24 p-4">Map the estate structure</span>
              <span className="rounded-2xl border border-white/10 bg-black/24 p-4">Define roles and access</span>
              <span className="rounded-2xl border border-white/10 bg-black/24 p-4">Connect real sources</span>
              <span className="rounded-2xl border border-white/10 bg-black/24 p-4">Import and assign devices</span>
              <span className="rounded-2xl border border-white/10 bg-black/24 p-4">Establish source states</span>
              <span className="rounded-2xl border border-white/10 bg-black/24 p-4">Review operational readiness</span>
            </div>
          </section>

          <section className="mt-20 grid gap-5 md:grid-cols-3">
            <Link href="/command-center" className="rounded-[26px] border border-white/10 bg-white/[0.02] p-6 hover:border-white/20">Command Center →</Link>
            <Link href="/papers/infrastructure-operating-systems" className="rounded-[26px] border border-white/10 bg-white/[0.02] p-6 hover:border-white/20">Infrastructure OS paper →</Link>
            <Link href="/deployments" className="rounded-[26px] border border-white/10 bg-white/[0.02] p-6 hover:border-white/20">Request deployment →</Link>
          </section>
        </div>
      </section>
    </main>
  );
}
