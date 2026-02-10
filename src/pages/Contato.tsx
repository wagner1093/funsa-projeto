import { useState } from "react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight, Send, Facebook, Instagram } from "lucide-react";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(1, "Telefone é obrigatório").max(20),
  subject: z.string().trim().min(1, "Assunto é obrigatório").max(200),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000),
});

type FormData = z.infer<typeof contactSchema>;

export default function Contato() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof FormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof FormData;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    const msg = encodeURIComponent(`Olá! Meu nome é ${result.data.name}. Assunto: ${result.data.subject}. ${result.data.message}`);
    window.open(`https://wa.me/5514997792932?text=${msg}`, "_blank");
    setSubmitted(true);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition-colors";

  return (
    <>
      <PageHero
        title="Contato"
        subtitle="Estamos aqui para ajudar 24 horas por dia. Entre em contato conosco da forma que preferir."
        breadcrumbs={[{ label: "Contato", href: "/contato" }]}
      />

      {/* Contact Cards */}
      <section className="section-padding bg-background">
        <div className="section-container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
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
                  className="block p-6 rounded-2xl bg-card border border-border/50 hover-lift text-center group h-full"
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

          {/* Form + Map */}
          <div className="grid lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="p-8 rounded-2xl bg-card border border-border/50">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-6">Envie sua mensagem</h2>
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full gradient-gold flex items-center justify-center mx-auto mb-4">
                      <Send className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-foreground">Mensagem enviada!</h3>
                    <p className="mt-2 text-muted-foreground">Você foi redirecionado para o WhatsApp. Obrigado pelo contato!</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "" }); }}
                      className="mt-6 text-sm font-semibold text-gold hover:underline"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <input type="text" placeholder="Nome completo" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input type="email" placeholder="E-mail" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                      </div>
                      <div>
                        <input type="tel" placeholder="Telefone" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <input type="text" placeholder="Assunto" className={inputClass} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                      {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                    </div>
                    <div>
                      <textarea placeholder="Sua mensagem" rows={4} className={inputClass + " resize-none"} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
                    >
                      Enviar Mensagem <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                {/* Address */}
                <div className="p-8 rounded-2xl bg-card border border-border/50">
                  <h3 className="text-xl font-serif font-bold text-foreground mb-4">Endereço</h3>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-gold" />
                    <div>
                      <p>Rua Piauí, 1.467 – Centro</p>
                      <p>Avaré/SP</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gold/20 transition-colors">
                      <Facebook className="w-5 h-5 text-muted-foreground" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-gold/20 transition-colors">
                      <Instagram className="w-5 h-5 text-muted-foreground" />
                    </a>
                  </div>
                </div>

                {/* Map */}
                <div className="rounded-2xl overflow-hidden border border-border/50 h-[350px]">
                  <iframe
                    title="Localização FUNSA"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3676.5!2d-48.925!3d-23.098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDA1JzUyLjgiUyA0OMKwNTUnMzAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
