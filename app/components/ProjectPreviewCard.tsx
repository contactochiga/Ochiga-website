import Link from "next/link";
import AbstractSurface from "@/app/components/AbstractSurface";
import ProjectStatusStepper from "@/app/components/ProjectStatusStepper";

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
    <div className="group overflow-hidden rounded border border-ochiga-white/10 transition-colors duration-base hover:border-ochiga-white/30">
      <AbstractSurface tone="charcoal" aspect="aspect-[16/10]" src={imageSrc} alt={imageAlt} />
      <div className="p-7 md:p-9">
        <p className="text-xs uppercase tracking-wide text-ochiga-white/45">
          {typeLine} · {location}
        </p>
        <h3 className="mt-3 font-display text-2xl text-ochiga-white md:text-3xl">{name}</h3>
        <span className="mt-3 inline-block rounded-sm border border-ochiga-red/40 px-2.5 py-1 text-[11px] uppercase tracking-wide text-ochiga-red">
          {status}
        </span>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-ochiga-white/60">{story}</p>

        <div className="mt-7 max-w-sm">
          <ProjectStatusStepper stages={statusStages} activeIndex={statusActiveIndex} />
        </div>

        <Link
          href={tourHref}
          className="mt-8 inline-flex items-center justify-center rounded border border-ochiga-white/25 px-7 py-3 text-sm font-medium text-ochiga-white transition-colors duration-base hover:border-ochiga-white/60"
        >
          Take a Tour
        </Link>
      </div>
    </div>
  );
}
