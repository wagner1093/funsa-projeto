import ScrollReveal from "./ScrollReveal";
import { ArrowRight, Heart, Cross, MapPin } from "lucide-react";
import memorialImg from "@/assets/memorial.jpg";

export default function MemorialSection() {
  return (
    <section className="section-padding bg-muted/20 overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <ScrollReveal delay={0.2} className="order-2 lg:order-1">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-azure/20 to-transparent rounded-[2rem] blur-2xl group-hover:bg-azure/30 transition-all duration-700" />
              <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                <img
                  src={memorialImg}
                  alt="Memorial Pôr do Sol"
                  className="w-full h-full object-cover aspect-[4/5] lg:aspect-square group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-60" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 lg:right-10 p-6 glass-card border-azure/20 shadow-azure/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-azure/10 flex items-center justify-center group-hover:bg-azure group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-azure/20">
                    <Cross className="w-6 h-6 text-azure group-hover:text-white transition-colors duration-500" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-azure uppercase tracking-wider">Novo Conceito</p>
                    <p className="text-lg font-bold text-foreground">Inovação e Paz</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Text Side */}
          <ScrollReveal className="order-1 lg:order-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-azure/10 border border-azure/20">
                <span className="w-2 h-2 rounded-full bg-azure animate-pulse" />
                <span className="text-xs font-bold text-azure uppercase tracking-wider">Grupo FUNSA</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Memorial <span className="text-azure">Pôr do Sol</span>
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed italic">
                “Conheça o Memorial Pôr do Sol, um espaço pensado para acolher, respeitar e eternizar histórias. Um novo conceito que faz parte do Grupo FUNSA.”
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-azure/10 flex items-center justify-center shrink-0">
                    <Heart className="w-3.5 h-3.5 text-azure" />
                  </div>
                  <p className="text-muted-foreground">Ambiente planejado para oferecer conforto e serenidade nos momentos de despedida.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-azure/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-azure" />
                  </div>
                  <p className="text-muted-foreground">Localização privilegiada com infraestrutura moderna e acolhedora.</p>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="https://pordosol-wwg.lovable.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-light group inline-flex"
                >
                  Conhecer o Espaço
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
