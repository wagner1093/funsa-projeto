import { notFound } from 'next/navigation';
import { createServerSupabase } from '@/lib/supabase-server';
import BlogPostClient from '@/views/BlogPost';

interface Props {
  params: Promise<{ id: string }>;
}

// Revalida a cada 60 segundos (ISR)
export const revalidate = 60;

// Pré-gera os posts mais recentes em build time
export async function generateStaticParams() {
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from('funsa_posts')
    .select('id')
    .order('created_at', { ascending: false })
    .limit(20);
  return (data || []).map(p => ({ id: p.id }));
}

export default async function BlogPostPage({ params }: Props) {
  const { id } = await params;
  const supabase = createServerSupabase();

  const { data: post } = await supabase
    .from('funsa_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (!post) notFound();

  return <BlogPostClient post={post} />;
}
