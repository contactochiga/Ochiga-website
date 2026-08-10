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
      {/* The image itself is the tour entrance — a single accessible
          link carries the action; the pill/affordance inside are
          decorative reinforcement, not separate controls. */}
      <Link href={tourHref} aria-label={`Take a tour of ${name}`} className="group relative block">
        <AbstractSurface tone="charcoal" aspect="aspect-[16/10]" src={imageSrc} alt={imageAlt} />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ochiga-black/45 via-transparent to-transparent" />
        <span
          aria-hidden
          className="absolute left-3 top-3 rounded-full border border-ochiga-white/25 bg-ochiga-black/55 px-3 py-1.5 text-[10px] uppercase tracking-wide text-ochiga-white backdrop-blur-sm"
        >
          {status}
        </span>
        <span
          aria-hidden
          className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-ochiga-white/25 bg-ochiga-black/55 px-3 py-1.5 text-[10px] uppercase tracking-wide text-ochiga-white backdrop-blur-sm transition-colors duration-base group-hover:border-ochiga-white/50"
        >
          Take a Tour
          <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-ochiga-white/40">
            <ArrowIcon />
          </span>
        </span>
      </Link>

      <div className="p-6">
        <p className="text-xs uppercase tracking-wide text-ochiga-white/45">
          {typeLine} · {location}
        </p>
        <h3 className="mt-2 font-display text-xl text-ochiga-white md:text-2xl">{name}</h3>
        <p className="mt-4 text-sm leading-relaxed text-ochiga-white/60">{story}</p>

        <div className="mt-6">
          <ProjectProgressTrack stages={statusStages} activeIndex={statusActiveIndex} />
        </div>

        <Link
          href={tourHref}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ochiga-white transition-colors duration-base hover:text-ochiga-white/75"
        >
          Project details
          <ArrowIcon />
        </Link>
      </div>
    </div>
  );
}
