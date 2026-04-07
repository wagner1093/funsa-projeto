const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error("Variáveis de ambiente ausentes.");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const especialidades = {
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

const clinicasAvare = [
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

const clinicasExames = [
  { nome: "Centromed", especialidade: "Exames de Imagem", endereco: "Rua Goiás, nº 1.351 – Centro", telefone: "(14) 3732-1234" },
  { nome: "Centro de Radiologia – Unimed", especialidade: "Exames de Imagem", endereco: "Rua Santa Catarina, nº 1.981 – Bairro Alto", telefone: "(14) 3733-7571" },
  { nome: "Clínica Radiodoctor", especialidade: "Exames de Imagem", endereco: "Largo Santa Cruz, nº 808 – Centro", telefone: "(14) 3732-4316" },
  { nome: "CROD", especialidade: "Radiologia Odontológica Digital", endereco: "Rua Goiás, nº 1.351 – Centro", telefone: "(14) 3733-1418" },
  { nome: "UDI – Ressonância Magnética", especialidade: "Ressonância", endereco: "Rua Mato Grosso, nº 800 – Centro", telefone: "(14) 3732-3264" },
];

const clinicasOutras = [
  { nome: "Organização Terra Branca – Bauru/SP", especialidade: "Diversas", endereco: "Praça Dom Pedro II, nº 4-74 – Centro", telefone: "(14) 3223-8011" },
  { nome: "Clínica Cliniprev – Botucatu/SP", especialidade: "Cardiologia, Clínico Geral, Dermatologia, Ginecologia, Oftalmologia, Ortopedia, Odontologia", endereco: "Av. Santana, nº 525 – Centro", telefone: "(14) 3361-6035" },
  { nome: "Dr. José Ricardo P. Rodrigues – Botucatu/SP", especialidade: "Ginecologia, Obstetrícia e Mastologia", endereco: "Praça Isabel Arruda, nº 157 – Centro", telefone: "(14) 3882-5515" },
  { nome: "Clínica Saúde – Lençóis Paulista/SP", especialidade: "Fonoaudiologia, Psiquiatria, Psicologia, Odontologia", endereco: "Av. 25 de Janeiro, nº 207 – Centro", telefone: "(14) 3264-3886" },
];

async function seed() {
  console.log("Zerando listagem anterior...");
  await supabase.from('medicos').delete().neq('id', '00000000-0000-0000-0000-000000000000'); // apaga todos pra limpar
  
  const payloads = [];

  // Médicos individuais
  for (const [esp, docs] of Object.entries(especialidades)) {
    for (const doc of docs) {
      payloads.push({
        nome: doc,
        especialidade: esp,
        contato: '',
        categoria: 'medico'
      });
    }
  }

  // clinicas avare
  for (const c of clinicasAvare) {
    payloads.push({
      nome: c.nome,
      especialidade: c.especialidade,
      profissional: c.profissional || null,
      endereco: c.endereco,
      contato: c.telefone,
      categoria: 'clinica_avare'
    });
  }

  // clinicas exames
  for (const c of clinicasExames) {
    payloads.push({
      nome: c.nome,
      especialidade: c.especialidade,
      profissional: c.profissional || null,
      endereco: c.endereco,
      contato: c.telefone,
      categoria: 'clinica_exame'
    });
  }

  // clinicas outras
  for (const c of clinicasOutras) {
    payloads.push({
      nome: c.nome,
      especialidade: c.especialidade,
      profissional: c.profissional || null,
      endereco: c.endereco,
      contato: c.telefone,
      categoria: 'clinica_outras'
    });
  }

  const { data, error } = await supabase.from('medicos').insert(payloads);
  if (error) {
    console.error("Erro no Seed:", error.message);
  } else {
    console.log(`Seed concluído com sucesso! Inseridos ${payloads.length} registros.`);
  }
}

seed();
