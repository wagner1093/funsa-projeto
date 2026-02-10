import { Link } from "react-router-dom";
import logoFunsa from "@/assets/logo-funsa.png";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossos Serviços", href: "/servicos" },
  { label: "Plano de Assistência", href: "/plano" },
  { label: "Contato", href: "/contato" },
];

const IconSpan = ({ children }: { children: string }) => (
  <span style={{ flexShrink: 0, fontSize: 14, lineHeight: 1, width: 16, textAlign: "center" as const }}>{children}</span>
);

export default function Footer() {
  return (
    <div
      style={{
        backgroundColor: "hsl(216, 50%, 16%)",
        padding: "3rem 0",
        borderWidth: 0,
        borderStyle: "none",
        position: "relative",
        zIndex: 10,
        overflow: "hidden",
      }}
    >
      <div className="section-container">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <img
              src={logoFunsa}
              alt="FUNSA"
              style={{ height: 48, width: "auto", marginBottom: 16, filter: "brightness(0) invert(1)", display: "block", border: "none" }}
            />
            <p style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", lineHeight: 1.6, margin: 0 }}>
              Funerária Nossa Senhora Aparecida. Desde 1943 cuidando de quem você ama.
            </p>
          </div>

          <div style={{ flex: "1 1 180px", minWidth: 160 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(40,30%,95%)", marginBottom: 12, marginTop: 0 }}>
              Links Rápidos
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {quickLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", textDecoration: "none" }}
                  className="hover:!text-primary-foreground transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(40,30%,95%)", marginBottom: 12, marginTop: 0 }}>
              Contato
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="tel:1437320202" style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }} className="hover:!text-primary-foreground transition-colors">
                <PhoneIcon /> (14) 3732-0202
              </a>
              <a href="https://wa.me/5514997792932" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }} className="hover:!text-primary-foreground transition-colors">
                <PhoneIcon /> (14) 99779-2932
              </a>
              <a href="mailto:contato@funsaavare.com.br" style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }} className="hover:!text-primary-foreground transition-colors">
                <MailIcon /> contato@funsaavare.com.br
              </a>
            </div>
          </div>

          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(40,30%,95%)", marginBottom: 12, marginTop: 0 }}>
              Endereço
            </h4>
            <div style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <PinIcon />
              <span>Rua Piauí, 1.467 – Centro, Avaré/SP</span>
            </div>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} aria-hidden="true" />

        <p style={{ paddingTop: 32, textAlign: "center", fontSize: 14, color: "rgba(245,240,230,0.4)", margin: 0 }}>
          © {new Date().getFullYear()} FUNSA – Funerária Nossa Senhora Aparecida. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
