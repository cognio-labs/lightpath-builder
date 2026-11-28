import { NextResponse } from "next/server";
import writeXlsxFile from "write-excel-file/node";
import { isAdmin } from "@/lib/admin-auth.server";
import { listRegistrations } from "@/lib/mahotsav/registrations.server";

// Excel download of every Shiksha Sewa Sankalp Mahotsav registration (admin only).

const IST = "Asia/Kolkata";

function istParts(iso: string) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: IST,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date(iso));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { date: `${get("year")}-${get("month")}-${get("day")}`, time: `${get("hour")}:${get("minute")}` };
}

const header = (value: string) => ({
  value,
  fontWeight: "bold" as const,
  backgroundColor: "#5E1216",
  textColor: "#FDF8EF",
  align: "center" as const,
});

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401, headers: { "Cache-Control": "no-store" } });
  }

  let rows;
  try {
    rows = await listRegistrations();
  } catch (error) {
    console.error("Mahotsav export failed:", error);
    return NextResponse.json(
      { error: "Could not load registrations." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  const sheetData = [
    [
      header("S.No"),
      header("Name"),
      header("Email"),
      header("Phone"),
      header("City"),
      header("Number of Seats"),
      header("Pass Email"),
      header("Registered (IST)"),
    ],
    ...rows.map((r, i) => {
      const t = istParts(r.created_at);
      return [
        { value: i + 1 },
        { value: r.full_name },
        { value: r.email },
        { value: r.mobile },
        { value: r.city },
        { value: r.attendees },
        { value: r.pass_email_status },
        { value: `${t.date} ${t.time}` },
      ];
    }),
  ];

  const buffer = await writeXlsxFile(sheetData, {
    sheet: "Registrations",
    stickyRowsCount: 1,
    columns: [
      { width: 7 },
      { width: 28 },
      { width: 34 },
      { width: 16 },
      { width: 18 },
      { width: 16 },
      { width: 12 },
      { width: 20 },
    ],
  }).toBuffer();

  const today = istParts(new Date().toISOString()).date;
  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="mahotsav-registrations-${today}.xlsx"`,
      "Cache-Control": "no-store",
    },
  });
}
