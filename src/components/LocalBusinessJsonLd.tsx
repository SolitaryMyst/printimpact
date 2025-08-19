// src/components/LocalBusinessJsonLd.tsx
import Head from "next/head";
import { COMPANY } from "@/data/company";

function toOpeningHoursSpecification() {
  return COMPANY.openingHours.flatMap(({ days, opens, closes }) =>
    days.map((d) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: d, opens, closes })),
  );
}

export default function LocalBusinessJsonLd() {
  const address = {
    "@type": "PostalAddress",
    streetAddress: COMPANY.streetAddress,
    addressLocality: COMPANY.addressLocality,
    addressRegion: COMPANY.addressRegion,
    postalCode: COMPANY.postalCode,
    addressCountry: COMPANY.addressCountry,
  };

  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${COMPANY.url}#localbusiness`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: COMPANY.url,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    address,
    image: `${COMPANY.url}/logos/wrect.svg`,
    logo: `${COMPANY.url}/logos/wrect.svg`,
    sameAs: COMPANY.sameAs?.length ? COMPANY.sameAs : undefined,
    hasMap: COMPANY.googleBusinessProfileUrl,
    openingHoursSpecification: toOpeningHoursSpecification(),
    areaServed: { "@type": "AdministrativeArea", name: "Perth, WA" },
    geo:
      COMPANY.geo.latitude && COMPANY.geo.longitude
        ? { "@type": "GeoCoordinates", latitude: COMPANY.geo.latitude, longitude: COMPANY.geo.longitude }
        : undefined,
    priceRange: "$$",
  };

  return (
    <Head>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
    </Head>
  );
}
