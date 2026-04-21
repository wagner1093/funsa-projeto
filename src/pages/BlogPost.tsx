import { useParams, Link } from "react-router-dom";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowLeft, Calendar, Clock, Tag, Share2, Facebook, Twitter, Linkedin, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { supabase } from "@/lib/supabase";

export default function BlogPost() {
  const { id } = useParams();
  const [emblaRef] = useEmblaCarousel({ loop: false, align: "start", dragFree: true });
  
  const [post, setPost] = useState<any>(null);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    async function fetchPost() {
      setLoading(true);
      if (!id) return;
      
      const { data: postData } = await supabase.from('funsa_posts').select('*').eq('id', id).single();
      
      if (postData) {
        setPost(postData);
        const { data: relatedData } = await supabase.from('funsa_posts').select('*').neq('id', postData.id).limit(4);
        if (relatedData) setRelatedPosts(relatedData);
      }
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return <div className="text-center py-20 text-xl text-muted-foreground">Carregando artigo...</div>;
  }

  if (!post) {
    return <div className="text-center py-20 text-xl text-muted-foreground">Artigo não encontrado.</div>;
  }

  return (
    <>
      <PageHero
        title="Blog FUNSA"
        subtitle={post.categoria}
        breadcrumbs={[
          { label: "Blog", href: "/blog" },
          { label: "Artigo", href: "#" }
        ]}
      />

      <section className="section-padding bg-slate-50">
        <div className="section-container max-w-4xl mx-auto">
          
          <ScrollReveal>
            {/* Header do Post */}
            <div className="mb-10 text-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-azure/10 text-azure text-sm font-semibold mb-6">
                <Tag className="w-4 h-4" />
                {post.categoria}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-6 leading-tight">
                {post.titulo}
              </h1>
              
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground font-medium mb-10">
                <span className="flex items-center gap-2">
                   <Calendar className="w-4 h-4 text-azure" />
                  {new Date(post.created_at).toLocaleDateString('pt-BR')}
                </span>
                <span className="flex items-center gap-2">
                   <Clock className="w-4 h-4 text-azure" />
                  {post.tempo_leitura}
                </span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {/* Imagem Principal */}
            <div className="rounded-3xl overflow-hidden shadow-lg border border-border mb-12 h-64 sm:h-96 w-full">
              <img 
                src={post.imagem} 
                alt={post.titulo} 
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            {/* Conteúdo do Post */}
            <div className="bg-white p-8 md:p-14 rounded-3xl shadow-sm border border-border mb-12">
              <div className="prose prose-lg prose-stone max-w-none">
                <p className="text-xl text-muted-foreground font-medium mb-8 leading-relaxed italic border-l-4 border-azure pl-6">
                  {post.resumo}
                </p>
                <hr className="mb-8 border-border" />
                
                {/* O conteúdo do artigo (Em um app real, idealmente processado por um parser de HTML ou Markdown) */}
                <div 
                  className="space-y-6 text-slate-700 leading-relaxed 
                  [&>h3]:text-2xl [&>h3]:font-serif [&>h3]:font-bold [&>h3]:text-primary [&>h3]:mt-10 [&>h3]:mb-4
                  [&>p]:mb-4
                  [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-3 [&>ul]:mb-6
                  [&>ul>li>strong]:text-primary"
                  dangerouslySetInnerHTML={{ __html: post.conteudo }}
                />
              </div>

              {/* Botões de Ação na Base do Post */}
              <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-muted-foreground">Compartilhar:</span>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-azure hover:text-white transition-colors">
                      <Facebook className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-azure hover:text-white transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-primary hover:bg-azure hover:text-white transition-colors">
                      <Linkedin className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <Link 
                  to="/blog"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border font-semibold text-primary hover:bg-muted transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar ao Blog
                </Link>
              </div>
            </div>
            
            {/* Slider de Artigos Relacionados */}
            <div className="mt-20 mb-8 overflow-hidden">
              <div className="flex items-center justify-between mb-8 px-2">
                <h3 className="text-2xl font-serif font-bold text-primary">
                  Continue lendo
                </h3>
              </div>
              
              <div className="embla" ref={emblaRef}>
                <div className="embla__container flex gap-6 px-2 pb-6">
                  {relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="embla__slide flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0">
                      <article className="h-full flex flex-col bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        <div className="w-full h-44 overflow-hidden relative">
                          <img 
                            src={relatedPost.imagem} 
                            alt={relatedPost.titulo} 
                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                           <span className="absolute bottom-3 left-3 z-20 inline-flex items-center px-2.5 py-0.5 rounded-full bg-white text-[10px] font-semibold text-primary shadow-sm uppercase tracking-wide">
                            {relatedPost.categoria}
                          </span>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground font-medium mb-2">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(relatedPost.created_at).toLocaleDateString('pt-BR')}
                            </span>
                          </div>
                          <h4 className="text-lg font-serif font-bold text-foreground mb-2 group-hover:text-azure transition-colors line-clamp-2">
                            {relatedPost.titulo}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 flex-1">
                            {relatedPost.resumo}
                          </p>
                          <Link to={`/blog/${relatedPost.id}`} className="mt-auto text-xs font-semibold text-primary flex items-center gap-1 group-hover:text-azure transition-colors w-fit">
                            Ler artigo <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </article>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
