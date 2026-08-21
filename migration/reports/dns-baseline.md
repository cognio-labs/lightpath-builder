# Public DNS and host baseline

Captured 2026-08-21. This is public resolver evidence only and must not substitute for a complete Cloudflare zone export.

| Record/host | Observed value | TTL/evidence | Risk/action |
|---|---|---|---|
| Nameservers | `grant.ns.cloudflare.com`, `becky.ns.cloudflare.com` | Public NS TTL 21600 | Cloudflare access/export required |
| Apex A | Cloudflare proxy IPs `104.21.94.212`, `172.67.140.81` | Public TTL 300 | Origin record hidden by proxy; export provider zone before change |
| www A | Same Cloudflare proxy IPs | Public TTL 300 | Current redirect is two hops from HTTP www |
| MX | Google Workspace: `aspmx` plus `alt1`–`alt4` | Public TTL 3600 | Preserve exactly |
| Apex TXT | Two Google site verifications; SPF includes Hostinger and Google | Public TTL 3600 | Preserve exactly; validate intended senders |
| DMARC | No `_dmarc` TXT found via public resolver | NXDOMAIN response | P1 email-security review; do not invent during cutover |
| Google DKIM selector checked | No `google._domainkey` TXT found | NXDOMAIN response | Selector may differ; full zone/email-admin export required |
| us.sciencedivine.org | CNAME `sites.ludicrous.cloud`; public site returns 200 | CNAME TTL 3600 | Preserve until business owner confirms disposition |

## Host behavior sample

- `https://sciencedivine.org/` → 200 WordPress/Hostinger through Cloudflare.
- `http://sciencedivine.org/personal-session/` → one-hop 301 to apex HTTPS.
- `https://www.sciencedivine.org/personal-session/` → one-hop 301 to apex HTTPS.
- `http://www.sciencedivine.org/personal-session/` → 301 to HTTPS www, then 301 to apex HTTPS: two hops and a P1 correction.

