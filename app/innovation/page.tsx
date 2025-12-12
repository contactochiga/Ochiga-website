import Header from "../components/Header";

export default function InnovationPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Innovation & Research
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Ochiga invests in digital twins, AI, and infrastructure intelligence
            to shape the future of smart environments.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-10">
          <p className="text-gray-600">
            Our innovation focuses on real-world applicability — improving
            operational efficiency, sustainability, and decision-making across
            infrastructure systems.
          </p>

          <ul className="list-disc list-inside text-gray-700">
            <li>Digital twin modeling for estates and buildings</li>
            <li>AI-assisted infrastructure operations</li>
            <li>Predictive maintenance & analytics</li>
            <li>Standards for smart estate operations</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
