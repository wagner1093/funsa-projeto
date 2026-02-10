import { Link } from "react-router-dom";
import logoFunsa from "@/assets/logo-funsa.png";

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
          {/* Column 1: Logo + text only */}
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

          {/* Column 2: Plain text links only (no Link component, no icons) */}
          <div style={{ flex: "1 1 180px", minWidth: 160 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(40,30%,95%)", marginBottom: 12, marginTop: 0 }}>
              Links Rápidos
            </h4>
            <p style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", margin: "4px 0" }}>Home</p>
            <p style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", margin: "4px 0" }}>Quem Somos</p>
            <p style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", margin: "4px 0" }}>Nossos Serviços</p>
          </div>

          {/* Column 3: Plain text only (no icons) */}
          <div style={{ flex: "1 1 220px", minWidth: 200 }}>
            <h4 style={{ fontSize: 14, fontWeight: 600, color: "hsl(40,30%,95%)", marginBottom: 12, marginTop: 0 }}>
              Contato
            </h4>
            <p style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", margin: "4px 0" }}>(14) 3732-0202</p>
            <p style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", margin: "4px 0" }}>(14) 99779-2932</p>
            <p style={{ fontSize: 14, color: "rgba(245,240,230,0.6)", margin: "4px 0" }}>contato@funsaavare.com.br</p>
          </div>
        </div>

        <div style={{ height: 1, backgroundColor: "rgba(255,255,255,0.1)" }} aria-hidden="true" />
        <p style={{ paddingTop: 32, textAlign: "center", fontSize: 14, color: "rgba(245,240,230,0.4)", margin: 0 }}>
          © 2026 FUNSA – Funerária Nossa Senhora Aparecida. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
