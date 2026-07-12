import type { Metadata } from "next";
import { roles, education } from "@/lib/career";
import SpecSheet from "@/components/spec-sheet";
import { Reveal, TimelineTrack } from "@/components/motion";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "28+ years across sales, exports, marketing and growth leadership, from Chennai to markets on three continents.",
};

export default function ExperiencePage() {
  return (
    <>
      <section className="bg-blue-wash py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-amber-dark font-semibold tracking-widest uppercase text-sm mb-4">
              Career
            </p>
            <h1 className="font-display text-5xl font-extrabold text-navy-950 leading-tight">
              28+ Years. Nine Companies.
              <br />
              One Craft.
            </h1>
            <p className="mt-4 text-navy-600 text-xl max-w-2xl">
              Freight, cars, construction machinery, tires, brake linings, auto
              components, electric motors. The products changed. The job never
              did: find the customer, earn the trust, build the channel.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <TimelineTrack className="pl-10 space-y-14">
            {roles.map((role) => (
              <Reveal key={role.company + role.period} className="relative">
                <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-amber-brand border-2 border-white shadow" />
                <p className="text-amber-dark font-semibold text-sm mb-1">
                  {role.period} · {role.location}
                </p>
                <h3 className="font-display text-2xl font-extrabold text-navy-950">
                  {role.company}
                </h3>
                <p className="text-navy-400 font-medium mb-3">{role.title}</p>
                <p className="text-navy-600 leading-relaxed">{role.summary}</p>
                {role.highlights.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-navy-600 leading-relaxed">
                        <span className="text-amber-brand mt-1" aria-hidden>
                          ▸
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}
          </TimelineTrack>
        </div>
      </section>

      {/* Education */}
      <section className="bg-blue-wash py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-navy-950 mb-10 text-center">
              Education
            </h2>
          </Reveal>
          <SpecSheet
            rows={education.map((e) => ({
              label: e.years,
              title: e.school,
              desc: e.degree,
            }))}
          />
        </div>
      </section>

      <section className="bg-navy-950 py-16 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <p className="font-display text-2xl text-white font-extrabold mb-3">
              28 years is a long time.
            </p>
            <p className="text-white/60 text-lg">
              The lessons are still being learned. That&apos;s why I write.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
