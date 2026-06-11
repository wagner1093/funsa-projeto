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
  const role = process.argv[2] || 'admin';

  if (!['admin', 'editor', 'viewer'].includes(role)) {
    console.error('Role inválida! Escolha entre: admin, editor, viewer');
    process.exit(1);
  }

  console.log(`Buscando ID do usuário ${email}...`);
  const { data: listUsers } = await supabase.auth.admin.listUsers();
  const user = listUsers.users.find(u => u.email === email);

  if (!user) {
    console.error(`Usuário ${email} não encontrado.`);
    process.exit(1);
  }

  console.log(`Atualizando função no auth.users metadata para ${role}...`);
  await supabase.auth.admin.updateUserById(user.id, {
    user_metadata: { ...user.user_metadata, funcao: role }
  });

  console.log(`Atualizando função na tabela funsa_site_users para ${role}...`);
  const { error } = await supabase
    .from('funsa_site_users')
    .update({ funcao: role })
    .eq('id', user.id);

  if (error) {
    console.error('Erro ao atualizar no banco:', error);
  } else {
    console.log(`Função atualizada com sucesso para: ${role}!`);
  }
}

run();
