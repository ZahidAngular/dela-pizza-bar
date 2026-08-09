import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { Wordmark } from "@/components/Logo";
import { site } from "@/lib/site";

const nav = [
  { label: "Our story", href: "#story" },
  { label: "Signatures", href: "#signatures" },
  { label: "Menu", href: "#menu" },
  { label: "Reviews", href: "#reviews" },
  { label: "Visit", href: "#visit" },
  { label: "Order", href: "#order" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-line bg-ink-2">
      <div className="container-x py-24 lg:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div>
            <span className="eyebrow text-gold">Hungry?</span>
            <p className="display mt-6 text-[2.5rem] leading-[0.98] text-cream sm:text-[3.4rem] lg:text-[4.1rem]">
              The pizza&apos;s ready
              <span className="serif-italic"> when you are.</span>
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href={site.phone.href} className="btn btn-primary">
                <Phone className="h-4 w-4" strokeWidth={1.6} />
                {site.phone.display}
              </a>
              <a
                href={site.ordering.uberEats}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                Order delivery
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10">
            <div>
              <p className="label-xs text-muted">Explore</p>
              <ul className="mt-6 space-y-3">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a
                      href={n.href}
                      className="link-underline text-[0.88rem] text-body transition-colors hover:text-cream"
                    >
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="label-xs text-muted">Find us</p>
              <ul className="mt-6 space-y-5 text-[0.88rem] leading-relaxed text-body">
                <li className="flex gap-3">
                  <MapPin
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />
                  <a
                    href={site.address.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    {site.address.street}
                    <br />
                    {site.address.suburb} {site.address.state}{" "}
                    {site.address.postcode}
                  </a>
                </li>
                <li className="flex gap-3">
                  <Phone
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />
                  <a
                    href={site.phone.href}
                    className="transition-colors hover:text-gold"
                  >
                    {site.phone.display}
                  </a>
                </li>
                <li className="flex gap-3">
                  <InstagramIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-gold"
                  >
                    {site.social.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-6 py-8 sm:flex-row">
          <Wordmark />
          <p className="text-center text-[0.75rem] text-muted sm:text-left">
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p className="label-xs text-muted">{site.hours.summary}</p>
        </div>
      </div>
    </footer>
  );
}
