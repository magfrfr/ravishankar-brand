import Link from "next/link";
import BlogCard from "@/components/blog-card";
import { getAllPosts } from "@/lib/blog";
import { SHOW_BLOG } from "@/lib/flags";
import { stats, markets, education } from "@/lib/career";
import JourneyMorph from "@/components/journey-morph";
import SpecSheet from "@/components/spec-sheet";
import CtaLink from "@/components/cta-link";
import { FadeIn, Reveal, Counter, HeroExit } from "@/components/motion";
import { YearsText, YearsCounter } from "@/components/years";

export default function HomePage() {
  const posts = SHOW_BLOG ? getAllPosts().slice(0, 3) : [];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-white pt-24 pb-28 px-6">
        <HeroExit className="relative max-w-4xl mx-auto">
          <FadeIn>
            <p className="text-amber-dark font-semibold tracking-widest uppercase text-sm mb-4">
              GM, Marketing &amp; Growth
            </p>
          </FadeIn>
          <FadeIn delay={0.12}>
            <h1 className="font-display text-5xl md:text-7xl font-black text-navy-950 leading-tight mb-6">
              Markets aren&apos;t found.
              <br />
              <span className="text-navy-600">They&apos;re made.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.24}>
            <p className="text-navy-600 text-xl max-w-2xl leading-relaxed mb-10">
              I&apos;m Ravishankar R, a sector-agnostic sales and marketing
              practitioner. For <YearsText />{" "}years I&apos;ve built markets
              from scratch: dealer networks across India, export channels from
              the Middle East to East and West Africa, product lines from tires
              to industrial motors.
              I write about sales, marketing and growth for people who want to
              build things that last.
            </p>
          </FadeIn>
          <FadeIn delay={0.36}>
            <div className="flex flex-wrap items-center gap-10">
              <CtaLink href="#journey">See the Journey</CtaLink>
              <CtaLink href="/experience">Full Experience</CtaLink>
            </div>
          </FadeIn>
        </HeroExit>
      </section>

      {/* Stats band */}
      <section className="bg-navy-950 py-16 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-4xl md:text-5xl font-black text-white">
                {s.auto ? (
                  <YearsCounter suffix={s.suffix} />
                ) : (
                  <Counter to={s.value} suffix={s.suffix} />
                )}
              </p>
              <p className="mt-2 text-white/60 text-sm leading-snug">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The journey — pinned scroll morph */}
      <section id="journey" className="bg-white scroll-mt-16">
        <JourneyMorph />
        <div className="max-w-3xl mx-auto px-6 pb-24">
          <Reveal>
            <CtaLink href="/experience">The full story, role by role</CtaLink>
          </Reveal>
        </div>
      </section>

      {/* What I do */}
      <section className="bg-blue-wash py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold text-navy-950 mb-3 text-center">
              How I Build Markets
            </h2>
            <p className="text-navy-400 text-center mb-14 max-w-xl mx-auto">
              Not theory. Three decades of doing it, in India and abroad.
            </p>
          </Reveal>
          <SpecSheet
            rows={[
              {
                title: "Market entry, from zero",
                desc: "Surveys, positioning, export pricing built backwards from the shelf, and channel margins that keep partners loyal. This is how Turkey, Tunisia, Indonesia, the UAE and markets across Africa were opened.",
              },
              {
                title: "Dealer & distributor networks",
                desc: "Networks are built face to face. Appointing the right partners, training their teams, and standing beside them until the market holds its own.",
              },
              {
                title: "The SSS framework",
                desc: "Sense, Serve, Strengthen: my own execution framework. Sensing opportunities, customer needs and market demand, serving with the right solutions that create value, then strengthening relationships through support and feedback.",
              },
              {
                title: "Brand & digital growth",
                desc: "A B2B e-commerce portal launched with developers, SEO-led discovery, WhatsApp and Razorpay in the lead flow, and CRM discipline across every sales funnel.",
              },
            ]}
          />
        </div>
      </section>

      {/* Global reach */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <p className="text-amber-dark font-semibold tracking-widest uppercase text-sm mb-3">
              Global Reach
            </p>
            <h2 className="font-display text-4xl font-extrabold text-navy-950 mb-10">
              Markets opened, entered or grown.
            </h2>
          </Reveal>
          <Reveal>
            <p className="font-display text-3xl md:text-5xl font-black uppercase leading-[1.15] tracking-tight text-navy-950">
              {markets.map((m, i) => (
                <span key={m}>
                  <span className="whitespace-nowrap">
                    {m}
                    {i < markets.length - 1 && (
                      <span className="text-amber-brand pl-3 md:pl-4">·</span>
                    )}
                  </span>{" "}
                </span>
              ))}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lifelong learner */}
      <section className="bg-yellow-wash py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold text-navy-950 mb-3 text-center">
              Still a Student
            </h2>
            <p className="text-navy-600 text-center mb-14 max-w-2xl mx-auto">
              The engineering degree came first. The business analytics diploma
              came 26 years into the career. Learning never stopped in between.
            </p>
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

      {/* Quote strip */}
      <section className="bg-navy-950 py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <blockquote className="font-display text-2xl md:text-3xl text-white font-extrabold leading-relaxed">
              &ldquo;Stay until the market
              <br />
              holds its own.&rdquo;
            </blockquote>
            <p className="mt-6 text-white/50 font-semibold tracking-widest uppercase text-sm">
              Ravishankar R
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured posts */}
      {posts.length > 0 && (
        <section className="bg-white py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-end justify-between mb-10">
                <h2 className="font-display text-3xl font-extrabold text-navy-950">
                  Recent Writing
                </h2>
                <Link
                  href="/blog"
                  className="text-amber-dark font-semibold hover:underline text-sm"
                >
                  All posts →
                </Link>
              </div>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.08}>
                  <BlogCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-yellow-wash py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Reveal>
            <h2 className="font-display text-3xl font-extrabold text-navy-950 mb-4">
              Building a market? Let&apos;s talk.
            </h2>
            <p className="text-navy-600 text-lg mb-8 max-w-xl mx-auto">
              Founders working out a go-to-market, companies entering a new
              region, salespeople who want to compare notes. The door is open.
            </p>
            <CtaLink href="/connect" className="text-base">
              Connect
            </CtaLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
