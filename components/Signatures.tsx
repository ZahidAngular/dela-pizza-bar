"use client";

import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { useOrder } from "@/components/OrderProvider";
import { signatures } from "@/lib/menu";

export function Signatures() {
  const { add } = useOrder();

  return (
    <section id="signatures" className="relative bg-ink-2 py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          index="01"
          eyebrow="The favourites"
          title="Three pizzas the"
          accent="regulars order."
          description="Every base is hand-stretched and baked on stone. These are the ones that leave the kitchen most often."
          action={
            <a href="#menu" className="btn btn-ghost">
              Full menu <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
            </a>
          }
        />

        <RevealGroup className="mt-20 grid gap-x-8 gap-y-14 md:grid-cols-3">
          {signatures.map((item, i) => (
            <RevealItem key={item.name}>
              <article className="zoom-parent group">
                <div className="relative aspect-3/4 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={`${item.name} pizza`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="img-warm object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-75" />
                  <span className="label-xs absolute left-5 top-5 border border-white/25 bg-black/45 px-3 py-1.5 text-gold-soft backdrop-blur-sm">
                    {item.badge}
                  </span>
                  <span className="label-xs absolute bottom-5 right-5 text-white/50">
                    0{i + 1}
                  </span>
                </div>

                <div className="mt-7 flex items-baseline justify-between gap-5 border-b border-line pb-4">
                  <h3 className="display text-[1.75rem] text-cream transition-colors duration-500 group-hover:text-gold">
                    {item.name}
                  </h3>
                  <span className="display shrink-0 text-[1.6rem] text-gold">
                    ${item.price}
                  </span>
                </div>

                <p className="mt-4 text-[0.9rem] leading-[1.75] text-cream/55">
                  {item.description}
                </p>

                <button
                  type="button"
                  onClick={() => add(item.name, "Large", Number(item.price))}
                  className="mt-6 inline-flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream/80 transition-colors duration-400 hover:text-gold"
                >
                  <span className="flex h-7 w-7 items-center justify-center border border-line transition-colors duration-400 group-hover:border-gold/50">
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                  Add 12&quot; large
                </button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
