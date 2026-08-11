// A bespoke, restrained systems diagram for "One Ecosystem" — the
// entry points a partnership can begin from, converging on a single
// centre. Deliberately not a sequence/timeline (these are parallel
// entry points, not ordered steps) and not a photo or stock diagram —
// same static line-diagram language as TechnologyConnectDiagram, in
// Ochiga red rather than the Oyi-specific blue accent.
const ENTRY_POINTS = [
  { key: "land", label: "Land" },
  { key: "capital", label: "Capital" },
  { key: "technology", label: "Technology" },
  { key: "expertise", label: "Expertise" },
  { key: "market-access", label: "Market Access" },
  { key: "opportunity", label: "Opportunity" },
  { key: "strategic-capability", label: "Strategic Capability" },
] as const;

const CENTER = 320;
const RADIUS = 220;
const NODE_RADIUS = 58;
const SATELLITE_RADIUS = 40;

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function PartnershipEcosystemDiagram() {
  return (
    <div className="w-full overflow-hidden rounded border border-ochiga-white/10 bg-ochiga-charcoal">
      <svg viewBox="0 0 640 640" className="h-full w-full" role="img" aria-label="Diagram showing land, capital, technology, expertise, market access, opportunity and strategic capability converging on Ochiga">
        {ENTRY_POINTS.map((point, index) => {
          const { x, y } = nodePosition(index, ENTRY_POINTS.length);
          return (
            <line
              key={`line-${point.key}`}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-ochiga-red/35"
              strokeWidth="1.5"
            />
          );
        })}

        <circle cx={CENTER} cy={CENTER} r={NODE_RADIUS + 6} fill="none" stroke="currentColor" className="text-ochiga-red/40" strokeWidth="1.5" />
        <circle cx={CENTER} cy={CENTER} r={NODE_RADIUS} fill="none" stroke="currentColor" className="text-ochiga-white/70" strokeWidth="1.5" />
        <text x={CENTER} y={CENTER - 4} textAnchor="middle" className="fill-ochiga-white text-[15px] font-medium">
          Ochiga
        </text>
        <text x={CENTER} y={CENTER + 16} textAnchor="middle" className="fill-ochiga-white/50 text-[10px] uppercase tracking-eyebrow">
          Viable Opportunity
        </text>

        {ENTRY_POINTS.map((point, index) => {
          const { x, y } = nodePosition(index, ENTRY_POINTS.length);
          const words = point.label.split(" ");
          return (
            <g key={point.key}>
              <circle cx={x} cy={y} r={SATELLITE_RADIUS} fill="none" stroke="currentColor" className="text-ochiga-white/40" strokeWidth="1.5" />
              <text x={x} y={y + (words.length > 1 ? -2 : 4)} textAnchor="middle" className="fill-ochiga-white/85 text-[10px]">
                {words.length > 1 ? words.map((word, wordIndex) => (
                  <tspan key={wordIndex} x={x} dy={wordIndex === 0 ? 0 : 12}>
                    {word}
                  </tspan>
                )) : point.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
