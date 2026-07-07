import { createServerSupabase } from '@/lib/supabase-server';
import PrevSaude from '@/views/PrevSaude';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = createServerSupabase();
  const [{ data }, { data: tipos }] = await Promise.all([
    supabase.from('funsa_medicos').select('*').order('nome', { ascending: true }),
    supabase.from('funsa_medicos_tipos').select('*').order('ordem', { ascending: true }),
  ]);

  return <PrevSaude initialMedicos={data ?? []} initialTipos={tipos ?? []} />;
}
