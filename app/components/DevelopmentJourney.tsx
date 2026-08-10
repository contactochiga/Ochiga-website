// The connected development-journey diagram for "What Ochiga Brings
// Together" — circular numbered nodes on a single horizontal line.
// Distinct from ProcessFlow (which renders the pill-and-arrow style
// used elsewhere, e.g. the homepage) so that pattern stays untouched.
export default function DevelopmentJourney({ stages }: { stages: string[] }) {
  return (
    <div className="overflow-x-auto">
      <ol aria-label="Ochiga development process" className="flex min-w-max items-start md:min-w-0">
        {stages.map((stage, index) => {
          const isFirst = index === 0;
          return (
            <li key={stage} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-4 px-2 md:px-1">
                <span
                  className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border font-display text-sm md:h-16 md:w-16 ${
                    isFirst ? "border-ochiga-red text-ochiga-red" : "border-ochiga-white/25 text-ochiga-white"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="whitespace-nowrap text-sm text-ochiga-white/70">{stage}</span>
              </div>
              {index < stages.length - 1 ? (
                <span aria-hidden className="mx-2 h-px flex-1 bg-ochiga-white/15 md:mx-4" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
