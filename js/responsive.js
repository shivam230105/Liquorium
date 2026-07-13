/* LIQUORIUM — responsive nav + safety enhancements
   Injects a hamburger button (no HTML edits required) and toggles the nav.
*/
(function () {
  function init() {
    var nav = document.getElementById('nav');
    if (!nav) return;

    // Avoid double-init
    if (nav.querySelector('.nav-toggle')) return;

    var btn = document.createElement('button');
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-label', 'Toggle menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.type = 'button';
    btn.innerHTML = '<span></span>';

    // Insert as last child of nav so it sits at the right edge
    nav.appendChild(btn);

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = nav.classList.toggle('nav-open');
      btn.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = (open && window.innerWidth <= 900) ? 'hidden' : '';
    });

    // Close menu when a nav link is tapped
    nav.querySelectorAll('.nav-links a, .nav-cta').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('nav-open');
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on resize back to desktop
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900 && nav.classList.contains('nav-open')) {
        nav.classList.remove('nav-open');
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });

    // Click outside closes
    document.addEventListener('click', function (e) {
      if (!nav.classList.contains('nav-open')) return;
      if (!nav.contains(e.target)) {
        nav.classList.remove('nav-open');
        btn.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Wrap any bare <table> in a scroll container so it survives mobile.
  function wrapTables() {
    document.querySelectorAll('table').forEach(function (t) {
      if (t.parentElement && t.parentElement.classList.contains('responsive-table-wrap')) return;
      var wrap = document.createElement('div');
      wrap.className = 'responsive-table-wrap';
      t.parentNode.insertBefore(wrap, t);
      wrap.appendChild(t);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { init(); wrapTables(); });
  } else {
    init(); wrapTables();
  }
})();
