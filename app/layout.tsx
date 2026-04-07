import Script from "next/script";
import "./globals.css";
import Header from "@/app/components/Header";

export const metadata = {
  title: "Ochiga — Infrastructure Operating System",
  description:
    "Operate digital infrastructure across estates and buildings. Access, assets, utilities, payments, and live digital twins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        <Header />
        <main className="relative overflow-x-hidden">
          {children}
        </main>
        <Script
          id="oma-widget"
          src="https://ochiga-lead-agents.onrender.com/widget.js"
          data-oma-widget="true"
          data-api-base="https://ochiga-lead-agents.onrender.com"
          data-title="Talk to Oma"
          data-subtitle="Ochiga Marketing Agent for infrastructure, estates, and connected communities"
          data-greeting="Hi, I'm Oma. Tell me about your estate, building, or project, and I'll guide you."
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
