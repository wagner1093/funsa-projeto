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

async function test() {
  const response = await fetch(`${url}/rest/v1/`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  const data = await response.json();
  fs.writeFileSync(path.join(__dirname, 'openapi.json'), JSON.stringify(data, null, 2));
  console.log('Tables found in PostgREST OpenAPI:');
  Object.keys(data.paths).forEach(p => {
    if (p.startsWith('/') && p !== '/') {
      console.log(' - ' + p.substring(1));
    }
  });
}

test();
