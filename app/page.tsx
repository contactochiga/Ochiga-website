// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="w-full bg-black text-white">

      {/* =================================================
          HERO — TESLA-STYLE BACKGROUND SECTION
      ================================================= */}
      <section
        className="
          relative
          h-[80vh]
          w-full
          flex
          items-center
          justify-center
          px-6
          md:px-20
          text-center
        "
        style={{
          backgroundImage: "url('/media/infrastructure.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-4">
            Infrastructure
            <br />
            Operating System
          </h1>

          <p className="text-lg md:text-xl text-white/80 mb-10">
            Operate digital infrastructure across estates and buildings.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link
              href="/oyi"
              className="
                px-7 py-3
                rounded-xl
                bg-white
                text-black
                font-medium
                hover:bg-gray-200
                transition
              "
            >
              Explore Oyi
            </Link>

            <Link
              href="/deployments"
              className="
                px-7 py-3
                rounded-xl
                border
                border-white/30
                bg-white/10
                backdrop-blur
                hover:bg-white/20
                transition
              "
            >
              Request Deployment
            </Link>
          </div>
        </div>
      </section>

      {/* =================================================
          SECTION 2 — WHAT OCHIGA DOES
      ================================================= */}
      <section className="px-6 md:px-20 py-28 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          One system for real-world infrastructure.
        </h2>

        <p className="max-w-3xl mx-auto text-lg text-white/70">
          Ochiga designs and operates the digital backbone that governs access,
          assets, utilities, payments, and live systems across physical
          environments.
        </p>
      </section>

      {/* =================================================
          FOOTER PLACEHOLDER
      ================================================= */}
      <footer className="text-center py-12 text-sm opacity-50">
        OCHIGA © 2026
      </footer>

    </div>
  );
}
