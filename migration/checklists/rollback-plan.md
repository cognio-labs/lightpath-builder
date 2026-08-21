# Rollback plan

Status: **NOT READY** until every field has evidence and the restore path is rehearsed.

- Last stable WordPress backup ID/location:
- Backup creation timestamp/timezone:
- Restore test evidence:
- Database/content freeze point:
- Original apex/www DNS record values:
- Original Cloudflare proxy/cache/page-rule configuration:
- Original hosting origin and SSL configuration:
- Last stable Vercel deployment ID:
- Vercel rollback command/UI procedure:
- DNS propagation expectation based on verified TTL:
- Decision authority:
- DNS operator:
- Engineering owner:
- SEO verification owner:
- Analytics/conversion verification owner:

## Immediate rollback triggers

- Homepage or critical protected URLs unavailable.
- Widespread 5xx responses or redirect loops.
- Critical organic/ad URLs return unexpected 404/410.
- Production noindex, robots block, or wrong Vercel/www canonical.
- Forms, bookings, donations or payments fail and cannot be corrected quickly.
- Material tracking/conversion failure that cannot be corrected quickly.

## Verification after rollback

1. Verify apex homepage and protected URL sample return their recorded legacy responses.
2. Verify HTTP/www redirect behavior and SSL.
3. Verify robots, sitemap, canonicals and GSC reachability.
4. Submit real test leads/payments only under the approved test protocol.
5. Verify GA4 real-time, Ads diagnostics, Meta Test Events and CRM/email receipt.
6. Record rollback timestamp, reason, DNS values, deployment and incident owner.

