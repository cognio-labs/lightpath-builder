import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  getMyRole,
  adminListSubmissions,
  adminUpdateSubmission,
  adminDeleteSubmission,
  adminList,
  adminUpsert,
  adminDelete,
} from "@/lib/admin.functions";
import { Trash2, Plus, LogOut, Save, X } from "lucide-react";

type AdminRow = Record<string, unknown> & { id?: string };
type SubmissionStatus = "new" | "contacted" | "closed";
type SubmissionRow = AdminRow & {
  id: string;
  type?: string;
  status?: SubmissionStatus;
  created_at?: string;
  name?: string;
  email?: string | null;
  phone?: string | null;
  message?: string | null;
  meta?: unknown;
};

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [{ title: "Admin — Science Divine" }, { name: "robots", content: "noindex" }],
  }),
  component: AdminPage,
});

type Tab =
  "submissions" | "courses" | "events" | "testimonials" | "solution_pages" | "solution_articles";

const TABS: { id: Tab; label: string }[] = [
  { id: "submissions", label: "Submissions" },
  { id: "courses", label: "Courses" },
  { id: "events", label: "Events" },
  { id: "testimonials", label: "Testimonials" },
  { id: "solution_pages", label: "Solution pages" },
  { id: "solution_articles", label: "Solution articles" },
];

function AdminPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("submissions");
  const roleFn = useServerFn(getMyRole);
  const role = useQuery({ queryKey: ["my-role"], queryFn: () => roleFn() });

  useEffect(() => {
    if (role.data && !role.data.isAdmin) {
      // signed in but not admin
    }
  }, [role.data]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (role.isLoading)
    return <div className="container-page py-20 text-center text-muted-foreground">Loading…</div>;
  if (role.data && !role.data.isAdmin) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-bold mb-2">Not an admin</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Your account is signed in but not an admin. Ask an existing admin to promote you.
        </p>
        <button
          onClick={signOut}
          className="btn-gradient rounded-full px-6 py-3 text-sm font-semibold"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="container-page py-10">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold gradient-text">Admin panel</h1>
          <p className="text-sm text-muted-foreground">Manage site content and inbox.</p>
        </div>
        <div className="flex gap-2">
          <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm">
            View site
          </Link>
          <button
            onClick={signOut}
            className="rounded-full border border-border px-4 py-2 text-sm inline-flex items-center gap-2"
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 border-b mb-6">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${tab === t.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "submissions" ? <SubmissionsPanel /> : <CrudPanel table={tab} />}
    </div>
  );
}

function SubmissionsPanel() {
  const qc = useQueryClient();
  const listFn = useServerFn(adminListSubmissions);
  const updFn = useServerFn(adminUpdateSubmission);
  const delFn = useServerFn(adminDeleteSubmission);
  const q = useQuery({ queryKey: ["submissions"], queryFn: () => listFn() });
  const upd = useMutation({
    mutationFn: (d: { id: string; status?: SubmissionStatus; admin_notes?: string }) =>
      updFn({ data: d }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });
  const del = useMutation({
    mutationFn: (id: string) => delFn({ data: id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["submissions"] }),
  });

  if (q.isLoading) return <div className="text-muted-foreground text-sm">Loading…</div>;
  const rows = q.data ?? [];
  if (rows.length === 0)
    return (
      <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground">
        No submissions yet. Book Session and Contact form entries will appear here.
      </div>
    );

  return (
    <div className="space-y-3">
      {rows.map((r: SubmissionRow) => (
        <div key={r.id} className="glass-card rounded-2xl p-5">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold gradient-bg text-white">
                  {r.type}
                </span>
                <span
                  className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${r.status === "new" ? "bg-primary/10 text-primary" : r.status === "contacted" ? "bg-amber-500/10 text-amber-700" : "bg-muted text-muted-foreground"}`}
                >
                  {r.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(r.created_at).toLocaleString()}
                </span>
              </div>
              <div className="font-semibold">{r.name}</div>
              <div className="text-sm text-muted-foreground">
                {r.email} {r.phone && `· ${r.phone}`}
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={r.status}
                onChange={(e) =>
                  upd.mutate({ id: r.id, status: e.target.value as SubmissionStatus })
                }
                className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              <button
                onClick={() => {
                  if (confirm("Delete this submission?")) del.mutate(r.id);
                }}
                className="rounded-lg border border-destructive/40 text-destructive p-2 hover:bg-destructive/10"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          {r.message && (
            <p className="text-sm bg-secondary/40 rounded-xl p-3 whitespace-pre-wrap">
              {r.message}
            </p>
          )}
          {r.meta && (
            <pre className="mt-2 text-xs text-muted-foreground overflow-x-auto">
              {JSON.stringify(r.meta, null, 2)}
            </pre>
          )}
        </div>
      ))}
    </div>
  );
}

// ------- Generic CRUD panel -------
const SCHEMAS: Record<
  Exclude<Tab, "submissions">,
  {
    field: string;
    label: string;
    type: "text" | "number" | "textarea" | "bool" | "datetime" | "select";
    options?: string[];
  }[]
> = {
  courses: [
    { field: "slug", label: "Slug", type: "text" },
    { field: "title", label: "Title", type: "text" },
    { field: "tagline", label: "Tagline", type: "text" },
    { field: "description", label: "Description", type: "textarea" },
    { field: "image_url", label: "Image URL", type: "text" },
    { field: "price_inr", label: "Price (INR)", type: "number" },
    { field: "duration", label: "Duration", type: "text" },
    { field: "sort_order", label: "Sort order", type: "number" },
    { field: "published", label: "Published", type: "bool" },
  ],
  events: [
    { field: "title", label: "Title", type: "text" },
    { field: "description", label: "Description", type: "textarea" },
    { field: "image_url", label: "Image URL", type: "text" },
    { field: "location", label: "Location", type: "text" },
    { field: "starts_at", label: "Starts at", type: "datetime" },
    { field: "ends_at", label: "Ends at", type: "datetime" },
    { field: "register_url", label: "Register URL", type: "text" },
    { field: "published", label: "Published", type: "bool" },
  ],
  testimonials: [
    { field: "author_name", label: "Author name", type: "text" },
    { field: "author_title", label: "Author title", type: "text" },
    { field: "quote", label: "Quote", type: "textarea" },
    { field: "youtube_id", label: "YouTube video ID", type: "text" },
    { field: "image_url", label: "Image URL", type: "text" },
    { field: "sort_order", label: "Sort order", type: "number" },
    { field: "published", label: "Published", type: "bool" },
  ],
  solution_pages: [
    { field: "slug", label: "Slug", type: "text" },
    { field: "title", label: "Title", type: "text" },
    { field: "tagline", label: "Tagline", type: "text" },
    { field: "intro", label: "Intro", type: "textarea" },
  ],
  solution_articles: [
    { field: "solution_slug", label: "Solution slug", type: "text" },
    { field: "title", label: "Title", type: "text" },
    { field: "excerpt", label: "Excerpt", type: "textarea" },
    { field: "body", label: "Body", type: "textarea" },
    { field: "link_url", label: "Link URL", type: "text" },
    { field: "sort_order", label: "Sort order", type: "number" },
    { field: "published", label: "Published", type: "bool" },
  ],
};

function CrudPanel({ table }: { table: Exclude<Tab, "submissions"> }) {
  const qc = useQueryClient();
  const listFn = useServerFn(adminList);
  const upsertFn = useServerFn(adminUpsert);
  const deleteFn = useServerFn(adminDelete);
  const q = useQuery({ queryKey: ["admin-list", table], queryFn: () => listFn({ data: table }) });
  const upsert = useMutation({
    mutationFn: (row: AdminRow) => upsertFn({ data: { table, row } }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-list", table] });
      setEditing(null);
    },
  });
  const del = useMutation({
    mutationFn: (id: string) => deleteFn({ data: { table, id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-list", table] }),
  });
  const [editing, setEditing] = useState<AdminRow | null>(null);
  const schema = SCHEMAS[table];
  const rows = q.data ?? [];
  const displayField = useMemo(
    () => schema.find((f) => ["title", "author_name", "slug"].includes(f.field))?.field ?? "id",
    [schema],
  );

  return (
    <div>
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setEditing({})}
          className="btn-gradient rounded-full px-4 py-2 text-sm font-semibold inline-flex items-center gap-2"
        >
          <Plus size={14} /> New
        </button>
      </div>

      {q.isLoading ? (
        <div className="text-muted-foreground text-sm">Loading…</div>
      ) : rows.length === 0 ? (
        <div className="glass-card rounded-2xl p-8 text-center text-muted-foreground">
          No entries yet. Click "New" to add one.
        </div>
      ) : (
        <div className="space-y-2">
          {rows.map((r: AdminRow) => (
            <div
              key={r.id}
              className="glass-card rounded-xl p-4 flex items-center justify-between gap-3"
            >
              <div className="min-w-0">
                <div className="font-medium truncate">
                  {String(r[displayField] ?? "(untitled)")}
                </div>
                {"published" in r && r.published !== true && (
                  <span className="text-xs text-muted-foreground">draft</span>
                )}
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => setEditing(r)}
                  className="rounded-lg border border-border px-3 py-1.5 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    if (r.id && confirm("Delete this item?")) del.mutate(r.id);
                  }}
                  className="rounded-lg border border-destructive/40 text-destructive p-2"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div
          className="fixed inset-0 bg-black/50 z-50 grid place-items-center p-4"
          onClick={() => setEditing(null)}
        >
          <div
            className="bg-background rounded-3xl p-6 w-full max-w-2xl max-h-[90dvh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold">
                {editing.id ? "Edit" : "New"} {table}
              </h2>
              <button onClick={() => setEditing(null)}>
                <X size={20} />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const row: AdminRow = editing.id ? { id: editing.id } : {};
                for (const f of schema) {
                  const v = fd.get(f.field);
                  if (f.type === "bool") row[f.field] = fd.get(f.field) === "on";
                  else if (f.type === "number")
                    row[f.field] = v === "" || v === null ? null : Number(v);
                  else if (f.type === "datetime")
                    row[f.field] = v ? new Date(v as string).toISOString() : null;
                  else row[f.field] = v === "" ? null : v;
                }
                upsert.mutate(row);
              }}
              className="space-y-4"
            >
              {schema.map((f) => (
                <div key={f.field}>
                  <label className="block text-sm font-medium mb-1">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      name={f.field}
                      defaultValue={editing[f.field] ?? ""}
                      rows={4}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                    />
                  ) : f.type === "bool" ? (
                    <input
                      type="checkbox"
                      name={f.field}
                      defaultChecked={editing[f.field] ?? true}
                      className="h-4 w-4"
                    />
                  ) : f.type === "datetime" ? (
                    <input
                      type="datetime-local"
                      name={f.field}
                      defaultValue={
                        editing[f.field]
                          ? new Date(editing[f.field]).toISOString().slice(0, 16)
                          : ""
                      }
                      className="rounded-xl border border-input bg-background px-3 py-2 text-sm"
                    />
                  ) : (
                    <input
                      type={f.type === "number" ? "number" : "text"}
                      name={f.field}
                      defaultValue={editing[f.field] ?? ""}
                      className="w-full rounded-xl border border-input bg-background px-3 py-2 text-sm"
                    />
                  )}
                </div>
              ))}
              {upsert.isError && (
                <p className="text-sm text-destructive">{(upsert.error as Error).message}</p>
              )}
              <div className="flex gap-2 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="rounded-full border border-border px-5 py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={upsert.isPending}
                  className="btn-gradient rounded-full px-5 py-2 text-sm font-semibold inline-flex items-center gap-2"
                >
                  <Save size={14} /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
