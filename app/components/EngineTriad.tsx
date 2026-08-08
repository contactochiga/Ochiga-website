import Link from "next/link";
import { engines } from "@/lib/company";

// The Development x Oyi x Private summary block used on the homepage and
// referenced from several bridge pages. Section 7B of the brief.
export default function EngineTriad() {
  return (
    <div className="grid gap-px overflow-hidden rounded border border-ochiga-white/10 bg-ochiga-white/10 md:grid-cols-3">
      {engines.map((engine) => (
        <Link
          key={engine.key}
          href={engine.href}
          className="group flex flex-col justify-between bg-ochiga-black p-8 transition-colors duration-base hover:bg-ochiga-charcoal md:p-10"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">
              {engine.name}
            </p>
            <p className="mt-5 font-display text-xl leading-snug text-ochiga-white md:text-2xl">
              {engine.short}
            </p>
          </div>
          <p className="mt-8 text-sm leading-relaxed text-ochiga-white/55">
            {engine.description}
          </p>
          <span className="mt-8 inline-flex items-center gap-2 text-sm text-ochiga-white/70 group-hover:text-ochiga-white">
            Learn more →
          </span>
        </Link>
      ))}
    </div>
  );
}
