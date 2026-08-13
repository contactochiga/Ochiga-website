"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { primaryNavigation, ctas } from "@/lib/company";

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
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-ochiga-white/10 bg-ochiga-black/70 backdrop-blur-xl">
        <nav
          aria-label="Primary navigation"
          className="mx-auto flex max-w-cinematic items-center justify-between px-5 py-5 md:px-8"
        >
          <Link href="/" aria-label="Ochiga home" className="flex items-center">
            <Image
              src="/brand/ochiga-logo-dark.png"
              alt="Ochiga"
              width={2048}
              height={768}
              priority
              className="h-9 w-auto md:h-11"
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {primaryNavigation
              .filter((item) => item.href !== "/")
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-ochiga-white/75 transition-colors duration-fast hover:text-ochiga-white"
                >
                  {item.label}
                </Link>
              ))}
            <Link
              href={ctas.primary.href}
              className="rounded bg-ochiga-red px-5 py-2.5 text-sm font-medium text-ochiga-white transition-colors duration-fast hover:bg-ochiga-red-bright"
            >
              {ctas.primary.label}
            </Link>
          </div>

          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="ochiga-site-menu"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className="h-0.5 w-6 rounded bg-ochiga-white/90" />
            <span className="h-0.5 w-6 rounded bg-ochiga-white/90" />
            <span className="h-0.5 w-6 rounded bg-ochiga-white/90" />
          </button>
        </nav>
      </header>

      {open ? (
        <button
          aria-label="Close menu overlay"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[60] bg-black/50"
        />
      ) : null}

      <aside
        id="ochiga-site-menu"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[70] flex h-screen w-[min(400px,90vw)] flex-col overflow-y-auto border-l border-ochiga-white/10 bg-ochiga-black px-7 py-8 transition-transform duration-base ease-editorial ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close menu"
          className="mb-8 self-end text-sm text-ochiga-white/60"
        >
          Close ×
        </button>

        <nav aria-label="Site menu" className="flex flex-col gap-8">
          {primaryNavigation.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-lg font-medium text-ochiga-white/90"
              >
                {item.label}
              </Link>
              {"children" in item && item.children ? (
                <div className="mt-3 flex flex-col gap-2.5 border-l border-ochiga-white/10 pl-4">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setOpen(false)}
                      className="text-sm text-ochiga-white/55 hover:text-ochiga-white/85"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </nav>

        <Link
          href={ctas.primary.href}
          onClick={() => setOpen(false)}
          className="mt-auto rounded bg-ochiga-red px-5 py-3 text-center text-sm font-medium text-ochiga-white"
        >
          {ctas.primary.label}
        </Link>

        <div className="mt-6 border-t border-ochiga-white/10 pt-6 text-xs text-ochiga-white/35">
          Development. Technology. Private Capital.
        </div>
      </aside>
    </>
  );
}
