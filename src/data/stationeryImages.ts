import fs from "fs";
import path from "path";

export type StationeryImage = {
  src: string;
  title: string;
};


export function getStationeryImages(): StationeryImage[] {
  const stationeryDir = path.join(process.cwd(), "public", "stationery");

  const files = fs.readdirSync(stationeryDir)
  .sort(() => Math.random() - 0.5);

  // keep only images and turn into {src, title}
  return files
    .filter((f) => f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".png"))
    .map((file) => ({
      src: `/stationery/${file}`,               // path usable in <img src>
      title: path.parse(file).name,         // filename without extension
    }));
}
