import { NextRequest, NextResponse } from "next/server";
import { ingestOfficialWebsite } from "@/lib/ai/website-ingestion.server";

export const maxDuration = 300;

function isAuthorized(request: NextRequest): boolean {
  const suppliedSecret = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const acceptedSecrets = [
    process.env.KNOWLEDGE_INGEST_SECRET,
    process.env.CRON_SECRET,
  ].filter(Boolean);
  return Boolean(suppliedSecret && acceptedSecrets.includes(suppliedSecret));
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { maxPages?: number };
  const report = await ingestOfficialWebsite(body.maxPages || 80);
  return NextResponse.json(report, { status: report.indexedPages > 0 ? 200 : 502 });
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const report = await ingestOfficialWebsite(80);
  return NextResponse.json(report, { status: report.indexedPages > 0 ? 200 : 502 });
}
