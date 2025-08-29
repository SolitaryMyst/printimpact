// src/pages/medical-supply-perth.tsx
import type { GetStaticProps, NextPage } from "next";
import { getMedicalImages } from "@/data/medicalImages";
import type { MedicalImage } from "@/data/medicalImages";
import type { PageHeaderConfig } from "@/types/page";
import type { JSX as JSXReact } from "react";

/** Page props */
type Props = { images: MedicalImage[] };

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
  "Medical print and supply for, hospitals, clinics and labs across Perth. Medical signage, patient records and forms, record covers and filing, labels, plus all physical record consumables with reliable turnarounds.";

const SECTIONS: Section[] = [
  {
    title: "Medical Records & Forms",
    items: [
      {
        icon: "check",
        text:
          "Patient Medical records, Dividers, Record cover, consent, and progress notes. NCR pads or laser-safe sheets.",
      },
      {
        icon: "factory",
        text:
          "Efficient workflow for artwork updates, Version control and Streamlined re-ordering.",
      },
    ],
  },
  {
    title: "Medical Signage",
    items: [
      {
        icon: "shield",
        text:
          "Clinical and facility signage: wayfinding, isolation, radiation, hand hygiene, and PPE notices. Durable substrates with lamination and non-slip floor decals.",
      },
   
    ],
  },
  {
    title: "Record Covers & Filing",
    items: [
      {
        icon: "factory",
        text:
          "Manilla or polypropylene covers with side or top tabs. Custom print, colour bands, and pre-drilled holes compatible with common filing systems.",
      },
      {
        icon: "check",
        text:
          "Index dividers, tab sets, clips, and archive boxes.",
      },
    ],
  },
  {
    title: "Branded Signage & Stickers",
    items: [
      {
        icon: "map",
        text:
          "Window stickers, door decals, equipment labels, and tray markers branded to your clinic. White, clear, or metallic films with matte or gloss laminate.",
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

function LeadPic({ img }: { img?: MedicalImage }) {
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

const MedicalSupplyPerth: WithHeader = ({ images }) => {
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
MedicalSupplyPerth.pageHeader = {
  title: "Medical Supply",
  items: [
    "Medical Records & Forms",
    "Medical Signage",
    "Record Covers & Filing",
    "Branded Signage & Stickers",
  ],
  description:
    "Medical Records & Forms, patient records and forms, record covers and filing, labels and wristbands, and physical record supply in Perth.",
  canonical: "/medical-supply-perth",
  emitStructuredData: true,
};

export default MedicalSupplyPerth;

/** Static props */
export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getMedicalImages();
  return { props: { images } };
};
