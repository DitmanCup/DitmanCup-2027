// Carga data/donors.json (lo actualiza el workflow de GitHub Actions) y repinta solo, sin recargar la pagina.
(function () {
  var q = new URLSearchParams(location.search);
  var REFRESH = Math.max(10, parseInt(q.get('refresh'), 10) || 60) * 1000;
  var panel = q.get('panel');
  if (panel === 'none' || panel === 'solid') document.body.classList.add('panel-' + panel);

  function money(n) { return '$' + Number(n).toLocaleString('en-US', { maximumFractionDigits: 2 }); }

  // Edicion a mostrar: la mas reciente por defecto; ?edition=2026 busca ese ano en el titulo; ?edition=all suma todas
  function pickEdition(j) {
    var ed = (q.get('edition') || '').trim(), src = j.sources || [];
    if (ed === 'all') return { title: 'All editions', raised: j.total, donors: j.donors || [] };
    var s = null;
    if (ed) s = src.filter(function (x) { return String(x.title).indexOf(ed) >= 0 || String(x.id) === ed; })[0];
    if (!s) s = src.slice().sort(function (a, b) { return String(b.startAt || '').localeCompare(String(a.startAt || '')); })[0];
    return s || { title: '', raised: j.total || 0, donors: j.donors || [] };
  }

  function load() {
    return fetch('../data/donors.json?_=' + Date.now(), { cache: 'no-store' })
      .then(function (r) { return r.ok ? r.json() : Promise.reject(); })
      .then(pickEdition);
  }

  window.OBS = {
    money: money,
    count: Math.min(10, Math.max(1, parseInt(q.get('count'), 10) || 5)),
    // render(edicion) se llama al cargar y despues cada REFRESH segundos; si falla una consulta se mantiene lo que ya se ve
    start: function (render) {
      function tick() { load().then(render).catch(function () {}); }
      tick(); setInterval(tick, REFRESH);
    }
  };
})();
