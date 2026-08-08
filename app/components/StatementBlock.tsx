import type { ReactNode } from "react";

// A large editorial statement/pull-quote moment used to break section
// rhythm — e.g. "A building should not stop evolving at handover."
export default function StatementBlock({
  eyebrow,
  statement,
  tone = "dark",
  children,
}: {
  eyebrow?: string;
  statement: ReactNode;
  tone?: "dark" | "light";
  children?: ReactNode;
}) {
  const toneClass = tone === "light" ? "bg-ochiga-warmwhite text-ochiga-black" : "bg-ochiga-black text-ochiga-white";
  return (
    <section className={`border-y border-ochiga-white/10 px-6 py-24 md:px-10 md:py-36 ${toneClass}`}>
      <div className="mx-auto max-w-content text-center">
        {eyebrow ? <p className="mb-6 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">{eyebrow}</p> : null}
        <p className="font-display text-3xl leading-snug tracking-tight md:text-5xl">{statement}</p>
        {children ? <div className="mt-10 flex justify-center">{children}</div> : null}
      </div>
    </section>
  );
}
