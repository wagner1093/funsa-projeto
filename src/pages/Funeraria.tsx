import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Shield, Clock, Users, Heart } from "lucide-react";

export default function Funeraria() {
  return (
    <>
      <PageHero
        title="Funerária FUNSA"
        subtitle="Há mais de 80 anos acolhendo famílias com respeito, empatia e compromisso."
        breadcrumbs={[{ label: "Funerária", href: "/funeraria" }]}
      />

      <section className="section-padding bg-background">
        <div className="section-container max-w-4xl">
          <ScrollReveal>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              A Funerária FUNSA Avaré é referência em serviços funerários, oferecendo um atendimento humanizado e de qualidade em todos os momentos mais delicados.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Com estrutura completa e especializada, a FUNSA está preparada para atender com excelência, garantindo conforto, dignidade e organização em cada detalhe do serviço prestado.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Contamos com equipe de plantão 24 horas, assegurando agilidade em todas as questões burocráticas, além de tranquilidade, segurança e suporte contínuo aos familiares e amigos.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Nossa equipe de agentes funerários é formada por profissionais treinados e tecnicamente qualificados, preparados para atuar com sensibilidade, ética e profissionalismo, sempre respeitando a história e a memória de cada vida.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="section-container max-w-4xl">
          <ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-6 mb-16">
              {[
                { icon: Clock, title: "Plantão 24 horas", desc: "Equipe disponível a qualquer momento para oferecer suporte imediato." },
                { icon: Shield, title: "Estrutura Completa", desc: "Equipamentos e instalações modernas para cada etapa do serviço." },
                { icon: Users, title: "Equipe Qualificada", desc: "Profissionais treinados com sensibilidade, ética e profissionalismo." },
                { icon: Heart, title: "Atendimento Humanizado", desc: "Cada família é tratada com respeito, empatia e cuidado." },
              ].map((item) => (
                <div key={item.title} className="p-6 rounded-2xl bg-card border border-border/50">
                  <item.icon className="w-8 h-8 text-accent mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="p-8 rounded-2xl gradient-navy">
              <h2 className="text-2xl font-bold text-primary-foreground mb-4">Tanatopraxia</h2>
              <p className="text-primary-foreground/80 leading-relaxed mb-4">
                A tanatopraxia é um procedimento que tem como objetivo preservar, higienizar e cuidar da aparência da pessoa falecida, proporcionando um aspecto sereno e natural para a despedida.
              </p>
              <p className="text-primary-foreground/80 leading-relaxed mb-4">
                Na FUNSA, esse cuidado é realizado por profissionais capacitados, com técnica, respeito e total dignidade, garantindo que familiares e amigos possam se despedir com tranquilidade e conforto emocional.
              </p>
              <p className="text-primary-foreground/80 leading-relaxed">
                Esse procedimento contribui para uma despedida mais acolhedora, respeitando a história, a memória e o amor de quem permanece.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
