# Feature Specification — Personal Portfolio Website

**Feature slug:** `001-portfolio-website` | **Status:** Approved for planning | **Spec date:** 2026-07-17

## 1. Overview

A responsive, single-page portfolio website for Suracha Hanthongchai (Pom Pam), Software Developer & Computer Educator, built with React, Tailwind CSS, and Framer Motion. The site is fully bilingual (English/Thai) via react-i18next with JSON dictionaries — no hardcoded display text. Seven anchor sections (Hero, About, Skills, Projects, Certificates, Gallery, Contact) plus a sticky navbar and footer, in a single polished dark theme, deployable as static files.

## 2. User Stories & Acceptance Criteria

### US-1 — Language switching
As a visitor, I want the site in my language (Thai or English) and to switch anytime, so I can read comfortably.

- **AC-1.1** Given a first-time visitor whose browser language is `th`, When the page loads, Then all text renders in Thai and `<html lang="th">`.
- **AC-1.2** Given a first-time visitor whose browser language is `ja` (unsupported), When the page loads, Then all text renders in English (fallback) and `<html lang="en">`.
- **AC-1.3** Given the site is in English, When the visitor clicks the TH/EN switcher, Then all visible text changes to Thai without a page reload, And `<html lang>` becomes `th`, And the choice is saved to localStorage.
- **AC-1.4** Given a visitor previously chose Thai, When they revisit (any browser language), Then the site loads in Thai (localStorage beats navigator detection).
- **AC-1.5** Given any language state, When rendering, Then the switcher indicates the current/target language and has a localized accessible name.

### US-2 — Navbar navigation
As a visitor, I want persistent navigation that jumps to any section, on desktop and mobile.

- **AC-2.1** Given any scroll position, When the visitor looks at the top of the viewport, Then the glass (blurred, translucent) navbar is visible with logo/name left, links (About, Skills, Projects, Certificates, Gallery, Contact), and the language switcher far right.
- **AC-2.2** Given a desktop viewport (≥768px), When a nav link is clicked, Then the page smooth-scrolls to that section And the section heading is fully visible below the sticky navbar (scroll-margin offset).
- **AC-2.3** Given a mobile viewport (<768px), When the visitor taps the hamburger button, Then a menu panel opens listing all links and the language switcher, And `aria-expanded` reflects open state.
- **AC-2.4** Given the mobile menu is open, When a link is tapped, Then the menu closes and the page scrolls to the target section.
- **AC-2.5** Given reduced-motion preference, When anchor navigation occurs, Then scrolling is instant (no smooth animation).

### US-3 — Hero
As a recruiter, I want an immediate identity snapshot and clear next actions.

- **AC-3.1** Given page load in English, When the hero renders, Then it shows heading "Hi, I'm Suracha Hanthongchai (Pom Pam)", role line "Software Developer & Computer Educator", and a subtitle mentioning scalable applications, healthcare software, and integrating AI into workflows; Given Thai, Then the equivalent Thai strings render.
- **AC-3.2** Given a desktop viewport, When the hero renders, Then text occupies the left half and the profile image the right half; Given mobile, Then they stack in a single column with no horizontal overflow at 320px.
- **AC-3.3** Given the hero, When "Download Resume" is clicked, Then the browser downloads `/resume.pdf` (a valid PDF file).
- **AC-3.4** Given the hero, When "View Projects" is clicked, Then the page scrolls to the Projects section.

### US-4 — About & Tech Stack
As a visitor, I want a quick read of who he is and what he uses.

- **AC-4.1** Given either language, When About renders, Then a short professional bio appears in that language under a localized section heading.
- **AC-4.2** Given the Skills block, When it renders, Then exactly three categories appear — Frontend (React, Next.js, Tailwind CSS, Flutter), Backend & DB (Go, SQL, Object Pascal (Delphi)), AI Tools (Claude, Gemini, MedGemma) — with localized category titles and untranslated technology names as badges.

### US-5 — Projects
As a client, I want evidence of shipped work.

- **AC-5.1** Given either language, When Projects renders, Then three cards appear — Healthcare EHP Modules, Metaherb E-commerce Dashboard, Educational Roblox Game — each with image, localized title, localized description, tech-stack tags, and a "View Details" action (localized label).
- **AC-5.2** Given a card image fails to load, When `onError` fires, Then a neutral fallback replaces it (no broken-image icon).
- **AC-5.3** Given "View Details" is activated, When the link opens, Then it targets the project's configured URL in a new tab with `rel="noopener noreferrer"`.

### US-6 — Certificates & Awards carousel
As a Thai recruiter or peer, I want to see credentials and awards.

- **AC-6.1** Given either language, When Certificates renders, Then a horizontal scroll-snap carousel shows three items — Regional Arduino Robotics Coach, E-SAN Thailand Coding & AI Academy, Web Application Competition Awards — each with thumbnail, localized name, and issue date formatted for the active locale.
- **AC-6.2** Given a pointer device, When the right/left arrow button is clicked, Then the carousel scrolls one card in that direction with snap alignment.
- **AC-6.3** Given a touch device, When the visitor swipes the carousel, Then cards scroll natively with snap stops.
- **AC-6.4** Given keyboard focus on the carousel region or arrows, When arrow buttons are activated via keyboard, Then the same scrolling occurs; the region and buttons have localized accessible names.

### US-7 — Activity Gallery
As a student or teacher peer, I want to see him in action (teaching, mentoring, speaking).

- **AC-7.1** Given either language, When Gallery renders, Then a responsive photo grid of six activity images appears with localized alt text.
- **AC-7.2** Given a pointer hover (and motion allowed), When the cursor enters a photo, Then a gentle zoom and a localized caption overlay appear; Given reduced motion, Then the caption appears without zoom animation.

### US-8 — Contact
As any visitor, I want to send a message or reach him directly.

- **AC-8.1** Given the Contact section, When it renders, Then a form with labeled fields (name, email, message) plus a submit button appears, alongside direct email and GitHub/LinkedIn social links.
- **AC-8.2** Given empty or invalid fields, When the visitor submits, Then per-field localized error messages render with `role="alert"` and `aria-invalid="true"` on the fields, And nothing is submitted.
- **AC-8.3** Given valid input, When submitted, Then the form enters `submitting` state (button disabled, progress label), then a localized `success` confirmation replaces/accompanies the form.
- **AC-8.4** Given the simulated submission fails (simulated error path), When it completes, Then a localized `error` message with `role="alert"` appears and the visitor can retry with input preserved.
- **AC-8.5** Given the social links, When activated, Then GitHub/LinkedIn open in a new tab with `rel="noopener noreferrer"`.

### US-9 — Comfort & trust (cross-cutting)
- **AC-9.1** Given OS-level reduced-motion preference, When any section animates into view, Then transform animations are suppressed (content simply appears).
- **AC-9.2** Given a 320px-wide viewport in Thai, When browsing the whole page, Then no text is clipped and no horizontal page scrollbar appears.

## 3. Functional Requirements

Each FR is testable; Test column names the primary verification (unit/component test or explicit manual check in the QA pass).

| ID | Requirement | Verification |
|---|---|---|
| FR-001 | The app renders a single page containing, in order: sticky navbar, Hero, About, Skills, Projects, Certificates, Gallery, Contact, footer — using semantic landmarks (`header`, `nav`, `main`, `footer`) and one `<h1>`. | App smoke test |
| FR-002 | Every user-visible string renders via an i18next translation key from `en.json`/`th.json`; components contain no hardcoded display text (technology names/brand names live in data, not translations). | Code review + parity test + both-language smoke test |
| FR-003 | `en.json` and `th.json` have identical key structure and no empty values. | Locale parity unit test |
| FR-004 | Initial language = localStorage choice if present, else browser language if `th`/`en`, else `en`. | Unit/component test with mocked storage/navigator |
| FR-005 | The navbar language switcher toggles `en↔th` in place (no reload) and persists the choice to localStorage. | LanguageSwitcher component test |
| FR-006 | `document.documentElement.lang` equals the active language at load and after every switch. | LanguageSwitcher test asserts `lang` |
| FR-007 | Navbar is sticky (remains at viewport top when scrolling) with glass styling, name/logo left, six section links, switcher far right. | Navbar test (links) + manual sticky check |
| FR-008 | Below the `md` breakpoint the links collapse into a hamburger-toggled menu (`aria-expanded`, localized label) that closes when a link is chosen. | Navbar component test |
| FR-009 | Each section element has an id (`about`, `skills`, `projects`, `certificates`, `gallery`, `contact`) and `scroll-margin-top` ≥ navbar height; nav links are `#id` anchors. | App smoke test (ids) + manual scroll check |
| FR-010 | Hero renders the exact localized headline, role line, and subtitle (scalable applications, healthcare software, AI in workflows) with profile image; split layout ≥`md`, stacked below. | Hero test + manual responsive check |
| FR-011 | "Download Resume" links to `/resume.pdf` with a `download` attribute; the shipped placeholder is a structurally valid PDF. | Hero test (href/attr) + PDF generated by script |
| FR-012 | "View Projects" navigates to `#projects`. | Hero test (href) |
| FR-013 | About renders a localized professional bio. | Both-language smoke test |
| FR-014 | Skills renders exactly the three specified categories with exactly the specified badge names, titles localized. | Skills component test |
| FR-015 | Projects renders three cards from typed data (image, localized title + description, tech tags, localized "View Details" linking to the configured URL, new tab + `noopener noreferrer`). | Projects component test |
| FR-016 | Certificates renders a horizontal scroll-snap carousel of three items (thumbnail, localized name, locale-formatted issue date) with previous/next arrow buttons that scroll by one card. | Certificates component test (items, buttons call scroll) |
| FR-017 | Gallery renders six images with localized alt text and hover caption/zoom effect (CSS, motion-safe). | Gallery component test (items/alt) + manual hover check |
| FR-018 | Contact form fields (name, email, message) have associated `<label>`s and localized placeholders. | ContactForm test |
| FR-019 | `validateContact` (pure function) returns error keys: name required; email required/invalid format; message required/minimum 10 chars. Valid input returns no errors. | validateContact unit tests (all branches) |
| FR-020 | Invalid submit renders localized per-field errors with `role="alert"` and sets `aria-invalid`; errors clear when the field becomes valid on next submit. | ContactForm test |
| FR-021 | The form implements four explicit states — idle, submitting (controls disabled + localized progress), success (localized confirmation), error (localized retry message) — via a simulated async submit. | ContactForm test covers all four |
| FR-022 | Contact section also shows direct email (mailto) and GitHub/LinkedIn links sourced from `src/config/site.ts`; external links use `target="_blank" rel="noopener noreferrer"`. | Contact test |
| FR-023 | Footer shows localized copyright with the owner's name and current year plus a back-to-top link. | Footer/App test |
| FR-024 | All content images attach an `onError` fallback (neutral placeholder style) so missing files never show broken-image icons; placeholder SVGs live in `public/images/` with fixed documented filenames so content is swappable without code changes. | Card test (error simulation) + filename convention in plan |

Cross-cutting animation requirement (verified manually + by `MotionConfig` presence in App test): section content reveals with gentle fade-up + stagger on first view, fully suppressed under `prefers-reduced-motion` (`MotionConfig reducedMotion="user"`).

## 4. Non-Functional Requirements

| ID | Category | Requirement |
|---|---|---|
| NFR-001 | Accessibility | Semantic landmarks; one `<h1>`; ordered headings; alt text everywhere (empty for decorative); `focus-visible` rings; touch targets ≥44×44px; localized accessible names on icon-only controls; form a11y per FR-020; reduced motion respected. |
| NFR-002 | Responsive | Mobile-first; fully usable 320px–1440px+ with no horizontal page scroll and no clipped Thai text; content max-width container on large screens. |
| NFR-003 | Performance | Static bundle; self-hosted fonts (only used weights, Thai+Latin subsets); SVG placeholders; animations limited to `opacity`/`transform`; no runtime network requests to third parties. |
| NFR-004 | Code quality | TypeScript strict; ESLint zero warnings; `tsc --noEmit` clean; all tests green (`npm run lint && npm run typecheck && npm test`) before every commit (constitution III). |
| NFR-005 | Maintainability | Layered architecture (data/config/i18n/lib/components); swapping images/resume/links requires no component edits; adding a language = one JSON file + config entry. |
| NFR-006 | Privacy/Security | No secrets, no env vars, no backend; `rel="noopener noreferrer"` on external links; no `dangerouslySetInnerHTML`. |

## 5. Error-State Matrix

| Surface | Condition | EN behavior | TH behavior | Mechanism |
|---|---|---|---|---|
| Contact: name | empty | "Please enter your name" | Thai equivalent | key `contact.form.errors.nameRequired`, `role="alert"`, `aria-invalid` |
| Contact: email | empty | "Please enter your email" | Thai equivalent | key `contact.form.errors.emailRequired` |
| Contact: email | malformed | "Please enter a valid email address" | Thai equivalent | key `contact.form.errors.emailInvalid` |
| Contact: message | empty | "Please enter a message" | Thai equivalent | key `contact.form.errors.messageRequired` |
| Contact: message | <10 chars | "Message must be at least 10 characters" | Thai equivalent | key `contact.form.errors.messageTooShort` |
| Contact: submit | simulated failure | localized error banner + retry, input preserved | same | state `error`, key `contact.form.error` |
| Any content image | file missing / load failure | neutral fallback block, layout intact | same | `onError` handler (FR-024) |
| Language init | browser lang unsupported | English UI, `lang="en"` | n/a | `supportedLngs` + `fallbackLng` (FR-004) |
| Translation value | key missing in one locale | build-time test failure (never ships) | same | parity test (FR-003) |

## 6. Data Entities

All display text stays in translation files; entities carry identifiers, asset paths, and non-linguistic values. TypeScript interfaces in `src/data/types.ts`.

| Entity | Fields | Notes |
|---|---|---|
| `SkillCategory` | `id: 'frontend' \| 'backend' \| 'ai'`; `skills: string[]` | Badge names are proper nouns (not translated); title via `skills.categories.<id>` |
| `Project` | `id: 'ehp' \| 'metaherb' \| 'roblox'`; `image: string`; `tech: string[]`; `link: string` | Title/description via `projects.items.<id>.{title,description}` |
| `Certificate` | `id: 'arduino' \| 'esan' \| 'webcomp'`; `image: string`; `date: string` (ISO `YYYY-MM`) | Name via `certificates.items.<id>.name`; date rendered with `Intl.DateTimeFormat(activeLocale)` |
| `GalleryItem` | `id: string` (`g1`…`g6`); `image: string` | Caption/alt via `gallery.items.<id>.caption` |
| `SiteConfig` | `name`, `email`, `githubUrl`, `linkedinUrl`, `resumeUrl` | Single source in `src/config/site.ts` |
| `ContactFormValues` | `name: string`; `email: string`; `message: string` | Controlled form state |
| `ContactFormErrors` | `{ name?: ContactErrorKey; email?: ContactErrorKey; message?: ContactErrorKey }` | `ContactErrorKey` = union of the five error keys in §5; returned by `validateContact` |
| `FormStatus` | `'idle' \| 'submitting' \| 'success' \| 'error'` | Drives FR-021 |

## 7. Out of Scope

Multi-page routing; CMS/admin; real form backend (extension point only); light theme/theme toggle; blog; analytics; SEO beyond static meta tags; languages beyond EN/TH; server-side rendering.

## 8. Assumptions

All defaults below were chosen autonomously per pipeline policy; each lists a one-line rationale.

1. **Vite + React + TypeScript SPA instead of Next.js** — single static page with client-side react-i18next named in the requirement; no SSR/routing need; deploys anywhere as static files.
2. **Tailwind CSS v4 CSS-first config** (`@tailwindcss/vite`, `@theme`, no tailwind.config file) — current Tailwind default, one less config file.
3. **Single dark theme, no toggle** — requirement names no theme; one polished dark look (zinc-950 base, emerald/teal accent, sky gradient touches) maximizes quality per effort.
4. **Certificates use a horizontal scroll-snap carousel with arrow buttons** (requirement allowed "masonry or carousel") — native touch swiping, no JS layout library, mobile-friendly.
5. **Thai spelling of the owner's name is an unverified transliteration** — "สุรชา หาญทองชัย (พอมแพม)" is a best-effort guess and MUST be confirmed by the owner before launch; English form "Suracha Hanthongchai (Pom Pam)" is authoritative. *(RESOLVED 2026-07-18: verified as "สุรชา หาญธงชัย" from the owner's official award certificates; locales updated.)*
6. **Contact email `niponyochram@gmail.com`, GitHub `https://github.com/0pom33pom0`, LinkedIn is a placeholder URL** (`https://www.linkedin.com/in/your-profile`) — owner-supplied values pending; centralized in `site.ts` for one-line swaps.
7. **Contact form submit is simulated client-side** (async delay → success; deterministic error path for testing) — no backend in scope; Formspree/EmailJS extension point documented in code.
8. **Fonts: Prompt (headings) + Sarabun (body), self-hosted via @fontsource** with Thai-capable system fallbacks — required Thai+Latin coverage without third-party CDN calls.
9. **Default language behavior** — stored choice → browser language (`th`/`en`) → `en` fallback; `en` is the base/reference locale.
10. **"View Details" opens an external project URL** (placeholder GitHub links in data) in a new tab — no detail pages exist in a single-page site.
11. **Certificate issue dates are mock ISO values** (e.g. 2023–2024) formatted per active locale (Thai locale renders Buddhist Era per `Intl` defaults) — real dates pending from owner.
12. **Gallery contains six placeholder items** covering teaching, mentoring, and public speaking themes — count chosen for a balanced 2×3/3×2 grid.
13. **Placeholder images are local SVGs with fixed filenames** (`profile.svg`, `project-ehp.svg`, `project-metaherb.svg`, `project-roblox.svg`, `cert-arduino.svg`, `cert-esan.svg`, `cert-webcomp.svg`, `gallery-01.svg`…`gallery-06.svg`) so the owner swaps content without touching code; `resume.pdf` placeholder generated by a node script producing a valid PDF.
14. **Skills section is its own anchor target** (`#skills`) rendered adjacent to About (requirement groups them in one content block but the navbar links them separately).
15. **Package versions** — current majors recorded in `research.md` (React 19, Vite 8, Tailwind 4, framer-motion 12, i18next 26, Vitest 4, ESLint 10, TS 7 with fallback pins if peer conflicts appear at install).
16. **Message minimum length is 10 characters** — industry-common threshold making the "too short" state demonstrable and testable.
