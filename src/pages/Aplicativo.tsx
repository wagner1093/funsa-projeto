import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import appMockup from "@/assets/app-mockup.jpg";
import { Check, ArrowRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const highlights = [
  "Acesso rápido à carteirinha virtual",
  "Guia médico sempre atualizado",
  "Clube de descontos exclusivos",
  "Promoções e novidades em tempo real",
];

const faqs = [
  { q: "O aplicativo é gratuito?", a: "Sim, o aplicativo FUNSA é totalmente gratuito para download e uso por todos os associados." },
  { q: "Onde posso baixar?", a: "O aplicativo está disponível na App Store (iOS) e Google Play (Android)." },
  { q: "Preciso ter plano para usar?", a: "Algumas funcionalidades são exclusivas para associados, mas o download é aberto a todos." },
  { q: "Como acessar minha carteirinha?", a: "Após o login com seus dados de associado, acesse a seção 'Carteirinha Virtual' no menu principal." },
];

export default function Aplicativo() {
  return (
    <>
      <PageHero
        title="Aplicativo FUNSA"
        subtitle="Praticidade e acesso rápido a todos os serviços e informações do seu plano, na palma da sua mão."
        breadcrumbs={[{ label: "Aplicativo", href: "/aplicativo" }]}
      />

      {/* App Features */}
      <section className="section-padding bg-background overflow-hidden">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image with accent bg */}
            <ScrollReveal>
              <div className="relative flex justify-center">
                <div className="absolute inset-0 rounded-[2rem] bg-primary/10 -rotate-3 scale-95" />
                <img
                  src={appMockup}
                  alt="Aplicativo FUNSA na tela do smartphone"
                  className="relative w-full max-w-sm lg:max-w-md rounded-3xl shadow-2xl"
                />
              </div>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal delay={0.15}>
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-gold uppercase tracking-widest mb-4">
                Aplicativo FUNSA
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold text-foreground leading-tight">
                Tudo na palma da sua mão
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed max-w-lg">
                Com o aplicativo FUNSA, você tem acesso a todos os serviços
                e informações do seu plano de forma prática e rápida.{" "}
                <strong className="text-foreground">Baixe gratuitamente</strong> e tenha o controle total do seu plano.
              </p>

              {/* Highlight checklist */}
              <ul className="mt-8 space-y-4">
                {highlights.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </span>
                    <span className="text-foreground font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-10">
                <a
                  href="#download"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift text-base"
                >
                  Quero baixar o aplicativo <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Download */}
      <section id="download" className="py-16 gradient-navy">
        <div className="section-container text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Baixe agora o aplicativo
            </h2>
            <p className="text-primary-foreground/70 text-lg max-w-xl mx-auto mb-8">
              Disponível gratuitamente para iOS e Android.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-card/10 border border-primary-foreground/20 text-primary-foreground hover-lift"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                <div className="text-left">
                  <div className="text-[10px] opacity-80">Baixe na</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-card/10 border border-primary-foreground/20 text-primary-foreground hover-lift"
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
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/30">
        <div className="section-container max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">FAQ</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
                Dúvidas sobre o aplicativo
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:shadow-md transition-shadow"
                >
                  <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
