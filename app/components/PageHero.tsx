import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-ochiga-white/10 px-6 pb-20 pt-36 md:px-10 md:pb-28 md:pt-44">
      <div className="mx-auto max-w-wide">
        <p className="mb-5 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl font-display text-4xl leading-[1.05] tracking-tight text-ochiga-white md:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-ochiga-white/65 md:text-lg">
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-10">{children}</div> : null}
      </div>
    </header>
  );
}
