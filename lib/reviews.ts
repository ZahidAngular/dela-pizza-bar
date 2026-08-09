import { site } from "@/lib/site";

export type Review = {
  id: string;
  quote: string;
  author: string;
  authorUrl?: string;
  photoUrl?: string;
  rating: number;
  when: string;
};

export type ReviewsData = {
  rating: number;
  total: number;
  reviews: Review[];
  /** True when the data came from Google, false when the curated fallback is used. */
  live: boolean;
  mapsUri: string;
};

/**
 * Shown when the Places API isn't configured yet, or if a request fails.
 * These are real Google reviews, transcribed — the site should never render
 * an empty reviews section.
 */
const fallback: Review[] = [
  {
    id: "fallback-1",
    quote:
      "The pizzas are always delicious. Most of the time I order ahead and they always get fresh and hot pizza.",
    author: "Mehrab Sadik",
    rating: 5,
    when: "Google review",
  },
  {
    id: "fallback-2",
    quote:
      "The customer service was genuinely amazing — super welcoming, friendly, and respectful the whole time.",
    author: "Les Ho",
    rating: 5,
    when: "Google review",
  },
  {
    id: "fallback-3",
    quote:
      "Dela Pizza Bar does not try to be fancy — just honest, tasty pizza with generous toppings and a smile.",
    author: "Moh",
    rating: 4,
    when: "Google review",
  },
];

const FALLBACK_DATA: ReviewsData = {
  rating: 3.7,
  total: 240,
  reviews: fallback,
  live: false,
  mapsUri: site.address.mapsUrl,
};

type PlacesReview = {
  name?: string;
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: {
    displayName?: string;
    uri?: string;
    photoUri?: string;
  };
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
};

/**
 * Pulls the live rating and reviews straight from Google's Places API so the
 * section stays current without anyone editing code.
 *
 * Needs two environment variables (see .env.example):
 *   GOOGLE_PLACES_API_KEY — server-side only, never exposed to the browser
 *   GOOGLE_PLACE_ID       — the Place ID for the shop
 *
 * Google returns at most five reviews and picks which ones; that is a platform
 * limit, not something the site can widen.
 */
export async function getReviews(): Promise<ReviewsData> {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!key || !placeId) return FALLBACK_DATA;

  try {
    const res = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": key,
          "X-Goog-FieldMask":
            "rating,userRatingCount,googleMapsUri,reviews.name,reviews.rating,reviews.text,reviews.originalText,reviews.relativePublishTimeDescription,reviews.authorAttribution",
        },
        // Refetch once a day — reviews don't need to be realtime, and this
        // keeps the page static and the API bill flat.
        next: { revalidate: 86400 },
      }
    );

    if (!res.ok) return FALLBACK_DATA;

    const data = (await res.json()) as PlacesResponse;

    const reviews: Review[] = (data.reviews ?? [])
      .map((r, i): Review | null => {
        const quote = (r.text?.text ?? r.originalText?.text ?? "").trim();
        const author = r.authorAttribution?.displayName?.trim();
        if (!quote || !author) return null;

        return {
          id: r.name ?? `google-${i}`,
          quote,
          author,
          authorUrl: r.authorAttribution?.uri,
          photoUrl: r.authorAttribution?.photoUri,
          rating: r.rating ?? 5,
          when: r.relativePublishTimeDescription ?? "Google review",
        };
      })
      .filter((r): r is Review => r !== null);

    if (reviews.length === 0) return FALLBACK_DATA;

    return {
      rating: data.rating ?? FALLBACK_DATA.rating,
      total: data.userRatingCount ?? FALLBACK_DATA.total,
      reviews,
      live: true,
      mapsUri: data.googleMapsUri ?? site.address.mapsUrl,
    };
  } catch {
    // Network blip or bad config shouldn't take the section down.
    return FALLBACK_DATA;
  }
}
