import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

// -------- Public read (no auth) --------
function publicClient() {
  const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
  return createClient<Database>(process.env.SUPABASE_URL!, key, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`)
          h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });
}

export const listCoursesPublic = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("courses")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getCoursePublic = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data: slug }) => {
    const { data } = await publicClient()
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    return data;
  });

export const listEventsPublic = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("events")
    .select("*")
    .eq("published", true)
    .order("starts_at", { ascending: true, nullsFirst: false });
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const listTestimonialsPublic = createServerFn({ method: "GET" }).handler(async () => {
  const { data, error } = await publicClient()
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const getSolutionPublic = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => z.string().min(1).parse(slug))
  .handler(async ({ data: slug }) => {
    const c = publicClient();
    const [page, articles] = await Promise.all([
      c.from("solution_pages").select("*").eq("slug", slug).maybeSingle(),
      c
        .from("solution_articles")
        .select("*")
        .eq("solution_slug", slug)
        .eq("published", true)
        .order("sort_order"),
    ]);
    return { page: page.data, articles: articles.data ?? [] };
  });

// -------- Submissions --------
const submissionSchema = z.object({
  type: z.enum(["book_session", "contact", "callback"]),
  name: z.string().trim().min(1).max(120),
  email: z
    .string()
    .trim()
    .email()
    .max(255)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? v : undefined)),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().max(4000).optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
});

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => submissionSchema.parse(d))
  .handler(async ({ data }) => {
    const c = publicClient();
    const { error } = await c.from("form_submissions").insert({
      type: data.type,
      name: data.name,
      email: data.email ?? null,
      phone: data.phone ?? null,
      message: data.message ?? null,
      meta: data.meta ?? null,
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// -------- Admin-only --------
async function assertAdmin(supabase: SupabaseClient<Database>, userId: string) {
  const { data, error } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: admin role required");
}

export const getMyRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    const roles = (data ?? []).map((r: { role: string }) => r.role);
    return { userId: context.userId, roles, isAdmin: roles.includes("admin") };
  });

export const adminListSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data, error } = await context.supabase
      .from("form_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpdateSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (d: { id: string; status?: "new" | "contacted" | "closed"; admin_notes?: string }) => d,
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const patch: Record<string, unknown> = {};
    if (data.status) patch.status = data.status;
    if (data.admin_notes !== undefined) patch.admin_notes = data.admin_notes;
    const { error } = await context.supabase
      .from("form_submissions")
      .update(patch)
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const adminDeleteSubmission = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((id: string) => id)
  .handler(async ({ data: id, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("form_submissions").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// Generic admin CRUD
const TABLES = [
  "courses",
  "events",
  "testimonials",
  "solution_pages",
  "solution_articles",
] as const;
type AdminTable = (typeof TABLES)[number];

export const adminList = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((table: AdminTable) => z.enum(TABLES).parse(table))
  .handler(async ({ data: table, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const orderCol =
      table === "events" ? "starts_at" : table === "solution_pages" ? "slug" : "sort_order";
    const { data, error } = await context.supabase
      .from(table)
      .select("*")
      .order(orderCol, { ascending: true, nullsFirst: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const adminUpsert = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { table: AdminTable; row: Record<string, unknown> }) => ({
    table: z.enum(TABLES).parse(d.table),
    row: d.row,
  }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { table, row } = data;
    const { id, ...rest } = row;
    if (id) {
      const { error } = await context.supabase.from(table).update(rest).eq("id", id);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await context.supabase.from(table).insert(rest);
      if (error) throw new Error(error.message);
    }
    return { ok: true };
  });

export const adminDelete = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { table: AdminTable; id: string }) => ({
    table: z.enum(TABLES).parse(d.table),
    id: z.string().uuid().parse(d.id),
  }))
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from(data.table).delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
