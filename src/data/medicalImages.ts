import fs from "fs";
import path from "path";

export type MedicalImage = {
  src: string;
  title: string;
};


export function getMedicalImages(): MedicalImage[] {
  const medicalDir = path.join(process.cwd(), "public", "medical");

  const files = fs.readdirSync(medicalDir)
  .sort(() => Math.random() - 0.5);

  // keep only images and turn into {src, title}
  return files
    .filter((f) => f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".png"))
    .map((file) => ({
      src: `/medical/${file}`,               // path usable in <img src>
      title: path.parse(file).name,         // filename without extension
    }));
}
