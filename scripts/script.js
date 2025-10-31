/* The Titan Method Frontend JS Script */
(function () {
  'use strict';

  // Smooth scrolling for same-page anchors + collapse navbar
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

  // Theme toggling (session only; follows system unless toggled)
  (function themeToggle() {
    const root = document.documentElement;
    const toggles = () => Array.from(document.querySelectorAll('.js-theme-toggle'));
    const initial = (() => {
      const preset = root.getAttribute('data-theme');
      if (preset === 'light' || preset === 'dark') return preset;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
      return 'light';
    })();
    function applyTheme(theme) {
      root.setAttribute('data-theme', theme);
      const isDark = theme === 'dark';
      toggles().forEach((btn) => {
        btn.setAttribute('aria-pressed', String(isDark));
        btn.setAttribute('aria-label', isDark ? 'Activate light mode' : 'Activate dark mode');
        btn.dataset.themeIcon = isDark ? 'sun' : 'moon';
      });
    }
    applyTheme(initial);
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.js-theme-toggle');
      if (!btn) return;
      const next = (root.getAttribute('data-theme') === 'dark') ? 'light' : 'dark';
      applyTheme(next);
    });
    if (!document.documentElement.hasAttribute('data-theme') && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      mq.addEventListener('change', (ev) => applyTheme(ev.matches ? 'dark' : 'light'));
    }
  })();

  // Hero background fade-in
  (function heroBackgroundFade() {
    const hero = document.querySelector('.headline.reveal-bg');
    if (!hero) return;
    setTimeout(() => hero.classList.add('headline--bg-ready'), 400);
  })();

  // Validation helpers
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

  // Pricing CTA → open modal
  (function initPlanButtons() {
    const buttons = document.querySelectorAll('.pricing__cta .js-validate-submit');
    buttons.forEach((btn) => {
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
          const inst = new bootstrap.Modal(parentModalEl);
          inst.show();
        }
      });
    });
  })();

  // Ensure modals always open/close with a clean form state
  (function attachModalStateReset() {
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach((modal) => {
      modal.addEventListener('show.bs.modal', () => {
        modal.querySelectorAll('form').forEach((f) => resetFormVisualState(f));
      });
      modal.addEventListener('hidden.bs.modal', () => {
        modal.querySelectorAll('form').forEach((f) => {
          resetFormVisualState(f);
          f.reset(); // optional: clears values so next open is fresh
        });
      });
    });
  })();

  // Submission flow (validate → success modal)
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

  // Scroll-swap button (bottom-right)
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

  // Reveal-on-scroll
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