# Consistency Analysis — spec ↔ plan ↔ tasks (001-portfolio-website)

Analysis date: 2026-07-17. Artifacts checked: `spec.md` (FR-001…FR-024, NFR-001…006, AC matrix), `plan.md` (tree, deps, flows, test strategy), `tasks.md` (T001…T016), `specs/constitution.md` (Articles I–X), `CLAUDE.md`. Gaps found during this analysis were fixed in the affected files (see §5) and are included in this step's commit.

## 1. FR → Task Coverage Matrix

| FR | Requirement (short) | Implementing task(s) | Verifying test/check (plan §6) |
|---|---|---|---|
| FR-001 | Page structure, landmarks, one h1 | T015 (assembly) | App smoke test |
| FR-002 | All text via i18n keys | T003 (dictionaries), T008–T015 (consumption), T015 (bilingual smoke) | Smoke both languages + parity |
| FR-003 | en/th key parity, no empty values | T003 | `locales.test.ts` |
| FR-004 | Detection: localStorage → navigator → en | T003 (init + config test) | i18n config test (added by G2 fix) |
| FR-005 | Switcher toggles + persists | T008 | `LanguageSwitcher.test.tsx` |
| FR-006 | `<html lang>` sync | T003 (mechanism), T008 (asserted) | Switcher test |
| FR-007 | Sticky glass navbar layout | T008 | Navbar test + manual sticky check (T016) |
| FR-008 | Mobile hamburger behavior | T008 | Navbar test |
| FR-009 | Section ids + scroll-margin | T010, T011, T012, T013, T014 (per-section), T015 (verified) | Smoke (ids) + manual (T016) |
| FR-010 | Hero content + split layout | T009 | Hero assertions + manual responsive (T016) |
| FR-011 | Resume link + valid placeholder PDF | T006 (PDF), T009 (link/download attr) | Hero assertions + generated PDF |
| FR-012 | View Projects → #projects | T009 | Hero assertions |
| FR-013 | Localized About bio | T010 (implementation), T015 (verification) | Smoke bio snippet (added by G4 fix) |
| FR-014 | Exact skill categories/badges | T010 | Skills assertions |
| FR-015 | Projects: 3 cards, tags, details link | T005 (data), T011 | Projects test |
| FR-016 | Certificates scroll-snap carousel + arrows + localized dates | T005 (data), T012 | Certificates test |
| FR-017 | Gallery: 6 items, hover, localized alt | T005 (data), T013 | Gallery assertions + manual hover (T016) |
| FR-018 | Form labels/placeholders | T014 | ContactForm test |
| FR-019 | `validateContact` error keys | T014 (TDD) | `validateContact.test.ts` |
| FR-020 | Localized errors, aria-invalid, role=alert, clearing | T014 | ContactForm test (clearing assertion added by G3 fix) |
| FR-021 | Four form states | T014 | ContactForm test (all four) |
| FR-022 | Direct email + socials from site.ts, noopener | T005 (config), T014 (Contact section) | Contact test |
| FR-023 | Footer © + back-to-top | T015 | Smoke/Footer assertions |
| FR-024 | Image onError fallback + swappable filenames | T006 (assets), T009/T011/T012/T013 (handlers) | ProjectCard error simulation + asset paths |
| (cross-cutting) | Fade-up reveals, reduced-motion suppression | T007 (Reveal), T015 (MotionConfig), T016 (verification) | App test presence + manual emulation |

**Result: every FR (24/24) is implemented by ≥1 task and has a named verification.**

## 2. Task → FR Reverse Check

| Task | Maps to |
|---|---|
| T001 | Enabling: build/lint/type substrate for all FRs (NFR-004); no FR deliverable claims — legitimate infrastructure task |
| T002 | Enabling: verification harness required by every FR's test (NFR-004; constitution II/III) |
| T003 | FR-002, FR-003, FR-004, FR-006 |
| T004 | NFR-002/003 groundwork (fonts, tokens, motion-safe scroll → FR-009/AC-2.5 substrate) |
| T005 | FR-015, FR-016, FR-017 (data), FR-022 (config) |
| T006 | FR-011 (PDF), FR-024 (assets/filenames) |
| T007 | Cross-cutting animation requirement, NFR-001 (reduced motion path) |
| T008 | FR-004 (exercised), FR-005, FR-006, FR-007, FR-008 |
| T009 | FR-010, FR-011, FR-012, FR-024, FR-009 |
| T010 | FR-013, FR-014, FR-009 |
| T011 | FR-015, FR-024, FR-009 |
| T012 | FR-016, FR-024, FR-009 |
| T013 | FR-017, FR-024, FR-009 |
| T014 | FR-018, FR-019, FR-020, FR-021, FR-022, FR-009 |
| T015 | FR-001, FR-002, FR-009, FR-013, FR-023 |
| T016 | NFR-001, NFR-002, NFR-003, AC-9.1, AC-9.2 |

**Result: every task maps to ≥1 FR or to explicitly named NFRs/cross-cutting requirements (T001/T002/T004/T007/T016 are enabling/verification tasks — each names exactly which NFR/constitution article it serves; no orphan tasks).**

## 3. Constitution ↔ Plan/Tasks Contradiction Check

| Article | Check | Verdict |
|---|---|---|
| I Layering / no hardcoded text | Plan tree separates data/config/i18n/lib/components; T005 forbids display text in data; T006 clarifies SVG-internal artwork text is image content, not UI text | Consistent |
| II TDD for logic | Parity (T003), validateContact (T014), language switching (T008) all explicitly test-first | Consistent |
| III Zero warnings + gate | Every task carries the QC gate; T001 pre-harness exception now stated explicitly (see G1) | Consistent after fix |
| IV Null-safety/defensive | Plan: guarded `#root`, onError on all imgs (FR-024 tasks) | Consistent |
| V Atomic commits + trailer | tasks.md preamble mandates both | Consistent |
| VI Explicit UI states | Spec FR-021 + plan §5 name the two concrete surfaces (form states, image fallback) since no remote data exists | Consistent |
| VII Accessibility floor | NFR-001 mirrors the article; T008/T012/T014 implement, T016 audits | Consistent |
| VIII i18n integrity | Parity test (T003); `a11y.*` keys localized; html-lang sync (T003/T008). Orphan-key rule is enforced by review discipline, not by an automated test — the article states the rule, no artifact claims a test exists; acceptable, noted for Phase 2 reviewers | Consistent (observation O1) |
| IX Mobile-first 320px | NFR-002, AC-9.2, T016 sweep | Consistent |
| X Performance/no extra deps | Plan §2 fixed dep list + contingency is version pinning only (no new deps) | Consistent |

## 4. Spec ↔ Plan Spot Checks

- Data entities (spec §6) ↔ `src/data/types.ts` contents (plan tree): field-for-field match, including `ContactErrorKey` union and `FormStatus`.
- Error-state matrix (spec §5) ↔ plan §5 mechanisms: five error keys, sentinel-driven error path, onError fallback, fallbackLng — all present in both.
- Versions: plan §2 equals research §8 table (spot-checked react 19.2.7, vite 8.1.5, i18next 26.3.6, vitest 4.1.10, typescript 7.0.2 + identical contingency wording).
- Placeholder filenames: spec Assumption 13 list = plan tree `public/images/` list = T006 file list (13 SVGs + favicon + resume).
- i18n key convention (plan §4) matches every key cited in spec §5/§6 and tasks (e.g. `contact.form.errors.emailInvalid`, `projects.items.<id>.title`).

## 5. Gaps Found & Fixes Applied

| # | Gap | Severity | Fix applied |
|---|---|---|---|
| G1 | tasks.md preamble required `npm test` in the QC gate for **every** task, but at T001 no test harness exists — `vitest run` with zero test files fails, making T001's gate unsatisfiable (contradiction with constitution III "gates green before every commit") | Medium | tasks.md preamble amended: T001's gate is lint+typecheck+build; full gate applies from T002 onward |
| G2 | Spec FR-004 lists "Unit/component test with mocked storage/navigator" as verification, but no task contained any detection-behavior test (AC-1.1/1.2/1.4 uncovered) | Medium | T003 RED step now includes an i18n config test asserting fallbackLng/supportedLngs/detection order + caching, with manual re-verification noted for T016 |
| G3 | Spec FR-020 requires "errors clear when the field becomes valid on next submit", but T014's test list never asserted clearing | Low | T014 ContactForm RED list now includes the corrected-resubmit clearing assertion (alert gone, aria-invalid removed) |
| G4 | Spec FR-013's named verification is the bilingual smoke test, but T015's smoke steps asserted only headings/ids — the bio was never verified anywhere | Low | T015 smoke steps + Covers line now include an About bio snippet assertion in both languages |
| G5 | CLAUDE.md described the build script as "tsc -b/--noEmit check" while T001 defines `tsc --noEmit && vite build` — ambiguous guidance for Phase 2 | Cosmetic | CLAUDE.md command comment aligned to `tsc --noEmit && vite build` |

Observations (no action required):
- **O1** — Constitution VIII's orphan-key rule relies on review, not automation; if orphan drift appears in Phase 2, add a key-usage scan test then.
- **O2** — TypeScript 7 / ESLint 10 peer-compatibility contingency is documented identically in research §8 and plan §2; T001 explicitly instructs recording any pin in the commit message. Phase 2 must apply it at `npm install` time if needed.

## 6. Conclusion

After the five fixes above, spec, plan, tasks, constitution, and CLAUDE.md are mutually consistent: 24/24 FRs covered by tasks with named verifications, 16/16 tasks traceable to FRs/NFRs, no constitution contradictions, no `[NEEDS CLARIFICATION]` markers anywhere. Phase 1 artifacts are ready for Phase 2 implementation starting at T001.
