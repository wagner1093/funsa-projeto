import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Collapse, CollapseGroup } from "@/components/ui/collapse";

const included = [
  "Assistência funerária completa",
  "Atendimento 24 horas, 7 dias por semana",
  "Cobertura em todo o estado de São Paulo",
  "Traslado sem limite de quilometragem",
  "Assistência médica PREV SAÚDE",
  "Atendimento odontológico",
  "Acesso ao Clube FUNSA de vantagens",
  "Carteirinha virtual pelo aplicativo",
  "Suporte humanizado e dedicado",
  "Descontos em farmácias parceiras",
  "Exames laboratoriais com preços especiais",
  "Sem carência para serviços funerários",
];

const faqs = [
  {
    q: "Como faço para contratar o plano?",
    a: "Você pode contratar nosso plano entrando em contato pelo telefone (14) 3732-0202, WhatsApp (14) 99779-2932 ou visitando nossa sede na Rua Piauí, 1.467 – Centro, Avaré/SP.",
  },
  {
    q: "Qual é a cobertura geográfica do plano?",
    a: "Nosso plano oferece cobertura em todo o estado de São Paulo, com traslado sem limite de quilometragem.",
  },
  {
    q: "Existe período de carência?",
    a: "Para serviços funerários não há período de carência. Para alguns benefícios de saúde, consulte as condições específicas.",
  },
  {
    q: "Quantas pessoas posso incluir no plano?",
    a: "O plano familiar abrange cônjuge e filhos. Consulte-nos para informações sobre inclusão de outros dependentes.",
  },
  {
    q: "Como funciona o convênio PREV SAÚDE?",
    a: "O PREV SAÚDE oferece consultas médicas, odontológicas e exames com preços acessíveis através de nossa rede credenciada. Agende pelo telefone ou aplicativo.",
  },
  {
    q: "O plano inclui o Clube FUNSA?",
    a: "Sim! O Clube FUNSA oferece descontos exclusivos em diversos parceiros comerciais para todos os associados.",
  },
];

export default function Plano() {
  return (
    <>
      <PageHero
        title="Plano de Assistência"
        subtitle="Proteção completa e tranquilidade para toda a família, com cobertura abrangente e benefícios exclusivos."
        breadcrumbs={[{ label: "Plano de Assistência", href: "/plano" }]}
      />

      {/* Plan Details */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <ScrollReveal>
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">Plano Familiar</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground leading-tight">
                Proteção e tranquilidade para toda a família
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                Nosso plano oferece cobertura completa e benefícios exclusivos,
                garantindo que sua família esteja sempre amparada com dignidade e segurança.
                Com um único plano, você tem acesso a serviços funerários, assistência médica
                e muito mais.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contato"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
                >
                  Contratar Plano <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="https://wa.me/5514997792932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border-2 border-border text-foreground font-semibold hover:bg-muted transition-colors"
                >
                  Solicitar Proposta
                </a>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-6">O que está incluído</h3>
                <div className="space-y-4">
                  {included.map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-muted/30">
        <div className="section-container max-w-3xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-gold uppercase tracking-widest">Dúvidas?</span>
              <h2 className="mt-3 text-2xl md:text-3xl font-bold text-foreground">
                Perguntas Frequentes
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <CollapseGroup>
              {faqs.map((faq, i) => (
                <Collapse key={i} title={faq.q}>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </Collapse>
              ))}
            </CollapseGroup>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Ainda tem dúvidas? Fale conosco!</p>
              <Link
                to="/contato"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-navy text-primary-foreground font-semibold hover-lift"
              >
                Entre em Contato <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
