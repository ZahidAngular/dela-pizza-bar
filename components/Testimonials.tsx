import Image from "next/image";
import { Star } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { getReviews } from "@/lib/reviews";

function Stars({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const cls = size === "md" ? "h-4 w-4" : "h-3.5 w-3.5";
  return (
    <div
      className="flex gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={
            i <= Math.round(rating)
              ? `${cls} fill-gold text-gold`
              : `${cls} text-gold/30`
          }
        />
      ))}
    </div>
  );
}

export async function Testimonials() {
  const { rating, total, reviews, live, mapsUri } = await getReviews();

  return (
    <section id="reviews" className="relative bg-ink-2 py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Reviews"
          title={`${total}+ locals have`}
          accent="had their say."
          description="Straight from Google — unedited, from the people who actually eat here."
          action={
            <a
              href={mapsUri}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3.5"
            >
              <Stars rating={rating} size="md" />
              <span className="display text-[1.4rem] text-cream transition-colors group-hover:text-gold">
                {rating.toFixed(1)}
              </span>
              <span className="label-xs text-muted">on Google</span>
            </a>
          }
        />

        <RevealGroup className="mt-20 grid border-t border-line md:grid-cols-3">
          {reviews.slice(0, 3).map((r, i) => (
            <RevealItem key={r.id}>
              <figure
                className={`flex h-full flex-col p-8 transition-colors duration-500 hover:bg-surface lg:p-10 ${
                  i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""
                }`}
              >
                <Stars rating={r.rating} />

                <blockquote className="mt-6 flex-1 text-[1.02rem] leading-[1.75] text-cream/85">
                  {r.quote}
                </blockquote>

                <figcaption className="mt-9 flex items-center gap-3.5 border-t border-line pt-6">
                  {r.photoUrl ? (
                    <Image
                      src={r.photoUrl}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="display flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-[1rem] text-gold"
                    >
                      {r.author.charAt(0)}
                    </span>
                  )}
                  <span>
                    <span className="display block text-[1.15rem] text-cream">
                      {r.author}
                    </span>
                    <span className="label-xs mt-1 block text-muted">
                      {r.when}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Google requires attribution wherever its review content appears. */}
        <p className="label-xs mt-8 text-muted">
          {live ? "Live from Google Reviews" : "Google reviews"} ·{" "}
          <a
            href={mapsUri}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-cream/70 transition-colors hover:text-gold"
          >
            Read all {total} reviews on Google
          </a>
        </p>
      </div>
    </section>
  );
}
