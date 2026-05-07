import { Property } from '@/types';

// 10 curated South Africa properties for the demo walkthrough
export const SA_PROPERTIES: Property[] = [
  {
    id: 'sa-001',
    title: 'Camps Bay Clifftop Villa',
    location: 'Camps Bay, Cape Town',
    country: 'South Africa',
    price_text: 'R45,000',
    price_usd: 2400,
    image_url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=75&w=800',
    beds: 4, baths: 3, sqft: 380,
    lng: 18.3763, lat: -33.9511,
    wifi_speed: '1 Gbps Fibre',
    air_quality: 'Excellent (18 AQI)',
    wellness_proximity: '3 min walk to beach yoga',
    tech_integration: 'Starlink backup + Smart Home',
    lifestyle_tags: ['surf', 'wellness', 'investment', 'luxury'],
    type: 'rent',
    badge_text: 'Investment Grade',
    description: 'Architect-designed clifftop villa with unobstructed Atlantic Ocean views. Solar geyser, rainwater harvesting, smart lighting. Walking distance to Camps Bay strip and beach yoga. One of Cape Town\'s top-performing short-term rental assets.',
  },
  {
    id: 'sa-002',
    title: 'Woodstock Creative Loft',
    location: 'Woodstock, Cape Town',
    country: 'South Africa',
    price_text: 'R18,500',
    price_usd: 980,
    image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=75&w=800',
    beds: 2, baths: 1, sqft: 110,
    lng: 18.4527, lat: -33.9283,
    wifi_speed: '500 Mbps Fibre',
    air_quality: 'Good (35 AQI)',
    wellness_proximity: '5 min to CrossFit + rooftop yoga',
    tech_integration: '4K workstation setup included',
    lifestyle_tags: ['co-work', 'digital nomad', 'arts', 'urban'],
    type: 'rent',
    badge_text: 'Nomad Pick',
    description: 'Converted warehouse loft in Cape Town\'s arts and design district. Exposed brick, double-volume ceilings, high-speed fibre. Walking distance to the Old Biscuit Mill, craft coffee, and the city\'s best co-working spaces.',
  },
  {
    id: 'sa-003',
    title: 'Constantia Wine Estate Home',
    location: 'Constantia, Cape Town',
    country: 'South Africa',
    price_text: 'R65,000',
    price_usd: 3450,
    image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=75&w=800',
    beds: 5, baths: 4, sqft: 520,
    lng: 18.4326, lat: -34.0264,
    wifi_speed: '1 Gbps Fibre',
    air_quality: 'Pristine (10 AQI)',
    wellness_proximity: 'Private vineyard + spa on estate',
    tech_integration: 'Full solar + battery backup',
    lifestyle_tags: ['family', 'nature', 'investment', 'luxury'],
    type: 'buy',
    badge_text: 'Featured',
    description: 'Manor house set on a working wine estate in the Constantia Valley. Mountain and vineyard views, cellar access, estate security. Blue chip area with strong capital growth. Ideal for families or as a luxury rental investment.',
  },
  {
    id: 'sa-004',
    title: 'Sea Point Beachfront Apartment',
    location: 'Sea Point, Cape Town',
    country: 'South Africa',
    price_text: 'R28,000',
    price_usd: 1480,
    image_url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=75&w=800',
    beds: 2, baths: 2, sqft: 145,
    lng: 18.3844, lat: -33.9217,
    wifi_speed: '1 Gbps Fibre',
    air_quality: 'Excellent (20 AQI)',
    wellness_proximity: 'Promenade + outdoor gym 2 min',
    tech_integration: 'Building backup power + EV charging',
    lifestyle_tags: ['wellness', 'urban', 'co-work', 'investment'],
    type: 'rent',
    badge_text: 'Verified',
    description: 'Modern apartment directly on the Sea Point promenade. Atlantic views, fully fitted kitchen, 24/7 building security. The promenade offers Cape Town\'s best outdoor running, cycling, and open-air gym — all on your doorstep.',
  },
  {
    id: 'sa-005',
    title: 'Knysna Forest Eco Retreat',
    location: 'Knysna, Garden Route',
    country: 'South Africa',
    price_text: 'R22,000',
    price_usd: 1160,
    image_url: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?q=75&w=800',
    beds: 3, baths: 2, sqft: 210,
    lng: 23.0465, lat: -34.0363,
    wifi_speed: 'Starlink 200 Mbps',
    air_quality: 'Pristine (8 AQI)',
    wellness_proximity: 'Forest hiking + lagoon kayaking',
    tech_integration: 'Full off-grid solar + rainwater',
    lifestyle_tags: ['nature', 'eco', 'family', 'wellness'],
    type: 'rent',
    badge_text: 'Eco Pick',
    description: 'Off-grid retreat nestled in indigenous forest on the edge of the Knysna Lagoon. Complete solar and rainwater systems. Surrounded by the Garden Route — whale watching, hiking trails, and world-class beaches within 20 minutes.',
  },
  {
    id: 'sa-006',
    title: 'Sandton Business District Penthouse',
    location: 'Sandton, Johannesburg',
    country: 'South Africa',
    price_text: 'R52,000',
    price_usd: 2750,
    image_url: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=75&w=800',
    beds: 3, baths: 2, sqft: 280,
    lng: 28.0536, lat: -26.1076,
    wifi_speed: '2 Gbps Fibre',
    air_quality: 'HEPA Filtration (building)',
    wellness_proximity: 'Rooftop gym + pool access',
    tech_integration: 'Smart Building + Concierge AI',
    lifestyle_tags: ['investment', 'urban', 'co-work', 'luxury'],
    type: 'buy',
    badge_text: 'Investment Grade',
    description: 'Full-floor penthouse in the heart of Africa\'s financial capital. Floor-to-ceiling glass, double garage, private rooftop terrace. Walking distance to the JSE, top law firms, and the Sandton Convention Centre. Strong rental yield.',
  },
  {
    id: 'sa-007',
    title: 'Stellenbosch Winelands Cottage',
    location: 'Stellenbosch, Western Cape',
    country: 'South Africa',
    price_text: 'R16,500',
    price_usd: 870,
    image_url: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=75&w=800',
    beds: 2, baths: 1, sqft: 130,
    lng: 18.8601, lat: -33.9321,
    wifi_speed: '500 Mbps Fibre',
    air_quality: 'Mountain Fresh (12 AQI)',
    wellness_proximity: 'Wine farm cycling + trail runs',
    tech_integration: 'Solar power + fibre',
    lifestyle_tags: ['nature', 'co-work', 'wellness', 'family'],
    type: 'rent',
    badge_text: 'Popular',
    description: 'Restored Cape Dutch cottage on the edge of a working wine farm. Mountain backdrop, vineyard views, easy cycling distance to Stellenbosch town. A favourite for remote workers and young families wanting town access without the city noise.',
  },
  {
    id: 'sa-008',
    title: 'Ballito Beachside Family Home',
    location: 'Ballito, KwaZulu-Natal',
    country: 'South Africa',
    price_text: 'R38,000',
    price_usd: 2000,
    image_url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=75&w=800',
    beds: 4, baths: 3, sqft: 320,
    lng: 31.2141, lat: -29.5389,
    wifi_speed: '1 Gbps Fibre',
    air_quality: 'Ocean Fresh (15 AQI)',
    wellness_proximity: 'Beach surf + outdoor pool',
    tech_integration: 'Solar + inverter backup',
    lifestyle_tags: ['family', 'surf', 'investment', 'wellness'],
    type: 'buy',
    badge_text: 'Family Pick',
    description: 'Spacious family home in Ballito\'s premier estate, 3 minutes from the beach. 24/7 estate security, communal pool and tennis courts, top private schools nearby. KZN\'s fastest-growing coastal node — strong capital appreciation.',
  },
  {
    id: 'sa-009',
    title: 'Franschhoek Mountain Hideaway',
    location: 'Franschhoek, Western Cape',
    country: 'South Africa',
    price_text: 'R25,000',
    price_usd: 1320,
    image_url: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?q=75&w=800',
    beds: 3, baths: 2, sqft: 240,
    lng: 19.1254, lat: -33.9085,
    wifi_speed: 'Starlink 300 Mbps',
    air_quality: 'Pristine (9 AQI)',
    wellness_proximity: 'Mountain hiking + yoga studio',
    tech_integration: 'Solar + battery + smart thermostat',
    lifestyle_tags: ['wellness', 'nature', 'family', 'eco'],
    type: 'rent',
    badge_text: 'Hidden Gem',
    description: 'Mountain retreat on the edge of the Franschhoek valley. Wraparound wooden deck, indigenous garden, fire pit. The food and wine capital of South Africa is a 10-minute walk. Perfect for families, retirees, or creatives seeking deep focus.',
  },
  {
    id: 'sa-010',
    title: 'De Waterkant Design Apartment',
    location: 'De Waterkant, Cape Town',
    country: 'South Africa',
    price_text: 'R21,000',
    price_usd: 1110,
    image_url: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=75&w=800',
    beds: 1, baths: 1, sqft: 90,
    lng: 18.4179, lat: -33.9173,
    wifi_speed: '1 Gbps Fibre',
    air_quality: 'Good (30 AQI)',
    wellness_proximity: 'Pilates studio + rooftop pool',
    tech_integration: 'Smart locks + keyless entry',
    lifestyle_tags: ['digital nomad', 'co-work', 'urban', 'wellness'],
    type: 'rent',
    badge_text: 'Nomad Pick',
    description: 'Architect-finished studio in Cape Town\'s most walkable neighbourhood. Cobblestone streets, boutique coffee shops, and the V&A Waterfront 10 minutes on foot. Fully furnished, fibre throughout, rooftop pool shared with 12 units.',
  },
];

// Lifestyle quiz matching logic
export function matchPropertiesByProfile(
  properties: Property[],
  profile: {
    userType?: string;
    priorities?: string[];
    location?: string;
  }
): Property[] {
  let results = [...properties];

  // Filter by user type
  if (profile.userType === 'investor') {
    results = results.filter(p => p.lifestyle_tags?.includes('investment'));
  } else if (profile.userType === 'nomad') {
    results = results.filter(p =>
      p.lifestyle_tags?.some(t => ['co-work', 'digital nomad'].includes(t))
    );
  } else if (profile.userType === 'family') {
    results = results.filter(p => p.lifestyle_tags?.includes('family'));
  } else if (profile.userType === 'retiree') {
    results = results.filter(p =>
      p.lifestyle_tags?.some(t => ['wellness', 'nature', 'eco'].includes(t))
    );
  }

  // Sort by priority tags
  if (profile.priorities?.length) {
    results = results.sort((a, b) => {
      const aScore = (a.lifestyle_tags || []).filter(t => profile.priorities!.includes(t)).length;
      const bScore = (b.lifestyle_tags || []).filter(t => profile.priorities!.includes(t)).length;
      return bScore - aScore;
    });
  }

  return results.slice(0, 6);
}
