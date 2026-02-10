import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Nossos Serviços", href: "/servicos" },
  { label: "Benefícios", href: "/beneficios" },
  { label: "Plano de Assistência", href: "/plano" },
  { label: "Aplicativo FUNSA", href: "/aplicativo" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "shadow-[0_4px_30px_rgba(0,0,0,0.08)]"
          : "shadow-none"
      }`}
      style={{
        backgroundColor: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.2)",
        backgroundImage:
          "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.08) 100%)",
      }}
    >
      <div className="section-container flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo - Left */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <span
            className="text-xl md:text-2xl font-bold tracking-tight"
            style={{ color: "#2C3E50", fontFamily: "'Montserrat', sans-serif" }}
          >
            FUNSA
          </span>
          <span
            className="hidden sm:inline text-[10px] leading-tight max-w-[130px]"
            style={{ color: "#2C3E50", opacity: 0.7, fontFamily: "'Inter', sans-serif" }}
          >
            Funerária Nossa Senhora Aparecida
          </span>
        </Link>

        {/* Nav - Center */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((l) => {
            const isActive = location.pathname === l.href;
            return (
              <Link
                key={l.href}
                to={l.href}
                className="group relative px-3 xl:px-4 py-2 text-sm font-medium transition-colors duration-300"
                style={{
                  color: isActive ? "#007BFF" : "#2C3E50",
                  fontFamily: "'Inter', sans-serif",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "#007BFF";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLElement).style.color = "#2C3E50";
                }}
              >
                {l.label}
                {/* Underline hover */}
                <span
                  className={`absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full transition-transform duration-300 origin-left ${
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  }`}
                  style={{ backgroundColor: "#007BFF" }}
                />
              </Link>
            );
          })}
        </nav>

        {/* CTAs + Hamburger - Right */}
        <div className="flex items-center gap-3">
          {/* CTA Secundário - Outline */}
          <Link
            to="/contato"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border-2 hover:scale-[1.02]"
            style={{
              borderColor: "#007BFF",
              color: "#007BFF",
              fontFamily: "'Inter', sans-serif",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "#007BFF";
              el.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.backgroundColor = "transparent";
              el.style.color = "#007BFF";
            }}
          >
            Fale Conosco
          </Link>

          {/* CTA Principal - Preenchido */}
          <Link
            to="/plano"
            className="hidden md:inline-flex items-center px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: "#007BFF",
              color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 4px 14px rgba(0,123,255,0.3)",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 6px 20px rgba(0,123,255,0.45)";
              el.style.backgroundColor = "#0069d9";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.boxShadow = "0 4px 14px rgba(0,123,255,0.3)";
              el.style.backgroundColor = "#007BFF";
            }}
          >
            Contratar Plano
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg transition-colors duration-300"
            style={{ color: "#2C3E50" }}
            aria-label="Menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-6 h-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-6 h-6" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full overlay glass */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-16 z-40"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            <motion.nav
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="flex flex-col items-center justify-center gap-2 pt-12 px-6"
            >
              {navLinks.map((l, i) => {
                const isActive = location.pathname === l.href;
                return (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 * i, duration: 0.3 }}
                    className="w-full max-w-xs"
                  >
                    <Link
                      to={l.href}
                      className="block text-center py-3.5 px-4 rounded-xl text-base font-medium transition-all duration-300"
                      style={{
                        color: isActive ? "#007BFF" : "#2C3E50",
                        fontFamily: "'Inter', sans-serif",
                        backgroundColor: isActive
                          ? "rgba(0,123,255,0.08)"
                          : "transparent",
                      }}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Mobile CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * navLinks.length, duration: 0.3 }}
                className="flex flex-col gap-3 w-full max-w-xs mt-4"
              >
                <Link
                  to="/contato"
                  className="text-center py-3 px-6 rounded-full text-sm font-semibold border-2 transition-all duration-300"
                  style={{
                    borderColor: "#007BFF",
                    color: "#007BFF",
                    fontFamily: "'Inter', sans-serif",
                  }}
                >
                  Fale Conosco
                </Link>
                <Link
                  to="/plano"
                  className="text-center py-3 px-6 rounded-full text-sm font-semibold transition-all duration-300"
                  style={{
                    backgroundColor: "#007BFF",
                    color: "#FFFFFF",
                    fontFamily: "'Inter', sans-serif",
                    boxShadow: "0 4px 14px rgba(0,123,255,0.3)",
                  }}
                >
                  Contratar Plano
                </Link>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
