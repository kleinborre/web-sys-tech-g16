# 💪🏿 The Titan Method — Website

*Static Site • Group 16 • HTML5 • Modern CSS • GitHub Pages*

---

## 👥 Project Team

| Member                      | Role(s)                                   |
| --------------------------- | ----------------------------------------- |
| **Abegail Imee Enriquez**   | **Project Manager**                       |
| **Alvin Tubtub**            | Documentation Lead • External Source Lead |
| **Emmar John Alvarez**      | QA Leader                                 |
| **Oliver Jann Klein Borre** | **Lead Developer** • QA Tester            |

---

## 🔍 Why This Exists

The Titan Method needs a fast, mobile-first website that converts visitors into trial sign-ups without relying on a backend.
This build delivers:

* ✅ **Static, GitHub Pages–ready** site — no servers required.
* ✅ **CSS-only modals** for Pricing and Contact confirmations (`:target` pattern).
* ✅ **Accessible mobile nav** — checkbox + burger menu (no JS).
* ✅ **Clear conversion paths** — hero CTAs, tiered pricing, contact form.

---

## 🖥️ System Requirements

| Layer        | Minimum                                     | Notes                                       |
| ------------ | ------------------------------------------- | ------------------------------------------- |
| **Browser**  | Modern Chromium / Firefox / Safari / Edge   | Responsive layout, CSS variables, `clamp()` |
| **Host**     | GitHub Pages (root)                         | Works as plain static files                 |
| **Optional** | Any static server (`python -m http.server`) | For local testing                           |

---

## 🌐 Routes (GitHub Pages-friendly)

* **Home:** `/index.html`
* **Pricing:** `/pricing/` → `pricing/index.html`
* **Contact:** `/contact/` → `contact/index.html`

> All internal links use relative paths (e.g., `href="pricing/"`) so they work on GitHub Pages.

---

## 📦 Installation & First Run

### 1) Clone

```bash
git clone https://github.com/your-org/the-titan-method.git
cd the-titan-method
```

### 2) Local Preview

* Double-click `index.html`, **or**
* Serve locally:

```bash
python -m http.server 8080
# open http://localhost:8080
```

### 3) Deploy to GitHub Pages

1. Push to GitHub.
2. Repo → **Settings ▸ Pages** → Source: **Deploy from a branch**, Branch: **main** (root).
3. Visit the Pages URL.

---

## 🗂️ Project Layout

```
.
├─ index.html                 # Landing page (Home)
├─ pricing/
│  └─ index.html              # Pricing (plans + CSS-only modals)
├─ contact/
│  └─ index.html              # Contact (map + form + success modal)
├─ styles/
│  └─ style.css               # Variables, layout, components, modals, responsive
├─ images/                    # Logo, hero bg, gallery, icons
├─ scripts/                   # (placeholder for future JS)
├─ README.md                  # This file
└─ .gitignore
```

---

## 🧩 Page Highlights

### Home (`/index.html`)

* Hero with strong CTAs
* About (embedded YouTube video)
* 3-step Program + Benefits
* Testimonials + CTA gallery

### Pricing (`/pricing/index.html`)

* Tiers: **Standard**, **Premium**, **VIP**
* **CSS-only** signup modals + success modals (`#free-trial`, `#premium-signup`, `#vip-signup`)
* Fully responsive cards and actions

### Contact (`/contact/index.html`)

* Google Maps embed + address
* Accessible form (name, email, subject, message)
* **CSS-only** success modal (`#contact-success`)

---

## 🧱 Code Structure (by file)

### `styles/style.css`

```css
/* ========== Vars (colors, fonts, spacing, layout) ========== */
:root { /* --color-*, --font-*, --space-*, --container-max, etc. */ }

/* ========== Reset / Base ========== */
/* box-sizing, media defaults, link focus states */

/* ========== Containers ========== */
/* .container, .wrapper spacing */

/* ========== Site + Header ========== */
/* sticky header, brand, nav list */

/* ========== Mobile Nav (no JS) ========== */
/* #nav-toggle, .nav__burger, bars → X animation, drawer panel */

/* ========== Headline (hero) ========== */
/* background image, gradient overlay, title/subtitle/CTAs */

/* ========== Sections ========== */
/* About, Program, Testimonials, CTA gallery */

/* ========== Footer ========== */
/* platforms row, legal, responsive tweaks */

/* ========== Type Helpers ========== */
/* .heading--title/primary/secondary/tertiary, .p variants */

/* ========== Buttons ========== */
/* .btn, .btn--primary, .btn--secondary + hover/active/focus */

/* ========== Mobile Tweaks ========== */
/* ≤480px, ≤820px specific refinements */

/* ========== Contact Page ========== */
/* .contact__map-card, .map-embed, form fields + focus ring */

/* ========== Pricing Page ========== */
/* .pricing__grid, .pricing__card, badges, VIP theme */

/* ========== Shared CSS-only Modals ========== */
/* .modal, .modal__overlay, .modal__card, .modal__head/body/actions */
/* + mobile modal adjustments (width, padding, full-width buttons) */
```

### `index.html` (Home)

```html
<header class="site-header">
  <!-- Brand + mobile checkbox nav -->
</header>

<main class="site-main">
  <section id="home" class="headline"> … </section>
  <section id="about" class="about"> … YouTube iframe … </section>
  <section id="program" class="program"> … 3 boxes … </section>
  <section id="testimonials" class="testimonials"> … cards + CTA … </section>
  <section id="pricing" class="cta"> … gallery + final CTA … </section>
</main>

<footer class="site-footer"> … icons + legal … </footer>
```

### `pricing/index.html`

```html
<header> … links back to ../index.html … </header>

<main>
  <section> … page title … </section>
  <section id="plans" class="pricing">
    <div class="pricing__grid">
      <article class="pricing__card">Standard … CTA → #free-trial</article>
      <article class="pricing__card pricing__card--popular">Premium … CTA → #premium-signup</article>
      <article class="pricing__card pricing__card--vip on-dark">VIP … CTA → #vip-signup</article>
    </div>
    <p class="pricing__note">No contracts …</p>
  </section>
</main>

<!-- CSS-only modals -->
<section id="free-trial" class="modal"> … form action="#trial-success" … </section>
<section id="trial-success" class="modal"> … success text … </section>
<section id="premium-signup" class="modal"> … form action="#premium-success" … </section>
<section id="premium-success" class="modal"> … success text … </section>
<section id="vip-signup" class="modal"> … form action="#vip-success" … </section>
<section id="vip-success" class="modal"> … success text … </section>

<footer> … </footer>
```

### `contact/index.html`

```html
<header> … links back to ../index.html … </header>

<main>
  <section> … page title … </section>

  <section class="contact contact--map">
    <div class="map-embed">
      <iframe src="https://www.google.com/maps?q=600+Congress+Ave,+Austin,+TX+78701&output=embed" …></iframe>
    </div>
    <address> … phones with tel: links … </address>
  </section>

  <section class="contact contact--form">
    <!-- CSS-only success via hash target -->
    <form action="#contact-success" method="get" novalidate>
      <!-- name, email, subject, message -->
      <button class="btn btn--primary" type="submit">Send Message</button>
    </form>
  </section>
</main>

<section id="contact-success" class="modal">
  <!-- “Message Sent — check your email” + Back button -->
</section>

<footer> … </footer>
```

---

## 🧪 QA Notes

* All dialogs use the **`:target`** technique. Closing a modal returns to the previous scroll position with `href="#"`.
* Forms are **non-submitting placeholders** (no backend); they navigate to success modals for demo/UX testing.
* Check focus rings (`:focus-visible`) and tab order on mobile and desktop.

---

## 🛠️ Dev Tips

* Need real submissions? Replace `action="#…"` with your endpoint and remove the success modal, or redirect server-side back with `#success`.
* Images are optimized via simple sizing; swap with production assets in `/images`.
* Keep all links to **`pricing/`** and **`contact/`** (trailing slash) for Pages compatibility.

---

## 📝 License

© 2025 **Group 16** — academic use permitted; commercial use requires permission.
