import Link from "next/link";
import { SHOW_BLOG } from "@/lib/flags";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div>
            <p className="font-display text-xl font-extrabold text-white mb-2">
              Ravishankar R
            </p>
            <p className="text-sm text-white/50 max-w-xs">
              Marketing & growth leader. Writing about sales, marketing, and
              building things that last.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-white/80 uppercase tracking-widest mb-1">
              Explore
            </p>
            {[
              { href: "/about", label: "About" },
              { href: "/experience", label: "Experience" },
              { href: "/blog", label: "Writing" },
              { href: "/connect", label: "Connect" },
            ]
              .filter((l) => SHOW_BLOG || l.href !== "/blog")
              .map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm text-white/60 hover:text-amber-brand transition-colors"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-sm text-white/40">
          © {new Date().getFullYear()} Ravishankar R. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
