import PageHero from "@/components/PageHero";
import ScrollReveal from "@/components/ScrollReveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Phone, MapPin } from "lucide-react";

const especialidades: Record<string, string[]> = {
  "Cabeça e pescoço": ["Dr. Renato Nakamura"],
  "Cardiologia": ["Dr. Murillo De Melo Villen Favaro De Oliveira"],
  "Clínico geral": ["Dra. Thaisa Garcia", "Dr. Lester Roberto Espinosa Popa", "Dra. Maria Eduarda M. Marques"],
  "Dermatologia e estética": ["Dra. Tania Henneberg Benemond (SP)", "Dra. Paula Henneberg Benemond (SP)"],
  "Endocrinologia": ["Dra. Paola Jung"],
  "Fisioterapia": ["Maria Eduarda F. Moreira", "Yago Aparecido Camargo"],
  "Gastrocirurgia / Coloproctologia": ["Dr. Hélio José Fragoso", "Dr. Zimar Tavares Borges Júnior"],
  "Geriatria": ["Dra. Juliana Armando Rosa"],
  "Ginecologia e obstetrícia": ["Dra. Maria Eduarda Grassi Novaes", "Dra. Ângela Storino Das Chagas"],
  "Nutrição": ["Milena Nespeca"],
  "Ortopedia": ["Dr. Jun Ricardo Fujji", "Dr. Thales Martins"],
  "Otorrinolaringologia": ["Dr. Renato Nakamura"],
  "Pediatria / Neuropediatria": ["Dra. Regina Patrícia Rodrigues"],
  "Pneumologia": ["Dr. André Suzuki"],
  "Psicologia": ["Patrícia Duarte Silva", "Valéria Domiciano Da Silva"],
  "Psiquiatria": ["Dr. João Rogério Andrade Noronha", "Dr. Marciano Pires Da Costa"],
  "Terapia ocupacional": ["Diana Maria Lemes Da Silva"],
  "Terapia / Numeróloga quântica": ["Larissa Dos Santos"],
  "Urologia": ["Dr. César Geraldo Benemond (SP)"],
  "Vascular": ["Dr. Marcelo Dias Soares Filho"],
};

interface Clinica {
  nome: string;
  especialidade: string;
  profissional?: string;
  endereco: string;
  telefone: string;
}

const clinicasAvare: Clinica[] = [
  { nome: "Clínica Áudio On", especialidade: "Otorrinolaringologia", profissional: "Dra. Thais Cristina Matuo", endereco: "Rua Santa Catarina, nº 1.981 – Centro", telefone: "(14) 3731-7228" },
  { nome: "Clínica Asclin", especialidade: "Nefrologia", profissional: "Dra. Luciana Aparecida Uiema", endereco: "Av. Carlos Ramires, nº 982", telefone: "(14) 99172-4382" },
  { nome: "Clínica Asclin", especialidade: "Pediatria", profissional: "Dra. Melina Giroto Tazinassi", endereco: "Av. Carlos Ramires, nº 982", telefone: "(14) 99172-4382" },
  { nome: "Clínica de Urologia", especialidade: "Urologia", profissional: "Dr. Paulo Roberto Ismael Lutti", endereco: "Av. Pinheiro Machado, nº 1.206 – Centro", telefone: "(14) 3733-6381" },
  { nome: "Clínica Fernandes", especialidade: "Pediatria", profissional: "Dr. Vladimir Lopes Fernandes", endereco: "Rua Voluntários de Avaré, nº 1.127", telefone: "(14) 3732-7018" },
  { nome: "Clínica Médica Dr. Ernesto Albuquerque", especialidade: "Pediatria", endereco: "Largo São Benedito, nº 103 – Centro", telefone: "(14) 3732-2486" },
  { nome: "Clínica Neurológica", especialidade: "Neurologia", profissional: "Dr. Vicente José Schiavão", endereco: "Rua Domiciano Santana, nº 1.096", telefone: "(14) 3732-4887" },
  { nome: "Clínica Oftalmológica", especialidade: "Oftalmologia", profissional: "Dr. Patrick Dias", endereco: "Rua Domiciano Santana, nº 1.306 – Centro", telefone: "(14) 99135-1840" },
  { nome: "Clínica Santa Luzia", especialidade: "Oftalmologia", profissional: "Dr. José Antônio Batista Junior", endereco: "Rua Pará, nº 1.039 – Centro", telefone: "(14) 3732-7209" },
  { nome: "Clínica São Lucas", especialidade: "Pediatria", profissional: "Dr. Nilson Calamita Filho", endereco: "Rua Domiciano Santana, nº 1.269", telefone: "(14) 3732-0968" },
  { nome: "Clínica São Luiz", especialidade: "Otorrinolaringologia", profissional: "Dr. Marcos Ceoloto Galati", endereco: "Rua Domiciano Santana, nº 270 – Centro", telefone: "(14) 3733-2375" },
  { nome: "Clínica OstheoFoot", especialidade: "Pilates • Palmilhas Posturais", endereco: "Rua Rio Grande do Norte, nº 840 – Centro", telefone: "(14) 3733-2230" },
  { nome: "Espaço Estimular", especialidade: "Neuropsicopedagogia", profissional: "Dra. Janaína Medeiros", endereco: "Rua Tenente Apiaí, nº 1.174 – Bairro Alto", telefone: "(14) 99691-2928" },
  { nome: "Espaço Saúde", especialidade: "Cirurgia Vascular", profissional: "Dr. Luciano O. Salgado de Souza", endereco: "Av. Gilberto Filgueiras, nº 1.149 – Alto da Colina", telefone: "(14) 99677-8080" },
  { nome: "IKOO", especialidade: "Neurologia", profissional: "Dra. Thaís Fagnani Machado", endereco: "Av. Ângelo Contrucci, nº 651 – Alto da Colina II", telefone: "(14) 3733-3000" },
  { nome: "MedClinic", especialidade: "Pneumologia", profissional: "Dra. Bárbara Cristina Grizzo", endereco: "Av. Gilberto Filgueiras, nº 936 – Colina da Boa Vista", telefone: "(14) 99151-2533" },
  { nome: "Neurocirurgia", especialidade: "Neurocirurgia", profissional: "Dr. Marco Aurélio Pina", endereco: "Praça Rui Barbosa, nº 100 – Centro", telefone: "(14) 3733-4698" },
];

const clinicasExames: Clinica[] = [
  { nome: "Centromed", especialidade: "Exames de Imagem", endereco: "Rua Goiás, nº 1.351 – Centro", telefone: "(14) 3732-1234" },
  { nome: "Centro de Radiologia – Unimed", especialidade: "Exames de Imagem", endereco: "Rua Santa Catarina, nº 1.981 – Bairro Alto", telefone: "(14) 3733-7571" },
  { nome: "Clínica Radiodoctor", especialidade: "Exames de Imagem", endereco: "Largo Santa Cruz, nº 808 – Centro", telefone: "(14) 3732-4316" },
  { nome: "CROD", especialidade: "Radiologia Odontológica Digital", endereco: "Rua Goiás, nº 1.351 – Centro", telefone: "(14) 3733-1418" },
  { nome: "UDI – Ressonância Magnética", especialidade: "Ressonância", endereco: "Rua Mato Grosso, nº 800 – Centro", telefone: "(14) 3732-3264" },
];

const clinicasOutras: Clinica[] = [
  { nome: "Organização Terra Branca – Bauru/SP", especialidade: "Diversas", endereco: "Praça Dom Pedro II, nº 4-74 – Centro", telefone: "(14) 3223-8011" },
  { nome: "Clínica Cliniprev – Botucatu/SP", especialidade: "Cardiologia, Clínico Geral, Dermatologia, Ginecologia, Oftalmologia, Ortopedia, Odontologia", endereco: "Av. Santana, nº 525 – Centro", telefone: "(14) 3361-6035" },
  { nome: "Dr. José Ricardo P. Rodrigues – Botucatu/SP", especialidade: "Ginecologia, Obstetrícia e Mastologia", endereco: "Praça Isabel Arruda, nº 157 – Centro", telefone: "(14) 3882-5515" },
  { nome: "Clínica Saúde – Lençóis Paulista/SP", especialidade: "Fonoaudiologia, Psiquiatria, Psicologia, Odontologia", endereco: "Av. 25 de Janeiro, nº 207 – Centro", telefone: "(14) 3264-3886" },
];

function ClinicaCard({ c }: { c: Clinica }) {
  return (
    <div className="p-5 rounded-xl bg-card border border-border/50">
      <h4 className="font-bold text-foreground">{c.nome}</h4>
      <p className="text-sm text-accent font-medium mt-1">{c.especialidade}</p>
      {c.profissional && <p className="text-sm text-muted-foreground mt-1">{c.profissional}</p>}
      <div className="mt-3 flex flex-col gap-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><MapPin className="w-3 h-3" /> {c.endereco}</span>
        <span className="flex items-center gap-1.5"><Phone className="w-3 h-3" /> {c.telefone}</span>
      </div>
    </div>
  );
}

export default function PrevSaude() {
  return (
    <>
      <PageHero
        title="Prev Saúde"
        subtitle="Condomínio médico com mais de 20 especialidades e consultas com até 50% de desconto."
        breadcrumbs={[{ label: "Prev Saúde", href: "/prevsaude" }]}
      />

      <section className="section-padding bg-background">
        <div className="section-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto mb-12">
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                A Prev Saúde Avaré é o condomínio médico criado para cuidar da saúde das famílias com atenção, qualidade e acessibilidade. Reunindo mais de 20 especialidades médicas, oferece aos associados consultas com até 50% de desconto, além de exames laboratoriais e de imagem.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Com mais de 18 anos de atuação, a Prev Saúde Avaré é referência em atendimento humanizado, estrutura moderna e foco na prevenção e no bem-estar. Mais do que um serviço, a Prev Saúde Avaré é um compromisso com quem confia na FUNSA para cuidar do que realmente importa: a vida.
              </p>
            </div>
          </ScrollReveal>

          <Tabs defaultValue="especialidades" className="w-full">
            <ScrollReveal>
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 h-auto p-1 bg-muted/60">
                <TabsTrigger value="especialidades" className="py-3 text-sm font-semibold">Especialidades</TabsTrigger>
                <TabsTrigger value="clinicas" className="py-3 text-sm font-semibold">Clínicas Parceiras</TabsTrigger>
              </TabsList>
            </ScrollReveal>

            <TabsContent value="especialidades" className="mt-10">
              <ScrollReveal>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(especialidades).map(([esp, docs]) => (
                    <div key={esp} className="p-5 rounded-xl bg-card border border-border/50">
                      <h4 className="font-bold text-foreground text-sm">{esp}</h4>
                      <div className="mt-2 space-y-1">
                        {docs.map((d) => (
                          <p key={d} className="text-sm text-muted-foreground">{d}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </TabsContent>

            <TabsContent value="clinicas" className="mt-10">
              <ScrollReveal>
                <h3 className="text-xl font-bold text-foreground mb-6">Avaré / SP</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {clinicasAvare.map((c, i) => <ClinicaCard key={i} c={c} />)}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-6">Exames de Imagem – Avaré / SP</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {clinicasExames.map((c, i) => <ClinicaCard key={i} c={c} />)}
                </div>

                <h3 className="text-xl font-bold text-foreground mb-6">Outras Cidades</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {clinicasOutras.map((c, i) => <ClinicaCard key={i} c={c} />)}
                </div>
              </ScrollReveal>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
