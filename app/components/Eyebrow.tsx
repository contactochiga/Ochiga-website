export default function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 text-xs font-medium uppercase tracking-eyebrow text-ochiga-red">
      {children}
    </p>
  );
}
