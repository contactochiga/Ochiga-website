"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===============================
          FIXED HEADER
      =============================== */}
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
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src="/brand/ochiga-logo.svg"
              alt="Ochiga"
              style={{ height: 28 }}
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            style={{
              width: 36,
              height: 36,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 6,
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span style={lineStyle} />
            <span style={lineStyle} />
            <span style={lineStyle} />
          </button>
        </nav>
      </header>

      {/* ===============================
          OVERLAY
      =============================== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 60,
          }}
        />
      )}

      {/* ===============================
          SLIDE MENU
      =============================== */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(360px, 85vw)",
          background: "#000",
          zIndex: 70,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s ease",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          padding: "32px 28px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Close */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          style={{
            alignSelf: "flex-end",
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.7)",
            fontSize: 14,
            cursor: "pointer",
            marginBottom: 32,
          }}
        >
          Close ✕
        </button>

        {/* Navigation */}
        <nav style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <NavItem href="/" label="Home" />
          <NavItem href="/oyi" label="Oyi OS" />
          <NavItem href="/technology" label="Technology" />
          <NavItem href="/papers" label="Papers" />
          <NavItem href="/deployments" label="Request Deployment" />
        </nav>

        {/* Footer */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: 12,
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Infrastructure Operating System
        </div>
      </aside>
    </>
  );
}

/* ===============================
   SMALL HELPERS
================================ */

const lineStyle = {
  height: 2,
  width: 22,
  background: "rgba(255,255,255,0.85)",
  borderRadius: 2,
};

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        fontSize: 18,
        fontWeight: 500,
        color: "rgba(255,255,255,0.85)",
        textDecoration: "none",
      }}
    >
      {label}
    </Link>
  );
}
