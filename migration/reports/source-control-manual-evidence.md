# Source evidence: SEO Migration Control Manual

Source supplied by project owner in chat on 2026-08-21.

Manual title: `Science Divine Foundation | SEO Migration Control Manual`

Prepared date stated in manual: 2026-08-20

GSC data coverage stated in manual: connected Google Search Console data through 2026-08-17.

## Baseline metrics from manual

| Metric | 2026-05-20 to 2026-08-17 | Prior 90 days | Change |
|---|---:|---:|---:|
| Clicks | 4,004 | 29,897 | -86.6% |
| Impressions | 560,191 | 4,888,032 | -88.5% |
| CTR | 0.715% | 0.612% | +0.103 percentage points |
| Average position | 21.09 | 8.38 | Worse by 12.71 positions |

Additional manual findings:

- Five days ending 2026-08-17 averaged position 30.49.
- Sitemap contains 176 URLs.
- GSC reports 2,934 page rows.
- Latest settled 28 days: `/blog` section produced 925 clicks and 171,196 impressions across 1,641 reported page variants/fragments.
- Latest settled 28 days: mobile produced 905 clicks versus 154 desktop clicks.
- GA4 is not linked in the connected property.
- Domain property `sc-domain:sciencedivine.org` is listed but returns 403 insufficient permission; URL-prefix property `https://sciencedivine.org/` is accessible.
- Manual audit sampled 25 high-impression URLs and found 25/25 canonicalised to `www`.
- `/public/dominoqq/` is identified as a live indexed gambling page and must return 410, not redirect.

## Decision imported into local migration package

Current decision remains **NO-GO**. The manual's protected organic cohort has been added to `migration/config/protected-organic-urls.csv`.
