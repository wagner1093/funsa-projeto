'use client';

import Link from "next/link";
import { useSite } from "@/components/SiteProvider";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossos Serviços", href: "/servicos" },
  { label: "Plano de Assistência", href: "/plano" },
  { label: "Contato", href: "/contato" },
];

export default function Footer() {
  const { config } = useSite();

  return (
    <footer
      style={{
        backgroundColor: "hsl(216, 50%, 12%)",
        padding: "4rem 0 2rem",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="flex flex-col gap-6">
            <Link href="/" className="inline-block transition-transform hover:scale-105">
              <img
                src="/assets/logo-branco.png"
                alt="Funsa Funerária"
                className="h-20 w-auto object-contain"
                style={{ maxWidth: "240px" }}
              />
            </Link>
          </div>

          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 24, marginTop: 0 }}>
              Links Rápidos
            </h4>
            <div className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="text-[15px] text-white/60 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 24, marginTop: 0 }}>
              Contato
            </h4>
            <div className="flex flex-col gap-4">
              {config?.telefone && (
                <a href={`tel:${config.telefone.replace(/\D/g, '')}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Telefone</span>
                    <span className="text-[15px] font-medium">{config.telefone}</span>
                  </div>
                </a>
              )}
              {config?.whatsapp && (
                <a href={`https://wa.me/55${config.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/60 hover:text-white transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 group-hover:text-green-400 transition-all">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">WhatsApp</span>
                    <span className="text-[15px] font-medium">{config.whatsapp}</span>
                  </div>
                </a>
              )}
              {config?.email && (
                <a href={`mailto:${config.email}`} className="flex items-center gap-3 text-white/60 hover:text-white transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">E-mail</span>
                    <span className="text-[15px] font-medium">{config.email}</span>
                  </div>
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 16, fontWeight: 700, color: "white", marginBottom: 24, marginTop: 0 }}>
              Endereço
            </h4>
            <div className="flex items-start gap-3 text-white/60 group">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-all shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-wider text-white/40 font-bold">Localização</span>
                <span className="text-[15px] leading-relaxed">
                  {config?.endereco || 'Rua Piauí, 1.467 – Centro, Avaré/SP'}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.05)", margin: "32px 0" }} aria-hidden="true" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-4">
          <div className="flex items-center gap-4">
            {config?.instagram_url && (
              <a href={config.instagram_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            )}
            {config?.facebook_url && (
              <a href={config.facebook_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white transition-all" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
            )}
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p style={{ fontSize: 14, color: "rgba(230,240,255,0.4)", margin: 0, textAlign: "center" }}>
              © {new Date().getFullYear()} {config?.site_name || 'FUNSA – Funerária Nossa Senhora Aparecida'}. Todos os direitos reservados.
            </p>
            <p style={{ fontSize: 12, color: "rgba(230,240,255,0.2)", margin: 0, textAlign: "center" }}>
              Funerais Nossa Senhora Aparecida Ltda - 45.556.511/0001-22
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
