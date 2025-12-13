import Header from "../components/Header";

export default function InvestorsPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Investors & Strategic Partners
          </h1>
          <p className="text-gray-300 max-w-3xl">
            Ochiga is building core infrastructure software for smart estates and
            connected environments across emerging and global markets.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          <p className="text-gray-600">
            Unlike typical startups, Ochiga built its platform before seeking
            scale capital — focusing on architecture, reliability, and real-world
            deployment.
          </p>

          <ul className="list-disc list-inside text-gray-700">
            <li>Digital-twin native infrastructure OS</li>
            <li>Recurring revenue through estates & services</li>
            <li>Strong enterprise & government applicability</li>
            <li>Africa-born, globally relevant</li>
          </ul>
        </div>
      </section>
    </main>
  );
}
