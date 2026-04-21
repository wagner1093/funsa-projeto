import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Cross, MessageCircle, Heart, Send, PhoneCall, Flower2 } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Falecidos() {
  const [falecimentos, setFalecimentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFalecidos() {
      const { data } = await supabase
        .from('falecidos')
        .select('*, mensagens:falecidos_homenagens(*)')
        .order('created_at', { ascending: false });
      
      if (data) setFalecimentos(data);
      setLoading(false);
    }
    loadFalecidos();
  }, []);

  const [mensagem, setMensagem] = useState("");
  const [nome, setNome] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [dialogOpen, setDialogOpen] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent, falecidoId: string) => {
    e.preventDefault();
    if (mensagem.trim() && nome.trim()) {
      const { error } = await supabase.from('falecidos_homenagens').insert([
        { falecido_id: falecidoId, nome, mensagem }
      ]);

      if (!error) {
        setEnviado(true);
        setFalecimentos(prev => prev.map(f => {
          if (f.id === falecidoId) {
            return {
              ...f,
              mensagens: [...(f.mensagens || []), { nome, mensagem, created_at: new Date().toISOString() }]
            };
          }
          return f;
        }));
        setMensagem("");
        setNome("");
        setTimeout(() => {
          setEnviado(false);
          setDialogOpen(null);
        }, 3000);
      } else {
        alert("Erro ao enviar homenagem. Tente novamente.");
      }
    }
  };

  return (
    <>
      <PageHero
        title="Falecimentos"
        subtitle="Homenagem e respeito à memória de cada vida."
        breadcrumbs={[{ label: "Falecimentos", href: "/falecidos" }]}
      />

      <section className="section-padding bg-background">
        <div className="container max-w-4xl mx-auto text-center mb-12">
          <ScrollReveal>
            <p className="text-xl text-muted-foreground font-serif">
              Prestamos nossas condolências às famílias e convidamos a participar das cerimônias de despedida.
            </p>
          </ScrollReveal>

          {/* Highlight: Coroa de Flores */}
          <ScrollReveal delay={0.2}>
            <div className="mt-12 gradient-navy rounded-3xl p-8 md:p-10 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--azure)/0.15),transparent_60%)]" />
              <div className="relative z-10">
                <Flower2 className="w-10 h-10 text-azure mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Quer homenagear? Envie sua coroa de flores
                </h2>
                <p className="text-white/70 text-base max-w-xl mx-auto mb-6">
                  Expresse seu carinho através de arranjos florais. Visualize nosso catálogo e faça seu pedido.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/catalogo-flores.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary-dark py-2 px-6 text-sm">
                    Ver Catálogo
                  </a>
                  <a
                    href="https://wa.me/5514997792932"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark py-2 px-6 text-sm"
                  >
                    Solicitar via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="section-container max-w-5xl mx-auto">
          <ScrollReveal>
            <div className="space-y-6">
              {falecimentos.map((f, i) => {
                const mensagens = f.mensagens || [];
                return (
                  <div
                    key={f.id || i}
                    className="p-6 md:p-8 rounded-2xl bg-card border border-border/50 flex flex-col md:flex-row relative gap-4 sm:gap-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-1 items-start gap-4">
                      {/* Icon or Image */}
                      {f.imagem ? (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden flex-shrink-0 mt-1 shadow-sm border border-border">
                          <img src={f.imagem} alt={f.nome} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-azure/10 flex items-center justify-center flex-shrink-0 mt-1 shadow-sm">
                          <Cross className="w-6 h-6 text-azure" />
                        </div>
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-4 mb-2">
                          <h3 className="font-serif text-2xl font-medium text-foreground break-words">
                            {f.nome}
                          </h3>
                          <div className="md:absolute md:top-6 md:right-8">
                            <span className="text-sm font-medium text-muted-foreground border border-border bg-white rounded-full px-4 py-1.5 flex-shrink-0 whitespace-nowrap shadow-sm">
                              {f.data}
                            </span>
                          </div>
                        </div>

                        <div className="mb-4">
                          <span className="inline-block px-2 py-0.5 bg-azure/10 text-azure text-xs font-medium rounded-md">
                            {f.local}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2 text-sm text-foreground/80">
                          <p>
                            <span className="font-medium text-muted-foreground">Velório:</span>{" "}
                            <span>{f.velorio}</span>
                          </p>
                          <p>
                            <span className="font-medium text-muted-foreground">Sepultamento:</span>{" "}
                            <span>{f.sepultamento}</span>
                          </p>
                          {f.contato_medico && (
                            <p className="w-full mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 border border-border/50 rounded-md text-primary font-medium">
                              <PhoneCall className="w-4 h-4" /> Contato Médico: {f.contato_medico}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Right side buttons container */}
                    <div className="flex flex-row flex-wrap items-center justify-start md:justify-end gap-3 mt-4 md:mt-0 md:absolute md:bottom-6 md:right-8 pt-4 md:pt-0 border-t md:border-t-0 border-border/30">
                      
                      {/* Ver Homenagens Dialog */}
                      <Dialog>
                        <DialogTrigger asChild>
                          <button className="flex items-center gap-1.5 bg-white hover:bg-muted transition-colors border border-border/80 px-4 py-2 rounded-full text-sm text-primary font-medium shadow-sm">
                            <MessageCircle className="w-4 h-4 opacity-70" />
                            <span>
                              {mensagens.length} {mensagens.length === 1 ? "homenagem" : "homenagens"}
                            </span>
                          </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md bg-card p-8 border-border max-h-[80vh] overflow-y-auto">
                          <DialogHeader className="mb-4">
                            <DialogTitle className="text-xl font-serif text-foreground">
                              Homenagens para {f.nome}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {mensagens.length > 0 ? (
                              mensagens.map((msg: any, idx: number) => (
                                <div key={idx} className="bg-muted/30 p-4 rounded-xl border border-border/50">
                                  <p className="text-sm font-semibold text-foreground mb-1">{msg.nome}</p>
                                  <p className="text-sm text-muted-foreground">{msg.mensagem}</p>
                                </div>
                              ))
                            ) : (
                              <p className="text-center text-muted-foreground text-sm py-4">
                                Nenhuma homenagem registrada ainda. Seja o primeiro a deixar uma mensagem de carinho.
                              </p>
                            )}
                          </div>
                        </DialogContent>
                      </Dialog>

                      {/* Deixar Homenagem Dialog */}
                      <Dialog
                        open={dialogOpen === f.id}
                        onOpenChange={(isOpen) => setDialogOpen(isOpen ? f.id : null)}
                      >
                        <DialogTrigger asChild>
                          <Button className="btn-primary-light flex items-center gap-2 px-5 py-5 rounded-full shadow-sm text-sm">
                            <Heart className="w-4 h-4" />
                            Quero homenagear
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl bg-card p-8 border-border">
                          <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl font-serif text-foreground">
                              Homenagear {f.nome}
                            </DialogTitle>
                            <DialogDescription className="text-base text-muted-foreground">
                              Deixe uma mensagem de carinho para a família.
                            </DialogDescription>
                          </DialogHeader>

                          {enviado && (
                            <div className="mb-4 p-4 rounded-lg bg-green-50 text-green-800 text-center text-sm font-medium border border-green-200">
                              Sua homenagem foi enviada com carinho. Obrigado!
                            </div>
                          )}

                          <form
                            onSubmit={(e) => handleSubmit(e, f.id)}
                            className="space-y-5"
                          >
                            <div>
                              <Input
                                type="text"
                                placeholder="Seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                className="w-full rounded-xl border-border border-2 bg-white px-4 py-6 text-base shadow-sm focus-visible:ring-primary"
                                required
                              />
                            </div>
                            <div>
                              <Textarea
                                placeholder="Sua mensagem de homenagem..."
                                value={mensagem}
                                onChange={(e) => setMensagem(e.target.value)}
                                rows={5}
                                className="w-full rounded-xl border-border border-2 bg-white px-4 py-4 text-base shadow-sm resize-none focus-visible:ring-primary"
                                required
                              />
                            </div>
                            <Button
                              type="submit"
                              className="w-full py-6 btn-primary-light font-semibold shadow-md flex items-center justify-center gap-2 mt-2"
                            >
                              <Send className="w-5 h-5" />
                              Enviar homenagem
                            </Button>
                          </form>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
