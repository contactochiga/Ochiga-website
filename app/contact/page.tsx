"use client";

import Header from "../components/Header";
import { useState } from "react";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="pt-16 bg-white text-[#1A1A1A]">
      <Header />

      <section className="py-24 px-6 bg-[#140A0A] text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Contact Ochiga
          </h1>
          <p className="text-gray-300">
            Let’s discuss deployments, partnerships, or enterprise use cases.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-xl mx-auto">
          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-6"
            >
              <input
                required
                placeholder="Full Name"
                className="w-full border p-4 rounded-lg"
              />
              <input
                required
                placeholder="Company / Organization"
                className="w-full border p-4 rounded-lg"
              />
              <input
                required
                type="email"
                placeholder="Work Email"
                className="w-full border p-4 rounded-lg"
              />
              <textarea
                required
                placeholder="How can we help?"
                className="w-full border p-4 rounded-lg h-32"
              />
              <button className="w-full bg-[#140A0A] text-white py-4 rounded-lg font-semibold">
                Submit Enquiry
              </button>
            </form>
          ) : (
            <p className="text-center text-lg font-semibold">
              Thank you. Our team will contact you shortly.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
