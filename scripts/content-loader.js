(function () {
  'use strict';

  // Resolve JSON path for root and subdirectories (GitHub Pages safe)
  function resolveContentPath() {
    const path = location.pathname;
    if (path.includes('/pricing/') || path.includes('/contact/')) return '../data/content.v1.json';
    return 'data/content.v1.json';
  }

  const CONTENT_URL = resolveContentPath();

  // --- URL normalizer: makes JSON paths work from root and subpages ---
  const CONTENT_ABS = new URL(CONTENT_URL, location.href);
  const SITE_BASE = CONTENT_ABS.pathname.replace(/\/data\/.*$/, "/");
  function toAbs(url) {
    if (!url) return url;
    if (/^https?:\/\//i.test(url)) return url;
    return new URL(url.replace(/^\/+/, ""), `${location.origin}${SITE_BASE}`).toString();
  }

  const LS_KEY = 'ttm-siteContent';
  const LS_VER = 'ttm-siteContentVersion';

  async function fetchContent() {
    const fromCache = () => {
      const c = localStorage.getItem(LS_KEY);
      return c ? JSON.parse(c) : null;
    };

    try {
      const res = await fetch(CONTENT_URL, { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const cachedVer = localStorage.getItem(LS_VER);
      if (cachedVer !== data.version) {
        localStorage.setItem(LS_KEY, JSON.stringify(data));
        localStorage.setItem(LS_VER, data.version);
      } else {
        localStorage.setItem(LS_KEY, JSON.stringify(data));
      }
      return data;
    } catch (_) {
      return fromCache();
    }
  }

  function q(sel) { return document.querySelector(sel); }
  function setText(sel, val) { const el = q(sel); if (el && typeof val === 'string') el.textContent = val; }
  function setHTML(sel, val) { const el = q(sel); if (el && typeof val === 'string') el.innerHTML = val; }
  function setAttr(sel, attr, val) { const el = q(sel); if (el && typeof val === 'string') el.setAttribute(attr, val); }

  function hydrateBrand(site) {
    if (!site?.brand) return;
    setText('[data-brand-name]', site.brand.name);
    setAttr('[data-brand-home]', 'href', toAbs(site.brand.homeHref));
    setAttr('[data-brand-logo-png]', 'src', toAbs(site.brand.logoPng));
    setAttr('[data-brand-logo-webp]', 'srcset', toAbs(site.brand.logoWebp));
  }

  function hydrateNav(site) {
    const navEl = q('[data-nav]') || document.querySelector('.nav__list');
    if (!navEl || !Array.isArray(site?.nav) || !site.nav.length) return;

    // Normalize existing hrefs so section links work from subpages
    const existingLinks = navEl.querySelectorAll('a.nav-link');
    existingLinks.forEach(a => { a.href = toAbs(a.getAttribute('href')); });

    if (existingLinks.length >= site.nav.length) return;

    navEl.innerHTML = '';
    site.nav.forEach(item => {
      const li = document.createElement('li');
      li.className = 'nav-item';
      const a = document.createElement('a');
      a.className = 'nav-link nav__link';
      a.href = toAbs(item.href);
      a.textContent = item.text;
      li.appendChild(a);
      navEl.appendChild(li);
    });
  }

  function hydrateIndex(site) {
    setHTML('[data-hero-title]', site.hero?.title);
    setText('[data-hero-subtitle]', site.hero?.subtitle);
    setText('[data-hero-cta1]', site.hero?.primaryCta?.text);
    setAttr('[data-hero-cta1]', 'href', toAbs(site.hero?.primaryCta?.href));
    setText('[data-hero-cta2]', site.hero?.secondaryCta?.text);
    setAttr('[data-hero-cta2]', 'href', toAbs(site.hero?.secondaryCta?.href));
  }

  function hydrateFooter(site) {
    setText('[data-footer-legal]', site.footer?.legal);
    const wrap = q('[data-footer-social]');
    const socials = site.footer?.social || [];
    if (!wrap || !socials.length) return;
    wrap.innerHTML = '';
    socials.forEach(s => {
      const a = document.createElement('a');
      a.href = s.href; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.className = 'social-link'; a.setAttribute('aria-label', `The Titan Method on ${s.name}`);
      const img = document.createElement('img');
      img.className = 'icon'; img.width = 32; img.height = 32;
      img.loading = 'lazy'; img.decoding = 'async';
      img.alt = s.name.toLowerCase();
      img.src = toAbs(s.icon);
      a.appendChild(img);
      wrap.appendChild(a);
    });
  }

  function hydratePricing(site) {
    setText('[data-pricing-title]', site.pricing?.headline);
    setText('[data-pricing-intro]', site.pricing?.intro);

    const byId = Object.fromEntries((site.pricing?.plans || []).map(p => [p.id, p]));

    const s = byId.standard;
    if (s) {
      setText('[data-plan-standard-name]', s.name);
      if (s.priceOld) setText('[data-plan-standard-old]', s.priceOld);
      setText('[data-plan-standard-trial]', s.trialBadge || s.ctaText);
      const btn = q('[data-plan-cta-standard][data-plan-cta-text]');
      if (btn) btn.textContent = s.ctaText || s.trialBadge || btn.textContent;
    }

    const p = byId.premium;
    if (p) {
      setText('[data-plan-premium-name]', p.name);
      if (p.price) setText('[data-plan-premium-price]', p.price);
      if (p.priceOld) setText('[data-plan-premium-old]', p.priceOld);
      if (p.badge) setText('[data-plan-premium-badge]', p.badge);
      const btn = q('[data-plan-cta-premium][data-plan-cta-text]');
      if (btn) btn.textContent = p.ctaText || btn.textContent;
    }

    const v = byId.vip;
    if (v) {
      setText('[data-plan-vip-name]', v.name);
      if (v.price) setText('[data-plan-vip-price]', v.price);
      if (v.priceOld) setText('[data-plan-vip-old]', v.priceOld);
      const btn = q('[data-plan-cta-vip][data-plan-cta-text]');
      if (btn) btn.textContent = v.ctaText || btn.textContent;
    }
  }

  function hydrateContact(site) {
    setText('[data-contact-title]', site.contact?.title);
    setText('[data-contact-intro]', site.contact?.intro);
    setText('[data-contact-org]', site.contact?.addressCard?.org);
    setText('[data-contact-street]', site.contact?.addressCard?.street);
    setAttr('[data-contact-map]', 'src', toAbs(site.contact?.addressCard?.mapEmbed));

    const wrap = q('[data-contact-phones]');
    const phones = site.contact?.addressCard?.phones || [];
    if (!wrap) return;
    wrap.innerHTML = '';
    phones.forEach(ph => {
      const div = document.createElement('div');
      const a = document.createElement('a');
      a.href = `tel:${ph.tel}`; a.textContent = ph.number;
      div.textContent = `${ph.label}: `;
      div.appendChild(a);
      wrap.appendChild(div);
    });
  }

  document.addEventListener('DOMContentLoaded', async () => {
    const data = await fetchContent();
    if (!data?.site) return;
    const site = data.site;

    hydrateBrand(site);
    hydrateNav(site);

    const path = location.pathname;
    if (path.endsWith('/') || path.endsWith('/index.html')) hydrateIndex(site);
    if (path.includes('/pricing/')) hydratePricing(site);
    if (path.includes('/contact/')) hydrateContact(site);

    hydrateFooter(site);
  });
})();