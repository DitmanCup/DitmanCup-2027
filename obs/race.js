// Arma los huecos de la pantalla race con reproductores de Twitch recortados, segun data/race.json.
(function () {
  var host = document.getElementById('race'), q = new URLSearchParams(location.search), FW = 1920, FH = 1080;
  // Huecos del diseno: [x, y, ancho, alto, alineacion]
  var SLOTS = [
    { pov: [10, 12, 944, 531, 'c'],  timer: [29, 720, 440, 98, 'c'],   kills: [488, 764, 105, 34, 'c'],  money: [618, 764, 106, 34, 'c'] },
    { pov: [966, 12, 944, 531, 'c'], timer: [1452, 720, 439, 98, 'c'], kills: [1327, 764, 106, 34, 'c'], money: [1197, 764, 106, 34, 'c'] }
  ];
  // En pruebas locales, ?mockA=url&mockB=url usan una imagen en vez del reproductor de Twitch
  function source(runner, idx, muted) {
    var mock = q.get(idx === 0 ? 'mockA' : 'mockB');
    if (mock) { var img = document.createElement('img'); img.src = mock; return img; }
    var f = document.createElement('iframe');
    var parent = location.hostname || 'localhost';
    f.src = 'https://player.twitch.tv/?channel=' + encodeURIComponent(runner.channel) + '&parent=' + encodeURIComponent(parent) + '&muted=' + (muted ? 'true' : 'false') + '&autoplay=true&controls=false';
    f.setAttribute('allow', 'autoplay; fullscreen'); f.setAttribute('scrolling', 'no');
    return f;
  }
  function place(runner, idx, kind, spec, muted) {
    var c = (runner.crops || {})[kind]; if (!c || !spec) return;
    var sw = spec[2], sh = spec[3], cw = c.w * FW, ch = c.h * FH;
    var s = Math.min(sw / cw, sh / ch), dw = cw * s, dh = ch * s;
    var ox = spec[4] === 'l' ? 0 : spec[4] === 'r' ? sw - dw : (sw - dw) / 2, oy = (sh - dh) / 2;
    var slot = document.createElement('div'); slot.className = 'slot s-' + kind;
    slot.style.cssText = 'left:' + spec[0] + 'px;top:' + spec[1] + 'px;width:' + sw + 'px;height:' + sh + 'px';
    var box = document.createElement('div'); box.style.cssText = 'position:absolute;left:' + ox + 'px;top:' + oy + 'px;width:' + dw + 'px;height:' + dh + 'px;overflow:hidden';
    var src = source(runner, idx, kind === 'pov' ? muted : true);
    src.style.transform = 'translate(' + (-c.x * FW * s) + 'px,' + (-c.y * FH * s) + 'px) scale(' + s + ')';
    box.appendChild(src); slot.appendChild(box); host.appendChild(slot);
  }
  fetch('../data/race.json?_=' + Date.now(), { cache: 'no-store' }).then(function (r) { return r.json(); }).then(function (j) {
    (j.runners || []).slice(0, 2).forEach(function (runner, idx) {
      ['pov', 'timer', 'kills', 'money'].forEach(function (k) { place(runner, idx, k, SLOTS[idx][k], !runner.audio); });
    });
  });
})();
