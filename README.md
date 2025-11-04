# The Titan Method 💪🏿 — Group 16

**HTML5 • Modern CSS • Bootstrap 5.3 • Vanilla JS • GitHub Pages**

## Team

| Member                  | Role(s)                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| Abegail Imee Enriquez   | Project Manager • Owner (Layout/Responsive/Wireframe/Requirements) |
| Alvin Tubtub            | Documentation Lead • External Source Lead                          |
| Emmar John Alvarez      | QA Leader                                                          |
| Oliver Jann Klein Borre | Lead Developer • QA Tester                                         |

---

## Project Purpose

Build a fast, accessible, mobile-first site that converts visitors into trial sign-ups and paid tiers for **The Titan Method** by Coach Tavion Miles. Static, GitHub Pages–ready. Uses Bootstrap JS modals and client-side validation (no backend).

**Core pages**

* Home (`/index.html`)
* Pricing (`/pricing/index.html`)
* Contact (`/contact/index.html`)

---

## What’s Included

* **JSON-driven content bundle**: `/data/content.v1.json` + client hydrator (`/scripts/content-loader.js`) to fill brand, nav, hero, pricing, contact, and footer.
* **Bootstrap 5.3** (CDN) for layout/utilities and accessible JS modals.
* **Theme system (dark-first)** with prepaint to prevent FOUC; toggle persists via `localStorage`.
* **Responsive layout** (Flex/Grid) and refined tablet/desktop breakpoints.
* **Form UX** with inline alerts + success modals (demo only, no persistence).
* **A11y**: focus states, ARIA labels, reduced-motion support.
* **Scroll helper** (bottom-right) that smart-flips top/footer intent.
* **Single CSS/JS bundle** for site behavior; scoped selectors and events.

---

## GitHub Page Link

**[https://kleinborre.github.io/web-sys-tech-g16/](https://kleinborre.github.io/web-sys-tech-g16/)**

---

## File Structure

```
.
├─ index.html
├─ pricing/
│  └─ index.html
├─ contact/
│  └─ index.html
├─ data/
│  └─ content.v1.json
├─ styles/
│  └─ style.css
├─ scripts/
│  ├─ content-loader.js
│  └─ script.js
└─ images/
```

* One global CSS and one behavior script (`script.js`)
* **New:** `content-loader.js` hydrates the DOM from `data/content.v1.json`
* Bootstrap 5.3 via CDN (CSS + bundle JS)

---

## JSON Content System (New)

**Endpoint:** `/data/content.v1.json`
**Loader:** `/scripts/content-loader.js`

**How it works**

* On `DOMContentLoaded`, the loader fetches the JSON (no-store).
* The loader **version-checks** via `site.version` and caches content in `localStorage`:

  * Keys: `ttm-siteContent` and `ttm-siteContentVersion`
  * If fetch fails (offline), it falls back to the cached copy.
* It **hydrates** specific regions:

  * **Brand:** name, logo (png/webp), home link
  * **Nav:** menu items
  * **Hero:** title, subtitle, primary/secondary CTA
  * **Pricing:** headline, intro, plan names/prices/badges/cta text
  * **Contact:** title, intro, address card (org/street/phones/map)
  * **Footer:** legal text, social links (icons + hrefs)

**When to bump version**

* Any time you change visible content in the JSON, increment `"version"` in `content.v1.json`.
* Keep selectors stable (`data-*` hooks) or update the loader accordingly.

**Key selectors (examples)**

* Brand: `[data-brand-name]`, `[data-brand-home]`, `[data-brand-logo-png]`, `[data-brand-logo-webp]`
* Hero: `[data-hero-title]`, `[data-hero-subtitle]`, `[data-hero-cta1]`, `[data-hero-cta2]`
* Pricing: `[data-pricing-title]`, `[data-pricing-intro]`, per-plan hooks like `[data-plan-premium-price]`
* Contact: `[data-contact-title]`, `[data-contact-intro]`, `[data-contact-map]`, `[data-contact-phones]`
* Footer: `[data-footer-legal]`, container `[data-footer-social]`

---

## Running Locally

**A.** Open `index.html` directly
**B.** Serve statically:

```bash
python -m http.server 8080
# http://localhost:8080
```

**Deploy (GitHub Pages):** Settings → Pages → Deploy from a branch → `main` → `/root`

---

## Features

### 1) JSON-Driven Content

* Single source of truth in `data/content.v1.json`.
* Hydration across all pages via `content-loader.js`.
* Versioned caching with offline fallback to last good content.

### 2) Theming

* **Dark-first** default with prepaint (`data-theme="dark"` and `color-scheme: dark`).
* Desktop + mobile toggles.
* Persists with `localStorage` key `ttm-theme` (`light`/`dark`).
* Honors `prefers-color-scheme` only if the user hasn’t chosen.

### 3) Forms & Success Flow

* Forms use `.js-validate-form.js-demo-form`.
* Required: `name`, `email` (+ `subject`, `message` on Contact).
* On success: green alert; matching success modal opens (e.g., Contact → `#contactSuccess`).
* **No storage / no network submits** (demo only).

### 4) Accessibility

* Proper labels/ids, `:focus-visible`, ARIA on modals.
* Animations respect reduced-motion.
* Informative images have descriptive `alt`.

### 5) Layout, Typography & Responsiveness

* Section scaffolding with `.wrapper`, `.about__main`, program/testimonials splits.
* Mobile-first with balanced tablet/desktop refinements.
* Readable line-height defaults across breakpoints.

### 6) Performance & UX

* Modern CSS (variables, `clamp`).
* Subtle card hover/active states.
* Scroll helper flips top/footer based on position.

---

## Development Standards

* Keep README, JSON, and code **in sync**.
* **Bump `site.version`** in `content.v1.json` whenever visible content changes.
* Prefer Bootstrap utilities for layout; layer custom Flex/Grid where needed.
* Scope JS to intent-specific elements; no global `preventDefault()` on all forms.
* Remove unused CSS/JS/HTML before committing.
* New forms must include:

  * `.js-validate-form.js-demo-form`
  * `.js-error-msg` and `.js-success-msg`
  * `data-success-modal` when applicable
  * optional `data-plan` (Standard/Premium/VIP/Contact)

---

## Testing Checklist (Manual)

**Navigation** — Links match JSON; mobile toggler collapses after click
**Theme** — Dark is default; toggle persists; contrast OK
**JSON/Hydration** — Brand/nav/hero/pricing/contact/footer reflect JSON values; badge/CTA text updated; **offline fallback works** after one successful load
**Layout/Responsive** — Sections align; stack gracefully on small screens; tablet breakpoints verified
**Typography** — Paragraph line height readable across viewports
**Pricing** — CTAs open the correct modal; required fields enforced
**Contact** — Required fields enforced; `#contactSuccess` opens
**Keyboard** — Enter submits; ESC closes modals; tab cycles correctly
**Console** — No errors; JSON fetch returns 200; no unexpected network calls

---

## Simple Issue Tracking (Current Sprint)

> First three entries address layout, responsiveness, and typography. **Owner: Abegail**.

| ID  | Item                                                                                                | Owner   | Status          |
| --- | --------------------------------------------------------------------------------------------------- | ------- | --------------- |
| T01 | Implement section layouts using Flex/Grid (`.wrapper`, `.about__main`, program/testimonials splits) | Abegail | Done            |
| T02 | Add mobile-first media queries; refine tablet/desktop breakpoints                                   | Abegail | Done            |
| T03 | Increase paragraph line height for readability                                                      | Abegail | Done            |
| T04 | Replace CSS `:target` modals with Bootstrap JS modals                                               | Oliver  | Done            |
| T05 | Scope handlers to `.js-validate-form.js-demo-form` only                                             | Oliver  | Done            |
| T06 | Add Address field to all pricing modals                                                             | Oliver  | Done            |
| T07 | Keyboard: Enter submits; ESC closes modals                                                          | Oliver  | Done            |
| T08 | Alt text pass on informative images                                                                 | Emmar   | Done            |
| T09 | Remove unused CSS/JS/HTML                                                                           | Oliver  | Done            |
| T10 | README sync with current implementation                                                             | Alvin   | Done            |
| T11 | QA pass against checklist                                                                           | Emmar   | Done            |
| T12 | **Introduce JSON bundle + hydrator; add versioned caching & fallback**                              | Oliver  | Done            |
| T13 | External Testing (Homework)                                                                         | Team    | Pending (Nov 3) |

---

## Timeline (Deliverables and Dates)

| Deliverable                                         | Due Date (11:59 PM) | Status  |
| --------------------------------------------------- | ------------------- | ------- |
| Requirements Gathering Document *(Owner: Abegail)*  | 08-Sep-2025         | Done    |
| Homework: Project Wireframe *(Owner: Abegail)*      | 15-Sep-2025         | Done    |
| Week 4: Milestone 1 – HTML/CSS Template (Draft)     | 22-Sep-2025         | Done    |
| Milestone 1 Submission – HTML/CSS (no Bootstrap/JS) | 29-Sep-2025         | Done    |
| Milestone 2 – Interactive Website (Draft)           | 20-Oct-2025         | Done    |
| Milestone 2 – Interactive Website (Submission)      | 27-Oct-2025         | Done    |
| Homework: Testing (External)                        | 03-Nov-2025         | Pending |
| Terminal Assessment – Refined & Tested (Draft)      | 10-Nov-2025         | Pending |
| Terminal Assessment – Refined & Tested (Submission) | 17-Nov-2025         | Pending |

---

## Changelog (Latest)

* **NEW:** JSON-driven content bundle (`/data/content.v1.json`) + hydrator (`/scripts/content-loader.js`)
* **Caching:** `localStorage` with version key; offline fallback to last good content
* **Theme:** Dark-first prepaint; `color-scheme` hint to prevent flash
* **Layout/Responsive:** Flex/Grid structure, mobile-first breakpoints
* **Typography:** Improved line height for readability
* **UX:** Unified success-modal flow; refined scroll helper
* **Assets:** WebP with PNG fallbacks
* README synchronized with current implementation

---

## License

© 2025 Group 16. Academic use permitted; commercial use requires permission.