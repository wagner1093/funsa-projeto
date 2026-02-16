import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ChevronRight } from "lucide-react";

const falecimentos = [
  { nome: "Maria Aparecida dos Santos", idade: 82, data: "2026-02-15", cidade: "Avaré/SP" },
  { nome: "José Carlos de Oliveira", idade: 75, data: "2026-02-14", cidade: "Avaré/SP" },
  { nome: "Ana Paula Ferreira", idade: 68, data: "2026-02-13", cidade: "Cerqueira César/SP" },
  { nome: "Antônio Pereira da Silva", idade: 90, data: "2026-02-12", cidade: "Avaré/SP" },
  { nome: "Francisca de Souza Lima", idade: 77, data: "2026-02-11", cidade: "Itaí/SP" },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default function Falecidos() {
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
                  className="p-5 rounded-2xl bg-card border border-border/50 flex items-center justify-between gap-4 hover:shadow-md transition-shadow"
                >
                  <div>
                    <h3 className="font-bold text-foreground">{f.nome}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {f.idade} anos · {f.cidade}
                    </p>
                    <p className="text-xs text-muted-foreground/70 mt-1">{formatDate(f.data)}</p>
                  </div>
                  <button className="flex items-center gap-1 text-sm font-semibold text-accent hover:underline flex-shrink-0">
                    Ver detalhes <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
