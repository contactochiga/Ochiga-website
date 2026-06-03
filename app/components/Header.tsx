"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { primaryNavigation } from "@/lib/company";

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "rgba(5, 6, 10, 0.72)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <nav
          aria-label="Primary navigation"
          style={{
            maxWidth: 1320,
            margin: "0 auto",
            padding: "26px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center" }} aria-label="Ochiga home">
            <img
              src="/brand/ochiga-logo.PNG"
              alt="Ochiga"
              style={{ height: 56, width: "auto", display: "block" }}
            />
          </Link>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="ochiga-site-menu"
            style={{
              width: 44,
              height: 44,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 7,
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

      {open && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 60,
            border: 0,
            padding: 0,
            cursor: "default",
          }}
        />
      )}

      <aside
        id="ochiga-site-menu"
        aria-hidden={!open}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "min(390px, 88vw)",
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
          Close x
        </button>

        <nav aria-label="Site menu" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <NavItem href="/" label="Home" close={() => setOpen(false)} />
          <NavItem href="/oyi" label="Oyi OS" close={() => setOpen(false)} />
          {primaryNavigation.map((item) => (
            <NavItem key={item.href} href={item.href} label={item.label} close={() => setOpen(false)} />
          ))}
        </nav>

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

const lineStyle = {
  height: 2,
  width: 24,
  background: "rgba(255,255,255,0.9)",
  borderRadius: 2,
};

function NavItem({ href, label, close }: { href: string; label: string; close: () => void }) {
  return (
    <Link
      href={href}
      onClick={close}
      style={{
        fontSize: 18,
        fontWeight: 500,
        color: "rgba(255,255,255,0.85)",
      }}
    >
      {label}
    </Link>
  );
}
