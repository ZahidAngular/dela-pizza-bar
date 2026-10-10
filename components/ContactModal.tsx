"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Phone, RotateCcw, X } from "lucide-react";
import { useContactModal } from "@/components/ContactProvider";
import { preloadRecaptcha, submitLead } from "@/lib/formService";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const EASE = [0.16, 1, 0.3, 1] as const;

/* Fields sit on ink-2 rather than the panel's own surface: on the light
   theme white-on-white left them almost invisible. The global focus ring
   is swapped for a tight inset one — an offset outline reads as detached
   on a boxed input. */
const field =
  "mt-2.5 w-full border border-line bg-ink-2 px-4 py-3.5 text-[0.9rem] text-cream " +
  "placeholder:text-muted/70 transition-colors duration-300 hover:border-line " +
  "focus:border-gold focus-visible:border-gold focus-visible:outline-none " +
  "focus-visible:ring-1 focus-visible:ring-gold/45";

const fieldStagger = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

export function ContactModal() {
  const { open, setOpen } = useContactModal();
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  /* reCAPTCHA is a third-party script — it loads when the dialog opens
     rather than on page load, so it costs nothing to visitors who never
     open it. The disclosure in the footer of the form covers Google's
     attribution requirement. */
  useEffect(() => {
    if (!open) return;
    preloadRecaptcha();
  }, [open]);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      // After the entrance transform has settled, so focus doesn't scroll
      // the panel mid-animation.
      const id = window.setTimeout(() => firstFieldRef.current?.focus(), 260);
      return () => window.clearTimeout(id);
    }
    returnFocusRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      // Keep the tab ring inside the dialog while it is modal.
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      await submitLead({
        fullName: String(data.get("fullName") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        comment: String(data.get("message") ?? "").trim(),
      });
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(
        "That didn't go through. Please try again, or give us a call — we always pick up."
      );
    }
  }

  function close() {
    setOpen(false);
    // Reset only once the exit animation is done, so the panel doesn't
    // visibly flip back to the empty form on the way out.
    window.setTimeout(() => {
      setStatus("idle");
      setError("");
    }, 400);
  }

  /* One keyed motion element is AnimatePresence's direct child: it cannot
     track a Fragment, and left as one the backdrop stayed mounted at
     opacity 0 — an invisible sheet over the whole page. The panel rides the
     same variant label, so it still scales on the way out. */
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="contact-modal"
          className="fixed inset-0 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE }}
        >
          <div
            onClick={close}
            className="absolute inset-0 bg-black/70 backdrop-blur-[4px]"
          />

          <div className="absolute inset-0 flex items-center justify-center overflow-y-auto p-4 sm:p-6">
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              initial={{ opacity: 0, y: 26, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: EASE }}
              className="relative my-auto w-full max-w-xl border border-line bg-surface shadow-key"
            >
              {/* Hairline in the brand colours — the only ornament, and the
                  same gold-rule language the page sections use. */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-brand via-gold to-transparent"
              />

              {/* Header */}
              <div className="flex items-start justify-between gap-6 border-b border-line px-7 py-7 sm:px-10">
                <div>
                  <span className="flex items-center gap-4">
                    <span className="gold-line" />
                    <span className="eyebrow text-gold">Contact us</span>
                  </span>
                  <h2
                    id="contact-title"
                    className="display mt-5 text-[1.85rem] leading-tight text-cream sm:text-[2.1rem]"
                  >
                    Got a question?
                    <span className="serif-italic"> Ask away.</span>
                  </h2>
                  <p className="mt-3 max-w-[42ch] text-[0.85rem] leading-relaxed text-body-soft">
                    Catering, a party-size order or a booking — we answer every
                    message during opening hours.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close contact form"
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-cream transition-colors hover:border-gold hover:text-gold"
                >
                  <X className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>

              {/* Body */}
              <div className="px-7 py-8 sm:px-10 sm:py-9">
                {/* Deliberately not an AnimatePresence: a nested one here
                    stopped the dialog's own exit from ever completing, which
                    left an invisible sheet swallowing clicks on the page.
                    Each view just animates in on mount instead. */}
                {status === "sent" ? (
                  <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="flex min-h-[19rem] flex-col items-center justify-center text-center"
                    >
                      <motion.span
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
                        className="flex h-14 w-14 items-center justify-center border border-gold/40 text-gold"
                      >
                        <Check className="h-6 w-6" strokeWidth={1.5} />
                      </motion.span>
                      <h3 className="display mt-7 text-[1.8rem] text-cream">
                        Message sent.
                      </h3>
                      <p className="mt-3 max-w-[34ch] text-[0.9rem] leading-relaxed text-body">
                        Thanks for getting in touch — we&apos;ll come back to
                        you shortly. If it&apos;s urgent, {site.phone.display}{" "}
                        is faster.
                      </p>
                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={() => setStatus("idle")}
                          className="btn btn-ghost py-3.5"
                        >
                          <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.7} />
                          Send another
                        </button>
                        <button
                          type="button"
                          onClick={close}
                          className="btn btn-primary py-3.5"
                        >
                          Done
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                  <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, ease: EASE }}
                    >
                      {/* A disabled fieldset freezes every control at once
                          while the lead is in flight. */}
                      <fieldset
                        disabled={status === "sending"}
                        className="transition-opacity duration-300 disabled:opacity-55"
                      >
                        <motion.div
                          initial="hidden"
                          animate="show"
                          transition={{ staggerChildren: 0.07, delayChildren: 0.14 }}
                          className="grid gap-5 sm:grid-cols-2"
                        >
                          <motion.div
                            variants={fieldStagger}
                            className="sm:col-span-2"
                          >
                            <label
                              htmlFor="c-name"
                              className="label-xs text-muted"
                            >
                              Full name <span className="text-gold">*</span>
                            </label>
                            <input
                              ref={firstFieldRef}
                              id="c-name"
                              name="fullName"
                              type="text"
                              required
                              autoComplete="name"
                              placeholder="Your name"
                              className={field}
                            />
                          </motion.div>

                          <motion.div variants={fieldStagger}>
                            <label
                              htmlFor="c-email"
                              className="label-xs text-muted"
                            >
                              Email <span className="text-gold">*</span>
                            </label>
                            <input
                              id="c-email"
                              name="email"
                              type="email"
                              required
                              autoComplete="email"
                              placeholder="you@email.com"
                              className={field}
                            />
                          </motion.div>

                          <motion.div variants={fieldStagger}>
                            <label
                              htmlFor="c-phone"
                              className="label-xs text-muted"
                            >
                              Phone
                            </label>
                            <input
                              id="c-phone"
                              name="phone"
                              type="tel"
                              autoComplete="tel"
                              placeholder="Optional"
                              className={field}
                            />
                          </motion.div>

                          <motion.div
                            variants={fieldStagger}
                            className="sm:col-span-2"
                          >
                            <label
                              htmlFor="c-message"
                              className="label-xs text-muted"
                            >
                              Message <span className="text-gold">*</span>
                            </label>
                            <textarea
                              id="c-message"
                              name="message"
                              required
                              rows={4}
                              placeholder="Catering, a big order, a booking — how can we help?"
                              className={`${field} resize-y`}
                            />
                          </motion.div>
                        </motion.div>
                      </fieldset>

                      {status === "error" ? (
                        <p
                          role="alert"
                          className="mt-5 border-l-2 border-brand-bright px-4 py-3 text-[0.85rem] leading-relaxed text-body"
                        >
                          {error}
                        </p>
                      ) : null}

                      <div className="mt-8 grid gap-3 sm:grid-cols-[1.35fr_1fr]">
                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="btn btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {status === "sending" ? "Sending…" : "Send message"}
                        </button>
                        <a
                          href={site.phone.href}
                          className="btn btn-ghost w-full"
                        >
                          <Phone className="h-4 w-4" strokeWidth={1.6} />
                          {site.phone.display}
                        </a>
                      </div>

                      <p className="mt-7 border-t border-line-soft pt-5 text-center text-[0.7rem] leading-relaxed text-muted">
                        Protected by reCAPTCHA — the Google{" "}
                        <a
                          href="https://policies.google.com/privacy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 transition-colors hover:text-gold"
                        >
                          Privacy Policy
                        </a>{" "}
                        and{" "}
                        <a
                          href="https://policies.google.com/terms"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-2 transition-colors hover:text-gold"
                        >
                          Terms of Service
                        </a>{" "}
                        apply.
                      </p>
                    </motion.form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
