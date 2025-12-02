export default function Home() {
  return (
    <main className="bg-gray-50 min-h-screen text-gray-800">
      {/* HERO */}
      <section className="px-6 py-20 max-w-6xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to <span className="text-blue-600">OCHIGA</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Smart estate management, smart home automation, IoT, visitor management,
          and innovative digital property solutions — all in one platform powered
          by OCHIGA Technologies.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#about"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Learn More
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-gray-400 rounded-md hover:bg-gray-200"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section id="about" className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">What We Do</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              title="Smart Home Automation"
              text="Control lighting, gates, energy systems, and security with our IoT-powered solutions."
            />
            <Feature
              title="Estate Management"
              text="Visitor tracking, billing automation, resident database, and digital community tools."
            />
            <Feature
              title="Access Control"
              text="QR codes, biometrics, and intelligent gate management for secure estate access."
            />
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-8">
            Have a question or want to partner with OCHIGA? We’d love to hear from you.
          </p>

          <a
            href="mailto:info@ochiga.com.ng"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
          >
            Email Us
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} OCHIGA Technologies. All rights reserved.
      </footer>
    </main>
  );
}

function Feature({ title, text }) {
  return (
    <div className="p-6 border rounded-lg shadow-sm bg-gray-50">
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{text}</p>
    </div>
  );
}
