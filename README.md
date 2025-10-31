# The Titan Method 💪🏿 — Group 16

**HTML5 • Modern CSS • Bootstrap 5.3 • Vanilla JS • GitHub Pages**

**Disclaimer**
A previous version included a “Lead Capture: Local Storage + JSON Download (no backend)” flow. We removed it due to security and privacy risk (client-side download of user data) and because the course scope is static HTML/CSS/JS without a backend. This capability will be implemented later in the advanced course.

## Team

| Member                  | Role(s)                                   |
| ----------------------- | ----------------------------------------- |
| Abegail Imee Enriquez   | Project Manager                           |
| Alvin Tubtub            | Documentation Lead • External Source Lead |
| Emmar John Alvarez      | QA Leader                                 |
| Oliver Jann Klein Borre | Lead Developer • QA Tester                |

---

## Project Purpose

Build a fast, accessible, mobile-first site that converts visitors into trial sign-ups and paid program tiers for **The Titan Method** by Coach Tavion Miles. The site is static and GitHub Pages-ready, with Bootstrap JS modals and client-side validation (no data persistence).

**Core pages**

* Home (`/index.html`)
* Pricing (`/pricing/index.html`)
* Contact (`/contact/index.html`)

---

## What’s Included

* **Bootstrap 5.3** layout: grid utilities, responsive containers, spacing helpers
* **Theme system**: Light/Dark toggle persisted via `localStorage`
* **Accessible modals**: Bootstrap JS modals with focus-trap and ESC to close
* **Form UX**: Required fields, inline error/success alerts, success modals
* **Keyboard/A11y**: Focus states, ARIA labels, reduced-motion support
* **Scroll helper**: Floating “scroll to footer/top” button with smooth animation
* **Code hygiene**: Scoped selectors; no unused code; single CSS/JS bundle

---

## File Structure

```
.
├─ index.html
├─ pricing/
│  └─ index.html
├─ contact/
│  └─ index.html
├─ styles/
│  └─ style.css
├─ scripts/
│  └─ script.js
└─ images/
```

* One global CSS (`styles/style.css`) and one global JS (`scripts/script.js`)
* Bootstrap 5.3 via CDN (CSS + bundle JS)

---

## Running Locally

**A.** Open `index.html` directly in a browser
**B.** Serve statically to mirror Pages paths:

```bash
python -m http.server 8080
# visit http://localhost:8080
```

**Deploy (GitHub Pages):** Settings → Pages → Deploy from a branch → `main` → `/root`

---

## Features

### 1) Theming

* Toggle in navbar (desktop) and mirrored in mobile
* Persists using `localStorage` key `ttm-theme` (`light` or `dark`)
* Respects `prefers-color-scheme` when no preference is saved

### 2) Forms, Validation, and Success Flow

* All actionable forms use `.js-validate-form.js-demo-form`
* Required inputs: `name`, `email` (+ `subject`, `message` on Contact)
* On success:

  * Green success alert appears
  * If in a modal: the form modal closes and the matching success modal opens
  * On Contact page: opens `#contactSuccess`

### 3) Accessibility

* Labels bound to inputs (`for`/`id`), visible `:focus-visible` outlines
* Modals have `aria-labelledby` and accessible dismiss buttons
* Scroll/reveal animations respect `prefers-reduced-motion`
* `alt` text on all informative images

### 4) Performance and UX

* Modern CSS (`clamp`, CSS variables)
* Controlled animations; hover/active feedback on pricing cards
* Scroll helper button flips intent (footer vs top) based on position/direction

---

## Development Standards

* Keep README in sync with behavior
* Use Bootstrap grid/utilities for layout; prefer utilities over custom CSS
* Scope JS to intent-specific elements; do not prevent default globally
* Remove unused CSS/JS/HTML before committing
* All new forms must:

  * include `.js-validate-form.js-demo-form`
  * provide `.js-error-msg` and `.js-success-msg` containers
  * set `data-success-modal` when applicable
  * optionally set `data-plan` (e.g., Standard/Premium/VIP/Contact Inquiry)

---

## Testing Checklist (Manual)

**Navigation**

* Mobile navbar toggler opens/closes; focus order is logical; active link highlighted

**Theme**

* Toggle switches light/dark; refresh preserves choice; contrast is legible

**Pricing**

* Standard/Premium/VIP CTAs open the correct modal
* Required fields enforced; valid input shows the correct success modal

**Contact**

* Required fields enforced; success opens `#contactSuccess`

**Keyboard**

* Enter submits forms; ESC dismisses modals; tab order cycles inside modals

**Console**

* No errors; no network calls

---

## Simple Issue Tracking (Current Sprint)

| ID       | Item                                                                               | Owner  | Status          |
| -------- | ---------------------------------------------------------------------------------- | ------ | --------------- |
| I-01     | Replace CSS `:target` modals with Bootstrap JS modals                              | Oliver | Done            |
| I-02     | Scope handlers to `.js-validate-form.js-demo-form` only                            | Oliver | Done            |
| I-03     | Add Address field across all pricing modals                                        | Oliver | Done            |
| I-04     | Keyboard: Enter submits, ESC closes modals                                         | Oliver | Done            |
| I-05     | Alt text pass on all informative images                                            | Emmar  | Done            |
| I-06     | Remove unused CSS/JS/HTML                                                          | Oliver | Done            |
| I-07     | README sync with current implementation                                            | Alvin  | Done            |
| I-08     | QA pass against checklist                                                          | Emmar  | In Progress     |
| **I-09** | **Deprecate legacy lead capture (localStorage/JSON download); remove code & docs** | Oliver | Done            |
| I-10     | External Testing (Homework)                                                        | Team   | Pending (Nov 3) |

---

## Timeline (Deliverables and Dates)

| Deliverable                                         | Due Date (11:59 PM) | Status  |
| --------------------------------------------------- | ------------------- | ------- |
| Requirements Gathering Document                     | 08-Sep-2025         | Done    |
| Homework: Project Wireframe                         | 15-Sep-2025         | Done    |
| Week 4: Milestone 1 – HTML/CSS Template (Draft)     | 22-Sep-2025         | Done    |
| Milestone 1 Submission – HTML/CSS (no Bootstrap/JS) | 29-Sep-2025         | Done    |
| Milestone 2 – Interactive Website (Draft)           | 20-Oct-2025         | Done    |
| Milestone 2 – Interactive Website (Submission)      | 27-Oct-2025         | Done    |
| Homework: Testing (External)                        | 03-Nov-2025         | Pending |
| Terminal Assessment – Refined & Tested (Draft)      | 10-Nov-2025         | Pending |
| Terminal Assessment – Refined & Tested (Submission) | 17-Nov-2025         | Pending |

---

## Changelog (Latest)

* Removed legacy lead-capture (localStorage/JSON) and scrubbed documentation
* Unified success-modal flow; validation trimmed and scoped
* Pricing modals include Address input for consistent data
* Scroll helper logic refined
* Image assets served as WebP with fallbacks
* README synchronized with codebase

---

## License

© 2025 Group 16. Academic use permitted; commercial use requires permission.