# Launch checklist

Every item requires an owner, timestamp, and evidence link. Any failed P0 or unresolved P1 means NO-GO.

## Approval gate

- [ ] Security compromise contained; spam patterns enumerated; `/public/dominoqq/` returns 410.
- [ ] GSC Security Issues and Manual Actions checked and evidenced.
- [ ] Final WordPress database/files/config/users/cron/DNS/SSL/CDN backup restore-tested.
- [ ] 100% of known URLs classified exactly once.
- [ ] Protected organic, backlink, paid and integration URLs pass staging validation.
- [ ] Redirects are direct 301/308, relevant, loop-free, chain-free and query-safe.
- [ ] Apex HTTPS slash-ending URLs are final 200 responses.
- [ ] HTTP/www variants redirect in one hop to apex HTTPS.
- [ ] Absolute apex self-canonicals, robots and sitemap pass.
- [ ] Preview/staging is authenticated and noindex; production is indexable.
- [ ] SEO-critical content is present in initial HTML on mobile and desktop.
- [ ] 404 and 410 response bodies have the correct HTTP status.
- [ ] Forms, booking, donation, product/payment, CRM/email and callbacks pass.
- [ ] GA4/GTM/Google Ads/Meta/consent events pass direct loads and client navigation without duplicates.
- [ ] Structured data validates and matches visible content.
- [ ] Accessibility and Core Web Vitals test evidence is attached.
- [ ] Rollback deployment, DNS values, authority and verification are rehearsed.

## Cutover record

- Launch date/time/timezone:
- Approved deployment ID/commit:
- WordPress freeze timestamp:
- DNS records changed:
- Previous values:
- New values:
- Migration lead:
- DNS operator:
- Final gate approver:
- GSC sitemap submission evidence:
- Priority URL inspection evidence:

