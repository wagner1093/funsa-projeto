import ScrollReveal from "./ScrollReveal";
import Counter from "./Counter";
import teamImg from "@/assets/team.jpg";
import { Heart, Shield, Award, Users } from "lucide-react";

const values = [
  { icon: Heart, label: "Dignidade" },
  { icon: Shield, label: "Respeito" },
  { icon: Award, label: "Profissionalismo" },
  { icon: Users, label: "Humanidade" },
];

const stats = [
  { value: 80, suffix: "+", label: "Anos de tradição" },
  { value: 50, suffix: "mil+", label: "Famílias atendidas" },
  { value: 24, suffix: "h", label: "Atendimento" },
  { value: 100, suffix: "%", label: "Compromisso" },
];

export default function AboutSection() {
  return (
    <section id="quem-somos" className="section-padding bg-background">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <ScrollReveal>
            <span className="text-sm font-semibold text-gold uppercase tracking-widest">Quem Somos</span>
            <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Uma história de cuidado e respeito
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              Fundada em 1943, a FUNSA – Funerária Nossa Senhora Aparecida nasceu com o 
              propósito de oferecer segurança e tranquilidade em todos os momentos. Ao longo 
              de mais de oito décadas, nos tornamos referência em assistência familiar na região 
              de Avaré e em todo o estado de São Paulo.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Nossa missão é acolher cada família com dignidade, oferecendo 
              serviços completos e um atendimento verdadeiramente humanizado.
            </p>

            {/* Values */}
            <div className="mt-8 grid grid-cols-2 gap-4">
              {values.map((v) => (
                <div key={v.label} className="flex items-center gap-3 p-3 rounded-xl bg-muted/50">
                  <div className="w-10 h-10 rounded-lg gradient-navy flex items-center justify-center">
                    <v.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <span className="font-medium text-foreground">{v.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Image */}
          <ScrollReveal delay={0.2}>
            <div className="relative">
              <img
                src={teamImg}
                alt="Equipe FUNSA"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-6 -left-6 p-6 glass-card rounded-2xl">
                <span className="text-3xl font-bold text-primary">1943</span>
                <p className="text-sm text-muted-foreground mt-1">Ano de fundação</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-muted/30">
                <div className="text-3xl md:text-4xl font-bold text-primary">
                  <Counter end={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
