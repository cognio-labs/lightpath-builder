import "server-only";

import fs from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";

/**
 * Renders the personalised Entry Pass: the designed pass template with the
 * attendee's name and number of persons written onto the two blank lines.
 *
 * Template is 896×1200. Field boxes (measured from the artwork; each box ends
 * just above its underline):
 *   NAME               line x 137–847, y 494
 *   NUMBER OF PERSONS  line x 342–847, y 544
 */

const PASS_WIDTH = 896;
const PASS_HEIGHT = 1200;
const FIELD_HEIGHT = 38;

const NAME_BOX = { left: 150, top: 457, width: 690 };
const PERSONS_BOX = { left: 356, top: 507, width: 484 };

// Same dark green and heavy condensed lettering as the NAME: / NUMBER OF PERSONS: labels.
const INK = "#14281C";

const ASSET_DIR = path.join(process.cwd(), "src", "assets", "mahotsav-pass");

let assetsPromise: Promise<{ template: Buffer; font: Buffer }> | null = null;

function loadAssets() {
  assetsPromise ??= Promise.all([
    fs.readFile(path.join(ASSET_DIR, "pass-template.jpg")),
    fs.readFile(path.join(ASSET_DIR, "BarlowCondensed-Bold.ttf")),
  ]).then(([template, font]) => ({ template, font }));
  return assetsPromise;
}

function nameFontSize(name: string) {
  if (name.length > 44) return 26;
  if (name.length > 34) return 31;
  return 36;
}

export async function renderPass(fullName: string, persons: number) {
  const { template, font } = await loadAssets();
  const name = fullName.toUpperCase();

  const field = (
    box: { left: number; top: number; width: number },
    text: string,
    fontSize: number
  ) => (
    <div
      style={{
        position: "absolute",
        left: box.left,
        top: box.top,
        width: box.width,
        height: FIELD_HEIGHT,
        display: "flex",
        alignItems: "center",
        fontSize,
        letterSpacing: "0.02em",
        color: INK,
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
    >
      {text}
    </div>
  );

  // Transparent text layer, composited onto the template with sharp.
  const overlay = new ImageResponse(
    (
      <div
        style={{
          width: PASS_WIDTH,
          height: PASS_HEIGHT,
          display: "flex",
          position: "relative",
          fontFamily: "Barlow",
          fontWeight: 700,
        }}
      >
        {field(NAME_BOX, name, nameFontSize(name))}
        {field(PERSONS_BOX, String(persons), 36)}
      </div>
    ),
    {
      width: PASS_WIDTH,
      height: PASS_HEIGHT,
      fonts: [{ name: "Barlow", data: font, weight: 700, style: "normal" }],
    }
  );

  const overlayPng = Buffer.from(await overlay.arrayBuffer());

  return sharp(template)
    .composite([{ input: overlayPng, top: 0, left: 0 }])
    .jpeg({ quality: 90, mozjpeg: true })
    .toBuffer();
}
