export default function TrustDisclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded border border-ochiga-white/10 bg-ochiga-white/[0.02] px-6 py-5 text-xs leading-relaxed text-ochiga-white/45 md:text-sm">
      {children}
    </div>
  );
}
