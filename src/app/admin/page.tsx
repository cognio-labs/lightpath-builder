import Link from "next/link";
import type { SupabaseClient } from "@supabase/supabase-js";
import { CalendarDays, Download, LogOut, RefreshCw } from "lucide-react";
import { requireAdmin } from "@/lib/admin-auth.server";
import { donationsDb } from "@/lib/donations.server";
import { MONTHLY_SEWA_KEYS, SEWAS, SEWA_KEYS, formatInr, isSewaKey, type SewaKey } from "@/lib/sewa";
import { logout } from "./actions";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 50;
const TABS = ["overview", ...SEWA_KEYS, "subscriptions", "webhooks"] as const;
type Tab = (typeof TABS)[number];
const TAB_LABELS: Record<Tab, string> = {
  overview: "Overview",
  shiksha: "Shiksha Sewa",
  annapurna: "Annapurna Sewa",
  nirman: "Nirman Sewa",
  gita: "Living the Gita",
  session: "Personal Session",
  subscriptions: "Monthly Auto-pay",
  webhooks: "Webhook Log",
};

type Params = { tab?: string; status?: string; q?: string; page?: string };
type Row = Record<string, unknown>;

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  dateStyle: "medium",
  timeStyle: "short",
});
const fmtDate = (value: unknown) => (value ? dateFmt.format(new Date(String(value))) : "—");
const money = (value: unknown) => formatInr(Number(value ?? 0));

function startOfMonthIst() {
  const now = new Date(Date.now() + 5.5 * 3600_000);
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1) - 5.5 * 3600_000).toISOString();
}

// Keeps PostgREST's .or() filter syntax intact.
const cleanSearch = (q: string) => q.replace(/[,()%*\\]/g, " ").trim().slice(0, 80);

function hrefWith(current: Params, next: Partial<Params>) {
  const merged = { ...current, ...next };
  const qs = new URLSearchParams();
  for (const [key, value] of Object.entries(merged)) if (value) qs.set(key, value);
  const s = qs.toString();
  return `/admin${s ? `?${s}` : ""}`;
}

export default async function AdminPage({ searchParams }: { searchParams: Promise<Params> }) {
  await requireAdmin();
  const params = await searchParams;
  const tab: Tab = (TABS as readonly string[]).includes(params.tab ?? "") ? (params.tab as Tab) : "overview";

  let content: React.ReactNode;
  try {
    const db = await donationsDb();
    if (tab === "overview") content = await Overview({ db });
    else if (isSewaKey(tab)) content = await DonationsTable({ db, sewa: tab, params });
    else if (tab === "subscriptions") content = await SubscriptionsTable({ db, params });
    else content = await WebhookLog({ db });
  } catch (err) {
    content = (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
        <p className="font-bold">Could not load donation data.</p>
        <p className="mt-1">{err instanceof Error ? err.message : String(err)}</p>
        <p className="mt-2 text-red-700">
          If the tables don&apos;t exist yet, run <code>supabase/donations.sql</code>, <code>supabase/living-the-gita.sql</code> and <code>supabase/personal-session.sql</code> in the Supabase SQL Editor.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#521623]">Donations Admin</h1>
          <p className="text-xs text-[#7A6165]">All payments via Razorpay · times in IST</p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/events" className="flex items-center gap-1.5 rounded-full bg-[#B8860B] px-4 py-2 text-xs font-bold text-white hover:bg-[#9A700A]">
            <CalendarDays size={13} /> Events
          </Link>
          <Link href={hrefWith(params, {})} className="flex items-center gap-1.5 rounded-full border border-[#E8D6B5] bg-white px-4 py-2 text-xs font-bold text-[#521623] hover:bg-[#FFF4CF]">
            <RefreshCw size={13} /> Refresh
          </Link>
          <form action={logout}>
            <button className="flex items-center gap-1.5 rounded-full bg-[#521623] px-4 py-2 text-xs font-bold text-white hover:bg-[#3B0910]">
              <LogOut size={13} /> Sign out
            </button>
          </form>
        </div>
      </header>

      <nav className="mb-6 flex gap-1 overflow-x-auto rounded-full bg-white p-1 shadow-sm" aria-label="Admin sections">
        {TABS.map((t) => (
          <Link
            key={t}
            href={hrefWith({}, { tab: t === "overview" ? undefined : t })}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
              tab === t ? "bg-[#521623] text-white" : "text-[#521623] hover:bg-[#F3E7D3]"
            }`}
          >
            {TAB_LABELS[t]}
          </Link>
        ))}
      </nav>

      {content}
    </div>
  );
}

/* ─────────────── Overview ─────────────── */

async function Overview({ db }: { db: SupabaseClient }) {
  const monthStart = startOfMonthIst();
  const perSewa = await Promise.all(
    SEWA_KEYS.map(async (sewa) => {
      const { data, error } = await db
        .from(SEWAS[sewa].table)
        .select("amount, status, paid_at")
        .limit(100_000);
      if (error) throw new Error(error.message);
      const rows = (data ?? []) as { amount: number; status: string; paid_at: string | null }[];
      const paid = rows.filter((r) => r.status === "paid");
      const sum = (list: typeof rows) => list.reduce((s, r) => s + Number(r.amount), 0);
      return {
        sewa,
        total: sum(paid),
        count: paid.length,
        thisMonth: sum(paid.filter((r) => r.paid_at && r.paid_at >= monthStart)),
        failed: rows.filter((r) => r.status === "failed").length,
        abandoned: rows.filter((r) => r.status === "created").length,
        refunded: rows.filter((r) => r.status === "refunded").length,
      };
    }),
  );

  const subs = (
    await Promise.all(
      MONTHLY_SEWA_KEYS.map(async (sewa) => {
        const { data, error } = await db.from(SEWAS[sewa].subscriptionsTable!).select("amount, status");
        if (error) throw new Error(error.message);
        return data ?? [];
      }),
    )
  ).flat();
  const activeSubs = subs.filter((s) => s.status === "active" || s.status === "authenticated");
  const monthlyRecurring = activeSubs.reduce((s, r) => s + Number(r.amount), 0);

  const recent = (
    await Promise.all(
      SEWA_KEYS.map(async (sewa) => {
        const { data } = await db
          .from(SEWAS[sewa].table)
          .select("*")
          .eq("status", "paid")
          .order("paid_at", { ascending: false })
          .limit(10);
        return (data ?? []).map((row) => ({ ...row, sewa }));
      }),
    )
  )
    .flat()
    .sort((a, b) => String(b.paid_at).localeCompare(String(a.paid_at)))
    .slice(0, 15);

  const grand = perSewa.reduce((s, r) => s + r.total, 0);
  const grandMonth = perSewa.reduce((s, r) => s + r.thisMonth, 0);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Total raised (all)" value={formatInr(grand)} />
        <Stat label="Raised this month" value={formatInr(grandMonth)} />
        <Stat label="Active monthly donors" value={String(activeSubs.length)} />
        <Stat label="Monthly auto-pay value" value={`${formatInr(monthlyRecurring)} / mo`} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {perSewa.map((s) => (
          <Link
            key={s.sewa}
            href={`/admin?tab=${s.sewa}`}
            className="rounded-2xl border border-[#E8D6B5] bg-white p-5 shadow-sm transition hover:border-[#521623]"
          >
            <p className="text-xs font-bold uppercase tracking-wider text-[#B8860B]">{SEWAS[s.sewa].label}</p>
            <p className="mt-2 font-serif text-3xl font-bold text-[#521623]">{formatInr(s.total)}</p>
            <p className="text-xs text-[#7A6165]">{s.count} successful donations</p>
            <dl className="mt-4 grid grid-cols-2 gap-y-1 text-xs">
              <dt className="text-[#7A6165]">This month</dt>
              <dd className="text-right font-semibold">{formatInr(s.thisMonth)}</dd>
              <dt className="text-[#7A6165]">Failed</dt>
              <dd className="text-right font-semibold">{s.failed}</dd>
              <dt className="text-[#7A6165]">Started, not paid</dt>
              <dd className="text-right font-semibold">{s.abandoned}</dd>
              <dt className="text-[#7A6165]">Refunded</dt>
              <dd className="text-right font-semibold">{s.refunded}</dd>
            </dl>
          </Link>
        ))}
      </div>

      <section className="rounded-2xl border border-[#E8D6B5] bg-white p-5 shadow-sm">
        <h2 className="mb-3 font-serif text-xl font-bold text-[#521623]">Latest successful payments</h2>
        <Table
          rows={recent}
          empty="No payments yet."
          columns={[
            ["Paid at", (r) => fmtDate(r.paid_at)],
            ["Sewa", (r) => SEWAS[r.sewa as SewaKey].label],
            ["Donor", (r) => <Donor row={r} />],
            ["Amount", (r) => <strong>{money(r.amount)}</strong>],
            ["Type", (r) => (r.frequency === "monthly" ? "Monthly" : "One-time")],
            ["Payment ID", (r) => <Mono>{r.razorpay_payment_id}</Mono>],
          ]}
        />
      </section>
    </div>
  );
}

/* ─────────────── Per-sewa donations ─────────────── */

const DONATION_STATUSES = ["paid", "created", "failed", "refunded"];

async function DonationsTable({ db, sewa, params }: { db: SupabaseClient; sewa: SewaKey; params: Params }) {
  const page = Math.max(1, Number(params.page) || 1);
  const status = DONATION_STATUSES.includes(params.status ?? "") ? params.status : undefined;
  const q = cleanSearch(params.q ?? "");

  let query = db.from(SEWAS[sewa].table).select("*", { count: "exact" });
  if (status) query = query.eq("status", status);
  if (q) {
    query = query.or(
      ["donor_name", "donor_email", "donor_phone", "razorpay_payment_id", "razorpay_order_id"]
        .map((c) => `${c}.ilike.*${q}*`)
        .join(","),
    );
  }
  const { data, count, error } = await query
    .order("created_at", { ascending: false })
    .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);
  if (error) throw new Error(error.message);

  const filteredSum = (data ?? [])
    .filter((r) => r.status === "paid")
    .reduce((s, r) => s + Number(r.amount), 0);

  return (
    <section className="rounded-2xl border border-[#E8D6B5] bg-white p-5 shadow-sm">
      <Toolbar params={params} statuses={DONATION_STATUSES} exportKey={sewa} placeholder="Search name, email, phone, payment / order ID" />
      <p className="mb-3 text-xs text-[#7A6165]">
        {count ?? 0} records · paid on this page: <strong>{formatInr(filteredSum)}</strong>
      </p>
      <Table
        rows={data ?? []}
        empty="No donations match."
        columns={[
          ["Created", (r) => fmtDate(r.created_at)],
          ["Donor", (r) => <Donor row={r} />],
          ["Amount", (r) => <strong>{money(r.amount)}</strong>],
          ...(SEWAS[sewa].subscriptionsTable
            ? ([["Type", (r: Row) => (r.frequency === "monthly" ? "Monthly" : "One-time")]] as const)
            : []),
          ...(SEWAS[sewa].kind === "booking"
            ? ([
                ["Session", (r: Row) => String(r.session_status ?? "—").replace("_", " ")],
                ["Scheduled for", (r: Row) => fmtDate(r.session_at)],
              ] as const)
            : []),
          ["Status", (r) => <StatusBadge status={String(r.status)} />],
          ["Paid at", (r) => fmtDate(r.paid_at)],
          ["Method", (r) => String(r.payment_method ?? "—")],
          ["PAN", (r) => <Mono>{r.donor_pan}</Mono>],
          [
            "Razorpay",
            (r) => (
              <div className="space-y-0.5">
                <Mono>{r.razorpay_payment_id}</Mono>
                <Mono>{r.razorpay_order_id ?? r.razorpay_subscription_id}</Mono>
                {r.failure_reason ? <p className="text-[10px] text-red-700">{String(r.failure_reason)}</p> : null}
              </div>
            ),
          ],
        ]}
      />
      <Pager params={params} page={page} total={count ?? 0} />
    </section>
  );
}

/* ─────────────── Monthly subscriptions ─────────────── */

const SUB_STATUSES = ["active", "authenticated", "created", "pending", "halted", "paused", "cancelled", "completed", "expired"];

async function SubscriptionsTable({ db, params }: { db: SupabaseClient; params: Params }) {
  const page = Math.max(1, Number(params.page) || 1);
  const status = SUB_STATUSES.includes(params.status ?? "") ? params.status : undefined;
  const q = cleanSearch(params.q ?? "");

  const all = (
    await Promise.all(
      MONTHLY_SEWA_KEYS.map(async (sewa) => {
        let query = db.from(SEWAS[sewa].subscriptionsTable!).select("*");
        if (status) query = query.eq("status", status);
        if (q) {
          query = query.or(
            ["donor_name", "donor_email", "donor_phone", "razorpay_subscription_id"]
              .map((c) => `${c}.ilike.*${q}*`)
              .join(","),
          );
        }
        const { data, error } = await query.limit(10_000);
        if (error) throw new Error(error.message);
        return (data ?? []).map((row) => ({ ...row, sewa }));
      }),
    )
  )
    .flat()
    .sort((x, y) => String(y.created_at).localeCompare(String(x.created_at)));
  const count = all.length;
  const data = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <section className="rounded-2xl border border-[#E8D6B5] bg-white p-5 shadow-sm">
      <Toolbar params={params} statuses={SUB_STATUSES} exportKey="subscriptions" placeholder="Search name, email, phone, subscription ID" />
      <p className="mb-3 text-xs text-[#7A6165]">
        {count} Shiksha Sewa monthly auto-pay mandates. &quot;Halted&quot; means Razorpay could not charge after retries.
      </p>
      <Table
        rows={data}
        empty="No monthly donors yet."
        columns={[
          ["Started", (r) => fmtDate(r.created_at)],
          ["Sewa", (r) => SEWAS[r.sewa as SewaKey].label],
          ["Donor", (r) => <Donor row={r} />],
          ["Per month", (r) => <strong>{money(r.amount)}</strong>],
          ["Status", (r) => <StatusBadge status={String(r.status)} />],
          ["Charges", (r) => String(r.paid_count ?? 0)],
          ["Total paid", (r) => money(r.total_paid)],
          ["Next charge", (r) => fmtDate(r.next_charge_at)],
          ["Subscription ID", (r) => <Mono>{r.razorpay_subscription_id}</Mono>],
        ]}
      />
      <Pager params={params} page={page} total={count} />
    </section>
  );
}

/* ─────────────── Webhook log ─────────────── */

async function WebhookLog({ db }: { db: SupabaseClient }) {
  const { data, error } = await db
    .from("razorpay_webhook_events")
    .select("event_id, event_type, sewa, received_at, processed_at, error")
    .order("received_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);

  return (
    <section className="rounded-2xl border border-[#E8D6B5] bg-white p-5 shadow-sm">
      <p className="mb-3 text-xs text-[#7A6165]">
        Last 100 events from Razorpay. If this stays empty after a payment, check the webhook URL and secret in the Razorpay dashboard.
      </p>
      <Table
        rows={data ?? []}
        empty="No webhook events received yet."
        columns={[
          ["Received", (r) => fmtDate(r.received_at)],
          ["Event", (r) => <Mono>{r.event_type}</Mono>],
          ["Sewa", (r) => String(r.sewa ?? "—")],
          [
            "Result",
            (r) =>
              r.error ? (
                <span className="text-red-700">{String(r.error)}</span>
              ) : r.processed_at ? (
                <StatusBadge status="processed" />
              ) : (
                <StatusBadge status="pending" />
              ),
          ],
          ["Event ID", (r) => <Mono>{r.event_id}</Mono>],
        ]}
      />
    </section>
  );
}

/* ─────────────── UI bits ─────────────── */

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-[#521623] p-5 text-white shadow-sm">
      <p className="text-xs text-white/70">{label}</p>
      <p className="mt-1 font-serif text-2xl font-bold">{value}</p>
    </div>
  );
}

function Mono({ children }: { children: unknown }) {
  return children ? <code className="block font-mono text-[11px] text-[#5A4448]">{String(children)}</code> : <span className="text-[#B0A39C]">—</span>;
}

function Donor({ row }: { row: Row }) {
  return (
    <div>
      <p className="font-semibold">{String(row.donor_name ?? "—")}</p>
      <p className="text-[11px] text-[#7A6165]">{String(row.donor_email ?? "")}</p>
      <p className="text-[11px] text-[#7A6165]">{String(row.donor_phone ?? "")}</p>
    </div>
  );
}

const BADGE: Record<string, string> = {
  paid: "bg-green-100 text-green-800",
  active: "bg-green-100 text-green-800",
  processed: "bg-green-100 text-green-800",
  authenticated: "bg-blue-100 text-blue-800",
  created: "bg-gray-100 text-gray-700",
  pending: "bg-amber-100 text-amber-800",
  failed: "bg-red-100 text-red-800",
  halted: "bg-red-100 text-red-800",
  refunded: "bg-purple-100 text-purple-800",
  cancelled: "bg-gray-200 text-gray-700",
};

function StatusBadge({ status }: { status: string }) {
  const label = status === "created" ? "not paid" : status;
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold capitalize ${BADGE[status] ?? "bg-gray-100 text-gray-700"}`}>
      {label}
    </span>
  );
}

function Table({
  rows,
  columns,
  empty,
}: {
  rows: Row[];
  columns: readonly (readonly [string, (row: Row) => React.ReactNode])[];
  empty: string;
}) {
  if (!rows.length) return <p className="py-10 text-center text-sm text-[#7A6165]">{empty}</p>;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[760px] text-left text-sm">
        <thead>
          <tr className="border-b border-[#EADBC2] text-[11px] uppercase tracking-wider text-[#7A6165]">
            {columns.map(([label]) => (
              <th key={label} className="px-3 py-2 font-bold">{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={String(row.id ?? row.event_id ?? i)} className="border-b border-[#F3EADB] align-top hover:bg-[#FFFAF0]">
              {columns.map(([label, render]) => (
                <td key={label} className="px-3 py-2.5">{render(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Toolbar({
  params,
  statuses,
  exportKey,
  placeholder,
}: {
  params: Params;
  statuses: string[];
  exportKey: string;
  placeholder: string;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <form className="flex flex-1 flex-wrap gap-2" action="/admin">
        <input type="hidden" name="tab" value={params.tab} />
        <input
          name="q"
          defaultValue={params.q}
          placeholder={placeholder}
          className="min-w-[220px] flex-1 rounded-full border border-[#E8D6B5] px-4 py-2 text-sm focus:border-[#521623] focus:outline-none"
        />
        <select
          name="status"
          defaultValue={params.status ?? ""}
          className="rounded-full border border-[#E8D6B5] bg-white px-4 py-2 text-sm"
        >
          <option value="">All statuses</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{s === "created" ? "not paid" : s}</option>
          ))}
        </select>
        <button className="rounded-full bg-[#521623] px-5 py-2 text-xs font-bold text-white">Filter</button>
      </form>
      <a
        href={`/admin/export?table=${exportKey}`}
        className="flex items-center gap-1.5 rounded-full border border-[#521623] px-4 py-2 text-xs font-bold text-[#521623] hover:bg-[#FFF4CF]"
      >
        <Download size={13} /> Export CSV
      </a>
    </div>
  );
}

function Pager({ params, page, total }: { params: Params; page: number; total: number }) {
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  if (pages === 1) return null;
  return (
    <div className="mt-4 flex items-center justify-end gap-2 text-xs">
      {page > 1 && (
        <Link href={hrefWith(params, { page: String(page - 1) })} className="rounded-full border border-[#E8D6B5] px-3 py-1.5 font-bold">
          ← Prev
        </Link>
      )}
      <span className="text-[#7A6165]">Page {page} of {pages}</span>
      {page < pages && (
        <Link href={hrefWith(params, { page: String(page + 1) })} className="rounded-full border border-[#E8D6B5] px-3 py-1.5 font-bold">
          Next →
        </Link>
      )}
    </div>
  );
}
