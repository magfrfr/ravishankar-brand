"use client";

import { careerYears } from "@/lib/career";
import { Counter } from "@/components/motion";

/** Inline live year count. suppressHydrationWarning covers the build-time
 * HTML disagreeing with the client after a November rollover. */
export function YearsText({ suffix = "" }: { suffix?: string }) {
  return (
    <span suppressHydrationWarning>
      {careerYears()}
      {suffix}
    </span>
  );
}

/** Stats-band variant: counts up to the live value on scroll into view. */
export function YearsCounter({
  suffix = "",
  className,
}: {
  suffix?: string;
  className?: string;
}) {
  return <Counter to={careerYears()} suffix={suffix} className={className} />;
}
