// src/components/Footer.tsx
import Link from "next/link";
import { COMPANY, } from "@/data/company";

export default function Footer() {

  return (
    <footer className="mt-10 border-t border-neutral-200 bg-[#f8f8f8] text-[#333]">
      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* NAP */}
        <section>
          <h2 className="text-xl font-bold">{COMPANY.legalName}</h2>
          <p className="mt-2">
            {COMPANY.addressLocality} {COMPANY.addressRegion} {COMPANY.postalCode}
          </p>
          <p className="mt-2">
            <a href={`tel:${COMPANY.phone}`} className="underline">
              {COMPANY.phone}
            </a>
            {" · "}
            <a href={`mailto:${COMPANY.email}`} className="underline">
              {COMPANY.email}
            </a>
          </p>
          {COMPANY.googleBusinessProfileUrl && (
            <p className="mt-2">
              <a href={COMPANY.googleBusinessProfileUrl} target="_blank" rel="noopener" className="underline">
                Google Business Profile
              </a>
            </p>
          )}
          {COMPANY.googleBusinessReviewUrl && (
            <p className="mt-2">
              <a href={COMPANY.googleBusinessReviewUrl} target="_blank" rel="noopener" className="underline">
                Leave a review
              </a>
            </p>
          )}
        </section>

        {/* Hours */}
        <section>
          <h2 className="text-xl font-bold">Hours</h2>
          <ul className="mt-2 space-y-1">
            {COMPANY.openingHours.map(({ days, opens, closes }) => (
              <li key={days.join(",")}>
                <span className="font-medium">{days.join(", ")}</span>: {opens}–{closes}
              </li>
            ))}
          </ul>

        </section>

        {/* Map */}
        <section className="lg:col-span-1">
          <h3 className="sr-only">Service area</h3>
          <div className="mt-2 aspect-[3/4] w-full overflow-hidden rounded-md border">
            <iframe
              title="Service area map"
              src="https://www.google.com/maps/d/u/0/embed?mid=1RyiRpLlpJhTqVsfaweBlWBJbvLj1IQ0&ehbc=2E312F"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          </div>
          <noscript>
            <a href="https://www.google.com/maps/d/u/0/embed?mid=1RyiRpLlpJhTqVsfaweBlWBJbvLj1IQ0&ehbc=2E312F">
              View service area map
            </a>
          </noscript>
        </section>
      </div>

      <div className="border-t border-neutral-200 py-4 text-center text-sm">
        <div><img src="/logos/greyicon.svg" alt="" className="h-8 w-auto mx-auto mb-2 block" /></div>
        © {new Date().getFullYear()} {COMPANY.legalName}
      </div>
    </footer>
  );
}
