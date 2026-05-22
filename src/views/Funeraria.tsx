'use client';
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ScrollReveal from "@/components/ScrollReveal";
import Link from 'next/link';
import { Shield, Clock, Users, Heart, Truck, FileText, Flower2, ChevronLeft, ChevronRight } from "lucide-react";

const bannerSlides = [
  { img: "/assets/funeraria-slide-1.webp", alt: "Funerária - Slide 1" },
  { img: "/assets/funeraria-slide-2.webp", alt: "Funerária - Slide 2" },
  { img: "/assets/funeraria-slide-3.webp", alt: "Funerária - Slide 3" },
];

const servicosFunerarios = [
  {
    icon: Clock,
    title: "Atendimento Funerário 24h",
    desc: "Plantão permanente com equipe especializada para atendimento imediato a qualquer hora do dia ou da noite.",
  },
  {
    icon: Truck,
    title: "Traslados Nacional e Internacional",
    desc: "Transporte do corpo com segurança e agilidade, com limite de quilometragem para associados de acordo com o plano contratado.",
  },
  {
    icon: Heart,
    title: "Tanatopraxia",
    desc: "Técnica de preparação e conservação do corpo executada por profissionais qualificados, garantindo uma despedida mais serena.",
  },
  {
    icon: Users,
    title: "Cerimônias de Despedidas",
    desc: "Homenagens focadas no respeito à memória de quem partiu, prestando todo o apoio aos familiares e amigos no momento da despedida.",
  },
  {
    icon: Flower2,
    title: "Ornamentação e Floricultura",
    desc: "Arranjos florais e ornamentação personalizada para homenagear e marcar a cerimônia com beleza e carinho.",
  },
  {
    icon: FileText,
    title: "Documentação e Legalização",
    desc: "Cuidamos de toda a burocracia: atestado de óbito, registro em cartório e providências legais.",
  },
  {
    icon: Shield,
    title: "Cremação",
    desc: "Orientação completa sobre o processo de cremação, documentação e cerimônia de despedida.",
  },
];

export default function Funeraria() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40, skipSnaps: false },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );
  const [activeIndex, setActiveIndex] = useState(0);

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
      {/* Altura fixa de 60vh; imagem preenche todo o espaço sem barras laterais */}
      <section className="relative overflow-hidden" style={{ height: '60vh' }}>

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

      {/* ── Listagem de Serviços ─────────────────────────────────────────── */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-semibold text-azure uppercase tracking-widest">Nossos Serviços</span>
              <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                Serviços Funerários Completos
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicosFunerarios.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.05}>
                <Link href="/servicos" className="block p-6 rounded-2xl bg-card border border-border/50 h-full hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <s.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
