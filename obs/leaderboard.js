// Pinta la tabla desde data/leaderboard.json en <div id="lb">.
(function () {
  var box = document.getElementById('lb'), last = '';
  var q = new URLSearchParams(location.search);
  var TOP = 142, PITCH = 36.96, GAP = 30, HEADER = q.get('header') === '1';
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function pts(v) { return Number(v).toLocaleString('en-US', { maximumFractionDigits: 1 }); }

  function header() {
    [['#', 36, 42, 'center'], ['Runner', 176, 200, 'left'], ['Group', 504, 52, 'center'], ['Pts', 553, 100, 'right'], ['PB', 662, 150, 'right'], ['Best race', 822, 150, 'right'], ['Avg best 2', 982, 150, 'right'], ['Results', 1148, 120, 'left']]
      .forEach(function (c) { var h = el('div', 'hdr', c[0]); h.style.left = c[1] + 'px'; h.style.width = c[2] + 'px'; h.style.textAlign = c[3]; box.appendChild(h); });
  }

  OBS.pollJson('../data/leaderboard.json', function (j) {
    var rows = (j.rows || []).slice(0, 24), sig = JSON.stringify([rows, j.qualifyAfter, j.qualifyText, HEADER]);
    if (sig === last) return; last = sig; box.textContent = '';
    if (HEADER) header();
    var qa = parseInt(j.qualifyAfter, 10) || 0;
    rows.forEach(function (r, i) {
      var top = TOP + i * PITCH + (qa && i >= qa ? GAP : 0);
      var lr = el('div', 'lr fade' + (qa && i < qa ? ' top8' : '')); lr.style.top = top + 'px'; lr.style.animationDelay = (i * 25) + 'ms';
      lr.appendChild(el('div', 'c-rank', r.rank != null ? r.rank : i + 1));
      var tr = r.trend === 'up' ? ['up', '▲'] : r.trend === 'down' ? ['down', '▼'] : ['same', '–'];
      lr.appendChild(el('div', 'c-tr ' + tr[0], tr[1]));
      var fl = el('div', 'c-flag'); if (r.country) { var f = el('span', 'fi fi-' + String(r.country).toLowerCase()); fl.appendChild(f); } lr.appendChild(fl);
      lr.appendChild(el('div', 'c-name', r.name || ''));
      lr.appendChild(el('div', 'c-grp ' + String(r.group || '').toLowerCase(), r.group || ''));
      lr.appendChild(el('div', 'c-pts', pts(r.pts)));
      lr.appendChild(el('div', 'c-pb', r.pb || ''));
      lr.appendChild(el('div', 'c-best', r.best || ''));
      lr.appendChild(el('div', 'c-avg', r.avg || ''));
      var res = el('div', 'c-res');
      (r.results || []).slice(0, 2).forEach(function (x, k) {
        var b = el('div', 'bd ' + (String(x.r).toUpperCase() === 'W' ? 'w' : 'l'), String(x.r || '').toUpperCase()); b.style.left = (k * 44) + 'px';
        if (x.mark) b.appendChild(el('i', null, '+'));
        res.appendChild(b);
      });
      lr.appendChild(res); box.appendChild(lr);
    });
    if (qa && qa < rows.length) {
      var ql = el('div', 'q', '★ ' + (j.qualifyText || 'Qualify')); ql.style.top = (TOP + qa * PITCH + GAP / 2 - 12) + 'px'; box.appendChild(ql);
    }
  });
})();
