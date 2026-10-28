/* Web Answer Studio – besplatna SEO provera (sekcija #seo-provera) */
(function () {
  'use strict';

  /* ===== Podešavanja ===================================================== */
  var CFG = Object.assign({
    // Adresa Cloudflare Workera (posle postavljanja Workera upišite njegovu adresu + /audit)
    workerUrl: 'https://audit.webanswerstudio.com/audit',
    // Isti Web3Forms ključ kao u kontakt formi: leadovi stižu na isti mejl
    web3formsKey: '51e5be71-4bed-474a-81b7-f7a42254f50f',
    contactUrl: 'kontakt',
    privacyUrl: 'politika-privatnosti',
    gate: true,        // true: ceo izveštaj se otključava emailom; false: sve odmah
    topCount: 3,
    runner: null       // samo za testiranje: async function (url) { return rezultat; }
  }, window.WA_AUDIT_CONFIG || {});
  /* ======================================================================= */

  var root = document.querySelector('[data-wa-audit]');
  if (!root) return;
  var form = root.querySelector('[data-wa-form]');
  var input = root.querySelector('[data-wa-url]');
  var btn = root.querySelector('[data-wa-submit]');
  var statusEl = root.querySelector('[data-wa-status]');
  var resultEl = root.querySelector('[data-wa-result]');
  var btnHtml = btn.innerHTML;
  var busy = false, timers = [], last = null;

  var STORE = 'wa-audit-email';
  var savedEmail = (function () { try { return localStorage.getItem(STORE) || ''; } catch (e) { return ''; } })();

  var ICON = {
    pass: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    fail: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    warn: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 5v9M12 19h.01"/></svg>',
    info: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M12 11v7M12 6h.01"/></svg>',
    alert: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0zM12 9v4M12 17h.01"/></svg>',
    arrow: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  };

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function plural(n, one, few, many) {
    var d = n % 10, h = n % 100;
    return d === 1 && h !== 11 ? one : d >= 2 && d <= 4 && (h < 12 || h > 14) ? few : many;
  }
  function color(score) { return score >= 85 ? '#1aa89d' : score >= 65 ? '#0d7f76' : score >= 45 ? '#d68a00' : '#d64535'; }
  function track(name, params) {
    try { if (typeof window.gtag === 'function') window.gtag('event', name, params || {}); } catch (e) {}
    try { window.dispatchEvent(new CustomEvent('wa-audit', { detail: Object.assign({ type: name }, params) })); } catch (e) {}
  }

  // Lepljivi meni sajta ne sme da prekrije vrh rezultata posle skrolovanja.
  function stickyBottom() {
    var max = 0;
    try {
      document.elementsFromPoint(window.innerWidth / 2, 2).forEach(function (el) {
        for (var n = el; n && n !== document.body; n = n.parentElement) {
          var pos = getComputedStyle(n).position;
          if (pos === 'sticky' || pos === 'fixed') { max = Math.max(max, n.getBoundingClientRect().bottom); break; }
        }
      });
    } catch (e) {}
    return max;
  }
  function scrollToEl(el) {
    var y = el.getBoundingClientRect().top + window.pageYOffset - stickyBottom() - 16;
    window.scrollTo({ top: Math.max(y, 0), behavior: 'smooth' });
  }

  /* ---------- učitavanje ---------- */
  var STEPS = ['Otvaramo vaš sajt', 'Proveravamo SEO osnove', 'Proveravamo vidljivost za AI pretragu', 'Merimo brzinu na telefonu (do 30 s)'];

  function showSteps() {
    statusEl.innerHTML = '<ul class="wa-steps">' + STEPS.map(function (s) { return '<li data-s="wait"><i></i>' + esc(s) + '</li>'; }).join('') + '</ul>';
    var items = statusEl.querySelectorAll('li');
    [0, 1400, 2800, 4200].forEach(function (ms, i) {
      timers.push(setTimeout(function () {
        if (i > 0) items[i - 1].setAttribute('data-s', 'done');
        items[i].setAttribute('data-s', 'run');
      }, ms));
    });
  }
  function clearTimers() { timers.forEach(clearTimeout); timers = []; }

  function setBusy(on) {
    busy = on;
    btn.disabled = on;
    input.readOnly = on;
    btn.innerHTML = on ? 'Proveravam…' : btnHtml;
  }

  function showError(msg) {
    statusEl.innerHTML = '<div class="wa-error" role="alert">' + ICON.alert + '<span>' + esc(msg) + '</span></div>';
  }

  /* ---------- poziv Workera ---------- */
  function callWorker(url) {
    if (typeof CFG.runner === 'function') return CFG.runner(url);
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var t = setTimeout(function () { if (ctrl) ctrl.abort(); }, 75000);
    return fetch(CFG.workerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url }),
      signal: ctrl ? ctrl.signal : undefined
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (j) {
        if (!r.ok) throw new Error(j.message || 'Provera trenutno nije dostupna. Pokušajte ponovo za minut.');
        return j;
      });
    }, function (e) {
      throw new Error(e && e.name === 'AbortError' ? 'Provera traje predugo. Pokušajte ponovo.' : 'Provera trenutno nije dostupna. Proverite internet vezu i pokušajte ponovo.');
    }).finally(function () { clearTimeout(t); });
  }

  /* ---------- prikaz ---------- */
  function ring(score) {
    var r = 52, c = 2 * Math.PI * r;
    return '<div class="wa-ring" role="img" aria-label="Skor ' + score + ' od 100">' +
      '<svg width="124" height="124" viewBox="0 0 124 124" aria-hidden="true"><circle class="wa-ring__track" cx="62" cy="62" r="' + r + '" fill="none" stroke-width="10"/>' +
      '<circle class="wa-ring__bar" cx="62" cy="62" r="' + r + '" fill="none" stroke="' + color(score) + '" stroke-width="10" stroke-linecap="round" stroke-dasharray="' + c.toFixed(1) + '" stroke-dashoffset="' + c.toFixed(1) + '" data-target="' + (c * (1 - score / 100)).toFixed(1) + '"/></svg>' +
      '<div class="wa-ring__num">' + score + '<small>od 100</small></div></div>';
  }

  function item(c, top) {
    return '<li class="wa-item' + (top ? ' wa-item--top' : '') + '" data-s="' + c.status + '">' +
      '<span class="wa-ico" data-s="' + c.status + '">' + ICON[c.status] + '</span>' +
      '<div class="wa-item__body"><div class="wa-item__title">' + esc(c.title) + '</div>' +
      '<div class="wa-item__detail">' + esc(c.detail) + '</div>' +
      (c.fix ? '<div class="wa-item__fix"><b>Rešenje:</b> ' + esc(c.fix) + '</div>' : '') +
      '</div></li>';
  }

  function fullReport(res) {
    var order = { fail: 0, warn: 1, pass: 2, info: 3 };
    return res.categories.map(function (cat) {
        var list = res.checks.filter(function (c) { return c.cat === cat.id; })
          .sort(function (a, b) { return order[a.status] - order[b.status] || b.weight - a.weight; });
        if (!list.length) return '';
        var pill = cat.score != null ? '<span class="wa-pill" style="background:' + color(cat.score) + '1f;color:' + color(cat.score) + '">' + cat.score + '/100</span>' : '';
        return '<div class="wa-group"><h4 class="wa-r__h">' + esc(cat.label) + ' ' + pill + '</h4><ul class="wa-list">' + list.map(function (c) { return item(c, false); }).join('') + '</ul></div>';
      }).join('');
  }

  function gate(res, hiddenCount) {
    return '<form class="wa-gate" data-wa-gate novalidate>' +
      '<div><div class="wa-gate__title">Otključajte ceo izveštaj</div>' +
      '<p class="wa-gate__text">Izveštaj ima još ' + hiddenCount + ' ' + plural(hiddenCount, 'proveru', 'provere', 'provera') + ' sa uputstvom kako da popravite svaku stavku. Unesite email i odmah ga prikazujemo ovde.</p></div>' +
      '<div class="wa-gate__row"><label class="wa-sr" for="wa-gate-email">Email adresa</label>' +
      '<input class="wa-gate__email" id="wa-gate-email" type="email" autocomplete="email" placeholder="vas@email.com" required value="' + esc(savedEmail) + '">' +
      '<input class="wa-hp" type="checkbox" name="botcheck" tabindex="-1" aria-hidden="true">' +
      '<button class="wa-gate__btn" type="submit">Prikaži ceo izveštaj</button></div>' +
      '<label class="wa-gate__consent"><input type="checkbox" required> <span>Slažem se da me Web Answer Studio kontaktira povodom ove analize. <a href="' + esc(CFG.privacyUrl) + '" target="_blank" rel="noopener">Politika privatnosti</a></span></label>' +
      '<div class="wa-gate__err" role="alert"></div></form>';
  }

  function cta() {
    return '<div class="wa-cta-box"><div><h4>Želite da ovo rešimo umesto vas?</h4><p>Javljamo se u roku od 24h sa planom i cenom, bez obaveze.</p></div>' +
      '<div class="wa-cta-box__actions"><a class="wa-cta-main" href="' + esc(CFG.contactUrl) + '">Zatraži analizu ' + ICON.arrow + '</a>' +
      '<button type="button" data-wa-again>Proveri drugi sajt</button></div></div>';
  }

  function render(res, unlocked) {
    var byId = {};
    res.checks.forEach(function (c) { byId[c.id] = c; });
    var top = (res.topIssues || []).slice(0, CFG.topCount).map(function (id) { return byId[id]; }).filter(Boolean);
    var scored = res.checks.filter(function (c) { return c.status !== 'info'; }).length;
    var hidden = Math.max(scored - top.length, 0);

    var html = '<div class="wa-r">' +
      '<div class="wa-r__head">' + ring(res.score) +
      '<div><div class="wa-r__kicker">REZULTAT PROVERE</div><div class="wa-r__host">' + esc(res.host) + '</div>' +
      '<p class="wa-r__verdict">' + esc(res.verdict) + '</p>' +
      '<p class="wa-r__meta">Proverena početna stranica · ' + res.counts.fail + ' kritičnih, ' + res.counts.warn + ' za doradu, ' + res.counts.pass + ' u redu</p></div></div>' +
      '<div class="wa-cats">' + res.categories.map(function (c) {
        return '<div class="wa-cat"><div class="wa-cat__top"><span>' + esc(c.label) + '</span><b>' + c.score + '</b></div><div class="wa-bar"><i style="background:' + color(c.score) + '" data-w="' + c.score + '"></i></div></div>';
      }).join('') + '</div>';

    if (unlocked) {
      html += '<div>' + fullReport(res) + '</div>';
    } else if (top.length) {
      html += '<div><h3 class="wa-r__h">Najvažnije za popravku</h3><ul class="wa-list">' + top.map(function (c) { return item(c, true); }).join('') + '</ul></div>';
      if (hidden) html += gate(res, hidden);
    } else {
      html += '<div><h3 class="wa-r__h">Svaka čast, nismo našli probleme</h3></div>';
    }
    if (res.notes && res.notes.length) html += '<p class="wa-notes">' + res.notes.map(esc).join(' ') + '</p>';
    html += cta() + '</div>';

    resultEl.innerHTML = html;
    resultEl.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        var bar = resultEl.querySelector('.wa-ring__bar');
        if (bar) bar.style.strokeDashoffset = bar.getAttribute('data-target');
        resultEl.querySelectorAll('.wa-bar i').forEach(function (i) { i.style.width = i.getAttribute('data-w') + '%'; });
      });
    });
    bind(res);
  }

  function bind(res) {
    var again = resultEl.querySelector('[data-wa-again]');
    if (again) again.addEventListener('click', function () {
      resultEl.hidden = true; resultEl.innerHTML = ''; statusEl.innerHTML = '';
      input.value = ''; input.focus();
      form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    var g = resultEl.querySelector('[data-wa-gate]');
    if (g) g.addEventListener('submit', function (e) {
      e.preventDefault();
      var email = g.querySelector('[type=email]').value.trim();
      var consent = g.querySelector('.wa-gate__consent input');
      var err = g.querySelector('.wa-gate__err');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { err.textContent = 'Unesite ispravnu email adresu.'; return; }
      if (!consent.checked) { err.textContent = 'Potvrdite saglasnost da bismo vam poslali izveštaj.'; return; }
      if (g.querySelector('[name=botcheck]').checked) return;
      var b = g.querySelector('.wa-gate__btn');
      b.disabled = true; b.textContent = 'Otključavam…';
      savedEmail = email;
      try { localStorage.setItem(STORE, email); } catch (x) {}
      sendLead(res, email).then(function () {
        render(res, true);
        var first = resultEl.querySelector('.wa-group');
        if (first) scrollToEl(first);
      });
    });
  }

  /* ---------- lead (Web3Forms) ---------- */
  function sendLead(res, email) {
    track('generate_lead', { method: 'seo_audit', value: res.score });
    if (!CFG.web3formsKey) return Promise.resolve();
    var problems = res.checks.filter(function (c) { return c.status === 'fail' || c.status === 'warn'; })
      .map(function (c) { return (c.status === 'fail' ? '✗ ' : '! ') + c.title + ': ' + c.detail; }).join('\n');
    var body = {
      access_key: CFG.web3formsKey,
      subject: 'SEO provera: ' + res.host + ' (' + res.score + '/100)',
      from_name: 'webanswerstudio.com – SEO provera',
      replyto: email,
      email: email,
      sajt: res.finalUrl || res.url,
      skor: res.score + '/100',
      kategorije: res.categories.map(function (c) { return c.label + ' ' + c.score; }).join(' · '),
      problemi: problems || 'Nema problema.',
      izvor: 'SEO provera na sajtu'
    };
    var ctrl = typeof AbortController !== 'undefined' ? new AbortController() : null;
    var t = setTimeout(function () { if (ctrl) ctrl.abort(); }, 8000);
    // Izveštaj se otključava i ako slanje ne uspe, da posetilac ne bude kažnjen.
    return fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body), signal: ctrl ? ctrl.signal : undefined
    }).catch(function () {}).then(function () { clearTimeout(t); });
  }

  /* ---------- slanje forme ---------- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (busy) return;
    var url = input.value.trim();
    if (!url || url.indexOf('.') < 0) { showError('Unesite adresu sajta, npr. vasajt.rs'); input.focus(); return; }

    setBusy(true);
    resultEl.hidden = true;
    resultEl.innerHTML = '';
    showSteps();
    track('seo_audit_start', {});

    Promise.resolve().then(function () { return callWorker(url); }).then(function (res) {
      clearTimers();
      statusEl.innerHTML = '';
      last = res;
      var unlocked = !CFG.gate || !!savedEmail;
      render(res, unlocked);
      if (unlocked && savedEmail && CFG.gate) sendLead(res, savedEmail);
      track('seo_audit_complete', { value: res.score });
      resultEl.focus({ preventScroll: true });
      scrollToEl(resultEl);
    }, function (err) {
      clearTimers();
      showError(err && err.message ? err.message : 'Provera nije uspela. Pokušajte ponovo.');
    }).then(function () { setBusy(false); });
  });
})();
