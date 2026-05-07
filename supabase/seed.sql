-- ============================================================
-- habitat.s — Supabase Schema + SA Property Seed Data
-- Run this in your Supabase SQL Editor
-- ============================================================

-- TABLES
create table if not exists properties (
  id text primary key,
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

create table if not exists waitlist (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  first_name text,
  last_name text,
  email text unique,
  role text
);

create table if not exists report_requests (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default now(),
  property_id text references properties(id),
  user_email text,
  report_type text default 'lifestyle',
  status text default 'pending'
);

-- RLS
alter table properties enable row level security;
alter table waitlist enable row level security;
alter table report_requests enable row level security;

create policy "Public read properties" on properties for select using (true);
create policy "Public insert waitlist" on waitlist for insert with check (true);
create policy "Public insert report_requests" on report_requests for insert with check (true);

-- ============================================================
-- SEED: 10 South Africa Properties
-- ============================================================
insert into properties (id, title, location, country, price_text, price_usd, image_url, beds, baths, sqft, lng, lat, description, wifi_speed, air_quality, wellness_proximity, tech_integration, lifestyle_tags, type, badge_text) values

('sa-001', 'Camps Bay Clifftop Villa', 'Camps Bay, Cape Town', 'South Africa', 'R45,000', 2400,
'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=75&w=800',
4, 3, 380, 18.3763, -33.9511,
'Architect-designed clifftop villa with unobstructed Atlantic Ocean views. Solar geyser, rainwater harvesting, smart lighting. Walking distance to Camps Bay strip and beach yoga. One of Cape Town''s top-performing short-term rental assets.',
'1 Gbps Fibre', 'Excellent (18 AQI)', '3 min walk to beach yoga', 'Starlink backup + Smart Home',
ARRAY['surf','wellness','investment','luxury'], 'rent', 'Investment Grade'),

('sa-002', 'Woodstock Creative Loft', 'Woodstock, Cape Town', 'South Africa', 'R18,500', 980,
'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=75&w=800',
2, 1, 110, 18.4527, -33.9283,
'Converted warehouse loft in Cape Town''s arts and design district. Exposed brick, double-volume ceilings, high-speed fibre. Walking distance to the Old Biscuit Mill, craft coffee, and the city''s best co-working spaces.',
'500 Mbps Fibre', 'Good (35 AQI)', '5 min to CrossFit + rooftop yoga', '4K workstation setup included',
ARRAY['co-work','digital nomad','arts','urban'], 'rent', 'Nomad Pick'),

('sa-003', 'Constantia Wine Estate Home', 'Constantia, Cape Town', 'South Africa', 'R65,000', 3450,
'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=75&w=800',
5, 4, 520, 18.4326, -34.0264,
'Manor house set on a working wine estate in the Constantia Valley. Mountain and vineyard views, cellar access, estate security. Blue chip area with strong capital growth. Ideal for families or as a luxury rental investment.',
'1 Gbps Fibre', 'Pristine (10 AQI)', 'Private vineyard + spa on estate', 'Full solar + battery backup',
ARRAY['family','nature','investment','luxury'], 'buy', 'Featured'),

('sa-004', 'Sea Point Beachfront Apartment', 'Sea Point, Cape Town', 'South Africa', 'R28,000', 1480,
'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=75&w=800',
2, 2, 145, 18.3844, -33.9217,
'Modern apartment directly on the Sea Point promenade. Atlantic views, fully fitted kitchen, 24/7 building security. The promenade offers Cape Town''s best outdoor running, cycling, and open-air gym.',
'1 Gbps Fibre', 'Excellent (20 AQI)', 'Promenade + outdoor gym 2 min', 'Building backup power + EV charging',
ARRAY['wellness','urban','co-work','investment'], 'rent', 'Verified'),

('sa-005', 'Knysna Forest Eco Retreat', 'Knysna, Garden Route', 'South Africa', 'R22,000', 1160,
'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=75&w=800',
3, 2, 210, 23.0465, -34.0363,
'Off-grid retreat nestled in indigenous forest on the edge of the Knysna Lagoon. Complete solar and rainwater systems. Surrounded by the Garden Route — whale watching, hiking trails, and world-class beaches within 20 minutes.',
'Starlink 200 Mbps', 'Pristine (8 AQI)', 'Forest hiking + lagoon kayaking', 'Full off-grid solar + rainwater',
ARRAY['nature','eco','family','wellness'], 'rent', 'Eco Pick'),

('sa-006', 'Sandton Business District Penthouse', 'Sandton, Johannesburg', 'South Africa', 'R52,000', 2750,
'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=75&w=800',
3, 2, 280, 28.0536, -26.1076,
'Full-floor penthouse in the heart of Africa''s financial capital. Floor-to-ceiling glass, double garage, private rooftop terrace. Walking distance to the JSE, top law firms, and the Sandton Convention Centre.',
'2 Gbps Fibre', 'HEPA Filtration (building)', 'Rooftop gym + pool access', 'Smart Building + Concierge AI',
ARRAY['investment','urban','co-work','luxury'], 'buy', 'Investment Grade'),

('sa-007', 'Stellenbosch Winelands Cottage', 'Stellenbosch, Western Cape', 'South Africa', 'R16,500', 870,
'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=75&w=800',
2, 1, 130, 18.8601, -33.9321,
'Restored Cape Dutch cottage on the edge of a working wine farm. Mountain backdrop, vineyard views, easy cycling distance to Stellenbosch town. A favourite for remote workers and young families.',
'500 Mbps Fibre', 'Mountain Fresh (12 AQI)', 'Wine farm cycling + trail runs', 'Solar power + fibre',
ARRAY['nature','co-work','wellness','family'], 'rent', 'Popular'),

('sa-008', 'Ballito Beachside Family Home', 'Ballito, KwaZulu-Natal', 'South Africa', 'R38,000', 2000,
'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=75&w=800',
4, 3, 320, 31.2141, -29.5389,
'Spacious family home in Ballito''s premier estate, 3 minutes from the beach. 24/7 estate security, communal pool and tennis courts, top private schools nearby.',
'1 Gbps Fibre', 'Ocean Fresh (15 AQI)', 'Beach surf + outdoor pool', 'Solar + inverter backup',
ARRAY['family','surf','investment','wellness'], 'buy', 'Family Pick'),

('sa-009', 'Franschhoek Mountain Hideaway', 'Franschhoek, Western Cape', 'South Africa', 'R25,000', 1320,
'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=75&w=800',
3, 2, 240, 19.1254, -33.9085,
'Mountain retreat on the edge of the Franschhoek valley. Wraparound wooden deck, indigenous garden, fire pit. The food and wine capital of South Africa is a 10-minute walk.',
'Starlink 300 Mbps', 'Pristine (9 AQI)', 'Mountain hiking + yoga studio', 'Solar + battery + smart thermostat',
ARRAY['wellness','nature','family','eco'], 'rent', 'Hidden Gem'),

('sa-010', 'De Waterkant Design Apartment', 'De Waterkant, Cape Town', 'South Africa', 'R21,000', 1110,
'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=75&w=800',
1, 1, 90, 18.4179, -33.9173,
'Architect-finished studio in Cape Town''s most walkable neighbourhood. Cobblestone streets, boutique coffee shops, V&A Waterfront 10 minutes on foot. Fully furnished, fibre throughout, rooftop pool.',
'1 Gbps Fibre', 'Good (30 AQI)', 'Pilates studio + rooftop pool', 'Smart locks + keyless entry',
ARRAY['digital nomad','co-work','urban','wellness'], 'rent', 'Nomad Pick')

on conflict (id) do nothing;
