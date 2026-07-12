import { Reveal } from "@/components/motion";

export type SpecRow = {
  label?: string;
  title: string;
  desc: string;
};

/** Editorial list: no containers, no rules. Each entry is marked by a short
 * amber tick beside the title; whitespace does the structural work. */
export default function SpecSheet({
  rows,
  columns = 2,
}: {
  rows: SpecRow[];
  columns?: 1 | 2;
}) {
  return (
    <div
      className={`grid gap-y-14 gap-x-16 ${
        columns === 2 ? "md:grid-cols-2" : ""
      }`}
    >
      {rows.map((row, i) => (
        <Reveal key={row.title} delay={i * 0.06}>
          <div className="relative pl-6">
            <span
              aria-hidden
              className="absolute left-0 top-1.5 h-5 w-[3px] bg-amber-brand"
            />
            {row.label && (
              <p className="font-mono text-xs tracking-widest uppercase text-navy-400 mb-2">
                {row.label}
              </p>
            )}
            <h3 className="font-display text-xl md:text-2xl font-extrabold uppercase leading-snug text-navy-950 mb-3">
              {row.title}
            </h3>
            <p className="text-navy-600 leading-relaxed max-w-lg">{row.desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
