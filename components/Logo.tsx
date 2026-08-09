import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
   The Dela logo is drawn, not typed.

   The letterforms are redrawn from the shopfront sign on Prospect Road:
   square geometric caps with a 45-degree cut on every terminal that
   faces away from the letter's spine. Nothing here depends on a webfont,
   so the logo is identical in the navbar, in an OG card rendered by
   Satori, and in a printed menu.

   Everything sits on a 100-unit cap height with the baseline at y=100.
   All paths assume fill-rule="evenodd" — counters are drawn in the same
   winding direction as their outlines.
------------------------------------------------------------------- */

// Heavy set — DELA. Stem 27, chamfer 26.
const HEAVY: Record<string, { w: number; d: string }> = {
  D: { w: 86, d: "M0 0H60L86 26V74L60 100H0ZM27 27H48.8L59 37.2V62.8L48.8 73H27Z" },
  E: { w: 70, d: "M0 0H70V11L54 27H27V37H62V48L46 64H27V73H54L70 89V100H0Z" },
  L: { w: 66, d: "M0 0H27V73H50L66 89V100H0Z" },
  A: {
    w: 92,
    d: "M0 100L26 12L38 0H62L92 100H64L57.5 82H34.5L28 100ZM46 22L36.8 70H55.2Z",
  },
};

// Light set — PIZZA BAR. Stem 22, chamfer 22.
const LIGHT: Record<string, { w: number; d: string }> = {
  P: { w: 72, d: "M0 0H50L72 22V44L50 66H22V100H0ZM22 22H40.9L50 31.1V34.9L40.9 44H22Z" },
  I: { w: 22, d: "M0 0H22V100H0Z" },
  Z: { w: 70, d: "M0 0H70V20L26 78H70V100H0V80L44 22H0Z" },
  A: { w: 78, d: "M0 100L22 14L36 0H52L78 100H58L53 80H25L20 100ZM39 24L30 60H48Z" },
  B: {
    w: 70,
    d:
      "M0 0H48L68 20V37L58 47.5L68 58V80L48 100H0Z" +
      "M22 22H39L46 29V38L39 45H22Z" +
      "M22 55H39L46 62V71L39 78H22Z",
  },
  R: {
    w: 74,
    d:
      "M0 0H50L72 22V44L52 64L74 100H49L30 66H22V100H0Z" +
      "M22 22H40.9L50 31.1V34.9L40.9 44H22Z",
  },
};

/* Optical kerning. L/A opens a wedge of white that the metric
   sidebearings cannot see. */
const KERN: Record<string, number> = { LA: -7, DE: 1 };

type Word = { paths: { x: number; d: string }[]; width: number };

function setWord(
  word: string,
  glyphs: Record<string, { w: number; d: string }>,
  tracking: number
): Word {
  let x = 0;
  const paths: { x: number; d: string }[] = [];
  for (let i = 0; i < word.length; i++) {
    const ch = word[i];
    if (ch === " ") {
      x += 30 + tracking;
      continue;
    }
    paths.push({ x, d: glyphs[ch].d });
    x += glyphs[ch].w + tracking + (KERN[ch + word[i + 1]] ?? 0);
  }
  return { paths, width: x - tracking };
}

const DELA = setWord("DELA", HEAVY, 12);
const PIZZA = setWord("PIZZA BAR", LIGHT, 16);

/* The sub-line is scaled to sit flush with DELA on both sides — that
   justified stack is what makes the sign read as designed rather than
   typed. */
const SUB_SCALE = DELA.width / PIZZA.width;
const LINE_GAP = 24;
const VB_W = DELA.width;
const VB_H = 100 + LINE_GAP + 100 * SUB_SCALE;

export const LOCKUP_ASPECT = VB_W / VB_H;
export const MONOGRAM_PATH = HEAVY.D.d;
export const MONOGRAM_VIEWBOX = "0 0 86 100";

function Glyphs({ word }: { word: Word }) {
  return (
    <>
      {word.paths.map((p, i) => (
        <path key={i} transform={`translate(${p.x} 0)`} d={p.d} />
      ))}
    </>
  );
}

/* Primary logo — the stacked lockup. Sized by height; give it a height
   class and let the width follow. */
export function Wordmark({
  className,
  decorative = false,
}: {
  className?: string;
  /* Set when an ancestor link already names the logo, so screen readers
     don't hear the brand twice. */
  decorative?: boolean;
}) {
  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      fillRule="evenodd"
      {...(decorative
        ? { "aria-hidden": true as const }
        : { role: "img" as const, "aria-label": site.name })}
      className={cn("h-11 w-auto", className)}
    >
      <g className="fill-cream">
        <Glyphs word={DELA} />
      </g>
      <g
        className="fill-gold"
        transform={`translate(0 ${100 + LINE_GAP}) scale(${SUB_SCALE})`}
      >
        <Glyphs word={PIZZA} />
      </g>
    </svg>
  );
}

/* Monogram — the D on its own, for app icons, avatars and anywhere the
   full lockup would fall below its minimum size. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg
      viewBox={MONOGRAM_VIEWBOX}
      fillRule="evenodd"
      aria-hidden="true"
      className={cn("h-8 w-auto fill-gold", className)}
    >
      <path d={MONOGRAM_PATH} />
    </svg>
  );
}

/* Plaque — the seal equivalent for a geometric identity. The two cut
   corners are the letterforms' 45-degree rule applied to the frame. */
/* Markup string of the lockup, for renderers that cannot mount React
   components — the OG card (Satori) and the files in public/brand. */
export function lockupSvgString(top: string, bottom: string, width: number) {
  const paths = (w: Word) =>
    w.paths.map((p) => `<path transform="translate(${p.x} 0)" d="${p.d}"/>`).join("");
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VB_W} ${VB_H}" ` +
    `width="${Math.round(width)}" height="${Math.round(width / LOCKUP_ASPECT)}" fill-rule="evenodd">` +
    `<g fill="${top}">${paths(DELA)}</g>` +
    `<g fill="${bottom}" transform="translate(0 ${100 + LINE_GAP}) scale(${SUB_SCALE})">${paths(PIZZA)}</g>` +
    `</svg>`
  );
}
