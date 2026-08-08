import type { ReactNode } from "react";
import CTAButton from "@/app/components/CTAButton";

export default function CTABand({
  eyebrow,
  title,
  description,
  ctas,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  ctas: Array<{ label: string; href: string; variant?: "primary" | "secondary"; external?: boolean }>;
}) {
  return (
    <section className="border-t border-ochiga-white/10 bg-ochiga-charcoal px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto flex max-w-wide flex-col items-start justify-between gap-10 md:flex-row md:items-end">
        <div className="max-w-xl">
          {eyebrow ? <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">{eyebrow}</p> : null}
          <h2 className="font-display text-3xl leading-tight text-ochiga-white md:text-4xl">{title}</h2>
          {description ? <p className="mt-5 text-base leading-relaxed text-ochiga-white/65">{description}</p> : null}
        </div>
        <div className="flex flex-wrap gap-4">
          {ctas.map((cta) => (
            <CTAButton key={cta.href + cta.label} href={cta.href} variant={cta.variant || "primary"} external={cta.external}>
              {cta.label}
            </CTAButton>
          ))}
        </div>
      </div>
    </section>
  );
}
