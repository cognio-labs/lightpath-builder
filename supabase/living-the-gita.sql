-- ════════════════════════════════════════════════════════════════════
-- Living the Gita donations (one-time only, like Annapurna / Nirman).
-- Run once in Supabase → SQL Editor, AFTER supabase/donations.sql (it reuses
-- the types and trigger function created there). Safe to re-run.
--
--   living_the_gita_donations     one-time payments
--   razorpay_plans                now keyed by (sewa, amount) — needed by the
--                                 monthly auto-pay code (Shiksha Sewa)
--   sewa_donation_totals (view)   now includes Living the Gita
-- ════════════════════════════════════════════════════════════════════

-- ─── 1. Living the Gita (one-time) ──────────────────────────────────
create table if not exists living_the_gita_donations (
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
  notes                jsonb not null default '{}'::jsonb,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

create index if not exists gita_donations_status_idx on living_the_gita_donations (status, paid_at desc);

drop trigger if exists trg_gita_donations_updated on living_the_gita_donations;
create trigger trg_gita_donations_updated before update on living_the_gita_donations
  for each row execute function set_updated_at();

alter table living_the_gita_donations enable row level security;

-- An earlier draft of this file also created a monthly table for Living the
-- Gita. It was never used — remove it if it exists.
drop table if exists living_the_gita_subscriptions cascade;

-- ─── 2. Plans per sewa ──────────────────────────────────────────────
-- Existing plans were all created for Shiksha Sewa.
alter table razorpay_plans add column if not exists sewa text not null default 'shiksha';
alter table razorpay_plans drop constraint if exists razorpay_plans_pkey;
alter table razorpay_plans add primary key (sewa, amount);

-- ─── 3. Totals view, now with Living the Gita ───────────────────────
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
  from living_the_gita_donations where status = 'paid';

-- Check:  select * from sewa_donation_totals;   → 4 rows
