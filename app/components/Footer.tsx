import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 120,
        background: "#000",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 20px 44px",
          display: "flex",
          flexDirection: "column",
          gap: 40,
        }}
      >
        {/* ===============================
            TOP ROW
        =============================== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 36,
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 380 }}>
            <img
              src="/brand/ochiga-logo.svg"
              alt="Ochiga"
              style={{ height: 26, marginBottom: 16 }}
            />
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Ochiga is an infrastructure operating system — governing access,
              assets, utilities, and digital twins across estates, buildings,
              and urban systems.
            </p>
          </div>

          {/* Footer Navigation */}
          <nav
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(160px, auto))",
              gap: "14px 40px",
              fontSize: 13,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            {/* SYSTEM */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={eyebrow}>System</span>
              <Link href="/architecture">Architecture</Link>
              <Link href="/infrastructure">Infrastructure</Link>
              <Link href="/command-center">Command Center</Link>
              <Link href="/governance">Governance</Link>
            </div>

            {/* ENGAGE */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <span style={eyebrow}>Engage</span>
              <Link href="/engage">Engage</Link>
              <Link href="/deployments">Request Deployment</Link>
              <Link href="/papers">Papers</Link>
            </div>
          </nav>
        </div>

        {/* ===============================
            DIVIDER
        =============================== */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.12), rgba(255,255,255,0))",
          }}
        />

        {/* ===============================
            BOTTOM ROW
        =============================== */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          <span>© {new Date().getFullYear()} Ochiga Systems</span>
          <span>Infrastructure Operating System</span>
        </div>
      </div>
    </footer>
  );
}

/* ===============================
   SMALL HELPERS
================================ */

const eyebrow = {
  fontSize: 11,
  letterSpacing: "0.08em",
  textTransform: "uppercase" as const,
  color: "rgba(255,255,255,0.35)",
};
