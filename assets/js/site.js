(function () {
  var HOLE = /\{\{\s*([^{}]+?)\s*\}\}/g;
  function lit(p) {
    if (p === 'true') return { v: true }; if (p === 'false') return { v: false };
    if (p === 'null') return { v: null }; if (/^-?\d+(\.\d+)?$/.test(p)) return { v: +p };
    var m = p.match(/^(['"])(.*)\1$/); return m ? { v: m[2] } : null;
  }
  function resolve(path, vals, sc) {
    var l = lit(path); if (l) return l.v;
    var parts = path.split('.'), h = parts[0], cur = sc && Object.prototype.hasOwnProperty.call(sc, h) ? sc[h] : vals[h];
    for (var i = 1; i < parts.length; i++) { if (cur == null) return undefined; cur = cur[parts[i]]; }
    return cur;
  }
  function scopeFrom(frames, vals) {
    var sc = {};
    for (var k = 0; k < frames.length; k++) { var f = frames[k], list = resolve(f.list, vals, sc), arr = Array.isArray(list) ? list : []; sc[f.as] = arr[f.i]; sc.$index = f.i; }
    return sc;
  }
  function str(v) {
    if (v == null || v === false || v === true) return '';
    if (Array.isArray(v)) return v.map(str).join('');
    if (typeof v === 'object' || typeof v === 'function') return '';
    return String(v);
  }
  function interp(tpl, vals, sc) { return tpl.replace(HOLE, function (m, p) { return str(resolve(p.trim(), vals, sc)); }); }

  var inst, B = [], els = {}, texts = {}, ifs = {}, pending = false;
  function schedule() { if (pending) return; pending = true; Promise.resolve().then(function () { pending = false; update(); }); }
  function DCLogic(p) { this.props = p || {}; this.state = {}; }
  DCLogic.prototype.setState = function (p) { var patch = typeof p === 'function' ? p(this.state, this.props) : p; this.state = Object.assign({}, this.state, patch); schedule(); };
  DCLogic.prototype.forceUpdate = function () { schedule(); };
  window.DCLogic = DCLogic;
  window.React = { createElement: function () { return null; }, useState: function (v) { return [v, function () {}]; }, useEffect: function () {}, useRef: function (v) { return { current: v }; } };

  function update() {
    var vals = inst.renderVals();
    for (var i = 0; i < B.length; i++) {
      var b = B[i]; if (b.t === 'on') continue;
      var sc = scopeFrom(b.f, vals), v;
      if (b.t === 't') { var tn = texts[i]; if (tn) { v = interp(b.tpl, vals, sc); if (tn.nodeValue !== v) tn.nodeValue = v; } }
      else if (b.t === 'a') { var el = els[i]; if (el) { v = interp(b.tpl, vals, sc); if (el.getAttribute(b.n) !== v) el.setAttribute(b.n, v); } }
      else if (b.t === 'v') { var inp = els[i]; if (inp) { v = interp(b.tpl, vals, sc); if (inp.value !== v) inp.value = v; } }
      else if (b.t === 'if') { var show = !!resolve(b.p, vals, sc); (ifs[i] || []).forEach(function (e) { if (show) e.removeAttribute('data-hide'); else e.setAttribute('data-hide', ''); }); }
    }
  }

  function initDC() {
    var C = window.__DCC, cfgEl = document.getElementById('dc-b');
    if (!C || !cfgEl) return;
    var cfg = JSON.parse(cfgEl.textContent); B = cfg.b;
    inst = new C(cfg.p || {});
    document.querySelectorAll('[data-b]').forEach(function (el) { el.getAttribute('data-b').split(' ').forEach(function (id) { els[id] = el; }); });
    document.querySelectorAll('[data-if]').forEach(function (el) { var id = el.getAttribute('data-if'); (ifs[id] = ifs[id] || []).push(el); });
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT), n;
    while ((n = w.nextNode())) {
      var m = n.nodeValue.match(/^b:(\d+)$/); if (!m) continue;
      var t = n.nextSibling;
      if (!t || t.nodeType !== 3) { t = document.createTextNode(''); n.parentNode.insertBefore(t, n.nextSibling); }
      texts[m[1]] = t;
    }
    B.forEach(function (b, i) {
      if (b.t !== 'on' || !els[i]) return;
      els[i].addEventListener(b.e, function (e) {
        var vals = inst.renderVals(), fn = resolve(b.p, vals, scopeFrom(b.f, vals));
        if (typeof fn === 'function') fn(e);
      });
    });
    if (inst.componentDidMount) inst.componentDidMount();
  }

  function initMenu() {
    var bt = document.querySelector('.wa-burger'), mn = document.getElementById('wa-mnav');
    if (!bt || !mn) return;
    function set(open) {
      if (open) mn.setAttribute('data-open', ''); else mn.removeAttribute('data-open');
      bt.setAttribute('aria-expanded', open ? 'true' : 'false');
      bt.setAttribute('aria-label', open ? 'Zatvori meni' : 'Otvori meni');
    }
    bt.addEventListener('click', function () { set(!mn.hasAttribute('data-open')); });
    var ex = mn.querySelector('.wa-mexp'), sub = document.getElementById('wa-msub');
    if (ex && sub) ex.addEventListener('click', function () {
      var o = !sub.hasAttribute('data-open');
      if (o) sub.setAttribute('data-open', ''); else sub.removeAttribute('data-open');
      ex.setAttribute('aria-expanded', o ? 'true' : 'false');
    });
    mn.addEventListener('click', function (e) { if (e.target.closest('a')) set(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') set(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 960) set(false); });
  }

  function initGauge() {
    var ring = document.getElementById('wa-g-ring');
    if (!ring || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
    var num = document.getElementById('wa-g-num'), pct = document.getElementById('wa-g-pct'), lbl = document.getElementById('wa-g-lbl'), t0 = 0;
    function frame(t) {
      if (!t0) t0 = t;
      var e = (t - t0) % 4800, p = Math.min(e / 1900, 1), v = Math.round(100 * (1 - Math.pow(1 - p, 3)));
      var c = v < 50 ? '#e5534b' : v < 90 ? '#e8a33d' : '#1aa89d', done = v >= 100;
      ring.style.background = 'conic-gradient(' + c + ' 0 ' + v + '%, #1c2423 0)';
      ring.style.boxShadow = done ? '0 0 60px -10px rgba(26,168,157,0.55)' : 'none';
      num.textContent = v; pct.style.color = c;
      lbl.textContent = done ? 'SPEED TEST' : 'TESTIRANJE…'; lbl.style.color = done ? '#2cc4b6' : '#9aa5a3';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function boot() { initMenu(); initDC(); initGauge(); }
  if (document.readyState === 'complete') boot(); else document.addEventListener('DOMContentLoaded', boot);
})();
