# Science Divine production migration evidence pack

Current decision: **NO-GO** as of 2026-08-21 (Asia/Calcutta).

This directory contains the evidence and repeatable tooling for the WordPress-to-Vercel migration. It does not imply that production implementation or launch approval is complete.

## Commands

Build the public-source legacy inventory:

```powershell
node migration\scripts\build-legacy-inventory.mjs --output migration\data\legacy-url-inventory.csv --check-status --concurrency 3
```

Validate a classified inventory against a staging or production origin:

```powershell
node migration\scripts\validate-migration.mjs --inventory migration\data\legacy-url-inventory.csv --base-url https://EXACT-VERCEL-URL.vercel.app --output migration\results\url-validation-results.csv
```

The validator fails when any URL is unclassified, a tested rule fails, or a P0/P1 URL fails. Use `--allow-unclassified` only for diagnostic subsets, never for the launch gate.

## Evidence limitations

The current 1,750-row inventory merges public sitemaps, WordPress REST API objects, media, taxonomies, supplied commercial candidates, the known subdomain, and the suspected spam URL. It does not yet contain GSC, GA4, Ads, Meta, backlink, database, server-log, QR, email, CRM, Razorpay callback, or historical redirect exports. Therefore it is an evidence-backed baseline, not the final master inventory.

