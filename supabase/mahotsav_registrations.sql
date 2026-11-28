-- Shiksha Sewa Sankalp Mahotsav — registrations table
-- Run once in the Supabase SQL editor.
-- Creates ONE new table only. It does not alter any existing table and adds no triggers.

create table if not exists public.mahotsav_registrations (
  id                uuid primary key default gen_random_uuid(),
  reference_id      text not null unique,
  seat_number       text not null unique,
  full_name         text not null,
  email             text not null,
  mobile            text not null,
  city              text not null,
  attendees         smallint not null check (attendees between 1 and 50),
  event_date        date not null default date '2026-12-13',
  pass_email_status text not null default 'pending'
                    check (pass_email_status in ('pending', 'sent', 'failed')),
  pass_email_id     text,
  pass_email_error  text,
  pass_sent_at      timestamptz,
  created_at        timestamptz not null default now()
);

create index if not exists mahotsav_registrations_email_idx
  on public.mahotsav_registrations (lower(email));

create index if not exists mahotsav_registrations_created_at_idx
  on public.mahotsav_registrations (created_at desc);

-- Lock the table down: no public (anon/authenticated) access.
-- The website writes using the service-role key, which bypasses RLS.
alter table public.mahotsav_registrations enable row level security;
