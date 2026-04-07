import ScrollReveal from "./ScrollReveal";
import appMockup from "@/assets/app-mockup.jpg";
import { CreditCard, BookOpen, Stethoscope, Flower2, Gift, Smartphone } from "lucide-react";

const features = [
  { icon: CreditCard, label: "Carteirinha Virtual" },
  { icon: BookOpen, label: "Informações do Plano" },
  { icon: Stethoscope, label: "Guia Médico" },
  { icon: Flower2, label: "Obituário" },
  { icon: Gift, label: "Clube FUNSA" },
  { icon: Smartphone, label: "Promoções Exclusivas" },
];

export default function AppSection() {
  return (
    <section id="aplicativo" className="section-padding bg-muted/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Mockup */}
          <ScrollReveal>
            <div className="flex justify-center">
              <img
                src={appMockup}
                alt="Aplicativo FUNSA"
                className="w-72 md:w-80 rounded-3xl shadow-2xl"
              />
            </div>
          </ScrollReveal>

          {/* Content */}
          <ScrollReveal delay={0.2}>
            <span className="text-sm font-semibold text-azure uppercase tracking-widest">Aplicativo FUNSA</span>
            <h2 className="mt-3 text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
              Tudo na palma da sua mão
            </h2>
            <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
              Com o aplicativo FUNSA, você tem acesso a todos os serviços 
              e informações do seu plano de forma prática e rápida.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.label} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/50">
                  <f.icon className="w-5 h-5 text-azure flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{f.label}</span>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover-lift"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-80">Baixe na</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover-lift"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 9.49l-2.302 2.302-8.634-8.634z"/></svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-80">Disponível no</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
