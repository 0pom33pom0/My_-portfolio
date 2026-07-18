# Suracha Hanthongchai (Pom Pam) — Personal Portfolio

A responsive, bilingual (ไทย/English) single-page portfolio for a Software
Developer & Computer Educator — built with **React 19 + TypeScript + Vite**,
**Tailwind CSS v4**, **Framer Motion**, and **react-i18next**.

Seven sections: Hero, About, Skills, Projects, Certificates (scroll-snap
carousel), Activity Gallery, and a validated Contact form — all text driven by
JSON dictionaries, no hardcoded strings.

## Quick start

```bash
npm install
npm run dev        # http://localhost:5173
```

| Script              | What it does                                  |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Vite dev server with HMR                      |
| `npm run build`     | Type-check + production build to `dist/`      |
| `npm run preview`   | Serve the production build locally            |
| `npm run lint`      | ESLint (zero-warning policy)                  |
| `npm run typecheck` | `tsc --noEmit` (strict)                       |
| `npm test`          | Vitest + Testing Library (45 tests)           |

## Architecture (why it looks like this)

```
src/
├── i18n/            # i18next init + locales/en.json + locales/th.json
├── config/site.ts   # single source for name/email/socials/resume URL
├── data/            # typed content data (ids, image paths, tech, dates) — no display text
├── lib/             # pure logic (validateContact) — fully unit-tested
├── components/      # sections + ui/ primitives (SectionHeading, Badge, Reveal)
└── test/setup.ts    # jsdom stubs (IntersectionObserver/ResizeObserver/matchMedia)
```

- **Vite SPA instead of Next.js** — a single static page with client-side
  i18n needs no SSR; the build deploys to any static host (Netlify, Vercel,
  GitHub Pages, nginx).
- **Text lives in `src/i18n/locales/*.json`; content lives in `src/data`** —
  a parity test fails the build if `en.json` and `th.json` ever drift apart,
  so a key can never ship half-translated.
- **`<html lang>` follows the active language**; choice persists in
  localStorage, first visit auto-detects the browser language (fallback: EN).
- **Motion respects users** — every reveal/zoom goes through
  `MotionConfig reducedMotion="user"` or `motion-safe:` variants; Thai text is
  never letter-spaced.
- **Explicit UI states** — the contact form implements
  idle/submitting/success/error with localized `role="alert"` errors; every
  image has an `onError` neutral fallback.

## Make it yours

| What                | Where                                                                                   |
| ------------------- | --------------------------------------------------------------------------------------- |
| Gallery photos      | Drop **any number** of images into `src/assets/gallery/` (jpg/png/webp/svg) — they appear automatically, ordered by filename. Optional caption per photo: add `gallery.items.<filename-without-extension>.caption` to **both** locale files. |
| Certificates        | Drop **any number** of images into `src/assets/certificates/` named `YYYY-MM Certificate name.jpg` (e.g. `2025-01 Regional AI Award.jpg`) — issue date and name come from the filename; Thai filenames work. No date prefix = name-only card. A `certificates.items.<id>.name` translation overrides the display name. |
| Profile & projects  | Replace `public/images/profile/profile.svg` and `public/images/projects/project-*.svg` keeping the filenames (or update the paths in `src/data/projects.ts` / `Hero.tsx`). |
| Resume              | Overwrite `public/resume.pdf` with the real file.                                        |
| Email / socials     | `src/config/site.ts` — GitHub, LinkedIn, and W3Profile links live here.                  |
| Wording             | `src/i18n/locales/en.json` + `th.json` — always edit **both**; `npm test` enforces parity. |
| Form backend        | `src/components/ContactForm.tsx` → `simulateSubmit` is the documented extension point for Formspree/EmailJS/your API. |

> ✅ **Thai name spelling verified** — "สุรชา หาญธงชัย" was confirmed against
> the owner's official award certificates (2026-07-18), resolving spec
> Assumption 5.

## Testing

45 tests cover: locale key parity + non-empty values, i18n detection config,
language switching (html lang + localStorage), navbar/mobile menu behavior,
hero CTAs, exact skill badges, project cards (noopener links, image-error
fallback), carousel arrows + Buddhist-era Thai dates, gallery alt text, every
branch of `validateContact`, all four contact-form states (in both languages),
and a full-app bilingual smoke test.

## AI disclosure

This project was generated end-to-end by an automated spec-driven pipeline
(**pomdev-speckit**) running on Claude (Fable 5): brainstorm → research →
constitution → spec → plan → tasks → TDD implementation → QC. Every
AI-authored commit carries the `AI-generated (pomdev-speckit)` trailer, and
all planning artifacts live in `specs/`. Content facts (bio wording, project
descriptions, certificate dates) are **plausible mock data** supplied as
placeholders for the owner to review and correct.

## Known limitations

- Placeholder SVG images and a placeholder resume PDF ship by default.
- The contact form simulates submission client-side (no backend); typing a
  message containing the word "error" demonstrates the failure state.
- "View Details" project links point to the GitHub profile until real
  project URLs exist.
