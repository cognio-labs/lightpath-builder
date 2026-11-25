import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const sourceRoot = join(root, "src");
const publicRoot = join(root, "public");
const sourceExtensions = new Set([".ts", ".tsx", ".css", ".md", ".mdx"]);
const rasterExtensions = new Set([".avif", ".gif", ".jpg", ".jpeg", ".png", ".webp"]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const references = new Map();
const sourceFiles = walk(sourceRoot).filter((file) => sourceExtensions.has(extname(file).toLowerCase()));
let nativeImageTags = 0;
for (const sourceFile of sourceFiles) {
  const source = readFileSync(sourceFile, "utf8");
  nativeImageTags += (source.match(/<img\b/g) ?? []).length;
  for (const match of source.matchAll(/["'`](\/images\/[^"'`?\s)]+)/g)) {
    const imagePath = match[1].replace(/\\+$/, "");
    if (imagePath.includes("${")) continue;
    if (!rasterExtensions.has(extname(imagePath).toLowerCase())) continue;
    const usages = references.get(imagePath) ?? new Set();
    usages.add(relative(root, sourceFile).replaceAll("\\", "/"));
    references.set(imagePath, usages);
  }
}

const rows = [];
for (const [url, usages] of references) {
  const file = join(publicRoot, url.slice(1));
  if (!existsSync(file)) {
    rows.push({ url, missing: true, usages: [...usages] });
    continue;
  }

  let width = 0;
  let height = 0;
  try {
    const dimensions = execFileSync(
      "ffprobe",
      ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height", "-of", "csv=p=0", file],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    [width, height] = dimensions.split(",").map(Number);
  } catch {
    // Corrupt or unsupported files are reported with zero dimensions.
  }

  const normalized = url.toLowerCase();
  const likelyUiAsset = /logo|icon|avatar|signature|favicon|quote|book|bowl|shape|pattern/.test(normalized);
  const largestEdge = Math.max(width, height);
  const smallPhoto = !likelyUiAsset && largestEdge > 0 && largestEdge < 1200;
  rows.push({
    url,
    width,
    height,
    bytes: statSync(file).size,
    smallPhoto,
    unreadable: width === 0 || height === 0,
    usages: [...usages],
  });
}

const missing = rows.filter((row) => row.missing);
const unreadable = rows.filter((row) => row.unreadable);
const smallPhotos = rows
  .filter((row) => row.smallPhoto)
  .sort((a, b) => Math.max(a.width, a.height) - Math.max(b.width, b.height));

const report = {
  sourceFiles: sourceFiles.length,
  referencedRasterImages: rows.length,
  nativeImageTags,
  missingImages: missing,
  unreadableImages: unreadable,
  smallPhotoCandidates: smallPhotos,
};

if (process.argv.includes("--summary")) {
  console.log(JSON.stringify({
    sourceFiles: report.sourceFiles,
    referencedRasterImages: report.referencedRasterImages,
    nativeImageTags: report.nativeImageTags,
    missingImageCount: missing.length,
    unreadableImageCount: unreadable.length,
    smallPhotoCandidateCount: smallPhotos.length,
    smallestPhotoCandidates: smallPhotos.slice(0, 25),
  }, null, 2));
} else {
  console.log(JSON.stringify(report, null, 2));
}
