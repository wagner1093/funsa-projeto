import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import teamImg from "@/assets/team.jpg";
import { Heart, Shield, Award, Users, Eye, Handshake, Lightbulb, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const values = [
  { icon: Heart, label: "Dignidade", desc: "Tratamos cada família com o mais profundo respeito e cuidado." },
  { icon: Shield, label: "Respeito", desc: "Honramos a memória de cada pessoa com seriedade e atenção." },
  { icon: Award, label: "Profissionalismo", desc: "Equipe altamente qualificada e comprometida com a excelência." },
  { icon: Users, label: "Humanidade", desc: "Acolhimento genuíno em todos os momentos." },
  { icon: Eye, label: "Transparência", desc: "Clareza e honestidade em todas as relações." },
  { icon: Handshake, label: "Acolhimento", desc: "Presença e suporte integral para cada família." },
  { icon: Lightbulb, label: "Tradição", desc: "Mais de 80 anos de história e confiança na comunidade." },
];

const timeline = [
  { year: "1943", title: "Fundação", desc: "Nascimento da FUNSA em Avaré, com o compromisso de servir a comunidade com dignidade." },
  { year: "1970", title: "Expansão dos Serviços", desc: "Ampliação da estrutura e inclusão de novos serviços de assistência à família." },
  { year: "1995", title: "Cemitério Memorial", desc: "Inauguração do Cemitério Memorial Pôr do Sol, referência em modernidade e conforto." },
  { year: "2010", title: "PREV SAÚDE", desc: "Lançamento do convênio médico, expandindo o cuidado com a saúde das famílias." },
  { year: "2020", title: "Transformação Digital", desc: "Lançamento do aplicativo FUNSA e modernização completa do atendimento." },
  { year: "Hoje", title: "Referência Regional", desc: "Reconhecida como referência em assistência familiar em todo o estado de São Paulo." },
];

const stats = [
  { value: 80, suffix: "+", label: "Anos de Tradição" },
  { value: 50, suffix: "mil+", label: "Famílias Atendidas" },
  { value: 24, suffix: "h", label: "Atendimento Ininterrupto" },
  { value: 100, suffix: "%", label: "Compromisso" },
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
                Fundada em 1943, a FUNSA – Funerária Nossa Senhora Aparecida nasceu com o
                propósito de oferecer segurança e tranquilidade em todos os momentos. Ao longo
                de mais de oito décadas, nos tornamos referência em assistência familiar na região
                de Avaré e em todo o estado de São Paulo.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Nossa missão é acolher cada família com dignidade, oferecendo
                serviços completos e um atendimento verdadeiramente humanizado. Acreditamos
                que a excelência está nos detalhes e no cuidado genuíno com cada pessoa.
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

      {/* Mission / Vision */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">Propósito</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
                Missão, Visão e Valores
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <ScrollReveal>
              <div className="p-8 rounded-2xl bg-card border border-border/50 h-full">
                <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center mb-5">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Missão</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Oferecer suporte completo e humanizado em momentos delicados, com dignidade, respeito e profissionalismo,
                  garantindo segurança e tranquilidade para cada família.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl bg-card border border-border/50 h-full">
                <div className="w-12 h-12 rounded-xl gradient-navy flex items-center justify-center mb-5">
                  <Eye className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Visão</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  Ser a referência em assistência familiar e funerária, reconhecida pela excelência
                  no atendimento, inovação e compromisso com a comunidade.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <ScrollReveal key={v.label} delay={i * 0.06}>
                <div className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border/50">
                  <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center flex-shrink-0">
                    <v.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">{v.label}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">Trajetória</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
                Marcos da nossa história
              </h2>
            </div>
          </ScrollReveal>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />
            {timeline.map((t, i) => (
              <ScrollReveal key={t.year} delay={i * 0.1}>
                <div className={`relative flex items-start gap-8 mb-12 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-gold border-4 border-background -translate-x-1.5 md:-translate-x-1.5 mt-2" />
                  <div className="ml-12 md:ml-0 md:w-1/2 p-6 rounded-2xl bg-card border border-border/50">
                    <span className="text-sm font-bold text-gold">{t.year}</span>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{t.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
                  </div>
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
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
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
