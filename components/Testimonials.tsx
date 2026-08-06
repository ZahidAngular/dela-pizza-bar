import { Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { testimonials } from "@/lib/menu";

export function Testimonials() {
  return (
    <section id="reviews" className="relative bg-ink-2 py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          index="04"
          eyebrow="Reviews"
          title="240+ locals have"
          accent="had their say."
          description="Straight from Google — unedited, from the people who actually eat here."
          action={
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
                <Star className="h-4 w-4 text-gold/35" />
              </div>
              <span className="display text-[1.4rem] text-cream">3.7</span>
            </div>
          }
        />

        <RevealGroup className="mt-20 grid border-t border-line md:grid-cols-3">
          {testimonials.map((t, i) => (
            <RevealItem key={t.author}>
              <figure
                className={`group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-surface lg:p-10 ${
                  i > 0
                    ? "border-t border-line md:border-t-0 md:border-l"
                    : ""
                }`}
              >
                <span className="display text-[3.5rem] leading-none text-gold/30">
                  &ldquo;
                </span>
                <blockquote className="-mt-4 flex-1 text-[1.05rem] leading-[1.75] text-cream/85">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-9 border-t border-line pt-6">
                  <p className="display text-[1.2rem] text-cream">{t.author}</p>
                  <p className="label-xs mt-1.5 text-muted">{t.source}</p>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
