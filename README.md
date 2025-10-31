# The Titan Method — Group 16

Static website for a conversion-focused fitness coaching funnel.
**HTML5 • Modern CSS • Bootstrap 5.3 • Vanilla JS • GitHub Pages**

## Team

| Member                  | Role(s)                                   |
| ----------------------- | ----------------------------------------- |
| Abegail Imee Enriquez   | Project Manager                           |
| Alvin Tubtub            | Documentation Lead • External Source Lead |
| Emmar John Alvarez      | QA Leader                                 |
| Oliver Jann Klein Borre | Lead Developer • QA Tester                |

---

## Project Purpose

Build a fast, accessible, mobile-first site that converts visitors into trial sign-ups and paid program tiers for “The Titan Method” by Coach Tavion Miles. The site is **static** (GitHub Pages-ready) with client-side validation and **localStorage** + **JSON export** to capture lead data.

**Core pages**

* Home (`/index.html`)
* Pricing (`/pricing/index.html`)
* Contact (`/contact/index.html`)

---

## What’s Included

* **Bootstrap 5.3** layout: grid utilities, responsive containers, spacing helpers.
* **Theme system**: Light/Dark toggle persisted via `localStorage`.
* **Accessible modals**: Bootstrap JS modals (focus-trap, ESC to close).
* **Form UX**: Required fields, inline error/success alerts, Enter-to-submit, success modals.
* **Lead capture (no backend)**: On valid submit, data is saved to `localStorage` **and** a JSON file is downloaded for GitHub Pages-only workflows.
* **Keyboard + A11y**: Focus states, ARIA labels, reduced-motion support, proper labels/ids.
* **Scroll helper**: Floating “scroll to footer/top” button with smooth animation.
* **Code hygiene**: Scoped selectors; no unused code; single CSS/JS bundle.

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

* One global CSS (`styles/style.css`) and one global JS (`scripts/script.js`).
* Bootstrap 5.3 via CDN (CSS + bundle JS).

---

## Running Locally

**Option A:** open `index.html` directly in a browser.
**Option B (recommended):** serve statically to mimic Pages paths.

```bash
python -m http.server 8080
# visit http://localhost:8080
```

**Deploy (GitHub Pages):** Settings → Pages → “Deploy from a branch” → `main` → `/root`.

---

## Features

### 1) Theming

* Toggle in navbar (desktop) and mirrored in mobile.
* Persists using `localStorage` key: `ttm-theme` (`"light"` or `"dark"`).
* Respects `prefers-color-scheme` if no preference saved.

### 2) Forms, Validation, and Success Flow

* All actionable forms use **`.js-validate-form.js-demo-form`**.
* Required inputs: `name`, `email` (+ `subject`, `message` on Contact).
* Email validated with a simple pattern.
* On success:

  * Green success alert appears,
  * If in a modal: active modal closes → matching **success modal** opens,
  * If on Contact page: opens `#contactSuccess`.

### 3) Lead Capture: Local Storage + JSON Download (No Backend)

* Each successful submission is appended to a collection stored in `localStorage`.
* The same collection is **immediately downloaded** as a `.json` file to your device—useful for importing elsewhere when hosted on GitHub Pages (no server).
* The **storage collection key** is set per form via `data-storage-collection`, e.g. `data-storage-collection="ttm-leads"`.
  You can use different keys for different forms if needed.

**Downloaded filename format**

```
<collectionKey>-YYYYMMDD-HHMMSS.json
```

**Record shape (example)**

```json
{
  "id": "id-l9zj8u-4w9k2yq1",
  "plan": "Standard | Premium | VIP | Contact Inquiry",
  "payload": {
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "optional",
    "address": "optional",
    "subject": "Contact only",
    "message": "Contact only"
  },
  "page": "/pricing/index.html",
  "createdAt": "2025-10-31T04:15:23.456Z"
}
```

> There are **no network requests** and no email stubs. All capture is client-side.

### 4) Accessibility

* Labels bound to inputs (`for`/`id`), visible `:focus-visible` outlines.
* Modals have `aria-labelledby` and accessible dismiss buttons.
* Scroll/reveal animations respect `prefers-reduced-motion`.
* `alt` text on all informative images.

### 5) Performance and UX

* Modern CSS features (`clamp`, CSS variables).
* Controlled animations; hover/active feedback on pricing cards.
* Scroll helper button flips intent (footer vs top) based on position/direction.

---

## Development Standards

* Keep README in sync with code whenever behavior changes.
* Use Bootstrap grid/utilities for layout; prefer utilities over custom CSS.
* Scope JS to intent-specific elements. Do **not** block default behavior globally.
* Delete unused CSS/JS/HTML before committing.
* All new forms must:

  * include `.js-validate-form.js-demo-form`,
  * provide `.js-error-msg` and `.js-success-msg` containers,
  * set `data-success-modal` when applicable,
  * specify `data-storage-collection` (e.g., `ttm-leads`),
  * optionally set `data-plan` (e.g., Standard/Premium/VIP/Contact Inquiry).

---

## Testing Checklist (Manual)

**Navigation**

* Mobile navbar toggler opens/closes; focus order is logical; active page link highlighted.

**Theme**

* Toggle switches light/dark; refresh preserves choice; contrast is legible.

**Pricing**

* Standard/Premium/VIP CTAs open the correct modal.
* Required fields enforced; valid input shows success modal.
* **LocalStorage collection** increments by one record.
* **JSON file** auto-downloads with the collection contents.

**Contact**

* Required fields enforced; success opens `#contactSuccess`.
* Entry saved to the designated `data-storage-collection`.
* JSON file downloads reflecting the new entry.

**Keyboard**

* Enter submits forms; ESC dismisses modals; tab order cycles inside modals.

**Console**

* No errors; no network calls.

---

## Simple Issue Tracking (Current Sprint)

| ID   | Item                                                    | Owner  | Status          |
| ---- | ------------------------------------------------------- | ------ | --------------- |
| I-01 | Replace CSS `:target` modals with Bootstrap JS modals   | Oliver | Done            |
| I-02 | Scope handlers to `.js-validate-form.js-demo-form` only | Oliver | Done            |
| I-03 | Persist leads to `localStorage` and auto-download JSON  | Oliver | Done            |
| I-04 | Add Address field across all pricing modals             | Oliver | Done            |
| I-05 | Keyboard: Enter submits, ESC closes modals              | Oliver | Done            |
| I-06 | Alt text pass on all informative images                 | Emmar  | Done            |
| I-07 | Remove unused CSS/JS/HTML                               | Oliver | Done            |
| I-08 | README sync with current implementation                 | Alvin  | Done            |
| I-09 | QA pass against checklist                               | Emmar  | In Progress     |
| I-10 | External Testing (Homework)                             | Team   | Pending (Nov 3) |

---

## Timeline (Deliverables and Dates)

| Deliverable                                         | Due Date (11:59 PM) | Status  |
| --------------------------------------------------- | ------------------- | ------- |
| Requirements Gathering Document                     | **08-Sep-2025**     | Done    |
| Homework: Project Wireframe                         | **15-Sep-2025**     | Done    |
| Week 4: Milestone 1 – HTML/CSS Template (Draft)     | **22-Sep-2025**     | Done    |
| Milestone 1 Submission – HTML/CSS (no Bootstrap/JS) | **29-Sep-2025**     | Done    |
| Milestone 2 – Interactive Website (Draft)           | **20-Oct-2025**     | Done    |
| Milestone 2 – Interactive Website (Submission)      | **27-Oct-2025**     | Done    |
| Homework: Testing (External)                        | **03-Nov-2025**     | Pending |
| Terminal Assessment – Refined & Tested (Draft)      | **10-Nov-2025**     | Pending |
| Terminal Assessment – Refined & Tested (Submission) | **17-Nov-2025**     | Pending |

---

## Changelog (Latest)

* Added **localStorage + JSON download** on successful submits (no backend).
* Unified success modal flow; validation trimmed and scoped.
* Pricing modals (Standard/Premium/VIP) include Address input for consistent data.
* Scroll helper action button logic refined.
* Removed unused code and all unimplemented/backend references.
* README synchronized with current behavior.

---

## License

© 2025 Group 16. Academic use permitted; commercial use requires permission.