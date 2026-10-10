/**
 * Where this site reads its admin-managed settings from.
 *
 * The site name must match the site name created for this site in the Multi-Site
 * Admin dashboard - the API looks the site up by it.
 */
export const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://multisiteapi.runasp.net";

export const SITE_NAME =
  process.env.NEXT_PUBLIC_SITE_NAME ?? "Dela-Pizza-Bar";
