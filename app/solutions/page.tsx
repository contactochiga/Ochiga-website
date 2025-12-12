import Header from "../components/Header";

export default function SolutionsPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO */}
      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Infrastructure Solutions
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Ochiga delivers tailored smart infrastructure solutions across
            residential, commercial, institutional, and public environments.
          </p>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Residential Estates
            </h3>
            <p className="text-gray-600">
              Smart estate operations, billing, access control, automation, and
              resident engagement — managed through a unified OS.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Commercial Buildings
            </h3>
            <p className="text-gray-600">
              Secure access, asset management, energy intelligence, and facility
              workflows for offices and mixed-use developments.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Mixed-Use Developments
            </h3>
            <p className="text-gray-600">
              Integrated management of residential, commercial, retail, and
              shared infrastructure.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-3">
              Governments & Institutions
            </h3>
            <p className="text-gray-600">
              Scalable digital infrastructure for campuses, housing schemes,
              and smart city initiatives.
            </p>
          </div>

        </div>
      </section>
    </main>
  );
}
