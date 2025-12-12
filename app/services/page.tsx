import Header from "../components/Header";

export default function ServicesPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO */}
      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Smart Infrastructure Services
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Ochiga delivers end-to-end smart infrastructure services — from
            early-stage planning to deployment, long-term operations, and
            capacity building.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-20">

          {/* PRE-CONSTRUCTION */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Pre-Construction & Infrastructure Design
            </h2>
            <p className="text-gray-600 max-w-3xl">
              We work with developers, estates, and institutions at the planning
              stage to design future-ready smart infrastructure systems.
            </p>

            <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
              <li>• Smart estate & building architecture</li>
              <li>• Digital twin planning & modeling</li>
              <li>• Network & FTTH architecture</li>
              <li>• Device & automation specification</li>
              <li>• Infrastructure cost optimisation</li>
            </ul>
          </div>

          {/* DEPLOYMENT */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Deployment & Smart Infrastructure Installation
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Ochiga deploys and commissions smart infrastructure directly on-site
              — ensuring seamless integration between physical systems and
              cloud intelligence.
            </p>

            <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
              <li>• Fiber-to-the-Home (FTTH)</li>
              <li>• Smart estate & building systems</li>
              <li>• IoT devices & access control</li>
              <li>• Estate OS onboarding</li>
              <li>• System testing & commissioning</li>
            </ul>
          </div>

          {/* AFTERCARE */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Aftercare, Managed Services & Operations
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Beyond deployment, Ochiga provides continuous operational support
              through Oyi Cloud OS — ensuring infrastructure reliability and
              long-term performance.
            </p>

            <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
              <li>• Cloud OS operations & monitoring</li>
              <li>• Billing, access & workflow automation</li>
              <li>• Maintenance & asset management</li>
              <li>• SLA-based technical support</li>
              <li>• Performance analytics & optimisation</li>
            </ul>
          </div>

          {/* TRAINING */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Training & Certification
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Ochiga trains and certifies stakeholders to operate and manage smart
              infrastructure professionally and sustainably.
            </p>

            <ul className="mt-6 grid md:grid-cols-2 gap-4 text-gray-700">
              <li>• Estate & facility manager training</li>
              <li>• Technician & integrator certification</li>
              <li>• Developer & partner onboarding</li>
              <li>• Operational standards & best practices</li>
            </ul>
          </div>

        </div>
      </section>
    </main>
  );
}
