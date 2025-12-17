import "./styles/globals.css";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export const metadata = {
  title: "Ochiga — Infrastructure Operating System",
  description:
    "The operating system beneath physical infrastructure, estates, and smart cities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
