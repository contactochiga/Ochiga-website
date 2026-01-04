import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* ===============================
         SECTION 1 — TESLA-STYLE HERO
      =============================== */}
      <section
        className="
          relative
          h-[82vh]
          min-h-[520px]
          w-full
          overflow-hidden
        "
      >
        {/* Background image */}
        <img
          src="/media/infrastructure.png"
          alt="Infrastructure overview"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content wrapper */}
        <div
          className="
            relative
            z-10
            h-full
            flex
            items-center
            px-6
            md:px-20
          "
        >
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60 mb-4">
              Ochiga
            </p>

            <h1 className="text-4xl md:text-6xl font-semibold leading-tight mb-5">
              Infrastructure
              <br />
              Operating System
            </h1>

            <p className="text-base md:text-lg text-white/75 mb-8">
              Operate digital infrastructure across estates and buildings.
            </p>

            <div className="flex gap-4">
              <Link
                href="/oyi"
                className="
                  px-6
                  py-3
                  rounded-full
                  bg-[#f59e0b]
                  text-black
                  text-sm
                  font-medium
                  hover:bg-[#fbbf24]
                  transition
                "
              >
                Explore Oyi
              </Link>

              <Link
                href="/deployments"
                className="
                  px-6
                  py-3
                  rounded-full
                  bg-white/10
                  border
                  border-white/30
                  text-sm
                  hover:bg-white/20
                  transition
                "
              >
                Request deployment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* STOP HERE.
          DO NOT TOUCH OTHER SECTIONS YET.
          WE FIX SECTION 1 FIRST. */}
    </main>
  );
}
