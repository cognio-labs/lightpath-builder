// admin.functions.ts - Next.js version
// All server-side operations are now handled via /api/admin and /api/submit routes.
// This file contains client-side helper functions that call those API routes.
// 
// Usage from client components:
//   import { adminApi } from "@/lib/admin.functions";
//   const role = await adminApi.getRole(token);

import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export function publicClient() {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    "";
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.SUPABASE_PUBLISHABLE_KEY ||
    "";
  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export type SubmissionType = "book_session" | "contact" | "callback";

export async function submitForm(data: {
  type: SubmissionType;
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  meta?: Record<string, unknown>;
}) {
  const res = await fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function listCoursesPublic() {
  const { data, error } = await publicClient()
    .from("courses")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getCoursePublic(slug: string) {
  const { data } = await publicClient()
    .from("courses")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  return data;
}

export async function listEventsPublic() {
  const { data, error } = await publicClient()
    .from("events")
    .select("*")
    .eq("published", true)
    .order("starts_at", { ascending: true, nullsFirst: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listTestimonialsPublic() {
  const { data, error } = await publicClient()
    .from("testimonials")
    .select("*")
    .eq("published", true)
    .order("sort_order");
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getSolutionPublic(slug: string) {
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
}

// Admin API helpers (require auth token)
export const adminApi = {
  async getRole(token: string) {
    const res = await fetch("/api/admin?action=role", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async listSubmissions(token: string) {
    const res = await fetch("/api/admin?action=submissions", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async listTable(token: string, table: string) {
    const res = await fetch(`/api/admin?action=list&table=${table}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async upsert(token: string, table: string, row: Record<string, unknown>) {
    const res = await fetch("/api/admin?action=upsert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ table, row }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
  async delete(token: string, table: string, id: string) {
    const res = await fetch("/api/admin?action=delete", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ table, id }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};

// Keep named exports for backward compat with any imports
export const getMyRole = adminApi.getRole;
export const adminListSubmissions = adminApi.listSubmissions;
export const adminList = adminApi.listTable;
export const adminUpsert = adminApi.upsert;
export const adminDelete = adminApi.delete;
