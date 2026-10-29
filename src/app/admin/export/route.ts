import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth.server";
import { donationsDb } from "@/lib/donations.server";
import { MONTHLY_SEWA_KEYS, SEWAS, isSewaKey } from "@/lib/sewa";

// CSV download for the admin panel: ?table=shiksha|annapurna|nirman|gita|subscriptions

function toCsv(rows: Record<string, unknown>[]) {
  if (!rows.length) return "";
  const headers = Object.keys(rows[0]).filter((h) => h !== "notes");
  const cell = (value: unknown) => {
    const text = value === null || value === undefined ? "" : typeof value === "object" ? JSON.stringify(value) : String(value);
    return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };
  return [headers.join(","), ...rows.map((row) => headers.map((h) => cell(row[h])).join(","))].join("\r\n");
}

export async function GET(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const key = request.nextUrl.searchParams.get("table") ?? "";
  // "subscriptions" exports every monthly sewa's mandates together, with a sewa column.
  const sources = isSewaKey(key)
    ? [{ sewa: key, table: SEWAS[key].table }]
    : key === "subscriptions"
      ? MONTHLY_SEWA_KEYS.map((sewa) => ({ sewa, table: SEWAS[sewa].subscriptionsTable! }))
      : [];
  if (!sources.length) return NextResponse.json({ error: "Unknown table" }, { status: 400 });

  const db = await donationsDb();
  const rows: Record<string, unknown>[] = [];
  for (const { sewa, table } of sources) {
    const { data, error } = await db.from(table).select("*").order("created_at", { ascending: false }).limit(100_000);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    rows.push(...(data ?? []).map((row) => ({ sewa, ...row })));
  }

  const stamp = new Date().toISOString().slice(0, 10);
  return new NextResponse("﻿" + toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${key}-donations-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
