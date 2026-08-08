import Link from "next/link";
import AbstractSurface from "@/app/components/AbstractSurface";

function StudyCardBody({
  index,
  status,
  name,
  summary,
  specs,
}: {
  index?: string;
  status: string;
  name: string;
  summary: string;
  specs?: string[];
}) {
  return (
    <>
      <AbstractSurface tone="charcoal" aspect="aspect-[16/10]" label={index ? `Development Study ${index}` : status} />
      <div className="p-7">
        <span className="inline-block rounded-sm border border-ochiga-red/40 px-2.5 py-1 text-[11px] uppercase tracking-wide text-ochiga-red">
          {status}
        </span>
        <h3 className="mt-4 font-display text-xl text-ochiga-white md:text-2xl">{name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-ochiga-white/60">{summary}</p>
        {specs && specs.length ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {specs.map((spec) => (
              <li key={spec} className="rounded-sm border border-ochiga-white/10 px-2.5 py-1 text-[11px] text-ochiga-white/50">
                {spec}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </>
  );
}

export default function StudyCard({
  index,
  status = "Development Study",
  name,
  summary,
  specs,
  href,
}: {
  index?: string;
  status?: string;
  name: string;
  summary: string;
  specs?: string[];
  href?: string;
}) {
  const className = "group block overflow-hidden rounded border border-ochiga-white/10 transition-colors duration-base hover:border-ochiga-white/30";

  if (href) {
    return (
      <Link href={href} className={className}>
        <StudyCardBody index={index} status={status} name={name} summary={summary} specs={specs} />
      </Link>
    );
  }

  return (
    <div className={className}>
      <StudyCardBody index={index} status={status} name={name} summary={summary} specs={specs} />
    </div>
  );
}
