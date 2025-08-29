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

/** Copy blocks used by the mosaic */
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
     
    ],
  },
];

/** Small helpers for the mosaic */
function LeadText({ section }: { section?: Section }) {
  if (!section) return null;
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-semibold">{section.title}</h2>
      <ul className="space-y-2">
        {section.items.map(({ text, icon }, j) => {
          const Icon = icon ? Icons[icon] : null;
          return (
            <li key={j} className="flex items-start gap-2">
              {Icon ? <Icon className="h-5 w-5 mt-1 shrink-0" /> : null}
              <p className="text-neutral-800">{text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function LeadPic({ img }: { img?: PrintingImage }) {
  if (!img) return null;
  return (
    <figure className="relative aspect-[4/3] overflow-hidden rounded-md ">
      <img
        src={img.src}
        alt={img.title}
        width={img.width}
        height={img.height}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-contain"
      />
    </figure>
  );
}

/** Page */
type WithHeader = NextPage<Props> & { pageHeader?: PageHeaderConfig };

const Index: WithHeader = ({ images }) => {
  return (
    <main id="main">
      {/* Descriptive content ABOVE the image grid */}
      <article className="mx-auto max-w-[100rem] px-4 pt-6">
        <p className="text-neutral-800 font-bold">
          {INTRO} <a href="/contact" className="ml-3 underline">Get a quote</a>.
        </p>

        {/* Lead mosaic: Row1 T,T,P,P  Row2 T,T,P,P */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <LeadText section={SECTIONS[0]} />
          <LeadText section={SECTIONS[1]} />
          <LeadPic img={images[0]} />
          <LeadPic img={images[1]} />
          <LeadText section={SECTIONS[2]} />
          <LeadText section={SECTIONS[3]} />
          <LeadPic img={images[2]} />
          <LeadPic img={images[3]} />
        </div>

        {/* Service area */}
       
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
          {images.slice(4).map((img) => {
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
