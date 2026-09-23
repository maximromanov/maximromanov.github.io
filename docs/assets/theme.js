/* Dark-mode toggle and e-mail unscrambling. The only script on the site; no tracking of any kind. */
(function () {
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  function current() {
    var t = root.getAttribute('data-theme');
    if (t === 'dark' || t === 'light') return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  btn.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();

/* E-mail addresses are stored scrambled (ROT13, reversed) so they never appear in the page source. */
(function () {
  if (window.NO_EMAIL_DECODE) return;
  var els = document.querySelectorAll('a.email[data-e]');
  function decode(s) {
    return s.split('').reverse().join('').replace(/[a-zA-Z]/g, function (c) {
      return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
    });
  }
  for (var i = 0; i < els.length; i++) {
    els[i].setAttribute('title', 'Send an e-mail');
    els[i].addEventListener('click', function (ev) {
      ev.preventDefault();
      window.location.href = 'mailto:' + decode(this.getAttribute('data-e'));
    });
  }
})();

/* Public view counter (GoatCounter), shown only when the site config enables it. */
(function () {
  var el = document.querySelector('.views[data-views]');
  if (!el || !window.fetch) return;
  fetch(el.getAttribute('data-views')).then(function (r) { return r.ok ? r.json() : null; }).then(function (d) {
    if (d && d.count) el.textContent = String(d.count).replace(/\s/g, ',') + ' views.';
  }).catch(function () {});
})();
