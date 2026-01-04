import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =====================================================
         HERO — INFRASTRUCTURE OPERATING SYSTEM
      ====================================================== */}
      <section
        className="relative min-h-screen w-full flex items-center"
        style={{
          backgroundImage: "url('/media/infrastructure.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Gradient depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

        {/* HERO CONTENT */}
        <div className="relative z-10 w-full px-6 md:px-20">
          <div className="max-w-4xl">

            {/* Brand cue */}
            <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-6">
              Ochiga
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold leading-[1.05] mb-6">
              Infrastructure
              <br />
              Operating System
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-white/75 mb-10 max-w-2xl">
              Operate digital infrastructure across estates and buildings.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/oyi"
                className="inline-flex justify-center items-center px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
              >
                Explore Oyi
              </Link>

              <Link
                href="/deployments"
                className="inline-flex justify-center items-center px-8 py-3 rounded-full border border-white/30 text-sm text-white hover:bg-white/10 transition"
              >
                Request Deployment
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
         SECTION — WHAT OCHIGA DOES
      ====================================================== */}
      <section className="min-h-screen flex items-center px-6 md:px-20 border-t border-white/10">
        <div className="max-w-5xl">
          <h2 className="text-3xl md:text-6xl font-medium mb-10">
            One system to govern access, assets,
            <br className="hidden md:block" />
            utilities, and payments.
          </h2>

          <p className="max-w-3xl text-lg md:text-xl text-white/70">
            Ochiga designs, deploys, and operates the digital backbone that runs
            modern estates, buildings, and physical environments.
            <br /><br />
            We replace fragmented tools and manual processes with a unified
            infrastructure operating layer.
          </p>
        </div>
      </section>

      {/* =====================================================
         SECTION — PRODUCT: OYI
      ====================================================== */}
      <section className="min-h-screen flex items-center px-6 md:px-20 border-t border-white/10">
        <div className="max-w-5xl">
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
            className="inline-flex px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
          >
            View Oyi
          </Link>
        </div>
      </section>

      {/* =====================================================
         SECTION — DIGITAL TWIN
      ====================================================== */}
      <section className="min-h-screen flex items-center px-6 md:px-20 border-t border-white/10">
        <div className="max-w-5xl">
          <p className="uppercase text-xs tracking-widest text-white/50 mb-4">
            Digital Twin Infrastructure
          </p>

          <h2 className="text-3xl md:text-6xl font-medium mb-8">
            Live digital twins for
            <br className="hidden md:block" />
            real-world infrastructure.
          </h2>

          <p className="max-w-3xl text-lg md:text-xl text-white/70 mb-12">
            Ochiga builds digital twins as operational infrastructure —
            not visual simulations.
          </p>

          <Link
            href="/digital-twin"
            className="inline-flex px-8 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
          >
            View Read-Only Demo
          </Link>
        </div>
      </section>

      {/* =====================================================
         SECTION — DEPLOYMENT
      ====================================================== */}
      <section className="min-h-screen flex items-center px-6 md:px-20 border-t border-white/10">
        <div className="max-w-5xl">
          <h2 className="text-3xl md:text-6xl font-medium mb-6">
            Deploy Ochiga
          </h2>

          <p className="max-w-3xl text-lg md:text-xl text-white/70 mb-12">
            Ochiga is deployed as core infrastructure —
            tailored to the physical, operational,
            and regulatory realities of its environment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/deployments"
              className="inline-flex justify-center px-8 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Request Deployment
            </Link>

            <Link
              href="/papers"
              className="inline-flex justify-center px-8 py-3 rounded-full border border-white/30 text-sm hover:bg-white/10 transition"
            >
              Read Infrastructure Papers
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
