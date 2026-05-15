import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  // During build time on some environments, these might be missing.
  // We throw a more descriptive error or handle it gracefully if it's just the build process.
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined' && (!supabaseUrl || !supabaseKey)) {
    console.warn('⚠️ Supabase environment variables are missing during build.');
  }
}

// Ensure we don't pass empty strings to createClient if we want to avoid the crash
// but if we are in production and they are missing, the app will fail anyway.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseKey || 'placeholder-key'
);

