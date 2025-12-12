import Header from "../components/Header";

export default function PlatformPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO */}
      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Oyi — The Smart Infrastructure Operating System
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Oyi is a cloud-based operating system designed to manage estates,
            buildings, and smart infrastructure as living digital systems.
          </p>
        </div>
      </section>

      {/* PLATFORM OVERVIEW */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-16">

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Infrastructure-First Architecture
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Oyi is not a dashboard — it is a role-based operating system that
              mirrors real-world infrastructure digitally, enabling control,
              automation, and intelligence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-2">
                Estate & Community Management
              </h3>
              <p className="text-gray-600">
                Residents, units, access control, notifications, and community
                operations — unified in one system.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Smart Home & Device Layer
              </h3>
              <p className="text-gray-600">
                Homes, rooms, devices, automations, and energy tracking managed
                securely within the estate ecosystem.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Billing, Wallets & Transactions
              </h3>
              <p className="text-gray-600">
                Service charges, utilities, vendor payments, and audit-ready
                financial records.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Maintenance & Asset Intelligence
              </h3>
              <p className="text-gray-600">
                Asset tracking, fault reporting, work orders, and lifecycle
                history.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-4">
              Digital Twin & AI Layer
            </h2>
            <p className="text-gray-600 max-w-3xl">
              Oyi integrates digital twin modeling and AI services to provide
              predictive insights, automation, and smarter decision-making.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
