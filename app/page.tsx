import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — HERO (TESLA-STYLE, CORRECT)
      ================================================= */}
      <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden bg-black">

        {/* Background Image */}
        <img
          src="/media/infrastructure.png"
          alt="Smart estate infrastructure"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Hero Content */}
        <div className="relative z-10 flex max-w-3xl flex-col items-center px-6 text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-[56px]">
            Infrastructure
          </h1>

          <p className="mt-2 text-sm font-medium uppercase tracking-widest text-white/80">
            Operating System
          </p>

          <p className="mt-6 max-w-md text-sm md:text-base text-white/80">
            Operate digital infrastructure across estates and buildings.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/oyi"
              className="flex h-11 w-full max-w-[260px] items-center justify-center rounded bg-[#3E6AE1] text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#3457b1]"
            >
              Explore Oyi
            </Link>

            <Link
              href="/deployments"
              className="flex h-11 w-full max-w-[260px] items-center justify-center rounded bg-white/90 text-xs font-medium uppercase tracking-wider text-[#393c41] transition hover:bg-white"
            >
              Request Deployment
            </Link>
          </div>
        </div>

        {/* Slider Dots */}
        <div className="absolute bottom-6 flex w-full justify-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
          <span className="h-1.5 w-1.5 rounded-full bg-white/40"></span>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — WHAT OCHIGA DOES
      ================================================= */}
      <section className="border-t border-white/10 px-6 py-32 md:px-20">
        <h2 className="mb-8 max-w-4xl text-3xl font-medium md:text-5xl">
          One system to govern access, assets, utilities, and payments.
        </h2>

        <p className="max-w-3xl text-lg text-white/70">
          Ochiga designs, deploys, and operates the digital backbone that runs
          modern estates, buildings, and physical environments.
          <br />
          <br />
          We replace fragmented tools and manual processes with a unified
          infrastructure operating layer.
        </p>
      </section>

      {/* =================================================
          SECTION 3 — OYI
      ================================================= */}
      <section className="border-t border-white/10 px-6 py-32 md:px-20">
        <h2 className="mb-4 text-3xl font-medium md:text-5xl">Oyi</h2>

        <p className="mb-8 max-w-3xl text-lg text-white/80 md:text-xl">
          Smart Building & Estate Infrastructure Operating System
        </p>

        <ul className="mb-10 space-y-3 text-lg text-white/70">
          <li>• Identity-driven access control and governance</li>
          <li>• Building systems and shared infrastructure operations</li>
          <li>• Utilities, metering, billing, and payments</li>
          <li>• Estate-wide operations, events, and audit trails</li>
        </ul>

        <Link
          href="/oyi"
          className="inline-block rounded-full border border-white/30 px-6 py-3 transition hover:bg-white/10"
        >
          View Oyi
        </Link>
      </section>

      {/* =================================================
          SECTION 4 — DIGITAL TWIN
      ================================================= */}
      <section className="border-t border-white/10 px-6 py-32 md:px-20">
        <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
          Digital Twin Infrastructure
        </p>

        <h2 className="mb-6 max-w-4xl text-3xl font-medium md:text-5xl">
          Live digital twins for real-world infrastructure.
        </h2>

        <p className="mb-10 max-w-3xl text-lg text-white/70">
          Ochiga builds digital twins as operational infrastructure —
          not visual simulations.
        </p>

        <Link
          href="/digital-twin"
          className="inline-block rounded-full border border-white/30 px-6 py-3 transition hover:bg-white/10"
        >
          View Read-Only Demo
        </Link>
      </section>

      {/* =================================================
          SECTION 5 — DEPLOYMENT CTA
      ================================================= */}
      <section className="border-t border-white/10 px-6 py-32 md:px-20">
        <h2 className="mb-6 text-3xl font-medium md:text-5xl">
          Deploy Ochiga
        </h2>

        <p className="mb-10 max-w-3xl text-lg text-white/70">
          Ochiga is deployed as core infrastructure — tailored to the physical,
          operational, and regulatory realities of its environment.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/deployments"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Request Deployment
          </Link>

          <Link
            href="/papers"
            className="rounded-full border border-white/30 px-6 py-3 text-sm transition hover:bg-white/10"
          >
            Read Infrastructure Papers
          </Link>
        </div>
      </section>
    </main>
  );
}
