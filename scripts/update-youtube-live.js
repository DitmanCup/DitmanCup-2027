// Mira si cada canal de YOUTUBE_LIVE_CHANNELS (js/script.js) esta en vivo y guarda
// el resultado en data/youtube-live.json, que lee la pestaña Live.
// YouTube no se puede consultar desde el navegador (CORS) y el link de cada vivo
// cambia, por eso esto lo corre GitHub Actions (.github/workflows/update-youtube-live.yml):
// abre /live de cada canal, que redirige al video del vivo si hay uno.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'youtube-live.json');
const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
  'Accept-Language': 'en-US,en;q=0.9',
  // Evita la pantalla de consentimiento de cookies que YouTube muestra en algunas regiones
  'Cookie': 'CONSENT=YES+1; SOCS=CAI',
};

function loadChannels() {
  const src = fs.readFileSync(path.join(ROOT, 'js', 'script.js'), 'utf8');
  const m = src.match(/const YOUTUBE_LIVE_CHANNELS = (\[[\s\S]*?\n\]);/);
  if (!m) throw new Error('No se encontro YOUTUBE_LIVE_CHANNELS en js/script.js');
  return new Function('return ' + m[1])();
}

// URL de /live del canal; los que solo tienen una busqueda (sin handle) se saltean
function liveUrl(c) {
  if (c.id) return `https://www.youtube.com/channel/${c.id}/live`;
  if (c.url && /youtube\.com\/(@|channel\/)/.test(c.url)) return c.url;
  return '';
}

async function check(c) {
  const url = liveUrl(c);
  if (!url) return null;
  const res = await fetch(url, { headers: HEADERS, redirect: 'follow', signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const html = await res.text();
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || '';
  const videoId = (canon.match(/[?&]v=([\w-]{11})/) || [])[1];
  if (!videoId) {
    if (!/<link rel="canonical"/.test(html)) throw new Error('pagina sin canonical (consentimiento o bloqueo)');
    return { live: false };
  }
  // En vivo de verdad: reproducible (no "empieza en unos momentos") y marcado como en directo ahora
  const playable = /"playabilityStatus":\{"status":"OK"/.test(html);
  const liveNow = /"isLiveNow":true/.test(html);
  if (!playable || !liveNow) return { live: false };
  const viewers = Number(((html.match(/"runs":\[\{"text":"([\d,.]+)"\},\{"text":" watching now"/) || [])[1] || '0').replace(/[^\d]/g, ''));
  const title = (html.match(/<meta name="title" content="([^"]*)"/) || [])[1] || '';
  return {
    live: true,
    videoId,
    title: title.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
    viewers,
    embed: !/"playableInEmbed":false/.test(html),
  };
}

(async () => {
  const channels = loadChannels();
  const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : { channels: {} };
  const result = {};
  let failures = 0;
  for (const c of channels) {
    try {
      const r = await check(c);
      if (r) result[c.name] = r;
    } catch (e) {
      failures++;
      console.warn(`${c.name}: ${e.message}`);
      if (old.channels && old.channels[c.name]) result[c.name] = old.channels[c.name];   // se mantiene lo ultimo conocido
    }
  }
  // Si no cambio quien esta en vivo (los espectadores varian siempre), no se toca el archivo
  const strip = o => JSON.stringify(Object.fromEntries(Object.entries(o || {}).map(([k, v]) => [k, { ...v, viewers: undefined }])));
  // (salvo cada ~6 horas, para que la pagina sepa que el chequeo sigue funcionando)
  const fresh = old.updatedAt && Date.now() - Date.parse(old.updatedAt) < 6 * 3600 * 1000;
  if (fresh && strip(old.channels) === strip(result)) { console.log('Sin cambios.'); return; }
  fs.writeFileSync(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), channels: result }, null, 2) + '\n');
  const live = Object.entries(result).filter(([, v]) => v.live).map(([k]) => k);
  console.log(`OK: ${Object.keys(result).length} canales, en vivo: ${live.join(', ') || 'ninguno'}${failures ? ` (${failures} con error)` : ''}`);
})();
