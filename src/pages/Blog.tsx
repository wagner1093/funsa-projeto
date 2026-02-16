import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Phone } from "lucide-react";

const artigos = [
  {
    titulo: "Como lidar com o luto: dicas para enfrentar a perda",
    resumo: "O luto é um processo natural e necessário. Confira orientações para cuidar de si e de quem está ao seu redor nesse momento.",
    data: "10 de fevereiro de 2026",
    imagem: "🌿",
  },
  {
    titulo: "A importância do planejamento funerário para a família",
    resumo: "Entenda por que se planejar com antecedência pode trazer tranquilidade e evitar dificuldades financeiras e emocionais.",
    data: "03 de fevereiro de 2026",
    imagem: "🌸",
  },
  {
    titulo: "Tanatopraxia: o que é e por que é importante",
    resumo: "Saiba como esse procedimento contribui para uma despedida mais acolhedora e digna, respeitando a memória de quem partiu.",
    data: "27 de janeiro de 2026",
    imagem: "🕊️",
  },
  {
    titulo: "Benefícios em vida de um plano funerário",
    resumo: "Muito além do momento da despedida, um plano funerário oferece vantagens no dia a dia como economia e tranquilidade.",
    data: "20 de janeiro de 2026",
    imagem: "🌻",
  },
  {
    titulo: "Como apoiar alguém que está de luto",
    resumo: "Pequenos gestos de acolhimento fazem a diferença. Veja como oferecer suporte a quem perdeu alguém querido.",
    data: "13 de janeiro de 2026",
    imagem: "💐",
  },
];

export default function Blog() {
  return (
    <>
      <PageHero
        title="Blog FUNSA"
        subtitle="Informação, orientação e acolhimento. Um espaço dedicado a temas que importam."
        breadcrumbs={[{ label: "Blog", href: "/blog" }]}
      />

      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          <ScrollReveal>
            <p className="text-muted-foreground text-lg leading-relaxed text-center mb-12">
              O blog da FUNSA é um espaço de informação, orientação e acolhimento, alinhado aos nossos valores de respeito, dignidade e cuidado com as famílias.
            </p>
          </ScrollReveal>

          <div className="space-y-6">
            {artigos.map((a, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <article className="flex gap-5 p-6 rounded-2xl bg-card border border-border/50 hover:shadow-md transition-shadow">
                  <span className="text-4xl flex-shrink-0 mt-1">{a.imagem}</span>
                  <div className="flex-1">
                    <p className="text-xs text-muted-foreground/60 mb-1">{a.data}</p>
                    <h3 className="text-lg font-bold text-foreground mb-2">{a.titulo}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">{a.resumo}</p>
                    <button className="text-sm font-semibold text-accent flex items-center gap-1 hover:underline">
                      Ler mais <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="mt-12 text-center">
              <a
                href="https://wa.me/5514997792932"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-navy text-primary-foreground text-sm font-semibold hover-lift"
              >
                <Phone className="w-4 h-4" /> Fale com nossa equipe 24h
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
