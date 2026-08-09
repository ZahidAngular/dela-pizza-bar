"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Minus, Phone, Plus, ShoppingBag, X } from "lucide-react";
import { useOrder } from "@/components/OrderProvider";
import {
  formatOrder,
  lineTotal,
  money,
  orderCount,
  orderTotal,
  sizeLabel,
} from "@/lib/order";
import { site } from "@/lib/site";

export function OrderDrawer() {
  const { lines, open, pulse, setOpen, setQty, remove, clear } = useOrder();
  const [copied, setCopied] = useState(false);

  const count = orderCount(lines);
  const total = orderTotal(lines);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  const copyOrder = async () => {
    try {
      await navigator.clipboard.writeText(formatOrder(lines, site.name));
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked — the summary is still on screen to read out */
    }
  };

  return (
    <>
      {/* Floating trigger */}
      <AnimatePresence>
        {count > 0 && !open && (
          // Positioning lives on the wrapper: `.btn-primary` sets its own
          // `position` and would otherwise win over a `fixed` utility.
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-5 bottom-6 z-45 flex justify-center sm:inset-x-auto sm:right-8 sm:justify-end"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="btn btn-primary w-full px-7 py-4 shadow-key sm:w-auto"
              aria-label={`Review your order — ${count} items, ${money(total)}`}
            >
              {/* Re-keying on `pulse` replays the settle each time a line is added */}
              <motion.span
                key={pulse}
                initial={{ scale: 1.12 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5"
              >
                <ShoppingBag className="h-4 w-4" strokeWidth={1.7} />
                <span>
                  {count} {count === 1 ? "item" : "items"}
                </span>
                <span className="mx-1 h-3 w-px bg-cream/35" />
                <span>{money(total)}</span>
              </motion.span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/65 backdrop-blur-[3px]"
            />

            <motion.aside
              role="dialog"
              aria-label="Your order"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 right-0 z-55 flex w-full max-w-[27rem] flex-col border-l border-line bg-ink"
            >
              {/* Header */}
              <header className="flex items-center justify-between border-b border-line px-6 py-5">
                <div>
                  <span className="eyebrow text-gold">Your order</span>
                  <p className="display mt-1.5 text-[1.5rem] text-cream">
                    {count > 0
                      ? `${count} ${count === 1 ? "item" : "items"}`
                      : "Nothing yet"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close order"
                  className="flex h-10 w-10 items-center justify-center border border-line text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </header>

              {/* Lines */}
              <div className="flex-1 overflow-y-auto px-6">
                {lines.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <ShoppingBag
                      className="h-8 w-8 text-gold/40"
                      strokeWidth={1.2}
                    />
                    <p className="max-w-[22ch] text-[0.9rem] leading-relaxed text-body-soft">
                      Tap any price on the menu to start building your order.
                    </p>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="btn btn-ghost mt-2 py-3"
                    >
                      Browse the menu
                    </button>
                  </div>
                ) : (
                  <ul>
                    {lines.map((l) => (
                      <li
                        key={l.id}
                        className="grid grid-cols-[1fr_auto] items-start gap-4 border-b border-line py-5"
                      >
                        <div>
                          <p className="display text-[1.15rem] text-cream">
                            {l.name}
                          </p>
                          <p className="label-xs mt-1 text-muted">
                            {sizeLabel[l.size]} · {money(l.price)}
                          </p>

                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center border border-line">
                              <button
                                type="button"
                                onClick={() => setQty(l.id, l.qty - 1)}
                                aria-label={`Remove one ${l.name}`}
                                className="flex h-8 w-8 items-center justify-center text-body transition-colors hover:text-gold"
                              >
                                <Minus className="h-3.5 w-3.5" strokeWidth={1.8} />
                              </button>
                              <span className="w-7 text-center text-[0.85rem] font-medium text-cream">
                                {l.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => setQty(l.id, l.qty + 1)}
                                aria-label={`Add another ${l.name}`}
                                className="flex h-8 w-8 items-center justify-center text-body transition-colors hover:text-gold"
                              >
                                <Plus className="h-3.5 w-3.5" strokeWidth={1.8} />
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => remove(l.id)}
                              className="label-xs text-muted transition-colors hover:text-brand-bright"
                            >
                              Remove
                            </button>
                          </div>
                        </div>

                        <span className="display text-[1.25rem] text-gold">
                          {money(lineTotal(l))}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              {lines.length > 0 && (
                <footer className="border-t border-line px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <span className="label-xs text-muted">Order total</span>
                    <span className="display text-[2rem] text-cream">
                      {money(total)}
                    </span>
                  </div>
                  <p className="mt-2 text-[0.75rem] leading-relaxed text-body-soft">
                    Dine-in and pickup pricing. We&apos;ll confirm the total when
                    you call — no payment is taken on this site.
                  </p>

                  <div className="mt-5 space-y-2.5">
                    <a
                      href={site.phone.href}
                      className="btn btn-primary w-full"
                      onClick={copyOrder}
                    >
                      <Phone className="h-4 w-4" strokeWidth={1.7} />
                      Call to order · {site.phone.display}
                    </a>

                    <button
                      type="button"
                      onClick={copyOrder}
                      className="btn btn-ghost w-full"
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" strokeWidth={1.8} />
                          Order copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" strokeWidth={1.6} />
                          Copy order
                        </>
                      )}
                    </button>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <a
                        href={site.ordering.uberEats}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label-xs border border-line py-3 text-center text-body transition-colors hover:border-gold hover:text-gold"
                      >
                        Uber Eats
                      </a>
                      <a
                        href={site.ordering.doorDash}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="label-xs border border-line py-3 text-center text-body transition-colors hover:border-gold hover:text-gold"
                      >
                        DoorDash
                      </a>
                    </div>

                    <button
                      type="button"
                      onClick={clear}
                      className="label-xs w-full pt-2 text-muted transition-colors hover:text-brand-bright"
                    >
                      Clear order
                    </button>
                  </div>
                </footer>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
