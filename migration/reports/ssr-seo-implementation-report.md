# SSR and SEO implementation report

## Verified platform

- Framework: TanStack Start with React 19 and Vite 8.
- Router: TanStack file-based router.
- Rendering: SSR is enabled and meaningful page content/H1/title is present in initial HTML on tested implemented routes.
- Build target observed: Nitro `cloudflare-module`; Vercel target is unverified.

## Current implementation findings

| Requirement | Evidence | Risk | Status |
|---|---|---|---|
| Server-rendered SEO content | `/personal-session` initial HTML contains title, H1 and main content | Positive baseline | PASS (sample only) |
| Absolute self-canonical | Child routes emit relative values such as `/personal-session`; homepage has no canonical | P0 | FAIL |
| Absolute Open Graph URL | Routes emit relative values such as `/personal-session` | P1 | FAIL |
| Unknown route status | Slashless unknown route returns 404; slash variant first returns temporary 307 | P1 | PARTIAL/FAIL policy |
| Spam 410 | `/public/dominoqq/` returns 307 then 404 locally | P0 | FAIL |
| XML sitemap | 35 relative locs, no accurate lastmod, missing legacy corpus | P0 | FAIL |
| robots.txt | Allows all but omits production sitemap and has no environment control | P0 | FAIL |
| Structured data | No `application/ld+json` implementation found | P1 | FAIL |
| Staging protection | No verified authentication, meta noindex or X-Robots-Tag environment policy | P0 | UNVERIFIED |
| Host redirects | No version-controlled Vercel/edge redirect configuration found | P0 | UNVERIFIED |
| Analytics | No GTM/GA4/Meta tag code found | P0 | FAIL |

## Required implementation design

1. Configure TanStack/Nitro for the verified Vercel deployment target and environment.
2. Create a single SEO helper that receives the canonical slash-ending path and emits absolute apex canonical, Open Graph and Twitter values.
3. Add Organization and WebSite JSON-LD globally, BreadcrumbList per hierarchical page, and visible-content-matched Article/Event/Course/Product/FAQ schema by type.
4. Build the sitemap from the approved classified content source, not from a hand-written short path array. Include only absolute apex HTTPS 200/indexable canonicals and real modification dates.
5. Add environment-aware robots and response headers: authenticated/noindex previews; crawlable production with the sitemap directive.
6. Implement exact 410 handling for approved hacked/spam paths before generic 404 handling.
7. Implement version-controlled one-hop redirect rules from the approved manifest, with direct final destinations and preserved query parameters.
8. Enforce the approved trailing-slash policy with permanent normalization only where needed; do not put a temporary 307 in front of every valid legacy URL.
9. Restore existing GTM/GA4/Ads/Meta/consent properties and route-aware pageviews; validate direct and client navigations.
10. Replace no-op forms with verified server-side integrations and test CRM/email/payment/analytics outcomes.

No production code correction is marked complete because the exact Vercel project, protected exports, owner approvals and access have not been verified.

