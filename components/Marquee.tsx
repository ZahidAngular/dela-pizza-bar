"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const phrases = [
  "Halal",
  "Dine in",
  "Takeaway",
  "Open 7 days",
  "11am – 10pm",
  "Stone baked",
  'L 12" · F 15" · P 18"',
  "331 Prospect Road",
];

export function Marquee() {
  const line = [...phrases, ...phrases];
  const reduced = useReducedMotion();

  /* The band keeps its CSS animation; scrolling only leans it. At rest the
     skew is zero, so it looks exactly as designed — the effect exists
     purely in the moment the page is moving. */
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, {
    stiffness: 260,
    damping: 44,
    mass: 0.4,
  });
  const skewX = useTransform(smooth, [-2400, 0, 2400], [-5, 0, 5], {
    clamp: true,
  });

  return (
    <div className="relative overflow-hidden border-y border-line bg-ink-2 py-5">
      {/* The skew lives on a wrapper, never on `.marquee-track` itself: an
          inline transform from Motion would replace the CSS animation's
          own transform and stop the band dead. */}
      <motion.div style={reduced ? undefined : { skewX }}>
        <div className="marquee-track flex w-max items-center whitespace-nowrap will-change-transform">
          {[...line, ...line].map((p, i) => (
            <span key={`${p}-${i}`} className="flex items-center">
              <span className="display px-8 text-[1.15rem] text-cream/85 sm:text-[1.35rem]">
                {p}
              </span>
              <span className="h-1 w-1 rotate-45 bg-gold/70" />
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
