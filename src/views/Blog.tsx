'use client';
import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Phone, Calendar, Search, Send, Mail, User } from "lucide-react";
import Link from 'next/link';
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Blog() {
  const [artigos, setArtigos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todos");

  const [newsName, setNewsName] = useState("");
  const [newsEmail, setNewsEmail] = useState("");
  const [newsLoading, setNewsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function loadPosts() {
      try {
        const { data, error } = await supabase
          .from('funsa_posts')
          .select('*')
          .or('status.eq.publicado,status.is.null')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('[Blog] Erro ao carregar posts:', error.message);
        }
        if (data) setArtigos(data);
      } catch (err) {
        console.error('[Blog] Erro inesperado:', err);
      } finally {
        // Garante que o loading SEMPRE termina, mesmo em caso de erro
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsName.trim() || !newsEmail.trim()) return;
    setNewsLoading(true);
    const { error } = await supabase.from('funsa_newsletter_leads').insert([{ nome: newsName, email: newsEmail }]);
    if (error) {
      toast({ title: error.code === '23505' ? "E-mail já cadastrado" : "Erro", description: error.code === '23505' ? "Este e-mail já está na nossa newsletter." : "Tente novamente.", variant: "destructive" });
    } else {
      toast({ title: "Sucesso!", description: "Você receberá nossas novidades em breve." });
      setNewsName(""); setNewsEmail("");
    }
    setNewsLoading(false);
  };

  const categories = ["Todos", ...Array.from(new Set(artigos.map(a => a.categoria).filter(Boolean))) as string[]];

  const featuredPost = searchQuery || activeCategory !== "Todos" ? null : (artigos.find(a => a.featured) || artigos[0]);

  const filteredPosts = artigos.filter(a => {
    if (featuredPost && a.id === featuredPost.id && !searchQuery && activeCategory === "Todos") return false;
    const matchSearch = !searchQuery || a.titulo?.toLowerCase().includes(searchQuery.toLowerCase()) || a.resumo?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = activeCategory === "Todos" || a.categoria === activeCategory;
    return matchSearch && matchCat;
  });

  if (loading) {
    return (
      <>
        <PageHero title="Blog FUNSA" subtitle="Carregando..." breadcrumbs={[{ label: "Blog", href: "/blog" }]} />
        <div className="h-96 flex items-center justify-center bg-white">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        title="Blog FUNSA"
        subtitle="Nosso espaço dedicado à informação, orientação e acolhimento."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <ScrollReveal>
            {/* Cabeçalho */}
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-bold text-azure uppercase tracking-[0.18em]">Leituras & Reflexões</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-primary leading-tight">
                Acolhendo através do conhecimento
              </h2>
              <p className="mt-4 text-slate-500 text-base leading-relaxed">
                Informação, orientação e cuidado para quem atravessa momentos delicados da vida.
              </p>
            </div>

            {/* Busca */}
            <div className="max-w-md mx-auto mb-10 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Buscar no blog..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-5 py-3 rounded-full border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all shadow-sm"
              />
            </div>

            {/* Filtro categorias */}
            {categories.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2 mb-14">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                      activeCategory === cat
                        ? 'bg-primary text-white border-primary shadow-md'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-primary hover:text-primary'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </ScrollReveal>

          {/* Post em destaque – layout horizontal */}
          {featuredPost && (
            <ScrollReveal delay={0.1}>
              <Link href={`/blog/${featuredPost.id}`} className="block mb-16 group">
                <div className="rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-400 flex flex-col md:flex-row">
                  {/* Imagem */}
                  <div className="relative w-full md:w-[52%] h-64 md:h-80 overflow-hidden flex-shrink-0">
                    {featuredPost.imagem ? (
                      <img
                        src={featuredPost.imagem}
                        alt={featuredPost.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary to-secondary" />
                    )}
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 p-8 md:p-10 flex flex-col justify-center">
                    {featuredPost.categoria && (
                      <span className="inline-block mb-3 text-[11px] font-bold uppercase tracking-widest text-azure">
                        {featuredPost.categoria}
                      </span>
                    )}
                    <h2 className="text-2xl md:text-3xl font-bold text-primary leading-tight mb-3 line-clamp-3">
                      {featuredPost.titulo}
                    </h2>
                    {featuredPost.resumo && (
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {featuredPost.resumo}
                      </p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100">
                      <div className="flex items-center gap-2 text-slate-500">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium">{featuredPost.autor_nome || 'FUNSA'}</span>
                      </div>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                        Ler artigo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          )}

          {/* Grid de cards */}
          {filteredPosts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filteredPosts.map((a, i) => (
                <ScrollReveal key={a.id || i} delay={0.04 * i}>
                  <Link href={`/blog/${a.id}`} className="block h-full group">
                    <article className="h-full flex flex-col bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

                      {/* Imagem LIMPA — sem texto overlay */}
                      <div className="relative w-full overflow-hidden flex-shrink-0" style={{ aspectRatio: '16/9' }}>
                        {a.imagem ? (
                          <img
                            src={a.imagem}
                            alt={a.titulo}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                            <span className="text-slate-300 text-sm font-medium">Sem imagem</span>
                          </div>
                        )}
                      </div>

                      {/* Conteúdo */}
                      <div className="p-6 flex flex-col flex-1">

                        {/* Categoria */}
                        {a.categoria && (
                          <span className="inline-block mb-2 text-[11px] font-bold uppercase tracking-widest text-azure">
                            {a.categoria}
                          </span>
                        )}

                        {/* Título */}
                        <h3 className="text-base font-bold text-primary leading-snug mb-2 line-clamp-3">
                          {a.titulo}
                        </h3>

                        {/* Resumo */}
                        {a.resumo && (
                          <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 flex-1">
                            {a.resumo}
                          </p>
                        )}

                        {/* Rodapé: Autor + Seta */}
                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <User className="w-3.5 h-3.5 text-primary" />
                            </div>
                            <span className="text-xs font-semibold text-slate-600 truncate max-w-[120px]">
                              {a.autor_nome || 'FUNSA'}
                            </span>
                          </div>
                          <span className="w-8 h-8 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-200 flex-shrink-0">
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-slate-300" />
              </div>
              <h3 className="text-lg font-bold text-slate-700 mb-1">Nenhum artigo encontrado</h3>
              <p className="text-slate-400 text-sm">Não encontramos resultados para "{searchQuery}". Tente outros termos.</p>
            </div>
          )}

          {/* Newsletter */}
          <ScrollReveal delay={0.15}>
            <div className="mt-24 rounded-2xl overflow-hidden flex flex-col md:flex-row bg-white border border-slate-100 shadow-sm">
              <div className="p-10 md:p-12 md:w-1/2 bg-gradient-to-br from-primary to-secondary flex flex-col justify-center">
                <Mail className="w-9 h-9 text-white/60 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Receba novidades por e-mail</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Artigos exclusivos, orientações e novidades da FUNSA direto no seu e-mail.
                </p>
              </div>
              <div className="p-10 md:p-12 md:w-1/2 flex items-center">
                <form onSubmit={handleNewsletterSubmit} className="w-full space-y-3">
                  <Input placeholder="Seu nome" value={newsName} onChange={e => setNewsName(e.target.value)} className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-primary" required />
                  <Input type="email" placeholder="Seu melhor e-mail" value={newsEmail} onChange={e => setNewsEmail(e.target.value)} className="h-11 bg-slate-50 border-slate-200 focus-visible:ring-primary" required />
                  <Button type="submit" disabled={newsLoading} className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    {newsLoading ? 'Inscrevendo...' : 'Quero receber as novidades'}
                  </Button>
                </form>
              </div>
            </div>
          </ScrollReveal>

          {/* CTA */}
          <ScrollReveal delay={0.2}>
            <div className="mt-16 text-center">
              <h4 className="text-lg font-bold text-primary mb-2">Sempre ao seu lado</h4>
              <p className="text-slate-400 text-sm max-w-xs mx-auto mb-6">
                Se precisa de ajuda em um momento difícil, estamos disponíveis 24 horas.
              </p>
              <a href="https://wa.me/5514997792932" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white border border-slate-200 text-primary font-bold text-sm shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
                <Phone className="w-4 h-4 text-azure" /> Fale com nossa equipe
              </a>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
}
