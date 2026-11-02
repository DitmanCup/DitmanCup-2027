// Avisa en Discord cuando entra una donacion nueva al torneo 2027 de Matcherino.
// Lo corre .github/workflows/update-donors.yml despues de commitear data/donors.json:
//   node scripts/notify-discord-donation.js <donors.json anterior> <donors.json nuevo>
// Necesita el secreto DISCORD_WEBHOOK_URL (URL del webhook del canal); si no esta, no hace nada.
// Con DRY_RUN=1 imprime el mensaje en vez de mandarlo.
const fs = require('fs');

const TOURNAMENT_ID = 222380;   // Ditman Cup 2027 en Matcherino
const DONATE_URL = 'https://mno.gg/s/5e058baec7?c=1';
const SITE_URL = 'https://ditmancup.github.io/DitmanCup-2027/';

const [oldPath, newPath] = process.argv.slice(2);
const read = p => JSON.parse(fs.readFileSync(p, 'utf8').replace(/^﻿/, ''));
const source = d => ((d && d.sources) || []).find(s => s.id === TOURNAMENT_ID);
const keys = s => new Set(((s && s.donors) || []).flatMap(d => (d.donations || []).map(x => `${d.name.toLowerCase()}|${x.date}|${x.amount}`)));

const cur = source(read(newPath));
if (!cur) { console.log('El torneo 2027 no esta en donors.json.'); process.exit(0); }
const before = keys(fs.existsSync(oldPath) ? source(read(oldPath)) : null);
const fresh = [...keys(cur)].filter(k => !before.has(k));
if (!fresh.length) { console.log('Sin donaciones nuevas.'); process.exit(0); }

// Los nombres van escapados para que "_" o "*" no rompan el formato de Discord
const esc = s => String(s).replace(/[\\_*~`|>#]/g, c => '\\' + c);
const money = n => '$' + (Number.isInteger(n) ? n : n.toFixed(2));
const content = [
  `# CURRENT PRIZE POOL: ${money(cur.raised)}`,
  '',
  '## Donators',
  ...cur.donors.map(d => `### - ${esc(d.name)}: ${money(d.total)}`),
  '',
  'Thank you to everyone who has donated so far! Every dollar goes to the runners.',
  '',
  `**[Donate to the prize pool](${DONATE_URL})**`,
  '',
  `Full info, format and schedule on the **[Ditman Cup 2027 website](${SITE_URL})**. The list of donors updates there automatically.`,
].join('\n');

(async () => {
  if (process.env.DRY_RUN) { console.log(`${fresh.length} donacion(es) nueva(s). Mensaje:\n\n${content}`); return; }
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) { console.log('Falta DISCORD_WEBHOOK_URL: no se manda nada.'); return; }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // allowed_mentions vacio: un nombre de donador con @ no puede pingear a nadie
    body: JSON.stringify({ content, allowed_mentions: { parse: [] } }),
  });
  if (!res.ok) throw new Error(`Discord respondio ${res.status}: ${await res.text()}`);
  console.log(`Enviado a Discord (${fresh.length} donacion(es) nueva(s)).`);
})().catch(e => { console.error(e.message); process.exit(1); });
