import { createServerSupabase } from '@/lib/supabase-server';
import PrevSaude from '@/views/PrevSaude';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('funsa_medicos')
    .select('*')
    .order('nome', { ascending: true });

  return <PrevSaude initialMedicos={data ?? []} />;
}
