import type { Metadata } from "next";
import CtaLink from "@/components/cta-link";
import { Reveal } from "@/components/motion";

export const metadata: Metadata = {
  title: "Connect",
  description: "One honest note is all it takes. No forms, no funnels.",
};

export default function ConnectPage() {
  return (
    <section className="bg-white min-h-[calc(100dvh-4rem)] flex items-center px-6">
      <div className="max-w-4xl mx-auto w-full py-24">
        <Reveal>
          <p className="font-mono text-xs tracking-widest uppercase text-amber-dark mb-6">
            Connect
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-black text-navy-950 leading-[1.05] mb-8">
            One honest note
            <br />
            is all it takes.
          </h1>
          <p className="text-navy-600 text-xl max-w-xl leading-relaxed mb-12">
            No forms. No funnels. Tell me who you are and what you&apos;re
            building, and I&apos;ll write back.
          </p>
          <div className="flex flex-wrap items-center gap-12">
            <CtaLink href="mailto:salesravi1997@gmail.com" className="text-lg">
              Write to me
            </CtaLink>
            <CtaLink href="https://www.linkedin.com/in/ravi14775/" external>
              LinkedIn
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
