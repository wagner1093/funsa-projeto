import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { ArrowRight, Smartphone } from "lucide-react";

interface Parceiro {
  nome: string;
  beneficio: string;
}

const categorias: Record<string, Parceiro[]> = {
  "Alimentação e Lazer": [
    { nome: "Marguerita Pizzaria", beneficio: "5% de desconto em todas as pizzas, incluindo refrigerantes e sorvetes" },
    { nome: "Diego Lanches e Marmitaria", beneficio: "Entrega grátis nas compras acima de R$ 40,00" },
    { nome: "Emporium Do Chopp", beneficio: "15% de desconto em todos os produtos às quartas-feiras" },
    { nome: "Zacota Restaurante", beneficio: "10% de desconto em todos os pratos" },
    { nome: "Donini Peixes E Porções", beneficio: "10% de desconto no salão e delivery" },
    { nome: "Oriental Mix", beneficio: "10% de desconto no salão" },
  ],
  "Supermercados e Conveniência": [
    { nome: "Supermercado Saladão", beneficio: "Cupom de desconto disponível no App FUNSA" },
    { nome: "Supermercado Camargo", beneficio: "3% de desconto em todos os setores às quintas-feiras" },
  ],
  "Construção e Utilidades": [
    { nome: "L. M. Leão Construtora", beneficio: "5% a 20% de desconto em projetos e construções" },
    { nome: "Flávio Cortinas", beneficio: "20% de desconto em persianas e cortinas" },
    { nome: "Casa Do Churrasqueiro", beneficio: "5% de desconto em todos os produtos" },
    { nome: "Construfic", beneficio: "20% de desconto à vista acima de R$ 1.000 ou 15% a prazo" },
  ],
  "Serviços Diversos": [
    { nome: "Disk Água Aguaré", beneficio: "20% de desconto nas compras à vista" },
    { nome: "Martins Gás", beneficio: "Sorteio bimestral de vale-gás e desconto percentual no pedido" },
    { nome: "J & R Chaveiro", beneficio: "5% de desconto para pagamento à vista" },
    { nome: "Santiago Corretora De Seguros", beneficio: "20% de desconto em seguros diversos" },
    { nome: "Red Comunicação Visual", beneficio: "15% de desconto em pagamentos à vista" },
  ],
  "Flores, Presentes e Papelaria": [
    { nome: "Arts Flores", beneficio: "10% de desconto em compras acima de R$ 30,00" },
    { nome: "MultiFlora Paisagismo", beneficio: "10% de desconto em vasos e plantas" },
    { nome: "Papelaria Criativa", beneficio: "15% de desconto à vista ou 10% no cartão" },
    { nome: "Arty Copy", beneficio: "10% de desconto em compras acima de R$ 30,00" },
    { nome: "Papelac Papelaria", beneficio: "10% de desconto à vista e até 6x no cartão" },
    { nome: "Ferrari Presentes", beneficio: "10% de desconto à vista ou 5% no cartão" },
  ],
  "Óticas": [
    { nome: "Ótica Maria Gianni", beneficio: "25% de desconto em armações e solares" },
    { nome: "Ótica Maitê", beneficio: "30% de desconto em armações e solares" },
    { nome: "Ótica Vitória", beneficio: "30% de desconto em todas as armações" },
  ],
  "Educação e Cursos": [
    { nome: "IAE – Instituto Avareense De Ensino", beneficio: "Isenção na matrícula" },
    { nome: "Microvip", beneficio: "15% de desconto na matrícula e mensalidades" },
    { nome: "UNIFSP Centro Universitário", beneficio: "30% de desconto em cursos de graduação selecionados" },
    { nome: "Unicesumar EAD", beneficio: "30% de desconto no valor dos cursos" },
    { nome: "Mores Centro De Dança", beneficio: "Isenção na matrícula" },
    { nome: "Wizard", beneficio: "50% de desconto na matrícula" },
    { nome: "Fisk Avaré", beneficio: "20% de desconto na matrícula" },
    { nome: "Metropolitana Cursos", beneficio: "Isenção na matrícula e 10% de desconto nas mensalidades" },
  ],
  "Academias, Esporte e Hospedagem": [
    { nome: "Academia Yama Harashi", beneficio: "50% de desconto na matrícula e 15% nas mensalidades" },
    { nome: "Academia Power Trainer", beneficio: "5% de desconto em todas as modalidades" },
    { nome: "Infinity Training", beneficio: "20% de desconto nas mensalidades" },
    { nome: "Academia Corpo E Saúde", beneficio: "50% de desconto na matrícula e 10% nas mensalidades" },
    { nome: "PhD Sports", beneficio: "50% de desconto na matrícula e preço especial nas mensalidades" },
    { nome: "AABB Jurumirim", beneficio: "20% de desconto no Day Use e 10% em hospedagem" },
    { nome: "Vila Verde Hotel", beneficio: "10% de desconto nas diárias" },
  ],
  "Beleza e Saúde": [
    { nome: "Barbearia Do Fogaça", beneficio: "20% de desconto em cortes masculinos" },
    { nome: "Rosa Marroquina", beneficio: "12% de desconto em produtos" },
    { nome: "Cirúrgica Avaré", beneficio: "10% de desconto em produtos ortopédicos e 5% em cadeiras" },
    { nome: "Drogalar Avaré", beneficio: "Até 50% de desconto em genéricos às sextas-feiras" },
    { nome: "Vitalis Drogaria", beneficio: "10% de desconto em medicamentos manipulados" },
    { nome: "Curavita Produtos Hospitalares", beneficio: "10% a 40% de desconto em medicamentos" },
    { nome: "Drogaria Bem Popular", beneficio: "10% de desconto em medicamentos com receita" },
  ],
  "Automotivo e Mobilidade": [
    { nome: "Uno Auto Elétrica", beneficio: "10% de desconto para pagamento à vista" },
    { nome: "Igo Mobilidade", beneficio: "Até 15% de desconto em corridas" },
    { nome: "Napoli Pneus", beneficio: "10% de desconto em todos os serviços" },
    { nome: "PL Pneus", beneficio: "10% de desconto na troca de pneus" },
    { nome: "Auto Mecânica Landi", beneficio: "10% de desconto em orçamentos" },
    { nome: "Nova América Parabrisas", beneficio: "5% a 15% de desconto em peças e serviços" },
  ],
  "Moda e Acessórios": [
    { nome: "King Acessórios", beneficio: "15% de desconto em compras na loja" },
  ],
};

export default function ClubeFunsa() {
  return (
    <>
      <PageHero
        title="Clube + FUNSA"
        subtitle="Vantagens exclusivas que fazem a diferença no dia a dia dos associados."
        breadcrumbs={[{ label: "Clube + FUNSA", href: "/clube" }]}
      />

      <section className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                O Clube + FUNSA foi criado para ir além da assistência funerária, oferecendo vantagens exclusivas que fazem a diferença no dia a dia dos associados e de seus beneficiários. Ao fazer parte, o associado tem acesso a uma ampla rede de parceiros conveniados.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold">+ de 60 parceiros</span>
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold">Saúde e bem-estar</span>
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold">Educação</span>
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold">Alimentação</span>
                <span className="px-4 py-2 rounded-full bg-accent/10 text-accent font-semibold">Ofertas exclusivas</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="text-2xl font-bold text-foreground text-center mb-10">Parceiros do Clube e seus benefícios</h2>
          </ScrollReveal>

          <div className="space-y-12">
            {Object.entries(categorias).map(([cat, parceiros], ci) => (
              <ScrollReveal key={cat} delay={ci * 0.05}>
                <h3 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-border/50">{cat}</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {parceiros.map((p) => (
                    <div key={p.nome} className="p-4 rounded-xl bg-card border border-border/50">
                      <h4 className="font-semibold text-foreground text-sm">{p.nome}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{p.beneficio}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1}>
            <div className="mt-16 p-8 rounded-2xl gradient-navy text-center">
              <Smartphone className="w-10 h-10 text-gold mx-auto mb-4" />
              <h3 className="text-xl font-bold text-primary-foreground mb-3">
                📲 Baixe agora o aplicativo FUNSA
              </h3>
              <p className="text-primary-foreground/70 mb-6 max-w-lg mx-auto">
                Aproveite todas as vantagens do Clube + FUNSA. Consulte parceiros, acesse descontos e obtenha informações de forma rápida e prática.
              </p>
              <a
                href="/aplicativo"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary font-semibold hover-lift"
              >
                Baixar Aplicativo <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
