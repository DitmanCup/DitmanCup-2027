// Pinta las filas del Top donors en <ol id="list">. Lo usan top-donors.html (con marco) y top-donors-list.html (solo texto).
(function () {
  var list = document.getElementById('list'), last = '';
  function cls(i) { return i === 0 ? 'n1' : i === 1 ? 'n2' : i === 2 ? 'n3' : 'nx'; }
  OBS.start(function (ed) {
    var donors = (ed.donors || []).slice().sort(function (a, b) { return b.total - a.total; }).slice(0, OBS.count);
    var sig = JSON.stringify(donors.map(function (d) { return [d.name, d.total]; }));
    if (sig === last) return;   // sin cambios: no se repinta
    last = sig; list.textContent = '';
    donors.forEach(function (d, i) {
      var li = document.createElement('li'); li.className = 'r fade'; li.style.animationDelay = (i * 60) + 'ms';
      var rk = document.createElement('span'); rk.className = 'rk silver'; rk.textContent = String(i + 1).padStart(2, '0');
      var nm = document.createElement('span'); nm.className = 'nm ' + cls(i); nm.textContent = d.name;
      var am = document.createElement('span'); am.className = 'am gold'; am.textContent = OBS.money(d.total);
      li.appendChild(rk); li.appendChild(nm); li.appendChild(am); list.appendChild(li);
    });
  });
})();
