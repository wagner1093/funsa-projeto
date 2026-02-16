import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Check, X, ArrowRight, Phone, Shield, Heart, Users, Clock, FileText, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Collapse, CollapseGroup } from "@/components/ui/collapse";

const plans = [
  {
    name: "Básico Individual",
    price: "29,90",
    items: [
      { label: "Atendimento Funerário Personalizado", value: true },
      { label: "Cobertura", value: "Somente o Titular até 65 anos" },
      { label: "Dependentes", value: "Sem dependentes" },
      { label: "Translado", value: "160km (buscar)" },
      { label: "Urna", value: "Urna Padrão" },
      { label: "Higienização", value: "Simples" },
      { label: "Taxa de Velório", value: false },
      { label: "Taxa de Sepultamento", value: false },
      { label: "Coroa de Flores", value: false },
      { label: "Equipamento Convalescente", value: "Aluguel" },
      { label: "CLUBE + FUNSA", value: true },
    ],
  },
  {
    name: "Básico Familiar",
    price: "49,90",
    popular: true,
    items: [
      { label: "Atendimento Funerário Personalizado", value: true },
      { label: "Cobertura", value: "Titular, cônjuge, filhos solteiros até 21 anos" },
      { label: "Dependentes", value: "Com acréscimo de taxa conforme idade" },
      { label: "Translado", value: "160km (buscar)" },
      { label: "Urna", value: "Urna Padrão" },
      { label: "Higienização", value: "Simples" },
      { label: "Taxa de Velório", value: false },
      { label: "Taxa de Sepultamento", value: false },
      { label: "Coroa de Flores", value: false },
      { label: "Equipamento Convalescente", value: "Aluguel" },
      { label: "CLUBE + FUNSA", value: true },
    ],
  },
  {
    name: "VIP",
    price: "89,90",
    items: [
      { label: "Atendimento Funerário Personalizado", value: true },
      { label: "Cobertura", value: "Titular, cônjuge e filhos solteiros até 21 anos" },
      { label: "Dependentes", value: "Com acréscimo de taxa conforme idade" },
      { label: "Translado", value: "250km (buscar)" },
      { label: "Urna", value: "Urna Padrão Semi-Luxo" },
      { label: "Higienização", value: "Tanatopraxia (simples)" },
      { label: "Taxa de Velório", value: "Exclusivo Cemitério Municipal Avaré" },
      { label: "Taxa de Sepultamento", value: "Exclusivo Cemitério Municipal Avaré" },
      { label: "Coroa de Flores", value: "01 Coroa de Flores" },
      { label: "Equipamento Convalescente", value: "Aluguel com 2 meses grátis" },
      { label: "CLUBE + FUNSA", value: true },
    ],
  },
];

const beneficiosVida = [
  { title: "CLUBE+ FUNSA", desc: "Participar gratuitamente do clube de vantagens com direito a usufruir dos descontos exclusivos em toda rede credenciada na área da saúde com consultas médicas e odontológicas com especialistas, exames laboratoriais, complementares e de imagem bem como nas empresas no comércio em geral." },
  { title: "Tranquilidade e segurança", desc: "Saber que os detalhes já estão organizados traz paz de espírito e reduz preocupações futuras." },
  { title: "Economia financeira", desc: "Os custos de um funeral podem ser altos e inesperados. Com o plano, você paga de forma parcelada e evita despesas emergenciais." },
  { title: "Planejamento antecipado", desc: "Permite definir preferências pessoais (tipo de cerimônia, jazigo, cremação), garantindo que seus desejos sejam respeitados." },
  { title: "Redução do estresse emocional da família", desc: "Em momentos de luto, os familiares não precisam lidar com burocracias e decisões difíceis, pois tudo já está previsto." },
  { title: "Apoio profissional especializado", desc: "Nossa empresa oferece suporte completo, cuidando de documentação, traslado e organização da cerimônia." },
  { title: "Proteção para toda a família", desc: "Nossos planos (*) permitem incluir dependentes, garantindo cobertura para cônjuge, filhos ou pais." },
  { title: "Ato de responsabilidade e amor", desc: "Contratar um plano é uma forma de cuidar dos entes queridos, evitando que eles enfrentem dificuldades financeiras e emocionais no futuro." },
];

const pontosAtencao = [
  "Leia o contrato com cuidado: verifique quais serviços estão incluídos (jazigo, cremação, traslado, etc.).",
  "Avalie a abrangência: alguns planos são locais, outros têm cobertura regional.",
  "Cheque a inclusão de dependentes (*): nem todos os planos permitem adicionar familiares sem custo extra.",
];

const passosImediatos = [
  "Chamar um médico para confirmar o óbito e emitir o atestado de óbito (documento essencial). Se o falecimento ocorrer em hospital, o próprio médico responsável emite. Se for em casa, deve-se chamar o SAMU ou médico particular.",
  "Acionar a funerária — A FUNSA cuidará da liberação e traslado do corpo, preparação, caixão, velório e sepultamento/cremação. Se houver plano funerário, basta entrar em contato com o plantão 24h da FUNSA.",
  "Providenciar documentos pessoais do falecido, do cônjuge e filhos: RG, CPF, certidão de nascimento ou casamento.",
];

export default function Plano() {
  return (
    <>
      <PageHero
        title="Plano de Assistência"
        subtitle="Proteção completa e tranquilidade para toda a família, com cobertura abrangente e benefícios exclusivos."
        breadcrumbs={[{ label: "Plano de Assistência", href: "/plano" }]}
      />

      <section className="section-padding bg-background">
        <div className="section-container">
          <Tabs defaultValue="planos" className="w-full">
            <ScrollReveal>
              <TabsList className="w-full max-w-xl mx-auto grid grid-cols-3 h-auto p-1 bg-muted/60">
                <TabsTrigger value="planos" className="py-3 text-xs sm:text-sm font-semibold">Tipos de Planos</TabsTrigger>
                <TabsTrigger value="beneficios" className="py-3 text-xs sm:text-sm font-semibold">Benefícios em Vida</TabsTrigger>
                <TabsTrigger value="falecimento" className="py-3 text-xs sm:text-sm font-semibold">Em Caso de Falecimento</TabsTrigger>
              </TabsList>
            </ScrollReveal>

            {/* ── ABA: TIPOS DE PLANOS ── */}
            <TabsContent value="planos" className="mt-10">
              <div className="grid md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <ScrollReveal key={plan.name}>
                    <div className={`relative flex flex-col rounded-2xl border bg-card p-6 h-full ${plan.popular ? "border-accent shadow-lg ring-2 ring-accent/30" : "border-border/50"}`}>
                      {plan.popular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-gold text-primary text-xs font-bold uppercase tracking-wider">
                          Mais Popular
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-foreground text-center mt-2">{plan.name}</h3>

                      <div className="my-6 text-center">
                        <span className="text-sm text-muted-foreground">R$</span>
                        <span className="text-4xl font-bold text-foreground mx-1">{plan.price}</span>
                        <span className="text-sm text-muted-foreground">/mês</span>
                      </div>

                      <div className="space-y-3 flex-1">
                        {plan.items.map((item) => (
                          <div key={item.label} className="flex items-start gap-2.5 text-sm">
                            {item.value === true ? (
                              <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            ) : item.value === false ? (
                              <X className="w-4 h-4 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                            ) : (
                              <Check className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                            )}
                            <div>
                              <span className="font-medium text-foreground">{item.label}</span>
                              {typeof item.value === "string" && (
                                <p className="text-muted-foreground text-xs mt-0.5">{item.value}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 space-y-3">
                        <a
                          href="https://wa.me/5514997792932"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-full flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm hover-lift ${plan.popular ? "gradient-gold text-primary" : "gradient-navy text-primary-foreground"}`}
                        >
                          Quero Contratar
                        </a>
                        <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4">
                          Saber Mais
                        </button>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </TabsContent>

            {/* ── ABA: BENEFÍCIOS EM VIDA ── */}
            <TabsContent value="beneficios" className="mt-10">
              <ScrollReveal>
                <div className="max-w-3xl mx-auto">
                  <p className="text-muted-foreground text-lg leading-relaxed mb-10">
                    Um plano funerário não é apenas para o momento da morte: ele traz benefícios em vida como tranquilidade, economia financeira, apoio profissional e segurança para a família. Além de evitar gastos inesperados, garante que tudo seja planejado com dignidade e reduz o estresse emocional dos familiares.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mb-6">Principais Benefícios em Vida</h3>

                  <div className="space-y-5 mb-10">
                    {beneficiosVida.map((b) => (
                      <div key={b.title} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full gradient-gold flex items-center justify-center flex-shrink-0 mt-1">
                          <Check className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <span className="font-semibold text-foreground">{b.title}:</span>{" "}
                          <span className="text-muted-foreground">{b.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-muted/50 border border-border/50">
                    <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-accent" /> Pontos de Atenção
                    </h4>
                    <ul className="space-y-2">
                      {pontosAtencao.map((p, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-accent font-bold mt-0.5">•</span> {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="mt-8 text-muted-foreground text-sm italic">
                    Em resumo, o maior benefício em vida de um plano funerário é a tranquilidade de saber que sua família estará protegida e não enfrentará dificuldades financeiras ou burocráticas em um momento delicado.
                  </p>
                </div>
              </ScrollReveal>
            </TabsContent>

            {/* ── ABA: EM CASO DE FALECIMENTO ── */}
            <TabsContent value="falecimento" className="mt-10">
              <ScrollReveal>
                <div className="max-w-3xl mx-auto">
                  {/* Emergency banner */}
                  <div className="p-6 rounded-2xl gradient-navy text-primary-foreground mb-10 flex flex-col sm:flex-row items-center gap-4">
                    <Phone className="w-10 h-10 flex-shrink-0" />
                    <div className="text-center sm:text-left">
                      <p className="font-bold text-lg">Em caso de falecimento ligue para:</p>
                      <a href="tel:1437320202" className="text-2xl font-bold text-gold">(14) 3732-0202</a>
                      <p className="text-primary-foreground/70 text-sm mt-1">Plantão 24 horas</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed mb-8">
                    Em caso de falecimento de uma pessoa, é importante agir com calma e seguir alguns passos práticos e legais que garantem que tudo seja feito corretamente.
                  </p>

                  <h3 className="text-xl font-bold text-foreground mb-4">Passos Imediatos</h3>
                  <div className="space-y-4 mb-10">
                    {passosImediatos.map((p, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className="w-7 h-7 rounded-full gradient-gold flex items-center justify-center flex-shrink-0 text-primary font-bold text-sm">
                          {i + 1}
                        </span>
                        <p className="text-muted-foreground leading-relaxed">{p}</p>
                      </div>
                    ))}
                  </div>

                  <CollapseGroup>
                    <Collapse title="Registro Legal">
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Certidão de óbito:</strong> Deve ser feita no cartório de registro civil com o atestado médico e documentos pessoais. É necessária para inventário, pensão, encerramento de contas e outros processos legais.
                      </p>
                    </Collapse>
                    <Collapse title="Organização da Despedida">
                      <p className="text-muted-foreground leading-relaxed">
                        Definir velório e sepultamento/cremação: escolher local (velório, capela, cemitério ou crematório) e horário. Para tanatopraxia, cremação ou traslado, é preciso consentimento formal da família.
                      </p>
                    </Collapse>
                    <Collapse title="Após o Sepultamento">
                      <div className="text-muted-foreground space-y-2 leading-relaxed">
                        <p>Comunicar órgãos competentes:</p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>INSS (para pensão ou encerramento de benefícios).</li>
                          <li>Empregador (para rescisão de contrato).</li>
                        </ul>
                        <p>Iniciar inventário e partilha de bens: pode ser feito em cartório (extrajudicial) ou via processo judicial.</p>
                        <p>Encerrar contas bancárias e contratos: necessário apresentar a certidão de óbito.</p>
                      </div>
                    </Collapse>
                    <Collapse title="Perdi alguém">
                      <div className="text-muted-foreground space-y-3 leading-relaxed">
                        <p>Nós, da Funerária FUNSA, contamos com equipe especializada e estrutura completa para oferecer todo o suporte necessário nos momentos mais delicados.</p>
                        <ul className="list-disc ml-5 space-y-1">
                          <li>Organização do velório, com respeito e dignidade</li>
                          <li>Providências para sepultamento ou cremação, com agilidade e segurança</li>
                          <li>Escolha de homenagens, como flores e música</li>
                          <li>Recepção e apoio a familiares e amigos</li>
                        </ul>
                      </div>
                    </Collapse>
                    <Collapse title="Quero Homenagear">
                      <div className="text-muted-foreground space-y-3 leading-relaxed">
                        <p>Na última despedida, familiares e amigos têm a oportunidade de expressar amor, saudade e solidariedade por meio de flores, música e gestos de carinho, transformando o momento em uma homenagem única, respeitosa e profundamente significativa.</p>
                        <p className="font-semibold text-foreground">WhatsApp para contato: <a href="https://wa.me/5514997792932" className="text-accent hover:underline">(14) 99779-2932</a></p>
                      </div>
                    </Collapse>
                  </CollapseGroup>

                  <div className="mt-10 p-6 rounded-2xl bg-muted/50 border border-border/50">
                    <p className="text-sm text-muted-foreground italic">
                      <strong className="text-foreground">Dica Importante:</strong> Ter um plano funerário facilita muito, pois a empresa cuida da burocracia e dos serviços, permitindo que a família se concentre no momento de despedida.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
