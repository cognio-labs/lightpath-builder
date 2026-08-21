# Executive migration summary

Decision as of 2026-08-21, incorporating the SEO Migration Control Manual prepared 2026-08-20: **NO-GO**.

The production WordPress site must not be replaced by the current application. The live suspected gambling URL still returns 200, the public legacy inventory already contains 1,750 URLs, and 1,749 are unclassified because protected data sources are unavailable. The new app lacks the published blog corpus and several commercial/product routes, emits relative or missing canonicals, generates an invalid/incomplete relative-URL sitemap, has no verified analytics/ad tag implementation, and contains visible forms that do not submit data.

Connected GSC baseline through 2026-08-17 shows the decline predates any framework launch: 4,004 clicks and 560,191 impressions for 2026-05-20 to 2026-08-17 versus 29,897 clicks and 4,888,032 impressions in the prior 90 days. Average position worsened from 8.38 to 21.09, with the five days ending 2026-08-17 averaging 30.49. The sitemap contains only 176 URLs, while GSC reports 2,934 page rows, so sitemap-only migration is insufficient.

The first protected organic cohort from the manual has been added to `migration/config/protected-organic-urls.csv`. The cohort includes the homepage, blog index, `/about-sakshi-shree/`, and the highest-click blog URLs such as `/blog/mantras-that-cleanse-negative-energy`, `/blog/hanuman-ji-blessings-signs`, and `/blog/bhagavad-gita-shlokas-for-students-exam-stress`.

The repository is TanStack Start/Vite SSR, not Next.js. Its current production build succeeds, but Nitro targets `cloudflare-module`, so Vercel compatibility/domain behavior is not proven. The exact Vercel URL, project access, branch and rollback method are missing.

Public DNS evidence shows Cloudflare nameservers, Google Workspace MX records, SPF and GSC TXT records, plus the `us` subdomain on `sites.ludicrous.cloud`. These must be preserved through a full provider export; public DNS is not a sufficient zone backup. The current `http://www` path redirects through `https://www` before the apex, producing two hops.

Immediate priorities are: contain the compromise and serve precise 410 responses; provide secure role-based access; export/merge GSC, logs, backlinks, ads and analytics; classify every URL; migrate or map missing content based on evidence; implement absolute apex SEO metadata/sitemap/robots/structured data; restore forms/tracking/payments; verify a Vercel-compatible deployment; and pass the automated launch gate with zero unresolved P0/P1 defects.
