# Brainstorm — Personal Portfolio Website (001-portfolio-website)

## 1. Intent

Build a complete, responsive, single-page personal portfolio website for **Suracha Hanthongchai (Pom Pam)** — Software Developer & Computer Educator. The site presents who he is, what he can build (healthcare software, scalable applications, AI-integrated workflows), what he has achieved (certificates, awards, coaching), and how to reach him. It must be fully bilingual (Thai/English) with zero hardcoded display text, look polished on any device from a 320px phone to a wide desktop, and be trivially deployable as static files.

Primary goals, in priority order:

1. **Credibility** — a recruiter or client forms a positive impression within 10 seconds (hero + design quality).
2. **Reachability** — Thai *and* international audiences read the site in their own language; contact is one scroll or one click away.
3. **Maintainability** — the owner swaps images, resume, and text (translation JSON) without touching component code.

## 2. Target Users

| Persona | Language | What they want | Key sections |
|---|---|---|---|
| Tech recruiter (international) | EN | Fast scan of skills, real projects, resume download | Hero, Skills, Projects |
| Thai recruiter / hospital IT manager | TH | Healthcare domain proof, credentials in Thai | Hero, Projects (EHP), Certificates |
| Freelance client / SME owner | TH/EN | Evidence he ships (dashboard, e-commerce), easy contact | Projects, Contact |
| Students / peers / teacher network | TH | Teaching, coaching, community activity | Certificates, Gallery, About |

Implication: the language switcher must be obvious (navbar, far right), remember the choice (localStorage), and default sensibly from the browser language with English fallback.

## 3. Single-Page Screen Flow

One page, seven anchor sections plus footer. The sticky navbar drives smooth anchor scrolling; `scroll-margin-top` on each section compensates for the fixed header height.

```
┌───────────────────────────────────────────────────────────────┐
│ NAVBAR (sticky, glass): Logo/Name | About Skills Projects     │
│ Certificates Gallery Contact | [TH/EN toggle]  (hamburger <md)│
├───────────────────────────────────────────────────────────────┤
│ #hero        Split: headline+subtitle+CTAs ⟷ profile image    │
│              [Download Resume] [View Projects → #projects]    │
├───────────────────────────────────────────────────────────────┤
│ #about       Bio + Tech Stack badges (Frontend / Backend & DB │
│              / AI Tools) — skills live inside the About block  │
│              as its own #skills anchor                        │
├───────────────────────────────────────────────────────────────┤
│ #projects    3-card grid: EHP Modules, Metaherb Dashboard,    │
│              Roblox Game (image, title, desc, tech, button)   │
├───────────────────────────────────────────────────────────────┤
│ #certificates  Horizontal scroll-snap carousel with arrows:   │
│              Arduino Coach, E-SAN Academy, Web Comp Awards    │
├───────────────────────────────────────────────────────────────┤
│ #gallery     Photo grid, hover zoom/overlay captions          │
│              (teaching, mentoring, public speaking)           │
├───────────────────────────────────────────────────────────────┤
│ #contact     Form (name/email/message, 4 UI states) +         │
│              direct email + GitHub/LinkedIn links             │
├───────────────────────────────────────────────────────────────┤
│ FOOTER       © name, small social repeat, back-to-top         │
└───────────────────────────────────────────────────────────────┘
```

User journey (recruiter, desktop): land on hero → skim headline → click "View Projects" → scan cards → jump to Contact via navbar → click LinkedIn. Journey (Thai student, mobile): land → toggle TH → hamburger → Gallery → scroll Certificates carousel by swipe.

## 4. Edge Cases to Design For

| # | Edge case | Planned handling |
|---|---|---|
| E1 | Long Thai strings overflow (Thai has no spaces to break on; translations run longer than EN) | Fluid type scale, `break-words`, generous `line-height` (Thai ascenders/descenders), test both locales at 320px |
| E2 | Missing/broken image file (user swapped a placeholder badly) | `onError` handler swaps in a neutral inline fallback; alt text always present |
| E3 | User prefers reduced motion | `MotionConfig reducedMotion="user"` disables framer-motion transforms globally; CSS `motion-safe:` for the rest |
| E4 | Very small screens (320px) | Mobile-first layout; single column; hamburger nav; carousel is swipe-native |
| E5 | Keyboard-only navigation | Semantic landmarks, logical tab order, `focus-visible` rings, carousel arrows are real buttons, hamburger is a button with `aria-expanded` |
| E6 | Empty/garbage form submit | Client-side `validateContact` returns error keys per field; errors localized, `aria-invalid` + `role="alert"`; submit disabled while submitting |
| E7 | Browser language is neither TH nor EN (e.g. `ja`) | i18next `fallbackLng: 'en'`, `supportedLngs: ['en','th']` — always renders English |
| E8 | Stored language then revisit | localStorage detection first → persisted choice wins over navigator |
| E9 | `document.documentElement.lang` out of sync after switch | i18next `languageChanged` listener syncs `<html lang>` (screen readers, font shaping) |
| E10 | Anchor scroll hides section heading under sticky navbar | `scroll-margin-top` ≥ navbar height on all sections |
| E11 | Resume link 404s | Ship a valid placeholder `public/resume.pdf`; link uses `download` attribute |
| E12 | JS test environment lacks browser APIs framer-motion needs | Vitest setup stubs `IntersectionObserver`, `ResizeObserver`, `matchMedia` |

## 5. Alternatives Considered

### 5.1 Framework: Next.js vs Vite React SPA — **chosen: Vite SPA**
- The requirement is a single static page: no routes, no server data, no SSR-dependent SEO beyond static meta tags (which `index.html` covers).
- The requirement explicitly names **react-i18next**, a client-side i18n solution; Next.js App Router i18n pushes toward middleware/route-based locales — a mismatch and extra complexity.
- Vite output is plain static files → deploy to GitHub Pages/Netlify/Vercel/any web server unchanged. Faster dev server, smaller mental model.
- Next.js would win only if we needed SSR/ISR, image optimization service, or multiple routes — none apply.

### 5.2 Certificates layout: masonry vs carousel — **chosen: horizontal scroll-snap carousel**
- True masonry needs JS measurement (or CSS `grid-template-rows: masonry`, still not broadly shipped) — extra dependency/complexity for 3 items.
- CSS scroll-snap gives native touch swiping on mobile for free; arrow buttons add desktop affordance and keyboard/mouse access.
- Scales gracefully when the owner adds more certificates (just more slides).

### 5.3 i18n: custom React context vs react-i18next — **chosen: i18next + react-i18next**
- Requirement names react-i18next verbatim.
- Gets language detection (localStorage → navigator), fallback chains, interpolation, and a mature `useTranslation` hook for free; a hand-rolled context would re-implement all of that and stay untested.
- JSON resource files (`en.json` / `th.json`) match the "dictionary JSON files" requirement and enable a mechanical key-parity test.

### 5.4 CSS: Tailwind v4 vs v3 vs CSS Modules vs styled-components — **chosen: Tailwind CSS v4 (`@tailwindcss/vite`)**
- Requirement names Tailwind. v4's CSS-first config (`@theme` in `index.css`, no `tailwind.config.js`) means one less config file and first-class Vite plugin integration (no PostCSS wiring).
- CSS Modules/styled-components add runtime or naming overhead without helping a utility-styled one-page site.

### 5.5 Animation: framer-motion vs CSS-only vs GSAP — **chosen: framer-motion (v12)**
- Requirement names Framer Motion. `whileInView` gives scroll-reveal with stagger declaratively; `MotionConfig reducedMotion="user"` gives an accessibility switch in one line. GSAP is heavier licensing/API for this scope; CSS-only can't easily do staggered in-view reveals with the same control.

### 5.6 Fonts: Google Fonts CDN vs self-hosted @fontsource — **chosen: @fontsource/prompt + @fontsource/sarabun (self-hosted)**
- Thai + Latin coverage required; Prompt (headings) and Sarabun (body) are the canonical Thai/Latin pairing with excellent legibility.
- Self-hosting removes third-party requests (privacy, performance, offline dev), versions fonts with the lockfile, and avoids CDN availability issues. System-font fallback stack guards FOUT.

### 5.7 Contact form backend: real service vs simulated — **chosen: simulated async submit**
- No backend exists in scope; shipping fake network calls to a dead endpoint is worse than an honest simulated success with a clearly marked extension point (Formspree/EmailJS noted in code comments/docs). Keeps the 4 UI states (idle/submitting/success/error) fully demonstrable and testable.

## 6. Tech-Stack Decision Table

| Concern | Chosen | Why (one line) |
|---|---|---|
| Build tool | Vite + `@vitejs/plugin-react` | Fast static SPA builds, zero server assumptions |
| UI library | React 19 + TypeScript (strict) | Required by spec; TS strict catches i18n/data typos at compile time |
| Styling | Tailwind CSS v4 via `@tailwindcss/vite` | Required; CSS-first `@theme` config, no extra config file |
| Animation | framer-motion v12 | Required; `whileInView` reveals + `MotionConfig` reduced-motion |
| i18n | i18next + react-i18next + i18next-browser-languagedetector | Required; detection localStorage→navigator, fallback `en` |
| Fonts | @fontsource/prompt + @fontsource/sarabun | Thai+Latin coverage, self-hosted, lockfile-versioned |
| Testing | Vitest + jsdom + Testing Library (react/jest-dom/user-event) | Vite-native runner; user-centric assertions; i18n parity test |
| Lint/types | ESLint 9 flat config (typescript-eslint, react-hooks, react-refresh) + `tsc --noEmit` | Zero-warning gate before every commit |
| Images | Local SVG placeholders in `public/images/` | Swap-by-filename, no code edits, no binary bloat in git |
| Resume | Placeholder `public/resume.pdf` generated by node script | Valid PDF so the download CTA truly works day one |
| Theme | Single dark theme (zinc-950 base, emerald/teal accent, sky gradient touches) | Polished focus; no toggle complexity; glass navbar + ring cards |
| Deploy target | Any static host | Pure static output; no env vars, no secrets |

## 7. Content & Data Shape (preview)

- **Typed data modules** (`src/data/`): projects, certificates, gallery, skills carry ids, image paths, tech tags, links — *never display text*.
- **All display text** lives in `en.json`/`th.json` under namespaced keys (`nav.*`, `hero.*`, `about.*`, `skills.*`, `projects.items.<id>.*`, `certificates.items.<id>.*`, `gallery.*`, `contact.*`, `footer.*`).
- **`src/config/site.ts`**: contact email, GitHub, LinkedIn, resume URL — one place to edit identity facts.

## 8. Open Risks

- Thai spelling of the owner's name is a transliteration guess ("สุรชา หาญทองชัย (พอมแพม)") — must be verified by the owner before launch (flagged in spec Assumptions).
- Social links use placeholder/likely values (GitHub `0pom33pom0`, LinkedIn placeholder) — owner to confirm.
- Certificate issue dates are mock values until the owner supplies real ones.
