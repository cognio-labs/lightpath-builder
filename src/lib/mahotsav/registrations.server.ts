import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Registrations for the Shiksha Sewa Sankalp Mahotsav page.
 * Uses lightpath's shared service-role Supabase client (same database as the
 * donations tables) and only touches `public.mahotsav_registrations`.
 * Create the table with supabase/mahotsav_registrations.sql.
 */

export const REGISTRATIONS_TABLE = "mahotsav_registrations";

export interface RegistrationInsert {
  reference_id: string;
  seat_number: string;
  full_name: string;
  email: string;
  mobile: string;
  city: string;
  attendees: number;
}

export interface RegistrationRow extends RegistrationInsert {
  id: string;
  created_at: string;
}

export type RegistrationUpdate = Partial<{
  pass_email_status: "pending" | "sent" | "failed";
  pass_email_id: string | null;
  pass_email_error: string | null;
  pass_sent_at: string | null;
}>;

export class SupabaseError extends Error {
  constructor(
    message: string,
    readonly code?: string
  ) {
    super(message);
  }

  /** Postgres unique_violation */
  get isUniqueViolation() {
    return this.code === "23505";
  }
}

// The generated Database type doesn't include this table, so it is queried
// through an untyped view of the shared service-role client.
async function db(): Promise<SupabaseClient> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin as unknown as SupabaseClient;
}

export async function insertRegistration(
  row: RegistrationInsert
): Promise<RegistrationRow> {
  const { data, error } = await (await db())
    .from(REGISTRATIONS_TABLE)
    .insert(row)
    .select()
    .single();
  if (error) throw new SupabaseError(error.message, error.code);
  return data as RegistrationRow;
}

export async function updateRegistration(
  id: string,
  patch: RegistrationUpdate
): Promise<void> {
  const { error } = await (await db())
    .from(REGISTRATIONS_TABLE)
    .update(patch)
    .eq("id", id);
  if (error) throw new SupabaseError(error.message, error.code);
}

export interface RegistrationListRow {
  id: string;
  reference_id: string;
  seat_number: string;
  full_name: string;
  email: string;
  mobile: string;
  city: string;
  attendees: number;
  pass_email_status: "pending" | "sent" | "failed";
  created_at: string;
}

const LIST_COLUMNS =
  "id,reference_id,seat_number,full_name,email,mobile,city,attendees,pass_email_status,created_at";

/** All registrations, newest first. Pages through PostgREST's 1000-row cap. */
export async function listRegistrations(): Promise<RegistrationListRow[]> {
  const client = await db();
  const pageSize = 1000;
  const rows: RegistrationListRow[] = [];

  for (let offset = 0; offset < 100_000; offset += pageSize) {
    const { data, error } = await client
      .from(REGISTRATIONS_TABLE)
      .select(LIST_COLUMNS)
      .order("created_at", { ascending: false })
      .order("id", { ascending: false })
      .range(offset, offset + pageSize - 1);
    if (error) throw new SupabaseError(error.message, error.code);
    rows.push(...((data ?? []) as RegistrationListRow[]));
    if ((data ?? []).length < pageSize) break;
  }
  return rows;
}

/** One registration by id (used by the admin "download pass" button). */
export async function getRegistration(id: string): Promise<RegistrationListRow | null> {
  const { data, error } = await (await db())
    .from(REGISTRATIONS_TABLE)
    .select(LIST_COLUMNS)
    .eq("id", id)
    .maybeSingle();
  if (error) throw new SupabaseError(error.message, error.code);
  return (data as RegistrationListRow | null) ?? null;
}
