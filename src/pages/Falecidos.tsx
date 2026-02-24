import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Cross } from "lucide-react";
import { useState } from "react";

const falecimentos = [
  {
    nome: "Maria Aparecida dos Santos",
    data: "15/02/2026",
    velorio: "Sala 1 – Das 14h às 20h",
    sepultamento: "16/02/2026 às 10h",
  },
  {
    nome: "José Carlos de Oliveira",
    data: "14/02/2026",
    velorio: "Sala 2 – Das 18h às 08h",
    sepultamento: "15/02/2026 às 16h",
  },
  {
    nome: "Ana Paula Ferreira",
    data: "13/02/2026",
    velorio: "Capela Principal – Das 09h às 15h",
    sepultamento: "13/02/2026 às 17h",
  },
  {
    nome: "Antônio Pereira da Silva",
    data: "12/02/2026",
    velorio: "Sala 3 – Das 10h às 16h",
    sepultamento: "13/02/2026 às 09h",
  },
  {
    nome: "Francisca de Souza Lima",
    data: "11/02/2026",
    velorio: "Sala 1 – Das 08h às 14h",
    sepultamento: "12/02/2026 às 10h",
  },
];

export default function Falecidos() {
  const [mensagem, setMensagem] = useState("");
  const [nome, setNome] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mensagem.trim() && nome.trim()) {
      setEnviado(true);
      setMensagem("");
      setNome("");
      setTimeout(() => setEnviado(false), 3000);
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
        <div className="section-container max-w-3xl">
          <ScrollReveal>
            <div className="space-y-4">
              {falecimentos.map((f, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl bg-card border border-border/50 flex items-start gap-4 hover:shadow-md transition-shadow"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <Cross className="w-5 h-5 text-accent" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg text-foreground">{f.nome}</h3>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-sm">
                      <p>
                        <span className="font-semibold text-accent">Velório:</span>{" "}
                        <span className="text-muted-foreground">{f.velorio}</span>
                      </p>
                      <p>
                        <span className="font-semibold text-accent">Sepultamento:</span>{" "}
                        <span className="text-muted-foreground">{f.sepultamento}</span>
                      </p>
                    </div>
                  </div>

                  {/* Date badge */}
                  <span className="text-xs font-medium text-muted-foreground border border-border rounded-full px-3 py-1 flex-shrink-0 whitespace-nowrap">
                    {f.data}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Homenagem */}
          <ScrollReveal>
            <div className="mt-16 p-8 rounded-2xl bg-card border border-border/50">
              <h2 className="text-2xl font-bold text-foreground mb-2 text-center">
                Quero homenagear
              </h2>
              <p className="text-muted-foreground text-center mb-6">
                Deixe uma frase de consolação em memória de quem partiu.
              </p>

              {enviado && (
                <div className="mb-4 p-3 rounded-lg bg-accent/10 text-accent text-center text-sm font-medium">
                  Sua homenagem foi enviada com carinho. Obrigado!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
                <input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50"
                  required
                />
                <textarea
                  placeholder="Escreva sua mensagem de consolação..."
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 resize-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-accent text-accent-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  Enviar homenagem
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
