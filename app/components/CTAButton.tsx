import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";

export default function CTAButton({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  external?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center rounded px-7 py-3 text-sm font-medium transition-colors duration-base";
  const styles: Record<Variant, string> = {
    primary: "bg-ochiga-red text-ochiga-white hover:bg-ochiga-red-bright",
    secondary:
      "border border-ochiga-white/25 text-ochiga-white hover:border-ochiga-white/60",
    ghost: "text-ochiga-white/70 hover:text-ochiga-white",
  };

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={`${base} ${styles[variant]}`}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles[variant]}`}>
      {children}
    </Link>
  );
}
