// A bespoke, restrained systems diagram for "What Oyi Connects" — a
// building at the centre with the operational domains it coordinates
// arranged around it. Deliberately not a photo or a fabricated
// dashboard: a static line diagram in the site's own palette, so it
// reads as an intentional systems illustration rather than stock
// imagery or an invented product screenshot.
const DOMAINS = [
  { key: "residents", label: "Residents" },
  { key: "building-teams", label: "Building Teams" },
  { key: "utilities", label: "Utilities" },
  { key: "access", label: "Access & Security" },
  { key: "devices", label: "Devices" },
  { key: "services", label: "Services" },
  { key: "intelligence", label: "Intelligence" },
] as const;

const CENTER = 320;
const RADIUS = 210;
const NODE_RADIUS = 54;

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: CENTER + RADIUS * Math.cos(angle),
    y: CENTER + RADIUS * Math.sin(angle),
  };
}

export default function TechnologyConnectDiagram() {
  return (
    <div className="w-full overflow-hidden rounded border border-ochiga-white/10 bg-ochiga-charcoal">
      <svg viewBox="0 0 640 640" className="h-full w-full" role="img" aria-label="Diagram showing a building at the centre connected to residents, building teams, utilities, access and security, devices, services, and intelligence">
        {DOMAINS.map((domain, index) => {
          const { x, y } = nodePosition(index, DOMAINS.length);
          return (
            <line
              key={`line-${domain.key}`}
              x1={CENTER}
              y1={CENTER}
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-oyi-blue/35"
              strokeWidth="1.5"
            />
          );
        })}

        <circle cx={CENTER} cy={CENTER} r={NODE_RADIUS + 6} fill="none" stroke="currentColor" className="text-ochiga-red/40" strokeWidth="1.5" />
        <circle cx={CENTER} cy={CENTER} r={NODE_RADIUS} fill="none" stroke="currentColor" className="text-ochiga-white/70" strokeWidth="1.5" />
        <text x={CENTER} y={CENTER - 4} textAnchor="middle" className="fill-ochiga-white text-[15px] font-medium">
          Building
        </text>
        <text x={CENTER} y={CENTER + 16} textAnchor="middle" className="fill-ochiga-white/50 text-[10px] uppercase tracking-eyebrow">
          Oyi
        </text>

        {DOMAINS.map((domain, index) => {
          const { x, y } = nodePosition(index, DOMAINS.length);
          return (
            <g key={domain.key}>
              <circle cx={x} cy={y} r={38} fill="none" stroke="currentColor" className="text-oyi-blue/50" strokeWidth="1.5" />
              <text x={x} y={y + 4} textAnchor="middle" className="fill-ochiga-white/85 text-[11px]">
                {domain.label.length > 14 ? domain.label.split(" ").map((word, wordIndex) => (
                  <tspan key={wordIndex} x={x} dy={wordIndex === 0 ? -6 : 13}>
                    {word}
                  </tspan>
                )) : domain.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
