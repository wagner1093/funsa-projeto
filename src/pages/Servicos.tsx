import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Clock, Stethoscope, Trees, Sparkles, ArrowRight, Phone, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-bg.jpg";
import clinicImg from "@/assets/clinic.jpg";
import memorialImg from "@/assets/memorial.jpg";

const services = [
  {
    icon: Clock,
    title: "Atendimento Funerário 24h",
    description: "Plantão permanente para atendimento imediato com dignidade e respeito. Nossa equipe está pronta para oferecer todo o suporte necessário a qualquer momento.",
    details: [
      "Atendimento imediato em qualquer horário",
      "Equipe especializada e treinada",
      "Traslado sem limite de quilometragem",
      "Suporte completo em todas as etapas",
      "Documentação e providências legais",
      "Floricultura e ornamentação",
    ],
    image: heroImg,
    cta: "Solicitar Atendimento Imediato",
    ctaHref: "tel:1437320202",
  },
  {
    icon: Stethoscope,
    title: "Assistência Médica – PREV SAÚDE",
    description: "Convênio PREV SAÚDE com diversas especialidades disponíveis. Agendamento facilitado e atendimento de qualidade para toda a família.",
    details: [
      "Consultas médicas em diversas especialidades",
      "Atendimento odontológico completo",
      "Exames laboratoriais e de imagem",
      "Descontos em farmácias parceiras",
      "Agendamento online e presencial",
      "Rede credenciada ampla",
    ],
    image: clinicImg,
    cta: "Conhecer o PREV SAÚDE",
    ctaHref: "/contato",
  },
  {
    icon: Trees,
    title: "Cemitério Memorial Pôr do Sol",
    description: "Espaço moderno, seguro e acolhedor para homenagear seus entes queridos. Infraestrutura completa em meio a um ambiente de paz e serenidade.",
    details: [
      "Infraestrutura moderna e bem cuidada",
      "Segurança e monitoramento 24h",
      "Jardins bem cuidados e ambientes de paz",
      "Diferentes tipos de jazigos",
      "Manutenção permanente inclusa",
      "Localização privilegiada em Avaré",
    ],
    image: memorialImg,
    cta: "Visitar o Memorial",
    ctaHref: "/contato",
  },
  {
    icon: Sparkles,
    title: "Tanatopraxia",
    description: "Técnica especializada que preserva a aparência natural com dignidade e cuidado, proporcionando uma despedida serena para a família.",
    details: [
      "Preservação da aparência natural",
      "Equipe altamente qualificada",
      "Técnicas modernas e respeitosas",
      "Dignidade e cuidado em cada detalhe",
      "Preparo estético personalizado",
      "Ambiente controlado e seguro",
    ],
    image: heroImg,
    cta: "Saiba Mais",
    ctaHref: "/contato",
  },
];

export default function Servicos() {
  return (
    <>
      <PageHero
        title="Nossos Serviços"
        subtitle="Oferecemos uma estrutura completa de serviços para atender às necessidades da sua família com excelência e humanidade."
        breadcrumbs={[{ label: "Nossos Serviços", href: "/servicos" }]}
      />

      {/* Services Detail */}
      <section className="section-padding bg-background">
        <div className="section-container space-y-24">
          {services.map((s, i) => (
            <ScrollReveal key={s.title}>
              <div className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 !== 0 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 !== 0 ? "lg:order-2" : ""}>
                  <div className="relative overflow-hidden rounded-2xl">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-xl gradient-gold flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </div>

                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">{s.title}</h2>
                  <p className="mt-4 text-muted-foreground leading-relaxed text-lg">{s.description}</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {s.details.map((d) => (
                      <div key={d} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{d}</span>
                      </div>
                    ))}
                  </div>
                  {s.ctaHref.startsWith("/") ? (
                    <Link
                      to={s.ctaHref}
                      className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
                    >
                      {s.cta} <ArrowRight className="w-4 h-4" />
                    </Link>
                  ) : (
                    <a
                      href={s.ctaHref}
                      className="mt-8 inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
                    >
                      {s.cta} <Phone className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding gradient-navy">
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Precisa de mais informações?
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
              Entre em contato conosco e nossa equipe terá prazer em ajudá-lo.
            </p>
            <Link
              to="/contato"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
            >
              Fale Conosco <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
