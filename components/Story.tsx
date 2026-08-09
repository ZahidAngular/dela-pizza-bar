import Image from "next/image";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";

const pillars = [
  {
    n: "01",
    title: "Deck-oven heat",
    body: "Bases go straight onto the stone, so the crust lifts, chars and stays light.",
  },
  {
    n: "02",
    title: "Made to order",
    body: "Nothing sits waiting under a lamp. Your pizza is built when the order lands.",
  },
  {
    n: "03",
    title: "Loaded properly",
    body: "Toppings edge to edge — the reason the same faces come back every week.",
  },
];

export function Story() {
  return (
    <section id="story" className="relative bg-ink py-28 lg:py-40">
      <div className="container-x">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Imagery — stretches to the full height of the text column */}
          <Reveal className="relative lg:h-full">
            <div className="zoom-parent relative aspect-4/5 overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[38rem]">
              <Image
                src="/images/kitchen.jpg"
                alt="A pizza shared on a board with sauces and a cold drink"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="img-warm object-cover"
              />
              {/* Strong enough that the caption stays legible over any frame */}
              <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

              {/* Overlapping detail shot, anchored to the frame */}
              <div className="absolute bottom-6 right-6 hidden w-36 overflow-hidden border border-cream/20 shadow-2xl shadow-black/60 sm:block lg:w-44">
                <div className="relative aspect-square">
                  <Image
                    src="/images/dough.jpg"
                    alt="A margherita coming out of the deck oven"
                    fill
                    sizes="180px"
                    className="img-warm object-cover"
                  />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 max-w-[10rem]">
                <span className="label-xs text-white/70">Prospect Road</span>
                <p className="display mt-1 text-[1.35rem] leading-tight text-white">
                  Made fresh, all day
                </p>
              </div>
            </div>
          </Reveal>

          {/* Copy */}
          <div className="lg:pt-8">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="gold-line" />
                <span className="eyebrow text-gold">Our story</span>
              </div>

              <h2 className="display mt-7 text-[2.4rem] text-cream sm:text-[3.2rem] lg:text-[3.9rem]">
                A neighbourhood pizza bar that
                <span className="serif-italic"> never cuts corners.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 max-w-xl space-y-6 text-[0.95rem] leading-[1.85] text-body">
                <p>
                  Dela Pizza Bar sits on Prospect Road in Blair Athol, feeding
                  Adelaide&apos;s inner north seven days a week. We aren&apos;t
                  chasing trends — we&apos;re chasing the same pizza, made right,
                  every single service.
                </p>
                <p>
                  Dough is proved in house. Cheese goes on with a heavy hand. The
                  fryer runs fresh for butterfish, calamari and prawns. Whether
                  it&apos;s a quiet Tuesday family order or a Friday night rush,
                  what leaves the counter is hot, honest and generous.
                </p>
              </div>
            </Reveal>

            <RevealGroup className="mt-14 space-y-0">
              {pillars.map((p) => (
                <RevealItem
                  key={p.title}
                  className="group grid grid-cols-[auto_1fr] gap-6 border-t border-line py-7 transition-colors duration-500 hover:border-gold/40 sm:gap-10"
                >
                  <span className="label-xs pt-1.5 text-gold transition-colors duration-500 group-hover:text-gold">
                    {p.n}
                  </span>
                  <div>
                    <h3 className="display text-[1.45rem] text-cream">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-md text-[0.9rem] leading-[1.75] text-body-soft">
                      {p.body}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
