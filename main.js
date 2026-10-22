/* Intro: plays once per browser session, 5.4s.
   Add ?intro to the URL to force a replay while reviewing. */
(function () {
  var dialog = document.querySelector('#rhythm-intro');
  if (!dialog) return;

  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var KEY = 'define-rhythm-v1';
  var timer, active = false, prevOverflow = '', returnFocus = null;

  function finish() {
    if (timer) clearTimeout(timer);
    if (!active || !dialog) return;
    active = false;
    document.body.style.overflow = prevOverflow;
    var target = returnFocus || document.querySelector('header a[href="/"]');
    returnFocus = null;
    if (dialog.open) dialog.close();
    if (target) target.focus({ preventScroll: true });
    document.dispatchEvent(new Event('intro:done'));
  }

  function start(explicit) {
    if (!dialog || dialog.open || (!explicit && reduced.matches)) return;
    returnFocus = explicit && document.activeElement instanceof HTMLElement ? document.activeElement : null;
    prevOverflow = document.body.style.overflow;
    dialog.classList.toggle('rhythm-explicit', !!explicit);
    timer = setTimeout(finish, 5400);
    try {
      active = true;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      try { sessionStorage.setItem(KEY, 'seen'); } catch (e) {}
    } catch (e) {
      active = false;
      if (timer) clearTimeout(timer);
      document.body.style.overflow = prevOverflow;
    }
  }

  dialog.addEventListener('cancel', function (e) { e.preventDefault(); });
  dialog.addEventListener('close', function () { if (!dialog.open) finish(); });
  document.addEventListener('click', function (e) {
    if (e.target && e.target.closest && e.target.closest('[data-rhythm-replay]')) start(true);
  });
  reduced.addEventListener('change', function () { if (reduced.matches) finish(); });
  document.addEventListener('visibilitychange', function () { if (document.hidden) finish(); });
  window.addEventListener('pagehide', finish);

  var nav = performance.getEntriesByType('navigation')[0];
  var seen = false;
  try { seen = sessionStorage.getItem(KEY) === 'seen'; } catch (e) {}
  var forced = /[?&]intro\b/.test(location.search);
  var willPlay = forced || (!seen && !location.hash && (!nav || nav.type === 'navigate'));
  document.documentElement.dataset.intro = (willPlay && (forced || !reduced.matches)) ? 'pending' : 'none';
  if (forced) start(true);
  else if (willPlay) start();
  if (document.documentElement.dataset.intro === 'none') document.dispatchEvent(new Event('intro:done'));
})();

/* Mobile menu */
(function () {
  var toggle = document.getElementById('menu-toggle');
  var menu = document.getElementById('main-menu');
  var hamburger = document.getElementById('icon-hamburger');
  var close = document.getElementById('icon-close');
  if (!toggle || !menu) return;

  var open = false, lastFocused = null, prevOverflow = '';
  var links = Array.prototype.slice.call(menu.querySelectorAll('[data-menu-link]'));
  var desktop = window.matchMedia('(min-width: 768px)');

  function setOpen(v, opts) {
    if (open === v) return;
    open = v;
    toggle.setAttribute('aria-expanded', String(v));
    toggle.setAttribute('aria-label', v ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', String(!v));
    if (v) {
      lastFocused = document.activeElement;
      prevOverflow = document.body.style.overflow;
      menu.classList.add('is-open');
      menu.removeAttribute('inert');
      document.body.style.overflow = 'hidden';
      setTimeout(function () { if (open && !desktop.matches) (links[0] || menu).focus(); }, 0);
    } else {
      menu.classList.remove('is-open');
      menu.setAttribute('inert', '');
      document.body.style.overflow = prevOverflow;
      if ((!opts || opts.restoreFocus !== false) && lastFocused && lastFocused.focus) lastFocused.focus();
    }
    hamburger.classList.toggle('hidden', v);
    close.classList.toggle('hidden', !v);
  }

  toggle.addEventListener('click', function () { setOpen(!open); });
  desktop.addEventListener('change', function (e) { if (e.matches && open) setOpen(false, { restoreFocus: false }); });
  document.addEventListener('keydown', function (e) {
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); return; }
    if (e.key !== 'Tab' || !links.length) return;
    var first = links[0], last = links[links.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  links.forEach(function (l) { l.addEventListener('click', function () { setOpen(false, { restoreFocus: false }); }); });
})();


/* Hero: word reveal and scroll parallax, as on skanska.com/us/en.
   Words fade in and rise 20px over .35s, one line at a time, .2s apart;
   the intro paragraph fades in after the last line. */
(function () {
  var root = document.querySelector('[data-hero-split]');
  var intro = document.querySelector('[data-hero-intro]');
  var hero = document.querySelector('[data-hero-slot]');
  var media = document.querySelector('[data-hero-media]');
  var content = document.querySelector('[data-hero-content]');
  if (!root || !hero) return;

  var EASE = 'cubic-bezier(.25,.1,.25,1)', DURATION = 350, STEP = 200;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var text = root.textContent.trim();

  root.className = 'split-root';
  root.setAttribute('aria-label', text);
  root.innerHTML = text.split(/\s+/).map(function (w) {
    return '<span class="split-word" data-split="word">' + w + '</span>';
  }).join('');
  var words = Array.prototype.slice.call(root.querySelectorAll('.split-word'));
  words.forEach(function (w) { if (w.textContent.length > 12) w.style.hyphens = 'auto'; });
  if (intro && !reduced) intro.style.opacity = '.01';

  var played = false;
  function play() {
    if (played) return; played = true;
    if (reduced) { words.forEach(function (w) { w.style.opacity = 1; }); if (intro) intro.style.opacity = 1; return; }
    var top0 = root.getBoundingClientRect().top, lines = {};
    words.forEach(function (w) {
      var k = Math.round((w.getBoundingClientRect().top - top0) / 5);
      (lines[k] = lines[k] || []).push(w);
    });
    var keys = Object.keys(lines).map(Number).sort(function (a, b) { return a - b; });
    keys.forEach(function (k, i) {
      lines[k].forEach(function (w) {
        w.style.willChange = 'opacity, transform';
        var a = w.animate(
          [{ opacity: 0, transform: 'translate3d(0,20px,0)' }, { opacity: 1, transform: 'translate3d(0,0,0)' }],
          { duration: DURATION, easing: EASE, delay: i * STEP, fill: 'both' });
        a.onfinish = function () { w.style.opacity = 1; w.style.transform = 'translate3d(0,0,0)'; w.style.willChange = 'auto'; a.cancel(); };
      });
    });
    if (intro) {
      var b = intro.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DURATION, easing: EASE, delay: keys.length * STEP, fill: 'both' });
      b.onfinish = function () { intro.style.opacity = 1; b.cancel(); };
    }
  }
  document.addEventListener('intro:done', function () { requestAnimationFrame(play); });
  if (document.documentElement.dataset.intro === 'none') requestAnimationFrame(play);

  /* Parallax: image drifts 0-30% and text 0-20% of their height over one hero height of scroll */
  if (!reduced && media && content) {
    var ticking = false;
    function update() {
      ticking = false;
      var p = Math.min(1, Math.max(0, window.scrollY / hero.offsetHeight));
      media.style.transform = 'translateY(' + (p * 30) + '%) translateZ(0)';
      content.style.transform = 'translateY(' + (p * 20) + '%) translateZ(0)';
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  }
})();


/* Core offerings: the teaser you hover or focus becomes the expanded one and stays so */
(function () {
  var teasers = Array.prototype.slice.call(document.querySelectorAll('[data-teaser]'));
  teasers.forEach(function (t) {
    var arrow = t.querySelector('[data-teaser-arrow]');
    function enter() {
      teasers.forEach(function (o) { o.classList.toggle('expanded', o === t); });
      if (arrow) { arrow.style.transitionDuration = '200ms'; arrow.style.backgroundPosition = '50% center'; }
    }
    function leave() {
      if (arrow) { arrow.style.transitionDuration = '200ms'; arrow.style.backgroundPosition = '100% center'; }
    }
    t.addEventListener('mouseenter', enter);
    t.addEventListener('focus', enter);
    t.addEventListener('mouseleave', leave);
    t.addEventListener('blur', leave);
  });
})();


/* Explore projects gallery: the arrows move the strip one window at a time */
(function () {
  var g = document.querySelector('[data-gallery]');
  if (!g) return;
  var track = g.querySelector('[data-gallery-track]');
  var next = g.querySelector('[data-gallery-next]');
  var prev = g.querySelector('[data-gallery-prev]');
  var viewport = g.querySelector('.g-viewport');
  var offset = 0;
  function max() { return Math.max(0, track.scrollWidth - viewport.clientWidth); }
  function apply() {
    offset = Math.min(Math.max(0, offset), max());
    track.style.transform = 'translateX(' + (-offset) + 'px)';
    prev.hidden = offset <= 0;
    next.hidden = offset >= max() - 1;
  }
  next.addEventListener('click', function () { offset += viewport.clientWidth; apply(); });
  prev.addEventListener('click', function () { offset -= viewport.clientWidth; apply(); });
  window.addEventListener('resize', apply);
  g.addEventListener('gallery:reset', function () { offset = 0; apply(); });
  apply();
})();


/* Explore projects: each tab features a different property and swaps the gallery */
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[data-tab]'));
  var panel = document.querySelector('[data-gallery]');
  if (!tabs.length || !panel) return;
  var track = panel.querySelector('[data-gallery-track]');
  var title = document.querySelector('[data-featured-title]');
  var FEATURED = {
    explore: ['450 W 17th Street \u2013 New York', 'explore'],
    residential: ['Faith Lane, Ardsley \u2013 New York', 'residential'],
    loft: ['Hudson Street Loft \u2013 NY', 'loft'],
    landmark: ['West 88th St Townhouse - NYC', 'landmark'],
    commercial: ['IKEN Academy - NYC', 'commercial']
  };
  var LAYOUT = [['big', 1], ['pair', 2], ['pair', 2], ['big', 1], ['pair', 2], ['pair', 2]];
  var busy = false, current = 'explore';

  function slidesFor(folder) {
    var n = 0;
    return LAYOUT.map(function (s) {
      var imgs = '';
      for (var i = 0; i < s[1]; i++) { n++; imgs += '<img src="assets/gallery/' + folder + '/' + n + '.jpg" alt="" decoding="async">'; }
      return '<div class="g-slide g-' + s[0] + '">' + imgs + '</div>';
    }).join('');
  }

  function select(key) {
    if (busy || key === current) return;
    busy = true; current = key;
    tabs.forEach(function (t) {
      var on = t.dataset.tab === key;
      t.setAttribute('aria-selected', on ? 'true' : 'false');
      t.tabIndex = on ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', 'tab-' + key);
    var f = FEATURED[key];
    var imgs = slidesFor(f[1]);
    track.classList.add('is-swapping');
    setTimeout(function () {
      track.style.transition = 'none';
      track.style.transform = 'translateX(0)';
      track.innerHTML = imgs;
      title.textContent = f[0];
      panel.dispatchEvent(new Event('gallery:reset'));
      void track.offsetWidth;
      track.style.transition = '';
      track.classList.remove('is-swapping');
      busy = false;
    }, reduced() ? 0 : 350);
  }
  function reduced() { return matchMedia('(prefers-reduced-motion: reduce)').matches; }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () { select(t.dataset.tab); });
    t.addEventListener('keydown', function (e) {
      var d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!d) return;
      e.preventDefault();
      var n = tabs[(i + d + tabs.length) % tabs.length];
      n.focus(); select(n.dataset.tab);
    });
  });
})();


/* Header: transparent at rest, white once the page scrolls */
(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;
  function update() { header.classList.toggle('is-scrolled', window.scrollY > 8); }
  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* Process: background drifts at 0.3 of the scroll speed */
(function () {
  var sec = document.querySelector('[data-process]');
  var bg = document.querySelector('[data-process-bg]');
  if (!sec || !bg || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ticking = false;
  function update() {
    ticking = false;
    var r = sec.getBoundingClientRect();
    var offset = (r.top + r.height / 2) - window.innerHeight / 2;
    bg.style.transform = 'translate3d(0,' + (-offset * 0.3).toFixed(1) + 'px,0)';
  }
  function req() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', req, { passive: true });
  window.addEventListener('resize', req);
  update();
})();


/* FAQ accordion: each question opens and closes on its own */
(function () {
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('button');
    btn.addEventListener('click', function () {
      var open = !item.classList.contains('is-open');
      item.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
})();
