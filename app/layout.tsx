import "./globals.css";
import Header from "@/app/components/Header";

export const metadata = {
  title: "Ochiga — Infrastructure Operating System",
  description:
    "The operating system beneath physical infrastructure, estates, and smart cities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
