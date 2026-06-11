const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Ler o arquivo .env manualmente
const envPath = path.join(__dirname, '../.env');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
  const parts = line.split('=');
  if (parts.length >= 2) {
    const key = parts[0].trim();
    const val = parts.slice(1).join('=').trim();
    env[key] = val;
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseServiceKey = env['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Variáveis de ambiente do Supabase não encontradas no .env');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function run() {
  const email = 'admin_teste@funsa.com';
  const password = 'admin123456';
  const nome = 'Teste Admin';
  const funcao = 'admin';

  console.log(`Criando usuário de teste no Supabase Auth: ${email}...`);

  // 1. Criar no auth.users
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { nome, funcao }
  });

  if (authError) {
    if (authError.message.includes('already been registered')) {
      console.log('Usuário já registrado no Auth, prosseguindo para inserção no banco...');
      // Pegar ID do usuário já existente
      const { data: listUsers } = await supabase.auth.admin.listUsers();
      const existingUser = listUsers.users.find(u => u.email === email);
      if (existingUser) {
        await insertDb(existingUser.id);
      }
    } else {
      console.error('Erro ao criar no Auth:', authError);
    }
  } else {
    console.log('Usuário de teste criado no Auth com ID:', authData.user.id);
    await insertDb(authData.user.id);
  }
}

async function insertDb(id) {
  const email = 'admin_teste@funsa.com';
  const nome = 'Teste Admin';
  const funcao = 'admin';

  console.log('Vinculando usuário de teste no banco funsa_site_users...');
  const { error: dbError } = await supabase
    .from('funsa_site_users')
    .upsert({
      id,
      site_id: 'funsa',
      nome,
      email,
      funcao,
      status: 'ativo'
    });

  if (dbError) {
    console.error('Erro ao salvar no banco:', dbError);
  } else {
    console.log('Usuário de teste pronto para login!');
  }
}

run();
