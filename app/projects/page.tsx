import Header from "../components/Header";

export default function ProjectsPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Projects & Deployments
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl">
            Ochiga deployments demonstrate real-world smart infrastructure —
            designed for reliability, scale, and long-term operations.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <p className="text-gray-600 max-w-2xl mx-auto">
          Case studies, pilot programs, and live deployments will be published
          here as projects mature and expand.
        </p>
      </section>
    </main>
  );
}
