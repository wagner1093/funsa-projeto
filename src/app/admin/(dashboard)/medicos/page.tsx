import { Suspense } from 'react';
import ManageMedicos from '@/views/admin/ManageMedicos';
import { createServerSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = createServerSupabase();
  const [{ data: initialData }, { data: initialTipos }] = await Promise.all([
    supabase.from('funsa_medicos').select('*').order('nome', { ascending: true }),
    supabase.from('funsa_medicos_tipos').select('*').order('ordem', { ascending: true }),
  ]);

  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-12 opacity-40">
        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ManageMedicos initialData={initialData ?? []} initialTipos={initialTipos ?? []} />
    </Suspense>
  );
}
