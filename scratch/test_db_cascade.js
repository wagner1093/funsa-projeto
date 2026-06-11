const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
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

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(url, key);

async function test() {
  console.log('Inserting dummy falecido...');
  const { data: falecido, error: fError } = await supabase.from('funsa_falecidos').insert({
    nome: 'Test Temp User',
    data: '10/06/2026',
    local: 'Test Local',
    velorio: 'Test Velorio',
    sepultamento: 'Test Sepultamento'
  }).select().single();

  if (fError) {
    console.error('Error creating falecido:', fError.message);
    return;
  }

  console.log('Created falecido ID:', falecido.id);

  console.log('Inserting dummy homenagem...');
  const { data: homenagem, error: hError } = await supabase.from('funsa_falecidos_homenagens').insert({
    falecido_id: falecido.id,
    nome: 'Test Homenageador',
    mensagem: 'Test Mensagem'
  }).select().single();

  if (hError) {
    console.error('Error creating homenagem:', hError.message);
    // Cleanup
    await supabase.from('funsa_falecidos').delete().eq('id', falecido.id);
    return;
  }

  console.log('Created homenagem ID:', homenagem.id);

  console.log('Attempting to delete falecido...');
  const { error: dError } = await supabase.from('funsa_falecidos').delete().eq('id', falecido.id);
  if (dError) {
    console.log('Delete FAILED! Error:', dError.message);
    console.log('Delete error code:', dError.code);
    
    // Manual cleanup
    console.log('Cleaning up manually...');
    await supabase.from('funsa_falecidos_homenagens').delete().eq('id', homenagem.id);
    await supabase.from('funsa_falecidos').delete().eq('id', falecido.id);
  } else {
    console.log('Delete SUCCESSFUL! (Cascade delete is active on DB)');
  }
}

test();
