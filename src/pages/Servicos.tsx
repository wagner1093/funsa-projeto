import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Clock, ArrowRight, Phone, CheckCircle, Heart, FileText, Truck, Flower2, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-bg.jpg";

const services = [
  {
    icon: Clock,
    title: "Atendimento Funerário 24h",
    description: "Plantão permanente para atendimento imediato com dignidade e respeito. Nossa equipe está pronta para oferecer todo o suporte necessário a qualquer momento do dia ou da noite.",
    details: [
      "Atendimento imediato em qualquer horário",
      "Equipe especializada e treinada",
      "Suporte completo em todas as etapas",
      "Documentação e providências legais",
    ],
    image: heroImg,
    cta: "Solicitar Atendimento Imediato",
    ctaHref: "tel:1437320202",
  },
  {
    icon: Truck,
    title: "Traslado Nacional e Internacional",
    description: "Realizamos o traslado do corpo com total segurança e agilidade, sem limite de quilometragem para associados, garantindo que a família tenha tranquilidade nesse momento.",
    details: [
      "Traslado sem limite de quilometragem",
      "Veículos preparados e higienizados",
      "Acompanhamento durante todo o percurso",
      "Cobertura nacional e internacional",
    ],
    image: heroImg,
    cta: "Fale Conosco",
    ctaHref: "/contato",
  },
  {
    icon: Heart,
    title: "Velório e Cerimônia",
    description: "Organizamos velórios e cerimônias de despedida em ambientes acolhedores e preparados, respeitando os desejos da família e honrando a memória de quem partiu.",
    details: [
      "Salas de velório climatizadas e confortáveis",
      "Organização completa da cerimônia",
      "Apoio à família durante todo o evento",
      "Opções personalizadas de homenagem",
    ],
    image: heroImg,
    cta: "Saiba Mais",
    ctaHref: "/contato",
  },
  {
    icon: Flower2,
    title: "Ornamentação e Floricultura",
    description: "Oferecemos serviços de floricultura e ornamentação para que a despedida seja marcada por beleza e carinho, com arranjos personalizados conforme a preferência da família.",
    details: [
      "Coroas e arranjos florais sob encomenda",
      "Ornamentação completa do velório",
      "Flores naturais e artificiais",
      "Personalização conforme desejo da família",
    ],
    image: heroImg,
    cta: "Fale Conosco",
    ctaHref: "/contato",
  },
  {
    icon: FileText,
    title: "Documentação e Legalização",
    description: "Cuidamos de toda a burocracia e documentação necessária, desde o atestado de óbito até o registro em cartório, para que a família não precise se preocupar com trâmites legais.",
    details: [
      "Emissão e registro de certidão de óbito",
      "Providências em cartórios e órgãos públicos",
      "Orientação sobre inventário e pensão",
      "Acompanhamento jurídico especializado",
    ],
    image: heroImg,
    cta: "Saiba Mais",
    ctaHref: "/contato",
  },
  {
    icon: Shield,
    title: "Cremação",
    description: "Oferecemos o serviço de cremação com todo o respeito e cuidado, orientando a família em cada etapa do processo e garantindo dignidade na despedida.",
    details: [
      "Orientação completa sobre o processo",
      "Documentação e autorizações necessárias",
      "Urnas cinerárias diversas",
      "Cerimônia de despedida personalizada",
    ],
    image: heroImg,
    cta: "Fale Conosco",
    ctaHref: "/contato",
  },
];

export default function Servicos() {
  return (
    <>
      <PageHero
        title="Nossos Serviços"
        subtitle="Oferecemos uma estrutura completa de serviços funerários para atender às necessidades da sua família com excelência e humanidade."
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
                    <img src={s.image} alt={s.title} className="w-full aspect-[4/3] object-cover" />
                  </div>
                </div>

                <div className={i % 2 !== 0 ? "lg:order-1" : ""}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <s.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold text-foreground md:text-3xl">{s.title}</h2>
                  </div>
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
                      className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm rounded-full gradient-gold text-primary font-semibold hover-lift"
                    >
                      {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={s.ctaHref}
                      className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-sm rounded-full gradient-gold text-primary font-semibold hover-lift"
                    >
                      {s.cta} <Phone className="w-3.5 h-3.5" />
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
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Precisa de atendimento imediato?
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
              Nossa equipe está disponível 24 horas por dia. Ligue agora e receba o suporte que sua família precisa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1437320202"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
              >
                <Phone className="w-4 h-4" /> (14) 3732-0202
              </a>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Fale Conosco <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
