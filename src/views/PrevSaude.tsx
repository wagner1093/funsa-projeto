'use client';
import { useState, useCallback, useEffect, useMemo } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Phone, MapPin, Heart, Shield, Users, Stethoscope,
  BadgePercent, Clock, Building2, ChevronDown, Brain,
  Eye, Bone, Baby, Pill, Smile, Activity, Ear, ArrowRight, FileText, FlaskConical,
  ChevronLeft, ChevronRight
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";



/* ── hero slides ── */
const heroSlides = [
  { img: "/assets/prevsaude-hero-1.webp", title: "PrevSaúde Avaré", sub: "Seu condomínio médico com mais de 20 especialidades" },
  { img: "/assets/prevsaude-hero-2.webp", title: "Cuidado Completo", sub: "Consultas e exames com descontos exclusivos para você" },
  { img: "/assets/prevsaude-hero-3.webp", title: "Benefícios FUNSA", sub: "Mais saúde e economia para toda a sua família" },
];

/* ── benefits ── */
const benefits = [
  { icon: BadgePercent, title: "Até 50% de desconto", desc: "Até 50% de desconto em consultas médicas e exames" },
  { icon: Stethoscope, title: "+20 especialidades", desc: "Rede completa de profissionais qualificados" },
  { icon: Clock, title: "Agendamento fácil", desc: "Marque sua consulta com rapidez e praticidade" },
  { icon: Shield, title: "Sem carência", desc: "Atendimento imediato após a adesão ao plano" },
  { icon: Users, title: "Para toda a família", desc: "Planos que incluem todos os dependentes" },
  { icon: Building2, title: "Estrutura moderna", desc: "Clínicas parceiras com equipamentos de ponta" },
];

/* ── stats ── */
const stats = [
  { value: 20, suffix: "+", label: "Especialidades" },
  { value: 18, suffix: "+", label: "Anos de atuação" },
  { value: 50, suffix: "%", label: "Desconto em consultas" },
  { value: 30, suffix: "+", label: "Clínicas parceiras" },
];

/* ── specialty icons ── */
const specIcons: Record<string, React.ElementType> = {
  "Cardiologia": Heart,
  "Dermatologia e estética": Smile,
  "Ortopedia": Bone,
  "Pediatria / Neuropediatria": Baby,
  "Psiquiatria": Brain,
  "Oftalmologia": Eye,
  "Otorrinolaringologia": Ear,
  "Pneumologia": Activity,
  "Endocrinologia": Pill,
};

/* ── fallback data (used when DB is empty) ── */
const especialidadesHardcoded: Record<string, string[]> = {
  "Cabeça e pescoço": ["Dr. Renato Nakamura"],
  "Cardiologia": ["Dr. Murillo De Melo Villen Favaro De Oliveira"],
  "Clínico geral": ["Dra. Thaisa Garcia", "Dr. Lester Roberto Espinosa Popa", "Dra. Maria Eduarda M. Marques"],
  "Dermatologia e estética": ["Dra. Tania Henneberg Benemond (SP)", "Dra. Paula Henneberg Benemond (SP)"],
  "Endocrinologia": ["Dra. Paola Jung"],
  "Fisioterapia": ["Maria Eduarda F. Moreira", "Yago Aparecido Camargo"],
  "Gastrocirurgia / Coloproctologia": ["Dr. Hélio José Fragoso", "Dr. Zimar Tavares Borges Júnior"],
  "Geriatria": ["Dra. Juliana Armando Rosa"],
  "Ginecologia e obstetrícia": ["Dra. Ângela Storino Das Chagas", "Dra. Maria Eduarda Grassi Novaes"],
  "Nutrição": ["Milena Nespeca"],
  "Ortopedia": ["Dr. Jun Ricardo Fujji", "Dr. Thales Martins"],
  "Otorrinolaringologia": ["Dr. Renato Nakamura"],
  "Pediatria / Neuropediatria": ["Dra. Regina Patrícia Rodrigues"],
  "Pneumologia": ["Dr. André Suzuki"],
  "Psicologia": ["Patrícia Duarte Silva", "Valéria Domiciano Da Silva"],
  "Psiquiatria": ["Dr. João Rogério Andrade Noronha", "Dr. Marciano Pires Da Costa"],
  "Terapia ocupacional": ["Diana Maria Lemes Da Silva"],
  "Terapia / Numeróloga quântica": ["Larissa Dos Santos"],
  "Urologia": ["Dr. César Geraldo Benemond (SP)"],
  "Vascular": ["Dr. Marcelo Dias Soares Filho"],
};

interface Clinica {
  nome: string;
  especialidade: string;
  profissional?: string;
  endereco: string;
  telefone: string;
}

type MedicoDB = {
  id: string;
  nome: string;
  especialidade: string;
  crm: string | null;
  contato: string;
  imagem: string | null;
  endereco: string | null;
  profissional: string | null;
  categoria: string;
};

type TipoDB = {
  id: string;
  nome: string;
  slug: string;
  eh_medico: boolean;
  ordem: number;
};

type Props = {
  initialMedicos?: MedicoDB[];
  initialTipos?: TipoDB[];
};

function ResultsDialog({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Resultados de Exames</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <a
            href="https://www.ultrasis.life/exame"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-azure/10 flex items-center justify-center">
                <Activity className="w-5 h-5 text-azure" />
              </div>
              <span className="font-semibold text-foreground">PrevSaúde</span>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-azure transition-colors" />
          </a>
          <a
            href="https://www.labivangarcia.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-muted transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-azure/10 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-azure" />
              </div>
              <span className="font-semibold text-foreground">Laboratório Ivan Garcia</span>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-azure transition-colors" />
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const clinicasAvareHardcoded: Clinica[] = [
  { nome: "Laboratório Ivan Garcia", especialidade: "Análises Clínicas", profissional: "Posto de coleta Laboratório Ivan Garcia", endereco: "Rua Santa Catarina, nº 1.981 – Centro", telefone: "(14) 3733-2555" },
  { nome: "PrevSaúde", especialidade: "Consultas Médicas", endereco: "Consulte no agendamento", telefone: "(14) 99818-4440" },
  { nome: "Clínica Áudio On", especialidade: "Otorrinolaringologia", profissional: "Dra. Thais Cristina Matuo", endereco: "Rua Santa Catarina, nº 1.981 – Centro", telefone: "(14) 3731-7228" },
  { nome: "Clínica Asclin", especialidade: "Nefrologia", profissional: "Dra. Luciana Aparecida Uiema", endereco: "Av. Carlos Ramires, nº 982", telefone: "(14) 99172-4382" },
  { nome: "Clínica Asclin", especialidade: "Pediatria", profissional: "Dra. Melina Giroto Tazinassi", endereco: "Av. Carlos Ramires, nº 982", telefone: "(14) 99172-4382" },
  { nome: "Clínica de Urologia", especialidade: "Urologia", profissional: "Dr. Paulo Roberto Ismael Lutti", endereco: "Av. Pinheiro Machado, nº 1.206 – Centro", telefone: "(14) 3733-6381" },
  { nome: "Clínica Fernandes", especialidade: "Pediatria", profissional: "Dr. Vladimir Lopes Fernandes", endereco: "Rua Voluntários de Avaré, nº 1.127", telefone: "(14) 3732-7018" },
  { nome: "Clínica Médica Dr. Ernesto Albuquerque", especialidade: "Pediatria", endereco: "Largo São Benedito, nº 103 – Centro", telefone: "(14) 3732-2486" },
  { nome: "Clínica Neurológica", especialidade: "Neurologia", profissional: "Dr. Vicente José Schiavão", endereco: "Rua Domiciano Santana, nº 1.096", telefone: "(14) 3732-4887" },
  { nome: "Clínica Oftalmológica", especialidade: "Oftalmologia", profissional: "Dr. Patrick Dias", endereco: "Rua Domiciano Santana, nº 1.306 – Centro", telefone: "(14) 99135-1840" },
  { nome: "Clínica Santa Luzia", especialidade: "Oftalmologia", profissional: "Dr. José Antônio Batista Junior", endereco: "Rua Pará, nº 1.039 – Centro", telefone: "(14) 3732-7209" },
  { nome: "Clínica São Lucas", especialidade: "Pediatria", profissional: "Dr. Nilson Calamita Filho", endereco: "Rua Domiciano Santana, nº 1.269", telefone: "(14) 3732-0968" },
  { nome: "Clínica São Luiz", especialidade: "Otorrinolaringologia", profissional: "Dr. Marcos Ceoloto Galati", endereco: "Rua Domiciano Santana, nº 270 – Centro", telefone: "(14) 3733-2375" },
  { nome: "Clínica OstheoFoot", especialidade: "Pilates • Palmilhas Posturais", endereco: "Rua Rio Grande do Norte, nº 840 – Centro", telefone: "(14) 3733-2230" },
  { nome: "Espaço Estimular", especialidade: "Neuropsicopedagogia", profissional: "Dra. Janaína Medeiros", endereco: "Rua Tenente Apiaí, nº 1.174 – Bairro Alto", telefone: "(14) 99691-2928" },
  { nome: "Espaço Saúde", especialidade: "Cirurgia Vascular", profissional: "Dr. Luciano O. Salgado de Souza", endereco: "Av. Gilberto Filgueiras, nº 1.149 – Alto da Colina", telefone: "(14) 99677-8080" },
  { nome: "IKOO", especialidade: "Neurologia", profissional: "Dra. Thaís Fagnani Machado", endereco: "Av. Ângelo Contrucci, nº 651 – Alto da Colina II", telefone: "(14) 3733-3000" },
  { nome: "Neurocirurgia", especialidade: "Neurocirurgia", profissional: "Dr. Marco Aurélio Pina", endereco: "Praça Rui Barbosa, nº 100 – Centro", telefone: "(14) 3733-4698" },
];

const clinicasExamesHardcoded: Clinica[] = [
  { nome: "Centromed", especialidade: "Exames de Imagem", endereco: "Rua Goiás, nº 1.351 – Centro", telefone: "(14) 3732-1234" },
  { nome: "Centro de Radiologia – Unimed", especialidade: "Exames de Imagem", endereco: "Rua Santa Catarina, nº 1.981 – Bairro Alto", telefone: "(14) 3733-7571" },
  { nome: "Clínica Radiodoctor", especialidade: "Exames de Imagem", endereco: "Largo Santa Cruz, nº 808 – Centro", telefone: "(14) 3732-4316" },
  { nome: "CROD", especialidade: "Radiologia Odontológica Digital", endereco: "Rua Goiás, nº 1.351 – Centro", telefone: "(14) 3733-1418" },
  { nome: "UDI – Ressonância Magnética", especialidade: "Ressonância", endereco: "Rua Mato Grosso, nº 800 – Centro", telefone: "(14) 3732-3264" },
  { nome: "Laboratório Ivan Garcia", especialidade: "Análises Clínicas", endereco: "Consultar no agendamento", telefone: "(14) 3732-0202" },
  { nome: "Clínica Imagem", especialidade: "Exames de Imagem", endereco: "Consultar no agendamento", telefone: "(14) 3732-0202" },
];

const clinicasOutrasHardcoded: Clinica[] = [
  { nome: "Organização Terra Branca – Bauru/SP", especialidade: "Diversas", endereco: "Praça Dom Pedro II, nº 4-74 – Centro", telefone: "(14) 3223-8011" },
  { nome: "Clínica Cliniprev – Botucatu/SP", especialidade: "Cardiologia, Clínico Geral, Dermatologia, Ginecologia, Oftalmologia, Ortopedia, Odontologia", endereco: "Av. Santana, nº 525 – Centro", telefone: "(14) 3361-6035" },
  { nome: "Dr. José Ricardo P. Rodrigues – Botucatu/SP", especialidade: "Ginecologia, Obstetrícia e Mastologia", endereco: "Praça Isabel Arruda, nº 157 – Centro", telefone: "(14) 3882-5515" },
  { nome: "Clínica Saúde – Lençóis Paulista/SP", especialidade: "Fonoaudiologia, Psiquiatria, Psicologia, Odontologia", endereco: "Av. 25 de Janeiro, nº 207 – Centro", telefone: "(14) 3264-3886" },
];

function ClinicaCard({ c }: { c: Clinica }) {
  return (
    <div className="group p-5 rounded-xl bg-card border border-border/50 hover-lift transition-all duration-300">
      <h4 className="font-bold text-foreground">{c.nome}</h4>
      <p className="text-sm text-azure font-medium mt-1">{c.especialidade}</p>
      {c.profissional && <p className="text-sm text-muted-foreground mt-1">{c.profissional}</p>}
      <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {c.endereco}</span>
        <a href={`tel:${c.telefone.replace(/\D/g, "")}`} className="flex items-center gap-1.5 hover:text-azure transition-colors">
          <Phone className="w-3 h-3" /> {c.telefone}
        </a>
      </div>
    </div>
  );
}

export default function PrevSaude({ initialMedicos = [], initialTipos = [] }: Props) {
  const toClinica = (m: MedicoDB): Clinica => ({
    nome: m.nome,
    especialidade: m.especialidade,
    profissional: m.profissional ?? undefined,
    endereco: m.endereco ?? '',
    telefone: m.contato,
  });

  const especialidades = useMemo<Record<string, string[]>>(() => {
    if (initialMedicos.length > 0) {
      const tiposMedico = new Set(initialTipos.filter(t => t.eh_medico).map(t => t.slug));
      const fromDB = initialMedicos.filter(m => tiposMedico.has(m.categoria));
      return fromDB.reduce((acc, m) => {
        const key = m.especialidade;
        if (!acc[key]) acc[key] = [];
        acc[key].push(m.nome);
        return acc;
      }, {} as Record<string, string[]>);
    }
    return especialidadesHardcoded;
  }, [initialMedicos, initialTipos]);

  /* Grupos de clínicas: um por tipo cadastrado (exceto tipos de profissional individual) */
  const clinicGroups = useMemo<{ nome: string; items: Clinica[] }[]>(() => {
    if (initialMedicos.length === 0) {
      return [
        { nome: "Avaré / SP", items: clinicasAvareHardcoded },
        { nome: "Exames de Imagem – Avaré / SP", items: clinicasExamesHardcoded },
        { nome: "Outras Cidades", items: clinicasOutrasHardcoded },
      ];
    }
    return initialTipos
      .filter(t => !t.eh_medico)
      .sort((a, b) => a.ordem - b.ordem)
      .map(t => ({
        nome: t.nome,
        items: initialMedicos.filter(m => m.categoria === t.slug).map(toClinica),
      }))
      .filter(g => g.items.length > 0);
  }, [initialMedicos, initialTipos]);

  /* carousel */
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 40,
    skipSnaps: false
  }, [Autoplay({ delay: 6000, stopOnInteraction: false })]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredEspecialidades = Object.entries(especialidades).filter(([esp, docs]) => {
    const searchLower = searchTerm.toLowerCase();
    return esp.toLowerCase().includes(searchLower) || docs.some(d => d.toLowerCase().includes(searchLower));
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
        <div className="relative z-20 section-container w-full px-12 sm:px-20 lg:px-28">
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
                  PrevSaúde Avaré
                </span>
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                {heroSlides[activeIndex].title}
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed max-w-xl">
                {heroSlides[activeIndex].sub}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://wa.me/5514998184440" target="_blank" rel="noopener noreferrer"
                  className="btn-primary-dark text-base">
                  Agende sua consulta
                </a>
                <ResultsDialog>
                  <button className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-200 bg-white text-primary border border-white hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] text-base shadow-md hover:shadow-lg">
                    Resultados de exames <ArrowRight className="w-4 h-4" />
                  </button>
                </ResultsDialog>
                <a href="#especialidades"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-semibold transition-all duration-200 border border-white/30 text-white bg-white/10 hover:bg-white/20 hover:scale-[1.02] active:scale-[0.98] text-base backdrop-blur-sm shadow-sm">
                  <Stethoscope className="w-4 h-4 text-white/90" /> Ver especialidades
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

      {/* â•â•â• BENEFITS â•â•â• */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--azure)/0.05),transparent_60%)]" />
        <div className="section-container relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-azure font-semibold text-sm tracking-wider uppercase">Vantagens</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                Por que escolher a PrevSaúde?
              </h2>
              <p className="text-muted-foreground mt-4 text-lg">
                Cuidamos da saúde da sua família com qualidade, acessibilidade e atendimento humanizado.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.1}>
                <div className="group p-8 rounded-2xl bg-card border border-border/50 hover-lift transition-all duration-300 h-full">
                  <div className="w-14 h-14 rounded-xl bg-azure/10 flex items-center justify-center mb-5 group-hover:bg-azure/20 transition-colors">
                    <b.icon className="w-7 h-7 text-azure" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{b.title}</h3>
                  <p className="text-muted-foreground mt-2 leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {/* Dica de Saúde */}
            <ScrollReveal delay={0.1}>
              <div className="p-8 rounded-2xl gradient-navy text-primary-foreground h-full relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--azure)/0.1),transparent_60%)]" />
                <div className="relative z-10">
                  <Activity className="w-10 h-10 text-azure mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold mb-3">Dica de Saúde</h3>
                  <p className="text-primary-foreground/80 leading-relaxed mb-6">
                    Mantenha seus exames em dia e cultive hábitos saudáveis. A prevenção é o melhor caminho para uma vida longa e feliz.
                  </p>
                  <Link href="/blog" className="inline-flex items-center gap-2 text-azure font-semibold hover:underline">
                    Ler mais dicas <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Resultados de Exames */}
            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-card border border-border/50 h-full relative overflow-hidden group">
                <div className="relative z-10">
                  <FileText className="w-10 h-10 text-azure mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-2xl font-bold text-foreground mb-3">Resultados de Exames</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Acesse os resultados de seus exames realizados em nossos laboratórios parceiros de forma rápida e segura.
                  </p>
                  <ResultsDialog>
                    <button className="btn-primary flex items-center justify-center gap-2 w-full">
                      Resultados de Exames <ArrowRight className="w-4 h-4" />
                    </button>
                  </ResultsDialog>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* â•â•â• STATS â•â•â• */}
      <section className="py-20 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(var(--azure)/0.1),transparent_50%)]" />
        <div className="section-container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.15}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white flex items-baseline justify-center">
                    <Counter end={s.value} suffix={s.suffix} />
                  </div>
                  <p className="text-white/60 mt-2 text-sm font-medium">{s.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* â•â•â• ABOUT â•â•â• */}
      <section className="section-padding bg-muted/30">
        <div className="section-container">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto text-center">
              <span className="text-azure font-semibold text-sm tracking-wider uppercase">Sobre nós</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-8">
                Referência em saúde acessível
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  A PrevSaúde Avaré é o condomínio médico criado para cuidar da saúde das famílias com atenção, qualidade e acessibilidade. Reunindo mais de 20 especialidades médicas, oferece aos associados consultas com até 50% de desconto, além de exames laboratoriais e de imagem.
                </p>
                <p>
                  Com mais de 18 anos de atuação, a PrevSaúde Avaré é referência em atendimento humanizado, estrutura moderna e foco na prevenção e no bem-estar. Mais do que um serviço, a PrevSaúde Avaré é um compromisso com quem confia na FUNSA para cuidar do que realmente importa: a vida.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* â•â•â• SPECIALTIES & CLINICS â•â•â• */}
      <section id="especialidades" className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-azure font-semibold text-sm tracking-wider uppercase">Nossa rede</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                Especialidades & Clínicas
              </h2>
            </div>
          </ScrollReveal>

          <Tabs defaultValue="especialidades" className="w-full">
            <ScrollReveal>
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 h-auto p-1 bg-muted/60">
                <TabsTrigger value="especialidades" className="py-3 text-sm font-semibold">Especialidades</TabsTrigger>
                <TabsTrigger value="clinicas" className="py-3 text-sm font-semibold">Clínicas Parceiras</TabsTrigger>
              </TabsList>
            </ScrollReveal>

            <TabsContent value="especialidades" className="mt-10">
              <ScrollReveal>
                <div className="max-w-xl mx-auto mb-10">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Pesquisar especialidade ou médico..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-6 py-4 rounded-full bg-card border border-border focus:ring-2 focus:ring-azure/50 outline-none transition-all shadow-sm pl-12"
                    />
                    <Stethoscope className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredEspecialidades.map(([esp, docs]) => {
                    const Icon = specIcons[esp] || Stethoscope;
                    return (
                      <div key={esp} className="group p-5 rounded-xl bg-card border border-border/50 hover-lift transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-azure/10 flex items-center justify-center group-hover:bg-azure/20 transition-colors">
                            <Icon className="w-4.5 h-4.5 text-azure" />
                          </div>
                          <h4 className="font-bold text-foreground text-sm">{esp}</h4>
                        </div>
                        <div className="space-y-1 pl-12">
                          {docs.map((d) => (
                            <p key={d} className="text-sm text-muted-foreground">{d}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                  {filteredEspecialidades.length === 0 && (
                    <div className="col-span-full py-12 text-center text-muted-foreground">
                      Nenhuma especialidade ou médico encontrado para "{searchTerm}".
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="clinicas" className="mt-10">
              <ScrollReveal>
                {clinicGroups.map((g, i) => (
                  <div key={g.nome} className={i < clinicGroups.length - 1 ? "mb-12" : ""}>
                    <h3 className="text-xl font-bold text-foreground mb-6">{g.nome}</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {g.items.map((c, idx) => <ClinicaCard key={idx} c={c} />)}
                    </div>
                  </div>
                ))}
                {clinicGroups.length === 0 && (
                  <div className="py-12 text-center text-muted-foreground">
                    Nenhuma clínica parceira cadastrada no momento.
                  </div>
                )}
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* â•â•â• CTA FINAL â•â•â• */}
      <section className="py-24 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--azure)/0.08),transparent_60%)]" />
        <div className="section-container relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Cuide da saúde de quem você ama
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              Agende sua consulta e aproveite os benefícios exclusivos da PrevSaúde Avaré para toda a família.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/5514998184440" target="_blank" rel="noopener noreferrer"
                className="btn-primary-dark text-lg">
                <Phone className="w-5 h-5" /> Agendar consulta
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}


