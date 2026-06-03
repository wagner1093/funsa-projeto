'use client';
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ScrollReveal from "@/components/ScrollReveal";
import Link from 'next/link';
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Clock, Users, Heart, Truck, FileText, Flower2, ChevronLeft, ChevronRight, Sparkles, CheckCircle, Phone, ArrowRight, ChevronDown } from "lucide-react";

const bannerSlides = [
  { img: "/assets/funeraria-slide-1.webp", alt: "Funerária - Slide 1" },
  { img: "/assets/funeraria-slide-2.webp", alt: "Funerária - Slide 2" },
  { img: "/assets/funeraria-slide-3.webp", alt: "Funerária - Slide 3" },
];

const servicosFunerarios = [
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
    image: "/assets/atendimento-24h.webp",
    cta: "Solicitar Atendimento Imediato",
    ctaHref: "tel:1437320202",
  },
  {
    icon: Truck,
    title: "Traslados Nacional e Internacional",
    description: "Realizamos o traslado do corpo com total segurança e agilidade, com limite de quilometragem para associados de acordo com o plano contratado.",
    details: [
      "Traslado conforme limite do plano",
      "Veículos preparados e higienizados",
      "Acompanhamento durante todo o percurso",
      "Cobertura nacional e internacional",
    ],
    image: "/assets/traslados.webp",
    cta: "Fale Conosco",
    ctaHref: "/contato",
  },
  {
    icon: Sparkles,
    title: "Tanatopraxia",
    description: "Técnica de preparação e conservação do corpo executada por profissionais qualificados, garantindo uma aparência serena para um último adeus digno e tranquilo aos familiares.",
    details: [
      "Preparação profissional and sanitária",
      "Proporciona uma despedida mais tranquila",
      "Exigência legal para traslados aéreos",
      "Garantia de segurança para homenagens longas"
    ],
    image: "/assets/tanatopraxia.webp",
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
    image: "/assets/cerimonias.webp",
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
    image: "/assets/ornamentacao.webp",
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
    image: "/assets/documentacao.webp",
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
    image: "/assets/cremacao.webp",
    cta: "Fale Conosco",
    ctaHref: "/contato",
  },
];

export default function Funeraria() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40, skipSnaps: false },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeService, setActiveService] = useState<number | null>(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
    emblaApi.plugins().autoplay?.reset();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
    emblaApi.plugins().autoplay?.reset();
  }, [emblaApi]);

  const handleDotClick = useCallback((index: number) => {
    if (!emblaApi) return;
    emblaApi.scrollTo(index);
    emblaApi.plugins().autoplay?.reset();
  }, [emblaApi]);

  return (
    <>
      {/* ── Cabeçalho da página (PageHero) ──────────────────────────────── */}
      <section className="bg-primary py-16 px-4">
        <div className="section-container">
          <nav className="text-primary-foreground/50 text-sm mb-4">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span className="text-primary-foreground">Funerária</span>
          </nav>
          <h1 className="text-3xl md:text-4xl font-bold text-primary-foreground">Funerária</h1>
          <p className="mt-3 text-primary-foreground/75 text-base max-w-xl">
            Atendimento humanizado, 24 horas por dia, com respeito, dignidade e suporte completo à sua família.
          </p>
        </div>
      </section>

      {/* ── Slide de imagens ─────────────────────────────────────────────── */}
      {/* Altura fixa de 80vh; imagem preenche todo o espaço sem barras laterais */}
      <section className="relative overflow-hidden" style={{ height: '80vh' }}>

        {/* Embla: o ref precisa estar no viewport com height:100% */}
        <div ref={emblaRef} className="h-full" style={{ overflow: 'hidden' }}>
          <div className="flex h-full">
            {bannerSlides.map((slide, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full h-full">
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Seta esquerda */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 border border-white/30 text-white hidden sm:flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow group"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        {/* Seta direita */}
        <button
          onClick={scrollNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/25 hover:bg-black/50 border border-white/30 text-white hidden sm:flex items-center justify-center transition-all duration-200 backdrop-blur-sm shadow group"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-white w-7"
                  : "bg-white/50 hover:bg-white/80 w-2"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Texto institucional ──────────────────────────────────────────── */}
      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          <ScrollReveal>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              A Funerária Nossa Senhora Aparecida é referência em serviços funerários, oferecendo um atendimento humanizado e de qualidade em todos os momentos mais delicados.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Com estrutura completa e especializada, a FUNSA está preparada para atender com excelência, garantindo conforto, dignidade e organização em cada detalhe do serviço prestado.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Contamos com equipe de plantão 24 horas, assegurando agilidade em todas as questões burocráticas, além de tranquilidade, segurança e suporte contínuo aos familiares e amigos.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nossa equipe de agentes funerários é formada por profissionais treinados e tecnicamente qualificados, preparados para atuar com sensibilidade, ética e profissionalismo, sempre respeitando a história e a memória de cada vida.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Listagem de Serviços (Interativa / Compacta) */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold text-azure uppercase tracking-widest">Nossos Serviços</span>
              <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Serviços Funerários Completos
              </h2>
              <p className="mt-4 text-muted-foreground">
                Estrutura completa e humanizada para dar todo o suporte necessário à sua família nos momentos mais difíceis.
              </p>
            </div>
          </ScrollReveal>

          {/* Layout Desktop: Abas Lado a Lado (Escondido no Mobile) */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-start">
            {/* Abas - Esquerda no Desktop */}
            <div className="lg:col-span-4 flex lg:flex-col gap-3 w-full">
              {servicosFunerarios.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActiveService(i)}
                  className={`flex items-center gap-4 px-5 py-4 rounded-2xl border text-left transition-all duration-300 w-full ${
                    i === activeService
                      ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/15 scale-[1.02]"
                      : "bg-card hover:bg-muted/50 border-border/50 text-foreground"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                    i === activeService ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                  }`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block font-bold text-sm leading-snug md:text-base">{s.title}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Painel de Conteúdo - Direita */}
            <div className="lg:col-span-8 bg-card border border-border/50 rounded-3xl p-6 md:p-8 min-h-[420px] shadow-sm relative overflow-hidden flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeService ?? 0}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="grid md:grid-cols-2 gap-8 items-center h-full"
                >
                  {/* Imagem do Serviço */}
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] w-full shadow-md group">
                    <img
                      src={servicosFunerarios[activeService ?? 0].image}
                      alt={servicosFunerarios[activeService ?? 0].title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Informações detalhadas */}
                  <div className="flex flex-col justify-between h-full">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center lg:hidden">
                          {(() => {
                            const IconComponent = servicosFunerarios[activeService ?? 0].icon;
                            return <IconComponent className="w-5 h-5 text-primary" />;
                          })()}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                          {servicosFunerarios[activeService ?? 0].title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-6">
                        {servicosFunerarios[activeService ?? 0].description}
                      </p>
                      
                      <div className="grid sm:grid-cols-2 gap-3 mb-6">
                        {servicosFunerarios[activeService ?? 0].details.map((d) => (
                          <div key={d} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-azure flex-shrink-0 mt-0.5" />
                            <span className="text-xs md:text-sm text-muted-foreground leading-snug">{d}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex flex-col sm:flex-row gap-3 items-center justify-between">
                      <span className="text-xs text-muted-foreground hidden md:inline-block">
                        Disponibilidade imediata 24h
                      </span>
                      {servicosFunerarios[activeService ?? 0].ctaHref.startsWith("/") ? (
                        <Link
                          href={servicosFunerarios[activeService ?? 0].ctaHref}
                          className="btn-primary-light text-xs md:text-sm w-full sm:w-auto text-center"
                        >
                          {servicosFunerarios[activeService ?? 0].cta} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <a
                          href={servicosFunerarios[activeService ?? 0].ctaHref}
                          className="btn-primary-light text-xs md:text-sm w-full sm:w-auto text-center"
                        >
                          {servicosFunerarios[activeService ?? 0].cta} <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Layout Mobile: Accordion (Visível apenas em celulares e tablets) */}
          <div className="lg:hidden space-y-4">
            {servicosFunerarios.map((s, i) => {
              const isOpen = activeService === i;
              return (
                <div
                  key={s.title}
                  className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm transition-all duration-300"
                >
                  {/* Cabeçalho do Accordion */}
                  <button
                    onClick={() => setActiveService(isOpen ? null : i)}
                    className={`w-full flex items-center justify-between p-5 text-left transition-all duration-300 ${
                      isOpen ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                        isOpen ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                      }`}>
                        <s.icon className="w-5 h-5" />
                      </div>
                      <span className="font-bold text-sm leading-snug sm:text-base">{s.title}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Conteúdo Expansível */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 border-t border-border/50 space-y-5 bg-card">
                          {/* Imagem do Serviço */}
                          <div className="relative overflow-hidden rounded-xl aspect-[16/9] w-full shadow-sm">
                            <img
                              src={s.image}
                              alt={s.title}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Descrição */}
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {s.description}
                          </p>

                          {/* Benefícios */}
                          <div className="grid gap-2.5">
                            {s.details.map((d) => (
                              <div key={d} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-azure flex-shrink-0 mt-0.5" />
                                <span className="text-xs text-muted-foreground leading-snug">{d}</span>
                              </div>
                            ))}
                          </div>

                          {/* CTA */}
                          <div className="pt-4 border-t border-border/50">
                            {s.ctaHref.startsWith("/") ? (
                              <Link
                                href={s.ctaHref}
                                className="btn-primary-light text-sm w-full text-center py-3"
                              >
                                {s.cta} <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            ) : (
                              <a
                                href={s.ctaHref}
                                className="btn-primary-light text-sm w-full text-center py-3"
                              >
                                {s.cta} <Phone className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
