# habitat.s — The Search Engine for Life

> "We index the Soft Data — helping Nomads, Families, and Retirees find their Lifestyle, not just their House."

Built with **Next.js 14**, **Supabase**, **Mapbox GL**, and **Tailwind CSS**. Deployable to **Vercel** in one click.

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
Copy the example file and fill in your keys:
```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://ufcfcuwlswsimxfuflmy.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

> Your Mapbox token and Supabase URL/key are already in `explore.html` from the prototype — just copy them across.

### 3. Run in development
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
habitat-s-app/
├── app/
│   ├── layout.tsx          ← Root layout (theme provider, navbar)
│   ├── page.tsx            ← Landing / pitch page
│   ├── explore/
│   │   └── page.tsx        ← Map + property search page
│   └── property/[id]/
│       └── page.tsx        ← Property detail page
├── components/
│   ├── Navbar.tsx          ← Top navigation
│   ├── ThemeToggle.tsx     ← Dark/light mode toggle
│   ├── TypingEffect.tsx    ← Animated headline
│   ├── Modal.tsx           ← Waitlist / pitch access modal
│   ├── PropertyCard.tsx    ← Listing card
│   ├── LifestyleFilterBar.tsx  ← Tag filter chips
│   └── MapView.tsx         ← Mapbox globe map (client-only)
├── lib/
│   ├── supabase.ts         ← Supabase client + DB helpers
│   └── properties.ts       ← Fallback seed data + search logic
└── types/
    └── index.ts            ← TypeScript types (Property, etc.)
```

---

## Supabase Schema

Run this SQL in your Supabase SQL editor to create the tables:

```sql
-- Properties table
create table properties (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  title text not null,
  location text,
  country text,
  price_text text,
  price_usd numeric,
  image_url text,
  beds int,
  baths int,
  sqft int,
  lng float,
  lat float,
  description text,
  wifi_speed text,
  air_quality text,
  wellness_proximity text,
  tech_integration text,
  lifestyle_tags text[],
  type text,
  badge_text text
);

-- Waitlist table
create table waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  first_name text,
  last_name text,
  email text unique,
  role text
);

-- Enable Row Level Security
alter table properties enable row level security;
alter table waitlist enable row level security;

-- Allow public read on properties
create policy "Public read properties" on properties for select using (true);

-- Allow public insert on waitlist
create policy "Public insert waitlist" on waitlist for insert with check (true);
```

---

## Deploy to Vercel

1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Add the 3 environment variables (Supabase URL, Anon Key, Mapbox Token)
4. Deploy — done.

---

## Roadmap (Phase 2)

- [ ] Agent portal dashboard (bulk property uploads, subscriber analytics)
- [ ] Premium report generation (PDF export with ROI, cap rate, lifestyle score)
- [ ] AI lifestyle search (natural language → property match via embeddings)
- [ ] Wallet connection mockups (RWA / crypto tier)
- [ ] User dashboard (saved searches, comparison tool)
- [ ] Property scraper pipeline (Supabase Edge Functions + cron)

---

© 2026 habitat.s — TerraVerta Habitats
