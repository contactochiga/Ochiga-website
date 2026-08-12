import type { Metadata } from "next";
import "./globals.css";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import JsonLd from "@/app/components/JsonLd";
import { OyiWidget } from "@/app/components/oyi/OyiWidget";
import {
  buildMetadata,
  organizationJsonLd,
  seoConfig,
  seoPages,
  websiteJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = {
  ...buildMetadata(seoPages.home),
  metadataBase: new URL(seoConfig.baseUrl),
  applicationName: seoConfig.siteName,
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-ochiga-black text-ochiga-white antialiased">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <Header />
        <main className="relative overflow-x-hidden">
          {children}
        </main>
        <Footer />
        <OyiWidget />
      </body>
    </html>
  );
}
