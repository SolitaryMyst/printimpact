// src/pages/index.tsx
import type { GetStaticProps, NextPage } from "next";
import { getPrintingImages } from "@/data/printingImages";
import type { PrintingImage } from "@/data/printingImages";
import type { PageHeaderConfig } from "@/types/page";
import type { JSX as JSXReact } from "react";

/** Page props */
type Props = { images: PrintingImage[] };

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
  "Perth printing, end to end. Business cards, tags, labels, stickers, flyers, brochures, posters, packaging and boxes. Digital and offset with fast turnarounds, colour control, and competitive pricing.";

const SECTIONS: Section[] = [
  {
    title: "Business Cards & Tags",
    items: [
      {
        icon: "check",
        text:
          "Standard and premium stocks with matte, satin, or gloss. Options for thick boards, soft touch, spot UV, and rounded corners. Brand-accurate colour and tidy typography.",
      },
      {
        icon: "bolt",
        text:
          "Swing tags and cards for retail and events. Die-cut shapes, drill holes, and stringing. Variable data for names or numbers.",
      },
    ],
  },
  {
    title: "Labels & Stickers",
    items: [
      {
        icon: "map",
        text:
          "Paper and vinyl labels on sheets or rolls. White, clear, or metallic films. Matte or gloss laminate. Outdoor and waterproof options for equipment and packaging.",
      },
      {
        icon: "check",
        text:
          "Any shape and size with kiss-cut sheets. Barcodes, QR, and sequential numbering supported. Supplied on easy-peel sheets or cores to suit your applicator.",
      },
    ],
  },
  {
    title: "Packaging & Boxes",
    items: [
      {
        icon: "factory",
        text:
          "Short-run custom packaging. Mailer boxes, product cartons, wrap sleeves, and fit-for-purpose inserts. Corrugated or folding carton boards with structural strength.",
      },
      {
        icon: "shield",
        text:
          "We create dielines, supply prototypes, and run CMYK + white or foils where needed. Low MOQs to launch, with scale-up paths for larger volumes.",
      },
    ],
  },
  {
    title: "Flyers & Brochures",
    items: [
      {
        icon: "check",
        text:
          "A4/A5 flyers, tri-fold brochures, menus, and handouts. Offset for economical volume, digital for speed. Crisp text and images with clean folding and trimming.",
      },
      {
        icon: "map",
        text:
          "Satin, matte, or gloss finishes. Scoring for heavy stocks. Mailhouse and distribution support on request across the Perth metro area.",
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

const Index: WithHeader = ({ images }) => {
  return (
    <main id="main">
      {/* Descriptive content ABOVE the image grid */}
      <article className="mx-auto max-w-7xl px-4 pt-6">
        <p className="text-neutral-800 font-bold">
          {INTRO} <a href="/contact" className="ml-3 underline"> Request a quote</a>.
        </p>

        {/* Sections inline: 1 col (sm), 2 cols (md), 4 cols (lg) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SECTIONS.map(({ title, items }) => {
            const base = slugify(title);
            // Anchor fix: use #<base> instead of #<base>-content
            const sectionId = base;
            const headingId = `${base}-h`;

            return (
              <section key={sectionId} id={sectionId} aria-labelledby={headingId} className="space-y-4">
                <h2 id={headingId} className="text-2xl font-semibold">
                  {title}
                </h2>

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

export default Index;
Index.pageHeader = {
  title: "Printing Perth",
  items: ["Business Cards & Tags", "Labels & Stickers", "Packaging & Boxes", "Flyers & Brochures"],
  description:
    "Commercial and digital printing in Perth. Business cards, labels and stickers, flyers, brochures, posters, packaging and boxes with fast turnarounds.",
  canonical: "/", // important now that this is the homepage
  emitStructuredData: true,
};

/** Static props */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getPrintingImages();
  return { props: { images } };
};
