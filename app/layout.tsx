import Script from "next/script";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Ochiga — Infrastructure Operating System",
  description:
    "Operate digital infrastructure across estates and buildings. Access, assets, utilities, payments, and live digital twins.",
};

function resolveWidgetConfig() {
  const widgetUrl = process.env.NEXT_PUBLIC_OCHIGA_WIDGET_URL || "";
  if (!widgetUrl) {
    return null;
  }

  let apiBase = process.env.NEXT_PUBLIC_OCHIGA_WIDGET_API_BASE || "";
  if (!apiBase) {
    try {
      apiBase = new URL(widgetUrl).origin;
    } catch {
      apiBase = "";
    }
  }

  return apiBase ? { widgetUrl, apiBase } : null;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const widget = resolveWidgetConfig();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white antialiased">
        <Header />
        <main className="relative overflow-x-hidden">
          {children}
        </main>
        <Footer />
        {widget ? (
          <Script
            id="oma-widget"
            src={widget.widgetUrl}
            data-oma-widget="true"
            data-api-base={widget.apiBase}
            data-title="Talk to Oma"
            data-subtitle="Ochiga Marketing Agent for infrastructure, estates, and connected communities"
            data-greeting="Hi, I'm Oma. Tell me about your estate, building, or project, and I'll guide you."
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
