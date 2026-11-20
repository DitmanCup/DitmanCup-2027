// Pinta los 3 grupos desde data/groups.json en <div id="gg">.
(function () {
  var box = document.getElementById('gg'), roundEl = document.getElementById('round'), last = '';
  var X0 = 17, DX = 457.5, ROW0 = 236, PITCH = 102;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function pts(v) { return Number(v).toLocaleString('en-US', { maximumFractionDigits: 1 }); }
  OBS.pollJson('../data/groups.json', function (j) {
    var sig = JSON.stringify(j); if (sig === last) return; last = sig;
    roundEl.textContent = j.round || '';
    box.textContent = '';
    (j.groups || []).slice(0, 3).forEach(function (g, gi) {
      var grp = el('div', 'grp c-' + (g.color || 'gold')); grp.style.left = (X0 + gi * DX) + 'px';
      grp.appendChild(el('div', 'gh', g.name || ''));
      grp.appendChild(el('div', 'gr', g.rule || ''));
      (g.rows || []).slice(0, 8).forEach(function (r, i) {
        var row = el('div', 'grow fade' + (r.qualified ? ' q' : '')); row.style.top = (ROW0 + i * PITCH) + 'px'; row.style.animationDelay = (gi * 120 + i * 30) + 'ms';
        row.appendChild(el('div', 'grk', r.rank != null ? r.rank : i + 1));
        var tr = r.trend === 'up' ? ['up', '▲'] : r.trend === 'down' ? ['down', '▼'] : ['same', '–'];
        row.appendChild(el('div', 'gtr ' + tr[0], tr[1]));
        var fl = el('div', 'gfl'); if (r.country) fl.appendChild(el('span', 'fi fi-' + String(r.country).toLowerCase())); row.appendChild(fl);
        row.appendChild(el('div', 'gnm', r.name || ''));
        row.appendChild(el('div', 'gav', 'Avg best 2 ' + (r.avg || '')));
        row.appendChild(el('div', 'gpt' + (g.ptsGold ? ' gold' : ''), pts(r.pts)));
        if (r.result && r.result.r) {
          var b = el('div', 'gbd ' + (String(r.result.r).toUpperCase() === 'W' ? 'w' : 'l'), String(r.result.r).toUpperCase());
          if (r.result.mark) b.appendChild(el('i', null, '+'));
          row.appendChild(b);
        }
        grp.appendChild(row);
      });
      box.appendChild(grp);
    });
  });
})();
