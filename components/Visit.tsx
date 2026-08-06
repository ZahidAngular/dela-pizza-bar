import { MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export function Visit() {
  return (
    <section id="visit" className="relative bg-ink py-28 lg:py-40">
      <div className="container-x">
        <SectionHeading
          index="05"
          eyebrow="Visit us"
          title="331 Prospect Road,"
          accent="Blair Athol."
          description="Free street parking out front. Dine in at the counter or take it away — we're open every day of the week."
        />

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          {/* Map */}
          <Reveal className="relative min-h-[24rem] overflow-hidden border border-line lg:min-h-full">
            <iframe
              src={site.address.embedUrl}
              title={`Map to ${site.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full grayscale-[0.4] contrast-105"
            />
          </Reveal>

          {/* Details */}
          <div className="flex flex-col gap-8">
            <Reveal className="border border-line bg-surface p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
                <h3 className="display text-[1.6rem] text-cream">
                  Opening hours
                </h3>
                <span className="label-xs text-gold">Open 7 days</span>
              </div>

              <ul className="mt-2">
                {site.hours.days.map((d) => (
                  <li
                    key={d.day}
                    className="flex items-center justify-between border-b border-line/70 py-3 text-[0.88rem] last:border-b-0"
                  >
                    <span className="text-cream/60">{d.day}</span>
                    <span className="text-cream/90">
                      {d.open} – {d.close}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12} className="grid gap-px bg-line sm:grid-cols-3">
              <a
                href={site.address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-ink p-6 transition-colors duration-500 hover:bg-surface"
              >
                <MapPin className="h-5 w-5 text-gold" strokeWidth={1.4} />
                <p className="label-xs mt-5 text-muted">Address</p>
                <p className="display mt-2 text-[1.05rem] leading-snug text-cream transition-colors duration-500 group-hover:text-gold">
                  {site.address.street}
                  <br />
                  {site.address.suburb} {site.address.state}
                </p>
              </a>

              <a
                href={site.phone.href}
                className="group flex flex-col bg-ink p-6 transition-colors duration-500 hover:bg-surface"
              >
                <Phone className="h-5 w-5 text-gold" strokeWidth={1.4} />
                <p className="label-xs mt-5 text-muted">Phone</p>
                <p className="display mt-2 text-[1.05rem] leading-snug text-cream transition-colors duration-500 group-hover:text-gold">
                  {site.phone.display}
                </p>
              </a>

              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col bg-ink p-6 transition-colors duration-500 hover:bg-surface"
              >
                <InstagramIcon className="h-5 w-5 text-gold" strokeWidth={1.4} />
                <p className="label-xs mt-5 text-muted">Instagram</p>
                <p className="display mt-2 text-[1.05rem] leading-snug text-cream transition-colors duration-500 group-hover:text-gold">
                  {site.social.instagramHandle}
                </p>
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
