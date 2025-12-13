import Header from "../components/Header";

export default function BlogPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      {/* HERO */}
      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Insights & Publications
          </h1>
          <p className="text-gray-300 max-w-3xl">
            Thought leadership on smart infrastructure, digital twins, estate
            operations, and the future of connected environments.
          </p>
        </div>
      </section>

      {/* POSTS */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <article
              key={i}
              className="border rounded-2xl p-6 hover:-translate-y-1 transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                Designing Smart Estates for Long-Term Operations
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Why infrastructure-first thinking matters more than devices.
              </p>
              <span className="text-[#7A0026] font-semibold">
                Read Article →
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
