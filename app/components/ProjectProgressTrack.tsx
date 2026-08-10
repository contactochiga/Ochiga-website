// Compact development-status track for portfolio cards — labels above,
// small circular markers below with a ring on the active stage. Kept
// separate from ProjectStatusStepper (used inside the project-tour
// "Development Status" chapter) so that page's appearance is untouched
// by this card-level visual refinement.
export default function ProjectProgressTrack({ stages, activeIndex }: { stages: string[]; activeIndex: number }) {
  return (
    <div aria-label={`Development status: ${stages[activeIndex]}`}>
      <ol className="flex gap-1 text-center text-[9px] uppercase leading-tight tracking-wide">
        {stages.map((stage, index) => (
          <li
            key={stage}
            aria-current={index === activeIndex ? "step" : undefined}
            className={`flex-1 ${index === activeIndex ? "text-ochiga-red" : "text-ochiga-white/40"}`}
          >
            {stage}
          </li>
        ))}
      </ol>
      <ol aria-hidden className="mt-2.5 flex items-center">
        {stages.map((stage, index) => {
          const isActive = index === activeIndex;
          const isPassed = index < activeIndex;
          return (
            <li key={stage} className="flex flex-1 items-center last:flex-none">
              <span
                className={`relative flex h-2.5 w-2.5 flex-shrink-0 items-center justify-center rounded-full ${
                  isActive ? "bg-ochiga-red" : isPassed ? "bg-ochiga-white/40" : "border border-ochiga-white/25"
                }`}
              >
                {isActive ? <span className="absolute h-4 w-4 rounded-full border border-ochiga-red/50" /> : null}
              </span>
              {index < stages.length - 1 ? (
                <span className={`mx-2 h-px flex-1 ${isPassed ? "bg-ochiga-white/25" : "bg-ochiga-white/10"}`} />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
