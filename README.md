# Dela Pizza Bar — Website

Marketing site for **Dela Pizza Bar**, 331 Prospect Road, Blair Athol SA 5084.
Built with Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS v4, Framer Motion and Lenis.

## Getting started

```bash
npm run dev
```

Then open http://localhost:3000

Other scripts:

```bash
npm run build
```

```bash
npm start
```

```bash
npm run lint
```

## Where the content lives

All business content is data-driven — there is no copy hard-coded inside layout components
that you would have to hunt for.

| File | What it holds |
| --- | --- |
| `lib/site.ts` | Name, phone, address, hours, Instagram, Uber Eats / DoorDash links, map URLs |
| `lib/menu.ts` | Full menu transcribed from the printed takeaway menu — five categories, three pizza sizes, combo deals, signature picks |
| `lib/reviews.ts` | Google Places API fetch, review types and the offline fallback |
| `lib/order.ts` | Order line types, totals and the plain-text order summary |
| `public/images/` | All photography (local — no external image hosts) |

Changing a price or a phone number is a one-line edit in `lib/`. Nothing else needs touching.

## Page structure

`app/page.tsx` composes the sections in order:

1. `Navbar` — sticky glass nav, theme toggle, mobile drawer, phone + Order CTA
2. `Hero` — full-bleed photography, parallax, headline, stat rail
3. `Marquee` — serif ticker strip
4. `Story` — brand story, framed imagery, three numbered pillars
5. `Signatures` — the three most-ordered pizzas, each addable
6. `ValueBand` — pricing / dine in / delivery / hours
7. `MenuSection` — tabbed full menu (L 12" / F 15" / P 18"), prices double as add buttons
8. `Deals` — the four pick-up combo deals
9. `Gallery` — scrolling photo strip + Instagram link
10. `OrderSection` — call, Uber Eats, DoorDash
11. `Testimonials` — live Google reviews
12. `Visit` — embedded map, full hours table, address / phone / Instagram
13. `Footer` — closing CTA, nav, contact

`OrderProvider` wraps the page and `OrderDrawer` renders the floating order bar and panel.

## Order builder

Customers build an order on the site itself instead of being bounced straight to a
delivery platform.

- **Adding**: every price in the menu *is* the add button — the column you tap is the size
  you get (L 12", F 15", P 18"). Signature cards and combo deals have explicit add buttons.
- **State**: `components/OrderProvider.tsx` keeps lines in a small external store read
  through `useSyncExternalStore`, persisted to `localStorage` under `dela-order`. The server
  renders an empty order and the client adopts the saved one on subscribe, so there is no
  hydration mismatch.
- **Checkout**: `components/OrderDrawer.tsx` shows the order, quantities and total, then
  offers *Call to order* (copies the summary and dials), *Copy order*, or a hand-off to
  Uber Eats / DoorDash.
- **No payments** are taken on the site; the total is confirmed on the phone. That is stated
  in the drawer.

## Google Reviews

The Reviews section, the headline rating and the `aggregateRating` in the structured data
all come from one cached call to the **Google Places API (New)** — no third-party review
widget, no external script, and the reviews render in the site's own design.

Set two variables in `.env.local` (see `.env.example`) and it goes live:

```bash
GOOGLE_PLACES_API_KEY=your-key
GOOGLE_PLACE_ID=ChIJ...
```

- **API key**: Google Cloud Console → new project → enable **Places API (New)** →
  Credentials → create an API key → restrict it to that one API. It is read server-side
  only and never reaches the browser.
- **Place ID**: paste `Dela Pizza Bar, 331 Prospect Rd, Blair Athol` into Google's
  [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id).

`lib/reviews.ts` fetches with `revalidate: 86400`, so the page stays static and Google is
called once a day regardless of traffic.

**Limits worth knowing** — these are Google's, not the site's:

- The API returns a **maximum of 5 reviews** and chooses which ones ("most relevant").
  No API tier returns all 240.
- Reviews cannot be filtered, reordered or edited — displaying them modified breaks
  Google's terms. The site shows them verbatim with the reviewer's name, photo and
  attribution link.

Until the keys are set — or if a request fails — `lib/reviews.ts` falls back to a curated
set of real Google reviews, so the section never renders empty or broken.

## Theming

Dark and light are both first-class. `app/globals.css` defines semantic tokens
(`ink`, `surface`, `cream`, `line`, `gold`) once and each theme redefines the raw values, so
components carry no `dark:` variants. `components/ThemeToggle.tsx` flips `data-theme` on
`<html>`; an inline script in `<head>` applies the stored choice before first paint.

Sections that sit on photography carry `.on-photo`, which pins them to the dark palette in
either theme so text stays white over an image.

Custom component classes live inside `@layer components` — that keeps Tailwind utilities
(`hidden`, `fixed`, `px-*`) winning over them at equal specificity.

## Design system

Tokens come from the Dela Pizza Bar card artwork, restrained for a premium read — the
brand red is reserved for actions, and champagne gold does the accent work:

| Token | Dark | Light |
| --- | --- | --- |
| `ink` (page) | `#0b0a09` | `#fbf8f3` |
| `surface` (card) | `#16130f` | `#ffffff` |
| `cream` (text) | `#f7f2e9` | `#1a1512` |
| `line` (hairline) | `#2b2620` | `#e0d8ca` |
| `gold` (accent) | `#d9b26a` | `#8a6118` |
| `brand` (action) | `#d92027` | `#c8161d` |

Type: **Instrument Serif** for display headings (`.display`, sentence case — never shouted,
with `.serif-italic` for the gold accent phrase), **Inter** for body and the `.eyebrow` /
`.label-xs` small caps. Both self-hosted through `next/font/google`.

Reusable classes: `.btn` + `.btn-primary` / `.btn-ghost` / `.btn-gold`, `.card`, `.glass`,
`.grain`, `.gold-line`, `.link-underline`, `.zoom-parent`, `.marquee-track`, `.rise-in`,
`.mask-up`, `.on-photo`.

The hero entrance uses CSS animations (`.rise-in` / `.mask-up`) rather than JS, so
above-the-fold copy is never left invisible if animation is throttled or fails.

## SEO

- Open Graph + Twitter card metadata in `app/layout.tsx`
- Generated share card at `app/opengraph-image.tsx` (1200×630, brand-typeset)
- `Restaurant` JSON-LD with address, phone, opening hours, aggregate rating and menu link
- `app/sitemap.ts` and `app/robots.ts`
- Brand favicon at `app/icon.svg`

Before going live, set the real domain in `lib/site.ts` (`site.url`) — it drives
`metadataBase`, the canonical URL, the sitemap and the JSON-LD.

## Images

Photography is stored locally in `public/images/` so the site has no runtime dependency on an
external image host. Replace these files with real photos of the shop and the pizzas when they
are available — keep the same filenames and nothing else needs to change.
