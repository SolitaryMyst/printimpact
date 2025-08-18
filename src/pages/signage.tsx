import { GetStaticProps } from "next";
import { getSignageImages } from "@/data/signageImages";
import type { SignageImage } from "@/data/signageImages"; // type-only import

type Props = { images: SignageImage[] };

function Signage({ images }: Props) {
  return (
    <div className="
  grid gap-4
  grid-cols-3 md:grid-cols-6 xl:grid-cols-9
  [grid-auto-rows:10rem] md:[grid-auto-rows:12rem]
  grid-flow-dense
">
      {images.map((img) => {
  const landscape = img.width >= img.height;
  return (
    <figure
      key={img.src}
      className={`relative rounded-lg overflow-hidden bg-transparent p-0
        ${landscape ? "col-span-2 row-span-1" : "col-span-1 row-span-2"}`}
    >
      <img
        src={img.src}
        alt={img.title}
        className="w-full h-full object-contain"
      />
  
    </figure>
  );
})}
    </div>
  );
}

(Signage as any).pageHeader = {
  title: "Signage & Production Safety",
  items: ["WHS Signs", "Brand Signage", "Custom whiteboards", "Custom Procedure & Safety Signage"],
};

export default Signage;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getSignageImages();
  return { props: { images } };
};
