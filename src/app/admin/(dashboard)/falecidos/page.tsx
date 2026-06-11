import { Suspense } from 'react';
import ManageFalecidos from '@/views/admin/ManageFalecidos';
import { createServerSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = createServerSupabase();

  const [{ data: falecidosData }, { data: homenagensData }] = await Promise.all([
    supabase
      .from('funsa_falecidos')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('funsa_falecidos_homenagens')
      .select('*, funsa_falecidos(nome)')
      .order('created_at', { ascending: false }),
  ]);

  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-12 opacity-40">
        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ManageFalecidos
        initialFalecidos={falecidosData ?? []}
        initialHomenagens={(homenagensData ?? []) as any}
      />
    </Suspense>
  );
}
