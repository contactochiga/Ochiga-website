import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-black text-white">

      {/* ===============================
          SECTION 1 — HERO (TESLA STYLE)
      =============================== */}
      <section
        className="
          relative
          w-full
          h-[78vh]
          min-h-[520px]
          overflow-hidden
        "
      >
        {/* Background image */}
        <img
          src="/media/infrastructure.png"
          alt="Smart estate infrastructure"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Hero content */}
        <div
          className="
            relative
            z-10
            h-full
            flex
            items-center
            justify-center
            px-6
          "
        >
          <div className="text-center max-w-xl">
            <h1 className="text-3xl md:text-5xl font-semibold mb-4">
              Infrastructure
              <br />
              Operating System
            </h1>

            <p className="text-base md:text-lg text-white/80 mb-8">
              Operate digital infrastructure across estates and buildings.
            </p>

            <div className="flex justify-center gap-4">
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
                "
              >
                Request deployment
              </Link>
            </div>
          </div>
        </div>

        {/* Slider dots (visual only for now) */}
        <div className="absolute bottom-6 w-full flex justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white/80" />
          <span className="w-2 h-2 rounded-full bg-white/30" />
          <span className="w-2 h-2 rounded-full bg-white/30" />
        </div>
      </section>

      {/* STOP HERE. DO NOT DESIGN OTHER SECTIONS YET */}

    </main>
  );
}
