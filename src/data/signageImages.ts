import fs from "fs";
import path from "path";
import { imageSize } from "image-size"; // or Buffer workaround from earlier

export type SignageImage = {
  src: string;
  title: string;
  width: number;
  height: number;
};

export function getSignageImages(): SignageImage[] {
  const dir = path.join(process.cwd(), "public", "signage");
  return fs.readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))
    .map((file) => {
      const abs = path.join(dir, file);
      const buf = fs.readFileSync(abs);                 // avoids TS path typing issue
      const { width = 0, height = 0 } = imageSize(buf);
      return { src: `/signage/${file}`, title: path.parse(file).name, width, height };
    });
}
