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
  const navy = "hsl(216, 50%, 16%)";
  const textMain = "hsl(40, 30%, 95%)";
  const textMuted = "rgba(245, 240, 230, 0.6)";
  const textFaint = "rgba(245, 240, 230, 0.4)";
  const dividerColor = "rgba(255, 255, 255, 0.1)";

  return (
    <div
      style={{
        backgroundColor: navy,
        padding: "3rem 0",
        borderWidth: 0,
        borderStyle: "none",
        outlineWidth: 0,
        position: "relative",
        zIndex: 5,
        overflow: "hidden",
      }}
    >
      <div className="section-container">
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          {/* Logo & Description */}
          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <img
              src={logoFunsa}
              alt="FUNSA"
              style={{
                height: 48,
                width: "auto",
                marginBottom: 16,
                filter: "brightness(0) invert(1)",
                display: "block",
              }}
            />
            <p style={{ fontSize: 14, color: textMuted, lineHeight: 1.6 }}>
              Funerária Nossa Senhora Aparecida. Desde 1943 cuidando de quem você ama.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ flex: "1 1 180px", minWidth: 160 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: textMain, marginBottom: 12 }}>
              Links Rápidos
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  style={{ fontSize: 14, color: textMuted, textDecoration: "none" }}
                  className="hover:!text-primary-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: textMain, marginBottom: 12 }}>
              Contato
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a
                href="tel:1437320202"
                style={{ fontSize: 14, color: textMuted, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
                className="hover:!text-primary-foreground transition-colors"
              >
                <Phone size={16} /> (14) 3732-0202
              </a>
              <a
                href="https://wa.me/5514997792932"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 14, color: textMuted, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
                className="hover:!text-primary-foreground transition-colors"
              >
                <Phone size={16} /> (14) 99779-2932
              </a>
              <a
                href="mailto:contato@funsaavare.com.br"
                style={{ fontSize: 14, color: textMuted, textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
                className="hover:!text-primary-foreground transition-colors"
              >
                <Mail size={16} /> contato@funsaavare.com.br
              </a>
            </div>
          </div>

          {/* Address */}
          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: textMain, marginBottom: 12 }}>
              Endereço
            </h4>
            <div style={{ fontSize: 14, color: textMuted, display: "flex", alignItems: "flex-start", gap: 8 }}>
              <MapPin size={16} style={{ marginTop: 2, flexShrink: 0 }} />
              <span>Rua Piauí, 1.467 – Centro, Avaré/SP</span>
            </div>
          </div>
        </div>

        {/* Divider - using a div with height instead of border */}
        <div
          style={{
            height: 1,
            backgroundColor: dividerColor,
            marginBottom: 0,
          }}
          aria-hidden="true"
        />

        {/* Copyright */}
        <p
          style={{
            paddingTop: 32,
            textAlign: "center",
            fontSize: 14,
            color: textFaint,
            margin: 0,
          }}
        >
          © {new Date().getFullYear()} FUNSA – Funerária Nossa Senhora Aparecida. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
