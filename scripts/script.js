/* The Titan Method Frontend JS */

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

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
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

    setTimeout(() => {
      hero.classList.add('headline--bg-ready');
    }, 400);
  })();

  /* ============================
     FORM VALIDATION + MODAL FLOW (+ email stub)
     ============================ */

  // Basic email test
  function isEmailValid(value) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value.trim());
  }

  // Collect all fields from a form into an object
  function collectFormData(form) {
    const data = {};
    Array.from(form.elements).forEach((el) => {
      if (!el.name) return;
      if (el.type === 'checkbox' || el.type === 'radio') {
        if (!el.checked) return;
      }
      data[el.name] = el.value.trim();
    });

    // add plan label context for emails
    data.plan = form.dataset.plan || '';

    return data;
  }

  // Generate a professional confirmation email body for the user
  function confirmationEmailBody(planName) {
    // planName can be "Standard", "Premium", "VIP", or "Contact Inquiry"
    const planLine =
      planName && planName !== 'Contact Inquiry'
        ? `You're now registered for the ${planName} option with The Titan Method.`
        : `We've received your message at The Titan Method.`;

    const ctaLine =
      planName && planName !== 'Contact Inquiry'
        ? `Your next step is simple: watch your inbox for access instructions and onboarding details so you can start training with us.`
        : `We'll get back to you shortly with next steps and any resources that can help you reach your goals faster.`;

    return (
      `${planLine}\n\n` +
      `${ctaLine}\n\n` +
      `If you don't see our message in the next few minutes, please check your Promotions or Spam folder.\n\n` +
      `— The Titan Method Team`
    );
  }

  // Stub where you'd actually POST to your backend to:
  // 1. email lr.ojkborre@mmdc.mcl.edu.ph with all form data
  // 2. email the user (their provided email) with confirmationEmailBody()
  //
  // This is intentionally a no-op on the frontend for security reasons.
  function sendLead(formData) {
    /* Example backend you could build:
    fetch('/api/send-lead', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({
        toAdmin: 'lr.ojkborre@mmdc.mcl.edu.ph',
        userEmail: formData.email,
        subject: `[Titan Lead] ${formData.plan} - ${formData.name}`,
        messageForAdmin: formData,
        messageForUser: confirmationEmailBody(formData.plan)
      })
    });
    */

    // For now we just log, so you can see exactly what would be sent.
    console.log('Lead captured (send to admin + user):', {
      adminRecipient: 'lr.ojkborre@mmdc.mcl.edu.ph',
      data: formData,
      userConfirmationEmailText: confirmationEmailBody(formData.plan)
    });
  }

  function validateFormFields(form) {
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    let valid = true;

    requiredFields.forEach((field) => {
      const val = (field.value || '').trim();
      let thisValid = val.length > 0;

      if (thisValid && field.type === 'email') {
        thisValid = isEmailValid(val);
      }

      if (!thisValid) {
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

  // When user clicks CTA button on card, open that plan's modal
  (function initPlanButtons() {
    const planButtons = document.querySelectorAll('.pricing__cta .js-validate-submit');

    planButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const formId = btn.dataset.form;
        if (!formId) return;

        const formEl = document.getElementById(formId);
        if (!formEl) return;

        // Plan name (Standard / Premium / VIP)
        if (btn.dataset.plan) {
          formEl.dataset.plan = btn.dataset.plan;
        }

        // Pass success modal selector down to the form
        if (btn.dataset.successModal) {
          formEl.dataset.successModal = btn.dataset.successModal;
        }

        // Show the modal that actually wraps this form
        const parentModalEl = formEl.closest('.modal');
        if (!parentModalEl) return;

        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
          const parentBsModal = new bootstrap.Modal(parentModalEl);
          parentBsModal.show();
        }
      });
    });
  })();

  // Handle full submission flow (contact + pricing modals)
  (function initForms() {
    const forms = document.querySelectorAll('.js-validate-form');

    forms.forEach((form) => {
      // Remove invalid state while typing
      form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('input', () => {
          field.classList.remove('is-invalid');
        });
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // If submitter defines success modal, attach to form
        const submitter = e.submitter;
        if (submitter && submitter.dataset.successModal) {
          form.dataset.successModal = submitter.dataset.successModal;
        }

        const ok = validateFormFields(form);
        if (!ok) return;

        // At this point, form is valid. Collect data and "send".
        const data = collectFormData(form);
        sendLead(data);

        // Now handle success modal flow (close current, open success modal)
        const successSelector = form.dataset.successModal;
        if (!successSelector) {
          return; // nothing else to show (should not happen in our pages, but safe)
        }

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
          // e.g. contact page -> open success modal directly
          const nextInstance = new bootstrap.Modal(nextModalEl);
          nextInstance.show();
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
      btn.setAttribute(
        'aria-label',
        rotate === 180 ? 'Scroll to top' : 'Scroll to footer'
      );
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

        if (delay > 0) {
          setTimeout(() => el.classList.add('is-visible'), delay);
        } else {
          el.classList.add('is-visible');
        }
        obs.unobserve(el);
      });
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.14
    });

    els.forEach((el) => io.observe(el));
  })();
})();