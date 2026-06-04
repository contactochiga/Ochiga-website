import Link from "next/link";
import { companyInfo, footerNavigation } from "@/lib/company";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "64px 20px 48px",
          display: "flex",
          flexDirection: "column",
          gap: 48,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 40,
          }}
        >
          <div style={{ maxWidth: 420 }}>
            <Link href="/" aria-label="Ochiga home">
              <img
                src="/brand/ochiga-logo.PNG"
                alt="Ochiga"
                style={{
                  height: 44,
                  width: "auto",
                  marginBottom: 18,
                }}
              />
            </Link>

            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Ochiga creates digital infrastructure for intelligent buildings,
              estates, command centers, and future smart communities.
            </p>

            <div style={{ marginTop: 22, fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.48)" }}>
              <a href={`mailto:${companyInfo.contactEmail}`}>{companyInfo.contactEmail}</a>
              <br />
              <span>{companyInfo.location}</span>
            </div>
          </div>

          <nav
            aria-label="Footer navigation"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "28px 42px",
              fontSize: 14,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <FooterGroup title="System" links={footerNavigation.system} />
            <FooterGroup title="Engage" links={footerNavigation.engage} />
            <FooterGroup title="Trust" links={footerNavigation.trust} />
          </nav>
        </div>

        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.12), rgba(255,255,255,0))",
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 12.5,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span>© {new Date().getFullYear()} {companyInfo.legalName}</span>
          <span>Technology Meets Architecture</span>
        </div>
      </div>
    </footer>
  );
}

function FooterGroup({ title, links }: { title: string; links: Array<{ href: string; label: string }> }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <span style={eyebrow}>{title}</span>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

const eyebrow = {
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.35)",
};
