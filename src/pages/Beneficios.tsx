import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Users, MapPin, Shield, HandHeart, Network, Headphones, Clock, Settings, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  { icon: Users, title: "Assistência Familiar Completa", desc: "Suporte integral para toda a família em todos os momentos, com cobertura abrangente e atendimento dedicado." },
  { icon: MapPin, title: "Cobertura em Todo o Estado", desc: "Tranquilidade onde quer que você esteja. Presença e atendimento em todo o estado de São Paulo." },
  { icon: Shield, title: "Dignidade e Segurança", desc: "Compromisso inabalável com o respeito e a segurança de cada família, em cada etapa do processo." },
  { icon: HandHeart, title: "Comodidade Total", desc: "Serviços integrados que facilitam todos os processos, oferecendo soluções práticas para sua família." },
  { icon: Network, title: "Rede de Convênios", desc: "Ampla rede de convênios médicos, odontológicos e parcerias exclusivas para cuidar da saúde da sua família." },
  { icon: Headphones, title: "Suporte Humanizado", desc: "Equipe preparada para acolher com empatia, oferecendo atendimento personalizado em todos os momentos." },
  { icon: Clock, title: "Atendimento 24h", desc: "Disponibilidade total para emergências, com equipe pronta a qualquer hora do dia ou da noite." },
  { icon: Settings, title: "Flexibilidade de Planos", desc: "Opções que se adaptam às necessidades e ao orçamento de cada família, com condições especiais." },
];

export default function Beneficios() {
  return (
    <>
      <PageHero
        title="Benefícios"
        subtitle="Descubra os diferenciais e vantagens exclusivas de escolher a FUNSA para cuidar de você e sua família."
        breadcrumbs={[{ label: "Benefícios", href: "/beneficios" }]}
      />

      <section className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">Diferenciais</span>
              <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Por que escolher a FUNSA?
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.06}>
                <div className="p-8 rounded-2xl bg-card border border-border/50 hover-lift group text-center h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <b.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed flex-1">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-navy">
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Descubra o plano ideal para você
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
              Conheça nossos planos de assistência familiar e garanta proteção e tranquilidade para toda a família.
            </p>
            <Link
              to="/plano"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
            >
              Conheça o Plano <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
