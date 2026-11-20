// Pinta la lista "Up next" desde data/up-next.json en <div id="upnext">.
(function () {
  var box = document.getElementById('upnext'), last = '', MAXW = 379;
  function el(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  OBS.pollJson('../data/up-next.json', function (j) {
    var items = (j.items || []).filter(function (x) { return x && (x.home || x.away || x.time); }).slice(0, 3);
    var sig = JSON.stringify(items);
    if (sig === last) return; last = sig; box.textContent = '';
    items.forEach(function (x, i) {
      var row = el('div', 'mrow fade'); row.style.animationDelay = (i * 60) + 'ms';
      row.appendChild(el('div', 'tm gold', x.time || ''));
      var mt = el('div', 'mt'), pl = el('div', 'pl');
      pl.appendChild(el('span', 'pn silver', x.home || ''));
      pl.appendChild(el('span', 'vs', 'VS'));
      pl.appendChild(el('span', 'pn silver', x.away || ''));
      mt.appendChild(pl);
      if (x.stage) mt.appendChild(el('div', 'stg', x.stage));
      row.appendChild(mt); box.appendChild(row);
      // Si los nombres son largos, se achica el bloque para que no se salga de la caja
      var w = pl.scrollWidth; if (w > MAXW) pl.style.fontSize = (40 * MAXW / w) + 'px';
    });
  });
})();
