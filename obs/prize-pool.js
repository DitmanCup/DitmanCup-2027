// Pinta el monto del prize pool en #amt. Lo usan prize-pool.html (con marco) y prize-amount.html (solo el monto).
(function () {
  var el = document.getElementById('amt'), last = null;
  OBS.start(function (ed) {
    var v = ed.raised != null ? ed.raised : 0;
    if (v === last) return; last = v;
    el.textContent = OBS.money(v);
    el.classList.remove('fade'); void el.offsetWidth; el.classList.add('fade');
  });
})();
