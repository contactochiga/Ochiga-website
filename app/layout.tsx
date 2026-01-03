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
        {/* Global Navigation */}
        <Header />

        {/* Page Content */}
        <main className="relative overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
