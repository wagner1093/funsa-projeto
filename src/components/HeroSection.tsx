import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import heroImg from "@/assets/hero-bg.jpg";

export default function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImg} alt="FUNSA - Funerária moderna" className="w-full h-full object-cover" />
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
            <a
              href="#contato"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold text-base hover-lift"
            >
              Fale Conosco
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#plano"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-semibold text-base hover:bg-primary-foreground/10 transition-colors"
            >
              Conheça Nossos Planos
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#quem-somos" className="flex flex-col items-center gap-1 text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors">
          <span className="text-xs font-medium">Saiba mais</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
