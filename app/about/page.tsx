import type { Metadata } from "next";
import Image from "next/image";
import SpecSheet from "@/components/spec-sheet";
import CtaLink from "@/components/cta-link";
import { Reveal } from "@/components/motion";
import { careerYears } from "@/lib/career";

export const metadata: Metadata = {
  title: "About",
  description: `${careerYears()}+ years building markets across India, Africa, Europe and the Middle East. The story behind the work.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-blue-wash py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-amber-dark font-semibold tracking-widest uppercase text-sm mb-4">
              About
            </p>
            <h1 className="font-display text-5xl font-extrabold text-navy-950 leading-tight">
              The Story Behind the Work
            </h1>
          </Reveal>
        </div>
      </section>

      {/* Bio */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto grid md:grid-cols-[2fr_1fr] gap-16 items-start">
          <Reveal className="space-y-6 text-navy-600 text-[18px] leading-relaxed">
            <p>
              My first sales job was in 1997, selling freight logistics in
              Chennai with a monthly target and a city to cover. No
              &ldquo;digital marketing,&rdquo; no CRM. Just people, and the slow
              work of earning their trust. I loved it, and I never really
              stopped doing it.
            </p>
            <p>
              Since then the products have kept changing: Tata cars, excavators
              and backhoe loaders, MRF tires, brake linings, shock absorbers,
              engine parts and today industrial electric motors. At Tata
              Hitachi I beat JCB to a first-ever institutional sale and held
              80% market share in a region where the target was 50%. At Rane
              and MRF I carried Indian products into Turkey, Tunisia, Indonesia
              and the UK, introduced CVDP for Europe&apos;s commercial
              vehicles, and signed the first OEM customer at TMD Germany. At
              UNIMO (UCAL Group) I spent eight years building a 500-part export
              range that reached the EU.
            </p>
            <p>
              People call this experience. I call it being a sector-agnostic
              sales and marketing practitioner: one craft practised in many
              markets. Find the customer, earn the trust, build the channel,
              and stay until the market holds its own. I call myself a market
              maker, because markets are made, not found.
            </p>
            <p>
              Today I lead Marketing &amp; Growth at LEDL Motors, opening
              dealer networks across India and new markets across the Middle
              East and East and West Africa. I&apos;ve built the LEDL brand
              nearly end to end, right down to a work culture brand that ties
              R&amp;D, service and quality assurance together behind the
              customer. And I&apos;m still a student: I finished a business
              analytics diploma at BITS Pilani in 2023, 26 years after my
              first sales call. This site is where I pass forward what
              I&apos;ve been lucky enough to learn.
            </p>
          </Reveal>

          {/* Photo */}
          <Reveal delay={0.15}>
            <div className="sticky top-24">
              <div className="relative overflow-hidden bg-blue-wash aspect-[3/4]">
                <Image
                  src="/ravishankar.jpg"
                  alt="Ravishankar R"
                  fill
                  sizes="(min-width: 768px) 30vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-center">
                <p className="font-display text-lg font-extrabold text-navy-950">
                  Ravishankar R
                </p>
                <p className="text-navy-400 text-sm">
                  GM, Marketing &amp; Growth · LEDL Motors
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Philosophy strip */}
      <section className="bg-navy-950 py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <p className="text-white/40 uppercase tracking-widest text-xs font-semibold mb-6">
              What I Believe
            </p>
            <blockquote className="font-display text-2xl md:text-3xl text-white font-extrabold leading-relaxed">
              &ldquo;Sense. Serve. Strengthen.
              <br />
              Everything else is commentary.&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-navy-950 mb-12 text-center">
              What Guides My Work
            </h2>
          </Reveal>
          <SpecSheet
            rows={[
              {
                title: "On-ground beats armchair",
                desc: "Markets are opened in dealer counters, distributor warehouses and customer sites, not in conference rooms. I travel to the market and stand beside the partner until it works.",
              },
              {
                title: "Long games win",
                desc: "Every shortcut I've seen in sales eventually costs more than it saved. Channel margins, warranty design, retention programs: build them right the first time.",
              },
              {
                title: "Process makes growth repeatable",
                desc: "Sense, Serve, Strengthen. When execution follows a framework, growth stops depending on heroics and starts compounding.",
              },
              {
                title: "People are the strategy",
                desc: "Tools change. Platforms come and go. The ability to understand what someone needs and show how you can help is timeless.",
              },
            ]}
          />
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow-wash py-16 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <Reveal>
            <h2 className="font-display text-2xl font-extrabold text-navy-950 mb-4">
              Want the full story, role by role?
            </h2>
            <CtaLink href="/experience">See the Experience</CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
