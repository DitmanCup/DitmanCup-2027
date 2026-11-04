// Mira quien esta en vivo en YouTube (YOUTUBE_LIVE_CHANNELS) y en Kick
// (KICK_LIVE_CHANNELS), ambas listas en js/script.js, y guarda el resultado en
// data/live-status.json, que lee la pestaña Live.
// Ni YouTube ni Kick se pueden consultar desde el navegador (CORS) y el link de cada
// vivo de YouTube cambia, por eso esto lo corre GitHub Actions
// (.github/workflows/update-live-status.yml). Twitch si se consulta directo desde la pagina.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'data', 'live-status.json');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const YT_HEADERS = {
  'User-Agent': UA,
  'Accept-Language': 'en-US,en;q=0.9',
  // Evita la pantalla de consentimiento de cookies que YouTube muestra en algunas regiones
  'Cookie': 'CONSENT=YES+1; SOCS=CAI',
};
const KICK_HEADERS = { 'User-Agent': UA, 'Accept': 'application/json' };

function loadList(name) {
  const src = fs.readFileSync(path.join(ROOT, 'js', 'script.js'), 'utf8');
  const m = src.match(new RegExp('const ' + name + ' = (\\[[\\s\\S]*?\\n\\]);'));
  if (!m) throw new Error('No se encontro ' + name + ' en js/script.js');
  return new Function('return ' + m[1])();
}

// ---------- YouTube ----------
// URL de /live del canal; los que solo tienen una busqueda (sin handle) se saltean
function liveUrl(c) {
  if (c.id) return `https://www.youtube.com/channel/${c.id}/live`;
  if (c.url && /youtube\.com\/(@|channel\/)/.test(c.url)) return c.url;
  return '';
}

async function checkYouTube(c) {
  const url = liveUrl(c);
  if (!url) return null;
  const res = await fetch(url, { headers: YT_HEADERS, redirect: 'follow', signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const html = await res.text();
  const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1] || '';
  let videoId = (canon.match(/[?&]v=([\w-]{11})/) || [])[1];
  // Cuando el canal esta en vivo, a los servidores de GitHub YouTube les sirve una variante de la pagina con el canonical
  // en "undefined" (sin link al video), y por eso se perdian los directos. Si el canonical no es la pagina del canal,
  // el id del video se saca de los datos de la propia pagina (y solo si YouTube la marca en directo ahora).
  if (!videoId && /<link rel="canonical"/.test(html) && !/\/(channel\/|@)/.test(canon) && /"isLiveNow":true/.test(html)) {
    videoId = (html.match(/"videoDetails":\{"videoId":"([\w-]{11})"/) || html.match(/"videoId":"([\w-]{11})"/) || [])[1];
  }
  if (!videoId) {
    if (!/<link rel="canonical"/.test(html)) throw new Error('pagina sin canonical (consentimiento o bloqueo)');
    return { live: false, why: 'canon:' + canon.replace('https://www.youtube.com', '').slice(0, 40) };
  }
  // En vivo de verdad: marcado como en directo ahora (un directo que "empieza en unos momentos" trae isLiveNow:false).
  // No se exige playabilityStatus OK: desde los servidores de GitHub YouTube a veces pide "confirmar que no sos un bot"
  // (LOGIN_REQUIRED) aunque el canal este en vivo, y eso hacia que se perdieran directos reales.
  const status = (html.match(/"playabilityStatus":\{"status":"([A-Z_]+)"/) || [])[1] || '';
  const liveNow = /"isLiveNow":true/.test(html);
  if (status && status !== 'OK' && status !== 'LIVE_STREAM_OFFLINE') console.log(`YouTube ${c.name || url}: playabilityStatus=${status} isLiveNow=${liveNow}`);
  // "why" queda en live-status.json solo para diagnosticar (la pagina lo ignora): que le llego a GitHub de YouTube
  if (!liveNow) return { live: false, why: `watch|${status}|lbd=${/liveBroadcastDetails/.test(html) ? 1 : 0}` };
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

// ---------- Kick ----------
async function checkKick(slug) {
  const res = await fetch(`https://kick.com/api/v2/channels/${encodeURIComponent(slug)}`, { headers: KICK_HEADERS, signal: AbortSignal.timeout(20000) });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const j = await res.json();
  const name = (j.user && j.user.username) || slug;
  const followers = j.followers_count || 0;
  const ls = j.livestream;
  if (!ls) return { name, live: false, followers };
  return {
    name,
    live: true,
    viewers: ls.viewer_count || 0,
    game: (ls.categories && ls.categories[0] && ls.categories[0].name) || '',
    title: ls.session_title || '',
    thumb: (ls.thumbnail && (ls.thumbnail.url || ls.thumbnail.src)) || '',
    followers,
  };
}

async function collect(items, keyOf, check, old, label) {
  const result = {};
  let failures = 0;
  for (const it of items) {
    const key = keyOf(it);
    try {
      const r = await check(it);
      if (r) result[key] = r;
    } catch (e) {
      failures++;
      console.warn(`${label} ${key}: ${e.message}`);
      if (old && old[key]) result[key] = old[key];   // se mantiene lo ultimo conocido
    }
  }
  return { result, failures };
}

(async () => {
  const old = fs.existsSync(OUT) ? JSON.parse(fs.readFileSync(OUT, 'utf8')) : {};
  const yt = await collect(loadList('YOUTUBE_LIVE_CHANNELS'), c => c.name, checkYouTube, old.youtube, 'YouTube');
  const kick = await collect(loadList('KICK_LIVE_CHANNELS'), s => s.toLowerCase(), checkKick, old.kick, 'Kick');

  // Si no cambio quien esta en vivo (los espectadores varian siempre), no se toca el archivo
  // (salvo cada ~6 horas, para que la pagina sepa que el chequeo sigue funcionando)
  const strip = o => JSON.stringify(Object.fromEntries(Object.entries(o || {}).map(([k, v]) => [k, { ...v, viewers: undefined, followers: undefined }])));
  const fresh = old.updatedAt && Date.now() - Date.parse(old.updatedAt) < 6 * 3600 * 1000;
  if (fresh && strip(old.youtube) === strip(yt.result) && strip(old.kick) === strip(kick.result)) { console.log('Sin cambios.'); return; }

  fs.writeFileSync(OUT, JSON.stringify({ updatedAt: new Date().toISOString(), youtube: yt.result, kick: kick.result }, null, 2) + '\n');
  const live = o => Object.entries(o).filter(([, v]) => v.live).map(([k]) => k).join(', ') || 'ninguno';
  console.log(`OK. YouTube (${Object.keys(yt.result).length}) en vivo: ${live(yt.result)} | Kick (${Object.keys(kick.result).length}) en vivo: ${live(kick.result)}${yt.failures + kick.failures ? ` | ${yt.failures + kick.failures} con error` : ''}`);
})();
