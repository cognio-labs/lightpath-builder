# Image cleanup log (2026-10-02)

Every image move is listed file-by-file in [`image-relocation-map.csv`](./image-relocation-map.csv)
(columns: `step, old_location, new_location, note`; 1,724 rows, all verified to exist).

All originals are recoverable from git commit **`a0d6a32`** (the last commit before the cleanup):

```
git show a0d6a32:<old path> > file      # e.g. git show a0d6a32:public/hero-bg.jpg > hero-bg.jpg
```

## What changed, in order

| Step | What | Result | Commit |
|---|---|---|---|
| 1 | Moved the 353 images the site used from `public/` into `public/images/`, converted to WebP (max 1920px, quality 78) and rewrote every path in `src/` | 123.6 MB → 23.3 MB | `501c12f` (some images only in `7a0ec47`, see step 4) |
| 2 | Deleted everything else in `public/` (`old-site/` WordPress uploads 1.7 GB, duplicate `public/public/`, unused images) | `public/` 1.8 GB → 24 MB | `559e7a4` |
| 3 | Copied all 1,268 images from `output/` (WordPress export) into `public/images/old-site/`, compressed to WebP | 346.5 MB → 79 MB | `7a0ec47` |
| 4 | Shortened 61 file names over 60 characters (they broke `git add` on Windows: "Filename too long", so `premium-heroes/`, `purpose-cards/` and others were missing from the earlier commits) and updated 7 source files | — | `7a0ec47` |
| 5 | Replaced the favicon (was the default Next.js triangle) with the Science Divine logo | — | `501c12f` |
| 6 | Replaced all 103 images loaded from `https://sciencedivine.org/wp-content/uploads/...` with local copies in `public/images/uploads/` — the old server now returns **403 Forbidden**, which broke the logo, leaders, courses and mission images on Vercel | 54 MB → 6.6 MB | this commit |
| 7 | Added `loading="lazy" decoding="async"` to 131 `<img>` tags; logo and hero images use `loading="eager" fetchPriority="high"` instead | — | this commit |

## Folder layout now

```
public/
├── favicon.ico
├── robots.txt
└── images/
    ├── *.webp, blog/, hero-slider/, premium-heroes/ …   step 1 — images the pages use
    ├── uploads/YYYY/MM/…                                step 6 — former sciencedivine.org/wp-content/uploads images
    └── old-site/pages|posts|custom/…                    step 3 — full WordPress export, kept for future use
```

## Known gaps

- The 8 images in `public/images/initiatives/` were already **0-byte files** in `a0d6a32`; they need the real photos.
- Two old-site images could not be decoded and were copied unconverted (`.jpg` / `.png`).
- Blog posts load their inline images from `cdn.typeflo.io` (external, unaffected).
