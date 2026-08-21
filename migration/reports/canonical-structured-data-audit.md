# Canonical and structured-data audit

## Canonicals

| Scope | Legacy evidence | New app evidence | Result |
|---|---|---|---|
| Sample WordPress pages | REST/Yoast reports absolute apex slash-ending self-canonicals | App child routes use relative hrefs | FAIL P0 |
| Homepage | Legacy Yoast reports `https://sciencedivine.org/` | No canonical link in local rendered homepage | FAIL P0 |
| Vercel host exclusion | Exact deployment URL unavailable | Cannot verify | BLOCKED P0 |
| www exclusion | Live sampled pages redirect to apex | New project/domain behavior unavailable | BLOCKED P0 |
| Trailing slash | Legacy canonicals are slash-ending | App redirects slash-ending route to slashless with 307 | FAIL P1 |

## Structured data

Legacy Yoast exposes Organization, WebSite, BreadcrumbList and page/article graphs in sampled REST records. The app source and rendered sample contain no JSON-LD. Organization, WebSite, BreadcrumbList and type-specific Article/Event/Course/Product/FAQ parity therefore fail. Validation in Google Rich Results Test and Schema.org Validator is blocked until implementation exists on the exact Vercel URL.

