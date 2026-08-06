import Image from "next/image";
import { InstagramIcon } from "@/components/icons";
import { site } from "@/lib/site";

const shots = [
  { src: "/images/sig-meatlovers.jpg", alt: "Meatlovers pizza fresh from the oven" },
  { src: "/images/gallery-1.jpg", alt: "A slice being lifted from a whole pizza" },
  { src: "/images/sig-the-lot.jpg", alt: "The Lot pizza, loaded edge to edge" },
  { src: "/images/gallery-2.jpg", alt: "Pizza served on a wooden board" },
  { src: "/images/sig-special-chicken.jpg", alt: "Special Chicken pizza" },
  { src: "/images/menu-pizza.jpg", alt: "Pizza with fresh toppings" },
  { src: "/images/menu-fish-chips.jpg", alt: "Fish and chips basket" },
  { src: "/images/gallery-3.jpg", alt: "Golden fried sides" },
];

export function Gallery() {
  const line = [...shots, ...shots];

  return (
    <section className="relative overflow-hidden bg-ink-2 py-24 lg:py-32">
      <div className="container-x mb-14 flex flex-col items-center gap-5 text-center">
        <div className="flex items-center gap-4">
          <span className="gold-line" />
          <span className="eyebrow text-gold">From the counter</span>
          <span className="gold-line" />
        </div>
        <h2 className="display text-[2.2rem] text-cream sm:text-[2.9rem]">
          Straight out of the oven
        </h2>
        <a
          href={site.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline mt-1 inline-flex items-center gap-2.5 text-[0.8rem] font-medium tracking-[0.08em] text-cream/75 transition-colors hover:text-gold"
        >
          <InstagramIcon className="h-4 w-4" /> {site.social.instagramHandle}
        </a>
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-ink-2 to-transparent sm:w-44" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-ink-2 to-transparent sm:w-44" />

        <div className="flex overflow-hidden">
          <div className="marquee-track marquee-track-slow flex w-max gap-3 pr-3">
            {[...line, ...line].map((s, i) => (
              <div
                key={`${s.src}-${i}`}
                className="relative h-52 w-72 shrink-0 overflow-hidden sm:h-72 sm:w-96"
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="384px"
                  className="img-warm object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
