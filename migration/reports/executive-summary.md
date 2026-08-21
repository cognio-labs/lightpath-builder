# Executive migration summary

Decision as of 2026-08-21: **NO-GO**.

The production WordPress site must not be replaced by the current application. The live suspected gambling URL still returns 200, the public legacy inventory already contains 1,750 URLs, and 1,749 are unclassified because protected data sources are unavailable. The new app lacks the published blog corpus and several commercial/product routes, emits relative or missing canonicals, generates an invalid/incomplete relative-URL sitemap, has no verified analytics/ad tag implementation, and contains visible forms that do not submit data.

The repository is TanStack Start/Vite SSR, not Next.js. Its current production build succeeds, but Nitro targets `cloudflare-module`, so Vercel compatibility/domain behavior is not proven. The exact Vercel URL, project access, branch and rollback method are missing.

Public DNS evidence shows Cloudflare nameservers, Google Workspace MX records, SPF and GSC TXT records, plus the `us` subdomain on `sites.ludicrous.cloud`. These must be preserved through a full provider export; public DNS is not a sufficient zone backup. The current `http://www` path redirects through `https://www` before the apex, producing two hops.

Immediate priorities are: contain the compromise and serve precise 410 responses; provide secure role-based access; export/merge GSC, logs, backlinks, ads and analytics; classify every URL; migrate or map missing content based on evidence; implement absolute apex SEO metadata/sitemap/robots/structured data; restore forms/tracking/payments; verify a Vercel-compatible deployment; and pass the automated launch gate with zero unresolved P0/P1 defects.

