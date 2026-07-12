import Link from "next/link";

/** Text-only CTA: bold uppercase, arrow that nudges right, amber underline
 * that slides in on hover. No fills, no boxes — this is the only button
 * treatment on the site. */
export default function CtaLink({
  href,
  children,
  dark = false,
  external = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  dark?: boolean;
  external?: boolean;
  className?: string;
}) {
  const color = dark
    ? "text-white hover:text-white"
    : "text-navy-950 hover:text-navy-950";
  const inner = (
    <>
      <span className="inline-flex items-center gap-2">
        {children}
        <span
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-1.5"
        >
          →
        </span>
      </span>
      <span
        aria-hidden
        className="block h-0.5 mt-1.5 bg-amber-brand origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"
      />
    </>
  );
  const classes = `group inline-block font-display font-extrabold uppercase tracking-wide text-[15px] ${color} ${className}`;

  if (external || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
