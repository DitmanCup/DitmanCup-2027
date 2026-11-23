// Arma los huecos de la pantalla race con reproductores de Twitch recortados, segun data/race.json.
// Volumen de cada POV: se maneja desde race-volume.html (mismo navegador / dock de OBS) o con ?vol=100,0 en la URL. 0 = silencio.
(function () {
  var host = document.getElementById('race'), q = new URLSearchParams(location.search), FW = 1920, FH = 1080;
  var KEY = 'ditman.race.vol';
  // Huecos del diseno: [x, y, ancho, alto, alineacion]
  var SLOTS = [
    { pov: [10, 12, 944, 531, 'c'],  timer: [29, 720, 440, 98, 'c'],   kills: [488, 764, 105, 34, 'c'],  money: [618, 764, 106, 34, 'c'] },
    { pov: [966, 12, 944, 531, 'c'], timer: [1452, 720, 439, 98, 'c'], kills: [1327, 764, 106, 34, 'c'], money: [1197, 764, 106, 34, 'c'] }
  ];
  var vols = [0, 0], povs = [null, null]; // povs[i] = { obj, ready }
  var parent = location.hostname || 'localhost';

  function clamp(n) { n = Number(n); return isNaN(n) ? 0 : Math.max(0, Math.min(100, Math.round(n))); }
  function applyVol(i) {
    var p = povs[i]; if (!p || !p.ready) return;
    try { p.obj.setVolume(vols[i] / 100); p.obj.setMuted(vols[i] === 0); } catch (e) {}
  }
  function setVols(arr) { for (var i = 0; i < 2; i++) if (arr && arr[i] !== undefined && arr[i] !== null) { vols[i] = clamp(arr[i]); applyVol(i); } }
  function readStored() { try { var s = JSON.parse(localStorage.getItem(KEY) || 'null'); return s && s.v ? s.v : null; } catch (e) { return null; } }

  var twitchLoading = null;
  function withTwitch(cb) {
    if (window.Twitch && window.Twitch.Player) { setTimeout(cb, 0); return; }
    if (!twitchLoading) {
      twitchLoading = [];
      var s = document.createElement('script'); s.src = 'https://player.twitch.tv/js/embed/v1.js';
      s.onload = function () { twitchLoading.forEach(function (f) { f(); }); twitchLoading = []; };
      document.head.appendChild(s);
    }
    twitchLoading.push(cb);
  }

  // POV con la API de Twitch (permite cambiar el volumen); el resto (timer, kills, dinero) va siempre en silencio
  function povSource(runner, idx) {
    var wrap = document.createElement('div');
    wrap.style.cssText = 'position:absolute;left:0;top:0;width:' + FW + 'px;height:' + FH + 'px;transform-origin:0 0';
    withTwitch(function () {
      var obj = new window.Twitch.Player(wrap, { channel: runner.channel, parent: [parent], width: FW, height: FH, muted: vols[idx] === 0, autoplay: true, controls: false });
      povs[idx] = { obj: obj, ready: false };
      obj.addEventListener(window.Twitch.Player.READY, function () { povs[idx].ready = true; applyVol(idx); });
    });
    return wrap;
  }
  function iframeSource(runner) {
    var f = document.createElement('iframe');
    f.src = 'https://player.twitch.tv/?channel=' + encodeURIComponent(runner.channel) + '&parent=' + encodeURIComponent(parent) + '&muted=true&autoplay=true&controls=false';
    f.setAttribute('allow', 'autoplay; fullscreen'); f.setAttribute('scrolling', 'no');
    return f;
  }
  // En pruebas locales, ?mockA=url&mockB=url usan una imagen en vez del reproductor de Twitch
  function source(runner, idx, kind) {
    var mock = q.get(idx === 0 ? 'mockA' : 'mockB');
    if (mock) { var img = document.createElement('img'); img.src = mock; return img; }
    return kind === 'pov' ? povSource(runner, idx) : iframeSource(runner);
  }
  function place(runner, idx, kind, spec) {
    var c = (runner.crops || {})[kind]; if (!c || !spec) return;
    var sw = spec[2], sh = spec[3], cw = c.w * FW, ch = c.h * FH;
    var s = Math.min(sw / cw, sh / ch), dw = cw * s, dh = ch * s;
    var ox = spec[4] === 'l' ? 0 : spec[4] === 'r' ? sw - dw : (sw - dw) / 2, oy = (sh - dh) / 2;
    var slot = document.createElement('div'); slot.className = 'slot s-' + kind;
    slot.style.cssText = 'left:' + spec[0] + 'px;top:' + spec[1] + 'px;width:' + sw + 'px;height:' + sh + 'px';
    var box = document.createElement('div'); box.style.cssText = 'position:absolute;left:' + ox + 'px;top:' + oy + 'px;width:' + dw + 'px;height:' + dh + 'px;overflow:hidden';
    var src = source(runner, idx, kind);
    src.style.transform = 'translate(' + (-c.x * FW * s) + 'px,' + (-c.y * FH * s) + 'px) scale(' + s + ')';
    box.appendChild(src); slot.appendChild(box); host.appendChild(slot);
  }

  // Cambios de volumen desde race-volume.html
  window.addEventListener('storage', function (e) { if (e.key === KEY) { var v = readStored(); if (v) setVols(v); } });
  try { var bc = new BroadcastChannel('ditman-race'); bc.onmessage = function (e) { if (e.data && e.data.v) setVols(e.data.v); }; } catch (e) {}

  fetch('../data/race.json?_=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) {
    var runners = (j.runners || []).slice(0, 2);
    // volumen inicial: lo ultimo guardado desde race-volume.html, si no ?vol=, si no el 'volume' (o 'audio') de race.json
    runners.forEach(function (r, i) { vols[i] = r.volume !== undefined ? clamp(r.volume) : (r.audio ? 100 : 0); });
    var stored = readStored(); if (stored) for (var i = 0; i < 2; i++) if (stored[i] !== undefined) vols[i] = clamp(stored[i]);
    if (q.get('vol')) q.get('vol').split(',').forEach(function (n, i) { if (i < 2 && n !== '') vols[i] = clamp(n); });
    runners.forEach(function (runner, idx) {
      ['pov', 'timer', 'kills', 'money'].forEach(function (k) { place(runner, idx, k, SLOTS[idx][k]); });
    });
    // panel de volumen dentro de la propia pagina (para usarlo con "Interactuar" en OBS): ?controls=1
    if (q.get('controls') === '1') {
      var f = document.createElement('iframe'); f.src = 'race-volume.html?embed=1';
      f.style.cssText = 'position:fixed;left:50%;bottom:8px;transform:translateX(-50%);width:640px;height:150px;border:0;z-index:99999;background:#0A0908';
      document.body.appendChild(f);
    }
  });
})();
