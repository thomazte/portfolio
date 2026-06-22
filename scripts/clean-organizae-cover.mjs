import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const dir = dirname(fileURLToPath(import.meta.url));
const pngPath = join(dir, "../assets/projects/organizae-cover.png");
const { PNG } = require("pngjs");

const png = PNG.sync.read(readFileSync(pngPath));
const w = png.width;
const h = png.height;

function isForeground(r, g, b) {
  const sum = r + g + b;
  if (sum > 620) return true;
  if (r > 200 && g > 200 && b > 195) return true;
  if (r > 170 && g > 170 && b > 170 && sum > 520) return true;
  return false;
}

for (let y = 0; y < h; y++) {
  for (let x = 0; x < w; x++) {
    const i = (w * y + x) * 4;
    const r = png.data[i];
    const g = png.data[i + 1];
    const b = png.data[i + 2];

    if (isForeground(r, g, b)) {
      png.data[i + 3] = 255;
      continue;
    }

    png.data[i] = 0;
    png.data[i + 1] = 0;
    png.data[i + 2] = 0;
    png.data[i + 3] = 0;
  }
}

writeFileSync(pngPath, PNG.sync.write(png));
console.log("organizae-cover.png -> transparent bg, white logo only");
