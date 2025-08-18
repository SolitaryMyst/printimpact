import { GetStaticProps } from "next";
import { getStationeryImages, StationeryImage } from "@/data/stationeryImages";

type Props = { images: StationeryImage[] };

export default function Stationery({ images }: Props) {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center gap-6 my-8">
        <h1 className="text-3xl font-bold text-[#e8e5e2]">
          Stationery &amp; Office Merchandise
        </h1>
        <span className= "mx-6">  </span>
        <ul className="flex flex-wrap items-center gap-x-9 gap-y-3 text-xl text-[#e8e5e2] list-disc list-inside  mt-[0.5rem] p-0">
          <li className="whitespace-nowrap">Envelopes</li>
          <li className="whitespace-nowrap">Letterheads</li>
          <li className="whitespace-nowrap">Fridge Planners</li>
          {/* examples with multi-word terms */}
          <li className="whitespace-nowrap">Desk Pads</li>
          <li className="whitespace-nowrap">Custom Merchandise &amp; Branded Wearables</li>
        </ul>
      </div>


      <div className="h-px w-full bg-[#e8e5e2] my-4" />

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {images.map((img, i) => (
          <figure key={i} className="rounded-lg overflow-hidden flex flex-col">
            <div className="flex-1 flex items-end justify-center">
              <img
                src={img.src}
                alt={img.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <figcaption className="mt-2 text-center text-xl font-bold text-[#e8e5e2]">
              {img.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getStationeryImages();
  return { props: { images } };
};
