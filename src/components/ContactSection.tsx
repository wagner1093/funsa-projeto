import ScrollReveal from "./ScrollReveal";
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contato" className="section-padding bg-background">
      <div className="section-container">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">Contato</span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
              Estamos aqui para ajudar
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Atendimento humanizado 24 horas. Entre em contato conosco.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: MessageCircle, label: "WhatsApp", value: "(14) 99779-2932", href: "https://wa.me/5514997792932", color: "gradient-gold" },
            { icon: Phone, label: "Telefone", value: "(14) 3732-0202", href: "tel:1437320202", color: "gradient-navy" },
            { icon: Mail, label: "E-mail", value: "contato@funsaavare.com.br", href: "mailto:contato@funsaavare.com.br", color: "gradient-navy" },
            { icon: Clock, label: "Horário", value: "Atendimento 24h", href: "#", color: "gradient-navy" },
          ].map((c, i) => (
            <ScrollReveal key={c.label} delay={i * 0.1}>
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="block p-6 rounded-2xl bg-card border border-border/50 hover-lift text-center group"
              >
                <div className={`w-14 h-14 rounded-2xl ${c.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                  <c.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{c.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground break-all">{c.value}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>

        {/* CTA + Map */}
        <ScrollReveal>
          <div className="gradient-navy rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              <div className="p-10 md:p-14 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground">
                  Precisa de atendimento imediato?
                </h3>
                <p className="mt-4 text-primary-foreground/70 leading-relaxed">
                  Nossa equipe está disponível 24 horas por dia, 7 dias por semana, 
                  pronta para oferecer todo o suporte que sua família precisa.
                </p>
                <div className="mt-6 flex items-center gap-2 text-primary-foreground/60">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">Rua Piauí, 1.467 – Centro, Avaré/SP</span>
                </div>
                <a
                  href="https://wa.me/5514997792932"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift self-start"
                >
                  Fale pelo WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="h-64 lg:h-auto min-h-[300px]">
                <iframe
                  title="Localização FUNSA"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.5!2d-48.925!3d-23.098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA1JzUyLjgiUyA0OMKwNTUnMzAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
