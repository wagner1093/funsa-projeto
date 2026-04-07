import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Phone, Calendar, Clock, Tag, Search, Send, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function Blog() {
  const [artigos, setArtigos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Newsletter
  const [newsName, setNewsName] = useState("");
  const [newsEmail, setNewsEmail] = useState("");
  const [newsLoading, setNewsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function loadPosts() {
      const { data } = await supabase.from('posts').select('*').order('created_at', { ascending: false });
      if (data) setArtigos(data);
      setLoading(false);
    }
    loadPosts();
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsName.trim() || !newsEmail.trim()) return;
    
    setNewsLoading(true);
    const { error } = await supabase.from('newsletter_leads').insert([
      { nome: newsName, email: newsEmail }
    ]);
    
    if (error) {
      if (error.code === '23505') {
        toast({ title: "E-mail já cadastrado", description: "Este e-mail já faz parte da nossa newsletter.", variant: "destructive" });
      } else {
        toast({ title: "Erro", description: "Ocorreu um erro ao assinar. Tente novamente.", variant: "destructive" });
      }
    } else {
      toast({ title: "Sucesso!", description: "Você receberá nossas novidades em breve." });
      setNewsName("");
      setNewsEmail("");
    }
    setNewsLoading(false);
  };


  if (loading) {
    return (
      <>
        <PageHero title="Blog FUNSA" subtitle="Carregando nosso conteúdo..." breadcrumbs={[{ label: "Blog", href: "/blog" }]} />
        <div className="h-96 flex items-center justify-center"><p className="text-muted-foreground animate-pulse text-lg">Carregando artigos...</p></div>
      </>
    );
  }

  const featuredPost = searchQuery ? null : (artigos.find(a => a.featured) || artigos[0]);
  
  const filteredPosts = artigos.filter(a => {
    if (featuredPost && a.id === featuredPost.id && !searchQuery) return false;
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    return a.titulo?.toLowerCase().includes(term) || a.resumo?.toLowerCase().includes(term) || a.categoria?.toLowerCase().includes(term);
  });

  return (
    <>
      <PageHero
        title="Blog FUNSA"
        subtitle="Nosso espaço dedicado à informação, orientação e acolhimento."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="section-padding bg-slate-50">
        <div className="section-container max-w-6xl mx-auto">
          
          <ScrollReveal>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-sm font-semibold text-azure uppercase tracking-widest">Leituras e Reflexões</span>
              <h2 className="mt-4 text-3xl md:text-4xl font-serif font-bold text-primary">
                Acolhendo através do conhecimento
              </h2>
              <p className="mt-5 text-muted-foreground text-lg leading-relaxed">
                O blog da FUNSA reflete nossos valores de respeito e cuidado. Aqui abordamos temas sobre o luto, planejamento e a valorização das memórias de quem amamos.
              </p>
            </div>
            
            {/* Campo de Busca */}
            <div className="max-w-xl mx-auto mb-16 relative">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                placeholder="Buscar no blog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 h-14 rounded-full border-2 border-border bg-white shadow-sm text-base focus-visible:ring-primary transition-all"
              />
            </div>
          </ScrollReveal>

          {/* Destaque */}
          {!searchQuery && featuredPost && (
            <ScrollReveal delay={0.1}>
              <div className="mb-14 group cursor-pointer relative rounded-3xl overflow-hidden bg-white border border-border shadow-sm hover:shadow-xl transition-all duration-500">
                <div className="flex flex-col lg:flex-row">
                  <div className="w-full lg:w-3/5 h-64 sm:h-80 lg:h-auto overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/0 transition duration-500" />
                    <img 
                      src={featuredPost.imagem} 
                      alt={featuredPost.titulo} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                    />
                    <span className="absolute top-6 left-6 z-20 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-sm font-semibold text-primary shadow-lg">
                      <Tag className="w-3.5 h-3.5" />
                      {featuredPost.categoria}
                    </span>
                  </div>
                  
                  <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-medium mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-azure" />
                        {new Date(featuredPost.created_at).toLocaleDateString('pt-BR')}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-azure" />
                        {featuredPost.tempo_leitura}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 group-hover:text-azure transition-colors duration-300">
                      {featuredPost.titulo}
                    </h3>
                    
                    <p className="text-muted-foreground text-base leading-relaxed mb-8 flex-1">
                      {featuredPost.resumo}
                    </p>
                    
                    <Link to={`/blog/${featuredPost.id}`} className="text-sm font-semibold bg-primary text-white self-start px-6 py-3 rounded-xl flex items-center gap-2 group-hover:bg-primary/90 transition-colors shadow-md">
                      Ler artigo completo <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Grid de Artigos Menores */}
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
              {filteredPosts.map((a, i) => (
                <ScrollReveal key={i} delay={0.2 + (i * 0.1)}>
                  <article className="h-full flex flex-col bg-white rounded-2xl border border-border overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="w-full h-56 overflow-hidden relative">
                      <img 
                        src={a.imagem} 
                        alt={a.titulo} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 z-10" />
                      <span className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-xs font-semibold text-primary shadow-md">
                        {a.categoria}
                      </span>
                    </div>
                    <div className="p-6 md:p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {new Date(a.created_at).toLocaleDateString('pt-BR')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {a.tempo_leitura}
                        </span>
                      </div>
                      <h3 className="text-xl font-serif font-bold text-foreground mb-3 group-hover:text-azure transition-colors">
                        {a.titulo}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                        {a.resumo}
                      </p>
                      <Link to={`/blog/${a.id}`} className="text-sm font-semibold text-primary flex items-center gap-1.5 group-hover:text-azure transition-colors w-fit">
                        Continuar lendo <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-serif font-bold text-primary mb-2">Nenhum artigo encontrado</h3>
              <p className="text-muted-foreground">Não encontramos resultados para "{searchQuery}". Tente outros termos.</p>
            </div>
          )}

          {/* Newsletter Box */}
          <ScrollReveal delay={0.3}>
            <div className="mt-24 bg-white rounded-3xl border border-border shadow-sm overflow-hidden flex flex-col md:flex-row">
              <div className="p-10 md:p-12 md:w-1/2 flex flex-col justify-center bg-muted">
                <Mail className="w-10 h-10 text-azure mb-4" />
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-3">
                  Receba novidades por e-mail
                </h3>
                <p className="text-muted-foreground">
                  Inscreva-se em nossa newsletter para receber artigos exclusivos, dicas de bem-estar e novidades da FUNSA diretamente em seu e-mail.
                </p>
              </div>
              <div className="p-10 md:p-12 md:w-1/2 flex items-center">
                <form onSubmit={handleNewsletterSubmit} className="w-full space-y-4">
                  <div>
                    <Input 
                      placeholder="Seu nome" 
                      value={newsName}
                      onChange={(e) => setNewsName(e.target.value)}
                      className="w-full h-12 bg-white border-border focus-visible:ring-primary" 
                      required 
                    />
                  </div>
                  <div>
                    <Input 
                      type="email" 
                      placeholder="Seu melhor e-mail" 
                      value={newsEmail}
                      onChange={(e) => setNewsEmail(e.target.value)}
                      className="w-full h-12 bg-white border-border focus-visible:ring-primary" 
                      required 
                    />
                  </div>
                  <Button 
                    type="submit" 
                    disabled={newsLoading}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {newsLoading ? 'Inscrevendo...' : 'Quero receber as novidades'}
                  </Button>
                </form>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <div className="mt-16 text-center">
              <div className="inline-block p-8 md:p-12 bg-transparent max-w-3xl mx-auto w-full">
                <h4 className="text-xl md:text-2xl font-serif font-bold text-primary mb-3">
                  Sempre ao seu lado
                </h4>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Se você precisa de ajuda num momento difícil, estamos à disposição 24 horas.
                </p>
                <a
                  href="https://wa.me/5514997792932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white border border-border text-primary font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <Phone className="w-5 h-5 text-azure" /> Fale com nossa equipe
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>
    </>
  );
}
