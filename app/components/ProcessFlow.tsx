// Horizontal process sequence, e.g.
// LAND → CAPITAL → DEVELOPMENT → BUYERS → OYI → OPERATIONS → LONG-TERM ASSET VALUE
// or DISCOVER → UNDERWRITE → STRUCTURE → DEVELOP/OPERATE → CREATE VALUE → HOLD/EXIT
export default function ProcessFlow({ steps, numbered = false, label }: { steps: string[]; numbered?: boolean; label?: string }) {
  return (
    <div>
      {label ? <p className="mb-5 text-xs uppercase tracking-wide text-ochiga-white/40">{label}</p> : null}
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-4">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-3">
            <span className="flex items-center gap-2.5 rounded border border-ochiga-white/15 px-4 py-2.5 text-xs font-medium uppercase tracking-wide text-ochiga-white/80 md:text-sm">
              {numbered ? (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ochiga-red text-[10px] text-ochiga-white">
                  {index + 1}
                </span>
              ) : null}
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
    </div>
  );
}
