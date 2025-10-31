# The Titan Method 💪🏿 — Group 16

**HTML5 • Modern CSS • Bootstrap 5.3 • Vanilla JS • GitHub Pages**

**Disclaimer**
An earlier build used a “Lead Capture: Local Storage + JSON Download (no backend)” flow. We removed it due to privacy risk (client-side downloads of user data) and because the course scope is a static site with no backend. This capability will be revisited in the advanced course.

## Team

| Member                  | Role(s)                                                            |
| ----------------------- | ------------------------------------------------------------------ |
| Abegail Imee Enriquez   | Project Manager • Owner (Layout/Responsive/Wireframe/Requirements) |
| Alvin Tubtub            | Documentation Lead • External Source Lead                          |
| Emmar John Alvarez      | QA Leader                                                          |
| Oliver Jann Klein Borre | Lead Developer • QA Tester                                         |

---

## Project Purpose

Build a fast, accessible, mobile-first site that converts visitors into trial sign-ups and paid tiers for **The Titan Method** by Coach Tavion Miles. Static, GitHub Pages–ready. Bootstrap JS modals and client-side validation only (no data persistence).

**Core pages**

* Home (`/index.html`)
* Pricing (`/pricing/index.html`)
* Contact (`/contact/index.html`)

---

## What’s Included

* **Bootstrap 5.3** utilities (containers, grid, spacing)
* **Theme system (dark-first)**: default dark, prepainted to avoid flashes; toggle persists via `localStorage`
* **Responsive layout**: Flexbox/Grid across sections (`.wrapper`, `.about__main`, program/testimonials rows)
* **Accessible modals**: Bootstrap JS, focus-trap, ESC to close
* **Form UX**: Required fields, inline alerts, success modals
* **Keyboard/A11y**: `:focus-visible`, ARIA, reduced-motion support
* **Scroll helper**: Floating “scroll to footer/top” button
* **Code hygiene**: Scoped selectors, single CSS/JS bundle

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

* One global CSS and one global JS
* Bootstrap 5.3 via CDN (CSS + bundle JS)

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

### 1) Theming

* **Dark-first default** with prepaint (sets `data-theme="dark"` and `color-scheme: dark` ASAP to prevent flash)
* Desktop + mobile toggles
* Persists with `localStorage` key `ttm-theme` (`light`/`dark`)
* Honors `prefers-color-scheme` only if user hasn’t chosen

### 2) Forms & Success Flow

* Forms use `.js-validate-form.js-demo-form`
* Required: `name`, `email` (+ `subject`, `message` on Contact)
* On success: green alert; matching success modal opens (e.g., Contact → `#contactSuccess`)

### 3) Accessibility

* Proper labels/ids, `:focus-visible`, ARIA on modals
* Animations respect reduced-motion
* All informative images have descriptive `alt`

### 4) Layout, Typography & Responsiveness

* **Layout classes implemented** for predictable section structure (`.wrapper`, `.about__main`, program/testimonials splits)
* **Responsive rules**: mobile-first with breakpoint refinements for tablets and desktops
* **Typography**: increased paragraph line height for readability on all viewports

### 5) Performance & UX

* Modern CSS (`clamp`, variables)
* Subtle card hover/active feedback
* Scroll helper flips intent based on position

---

## Development Standards

* Keep README in sync with behavior
* Prefer Bootstrap utilities for layout; layer custom Flex/Grid where needed
* Scope JS to intent-specific elements; don’t block defaults globally
* Remove unused CSS/JS/HTML before committing
* New forms must include:

  * `.js-validate-form.js-demo-form`
  * `.js-error-msg` and `.js-success-msg`
  * `data-success-modal` when applicable
  * optional `data-plan` (Standard/Premium/VIP/Contact)

---

## Testing Checklist (Manual)

**Navigation** — Mobile toggler works; active link highlighted
**Theme** — Dark is default; toggle preserves choice; contrast OK
**Layout/Responsive** — Sections align correctly (about/program/testimonials); stack gracefully on small screens; tablet breakpoints verified
**Typography** — Paragraph line height improves readability across viewports
**Pricing** — CTAs open the correct modal; required fields enforced
**Contact** — Required fields enforced; `#contactSuccess` opens
**Keyboard** — Enter submits; ESC closes modals; tab cycles correctly
**Console** — No errors; no network calls

---

## Simple Issue Tracking (Current Sprint)

> The first three entries address layout, responsiveness, and typography. **Owner: Abegail**.

| ID  | Item                                                                                                | Owner   | Status          |
| --- | --------------------------------------------------------------------------------------------------- | ------- | --------------- |
| T01 | Implement section layouts using Flex/Grid (`.wrapper`, `.about__main`, program/testimonials splits) | Abegail | Done            |
| T02 | Add mobile-first media queries; refine tablet/desktop breakpoints for balanced stacking             | Abegail | Done            |
| T03 | Increase paragraph line height for readability across all viewports                                 | Abegail | Done            |
| T04 | Replace CSS `:target` modals with Bootstrap JS modals                                               | Oliver  | Done            |
| T05 | Scope handlers to `.js-validate-form.js-demo-form` only                                             | Oliver  | Done            |
| T06 | Add Address field to all pricing modals                                                             | Oliver  | Done            |
| T07 | Keyboard: Enter submits; ESC closes modals                                                          | Oliver  | Done            |
| T08 | Alt text pass on informative images                                                                 | Emmar   | Done            |
| T09 | Remove unused CSS/JS/HTML                                                                           | Oliver  | Done            |
| T10 | README sync with current implementation                                                             | Alvin   | Done            |
| T11 | QA pass against checklist                                                                           | Emmar   | In Progress     |
| T12 | Deprecate legacy lead capture (localStorage/JSON); remove from docs                                 | Oliver  | Done            |
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

* **Theme**: Dark-first default with prepaint; `color-scheme` hint to prevent flash
* **Layout**: Implemented Flex/Grid structure for sections; cleaned single-page alignment
* **Responsive**: Added mobile-first breakpoints; tablet/desktop refinements
* **Typography**: Increased paragraph line height for readability
* Unified success-modal flow; validation trimmed and scoped
* Pricing modals include Address input
* Scroll helper logic refined
* Images now served as WebP with fallbacks
* README synchronized with codebase

---

## License

© 2025 Group 16. Academic use permitted; commercial use requires permission.