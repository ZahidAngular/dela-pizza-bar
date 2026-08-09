"use client";

import { Plus } from "lucide-react";
import { RevealGroup, RevealItem, Reveal } from "@/components/Reveal";
import { useOrder } from "@/components/OrderProvider";
import { deals, dealsNote } from "@/lib/menu";

export function Deals() {
  const { add } = useOrder();

  return (
    <section id="deals" className="relative bg-ink-2 py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <div className="flex items-center gap-4">
              <span className="label-xs text-gold">03</span>
              <span className="eyebrow text-gold">Combo deals</span>
            </div>
            <h2 className="display mt-6 text-[2.2rem] text-cream sm:text-[2.9rem] lg:text-[3.4rem]">
              Feeding a few?
              <span className="serif-italic"> Take a deal.</span>
            </h2>
          </div>
          <p className="label-xs max-w-xs text-muted md:text-right">
            {dealsNote}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {deals.map((d) => (
            <RevealItem key={d.n}>
              <article className="card group flex h-full flex-col p-7">
                <div className="flex items-baseline justify-between border-b border-line pb-4">
                  <span className="label-xs text-gold">{d.n}</span>
                  <span className="display text-[1.9rem] text-cream transition-colors duration-500 group-hover:text-gold">
                    ${d.price.replace(".00", "")}
                  </span>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {d.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-[0.88rem] leading-snug text-body"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() => add(d.n, "Deal", Number(d.price))}
                  className="mt-7 inline-flex items-center gap-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-cream transition-colors duration-400 hover:text-gold"
                >
                  <span className="flex h-7 w-7 items-center justify-center border border-line transition-colors duration-400 group-hover:border-gold/50">
                    <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                  </span>
                  Add deal
                </button>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
