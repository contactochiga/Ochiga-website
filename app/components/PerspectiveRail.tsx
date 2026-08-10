// A horizontal story rail of Insight cards — reuses InsightCard (the
// same component the homepage's "Recent Ochiga perspectives" section
// uses) rather than a parallel implementation. Plain native horizontal
// scrolling, no autoplay: as more Sanity articles are added the rail
// simply becomes more scrollable, never forcing the page layout to
// change.
import InsightCard from "@/app/components/InsightCard";
import type { Insight } from "@/lib/content";

export default function PerspectiveRail({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return null;

  return (
    <div className="no-scrollbar flex gap-6 overflow-x-auto pb-2">
      {insights.map((insight) => (
        <div key={insight.slug} className="w-[300px] flex-shrink-0 md:w-[340px]">
          <InsightCard insight={insight} />
        </div>
      ))}
    </div>
  );
}
