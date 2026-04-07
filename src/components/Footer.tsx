import { Link } from "react-router-dom";
import logoBranco from "@/assets/logo-branco.png";

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
              src={logoBranco}
              alt="Funsa Funerária"
              style={{ height: 48, width: "auto", marginBottom: 16, display: "block", border: "none" }}
            />
            <p style={{ fontSize: 14, color: "rgba(230,240,255,0.6)", lineHeight: 1.6, margin: 0 }}>
              Funerária Nossa Senhora Aparecida. Desde 1943 cuidando de quem você ama.
            </p>
          </div>

          <div style={{ flex: "1 1 180px", minWidth: 160 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(210,20%,98%)", marginBottom: 12, marginTop: 0 }}>
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
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(210,20%,98%)", marginBottom: 12, marginTop: 0 }}>
              Contato
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <a href="tel:1437320202" style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }} className="hover:!text-primary-foreground transition-colors">
                <IconSpan>📞</IconSpan> (14) 3732-0202
              </a>
              <a href="https://wa.me/5514997792932" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }} className="hover:!text-primary-foreground transition-colors">
                <IconSpan>📞</IconSpan> (14) 99779-2932
              </a>
              <a href="mailto:contato@funsaavare.com.br" style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }} className="hover:!text-primary-foreground transition-colors">
                <IconSpan>✉️</IconSpan> contato@funsaavare.com.br
              </a>
            </div>
          </div>

          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(210,20%,98%)", marginBottom: 12, marginTop: 0 }}>
              Endereço
            </h4>
            <div style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", display: "flex", alignItems: "flex-start", gap: 8 }}>
              <IconSpan>📍</IconSpan>
              <span>Rua Piauí, 1.467 – Centro, Avaré/SP</span>
            </div>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} aria-hidden="true" />

        <div style={{ paddingTop: 24, display: "flex", justifyContent: "center", gap: 16 }}>
          <a
            href="https://www.instagram.com/clubefunsa/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(230,240,255,0.5)", transition: "color 0.2s" }}
            className="hover:!text-primary-foreground"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <a
            href="https://www.facebook.com/funsaavare"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(230,240,255,0.5)", transition: "color 0.2s" }}
            className="hover:!text-primary-foreground"
            aria-label="Facebook"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>

        <p style={{ paddingTop: 16, textAlign: "center", fontSize: 14, color: "rgba(230,240,255,0.4)", margin: 0 }}>
          © {new Date().getFullYear()} FUNSA – Funerária Nossa Senhora Aparecida. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
