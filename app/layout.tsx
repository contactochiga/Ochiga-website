import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ochiga – Smart Estates & Building Technology",
  description: "Building the future of smart estates with automation, FTTH, and Oyi Cloud OS.",
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
