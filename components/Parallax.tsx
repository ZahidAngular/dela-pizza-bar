"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/* ------------------------------------------------------------------
   Scroll-linked drift for a photograph inside a fixed frame.

   The child is scaled past the frame first, so translating it can never
   expose an edge — the layout, crop and aspect ratio the design already
   has all stay exactly as they were. Nothing here animates on load; it
   only responds to the page moving.
------------------------------------------------------------------- */

export function Parallax({
  children,
  /* Travel as a share of the frame height. Small on purpose — this should
     read as depth, not as a moving picture. */
  amount = 8,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${amount}%`, `${amount}%`]
  );

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      <motion.div
        /* Overscaled by more than the travel, so an edge can never appear
           at either end of the range. */
        style={{ y, scale: 1 + amount / 40 }}
        className="absolute inset-0 will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
