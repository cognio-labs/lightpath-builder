# Post-launch monitoring dashboard specification

Status: design complete; connections and alerts are unverified.

| Monitor | Source | Cadence | Alert condition | Owner | Evidence/response |
|---|---|---|---|---|---|
| Protected URL status | URL validator/uptime | Hourly first 24h; daily to day 30; weekly to day 90 | Any protected URL non-200 | SEO/SRE | Runbook and incident ID |
| Canonical/noindex drift | Rendered HTML checks | Same cadence | Wrong host/path canonical or new noindex | SEO/engineering | Deploy rollback/fix |
| Redirect integrity | URL validator | Hourly/day 1 then daily | Chain, loop, wrong destination or dropped click IDs | Engineering | Redirect manifest diff |
| 5xx/latency | Vercel/edge logs | Hourly first 24h | Agreed 5xx threshold exceeded or sustained latency regression | SRE | Incident response |
| Sitemap/robots | HTTP checks + GSC | Hourly/day 1 then daily | Unavailable, invalid, blocked assets, non-200 sitemap URLs | SEO/engineering | Correct and resubmit |
| Organic clicks/impressions | GSC | Daily after settled data | More than 20% drop for three settled matched days | SEO | URL/query cohort analysis |
| Indexed sitemap URLs | GSC | Daily then weekly | Material decline beyond agreed threshold | SEO | Coverage/canonical inspection |
| Paid conversion continuity | Ads/Meta/GA4 | Hourly/day 1 then daily | Paid clicks stable while conversions materially drop | Paid/analytics | Tag/landing/payment test |
| Forms/payments | Synthetic + CRM/Razorpay | Hourly/day 1 then daily | Submission/payment/receipt failure | CRM/payments | Incident and rollback decision |
| Spam patterns | Logs/GSC | Daily to day 30; weekly to day 90 | New hacked/spam path pattern or 200 response | Security/SEO | Contain and add precise 410 |

