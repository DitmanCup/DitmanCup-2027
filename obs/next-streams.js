// Pinta la lista "Next streams" desde data/next-streams.json en <div id="streams">.
(function () {
  var box = document.getElementById('streams'), last = '';
  OBS.pollJson('../data/next-streams.json', function (j) {
    var items = (j.items || []).filter(function (x) { return x && x.title; }).slice(0, 5);
    var sig = JSON.stringify(items);
    if (sig === last) return; last = sig; box.textContent = '';
    items.forEach(function (x, i) {
      var it = document.createElement('div'); it.className = 'it fade'; it.style.animationDelay = (i * 60) + 'ms';
      var w = document.createElement('div'); w.className = 'when gold'; w.textContent = x.when || '';
      var t = document.createElement('div'); t.className = 'ttl silver'; t.textContent = x.title;
      it.appendChild(w); it.appendChild(t); box.appendChild(it);
    });
  });
})();
