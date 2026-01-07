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
        className="app-header"
      >
        <nav className="header-nav">
          {/* Logo */}
          <Link href="/" className="header-logo">
            <img
              src="/brand/ochiga-logo.svg"
              alt="Ochiga"
              className="ochiga-logo"
            />
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="hamburger"
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </nav>
      </header>

      {/* ===============================
          OVERLAY
      =============================== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="menu-overlay"
        />
      )}

      {/* ===============================
          SLIDE MENU
      =============================== */}
      <aside
        className={`slide-menu ${open ? "open" : ""}`}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="menu-close"
        >
          Close ✕
        </button>

        <nav className="menu-nav">
          <NavItem href="/" label="Home" close={() => setOpen(false)} />
          <NavItem href="/oyi" label="Oyi OS" close={() => setOpen(false)} />
          <NavItem href="/technology" label="Technology" close={() => setOpen(false)} />
          <NavItem href="/papers" label="Papers" close={() => setOpen(false)} />
          <NavItem href="/twin" label="Live Digital Twin" close={() => setOpen(false)} />
          <NavItem href="/deployments" label="Request Deployment" close={() => setOpen(false)} />
        </nav>

        <div className="menu-footer">
          Infrastructure Operating System
        </div>
      </aside>
    </>
  );
}

/* ===============================
   HELPERS
================================ */

function NavItem({
  href,
  label,
  close,
}: {
  href: string;
  label: string;
  close: () => void;
}) {
  return (
    <Link href={href} onClick={close} className="menu-link">
      {label}
    </Link>
  );
}
