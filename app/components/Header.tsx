import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        background: "rgba(5, 6, 10, 0.6)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img
            src="/brand/ochiga-logo.svg"
            alt="Ochiga"
            style={{
              height: 28,
              width: "auto",
              display: "block",
            }}
          />
        </Link>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            gap: 28,
            fontSize: 14,
            color: "rgba(255,255,255,0.85)",
          }}
        >
          <Link href="/">Home</Link>
          <Link href="/technology">Technology</Link>
          <Link href="/papers">Papers</Link>
        </div>
      </nav>
    </header>
  );
}
