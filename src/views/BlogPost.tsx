'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeft, Calendar, Tag, ArrowRight, User, Facebook, Twitter, Linkedin, BookOpen } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  titulo: string;
  resumo?: string;
  conteudo?: string;
  imagem?: string;
  categoria?: string;
  autor_nome?: string;
  autor_descricao?: string;
  created_at: string;
  featured?: boolean;
};

interface BlogPostClientProps {
  post: Post;
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start", dragFree: true });
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!post?.id) return;
    supabase
      .from('funsa_posts')
      .select('id, titulo, resumo, imagem, categoria, autor_nome, created_at')
      .neq('id', post.id)
      .limit(4)
      .then(({ data }) => { if (data) setRelatedPosts(data); });
  }, [post?.id]);

  const shareUrl = typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : '';
  const shareTitle = encodeURIComponent(post.titulo);

  // Quill salva os espaços como &nbsp; (espaço inseparável), o que impede o navegador
  // de quebrar a linha entre as palavras. Convertemos para espaço normal para que o
  // texto quebre apenas no fim das palavras — igual ao editor.
  const conteudoHtml = (post.conteudo || '').replace(/&nbsp;| /g, ' ');

  return (
    <div className="blog-article-page">

      {/* Hero com imagem full-bleed */}
      <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
        {post.imagem ? (
          <img src={post.imagem} alt={post.titulo} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-700" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="absolute top-6 left-0 right-0 px-6 md:px-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-semibold transition-colors backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full border border-white/20">
            <ArrowLeft className="w-4 h-4" /> Blog FUNSA
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-12 pb-10">
          <div className="max-w-4xl mx-auto">
            {post.categoria && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 backdrop-blur-sm border border-blue-400/40 text-blue-200 text-xs font-bold uppercase tracking-widest mb-4">
                <Tag className="w-3 h-3" /> {post.categoria}
              </span>
            )}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-lg">
              {post.titulo}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta bar sticky */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500 font-medium">
            {post.autor_nome && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-500" />
                <span>Por <strong className="text-slate-700">{post.autor_nome}</strong></span>
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-blue-500" />
              {new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider hidden sm:block">Compartilhar</span>
            <a href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 flex items-center justify-center transition-all">
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-500 hover:text-white text-slate-500 flex items-center justify-center transition-all">
              <Twitter className="w-3.5 h-3.5" />
            </a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-blue-700 hover:text-white text-slate-500 flex items-center justify-center transition-all">
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Corpo do artigo */}
      <div className="bg-slate-50 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">

              {post.resumo && (
                <div className="px-8 md:px-14 pt-10 pb-8 border-b border-slate-100">
                  <div className="flex gap-4 items-start">
                    <div className="w-1 flex-shrink-0 bg-gradient-to-b from-blue-500 to-blue-300 rounded-full self-stretch min-h-[40px]" />
                    <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed italic">{post.resumo}</p>
                  </div>
                </div>
              )}

              <div className="px-8 md:px-14 py-10">
                <div
                  className="blog-post-content"
                  dangerouslySetInnerHTML={{ __html: conteudoHtml }}
                />
              </div>

              {(post.autor_nome || post.autor_descricao) && (
                <div className="mx-8 md:mx-14 mb-10 p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 border border-blue-100 flex items-start gap-5">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-md">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.18em] mb-1">Sobre o Autor</p>
                    {post.autor_nome && <h4 className="text-base font-bold text-slate-800 mb-1">{post.autor_nome}</h4>}
                    {post.autor_descricao && <p className="text-sm text-slate-500 leading-relaxed">{post.autor_descricao}</p>}
                  </div>
                </div>
              )}

              <div className="px-8 md:px-14 py-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/60">
                <Link href="/blog" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-white hover:shadow-sm transition-all">
                  <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
                </Link>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <BookOpen className="w-4 h-4" />
                  <span>FUNSA — Blog Institucional</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Artigos relacionados */}
      {relatedPosts.length > 0 && (
        <div className="bg-white py-14 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Continue lendo</h2>
              <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                Ver todos <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex gap-5 pb-2">
                {relatedPosts.map(rp => (
                  <div key={rp.id} className="embla__slide flex-[0_0_88%] sm:flex-[0_0_46%] lg:flex-[0_0_30%] min-w-0">
                    <Link href={`/blog/${rp.id}`}>
                      <article className="h-full flex flex-col rounded-2xl border border-slate-100 overflow-hidden group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 bg-white">
                        <div className="relative w-full h-40 overflow-hidden">
                          {rp.imagem ? (
                            <img src={rp.imagem} alt={rp.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-slate-100" />
                          )}
                          {rp.categoria && (
                            <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-white/90 text-[10px] font-bold text-blue-700 uppercase tracking-wide shadow-sm">
                              {rp.categoria}
                            </span>
                          )}
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <p className="text-[11px] text-slate-400 font-medium mb-2 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(rp.created_at).toLocaleDateString('pt-BR')}
                          </p>
                          <h4 className="text-sm font-bold text-slate-800 leading-snug mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">{rp.titulo}</h4>
                          {rp.resumo && <p className="text-xs text-slate-400 line-clamp-2 mb-3 flex-1">{rp.resumo}</p>}
                          <span className="mt-auto text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                            Ler artigo <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </article>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
