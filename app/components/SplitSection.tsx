import type { ReactNode } from "react";
import AbstractSurface from "@/app/components/AbstractSurface";

export default function SplitSection({
  eyebrow,
  title,
  description,
  children,
  reverse = false,
  surfaceLabel,
  tone = "charcoal",
  imageSrc,
  imageAlt,
  id,
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  children?: ReactNode;
  reverse?: boolean;
  surfaceLabel?: string;
  tone?: "black" | "charcoal" | "red";
  imageSrc?: string;
  imageAlt?: string;
  id?: string;
}) {
  return (
    <section id={id} className="border-t border-ochiga-white/10 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-wide items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className={reverse ? "md:order-2" : "md:order-1"}>
          <AbstractSurface tone={tone} aspect="aspect-[4/5]" label={surfaceLabel} src={imageSrc} alt={imageAlt} />
        </div>
        <div className={reverse ? "md:order-1" : "md:order-2"}>
          {eyebrow ? <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">{eyebrow}</p> : null}
          {title ? <h2 className="font-display text-2xl leading-tight text-ochiga-white md:text-4xl">{title}</h2> : null}
          {description ? <p className="mt-6 text-base leading-relaxed text-ochiga-white/65 md:text-lg">{description}</p> : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
