This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Divine AI knowledge retrieval

The bot uses hybrid retrieval:

1. Official `sciencedivine.org` pages are discovered from WordPress sitemaps.
2. HTML is parsed into heading-aware chunks with source, page type, section, language, and freshness metadata.
3. Chunks are embedded when an embedding provider is configured and stored privately in Supabase.
4. Answers blend semantic search, PostgreSQL full-text search, current-page context, and curated local fallback knowledge.

Apply `supabase/migrations/20260822090000_divine_ai_rag.sql`, configure the values shown in `.env.local.example`, then index the official site:

```bash
curl -X POST http://localhost:3000/api/knowledge/ingest \
  -H "Authorization: Bearer $KNOWLEDGE_INGEST_SECRET" \
  -H "Content-Type: application/json" \
  -d '{"maxPages":80}'
```

Schedule the same authenticated request daily or weekly to keep prices, events, policies, and contact details fresh. The ingestion endpoint only accepts HTTPS pages on `sciencedivine.org`; the knowledge table and search function are service-role-only.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
