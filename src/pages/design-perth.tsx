// src/pages/design-perth.tsx
import type { GetStaticProps, NextPage } from "next";
import { getDesignImages } from "@/data/designImages";
import type { DesignImage } from "@/data/designImages";
import type { PageHeaderConfig } from "@/types/page";
import type { JSX as JSXReact } from "react";

/** Page props */
type Props = { images: DesignImage[] };

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
  "Graphic design in Perth for brands, forms, and campaigns. Branding, medical forms, advertisements, packaging, and anything else you need designed, prepared for print or digital with fast, accurate output.";

const SECTIONS: Section[] = [
  {
    title: "Branding & Identity",
    items: [
      {
        icon: "check",
        text:
          "Logos, colour systems, and typography that scale. Brand guides with practical usage for print and digital so your team stays consistent.",
      },
      {
        icon: "factory",
        text:
          "Asset packs for launch: stationery, social templates, signage mockups, and packaging previews. Production-ready files included.",
      },
    ],
  },
  {
    title: "Graphic Design & Layout",
    items: [
      {
        icon: "bolt",
        text:
          "Flyers, brochures, posters, catalogs, menus, and pitch decks. Clean hierarchy, accurate grids, and export presets tuned for printers.",
      },
      {
        icon: "check",
        text:
          "Retouching and colour management built in. Supplied as press PDFs and working files on request.",
      },
    ],
  },
  {
    title: "Medical Forms & Documents",
    items: [
      {
        icon: "shield",
        text:
          "Clinic and lab forms, pads, labels, and sample IDs. Clear fields, compliant legends, and barcodes or QR for workflow speed.",
      },
      {
        icon: "map",
        text:
          "Editable masters for updates. Version control and re-order codes so reception can request repeats without errors.",
      },
    ],
  },
  {
    title: "Advertising & Campaign Assets",
    items: [
      {
        icon: "map",
        text:
          "Static and animated ad sets sized for social, web, and large format. Copy fit and visual variants for A/B testing.",
      },
      {
        icon: "check",
        text:
          "Out-of-home, point-of-sale, and window graphics mocked to scale. Hand-off kit includes specs and printer notes.",
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

const DesignPerth: WithHeader = ({ images }) => {
  return (
    <>
      {/* Descriptive content ABOVE the image grid */}
      <article className="mx-auto max-w-7xl px-4 pt-6">
        <p className="text-neutral-800 font-bold">
          {INTRO} <a href="/contact" className="underline">Request a quote</a>.
        </p>

        {/* Sections inline: 1 col (sm), 2 cols (md), 4 cols (lg) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {SECTIONS.map(({ title, items }) => {
            const base = slugify(title);
            const sectionId = `${base}-content`;
            const headingId = `${base}-content-h`;

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
    </>
  );
};

/** Header config consumed by <PageHeader /> */
DesignPerth.pageHeader = {
  title: "Graphic Design Perth",
  items: [
    "Branding & Identity",
    "Graphic Design & Layout",
    "Medical Forms & Documents",
    "Advertising & Campaign Assets",
  ],
  description:
    "Graphic design in Perth for branding, medical forms, advertisements, packaging, and all custom requests. Print and digital ready.",
  canonical: "/design-perth",
  emitStructuredData: true,
};

export default DesignPerth;

/** Static props */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getDesignImages();
  return { props: { images } };
};
