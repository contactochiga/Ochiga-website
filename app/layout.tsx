import "./globals.css";

export const metadata = {
  title: "Ochiga | Smart Infrastructure Operating System",
  description:
    "Ochiga designs, deploys, and operates digital-twin powered smart infrastructure for estates, buildings, and connected communities.",
  keywords: [
    "smart estate",
    "smart infrastructure",
    "digital twin",
    "estate management software",
    "smart home platform",
    "FTTH infrastructure",
    "property technology",
  ],
  openGraph: {
    title: "Ochiga | Smart Infrastructure OS",
    description:
      "The operating system for smart estates and infrastructure.",
    url: "https://ochiga.com.ng",
    siteName: "Ochiga",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
