import type { ReactNode } from "react";

export default function SectionBlock({
  eyebrow,
  title,
  description,
  children,
  width = "wide",
  tone = "dark",
  id,
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  children?: ReactNode;
  width?: "content" | "wide" | "cinematic";
  tone?: "dark" | "light";
  id?: string;
}) {
  const widthClass = { content: "max-w-content", wide: "max-w-wide", cinematic: "max-w-cinematic" }[width];
  const toneClass = tone === "light" ? "bg-ochiga-warmwhite text-ochiga-black" : "";

  return (
    <section id={id} className={`px-6 py-20 md:px-10 md:py-28 ${toneClass}`}>
      <div className={`mx-auto ${widthClass}`}>
        {eyebrow ? (
          <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-tight md:text-4xl">
            {title}
          </h2>
        ) : null}
        {description ? (
          <p className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${tone === "light" ? "text-ochiga-black/70" : "text-ochiga-white/65"}`}>
            {description}
          </p>
        ) : null}
        {children ? <div className="mt-12">{children}</div> : null}
      </div>
    </section>
  );
}
