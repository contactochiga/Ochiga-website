import Link from "next/link";

export function TileGrid({ children, columns = 2 }: { children: React.ReactNode; columns?: 2 | 3 | 4 }) {
  const colClass = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }[columns];
  return <div className={`grid gap-6 ${colClass}`}>{children}</div>;
}

export default function TileCard({
  title,
  body,
  href,
  tag,
}: {
  title: string;
  body: string;
  href?: string;
  tag?: string;
}) {
  const content = (
    <>
      {tag ? <span className="text-[11px] uppercase tracking-wide text-ochiga-red">{tag}</span> : null}
      <h3 className={`font-display text-lg text-ochiga-white md:text-xl ${tag ? "mt-3" : ""}`}>{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-ochiga-white/60">{body}</p>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="rounded border border-ochiga-white/10 p-6 transition-colors duration-base hover:border-ochiga-white/30 md:p-7">
        {content}
      </Link>
    );
  }

  return <div className="rounded border border-ochiga-white/10 p-6 md:p-7">{content}</div>;
}
