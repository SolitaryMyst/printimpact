import { GetStaticProps } from "next";
import { getStationeryImages, StationeryImage } from "@/data/stationeryImages";

type Props = { images: StationeryImage[] };

export default function Stationery({ images }: Props) {
  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 flex items-center justify-between h-16">
          <a className="shrink-0">Logo</a>
          <nav className="hidden md:flex items-center gap-6">
            {/* menu groups */}
          </nav>
          <div className="flex items-center gap-3">
            <a className="btn">Get a demo</a>
            <a className="btn btn-outline">Contact</a>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="text-3xl font-semibold">Resources</h1>
        <p className="mt-2 text-neutral-600">Curated content…</p>
      </section>

      {/* Card grid */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <article
              key={i}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                className="w-full aspect-[16/9] object-cover"
                src={img.src}
                alt={img.title}
              />
              <div className="p-4">
                <h3 className="font-medium line-clamp-2">{img.title}</h3>
                <p className="mt-2 text-sm text-neutral-600 line-clamp-3">
                  Excerpt…
                </p>
                <div className="mt-3 text-xs text-neutral-500">Blog</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <nav className="mx-auto max-w-7xl px-4 pb-12 flex items-center justify-center gap-2">
        <button className="px-3 py-1 rounded border">1</button>
        <button className="px-3 py-1 rounded border">2</button>
        <button className="px-3 py-1 rounded border">Next</button>
      </nav>

      {/* CTA band */}
      <section className="bg-neutral-50 border-t">
        <div className="mx-auto max-w-7xl px-4 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <h2 className="text-xl font-semibold">Start something special</h2>
          <div className="flex gap-3">
            <a className="btn">Contact Us</a>
            <a className="btn btn-outline">Get a demo</a>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const images = getStationeryImages();
  return { props: { images } };
};
