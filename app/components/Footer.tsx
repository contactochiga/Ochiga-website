import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 120,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "#000",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 20px 40px",
          display: "flex",
          flexDirection: "column",
          gap: 28,
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
            gap: 24,
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: 360 }}>
            <img
              src="/brand/ochiga-logo.svg"
              alt="Ochiga"
              style={{ height: 26, marginBottom: 14 }}
            />
            <p
              style={{
                fontSize: 13,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.5)",
              }}
            >
              Ochiga designs and operates the digital backbone for real-world
              infrastructure — estates, buildings, and urban systems.
            </p>
          </div>

          {/* Navigation */}
          <nav
            style={{
              display: "flex",
              gap: 28,
              fontSize: 13,
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <Link href="/oyi">Oyi OS</Link>
            <Link href="/technology">Technology</Link>
            <Link href="/papers">Papers</Link>
            <Link href="/deployments">Deploy</Link>
          </nav>
        </div>

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
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 20,
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
