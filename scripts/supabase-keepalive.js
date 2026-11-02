// Hace una consulta de lectura a Supabase para que el plan gratis no pause el proyecto por inactividad
// (pausa tras ~1 semana sin uso). Lo corre .github/workflows/supabase-keepalive.yml una vez por dia.
// La URL y la clave publica se leen de PRED_CONFIG en js/script.js (son publicas por diseno).
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(path.join(__dirname, '..', 'js', 'script.js'), 'utf8');
const pick = k => (src.match(new RegExp(k + ":\s*'([^']+)'")) || [])[1];
const url = pick('supabaseUrl'), key = pick('supabaseKey');
if (!url || !key) { console.log('Supabase no esta configurado en PRED_CONFIG: nada que hacer.'); process.exit(0); }

(async () => {
  const res = await fetch(`${url}/rest/v1/profiles?select=user_id&limit=1`, { headers: { apikey: key, Authorization: 'Bearer ' + key }, signal: AbortSignal.timeout(30000) });
  if (!res.ok) throw new Error(`Supabase respondio ${res.status}: ${(await res.text()).slice(0, 200)}`);
  console.log(`Supabase activo (HTTP ${res.status}).`);
})().catch(e => { console.error(e.message); process.exit(1); });
