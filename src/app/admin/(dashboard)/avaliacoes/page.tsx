import { Suspense } from 'react';
import ManageAvaliacoes from '@/views/admin/ManageAvaliacoes';
import { createServerSupabase } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const supabase = createServerSupabase();
  const { data: initialData } = await supabase
    .from('funsa_avaliacoes')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center py-12 opacity-40">
        <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ManageAvaliacoes initialData={initialData ?? []} />
    </Suspense>
  );
}
