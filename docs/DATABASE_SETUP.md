# Database Setup — Supabase (PostgreSQL)

The application uses [Supabase](https://supabase.com) instead of MongoDB.
The complete schema lives in [`supabase/schema.sql`](../supabase/schema.sql).

## 1. Create the project

1. Create a project on [supabase.com](https://supabase.com/dashboard).
2. Open **SQL Editor > New query**, paste the contents of `supabase/schema.sql` and click **Run**.
   This creates the tables (`products`, `orders`, `settings`, `community_texts`),
   indexes, `updated_at` triggers and the Row Level Security policies.
3. Copy the credentials from **Project Settings > API**:

```env
# .env (production) or .env.local (dev)
SUPABASE_URL=https://<project-ref>.supabase.co
SUPABASE_ANON_KEY=<anon / public key>
SUPABASE_SERVICE_ROLE_KEY=<service_role secret key>
```

## 2. Role of each key

| Key | Used for | RLS |
| --- | --- | --- |
| `anon` | Public reads, placing orders, community texts | Allowed via policies |
| `service_role` | **Required for admin operations** (product CRUD, order/status updates, settings) | Bypasses RLS |

> The anon key never reaches the browser: all database calls happen in the
> Next.js API routes (`/api/products`, `/api/orders`, `/api/settings`, ...).

## 3. Seed sample data

```bash
npm run setup-db           # seeds only if tables are empty
npm run seed-db -- --force # wipe + re-seed
npm run reset-db           # wipe all rows
```

These scripts require `SUPABASE_SERVICE_ROLE_KEY` in the environment.

## 4. Data model

- `products` — name, price, images (JSONB), sizes (JSONB), category, stock, flags.
- `orders` — `order_id` auto-generated (default `ENSA-YYYYMMDD-XXXXXX`),
  `customer_info` / `product_details` / `pricing` as JSONB (Mongo-style documents).
- `settings` — single row (`id = 1`) with pricing, shipping fees, discount codes, contact info.
- `community_texts` — approved/unapproved texts used by the community features.

## 5. Deploy

Set the same variables in your hosting provider (Vercel → Project Settings →
Environment Variables, or the `.env` file shipped next to the app on a VPS).
