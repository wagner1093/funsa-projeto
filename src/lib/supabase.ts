import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Cliente Supabase para uso exclusivo no browser (componentes 'use client').
 * Usa cookie-based storage via @supabase/ssr — compatível com Next.js SSR/middleware.
 * 
 * Vantagens sobre localStorage:
 * - O middleware consegue ler e renovar a sessão a cada request
 * - Sem conflito de token refresh entre SSR e cliente
 * - Sem o bug de "lock stolen" que causava botões parando de funcionar
 */
export const supabase = createBrowserClient(supabaseUrl, supabaseKey);
