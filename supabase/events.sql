-- ════════════════════════════════════════════════════════════════════
-- Events added from /admin/events, shown on /events and /events/<slug>.
-- Run once in Supabase → SQL Editor, AFTER donations.sql (it reuses the
-- set_updated_at() trigger function). Safe to re-run.
--
--   site_events          one row per event (status is worked out from the dates)
--   event-images bucket  public Supabase Storage bucket for cover + gallery images
-- ════════════════════════════════════════════════════════════════════

create table if not exists site_events (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,            -- /events/<slug>
  title         text not null,                   -- heading
  subtitle      text,                            -- subheading
  description   text not null default '',        -- full description (line breaks kept)
  starts_at     timestamptz not null,            -- date + time (entered in IST)
  ends_at       timestamptz,                     -- optional; else "completed" after that day
  location      text,
  image_url     text not null,                   -- cover image
  gallery       jsonb not null default '[]'::jsonb,  -- recap photo URLs
  register_url  text,                            -- optional registration / payment link
  published     boolean not null default true,   -- false = hidden from the site
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists site_events_starts_idx on site_events (published, starts_at);

drop trigger if exists trg_site_events_updated on site_events;
create trigger trg_site_events_updated before update on site_events
  for each row execute function set_updated_at();

-- Read and written only by the server (service-role key), like the donation tables.
alter table site_events enable row level security;

-- Public bucket: images are viewable by anyone; only the server can upload.
insert into storage.buckets (id, name, public)
values ('event-images', 'event-images', true)
on conflict (id) do update set public = true;
