import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // During build time on some environments, these might be missing.
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined' && (!supabaseUrl || !supabaseKey)) {
    console.warn('⚠️ Supabase environment variables are missing during build.');
  }
}

const isBrowser = typeof window !== 'undefined';

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder-key',
  {
    auth: {
      persistSession: isBrowser,
      autoRefreshToken: isBrowser,
      detectSessionInUrl: isBrowser,
    },
  }
);