-- ════════════════════════════════════════════════════════════════════
-- Personal Session bookings (₹6,100, paid via the RAZORPAY_SESSION page).
-- Run once in Supabase → SQL Editor, AFTER donations.sql and
-- living-the-gita.sql (it reuses their types and trigger function).
-- Safe to re-run.
--
--   personal_session_bookings     one row per paid (or failed) booking
--   sewa_donation_totals (view)   now includes Personal Session
-- ════════════════════════════════════════════════════════════════════

create table if not exists personal_session_bookings (
  id                   uuid primary key default gen_random_uuid(),
  amount               numeric(12,2) not null check (amount > 0),
  currency             text not null default 'INR',
  status               donation_status not null default 'created',
  razorpay_order_id    text unique not null,
  razorpay_payment_id  text unique,
  payment_method       text,
  donor_name           text,
  donor_email          text,
  donor_phone          text,
  donor_pan            text,
  failure_reason       text,
  paid_at              timestamptz,
  -- For the team: update in Supabase Table Editor as the session progresses.
  session_status       text not null default 'to_schedule'
                         check (session_status in ('to_schedule', 'scheduled', 'completed', 'cancelled')),
  session_at           timestamptz,
  notes                jsonb not null default '{}'::jsonb,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists session_bookings_status_idx on personal_session_bookings (status, paid_at desc);
create index if not exists session_bookings_todo_idx   on personal_session_bookings (session_status) where status = 'paid';

drop trigger if exists trg_session_bookings_updated on personal_session_bookings;
create trigger trg_session_bookings_updated before update on personal_session_bookings
  for each row execute function set_updated_at();

alter table personal_session_bookings enable row level security;

-- Totals view, now with Personal Session.
create or replace view sewa_donation_totals
with (security_invoker = true) as
select 'shiksha'   as sewa, count(*) as donations, coalesce(sum(amount), 0) as total_raised,
       (select count(*) from shiksha_sewa_subscriptions where status = 'active') as active_monthly_donors
  from shiksha_sewa_donations where status = 'paid'
union all
select 'annapurna', count(*), coalesce(sum(amount), 0), 0
  from annapurna_sewa_donations where status = 'paid'
union all
select 'nirman', count(*), coalesce(sum(amount), 0), 0
  from nirman_sewa_donations where status = 'paid'
union all
select 'gita', count(*), coalesce(sum(amount), 0), 0
  from living_the_gita_donations where status = 'paid'
union all
select 'session', count(*), coalesce(sum(amount), 0), 0
  from personal_session_bookings where status = 'paid';

-- Check:  select * from sewa_donation_totals;   → 5 rows
-- Sessions to schedule:
--   select donor_name, donor_email, donor_phone, paid_at from personal_session_bookings
--    where status = 'paid' and session_status = 'to_schedule' order by paid_at;
