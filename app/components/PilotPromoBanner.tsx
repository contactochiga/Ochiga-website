import Link from "next/link";

// An isolated, easily-removable promotional treatment — NOT part of
// the core Technology page architecture. Deleting the single
// `<PilotPromoBanner />` line (and this file) fully removes the offer
// with no other change required elsewhere on the page.
export default function PilotPromoBanner() {
  return (
    <div className="border-y border-oyi-blue/25 bg-oyi-blue/[0.06] px-6 py-4 md:px-10">
      <div className="mx-auto flex max-w-wide flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ochiga-white/80">
          Pilot Oyi in your building — first month on us.
        </p>
        <Link href="#deployment" className="text-sm font-medium text-oyi-blue-bright hover:text-oyi-blue">
          Request Deployment →
        </Link>
      </div>
    </div>
  );
}
