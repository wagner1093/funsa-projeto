import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  ChevronDown, Smartphone, BadgePercent, ShoppingBag, Utensils,
  GraduationCap, Dumbbell, Heart, Car, Eye, Scissors, Gift,
  Store, Building2, Flower2, ArrowRight, Star, Users, Percent,
  Wrench, BookOpen, Hotel } from
"lucide-react";

import heroImg1 from "@/assets/clube-hero-1.jpg";
import heroImg2 from "@/assets/clube-hero-2.jpg";
import heroImg3 from "@/assets/clube-hero-3.jpg";
import appMockup from "@/assets/app-mockup.jpg";

/* ── hero slides ── */
const heroSlides = [
{ img: heroImg1, title: "Clube + FUNSA", sub: "Descontos exclusivos em mais de 60 parceiros da região" },
{ img: heroImg2, title: "Vantagens no App", sub: "Cupons, promoções e benefícios direto no seu celular" },
{ img: heroImg3, title: "Rede de parceiros", sub: "Alimentação, saúde, educação, lazer e muito mais" }];


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
  { nome: "Academia Power Trainer", beneficio: "5% de desconto em todas as modalidades" },
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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [activeIndex, setActiveIndex] = useState(0);
  const onSelect = useCallback(() => {if (emblaApi) setActiveIndex(emblaApi.selectedScrollSnap());}, [emblaApi]);
  useEffect(() => {if (!emblaApi) return;onSelect();emblaApi.on("select", onSelect);return () => {emblaApi.off("select", onSelect);};}, [emblaApi, onSelect]);

  /* active category for tabs */
  const [activeCat, setActiveCat] = useState(categoryKeys[0]);

  return (
    <>
      {/* ═══ HERO CAROUSEL ═══ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <div ref={emblaRef} className="h-full">
          <div className="flex h-full">
            {heroSlides.map((slide, i) =>
            <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                <div className="absolute inset-0 flex items-end pb-24 md:pb-32">
                  <div className="section-container w-full">
                    <motion.div
                    key={`slide-${i}-${activeIndex}`}
                    initial={{ opacity: 0, y: 40 }}
                    animate={activeIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}>

                      <span className="inline-block px-4 py-1.5 rounded-full bg-gold/20 text-gold text-sm font-medium mb-4 backdrop-blur-sm border border-gold/20">
                        Clube + FUNSA
                      </span>
                      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 mt-4 max-w-xl">
                        {slide.sub}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-8">
                        <Link to="/aplicativo"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg gradient-gold text-primary font-semibold hover-lift transition-all">
                          <Smartphone className="w-5 h-5" /> Baixar o App
                        </Link>
                        <a href="#parceiros"
                      className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
                          Ver parceiros
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) =>
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
          className={`h-2 rounded-full transition-all duration-500 ${activeIndex === i ? "w-10 bg-gold" : "w-2 bg-white/40 hover:bg-white/60"}`} />
          )}
        </div>

        <motion.div className="absolute bottom-8 right-8 z-10" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--gold)/0.05),transparent_60%)]" />
        <div className="section-container relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-gold font-semibold text-sm tracking-wider uppercase">Vantagens</span>
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
                  <div className="w-14 h-14 rounded-xl bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors">
                    <b.icon className="w-7 h-7 text-gold" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            )}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--gold)/0.1),transparent_50%)]" />
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

      {/* ═══ APP HIGHLIGHT ═══ */}
      <section className="section-padding bg-muted/30 overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="flex justify-center relative">
                {/* Glow background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--gold)/0.15),transparent_70%)] blur-2xl scale-125" />
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.04, rotateY: 4 }}
                  transition={{ type: "spring", stiffness: 180 }}>

                  <div className="relative w-72 md:w-80 lg:w-96">
                    {/* Phone frame */}
                    <div className="rounded-[2.5rem] border-[6px] border-foreground/10 bg-black/5 p-2 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] backdrop-blur-sm">
                      {/* Notch */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-5 bg-foreground/10 rounded-full z-10" />
                      <img
                        src={appMockup}
                        alt="Aplicativo FUNSA"
                        className="w-full rounded-[2rem] object-contain" />

                    </div>
                    {/* Floating badge */}
                    <motion.div
                      className="absolute -right-4 top-1/4 px-4 py-2 rounded-xl bg-card border border-border/50 shadow-xl"
                      animate={{ y: [0, -8, 0] }}
                      transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}>

                      <div className="flex items-center gap-2">
                        <BadgePercent className="w-5 h-5 text-gold" />
                        <span className="text-sm font-bold text-foreground">Até 50% OFF</span>
                      </div>
                    </motion.div>
                    {/* Floating badge 2 */}
                    <motion.div
                      className="absolute -left-4 bottom-1/3 px-4 py-2 rounded-xl bg-card border border-border/50 shadow-xl"
                      animate={{ y: [0, 8, 0] }}
                      transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut", delay: 0.5 }}>

                      <div className="flex items-center gap-2">
                        <Store className="w-5 h-5 text-gold" />
                        <span className="text-sm font-bold text-foreground">60+ Parceiros</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <span className="text-gold font-semibold text-sm tracking-wider uppercase">Aplicativo FUNSA</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Seus benefícios na palma da mão
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                Com o aplicativo FUNSA, você consulta todos os parceiros do Clube, acessa cupons de desconto, recebe promoções exclusivas e tem informações do seu plano de forma prática e rápida.
              </p>
              <ul className="mt-8 space-y-4">
                {["Consultar parceiros e descontos", "Cupons exclusivos pelo App", "Carteirinha virtual", "Promoções e sorteios"].map((item) =>
                <li key={item} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Star className="w-4 h-4 text-gold" />
                    </div>
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                )}
              </ul>
              <div className="mt-10">
                <Link to="/aplicativo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift">
                  Baixar Aplicativo <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ PARTNERS ═══ */}
      <section id="parceiros" className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-gold font-semibold text-sm tracking-wider uppercase">Nossa rede</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                Parceiros & Benefícios
              </h2>
              <p className="text-muted-foreground mt-4">
                Explore nossas categorias e descubra todos os descontos disponíveis para associados.
              </p>
            </div>
          </ScrollReveal>

          {/* Category tabs - scrollable on mobile */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap justify-center gap-2 mb-10">
              {categoryKeys.map((cat) => {
                const Icon = catIcons[cat] || Store;
                const isActive = activeCat === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCat(cat)}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive ?
                    "gradient-navy text-white shadow-lg" :
                    "bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:border-gold/30"}`
                    }>

                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{cat}</span>
                    <span className="sm:hidden">{cat.split(" ")[0]}</span>
                  </button>);

              })}
            </div>
          </ScrollReveal>

          {/* Active category content */}
          <motion.div
            key={activeCat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categorias[activeCat].map((p) =>
              <div key={p.nome} className="group p-6 rounded-2xl bg-card border border-border/50 hover-lift transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors">
                      <Percent className="w-5 h-5 text-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">{p.nome}</h4>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{p.beneficio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <ScrollReveal>
            <div className="p-10 md:p-16 rounded-3xl gradient-navy text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--gold)/0.15),transparent_60%)]" />
              <div className="relative z-10">
                <Smartphone className="w-12 h-12 text-gold mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Faça parte do Clube + FUNSA
                </h2>
                <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
                  Baixe o aplicativo FUNSA e comece a aproveitar todos os descontos e vantagens exclusivas. Consulte parceiros, acesse cupons e muito mais.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/aplicativo"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift">
                    <Smartphone className="w-5 h-5" /> Baixar o App
                  </Link>
                  <a href="https://wa.me/551437320202" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors backdrop-blur-sm">
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