# Task Breakdown — Personal Portfolio Website (001-portfolio-website)

16 tasks, dependency-ordered. Every task ends with the QC gate `npm run lint && npm run typecheck && npm test` (all green) and one atomic conventional commit with the AI-disclosure trailer (constitution III, V). Exception: T001 predates the test harness, so its gate is `npm run lint && npm run typecheck && npm run build` only; the full gate (including `npm test`) applies from T002 onward. "Covers" maps tasks to spec FRs for traceability.

---

## T001 — Project scaffold (manual, no `npm create`)
- **Files:** `package.json`, `index.html`, `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`, updated `.gitignore` if needed
- **Steps:** Hand-write `package.json` (name `wep-pom`, private, type module; scripts `dev`/`build` (`tsc --noEmit && vite build`)/`preview`/`lint`/`typecheck`/`test` (`vitest run`); deps + devDeps exactly per plan §2). Write `index.html` (lang="en", title, meta description + theme-color, favicon link, `#root`, module script). Write `vite.config.ts` with react + tailwind plugins. Write strict `tsconfig.json` (moduleResolution bundler, resolveJsonModule, jsx react-jsx). Write flat `eslint.config.js`. Minimal `App.tsx` rendering a placeholder `<main>`, `main.tsx` with guarded `#root` lookup, `index.css` with `@import "tailwindcss";`. Run `npm install`. If peer conflicts: apply plan §2 contingency pins and note in commit.
- **Accept:** `npm run dev` serves the page; `npm run build` succeeds; `npm run lint` and `npm run typecheck` pass clean; lockfile committed.
- **Test-first:** no (infrastructure) | **Depends-on:** — | **Covers:** groundwork for all FRs

## T002 — Test infrastructure
- **Files:** `vite.config.ts` (test block), `src/test/setup.ts`, `src/App.test.tsx` (trivial placeholder)
- **Steps:** Add vitest config (environment jsdom, globals true, setupFiles `src/test/setup.ts`, css false). Write setup: `@testing-library/jest-dom/vitest` import; class stubs for `IntersectionObserver` + `ResizeObserver`; `window.matchMedia` stub returning `matches:false` with add/removeEventListener no-ops. Add `"types": ["vitest/globals", "@testing-library/jest-dom"]` to tsconfig. Trivial smoke test renders `<App/>` and asserts the main landmark exists.
- **Accept:** `npm test` runs 1 green test under jsdom; stubs referenced without TS errors; QC gate passes.
- **Test-first:** yes (the smoke test IS the deliverable proving the harness) | **Depends-on:** T001 | **Covers:** verification harness for all FRs

## T003 — i18n foundation (TDD: parity test first)
- **Files:** `src/i18n/locales.test.ts`, `src/i18n/locales/en.json`, `src/i18n/locales/th.json`, `src/i18n/index.ts`, `src/main.tsx` (side-effect import)
- **Steps:** RED: write the parity test (recursive key-path equality en↔th; every leaf a non-empty string) — fails (no files) — plus an i18n config test asserting `fallbackLng` resolves to `en`, `supportedLngs` includes exactly `en`/`th`, and detection order is `['localStorage','navigator']` with localStorage caching (proxy verification for AC-1.1/1.2/1.4 and FR-004; full behavior re-verified manually in T016). GREEN: author COMPLETE dictionaries for ALL sections (nav, hero incl. exact headline/role/subtitle, about bio, skills headings/categories, projects incl. items ehp/metaherb/roblox title+description + viewDetails, certificates incl. items arduino/esan/webcomp names, gallery captions g1–g6, contact labels/placeholders/errors (5 keys)/status strings, footer, `a11y.*` control names). Thai name spelling per spec Assumption 5. Write `src/i18n/index.ts` (resources, supportedLngs ['en','th'], fallbackLng 'en', detector order localStorage→navigator with localStorage cache, escapeValue false, returnEmptyString false) + `<html lang>` sync on init and `languageChanged`. Import in `main.tsx`.
- **Accept:** Parity test red→green demonstrated; app boots with i18n active; `document.documentElement.lang` set; QC gate passes.
- **Test-first:** yes | **Depends-on:** T002 | **Covers:** FR-002, FR-003, FR-004, FR-006 (partial: init-time lang)

## T004 — Design tokens, fonts, global CSS
- **Files:** `src/index.css`, `src/main.tsx` (font imports)
- **Steps:** Import @fontsource prompt/sarabun weights (400/500/600/700 as needed). In `index.css`: `@theme` tokens — `--font-heading` (Prompt + Thai-capable fallbacks), `--font-body` (Sarabun + fallbacks), accent color tokens (emerald/teal, sky gradient stops). Base layer: `color-scheme: dark`, zinc-950 background, zinc-100 text, `motion-safe` smooth scrolling on html, `leading-relaxed` body default, focus-visible ring defaults, selection color.
- **Accept:** Dev server shows dark background with Prompt/Sarabun applied (Thai glyphs render); no unused-token lint noise; QC gate passes.
- **Test-first:** no (visual foundation) | **Depends-on:** T001 | **Covers:** NFR-002/003 groundwork, constitution IX/X

## T005 — Site config + typed data modules
- **Files:** `src/config/site.ts`, `src/data/types.ts`, `src/data/skills.ts`, `src/data/projects.ts`, `src/data/certificates.ts`, `src/data/gallery.ts`
- **Steps:** Define all interfaces/unions from spec §6 in `types.ts`. `site.ts`: name, email `niponyochram@gmail.com`, github `https://github.com/0pom33pom0`, linkedin placeholder, resumeUrl `/resume.pdf`. Data: 3 skill categories (exact badges per FR-014), 3 projects (image paths per plan tree, tech arrays, placeholder repo links), 3 certificates (image paths, ISO dates), 6 gallery items. No display text anywhere in these files.
- **Accept:** Typecheck proves shapes; grep confirms no user-visible strings in `src/data`/`src/config` (tech/proper nouns allowed); QC gate passes.
- **Test-first:** no (pure data, validated by downstream component tests + typecheck) | **Depends-on:** T003 | **Covers:** FR-015/016/017 data side, FR-022 config side, spec §6

## T006 — Placeholder assets (SVGs, favicon, resume script)
- **Files:** `public/favicon.svg`, `public/images/*.svg` (13 files per plan tree), `scripts/make-resume.mjs`, `public/resume.pdf`
- **Steps:** Author simple branded SVG placeholders (dark bg, accent shapes, descriptive label text inside the SVG artwork is allowed — it is an image, not UI text): profile, 3 projects, 3 certs, gallery-01…06, favicon monogram. Write `make-resume.mjs` producing a minimal valid single-page PDF (header + computed xref byte offsets) saying "Resume placeholder — Suracha Hanthongchai"; run it to generate `public/resume.pdf`.
- **Accept:** All 15 asset files exist at exact planned paths; `resume.pdf` opens in a PDF viewer (valid structure); images render in browser; QC gate passes.
- **Test-first:** no (assets) | **Depends-on:** T001 | **Covers:** FR-011 (PDF), FR-024 (filenames), spec Assumption 13

## T007 — UI primitives
- **Files:** `src/components/ui/SectionHeading.tsx`, `src/components/ui/Badge.tsx`, `src/components/ui/Reveal.tsx`
- **Steps:** `SectionHeading` (eyebrow + h2, accepts translated strings, consistent spacing + `scroll-mt` handled by sections). `Badge` pill (ring-1 ring-white/10, subtle bg). `Reveal` wrapping `motion.div` with fade-up `whileInView` (`once: true`, `amount 0.2`), optional delay/stagger index; no animation logic elsewhere.
- **Accept:** Primitives typecheck and render in a scratch usage inside App (removed before commit or kept as upcoming sections use them); lint, typecheck, and full test suite pass.
- **Test-first:** no (covered via section tests) | **Depends-on:** T004 | **Covers:** cross-cutting animation requirement (spec §3 footnote), NFR-001

## T008 — Navbar + LanguageSwitcher (TDD)
- **Files:** `src/components/LanguageSwitcher.test.tsx`, `src/components/Navbar.test.tsx`, `src/components/LanguageSwitcher.tsx`, `src/components/Navbar.tsx`, `src/App.tsx`
- **Steps:** RED: switcher test (toggle en→th changes rendered text, updates `document.documentElement.lang`, persists to localStorage) + navbar test (six links with correct hrefs in EN, re-check in TH; hamburger toggles panel + `aria-expanded`; panel closes on link click). GREEN: implement `LanguageSwitcher` (accessible toggle, active-language indication) and `Navbar` (sticky glass header, brand left, anchor links, switcher far right, hamburger < md). Mount in App.
- **Accept:** Both test files green covering FR-004–008; keyboard focus visible; 44px targets; lint, typecheck, and full test suite pass.
- **Test-first:** yes | **Depends-on:** T003, T007 | **Covers:** FR-005, FR-006, FR-007, FR-008 (+FR-004 exercised)

## T009 — Hero section
- **Files:** `src/components/Hero.tsx`, `src/App.tsx`
- **Steps:** Split layout (`grid md:grid-cols-2`, stacked mobile): h1 exact localized headline, role line, subtitle; CTAs — primary anchor `href={site.resumeUrl}` with `download` attribute, secondary `href="#projects"`; right column `profile.svg` with `onError` fallback; wrap content in `Reveal`. Add hero test assertions (h1 text, CTA hrefs + download attr) into App or a small Hero test.
- **Accept:** AC-3.1–3.4 verifiable (assertions for text + hrefs; manual check for layout); one `<h1>` total; lint, typecheck, and full test suite pass.
- **Test-first:** no (assertions land with implementation) | **Depends-on:** T005, T006, T007 | **Covers:** FR-010, FR-011, FR-012 (+FR-024 on profile image)

## T010 — About + Skills sections
- **Files:** `src/components/About.tsx`, `src/components/Skills.tsx`, `src/App.tsx` (+ small Skills assertions in a test file)
- **Steps:** `About` (`#about`, `scroll-mt`, SectionHeading, localized bio paragraphs). `Skills` (`#skills`, three groups from `data/skills`, localized category titles, Badge per skill). Test asserts the exact badge names per category render.
- **Accept:** AC-4.1/4.2 pass; sections reachable via navbar anchors; lint, typecheck, and full test suite pass.
- **Test-first:** no | **Depends-on:** T005, T007, T008 | **Covers:** FR-013, FR-014, FR-009 (ids/scroll-mt for these sections)

## T011 — Projects section
- **Files:** `src/components/Projects.tsx`, `src/components/ProjectCard.tsx`, `src/App.tsx` (+ Projects test)
- **Steps:** Grid (1/2/3 cols by breakpoint) mapping `data/projects` → `ProjectCard` (image with `onError` fallback, localized title/description via `projects.items.${id}.*`, tech Badges, localized View Details external link `target="_blank" rel="noopener noreferrer"`). Reveal stagger. Test: three titles render, link rel/target correct, simulated image error shows fallback.
- **Accept:** AC-5.1–5.3 pass in tests; lint, typecheck, and full test suite pass.
- **Test-first:** no | **Depends-on:** T005, T006, T007, T010 | **Covers:** FR-015, FR-024, FR-009 (projects id)

## T012 — Certificates carousel
- **Files:** `src/components/Certificates.tsx`, `src/components/CertificateCard.tsx`, `src/App.tsx` (+ Certificates test)
- **Steps:** Scroll container (`overflow-x-auto snap-x snap-mandatory`, `role="region"` + localized `aria-label`, `tabIndex=0`, scroll-padding, overscroll-contain, hidden scrollbar); slides `snap-start` fixed basis; arrow `<button>`s (localized `aria-label`s) calling `scrollBy({left: ±cardWidth})` honoring reduced motion (`behavior` auto when matchMedia reduce). `CertificateCard`: thumbnail (onError), localized name, `Intl.DateTimeFormat(i18n.language === 'th' ? 'th-TH' : 'en-GB', {year:'numeric', month:'long'})` date. Test: three names render, arrows call scrollBy spy, dates localized.
- **Accept:** AC-6.1–6.4 pass (touch behavior manual); lint, typecheck, and full test suite pass.
- **Test-first:** no | **Depends-on:** T005, T006, T007, T010 | **Covers:** FR-016, FR-024, FR-009 (certificates id)

## T013 — Activity Gallery
- **Files:** `src/components/Gallery.tsx`, `src/App.tsx` (+ Gallery assertions)
- **Steps:** Responsive grid (2 cols mobile → 3 desktop) of six `data/gallery` items; each figure: image (onError), `motion-safe:hover:scale` zoom inside overflow-hidden frame, caption overlay (gradient) visible on hover/focus-within, localized alt + caption. Test: six images with localized alts.
- **Accept:** AC-7.1/7.2 pass (hover visuals manual, reduced-motion variant manual); lint, typecheck, and full test suite pass.
- **Test-first:** no | **Depends-on:** T005, T006, T007, T010 | **Covers:** FR-017, FR-024, FR-009 (gallery id)

## T014 — Contact: validateContact (TDD) + form + section
- **Files:** `src/lib/validateContact.test.ts`, `src/lib/validateContact.ts`, `src/components/ContactForm.test.tsx`, `src/components/ContactForm.tsx`, `src/components/Contact.tsx`, `src/App.tsx`
- **Steps:** RED: unit tests for every branch (nameRequired, emailRequired, emailInvalid, messageRequired, messageTooShort <10, valid → `{}`). GREEN: implement pure `validateContact` returning error KEYS. RED: ContactForm tests (empty submit → localized alerts + aria-invalid; invalid email message; correcting the fields and resubmitting clears the previous errors (`role="alert"` gone, `aria-invalid` removed — FR-020 clearing clause); valid → submitting disabled → success; sentinel message "error" → error state, input preserved, retry possible; one assertion in TH). GREEN: controlled `ContactForm` with `FormStatus`, simulated submit (~900ms resolve; reject on sentinel), labels/ids, `role="alert"`, comment marking Formspree/EmailJS extension point. `Contact.tsx`: `#contact`, form + direct email (mailto) + GitHub/LinkedIn from `site.ts` with `rel="noopener noreferrer"`.
- **Accept:** AC-8.1–8.5 pass in tests; all four states covered; lint, typecheck, and full test suite pass.
- **Test-first:** yes | **Depends-on:** T005, T007, T008 | **Covers:** FR-018, FR-019, FR-020, FR-021, FR-022, FR-009 (contact id)

## T015 — Footer + full App assembly + bilingual smoke test
- **Files:** `src/components/Footer.tsx`, `src/App.tsx`, `src/App.test.tsx` (replace trivial test)
- **Steps:** Footer (contentinfo: localized © + name + year, back-to-top `#top`/hero anchor, small social repeat). Final App order: MotionConfig(user) → header/Navbar → main(Hero, About, Skills, Projects, Certificates, Gallery, Contact) → Footer; ids + `scroll-mt` on every section. Rewrite smoke test: landmarks (banner/navigation/main/contentinfo), exactly one h1, every section heading + id present in EN plus an About bio snippet (FR-013); switch language → headings and bio snippet in TH; `<html lang>` follows.
- **Accept:** Smoke green in both languages; FR-001 order verified; lint, typecheck, and full test suite pass.
- **Test-first:** yes (smoke rewritten before wiring Footer/order fixes) | **Depends-on:** T008–T014 | **Covers:** FR-001, FR-002, FR-009, FR-013 (verification), FR-023

## T016 — Responsive, a11y, and motion polish pass
- **Files:** any component/CSS touch-ups; no new features
- **Steps:** Manual sweep at 320/375/768/1024/1440 in BOTH languages: no horizontal scroll, no clipped Thai (AC-9.2); keyboard-only walkthrough (focus order, visible rings, menu + carousel operable); verify touch targets ≥44px; emulate `prefers-reduced-motion` and confirm reveals/smooth-scroll/hover-zoom suppressed (AC-9.1); confirm heading order and landmark uniqueness; run `npm run build && npm run preview` and re-verify; fix all findings.
- **Accept:** Zero findings remain; build + preview clean; NFR-001/002 satisfied; lint, typecheck, and full test suite pass.
- **Test-first:** no (audit) | **Depends-on:** T009–T015 | **Covers:** NFR-001, NFR-002, NFR-003, AC-9.1/9.2, cross-cutting animation requirement

---

### Dependency graph (summary)

```
T001 ─▶ T002 ─▶ T003 ─▶ T005 ─┐
  ├──▶ T004 ─▶ T007 ──────────┼─▶ T008 ─▶ T009 ─▶ T010 ─▶ T011/T012/T013 ─▶ T014 ─▶ T015 ─▶ T016
  └──▶ T006 ──────────────────┘          (T011–T013 parallelizable)
```
