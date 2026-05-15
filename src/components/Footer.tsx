'use client';

import Link from "next/link";
import { useSite, SiteConfig } from "@/components/SiteProvider";
import { Phone, Mail, MapPin, Instagram, Facebook, MessageCircle, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const quickLinks = [
  { label: "Início", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossos Serviços", href: "/servicos" },
  { label: "Plano de Assistência", href: "/plano" },
  { label: "Contato", href: "/contato" },
];

export default function Footer() {
  const { config } = useSite() as { config: SiteConfig | null; loading: boolean };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#162d4a] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand Column */}
          <div className="flex flex-col gap-8">
            <Link href="/" className="inline-block group">
              <img
                src="/assets/logo-branco.png"
                alt="Funsa Funerária"
                className="h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Há mais de 30 anos oferecendo acolhimento, respeito e dignidade nos momentos mais difíceis da vida.
            </p>
            <div className="flex items-center gap-3">
              {config?.instagram && (
                <a 
                  href={config.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white hover:border-transparent transition-all duration-300"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {config?.facebook && (
                <a 
                  href={config.facebook} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#1877F2] hover:text-white hover:border-transparent transition-all duration-300"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Navegação
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full" />
            </h4>
            <ul className="flex flex-col gap-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-primary transition-colors flex items-center gap-2 group text-[15px]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Contato
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full" />
            </h4>
            <div className="flex flex-col gap-6">
              {config?.telefone && (
                <a href={`tel:${config.telefone.replace(/\D/g, '')}`} className="flex items-center gap-4 text-white/60 hover:text-white transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-lg border border-white/5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.1em] text-white/30 font-bold">Telefone 24h</span>
                    <span className="text-base font-semibold">{config.telefone}</span>
                  </div>
                </a>
              )}
              {config?.whatsapp && (
                <a href={`https://wa.me/55${config.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-white/60 hover:text-white transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all shadow-lg border border-white/5">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.1em] text-white/30 font-bold">WhatsApp</span>
                    <span className="text-base font-semibold">{config.whatsapp}</span>
                  </div>
                </a>
              )}
              {config?.email && (
                <a href={`mailto:${config.email}`} className="flex items-center gap-4 text-white/60 hover:text-white transition-all group">
                  <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-lg border border-white/5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] uppercase tracking-[0.1em] text-white/30 font-bold">E-mail</span>
                    <span className="text-base font-semibold truncate max-w-[180px]">{config.email}</span>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Location Column */}
          <div>
            <h4 className="text-white font-bold text-lg mb-8 relative inline-block">
              Endereço
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-primary rounded-full" />
            </h4>
            <div className="flex items-start gap-4 text-white/60 group">
              <div className="w-11 h-11 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-lg border border-white/5 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-[0.1em] text-white/30 font-bold">Localização</span>
                <address className="text-[15px] leading-relaxed not-italic">
                  {config?.endereco || 'Rua Piauí, 1.467 – Centro, Avaré/SP'}
                </address>
              </div>
            </div>
            
            <button 
              onClick={scrollToTop}
              className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-white transition-colors group"
            >
              Voltar ao topo 
              <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-10" />

        {/* Footer Bottom */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-center lg:text-left">
          <div className="flex flex-col gap-1">
            <p className="text-white/40 text-[13px]">
              &copy; {new Date().getFullYear()} <span className="text-white/60 font-medium">{config?.site_name || 'FUNSA – Funerária Nossa Senhora Aparecida'}</span>. Todos os direitos reservados.
            </p>
            <p className="text-white/20 text-[11px] font-medium tracking-wider uppercase">
              Funerais Nossa Senhora Aparecida Ltda — CNPJ: 45.556.511/0001-22
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-[11px] text-white/20">
              Desenvolvido por <span className="text-white/40 font-bold">FUNSA</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
