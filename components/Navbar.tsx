"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Phone, X } from "lucide-react";
import { Wordmark } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { label: "Story", href: "#story" },
  { label: "Signatures", href: "#signatures" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-700",
          scrolled
            ? "glass border-b border-cream/10 py-3.5"
            : // Over the hero photograph the bar always reads light, in either theme
              "on-photo border-b border-transparent py-6"
        )}
      >
        <nav className="container-x flex items-center justify-between gap-8">
          <a href="#top" aria-label={`${site.name} home`} className="shrink-0">
            <Wordmark />
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="link-underline text-[0.78rem] font-medium uppercase tracking-[0.16em] text-cream/65 transition-colors duration-400 hover:text-cream"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4">
            <a
              href={site.phone.href}
              className="hidden items-center gap-2.5 text-[0.78rem] font-medium tracking-[0.06em] text-cream/75 transition-colors hover:text-gold md:flex"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.6} />
              {site.phone.display}
            </a>

            <ThemeToggle />

            <a
              href="#order"
              className="btn btn-primary hidden px-7 py-3 sm:inline-flex"
            >
              Order
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="flex h-10 w-10 items-center justify-center border border-cream/15 text-cream transition-colors hover:border-gold hover:text-gold lg:hidden"
            >
              <Menu className="h-4.5 w-4.5" strokeWidth={1.5} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-60 bg-ink/98 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-x flex h-24 items-center justify-between">
              <Wordmark />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-10 w-10 items-center justify-center border border-cream/15 text-cream"
              >
                <X className="h-4.5 w-4.5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="container-x mt-6">
              <ul>
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.07 * i + 0.12, duration: 0.6 }}
                    className="border-b border-cream/8"
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="display flex items-baseline gap-4 py-5 text-[2.4rem] text-cream/90 transition-colors hover:text-gold"
                    >
                      <span className="label-xs text-gold/50">
                        0{i + 1}
                      </span>
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-10 space-y-3">
                <a
                  href="#order"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary w-full"
                >
                  Order now
                </a>
                <a href={site.phone.href} className="btn btn-ghost w-full">
                  <Phone className="h-4 w-4" strokeWidth={1.6} />
                  {site.phone.display}
                </a>
                <p className="label-xs pt-5 text-center text-muted">
                  {site.address.full}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
