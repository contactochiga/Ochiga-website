// Simple horizontal process sequence, e.g.
// LAND → CAPITAL → DEVELOPMENT → BUYERS → OYI → OPERATIONS → LONG-TERM ASSET VALUE
// or DISCOVER → UNDERWRITE → STRUCTURE → DEVELOP/OPERATE → CREATE VALUE → HOLD/EXIT
export default function ProcessFlow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-4">
      {steps.map((step, index) => (
        <li key={step} className="flex items-center gap-3">
          <span className="rounded border border-ochiga-white/15 px-4 py-2 text-xs font-medium uppercase tracking-wide text-ochiga-white/80 md:text-sm">
            {step}
          </span>
          {index < steps.length - 1 ? (
            <span aria-hidden className="text-ochiga-white/30">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
