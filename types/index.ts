export interface Property {
  id: string;
  title: string;
  location: string;
  country: string;
  price_text: string;
  price_usd?: number;
  image_url: string;
  beds: number;
  baths: number;
  sqft: number;
  lng: number;
  lat: number;
  description: string;

  // Lifestyle "Soft Data"
  wifi_speed: string;
  air_quality: string;
  wellness_proximity: string;
  tech_integration: string;

  // Tags
  lifestyle_tags?: string[]; // e.g. ['yoga', 'co-work', 'surf']
  type?: 'rent' | 'buy' | 'co-live';

  // Vercel / Supabase fields
  created_at?: string;
  badge_text?: string;
}

export interface LocalGem {
  name: string;
  category: 'cafe' | 'wellness' | 'cowork' | 'restaurant' | 'niche';
  distance: string;
  image_url: string;
  description: string;
}

export interface RevenueStream {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

export type Theme = 'light' | 'dark';

export interface WaitlistEntry {
  firstName: string;
  lastName: string;
  email: string;
  role: 'Investor' | 'Agent' | 'User' | 'Other';
}
