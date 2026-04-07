import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { Shield, Clock, Users, Heart, Truck, FileText, Flower2, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero-bg.jpg";
import clinicImg from "@/assets/clinic.jpg";
import memorialImg from "@/assets/memorial.jpg";

const bannerSlides = [
  { img: heroImg, alt: "Funerária FUNSA – Estrutura completa" },
  { img: clinicImg, alt: "Funerária FUNSA – Atendimento humanizado" },
  { img: memorialImg, alt: "Funerária FUNSA – Tradição e respeito" },
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000, stopOnInteraction: false })]);
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
      <PageHero
        title="Funerária FUNSA"
        subtitle="Há mais de 80 anos acolhendo famílias com respeito, empatia e compromisso."
        breadcrumbs={[{ label: "Funerária", href: "/funeraria" }]}
      />

      {/* Banner Rotativo */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0" ref={emblaRef}>
          <div className="flex h-full">
            {bannerSlides.map((slide, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full relative h-full">
                <img src={slide.img} alt={slide.alt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-primary/40" />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {bannerSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === activeIndex ? "bg-azure w-8" : "bg-white/40 hover:bg-white/60"}`}
              aria-label={`Ir para slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Texto institucional */}
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

      {/* Listagem de Serviços */}
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
    </>
  );
}
