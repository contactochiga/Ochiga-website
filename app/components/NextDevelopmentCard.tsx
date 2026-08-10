// Portfolio-growth placeholder for the Current Developments grid — a
// dark architectural abstract panel signalling more developments are to
// come, without inventing a project, image or CTA. Height matches its
// grid siblings via CSS grid's default row stretch.
function BuildingIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M4 20V10l4-2v12M10 20V6l4-2v16M16 20v-8l4-2v10M2 20h20"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function NextDevelopmentCard() {
  return (
    <div className="h-full overflow-hidden rounded border border-ochiga-white/10">
      <div className="relative flex h-full min-h-[360px] flex-col items-center justify-center gap-4 bg-gradient-to-br from-ochiga-charcoal via-ochiga-graphite to-ochiga-black px-8 py-16 text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(246,243,236,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(246,243,236,0.6) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-ochiga-white/20 text-ochiga-white/45">
          <BuildingIcon />
        </span>
        <div className="relative">
          <p className="font-display text-xl text-ochiga-white md:text-2xl">Next Development</p>
          <p className="mt-2 text-xs uppercase tracking-wide text-ochiga-white/40">In Formation</p>
        </div>
        <span aria-hidden className="relative h-px w-16 bg-ochiga-white/15" />
        <p className="relative max-w-[220px] text-sm text-ochiga-white/40">More developments coming soon.</p>
      </div>
    </div>
  );
}
