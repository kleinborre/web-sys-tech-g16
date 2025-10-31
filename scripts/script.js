/* The Titan Method Frontend JS Script */
(function () {
  'use strict';

  // --------- PREPAINT: force a theme BEFORE the page finishes parsing ---------
  // If there's a saved theme, use it; otherwise hard-default to DARK.
  (function prepaintTheme() {
    try {
      const key = 'ttm-theme';
      const saved = localStorage.getItem(key);
      const initial = (saved === 'light' || saved === 'dark') ? saved : 'dark';
      const root = document.documentElement;
      if (root.getAttribute('data-theme') !== initial) {
        root.setAttribute('data-theme', initial);
      }
      // Also hint color-scheme immediately to avoid UA default flashes
      root.style.colorScheme = (initial === 'dark') ? 'dark' : 'light';
    } catch (_) {
      // If storage is blocked, still force dark
      const root = document.documentElement;
      root.setAttribute('data-theme', 'dark');
      root.style.colorScheme = 'dark';
    }
  })();

  /* ---------- THEME (persist across pages) ---------- */
  (function theme() {
    const KEY = 'ttm-theme';
    const root = document.documentElement;

    function getInitial() {
      try {
        const saved = localStorage.getItem(KEY);
        if (saved === 'light' || saved === 'dark') return saved;
      } catch (_) { /* ignore */ }
      return 'dark';
    }

    function apply(theme, { persist = false } = {}) {
      root.setAttribute('data-theme', theme);
      root.style.colorScheme = (theme === 'dark') ? 'dark' : 'light';

      const isDark = theme === 'dark';
      document.querySelectorAll('.js-theme-toggle').forEach((btn) => {
        btn.setAttribute('aria-pressed', String(isDark));
        btn.setAttribute('aria-label', isDark ? 'Activate light mode' : 'Activate dark mode');
        btn.dataset.themeIcon = isDark ? 'sun' : 'moon';
      });

      if (persist) {
        try { localStorage.setItem(KEY, theme); } catch (_) { /* ignore */ }
      }
    }

    // Sync UI state with whichever theme is active right now (prepaint already set it)
    apply(getInitial(), { persist: false });

    // Toggle on click
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-theme-toggle');
      if (!btn) return;
      const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      apply(next, { persist: true });
    });

    // Only react to system changes if the user hasn't explicitly chosen
    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = (ev) => {
        let saved = null;
        try { saved = localStorage.getItem(KEY); } catch (_) { /* ignore */ }
        if (saved === 'light' || saved === 'dark') return;
        apply(ev.matches ? 'dark' : 'light', { persist: false });
      };
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }

    // Cross-tab syncing
    window.addEventListener('storage', (ev) => {
      if (ev.key !== KEY) return;
      const v = ev.newValue;
      if (v === 'light' || v === 'dark') apply(v, { persist: false });
    });
  })();

  /* ---------- Responsive theme-toggle placement (mobile slot) ---------- */
  (function moveThemeToggle() {
    const desktopSlot = document.querySelector('[data-theme-slot-desktop]');
    const mobileSlot  = document.querySelector('[data-theme-slot-mobile]');
    if (!desktopSlot || !mobileSlot) return;

    const toggleBtn = document.querySelector('.js-theme-toggle');
    if (!toggleBtn) return;

    const originalParent = toggleBtn.parentElement;
    const originalNext   = toggleBtn.nextElementSibling;

    function place() {
      const isMobile = window.matchMedia('(max-width: 991.98px)').matches;
      const currentParent = toggleBtn.parentElement;
      if (isMobile && currentParent !== mobileSlot) {
        mobileSlot.appendChild(toggleBtn);
      } else if (!isMobile && currentParent !== desktopSlot) {
        if (originalParent === desktopSlot && originalNext && originalNext.parentElement === desktopSlot) {
          desktopSlot.insertBefore(toggleBtn, originalNext);
        } else {
          desktopSlot.appendChild(toggleBtn);
        }
      }
    }

    place();
    window.addEventListener('resize', place, { passive: true });
    window.addEventListener('orientationchange', place);
    document.addEventListener('DOMContentLoaded', place);
  })();

  /* ---------- NAV: collapse on any nav-link click ---------- */
  document.addEventListener('click', (e) => {
    const navLink = e.target.closest('.navbar .nav-link');
    if (!navLink) return;
    const openNav = document.querySelector('.navbar-collapse.show');
    if (openNav && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
      new bootstrap.Collapse(openNav, { toggle: true });
    }
  });

  /* ---------- Smooth scroll for same-page anchors ---------- */
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const targetEl = document.querySelector(id);
    if (!targetEl) return;
    e.preventDefault();
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const openNav = document.querySelector('.navbar-collapse.show');
    if (openNav && typeof bootstrap !== 'undefined' && bootstrap.Collapse) {
      new bootstrap.Collapse(openNav, { toggle: true });
    }
  });

  /* ---------- Optional hero bg fade-in ---------- */
  (function heroBackgroundFade() {
    const hero = document.querySelector('.headline');
    if (!hero) return;
    if (hero.classList.contains('headline--bg-ready')) return;
    setTimeout(() => hero.classList.add('headline--bg-ready'), 300);
  })();

  /* ---------- Validation helpers ---------- */
  function isEmailValid(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test((value || '').trim());
  }
  function hideAlerts(form) {
    const err = form.querySelector('.js-error-msg');
    const ok = form.querySelector('.js-success-msg');
    if (err) err.classList.add('d-none');
    if (ok) ok.classList.add('d-none');
  }
  function clearInvalidStates(form) {
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));
  }
  function resetFormVisualState(form) {
    hideAlerts(form);
    clearInvalidStates(form);
  }
  function validateFormFields(form) {
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    let valid = true;
    requiredFields.forEach((field) => {
      const val = (field.value || '').trim();
      let ok = val.length > 0;
      if (ok && field.type === 'email') ok = isEmailValid(val);
      if (!ok) {
        valid = false;
        field.classList.add('is-invalid');
      } else {
        field.classList.remove('is-invalid');
      }
    });
    const errMsg = form.querySelector('.js-error-msg');
    const successMsg = form.querySelector('.js-success-msg');
    if (!valid) {
      if (errMsg) errMsg.classList.remove('d-none');
      if (successMsg) successMsg.classList.add('d-none');
    } else {
      if (errMsg) errMsg.classList.add('d-none');
      if (successMsg) successMsg.classList.remove('d-none');
    }
    return valid;
  }

  /* ---------- Reset form state on modal show/hide ---------- */
  (function attachModalStateReset() {
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach((modal) => {
      modal.addEventListener('show.bs.modal', () => {
        modal.querySelectorAll('form').forEach((f) => resetFormVisualState(f));
      });
      modal.addEventListener('hidden.bs.modal', () => {
        modal.querySelectorAll('form').forEach((f) => {
          resetFormVisualState(f);
          f.reset();
        });
      });
    });
  })();

  /* ---------- Form submit: validate → show success modal (demo only) ---------- */
  (function initForms() {
    const forms = document.querySelectorAll('.js-validate-form.js-demo-form');
    forms.forEach((form) => {
      form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('input', () => field.classList.remove('is-invalid'));
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        const submitter = e.submitter;
        if (submitter && submitter.dataset && submitter.dataset.successModal) {
          form.dataset.successModal = submitter.dataset.successModal;
        }

        if (!validateFormFields(form)) return;

        const successSelector = form.dataset.successModal;
        if (!successSelector) return;

        const nextModalEl = document.querySelector(successSelector);
        if (!nextModalEl || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;

        const currentModalEl = form.closest('.modal.show');
        if (currentModalEl) {
          const currInstance = bootstrap.Modal.getInstance(currentModalEl) || new bootstrap.Modal(currentModalEl);
          const nextInstance = new bootstrap.Modal(nextModalEl);
          const handleHidden = () => {
            currentModalEl.removeEventListener('hidden.bs.modal', handleHidden);
            nextInstance.show();
          };
          currentModalEl.addEventListener('hidden.bs.modal', handleHidden);
          currInstance.hide();
        } else {
          new bootstrap.Modal(nextModalEl).show();
        }
      });
    });
  })();

  /* ---------- Scroll-swap (bottom-right button) ---------- */
  (function scrollSwap() {
    const btn = document.getElementById('scrollSwap');
    if (!btn) return;
    const icon = btn.querySelector('.scroll-swap__icon');
    const footer = document.querySelector('footer');
    const threshold = 80;

    let lastY = window.scrollY || window.pageYOffset;
    let direction = 'down';

    function atTop() { return (window.scrollY || window.pageYOffset) <= threshold; }
    function atBottom() {
      const y = window.scrollY || window.pageYOffset;
      const vh = window.innerHeight;
      const docH = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      return y + vh >= docH - 4;
    }

    function update() {
      const y = window.scrollY || window.pageYOffset;
      const delta = y - lastY;
      if (Math.abs(delta) > 6) direction = delta > 0 ? 'down' : 'up';
      lastY = y;

      btn.hidden = atTop();

      let rotate = 0;
      if (atBottom() || direction === 'up') rotate = 180;
      icon.style.transform = `rotate(${rotate}deg)`;
      btn.setAttribute('aria-label', rotate === 180 ? 'Scroll to top' : 'Scroll to footer');
    }

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    document.addEventListener('DOMContentLoaded', update);
    update();

    btn.addEventListener('click', () => {
      if (atBottom() || direction === 'up') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (footer) {
        footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }
    });
  })();

  /* ---------- Reveal-on-scroll ---------- */
  (function revealOnScroll() {
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const delayAttr = el.getAttribute('data-reveal-delay');
        const delay = Number.isFinite(parseInt(delayAttr, 10)) ? parseInt(delayAttr, 10) : 0;
        if (delay > 0) setTimeout(() => el.classList.add('is-visible'), delay);
        else el.classList.add('is-visible');
        obs.unobserve(el);
      });
    }, { root: null, rootMargin: '0px', threshold: 0.14 });
    els.forEach((el) => io.observe(el));
  })();
})();