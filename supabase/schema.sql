-- ============================================================
-- ORIGINALFIT / ENSA OFFLINE STORE — Supabase schema (v1)
--
-- How to use:
--   1. Create a project on https://supabase.com
--   2. Supabase Dashboard > SQL Editor > New query
--   3. Paste this whole file and click "Run"
--   4. Copy Project URL / anon key / service_role key (Project Settings > API)
--      into your .env file (SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY)
--
-- Model notes:
--   - Structured columns for fields that are queried/filtered,
--     JSONB for Mongo-style nested objects (images, sizes, tags,
--     customer_info, product_details, pricing, fees, contact info...).
--   - Row Level Security is ENABLED on every table:
--       * anon key  -> public reads + placing orders + community texts
--       * service_role key (server-side) -> admin operations, bypasses RLS
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- products
-- ------------------------------------------------------------
create table if not exists public.products (
  id              bigserial primary key,
  name            text not null check (char_length(btrim(name)) between 2 and 150),
  description     text,
  price           numeric(10,2) not null default 0 check (price >= 0),
  images          jsonb not null default '[]'::jsonb,  -- [{original, thumbnail, medium, large}]
  sizes           jsonb not null default '[]'::jsonb,  -- ["S","M",...]
  category        text,
  is_customizable boolean not null default false,
  custom_price    numeric(10,2) check (custom_price is null or custom_price >= 0),
  is_active       boolean not null default true,
  stock           integer not null default 0 check (stock >= 0),
  tags            jsonb not null default '[]'::jsonb,  -- used by search/filter UI
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists products_is_active_idx on public.products (is_active);
create index if not exists products_category_idx  on public.products (category);
create index if not exists products_created_at_idx on public.products (created_at desc);

-- ------------------------------------------------------------
-- settings (single row: id = 1)
-- ------------------------------------------------------------
create table if not exists public.settings (
  id                   smallint primary key default 1 check (id = 1),
  product_prices       jsonb not null default '{}'::jsonb,   -- { "<product name>": price }
  custom_text_price    numeric(10,2) not null default 0 check (custom_text_price >= 0),
  shipping_fees        jsonb not null default '{}'::jsonb,   -- { "<city>": fee }
  discount_codes       jsonb not null default '[]'::jsonb,   -- [{code, type, value, isActive}]
  default_currency     text not null default 'MAD' check (default_currency in ('MAD','USD')),
  exchange_rate        numeric(10,2) not null default 10 check (exchange_rate >= 0.1),
  is_ordering_enabled  boolean not null default true,
  maintenance_mode     boolean not null default false,
  contact_info         jsonb not null default '{}'::jsonb,   -- {whatsappNumber, email, address}
  social_media         jsonb not null default '{}'::jsonb,   -- {instagram, facebook, twitter}
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

-- Create the single settings row with sensible defaults (same as the old app).
insert into public.settings (
  id, product_prices, custom_text_price, shipping_fees, discount_codes,
  default_currency, exchange_rate, is_ordering_enabled, maintenance_mode,
  contact_info, social_media
) values (
  1,
  '{}'::jsonb,
  15,
  '{"Tetouan":0,"Casablanca":25,"Rabat":20,"Marrakech":30,"Fez":25,"Agadir":35,"Tangier":15,"Meknes":25,"Oujda":30,"Kenitra":20,"Safi":30,"Mohammedia":25,"Khouribga":25,"Beni Mellal":30,"El Jadida":30,"Taza":25,"Nador":30,"Settat":25,"Larache":20,"Ksar El Kebir":20}'::jsonb,
  '[{"code":"ENSA10","type":"percentage","value":10,"isActive":true},{"code":"OFFLINE5","type":"fixed","value":5,"isActive":true}]'::jsonb,
  'MAD',
  10,
  true,
  false,
  '{"whatsappNumber":"+212 6XX XXX XXX","email":"contact@originalfit.ma","address":"Maroc"}'::jsonb,
  '{"instagram":"@originalfit.ma","facebook":"Originalfit","twitter":"@originalfit_ma"}'::jsonb
) on conflict (id) do nothing;

-- ------------------------------------------------------------
-- orders
-- ------------------------------------------------------------
create table if not exists public.orders (
  id              bigserial primary key,
  order_id        text not null unique
    default 'ENSA-' || to_char(now(), 'YYYYMMDD') || '-' || upper(substr(md5(random()::text || clock_timestamp()::text), 1, 6)),
  customer_info   jsonb not null,  -- {fullName, whatsappNumber, city, isTetouan}
  product_details jsonb not null,  -- {productId, size, isCustom, customText}
  pricing         jsonb not null,  -- {basePrice, customFee, shippingFee, totalPrice, currency, exchangeRate}
  status          text not null default 'pending'
    check (status in ('pending','contacted','printed','delivering','delivered','finished')),
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists orders_created_at_idx    on public.orders (created_at desc);
create index if not exists orders_status_idx        on public.orders (status);
create index if not exists orders_order_id_idx      on public.orders (order_id);

-- ------------------------------------------------------------
-- community_texts
-- ------------------------------------------------------------
create table if not exists public.community_texts (
  id           bigserial primary key,
  text         text not null check (char_length(btrim(text)) <= 50),
  category     text not null check (category in ('motivational','funny','minimalist','chaotic','philosophical')),
  is_approved  boolean not null default false,
  submitted_by text not null,       -- anonymous ID
  usage_count  integer not null default 0 check (usage_count >= 0),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index if not exists community_texts_approved_category_idx on public.community_texts (is_approved, category);
create index if not exists community_texts_created_at_idx        on public.community_texts (created_at desc);

-- ------------------------------------------------------------
-- updated_at trigger (replaces Mongo `timestamps: true`)
-- ------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
  before update on public.products
  for each row execute function public.set_updated_at();

drop trigger if exists orders_touch_updated_at on public.orders;
create trigger orders_touch_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

drop trigger if exists settings_touch_updated_at on public.settings;
create trigger settings_touch_updated_at
  before update on public.settings
  for each row execute function public.set_updated_at();

drop trigger if exists community_texts_touch_updated_at on public.community_texts;
create trigger community_texts_touch_updated_at
  before update on public.community_texts
  for each row execute function public.set_updated_at();

-- ------------------------------------------------------------
-- Row Level Security
--
-- Public (anon key):
--   * products       : read ACTIVE products only
--   * settings       : read the settings row
--   * orders         : create only (no read/update/delete — customer
--                      confirmation page goes through the server API,
--                      which uses the service_role key)
--   * community_texts: read APPROVED texts + submit new ones
--
-- Admin flows (Next.js API routes with SUPABASE_SERVICE_ROLE_KEY):
--   * everything else — service_role bypasses RLS entirely
-- ------------------------------------------------------------

alter table public.products        enable row level security;
alter table public.settings        enable row level security;
alter table public.orders          enable row level security;
alter table public.community_texts enable row level security;

drop policy if exists "public read active products" on public.products;
create policy "public read active products"
  on public.products
  for select
  to anon
  using (is_active = true);

drop policy if exists "public read settings" on public.settings;
create policy "public read settings"
  on public.settings
  for select
  to anon
  using (true);

drop policy if exists "public create orders" on public.orders;
create policy "public create orders"
  on public.orders
  for insert
  to anon
  with check (true);

drop policy if exists "public read approved community texts" on public.community_texts;
create policy "public read approved community texts"
  on public.community_texts
  for select
  to anon
  using (is_approved = true);

drop policy if exists "public submit community texts" on public.community_texts;
create policy "public submit community texts"
  on public.community_texts
  for insert
  to anon
  with check (true);

-- ============================================================
-- Done. Then, from the project root:
--   npm run setup-db        # seed sample data (needs SUPABASE_SERVICE_ROLE_KEY)
-- ============================================================
