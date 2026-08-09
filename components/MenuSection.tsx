"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone } from "lucide-react";
import { menu, sizeColumns, type MenuItem } from "@/lib/menu";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useOrder } from "@/components/OrderProvider";
import { sizeLabel, type OrderSize } from "@/lib/order";

/**
 * The price *is* the add button — no extra chrome, and the size you tap is
 * the size you get.
 */
function PriceButton({
  name,
  size,
  price,
  tone = "cream",
}: {
  name: string;
  size: OrderSize;
  price: string;
  tone?: "cream" | "gold";
}) {
  const { add } = useOrder();
  const label =
    size === "Single"
      ? `Add ${name} to your order`
      : `Add ${sizeLabel[size]} ${name} to your order`;

  return (
    <button
      type="button"
      onClick={() => add(name, size, Number(price))}
      aria-label={label}
      title={label}
      className={cn(
        "display group/price relative text-[1.25rem] transition-colors duration-300",
        tone === "gold" ? "text-gold hover:text-gold-soft" : "text-cream/85 hover:text-gold"
      )}
    >
      ${price}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-3.5 top-1/2 -translate-y-1/2 text-[0.7rem] opacity-0 transition-opacity duration-300 group-hover/price:opacity-100"
      >
        +
      </span>
    </button>
  );
}

const tagStyles: Record<string, string> = {
  Spicy: "border-brand/55 text-brand-bright",
  Vegetarian: "border-emerald-600/45 text-emerald-400/90",
};

const goldTag = "border-gold/40 text-gold";

export function MenuSection() {
  const [active, setActive] = useState(menu[0].id);
  const category = menu.find((c) => c.id === active) ?? menu[0];

  return (
    <section id="menu" className="relative bg-ink py-28 lg:py-40">
      <div className="container-x">
        {/* Heading */}
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4">
              <span className="label-xs text-gold">02</span>
              <span className="eyebrow text-gold">The menu</span>
            </div>
            <h2 className="display mt-6 text-[2.35rem] text-cream sm:text-[3.1rem] lg:text-[3.7rem]">
              Everything we
              <span className="serif-italic"> make.</span>
            </h2>
            <p className="mt-6 text-[0.95rem] leading-[1.8] text-body">
              Prices shown are for dine in and takeaway. Delivery pricing may
              differ on partner platforms.
            </p>
          </motion.div>

          <motion.a
            href={site.phone.href}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="btn btn-ghost shrink-0"
          >
            <Phone className="h-4 w-4" strokeWidth={1.6} />
            {site.phone.display}
          </motion.a>
        </div>

        {/* Tabs */}
        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-b border-line">
          {menu.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActive(c.id)}
              className={cn(
                "relative -mb-px pb-5 text-[0.8rem] font-medium uppercase tracking-[0.16em] transition-colors duration-400",
                active === c.id
                  ? "text-cream"
                  : "text-body-soft hover:text-cream/80"
              )}
            >
              {c.title}
              <sup className="ml-1.5 text-[0.6rem] tracking-normal text-gold">
                {c.items.length}
              </sup>
              {active === c.id && (
                <motion.span
                  layoutId="menu-underline"
                  className="absolute inset-x-0 bottom-0 h-px bg-gold"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
          >
            {/* Category panel */}
            <div className="lg:sticky lg:top-32 lg:self-start">
              <div className="relative aspect-4/5 overflow-hidden sm:aspect-video lg:aspect-4/5">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="img-warm object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7 lg:p-8">
                  <span className="eyebrow text-gold">{category.kicker}</span>
                  <h3 className="display mt-3 text-[2.2rem] text-cream sm:text-[2.6rem]">
                    {category.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-[0.87rem] leading-[1.75] text-body">
                    {category.blurb}
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div>
              <p className="label-xs mb-5 flex items-center gap-2.5 text-muted">
                <span className="inline-block h-1 w-1 rounded-full bg-gold" />
                Tap a price to add it to your order
              </p>

              {category.priced === "sizes" && (
                <div className="mb-1 hidden grid-cols-[1fr_auto] items-end gap-8 border-b border-line pb-3 sm:grid">
                  <span className="label-xs text-muted">Item</span>
                  <span className="grid w-52 grid-cols-3 gap-4 text-right">
                    {sizeColumns.map((c) => (
                      <span key={c.key} className="label-xs text-muted">
                        {c.label}
                      </span>
                    ))}
                  </span>
                </div>
              )}

              <ul>
                {category.items.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(i * 0.03, 0.35),
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group grid grid-cols-[1fr_auto] items-baseline gap-6 border-b border-line py-6 transition-colors duration-500 hover:border-gold/35 sm:gap-10"
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h4 className="display text-[1.3rem] text-cream transition-colors duration-500 group-hover:text-gold">
                          {item.name}
                        </h4>
                        {item.tags?.map((t) => (
                          <span
                            key={t}
                            className={cn(
                              "border px-2.5 py-1 text-[0.55rem] font-semibold uppercase tracking-[0.14em]",
                              tagStyles[t] ?? goldTag
                            )}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      {item.description && (
                        <p className="mt-2 max-w-md text-[0.87rem] leading-[1.7] text-body-soft">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {category.priced === "sizes" ? (
                      <span className="grid w-36 grid-cols-3 gap-3 text-right sm:w-52 sm:gap-4">
                        {sizeColumns.map((c) => {
                          const price = item[c.key as keyof MenuItem] as
                            | string
                            | undefined;
                          if (!price) return <span key={c.key} />;
                          return (
                            <PriceButton
                              key={c.key}
                              name={item.name}
                              size={c.short}
                              price={price}
                              tone={c.key === "party" ? "gold" : "cream"}
                            />
                          );
                        })}
                      </span>
                    ) : (
                      <PriceButton
                        name={item.name}
                        size="Single"
                        price={item.price!}
                        tone="gold"
                      />
                    )}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-12 flex flex-col gap-6 border border-line bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-[0.9rem] leading-[1.75] text-body">
                  Build your order here, then call ahead — we&apos;ll have it hot
                  on the counter when you arrive.
                </p>
                <a href={site.phone.href} className="btn btn-gold shrink-0">
                  <Phone className="h-4 w-4" strokeWidth={1.7} />
                  {site.phone.display}
                </a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
