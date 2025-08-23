// src/data/company.ts
// Single source of truth for NAP + metadata. Fill TODOs.
export const COMPANY = {
  legalName: "Print Impact Pty Ltd",
  name: "Print Impact",
  //streetAddress: "",            // e.g., "12 Example St"
  addressLocality: "Perth",
  addressRegion: "WA",
  postalCode: "6000",
  addressCountry: "AU",
  phone: "+61414479269",                // E.164 preferred
  email: "contact@printimpact.com.au",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://printimpact.com.au",
  googleBusinessProfileUrl: "https://g.page/r/CQohnk-5ce--EBM", // TODO
  googleBusinessReviewUrl: "https://g.page/r/CQohnk-5ce--EBM/review", // TODO
  sameAs: [
    // Add profiles you actually use. Remove if none.
    // "https://www.instagram.com/…",
    // "https://www.facebook.com/…",
    // "https://www.linkedin.com/company/…",
  ],

  serviceAreas: [
    "Perth WA",
    "Coogee WA 6166",
    "Hilton WA 6163",
    "Malaga WA 6090",
    "Palmyra WA 6157",
    "Attadale WA 6156",
    "Bayswater WA 6053",
    "Fremantle WA 6160",
    "Osborne Park WA 6017",
    "East Fremantle WA 6158",
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


