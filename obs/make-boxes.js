// Exporta las cajas vacias de obs/box.html como PNG transparentes en obs/boxes/ usando Chrome headless (protocolo CDP).
// Uso (desde la raiz del repo): node obs/make-boxes.js    -> requiere Chrome instalado y un servidor local en el puerto 4602 sirviendo la raiz del repo.
const { spawn } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const BASE = process.env.BASE || 'http://localhost:4602/obs/box.html';
const OUT = path.join(__dirname, 'boxes');
const BOXES = [
  // pantalla "ending stream"
  ['01-top-donors', 572, 531, 'Top donors', 0],
  ['02-live-chat-ending', 471, 690, 'Live chat', 1],
  ['03-next-streams', 571, 691, 'Next streams', 0],
  ['04-prize-pool-ending', 572, 140, '', 0],
  // pantalla "starting soon"
  ['05-up-next', 623, 422, 'Up next', 0],
  ['06-prize-pool-starting', 626, 167, '', 0],
  ['07-live-chat-starting', 433, 985, 'Live chat', 1],
  // pantalla del leaderboard
  ['08-live-chat-leaderboard', 534, 1074, 'Live chat', 1],
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const prof = fs.mkdtempSync(path.join(os.tmpdir(), 'obsbox-'));
  const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--remote-debugging-port=9333', '--user-data-dir=' + prof, '--window-size=1000,1200', 'about:blank'], { stdio: 'ignore' });
  let targets;
  for (let i = 0; i < 40; i++) { try { targets = await (await fetch('http://127.0.0.1:9333/json/list')).json(); if (targets.length) break; } catch (e) {} await sleep(300); }
  const ws = new WebSocket(targets.find((t) => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0; const wait = new Map(); const events = [];
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && wait.has(d.id)) { wait.get(d.id)(d); wait.delete(d.id); } else events.push(d); };
  const send = (method, params) => new Promise((res) => { const i = ++id; wait.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await send('Page.enable');
  await send('Emulation.setDefaultBackgroundColorOverride', { color: { r: 0, g: 0, b: 0, a: 0 } });
  for (const [name, w, h, title, icon] of BOXES) {
    await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: false });
    await send('Page.navigate', { url: `${BASE}?w=${w}&h=${h}&title=${encodeURIComponent(title)}&icon=${icon}&v=${Date.now()}` });
    await sleep(2500);   // tipografia de Google Fonts
    const r = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
    fs.writeFileSync(path.join(OUT, name + '.png'), Buffer.from(r.result.data, 'base64'));
    console.log('OK', name, w + 'x' + h);
  }
  ws.close(); proc.kill();
  try { fs.rmSync(prof, { recursive: true, force: true }); } catch (e) {}
})().catch((e) => { console.error('ERROR', e.message); process.exit(1); });
