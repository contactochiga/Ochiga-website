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

// Generic "portfolio preview" card — originally built for Current
// Developments (Havana/Green Gardens/Central One, which always pass
// location + a construction-style status/progress track) and reused
// as-is for Our Technology's product cards, which have neither a
// geography nor a "design development" concept. location/status/
// statusStages/statusActiveIndex are therefore optional: omitting them
// simply skips that piece of the card rather than rendering something
// fabricated. tourHref is likewise optional — Ochiga Private's
// opportunity-category cards describe an interest, not a product with a
// tour to take, so they omit it and the card simply has no footer link.
// imageSrc/imageAlt are also optional — Ochiga Private's opportunity
// categories (Income/Appreciation/Development/Strategic) are interests
// to select around, not photographed products, so they render
// AbstractSurface's restrained tone+label placeholder instead of a
// fabricated or repeated stock photo. Existing development/technology
// callers are unaffected — they still pass every field, so their
// rendering is unchanged.
export default function ProjectPreviewCard({
  name,
  typeLine,
  location,
  status,
  story,
  imageSrc,
  imageAlt,
  imageTone = "charcoal",
  statusStages,
  statusActiveIndex,
  tourHref,
  imagePosition,
}: {
  name: string;
  typeLine: string;
  location?: string;
  status?: string;
  story: string;
  imageSrc?: string;
  imageAlt?: string;
  imageTone?: "black" | "charcoal" | "red";
  statusStages?: string[];
  statusActiveIndex?: number;
  tourHref?: string;
  imagePosition?: string;
}) {
  return (
    <div className="h-full overflow-hidden rounded border border-ochiga-white/10 transition-colors duration-base hover:border-ochiga-white/30">
      {/* Purely visual — the tour entry point lives in the single
          "Take a Tour" link below, not on the image. */}
      <div className="relative">
        <AbstractSurface
          tone={imageTone}
          aspect="aspect-[16/10]"
          src={imageSrc}
          alt={imageAlt}
          objectPosition={imagePosition}
          label={imageSrc ? undefined : name}
        />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ochiga-black/45 via-transparent to-transparent" />
        {status ? (
          <span className="absolute left-3 top-3 rounded-full border border-ochiga-white/25 bg-ochiga-black/55 px-3 py-1.5 text-[10px] uppercase tracking-wide text-ochiga-white backdrop-blur-sm">
            {status}
          </span>
        ) : null}
      </div>

      <div className="p-6">
        <h3 className="font-display text-xl text-ochiga-white md:text-2xl">{name}</h3>
        <p className="mt-2 text-sm text-ochiga-white/55">{typeLine}</p>
        {location ? (
          <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ochiga-white/45">
            <LocationIcon />
            {location}
          </p>
        ) : null}
        <p className="mt-4 text-sm leading-relaxed text-ochiga-white/60">{story}</p>

        {statusStages && statusActiveIndex !== undefined ? (
          <div className="mt-6">
            <ProjectProgressTrack stages={statusStages} activeIndex={statusActiveIndex} />
          </div>
        ) : null}

        {tourHref ? (
          <Link
            href={tourHref}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ochiga-white transition-colors duration-base hover:text-ochiga-white/75"
          >
            Take a Tour
            <ArrowIcon />
          </Link>
        ) : null}
      </div>
    </div>
  );
}
