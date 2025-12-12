import Header from "../components/Header";

export default function ContactPage() {
  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Contact Ochiga
          </h1>
          <p className="text-lg text-gray-300">
            Speak with our team about deployments, partnerships, or training.
          </p>
        </div>
      </section>

      <section className="py-24 px-6 text-center">
        <p className="text-gray-600 max-w-xl mx-auto">
          For enquiries, partnerships, or enterprise discussions, please reach
          out via email:
        </p>

        <p className="mt-6 text-xl font-semibold">
          hello@ochiga.com
        </p>
      </section>
    </main>
  );
}
