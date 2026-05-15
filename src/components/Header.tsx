'use client';

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, Instagram, Facebook } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSite, SiteConfig } from "@/components/SiteProvider";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Quem Somos", href: "/quem-somos" },
  { label: "Funerária", href: "/funeraria" },
  { label: "Planos", href: "/plano" },
  { label: "PrevSaúde", href: "/prevsaude" },
  { label: "Clube + FUNSA", href: "/clube" },
  { label: "Área do Cliente", href: "https://apps.mssistemas.com.br/areacliente.php/?codigo=136" },
  { label: "Falecimentos", href: "/falecidos" },
  { label: "Blog", href: "/blog" },
  { label: "Contato", href: "/contato" },
];

export default function Header() {
  const { config } = useSite() as { config: SiteConfig | null; loading: boolean };
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isHome = pathname === "/";
  const isTransparent = !scrolled && isHome;
  const headerBg = isTransparent
    ? "bg-transparent"
    : "bg-card/90 backdrop-blur-xl shadow-lg border-b border-border/50";

  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${headerBg}`}>
      <div className="section-container flex items-center justify-between h-16 md:h-20">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <Image
            src={isTransparent ? "/assets/logo-branco.png" : "/assets/logo-cor.png"}
            alt={config?.site_name || "Funsa Funerária"}
            width={200}
            height={80}
            className="h-14 md:h-20 w-auto transition-all duration-500 group-hover:scale-105"
            priority
          />
        </Link>

        <nav 
          className="hidden xl:flex items-center gap-1 font-inter relative"
          onMouseLeave={() => setHoveredPath(null)}
        >
          {navLinks.map((l) => {
            const isExternal = l.href.startsWith("http");
            const isActive = pathname === l.href;
            
            const content = (
              <div
                onMouseEnter={() => setHoveredPath(l.href)}
                className={`relative px-3 py-2 text-[13px] xl:text-[14px] uppercase tracking-tight transition-all duration-300 rounded-full whitespace-nowrap z-10 ${
                  isActive
                    ? isTransparent ? "text-white font-bold" : "text-primary font-bold"
                    : isTransparent ? "text-white/70 hover:text-white font-medium" : "text-foreground/70 hover:text-primary font-medium"
                }`}
              >
                {l.label}
                
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-1 left-2 right-2 h-0.5 rounded-full ${
                      isTransparent ? "bg-white" : "bg-primary"
                    }`}
                  />
                )}

                <AnimatePresence>
                  {hoveredPath === l.href && (
                    <motion.div
                      layoutId="hoverBackground"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                      className={`absolute inset-0 rounded-full -z-10 ${
                        isTransparent ? "bg-white/15" : "bg-primary/5"
                      }`}
                    />
                  )}
                </AnimatePresence>
              </div>
            );

            if (isExternal) {
              return (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return (
              <Link key={l.href} href={l.href}>
                {content}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 xl:gap-4">
          <div className="hidden xl:flex items-center gap-1">
            {config?.instagram && (
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 ${isTransparent ? "text-white/70 hover:text-white hover:bg-white/15" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            )}
            {config?.facebook && (
              <a
                href={config.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1.5 rounded-full transition-all duration-300 hover:scale-110 ${isTransparent ? "text-white/70 hover:text-white hover:bg-white/15" : "text-muted-foreground hover:text-primary hover:bg-primary/5"}`}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2.5 rounded-full hover:bg-muted transition-all active:scale-90"
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/50 overflow-hidden"
          >
            <nav className="section-container py-6 flex flex-col gap-1 font-inter">
              {navLinks.map((l, i) => {
                const isExternal = l.href.startsWith("http");
                const isActive = pathname === l.href;
                
                const itemVariants = {
                  hidden: { opacity: 0, x: -20 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { delay: i * 0.05 } 
                  }
                };

                const content = (
                  <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className={`px-4 py-3 text-base font-medium rounded-xl transition-all active:scale-95 ${
                      isActive
                        ? "text-primary bg-primary/10 font-bold"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    {l.label}
                  </motion.div>
                );

                if (isExternal) {
                  return (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {content}
                    </a>
                  );
                }

                return (
                  <Link key={l.href} href={l.href}>
                    {content}
                  </Link>
                );
              })}
              
              {config?.telefone && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <a
                    href={`tel:${config.telefone.replace(/\D/g, '')}`}
                    className="mt-4 flex items-center justify-center gap-3 px-4 py-4 rounded-2xl bg-primary text-primary-foreground text-base font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
                  >
                    <Phone className="w-5 h-5" />
                    {config.telefone}
                  </a>
                </motion.div>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
