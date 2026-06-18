import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

/**
 * Cliente Supabase para uso no browser (componentes 'use client').
 * Usa cookie-based session storage via @supabase/ssr.
 * Fallbacks evitam crash quando env vars estão ausentes em build time.
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
