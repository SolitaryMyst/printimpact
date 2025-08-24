// src/pages/corporate-print-perth.tsx
import type { GetStaticProps, NextPage } from "next";
import { getCorporateImages } from "@/data/corporateImages";
import type { CorporateImage } from "@/data/corporateImages";
import type { PageHeaderConfig } from "@/types/page";
import type { JSX as JSXReact } from "react";

/** Page props */
type Props = { images: CorporateImage[] };

/** Inline SVG icons */
type IconName = "shield" | "check" | "factory" | "bolt" | "map";
const Icons: Record<IconName, (props: { className?: string }) => JSXReact.Element> = {
  shield: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="#0e7dc2" className={className}>
      <path d="M12 3l7 3v6c0 4.4-3 8.4-7 9-4-0.6-7-4.6-7-9V6l7-3z" />
    </svg>
  ),
  check: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="#0e7dc2" className={className}>
      <path d="M20 6l-11 11-5-5 2-2 3 3 9-9z" />
    </svg>
  ),
  factory: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="#0e7dc2" className={className}>
      <path d="M2 21h20v-8l-6 3v-3l-6 3V8L6 10V5H2v16z" />
    </svg>
  ),
  bolt: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="#0e7dc2" className={className}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  map: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="#0e7dc2" className={className}>
      <path d="M15 6l-6 2-4-2v12l4 2 6-2 4 2V8l-4-2z" />
    </svg>
  ),
};

/** Copy blocks above the grid */
type SectionItem = { text: string; icon?: IconName };
type Section = { title: string; items: SectionItem[] };

const INTRO =
  "Corporate printing in Perth with brand consistency across every touchpoint. Letterheads, business cards, envelopes, stationery kits, plus branded merchandise and wearables with fast, accurate fulfilment.";

const SECTIONS: Section[] = [
  {
    title: "Letterheads & Compliments Slips",
    items: [
      {
        icon: "check",
        text:
          "Premium uncoated and smooth stocks, laser-safe. CMYK or spot colours with exacting brand control. Optional watermarking and security tints.",
      },
      {
        icon: "factory",
        text:
          "With Compliments slips and memo sheets matched to your letterhead stock and colour. Packed flat, ream-wrapped, and labelled for easy office distribution.",
      },
    ],
  },
  {
    title: "Business Cards & Stationery",
    items: [
      {
        icon: "bolt",
        text:
          "Standard and luxury cards with matte, satin, or soft touch. Spot UV, foils, and rounded corners available. Multi-name runs and staff onboarding packs supported.",
      },
      {
        icon: "check",
        text:
          "Stationery kits: folders, notepads, compendiums, and presentation covers. Print-ready templates ensure consistent margins and typography.",
      },
    ],
  },
  {
    title: "Envelopes & Mailers",
    items: [
      {
        icon: "map",
        text:
          "DL, C5, C4 with or without windows. Secretive and security patterns. Peel-and-seal or lick-and-stick. Return address and Permit imprint options.",
      },
      {
        icon: "factory",
        text:
          "Bulk addressing and barcoding supported. Match-inserts for letters and brochures. Cartoned and palletised for staged mailouts across Perth.",
      },
    ],
  },
  {
    title: "Merch & Wearables",
    items: [
      {
        icon: "shield",
        text:
          "Branded pens, notebooks, drinkware, lanyards, USBs, tech accessories, and desk items. Durable marks with pad, screen, or laser engraving.",
      },
      {
        icon: "check",
        text:
          "Wearables including tees, polos, hoodies, caps, and hi-vis. Embroidery or print to Pantone targets. Size runs packed by staff list on request.",
      },
    ],
  },
];

/** Utils */
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Page */
type WithHeader = NextPage<Props> & { pageHeader?: PageHeaderConfig };

const CorporatePrintPerth: WithHeader = ({ images }) => {
  return (
    <main id="main">
      {/* Descriptive content ABOVE the image grid */}
      <article className="mx-auto max-w-7xl px-4 pt-6">
        <p className="text-neutral-800 font-bold">
          {INTRO} <a href="/contact" className="ml-3 underline"> Get a quote</a>.
        </p>

        {/* Sections inline: 1 col (sm), 2 cols (md), 4 cols (lg) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SECTIONS.map(({ title, items }) => {
            const base = slugify(title);
            // Anchor fix: #<base> with separate heading id
            const sectionId = base;
            const headingId = `${base}-h`;

            return (
              <section key={sectionId} id={sectionId} aria-labelledby={headingId} className="space-y-4">
                <h2 id={headingId} className="text-2xl font-semibold">
                  {title}
                </h2>

                <ul className="space-y-3">
                  {items.map(({ text, icon }, i) => {
                    const Icon = icon ? Icons[icon] : null;
                    return (
                      <li key={i} className="flex items-start gap-3">
                        {Icon ? <Icon className="h-5 w-5 mt-1 shrink-0" /> : null}
                        <p className="text-neutral-800">{text}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </article>

      {/* Image grid BELOW the descriptive content */}
      <div className="mx-auto px-4 mt-8">
        <div
          className="
            grid gap-4
            grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8
            [grid-auto-rows:10rem] md:[grid-auto-rows:12rem]
            grid-flow-dense
            justify-center
          "
        >
          {images.map((img) => {
            const landscape = img.width >= img.height;
            return (
              <figure
                key={img.src}
                className={`relative rounded-lg overflow-hidden bg-transparent ${
                  landscape ? "col-span-2 row-span-1" : "col-span-2 row-span-2"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  width={img.width}
                  height={img.height}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </figure>
            );
          })}
        </div>
      </div>
    </main>
  );
};

/** Header config consumed by <PageHeader /> */
CorporatePrintPerth.pageHeader = {
  title: "Corporate Printing",
  items: [
    "Letterheads & Compliments Slips",
    "Business Cards & Stationery",
    "Envelopes & Mailers",
    "Merch & Wearables",
  ],
  description:
    "Corporate printing in Perth. Letterheads, business cards, envelopes, stationery kits, merch and wearables with accurate brand control and fast fulfilment.",
  canonical: "/corporate-print-perth",
  emitStructuredData: true,
};

export default CorporatePrintPerth;

/** Static props */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getCorporateImages();
  return { props: { images } };
};
