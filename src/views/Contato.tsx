'use client';
import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, MessageCircle, Mail, MapPin, Clock, ArrowRight, Send, Facebook, Instagram } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  phone: z.string().trim().min(1, "Telefone é obrigatório").max(20),
  subject: z.string().trim().min(1, "Assunto é obrigatório").max(200),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(1000),
  honeypot: z.string().max(0).optional(), // Honeypot validation (must be empty)
});

type FormData = z.infer<typeof contactSchema>;

export default function Contato() {
  const [form, setForm] = useState<FormData>({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rateLimitError, setRateLimitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRateLimitError("");

    // Rate Limiting Simples baseado no localStorage
    const lastSubmitTime = localStorage.getItem('last_lead_submit');
    if (lastSubmitTime) {
      const timeDiff = Date.now() - parseInt(lastSubmitTime);
      if (timeDiff < 60000) { // 1 minuto de cooldown
        setRateLimitError("Por favor, aguarde um momento antes de enviar outra mensagem.");
        return;
      }
    }

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

    // Se o honeypot estiver preenchido, rejeita silenciosamente (spam bot)
    if (result.data.honeypot && result.data.honeypot.length > 0) {
      setSubmitted(true);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      // Inserir no Supabase
      const { error } = await supabase.from('funsa_leads').insert({
        nome: result.data.name,
        email: result.data.email,
        telefone: result.data.phone,
        mensagem: `Assunto: ${result.data.subject} | Mensagem: ${result.data.message}`,
        status: 'novo'
      });

      if (error) {
        console.error("Erro ao salvar o lead:", error);
        setRateLimitError("Ocorreu um erro ao enviar sua mensagem. Tente novamente.");
        return;
      }

      localStorage.setItem('last_lead_submit', Date.now().toString());
      
      const msg = encodeURIComponent(`Olá! Meu nome é ${result.data.name}. Assunto: ${result.data.subject}. ${result.data.message}`);
      window.open(`https://wa.me/5514997792932?text=${msg}`, "_blank");
      
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setRateLimitError("Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-azure/50 focus:border-azure transition-colors";

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
              { icon: MessageCircle, label: "WhatsApp", value: "(14) 99779-2932", href: "https://wa.me/5514997792932", color: "bg-azure" },
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
                <h2 className="text-xl font-bold text-foreground mb-6">Envie sua mensagem</h2>
                
                {rateLimitError && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
                    {rateLimitError}
                  </div>
                )}

                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-azure flex items-center justify-center mx-auto mb-4">
                      <Send className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Mensagem enviada!</h3>
                    <p className="mt-2 text-muted-foreground">Você foi redirecionado para o WhatsApp. Obrigado pelo contato!</p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", subject: "", message: "", honeypot: "" }); }}
                      className="mt-6 text-sm font-semibold text-azure hover:underline"
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot Field - Oculto para usuários reais */}
                    <div className="hidden" aria-hidden="true">
                      <input 
                        type="text" 
                        name="a_password" 
                        tabIndex={-1} 
                        autoComplete="off" 
                        value={form.honeypot} 
                        onChange={(e) => setForm({ ...form, honeypot: e.target.value })} 
                      />
                    </div>

                    <div>
                      <input type="text" placeholder="Nome completo" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={isSubmitting} />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <input type="email" placeholder="E-mail" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={isSubmitting} />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                      </div>
                      <div>
                        <input type="tel" placeholder="Telefone" className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} disabled={isSubmitting} />
                        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                      </div>
                    </div>
                    <div>
                      <input type="text" placeholder="Assunto" className={inputClass} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} disabled={isSubmitting} />
                      {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
                    </div>
                    <div>
                      <textarea placeholder="Sua mensagem" rows={4} className={inputClass + " resize-none"} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} disabled={isSubmitting} />
                      {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary-light disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Enviando..." : <><Send className="w-4 h-4 mr-2" /> Enviar Mensagem</>}
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                {/* Address */}
                <div className="p-8 rounded-2xl bg-card border border-border/50">
                  <h3 className="text-xl font-bold text-foreground mb-4">Endereço</h3>
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-azure" />
                    <div>
                      <p>Rua Piauí, 1.467 – Centro</p>
                      <p>Avaré/SP</p>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-azure/20 transition-colors">
                      <Facebook className="w-5 h-5 text-muted-foreground" />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-azure/20 transition-colors">
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


