-- ════════════════════════════════════════════════════════════════════
-- Sewa donations (Razorpay) — run once in Supabase → SQL Editor.
--
--   shiksha_sewa_donations        one-time + every monthly auto-pay charge
--   shiksha_sewa_subscriptions    one row per monthly auto-pay mandate
--   annapurna_sewa_donations      one-time only
--   nirman_sewa_donations         one-time only
--   razorpay_webhook_events       raw webhook log (dedupe + debugging)
--   sewa_donation_totals (view)   raised amount per sewa
--
-- All writes happen from Next.js API routes using SUPABASE_SERVICE_ROLE_KEY,
-- which bypasses RLS. RLS is enabled with no policies so the public anon key
-- can never read donor data.
-- Amounts are stored in rupees (Razorpay sends paise; the API divides by 100).
-- ════════════════════════════════════════════════════════════════════

create extension if not exists pgcrypto;

-- ─── Shared status type ─────────────────────────────────────────────
do $$ begin
  create type donation_status as enum ('created', 'paid', 'failed', 'refunded');
exception when duplicate_object then null; end $$;

do $$ begin
  create type subscription_status as enum (
    'created', 'authenticated', 'active', 'pending', 'halted',
    'paused', 'cancelled', 'completed', 'expired'
  );
exception when duplicate_object then null; end $$;

-- ─── Shared updated_at trigger ──────────────────────────────────────
create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

-- ════════════════════════════════════════════════════════════════════
-- 1. SHIKSHA SEWA
-- ════════════════════════════════════════════════════════════════════
create table if not exists shiksha_sewa_subscriptions (
  id                        uuid primary key default gen_random_uuid(),
  razorpay_subscription_id  text unique not null,
  razorpay_plan_id          text not null,
  razorpay_customer_id      text,
  amount                    numeric(12,2) not null check (amount > 0),  -- per month, INR
  status                    subscription_status not null default 'created',
  donor_name                text not null,
  donor_email               text not null,
  donor_phone               text,
  donor_pan                 text,                       -- optional, for 80G receipt
  paid_count                int not null default 0,
  total_paid                numeric(12,2) not null default 0,
  current_start             timestamptz,
  current_end               timestamptz,
  next_charge_at            timestamptz,
  cancelled_at              timestamptz,
  notes                     jsonb not null default '{}'::jsonb,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create table if not exists shiksha_sewa_donations (
  id                        uuid primary key default gen_random_uuid(),
  frequency                 text not null default 'one_time'
                              check (frequency in ('one_time', 'monthly')),
  amount                    numeric(12,2) not null check (amount > 0),
  currency                  text not null default 'INR',
  status                    donation_status not null default 'created',
  razorpay_order_id         text unique,              -- one-time payments
  razorpay_payment_id       text unique,              -- set once paid
  razorpay_subscription_id  text references shiksha_sewa_subscriptions(razorpay_subscription_id)
                              on update cascade on delete set null,
  payment_method            text,                     -- upi / card / netbanking …
  donor_name                text,
  donor_email               text,
  donor_phone               text,
  donor_pan                 text,
  failure_reason            text,
  paid_at                   timestamptz,
  notes                     jsonb not null default '{}'::jsonb,
  created_at                timestamptz not null default now(),
  updated_at                timestamptz not null default now()
);

create index if not exists shiksha_donations_status_idx on shiksha_sewa_donations (status, paid_at desc);
create index if not exists shiksha_donations_sub_idx    on shiksha_sewa_donations (razorpay_subscription_id);
create index if not exists shiksha_donations_email_idx  on shiksha_sewa_donations (lower(donor_email));
create index if not exists shiksha_subs_status_idx      on shiksha_sewa_subscriptions (status);

drop trigger if exists trg_shiksha_subs_updated on shiksha_sewa_subscriptions;
create trigger trg_shiksha_subs_updated before update on shiksha_sewa_subscriptions
  for each row execute function set_updated_at();

drop trigger if exists trg_shiksha_donations_updated on shiksha_sewa_donations;
create trigger trg_shiksha_donations_updated before update on shiksha_sewa_donations
  for each row execute function set_updated_at();

-- Razorpay subscriptions need a Plan per amount. Plans are reused so a
-- custom ₹750/month creates its plan once, not once per donor.
create table if not exists razorpay_plans (
  amount            numeric(12,2) primary key,      -- INR per month
  razorpay_plan_id  text unique not null,
  created_at        timestamptz not null default now()
);

-- ════════════════════════════════════════════════════════════════════
-- 2. ANNAPURNA SEWA (one-time)
-- ════════════════════════════════════════════════════════════════════
create table if not exists annapurna_sewa_donations (
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

create index if not exists annapurna_donations_status_idx on annapurna_sewa_donations (status, paid_at desc);

drop trigger if exists trg_annapurna_donations_updated on annapurna_sewa_donations;
create trigger trg_annapurna_donations_updated before update on annapurna_sewa_donations
  for each row execute function set_updated_at();

-- ════════════════════════════════════════════════════════════════════
-- 3. NIRMAN SEWA (one-time)
-- ════════════════════════════════════════════════════════════════════
create table if not exists nirman_sewa_donations (
  id                   uuid primary key default gen_random_uuid(),
  amount               numeric(12,2) not null check (amount > 0),
  currency             text not null default 'INR',
  status               donation_status not null default 'created',
  razorpay_order_id    text unique not null,
  razorpay_payment_id  text unique,
  payment_method       text,
  membership_tier      text,                         -- Founder / Life / General … (optional)
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

create index if not exists nirman_donations_status_idx on nirman_sewa_donations (status, paid_at desc);

drop trigger if exists trg_nirman_donations_updated on nirman_sewa_donations;
create trigger trg_nirman_donations_updated before update on nirman_sewa_donations
  for each row execute function set_updated_at();

-- ════════════════════════════════════════════════════════════════════
-- 4. WEBHOOK LOG — Razorpay retries webhooks, so the event id is unique
--    and the handler skips any event it has already processed.
-- ════════════════════════════════════════════════════════════════════
create table if not exists razorpay_webhook_events (
  event_id      text primary key,                    -- x-razorpay-event-id header
  event_type    text not null,                       -- payment.captured, subscription.charged …
  sewa          text,                                -- shiksha / annapurna / nirman (from notes)
  payload       jsonb not null,
  processed_at  timestamptz,
  error         text,
  received_at   timestamptz not null default now()
);

create index if not exists webhook_events_type_idx on razorpay_webhook_events (event_type, received_at desc);

-- ════════════════════════════════════════════════════════════════════
-- 5. RLS — on, no policies → only the service-role key can read/write.
-- ════════════════════════════════════════════════════════════════════
alter table shiksha_sewa_subscriptions enable row level security;
alter table shiksha_sewa_donations     enable row level security;
alter table annapurna_sewa_donations   enable row level security;
alter table nirman_sewa_donations      enable row level security;
alter table razorpay_plans             enable row level security;
alter table razorpay_webhook_events    enable row level security;

-- ════════════════════════════════════════════════════════════════════
-- 6. TOTALS — raised amount per sewa (drives the progress bars on
--    /initiatives). Only status = 'paid' counts.
-- ════════════════════════════════════════════════════════════════════
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
  from nirman_sewa_donations where status = 'paid';

-- Handy checks after running:
--   select * from sewa_donation_totals;
--   select * from shiksha_sewa_subscriptions where status = 'active';
--   select date_trunc('month', paid_at) m, sum(amount) from shiksha_sewa_donations
--     where status = 'paid' group by 1 order by 1 desc;
