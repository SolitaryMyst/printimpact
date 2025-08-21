// src/data/company.ts
// Single source of truth for NAP + metadata. Fill TODOs.
export const COMPANY = {
  legalName: "Print Impact Pty Ltd",
  name: "Print Impact",
  streetAddress: "",            // e.g., "12 Example St"
  addressLocality: "East Fremantle",
  addressRegion: "WA",
  postalCode: "6158",
  addressCountry: "AU",
  phone: "+61414479269",                // E.164 preferred
  email: "contact@printimpact.com.au",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://printimpact.com.au",
  googleBusinessProfileUrl: "https://g.page/r/CZ7nsfhK2Mr-EBM", // TODO
  googleBusinessReviewUrl: "https://g.page/r/CZ7nsfhK2Mr-EBM/review", // TODO
  sameAs: [
    // Add profiles you actually use. Remove if none.
    // "https://www.instagram.com/…",
    // "https://www.facebook.com/…",
    // "https://www.linkedin.com/company/…",
  ],
  openingHours: [
    // 24h format, local time
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
    // { days: ["Saturday"], opens: "09:00", closes: "12:00" },
  ],
  geo: {
    // Optional. Fill if known.
    latitude: undefined as number | undefined,
    longitude: undefined as number | undefined,
  },
};

export function buildMapEmbedSrc() {
  const a = `${COMPANY.streetAddress}, ${COMPANY.addressLocality} ${COMPANY.addressRegion} ${COMPANY.postalCode}`;
  const q = encodeURIComponent(a);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}
