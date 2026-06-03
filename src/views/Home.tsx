'use client';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, Clock, Stethoscope, Gift, Shield, Users, Award, Star, Heart, Truck, FileText, Flower2, Sparkles, Smartphone, ChevronLeft, ChevronRight, CheckCircle, Phone } from "lucide-react";
import Link from 'next/link';
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
const heroImg = "/assets/hero-clean.jpg";
const clinicImg = "/assets/clinic-clean.jpg";
const memorialImg = "/assets/memorial-clean.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import MemorialSection from "@/components/MemorialSection";
import GallerySection from "@/components/GallerySection";

const heroSlides = [
  {
    img: "/assets/hero-home-clean.webp",
    alt: "FUNSA – Ambiente sereno e acolhedor",
    tag: "Funsa · Desde 1943",
    title: "Cuidar é estar presente, com respeito e amor.",
    desc: "Há mais de 80 anos cuidando de quem você ama com dignidade, respeito e profissionalismo. Atendimento humanizado 24 horas.",
    btn1Text: "Fale Conosco",
    btn1Link: "/contato",
    btn2Text: "Conheça Nossos Planos",
    btn2Link: "/plano",
  },
  {
    img: "/assets/home-prevsaude-copia.webp",
    alt: "PrevSaúde FUNSA",
    tag: "PrevSaúde · Cuidados Médicos",
    title: "Sua saúde e tranquilidade em primeiro lugar.",
    desc: "Convênio médico com consultas e exames em diversas especialidades, garantindo proteção e bem-estar para toda a sua família.",
    btn1Text: "Ver Especialidades",
    btn1Link: "/prevsaude",
    btn2Text: "Fale Conosco",
    btn2Link: "/contato",
  },
  {
    img: "/assets/foto-quem-somos-copia.webp",
    alt: "Memorial Pôr do Sol",
    tag: "Memorial Pôr do Sol",
    title: "Um espaço de paz, homenagem e memória.",
    desc: "Infraestrutura acolhedora e serviços humanizados para prestar as mais belas e dignas homenagens, eternizando momentos especiais.",
    btn1Text: "Conhecer o Memorial",
    btn1Link: "/quem-somos",
    btn2Text: "Fale Conosco",
    btn2Link: "/contato",
  },
];

const highlights = [
  { icon: Stethoscope, title: "PrevSaúde", desc: "Convênio médico com diversas especialidades para sua família.", link: "/prevsaude" },
  { icon: Shield, title: "Plano Familiar", desc: "Proteção completa e tranquilidade para toda a família.", link: "/plano" },
  { icon: Gift, title: "Clube + Funsa", desc: "Clube de vantagens com descontos exclusivos para associados.", link: "/clube" },
  { icon: Clock, title: "Atendimento 24h", desc: "Plantão permanente para atendimento imediato com dignidade.", link: "/servicos" },
];

const stats = [
  { value: 80, suffix: "+", label: "Anos de Tradição" },
  { value: 50, suffix: "mil+", label: "Famílias Atendidas" },
  { value: 24, suffix: "h", label: "Atendimento Ininterrupto" },
  { value: 100, suffix: "%", label: "Compromisso" },
];

const testimonials = [
  {
    name: "Maria S.",
    text: "A FUNSA nos acolheu no momento mais difícil com uma humanidade incrível. Equipe extremamente profissional e carinhosa.",
    rating: 5,
  },
  {
    name: "Carlos R.",
    text: "O plano de assistência familiar nos trouxe tranquilidade. O atendimento é sempre atencioso e respeitoso.",
    rating: 5,
  },
  {
    name: "Ana P.",
    text: "Tradição e confiança que fazem toda a diferença. Recomendo a FUNSA para todas as famílias de Avaré.",
    rating: 5,
  },
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
    ctaHref: "https://api.whatsapp.com/send/?phone=5514996073226",
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
    ctaHref: "https://api.whatsapp.com/send/?phone=5514996073226",
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
    image: "/assets/tanatopraxia.webp",
    cta: "Saiba Mais",
    ctaHref: "https://api.whatsapp.com/send/?phone=5514996073226",
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
    ctaHref: "https://api.whatsapp.com/send/?phone=5514996073226",
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
    ctaHref: "https://api.whatsapp.com/send/?phone=5514996073226",
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
    ctaHref: "https://api.whatsapp.com/send/?phone=5514996073226",
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
    ctaHref: "https://api.whatsapp.com/send/?phone=5514996073226",
  },
];

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 40,
    skipSnaps: false
  }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
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
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* ── LAYER 1: Imagens deslizando (Embla) ─────────────────────── */}
        <div className="absolute inset-0 z-0" ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div className="flex h-full">
            {heroSlides.map((slide, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full relative h-full">
                <img
                  src={slide.img}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── LAYER 2: Overlay duplo — cobertura total garantida ──────── */}
        {/* Base escura uniforme cobrindo 100% da imagem */}
        <div className="absolute inset-0 z-10 bg-primary/55 pointer-events-none" />
        {/* Gradiente direcional por cima para foco no texto */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent pointer-events-none" />

        {/* ── LAYER 3: Conteúdo animado independente (AnimatePresence) ─ */}
        <div className="relative z-20 section-container w-full py-32 md:py-0 px-12 sm:px-20 lg:px-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 shadow-[0_4px_24px_-4px_rgba(255,255,255,0.08)] mb-8">
                <span className="w-2 h-2 rounded-full bg-azure animate-pulse" />
                <span className="text-sm font-medium text-primary-foreground/90">
                  {heroSlides[activeIndex].tag}
                </span>
              </div>

              {/* Título */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6">
                {heroSlides[activeIndex].title}
              </h1>

              {/* Descrição */}
              <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-xl">
                {heroSlides[activeIndex].desc}
              </p>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={heroSlides[activeIndex].btn1Link} className="btn-primary-dark text-base">
                  {heroSlides[activeIndex].btn1Text}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={heroSlides[activeIndex].btn2Link} className="btn-outline-dark text-base">
                  {heroSlides[activeIndex].btn2Text}
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── LAYER 4: Controles de navegação ──────────────────────────── */}

        {/* Seta esquerda */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 text-white sm:flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 group hidden"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        {/* Seta direita */}
        <button
          onClick={scrollNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 text-white sm:flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 group hidden"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60 w-2.5"
              }`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
          <span className="flex flex-col items-center gap-1 text-primary-foreground/50">
            <span className="text-xs font-medium tracking-wider uppercase">Saiba mais</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </span>
        </div>

      </section>

      {/* Highlights Cards */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-azure uppercase tracking-widest">O que oferecemos</span>
              <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Cuidado completo para sua família
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <ScrollReveal key={h.title} delay={i * 0.1}>
                <Link href={h.link} className="block p-8 rounded-2xl bg-card border border-border/50 hover-lift group text-center h-full">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20 shadow-[0_8px_32px_-4px_hsl(var(--navy)/0.15)] flex items-center justify-center mx-auto mb-5 group-hover:scale-110 group-hover:shadow-[0_12px_40px_-4px_hsl(var(--azure)/0.25)] transition-all duration-300">
                    <h.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{h.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-azure">
                    Saiba Mais <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Highlight: Coroa de Flores */}
          <ScrollReveal delay={0.4}>
            <div className="mt-16 gradient-navy rounded-3xl p-8 md:p-12 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--azure)/0.15),transparent_60%)]" />
              <div className="relative z-10">
                <Flower2 className="w-12 h-12 text-azure mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Quer homenagear? Envie sua coroa de flores
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                  Expresse seu carinho e respeito através de arranjos florais cuidadosamente preparados.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="/catalogo-flores-atualizado.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary-dark py-2 px-6 text-sm">
                    Ver Catálogo
                  </a>
                  <a
                    href="https://wa.me/5514997792932"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-dark"
                  >
                    <Smartphone className="w-4 h-4 mr-2" />
                    Solicitar via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MemorialSection />


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

      {/* Stats */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="" className="w-full h-full object-cover blur-sm scale-105" />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="section-container relative z-10">
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

      {/* Testimonials */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-azure uppercase tracking-widest">Depoimentos</span>
              <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                O que dizem sobre nós
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.1}>
                <div className="p-8 rounded-2xl bg-card border border-border/50 h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-azure text-azure" />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed flex-1 italic">"{t.text}"</p>
                  <p className="mt-6 font-semibold text-foreground">{t.name}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria de Fotos */}
      <GallerySection />

      {/* Final CTA */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="gradient-navy rounded-3xl p-10 md:p-16 text-center">
              <h2 className="text-2xl md:text-3xl font-semibold text-primary-foreground mb-4">
                Precisa de atendimento imediato?
              </h2>
              <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
                Nossa equipe está disponível 24 horas por dia, pronta para oferecer todo o suporte que sua família precisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contato"
                  className="btn-primary-dark"
                >
                  Fale Conosco <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/5514997792932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-dark"
                >
                  WhatsApp 24h
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}


