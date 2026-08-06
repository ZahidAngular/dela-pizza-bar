import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { themeInitScript } from "@/components/ThemeToggle";
import { site } from "@/lib/site";

const displaySerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Stone-Baked Pizza in Blair Athol, Adelaide`,
    template: `%s | ${site.name}`,
  },
  description: site.shortDescription,
  keywords: [
    "pizza Blair Athol",
    "pizza Prospect Road",
    "Dela Pizza Bar",
    "pizza delivery Adelaide",
    "fish and chips Blair Athol",
    "takeaway Prospect SA",
    "best pizza Adelaide inner north",
  ],
  applicationName: site.name,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Stone-Baked Pizza in Blair Athol`,
    description: site.shortDescription,
    // The card image comes from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Stone-Baked Pizza in Blair Athol`,
    description: site.shortDescription,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0a09" },
    { media: "(prefers-color-scheme: light)", color: "#fbf8f3" },
  ],
  colorScheme: "dark light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  image: `${site.url}/images/hero.jpg`,
  url: site.url,
  telephone: site.phone.intl,
  priceRange: "$$",
  servesCuisine: ["Pizza", "Fish and Chips", "Takeaway"],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.suburb,
    addressRegion: site.address.state,
    postalCode: site.address.postcode,
    addressCountry: "AU",
  },
  sameAs: [
    site.social.instagram,
    site.ordering.uberEats,
    site.ordering.doorDash,
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "3.7",
    reviewCount: "240",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: site.hours.opensAt,
      closes: site.hours.closesAt,
    },
  ],
  acceptsReservations: "False",
  hasMenu: `${site.url}/#menu`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      data-theme="dark"
      suppressHydrationWarning
      className={`${displaySerif.variable} ${inter.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
