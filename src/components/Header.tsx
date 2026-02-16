import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logoFunsa from "@/assets/logo-funsa.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Funerária", href: "/funeraria" },
  { label: "Planos", href: "/plano" },
  { label: "Prev Saúde", href: "/prevsaude" },
  { label: "Clube + FUNSA", href: "/clube" },
  { label: "Falecimentos", href: "/falecidos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const isHome = location.pathname === "/";
  const isTransparent = !scrolled && isHome;
  const headerBg = isTransparent
    ? "bg-transparent"
    : "bg-card/90 backdrop-blur-xl shadow-lg border-b border-border/50";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logoFunsa}
            alt="FUNSA – Funerária Nossa Senhora Aparecida"
            className={`h-10 md:h-12 w-auto transition-all duration-300 ${isTransparent ? "brightness-0 invert" : ""}`}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1" style={{ fontFamily: "'Sora', sans-serif" }}>
          {navLinks.map((l) => (
            <Link
              key={l.href}
              to={l.href}
              className={`px-2.5 py-2 text-[13px] transition-colors rounded-lg hover:bg-white/10 whitespace-nowrap ${
                location.pathname === l.href
                  ? isTransparent ? "text-white font-medium" : "text-primary font-medium"
                  : isTransparent ? "text-white/80 hover:text-white font-light" : "text-foreground/80 hover:text-primary font-light"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <a
              href="https://www.instagram.com/clubefunsa/"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${isTransparent ? "text-white/70 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com/funsaavare"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${isTransparent ? "text-white/70 hover:text-white hover:bg-white/10" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
          <a
            href="tel:1437320202"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full gradient-navy text-primary-foreground text-sm font-medium hover-lift"
          >
            <Phone className="w-4 h-4" />
            (14) 3732-0202
          </a>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/50"
          >
            <nav className="section-container py-4 flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    location.pathname === l.href
                      ? "text-primary bg-primary/5 font-semibold"
                      : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="tel:1437320202"
                className="mt-2 flex items-center justify-center gap-2 px-4 py-3 rounded-full gradient-navy text-primary-foreground text-sm font-medium"
              >
                <Phone className="w-4 h-4" />
                (14) 3732-0202
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
