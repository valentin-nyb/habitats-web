import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Fetch all properties from Supabase
export async function fetchPropertiesFromDB() {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    return null;
  }
  return data;
}

// Save a waitlist entry to Supabase
export async function saveWaitlistEntry(entry: {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}) {
  const { error } = await supabase.from('waitlist').insert([entry]);
  if (error) throw new Error(error.message);
}
