import type { FC } from "react";
import { Icons, type IconName } from "@/components/Icons";
import type { PrintingImage } from "@/data/printingImages";

type Props = {
  sections: Array<{
    title: string;
    items: Array<{ text: string; icon?: IconName }>;
  }>;
  images: PrintingImage[];
};

/**
 * Two rows: T,T,P,P per row.
 * md: text left, images right. lg: normal 4-col.
 */
const LeadMosaic: FC<Props> = ({ sections, images }) => {
  const text = sections.slice(0, 4);
  const pics = images.slice(0, 4);

  const tiles: Array<
    | { kind: "text"; data: Props["sections"][number] }
    | { kind: "image"; data: PrintingImage }
  > = [
    text[0] && { kind: "text", data: text[0] },
    text[1] && { kind: "text", data: text[1] },
    pics[0] && { kind: "image", data: pics[0] },
    pics[1] && { kind: "image", data: pics[1] },
    text[2] && { kind: "text", data: text[2] },
    text[3] && { kind: "text", data: text[3] },
    pics[2] && { kind: "image", data: pics[2] },
    pics[3] && { kind: "image", data: pics[3] },
  ].filter(Boolean) as any;

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tiles.map((tile, i) =>
        tile.kind === "text" ? (
          <section
            key={`t-${i}`}
            className="space-y-3 md:col-start-1 lg:col-auto"
          >
            <h2 className="text-2xl font-semibold">{tile.data.title}</h2>
            <ul className="space-y-2">
              {tile.data.items.map(({ text, icon }, j) => {
                const Icon = icon ? Icons[icon] : null;
                return (
                  <li key={j} className="flex items-start gap-2">
                    {Icon ? <Icon className="h-5 w-5 mt-1" /> : null}
                    <p className="text-neutral-800">{text}</p>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : (
          <figure
            key={`p-${i}`}
            className="relative aspect-[4/3] rounded-lg overflow-hidden md:col-start-2 lg:col-auto"
          >
            <img
              src={tile.data.src}
              alt={tile.data.title}
              width={tile.data.width}
              height={tile.data.height}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-contain"
            />
          </figure>
        )
      )}
    </div>
  );
};

export default LeadMosaic;
