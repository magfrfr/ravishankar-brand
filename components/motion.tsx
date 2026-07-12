"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type BlockProps = {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

/** Animates on mount — for above-the-fold hero content. */
export function FadeIn({ children, delay = 0, y = 24, className }: BlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Animates when scrolled into view, once. */
export function Reveal({ children, delay = 0, y = 28, className }: BlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Counts up from 0 when it enters the viewport. */
export function Counter({
  to,
  suffix = "",
  className,
}: {
  to: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}

/** Hero content that drifts up and fades as the user scrolls away.
 * Opacity is set imperatively: style-bound motion values from useScroll get
 * promoted to a ScrollTimeline animation whose offsets ignore the element
 * target range (same bug as the journey text blocks). */
export function HeroExit({ children, className }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (inner.current) {
      inner.current.style.opacity = String(1 - Math.min(p / 0.9, 1) * 0.85);
    }
  });
  return (
    <div ref={ref} className={className}>
      <motion.div ref={inner} style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}

/** Vertical line that draws itself as the timeline scrolls past. */
export function TimelineTrack({ children, className }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.6"],
  });
  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <div className="absolute left-[7px] top-0 bottom-0 w-px bg-blue-light" />
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-[7px] top-0 bottom-0 w-px bg-amber-brand origin-top"
      />
      {children}
    </div>
  );
}
