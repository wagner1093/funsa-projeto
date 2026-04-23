import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Clock, Stethoscope, Gift, Shield, Users, Award, Star, Heart, Truck, FileText, Flower2, Sparkles, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import heroImg from "@/assets/hero-bg.jpg";
import clinicImg from "@/assets/clinic.jpg";
import memorialImg from "@/assets/memorial.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import MemorialSection from "@/components/MemorialSection";

const heroSlides = [
  { img: heroImg, alt: "FUNSA – Ambiente sereno e acolhedor" },
  { img: clinicImg, alt: "FUNSA – Clínica e atendimento humanizado" },
  { img: memorialImg, alt: "FUNSA – Memorial Pôr do Sol" },
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
    desc: "Plantão permanente com equipe especializada para atendimento imediato a qualquer hora do dia ou da noite.",
  },
  {
    icon: Truck,
    title: "Traslados Nacional e Internacional",
    desc: "Transporte do corpo com segurança e agilidade, COM LIMITE DE QUILOMETRAGEM PARA ASSOCIADOS DE ACORDO COM PLANO CONTRATADO.",
  },
  {
    icon: Sparkles,
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

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
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

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Carousel background */}
        <div className="absolute inset-0" ref={emblaRef}>
          <div className="flex h-full">
            {heroSlides.map((slide, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full relative h-screen">
                <img src={slide.img} alt={slide.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
              </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-azure w-8" : "bg-white/40 hover:bg-white/60"}`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 section-container w-full py-32 md:py-0">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 shadow-[0_4px_24px_-4px_rgba(255,255,255,0.08)] mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-azure animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/90">Funsa · Desde 1943</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6"
            >
              Cuidar é estar presente, com respeito e amor.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-lg md:text-xl text-primary-foreground/80 mb-10 leading-relaxed max-w-xl"
            >
              Há mais de 80 anos cuidando de quem você ama com dignidade,
              respeito e profissionalismo. Atendimento humanizado 24 horas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/contato"
                className="btn-primary-dark text-base"
              >
                Fale Conosco
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/plano"
                className="btn-outline-dark text-base"
              >
                Conheça Nossos Planos
              </Link>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <span className="flex flex-col items-center gap-1 text-primary-foreground/60">
            <span className="text-xs font-medium">Saiba mais</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </span>
        </motion.div>
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
                <Link to={h.link} className="block p-8 rounded-2xl bg-card border border-border/50 hover-lift group text-center h-full">
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
                  <a href="/catalogo-flores.pdf" target="_blank" rel="noopener noreferrer" className="btn-primary-dark py-2 px-6 text-sm">
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


      {/* Listagem de Serviços (Geral) */}
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
                <Link to="/servicos" className="block p-6 rounded-2xl bg-card border border-border/50 h-full hover:shadow-md transition-all hover:-translate-y-1">
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
                  to="/contato"
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
