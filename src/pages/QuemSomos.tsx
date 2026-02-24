import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import teamImg from "@/assets/team.jpg";
import { Heart, Eye, Target, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { value: 80, suffix: "+", label: "Anos de Tradição" },
  { value: 50, suffix: "mil+", label: "Famílias Atendidas" },
  { value: 24, suffix: "h", label: "Atendimento Ininterrupto" },
  { value: 100, suffix: "%", label: "Compromisso" },
];

const mvv = [
  {
    icon: Target,
    title: "Missão",
    text: "Sempre prestar serviços funerários de qualidade, proporcionando comodidade e tranquilidade aos nossos clientes e associados, com um atendimento humanizado, respeitoso e seguro.",
  },
  {
    icon: Eye,
    title: "Visão",
    text: "Ser referência em atendimento de assistência familiar, reconhecida pela excelência na prestação de serviços no segmento de atividades funerárias, com qualidade e com carinho.",
  },
  {
    icon: Heart,
    title: "Valores",
    text: "Atuar de forma ética, responsável e transparente. Superar as expectativas de cada cliente, otimizando e inovando processos, focando sempre na qualidade de nossas técnicas e métodos.",
  },
];

export default function QuemSomos() {
  return (
    <>
      <PageHero
        title="Quem Somos"
        subtitle="Desde 1943, a FUNSA é sinônimo de tradição, respeito e acolhimento em Avaré e em todo o estado de São Paulo."
        breadcrumbs={[{ label: "Quem Somos", href: "/quem-somos" }]}
      />

      {/* History */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">Nossa História</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Uma história de cuidado e respeito
              </h2>
              <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
                A FUNSA Funerária é referência em serviços funerários há mais de 80 anos, oferecendo atendimento humanizado, suporte completo e assistência funeral 24 horas. Com tradição, credibilidade e respeito, cuidamos de cada família com sensibilidade e profissionalismo, garantindo organização e tranquilidade em todos os momentos da despedida.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Especializada em serviços funerários completos, a FUNSA conta com estrutura moderna, equipe qualificada e soluções personalizadas para velórios, cerimônias e homenagens. Nosso compromisso é proporcionar acolhimento, orientação e apoio em cada etapa, assegurando um atendimento ágil, digno e respeitoso.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Mais do que uma funerária, somos um suporte presente e confiável. Trabalhamos com ética, empatia e responsabilidade para honrar cada história de vida, oferecendo assistência funeral 24h com cuidado, humanidade e dedicação em todos os detalhes.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="relative">
                <img
                  src={teamImg}
                  alt="Equipe profissional da FUNSA"
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
                />
                <div className="absolute -bottom-6 -left-6 p-6 glass-card rounded-2xl">
                  <span className="text-3xl font-bold text-primary">1943</span>
                  <p className="text-sm text-muted-foreground mt-1">Ano de fundação</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">Propósito</span>
              <h2 className="mt-3 text-2xl font-bold text-foreground md:text-4xl">
                Missão, Visão e Valores
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-8">
            {mvv.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                  <p className="mt-4 text-muted-foreground leading-relaxed flex-1">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 gradient-navy">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-bold text-primary-foreground">
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <p className="mt-2 text-sm text-primary-foreground/60">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-background">
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-2xl font-bold text-foreground mb-4 md:text-4xl">
              Venha nos conhecer
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
              Estamos sempre prontos para recebê-lo com o acolhimento que sua família merece.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
            >
              Entre em Contato <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
