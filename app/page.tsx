import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — HERO (TESLA-STYLE CANVAS)
      ================================================= */}
      <section className="relative h-[85vh] w-full overflow-hidden">

        {/* Background Image */}
        <img
          src="/media/infrastructure.png"
          alt="Smart estate infrastructure"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark cinematic overlay */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col justify-center px-6 md:px-20">

          {/* Text block */}
          <div className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-white/70">
              Ochiga
            </p>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              Infrastructure
              <br />
              Operating System
            </h1>

            <p className="mt-5 text-base text-white/80 md:text-lg">
              Operate digital infrastructure across estates and buildings.
            </p>

            {/* CTA buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/oyi"
                className="flex h-11 w-full max-w-[260px] items-center justify-center rounded bg-[#3E6AE1] text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-[#3457b1]"
              >
                Explore Oyi
              </Link>

              <Link
                href="/deployments"
                className="flex h-11 w-full max-w-[260px] items-center justify-center rounded bg-white/85 text-xs font-semibold uppercase tracking-wider text-black transition hover:bg-white"
              >
                Request Deployment
              </Link>
            </div>
          </div>
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
        </div>
      </section>

      {/* =================================================
          SECTION 2 — WHAT OCHIGA DOES
      ================================================= */}
      <section className="min-h-screen px-6 md:px-20 flex flex-col justify-center border-t border-white/10">
        <h2 className="mb-10 max-w-4xl text-3xl font-medium md:text-6xl">
          One system to govern access, assets, utilities, and payments.
        </h2>

        <p className="max-w-3xl text-lg text-white/70 md:text-xl">
          Ochiga designs, deploys, and operates the digital backbone that runs
          modern estates, buildings, and physical environments.
          <br /><br />
          We replace fragmented tools and manual processes with a unified
          infrastructure operating layer.
        </p>
      </section>

      {/* =================================================
          SECTION 3 — PRODUCT (OYI)
      ================================================= */}
      <section className="min-h-screen px-6 md:px-20 flex flex-col justify-center border-t border-white/10">
        <h2 className="mb-6 text-3xl font-medium md:text-6xl">
          Oyi
        </h2>

        <p className="mb-10 max-w-3xl text-lg text-white/80 md:text-2xl">
          Smart Building & Estate Infrastructure Operating System
        </p>

        <ul className="mb-12 space-y-4 text-lg text-white/70">
          <li>• Identity-driven access control and governance</li>
          <li>• Building systems and shared infrastructure operations</li>
          <li>• Utilities, metering, billing, and payments</li>
          <li>• Estate-wide operations, events, and audit trails</li>
        </ul>

        <Link
          href="/oyi"
          className="inline-flex h-11 w-[260px] items-center justify-center rounded border border-white/30 text-sm transition hover:bg-white/10"
        >
          View Oyi
        </Link>
      </section>

      {/* =================================================
          SECTION 4 — DIGITAL TWIN
      ================================================= */}
      <section className="min-h-screen px-6 md:px-20 flex flex-col justify-center border-t border-white/10">
        <p className="mb-4 text-xs uppercase tracking-widest text-white/50">
          Digital Twin Infrastructure
        </p>

        <h2 className="mb-8 max-w-4xl text-3xl font-medium md:text-6xl">
          Live digital twins for real-world infrastructure.
        </h2>

        <p className="mb-12 max-w-3xl text-lg text-white/70 md:text-xl">
          Ochiga builds digital twins as operational infrastructure —
          not visual simulations.
        </p>

        <Link
          href="/digital-twin"
          className="inline-flex h-11 w-[260px] items-center justify-center rounded border border-white/30 text-sm transition hover:bg-white/10"
        >
          View Read-Only Demo
        </Link>
      </section>

      {/* =================================================
          SECTION 5 — DEPLOYMENT CTA
      ================================================= */}
      <section className="min-h-screen px-6 md:px-20 flex flex-col justify-center border-t border-white/10">
        <h2 className="mb-6 text-3xl font-medium md:text-6xl">
          Deploy Ochiga
        </h2>

        <p className="mb-12 max-w-3xl text-lg text-white/70 md:text-xl">
          Ochiga is deployed as core infrastructure —
          tailored to the physical, operational,
          and regulatory realities of its environment.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/deployments"
            className="flex h-11 w-[260px] items-center justify-center rounded bg-white text-sm font-medium text-black transition hover:bg-white/90"
          >
            Request Deployment
          </Link>

          <Link
            href="/papers"
            className="flex h-11 w-[260px] items-center justify-center rounded border border-white/30 text-sm transition hover:bg-white/10"
          >
            Read Infrastructure Papers
          </Link>
        </div>
      </section>

    </main>
  );
}
