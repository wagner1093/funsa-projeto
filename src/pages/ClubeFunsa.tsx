'use client';
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronDown, Smartphone, BadgePercent, ShoppingBag, Utensils,
  GraduationCap, Dumbbell, Heart, Car, Eye, Scissors, Gift,
  Store, Building2, Flower2, ArrowRight, Star, Users, Percent,
  Wrench, BookOpen, Hotel, Search, Phone, ChevronLeft, ChevronRight } from
"lucide-react";

const heroImg1 = "/assets/clube-hero-1-clean.png";
const heroImg2 = "/assets/clube-slide-2.jpg";
const heroImg3 = "/assets/clube-slide-3.jpg";
const appMockup = "/assets/app-beneficios.png";

/* ── hero slides ── */
const heroSlides = [
  { img: heroImg1, title: "Clube + FUNSA", sub: "Descontos exclusivos in mais de 60 parceiros da região", action: { label: "Baixar o App", href: "#app", icon: Smartphone }, pos: "center" },
  { img: heroImg2, title: "Vantagens no App", sub: "Cupons, promoções e benefícios direto no seu celular", action: { label: "Conhecer App", href: "#app", icon: Smartphone }, pos: "center" },
  { img: heroImg3, title: "Seja um parceiro", sub: "Entre em contato conosco e faça parte da maior rede de benefícios da região", action: { label: "Quero ser parceiro", href: "https://wa.me/5514991823569", icon: Phone }, pos: "center 20%" }
];


/* ── benefits ── */
const benefits = [
{ icon: BadgePercent, title: "Descontos exclusivos", desc: "Até 50% de desconto em parceiros selecionados" },
{ icon: Store, title: "+60 parceiros", desc: "Ampla rede de comércios e serviços conveniados" },
{ icon: Smartphone, title: "Tudo pelo App", desc: "Consulte parceiros e acesse cupons pelo aplicativo FUNSA" },
{ icon: Users, title: "Para toda a família", desc: "Benefícios extensivos a todos os beneficiários do plano" },
{ icon: Gift, title: "Promoções especiais", desc: "Ofertas sazonais e sorteios exclusivos para associados" },
{ icon: Star, title: "Sem custo adicional", desc: "Incluso no plano de assistência familiar FUNSA" }];


/* ── stats ── */
const stats = [
{ value: 60, suffix: "+", label: "Parceiros" },
{ value: 11, suffix: "", label: "Categorias" },
{ value: 50, suffix: "%", label: "Desconto máximo" },
{ value: 80, suffix: "+", label: "Anos de tradição" }];


/* ── category icons ── */
const catIcons: Record<string, React.ElementType> = {
  "Alimentação e Lazer": Utensils,
  "Supermercados e Conveniência": ShoppingBag,
  "Construção e Utilidades": Building2,
  "Serviços Diversos": Wrench,
  "Flores, Presentes e Papelaria": Flower2,
  "Óticas": Eye,
  "Educação e Cursos": GraduationCap,
  "Academias, Esporte e Hospedagem": Dumbbell,
  "Beleza e Saúde": Heart,
  "Automotivo e Mobilidade": Car,
  "Moda e Acessórios": Scissors
};

interface Parceiro {
  nome: string;
  beneficio: string;
}

const categorias: Record<string, Parceiro[]> = {
  "Alimentação e Lazer": [
  { nome: "Marguerita Pizzaria", beneficio: "5% de desconto em todas as pizzas, incluindo refrigerantes e sorvetes" },
  { nome: "Diego Lanches e Marmitaria", beneficio: "Entrega grátis nas compras acima de R$ 40,00" },
  { nome: "Emporium Do Chopp", beneficio: "15% de desconto em todos os produtos às quartas-feiras" },
  { nome: "Zacota Restaurante", beneficio: "10% de desconto em todos os pratos" },
  { nome: "Donini Peixes E Porções", beneficio: "10% de desconto no salão e delivery" },
  { nome: "Oriental Mix", beneficio: "10% de desconto no salão" }],

  "Supermercados e Conveniência": [
  { nome: "Supermercado Saladão", beneficio: "Cupom de desconto disponível no App FUNSA" },
  { nome: "Supermercado Camargo", beneficio: "3% de desconto em todos os setores às quintas-feiras" }],

  "Construção e Utilidades": [
  { nome: "L. M. Leão Construtora", beneficio: "5% a 20% de desconto em projetos e construções" },
  { nome: "Flávio Cortinas", beneficio: "20% de desconto em persianas e cortinas" },
  { nome: "Casa Do Churrasqueiro", beneficio: "5% de desconto em todos os produtos" },
  { nome: "Construfic", beneficio: "20% de desconto à vista acima de R$ 1.000 ou 15% a prazo" }],

  "Serviços Diversos": [
  { nome: "Disk Água Aguaré", beneficio: "20% de desconto nas compras à vista" },
  { nome: "Martins Gás", beneficio: "Sorteio bimestral de vale-gás e desconto percentual no pedido" },
  { nome: "J & R Chaveiro", beneficio: "5% de desconto para pagamento à vista" },
  { nome: "Santiago Corretora De Seguros", beneficio: "20% de desconto em seguros diversos" },
  { nome: "Red Comunicação Visual", beneficio: "15% de desconto em pagamentos à vista" }],

  "Flores, Presentes e Papelaria": [
  { nome: "Arts Flores", beneficio: "10% de desconto em compras acima de R$ 30,00" },
  { nome: "MultiFlora Paisagismo", beneficio: "10% de desconto em vasos e plantas" },
  { nome: "Papelaria Criativa", beneficio: "15% de desconto à vista ou 10% no cartão" },
  { nome: "Arty Copy", beneficio: "10% de desconto em compras acima de R$ 30,00" },
  { nome: "Papelac Papelaria", beneficio: "10% de desconto à vista e até 6x no cartão" },
  { nome: "Ferrari Presentes", beneficio: "10% de desconto à vista ou 5% no cartão" }],

  "Óticas": [
  { nome: "Ótica Maria Gianni", beneficio: "25% de desconto em armações e solares" },
  { nome: "Ótica Maitê", beneficio: "30% de desconto em armações e solares" },
  { nome: "Ótica Vitória", beneficio: "30% de desconto em todas as armações" }],

  "Educação e Cursos": [
  { nome: "IAE – Instituto Avareense De Ensino", beneficio: "Isenção na matrícula" },
  { nome: "Microvip", beneficio: "15% de desconto na matrícula e mensalidades" },
  { nome: "UNIFSP Centro Universitário", beneficio: "30% de desconto em cursos de graduação selecionados" },
  { nome: "Unicesumar EAD", beneficio: "30% de desconto no valor dos cursos" },
  { nome: "Mores Centro De Dança", beneficio: "Isenção na matrícula" },
  { nome: "Wizard", beneficio: "50% de desconto na matrícula" },
  { nome: "Fisk Avaré", beneficio: "20% de desconto na matrícula" },
  { nome: "Metropolitana Cursos", beneficio: "Isenção na matrícula e 10% de desconto nas mensalidades" }],

  "Academias, Esporte e Hospedagem": [
  { nome: "Academia Yama Harashi", beneficio: "50% de desconto na matrícula e 15% nas mensalidades" },
  { nome: "Academia Power Trainer", beneficio: "5% de desconto em todas as modalities" },
  { nome: "Infinity Training", beneficio: "20% de desconto nas mensalidades" },
  { nome: "Academia Corpo E Saúde", beneficio: "50% de desconto na matrícula e 10% nas mensalidades" },
  { nome: "PhD Sports", beneficio: "50% de desconto na matrícula e preço especial nas mensalidades" },
  { nome: "AABB Jurumirim", beneficio: "20% de desconto no Day Use e 10% em hospedagem" },
  { nome: "Vila Verde Hotel", beneficio: "10% de desconto nas diárias" }],

  "Beleza e Saúde": [
  { nome: "Barbearia Do Fogaça", beneficio: "20% de desconto em cortes masculinos" },
  { nome: "Rosa Marroquina", beneficio: "12% de desconto em produtos" },
  { nome: "Cirúrgica Avaré", beneficio: "10% de desconto em produtos ortopédicos e 5% em cadeiras" },
  { nome: "Drogalar Avaré", beneficio: "Até 50% de desconto em genéricos às sextas-feiras" },
  { nome: "Vitalis Drogaria", beneficio: "10% de desconto em medicamentos manipulados" },
  { nome: "Curavita Produtos Hospitalares", beneficio: "10% a 40% de desconto em medicamentos" },
  { nome: "Drogaria Bem Popular", beneficio: "10% de desconto em medicamentos com receita" }],

  "Automotivo e Mobilidade": [
  { nome: "Uno Auto Elétrica", beneficio: "10% de desconto para pagamento à vista" },
  { nome: "Igo Mobilidade", beneficio: "Até 15% de desconto em corridas" },
  { nome: "Napoli Pneus", beneficio: "10% de desconto em todos os serviços" },
  { nome: "PL Pneus", beneficio: "10% de desconto na troca de pneus" },
  { nome: "Auto Mecânica Landi", beneficio: "10% de desconto em orçamentos" },
  { nome: "Nova América Parabrisas", beneficio: "5% a 15% de desconto em peças e serviços" }],

  "Moda e Acessórios": [
  { nome: "King Acessórios", beneficio: "15% de desconto em compras na loja" }]

};

const categoryKeys = Object.keys(categorias);

export default function ClubeFunsa() {
  /* carousel */
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    duration: 40,
    skipSnaps: false
  }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const onSelect = useCallback(() => { if (emblaApi) setActiveIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  
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

  const filteredCategories = Object.entries(categorias).filter(([cat, partners]) => {
    // 1. Filter by category click
    if (selectedCategory !== "Todos" && cat !== selectedCategory) {
      return false;
    }
    // 2. Filter by search text
    const searchLower = searchTerm.toLowerCase();
    return cat.toLowerCase().includes(searchLower) || partners.some(p => p.nome.toLowerCase().includes(searchLower));
  });

  return (
    <>
      {/* ── HERO CAROUSEL ── */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        
        {/* ── LAYER 1: Imagens deslizando (Embla) ─────────────────────── */}
        <div className="absolute inset-0 z-0" ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div className="flex h-full">
            {heroSlides.map((slide, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full relative h-full">
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                  style={{ objectPosition: (slide as any).pos || 'center' }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── LAYER 2: Overlay duplo ──────────────────────────────────── */}
        {/* Base escura uniforme */}
        <div className="absolute inset-0 z-10 bg-black/45 pointer-events-none" />
        {/* Gradiente direcional */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/65 via-black/35 to-transparent pointer-events-none" />

        {/* ── LAYER 3: Conteúdo animado (AnimatePresence) ──────────────── */}
        <div className="relative z-20 section-container w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/20 shadow-[0_4px_24px_-4px_rgba(255,255,255,0.08)] mb-8">
                <span className="w-2 h-2 rounded-full bg-azure animate-pulse" />
                <span className="text-sm font-medium text-primary-foreground/90">
                  Clube + FUNSA
                </span>
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {heroSlides[activeIndex].title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
                {heroSlides[activeIndex].sub}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                {heroSlides[activeIndex].action.href.startsWith("http") ? (
                  <a href={heroSlides[activeIndex].action.href} target="_blank" rel="noopener noreferrer"
                    className="btn-primary-dark text-base flex items-center gap-2 shadow-md">
                    {(() => {
                      const Icon = heroSlides[activeIndex].action.icon;
                      return <Icon className="w-5 h-5" />;
                    })()}
                    {heroSlides[activeIndex].action.label}
                  </a>
                ) : (
                  <Link href={heroSlides[activeIndex].action.href}
                    className="btn-primary-dark text-base flex items-center gap-2 shadow-md">
                    {(() => {
                      const Icon = heroSlides[activeIndex].action.icon;
                      return <Icon className="w-5 h-5" />;
                    })()}
                    {heroSlides[activeIndex].action.label}
                  </Link>
                )}
                <a href="#parceiros"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-200 bg-white text-primary border border-white hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] text-base shadow-md hover:shadow-lg">
                  Ver parceiros
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── LAYER 4: Controles de navegação ──────────────────────────── */}
        {/* Seta esquerda */}
        <button
          onClick={scrollPrev}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 text-white hidden sm:flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 group"
          aria-label="Slide anterior"
        >
          <ChevronLeft className="w-6 h-6 transition-transform duration-200 group-hover:-translate-x-0.5" />
        </button>

        {/* Seta direita */}
        <button
          onClick={scrollNext}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/25 text-white hidden sm:flex items-center justify-center transition-all duration-200 backdrop-blur-md shadow-lg hover:scale-105 active:scale-95 group"
          aria-label="Próximo slide"
        >
          <ChevronRight className="w-6 h-6 transition-transform duration-200 group-hover:translate-x-0.5" />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
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

        {/* scroll indicator */}
        <motion.div className="absolute bottom-8 right-8 z-10 hidden md:block" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--azure)/0.05),transparent_60%)]" />
        <div className="section-container relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-azure font-semibold text-sm tracking-wider uppercase">Vantagens</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                Por que fazer parte do Clube?
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Benefícios exclusivos que fazem a diferença no dia a dia dos associados e de toda a família.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) =>
            <ScrollReveal key={b.title} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl bg-card border border-border/50 hover-lift transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-azure/10 flex items-center justify-center mb-5 group-hover:bg-azure/20 transition-colors">
                    <b.icon className="w-7 h-7 text-azure" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--azure)/0.1),transparent_50%)]" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) =>
            <ScrollReveal key={s.label} delay={i * 0.15}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white flex items-baseline justify-center">
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-white/60 mt-2 text-sm font-medium">{s.label}</p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ── APP HIGHLIGHT ── */}
      <section id="app" className="py-24 md:py-32 gradient-navy overflow-hidden relative">
        {/* Decorative glows */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-azure/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-azure/8 blur-[100px]" />

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Content side - LEFT */}
            <ScrollReveal>
              <div>
                <span className="inline-block px-4 py-1.5 rounded-full bg-azure/20 text-azure text-sm font-medium mb-6 backdrop-blur-sm border border-azure/20">
                  Aplicativo FUNSA
                </span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                  Seus benefícios na{" "}
                  <span className="text-gradient-blue">palma da mão.</span>
                </h2>
                <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-lg">
                  Com o aplicativo FUNSA, consulte parceiros do Clube, acesse cupons de desconto, receba promoções exclusivas e gerencie seu plano de forma prática.
                </p>

                <p className="mt-8 text-white/50 text-sm font-semibold tracking-wider uppercase">Baixe agora:</p>
                <div className="flex flex-wrap gap-3 mt-4">
                  <a href="https://apps.apple.com/br/app/funsa/id1545021336" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-primary font-semibold hover-lift transition-all shadow-sm">
                    {/* Apple logo SVG */}
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                    </svg>
                    <div className="text-left">
                      <span className="text-[10px] block leading-none text-muted-foreground">Disponível na</span>
                      <span className="text-sm font-bold">App Store</span>
                    </div>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=br.inf.mssistemas.areacli.funsa&hl=pt_BR" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-white text-primary font-semibold hover-lift transition-all shadow-sm">
                    {/* Google Play logo SVG */}
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 20.5v-17c0-.83 1-.97 1.41-.44l15.16 8.5c.37.21.37.77 0 .98L4.41 20.94C4 21.47 3 21.33 3 20.5zM5 17.13l11.57-6.48-2.11-1.18L5 17.13zm0-10.26v6.74l4.86-2.74L5 6.87zM15.96 12L12.1 14.17l2.1 1.18 3.87-2.17-2.11-1.18z" />
                    </svg>
                    <div className="text-left">
                      <span className="text-[10px] block leading-none text-muted-foreground">Disponível no</span>
                      <span className="text-sm font-bold">Google Play</span>
                    </div>
                  </a>
                </div>

                <div className="mt-12 border-t border-white/10 pt-8">
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { icon: BadgePercent, title: "Cupons exclusivos", desc: "Descontos direto no app" },
                      { icon: Users, title: "Rede de parceiros", desc: "60+ estabelecimentos" },
                      { icon: Smartphone, title: "Carteirinha virtual", desc: "Sempre à mão" },
                      { icon: Gift, title: "Promoções e sorteios", desc: "Ofertas especiais" },
                    ].map((item) =>
                      <div key={item.title} className="flex items-start gap-3">
                        <div className="w-11 h-11 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-azure" />
                        </div>
                        <div>
                          <h4 className="font-bold text-white text-sm">{item.title}</h4>
                          <p className="text-xs text-white/50 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* App image - RIGHT */}
            <ScrollReveal delay={0.2}>
              <div className="flex justify-center lg:justify-end">
                <div className="relative inline-block">
                  <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}>
                    <img
                      src="/assets/app-beneficios.png"
                      alt="Beneficios FUNSA na palma da mão"
                      className="w-[20rem] md:w-[24rem] lg:w-[28rem] rounded-2xl drop-shadow-[0_30px_60px_rgba(0,0,0,0.4)] object-cover" />
                  </motion.div>

                  {/* Floating badge */}
                  <motion.div
                    className="absolute -left-6 lg:-left-12 top-1/4 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl z-10"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>
                    <div className="flex items-center gap-2">
                      <BadgePercent className="w-5 h-5 text-azure" />
                      <span className="text-sm font-bold text-white">Até 50% OFF</span>
                    </div>
                  </motion.div>

                  {/* Floating badge 2 */}
                  <motion.div
                    className="absolute -right-6 lg:-right-12 bottom-1/4 px-4 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl z-10"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}>
                    <div className="flex items-center gap-2">
                      <Store className="w-5 h-5 text-azure" />
                      <span className="text-sm font-bold text-white">60+ Parceiros</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── PARTNERS ── */}
      <section id="parceiros" className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-azure font-semibold text-sm tracking-wider uppercase">Nossa rede</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                Parceiros & Benefícios
              </h2>
              <p className="text-muted-foreground mt-4 mb-10">
                Explore nossas categorias e descubra todos os descontos disponíveis para associados.
              </p>

              {/* SEARCH BAR */}
              <div className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Pesquisar categoria ou parceiro... (ex: Alimentação)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-6 py-4 rounded-full bg-card border border-border focus:ring-2 focus:ring-azure/50 outline-none transition-all shadow-sm pl-12"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              </div>

              {/* CATEGORY FILTERS */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setSelectedCategory("Todos")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                    selectedCategory === "Todos"
                      ? "bg-azure border-azure text-white"
                      : "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                  }`}
                >
                  <Store className="w-4 h-4" />
                  Todos
                </button>
                {categoryKeys.map((cat) => {
                  const Icon = catIcons[cat] || Store;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold border transition-all duration-200 shadow-sm hover:scale-[1.02] active:scale-[0.98] ${
                        selectedCategory === cat
                          ? "bg-azure border-azure text-white"
                          : "bg-card border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </ScrollReveal>

          {/* LISTAGEM DE PARCEIROS */}
          {selectedCategory === "Todos" ? (
            /* Modo Todos: lista plana em ordem alfabética, sem separadores de categoria */
            <div>
              {(() => {
                const searchLower = searchTerm.toLowerCase();
                const allPartners = Object.entries(categorias)
                  .flatMap(([cat, partners]) =>
                    partners
                      .filter(p =>
                        p.nome.toLowerCase().includes(searchLower) ||
                        cat.toLowerCase().includes(searchLower)
                      )
                      .map(p => ({ ...p, cat }))
                  )
                  .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

                if (allPartners.length === 0) return (
                  <div className="py-20 text-center text-muted-foreground">
                    <p className="text-lg">Nenhum parceiro encontrado para "{searchTerm}".</p>
                    <button onClick={() => setSearchTerm("")} className="mt-4 text-azure font-semibold hover:underline">Limpar pesquisa</button>
                  </div>
                );

                return (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {allPartners.map((p) => (
                      <div key={`${p.cat}-${p.nome}`} className="group flex flex-col p-6 rounded-2xl bg-card border border-border/50 hover:border-azure/30 hover:shadow-lg transition-all duration-300 h-full">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-azure/10 transition-colors">
                            <Store className="w-5 h-5 text-primary group-hover:text-azure transition-colors" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{p.nome}</h4>
                            <p className="text-xs text-azure/70 font-medium mt-0.5">{p.cat}</p>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.beneficio}</p>
                          </div>
                        </div>
                        <button className="mt-6 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/5 text-primary font-semibold text-sm hover:bg-primary/10 transition-colors group-hover:bg-azure/10 group-hover:text-azure">
                          <Eye className="w-4 h-4" /> Ver Benefício
                        </button>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          ) : (
            /* Modo Categoria: exibe por categoria com separador */
            <div className="space-y-16">
              {filteredCategories.map(([cat, partners]) => {
                const Icon = catIcons[cat] || Store;
                const displayPartners = partners.filter(p => {
                  const searchLower = searchTerm.toLowerCase();
                  return p.nome.toLowerCase().includes(searchLower) || cat.toLowerCase().includes(searchLower);
                });
                if (displayPartners.length === 0) return null;
                return (
                  <div key={cat} className="scroll-mt-24">
                    <h3 className="text-2xl font-bold flex items-center gap-3 mb-6 pb-2 border-b border-border/50">
                      <div className="w-10 h-10 rounded-lg bg-card flex items-center justify-center border border-border/50">
                        <Icon className="w-5 h-5 text-azure" />
                      </div>
                      {cat}
                    </h3>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {displayPartners.map((p) => (
                      <div key={p.nome} className="group flex flex-col p-6 rounded-2xl bg-card border border-border/50 hover:border-azure/30 hover:shadow-lg transition-all duration-300 h-full">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0 group-hover:bg-azure/10 transition-colors">
                            <Store className="w-5 h-5 text-primary group-hover:text-azure transition-colors" />
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">{p.nome}</h4>
                            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.beneficio}</p>
                          </div>
                        </div>
                        <button className="mt-6 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-primary/5 text-primary font-semibold text-sm hover:bg-primary/10 transition-colors group-hover:bg-azure/10 group-hover:text-azure">
                          <Eye className="w-4 h-4" /> Ver Benefício
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
            {filteredCategories.length === 0 && (
              <div className="py-20 text-center text-muted-foreground">
                <p className="text-lg">Nenhuma categoria ou parceiro encontrado para "{searchTerm}".</p>
                <button onClick={() => setSearchTerm("")} className="mt-4 text-azure font-semibold hover:underline">Limpar pesquisa</button>
              </div>
            )}
          </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-muted/20">
        <div className="section-container max-w-4xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-azure font-semibold text-sm tracking-wider uppercase">Dúvidas Frequentes</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">FAQ - Clube+ FUNSA</h2>
            </div>
            
            <div className="space-y-4">
              {[
                { 
                  q: "Quem tem direito ao Clube+ FUNSA?", 
                  a: "Todos os titulares e dependentes ativos nos planos de assistência familiar da FUNSA possuem direito irrestrito aos benefícios e descontos." 
                },
                { 
                  q: "Preciso pagar algo a mais pelo Clube?", 
                  a: "Não! O Clube+ FUNSA é um benefício incluso no seu plano sem custos adicionais." 
                },
                { 
                  q: "Como utilizar os descontos nos parceiros?", 
                  a: "Basta apresentar a sua carteirinha virtual (disponível no aplicativo) ou física acompanhada de um documento com foto no momento da compra." 
                },
                { 
                  q: "Os descontos possuem limites de uso?", 
                  a: "Na maioria dos parceiros o uso é ilimitado, mas algumas promoções especiais geradas pelo aplicativo podem ter um limite de utilizações ou prazo de validade." 
                }
              ].map((faq, i) => (
                <details key={i} className="group bg-card rounded-2xl border border-border/50 overflow-hidden [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg select-none hover:bg-muted/30 transition-colors">
                    {faq.q}
                    <span className="transition group-open:rotate-180">
                      <ChevronDown className="w-5 h-5 text-azure" />
                    </span>
                  </summary>
                  <p className="px-6 pb-6 pt-2 text-muted-foreground leading-relaxed border-t border-border/50">
                     {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="p-10 md:p-16 rounded-3xl gradient-navy text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--azure)/0.15),transparent_60%)]" />
              <div className="relative z-10">
                <Smartphone className="w-12 h-12 text-azure mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Faça parte do Clube + FUNSA
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                  Baixe o aplicativo FUNSA e comece a aproveitar todos os descontos e vantagens exclusivas. Consulte parceiros, acesse cupons e muito mais.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="#app"
                  className="btn-primary-dark">
                    <Smartphone className="w-5 h-5" /> Baixar o App
                  </a>
                  <a href="https://wa.me/5514991823569" target="_blank" rel="noopener noreferrer"
                  className="btn-outline-dark">
                    Fale Conosco
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>);

}
