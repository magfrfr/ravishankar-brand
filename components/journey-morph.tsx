"use client";

import { interpolate } from "flubber";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useMemo, useRef, useState } from "react";
import { milestones } from "@/lib/career";
import { Reveal, TimelineTrack } from "@/components/motion";

const SEGMENTS = milestones.length - 1;
// Within each segment: hold the current shape, morph, then hold the next.
const MORPH_START = 0.35;
const MORPH_END = 0.65;

function JourneyHeader() {
  return (
    <Reveal>
      <p className="text-amber-dark font-semibold tracking-widest uppercase text-sm mb-3">
        The Journey
      </p>
      <h2 className="font-display text-4xl font-extrabold text-navy-950">
        The products kept changing.
        <br />
        The craft never did.
      </h2>
    </Reveal>
  );
}

/** The non-pinned version: mobile and reduced-motion. */
function StaticJourney() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      <div className="mb-14">
        <JourneyHeader />
      </div>
      <TimelineTrack className="pl-10 space-y-14">
        {milestones.map((m, i) => (
          <Reveal key={m.year} delay={i * 0.05} className="relative">
            <div className="absolute -left-10 top-1.5 w-4 h-4 rounded-full bg-amber-brand border-2 border-white shadow" />
            <p className="font-display text-2xl font-extrabold text-navy-950">
              <span className="text-amber-dark mr-3">{m.year}</span>
              {m.title}
            </p>
            <p className="mt-2 text-navy-600 leading-relaxed">{m.text}</p>
          </Reveal>
        ))}
      </TimelineTrack>
    </div>
  );
}

function PinnedJourney() {
  const outerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  const interpolators = useMemo(
    () =>
      milestones
        .slice(0, -1)
        .map((m, i) =>
          interpolate(m.shape, milestones[i + 1].shape, { maxSegmentLength: 6 })
        ),
    []
  );

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const seg = Math.min(Math.max(p, 0) * SEGMENTS, SEGMENTS - 1e-6);
    const i = Math.floor(seg);
    const f = seg - i;
    const t = Math.min(Math.max((f - MORPH_START) / (MORPH_END - MORPH_START), 0), 1);
    pathRef.current?.setAttribute(
      "d",
      t <= 0 ? milestones[i].shape : t >= 1 ? milestones[i + 1].shape : interpolators[i](t)
    );
    const idx = Math.min(Math.round(seg), SEGMENTS);
    setActiveIdx((prev) => (prev === idx ? prev : idx));
  });

  const yearValue = useTransform(
    scrollYProgress,
    milestones.map((_, i) => i / SEGMENTS),
    milestones.map((m) => m.year)
  );
  const year = useTransform(yearValue, (v) => String(Math.round(v)));

  // Hub hole appears while the tire (idx 2) and gear (idx 3) are on stage.
  const hubVisible = activeIdx === 2 || activeIdx === 3;

  return (
    <div ref={outerRef} className="relative h-[450vh]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 h-full flex flex-col">
          <div className="pt-20">
            <JourneyHeader />
          </div>

          <div className="flex-1 grid grid-cols-2 gap-12 items-center">
            {/* Morphing product silhouette */}
            <div className="flex justify-center">
              <svg
                viewBox="0 0 200 200"
                className="w-72 lg:w-96"
                aria-hidden="true"
              >
                <path ref={pathRef} d={milestones[0].shape} fill="#0a1628" />
                <circle
                  cx="100"
                  cy="100"
                  r="17"
                  fill="#ffffff"
                  className={`transition-opacity duration-500 ${
                    hubVisible ? "opacity-100" : "opacity-0"
                  }`}
                />
              </svg>
            </div>

            {/* Year + milestone text */}
            <div>
              <motion.p className="font-display text-7xl lg:text-8xl font-black text-navy-950 tabular-nums leading-none">
                {year}
              </motion.p>
              <div className="relative mt-6 h-48">
                {milestones.map((m, i) => (
                  <div
                    key={m.year}
                    aria-hidden={i !== activeIdx}
                    className={`absolute inset-0 transition-all duration-500 ${
                      i === activeIdx
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                    }`}
                  >
                    <p className="font-mono text-xs tracking-widest uppercase text-amber-dark mb-2">
                      {m.product}
                    </p>
                    <h3 className="font-display text-2xl lg:text-3xl font-extrabold text-navy-950 mb-3">
                      {m.title}
                    </h3>
                    <p className="text-navy-600 leading-relaxed max-w-md">
                      {m.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress rail */}
          <div className="pb-12 flex justify-center gap-3">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIdx ? "w-10 bg-amber-brand" : "w-4 bg-blue-light"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JourneyMorph() {
  const prefersReduced = useReducedMotion();

  return (
    <>
      <div className="hidden md:block">
        {prefersReduced ? <StaticJourney /> : <PinnedJourney />}
      </div>
      <div className="md:hidden">
        <StaticJourney />
      </div>
    </>
  );
}
