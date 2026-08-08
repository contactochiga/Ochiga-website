// A designed abstract architectural surface — used wherever real
// photography/renders are not yet available (see ASSET_REQUIREMENTS.md).
// Deliberately not a broken-image placeholder: a restrained grid +
// gradient composition that reads as intentional, in the Ochiga palette.
// Replace with real imagery via the `src` prop once available.
type Props = {
  label?: string;
  tone?: "black" | "charcoal" | "red";
  aspect?: string; // Tailwind aspect-* class, e.g. "aspect-[4/5]"
  src?: string;
  alt?: string;
};

export default function AbstractSurface({ label, tone = "charcoal", aspect = "aspect-[4/5]", src, alt }: Props) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt || ""} className={`w-full ${aspect} object-cover`} />;
  }

  const toneClass = {
    black: "from-ochiga-black via-ochiga-charcoal to-ochiga-black",
    charcoal: "from-ochiga-charcoal via-ochiga-graphite to-ochiga-black",
    red: "from-ochiga-red-muted via-ochiga-black to-ochiga-black",
  }[tone];

  return (
    <div className={`relative w-full overflow-hidden bg-gradient-to-br ${toneClass} ${aspect}`}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(246,243,236,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(246,243,236,0.6) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div aria-hidden className="absolute inset-0 border border-ochiga-white/10" />
      {label ? (
        <span className="absolute bottom-5 left-5 text-xs uppercase tracking-eyebrow text-ochiga-white/40">
          {label}
        </span>
      ) : null}
    </div>
  );
}
