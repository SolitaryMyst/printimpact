import fs from "fs";
import path from "path";
import { imageSize } from "image-size"; // or Buffer workaround from earlier

export type CorporateImage = {
  src: string;
  title: string;
  width: number;
  height: number;
};

export function getCorporateImages(): CorporateImage[] {
  const dir = path.join(process.cwd(), "public", "corporate");
  return fs.readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .sort((a, b) => a.localeCompare(b)) // sort filenames alphabetically
    .map((file) => {
      const abs = path.join(dir, file);
      const buf = fs.readFileSync(abs);
      const { width = 0, height = 0 } = imageSize(buf);
      return { src: `/corporate/${file}`, title: path.parse(file).name, width, height };
    });
}
