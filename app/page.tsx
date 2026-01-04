import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black font-sans">
      
      {/* 1. FLOATING NAV (Tesla Style) */}
      <nav className="absolute top-0 z-50 flex w-full items-center justify-between px-8 py-6 md:px-12">
        <div className="text-xl font-bold tracking-widest text-white">
          OCHIGA
        </div>
        <button className="rounded-md bg-black/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/20">
          Menu
        </button>
      </nav>

      {/* 2. MAIN HERO SECTION */}
      <section className="relative h-screen w-full">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/media/infrastructure.png"
            alt="Smart estate infrastructure"
            className="h-full w-full object-cover"
          />
          {/* Subtle gradient overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/20" />
        </div>

        {/* Content Container */}
        <div className="relative z-10 flex h-full flex-col items-center justify-between pb-20 pt-32">
          
          {/* Top Text Group */}
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
              Infrastructure
            </h1>
            <p className="mt-2 text-sm font-medium text-white/90 underline underline-offset-4">
              Operating System
            </p>
          </div>

          {/* Bottom Action Group */}
          <div className="flex w-full flex-col items-center gap-4 px-6 md:flex-row md:justify-center">
            <Link
              href="/oyi"
              className="flex h-10 w-full max-w-[264px] items-center justify-center rounded bg-[#3E6AE1] text-xs font-medium uppercase tracking-wider text-white transition hover:bg-[#3457b1] md:w-[264px]"
            >
              Explore Oyi
            </Link>

            <Link
              href="/deployments"
              className="flex h-10 w-full max-w-[264px] items-center justify-center rounded bg-[#f4f4f4]/80 text-xs font-medium uppercase tracking-wider text-[#393c41] backdrop-blur-md transition hover:bg-white md:w-[264px]"
            >
              Request Deployment
            </Link>
          </div>
        </div>

        {/* Slider Dots (Bottom Center) */}
        <div className="absolute bottom-6 flex w-full justify-center gap-3">
          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white/40"></div>
        </div>
      </section>

      {/* 3. SCHEDULE DRIVE BAR (Bottom UI) */}
      <div className="absolute bottom-0 z-20 flex w-full items-center justify-center border-t border-white/10 bg-white/5 py-4 backdrop-blur-lg">
        <button className="flex items-center gap-2 text-sm font-medium text-white">
          <span className="rounded-full border border-white p-1">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm12-88a12,12,0,1,1-12-12A12,12,0,0,1,140,128Z"></path></svg>
          </span>
          Schedule a Demo Today
        </button>
      </div>
    </main>
  );
}
