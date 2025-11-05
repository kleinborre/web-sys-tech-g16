(function () {
  'use strict';

  // ------------ PATH HELPERS (GitHub Pages safe) ------------
  function inSubdir() {
    const p = location.pathname;
    return /\/pricing\/|\/contact\//.test(p);
  }

  // Resolve JSON path for root and subdirectories
  function resolveContentPath() {
    return inSubdir() ? '../data/content.v1.json' : 'data/content.v1.json';
  }

  // For assets like images/icons provided by JSON
  function resolveAssetPath(p) {
    if (!p || typeof p !== 'string') return p;
    if (/^https?:\/\//i.test(p)) return p;        // absolute URL
    if (p.startsWith('../')) return p;            // already adjusted
    if (p.startsWith('./')) p = p.slice(2);       // normalize
    return inSubdir() ? `../${p}` : p;            // prefix when inside subdir
  }

  // For page links like "index.html", "pricing/", "contact/"
  function resolvePagePath(p) {
    if (!p || typeof p !== 'string') return p;
    if (/^https?:\/\//i.test(p)) return p;        // absolute URL
    if (p.startsWith('../')) return p;            // already adjusted
    // If we're on a subpage and target is root-level page, prefix '../'
    // Heuristic: treat simple root-level routes (index.html, pricing/, contact/) as root
    const rootish = /^(index\.html|pricing\/|contact\/)$/.test(p);
    return inSubdir() && rootish ? `../${p}` : p;
  }

  const CONTENT_URL = resolveContentPath();
  const LS_KEY = 'ttm-siteContent';
  const LS_VER = 'ttm-siteContentVersion';

  async function fetchContent() {
    const fromCache = () => {
      try {
        const c = localStorage.getItem(LS_KEY);
        return c ? JSON.parse(c) : null;
      } catch (_) { return null; }
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

  // ------------ HYDRATORS ------------
  function hydrateBrand(site) {
    if (!site?.brand) return;
    setText('[data-brand-name]', site.brand.name);

    // Ensure home link points to root index from subpages
    setAttr('[data-brand-home]', 'href', resolvePagePath(site.brand.homeHref));

    // Fix logo paths for subpages
    const png = resolveAssetPath(site.brand.logoPng);
    const webp = resolveAssetPath(site.brand.logoWebp);
    setAttr('[data-brand-logo-png]', 'src', png);
    setAttr('[data-brand-logo-webp]', 'srcset', webp);
  }

  function hydrateNav(site) {
    // We keep existing hardcoded nav unless JSON wants to replace it AND it’s shorter than existing.
    const navEl = q('[data-nav]') || document.querySelector('.nav__list');
    if (!navEl || !Array.isArray(site?.nav) || !site.nav.length) return;
    const existingLinks = navEl.querySelectorAll('a.nav-link');
    if (existingLinks.length >= site.nav.length) return;

    navEl.innerHTML = '';
    site.nav.forEach(item => {
      const li = document.createElement('li');
      li.className = 'nav-item';
      const a = document.createElement('a');
      a.className = 'nav-link nav__link';
      a.href = resolvePagePath(item.href);
      a.textContent = item.text;
      li.appendChild(a);
      navEl.appendChild(li);
    });
  }

  function hydrateIndex(site) {
    setHTML('[data-hero-title]', site.hero?.title);
    setText('[data-hero-subtitle]', site.hero?.subtitle);
    const cta1 = q('[data-hero-cta1]');
    const cta2 = q('[data-hero-cta2]');
    if (cta1) {
      cta1.textContent = site.hero?.primaryCta?.text || cta1.textContent;
      cta1.setAttribute('href', resolvePagePath(site.hero?.primaryCta?.href || cta1.getAttribute('href') || '#'));
    }
    if (cta2) {
      cta2.textContent = site.hero?.secondaryCta?.text || cta2.textContent;
      cta2.setAttribute('href', resolvePagePath(site.hero?.secondaryCta?.href || cta2.getAttribute('href') || '#'));
    }
  }

  function hydrateFooter(site) {
    setText('[data-footer-legal]', site.footer?.legal);
    const wrap = q('[data-footer-social]');
    const socials = site.footer?.social || [];
    if (!wrap) return;

    // Rebuild icons from JSON (paths resolved for subpages)
    if (socials.length) {
      wrap.innerHTML = '';
      socials.forEach(s => {
        const a = document.createElement('a');
        a.href = s.href;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.className = 'social-link';
        a.setAttribute('aria-label', `The Titan Method on ${s.name}`);

        const img = document.createElement('img');
        img.className = 'icon';
        img.width = 32;
        img.height = 32;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.alt = s.name.toLowerCase();
        img.src = resolveAssetPath(s.icon);

        a.appendChild(img);
        wrap.appendChild(a);
      });
    } else {
      // If JSON has no socials, leave existing HTML as-is
    }
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

    // Map is a full URL; just set it
    setAttr('[data-contact-map]', 'src', site.contact?.addressCard?.mapEmbed);

    const wrap = q('[data-contact-phones]');
    const phones = site.contact?.addressCard?.phones || [];
    if (!wrap) return;
    wrap.innerHTML = '';
    phones.forEach(ph => {
      const div = document.createElement('div');
      const a = document.createElement('a');
      a.href = `tel:${ph.tel}`;
      a.textContent = ph.number;
      div.textContent = `${ph.label}: `;
      div.appendChild(a);
      wrap.appendChild(div);
    });
  }

  // ------------ BOOTSTRAP ------------
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
