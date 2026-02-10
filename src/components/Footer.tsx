import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoFunsa from "@/assets/logo-funsa.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossos Serviços", href: "/servicos" },
  { label: "Plano de Assistência", href: "/plano" },
  { label: "Contato", href: "/contato" },
];

export default function Footer() {
  return (
    <footer className="bg-primary py-12 border-0 [&_*]:border-0 [&_.footer-divider]:border-t [&_.footer-divider]:border-primary-foreground/10">
      <div className="section-container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img src={logoFunsa} alt="FUNSA" className="h-12 w-auto mb-4 border-0" />
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              Funerária Nossa Senhora Aparecida. Desde 1943 cuidando de quem você ama.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3">Links Rápidos</h4>
            <div className="space-y-2">
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="block text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3">Contato</h4>
            <div className="space-y-2 text-sm text-primary-foreground/60">
              <a href="tel:1437320202" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" /> (14) 3732-0202
              </a>
              <a href="https://wa.me/5514997792932" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Phone className="w-4 h-4" /> (14) 99779-2932
              </a>
              <a href="mailto:contato@funsaavare.com.br" className="flex items-center gap-2 hover:text-primary-foreground transition-colors">
                <Mail className="w-4 h-4" /> contato@funsaavare.com.br
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-primary-foreground mb-3">Endereço</h4>
            <div className="flex items-start gap-2 text-sm text-primary-foreground/60">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>Rua Piauí, 1.467 – Centro, Avaré/SP</span>
            </div>
          </div>
        </div>
        <div className="footer-divider pt-8 text-center text-sm text-primary-foreground/40">
          © {new Date().getFullYear()} FUNSA – Funerária Nossa Senhora Aparecida. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
