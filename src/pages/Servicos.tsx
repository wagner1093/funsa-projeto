import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Clock, ArrowRight, Phone, CheckCircle, Heart, FileText, Truck, Flower2, Users, Shield, Sparkles } from "lucide-react";
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
    title: "Traslados Nacional e Internacional",
    description: "Realizamos o traslado do corpo com total segurança e agilidade, COM LIMITE DE QUILOMETRAGEM PARA ASSOCIADOS DE ACORDO COM PLANO CONTRATADO.",
    details: [
      "Traslado conforme limite do plano",
      "Veículos preparados e higienizados",
      "Acompanhamento durante todo o percurso",
      "Cobertura nacional e internacional",
    ],
    image: heroImg,
    cta: "Fale Conosco",
    ctaHref: "/contato",
  },
  {
    icon: Sparkles,
    title: "Tanatopraxia",
    description: "Técnica de preparação e conservação do corpo executada por profissionais qualificados, garantindo uma aparência serena para um último adeus digno e tranquilo aos familiares.",
    details: [
      "Preparação profissional e sanitária",
      "Proporciona uma despedida mais tranquila",
      "Exigência legal para traslados aéreos",
      "Garantia de segurança para homenagens longas"
    ],
    image: heroImg,
    cta: "Saiba Mais",
    ctaHref: "/contato",
  },
  {
    icon: Users,
    title: "Cerimônias de Despedidas",
    description: "Organizamos homenagens e cerimônias focadas no respeito à memória de quem partiu, prestando todo o apoio aos familiares e amigos no momento da despedida, alinhado às suas crenças.",
    details: [
      "Apoio completo à família durante o evento",
      "Organização e coordenação da cerimônia",
      "Respeito às crenças e desejos da família",
      "Opções personalizadas de homenagem",
    ],
    image: heroImg,
    cta: "Saiba Mais",
    ctaHref: "/contato",
  },
  {
    icon: Flower2,
    title: "Ornamentação e Floricultura",
    description: "Oferecemos serviços de floricultura e ornamentação para que a cerimônia de despedida seja marcada por beleza e carinho, com arranjos personalizados conforme a preferência da família.",
    details: [
      "Coroas e arranjos de flores selecionadas",
      "Ornamentação caprichosa e elegante",
      "Flores naturais com durabilidade",
      "Personalização conforme o desejo da família",
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
      "Orientação completa e dedicada",
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
                        <CheckCircle className="w-5 h-5 text-azure flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{d}</span>
                      </div>
                    ))}
                  </div>
                  {s.ctaHref.startsWith("/") ? (
                    <Link
                      to={s.ctaHref}
                      className="mt-8 btn-primary-light text-sm"
                    >
                      {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <a
                      href={s.ctaHref}
                      className="mt-8 btn-primary-light text-sm"
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
                className="btn-primary-dark"
              >
                <Phone className="w-4 h-4" /> (14) 3732-0202
              </a>
              <Link
                to="/contato"
                className="btn-outline-dark"
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
