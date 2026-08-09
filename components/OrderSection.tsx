import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem, Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

const channels = [
  {
    n: "01",
    title: "Call & collect",
    subtitle: site.phone.display,
    body: "The fastest and cheapest way. Ring the shop, tell us when you're coming, walk in and collect.",
    href: site.phone.href,
    cta: "Call the shop",
    featured: true,
  },
  {
    n: "02",
    title: "Uber Eats",
    subtitle: "Delivery & pickup",
    body: "Full menu, live tracking and delivery across Prospect, Blair Athol and the inner north.",
    href: site.ordering.uberEats,
    cta: "Order on Uber Eats",
  },
  {
    n: "03",
    title: "DoorDash",
    subtitle: "Delivery & pickup",
    body: "Prefer DoorDash? We're listed there too — same kitchen, same pizzas, same prices.",
    href: site.ordering.doorDash,
    cta: "Order on DoorDash",
  },
];

export function OrderSection() {
  return (
    <section
      id="order"
      className="on-photo relative overflow-hidden bg-ink py-28 lg:py-40"
    >
      <div className="absolute inset-0 opacity-20">
        <Image
          src="/images/order-bg.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/92 to-ink" />

      <div className="container-x relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-4">
            <span className="label-xs text-gold">04</span>
            <span className="eyebrow text-gold">Order</span>
          </div>
          <h2 className="display mt-6 text-[2.35rem] text-cream sm:text-[3.1rem] lg:text-[3.7rem]">
            Three ways to get Dela
            <span className="serif-italic"> to your table.</span>
          </h2>
          <p className="mt-6 text-[0.95rem] leading-[1.8] text-body">
            Dine in on Prospect Road, pick it up on your way home, or have it
            delivered — whichever suits the night.
          </p>
        </Reveal>

        <RevealGroup className="mt-20 grid border-t border-line md:grid-cols-3">
          {channels.map((c, i) => (
            <RevealItem key={c.title}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`group flex h-full flex-col p-8 transition-colors duration-500 lg:p-10 ${
                  i > 0 ? "border-t border-line md:border-t-0 md:border-l" : ""
                } ${
                  c.featured
                    ? "bg-surface hover:bg-surface-2"
                    : "hover:bg-surface"
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="label-xs text-gold">{c.n}</span>
                  <ArrowUpRight
                    className="h-5 w-5 text-cream/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                    strokeWidth={1.4}
                  />
                </div>

                <h3 className="display mt-10 text-[1.85rem] text-cream transition-colors duration-500 group-hover:text-gold">
                  {c.title}
                </h3>
                <p className="label-xs mt-2.5 text-gold">{c.subtitle}</p>
                <p className="mt-5 flex-1 text-[0.88rem] leading-[1.75] text-body-soft">
                  {c.body}
                </p>

                <span className="mt-9 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-cream/80 transition-colors duration-500 group-hover:text-gold">
                  {c.cta}
                </span>
              </a>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="label-xs mt-14 text-center text-muted">
          Open 7 days · 11:00 am – 10:00 pm · {site.address.full}
        </p>
      </div>
    </section>
  );
}
