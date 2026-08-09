"use client";

import { useEffect, useState } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig } from "framer-motion";

/**
 * Smooth scrolling is an enhancement, not a requirement: anyone who has asked
 * their OS to reduce motion gets native scrolling and no JS animation.
 */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  const content = (
    <MotionConfig reducedMotion="user">{children}</MotionConfig>
  );

  if (reduced) return content;

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5 }}>
      {content}
    </ReactLenis>
  );
}