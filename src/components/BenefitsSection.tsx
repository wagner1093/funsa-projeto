import ScrollReveal from "./ScrollReveal";
import { Users, MapPin, Shield, HandHeart, Network, Headphones } from "lucide-react";

const benefits = [
  { icon: Users, title: "Assistência Familiar Completa", desc: "Cobertura para toda a família com serviços abrangentes e suporte integral." },
  { icon: MapPin, title: "Cobertura em Todo o Estado", desc: "Presença e atendimento em todo o estado de São Paulo." },
  { icon: Shield, title: "Dignidade e Segurança", desc: "Compromisso inabalável com o respeito e a segurança de cada família." },
  { icon: HandHeart, title: "Comodidade Total", desc: "Serviços integrados que facilitam todos os processos para você." },
  { icon: Network, title: "Rede de Convênios", desc: "Ampla rede de convênios médicos e parcerias exclusivas." },
  { icon: Headphones, title: "Suporte Humanizado", desc: "Atendimento acolhedor e personalizado em todos os momentos." },
];

export default function BenefitsSection() {
  return (
    <section id="beneficios" className="section-padding bg-background">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-azure uppercase tracking-widest">Benefícios</span>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Por que escolher a FUNSA?
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((b, i) => (
            <ScrollReveal key={b.title} delay={i * 0.08}>
              <div className="p-8 rounded-2xl bg-card border border-border/50 hover-lift group text-center">
                <div className="w-14 h-14 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                  <b.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
