import ScrollReveal from "./ScrollReveal";
import { Check, ArrowRight } from "lucide-react";

const included = [
  "Assistência funerária completa",
  "Atendimento 24 horas",
  "Cobertura em todo o estado de SP",
  "Traslado sem limite de quilometragem",
  "Assistência médica PREV SAÚDE",
  "Acesso ao Clube FUNSA de vantagens",
  "Carteirinha virtual pelo aplicativo",
  "Suporte humanizado e dedicado",
];

export default function PlanSection() {
  return (
    <section id="plano" className="section-padding gradient-navy">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">Plano de Assistência</span>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground leading-tight">
              Proteção e tranquilidade para toda a família
            </h2>
            <p className="mt-6 text-primary-foreground/70 text-lg leading-relaxed">
              Nosso plano oferece cobertura completa e benefícios exclusivos, 
              garantindo que sua família esteja sempre amparada com dignidade e segurança.
            </p>
            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold text-base hover-lift"
            >
              Contratar Plano
              <ArrowRight className="w-4 h-4" />
            </a>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-primary-foreground mb-6">O que está incluído</h3>
              <div className="space-y-4">
                {included.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-primary-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
