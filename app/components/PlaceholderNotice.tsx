// Visible only in non-production builds, marks pages that are
// intentionally structural placeholders pending Phase 2 content.
export default function PlaceholderNotice({ note }: { note: string }) {
  if (process.env.NODE_ENV === "production") return null;
  return (
    <div className="mx-auto mt-16 max-w-wide rounded border border-dashed border-ochiga-red/40 bg-ochiga-red/5 px-6 py-4 text-xs text-ochiga-red">
      Phase 1 placeholder — {note}
    </div>
  );
}
