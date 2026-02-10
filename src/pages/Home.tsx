import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Clock, Stethoscope, Trees, Shield, Users, Award, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImg from "@/assets/hero-bg.jpg";
import ScrollReveal from "@/components/ScrollReveal";
import Counter from "@/components/Counter";

const highlights = [
  { icon: Clock, title: "Atendimento 24h", desc: "Plantão permanente para atendimento imediato com dignidade.", link: "/servicos" },
  { icon: Stethoscope, title: "PREV SAÚDE", desc: "Convênio médico com diversas especialidades para sua família.", link: "/servicos" },
  { icon: Trees, title: "Memorial Pôr do Sol", desc: "Espaço moderno e acolhedor para homenagear seus entes queridos.", link: "/servicos" },
  { icon: Shield, title: "Plano Familiar", desc: "Proteção completa e tranquilidade para toda a família.", link: "/plano" },
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

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="FUNSA – Ambiente sereno e acolhedor" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
        </div>

        <div className="relative z-10 section-container w-full py-32 md:py-0">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/10 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-sm font-medium text-primary-foreground/90">Desde 1943 · Tradição e Confiança</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary-foreground leading-tight mb-6"
            >
              Acolhimento e segurança para sua família
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
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold text-base hover-lift"
              >
                Fale Conosco
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/plano"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition-colors"
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
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">O que oferecemos</span>
              <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
                Cuidado completo para sua família
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h, i) => (
              <ScrollReveal key={h.title} delay={i * 0.1}>
                <Link to={h.link} className="block p-8 rounded-2xl bg-card border border-border/50 hover-lift group text-center h-full">
                  <div className="w-14 h-14 rounded-2xl gradient-navy flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform duration-300">
                    <h.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground">{h.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-gold">
                    Saiba Mais <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 gradient-navy">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-3xl md:text-5xl font-serif font-bold text-primary-foreground">
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
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">Depoimentos</span>
              <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
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
                      <Star key={j} className="w-4 h-4 fill-gold text-gold" />
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
              <h2 className="text-3xl md:text-4xl font-semibold text-primary-foreground mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Precisa de atendimento imediato?
              </h2>
              <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
                Nossa equipe está disponível 24 horas por dia, pronta para oferecer todo o suporte que sua família precisa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contato"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
                >
                  Fale Conosco <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/5514997792932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-colors"
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
