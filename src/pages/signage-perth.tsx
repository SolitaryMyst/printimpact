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
          "ACM panels, Routered letters & panels, frost films, and removable campaigns.",
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

/** Mosaic helpers */
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

function LeadPic({ img }: { img?: SignageImage }) {
  if (!img) return null;
  return (
    <figure className="relative overflow-hidden rounded-md  aspect-[4/3]">
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

/** Utils */
function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/** Page */
type WithHeader = NextPage<Props> & { pageHeader?: PageHeaderConfig };

const SignagePerth: WithHeader = ({ images }) => {
  return (
    <main id="main">
      <article className="mx-auto max-w-7xl px-4 pt-6">
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
      </article>

      {/* Image grid resumes from the 5th image */}
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
SignagePerth.pageHeader = {
  title: "Signage & Production Safety",
  items: ["WHS Signs", "Brand Signage", "Custom whiteboards", "Procedure & Safety"],
  description:
    "WHS signs, brand signage, custom whiteboards, tags, stickers and custom procedure and safety signage. Design, manufacture, and install in Perth.",
  canonical: "/signage-perth",
  emitStructuredData: true,
};

export default SignagePerth;

/** Static props */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getSignageImages();
  return { props: { images } };
};