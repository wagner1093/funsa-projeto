import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Phone, MapPin, Heart, Shield, Users, Stethoscope,
  BadgePercent, Clock, Building2, ChevronDown, Brain,
  Eye, Bone, Baby, Pill, Smile, Activity, Ear,
} from "lucide-react";

import heroImg1 from "@/assets/prevsaude-hero-1.jpg";
import heroImg2 from "@/assets/prevsaude-hero-2.jpg";
import heroImg3 from "@/assets/prevsaude-hero-3.jpg";

/* ── hero slides ── */
const heroSlides = [
  { img: heroImg1, title: "Prev Saúde Avaré", sub: "Seu condomínio médico com mais de 20 especialidades" },
  { img: heroImg2, title: "Consultas com até 50% off", sub: "Atendimento humanizado para toda a família" },
  { img: heroImg3, title: "Saúde acessível", sub: "Há mais de 18 anos cuidando de você" },
];

/* ── benefits ── */
const benefits = [
  { icon: BadgePercent, title: "Até 50% de desconto", desc: "Em consultas médicas de mais de 20 especialidades" },
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

/* ── data (kept from original) ── */
const especialidades: Record<string, string[]> = {
  "Cabeça e pescoço": ["Dr. Renato Nakamura"],
  "Cardiologia": ["Dr. Murillo De Melo Villen Favaro De Oliveira"],
  "Clínico geral": ["Dra. Thaisa Garcia", "Dr. Lester Roberto Espinosa Popa", "Dra. Maria Eduarda M. Marques"],
  "Dermatologia e estética": ["Dra. Tania Henneberg Benemond (SP)", "Dra. Paula Henneberg Benemond (SP)"],
  "Endocrinologia": ["Dra. Paola Jung"],
  "Fisioterapia": ["Maria Eduarda F. Moreira", "Yago Aparecido Camargo"],
  "Gastrocirurgia / Coloproctologia": ["Dr. Hélio José Fragoso", "Dr. Zimar Tavares Borges Júnior"],
  "Geriatria": ["Dra. Juliana Armando Rosa"],
  "Ginecologia e obstetrícia": ["Dra. Maria Eduarda Grassi Novaes", "Dra. Ângela Storino Das Chagas"],
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

const clinicasAvare: Clinica[] = [
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
  { nome: "MedClinic", especialidade: "Pneumologia", profissional: "Dra. Bárbara Cristina Grizzo", endereco: "Av. Gilberto Filgueiras, nº 936 – Colina da Boa Vista", telefone: "(14) 99151-2533" },
  { nome: "Neurocirurgia", especialidade: "Neurocirurgia", profissional: "Dr. Marco Aurélio Pina", endereco: "Praça Rui Barbosa, nº 100 – Centro", telefone: "(14) 3733-4698" },
];

const clinicasExames: Clinica[] = [
  { nome: "Centromed", especialidade: "Exames de Imagem", endereco: "Rua Goiás, nº 1.351 – Centro", telefone: "(14) 3732-1234" },
  { nome: "Centro de Radiologia – Unimed", especialidade: "Exames de Imagem", endereco: "Rua Santa Catarina, nº 1.981 – Bairro Alto", telefone: "(14) 3733-7571" },
  { nome: "Clínica Radiodoctor", especialidade: "Exames de Imagem", endereco: "Largo Santa Cruz, nº 808 – Centro", telefone: "(14) 3732-4316" },
  { nome: "CROD", especialidade: "Radiologia Odontológica Digital", endereco: "Rua Goiás, nº 1.351 – Centro", telefone: "(14) 3733-1418" },
  { nome: "UDI – Ressonância Magnética", especialidade: "Ressonância", endereco: "Rua Mato Grosso, nº 800 – Centro", telefone: "(14) 3732-3264" },
];

const clinicasOutras: Clinica[] = [
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

export default function PrevSaude() {
  /* carousel */
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);
  const [activeIndex, setActiveIndex] = useState(0);
  const onSelect = useCallback(() => { if (emblaApi) setActiveIndex(emblaApi.selectedScrollSnap()); }, [emblaApi]);
  useEffect(() => { if (!emblaApi) return; onSelect(); emblaApi.on("select", onSelect); return () => { emblaApi.off("select", onSelect); }; }, [emblaApi, onSelect]);

  return (
    <>
      {/* ═══ HERO CAROUSEL ═══ */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <div ref={emblaRef} className="h-full">
          <div className="flex h-full">
            {heroSlides.map((slide, i) => (
              <div key={i} className="relative flex-[0_0_100%] min-w-0 h-full">
                <img src={slide.img} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
                <div className="absolute inset-0 flex items-end pb-24 md:pb-32">
                  <div className="section-container w-full">
                    <motion.div
                      key={`slide-${i}-${activeIndex}`}
                      initial={{ opacity: 0, y: 40 }}
                      animate={activeIndex === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                      transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                      <span className="inline-block px-4 py-1.5 rounded-full bg-azure/20 text-azure text-sm font-medium mb-4 backdrop-blur-sm border border-azure/30">
                        Prev Saúde Avaré
                      </span>
                      <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight max-w-2xl">
                        {slide.title}
                      </h1>
                      <p className="text-lg md:text-xl text-white/80 mt-4 max-w-xl">
                        {slide.sub}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-8">
                        <a href="https://wa.me/551437320202" target="_blank" rel="noopener noreferrer"
                          className="btn-primary-dark">
                          Agende sua consulta
                        </a>
                        <a href="#especialidades"
                          className="btn-outline-dark">
                          Ver especialidades
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-500 ${activeIndex === i ? "w-10 bg-azure" : "w-2 bg-white/40 hover:bg-white/60"}`} />
          ))}
        </div>

        {/* scroll indicator */}
        <motion.div className="absolute bottom-8 right-8 z-10" animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown className="w-6 h-6 text-white/60" />
        </motion.div>
      </section>

      {/* ═══ BENEFITS ═══ */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,hsl(var(--azure)/0.05),transparent_60%)]" />
        <div className="section-container relative z-10">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-azure font-semibold text-sm tracking-wider uppercase">Vantagens</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3">
                Por que escolher a Prev Saúde?
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
        </div>
      </section>

      {/* ═══ STATS ═══ */}
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

      {/* ═══ ABOUT ═══ */}
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
                  A Prev Saúde Avaré é o condomínio médico criado para cuidar da saúde das famílias com atenção, qualidade e acessibilidade. Reunindo mais de 20 especialidades médicas, oferece aos associados consultas com até 50% de desconto, além de exames laboratoriais e de imagem.
                </p>
                <p>
                  Com mais de 18 anos de atuação, a Prev Saúde Avaré é referência em atendimento humanizado, estrutura moderna e foco na prevenção e no bem-estar. Mais do que um serviço, a Prev Saúde Avaré é um compromisso com quem confia na FUNSA para cuidar do que realmente importa: a vida.
                </p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SPECIALTIES & CLINICS ═══ */}
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
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(especialidades).map(([esp, docs]) => {
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
                </div>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="clinicas" className="mt-10">
              <ScrollReveal>
                <h3 className="text-xl font-bold text-foreground mb-6">Avaré / SP</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {clinicasAvare.map((c, i) => <ClinicaCard key={i} c={c} />)}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-6">Exames de Imagem – Avaré / SP</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {clinicasExames.map((c, i) => <ClinicaCard key={i} c={c} />)}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-6">Outras Cidades</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clinicasOutras.map((c, i) => <ClinicaCard key={i} c={c} />)}
                </div>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="py-24 gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--azure)/0.08),transparent_60%)]" />
        <div className="section-container relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Cuide da saúde de quem você ama
            </h2>
            <p className="text-white/70 text-lg max-w-xl mx-auto mb-10">
              Agende sua consulta e aproveite os benefícios exclusivos da Prev Saúde Avaré para toda a família.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="https://wa.me/551437320202" target="_blank" rel="noopener noreferrer"
                className="btn-primary-dark text-lg">
                <Phone className="w-5 h-5" /> Agendar consulta
              </a>
              <Link to="/plano"
                className="btn-outline-dark text-lg">
                Conhecer planos
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
