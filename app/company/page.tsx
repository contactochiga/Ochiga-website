import Header from "../components/Header";

export default function CompanyPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Ochiga
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Ochiga is a smart infrastructure company building digital operating
            systems for estates, buildings, and connected communities.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <p className="text-gray-600">
            Founded with an infrastructure-first mindset, Ochiga designs,
            deploys, and operates smart systems that unify physical assets,
            connectivity, and cloud intelligence.
          </p>

          <p className="text-gray-600">
            Our mission is to make modern infrastructure easier to manage,
            transparent to operate, and scalable for the future.
          </p>
        </div>
      </section>
    </main>
  );
}
