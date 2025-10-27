# 💪🏿 The Titan Method — Website

*Static Site • Group 16 • HTML5 • Modern CSS • Bootstrap 5 • GitHub Pages*

---

## 👥 Project Team

| Member                      | Role(s)                                   |
| --------------------------- | ----------------------------------------- |
| **Abegail Imee Enriquez**   | **Project Manager**                       |
| **Alvin Tubtub**            | Documentation Lead • External Source Lead |
| **Emmar John Alvarez**      | QA Leader                                 |
| **Oliver Jann Klein Borre** | **Lead Developer** • QA Tester            |

---

## 🚀 What’s New (Latest Progress)

**All of this is now live in code:**

- 🌗 **Dark / Light theme toggle**  
  - Custom toggle component in navbar (and mobile), synced across instances.  
  - User preference saved in `localStorage`.  
  - Respects system `prefers-color-scheme` when no saved preference.

- 🧠 **Smart forms with validation + success UX**
  - All forms use `.js-validate-form`.
  - Required fields are checked (name, email, etc.).
  - Email is pattern-validated on the client.
  - Inline error (red alert) and inline success (green alert).
  - On success:  
    1. inline success alert shows,  
    2. current modal closes (if any),  
    3. a branded “Success” modal opens (Bootstrap modal).
  - Contact page reuses the same success-modal pattern as Pricing.

- 📬 **Lead handoff (ready for backend)**
  - On valid submit, we collect all form data (plan, name, email, phone, address, etc.).
  - `sendLead()` in `scripts/script.js` is prepared to:
    - Send the inquiry to the school email `lr.ojkborre@mmdc.mcl.edu.ph`.
    - Send a professional confirmation email to the user, including a CTA based on plan (Standard / Premium / VIP / Contact Inquiry).
  - Right now, for security, this is a stub (console log). It’s clearly marked where the backend `fetch('/api/send-lead')` should go.

- 🔥 **Pricing card interaction**
  - Each plan card (Standard / Premium / VIP) now:
    - Scales up slightly and lifts on hover.
    - Gets an orange “energy glow” ring using `box-shadow` with `var(--color-5)`.
    - Pops down and compresses on click (`:active`).
    - VIP keeps its gradient and still animates.
  - Smooth cubic-bezier easing on hover-in and gentle easing on hover-out.

- 🏷️ **Address field added**
  - Premium and VIP modals now include an Address field (not required).
  - Standard already had it, so now all tiers collect address consistently for lead capture.

- 🪄 **Scroll helper button**
  - Floating round button bottom-right (`#scrollSwap`).
  - Reacts to scroll direction:
    - Scroll down → button means "jump to footer"
    - Scroll up or near bottom → button flips and becomes "back to top"
  - Uses transform rotation on SVG arrow.

- 👀 **Reveal-on-scroll animations**
  - Elements with `.reveal` fade+slide in when they enter viewport using `IntersectionObserver`.
  - Respects `prefers-reduced-motion` to disable animations for accessibility.

---

## 🔍 Project Purpose

A fast, mobile-first marketing site that converts visitors into trial sign-ups and paid tiers. Built for GitHub Pages (static hosting, no backend required to run).

This build delivers:

* ✅ **Fully static front-end** (HTML/CSS/JS only).
* ✅ **Tiered pricing funnel** with working modals for Standard / Premium / VIP.
* ✅ **Contact form with success modal** (mirrors pricing UX).
* ✅ **Dark mode + reduced-motion accessibility support.**
* ✅ **Lead capture flow** already prepared to notify the team and auto-email the user once a backend is plugged in.

> **Milestone update:**
> - We now collect address for Premium and VIP.
> - Contact page and Pricing page share the same validation/success logic.
> - We’ve added the email handoff stub (`sendLead()`), so the project is now “backend ready,” not just UI demo.

---

## 🖥️ System Requirements

| Layer        | Minimum                                     | Notes                                                                 |
| ------------ | ------------------------------------------- | --------------------------------------------------------------------- |
| **Browser**  | Modern Chromium / Firefox / Safari / Edge   | Uses CSS variables, `color-mix()`, `clamp()`, Flexbox, Grid, etc.     |
| **Host**     | GitHub Pages (static root)                  | No server runtime needed for core UI/UX.                             |
| **Optional** | Any static server (`python -m http.server`) | For local testing of relative paths and Bootstrap JS modals locally. |

---

## 🌐 Routes (GitHub Pages–friendly)

* **Home:** `/index.html`
* **Pricing:** `/pricing/` → `pricing/index.html`
* **Contact:** `/contact/` → `contact/index.html`

All internal links use **relative paths** (like `href="../pricing/"` or `href="../contact/"`) so navigation works from subfolders even on GitHub Pages.

---

## 🗂️ Project Structure

```text
.
├─ index.html                 # Home (hero, about, program, testimonials, CTAs)
├─ pricing/
│  └─ index.html              # Pricing tiers + signup modals (Standard / Premium / VIP)
├─ contact/
│  └─ index.html              # Map, phone, contact form, success modal
├─ styles/
│  └─ style.css               # Design tokens, layout, components, dark mode, animations
├─ scripts/
│  └─ script.js               # Theme toggle, scroll helper, reveal, form validation, modal flow
├─ images/                    # Logo, socials, hero background, etc.
└─ README.md                  # You're reading it
````

Notes:

* There is only one global stylesheet: `styles/style.css`.
* There is only one global script: `scripts/script.js`.
* Bootstrap 5.3.3 CSS/JS are pulled from CDN.

---

## ✨ Key Features

### 1. Theming and visual system

* Centralized CSS custom properties (`:root`) for colors, radii, spacing, typography scale.
* **Light / Dark theme**:

  * Implemented with `[data-theme="light"]` / `[data-theme="dark"]` on `<html>`.
  * Custom toggle (`.theme-switch`) updates `aria-pressed`, icon state, and persists to `localStorage`.
  * Honors OS preference unless the user has explicitly chosen a theme.

### 2. Responsive layout

* Everything is mobile-first.
* Uses `clamp()` for fluid typography and spacing.
* Grid / Flexbox responsive breakpoints for:

  * pricing cards (`.pricing__grid`)
  * testimonials
  * footer layout
  * navbar collapse

### 3. Pricing cards with motion

* `.pricing__card`, `.pricing__card--popular`, `.pricing__card--vip`
* Hover:

  * subtle scale/translate
  * orange glow ring using `box-shadow` and `var(--color-5)`
  * border accent to match the glow
* Active (mouse down / tap):

  * quick compress `scale(.99)` to simulate a "click" press
* VIP:

  * Gradient dark background
  * Orange border ring
  * Still animates with hover glow

### 4. Forms and modals

All sign-up / inquiry flows are handled consistently:

#### Validation

* Each form (Pricing modals and Contact form) has class `.js-validate-form`.
* JS checks:

  * required fields are non-empty,
  * emails match a basic email regex.
* Invalid required fields get `.is-invalid` (red outline + glow).
* `.js-error-msg` (red alert) and `.js-success-msg` (green alert) toggle automatically.

#### Success UX

* After successful validation:

  * `js-success-msg` is shown inside the form.
  * We collect data (name, email, phone, address, plan).
  * We call `sendLead()` (stubbed) to hand off lead data.
  * Then:

    * If the form lived in a modal (e.g. Premium signup):

      * Close that modal.
      * Open the correct success modal (`#premiumSuccess`, `#vipSuccess`, etc.).
    * If the form was on-page (Contact):

      * Open `#contactSuccess` modal.

This means Contact now behaves exactly like Pricing in terms of success messaging.

#### Address fields

* All tiers (Standard, Premium, VIP) include optional `address` input in their modal forms.
* This is included in the lead data so you can follow up on location-specific coaching, shipping, etc.

### 5. Lead capture and email handoff (JS stub)

Inside `scripts/script.js`:

* `collectFormData(form)` builds an object with all fields.
* `confirmationEmailBody(planName)` builds a professional confirmation message customized to the plan:

  * For Premium/VIP/etc: “You’re now registered… watch your inbox…”
  * For Contact Inquiry: “We’ve received your message… we’ll get back to you…”
* `sendLead(formData)` is the placeholder for backend integration:

  * Intended to email **admin** → `lr.ojkborre@mmdc.mcl.edu.ph`
  * Intended to email **user** → to the email they entered
  * Currently just `console.log(...)` for safety.
  * Ready to be swapped with `fetch('/api/send-lead', { ... })` once you have any server / serverless function.

So the front-end is now "handoff-ready".

### 6. Scroll helper button

* Floating action button in bottom-right: `#scrollSwap`.
* Rotates arrow to point up/down depending on scroll direction and position.
* Click:

  * If user is scrolling upward / at bottom → smooth scroll to top.
  * Else → smooth scroll to footer.
* Uses computed scroll position and `window.scrollTo({ behavior: 'smooth' })`.

### 7. Reveal-on-scroll animation

* Anything with `.reveal` gets a delayed fade/slide-in the first time it enters the viewport.
* Powered by `IntersectionObserver` in `script.js`.
* Graceful fallback:

  * If `IntersectionObserver` not supported or `prefers-reduced-motion: reduce`, elements are just visible (no motion).
* Each `.reveal` can set `data-reveal-delay="80"` etc. for staggered entrances.

---

## 🧩 Page Highlights

### Home (`/index.html`)

* Hero section with headline, sub-head, and CTA.
* Dark overlay hero block with background image fade-in (`headline--bg-ready`).
* About section with embedded video and value props.
* Program section: 3 cards describing how The Titan Method works.
* Testimonials: social proof, star ratings, visual credibility.
* Final CTAs with imagery.
* Theme toggle appears in navbar and mobile.

### Pricing (`/pricing/index.html`)

* 3 membership tiers:

  * **Standard** ($12.99/mo trial offer),
  * **Premium** ($24.99/mo, “Most Popular” badge),
  * **VIP** ($59/mo, gradient black/orange).
* Each card has its own CTA button that opens a Bootstrap modal.
* Each modal (`freeTrialForm`, `premiumForm`, `vipForm`) collects:

  * name (required),
  * email (required),
  * phone (optional),
  * address (optional, now added to Premium and VIP),
  * plus metadata `data-plan="Standard"/"Premium"/"VIP"`.
* On success:

  * Inline success alert + success modal flow (`trialSuccess`, `premiumSuccess`, `vipSuccess`).

### Contact (`/contact/index.html`)

* Embedded Google Map and business address.
* Clickable phone numbers (`tel:` links).
* Contact form collects:

  * name,
  * email,
  * subject,
  * message.
* Runs the same validation and success logic.
* On success:

  * Shows green success alert,
  * Opens `#contactSuccess` modal (Bootstrap).
* Also calls `sendLead()` with `data-plan="Contact Inquiry"` for email handoff.

---

## 🔐 Accessibility Notes

* **Keyboard & Focus**

  * `:focus-visible` outlines are high-contrast and use the brand orange (`var(--color-5)`).
  * Navbar toggler and theme toggle buttons provide `aria-label` and `aria-pressed`.

* **Forms**

  * Every `<label>` is explicitly associated with its `<input>` / `<textarea>` via `for` and matching `id`.
  * Required fields visually include `*` and are validated with messaging.

* **Modals**

  * Each modal gets:

    * `aria-labelledby` on the dialog.
    * Close button with `aria-label="Close"`.
  * Bootstrap handles focus trapping and ESC to dismiss, which helps screen readers and keyboard-only users.

* **Reduced Motion**

  * `@media (prefers-reduced-motion: reduce)` removes transforms and transitions from reveal animations, cards, etc.

---

## ⚙️ Getting Started

### 1) Clone

```bash
git clone https://github.com/your-org/the-titan-method.git
cd the-titan-method
```

### 2) Local Preview

Option A: open `index.html` directly in your browser.

Option B: run a tiny static server (recommended to mimic GitHub Pages paths):

```bash
python -m http.server 8080
# then visit http://localhost:8080
```

### 3) Deploy to GitHub Pages

1. Commit + push to GitHub.
2. In the repo: **Settings → Pages**
3. Source: `Deploy from a branch`
4. Branch: `main` (or your default), folder: `/root`
5. Save. Your site will publish at the Pages URL.

Because all links are relative, `/pricing/` and `/contact/` should work out of the box.

---

## 🛠️ Development Guidelines

* **Keep README in sync with code.**
  If we change validation, theming, routing, etc., the README must also change in that same commit/PR.

* **Don’t break dark mode.**
  All new UI elements must use the existing CSS variables (`--bg`, `--surface`, `--text`, etc.). Don’t hardcode raw colors unless you add a variable.

* **Use `.js-validate-form` for any new forms.**
  The script expects:

  * `.js-error-msg` alert
  * `.js-success-msg` alert
  * optional `data-success-modal="#someModalId"`

* **When adding a new lead form / CTA modal:**

  1. Give the `<form>` a `data-plan="Something Descriptive"`.
  2. Add a success modal in the same page.
  3. Add a CTA `<button>` with `data-form="thatFormId"` and `data-success-modal="#thatSuccessModalId"`.
  4. (Optional now / required later): connect `sendLead()` to backend.

* **Images**

  * Compress before adding.
  * Favor consistent aspect ratios (`aspect-ratio`) to keep cards from shifting.

---

## 🧪 QA Checklist

This is what QA should manually verify before sign-off:

* **Navbar**

  * Toggler works on mobile.
  * Active nav item has orange background and white text.
  * Focus ring visible when tabbing through links.

* **Theme Toggle**

  * Clicking the moon/sun switch flips between light/dark.
  * Reloading page keeps chosen theme.
  * In dark mode, VIP pricing card text is still readable.

* **Pricing Cards**

  * Hover: card scales and glows orange.
  * Active press: card briefly compresses.
  * VIP card still animates (doesn’t “break” because of gradient).

* **Modals**

  * For Standard / Premium / VIP CTA buttons:

    * Clicking opens correct modal.
    * Hitting submit with empty required fields shows red alert and red outlines.
    * Filling valid data shows green alert, closes current modal, then shows the correct success modal.
    * Success modal close button and ESC both work.

* **Contact Page**

  * Filling all fields and submitting:

    * Shows green success state.
    * Opens “Message Sent” success modal.
  * Error state appears if you leave required fields blank.

* **ScrollSwap Button**

  * Appears after you scroll down.
  * Rotates arrow appropriately when you scroll up/down.
  * Clicking scrolls smoothly.

* **Console**

  * After valid submit, `sendLead()` logs an object including:

    * adminRecipient (school email)
    * form data
    * the auto-confirmation email body for the user.

---

## 🧾 Known Limitations

* ❌ **No live email yet.**
  We do not have an actual backend endpoint shipping emails. `sendLead()` is intentionally a stub to avoid exposing credentials on the client.

* ❌ **No database.**
  Leads are not persisted automatically anywhere yet.

* ⚠️ **CSS `color-mix()`**
  We’re using `color-mix()` for glow accents. Older browsers that don’t support it will just see a more basic shadow / border look (still acceptable).

---

## 📝 License

© 2025 **Group 16** — academic use permitted; commercial use requires permission.
