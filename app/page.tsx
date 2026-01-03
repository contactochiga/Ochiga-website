import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =====================================================
         SECTION 1 — CINEMATIC IMAGE HERO (INFRASTRUCTURE)
      ====================================================== */}
      <section className="relative min-h-screen flex items-end px-6 md:px-20 pb-24 md:pb-32 overflow-hidden">

        {/* Background image */}
        <img
          src="/media/infrastructure.png"
          alt="Infrastructure city overview"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* Hero content */}
        <div className="relative z-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4">
            Ochiga
          </p>

          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-5">
            Infrastructure
            <br />
            Operating System
          </h1>

          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl">
            Operate digital infrastructure across estates and buildings.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/oyi"
              className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Explore Oyi
            </Link>

            <Link
              href="/deployments"
              className="px-7 py-3 rounded-full border border-white/30 text-sm hover:bg-white/10 transition"
            >
              Request Deployment
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
         SECTION 2 — WHAT OCHIGA DOES
      ====================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-10 max-w-4xl">
          One system to govern access, assets, utilities, and payments.
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70">
          Ochiga designs, deploys, and operates the digital backbone that runs
          modern estates, buildings, and physical environments.
          <br /><br />
          We replace fragmented tools and manual processes with a unified
          infrastructure operating layer.
        </p>
      </section>

      {/* =====================================================
         SECTION 3 — PRODUCT: OYI
      ====================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-6">
          Oyi
        </h2>

        <p className="text-lg md:text-2xl text-white/80 mb-10 max-w-3xl">
          Smart Building & Estate Infrastructure Operating System
        </p>

        <ul className="space-y-4 text-white/70 text-lg mb-12">
          <li>• Identity-driven access control and governance</li>
          <li>• Building systems and shared infrastructure operations</li>
          <li>• Utilities, metering, billing, and payments</li>
          <li>• Estate-wide operations, events, and audit trails</li>
        </ul>

        <Link
          href="/oyi"
          className="inline-block px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
        >
          View Oyi
        </Link>
      </section>

      {/* =====================================================
         SECTION 4 — DIGITAL TWIN
      ====================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <p className="uppercase text-xs tracking-widest text-white/50 mb-4">
          Digital Twin Infrastructure
        </p>

        <h2 className="text-3xl md:text-6xl font-medium mb-8 max-w-4xl">
          Live digital twins for real-world infrastructure.
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70 mb-12">
          Ochiga builds digital twins as operational infrastructure —
          not visual simulations.
        </p>

        <Link
          href="/digital-twin"
          className="inline-block px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
        >
          View Read-Only Demo
        </Link>
      </section>

      {/* =====================================================
         SECTION 5 — DEPLOYMENT CTA
      ====================================================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-6">
          Deploy Ochiga
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70 mb-12">
          Ochiga is deployed as core infrastructure —
          tailored to the physical, operational,
          and regulatory realities of its environment.
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/deployments"
            className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
          >
            Request Deployment
          </Link>

          <Link
            href="/papers"
            className="px-8 py-3 rounded-full border border-white/30 text-sm hover:bg-white/10 transition"
          >
            Read Infrastructure Papers
          </Link>
        </div>
      </section>

    </main>
  );
}
