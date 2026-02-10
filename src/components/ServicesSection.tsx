import ScrollReveal from "./ScrollReveal";
import { Clock, Stethoscope, Trees, Sparkles, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-bg.jpg";
import clinicImg from "@/assets/clinic.jpg";
import memorialImg from "@/assets/memorial.jpg";

const services = [
  {
    icon: Clock,
    title: "Atendimento Funerário 24h",
    description: "Plantão permanente para atendimento imediato com dignidade e respeito. Nossa equipe está pronta para oferecer todo o suporte necessário a qualquer momento.",
    image: heroImg,
    cta: "Saiba Mais",
  },
  {
    icon: Stethoscope,
    title: "Assistência Médica",
    description: "Convênio PREV SAÚDE com diversas especialidades disponíveis. Agendamento facilitado e atendimento de qualidade para toda a família.",
    image: clinicImg,
    cta: "Agendar Consulta",
  },
  {
    icon: Trees,
    title: "Cemitério Memorial Pôr do Sol",
    description: "Espaço moderno, seguro e acolhedor para homenagear seus entes queridos. Infraestrutura completa em meio a um ambiente de paz e serenidade.",
    image: memorialImg,
    cta: "Conhecer o Memorial",
  },
  {
    icon: Sparkles,
    title: "Tanatopraxia",
    description: "Técnica especializada que preserva a aparência natural com dignidade e cuidado, proporcionando uma despedida serena para a família.",
    image: heroImg,
    cta: "Entender Melhor",
  },
];

export default function ServicesSection() {
  return (
    <section id="servicos" className="section-padding bg-muted/30">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">Nossos Serviços</span>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Cuidado completo para sua família
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Oferecemos uma estrutura completa de serviços para atender às necessidades da sua família com excelência.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((s, i) => (
            <ScrollReveal key={s.title} delay={i * 0.1}>
              <div className="glass-card overflow-hidden hover-lift group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground">{s.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{s.description}</p>
                  <a
                    href="#contato"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold hover:text-gold-light transition-colors"
                  >
                    {s.cta}
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
