import type { ReactNode } from "react";
import AbstractSurface from "@/app/components/AbstractSurface";

export default function FullBleedMedia({
  eyebrow,
  title,
  description,
  surfaceLabel,
  tone = "charcoal",
  imageSrc,
  imageAlt,
  children,
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  surfaceLabel?: string;
  tone?: "black" | "charcoal" | "red";
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden border-y border-ochiga-white/10">
      <div className="absolute inset-0">
        <AbstractSurface tone={tone} aspect="h-full w-full" label={surfaceLabel} src={imageSrc} alt={imageAlt} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ochiga-black via-ochiga-black/40 to-transparent" />
      <div className="relative z-10 mx-auto w-full max-w-wide px-6 pb-16 pt-32 md:px-10">
        {eyebrow ? <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">{eyebrow}</p> : null}
        {title ? <h2 className="max-w-2xl font-display text-3xl leading-tight text-ochiga-white md:text-5xl">{title}</h2> : null}
        {description ? <p className="mt-6 max-w-xl text-base leading-relaxed text-ochiga-white/70 md:text-lg">{description}</p> : null}
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </section>
  );
}
