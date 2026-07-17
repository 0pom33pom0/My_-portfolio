# Project Constitution — wep_pom

Binding rules for all development in this repository. Every task, commit, and review is checked against these articles. Where an article conflicts with convenience, the article wins.

## Article I — Clean Layering

Code is separated into distinct layers with one-way dependencies: `src/data/` (typed content structure: ids, image paths, tech tags, links), `src/config/` (identity facts: email, socials, resume URL), `src/i18n/` (init + locale JSON dictionaries), `src/lib/` (pure logic), `src/components/` (presentation). Components consume data/config/i18n — never the reverse. **No user-visible text may be hardcoded in any component**: every display string is rendered through a translation key (`t('...')`). Data modules carry no display text, only keys/ids and non-linguistic values.

## Article II — TDD for Logic

All pure logic and all invariants get a failing test *before* the implementation: `validateContact` (every rule and error key), the en/th locale key-parity invariant, and language-switching behavior. Red → green → refactor; a task claiming TDD must show the test existed first (commit order or task notes).

## Article III — Zero Warnings

`npm run lint` (ESLint, zero warnings tolerated) and `npm run typecheck` (`tsc --noEmit`, strict) must pass clean before **every** commit. No `eslint-disable` or `@ts-expect-error` without an inline comment justifying it. CI-equivalent local gate: `npm run lint && npm run typecheck && npm test`.

## Article IV — Null-Safety & Defensive Rendering

TypeScript `strict` is non-negotiable. No non-null assertions (`!`) on external or dynamic values (DOM lookups, `find()` results, JSON access); use narrowing or explicit fallbacks. Every content image handles `onError` with a graceful fallback (neutral placeholder or hidden decorative image) so a missing/renamed file never renders a broken-image icon. Root render guards the `#root` element lookup.

## Article V — Atomic Conventional Commits

One logical change per commit, conventional-commit format (`feat:`, `fix:`, `test:`, `docs:`, `chore:`, `refactor:`). Every commit message ends with the AI-disclosure trailer lines:

```
Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>
AI-generated (pomdev-speckit)
```

No commit mixes unrelated files; no commit is made with failing gates (Article III).

## Article VI — Explicit UI States

Every interactive surface defines all of its states explicitly — none are implicit. This site has no remote data, so the rule concretely binds: **contact form** must implement and visually distinguish `idle`, `submitting` (disabled controls + progress indication), `success` (localized confirmation), and `error` (localized failure with retry path); **images** must handle load failure (Article IV). State transitions are testable and tested.

## Article VII — Accessibility Floor

Non-negotiable minimums: semantic landmarks (`header`, `nav`, `main`, one `footer`); exactly one `<h1>` (hero), ordered heading levels; meaningful `alt` text on informative images (empty `alt` on decorative ones); visible `:focus-visible` indicators on all interactive elements; touch targets ≥ 44×44px; `prefers-reduced-motion` respected globally (`MotionConfig reducedMotion="user"` + `motion-safe:` CSS); form inputs have associated `<label>`s, invalid fields set `aria-invalid`, error messages use `role="alert"`; controls have localized accessible names (language toggle, hamburger, carousel arrows).

## Article VIII — i18n Integrity

`en.json` and `th.json` maintain perfect structural key parity, enforced by an automated test that also rejects empty values — the build is broken when a key exists in one language only. No orphan keys: every key in the dictionaries is referenced by code or data (removals delete both sides). `document.documentElement.lang` always reflects the active language (synced on init and every change). Language choice persists in localStorage; unsupported browser languages fall back to `en`.

## Article IX — Mobile-First Responsive

Styles are authored mobile-first (base = smallest screen, enhance upward with `sm:`/`md:`/`lg:`). The layout must be fully usable — no horizontal page scroll, no clipped text (Thai included), no overlapping elements — from **320px** wide upward. Wide content (carousel) scrolls within its own container. Breakpoint behavior is part of acceptance criteria for every UI task.

## Article X — Performance Sanity

Fonts are self-hosted (@fontsource, only needed weights/subsets); images are lightweight local SVG placeholders; animations use compositor-safe properties only (`opacity`, `transform`); no dependency may be added beyond the approved list in `research.md`/`plan.md` without amending the plan first. The production build stays a static bundle with no runtime network dependencies (fonts, icons, images all local).
