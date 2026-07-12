"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { SHOW_BLOG } from "@/lib/flags";

const links = [
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/blog", label: "Writing" },
  { href: "/connect", label: "Connect" },
].filter((l) => SHOW_BLOG || l.href !== "/blog");

const EMAIL = "mailto:salesravi1997@gmail.com";

export default function Nav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-blue-light">
      <nav className="relative max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-extrabold text-navy-950 hover:text-navy-800 transition-colors"
        >
          Ravishankar R
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="group relative py-1 text-[15px] font-medium text-navy-800 hover:text-navy-950 transition-colors"
                  >
                    {label}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-0.5 w-full bg-amber-brand origin-left transition-transform duration-300 ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={EMAIL}
            className="group font-display font-extrabold uppercase tracking-wide text-sm text-navy-950"
          >
            <span className="inline-flex items-center gap-1.5">
              Write to me
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </span>
            <span
              aria-hidden
              className="block h-0.5 bg-amber-brand origin-left scale-x-100 transition-transform duration-300"
            />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden p-2 text-navy-800 hover:text-navy-950"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Reading progress hairline */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-brand origin-left"
        aria-hidden
      />

      {/* Poster mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 h-dvh bg-navy-950 flex flex-col md:hidden">
          <div className="h-16 px-6 flex items-center justify-between border-b border-white/10">
            <span className="font-display text-xl font-extrabold text-white">
              Ravishankar R
            </span>
            <button
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white/80 hover:text-white"
              aria-label="Close menu"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-6 gap-2">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-5xl font-black text-white py-3 hover:text-amber-brand transition-colors"
            >
              Home
            </Link>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`font-display text-5xl font-black py-3 transition-colors ${
                  pathname === href
                    ? "text-amber-brand"
                    : "text-white hover:text-amber-brand"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="px-6 pb-10">
            <a
              href={EMAIL}
              className="inline-block font-display font-extrabold uppercase tracking-wide text-lg text-white"
            >
              <span className="inline-flex items-center gap-2">
                Write to me <span aria-hidden>→</span>
              </span>
              <span aria-hidden className="block h-0.5 mt-1 bg-amber-brand" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
