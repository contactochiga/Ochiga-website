import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* ===============================
         SECTION 1 — OPENING (VIDEO HERO)
      =============================== */}
      <section className="relative min-h-screen flex items-center px-6 md:px-20 overflow-hidden bg-black">
        
        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/media/hero.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-7xl font-semibold tracking-tight mb-6">
            Ochiga
          </h1>

          <h2 className="text-xl md:text-2xl text-white/80 mb-8">
            Infrastructure Operating System
          </h2>

          <p className="max-w-2xl text-lg md:text-xl text-white/70 mb-12">
            Operate digital infrastructure across estates and buildings.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/oyi"
              className="px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Explore Oyi
            </Link>

            <Link
              href="/deployments"
              className="px-8 py-3 rounded-full border border-white/30 text-sm hover:bg-white/10 transition"
            >
              Request Deployment
            </Link>
          </div>
        </div>
      </section>

      {/* ===============================
         SECTION 2 — WHAT OCHIGA DOES
      =============================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-10 max-w-4xl">
          One system to govern access, assets, utilities, and payments.
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70">
          Ochiga designs, deploys, and operates the digital backbone that runs
          modern estates, buildings, and physical environments.
          <br />
          <br />
          We replace fragmented tools and manual processes with a unified
          infrastructure operating layer.
        </p>
      </section>

      {/* ===============================
         SECTION 3 — PRODUCT (OYI)
      =============================== */}
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

      {/* ===============================
         SECTION 4 — DIGITAL TWIN
      =============================== */}
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
          <br />
          <br />
          Each deployment represents real buildings, assets, systems,
          and operational state in real time.
        </p>

        <Link
          href="/digital-twin"
          className="inline-block px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
        >
          View Read-Only Demo
        </Link>
      </section>

      {/* ===============================
         SECTION 5 — LIFECYCLE
      =============================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-16">
          Across the Infrastructure Lifecycle
        </h2>

        <div className="grid md:grid-cols-3 gap-14 text-white/80">
          <div>
            <h3 className="text-xl mb-3">Pre-Construction</h3>
            <p className="text-white/60">
              Digital planning, identity models, infrastructure design,
              and system architecture.
            </p>
          </div>

          <div>
            <h3 className="text-xl mb-3">During Construction</h3>
            <p className="text-white/60">
              Digital twin development, asset mapping,
              and system integration.
            </p>
          </div>

          <div>
            <h3 className="text-xl mb-3">Post-Construction</h3>
            <p className="text-white/60">
              Live operations, access control,
              utilities, payments, and governance.
            </p>
          </div>
        </div>
      </section>

      {/* ===============================
         SECTION 6 — WHO IT’S FOR
      =============================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-12">
          Built for operators, not consumers.
        </h2>

        <ul className="space-y-3 text-white/70 text-lg">
          <li>• Real-estate developers and estate owners</li>
          <li>• Estate and facility management companies</li>
          <li>• Utility and service providers</li>
          <li>• Public and private infrastructure operators</li>
          <li>• Government agencies and authorities</li>
        </ul>
      </section>

      {/* ===============================
         SECTION 7 — DEPLOYMENT CTA
      =============================== */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-20 border-t border-white/10">
        <h2 className="text-3xl md:text-6xl font-medium mb-6">
          Deploy Ochiga
        </h2>

        <p className="max-w-3xl text-lg md:text-xl text-white/70 mb-12">
          Ochiga is deployed as core infrastructure.
          <br />
          Each deployment is tailored to the physical,
          operational, and regulatory realities of its environment.
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
