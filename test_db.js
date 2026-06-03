const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
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
  const { data: d1, error: e1 } = await supabase.from('funsa_site_config').select('*');
  console.log('funsa_site_config data:', d1);
  if (e1) console.log('funsa_site_config error:', e1.message);

  const { data: d2, error: e2 } = await supabase.from('site_config').select('*');
  console.log('site_config data:', d2);
  if (e2) console.log('site_config error:', e2.message);
}

test();
