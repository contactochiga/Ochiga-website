import Link from "next/link";
import AbstractSurface from "@/app/components/AbstractSurface";
import ProjectProgressTrack from "@/app/components/ProjectProgressTrack";

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden focusable="false">
      <path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default function ProjectPreviewCard({
  name,
  typeLine,
  location,
  status,
  story,
  imageSrc,
  imageAlt,
  statusStages,
  statusActiveIndex,
  tourHref,
}: {
  name: string;
  typeLine: string;
  location: string;
  status: string;
  story: string;
  imageSrc: string;
  imageAlt: string;
  statusStages: string[];
  statusActiveIndex: number;
  tourHref: string;
}) {
  return (
    <div className="h-full overflow-hidden rounded border border-ochiga-white/10 transition-colors duration-base hover:border-ochiga-white/30">
      {/* Purely visual — the tour entry point lives in the single
          "Take a Tour" link below, not on the image. */}
      <div className="relative">
        <AbstractSurface tone="charcoal" aspect="aspect-[16/10]" src={imageSrc} alt={imageAlt} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ochiga-black/45 via-transparent to-transparent" />
        <span className="absolute left-3 top-3 rounded-full border border-ochiga-white/25 bg-ochiga-black/55 px-3 py-1.5 text-[10px] uppercase tracking-wide text-ochiga-white backdrop-blur-sm">
          {status}
        </span>
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-ochiga-white md:text-2xl">{name}</h3>
        <p className="mt-2 text-sm text-ochiga-white/55">{typeLine}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ochiga-white/45">
          <LocationIcon />
          {location}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-ochiga-white/60">{story}</p>

        <div className="mt-6">
          <ProjectProgressTrack stages={statusStages} activeIndex={statusActiveIndex} />
        </div>

        <Link
          href={tourHref}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ochiga-white transition-colors duration-base hover:text-ochiga-white/75"
        >
          Take a Tour
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}
