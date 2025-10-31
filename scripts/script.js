/* The Titan Method Frontend JS Script */

(function () {
  'use strict';

  /* ============================
     Smooth scrolling for same-page anchors + collapse navbar
     ============================ */
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

  /* ============================
     THEME TOGGLING
     ============================ */
  (function themeToggle() {
    const STORAGE_KEY = 'ttm-theme';
    const root = document.documentElement;

    function toggles() {
      return Array.from(document.querySelectorAll('.js-theme-toggle'));
    }

    function currentTheme() {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      return 'light';
    }

    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      const isDark = theme === 'dark';
      toggles().forEach((btn) => {
        btn.setAttribute('aria-pressed', String(isDark));
        btn.setAttribute('aria-label', isDark ? 'Activate light mode' : 'Activate dark mode');
        btn.dataset.themeIcon = isDark ? 'sun' : 'moon';
      });
    }

    applyTheme(currentTheme());

    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-theme-toggle');
      if (!btn) return;
      const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });

    if (window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', (ev) => {
        if (localStorage.getItem(STORAGE_KEY)) return;
        applyTheme(ev.matches ? 'dark' : 'light');
      });
    }
  })();

  /* ============================
     HERO BACKGROUND FADE-IN
     ============================ */
  (function heroBackgroundFade() {
    const hero = document.querySelector('.headline.reveal-bg');
    if (!hero) return;
    setTimeout(() => hero.classList.add('headline--bg-ready'), 400);
  })();

  /* ============================
     FORM VALIDATION
     ============================ */

  function isEmailValid(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value.trim());
  }

  function collectFormData(form) {
    const data = {};
    Array.from(form.elements).forEach((el) => {
      if (!el.name) return;
      if ((el.type === 'checkbox' || el.type === 'radio') && !el.checked) return;
      data[el.name] = (el.value || '').trim();
    });
    // optional context
    if (form.dataset.plan) data.plan = form.dataset.plan;
    return data;
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

  /* ============================
     PRICING CARD → OPEN ITS MODAL
     ============================ */
  (function initPlanButtons() {
    const planButtons = document.querySelectorAll('.pricing__cta .js-validate-submit');
    planButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const formId = btn.dataset.form;
        if (!formId) return;

        const formEl = document.getElementById(formId);
        if (!formEl) return;

        if (btn.dataset.plan) formEl.dataset.plan = btn.dataset.plan;
        if (btn.dataset.successModal) formEl.dataset.successModal = btn.dataset.successModal;

        const parentModalEl = formEl.closest('.modal');
        if (!parentModalEl) return;

        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          new bootstrap.Modal(parentModalEl).show();
        }
      });
    });
  })();

  /* ============================
     LOCAL STORAGE PERSISTENCE + JSON DOWNLOAD
     ============================ */

  function uuid() {
    return 'id-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 10);
  }

  function readCollection(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeCollection(key, arr) {
    try {
      localStorage.setItem(key, JSON.stringify(arr, null, 2));
      return true;
    } catch {
      return false;
    }
  }

  function buildRecord(form, payload) {
    return {
      id: uuid(),
      plan: form.dataset.plan || payload.plan || '',
      payload,
      page: window.location.pathname,
      createdAt: new Date().toISOString()
    };
  }

  function triggerJsonDownload(filename, jsonString) {
    const blob = new Blob([jsonString], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 0);
  }

  function persistAndDownload(form, payload) {
    const collectionKey = form.dataset.storageCollection;
    if (!collectionKey) return;

    const record = buildRecord(form, payload);
    const existing = readCollection(collectionKey);
    const updated = existing.concat(record);

    if (writeCollection(collectionKey, updated)) {
      const ts = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const filename =
        `${collectionKey}-${ts.getFullYear()}${pad(ts.getMonth()+1)}${pad(ts.getDate())}-` +
        `${pad(ts.getHours())}${pad(ts.getMinutes())}${pad(ts.getSeconds())}.json`;
      triggerJsonDownload(filename, JSON.stringify(updated, null, 2));
    }
  }

  /* ============================
     SUBMISSION FLOW (contact + pricing modals)
     Scope: .js-demo-form only
     ============================ */
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

        const data = collectFormData(form);

        // Persist to localStorage + trigger JSON download
        persistAndDownload(form, data);

        // Success modal flow
        const successSelector = form.dataset.successModal;
        if (!successSelector) return;

        const nextModalEl = document.querySelector(successSelector);
        if (!nextModalEl || typeof bootstrap === 'undefined' || !bootstrap.Modal) return;

        const currentModalEl = form.closest('.modal.show');
        if (currentModalEl) {
          const currInstance = bootstrap.Modal.getInstance(currentModalEl) ||
                               new bootstrap.Modal(currentModalEl);
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

  /* ============================
     SCROLL-SWAP BUTTON
     ============================ */
  (function scrollSwap() {
    const btn = document.getElementById('scrollSwap');
    if (!btn) return;

    const icon = btn.querySelector('.scroll-swap__icon');
    const footer = document.querySelector('footer');
    const threshold = 80;
    let lastY = window.scrollY || window.pageYOffset;
    let direction = 'down';

    function atTop() {
      return (window.scrollY || window.pageYOffset) <= threshold;
    }
    function atBottom() {
      const scrollY = window.scrollY || window.pageYOffset;
      const viewport = window.innerHeight;
      const docH = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
      );
      return scrollY + viewport >= docH - 4;
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

  /* ============================
     REVEAL ON SCROLL
     ============================ */
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
        const delay = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        if (delay > 0) setTimeout(() => el.classList.add('is-visible'), delay);
        else el.classList.add('is-visible');
        obs.unobserve(el);
      });
    }, { root: null, rootMargin: '0px', threshold: 0.14 });

    els.forEach((el) => io.observe(el));
  })();
})();