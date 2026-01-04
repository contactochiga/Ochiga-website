import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* =================================================
          SECTION 1 — HERO (TESLA STYLE)
      ================================================= */}
      <section className="relative h-screen w-full overflow-hidden bg-black">

        {/* Background Image */}
        <img
          src="/media/infrastructure.png"
          alt="Smart estate infrastructure"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between pt-32 pb-24">

          {/* Top Text */}
          <div className="text-center px-6">
            <h1 className="text-4xl md:text-[56px] font-semibold tracking-tight">
              Infrastructure
            </h1>

            <p className="mt-2 text-sm font-medium underline underline-offset-4 text-white/90">
              Operating System
            </p>

            <p className="mt-4 max-w-md mx-auto text-sm md:text-base text-white/80">
              Operate digital infrastructure across estates and buildings.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex w-full flex-col items-center gap-4 px-6 md:flex-row md:justify-center">
            <Link
              href="/oyi"
              className="flex h-10 w-full max-w-[264px] items-center justify-center rounded bg-[#3E6AE1] text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#3457b1]"
            >
              Explore Oyi
            </Link>

            <Link
              href="/deployments"
              className="flex h-10 w-full max-w-[264px] items-center justify-center rounded bg-white/80 text-xs font-medium uppercase tracking-wider text-[#393c41] backdrop-blur-md transition hover:bg-white"
            >
              Request Deployment
            </Link>
          </div>
        </div>

        {/* Slider dots */}
        <div className="absolute bottom-12 flex w-full justify-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
        </div>

        {/* Mobile bottom bar (Tesla-style) */}
        <div className="absolute bottom-0 z-20 flex w-full items-center justify-center border-t border-white/10 bg-white/5 py-4 backdrop-blur-lg md:hidden">
          <button className="flex items-center gap-2 text-xs font-medium text-white">
            <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white">
              <span className="text-[10px]">⚡</span>
            </div>
            Schedule a Demo Today
          </button>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — WHAT OCHIGA DOES
      ================================================= */}
      <section className="px-6 md:px-20 py-32 border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-medium mb-8 max-w-4xl">
          One system to govern access, assets, utilities, and payments.
        </h2>

        <p className="max-w-3xl text-lg text-white/70">
          Ochiga designs, deploys, and operates the digital backbone that runs
          modern estates, buildings, and physical environments.
          <br /><br />
          We replace fragmented tools and manual processes with a unified
          infrastructure operating layer.
        </p>
      </section>

      {/* =================================================
          SECTION 3 — OYI
      ================================================= */}
      <section className="px-6 md:px-20 py-32 border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-medium mb-4">
          Oyi
        </h2>

        <p className="text-lg md:text-xl text-white/80 mb-8 max-w-3xl">
          Smart Building & Estate Infrastructure Operating System
        </p>

        <ul className="space-y-3 text-white/70 text-lg mb-10">
          <li>• Identity-driven access control and governance</li>
          <li>• Building systems and shared infrastructure operations</li>
          <li>• Utilities, metering, billing, and payments</li>
          <li>• Estate-wide operations, events, and audit trails</li>
        </ul>

        <Link
          href="/oyi"
          className="inline-block px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
        >
          View Oyi
        </Link>
      </section>

      {/* =================================================
          SECTION 4 — DIGITAL TWIN
      ================================================= */}
      <section className="px-6 md:px-20 py-32 border-t border-white/10">
        <p className="uppercase text-xs tracking-widest text-white/50 mb-3">
          Digital Twin Infrastructure
        </p>

        <h2 className="text-3xl md:text-5xl font-medium mb-6 max-w-4xl">
          Live digital twins for real-world infrastructure.
        </h2>

        <p className="max-w-3xl text-lg text-white/70 mb-8">
          Ochiga builds digital twins as operational infrastructure —
          not visual simulations.
        </p>

        <Link
          href="/digital-twin"
          className="inline-block px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition"
        >
          View Read-Only Demo
        </Link>
      </section>

      {/* =================================================
          SECTION 5 — DEPLOY CTA
      ================================================= */}
      <section className="px-6 md:px-20 py-32 border-t border-white/10">
        <h2 className="text-3xl md:text-5xl font-medium mb-4">
          Deploy Ochiga
        </h2>

        <p className="max-w-3xl text-lg text-white/70 mb-8">
          Ochiga is deployed as core infrastructure — tailored to the physical,
          operational, and regulatory realities of its environment.
        </p>

        <div className="flex gap-4">
          <Link
            href="/deployments"
            className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium"
          >
            Request Deployment
          </Link>

          <Link
            href="/papers"
            className="px-6 py-3 rounded-full border border-white/30 hover:bg-white/10 transition text-sm"
          >
            Read Infrastructure Papers
          </Link>
        </div>
      </section>

    </main>
  );
}
