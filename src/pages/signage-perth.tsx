// src/pages/signage-perth.tsx
import type { GetStaticProps, NextPage } from "next";
import { getSignageImages } from "@/data/signageImages";
import type { SignageImage } from "@/data/signageImages";
import type { PageHeaderConfig } from "@/types/page";
import type { JSX as JSXReact } from "react";

/** Page props */
type Props = { images: SignageImage[] };

/** Inline SVG icons */
type IconName = "shield" | "check" | "factory" | "bolt" | "map";
const Icons: Record<IconName, (props: { className?: string }) => JSXReact.Element> = {
  shield: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 3l7 3v6c0 4.4-3 8.4-7 9-4-0.6-7-4.6-7-9V6l7-3z" />
    </svg>
  ),
  check: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M20 6l-11 11-5-5 2-2 3 3 9-9z" />
    </svg>
  ),
  factory: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M2 21h20v-8l-6 3v-3l-6 3V8L6 10V5H2v16z" />
    </svg>
  ),
  bolt: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
    </svg>
  ),
  map: ({ className }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M15 6l-6 2-4-2v12l4 2 6-2 4 2V8l-4-2z" />
    </svg>
  ),
};

/** Copy blocks above the grid */
type SectionItem = { text: string; icon?: IconName };
type Section = { title: string; items: SectionItem[] };

const INTRO =
  "We design, manufacture, and install business signage across Perth. From WHS-compliant safety signs to brand signage and custom whiteboards, our in-house team handles artwork, print, and on-site installation for fast, durable results.";

const SECTIONS: Section[] = [
  {
    title: "WHS Signs",
    items: [
      {
        icon: "shield",
        text:
          "Compliant safety signage for warehouses, healthcare, education, and construction. Mandatory, prohibition, hazard, emergency, and wayfinding sets in reflective, laminated, or aluminium substrates.",
      },
      {
        icon: "map",
        text:
          "Artwork aligned to site plans and risk registers. Anti-graffiti laminate and UV-stable inks. Perth metro delivery and installation on request.",
      },
    ],
  },
  {
    title: "Brand Signage",
    items: [
      {
        icon: "factory",
        text:
          "Exterior and interior assets: fascia signs, window graphics, wall wraps, pylons, and reception signs. Colour-accurate production to your brand guidelines.",
      },
      {
        icon: "check",
        text:
          "ACM panels, Routered letters & panels, frost films, and removable campaigns. Maintenance and change-outs available.",
      },
    ],
  },
  {
    title: "Custom whiteboards",
    items: [
      {
        icon: "check",
        text:
          "Printed whiteboards for production, healthcare, and education. KPI grids, magnets, and status columns. Non-ghosting surfaces with steel backing.",
      },
      {
        icon: "bolt",
        text:
          "Wall-mounted or mobile frames. Oversize formats. Include logos, safety zones, and colour codes for quick daily stand-ups.",
      },
    ],
  },
  {
    title: "Procedure & Safety",
    items: [
      {
        icon: "shield",
        text:
          "Procedure boards and critical-control signage for production cells and labs. Wipe-clean with QR codes linking to SOPs. Layouts prioritise legibility.",
      },
      {
        icon: "check",
        text:
          "Take 5 Books with reusable sleeves. Variable numbering NCR books for any use.",
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

const Signage: WithHeader = ({ images }) => {
  return (
    <main id="main">
      {/* Descriptive content ABOVE the image grid */}
      <article className="mx-auto max-w-7xl px-4 pt-6">
        <p className="text-neutral-800 font-bold">
          {INTRO} <a href="/contact" className="underline">Request a quote</a>.
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
                <h2 id={headingId} className="text-2xl font-semibold">{title}</h2>

                {/* Keep items vertical inside each section */}
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
Signage.pageHeader = {
  title: "Signage & Production Safety",
  items: ["WHS Signs", "Brand Signage", "Custom whiteboards", "Procedure & Safety"],
  description:
    "WHS signs, brand signage, custom whiteboards, tags, stickers and custom procedure and safety signage. Design, manufacture, and install in Perth.",
  canonical: "/signage-perth",
  emitStructuredData: true,
};

export default Signage;

/** Static props */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getSignageImages();
  return { props: { images } };
};
