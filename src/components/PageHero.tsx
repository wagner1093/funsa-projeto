import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface Props {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href: string }[];
}

export default function PageHero({ title, subtitle, breadcrumbs }: Props) {
  return (
    <section className="relative gradient-navy pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--gold)/0.15),transparent_60%)]" />
      </div>
      <div className="section-container relative z-10">
        {breadcrumbs && (
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-1 text-sm text-primary-foreground/50 mb-6"
          >
            <Link to="/" className="hover:text-primary-foreground/80 transition-colors">Home</Link>
            {breadcrumbs.map((b) => (
              <span key={b.label} className="flex items-center gap-1">
                <ChevronRight className="w-3.5 h-3.5" />
                <Link to={b.href} className="hover:text-primary-foreground/80 transition-colors">{b.label}</Link>
              </span>
            ))}
          </motion.nav>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-lg md:text-xl text-primary-foreground/70 max-w-2xl leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}
