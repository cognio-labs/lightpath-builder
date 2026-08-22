import { NextRequest, NextResponse } from "next/server";
import { ingestOfficialWebsite } from "@/lib/ai/website-ingestion.server";

export const maxDuration = 300;

function isAuthorized(request: NextRequest): boolean {
  // Allow in development mode if no secret is explicitly configured
  if (process.env.NODE_ENV === "development" && !process.env.KNOWLEDGE_INGEST_SECRET && !process.env.CRON_SECRET) {
    return true;
  }

  const suppliedSecret =
    request.headers.get("authorization")?.replace(/^Bearer\s+/i, "") ||
    request.nextUrl.searchParams.get("secret");

  const acceptedSecrets = [
    process.env.KNOWLEDGE_INGEST_SECRET,
    process.env.CRON_SECRET,
  ].filter(Boolean);

  return Boolean(suppliedSecret && acceptedSecrets.includes(suppliedSecret));
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Please supply valid Authorization Bearer secret or ?secret=... query parameter." },
      { status: 401 }
    );
  }

  const body = (await request.json().catch(() => ({}))) as { maxPages?: number };
  const report = await ingestOfficialWebsite(body.maxPages || 80);
  return NextResponse.json(report, { status: report.indexedPages > 0 ? 200 : 502 });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized. Protected admin endpoint. Supply ?secret=... or Authorization header." },
      { status: 401 }
    );
  }

  const report = await ingestOfficialWebsite(80);
  return NextResponse.json(report, { status: report.indexedPages > 0 ? 200 : 502 });
}
