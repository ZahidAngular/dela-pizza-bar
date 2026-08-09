"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/lib/site";

const stats = [
  { k: "Halal", v: "Certified" },
  { k: "7 days", v: "11am – 10pm" },
  { k: '12" 15" 18"', v: "Large, family, party" },
  { k: "From $16", v: "Every pizza" },
];

const headline = ["Stone-baked pizza,", "made"];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Only the parallax is scroll-driven. Nothing here controls visibility.
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);

  return (
    <section
      id="top"
      ref={ref}
      className="on-photo grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
    >
      {/* Photograph — the point of the page */}
      <motion.div style={{ y: imageY }} className="absolute inset-0">
        <Image
          src="/images/hero.jpg"
          alt="Stone-baked pizza fresh from the oven at Dela Pizza Bar"
          fill
          priority
          sizes="100vw"
          className="img-warm scale-105 object-cover object-center"
        />
      </motion.div>

      {/* Scrims: readable text, still a visible photograph. The left edge
          stops short of solid ink — enough to clear AA on the body copy,
          not so much that the pizza disappears behind a black panel. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/92 via-ink/55 to-ink/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-ink/45" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />

      <motion.div style={{ y: contentY }} className="relative z-10 pt-36">
        <div className="container-x">
          {/* Eyebrow */}
          <div className="rise-in flex items-center gap-4">
            <span className="gold-line" />
            <span className="eyebrow text-gold">
              Halal · Blair Athol · Adelaide
            </span>
          </div>

          {/* Headline */}
          <h1 className="display mt-8 max-w-[16ch] text-[3.1rem] text-cream sm:text-[4.6rem] lg:text-[5.8rem] xl:text-[6.4rem]">
            {headline.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <span
                  className="mask-up block"
                  style={{ animationDelay: `${0.12 + i * 0.1}s` }}
                >
                  {line}
                  {i === 1 ? (
                    <span className="serif-italic"> properly.</span>
                  ) : null}
                </span>
              </span>
            ))}
          </h1>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <p
              className="rise-in max-w-lg text-[0.95rem] leading-[1.75] text-body"
              style={{ animationDelay: "0.45s" }}
            >
              Hand-stretched dough, a heavy hand with the cheese, and a fryer
              that runs fresh all day. Dine in at {site.address.street}, collect
              on your way home, or have it delivered across the inner north.
            </p>

            <div
              className="rise-in flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "0.58s" }}
            >
              <a href="#menu" className="btn btn-primary">
                View the menu
              </a>
              <a href="#order" className="btn btn-ghost">
                Order online
              </a>
            </div>
          </div>

          {/* Stat rail — grounds the hero instead of floating a card */}
          <dl
            className="rise-in mt-16 grid grid-cols-2 border-t border-cream/12 lg:grid-cols-4"
            style={{ animationDelay: "0.72s" }}
          >
            {stats.map((s, i) => (
              <div
                key={s.k}
                className={`px-0 py-6 sm:px-6 ${
                  i > 0 ? "lg:border-l lg:border-cream/12" : ""
                } ${
                  i % 2 === 1
                    ? "border-l border-cream/12 pl-5 sm:pl-6 lg:pl-6"
                    : ""
                }`}
              >
                <dt className="display text-[1.6rem] text-cream sm:text-[1.9rem]">
                  {s.k}
                </dt>
                <dd className="label-xs mt-1.5 text-muted">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </motion.div>
    </section>
  );
}
