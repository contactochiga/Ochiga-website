// A restrained architectural progress indicator for in-design-development
// projects — not a loading bar. Renders the full stage sequence with the
// current stage highlighted; earlier stages read as passed, later stages
// as not yet reached.
export default function ProjectStatusStepper({
  stages,
  activeIndex,
  compact = false,
}: {
  stages: string[];
  activeIndex: number;
  compact?: boolean;
}) {
  return (
    <ol className="flex items-center" aria-label="Development status">
      {stages.map((stage, index) => {
        const isActive = index === activeIndex;
        const isPassed = index < activeIndex;
        return (
          <li key={stage} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-start gap-2">
              <span
                aria-hidden
                className={`block h-1.5 w-1.5 ${
                  isActive
                    ? "bg-ochiga-red"
                    : isPassed
                      ? "bg-ochiga-white/40"
                      : "border border-ochiga-white/25 bg-transparent"
                }`}
              />
              <span
                aria-current={isActive ? "step" : undefined}
                className={`whitespace-nowrap text-[10px] uppercase tracking-wide ${compact ? "hidden sm:inline" : ""} ${
                  isActive ? "text-ochiga-white" : isPassed ? "text-ochiga-white/50" : "text-ochiga-white/30"
                }`}
              >
                {stage}
              </span>
            </div>
            {index < stages.length - 1 ? (
              <span aria-hidden className={`mx-3 h-px flex-1 ${isPassed ? "bg-ochiga-white/25" : "bg-ochiga-white/10"}`} />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}
