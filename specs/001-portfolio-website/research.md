# Research — Best Practices & Package Versions (001-portfolio-website)

Date researched: 2026-07-17. Versions below were obtained live via `npm view <pkg> version` (all 27 lookups succeeded; no fallbacks needed).

## 1. react-i18next with TypeScript

**Setup pattern** (single init module, imported once for side effects from `main.tsx`):

- Import JSON dictionaries directly (`import en from './locales/en.json'`) — Vite + `resolveJsonModule` make them typed modules; bundle them as `resources` instead of lazy HTTP loading (two small files, one page — lazy loading buys nothing and adds a loading state).
- Chain `i18next.use(LanguageDetector).use(initReactI18next).init({...})` with:
  - `resources: { en: { translation: en }, th: { translation: th } }`
  - `fallbackLng: 'en'`, `supportedLngs: ['en', 'th']`
  - `detection: { order: ['localStorage', 'navigator'], caches: ['localStorage'] }` — persisted user choice beats browser language; unsupported navigator languages (e.g. `ja`, `de`) fall through to `en` because of `supportedLngs` + `fallbackLng`.
  - `interpolation: { escapeValue: false }` — React already escapes; double-escaping corrupts Thai text with entities.
  - `returnEmptyString: false` — an empty translation renders the key, making missing values visible in dev and testable.
- **`<html lang>` sync**: subscribe once in the init module — `i18n.on('languageChanged', (lng) => { document.documentElement.lang = lng })` — and set it once at startup. Correct `lang` matters for screen-reader pronunciation and for font shaping/line-breaking heuristics of Thai.
- **Type-safety**: the JSON imports give structural typing; the strongest guard for this project is a *parity test* (recursively compare key sets of `en.json` and `th.json`, assert no empty string values) rather than i18next's `CustomTypeOptions` declaration merging — the test also catches untranslated values, which types cannot. (Optional later: `d.ts` augmentation for autocompleted keys.)
- Key naming: dot-namespaced by section (`nav.about`, `hero.title`, `projects.items.ehp.title`, `contact.form.errors.emailInvalid`). Data modules reference translation *key prefixes* by item id so adding an item = one data entry + keys in both JSON files.

## 2. Tailwind CSS v4 — CSS-first theming

- v4 config lives in CSS, not JS: `@import "tailwindcss";` then a `@theme { ... }` block defining design tokens as CSS custom properties (`--font-heading: "Prompt", ...; --color-accent: oklch(...)`). No `tailwind.config.js`, no PostCSS config — the `@tailwindcss/vite` plugin handles scanning and building.
- Tokens declared in `@theme` generate matching utilities (e.g. `--font-heading` → `font-heading`, custom colors → `bg-*/text-*` utilities). Put brand tokens (accent emerald/teal, sky gradient stops) there so components use semantic utilities.
- Dark-only design: set `color-scheme: dark` on `:root` (native form controls, scrollbars render dark) and style directly with dark values — no `dark:` variant needed since there is no toggle.
- Glass navbar: `backdrop-blur` + translucent `bg-zinc-950/70` + `ring-1 ring-white/10`; requires the header to be `sticky top-0 z-50`.
- Use `@layer base` for global element styles (body font, selection color) and keep component styling in utilities to preserve purge/scan simplicity.

## 3. framer-motion — `whileInView` + reduced motion

- Scroll-reveal: `motion.div` with `initial={{ opacity: 0, y: 16 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, amount: 0.2 }}`. `once: true` avoids re-triggering on scroll-up (calmer, cheaper). Stagger children via a parent `variants` + `staggerChildren` transition.
- **Accessibility**: wrap the app in `<MotionConfig reducedMotion="user">` — when the OS reports `prefers-reduced-motion: reduce`, framer-motion disables transform/layout animations while keeping opacity changes, satisfying WCAG 2.3.3 with one line. Complement with Tailwind `motion-safe:`/`motion-reduce:` for pure-CSS transitions (gallery hover zoom).
- Animate only compositor-friendly properties (`opacity`, `transform`) — never `top/left/height` — to keep 60fps on low-end phones.
- jsdom has no `IntersectionObserver`/`ResizeObserver`/`matchMedia`; framer-motion touches all three. Tests must stub them in the Vitest setup file or component tests crash on import/render.
- Encapsulate the reveal pattern in one `<Reveal>` component so tests can target it and reduced-motion behavior stays consistent site-wide.

## 4. Scroll-snap carousel (Certificates)

- Container: `overflow-x-auto` + `scroll-snap-type: x mandatory` (Tailwind `snap-x snap-mandatory`) + `scroll-behavior: smooth`; children: `snap-start` (or `snap-center`) + fixed/basis widths so slides align predictably.
- Native touch swiping works with zero JS; arrow buttons call `scrollBy({ left: ±slideWidth, behavior: 'smooth' })` on the container ref for desktop/keyboard users.
- Accessibility: the scroll container gets `role="region"` + `aria-label` (localized), `tabIndex={0}` so keyboard users can scroll it; arrows are real `<button>`s with localized `aria-label`s; hide scrollbar visually but keep scrollability.
- `scroll-padding` on the container prevents the first/last slide from being clipped at the edges; `overscroll-behavior-x: contain` stops the page from chaining horizontal scroll.
- Respect reduced motion: use `behavior: 'auto'` when `matchMedia('(prefers-reduced-motion: reduce)')` matches.

## 5. Sticky header + anchor offset

- Sticky navbar (`position: sticky; top: 0`) overlaps anchor-scrolled targets. Fix: `scroll-margin-top` on every section equal to (or slightly larger than) the header height — Tailwind `scroll-mt-24` etc. Applying `scroll-padding-top` on `html` is the alternative; `scroll-margin-top` per-section is more explicit and survives header height changes per breakpoint.
- `scroll-behavior: smooth` on `html`, guarded by `@media (prefers-reduced-motion: no-preference)` (Tailwind `motion-safe:scroll-smooth`).
- Anchor links are plain `<a href="#projects">` — native, works without JS, back-button friendly. Mobile menu closes on link click (state reset) so the panel doesn't cover the target.
- Give the sticky header a stable height and `z-50`; add `backdrop-blur` only when supported (it degrades gracefully to the translucent background).

## 6. Thai web typography

- **Prompt** (headings) and **Sarabun** (body) both cover Thai + Latin ranges and are the de-facto professional Thai pairing (both commissioned for Thai legibility; Sarabun is the Thai government document font). Self-host via `@fontsource/prompt` / `@fontsource/sarabun` — import only needed weights (400/500/600/700) to keep payload small; include `-thai` and `-latin` subsets (fontsource index imports include both).
- **Line-height**: Thai script stacks vowel/tone marks above and below the baseline; tight leading clips them. Use ≥1.6 for Thai body text (Tailwind `leading-relaxed`/`leading-7`) and avoid `leading-tight` on any element that renders Thai; headings ≥1.3.
- Thai has no inter-word spaces: browsers use dictionary-based line breaking. Avoid `break-all`; `overflow-wrap: break-word` as a safety net; never rely on `word-spacing`.
- Avoid ALL-CAPS transforms (meaningless for Thai) and letter-spacing on Thai text (breaks mark positioning). Keep `font-synthesis` defaults; load real weights instead of faux-bold, which blurs Thai marks.
- Set `document.documentElement.lang` correctly (`th`/`en`) — browsers pick line-breaking dictionaries and default fonts per language.
- System fallback stack after the webfonts: `ui-sans-serif, system-ui, 'Leelawadee UI', 'Thonburi', sans-serif` (Windows/macOS Thai system fonts) so Thai never renders as tofu during font load.

## 7. Vitest + Testing Library for i18n components

- Config: Vitest inside `vite.config.ts` (`test` block) with `environment: 'jsdom'`, `globals: true`, `setupFiles: ['src/test/setup.ts']`, `css: false` (Tailwind not needed in unit tests).
- `src/test/setup.ts`: import `@testing-library/jest-dom/vitest`; stub `IntersectionObserver`, `ResizeObserver` (class stubs with observe/unobserve/disconnect no-ops) and `window.matchMedia` (returns `matches: false` + listener no-ops) — required by framer-motion under jsdom.
- Render components wrapped with the *real* `I18nextProvider` and the real init module (not string mocks): tests then assert actual translated strings, catching key typos for free. Reset language to `en` in `beforeEach` (`i18n.changeLanguage('en')`) for determinism; the detector caches to localStorage, so also `localStorage.clear()`.
- Language-switch tests: `user-event` click on the toggle → `await screen.findByText(/thai heading/)` and assert `document.documentElement.lang === 'th'`.
- Parity test needs no DOM: import both JSON files, recursively collect key paths, `expect(thKeys).toEqual(enKeys)` and assert every leaf is a non-empty string — this is the single highest-value test in the project.
- Form tests: `user-event.type` + submit; assert `role="alert"` errors appear with translated messages, then valid input → simulated-submit success state (use fake timers or a short deterministic delay).
- Query priority: `getByRole` with accessible names first — doubles as an accessibility check.

## 8. Package versions (live `npm view` — 2026-07-17)

All lookups succeeded; recommended range = caret of the current major.

| Package | Current version | Recommended range |
|---|---|---|
| vite | 8.1.5 | ^8.1.5 |
| @vitejs/plugin-react | 6.0.3 | ^6.0.3 |
| react | 19.2.7 | ^19.2.7 |
| react-dom | 19.2.7 | ^19.2.7 |
| typescript | 7.0.2 | ^7.0.2 (see note) |
| tailwindcss | 4.3.3 | ^4.3.3 |
| @tailwindcss/vite | 4.3.3 | ^4.3.3 |
| framer-motion | 12.42.2 | ^12.42.2 |
| i18next | 26.3.6 | ^26.3.6 |
| react-i18next | 17.0.10 | ^17.0.10 |
| i18next-browser-languagedetector | 8.2.1 | ^8.2.1 |
| vitest | 4.1.10 | ^4.1.10 |
| jsdom | 29.1.1 | ^29.1.1 |
| @testing-library/react | 16.3.2 | ^16.3.2 |
| @testing-library/jest-dom | 6.9.1 | ^6.9.1 |
| @testing-library/user-event | 14.6.1 | ^14.6.1 |
| @types/react | 19.2.17 | ^19.2.17 |
| @types/react-dom | 19.2.3 | ^19.2.3 |
| eslint | 10.7.0 | ^10.7.0 |
| @eslint/js | 10.0.1 | ^10.0.1 |
| globals | 17.7.0 | ^17.7.0 |
| typescript-eslint | 8.64.0 | ^8.64.0 |
| eslint-plugin-react-hooks | 7.1.1 | ^7.1.1 |
| eslint-plugin-react-refresh | 0.5.3 | ^0.5.3 |
| @fontsource/prompt | 5.2.8 | ^5.2.8 |
| @fontsource/sarabun | 5.2.8 | ^5.2.8 |
| @types/node | 26.1.1 | ^26.1.1 |

**Version notes for Phase 2 (must handle at install time):**

- **TypeScript 7.0.2** is current. If `typescript-eslint@8.64.0` or `vite`/`vitest` emit peer warnings against TS 7 at `npm install`, pin TypeScript to the latest 6.x instead (`npm view typescript versions` to pick) and record the pin in a commit message — zero-warning installs beat bleeding-edge.
- **ESLint 10.7.0** is current (flat config is the only config system — same flat-config shape planned works for 9 and 10). If `typescript-eslint`/plugins declare peer support only for `^9`, drop ESLint to `^9` latest; the config file needs no changes.
- These are the only two flagged risks; all other majors match the planned architecture (Vite 8 works with `@vitejs/plugin-react` 6 and `@tailwindcss/vite` 4; react-i18next 17 pairs with i18next 26 and React 19).

## 9. Security review (scope-appropriate)

- **No secrets**: static site, no API keys, no env vars, no backend — nothing to leak; `.gitignore` still excludes `node_modules`/`dist`.
- **No injection surface**: contact form performs client-side validation and a simulated submit; no data leaves the browser, no server to attack. When Formspree/EmailJS is plugged in later, that service's token is public-by-design (client-side) and rate limiting is delegated to it.
- **External links**: all `target="_blank"` links (GitHub, LinkedIn) carry `rel="noopener noreferrer"` to prevent reverse tabnabbing and referrer leakage.
- **No `dangerouslySetInnerHTML`** anywhere; i18next `escapeValue: false` is safe because values render through React's escaping, and no translation strings contain markup.
- **Dependencies**: all packages are mainstream, actively maintained; lockfile committed; no postinstall-script-heavy deps beyond fonts/tooling.
- **Content**: only public professional information is published; the contact email is intentionally public.
