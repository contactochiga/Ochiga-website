import Header from "../components/Header";

export default function PartnersPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO */}
      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Partner with Ochiga
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Join Ochiga’s global ecosystem of developers, integrators, hardware
            manufacturers, and infrastructure operators.
          </p>
        </div>
      </section>

      {/* PARTNER TYPES */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">

          <div className="border p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-3">
              System Integrators
            </h3>
            <p className="text-gray-600">
              Deploy, configure, and operate Ochiga infrastructure solutions
              across estates and buildings.
            </p>
          </div>

          <div className="border p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-3">
              Hardware & Device Partners
            </h3>
            <p className="text-gray-600">
              Integrate certified smart devices, sensors, access systems, and
              networking equipment.
            </p>
          </div>

          <div className="border p-8 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-3">
              Developers & Solution Partners
            </h3>
            <p className="text-gray-600">
              Build solutions, extensions, and services on top of the Oyi
              platform.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#f8f8f8] text-center">
        <h2 className="text-3xl font-bold mb-6">
          Become an Ochiga Partner
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Access enterprise clients, certified training, platform support, and
          long-term revenue opportunities.
        </p>

        <a
          href="/contact"
          className="inline-block px-8 py-4 bg-[#140A0A] text-white rounded-lg font-semibold hover:opacity-90 transition"
        >
          Apply to Partner
        </a>
      </section>
    </main>
  );
}
