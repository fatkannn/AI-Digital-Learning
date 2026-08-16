# CLAUDE-WORK-STATE.md

Persistent development state for **ai-digital-learning-dashboard.jsx**.
Written 2026-08-14 from direct inspection + executed tests of the source file.
Source of truth order: **code > this file > conversation**. If they disagree, the code wins.

> **READ THIS FIRST — 2026-08-16.** Everything below this notice, down through §52 (M17.9,
> Days 21–24), describes a curriculum that **no longer exists in the code**: the old
> 28-day / 9-phase / `DOMAINS`+`CURRICULUM` structure. Sometime between §52 being written
> (file mtime 2026-08-14 21:30) and 2026-08-15 22:27, `ai-digital-learning-dashboard.jsx` was
> **fully rewritten** to the V2 architecture (4 phases, 25 modules, micro-learnings) with
> **no corresponding entry in this file** — §§0–52 contain zero mentions of "M18", "M19", or
> "V2". Sections §§1–14 (project identity, architecture, curriculum table, progression logic,
> assessment system, knowledge-progress math, persisted-state shape, views, implementation
> status, known defects, technical decisions, future work, checkpoint) are **describing a file
> that has since been replaced** and must not be trusted for the current codebase.
>
> **Current state lives in §53 onward.** Read §53 (V2 Reconciliation), §54 (Verification Run),
> and **§55 (Owner Decisions — Closed, 2026-08-16)** for what is actually true of the code and
> the project's approved direction today.
>
> **§§0–52 are now formally ARCHIVED / HISTORICAL, per explicit owner decision recorded in §55.**
> The old 28-day curriculum they document is not part of the current V2 application, is not to
> be reintroduced, and is kept here only as a historical record (useful if it is ever
> resurrected as a separate track — see §53 "Old curriculum disposition" and §55 item 3). Do not
> cite §§0–52 as describing current application behavior.

---

> **§§0–52: ARCHIVED / HISTORICAL (owner-confirmed 2026-08-16 — see §55).** Everything from here
> through §52 describes the pre-V2, 28-day/9-phase application. It is retained as a historical
> record only. It is not current, must not be treated as describing today's application, and
> must not be reintroduced into `APPLICATION/ai-digital-learning-dashboard.jsx`.

## 0. IMPORTANT DISCREPANCY FOUND THIS SESSION

The project file named `CLAUDE-WORK-STATE.md` in project knowledge **was not a state file**.
It contained the *prompt* asking for one to be created. Consequences:

- No checkpoint existed before this document. Any earlier "resume" was resuming from nothing.
- The build prompt also references `CLAUDE.md`, `FEATURE-PARITY-MATRIX.md`, `TECHNOLOGY-EVALUATION.md`, `RISK-REGISTER.md`, `AUDIT-v65.md`, and MIGRATION docs. **None of these exist** in the project. Do not cite them as sources until they are actually written.
- The version marker "v65" appears in the referenced audit filename but **nowhere in the code**. The only version markers in the code are `EMPTY_STATE.version = 1` and `STORAGE_KEY = "ai-learning-os-v1"`. Treat "v65" as unverified.

---

## 1. PROJECT IDENTITY

| Field | Value |
|---|---|
| Name | AI & Digital Learning (sidebar title); file `ai-digital-learning-dashboard.jsx` |
| Type | Single-file React artifact, default export `LearningDashboard` |
| Size | 2,571 lines, ~203 KB, one file, no build config, no tests |
| Purpose | Self-paced 1-hour-per-day study system: sequenced curriculum + post-tests + derived progress + streak/history |
| Target user | The project owner — one learner, one device, no accounts |
| Content language | Lesson/UI copy in English; resource study summaries (`resources[].id`) and the per-day recap (`recap`) in Indonesian. Owner decision 2026-08-14: targeted Indonesian layer, **not** full translation (§17.4) |
| Dependencies | `react` (useState/useEffect/useMemo/useCallback), `lucide-react` icons, Tailwind utility classes only |
| Persistence | Artifact `window.storage` key-value API, key `ai-learning-os-v1` |

---

## 2. ARCHITECTURE (as actually written)

The file is explicitly commented into three layers and the separation holds:

**Layer 1 — Content** (lines ~15–1275)
`DOMAINS` (3 domains → 30 subcategories, each with a `target`) → `SUB_INDEX` (flat lookup, built at module load) → `PHASES` (5) → `CONFIG` → curriculum in five arrays `CUR_A..CUR_E` (4 days each) concatenated into `CURRICULUM`.

**Layer 2 — Logic** (lines ~1283–1463)
Pure functions only, no React: date helpers (`dstr`, `diffDays`, `shiftDate`, `prettyDate`), `EMPTY_STATE`, lookups (`dayByNumber`, `daysForSub`, `phaseOf`, `totalMinutes`), status (`lessonDone`, `testDone`, `dayCompleted`, `dayStatus`, `activeDayNumber`), history (`completionDate`, `completionDates`, `streakStats`, `minutesByDate`), progress (`dayCredit`, `knowledgeProgress`, `conceptStats`, `reviewItems`), grading (`gradeQuestion`, `gradeTest`).

**Layer 3 — UI** (lines ~1470–2571)
Primitives (`Eyebrow`, `Bar`, `Pill`, `Button`, `Card`, `HourRibbon`, `StatTile`, `ResourceCard`) → 7 views → `buildDemoState()` → `NAV` → `LearningDashboard` shell.

**State ownership:** all state lives in the single root component. Views are presentational; they receive `state`, `derived`, and callbacks. Only three mutators exist: `toggleSegment`, `completeLesson`, `submitTest` (plus reset and demo-load inline in the sidebar). `derived` is a `useMemo` over `state` containing `{ streak, progress, review, active }`.

**Key design decision (verified):** progress percentages are **never stored**. They are recomputed from `lessons` + `tests` on every render. Storage holds only raw events.

---

## 3. CURRICULUM (verified by execution, not by reading)

20 days, unique numbering 1–20, all mapped to a valid subcategory and phase. Every day: exactly 5 segments totalling exactly 60 minutes, 5 objectives-block fields present (`objectives`, `segments`, `example`, `practice`, `challenge`), 2 resources, 5–6 quiz questions.

| Phase | Days | Days written |
|---|---|---|
| P1 Digital Foundations | 1–8 | Computers, OS, Files/Data/Storage, Internet, Client–Server, Web, APIs, Databases |
| P2 Programming Foundations | 9–11 | Logic/variables/control flow, Functions/data structures/JSON, Git & GitHub |
| P3 AI Foundations | 12–15 | What AI is, ML, Deep learning, Generative AI |
| P4 LLM Foundations | 16–18 | Tokens & context window, Prompting/system instructions/structured output, Embeddings & vector search |
| P5 AI Application Building Blocks | 19–20 | RAG, Tool calling & AI agents |
| P6 Trust: Evaluation and Security | 21–22 | Evaluating AI systems, AI security (injection, data, keys) |
| P7 Applied AI for Learning | 23–24 | AI in instructional design, AI + LMS and learning data |
| P8 Infrastructure and Security | 25–26 | Cloud computing, cybersecurity fundamentals |
| P9 Automation and Integration | 27–28 | Workflow automation and n8n, MCP |

Segment titles are fixed across all days: Concept introduction (10m) → Core material (20m) → Hands-on (15m) → Practice (10m) → Reflection (5m).

Since M7 every day also carries `recap: { inti, salahPaham, istilah[{ en, id }] }` — an Indonesian comprehension check rendered after the segments, never before them. It is a check, not a translation: prose is capped at 180 words and every glossary term must occur in that day's own English content.

Totals after M10: **28 days, 169 quiz questions, 58 resources** (51 flagged `verified: true`, 7 false). Verified counts are produced by `verify.mjs` on every run — read them there rather than from this line.

**What `verified: true` means as of M10:** the URL was opened and read in a session that had working network egress. Labels set before M8 did not meet that bar; M10 audited them and one was downgraded. Seven entries are `false`, each carrying its reason in its own Indonesian summary.

**Coverage gap (updated M9):** 24 of 30 subcategories have days written. **6 have none**: local-ai, app-dev, analytics, multimedia, vr, auto-projects. M8 closed eval/ai-security/elearning/lms; M9 closed cloud/security/automation/mcp. The Digital domain is now complete at the roadmap level for the first time since Day 8. Applied AI remains the weakest domain at 14%, with 4 of its 7 subcategories still unwritten. See §6.

---

## 4. PROGRESSION LOGIC (implemented)

- `lessonDone` = `lessons[n].completedAt` exists.
- `testDone` = `tests[n].attempts.length > 0`. **Submitting is enough; passing is not required.**
- `dayCompleted` = lessonDone AND testDone.
- `dayStatus(n)`: `locked` if `n > 1 && !dayCompleted(n-1)`; else `completed`; else `in-progress` if `completedAt` or any checked segment; else `not-started`.
- `activeDayNumber` = first day in curriculum order that is not completed; if all done, returns the **last day (20)**.
- Unlocking is strictly sequential by day number. There is no prerequisite graph.

---

## 5. ASSESSMENT SYSTEM (implemented)

Four question types: `mc` (single correct index), `sc` (scenario, same mechanics as mc), `tf` (boolean), `sa` (short answer, keyword matching with `{ keywords, need, model }`).

- `gradeQuestion`: blank/undefined → false; `sa` passes when `need` keywords appear as substrings of the lowercased answer.
- `gradeTest` → `{ date, correct, total, pct, passed, detail[] }`, `detail[i] = { index, concept, correct, given }`.
- Attempts **append**; nothing is overwritten. `bestPct` = max across attempts.
- Pass threshold 70 (`CONFIG.passThreshold`) — affects labels and mastery only, never unlocking.
- Post-test button is gated on `lessonDone`; submit button is enabled once **≥1** question is answered.
- Answer review after submit shows correct/model answer, explanation, and concept tag per question.
- Concept accuracy (`conceptStats`) is aggregated across **all attempts of all days**, so a bad first attempt keeps dragging the average even after a perfect retake. This is current behaviour, not necessarily intended.

---

## 6. KNOWLEDGE PROGRESS (implemented, but structurally capped)

`dayCredit(n)` = 0.35 if lesson done + 0.65 × (bestPct/100).
Subcategory `pct` = min(100, round(earned / max(sub.target, days.length) × 100)).
Domain `pct` = unweighted mean of its subcategory percentages.
Overall = unweighted mean of the three domain percentages.

Mastery labels come from **average test score**, not from `pct`: ≥90 Strong mastery, ≥80 Good understanding, ≥70 Basic mastery, <70 Needs review, no score → "Not started".

**Verified by simulation — finishing all 20 days with 100% on every post-test yields:**

| Metric | Result |
|---|---|
| Overall knowledge | **41%** (28% before M8, 35% after M8) |
| Digital domain | 63% (was 52%; cloud and security closed in M9) |
| AI domain | 45% |
| Applied AI domain | **14%** (was 0% before M8; unchanged by M9) |
| Subcategories at 100% | only `computer` (3 days vs target 3) |

Cause: `target` comes from the full roadmap in `DOMAINS`, but only 20 days exist. 14 subs have zero days and permanently score 0; 14 more have fewer days than their target (e.g. `llm` 1 day vs target 3 → caps at 33%).

`ProgressView` does disclose "no lessons written yet" per empty subcategory, and copy says progress "climbs gradually". The **headline number is still misleading**: a learner who completes everything that exists sees 28% with no indication that 100% is unreachable. This is a measurement-design decision to confirm, not a bug to fix unilaterally.

---

## 7. STREAK AND HISTORY (implemented)

- Completion date of a day = `max(lessons[n].completedAt, tests[n].attempts[0].date)` — first attempt, string-compared (safe for ISO `YYYY-MM-DD`).
- `streakStats` → `{ current, longest, total, todayDone }`. `current` counts back through consecutive dates and is preserved when the last completion was **yesterday** (one grace day); it drops to 0 at a gap ≥2 days. Verified: last completion today → 3; yesterday → 3; 4 days ago → 0.
- Minutes come only from **checked segments** (`minutesByDate`), dated when checked. `completeLesson` auto-checks any unchecked segment with today's date, so minutes can land on the completion date rather than when studied.
- `HistoryView`: 12-week grid (84 cells) with states completed / partial / missed / today / before-start / future, plus a reverse-chronological list of completed days with best score and attempt count.

---

## 8. PERSISTED STATE SHAPE (verified)

```js
{
  version: 1,
  startDate: "YYYY-MM-DD",
  lessons: { [dayNumber]: { completedAt: "YYYY-MM-DD" | null,
                            segments: { [segmentIndex]: "YYYY-MM-DD" } } },
  tests:   { [dayNumber]: { attempts: [ { date, correct, total, pct, passed,
                                          detail: [ { index, concept, correct, given } ] } ] } }
}
```

Load (patched 2026-08-14): read raw value → `JSON.parse` → reject if not an object or `version !== STATE_VERSION` → `normalizeState()` → set state. Unreadable or newer-version records are copied verbatim to `ai-learning-os-backup-<YYYY-MM-DD>` and saving is **blocked**; they are never overwritten.
Save: effect on `[state, loaded, persist]` writes the whole object on every change, and only while `persist === "on"`.
`persist` is now a 4-state flag: `checking` / `on` / `off` / `blocked`. `loadIssue` carries `{ kind: "unreadable" | "newer" | "unknown" | "repaired", backup, version?, dropped? }` and drives a banner above the active view.

---

## 9. VIEWS

| View | Reads | Writes | Notes |
|---|---|---|---|
| Dashboard | streak, progress, review, active day, today's minutes | — | 5 stat tiles, today's card with segment ribbon (read-only here), two-step checklist, domain bars, review preview |
| Learning path | dayStatus, bestPct per day | — | Grouped by phase; locked days disabled |
| Progress | knowledgeProgress | — | Overall + per-domain + per-sub bars, mastery labels |
| Resources | dayStatus (lock filter) | local search/filter state | 40 resources, Indonesian summary panel, `verified` flag surfaced |
| Review | reviewItems, weak subs | — | Deep-links to lesson and retake |
| History | completionDates, minutesByDate, streak | — | 12-week grid + completed-day list |
| Lesson | lesson segments, lessonDone, testDone | `toggleSegment`, `completeLesson` | Full lesson body, example, practice, challenge, resources |
| Post-test | day.quiz | `submitTest` (append attempt) | Local answers state; in-view retake resets local answers only |

Shell: sidebar nav (6 items, review badge), mobile drawer + sticky header with streak, footer disclosure about derived numbers and keyword grading, "Load demo history" (only when `total === 0`) and two-click "Reset progress".

---

## 10. IMPLEMENTATION STATUS

| Feature | Status | Evidence |
|---|---|---|
| Curriculum data 20 days | VERIFIED | Executed integrity script: 20 unique days, 0 schema issues, 60 min each |
| Quiz data integrity | VERIFIED | All answer indices in range, all `sa` shapes valid, all explanations present |
| Grading (4 types) | VERIFIED | Executed: blank → false, `sa` keyword threshold works, empty submission = 0% |
| Sequential unlocking | VERIFIED | Executed `dayStatus` for empty / lesson-only / test-only states |
| Day completion rule | VERIFIED | Lesson-only → in-progress; test-only → not-started; both → completed |
| Streak calculation | VERIFIED | Executed today / yesterday / 4-days-ago cases |
| Knowledge progress math | VERIFIED | Roadmap figure unchanged at 28%; new written-curriculum figure = 100% at full completion, 50% at 10/20 days |
| Dual-denominator reporting (L-3a) | VERIFIED | Executed: `written` 0% empty / 50% half / 100% full; `pctWritten` null for unwritten subs, 100% for `llm` while roadmap `pct` stays 33% |
| Review flagging (recency-based) | VERIFIED | Executed: bad attempt flags, perfect retake clears, partial retake moves the number, single-question concepts flaggable, perfect learner has zero flags |
| Mastery labels | VERIFIED | Executed all four states including the new lesson-done-not-tested case |
| Minutes tracking | IMPLEMENTED — NOT VERIFIED | Logic executed in isolation; not verified against real UI clicking |
| Persistence load (patched) | VERIFIED (harness) | Real load-effect body extracted from the file and executed against 8 stubbed-storage scenarios — all passed. Not yet verified in the artifact host |
| Persistence save | IMPLEMENTED — NOT VERIFIED | Guarded by `persist === "on"`; actual `window.storage.set` round-trip still needs a render + reload by the owner |
| State normalizer (L-6) | VERIFIED | Executed: unknown days, bad dates, out-of-range segments, `attempts: null`, malformed attempts all dropped; idempotent; no derived function throws on the repaired state |
| Reset / demo history | IMPLEMENTED — NOT VERIFIED | Code path clear; not run |
| Responsive layout | IMPLEMENTED — NOT VERIFIED | Tailwind `lg:` breakpoints present; not rendered/measured |
| JSX syntax (whole file) | VERIFIED | tsc 6.0.3 `--noEmit --allowJs --jsx react`: 0 diagnostics, validated against 4 injected-error controls (unclosed tag 1, brace imbalance 1, unterminated string 28, mismatched closing tag 1) |
| Component/icon resolution | VERIFIED | 43 capitalised JSX references all resolve to an import or a local definition; no unused icon imports |
| React hook order | VERIFIED | All 14 hooks precede any component-body return; the returns found are inside effect and callback bodies |
| Accessibility — contrast | VERIFIED | WCAG ratios computed for every text/background pair actually used. `text-slate-400` at 2.56:1 fixed; all body text now ≥4.5:1, dark-card text ≥6.9:1 |
| Accessibility — control names/states | IMPLEMENTED — NOT VERIFIED | Names and states added to every unlabelled control; correct in markup, but no screen reader was run |
| Accessibility — headings, focus trap | NOT STARTED | 10 card titles are still `<p>`; drawer has Escape but no focus trap (see L-11) |
| End-of-curriculum state | NOT STARTED | After Day 20, dashboard keeps showing Day 20 as "today" |
| Backend / auth / sync | NOT STARTED | Single file, no network calls anywhere |
| Automated tests | VERIFIED | `verify.mjs` ships with the project: 4,568 assertions over Layers 1–2, no dependencies, `node verify.mjs <file>`. Mutation-tested against 8 broken builds — see the change log |
| Short-answer grading (L-10) | VERIFIED | Bilingual idea groups; language parity, junk rejection, single-idea rejection and cross-group stem overlap all asserted in `verify.mjs` |
| Resource URL back-verification (M10) | PARTIAL — 5 of 9 checked | CS50x and Postman confirmed (Postman's canonical URL had moved); Coursera confirmed; Anthropic tool-use URL migrated to platform.claude.com; **CS50T found to be officially retired since 30 June 2024**. One pre-network `verified: true` was found unearned and downgraded. 4 legacy URLs remain unchecked |
| Curriculum Days 25–28 (M9) | VERIFIED (content) — RENDER NOT VERIFIED | 4 days: cloud, security, automation, mcp. 6,586 assertions pass; 8 new resources, 6 opened and confirmed this session. One search-result URL was found dead (404) and discarded before use |
| Curriculum Days 21–24 (M8) | VERIFIED (content) — RENDER NOT VERIFIED | 4 days: eval, ai-security, elearning, lms. All 5,853 assertions pass including recap term-anchoring; 60 min each; 8 new resources, 7 of them opened and confirmed this session |
| Resource URL verification (M8) | VERIFIED for the 7 fetched | First session with working network egress. 7 of 8 new URLs opened and read before being marked `verified: true`; the 8th is `false` with the reason written into its Indonesian summary. Pre-existing `verified: false` entries were NOT revisited |
| Indonesian recap layer (M7) | VERIFIED (content) — RENDER NOT VERIFIED | 20 blocks, 79 glossary terms. `verify.mjs` asserts presence, shape, word caps, duplicate terms, self-glossing, and that every term occurs in the day's own English content. Mutation-tested against 5 broken builds. Whether the Indonesian *reads well* is a human judgement no assertion covers |
| Bilingual answer disclosure | IMPLEMENTED — NOT VERIFIED | Post-test intro, textarea placeholder and footer now state that Indonesian answers are graded the same. Markup correct; not seen rendered |
| Streak future-date guard (L-7) | VERIFIED | Covered by `verify.mjs`; the pre-fix build fails exactly 4 of its assertions |

---

## 11. KNOWN DEFECTS AND LIMITATIONS

**L-11 — Accessibility, partly fixed 2026-08-14 (M6).** §10 had carried "Accessibility: NOT STARTED" since the first audit. Measured, then fixed:

*Contrast (fixed, verified by computation).* `text-slate-400` on white is **2.56:1** — a clear WCAG AA failure for body text — and it was used at 12 sites including the `Eyebrow` section label on every view, the question-type labels in the post-test, the concept tags, and the entire footer disclosure. The least readable text in the app was the text explaining how progress and grading actually work. Now `slate-500` (4.76:1 on white, 4.55:1 on slate-50). One `slate-400` site sits on a slate-900 card where it was already 6.96:1, so it moved to `slate-300` (12:1) rather than being darkened; `Eyebrow` gained a `tone="dark"` prop instead of relying on Tailwind class ordering, which does not reliably resolve two competing colour utilities in one class string. Small text in `orange-600` (3.56:1), `amber-600` (3.19:1) and `emerald-600` (3.77:1) moved one shade darker, all now ≥5:1; icon uses only improved.

*Names and states (implemented, not screen-reader verified).* True/false answers were plain buttons carrying their selected state in colour alone — now `aria-pressed`. Multiple-choice and scenario options are wrapped in `role="radiogroup"` and true/false in `role="group"`, both `aria-labelledby` the question text, which previously had no programmatic association with its controls. The short-answer `textarea` had only a placeholder — placeholders are not labels — and now points at the same question id. The resource search field had no accessible name at all. The `HourRibbon` segment buttons had only a `title` attribute and no state; they now carry an `aria-label` naming the segment and its minutes, plus `aria-pressed`.

*Announcements.* The post-test score appeared silently; the result card is now `role="status" aria-live="polite"`. The persistence banner is `role="alert"`, the future-date notice `role="status"`.

*Mobile drawer.* Was dismissable only by tapping the backdrop — unreachable by keyboard. Now closes on Escape, and carries `role="dialog"`, `aria-modal`, an accessible name, and `aria-expanded`/`aria-controls` on the toggle. **A focus trap is not implemented**, so keyboard focus can still leave the open drawer.

*Still open:* 10 card titles are `<p className="font-semibold">` rather than headings, so screen-reader heading navigation skips them. Not fixed because artifacts render without Tailwind Preflight, so switching to `<h2>`/`<h3>` risks inheriting browser default sizing and changing the visual design — a change that needs to be seen rendered before it is made. Lucide icons are not marked `aria-hidden`. No screen reader, keyboard walkthrough, or zoom/reflow test has been performed; none of those is possible here.


**L-10 — FIXED 2026-08-14 (was HIGH, and was live).** Short-answer grading counted matches from a flat keyword list, which caused two independent failures. First, language: 0 of 20 realistic Indonesian answers were accepted, because the lists were English. Second, validity: several keywords in a list expressed the *same* idea, so restating one idea three ways ("RAM is temporary, volatile, data is lost") satisfied a `need: 2` threshold while demonstrating a single concept. The answer shape is now `{ groups: [[synonym, ...], ...], need }` where each group is one idea and matching several synonyms inside a group counts once; synonyms carry both English and Indonesian stems. `gradeQuestion` still accepts the legacy flat shape, so any content authored later against the old schema keeps working. All 20 questions were rewritten. Measured on identical metrics, old versus new: Indonesian answers accepted 0/20 → 20/20; off-topic English answers accepted 3.2% → 1.8%; single-idea probes accepted by 3 questions → 0; junk answers 0 of 180 in both. Every day's own English model answer still scores 100%.


Ranked. L-1 and L-2 are defects; the rest are limitations or design questions.

**L-1 — FIXED 2026-08-14 (was HIGH).** Was: a `JSON.parse` failure or `version !== 1` left state empty with `persist = "on"`, and the save effect then overwrote the stored record. Reproduced against the original code before patching: a corrupt record was replaced with empty state, and a `version: 2` record holding one completed day came back with 0 lessons and `version: 1`. Now: unreadable and newer-version records are backed up verbatim and saving is blocked until the learner explicitly chooses "Start fresh and overwrite". Still open: there is no *migration* for a future `version: 2` — quarantine is not conversion. Write the migration before ever bumping `STATE_VERSION`.

**L-2 — FIXED 2026-08-14.** LessonView now prints `day.quiz.length`.

**L-3 — ADDRESSED 2026-08-14 (option a).** Roadmap math untouched. `knowledgeProgress` now also returns `written` (credit ÷ days that exist) and per-sub `pctWritten`. Dashboard tile leads with "Curriculum written so far" and carries "Full roadmap X%" underneath; Progress view shows both with an explicit note that the roadmap figure cannot reach 100% until the remaining days are written. The underlying gap — 14 subcategories with no lessons — is unchanged and is now a content task, not a reporting problem.

**L-4 — FIXED 2026-08-14.** A subcategory with credit earned but no post-test score now reads "Lesson done, not tested" instead of "Not started"; genuinely untouched subcategories still read "Not started". Verified that the "Needs review" string ReviewView filters on is unaffected.

**L-5 — FIXED 2026-08-14.** `conceptStats` now reads only the most recent attempt of each day. Verified: a perfect retake clears the flag (it previously could not), a partial retake moves the number instead of clearing it, and `bestPct` still keeps best-of so retaking cannot cost progress credit. The asymmetry is now deliberate and documented in code: credit rewards the mastery reached, review reflects where the learner stands now. Side effect measured: single-question concepts became flaggable — 26 of 67 concept/day pairs carry one question and were previously unreachable by the flagging rule — so `reviewMinAttempts` was renamed `reviewMinQuestions` and set to 1, since the attempt-inflation the old guard of 2 existed to damp no longer exists.

**L-6 — FIXED 2026-08-14.** `normalizeState()` coerces every loaded record into the expected shape, drops what it cannot use, and reports the drops to the learner via the banner. Note: it guards the *load* path only. Anything that mutates state at runtime is still trusted.

**L-7 — FIXED 2026-08-14.** `streakStats` now separates future-dated completions from streak maths (`gap >= 0 && gap <= 1`, and future dates filtered out before the run is counted). Such days still count in the total — they *were* completed — and History shows an amber notice explaining why they do not extend the streak. Still open by design: `dstr()` uses the local timezone, so crossing timezones can still shift which date a completion lands on. Fixing that needs timestamps in state, which is a state-version change and not worth it for a single-device app.

**L-8 — Product limitations (by design, not bugs).** Local single-device storage only; static curriculum in-file; no backend, auth, multi-user, cloud sync, real AI API integration, or database. Short-answer grading is keyword matching — disclosed in the footer, and correctly so. Since M5 it matches *idea groups* rather than a flat keyword list, which removed the two worst symptoms (see L-10), but it remains keyword matching: a sufficiently keyword-rich off-topic answer can still pass, measured at 1.8% of off-topic pairs.

**L-9 — Single 203 KB file.** Editing risk is concentrated: every content change touches the same file as the logic. No modules, no code splitting, no tests to catch regressions.

---

## 12. TECHNICAL DECISIONS ALREADY MADE (do not reverse without cause)

1. **Derived progress, raw-event storage.** Reason: one source of truth, no drift, curriculum can grow without migrating stored percentages. Status: working. Future: unchanged even with a backend — move the events, keep the derivation.
2. **Three-layer single file.** Reason: artifact constraint. Status: working but at its size limit (L-9). Future: split content out first if this becomes a real app.
3. **`window.storage`, not localStorage.** Reason: localStorage is unavailable in this artifact host. Status: correct choice, unverified at runtime.
4. **Day completion = lesson + submitted test, not a passing score.** Reason: keeps the learner moving, routes weakness to Review instead of blocking. Status: working and clearly explained in UI copy.
5. **Best-of scoring for progress.** Reason: rewards retaking. Status: working, but inconsistent with L-5.
6. **Sequential day locking by number.** Reason: enforces prerequisite order cheaply. Status: working; no ability to skip a topic already known.

---

## 13. FUTURE DEVELOPMENT

**Immediate (defects):** ~~L-1, L-2, L-3, L-4, L-5, L-6~~ all done 2026-08-14. Remaining defect work: L-7 (streak accepts a future-dated record). Everything else immediate is now blocked on the owner's single render/verify session — persistence round-trip, the three resource URLs, and the language decision in §17.4.

**Medium-term:** end-of-curriculum state after Day 20; recency-weighted or best-attempt concept accuracy (L-5); mastery label covering lesson-only progress (L-4); export/import progress as JSON (mitigates single-device risk without a backend); write Days 21+ for the empty subcategories, starting with the Applied AI domain since it is the stated career target.

**Long-term:** split the file; extract curriculum to data files; extend `verify.mjs` coverage to Layer 3 (would need a DOM/React test runner, i.e. real dependencies); only then consider backend, auth, sync, or live AI features.

---

## 14. CURRENT CHECKPOINT

```
CURRENT MILESTONE:            M17.9 (Batch 6, Days 21-24) — Current Curriculum Enhancement:
                              COMPLETE. 4 KEEP, zero enhancements — every day already accurate,
                              clearly scoped, and directly assessed; one targeted external check
                              opened for Day 22 (see below), resolved with no gap. M17.8 (Batch
                              5, Days 17-20, §51) remains COMPLETE: 4 KEEP, zero enhancements.
                              M17.7 (Batch 4, Days 13-16, §50) remains COMPLETE: 3 KEEP, 1
                              ENHANCE (Day 16, P2, implemented autonomously — "context rot"
                              terminology added).
                              **Milestone-numbering note:** the owner's autonomous-M17
                              instruction used the illustrative filename pattern
                              "M17.3-DAYS-09-12", but M17.3 and M17.5 were already assigned
                              (Day 1 browser review; Days 5-8 sign-off, both owner-attested per
                              that same instruction — see below). Days 9-12 are therefore
                              labeled **M17.6**, and this numbering continues for subsequent
                              batches: M17.7 = Days 13-16, M17.8 = Days 17-20, M17.9 = Days
                              21-24, M17.10 = Days 25-28. M17.2 (Day 1 NPU enhancement,
                              implemented, §47), M17.1 (Days 1-4 audit, §46), M17.4 (Days 5-8
                              audit, §48), M17.6 (Days 9-12 audit, §49), M17.7 (Days 13-16
                              audit + Day 16 enhancement, §50), M17.8 (Days 17-20 audit, §51),
                              M16 CLOSED (§45), M15 resource verification (§39-§42), and
                              M14/M14.1 (post-test pass requirement) remain COMPLETE and
                              unaffected. See §35-§52.
CURRENT TASK:                 None open. Owner decision: post-test >= CONFIG.passThreshold
                              (70%) is required for a day to complete — matches the "Pass
                              mark 70%" copy that had been on screen since before M13.
                              dayCompleted(n) = lessonDone(n) && testPassed(n); testPassed(n)
                              = bestPct(n) >= 70. M14 implemented and automated-verified this
                              at the source-file layer (verify.mjs, tsc). M14.1 found and
                              fixed a SEPARATE problem: QA/qa-build.html, the standalone
                              browser artifact, was a stale pre-M14 bundle that still gated
                              progression on testDone (attempt exists) instead of testPassed,
                              which is how a 17% score could reach Day 2 in the owner's
                              browser even though the source file was already correct. Fixed
                              by rebuilding the artifact from source (QA/build.mjs, esbuild);
                              the application source itself was never wrong and was not
                              touched in M14.1.
CURRENT IMPLEMENTATION STATUS: 28 days, 169 questions (**unchanged** — no post-test question
                              added or edited), 58 resources (**56 verified**, unchanged — no
                              new resource entry added for the NPU enhancement, per owner
                              instruction to use the existing M17.1 evidence only). Day 1's
                              content changed for the first time since the M0 baseline: one
                              new sentence pair in the Core material segment, one new sentence
                              in Hands-on, one new sentence in Practice, one word added to the
                              boxed "Profile your own machine" activity's first step, and the
                              Indonesian recap (`inti` + one new `istilah` entry) extended to
                              match — introducing the NPU (Neural Processing Unit) as a fifth
                              hardware category alongside CPU/RAM/storage/GPU. Days 2-4 and
                              Days 5-28 are byte-identical to before M17. verify.mjs
                              **6,701 / 6,701 assertions PASS** (6,696 pre-M17.2 -> +5, all
                              from the one new recap glossary term's five per-term checks —
                              content-driven, not a new test group; confirmed by re-running
                              after adding only that one term). tsc --noEmit --allowJs --jsx
                              react --target es2020: **0 diagnostics**. QA/qa-build.html
                              rebuilt via `node QA/build.mjs` after the Day 1 edit (the
                              freshness check in verify.mjs caught the pre-rebuild staleness
                              exactly as designed, then passed clean after the rebuild). M16
                              produced five files under GEMINI RESEARCH/ANALYSIS/ plus §45's
                              owner sign-off (zero curriculum changes). M17.1 produced four
                              files under GEMINI RESEARCH/M17/ auditing Days 1-4: 3 KEEP, 1
                              ENHANCE (Day 1, P2). M17.2 was the first change to a lesson
                              segment's body text since M2 (Day 17/19 expansion) — see §47 for
                              the full diff record. M17.4 Batch 2 produced four
                              more files under GEMINI RESEARCH/M17/ auditing Days 5-8: **4
                              KEEP** on lesson content (no enhancement found, a materially
                              different outcome from M17.1's one P2 finding), plus 2
                              VERIFY BEFORE CHANGE flags scoped to assessment alignment only
                              (Day 7 objective 3 untested; Day 8 document databases untested),
                              both P3, both explicitly not implemented per instruction. M17.6
                              (Batch 3, this entry) audited Days 9-12 against fresh research and
                              found **4 KEEP, zero enhancements, zero backlog additions** —
                              every day already accurate, clearly scoped, and directly assessed;
                              no external source needed opening (documented explicitly in
                              M17.6-RESEARCH-SOURCES.md rather than left implicit). Nothing was
                              implemented this batch because nothing cleared the enhancement
                              bar — there was no gap to enhance. Two new cumulative files were
                              created and seeded: GEMINI RESEARCH/M17/M17-ASSESSMENT-BACKLOG.md
                              (carrying forward the two existing P3 items from M17.4/§48
                              verbatim) and GEMINI RESEARCH/M17/M17-IMPLEMENTATION-LOG.md
                              (recording M17.2's Day 1 NPU change retroactively as its first
                              entry). No APPLICATION/ or QA/ file was edited in M17.4 or M17.6.
                              M17.7 (Batch 4, this entry) audited Days 13-16: **3 KEEP** (13, 14,
                              15 — all accurate, correctly scoped, fully assessed) and **1
                              ENHANCE at Day 16** — the lesson's existing "position matters"
                              claim about long-context reliability was confirmed accurate and
                              current against one official Anthropic source
                              (platform.claude.com/docs/en/build-with-claude/context-windows,
                              quality A, FACT quoted directly: "a phenomenon known as context
                              rot"), then enhanced by naming that term in the existing sentence —
                              a one-clause addition, cleared all 10 autonomous-implementation
                              conditions at P2, and was actually implemented this session (not
                              deferred), matching the owner's pre-authorization for
                              autonomously-safe P2 changes. No recap glossary term was added this
                              time (unlike M17.2's Day 1 change), so the verify.mjs assertion
                              count did **not** move: still 6,701/6,701 before and after. 28 days
                              / 169 questions / 58 resources / 56 verified all unchanged. tsc: 0
                              diagnostics, unchanged. QA/qa-build.html rebuilt via
                              `node QA/build.mjs` to reflect the Day 16 change. Both global M17
                              files (assessment backlog, implementation log) were appended to,
                              not re-seeded — see §50 for the full record. M17.8 (Batch 5, this
                              entry) audited Days 17-20: **4 KEEP**, zero enhancements, zero
                              backlog additions, zero external sources opened — every day
                              already accurate, appropriately scoped for its position in the
                              curriculum, and fully assessed (all objectives directly covered
                              by the quiz). Two candidate enhancement angles were explicitly
                              considered and rejected rather than silently skipped: Day 17's
                              structured-output guidance (durable vendor-agnostic principle,
                              not a stale vendor-specific claim) and Day 20's agent-safety
                              controls (architecture-level and vendor-agnostic, unlike Day 16's
                              specific sourceable "context rot" claim). verify.mjs held exactly
                              at 6,701/6,701 before and after (confirms no accidental drift);
                              tsc: 0 diagnostics, unchanged. QA/qa-build.html was correctly
                              **not** rebuilt — nothing in APPLICATION/ changed. Neither global
                              M17 file (assessment backlog, implementation log) was appended to
                              this batch, since nothing new was found to add. M17.9 (Batch 6,
                              this entry) audited Days 21-24 (Phases 6-7: eval, ai-security,
                              elearning, lms): **4 KEEP, zero enhancements, zero backlog
                              additions.** One targeted check was opened for Day 22's claim that
                              prompt injection has ranked #1 "in every" OWASP LLM Top 10 edition:
                              two official OWASP pages (quality A) confirmed the claim for the
                              2025 edition directly, but the brand-new 2026 edition's (published
                              2026-08-03) specific ranking sat behind a gated download and was
                              not independently reachable — recorded as a transparency note, not
                              a flagged discrepancy, since nothing found contradicts the existing
                              text. No change met the evidence bar. Days 21, 23, and 24 needed no
                              external research at all (documented explicitly why, not left
                              implicit). verify.mjs held exactly at 6,701/6,701 before and after;
                              tsc: 0 diagnostics, unchanged. QA/qa-build.html correctly **not**
                              rebuilt. Neither global M17 file was appended to this batch. See
                              §52 for the full record.
LAST VERIFIED FEATURE:        **Browser verification: PASS — owner-attested.** The owner ran
                              all three required scenarios against the freshly rebuilt
                              QA/qa-build.html and reported PASS on each (full detail in
                              §37): (A) failed post-test (<70%) leaves Day 1 incomplete and
                              Day 2 locked, retake available, no streak credit; (B) a passing
                              retake (>=70%) completes Day 1, starts the streak at 1, advances
                              the dashboard, and unlocks Day 2 (whose own post-test stays
                              locked until its lesson is done); (C) a failed retake after an
                              earlier pass does not revoke the earned completion, does not
                              re-lock Day 2, and leaves best-score/latest-attempt Review
                              behaviour intact. This is an owner attestation, not an
                              assistant-executed browser test — see §37 for what that
                              distinction does and does not cover.
KNOWN BLOCKER:                Unchanged and unaffected by M14/M14.1: the wider visual/layout
                              layer (spacing, breakpoints, focus rings actually rendering)
                              has still never been assistant-observed (M11/M12). The
                              *progression* behaviour specifically is now owner-observed and
                              passing, which is a narrower claim than "the app is visually
                              verified."
NEXT ACTION:                  **M17.10 (Batch 7, Days 25-28 — the final batch) may proceed
                              autonomously**, per standing owner authorization for the M17
                              autonomous run. Batch 6 (M17.9, Days 21-24) completed cleanly: no
                              STOP condition triggered, no P0 found (the AI-security day was
                              given real scrutiny given the topic, per instruction, and still
                              cleared clean), zero enhancements implemented (all 4 days KEEP),
                              QA held at 6,701/6,701 (unchanged, confirmed before and after) and
                              tsc at 0 diagnostics. After Batch 7, the only remaining M17 step is
                              the cumulative M17-FINAL-REPORT.md and the closing state-file
                              update — do not start that early. **Owner browser review is still
                              required for exactly TWO implemented changes** (unchanged by this
                              batch, since it implemented nothing): Day 1's NPU addition (§47,
                              already owner-attested PASS per M17.3) and Day 16's "context rot"
                              addition (§50, NOT yet reviewed by anyone — still outstanding).
                              **Owner-attestation note (carried forward):**
                              M17.3 (Day 1 browser review) and M17.5 (Days 5-8 sign-off) are
                              recorded as PASS/APPROVED per the owner's own M17-autonomous-run
                              instruction — no assistant session independently witnessed either
                              review; this is the same owner-attestation pattern already
                              established at §33/M12 and §37/M14.1, not a deviation from it. Per
                              that instruction, every batch implemented autonomously still
                              requires owner browser review before being treated as visually
                              confirmed — automated verification is not a substitute. Separately
                              unresolved, not part of M16 or M17: the SkillsBuild (Day 13) /
                              UNESDOC (Day 23) tooling-blocked resource pair from M15 (§39, §40).
```

## 15. SESSION RESUME PROTOCOL

1. Read this file.
2. Inspect `ai-digital-learning-dashboard.jsx` directly — do not trust §§2–9 without spot-checking.
3. Re-run the Layer 1 + Layer 2 audit (extract everything above the `LAYER 3` banner into a plain `.js` and execute assertions; those layers are import-free and run under plain Node).
3a. **Run `node verify.mjs ai-digital-learning-dashboard.jsx` first.** It re-derives Layers 1–2 from the file itself, so it cannot go stale against the code. A clean run means content integrity, progression, grading, streak, progress, mastery, review recency, normalisation and legacy-state compatibility all still hold. Do not hand-write a throwaway harness — earlier sessions did that five times.
3b. **Syntax-check the JSX before claiming anything is unverifiable.** TypeScript is installed globally at `/home/claude/.npm-global` — earlier sessions wrongly reported no parser was available. Run:
   `PATH=$PATH:/home/claude/.npm-global/bin tsc --noEmit --allowJs --jsx react --target es2020 <file>.jsx`
   With `checkJs` off this parses without type-checking, so a clean run means the JSX is syntactically valid. Always pair it with a negative control — inject an unclosed tag into a copy and confirm the error is reported — before trusting a zero-error result.
4. Compare findings with §10; downgrade anything that no longer holds.
5. Continue from NEXT ACTION in §14.
6. Update §14 and §16 after any meaningful change.
7. Never restart completed work. Never mark VERIFIED without executing or rendering.

---

## 16. CHANGE LOG

## 2026-08-14

### Completed
- Full Phase 1 audit of `ai-digital-learning-dashboard.jsx` (2,571 lines).
- Executed content-integrity script over all 20 days: 0 schema defects found.
- Executed behavioural tests of Layer 2: progression, locking, streak edges, grading, review flagging, full-completion progress simulation.
- Created this file — the first real checkpoint for the project.

### Changed
- Nothing. No source code was modified this session.

### Fixed
- Nothing yet.

### Discovered
- The previous `CLAUDE-WORK-STATE.md` was a prompt, not a state file; five other referenced docs do not exist (§0).
- Completing the entire curriculum perfectly yields 28% overall knowledge; Applied AI domain is permanently 0% (§6).
- 14 of 30 subcategories have no lessons written (§3).
- L-1 silent data-loss path in the persistence load effect (§11).
- LessonView claims "six to eight questions"; real range is 5–6 (§11 L-2).
- `bestPct` uses best-of attempts while `conceptStats` averages all attempts — inconsistent (§11 L-5).

### Next
- Patch L-1 as specified in §14 NEXT ACTION, then L-2. Await a decision on L-3 before touching progress math.

---

## 2026-08-14 — second entry (M1 patch)

### Implemented
- L-1: defensive load. Raw value is read first; unreadable JSON, non-object records and `version > STATE_VERSION` are copied verbatim to `ai-learning-os-backup-<date>`, `persist` moves to a new `blocked` state, and the save effect is inhibited. Added an explicit "Start fresh and overwrite the saved record" action — the only path that discards a quarantined record, and it is user-initiated.
- L-6: `normalizeState(raw)` in Layer 2. Validates day numbers against `CURRICULUM`, ISO date strings, segment indices, and attempt shape; returns `{ state, dropped }`. Recoverable records load with a banner listing what was dropped, and the original is backed up in that case too.
- L-3 option (a): `knowledgeProgress` now also returns `written`, `daysWritten`, `subsWritten`, `subsTotal`, and per-sub `pctWritten`. Dashboard tile leads with the written-curriculum figure and shows the roadmap figure as context; Progress view shows both plus an explanation of why the roadmap figure is capped. Roadmap math itself untouched.
- L-2: LessonView prints the real question count.
- New UI: `issueBanner` above the active view; `persistNote` gained a `blocked` message.

### Verified
- Original defect reproduced on the pre-patch code: a corrupt record was overwritten with empty state, and a `version: 2` record holding one completed day was reduced to 0 lessons at `version: 1`.
- Patched load effect extracted verbatim from the file and executed against 8 scenarios — no storage / empty store / valid v1 / corrupt JSON / version 2 / repairable / backup-write failure / `get` throws. All assertions passed; in every failure case the original record was byte-identical afterwards.
- `normalizeState`: idempotent, drops exactly the invalid entries, preserves valid ones, and no derived function (`streakStats`, `knowledgeProgress`, `reviewItems`, `conceptStats`, `minutesByDate`, `dayStatus`, `dayCredit`, `completionDate`) throws on a repaired state.
- Dual denominators: 0% empty, 50% at 10/20 perfect days, 100% at 20/20; `llm` reads `pctWritten` 100 while roadmap `pct` stays 33; unwritten subs return `null`.
- Regression: content audit re-run on the patched file — 20 unique days, 0 schema issues, 118 questions, 40 resources, unchanged. Behavioural suite re-run — locking, day-completion rule, streak edges (today/yesterday/4-days-ago → 3/3/0), grading, review flagging, and the 28% roadmap figure all byte-identical to baseline.
- Diff is 15 lines removed, 170 added. No curriculum content touched.

### Changed
- `EMPTY_STATE.version` now references the new `STATE_VERSION` constant instead of a literal.

### Fixed
- L-1, L-2, L-6.

### Remaining
- **Not verified:** anything requiring a browser — JSX compiles/renders, `window.storage` round-trip, the banner's appearance, responsive layout. No JSX parser or network was available in this environment.
- Reset and "Load demo history" remain enabled while `persist === "blocked"`; they change in-memory state that will not be saved. Not destructive, but potentially confusing. Not fixed — logged.
- L-4, L-5, L-7, L-8, L-9 untouched.

### Next Action
- Owner-run render checklist in §14, then L-5.

---

## 2026-08-14 — third entry (M2 research integration)

### Implemented
- Day 1: added `DIG-FUND-001` (CS50's Understanding Technology, Harvard) as a beginner-appropriate alternative to the existing CS50x entry. `verified: false`.
- Day 12: added `AI-FUND-001` (AI for Everyone, DeepLearning.AI) scoped to Week 1 ≈60 minutes, with the audit-free / certificate-paid caveat written into the summary. `verified: false`.
- Day 17: Core material expanded with zero-shot vs few-shot (and the context cost of examples) and with delimiters/XML-style boundaries tied forward to prompt injection. Two questions added: a few-shot scenario and a delimiter/injection multiple choice. Segment minutes unchanged.
- Day 19: Core material clarified with an explicit RAG-vs-fine-tuning contrast (weights untouched; retrieval writes into the context window). One scenario question added on frequently-changing policy content.
- Both new resources carry their Gemini resource ID and an explicit "belum diverifikasi dalam sesi ini" line in the `hubungan` field, so provenance is visible to the learner without a schema change.

### Verified
- Content integrity re-run: 20 unique days, **0 schema issues**, every day still exactly 60 minutes, 5 segments each. Questions 118 → 121 (Day 17: 6→8, Day 19: 6→7). Resources 40 → 42, verified count unchanged at 35 — confirming both additions landed as unverified.
- New questions grade correctly: fresh all-correct submissions score 100% on both Day 17 (8 questions) and Day 19 (7 questions).
- Backward compatibility: a saved 6-question Day 17 attempt passes `normalizeState` with zero drops, retains `total: 6` and `pct: 83`, still yields `dayCompleted: true` and credit 0.889. No stored attempt was invalidated by the question-count change.
- Regression: full M0 behavioural suite re-run — locking, day-completion rule, streak edges, grading, review flagging identical; roadmap ceiling still 28% at full perfect completion, so no progress math drifted.
- Knowledge mapping unchanged: still 3 domains / 30 subcategories, no new subcategory, no hardcoded percentage.

### Changed
- Nothing removed. No existing resource, lesson body, example, practice, challenge or question was deleted or rewritten.

### Fixed
- Nothing. M2 was additive.

### Remaining
- **No URL verification possible** — network egress disabled. 7 of 42 resources now sit unverified (5 pre-existing + 2 new).
- Day 16 HF LLM-course URL precision left as a VERIFY item rather than swapping a verified URL for an unverified one.
- Learner-facing language conflict unresolved — see §17.4, including the `sa` keyword-grading trap that any translation must handle.
- Still not rendered or compiled: M1 and M2 both.
- L-4, L-5, L-7, L-8, L-9 untouched. Curriculum extension for the 14 empty subcategories not started.

### Next Action
- Single owner render session covering both the M1 checklist and the three URL checks in §14.

---

## 17. RESEARCH INTEGRATION AUDIT — Gemini package (2026-08-14)

### 17.1 The finding that governs everything below

**The Gemini package audited a curriculum that does not exist.** Its per-day "Current State" and `existing_objectives` do not match `ai-digital-learning-dashboard.jsx` on a single day:

| Gemini says | Actual file |
|---|---|
| Day 1 objective: "basic computer hardware and internet structure" | Day 1 objectives are CPU/RAM/storage/GPU + predicting bottlenecks. Internet is Day 4 |
| Day 5 = Programming Fundamentals, "generic Python syntax" | Day 5 = Client and Server. Programming is Days 9–10 |
| Day 10 = AI Fundamentals, "AI as a monolithic block" | Day 10 = Functions, Data Structures and JSON. AI fundamentals is Day 12 |
| Day 15 = LLM Fundamentals, "high-level text summaries" | Day 15 = Generative AI. Tokens/context/inference is Day 16, already taught in depth |
| Day 20 = Prompt Engineering, "informal phrasing tips" | Day 20 = Tool Calling and AI Agents. Prompting is Day 17, already covers system-vs-user split and structured output |
| Day 25 = RAG, Day 30 = MCP; phases up to "Phase 15" | Curriculum ends at Day 20; 5 phases. RAG is Day 19; MCP has no day |

Consequence: the "what to change" claims are recommendations against an imagined baseline, not evidence about this codebase. Verified by grep against the source, most of the recommended additions are **already implemented**: tokens and context window (Day 16), system instructions and structured output (Day 17), dictionaries/JSON in Python (Day 10), AI vs ML vs GenAI taxonomy (Days 12–15), embeddings and semantic-vs-keyword search (Day 18), vector databases and the RAG pipeline (Day 19), tool calling (Day 20), and serial day unlocking, which the gap analysis asks for as if it were missing (`dayStatus`, implemented and verified in M0).

The package's **resource research is still useful**; its **curriculum diagnosis is not** and was not applied.

### 17.2 Verification could not be performed

Network egress is disabled in the build environment, so **zero URLs were opened this session**. Gemini's `status: "Verified"` was therefore treated as an unverified third-party claim. Every resource added to the app carries `verified: false`, which renders as an orange "Needs verification" pill. No existing `verified: true` entry was flipped, and no URL was invented.

Two of Gemini's 15 "Verified" entries are catalogue roots rather than specific resources — `AGENT-001` → `deeplearning.ai/courses/` (a course listing, titled "Agentic AI") and `APPDEV-001` → `docs.langchain.com/` (docs root). That is the same weak pattern the gap analysis criticises elsewhere. Also: `AI-FUND-001` and `GENAI-001` are Coursera courses marked `cost: "Free"`; they are free to *audit*, certificate paid. The caveat was written into the Indonesian summary of the one that was added.

### 17.3 Decision table

| Gemini item | Real day | Decision | Reason |
|---|---|---|---|
| `DIG-FUND-001` CS50 Understanding Technology | Day 1 | **ADD** (unverified) | Day 1's existing CS50x entry is written for future programmers; this track targets non-programmers, which is the actual audience. Added alongside, not as a replacement |
| `AI-FUND-001` AI for Everyone | Day 12 | **ADD** (unverified) | Existing Day 12 resources are technical; this adds organisational judgement, which matches the L&D career target. Scoped to Week 1 (~60 min) with the audit/certificate cost stated |
| Day 1 "add Cloud Computing basics" | — | **DEFER** | `cloud` subcategory has no day at all. Stuffing it into a full 60-minute Day 1 is worse than writing the day it deserves |
| Day 1 "add APIs as a concept" | Day 7 | **KEEP** | Day 7 is a full day on APIs |
| Day 5 "add JSON parsing, dicts/lists" | Day 10 | **KEEP** | Day 10 already teaches both, with `docs.python.org/3/library/json.html` as the source |
| Day 10 "separate AI/ML/GenAI taxonomies" | Days 12–15 | **KEEP** | Already four separate days with the taxonomy as the Day 12 quiz's first question |
| Day 15 "add tokens, context window, inference" | Day 16 | **KEEP** | Already the entire subject of Day 16 |
| Day 15 "**replace** all legacy content with Hugging Face concepts" | Day 16 | **REJECT** | Existing content is correct and beginner-appropriate; the recommendation is based on the false baseline in 17.1. Replacement would destroy verified material for no gain |
| Day 20 "add XML delimiters, few-shot vs zero-shot, CoT" | Day 17 | **EXPAND — done** | Genuine gap, confirmed by grep: zero hits for few-shot/zero-shot/chain-of-thought, one incidental hit for XML. Two paragraphs added to Core material plus two questions |
| Day 20 "add System vs User prompt split" | Day 17 | **KEEP** | Already taught, including the failure mode of putting standing rules in a user message |
| Day 25 "RAG is retrieval + prompt injection, not retraining" | Day 19 | **CLARIFY — done** | Implicit before, now explicit: one paragraph contrasting RAG with fine-tuning, plus a scenario question |
| Day 25 "add vector DBs, semantic vs keyword search" | Days 18–19 | **KEEP** | Both already taught, including the failure modes of each |
| `EMBED-001` Pinecone vector-embeddings guide | Day 18 | **KEEP** | Day 18 already carries a Pinecone guide; near-duplicate |
| `LLM-FUND-001` HF LLM course (specific path) | Day 16 | **VERIFY** | Day 16 points at the verified `huggingface.co/learn` root; Gemini's `/learn/llm-course/` is more precise but unverifiable offline. Swapping a verified URL for an unverified one is a downgrade in honesty — owner should open both and decide |
| `PROG-001` freeCodeCamp Python | Day 9 | **DEFER** | Day 9 already has the official Python tutorial plus a freeCodeCamp path; 270 minutes of duplicate coverage |
| `GENAI-001` Generative AI with LLMs | Day 15/16 | **DEFER** | 960 minutes. Sixteen hours cannot sit inside a 60-minute day and the ground is already covered |
| `MCP-001` Model Context Protocol | Day 20 | **KEEP** | Already present and `verified: true` |
| `AUTO-001`, `LOCAL-001`, `AGENT-001`, `APPDEV-001`, `EDTECH-001`, `PROJ-001` | none | **DEFER to Days 21+** | Map to `automation`, `local-ai`, `app-dev`, `elearning`/`lms` — subcategories with no lessons. Recorded as candidate anchors for the curriculum extension. `EDTECH-001` (Microsoft Learn educator centre) is the closest thing in the package to the learner's career target |
| 8 `SUP` resources | — | **REJECT** | No URL, no summary, `estimated_minutes: 0`. The research file states the URLs were stripped in processing. There is nothing to integrate, and inventing the URLs would be fabrication |
| "Progress engine must enforce serial unlocking" | — | **KEEP** | Already implemented and verified in M0 |
| VR/360 and LMS/SCORM have no courseware → project-based | — | **ACCEPTED as input** | Matches this project's own finding that 14 subcategories are empty. Feeds the curriculum-extension decision, no code change |

### 17.4 Unresolved conflict — learner-facing language

**Update 2026-08-14 (M5): half of this is no longer a future problem.** The `sa` keyword trap described below was tested rather than assumed, and it was already live. Twenty realistic correct answers were written in Indonesian, one per short-answer question, and graded against the then-current build: **0 of 20 were accepted.** The apparent Indonesian coverage in four questions turned out to be cognates that happen to match both languages (`data`, `ambigu`/`ambiguous`, `permanen`/`permanent`), not deliberate support. An Indonesian-speaking learner using the app today would have every short answer silently marked wrong. That is fixed — see L-10. The remaining question below, whether to translate the *lesson content*, is still open, but it is now a pedagogical choice rather than something gated on a grading defect.


The integration brief requires the app to be "primarily in natural Indonesian". The app today is English lesson content with Indonesian resource summaries, and that was not changed, for two reasons.

1. Scope: full translation means rewriting 20 days × 5 segments, 20 examples, 20 practices, 20 challenges and 121 questions. That is a milestone of its own, not a side effect of a resource integration, and doing it hastily would destroy content quality that is currently verified.
2. **A concrete technical trap.** Short-answer grading is English keyword matching — `keywords: ["fast", "temporary", "volatile", "permanent", ...]` with `need: 2`. Translate the lessons and learners will answer in Indonesian; `gradeQuestion` will silently score those answers 0 and every `sa` item will read as a failure, dragging test percentages, knowledge credit and review flags with it. Any translation milestone must convert the keyword arrays in the same change, or accept bilingual keyword lists.

**RESOLVED 2026-08-14 (M7).** Owner answered two questions: (1) the app is for the owner only, no external audience; (2) option **A — targeted Indonesian layer**, not full translation.

The recommendation argued against full translation on three grounds: reading English technical documentation is part of the competence being built, not an obstacle to it (all 42 resources are English and will stay English); translating ~2,500 verified technical sentences creates a new opportunity for inaccuracy in every one of them, and `verify.mjs` can check structure but not semantic fidelity; and the highest-value part of Indonesianisation — bilingual short-answer grading — was already paid for in M5. The concession the brief was right about: L2 cognitive load is real on genuinely hard concepts, so Indonesian was placed exactly where comprehension is decided rather than everywhere.

If the audience ever changes — client demo, training participants — this decision inverts, because "practising English reading" is not a benefit to them. Revisit §17.4 before showing the app to anyone else.

---

## 2026-08-14 — fourth entry (M3 review recency and mastery labels)

### Implemented
- L-5: `conceptStats` reads only the latest attempt of each day and now also returns `lastSeen`. Review cards show the score, the correct/total split, and the date of that attempt, so the learner can tell a fresh weakness from one they have not revisited in weeks.
- `CONFIG.reviewMinAttempts` renamed `reviewMinQuestions` and set to 1, with the reasoning recorded inline. No UI copy referenced the key.
- L-4: mastery reads "Lesson done, not tested" when credit exists but no test score does; styled blue rather than orange so it does not read as a warning.
- Review and Progress copy rewritten to describe the actual rule — "your most recent attempt", not "your whole history" — and to state that progress credit still keeps the best score.

### Verified
- Perfect retake clears the flag (the L-5 defect: previously impossible); partial retake moves the accuracy instead of clearing (CPU vs RAM 0% → 67%); `bestPct` stays 100 and day credit 1.000 after the retake, so recency in review costs nothing in credit.
- Single-question concepts are now flaggable — measured 26 of 67 concept/day pairs carry exactly one question and could never previously be flagged.
- Flag volume measured, not guessed: a learner who gets exactly one question wrong every day for 20 days sees **19 flags of 66 concepts**; a learner who answers everything correctly sees **0**. The volume is honest and self-clearing, and reverting to the quieter behaviour is a one-line change to `reviewMinQuestions`.
- All four mastery states verified, including that the "Needs review" string ReviewView filters on still appears for weak scores.
- Regression: content integrity 0 issues, 20 unique days, 60 minutes each, 121 questions, 42 resources / 35 verified. M0 behavioural suite identical. Roadmap 28% and written 100% at full perfect completion — no progress drift. Streak unchanged.
- M1 re-verified on this build: the load effect was re-extracted from the current file and passed all 8 storage scenarios again.

### Changed
- Nothing removed; no curriculum content touched in this milestone.

### Fixed
- L-4, L-5. With M1's L-1, L-2, L-6 and M1's L-3 handling, every defect from the M0 audit is now addressed.

### Remaining
- L-7 (streak counts a future-dated record), L-8 (product limitations, by design), L-9 (single 203 KB file).
- Three milestones of unrendered JSX. This is now the top risk.
- Language decision in §17.4 still open, including the `sa` keyword-grading trap.
- Curriculum extension for the 14 empty subcategories not started.

### Next Action
- The single owner verification session described in §14. Do not start M4 before it reports.

---

## 2026-08-14 — fifth entry (static verification, no feature work)

### Corrected
- Earlier entries in this log claimed no JSX parser was available in the build environment. **That was wrong.** TypeScript 6.0.3 is installed at `/home/claude/.npm-global`; the previous sessions did not search thoroughly enough and under-verified three milestones as a result. §15 now carries the exact command so this is not repeated.

### Verified
- Full M1+M2+M3 file parses as JSX with zero diagnostics.
- The check itself was validated first: an unclosed `<AlertTriangle>`, a mismatched `</main>`, a broken JSX expression brace and an unterminated string were each injected into copies and each produced errors (TS17008, TS17002 and friends). A clean result on the real file therefore means something.
- The as-uploaded M2 baseline also parses cleanly, so no milestone introduced a parse regression.
- All 43 capitalised JSX references resolve; `AlertTriangle` used by the new persistence banner is genuinely imported.
- Hook order is safe: every hook call precedes any return in the component body.

### Remaining
- Runtime only: persistence round-trip, layout, and the three resource URLs. No network egress here.
- L-7, L-8, L-9 untouched. Language decision open. Curriculum extension for the 14 empty subcategories not started.

### Next Action
- The single owner verification session in §14. Deliberately no M4 until it reports.

---

## 2026-08-14 — sixth entry (M4: L-7 and verify.mjs)

### Implemented
- L-7: `streakStats` filters future-dated completions out of streak maths and requires a non-negative gap. Future-dated days still count in the total, and `streak.future` is returned so the UI can explain the discrepancy instead of silently disagreeing with itself. History gained an amber notice for that case.
- `verify.mjs` — a dependency-free regression suite that slices Layers 1–2 out of the `.jsx` at run time and asserts against the real functions. **1,153 assertions** across nine groups: content integrity, progression, grading, streak, progress, mastery, review recency, normalisation, and legacy-state compatibility. Prints a summary and exits non-zero on failure.

### Verified
- Clean build: all 1,153 assertions pass, exit 0. tsc: 0 diagnostics. All 43 capitalised JSX references resolve, including `AlertTriangle` in the new History notice.
- **The suite was mutation-tested rather than trusted.** Four deliberately broken builds, four detections: the pre-L-7 build fails exactly the 4 streak assertions; a corrupted quiz answer index fails 1 content assertion naming the day and question; reverting `conceptStats` to the all-attempts average fails the retake-clears-flag assertion; stubbing out `normalizeState` fails 15 assertions. The clean build passes all four times the mutants failed.
- A defect in the suite itself was found and fixed during that exercise: a throwing assertion killed the run and printed no report. Throws are now recorded as failures with a note that later assertions did not run, and the report always prints.
- Every day's own model answers score 100% on its own quiz — 20 assertions that would catch a mis-keyed answer introduced by any future content edit.

### Changed
- Nothing removed. No curriculum content touched.

### Fixed
- L-7. All seven defects from the M0 audit are now closed.

### Remaining
- L-8 (product limitations, by design) and L-9 (single 217 KB file).
- Runtime verification, unchanged: persistence round-trip, rendering, layout, resource URLs.
- Language decision in §17.4 open, including the `sa` keyword-grading trap.
- Curriculum extension for the 14 empty subcategories not started, and blocked on the language decision.
- `verify.mjs` covers Layers 1–2 only. Layer 3 would need a real test runner and dependencies.

### Next Action
- The owner verification session in §14. There is no further static work worth doing before it.

---

## 2026-08-14 — seventh entry (M5: short-answer grading validity)

### Discovered
- The `sa` keyword trap flagged in §17.4 as a *future* translation hazard was **already live**. Twenty realistic Indonesian answers, one per short-answer question, were written and graded: **0 of 20 accepted**. The four questions that appeared to have Indonesian keywords were cognates (`data`, `ambigu`, `permanen`) matching both languages by accident.
- A second, language-independent flaw in the same mechanism: a flat keyword list counts synonyms of one idea separately, so "RAM is temporary, volatile, data is lost" satisfied `need: 2` while expressing one concept. Three of the twenty questions were vulnerable.

### Implemented
- New short-answer shape `{ groups: [[synonym, ...], ...], need }`. Each group is one idea; matching several synonyms within a group counts once. Synonyms carry English and Indonesian stems, so the two languages score identically. `gradeQuestion` keeps the legacy flat branch, so old-schema content still grades.
- All 20 short-answer blocks rewritten. Four groups were then tightened after measurement: `latih` was removed because it hides inside `pelatihan`; a duplicated `peladen` was cleaned up; `batas` was dropped from a Day 20 group because it matched answers about context limits; `indeks` was dropped from a Day 10 group because it matched database answers.
- `verify.mjs` extended from 1,153 to 4,568 assertions: junk rejection across every question, single-idea rejection wherever `need >= 2`, language parity (first-listed and last-listed synonyms must both pass), minimum stem length, and a check that no stem appears in two groups of the same question in either direction.
- The report now prints a short-answer strictness profile (`need 1 × 2, need 2 × 17, need 3 × 1`) so a change in grading strictness is visible in the output.

### Verified
- Indonesian answers 0/20 → **20/20**. English model answers: 20/20 before and after.
- Off-topic English answers accepted: **3.2% → 1.8%** of 380 pairs. Single-idea probes accepted by **3 questions → 0**. Junk answers: 0 of 180 in both builds. Cross-group stem overlaps: **0**. Stems hiding inside unrelated words: **0**.
- Mutation-tested again: reintroducing a cross-group overlap fails 3 assertions naming the exact stems; reverting `gradeQuestion` to flat counting fails 97; a one-character stem fails with the day, question and group. tsc still reports 0 diagnostics.
- A genuine hole in my own fix was found mid-work and corrected rather than shipped: disambiguating Day 4 by adding `sisi klien` created a *new* overlap with the client group, which the new overlap assertion caught immediately.

### Changed
- Short-answer answer shape across 20 questions. No question text, explanation, model answer, lesson body or resource was altered. `need` thresholds were preserved question by question, except where the group count made the original value impossible to express — verified by the strictness profile matching the pre-change distribution.

### Remaining
- **`verify.mjs` cannot catch a lowered `need` threshold.** Mutation control F (`need: 3` → `need: 1`) passed the suite. Every heuristic tried to catch it also failed legitimate single-idea questions, so nothing was bolted on; instead the strictness profile is printed for human review and the limitation is stated in the suite's own footer. This is a known, accepted gap.
- Runtime verification, unchanged. Lesson-language decision still open. L-8, L-9 open. Curriculum extension not started.

### Next Action
- The owner verification session in §14, with the Indonesian short-answer check as the highest-value item.

---

## 2026-08-14 — eighth entry (M6: accessibility)

### Discovered
- §10 had said "Accessibility: NOT STARTED" since the first audit and nobody had measured it. Measurement found one outright WCAG failure and six controls with no accessible name or state.
- `text-slate-400` on white is 2.56:1 against a 4.5:1 requirement, used at 12 sites — including the footer that discloses how progress is derived and that short answers are keyword-graded. The most important text for using the app honestly was the hardest to read.
- True/false answers, the short-answer box, the resource search field and the five segment buttons per day all rendered without an accessible name, a programmatic state, or both.
- The mobile drawer could only be dismissed by tapping the backdrop, so a keyboard user could open the navigation and not close it.

### Implemented
- Contrast: `slate-400` → `slate-500` at nine light-background sites; the one dark-card site → `slate-300`; `Eyebrow` gained `tone="dark"` rather than relying on Tailwind class ordering to resolve two colour utilities in the same string. `orange/amber/rose/emerald-600` text → `-700`.
- `aria-pressed` on true/false buttons and on segment buttons; `aria-label` naming each segment and its minutes; `role="radiogroup"`/`role="group"` with `aria-labelledby` tying every option set to its question; `aria-labelledby` on the short-answer textarea; `aria-label` and `type="search"` on the resource search field.
- `role="status" aria-live="polite"` on the post-test result, `role="alert"` on the persistence banner, `role="status"` on the future-date notice.
- Drawer: Escape closes it, `role="dialog"`, `aria-modal`, accessible name, `aria-expanded`/`aria-controls` on the toggle, `aria-hidden` on the decorative backdrop.

### Verified
- Contrast ratios computed from the actual palette values for every text/background pair in use. All body text now ≥4.5:1; dark-card text ≥6.9:1; the four bumped accent colours ≥4.88:1 on their own backgrounds.
- tsc: 0 diagnostics. All capitalised JSX references resolve. Hook order still safe with the third `useEffect` added — 15 hooks, every return before them is inside an effect or callback body.
- verify.mjs: all 4,568 assertions still pass, so no logic or content was disturbed by a presentation-layer pass.
- Before/after ARIA inventory: `aria-label` 2 → 5, `aria-labelledby` 0 → 3, `aria-live` 0 → 1, `aria-pressed` 0 → 2, `aria-expanded` 0 → 1, roles 1 → 7.

### Changed
- Presentation and semantics only. No lesson content, question, resource, or logic function was touched.

### Remaining
- **Not verified and not verifiable here:** no screen reader, keyboard walkthrough, zoom/reflow, or visual regression was run. The markup is correct by inspection; that is a weaker claim than "accessible".
- Focus trap in the drawer: not implemented.
- 10 card titles remain `<p>` rather than headings; deliberately deferred because artifacts render without Tailwind Preflight, so heading tags may inherit browser default sizing and change the design. This needs to be seen rendered first.
- Lucide icons are not `aria-hidden`.
- Everything from earlier milestones: runtime verification, resource URLs, lesson-language decision, L-8, L-9, curriculum extension.

### Next Action
- The owner verification session in §14, which now also includes a keyboard pass and a visual check of the 12 recoloured sites.

---

## 2026-08-14 — ninth entry (M7: Indonesian comprehension layer)

### Decided
- §17.4 closed. Owner: app is single-user, no external audience; chose option A (targeted Indonesian layer) over full translation. Full translation was recommended against and the reasoning is recorded in §17.4 — including the condition that reverses it (an external audience).

### Implemented
- `recap: { inti, salahPaham, istilah[{ en, id }] }` added to all 20 days. Written against each day's actual segment text, not its title. 128–166 words per block, 3–5 glossary terms each, 79 terms total.
- Rendered in `LessonView` between the segments and Example — deliberately after the Reflection segment, so the Indonesian works as a comprehension check rather than a shortcut past the English material.
- The block is a plain `<div>`, not `<Card>`: `Card` hardcodes `bg-white`, and M6 already established that two competing background utilities in one class string do not resolve reliably. A code comment records why.
- Bilingual grading is now disclosed at three points — post-test intro, textarea placeholder, footer. It had been supported since M5 and stated nowhere, so the fix with the highest value-to-effort ratio in this milestone was one sentence.
- `verify.mjs` gained a `recap` group: +560 assertions (4,568 → 5,128).

### Verified
- Contrast computed for the new surface before it was written: slate-700 on amber-50 is 9.99:1, slate-600 7.31:1, slate-900 17.22:1. `amber-500` appears only as a non-text left border.
- Every one of the 79 glossary terms occurs in its own day's English content (objectives, segments, example, practice, challenge, quiz text, options, model answers). This is the desync guard: rewrite a lesson and drop a term, and the suite fails.
- Mutation-tested against 6 broken builds, each caught: missing recap block; a term absent from the day's content; a term listed twice; an `inti` inflated past the word cap (the creeping-translation case); a term glossed with itself; and an unclosed `<dl>` in the new JSX (caught by tsc, not verify).
- tsc `--noEmit --allowJs --jsx react`: 0 diagnostics. All 5,128 assertions pass.

### Changed
- Content and one presentation block. No logic function, question, answer key, resource, or state shape was touched — the persisted state shape is unchanged, so existing progress loads untouched.

### Remaining
- **Not verifiable here:** whether the Indonesian reads naturally, whether the amber block looks right, whether the glossary wraps acceptably on mobile. Assertions can prove a term is anchored; they cannot prove a sentence is good Indonesian.
- **Maintenance risk, accepted knowingly:** the recap can drift from the lesson in meaning while still passing every assertion. The term-anchoring check catches vocabulary drift, not conceptual drift. If a day's Core material is ever rewritten, its recap must be re-read by hand.
- **Behavioural assumption, unmeasured:** the whole design rests on the learner reading the English first and the recap second. Position mitigates that; it does not enforce it. If the owner notices themselves skipping to the Indonesian, the layer is doing harm and should be cut, not expanded.
- Everything from earlier milestones: runtime verification, focus trap, heading semantics, resource URLs, L-8, L-9, and the curriculum extension (14 subcategories still have no lessons; Applied AI is still 0%).

### Next Action
- The owner verification session in §14, now with items (g) and (h). Then Days 21+.

---

## 2026-08-14 — tenth entry (M8: Days 21–24, first session with network access)

### Discovered
- Network egress works in this session. Every earlier session recorded `verified: false` on new resources because no URL could be opened; §17.2 says so explicitly. That constraint is gone, and it changes what "verified" is allowed to mean here.

### Implemented
- Days 21–24 as `CUR_F`, plus two phases: P6 (Trust: Evaluation and Security, days 21–22) and P7 (Applied AI for Learning, days 23–24).
  - **Day 21 — Evaluating AI Systems** (`eval`). Success criteria, the three grading methods, LLM-as-a-judge and why it needs validating, component-level evaluation of a pipeline. Closes the forward reference Day 19 left open.
  - **Day 22 — AI Security: Injection, Data and Keys** (`ai-security`). Direct vs indirect prompt injection, why the fix is capability rather than phrasing, improper output handling, data retention, key handling. Closes the explicit forward references in Day 17 ("you will meet again in AI security") and Day 20.
  - **Day 23 — AI in Instructional Design** (`elearning`). Where AI fits the design workflow, grounding beats instructing, assessment integrity and redesign, policy as part of design.
  - **Day 24 — AI, the LMS and Learning Data** (`lms`). SCORM vs xAPI by the question each answers, the LRS, where AI belongs in the stack and where it must not, learner privacy.
- Each day carries the M7 recap block, 6 quiz questions (1 short answer with bilingual idea groups), and 2 resources with Indonesian summaries.
- Days 23 and 24 deliberately reference this app's own design — its keyword-graded short answers, its raw-event storage, its review system — so the learner has a system they can inspect rather than only a description.

### Verified
- `verify.mjs`: 5,853 assertions pass, up from 5,128. The +725 includes the M7 recap checks applied to the new days, which passed on the first run — every glossary term was already anchored in its day's own content.
- tsc `--noEmit --allowJs --jsx react`: 0 diagnostics.
- Progress maths re-simulated for a learner who completes all 24 days at 100%: roadmap 28% → **35%**, written 100%, Applied AI 0% → **14%**, AI domain 31% → 38%, Digital unchanged at 52%.
- Short-answer validity probe on the four new `sa` items, executed: a realistic Indonesian answer passes all four, each day's own English model answer passes, and a junk answer is rejected by all four. This is the M5 check repeated on new content rather than assumed to carry over.
- Phase mapping executed: days 21–22 → p6, days 23–24 → p7.

### Resources — what "verified" means this time
- 8 new resources. **7 were opened and read in this session** before being marked `verified: true`: Anthropic's evaluation docs (note: `docs.anthropic.com` now redirects to `platform.claude.com`, and the redirect target is what is stored), Ragas metrics documentation, OWASP GenAI LLM Top 10 2026, NIST AI RMF, the UNESCO GenAI guidance page, and xAPI.com.
- **1 is `verified: false` on purpose**: the ADL `xAPI-Spec` GitHub repository, which appeared in search results but was not opened. The reason is written into its Indonesian summary rather than left implicit. The UNESDOC PDF of the UNESCO guidance is also `false` — the linking page was opened, the PDF itself was not.
- Two live-status facts worth recording because they post-date the training cutoff and were confirmed by reading the pages: the OWASP LLM Top 10 has a **2026 edition, published August 2026**, and NIST states that **AI RMF 1.0 is currently being revised**. Both are noted in the relevant Indonesian summaries.
- The 5 pre-existing `verified: false` entries from earlier sessions were **not** revisited. They could be now, and should be, but bundling that into a content milestone would have hidden it.

### Changed
- Content only: `PHASES` gained two entries, `CURRICULUM` gained `CUR_F`. No logic function, state shape, or UI component was touched, so existing saved progress is unaffected and Days 1–20 are byte-identical.

### Remaining
- **Not verified:** nothing in M7 or M8 has been rendered. Four new lesson pages and four new post-tests exist only as passing assertions.
- 10 subcategories still have no days: cloud, security, automation, local-ai, mcp, app-dev, analytics, multimedia, vr, auto-projects. The roadmap figure cannot reach 100% until they do, which remains a content task, not a reporting defect.
- The 5 older unverified resource URLs should be checked now that network access exists.
- End-of-curriculum state after the last day is still unimplemented, and the last day is now 24 rather than 20 — the defect did not move, but the number in it did.
- Everything else from earlier milestones: focus trap, heading semantics, L-8, L-9.

### Next Action
- Owner verification session per §14, now including items (i) and (j). Then M9 on the remaining empty subcategories.

---

## 2026-08-14 — eleventh entry (M9: Days 25–28)

### Implemented
- Days 25–28 as `CUR_G`, plus phases P8 (Infrastructure and Security, 25–26) and P9 (Automation and Integration, 27–28).
  - **Day 25 — Cloud Computing** (`cloud`). The five defining characteristics, IaaS/PaaS/SaaS as a responsibility spectrum, shared responsibility, the three cost traps (idle resources, egress, per-token metering), data residency.
  - **Day 26 — Cybersecurity Fundamentals** (`security`). CIA triad, authentication vs authorisation and why broken access control outranks injection, credential reuse and MFA, phishing after generative models made fluency worthless as a signal, encryption in transit vs at rest, supply chain, 3-2-1 backups.
  - **Day 27 — Workflow Automation and n8n** (`automation`). Trigger/node/data/credential vocabulary, polling vs webhook, data reshaping as the real work, failure design (retries, idempotency, error branch, notification), and the frequency × time-saved decision rule.
  - **Day 28 — MCP** (`mcp`). The N×M integration problem, host/client/server roles, resources/prompts/tools, and the specification's own security language read against Day 22.
- Days 25–28 deliberately close forward references rather than opening new ones: Day 25 answers the cost question Day 22 raised about hosted models, Day 26 is the general case of Day 22's specific case, and Day 28 is Day 20's mechanism with the connector problem solved.

### Verified
- `verify.mjs`: 6,586 assertions pass, up from 5,853. tsc: 0 diagnostics.
- Progress re-simulated at full completion: roadmap 35% → **41%**, written 100%, Digital 52% → **63%**, AI 38% → **45%**, Applied AI unchanged at 14%.
- Empty subcategories: 10 → **6** (local-ai, app-dev, analytics, multimedia, vr, auto-projects).
- Short-answer probe on the four new `sa` items: realistic Indonesian answers pass, English model answers pass, junk rejected.
- Phase mapping executed: 25–26 → p8, 27–28 → p9.

### Caught by the suite
- Day 27's short answer failed the existing assertion that every day's own model answer must score 100 — it scored 83, because the keyword groups did not contain a stem matching the model answer's own wording. The content was fine and the grading data was wrong, which is precisely the failure mode this assertion exists for. Fixed by adding the missing stem, not by rewording the model answer.

### Resources
- 8 new, **6 opened and read this session** before being marked `verified: true`: NIST SP 800-145, AWS types-of-cloud-computing, OWASP Top Ten project page, n8n "Build your first workflow", the MCP specification, and Anthropic's MCP announcement.
- **2 are `verified: false` with the reason written into their Indonesian summaries**: the OWASP Top 10 Indonesian translation and the n8n key-concept glossary. Both links were found on pages that *were* opened, but the target pages themselves were not.
- **A search result was dead.** `docs.n8n.io/workflows/components/nodes/` appeared in search results and returns 404. It was discarded rather than published. This is the concrete argument for the fetch-before-publish rule: a plausible URL from a search engine is not a working URL.
- Live-status facts confirmed by reading the pages, all post-dating the training cutoff: the current OWASP web Top Ten is the **2025** edition (the 2021 edition has an official Indonesian translation, the 2025 one does not yet); the MCP specification has a revision dated **2026-07-28** newer than the 2025-06-18 page linked here; NIST SP 800-145 is unchanged since 2011. Each is noted in the relevant resource summary.

### Changed
- Content only. `PHASES` gained two entries, `CURRICULUM` gained `CUR_G`, and one `sa` keyword group on Day 27 was corrected. No logic function, state shape, or component was touched; Days 1–24 are otherwise byte-identical and saved progress is unaffected.

### Remaining
- **The rendering debt is now the largest open item.** Three consecutive milestones have shipped without a browser ever opening the file.
- **9 old resource URLs remain unverified** and now constitute the only content in the app whose honesty label predates network access. See §14 for the cost estimate.
- 6 subcategories still have no days, and four of them (analytics, multimedia, vr, auto-projects) are arguably project days rather than lesson days — a schema question, not a writing question.
- End-of-curriculum state after the final day is still unimplemented; the final day is now 28.
- Focus trap, heading semantics, L-8, L-9 unchanged.

### Next Action
- Per §14: back-verify the 9 old URLs as a dedicated session, then M10 content.

---

## 2026-08-14 — twelfth entry (M10: resource URL back-verification, partial)

### Scope
- One job only: open the 9 resource URLs whose `verified` flag predates network access and correct what turns out to be wrong. No new content, no logic, no UI.

### Findings — 5 of 9 checked
- **CS50x** (Day 1) — resolves. Flag corrected to `true`. The page always serves the current year's edition, so the link will not go stale.
- **CS50's Understanding Technology** (Day 1) — resolves, **and the page carries a retirement notice: the course was retired on 30 June 2024 and is officially deprecated, kept online for archive purposes.** The original research package recommended it as if it were current. Kept, because hardware and networking concepts age slowly, but the title now says `(arsip)`, the Indonesian summary leads with the retirement, and the framing was downgraded from "better alternative for Phase 1" to "archive material, still correct on concepts".
- **Postman Learning Center** (Day 7) — the stored URL redirects; the canonical is now `/docs/getting-started/overview`. Stored URL updated to the canonical, flag `true`.
- **AI for Everyone** (Day 12) — resolves and is active: 4 modules, roughly 7 hours, free to audit. Flag `true`, and the summary now states the module count rather than guessing.
- **Anthropic tool use overview** (Day 20) — the documentation has **migrated to the `platform.claude.com` domain**. URL updated to the verified new address, flag `true`.

### Found while auditing, not on the list
- Day 17's Anthropic prompt-engineering resource carried `verified: true` **set in a session that had no network access**, so the label could never have been earned. It also sits on the same `docs.claude.com` domain that has since migrated. Flag **downgraded to `false`** with the reason written into its summary. The URL was not silently rewritten to a guessed `platform.claude.com` equivalent — that would be inventing a URL, which the project forbids.
- Net effect on counts: 47 verified → 51, and 11 unverified → 7.

### Not done, and why
- 4 of the 9 remain unchecked: `skillsbuild.org` (Day 13), the Pinecone vector database guide (Day 18), the UNESDOC PDF (Day 23), and `adlnet/xAPI-Spec` (Day 24). Two M9 entries were never opened either: the OWASP Indonesian translation (Day 26) and the n8n glossary (Day 27).
- **The §14 cost estimate was wrong in an instructive way.** It predicted "~18 calls" and the call count was accurate — but the binding constraint is response size, not call count. `web_fetch` returns whole pages regardless of the requested limit, and a single vendor documentation page can return more text than four written lesson days. Stopping at five was a budget decision, made explicitly rather than by running out mid-edit.
- Revised estimate for the remainder: **two URLs per session**, treated as its own task.

### Verified
- `verify.mjs`: 6,586 assertions still pass. tsc: 0 diagnostics. The suite has no assertion about whether a URL resolves — it cannot have one — so these corrections were invisible to it, which is exactly why this pass had to be done by hand.

### Changed
- Five resource URLs/flags corrected, one flag downgraded, six Indonesian summaries updated to record what was found. No day content, question, answer key, logic function, state shape, or component was touched.

### Next Action
- Per §14: finish the remaining 6 URLs two at a time, then the long-overdue owner verification session.


---

# 32. RUNTIME QA — M11

## Browser QA

**Date:** 2026-08-14

**Environment:** jsdom 26 + React 18 + @testing-library/react, driving the real bundled
component. Not a simulation of the UI: the actual `LearningDashboard` is mounted, real
DOM nodes are produced, real `click`/`input` events are dispatched, and `window.storage`
is stubbed with the same async contract the artifact host provides. Test scripts live in
`qa/`; a standalone browser build is at `qa-build.html`.

**Viewport:** 1280×900 and 390-wide runs. **Width is a variable, not a rendering:** jsdom
has no CSS engine, so a 390px run exercises the JavaScript that depends on width, not the
layout that depends on Tailwind breakpoints.

**What this environment can and cannot verify — read this before trusting the result:**

| Can verify | Cannot verify |
|---|---|
| Rendering without crash, DOM structure, text content | Anything visual: spacing, colour, breakpoints |
| Click/type/submit interaction and state changes | Whether an element is visible or off-screen |
| Storage round-trip through mount → change → remount | Horizontal overflow, text truncation in practice |
| Heading hierarchy, ARIA attributes, tab ORDER | Whether a focus ring is actually drawn |
| Console errors during real lifecycles | Touch targets, scroll behaviour, animation |

## Tests Passed

- **Initial dashboard.** Mounts clean. Active day resolves to Day 1 on empty state. Streak,
  learning days, minutes, written/roadmap progress, current topic and phase all render with
  real values. No empty sections. No console output of any kind during mount.
- **Lesson rendering, Days 1, 20, 21, 24, 25, 28.** All six render all five segments, the
  Indonesian recap, example, practice, challenge and resources. Days 20–28 correctly refuse
  to open from an empty state and open once state is seeded — the lock is real, not cosmetic.
  Longest lesson rendered 8,156 characters without error.
- **External links.** All resource links are absolute `https`, and every `target="_blank"`
  carries `rel="noopener"`. No relative or `javascript:` hrefs anywhere.
- **Post-test, all four question types.** Multiple choice and scenario render as grouped
  radios; true/false as paired toggle buttons with `aria-pressed`; short answer as a
  `textarea` wired to its label with `aria-labelledby`. Selection, typing and submission all
  work through dispatched events.
- **Scoring and feedback.** Deliberately wrong answers scored 0% and produced the
  not-passed state with per-question explanations; the correct answers scored 100% and
  produced the "Passed · threshold 70%" pill. Both attempts were stored with correct
  `pct`/`passed` flags. **Retake works** and both attempts persist (`0, 100`).
- **Progression, executed as a learner.** Marked five segments → completed the lesson →
  confirmed the day was **not** counted complete and Day 2 was **still locked** → submitted
  the post-test → Day 2 unlocked, active day advanced to Day 2, written progress moved
  0% → 4% and roadmap 0% → 1%. The premature-completion guard holds.
- **Persistence round trip.** Full unmount and remount from the stored payload: learning
  days, streak, written progress, unlocked day and completion state all survived exactly.
- **Storage unavailable.** With `window.storage` deleted the app still renders and tells the
  user "Not saved — this session only" rather than pretending to save.
- **Corrupt saved state.** Given unparseable JSON the app renders, blocks saving, writes a
  timestamped backup key, and **does not overwrite the original record**. Verified byte-exact.
- **Future-dated state.** A completion dated 2030 does not inflate the streak; it reports 0.
- **Reset guard.** Two-click confirmation: first click relabels the button, data untouched;
  second click clears state and the label reverts. Demo history loads and produces a 4-day streak.
- **Heading hierarchy.** After the fix below, all six views expose exactly one `h1` and no
  level is skipped.
- **Keyboard and ARIA.** Every button has an accessible name (0 unnamed). Escape closes the
  mobile drawer and resets `aria-expanded`. The drawer is `role="dialog"` with `aria-modal`
  and an `aria-label`. Tab order places the first drawer control immediately after the toggle,
  so the menu is reachable by keyboard. All six `focus:outline-none` declarations pair with a
  visible `focus-visible:ring` replacement — no invisible focus in the code.

## Bugs Found

1. **Dashboard had no `<h1>`.** Every other view (Learning path, Progress, Resources, Review,
   History, and each lesson) opens with one; the dashboard's first heading was an `h2`. A
   screen-reader user landing on the default view found no top-level heading.

## Bugs Fixed

1. Added `<h1 className="sr-only">Dashboard</h1>` with a comment explaining why. Verified: all
   six views now report `h1:1`. Full learner flow re-run afterwards — unchanged. `verify.mjs`
   6,586 assertions still pass, tsc 0 diagnostics.

## Bugs Deferred

- **A failed post-test still completes the day.** Submitting a 0% test unlocks the next day,
  counts as a learning day, and increments the streak. This *matches* the documented rule in
  §5 and §12 ("Post-Test = **Submitted**"), so it is not a code defect — but the UI states
  "Pass mark 70%" and shows a Passed / Not passed pill, which strongly implies otherwise. The
  learner can complete all 28 days by submitting blank tests. **This is an owner decision, not
  a bug fix**: either the copy is wrong or the rule is. Deliberately not changed here, because
  changing it would alter the learning architecture, which this milestone forbids.
- **Decorative icons are not hidden from assistive tech.** 22 lucide `<svg>` elements per view,
  none with `aria-hidden="true"`. Buttons all have accessible names so nothing is unlabelled,
  but the noise is real. Fixing it touches every icon call site — too broad for a QA session.
- **No focus trap.** With the mobile drawer open, 15 controls behind the overlay remain
  tabbable. This is the pre-existing known item, now quantified. The existing code comment
  already documents the partial approach as deliberate; leaving as-is pending a decision.
- **Future-dated completions are handled but not explained.** The streak logic excludes them
  correctly, but nothing on screen tells the user why their streak looks wrong.

## Console Errors

**None.** Zero `console.error`, zero `console.warn`, zero uncaught window errors across every
test run: mount, six lesson views, six navigation views, post-test submit/retake, reset, demo
load, corrupt-state recovery, and storage-unavailable mode. React raised no key, prop-type or
lifecycle warnings.

## Persistence Result

**PASS.** Round trip verified through a real unmount/remount, plus three failure modes
(missing storage, corrupt payload, future dates) that all degrade safely without data loss.

## Responsive Result

**NOT TESTED — cannot be, in this environment.** jsdom has no layout engine. A proxy scan for
unbroken tokens longer than 42 characters found none, and 17 elements use wrap/truncate
utilities, so there is no *obvious* overflow hazard in the content — but that is a hint, not a
result. Recording this as PASS would be a false claim. `qa-build.html` exists so it can be
tested properly.

## Accessibility Smoke Test

**PARTIAL.** Structure, naming, ARIA, Escape handling and tab order pass. Visible focus is
correct in the code but unconfirmed on screen. Focus trapping and icon hiding are open. No
claim of WCAG compliance is made or implied.

## Automated Verification

`verify.mjs`: **6,586 assertions pass** (unchanged before and after the fix — the missing `h1`
was invisible to it, which is the point of this milestone). `tsc --noEmit`: **0 diagnostics**.

## Known Items — status unchanged

Not addressed in M11 and not marked fixed: 6 subcategories still lack learning days; 6 legacy
resource URLs remain unverified; end-of-curriculum state after Day 28 is still unimplemented;
focus trap incomplete; icon `aria-hidden` incomplete; L-8 and L-9 open.


---

# 33. M12 — REAL VISUAL BROWSER QA

## Outcome: NOT PERFORMED BY THE ASSISTANT — OWNER-ATTESTED INSTEAD

**REAL VISUAL BROWSER QA COULD NOT BE PERFORMED by the assistant.** After the blocker below
proved unresolvable, the owner inspected the build manually at 1280×900, 768×1024 and 390×844
and reported no problems.

**How to read that.** It is an owner attestation, not a recorded QA pass: the inspection was
unaided, no screenshots were retained, and no per-view checklist was filled in. It is real
evidence and it is accepted — a person did look at the pixels — but it cannot be re-examined,
and a later reader cannot tell which of the checklist items were actually exercised. If a
visual defect surfaces later, this is the first record to distrust, not the last.

**Still open from the visual checklist:** whether the `focus-visible:ring` styles are actually
drawn when tabbing. Asked, not yet confirmed. Everything else is covered by the attestation.

No screenshot, no rendered pixel, and no viewport was observed in this session. Everything
below is the record of why, so that the next session does not spend itself rediscovering it.

## Environment

- **Browser available:** yes. One Chrome instance with the Claude extension, Windows, local
  to the owner (`deviceId 14a51817-…`), selected successfully.
- **Build available:** yes. `qa-build.html`, single self-contained file, confirmed downloaded
  by the owner at `C:\Users\rizqo\Downloads\files 5\qa-build.html` and confirmed opened —
  the tab title read "AI & Digital Learning — runtime QA build", so **the application does load
  and render in a real browser.** That is the one genuine, if minimal, visual data point: it is
  not a blank page.
- **Blocker:** the browser-automation tooling cannot act on a `file://` page.

## Root cause — reproduced four times, deterministic

1. **The `navigate` tool cannot express a `file://` URL.** Every form tried —
   `file:///C:/Users/`, the full path with `%20`, and the same path with a literal space — was
   rewritten to `https://file:///…`, producing a Chrome error page. Tried on two different tabs
   in two different tab groups. Result identical every time.
2. **The extension is not permitted to touch `file://` pages.** Screenshot attempts returned
   `permission_required: file`, then `Permission still required after granting`, and a
   JavaScript evaluation attempt returned `Permission denied by user`. The likely fix is the
   per-extension toggle at `chrome://extensions` → Claude → Details → **Allow access to file
   URLs**, which was requested but not confirmed as enabled.
3. **Chrome blocks the workaround.** Navigating from an `https` error page to a `file://` URL
   via `location.href` is refused by the browser itself, as designed.
4. **Hosting is not available as an escape.** The container's network allows only package
   registries and GitHub API endpoints, and the owner's browser cannot reach the container. The
   448 KB bundle is far too large to inject through the JavaScript tool. There is no path from
   the built file to an `https` origin the extension can read.

An assistant-side error worth recording: an early `navigate` call retargeted the tab in which
the owner already had `qa-build.html` open, destroying the one working state that existed. It
could not be restored, for reason 1. Check `tabs_context_mcp` before navigating a tab that is
not yours.

## Desktop Result

**PASS (owner-attested)** — 1280×900 inspected by the owner, no problems reported. Not assistant-verified.

## Tablet Result

**PASS (owner-attested)** — 768×1024 inspected by the owner, no problems reported. Not assistant-verified.

## Mobile Result

**PASS (owner-attested)** — 390×844 inspected by the owner, no problems reported. Not assistant-verified.

## Visual Bugs Found

**None reported by the owner at any of the three viewports.** The assistant found none because
the assistant saw none — that half of the record carries no information.

## Bugs Fixed

None. No code was changed in M12.

## Bugs Deferred

Unchanged from M11 and still open: the failed-post-test-completes-the-day design conflict
(owner decision, not a defect); 22 lucide `<svg>` elements per view without `aria-hidden`; no
focus trap, with 15 controls tabbable behind the open mobile drawer; future-dated completions
handled correctly but never explained on screen.

## Accessibility Findings

**None from this session.** The keyboard pass was not executed. In particular, the question
M11 explicitly left open — *are the `focus-visible:ring` styles actually drawn on screen?* —
remains unanswered. The code is correct; whether it renders has still never been seen.

## Screens/Views Tested

Owner-attested across the three viewports; which individual views were opened was not recorded.
Assistant-observed: none.

## Automated Verification After QA

`verify.mjs`: **6,586 assertions pass.** `tsc --noEmit`: **0 diagnostics.** Both unchanged,
because no code was touched. Reported for completeness, not as evidence of anything visual.

## Remaining Risks

- **The visual layer of a 28-day, 169-question application has never been seen by anyone at any
  viewport.** Two consecutive milestones have now been spent on it without result. Every claim
  the project makes about responsive behaviour rests on Tailwind class names that no one has
  watched render.
- Specific unknowns that only pixels can settle: whether the five-tile stat grid survives a
  390px viewport; whether the amber recap block's `dt`/`dd` glossary wraps acceptably when
  narrow; whether long English lesson prose overflows; whether post-test radio labels stay
  legible; whether the drawer overlays cleanly.
- The blocker is process, not engineering. Repeating the browser-automation attempt without
  first changing the file-access permission will fail in exactly the same way a fifth time.

## Seeding snippet for reaching Days 20–28 (paste in DevTools Console, then reload)

```js
(async () => {
  const s = { version: 1, startDate: null, lessons: {}, tests: {} };
  const d = new Date(); const iso = (x) => x.toISOString().slice(0, 10);
  const back = (n) => { const t = new Date(d); t.setDate(t.getDate() - n); return iso(t); };
  s.startDate = back(30);
  for (let n = 1; n <= 27; n++) {
    const date = back(28 - n);
    s.lessons[n] = { completedAt: date, segments: { 0: date, 1: date, 2: date, 3: date, 4: date } };
    s.tests[n] = { attempts: [{ date, correct: 6, total: 6, pct: 100, passed: true, detail: [] }] };
  }
  localStorage.setItem("ai-learning-os-v1", JSON.stringify(s));
  location.reload();
})();
```

## NEXT ACTION

**The owner captures the screenshots manually and pastes them into the next session.** Open
`qa-build.html`, press F12, then Ctrl+Shift+M for the device toolbar, and capture nine images:
1280×900 (Dashboard, one lesson), 768×1024 (Dashboard, Resources), and 390×844 (Dashboard,
drawer open, lesson recap block, post-test). This is one round trip, requires no extension
permissions, and produces exactly the evidence two milestones have failed to obtain.


---

# 34. M13 — END-OF-CURRICULUM STATE

## Reproduced first

With all 28 days complete, the dashboard kept presenting **Day 28 as "Today's learning · Fri,
Aug 14"** with a Completed pill and a single "Retake post-test" button, forever. Two things
wrong at once: finished work shown as pending, and no acknowledgement that the written
curriculum had been finished at all. Reproduced in the M11 harness by seeding 28/28 —
which is the first time that harness has paid for itself on a bug it was not written for.

## Fixed

`DashboardView` now branches on `allWritten = CURRICULUM.every(d => dayCompleted(state, d.day))`.
When true, the "Today's learning" card is replaced by a completion card that states:

- what was actually finished — 28 lessons, 169 post-test questions, longest streak;
- **both progress figures side by side**, written 100% against roadmap 41%, with the amber tile
  on the roadmap number rather than the flattering one;
- a sentence explaining why they differ, and that the gap is subject areas with no lessons yet;
- three next actions that are all *work*, not celebration: the review list, the resource list,
  and rereading the last day.

The wording deliberately refuses the badge framing — "not a certificate, but real ground
covered", "finishing here is not the same as knowing the field". A learning tool that congratulates
someone for finishing 41% of its own roadmap would be lying to them.

## Verified

- 28/28 renders the completion card; all three CTAs navigate correctly (review, resources,
  lesson); one `h1`, no console output.
- **27/28 and 0/28 are unaffected** — the normal "Today's learning" card still shows, active
  day still resolves. The regression risk of a new top-level branch was the thing to check.
- Full M11 suites re-run: learner flow, persistence round trip and heading hierarchy all
  unchanged.
- `verify.mjs` **6,586 assertions pass**; `tsc --noEmit` **0 diagnostics**.
- `qa-build.html` rebuilt so the new card can be seen in a browser.

## Known items — status

Closed: end-of-curriculum state. Still open and not touched: 6 subcategories with no learning
days; 6 legacy resource URLs unverified; the failed-post-test-completes-the-day design conflict
(owner decision); focus trap; icon `aria-hidden`; L-8; L-9; and whether focus rings render.

## NEXT ACTION

**Decide the failed-post-test question.** It is the last thing in the app that is internally
inconsistent rather than merely unfinished: submitting a 0% test completes the day, unlocks the
next one and extends the streak, while the interface says "Pass mark 70%" and shows a
Passed/Not passed pill. One of the two is wrong. Either the rule changes to require a pass, or
the copy stops implying one. It is a one-line change once decided, and it is a decision the
owner has to make — the assistant should not quietly pick a learning model on their behalf.

---

# 35. M14 — POST-TEST PASS REQUIREMENT

## Owner Decision

A learner must score at least `CONFIG.passThreshold` (70%) on a day's post-test for that day
to count as complete. This is the decision M13's NEXT ACTION left open: the interface already
said "Pass mark 70%"; the completion rule now matches it instead of contradicting it.

## Previous Behavior

`dayCompleted` = `lessonDone AND testDone` — any submitted attempt, at any score, completed the
day. A 0% submission unlocked the next day, counted toward the streak, and contributed a
completion date. The score only affected labels (`gradeTest`'s `passed` flag, the Passed/Not
passed pill) and the `mastery` string — it never gated progression. §12 point 4 and §33's "Bugs
Deferred" both named this as the one remaining internal inconsistency: the code's own rule and
the on-screen "Pass mark 70%" copy described two different systems.

## New Behavior

`dayCompleted(state, n)` = `lessonDone(state, n) AND testPassed(state, n)`, where
`testPassed` = `bestPct(state, n) >= CONFIG.passThreshold`. Concretely:

- `testDone` is unchanged in meaning ("an attempt exists") — the UI still reads it for
  "submitted" / "Retake post-test" labelling, which is a different question from passing.
- `testPassed` is new: true only when the **best** attempt clears the threshold.
- `dayCompleted` now requires both the lesson and a passing best score.
- `dayStatus` (locked / not-started / in-progress / completed) and `activeDayNumber` were not
  edited — both already delegate to `dayCompleted`, so gating flowed through them for free.
- 0%, 50% and 69% leave a day in `in-progress` with the next day `locked`. 70% and 100% mark the
  day `completed` and unlock the next. Lesson-incomplete + 100% stays incomplete (`testPassed`
  requires `lessonDone` via `dayCompleted`'s `AND`, so a passed test alone changes nothing).

## Best Score / Retake Behavior

Unchanged and reused, not reimplemented: `bestPct` already took the max across all attempts, and
`testPassed` is defined on top of it rather than on the latest attempt or the stored `passed`
flag. Consequences, all asserted in `verify.mjs`:

- 80% then 50%: `bestPct` stays 80, the day stays complete, the next day stays unlocked. A weak
  retake can never revoke a day already earned.
- 40% then 80%: incomplete after attempt 1, complete after attempt 2. The day is gated on the
  best score reached so far, not the most recent one.
- Failed attempts are never dropped, edited, or excluded from history, `normalizeState`, or
  analytics — `conceptStats` and `reviewItems` still read every attempt (`conceptStats` the most
  recent, per M5/M3's recency design; `reviewItems` derives from it). A failed attempt still
  earns its proportional `dayCredit` (`lessonWeight` + `testWeight * pct/100`) — knowledge credit
  reflects the score reached, completion reflects whether it cleared the bar. These are now two
  different questions with two different answers, which is the point of this milestone.

## Completion Date / Streak

`completionDate(state, n)` returns `null` unless `dayCompleted` is true, and when it is, the
qualifying event is **the first attempt whose `pct >= CONFIG.passThreshold`** — found with
`attempts.find(a => a.pct >= threshold)`, not `attempts[0]`. This was the one place a naive
implementation could get subtly wrong: dating completion to the first attempt regardless of
whether it passed. Verified cases:

- Fail (40%) then pass (80%): completion date is the **passing** attempt's date, not the failed
  first attempt's. The day was incomplete between the two attempts and only became complete —
  and only entered the streak — on the passing date.
- Pass (85%) then a weaker retake (40%): completion date is unchanged, still the original passing
  attempt's date. The failed retake does not revoke completion or move the date.
- `streakStats` consumes `completionDates`, so it inherits this for free: a failed test creates no
  completion event and does not extend the streak (`total`/`current`/`todayDone` all stay at their
  pre-attempt values); a passing test creates exactly one event and can start or extend the streak;
  a failed day in the middle of an otherwise-perfect run breaks the run (asserted with a 3-day
  sequence where day 2 is failed: `total` 2, `current` 1, day 3 stays `locked` even though it has
  data, because gating was never about whether a record exists).

## Tests

No new test framework — everything added lives in the existing `verify.mjs`. Previous total
6,586 → **6,690** assertions (+104), in a new `group("pass requirement")` (§QA/verify.mjs:200–381)
plus one inverted assertion in the existing `progression` group (`failedTest` no longer completes
the day, §QA/verify.mjs:193–196). New builders: `attemptAt` (constructs an attempt at an exact
percentage, since a 6-question quiz cannot literally score 69%), `withDay`/`oneDay`
(lesson+attempts in one call, with a per-attempt `date` override), `perfectThrough` (a perfect run
up to a given day, for the tail-of-curriculum cases). Coverage against the 20-item list in the
brief: threshold boundaries (0/50/69/70/100, both via `dayCompleted` and `testPassed`), locking
both directions, lesson-incomplete-but-passed non-completion, lesson-complete-and-passed
completion, no-completion-date-on-fail, completion-date-on-pass, pass-then-fail-retains-completion,
fail-then-pass-completes, `bestPct` in both attempt orders plus a 3-attempt case, attempt-history
and `normalizeState` preservation (including that failed attempts still feed `conceptStats` and
`reviewItems`), streak non-inflation on fail and correct extension on pass, a broken-run streak
case, `dayCredit`/`knowledgeProgress` non-regression, and the day-27/day-28 tail cases including
that the M13 end-of-curriculum card cannot appear while any day is failed. `DEMO_ATTEMPTS` (the
"Load demo history" seed data) is also asserted against the new rule directly from source, so a
future edit to the demo data cannot silently reintroduce a state — finished lesson, submitted
test, later days locked — that normal play can no longer reach.

## Verification

- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,690
  assertions** (previous baseline 6,586; +104, all new/changed for M14; 0 failures; content
  counts unchanged at 28 days / 169 questions / 58 resources / 51 verified).
- `node_modules/.bin/tsc --noEmit --allowJs --jsx react --target es2020
  APPLICATION/ai-digital-learning-dashboard.jsx` → **0 diagnostics**, exit 0. The check was
  validated against a live negative control this session (a syntax error injected into a scratch
  copy at the post-test-copy line was correctly reported as `TS1005`), not trusted blind.
- No files were changed to produce these numbers — this session found the pass-requirement logic,
  the UI copy, and the 104 regression assertions **already present** in both
  `APPLICATION/ai-digital-learning-dashboard.jsx` and `QA/verify.mjs`, comment-tagged `M14`
  throughout (e.g. `dayCompleted`, `completionDate`, and three UI sites carry inline `/* M14: ... */`
  notes explaining the before/after). This state file was the only thing out of sync: §14 still
  read M12, and §34's NEXT ACTION still posed the pass-requirement question as open. This entry
  closes that gap. Nothing here should be re-implemented.

## Remaining Issues

Unrelated to M14 and untouched by it: the 6 legacy unverified resource URLs (§10/M10), 6
subcategories with no learning days (§3/§6), the unrendered-visual-layer risk from M11/M12
(owner-attested only, never assistant-observed), the incomplete focus trap and missing
`aria-hidden` on decorative icons (§11 L-11, §33), and L-8/L-9 (accepted product limitations).
None of these were in scope for this session and none were touched.

## Current Checkpoint

See §14, updated to M14 in this entry.

## NEXT ACTION

**Owner-run render/interaction check of the new pass-gated flow**, mirroring the M11 protocol:
seed or reach a day, submit below 70% and confirm the day stays locked/incomplete on screen with
the "Belum lulus" copy, then submit a passing retake and confirm the next day unlocks — the logic
and copy are verified at the data layer (`verify.mjs`) but, consistent with every prior milestone
in this project, have not been seen rendered in a real browser.

**Superseded by §36.** The render check above was never performed before this NEXT ACTION was
acted on — the owner opened the existing `qa-build.html` and found the real-browser bug §36
describes. §35's claims about the *source file* were correct and remain correct; its NEXT ACTION
did not anticipate that the artifact the owner would open was not a rebuild of that source.

---

# 36. M14.1 — REAL-BROWSER PROGRESSION BUG

## Reported

The owner completed the Day 1 lesson, submitted the Day 1 post-test, scored 17% (1/6), and could
still reach Day 2. The result screen also showed retired copy: *"The day still counts and your
streak is safe. A score below 70% flags the weak concepts for review rather than blocking you."*
Both are exactly the pre-M14 behaviour §33/§34 documented as a known, deferred issue and §35
reported fixed.

## Root Cause

**Not a code defect in `APPLICATION/ai-digital-learning-dashboard.jsx`.** That file was
re-inspected line by line this session and is unchanged from §35: `dayCompleted(n) =
lessonDone(n) && testPassed(n)`, `testPassed(n) = bestPct(n) >= CONFIG.passThreshold`, and every
gating path (`dayStatus`, `activeDayNumber`, `PathView`'s `disabled={locked}`) reaches
`dayCompleted` — none of them, and no other function, uses `testDone` (attempt-exists) as a
completion proxy anywhere in the source.

The bug was in **`QA/qa-build.html`**, the standalone browser artifact from M11/M12. It is what
the owner actually had open. Decompiling its minified bundle found the literal pre-M14 rule still
live in the artifact:

```
function Ha(e,a){return pa(e,a)&&Zn(e,a)}   // Ha = dayCompleted, pa = lessonDone, Zn = testDone
```

— `dayCompleted` gated on **lesson done AND an attempt existing**, with no score comparison
anywhere in the function. `qa-build.html` was built once, during M11/M12, from the source as it
stood *before* M14 (and before M13). Every milestone since — M13's end-of-curriculum card, M14's
pass requirement — changed `APPLICATION/ai-digital-learning-dashboard.jsx` and `QA/verify.mjs`
correctly, and never touched or regenerated `QA/qa-build.html`, because nothing in the M13 or M14
task briefs mentioned it and no process re-derives it automatically. `verify.mjs` never had a
chance to catch this: by design (its own docstring) it slices Layers 1–2 out of *the one file it
is given* and has no knowledge that a second, independently-served copy of that logic exists on
disk.

## Fix

**No changes to the application source.** Two things were added, both scoped to the QA layer:

1. **`QA/build-entry.jsx`** — a five-line entry point that imports the real, default-exported
   `LearningDashboard` from `../APPLICATION/ai-digital-learning-dashboard.jsx` (a live import, not
   a copy) and mounts it via `react-dom/client`'s `createRoot`.
2. **`QA/build.mjs`** — bundles that entry point with `esbuild` (`bundle: true, minify: true,
   format: "iife"`) and wraps the output in the same self-contained HTML shell the artifact
   already used (Tailwind from CDN for styling only; React, ReactDOM, lucide-react and the app
   itself inlined into one `<script>`). Running `node QA/build.mjs` regenerates
   `QA/qa-build.html` from the current source in about a second.

`react`, `react-dom`, `lucide-react`, `esbuild`, `@types/react` and `@types/react-dom` were added
as devDependencies to build and type-check this — the application itself remains the buildless
single file it has always been (§12 point 2, unchanged); only the QA artifact now has a build
step. `@types/react`/`@types/react-dom` were required to keep the `tsc` diagnostic check at 0
errors: installing a real `lucide-react` package pulled in its `.d.ts`, which imports React's own
types, which were not otherwise present — without them `tsc` regressed from 0 to 2 diagnostics
(`TS7016`, both in `node_modules/lucide-react`, not in the app file). Caught and fixed within this
session before being reported below.

`QA/qa-build.html` was regenerated and decompiled again to confirm the fix landed in the artifact,
not just in the build script's intent:

```
function Jn(e,a){let t=_a(e,a);return t!==null&&t>=W.passThreshold}   // Jn = testPassed
function It(e,a){return Ra(e,a)&&Jn(e,a)}                              // It = dayCompleted
```

`dayCompleted` in the rebuilt artifact is now `lessonDone && testPassed`, matching the source
exactly. The retired copy string is absent from the new build (confirmed by direct substring
search); the new build carries the M14 Passed/Not-passed pill text and Indonesian "Belum
lulus"/"Nilai minimal" copy instead (confirmed the same way — the literal `·` character is
escaped as `\xB7` by the minifier, which is why a naive substring check needs to account for
that).

## Result Screen

Not touched by hand — it was already correct in the source (§35). The obsolete "day still counts
and your streak is safe" line only existed in the stale bundle and is gone now that the bundle is
rebuilt. The screen a learner actually sees, once `qa-build.html` is reopened, is the one §35
described: "Not passed · needs 70%" pill, "Belum lulus. Nilai minimal 70%. Hari ini belum selesai
dan hari berikutnya masih terkunci" for a fail, "Passed · threshold 70%" / "Lulus. Hari ini selesai
dan hari berikutnya terbuka" for a pass, and — for a failed retake after an earlier pass — the
already-earned-day copy that explicitly does not treat the retake as a loss.

## Review Behavior

**Confirmed unchanged and untouched.** `conceptStats` still reads only the most recent attempt of
each day (M5/M3's recency design) and drives `reviewItems`; `bestPct` (max across all attempts)
still drives `dayCredit`/`knowledgeProgress`/`dayCompleted`. These were two different questions
before this session and are still two different questions: an 80% then a 50% retake produces
`bestPct = 80` (day stays complete, Day 2 stays unlocked) while the 50% is what `conceptStats`
sees for review-flag purposes. No line in `ReviewView`, `conceptStats`, or `reviewItems` was
read, let alone edited, this session.

## Tests Added / Updated

Extended `QA/verify.mjs` with a new group, `"progression path integrity"` (+6 assertions, 6,690 →
**6,696**):

- Four assertions build one state (`oneDay([PASS - 1])`, a submitted attempt below the pass mark)
  and check it directly: `testDone` true, `testPassed` false, `dayCompleted` false, and
  `dayStatus(day2) === "locked"` — named explicitly as "the exact M14.1 regression" so a future
  change reintroducing `dayCompleted = lessonDone && testDone` fails immediately and legibly.
- Two assertions are new: a **QA-build-freshness check**. If `QA/qa-build.html` exists next to
  `verify.mjs`, it must (a) not contain the retired "day still counts"/"streak is safe" strings,
  and (b) have an mtime at or after the source file's mtime. If the build file is absent (e.g.
  `verify.mjs` run against an unrelated project), the check is skipped, not failed.
- Answering the brief's own question directly: the prior 104 "pass requirement" assertions (and
  the 4 new direct ones above) are **pure state-function tests (category A)** — they call
  `dayCompleted`/`dayStatus`/`testPassed` straight out of Layer 2, sliced from *the one file
  `verify.mjs` is given*. They were never, and are not now, tests of **the complete
  learner-navigation path (category B)** — no test here clicks a button, loads a URL, or executes
  `QA/qa-build.html`. What closes the gap that let this bug ship is not a B-category test (none
  was added; none is possible without a real browser/DOM runner, which this project does not
  have) but the freshness check: it cannot verify the artifact behaves correctly, only that it is
  not stale relative to a source that verify.mjs has already fully checked.
- Both new checks were mutation-tested against the actual failure mode, not assumed to work:
  the retired-copy string was reinserted into a scratch copy of the build → 1 assertion failed,
  naming exactly that string; the build's mtime was set to 2020-01-01 → the freshness assertion
  failed, naming the required command. Both were restored (`node QA/build.mjs`) and the suite
  returned to a clean pass before this report was written.

## Verification

- Previous (post-M14): **6,690 / 6,690** assertions passing.
- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,696
  assertions** (+6, all new this session; 0 failures; 28 days / 169 questions / 58 resources / 51
  verified unchanged).
- `node_modules/.bin/tsc --noEmit --allowJs --jsx react --target es2020
  APPLICATION/ai-digital-learning-dashboard.jsx` → **0 diagnostics** (re-run after adding
  `@types/react`/`@types/react-dom`, which were needed to clear a 2-error regression the
  `lucide-react` install introduced and which was caught and fixed within this session, not left
  in the report as a loose end).
- `node QA/build.mjs` → rebuilds `QA/qa-build.html` (502.6 KB) from the current source in ~1s;
  re-run twice this session with identical, clean results both times.

## Browser Verification

**Automated verification complete; real-browser verification still requires owner confirmation.**
No browser interaction was performed by the assistant this session. What was verified instead,
short of that: the rebuilt bundle's own minified source was decompiled and read directly, and its
`dayCompleted`/`testPassed` logic was confirmed byte-for-byte equivalent in structure to the
source file's — this is strong evidence the fix is correct, but it is not the same as watching
the three scenarios below happen on screen. None of A, B, or C has been observed:

- **A.** Day 1 complete → submit 17% → Day 2 remains LOCKED.
- **B.** Retake → score ≥70% → Day 2 becomes UNLOCKED.
- **C.** 80% → retake 50% → Day remains completed, Day 2 remains unlocked.

**Update — see §37.** The owner has since run all three scenarios against the rebuilt
`QA/qa-build.html` and reported PASS on each. That is an owner attestation, not an
assistant-executed test, exactly as this section anticipated; §37 records what was reported and
what that claim does and does not cover. This paragraph is left as originally written — it was
true when written — rather than edited to claim the assistant performed browser testing it did not
perform.

## State Safety

No learner progress was touched. This session never read, wrote, or reset `window.storage`,
`localStorage`, or any saved state file — the owner's real 17% attempt and whatever else is in
their saved progress (in their browser's storage for `qa-build.html`, or in the artifact host's
`window.storage` for the hosted version) is exactly as it was before this session, because nothing
here executed in a browser context at all. The only files changed are listed under Fix and in the
State File section below.

## State File

This entry. §14 updated to point at M14.1 instead of M14; §35 (M14) left intact as history with a
pointer added at its NEXT ACTION noting it was superseded, per instruction not to delete or
rewrite prior milestones.

## Remaining Issues

- ~~Real-browser verification (A/B/C above) is still outstanding~~ — **done, see §37: PASS on
  all three, owner-attested.**
- The owner should discard the previously downloaded `qa-build.html` (in `Downloads\files
  5\qa-build.html` per §33) and use the freshly rebuilt one — the old download is the exact
  artifact that caused this bug and will keep causing it if reopened.
- `QA/qa-build.html` will go stale again the moment `APPLICATION/ai-digital-learning-dashboard.jsx`
  changes and nobody runs `node QA/build.mjs`. The new `verify.mjs` freshness check catches this
  *if verify.mjs is run afterward* — it does not run itself automatically. There is no pre-commit
  hook or CI in this project (single-file artifact, no repo tooling) to force that; it remains a
  manual step, now at least a checkable one.
- Everything listed as remaining in §35 (6 legacy resource URLs, 6 empty subcategories, focus
  trap, icon `aria-hidden`, L-8/L-9) is unchanged and untouched by M14.1.
- `esbuild`'s postinstall script was blocked by this environment's `allow-scripts` policy; the
  prebuilt binary it ships still worked (`esbuild --version` succeeded, and the actual bundling
  ran and produced correct output), so this was not a blocker, but is recorded in case a future
  `npm install` in this repo behaves differently.

## NEXT ACTION

~~Owner opens the newly rebuilt `QA/qa-build.html`... and runs scenarios A, B, and C above~~ —
**superseded, see §37.** The owner has completed this. M14 and M14.1 are both closed as of §37;
the next milestone is queued in §38 (resource verification), not started.

---

# 37. M14.1 CHECKPOINT CLOSE — OWNER BROWSER VERIFICATION

## Scope of this entry

No application logic, `QA/verify.mjs`, or `QA/qa-build.html` was touched in this session. This
entry only records owner-reported results against the artifact M14.1 rebuilt, and closes the
checkpoint. Where §36 said browser verification was outstanding, this section is the resolution.

## Owner Decision (restated for this checkpoint)

Unchanged since M14 (§35): a day is complete only when (1) the lesson is complete, (2) at least
one post-test attempt exists, and (3) the best qualifying post-test score is `>= CONFIG.passThreshold`
(70%). `<70%` → incomplete, next day locked, no completion event, no streak credit, retake
available. `>=70%` → complete (lesson permitting), next day unlocked. Threshold unchanged at 70%.

## Automated Verification (M14 + M14.1, unchanged from §36)

- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **6,696 / 6,696 assertions
  PASS** (6,586 pre-M14 baseline → +104 M14 "pass requirement" → +6 M14.1 "progression path
  integrity"). 0 failures.
- `tsc --noEmit --allowJs --jsx react --target es2020` on the application file → **0 diagnostics**.
- Both numbers are exactly as reported at the close of M14.1; neither was re-run with code changes
  in this session, since none were made.

## Root Cause (restated for this checkpoint)

The 17%-reaches-Day-2 bug was never in `APPLICATION/ai-digital-learning-dashboard.jsx` — that file
had the correct `dayCompleted = lessonDone && testPassed` rule since M14. It was in
`QA/qa-build.html`, the standalone browser artifact from M11/M12: a bundle frozen before M13 and
M14 existed, still computing `dayCompleted = lessonDone && testDone` (attempt exists, any score).
`verify.mjs` could not have caught this by design — it only ever inspects the single `.jsx` file it
is given and had no knowledge that a second, independently-served copy of the same logic existed
on disk. Fix (M14.1): `QA/build.mjs` + `QA/build-entry.jsx` rebuild `QA/qa-build.html` directly
from the live source via `esbuild`; the rebuilt bundle was decompiled and its `dayCompleted` logic
confirmed to require `testPassed`, not just `testDone`.

## Browser Verification: PASS — owner-attested

**Browser verification: PASS — owner-attested.** The owner ran all three required scenarios
against the freshly rebuilt `QA/qa-build.html` (not the stale download) and reported the following.
This is an owner attestation, not an assistant-executed test — no screenshot was retained by the
assistant and no per-step trace was captured; it is real evidence (a person interacted with the
running artifact) but, consistent with every prior owner-attested result in this project (§33's
M12 desktop/tablet/mobile attestation), it cannot be independently re-examined by a later reader.

### Scenario A — Failed post-test (<70%)
Day 1 lesson completed, post-test scored below 70%. Observed: Day 1 remained incomplete;
failed-test UI displayed; retake remained available; streak received no completion credit; Day 2
remained **LOCKED** in Learning Path. **RESULT: PASS.**

### Scenario B — Passing post-test (>=70%)
Day 1 retaken and passed. Observed: Day 1 became complete; current streak became 1 day; learning
days became 1/28; today showed 60/60 min with the day marked complete; the dashboard advanced to
Day 2; Day 2 became available/unlocked; Day 2's own post-test remained locked until Day 2's lesson
is completed (the lesson-then-test ordering within a day is unaffected by M14/M14.1 and is working
as designed). **RESULT: PASS.**

### Scenario C — Passing day, then a failed retake (<70%)
A previously-passed Day 1 was retaken and scored below 70%. Observed: Day 1 remained completed;
the previously earned completion was **not** revoked; Day 2 remained unlocked; latest-attempt
Review behaviour remained intact (the failed retake is available to Review's recency logic);
best-score behaviour remained intact (the earlier passing score still governs progression credit).
**RESULT: PASS.**

## Review Behavior

Confirmed by the owner's Scenario C report, not just by code inspection: a failed retake after an
earlier pass surfaces in latest-attempt Review flagging without touching best-score-driven
progression or revoking the earned day. `ReviewView`, `conceptStats`, and `reviewItems` were not
read or modified in this session, consistent with the standing instruction not to redesign Review.

## State File

This entry (§37). §14's checkpoint block updated to record M14 and M14.1 as both **COMPLETE**,
with automated results (6,696/6,696, tsc 0) and the owner-attested browser-verification label
stated exactly as `"Browser verification: PASS — owner-attested"` — not claimed as
assistant-executed. §35 and §36 preserved verbatim as history; §36's "Browser Verification",
"Remaining Issues", and "NEXT ACTION" subsections received short superseding notes pointing to
this entry, in the same style used when §35 was superseded by §36, rather than being rewritten.

## Remaining Issues (unrelated to M14/M14.1, unchanged)

- **6 legacy resource URLs remain unverified** — queued as the next milestone in §38, not started
  this session. `verify.mjs` has no assertion about whether any resource URL resolves and cannot
  have one; this remains a fact to note, not a defect to fix here.
- 6 subcategories still have no learning days written (local-ai, app-dev, analytics, multimedia,
  vr, auto-projects) — §3/§6, untouched.
- Wider visual/layout verification (spacing, breakpoints, whether `focus-visible:ring` actually
  renders) — §11 L-11, §32 M11, §33 M12 — still not assistant-observed. The three scenarios above
  are progression/logic checks, not a layout or accessibility pass; they should not be read as
  closing that separate, still-open item.
- Focus trap incomplete, decorative icons not `aria-hidden` — §11 L-11, unchanged.
- L-8, L-9 (accepted product limitations) — unchanged.

## Next Milestone

**Resource verification / resource audit — queued, not started.** See §38.

---

# 38. RESOURCE VERIFICATION QUEUE (queued — not started this session)

Six resources have carried `verified: false` since M9/M10 and were never revisited (§10 M10
entry: "4 of the 9 remain unchecked... Two M9 entries were never opened either"). Restated here as
the explicit next-milestone queue, per this checkpoint's instruction — **no URL was opened, no
`verified` flag was changed, and no resource content was edited in this session.**

| # | Resource | Day | Subcategory | Status carried forward |
|---|---|---|---|---|
| 1 | SkillsBuild | Day 13 | ai (AI Foundations) | ~~`verified: false` — never opened~~ **opened in M15 Batch 1 (§39): platform confirmed active, specific course content unconfirmed (JS-rendered catalog). Still `verified: false`, reason now documented in-app.** |
| 2 | Pinecone vector database guide | Day 18 | embeddings/vector search | ~~`verified: false` — never opened~~ **VERIFIED in M15 Batch 1 (§39): `verified: true`, content checked claim-by-claim against the article.** |
| 3 | UNESCO / UNESDOC PDF | Day 23 | elearning | ~~`verified: false` — the linking page was opened in M8, the PDF itself was not~~ **attempted in M15 Batch 2 (§40): unesdoc.unesco.org blocks automated fetch tools domain-wide (HTTP 403, confirmed on both the document path and the domain root). Still `verified: false` — this is a tooling block, not confirmation the file is gone.** |
| 4 | ADLNet / xAPI Specification (GitHub repo) | Day 24 | lms | ~~`verified: false` — appeared in search results, never opened~~ **VERIFIED in M15 Batch 2 (§40): `verified: true`, repo and structure confirmed against the summary, with a version-currency caveat added (repo holds v1.0.3; the current v2.0 IEEE page could not itself be opened — HTTP 418).** |
| 5 | OWASP Top 10 — Indonesian translation | Day 26 | security | ~~`verified: false` — the OWASP page was opened in M9, this linked translation was not~~ **VERIFIED in M15 Batch 3 (§41): `verified: true`. The stored URL is OWASP's own redirect to the canonical page; the redirect target was opened directly and its 10 risk categories, language and terminology all confirmed against the summary.** |
| 6 | n8n key-concept glossary | Day 27 | automation | ~~`verified: false` — the n8n "first workflow" page was opened in M9, this linked glossary was not~~ **VERIFIED in M15 Batch 3 (§41): `verified: true`. Opened directly; content is broader than the old summary described (includes AI/LLM terms, not just 6 basic ones) — summary corrected to match.** |

**Standing note, carried forward and not to be dropped:** `verify.mjs` asserts content
integrity, progression, grading, streak, progress, mastery, review, normalisation and legacy
compatibility — it has no mechanism to check whether a URL resolves, and by its own documented
scope (Layers 1–2 of a single `.jsx` file) never will. Resource-URL truth is established only by
actually opening each page in a session with working network egress and reading it, exactly as
M8/M9/M10 did for the resources they cleared. §10's M10 entry also recorded the cost lesson worth
repeating here: the binding constraint on a verification session is response size per fetch, not
call count — budget roughly two URLs per session, not all six at once.

**Explicitly out of scope for this checkpoint:** opening any of the six URLs, changing any
`verified` flag, or editing any resource summary. This section exists only to make the queue
visible and preserve the count (58 resources, 51 verified, 7 false — wait, the table above lists
6; the 7th `verified: false` entry, Day 17's Anthropic prompt-engineering resource, was
intentionally downgraded in M10 for a different reason — see §10 M10 "Found while auditing, not
on the list" — and is not part of this six-item back-verification queue).

---

# 39. M15 BATCH 1 — RESOURCE VERIFICATION (2 of 7 unverified resources)

## Scope

Exactly two resources opened and checked this session, per instruction. The other five
(UNESCO/UNESDOC PDF, ADLNet/xAPI Spec, OWASP Indonesian translation, n8n glossary, Day 17
Anthropic) were **not** opened, not touched, and remain queued — see §38 (updated below) for
their unchanged status. No Gemini research file was read or integrated; the source of truth for
both URLs and existing metadata was the live `resources` array in
`APPLICATION/ai-digital-learning-dashboard.jsx` itself, not the `GEMINI RESEARCH/` package (per
§17.1, that package audits a curriculum that does not match this app and was already excluded
from resource decisions in M2/M9/M10).

## Resource 1 — SkillsBuild

| Field | Value |
|---|---|
| Location in app | Day 13 ("Machine Learning: Data, Training, Evaluation"), resource index 1 |
| Stored title | "Introduction to Machine Learning" |
| Stored source | IBM |
| Original URL | `https://skillsbuild.org/` |
| Opened | Yes — homepage, and the on-page AI-catalog link `/learning-catalog?topic=ai` (an actual link found on the page, not invented) |
| Resolution | Resolves cleanly, no redirect. Confirmed to be the genuine IBM SkillsBuild platform |
| Source status | **Active.** Real IBM platform, free, offers AI/ML learning paths generally ("a head start in areas like generative AI, machine learning, and more") |
| Content relevance | **Could not be confirmed at the specific-course level.** The learning catalog is a JavaScript-rendered single-page application; two separate fetches of the catalog page (rendered view, then a request for any embedded JSON/`__NEXT_DATA__`) returned only navigation shell, no course titles. Whether a course titled or equivalent to "Introduction to Machine Learning" covering supervised/unsupervised/reinforcement learning types, an ML project workflow, and industry examples (the four claims in the existing `inti` summary) actually exists at this URL was **not established either way** |
| Decision | **NOT VERIFIED — fits none of the four categories cleanly.** Not INVALID/REPLACE (the platform is real and topically correct); not ARCHIVED (nothing suggests retirement); not VERIFIED or VERIFIED-MOVED (the specific claimed content could not be read). Left as the closest honest fit: unverified, with the reason now explicit instead of implicit |
| Action taken | `verified` flag **left `false`** (no change). The Indonesian `apa` summary was corrected to state precisely what was and was not confirmed this session, and why (JS-rendered catalog, unreadable by automated fetch), so a future session does not have to re-discover the same tooling limitation. The `inti` bullets, `kenapa`, `hubungan`, title, source, difficulty and minutes fields were **not** touched — there is no evidence they are wrong, only that they are unconfirmed |
| Evidence | Two `WebFetch` calls to `https://skillsbuild.org/` (homepage content, then redirect/nav-link check) and two to `https://skillsbuild.org/learning-catalog?topic=ai` (rendered view, then raw-source/JSON check) |
| Remaining uncertainty | Whether the specific course content matches the summary. Resolvable only by a session that can execute the catalog's client-side JavaScript (a real browser, not `WebFetch`) or by manually navigating the catalog UI |

## Resource 2 — Pinecone vector database guide

| Field | Value |
|---|---|
| Location in app | Day 18 ("Embeddings and Vector Search"), resource index 0 |
| Stored title | "What is a vector database?" |
| Stored source | Pinecone |
| Original URL | `https://www.pinecone.io/learn/vector-database/` |
| Opened | Yes |
| Resolution | Resolves directly, confirmed via fetched content (no redirect indicated) |
| Source status | **Active.** Official Pinecone educational article, "What is a Vector Database & How Does it Work? Use Cases + Examples," published 2023-05-03, by Roie Schwaber-Cohen — a real byline on Pinecone's own domain |
| Content relevance | **Confirmed to match the stored summary closely and specifically**, not just topically. The article covers: vectors indexed and searched by similarity (matches `inti[0]`); cosine similarity / Euclidean / dot-product distance measures (matches `inti[1]`, "cosine similarity"); ANN algorithms (HNSW, PQ, LSH) for approximate nearest-neighbour search at scale (matches `inti[2]`, "Indeks perkiraan (ANN) mempercepat pencarian skala besar"); pre-/post-filtering by metadata (matches `inti[3]`, "Metadata dipakai untuk memfilter hasil"). All four `inti` claims independently verified against the actual article content, not assumed |
| Decision | **VERIFIED.** All four category-1 conditions met: URL confirmed, source identity confirmed (Pinecone's own domain and author), content matches the intended topic exactly (checked claim-by-claim, not just "about the right subject"), and the resource remains suitable for Day 18 (embeddings/vector search) — a 2023 foundational explainer on indexing and ANN search does not go stale the way a product-specific or time-sensitive claim would |
| Action taken | `verified` flag changed **`false` → `true`**. No other field changed — title, source, difficulty, minutes, and the full Indonesian summary block were already accurate and are left as written |
| Evidence | One `WebFetch` call to `https://www.pinecone.io/learn/vector-database/` requesting title, publish date, publisher, and a content summary sufficient to check against the four `inti` bullets |
| Remaining uncertainty | None material. The article could be revised in place in the future without the URL changing (Pinecone does not appear to date-stamp updates beyond the original publish date in what was fetched), which is a generic risk for any web resource, not specific to this one |

## Changes Made

Two edits to `APPLICATION/ai-digital-learning-dashboard.jsx`, both inside existing resource
objects, schema unchanged:

1. Day 18, Pinecone resource: `verified: false` → `verified: true`.
2. Day 13, SkillsBuild resource: `id.apa` text replaced with an accurate statement of what M15
   Batch 1 could and could not confirm. `verified` unchanged at `false`.

No curriculum day, question, answer key, quiz, recap, or unrelated resource was touched. No file
outside the application source and this state file was edited (the `GEMINI RESEARCH/` files were
read-checked for existence only, never opened or used as data).

## Verification

**Two categories, kept explicitly separate, as instructed:**

- **Automated application QA** (checks the app's internal logic/content integrity — cannot and
  does not check whether any URL resolves): `node QA/verify.mjs
  APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,696 assertions** (unchanged
  count from M14.1 — flipping one `verified` boolean and editing one Indonesian string does not
  add or remove any assertion; the verified-count *summary line* in the tool's own output moved
  from "51 verified" to **"52 verified"**, which is a report of content, not a new assertion).
  `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**. `QA/qa-build.html`
  rebuilt via `node QA/build.mjs` after the source edit, per the M14.1 freshness discipline.
- **Manual web resource verification** (checks whether the real-world resource is real, current,
  and accurately described — `verify.mjs` has no mechanism for this and none was added): the two
  `WebFetch`-based checks documented above, per resource. This is the layer that actually
  determined the `true`/`false` outcome; the automated suite could not have produced either
  result on its own.

## Resource Count

| | Before M15 | After M15 Batch 1 |
|---|---|---|
| Total resources | 58 | 58 |
| Verified | 51 | **52** |
| Unverified | 7 | **6** |
| Opened/checked this session | — | **2** (SkillsBuild, Pinecone) |
| Flipped to `verified: true` | — | **1** (Pinecone) |
| Left `verified: false` after being checked | — | **1** (SkillsBuild — checked, not confirmable this session, reason now documented) |

## State File

This entry (§39). §14 checkpoint updated: milestone line now reads "M15 Batch 1", resource count
updated to 52 verified / 6 unverified, verify.mjs/tsc results restated, NEXT ACTION points at
Batch 2 with the specific five remaining items named. §38 (the queue) is superseded for
SkillsBuild and Pinecone specifically — see the note added there — while the other five entries
in that table are carried forward unchanged, since none of them was opened this session.

## Remaining Queue

Six items remain from the original seven-item unverified count minus Pinecone (see §38, updated):
UNESCO/UNESDOC PDF (Day 23), ADLNet/xAPI Specification (Day 24), OWASP Indonesian translation
(Day 26), n8n glossary (Day 27), and the Day 17 Anthropic entry (a different case — already
downgraded with a reason recorded in M10, not part of the original six-URL queue but still
unverified). SkillsBuild is **not** fully resolved and should not be treated as closed — it was
checked, and the honest result was "cannot confirm," which is different from either the five
untouched items or from Pinecone's clean pass. Recommend a future batch specifically revisit
SkillsBuild with a tool that can execute client-side JavaScript, rather than lumping it back in
with the never-opened five.

## NEXT ACTION

**Batch 2, recommended, not started:** verify two more of the remaining six
(UNESCO/UNESDOC PDF and ADLNet/xAPI Specification are the next two in queue order from §38/§10)
using the same method — locate the exact stored URL, open it, confirm identity/currency/content
match against the existing summary, classify into one of the four categories (or document why it
doesn't fit cleanly, as SkillsBuild required this session), update only the metadata the
verification result justifies, rebuild `QA/qa-build.html`, and re-run `verify.mjs`/`tsc`. Do not
batch more than two or three per session — §10's M10 entry already found that response size per
fetch, not call count, is the binding constraint.

---

# 40. M15 BATCH 2 — RESOURCE VERIFICATION (2 more of 7 originally-unverified resources)

## Scope

Exactly two resources opened and checked this session: UNESCO/UNESDOC PDF (Day 23) and
ADLNet/xAPI Specification (Day 24) — the two named in this batch, and no others. OWASP Indonesian
translation, n8n glossary, Day 17 Anthropic, and a SkillsBuild revisit were **not** opened. No
Gemini research file was read or used; both stored URLs and existing metadata were located
directly in `APPLICATION/ai-digital-learning-dashboard.jsx` (Day 23 resource index 1, Day 24
resource index 1), same as Batch 1's method.

## UNESCO / UNESDOC — Day 23

| Field | Value |
|---|---|
| Location in app | Day 23 ("AI in Instructional Design"), resource index 1 |
| Stored title | "Guidance for generative AI in education and research (PDF lengkap)" |
| Stored source | UNESDOC |
| Original URL | `https://unesdoc.unesco.org/ark:/48223/pf0000386693_eng` |
| Actual / canonical URL | Same — this **is** UNESCO's own permanent-identifier (ARK) link, already the canonical form; no alternate or redirect target was found or needed |
| Opened | **Attempted twice**: the exact document path, and the bare domain root `https://unesdoc.unesco.org/` as a control to distinguish "this document is gone" from "this domain blocks fetching" |
| Resolution status | **Could not be retrieved.** Both attempts returned **HTTP 403 Forbidden**. The domain-root control also returned 403, confirming the block is domain-wide bot/scraper protection, not specific to this document or evidence the PDF is missing |
| Source status | **Unknown from this session — indeterminate, not "dead."** UNESCO's digital library is a real, actively maintained institutional repository; a 403 to an automated fetch tool is a common anti-scraping posture for library platforms and is not evidence of removal, migration, or retirement |
| Content relevance | **Not checked — could not be read.** The five `inti` claims (regulatory steps, ethical/pedagogical validation framework, inquiry/project-based AI use examples, special-needs learner support, IP/digital-divide issues) were neither confirmed nor contradicted |
| Verification decision | **Left unverified — does not fit any of the four categories.** Not INVALID/REPLACE (no evidence of removal — a fetch block is not a 404); not ARCHIVED (nothing suggests retirement); not VERIFIED or VERIFIED-MOVED (content unread, and there is nothing to move to — the given URL is already UNESCO's own canonical link). Same shape of outcome as SkillsBuild in Batch 1: checked, blocked, honestly reported as neither pass nor fail |
| Changes Made | `verified` **left `false`** (no change). The `hubungan` field was corrected to state precisely what M15 Batch 2 found: domain-wide 403 to automated fetch tools, confirmed by testing both the document path and the domain root, explicitly distinguished from the resource being gone. Title, source, `inti`, `kenapa`, difficulty, and minutes untouched — no evidence they are wrong, only that they remain unconfirmed |
| Evidence used | Two `WebFetch` calls: `https://unesdoc.unesco.org/ark:/48223/pf0000386693_eng` (both attempts, HTTP 403) and `https://unesdoc.unesco.org/` (control, HTTP 403) |
| Remaining uncertainty | Full content match is still unknown. This needs either a fetch tool that can present a browser-like request (defeating the anti-bot check) or a human opening the link directly — the same class of gap `WebFetch` hit on `github.com`'s IEEE-hosted counterpart below, and on SkillsBuild's JS-rendered catalog in Batch 1. Three different tooling failure modes now on record for this project: JS-rendering (SkillsBuild), bot-blocking (UNESDOC, IEEE), neither of which is a dead link |

## ADLNet / xAPI Specification — Day 24

| Field | Value |
|---|---|
| Location in app | Day 24 ("AI, the LMS and Learning Data"), resource index 1 |
| Stored title (before) | "xAPI Specification (repositori resmi)" |
| Stored source | ADL Initiative |
| Original URL | `https://github.com/adlnet/xAPI-Spec` |
| Actual / canonical URL | Same GitHub repo remains the correct link for the resource as described (a maintained historical/reference copy of the spec); see the version caveat below — this is not a URL move |
| Opened | Yes — the repository itself resolved and was read in full via `WebFetch` |
| Resolution status | **Resolves cleanly.** Real repository, `adlnet/xAPI-Spec`, owned by ADL Net (Advanced Distributed Learning Initiative) |
| Source status | **Active but superseded.** The repository is live (1,835 commits visible) and contains the xAPI specification split into three parts (About the Experience API; Experience API Data; Data Processing, Validation, and Security) — matching the stored `inti` claims about Part 2 (statement structure) and Part 3 (validation/security) exactly. However, the README **explicitly states this repository holds v1.0.3**, which is superseded, and that **the current version is xAPI 2.0**, IEEE-standardized and hosted at `opensource.ieee.org/xapi/xapi-base-standard-documentation` — a specific claim read directly from the primary source, not guessed |
| Content relevance | **Confirmed structurally** against the stored summary (three-part split, Part 2 = normative statement structure, Part 3 = processing/validation/security, JSON format, IEEE standardization exists) — all checked against the actual README, not assumed. **Not confirmed**: whether v1.0.3's specific content still matches every detail of v2.0, since the v2.0 IEEE page itself could not be opened (see below) |
| Verification decision | **VERIFIED**, with an explicit currency caveat recorded in the metadata rather than silently accepted or silently rejected. The repo, publisher, and structural content match; the caveat is that a more current normative version exists elsewhere and was not itself readable this session — this is disclosed, not hidden |
| Changes Made | `verified` flag **`false` → `true`**. Title appended with "(v1.0.3 — lihat catatan versi)" to flag the version explicitly at a glance, following the same pattern M10 used for the CS50 "Understanding Technology" resource (title-level "(arsip)" flag) rather than silently upgrading a superseded document to unqualified "official spec." `apa`, `kenapa`, and `hubungan` updated to state the version finding and the IEEE-page block precisely. `inti` bullet list kept its first three items and had the fourth ("Spesifikasi juga sudah dibakukan sebagai standar IEEE") sharpened to name the actual source (this repo's own README) and the actual URL (opensource.ieee.org), since that claim is now directly sourced rather than asserted |
| Evidence used | One successful `WebFetch` to `https://github.com/adlnet/xAPI-Spec` (repo description, README structure, version statement, IEEE pointer) |
| Remaining uncertainty | The IEEE 2.0 page itself (`opensource.ieee.org/xapi/xapi-base-standard-documentation`) could not be opened — both a direct attempt and a domain-root control (`https://opensource.ieee.org/`) returned **HTTP 418 "I'm a Teapot"**, a deliberate anti-bot response, not a 404. This is the same class of tooling block as UNESDOC's 403, on a different domain. The 2.0 page was **not** substituted as the stored URL — per instruction, a replacement is only used if it is actually verified, and this one was not |

## Changes

Two edits to `APPLICATION/ai-digital-learning-dashboard.jsx`, both inside existing resource
objects, schema unchanged:

1. Day 23, UNESDOC resource: `hubungan` text replaced with the precise 403/domain-block finding.
   `verified` unchanged at `false`.
2. Day 24, ADLNet resource: `verified: false` → `verified: true`; title appended with a version
   flag; `inti`, `kenapa`, `hubungan` updated to state the version-currency finding precisely.

No curriculum day, question, answer key, quiz, recap, or unrelated resource was touched. No file
outside the application source and this state file was edited. `GEMINI RESEARCH/` files were not
opened.

## Verification

**Two categories, kept explicitly separate, as instructed:**

- **AUTOMATED APPLICATION QA** (checks the app's internal logic/content integrity — has no
  mechanism to check whether a URL resolves and none was added): `node QA/verify.mjs
  APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,696 assertions** (unchanged
  count — the same reasoning as Batch 1: a boolean flip, a title edit, and Indonesian-text edits
  add no assertions. The tool's own content-summary line moved from "52 verified" to **"53
  verified."**). `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**.
  `QA/qa-build.html` rebuilt via `node QA/build.mjs` after the source edits, per the M14.1
  freshness discipline (confirmed fresh, not just intended fresh).
- **MANUAL WEB RESOURCE VERIFICATION** (the layer that actually determined both outcomes; no
  automated check could have produced either result): four `WebFetch` calls total — two to
  `unesdoc.unesco.org` (document path, domain-root control), two to `github.com/adlnet/xAPI-Spec`
  plus `opensource.ieee.org` (repo content, then a follow-up + domain-root control on the IEEE
  page it pointed to).

## Resource Count

| | Before M15 | After Batch 1 | After Batch 2 |
|---|---|---|---|
| Total resources | 58 | 58 | 58 |
| Verified | 51 | 52 | **53** |
| Unverified | 7 | 6 | **5** |
| Checked this batch | — | 2 (SkillsBuild, Pinecone) | **2 (UNESDOC, ADLNet)** |
| Flipped to `verified: true` this batch | — | 1 (Pinecone) | **1 (ADLNet)** |
| Checked but still `false`, reason documented | — | 1 (SkillsBuild) | **1 (UNESDOC)** |

Running total across both batches: **4 of the original 7 unverified resources have now been
opened and checked**; 2 flipped to verified, 2 remain unverified with the specific reason
recorded in-app (both are tooling limitations — JS rendering and bot-blocking respectively — not
confirmed dead links).

## Remaining Queue

Three items from the original seven-item count remain **completely untouched, never opened by
any session**: OWASP Indonesian translation (Day 26), n8n glossary (Day 27), and — a separately
flagged case, not part of the original six-URL queue — the Day 17 Anthropic prompt-engineering
entry, downgraded in M10 for a different reason (see §10 M10). SkillsBuild (Day 13) and UNESDOC
(Day 23) are checked-but-unresolved and are not the same status as these three; they need
different tooling (a JS-capable browser and a bot-block-tolerant fetcher respectively), not
just "someone opens the URL."

## State File

This entry (§40). §14 checkpoint updated: milestone line now reads "M15 Batch 2", resource counts
updated to 53 verified / 5 unverified, NEXT ACTION points at the three fully-untouched items as
Batch 3. §38's queue table updated in place for rows 3 (UNESDOC) and 4 (ADLNet) only; rows 5–6
(OWASP, n8n) left exactly as written, since neither was opened this session.

## NEXT ACTION

**Batch 3, recommended, not started:** OWASP Indonesian translation (Day 26) and n8n glossary
(Day 27) — same method, same two-per-session pace, same explicit distinction between what a fetch
confirms and what "the URL returned something" does not. The Day 17 Anthropic entry and a
SkillsBuild/UNESDOC revisit (with different tooling) remain candidates for a later batch but are
not part of the original three-item core queue and should be scheduled separately.

---

# 41. M15 BATCH 3 — RESOURCE VERIFICATION (2 more of the original 6 unverified resources)

## Scope

Exactly two resources opened and checked this session: OWASP Top 10 — Indonesian translation
(Day 26) and n8n key-concept glossary (Day 27) — the two named in this batch, and no others.
SkillsBuild, UNESCO/UNESDOC, and the Day 17 Anthropic entry were **not** revisited. No Gemini
research file was read or used. Both stored URLs and existing metadata were located directly in
`APPLICATION/ai-digital-learning-dashboard.jsx` (Day 26 resource index 1, Day 27 resource index
1), same method as Batches 1 and 2.

## OWASP Indonesian Translation — Day 26

| Field | Value |
|---|---|
| Location in app | Day 26 ("Cybersecurity Fundamentals"), resource index 1 |
| Stored title | "OWASP Top 10:2021 — terjemahan Bahasa Indonesia" |
| Stored source | OWASP Foundation |
| Original URL | `https://owasp.org/Top10/id/` |
| Canonical URL | `https://owasp.org/Top10/2021/id/index.html` — found by opening the original URL and reading its own redirect notice, not guessed or constructed. The stored URL is left unchanged: it is OWASP's own working alias for the canonical page, not a dead or third-party link, so redirecting through it is not a problem worth "fixing" by editing the stored address |
| Opened | Yes, both: the original URL (which returned a redirect notice pointing at the canonical path) and the canonical URL directly (full content) |
| Resolution status | **Resolves.** The original URL is a functioning OWASP-owned redirect; the canonical destination resolves directly with page title "Welcome Page - OWASP Top 10:2021" |
| Source status | **Active, official.** Confirmed hosted on OWASP's own domain, language selector shows "id - Indonesian," content sourced from the official `OWASP/Top10` GitHub project per the fetch |
| Content relevance | **Confirmed claim-by-claim.** All ten risk categories present and readable in Indonesian (A01 Kerusakan Akses Kontrol ... A10 Server-Side Request Forgery) — matches `inti[0]`'s "sepuluh kategori risiko lengkap." Technical terms (CVE, CVSS, CWE, Exploit, Impact, Cross-Site Scripting) confirmed kept in English inside Indonesian prose — matches `inti[1]`. Confirmed to be specifically the 2021 edition, not a newer one — matches `inti[3]` |
| Verification decision | **VERIFIED** — this is effectively a VERIFIED-MOVED case handled without a URL change: the redirect chain was followed and the canonical target independently confirmed, rather than trusting the redirect notice's stated target on faith |
| Changes Made | `verified` flag **`false` → `true`**. `inti[0]` and `inti[1]` extended with the specific confirmed detail (category range A01–A10; the specific term list). `hubungan` rewritten to document the redirect chain and that the canonical target was opened directly, replacing the old "not yet opened" note. `apa`, `kenapa`, `inti[2]`, `inti[4]`, title, source, difficulty, minutes: unchanged — already accurate |
| Evidence used | Two `WebFetch` calls: `https://owasp.org/Top10/id/` (redirect notice, pointing to the canonical path) and `https://owasp.org/Top10/2021/id/index.html` (full content, title, category list, language/terminology check) |
| Remaining uncertainty | None material for the 2021 edition as described. Standing, pre-existing note (unchanged by this session): no 2025-edition Indonesian translation exists yet, which the stored summary already discloses correctly |

## n8n Key-Concept Glossary — Day 27

| Field | Value |
|---|---|
| Location in app | Day 27 ("Workflow Automation and n8n"), resource index 1 |
| Stored title | "Key concept glossary" |
| Stored source | n8n (dokumentasi resmi) |
| Original URL | `https://docs.n8n.io/key-concept-glossary.md` |
| Canonical URL | Same — resolves directly, no redirect involved |
| Opened | Yes |
| Resolution status | **Resolves.** Confirmed official n8n documentation infrastructure (the page header references the same documentation index and `.md`-suffix convention as Day 27's already-verified "Build your first workflow" resource) |
| Source status | **Active, official.** Genuine n8n docs page |
| Content relevance | **Confirmed, but the stored summary undersold it — corrected, not just validated.** The stored `apa`/`inti` described only six basic terms (workflow, node, trigger, credential, expression, execution). The actual page is substantially broader: it defines those platform basics plus additional n8n-specific product terms (canvas, cluster/root/sub node, edition, entitlement, project, template) **and a full set of AI/LLM terms** (AI agent, AI chain, AI completion, embedding, hallucination, AI memory, RAG, reranking, AI tool, vector store, LLM) — directly relevant to this day's "AI Automation" topic tag and not mentioned in the old summary at all |
| Verification decision | **VERIFIED**, with the summary corrected to reflect the actual (richer) content rather than left describing a narrower page than what exists |
| Changes Made | `verified` flag **`false` → `true`**. `apa` and all five `inti` bullets rewritten: kept the true parts (basic vocabulary, quick-reference use, short/pre-tutorial reading), added the confirmed AI/LLM term coverage, and replaced the old claim that "many terms apply generally to other automation tools" with an accurate split — the basic vocabulary generalizes, but n8n-specific product terms (canvas, entitlement, edition) do not, which the new `inti[4]` now says explicitly instead of overclaiming generality. `hubungan` rewritten to state the correction plainly, per instruction to correct inaccurate summaries. Title, source, difficulty, minutes: unchanged |
| Evidence used | One `WebFetch` call to `https://docs.n8n.io/key-concept-glossary.md`, requesting the full list of defined terms and their definitions, which was returned in enough detail to compare term-by-term against the stored `inti` |
| Remaining uncertainty | None material. The glossary could grow or shrink over time as n8n's product does (e.g. "Evaluation" as a term suggests a relatively recent product feature), which is a generic content-drift risk for any living documentation page, not specific to this one |

## Changes

Two edits to `APPLICATION/ai-digital-learning-dashboard.jsx`, both inside existing resource
objects, schema unchanged:

1. Day 26, OWASP Indonesian-translation resource: `verified: false` → `verified: true`;
   `inti[0]`/`inti[1]` sharpened with confirmed specifics; `hubungan` rewritten to document the
   redirect-chain confirmation. URL **not** changed — the original alias still works and is
   OWASP's own.
2. Day 27, n8n glossary resource: `verified: false` → `verified: true`; `apa` and all five `inti`
   bullets corrected to describe the actual (broader) glossary content; `hubungan` rewritten.

No curriculum day, question, answer key, quiz, recap, or unrelated resource was touched. No file
outside the application source and this state file was edited. `GEMINI RESEARCH/` files were not
opened.

## Automated QA

`node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,696
assertions** (unchanged count — flipping two booleans and editing Indonesian summary text adds no
assertions; the tool's own content-summary line moved from "53 verified" to **"55 verified."**).
This is application-logic/content-integrity QA only — it has no mechanism to check whether any
resource URL resolves, and none was added this batch either.

## TypeScript

`tsc --noEmit --allowJs --jsx react --target es2020` on the application file → **0 diagnostics**.
`QA/qa-build.html` rebuilt via `node QA/build.mjs` after the source edits, per the M14.1 freshness
discipline (confirmed fresh, not just intended fresh).

**Manual web resource verification**, the separate evidence layer that actually produced both
`true` outcomes this batch: three `WebFetch` calls total (one for OWASP's redirect notice, one for
the OWASP canonical page, one for the n8n glossary page).

## Resource Count

| | Before M15 | After Batch 1 | After Batch 2 | After Batch 3 |
|---|---|---|---|---|
| Total resources | 58 | 58 | 58 | 58 |
| Verified | 51 | 52 | 53 | **55** |
| Unverified | 7 | 6 | 5 | **3** |
| Checked this batch | — | 2 (SkillsBuild, Pinecone) | 2 (UNESDOC, ADLNet) | **2 (OWASP ID, n8n glossary)** |
| Flipped to `verified: true` this batch | — | 1 (Pinecone) | 1 (ADLNet) | **2 (OWASP ID, n8n glossary)** |

Running total across all three batches: **6 of the original 6-URL back-verification queue have
now been opened and checked** (SkillsBuild, Pinecone, UNESDOC, ADLNet, OWASP ID, n8n glossary).
4 flipped to verified; 2 (SkillsBuild, UNESDOC) remain unverified with documented, non-fatal
tooling reasons. The Day 17 Anthropic entry was a separate case from the start (§10 M10) and was
never part of this six-item queue — it remains the one resource in the app with `verified: false`
that this session did not touch and that no M15 batch has yet addressed.

## Remaining Queue

One item left untouched by any M15 session: the **Day 17 Anthropic prompt-engineering entry**
(downgraded in M10 because its `verified: true` had been set in a session with no network
access — a different failure mode than "never checked"). SkillsBuild (Day 13) and UNESDOC (Day
23) are checked-but-unconfirmed, not part of the "never opened" queue, and need different tooling
(a JS-capable browser; a bot-block-tolerant fetcher) than a simple re-open.

## State File

This entry (§41). §14 checkpoint updated: milestone line now reads "M15 Batch 3", resource counts
updated to 55 verified / 3 unverified (1 never-opened + 2 checked-but-unconfirmed), NEXT ACTION
points at the Day 17 Anthropic entry as the last never-opened item. §38's queue table rows 5–6
(OWASP, n8n) updated in place; rows 1–4 left exactly as Batches 1–2 wrote them.

## NEXT ACTION

**M15 Batch 4 (final item in this queue), recommended, not started:** the Day 17 Anthropic
prompt-engineering resource — same method, same explicit AUTOMATED QA vs MANUAL WEB VERIFICATION
distinction. After that, the only unresolved resource-verification items will be the two
tooling-blocked cases (SkillsBuild, UNESDOC), which need a different capability than repeating the
same fetch, not another same-shaped batch.

---

# 42. M15 BATCH 4 (FINAL) — RESOURCE VERIFICATION: DAY 17 ANTHROPIC

## Scope

Exactly one resource opened and checked this session: the Day 17 Anthropic prompt-engineering
entry. Not revisited: SkillsBuild, UNESCO/UNESDOC. No Gemini research file was read or used. This
closes the M15 resource-verification effort — **every one of the original 7 unverified resources
has now been opened and checked** (§39 SkillsBuild + Pinecone, §40 UNESDOC + ADLNet, §41 OWASP ID
+ n8n glossary, §42 this entry).

## Day 17 Anthropic Prompt-Engineering — Verification Decision

| Field | Value |
|---|---|
| Location in app | Day 17 ("Prompt Engineering, System Instructions, Structured Output"), resource index 0 |
| Stored title (before) | "Prompt engineering overview" |
| Original URL | `https://docs.claude.com/en/docs/build-with-claude/prompt-engineering/overview` |
| Redirect evidence | Fetched directly — the server itself returned a **302 Found** with a `Location` header naming `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview` as the destination. This is a real, observed redirect, not the assumption already recorded in M10 ("documentation has migrated to platform.claude.com" — that entry was written from a *different* resource's confirmed migration, not from opening this specific URL) |
| First redirect target | `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview` — opened directly. Resolves, official Anthropic domain, but the page is now a **thin landing page** ("Before prompt engineering", "When to prompt engineer", "How to prompt engineer") that explicitly hands off: *"All prompting techniques (from clarity and examples to XML structuring, role prompting, thinking, and prompt chaining) are covered in [Prompting best practices]... That's the living reference; start there."* None of the stored `inti` claims (clarity, examples, step-by-step reasoning, output format, system instructions) are actually present as content on this page anymore |
| Canonical URL (updated) | `https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices` — the exact link the overview page itself points to as "the living reference," found by reading that page, not guessed or constructed. Opened directly and confirmed: title "Prompting best practices," structured into "Model-specific guidance," "Techniques for all current models" (general principles, output and formatting, tool use, thinking, agentic systems), and "Migration considerations" — this is where the content matching the stored summary actually lives |
| Source status | **Active, official Anthropic documentation**, current as of this session (the page names Claude Fable 5, Claude Opus 5, Claude Sonnet 5 — models that postdate the original resource entry, confirming this is the maintained current version, not an archived one) |
| Content relevance | Confirmed at the structural level: the linked page's own section list (general principles, output and formatting, thinking, agentic systems) covers the same ground as the stored `inti` bullets (clarity/specificity, examples, step-by-step reasoning, output format, system instructions). Not verified line-by-line against every sub-heading — the page is large — but the topic match is direct and stated by the source itself, not inferred |
| Verification decision | **VERIFIED — MOVED.** Two things were true at once: the M10-era prediction that docs.claude.com now "only survives via redirect" was confirmed exactly (a real 302, not assumed); *and* the redirect destination itself has been restructured since the migration, so simply updating the domain would not have been enough — the specific page with the content had moved one hop further, to a page discovered by reading the primary source's own outbound link |
| Changes Made | `verified` flag **`false` → `true`**. Stored `url` **changed** from the old docs.claude.com address to the confirmed canonical `claude-prompting-best-practices` page — not the bare overview redirect target, because that page no longer holds the content the resource is supposed to represent. Title changed from "Prompt engineering overview" to "Prompting best practices" to match the actual destination. `hubungan` rewritten to document the full chain: old URL confirmed to redirect, redirect target confirmed to be a landing page only, canonical content page found via that page's own link and confirmed. `apa`, `inti`, `kenapa`, source, difficulty, and minutes: unchanged — the original summary's *content* claims turned out to still be accurate, just relocated |
| Evidence used | Two `WebFetch` calls: the original `docs.claude.com` URL (returned the 302 redirect header directly, not summarized secondhand) and `platform.claude.com/.../overview` (confirmed landing-page structure and found the link to the actual reference page); one more to `claude-prompting-best-practices` (confirmed title, structure, and topic coverage) |
| Remaining uncertainty | The `claude-prompting-best-practices` page is large; every sub-section was not read line-by-line against every stored `inti` bullet, only confirmed at the structural/table-of-contents level. This is a lighter verification bar than Batch 3's OWASP claim-by-claim check, and is disclosed here rather than overstated as equally thorough |

## Provenance note (why this matters more than a routine link check)

This entry started with a documented provenance problem, not a routine staleness question: M10
found it marked `verified: true` from a session that had **no network access at all**, meaning the
label was never actually earned by anyone opening the URL. M15 Batch 4 is the first time in this
project's history that a human or assistant has actually opened this specific resource. The
finding — real redirect, but to a page that itself had gone stale — is exactly the kind of thing a
network-less session could never have caught, and is also exactly the kind of thing that could not
have been assumed from the general "docs.claude.com moved" fact recorded elsewhere in this project.

## Changes

One resource object edited in `APPLICATION/ai-digital-learning-dashboard.jsx` (Day 17, index 0):
`verified: false → true`, `url` updated to the confirmed canonical page, `title` updated to match.
`apa`/`inti`/`kenapa` left as-is (content claims held up); `hubungan` rewritten with the migration
chain. No curriculum day, question, answer key, quiz, recap, or unrelated resource touched. No
`GEMINI RESEARCH/` file opened.

## Automated QA

`node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,696
assertions** (unchanged count — a URL/title/flag edit adds no assertions; the content-summary line
moved from "55 verified" to **"56 verified."**). This layer has no mechanism to check whether any
URL resolves or redirects, and none was added.

## TypeScript

`tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**. `QA/qa-build.html`
rebuilt via `node QA/build.mjs` after the source edit.

**Manual web resource verification** (the layer that actually determined the outcome): 3
`WebFetch` calls, documented above.

## Resource Count — final, all four M15 batches

| | Before M15 | Batch 1 | Batch 2 | Batch 3 | Batch 4 (final) |
|---|---|---|---|---|---|
| Total resources | 58 | 58 | 58 | 58 | 58 |
| Verified | 51 | 52 | 53 | 55 | **56** |
| Unverified | 7 | 6 | 5 | 3 | **2** |
| Flipped `true` this batch | — | 1 | 1 | 2 | **1** |

**All 7 of the resources that carried `verified: false` at the start of M15 have now been opened
and checked by an actual session with network access.** 5 flipped to `true` (Pinecone, ADLNet,
OWASP Indonesian translation, n8n glossary, Day 17 Anthropic). 2 remain `false` — SkillsBuild and
UNESDOC — not because they were skipped, but because both were checked and honestly could not be
confirmed either way, for specific documented tooling reasons (JavaScript-rendered catalog;
domain-wide bot-blocking) rather than evidence of dead links.

## Remaining Unresolved Resources

**SkillsBuild (Day 13)** and **UNESDOC (Day 23)** — the only two `verified: false` entries left in
the entire 58-resource set. Both were opened this project (§39 and §40 respectively), not
never-touched. Closing them requires different tooling than `WebFetch`: a JS-executing browser for
SkillsBuild's client-rendered catalog, and a fetcher that isn't blocked by anti-bot protection for
UNESDOC's digital library domain. This is a capability gap, not a scheduling gap — repeating the
same kind of session again will reproduce the same inconclusive result.

## State File

This entry (§42). §14 checkpoint updated: milestone line now reads "M15 Batch 4 (FINAL)",
resource counts updated to 56 verified / 2 unverified, NEXT ACTION states the queue is closed and
names the two remaining tooling-blocked items plus points back to standing next-milestone options
recorded earlier in this file. §38's original queue-listing prose (written before any M15 batch
ran) is left as historical record rather than rewritten, consistent with how §35/§36/§39/§40/§41
have each been preserved.

## NEXT ACTION

**M15 is closed.** No further resource-verification batch is queued from the original set. Two
paths forward, neither started: (1) a SkillsBuild/UNESDOC-specific revisit using different tooling
(a real browser; a bot-tolerant fetch method) if closing those two specifically matters, or (2)
proceed to whatever milestone comes after resource verification per standing project direction
(Gemini-enhancement integration, curriculum extension, etc. — all explicitly deferred throughout
M8-M15 pending "resource truth layer" being stable, which as of this entry it now is, modulo the
two tooling-blocked items). Awaiting owner direction on which.

---

# 43. M16.1 — GEMINI RESEARCH AUDIT & ENHANCEMENT MAPPING

## Scope

Analysis-only milestone: audit `GEMINI RESEARCH/` against the current 28-day curriculum and
produce a research-to-curriculum mapping. **No file under `APPLICATION/` or `QA/` was modified.**
`APPLICATION/ai-digital-learning-dashboard.jsx` was read directly (all 28 `day`/`title`/`sub`/
`objectives` blocks, the `PHASES` array, and the specific resource entries discussed below) — read
for inspection, never edited. `QA/verify.mjs` was not touched and `QA/qa-build.html` was not
rebuilt, since no source changed.

## Research files inspected

All 5 files in `GEMINI RESEARCH/` — none skipped, none silently discarded:

| File | Classification |
|---|---|
| `LEARNING-RESOURCE-DATABASE.json` (553 lines, 22 resource records) | PRIMARY |
| `CURRICULUM-RESOURCE-MAPPING.json` (292 lines, 7 day entries, `"version": "1.1"` — the only version marker in the package) | PRIMARY |
| `CURRICULUM-UPGRADE-PLAN.md` (65 lines) | DUPLICATE — narrative restatement of the same 7 entries in the mapping JSON, no new information |
| `LEARNING-RESOURCE-RESEARCH.md` (66 lines) | SECONDARY / SUPPORTING |
| `RESOURCE-GAP-ANALYSIS.md` (26 lines) | SECONDARY / SUPPORTING — the only file that admits Gemini's own research limits |

No file was SUPERSEDED (no earlier/later version pair exists in this package) and none was
UNRESOLVED in the sense of unreadable — all five were fully read. Full inventory, per-file
purpose/date/overlap detail, and the resource-catalogue quality issues found (8 resources with no
URL, 2 "Verified" entries that are catalogue-root pages, a pre-network-access "Verified" status
that this project's own history has already shown not to be trustworthy at face value) are in
`GEMINI RESEARCH/ANALYSIS/GEMINI-RESEARCH-AUDIT.md`.

## §17.1 finding — reconfirmed, and its reach into Days 21–28 checked explicitly

§17.1 (M2, written when the curriculum had 20 days/5 phases) found the Gemini package audits an
imagined curriculum: its 7 day-numbered entries (days 1, 5, 10, 15, 20, 25, 30) do not match what
is actually taught at any of those day numbers. **Re-verified line by line against the current
28-day file this session — still true on all 7.** Days 21–28 (added in M8/M9, after the research
was produced) were checked specifically: the package has **zero day-numbered entries** reaching
that far (its highest is "Day 30," which does not exist as a real day), so the imagined-curriculum
problem does not extend into that range so much as fail to reach it. Topic-level content (not
day-numbered) was still checked against Days 21–28 by hand, and found two genuine hits — see
below.

## 28-day mapping — completed

Every one of Days 1–28 reviewed and classified. Full table with evidence and time-impact estimates
in `GEMINI RESEARCH/ANALYSIS/GEMINI-CURRICULUM-ENHANCEMENT-MATRIX.md`; structured per-day data in
`GEMINI RESEARCH/ANALYSIS/GEMINI-ENHANCEMENT-PLAN.json` (validated: 28 entries, all 15 required
fields present on every entry — checked programmatically with `node -e` against the required-field
list, not eyeballed).

**Classification counts:**

| Classification | Count | Days |
|---|---|---|
| KEEP | 26 | all except 16, 23 |
| ENHANCE | 1 | 23 |
| CLARIFY | 0 | — |
| UPDATE | 0 | — |
| VERIFY BEFORE CHANGE | 1 | 16 |
| REPLACE | 0 | — |

**Priority counts:** P0 — 0. P1 — 0. P2 — 1 (Day 23). P3 — 1 (Day 16). 26 days need no action.

**No REPLACE recommendation was made anywhere.** The instruction to use REPLACE "extremely rarely,
only with strong evidence" was followed by finding zero cases meeting that bar — every apparent
mismatch traced back to Gemini's own wrong day-baseline (§17.1), not to anything actually incorrect
in the curriculum.

## What was already done, independent of this audit

Reconfirmed rather than re-proposed: Day 17's few-shot/zero-shot/chain-of-thought/XML-delimiter
content (added M2, per §17.3 "EXPAND — done") and Day 19's RAG-vs-fine-tuning clarification (added
M2, per §17.3 "CLARIFY — done") are both still present and correctly classified KEEP, not ENHANCE
again. Day 10 (JSON/dict/list), Day 12 (AI/ML/GenAI taxonomy), and Day 28 (the exact MCP
specification domain Gemini names, at a more specific and current path than Gemini's own link) were
all independently confirmed to already satisfy what Gemini recommends, filed under the correct real
day number rather than Gemini's mislabeled one.

## New findings this session (not previously recorded)

1. **Day 23 (ENHANCE, P2):** `EDTECH-001` (Microsoft Learn AI-in-education module) was deferred as
   a "candidate anchor" in §17.3 before Day 23 existed, and was never revisited once Day 23 was
   written (M8). Existing Day 23 resources are both policy-level (UNESCO); this candidate is
   practitioner-level — a genuine gap in resource *type*. URL not opened this session;
   `verification_required: true` in the JSON plan.
2. **Day 16 (VERIFY BEFORE CHANGE, P3):** the resource-URL precision question from §17.3 (verified
   `huggingface.co/learn` root vs. Gemini's more precise but unverified `/learn/llm-course/` path)
   was never actually closed, only deferred. Restated here as still open rather than silently
   dropped. No content change implied.
3. **Day 27 (documented, no action):** Gemini's `AUTO-001` (Zapier) is a real topic-level
   alternative to the curriculum's own n8n choice. Recorded in the Gap Analysis so the comparison
   isn't silently discarded, even though the existing choice (explained in the lesson's own text)
   is judged the stronger pedagogical fit.
4. **Day 12 residual item (not new, restated):** `AI-FUND-001` was decided ADD (unverified) in
   §17.3; M15's resource-verification batches never touched Day 12, so whether/how it was actually
   added and its current `verified` status were not re-checked this session — flagged, not acted on.

## Unresolved research claims requiring verification before any change

Two items, both already listed above: Day 16's resource-URL precision question, and Day 23's
`EDTECH-001` candidate. Both carry `"verification_required": true` in the JSON plan and neither was
opened or fetched this session — verifying them (and any future action) is explicitly out of scope
for M16.1 and belongs to a resource-verification-style session if the owner chooses to pursue them.

## Files created

- `GEMINI RESEARCH/ANALYSIS/GEMINI-RESEARCH-AUDIT.md`
- `GEMINI RESEARCH/ANALYSIS/GEMINI-CURRICULUM-ENHANCEMENT-MATRIX.md`
- `GEMINI RESEARCH/ANALYSIS/GEMINI-ENHANCEMENT-PLAN.json`
- `GEMINI RESEARCH/ANALYSIS/GEMINI-GAP-ANALYSIS.md`

No existing file (including the five original `GEMINI RESEARCH/` files) was deleted, renamed, or
edited.

## Confirmation — no curriculum content modified

**Files touched this session, in full:** the four files listed above (new), plus this state file.
**Files NOT touched:** `APPLICATION/ai-digital-learning-dashboard.jsx` (read-only inspection),
`QA/verify.mjs`, `QA/qa-build.html`, and all five original `GEMINI RESEARCH/` files. No lesson,
objective, quiz question, resource URL, or progression-logic line was changed. `verify.mjs` was not
re-run this session because no source it checks was touched — the last recorded result (6,696/6,696,
§42) still stands unchanged.

## Quality control — confirmed

- All 28 days reviewed: yes (table above, JSON validated at 28 entries).
- Every Gemini research file considered: yes, all 5, none silently discarded.
- Duplicate/superseded research identified: yes (`CURRICULUM-UPGRADE-PLAN.md` flagged DUPLICATE;
  no file found SUPERSEDED).
- Existing material treated as baseline: yes — zero REPLACE recommendations.
- No curriculum/application file modified: confirmed above.
- No Gemini research silently discarded: every file, and every one of its day-numbered/topic-level
  claims, appears in at least one of the four output documents.
- Unsupported claims flagged rather than integrated: Day 16 and Day 23 both carry
  `verification_required: true` and no implementation was proposed for either.
- Recommendations respect the 60-minute/day constraint: both non-KEEP items estimate 0 minutes of
  added timed-segment content (both are optional further-reading additions/questions, not new
  segments).

## Current Checkpoint

See §14, updated in this entry: milestone line now reads M16.1, NEXT ACTION set to the owner-review
step below.

## NEXT ACTION

**M16.2 — Owner review of Gemini enhancement matrix before implementation.**

---

# 44. M16.2 — TARGETED GEMINI VERIFICATION

## Scope

Exactly the two open questions M16.1 flagged, nothing else: the Day 23 Microsoft Learn resource
(`EDTECH-001`) and the Day 16 Hugging Face URL-precision question. No other Gemini claim was
opened, no new resource was searched for, none of the 26 KEEP days were revisited, and no
curriculum, quiz, objective, or progression-logic content was touched.

## Day 23 — Microsoft Learn (`EDTECH-001`)

- **URL checked:** `https://learn.microsoft.com/en-us/training/educator-center/` (Gemini's
  recorded URL, opened directly — no redirect; the page's own `canonicalUrl` metadata confirms
  this is already canonical).
- **Resolves, active, official** (learn.microsoft.com, sourced from Microsoft's own
  `MicrosoftDocs/LearnShared` repo, `updated_at: 2026-07-20`).
- **Content mismatch found on inspection:** the page is the general **Educator Center hub** —
  six unrelated training topics, seven Microsoft product guides (Copilot, Teams, Minecraft
  Education, M365, etc.), educator community programs, and instructor materials. AI is one
  section among roughly thirteen, not the page's subject. Gemini's own research recorded this
  as "Microsoft Learn — AI in Education"; the actual title is "Educator Center Overview" — a
  **material mismatch between the claimed resource and what the URL contains**, discoverable
  only by opening it.
- **Recommendation: DO NOT ADD.** Full field-by-field detail (redirect chain, objective fit,
  difference from the existing UNESCO resources, title-accuracy check) recorded in
  `GEMINI RESEARCH/ANALYSIS/M16.2-VERIFICATION-REPORT.md`.

## Day 16 — Hugging Face URL precision

- **URLs checked:** current verified `https://huggingface.co/learn` (root — resolves, lists 12
  courses with the LLM Course listed first) vs. Gemini-suggested
  `https://huggingface.co/learn/llm-course/` (resolves to real, active LLM/NLP course content —
  12 chapters, free, Apache 2.0).
- **Key finding:** the specific URL's own resolved content reports its address as
  `https://huggingface.co/course` — a **different path** from the one Gemini recorded. The
  suggested "more precise" URL is not itself a stable, self-identifying canonical address.
- **Recommendation: KEEP CURRENT URL.** Per the task's default rule (verified+broad beats
  precise+unverified unless the specific path is active, canonical, relevant, *and* materially
  better), three of four conditions held but canonical did not — the one-click navigation
  saving does not clear that bar against the instability. Full detail in
  `M16.2-VERIFICATION-REPORT.md`.

## Net Result

**No curriculum change is currently recommended from the entire M16 Gemini-audit effort
(M16.1 + M16.2 combined).** 26 of 28 days were KEEP from the start; the two flagged questions
both resolved to "do not change" after direct verification.

## Changes

One new file: `GEMINI RESEARCH/ANALYSIS/M16.2-VERIFICATION-REPORT.md`. No file under
`APPLICATION/` or `QA/` was opened for editing. No `GEMINI RESEARCH/` file from M16.1 was
modified — this session only added to `ANALYSIS/`, per instruction not to edit the M16.1
analysis files.

## QA

Confirmed unchanged, as required for a session that must not modify the application:
- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,696
  assertions**, identical to the M15/M16.1 baseline (28 days / 169 questions / 58 resources /
  56 verified — unchanged).
- `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**, unchanged.

## State File

This entry (§44). §14 checkpoint updated: milestone line now reads M16.2 complete, resource
counts confirmed unchanged, NEXT ACTION set to M16.3 (owner approval), with the net "no
curriculum change recommended" result stated plainly rather than left implicit.

## NEXT ACTION

**M16.3 — Owner approval of the verified Day 23 (DO NOT ADD) and Day 16 (KEEP CURRENT URL)
recommendations**, or any other direction the owner chooses given that the Gemini audit found
no change worth making. Not started this session.

---

# 45. M16.3 — OWNER SIGN-OFF / M16 CLOSED

## Owner Decision (final, verbatim intent)

The owner approved the M16.2 outcome in full and closed M16:

- Day 23: **DO NOT ADD** `EDTECH-001` (Microsoft Learn Educator Center).
- Day 16: **KEEP** the current verified Hugging Face URL (`https://huggingface.co/learn`).
- **No curriculum changes are required from the existing Gemini research corpus.**
- The existing curriculum remains the baseline — unchanged by this milestone, as it was
  throughout M16.1 and M16.2.
- The Gemini research corpus (the five original files under `GEMINI RESEARCH/` plus the five
  analysis files under `GEMINI RESEARCH/ANALYSIS/`) is now to be treated as **audited
  historical research**, not as an authoritative source for future curriculum decisions. Any
  future curriculum work — including a hypothetical M17 — draws on it only as a reference of
  what was already checked and found not to warrant action, not as a standing recommendation
  queue still to be worked through.

## What M16 Actually Produced (full-milestone summary)

Three sub-milestones, zero curriculum changes, across:

- **M16.1** — full audit of all 5 Gemini research files against all 28 curriculum days.
  Reconfirmed the M2-era §17.1 finding that Gemini's research audited an imagined curriculum
  that doesn't match this app's real day-by-day content. Result: 26 KEEP, 1 ENHANCE (Day 23,
  P2), 1 VERIFY BEFORE CHANGE (Day 16, P3), 0 REPLACE, 0 UPDATE, 0 CLARIFY, 0 P0, 0 P1.
- **M16.2** — direct verification of the two flagged items. Day 23's Microsoft Learn URL
  resolves and is official but does not match Gemini's own claimed title/focus (a general
  Educator Center hub, not an "AI in Education" resource) — DO NOT ADD. Day 16's
  Gemini-suggested precise Hugging Face path resolves to real content but is not itself a
  stable canonical address (its own resolved location is a different URL than the one
  recorded) — KEEP CURRENT URL.
- **M16.3** — this entry. Owner reviewed both recommendations and signed off on both, closing
  the milestone with a net decision of no action.

## Files Preserved

All ten Gemini-related files remain on disk, untouched in content, none deleted or renamed:

- `GEMINI RESEARCH/CURRICULUM-RESOURCE-MAPPING.json`
- `GEMINI RESEARCH/CURRICULUM-UPGRADE-PLAN.md`
- `GEMINI RESEARCH/LEARNING-RESOURCE-DATABASE.json`
- `GEMINI RESEARCH/LEARNING-RESOURCE-RESEARCH.md`
- `GEMINI RESEARCH/RESOURCE-GAP-ANALYSIS.md`
- `GEMINI RESEARCH/ANALYSIS/GEMINI-RESEARCH-AUDIT.md`
- `GEMINI RESEARCH/ANALYSIS/GEMINI-CURRICULUM-ENHANCEMENT-MATRIX.md`
- `GEMINI RESEARCH/ANALYSIS/GEMINI-ENHANCEMENT-PLAN.json`
- `GEMINI RESEARCH/ANALYSIS/GEMINI-GAP-ANALYSIS.md`
- `GEMINI RESEARCH/ANALYSIS/M16.2-VERIFICATION-REPORT.md`

## Changes This Session

None to `APPLICATION/` or `QA/`. This entry (§45) plus the §14 checkpoint update (milestone
line, implementation-status note, NEXT ACTION) are the only edits — both to this state file.

## QA

Re-confirmed at closure, exactly as required for a sign-off session that must not touch the
application:
- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,696
  assertions** (28 days / 169 questions / 58 resources / 56 verified — identical to §42/§43/§44,
  unchanged through the entire M16 effort).
- `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**, unchanged.

## State File

This entry (§45) and the §14 checkpoint update are the record of M16's closure.

## NEXT ACTION

**M17 — Current Curriculum Enhancement Research.** Not started. Per explicit instruction, this
session does not begin M17 — it only sets the milestone name as the next item awaiting owner
direction. The Gemini corpus from M16 should inform M17 only as a record of prior findings, not
as its research source — M17 is framed as fresh research against the current (post-M15,
post-M16) curriculum, not a continuation of the Gemini package's already-closed
recommendations.

---

# 46. M17.1 BATCH 1 — CURRENT CURRICULUM ENHANCEMENT RESEARCH: DAYS 1–4

## Scope

Exactly Days 1–4 (Phase 1, "Digital Foundations"). Days 5–28 not touched. Analysis only — no
lesson, quiz question, objective, resource, or progression-logic content was modified. The
closed M16 Gemini corpus was explicitly **not** used as a source; this batch read the current
curriculum directly from `APPLICATION/ai-digital-learning-dashboard.jsx` (the `CUR_A` array) and
opened fresh external sources only where the pedagogical audit found a genuine gap.

## Method

Each day was read in full from source (objectives, all five segments, example, practice,
challenge, recap, resources with current `verified` flags, and every quiz question), then audited
against the ten dimensions the milestone specified (accuracy, clarity, depth, practicality,
examples, active learning, misconceptions, current relevance, resource quality, assessment
alignment). External research was pursued only where the audit surfaced a real gap — three of
four days needed none.

## Results

| Day | Topic | Decision | Priority | Finding |
|---|---|---|---|---|
| 1 | How Computers Work | **ENHANCE** | P2 | Hardware model (CPU/RAM/storage/GPU) omits the NPU, a mainstream on-device AI accelerator now visible in Windows Task Manager and present in Apple Silicon, directly relevant to the day's own "predict the bottleneck for local AI" objective and challenge (which pays off on Day 20) |
| 2 | Operating Systems | KEEP | — | No content gap. Secondary observation only: the Microsoft Learn training-catalogue resource is a broad catalog root, echoing the weak-resource pattern already flagged for other Gemini-sourced catalog roots (e.g. M16.2's Day 23 finding). Not elevated to a decision |
| 3 | Files, Data & Storage | KEEP | — | No gap. Content deliberately and correctly scoped to CSV/JSON/Markdown with a stated rationale |
| 4 | Internet Fundamentals | KEEP | — | No material gap. HTTP/2/HTTP/3 considered and explicitly ruled out as out-of-scope trivia relative to the stated objectives |

**Totals: KEEP 3, ENHANCE 1, CLARIFY 0, UPDATE 0, VERIFY BEFORE CHANGE 0, REPLACE 0. Priorities:
P0 0, P1 0, P2 1, P3 0.**

## Day 1 Enhancement — Detail

Proposed (not implemented): 1–2 sentences appended to the Core material segment's GPU paragraph
introducing the NPU as a fifth hardware category, plus an optional one-line addition to the
Hands-on segment. Estimated time impact negligible (~1 minute of reading, no new segment). No
post-test change proposed — existing GPU-related questions remain valid. No new curriculum
resource proposed.

**Evidence (both source-quality A, both opened directly via WebFetch this session, not taken from
search snippets):**
- Microsoft Learn, "Copilot+ PCs developer guide"
  (`https://learn.microsoft.com/en-us/windows/ai/npu-devices/`) — official, `updated_at:
  2026-07-15`. Confirms the NPU as a distinct, multi-vendor (Qualcomm/Intel/AMD) hardware category
  for AI inference, and that Windows Task Manager now surfaces an NPU meter alongside CPU/GPU.
- Microsoft Support, "All about neural processing units (NPUs)" — official, corroborating.

A guessed Microsoft URL (`.../windows/ai/npu-overview`) 404'd and was **not reused or silently
corrected** — the correct URL was located via a proper `WebSearch` query instead, per this
project's standing rule against guessing resource URLs. An Apple Developer Core ML page was
opened but returned no usable body content; the Apple Neural Engine parallel in the audit
document is explicitly flagged as general knowledge, not independently source-confirmed this
session — stated honestly rather than passed off as verified.

## Major Findings

- Days 2–4 are genuinely strong on direct re-inspection; no finding was manufactured to appear
  thorough, consistent with the instruction that KEEP is an acceptable and expected outcome.
- The one real finding (Day 1's NPU gap) is a current-relevance addition, not a correction — the
  existing four-component model remains accurate and pedagogically sufficient on its own.
- The Day 2 resource-catalog-root observation is the second time this project has independently
  noticed the same weak-resource shape (broad Microsoft Learn catalog root vs. specific page) —
  once via M16.2's Day 23 finding, once here via direct pedagogical audit — suggesting it may be
  worth a dedicated resource-quality pass across days that use catalog-root URLs, in a future
  milestone, not this one.

## Unresolved Questions

- Day 2's Microsoft Learn training-catalogue URL: flagged, not verified against a specific
  alternative this session (would require its own resource-verification pass, out of this
  batch's scope).
- The Apple Neural Engine claim in Day 1's audit is unconfirmed by a primary Apple source this
  session (the fetch attempt returned no usable content) — noted as a gap in the evidence, not
  papered over.

## Files Created

- `GEMINI RESEARCH/M17/M17.1-DAYS-01-04-AUDIT.md`
- `GEMINI RESEARCH/M17/M17.1-ENHANCEMENT-MATRIX.md`
- `GEMINI RESEARCH/M17/M17.1-RESEARCH-SOURCES.md`
- `GEMINI RESEARCH/M17/M17.1-ENHANCEMENT-PLAN.json` (validated: 4 entries, all 16 required fields
  present, checked programmatically)

## Confirmation — No Curriculum Content Modified

Exactly five files were touched this session: the four listed above (new) and this state file.
`APPLICATION/ai-digital-learning-dashboard.jsx`, `QA/verify.mjs`, and `QA/qa-build.html` were not
opened for editing. No quiz question, resource URL, `verified` flag, objective, or progression-
logic line was changed.

## QA

- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,696
  assertions** — identical to the pre-session baseline (28 days / 169 questions / 58 resources /
  56 verified, unchanged).
- `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**, unchanged.
- Both numbers confirmed identical to before this session — no investigation was needed since
  nothing shifted.

## State File

This entry (§46). §14 checkpoint updated: milestone line, implementation-status note, and NEXT
ACTION all reflect M17.1 Batch 1 complete with a proposed-but-not-implemented Day 1 enhancement.

## NEXT ACTION

**M17.2 — Owner review of the Days 1–4 enhancement audit before implementation or
continuation.** Not started. Awaiting a decision on: (a) whether to implement the Day 1 NPU
enhancement, and (b) whether to continue M17 to the next batch of days. Days 5–28 remain
unaudited under M17.

---

# 47. M17.2 — DAY 1 NPU ENHANCEMENT (IMPLEMENTED)

## Owner Approval

The owner approved exactly one item from M17.1's Days 1–4 audit (§46): the P2 ENHANCE
recommendation for Day 1 — introduce the NPU as a fifth hardware category, framed as
CPU = general-purpose, GPU = parallel/graphics/AI, NPU = specialized AI/ML processor. Days
2–4 KEEP decisions were reconfirmed and explicitly left untouched. No new research was
authorized or performed — the two sources M17.1 already opened (Microsoft Learn's "Copilot+
PCs developer guide," Microsoft Support's NPU explainer, both source-quality A) were reused
for wording accuracy without being re-fetched, since no new claim was being made beyond what
they had already confirmed.

## What Changed

All edits are inside the existing Day 1 object in
`APPLICATION/ai-digital-learning-dashboard.jsx` (read directly from source before editing,
not from the M17.1 summary alone):

1. **Core material segment** — one new sentence pair appended after the existing GPU
   paragraph, naming the NPU, its purpose (AI-specific, power-efficient), where it now ships
   (recent Windows laptops, all Apple Silicon Macs), and that Windows Task Manager surfaces
   it as a fifth meter — directly tying back to the segment's own diagnostic framing.
2. **Hands-on segment** — one new sentence telling the learner to check the NPU meter too if
   their system monitor shows one, with the expected baseline behavior (near zero until
   AI-specific work runs).
3. **Practice segment (timed body, not the boxed activity)** — one new sentence asking the
   learner to note whether an NPU changes their bottleneck answer for the local-model task.
4. **Boxed "Profile your own machine" practice activity** — the first step's component list
   extended from "CPU core count, total RAM, storage type and GPU model" to include "and NPU
   (if present)."
5. **Indonesian recap** — `inti` extended with one sentence stating the same NPU facts in
   Indonesian (chip built for AI math, more power-efficient than CPU/GPU for that work, now
   in many Windows laptops and all Apple Silicon Macs); one new `istilah` entry added
   (`NPU` → "chip khusus untuk perhitungan AI; lebih hemat daya daripada CPU atau GPU untuk
   tugas yang sama"), required so the recap's new term is anchored in the day's own English
   content per `verify.mjs`'s desync guard (§QA/verify.mjs:143-181).

**Not changed:** objectives (objective 3, "predict which component is the bottleneck for a
given workload," already generically covers NPU without needing to name it — adding NPU to
objective 1's explicit CPU/RAM/storage/GPU list was deliberately avoided to keep the scope an
enrichment, not a redefinition of what the day teaches); the `example` block; the `challenge`
text; all 3 resources (no new resource added, none of the 3 existing ones edited); all 6 quiz
questions (unchanged — see Assessment Impact below); `recap.salahPaham` (the existing
misconception framing did not need NPU-specific extension).

## Why

Direct evidence from two official Microsoft sources (opened in M17.1, re-read for wording
accuracy this session): NPUs are now a real, named, mainstream hardware category — not a
marketing term — and Windows Task Manager literally adds a fifth meter for them alongside the
four components this lesson already teaches. A learner running the day's own hands-on
system-monitor activity on 2024+ hardware would see that meter with no framework from the
lesson to interpret it. The addition closes that specific, dated gap without correcting
anything that was wrong — the existing four-component model remains accurate and sufficient
on its own for anyone on older hardware.

## Existing Content Preserved

The day's full existing structure survives unchanged: three learning objectives, all five
timed segments (10/20/15/10/5 minutes, unchanged durations), the video-render `example`, the
"predict the bottleneck" `challenge` text, all 3 resources at their existing `verified`
status, and 5 of 6 quiz questions untouched (the 6th was never touched either — see below).
The only additions are short, additive sentences layered onto the existing explanation —
nothing was deleted, restructured, or rewritten to make room.

## Activity Impact

Per owner instruction ("small adjustment... do not redesign"): the boxed "Profile your own
machine" activity gained one clause (record NPU if present) and the timed Practice segment
gained one sentence (note whether NPU changes the local-model answer). Neither activity was
restructured, retimed, or replaced. The existing three-task bottleneck-prediction exercise
(video edit / local model / spreadsheet) is unchanged in shape; NPU is now an available
consideration within it, not a new exercise.

## Assessment Impact

**None.** Per owner instruction not to auto-add or rewrite a post-test question: the existing
GPU-focused questions (q3 on why GPUs suit AI, q4/q5 on bottleneck diagnosis) remain valid and
aligned to the day's objectives without modification — a P2 enrichment does not require its
own assessment item, and M17.1 already concluded this before implementation (§46,
"Assessment Impact: None proposed"). No ASSESSMENT ISSUE flag is raised; alignment was not
judged to have degraded.

## Resource Impact

**None.** No new resource entry was added to Day 1's `resources` array. Per owner instruction,
the two Microsoft sources back the *lesson prose*, not a new citable resource — this keeps the
enhancement inside the "small conceptual block" the owner asked for rather than growing into a
fourth resource.

## Time Impact

Estimated **~1 additional minute of reading**, entirely inside the existing 20-minute Core
material budget (per M17.1's estimate, confirmed by re-reading the actual inserted text this
session — one short paragraph, three one-line additions elsewhere). The day's total segment
time is unchanged at 60 minutes (10+20+15+10+5, durations not touched).

## Verification

- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → first run (before
  rebuilding the QA artifact) correctly **failed exactly 1 of 6,701 assertions** — the M14.1
  freshness guard (§36/§41, "QA/qa-build.html must be rebuilt at or after the last change to
  the source file"), which is the guard working as designed, not a regression. After
  `node QA/build.mjs`, re-run → **PASSED, all 6,701 assertions** (6,696 → +5, all from the
  one new recap glossary term's five per-term checks: English-term presence, Indonesian-gloss
  thickness, no-duplicate, anchored-in-content, not-glossed-with-itself — confirmed
  content-driven, not a new assertion group). 28 days / 169 questions / 58 resources / 56
  verified — all unchanged.
- Recap word caps checked by direct computation before committing the edit:
  `recap.inti` 72 → 107 words (cap 120), `recap.salahPaham` unchanged at 35 words (cap 90),
  combined 107 → 142 words (cap 180) — comfortable headroom on both individual caps and the
  combined cap.
- `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**.
- `node QA/build.mjs` → `QA/qa-build.html` rebuilt (505.9 KB) to reflect the Day 1 change —
  the previous build (from M15 Batch 4, §42) did **not** reflect this content and would have
  gone stale exactly the way M14.1's stale-build bug did, had the freshness guard not existed
  to catch it.

## Regression

Days 2–4 and Days 5–28 confirmed byte-identical: no edit touched any line outside the Day 1
object (lines ~101–174 before this session's edits). 169 total questions unchanged confirms no
quiz was added or removed anywhere in the curriculum. 58 resources / 56 verified unchanged
confirms no resource was added, removed, or re-flagged. Progression logic, streak, best-score,
and the M14/M14.1 pass-requirement behavior were not touched and are not implicated by a
content-only change.

## Files Changed

- `APPLICATION/ai-digital-learning-dashboard.jsx` — Day 1 object only (5 edit locations: Core
  material, Hands-on, Practice segment body, boxed practice activity, recap `inti`+`istilah`).
- `QA/qa-build.html` — rebuilt via `node QA/build.mjs` to reflect the change.
- `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` — this entry (§47) and the §14 checkpoint.

No file under `GEMINI RESEARCH/` was modified.

## Remaining M17 Work

Days 5–28 remain unaudited under M17. M17.1's Days 2–4 KEEP decisions stand and were not
reopened. The SkillsBuild (Day 13) / UNESDOC (Day 23) tooling-blocked resource pair from M15
remains separately unresolved and is not part of M17.

## NEXT ACTION

**M17.3 — Owner browser review of the Day 1 NPU enhancement** before continuing to Days 5–8.
Automated verification is complete and clean; rendered appearance has not been observed by
anyone, consistent with every prior content milestone in this project (M11/M12/M13's
recurring visual-verification gap). Not started this session.

---

# 48. M17.4 BATCH 2 — CURRENT CURRICULUM ENHANCEMENT RESEARCH: DAYS 5–8

## Scope

Analysis-only, per instruction. Days 5–8 (Client and Server, Web Fundamentals, APIs, Databases —
the remainder of Phase 1) read directly from `APPLICATION/ai-digital-learning-dashboard.jsx`
(`CUR_A` array, lines 388–660), not from memory, prior summaries, or the closed Gemini corpus.
Days 9–28 not touched. No `APPLICATION/`, `QA/verify.mjs`, or `QA/qa-build.html` file was edited.

## Days Audited

| Day | Topic | Decision | Priority | Finding |
|---|---|---|---|---|
| 5 | Client and Server | KEEP | — | No content gap; one resource-breadth observation (general MDN hub vs. client-server-specific), not material |
| 6 | Web Fundamentals | KEEP | — | No content gap; same resource observation, less material (hub's actual topic matches this day) |
| 7 | APIs | VERIFY BEFORE CHANGE (assessment only; content KEEP) | P3 | Objective 3 ("why AI providers expose models as APIs") taught but not directly assessed |
| 8 | Databases | VERIFY BEFORE CHANGE (assessment only; content KEEP) | P3 | Document databases (named in objective 2) taught but never assessed, unlike relational and vector |

**Decision totals:** KEEP 4 (all four days' lesson content) · ENHANCE 0 · CLARIFY 0 · UPDATE 0 ·
VERIFY BEFORE CHANGE 2 (Days 7, 8 — assessment-alignment scope only) · REPLACE 0.
**Priority totals:** P0 0 · P1 0 · P2 0 · P3 2 · No-action 2.

This is a materially different outcome from M17.1 (3 KEEP, 1 ENHANCE): **zero content
enhancements** were found for Days 5–8. Both findings this batch are assessment-alignment
observations — real, structural, and non-manufactured, but explicitly not implemented, per the
instruction to flag rather than rewrite.

## Research Sources Opened

2 external sources, both credibility **A** (official/primary), both via direct `WebFetch`, no
search-snippet-only evidence, no guessed URLs:

1. `https://developer.mozilla.org/en-US/docs/Learn` (MDN) — confirmed to load MDN's general
   "Learn web development" hub (last updated August 2025), not a client-server-specific page.
   Affects Days 5 and 6 (same stored URL, same finding, not re-fetched).
2. `https://developer.mozilla.org/en-US/docs/Web/HTTP` (MDN) — confirmed to resolve directly, no
   redirect, and to comprehensively cover methods/headers/auth/status codes as the resource's own
   summary claims. Affects Day 7.

Day 8 required no external research — the audit found the lesson strong and the one finding
(document databases untested) structural, not requiring outside verification. Full detail,
including what was explicitly *not* fetched and why, in `M17.4-RESEARCH-SOURCES.md`.

## Major Findings

1. **Days 5–8 needed less outside verification than Days 1–4 did.** Two sources for four days,
   both resource-currency checks rather than content-gap research, versus M17.1's two sources
   also across four days but for a genuine content enhancement (the Day 1 NPU addition). This is
   read as evidence the audit method is working honestly, not that this batch was rushed — the
   pedagogical audits (11 dimensions × 4 days) were performed in full regardless.
2. **A shared resource-specificity observation** (Days 5 and 6 both cite the general MDN
   "Learn web development" hub) was documented but not elevated to a decision-changing finding —
   the content that loads is real, current, and relevant; only its title-vs-scope match is
   imperfect, and Day 5 already has a second, more specific resource (MDN Glossary: Server)
   covering the gap.
3. **Two genuine, non-manufactured assessment-alignment gaps** (Day 7 objective 3 untested; Day
   8 document databases untested) were found by direct inspection of the existing quiz arrays
   against their stated objectives — no external research was needed to establish either, since
   both are structural facts about the current content, not claims about the outside world.

## Unresolved Questions

- Whether the Day 5/6 shared resource URL's exact path (`/docs/Learn`) is a legacy alias for
  MDN's current path spelling (`/docs/Learn_web_development`) could not be confirmed — the
  `WebFetch` tool used this session does not expose raw HTTP redirect headers. Practically
  immaterial (the content that loads is correct and current either way), but recorded as
  genuinely unconfirmed rather than guessed at.
- Both P3 assessment flags (Day 7, Day 8) are unresolved by design — flagged for future revision,
  not resolved this session, per explicit instruction not to modify questions.

## Files Created

- `GEMINI RESEARCH/M17/M17.4-DAYS-05-08-AUDIT.md`
- `GEMINI RESEARCH/M17/M17.4-ENHANCEMENT-MATRIX.md`
- `GEMINI RESEARCH/M17/M17.4-RESEARCH-SOURCES.md`
- `GEMINI RESEARCH/M17/M17.4-ENHANCEMENT-PLAN.json` (validated: 4 entries, all 16 fields present)

No file under `GEMINI RESEARCH/ANALYSIS/` (M16) or the M17.1 files was modified.

## Confirmation: No Curriculum Content Modified

`APPLICATION/ai-digital-learning-dashboard.jsx`, `QA/verify.mjs`, and `QA/qa-build.html` were not
opened for editing this session. Re-confirmed by direct re-run, not assumed:
- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,701
  assertions** — identical to the post-M17.2 baseline (28 days / 169 questions / 58 resources /
  56 verified, all unchanged).
- `node_modules/.bin/tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**,
  unchanged.

Only files touched this session: the four new files above, plus this state file (§48 and the
§14 checkpoint).

## State File

This entry (§48). §14 checkpoint updated: milestone line, implementation-status note, and
NEXT ACTION all updated to reflect M17.4 Batch 2's completion and its zero-content-change result.
The still-outstanding M17.3 (Day 1 browser review, queued in §47) is explicitly noted as not
superseded by this batch, since M17.4 was analysis-only and added nothing new to render.

## NEXT ACTION

**M17.5 — Owner review of Days 5-8 enhancement audit.** Not started this session. Separately, the
M17.3 Day 1 browser review from §47 remains outstanding and should happen before any further
content is implemented, even though it did not block this analysis-only batch.

---

# 49. M17.6 (BATCH 3) — CURRENT CURRICULUM ENHANCEMENT — DAYS 9–12

## Scope and Numbering

Exactly Days 9–12, per the owner's autonomous-M17 authorization ("the owner is going AFK...
continue M17 autonomously for Days 9–28, BUT ONLY under the strict rules below"). No other day
was touched or audited.

**Milestone-numbering resolution.** The owner's instruction illustrated the per-batch filename
pattern with the example "M17.3-DAYS-09-12-AUDIT.md." That number is already taken in this
project's real history: **M17.3** is the Day 1 browser review and **M17.5** is the Days 5–8
sign-off (both referenced as complete in the same instruction — see the owner-attestation note
below). To avoid colliding with real milestone numbers, **this batch and its files use `M17.6`**,
and the remaining batches continue the same resolved sequence: M17.7 = Days 13–16, M17.8 = Days
17–20, M17.9 = Days 21–24, M17.10 = Days 25–28. This is a numbering choice only — the *content*
of the batch is exactly "Batch 3" as the owner's instruction defined it.

**Owner-attestation note.** The current instruction states "M17.3 — Day 1 browser review: PASS"
and "M17.5 — Days 5–8 owner sign-off: APPROVED." Both are recorded here as owner-attested
per that instruction — **no assistant session independently witnessed either review**, consistent
with this project's established pattern (§33/M12, §37/M14.1: owner attestation is accepted as
real evidence but is explicitly distinguished from assistant-verified evidence, and neither
review's underlying content changed since it was last documented in §47/§48).

## Days Audited

9, 10, 11, 12 — read directly from `APPLICATION/ai-digital-learning-dashboard.jsx` (lines
665–942), not from memory, the closed Gemini corpus, or prior summaries.

| Day | Title | Decision | Priority |
|---|---|---|---|
| 9 | Programming Logic, Variables and Control Flow | KEEP | N/A |
| 10 | Functions, Data Structures and JSON in Practice | KEEP | N/A |
| 11 | Git and GitHub | KEEP | N/A |
| 12 | What AI Actually Is | KEEP | N/A |

## Research Sources

**Zero external sources opened**, documented explicitly (not left implicit) in
`M17.6-RESEARCH-SOURCES.md`. The pedagogical audit found no gap, dated claim, or missing-context
signal in any of the four days that would justify opening a source — the subject matter (Python
core syntax, the JSON standard, Git/GitHub's core workflow, the standard AI⊃ML⊃DL taxonomy) is
foundational and stable, unlike Day 1's genuinely dated NPU gap (M17.1/M17.2). Two candidate
angles (Day 10's API-navigation-by-type claim; Day 11's silence on git-push authentication
mechanics) were resolved by direct inspection of the existing lesson text without needing an
external fetch — both recorded as resolved with no gap, not silently dropped.

## Decision Counts

KEEP 4 · ENHANCE 0 · CLARIFY 0 · UPDATE 0 · VERIFY BEFORE CHANGE 0 · REPLACE 0.

## Priority Counts

P0 0 · P1 0 · P2 0 · P3 0.

## Implementation

**Nothing implemented.** All four days were KEEP, and KEEP is never implemented by definition —
there was no enhancement to apply the 10-condition autonomous-implementation checklist against.
This is a materially different outcome from M17.1 (1 P2 enhancement out of 4 days) and consistent
with M17.4 (0 enhancements out of 4 days) — the honest result varies batch to batch and was not
forced toward either outcome.

## Assessment Backlog

No new item added this batch. The two existing P3 items from M17.4 (§48) — Day 7's untested
API-provider-rationale objective, Day 8's untested document-database concept — were carried
forward verbatim into the newly-created cumulative file `GEMINI RESEARCH/M17/
M17-ASSESSMENT-BACKLOG.md`, not re-derived or altered.

## Resource Recommendations

None. No resource on Days 9–12 was found redundant, over-advanced, or in need of a stronger
alternative.

## Files Created

- `GEMINI RESEARCH/M17/M17.6-DAYS-09-12-AUDIT.md`
- `GEMINI RESEARCH/M17/M17.6-ENHANCEMENT-MATRIX.md`
- `GEMINI RESEARCH/M17/M17.6-RESEARCH-SOURCES.md`
- `GEMINI RESEARCH/M17/M17.6-ENHANCEMENT-PLAN.json` (validated: 4 entries, 16 fields each)
- `GEMINI RESEARCH/M17/M17-ASSESSMENT-BACKLOG.md` — **new global file, created and seeded** with
  the two carried-forward P3 items; no new item added this batch.
- `GEMINI RESEARCH/M17/M17-IMPLEMENTATION-LOG.md` — **new global file, created and seeded**
  retroactively with M17.2's Day 1 NPU implementation as its first entry (pulled from §47's full
  record); this batch added a "nothing implemented" note, not a new implementation entry.

## Confirmation No Curriculum Content Was Modified

`APPLICATION/ai-digital-learning-dashboard.jsx` was read (Days 9–12) but never opened for
editing. `QA/verify.mjs` was not touched. `QA/qa-build.html` was not rebuilt — correctly, since
nothing in `APPLICATION/` changed; rebuilding would have been a wasted, needless action.

## QA

- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,701
  assertions** — identical to the pre-batch baseline (28 days / 169 questions / 58 resources / 56
  verified, all unchanged). No drift, confirming the audit-only batch made no accidental source
  change.
- `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**, unchanged.
- No stop condition was triggered. QA held exactly at baseline both before and after.

## Owner Browser Review Required

**N/A for this batch specifically** — nothing was implemented, so there is nothing new to render
or review. The standing requirement from M17.2 (owner browser review before any *further*
autonomous batch treats a prior implementation as visually confirmed) is unaffected: M17.3's PASS
already covers the one real implementation so far (Day 1). Any future batch that *does* implement
something will need its own owner browser review before the cumulative M17 result can be
considered visually confirmed — automated verification alone is never sufficient, per this
project's standing pattern since M11.

## Next Batch

**M17.7 (Batch 4, Days 13–16) may proceed autonomously**, per the owner's standing authorization
for this autonomous run — this batch completed with no STOP condition, no P0, and QA/TypeScript
holding exactly at baseline.

---

# 50. M17.7 (BATCH 4) — CURRENT CURRICULUM ENHANCEMENT — DAYS 13–16

## Scope

Days 13–16 only, per the resolved M17 numbering sequence (M17.6 = Days 9–12, done in §49;
**M17.7 = Days 13–16**, this entry; M17.8 = Days 17–20; M17.9 = Days 21–24; M17.10 = Days
25–28). No other days touched. Batch 5 not started.

## Days Audited

All four read directly from `APPLICATION/ai-digital-learning-dashboard.jsx` (lines 947–1216),
not from memory or the closed Gemini corpus:

- **Day 13 — Machine Learning: Data, Training, Evaluation.** KEEP. Accurate, well-exampled
  (the 95%-accuracy vendor trap), all three objectives directly assessed. One pre-existing,
  already-tracked resource issue noted but not re-litigated: SkillsBuild's `verified: false`
  status (M15 §39/§40) is out of scope for a content-enhancement pass.
- **Day 14 — Deep Learning and Neural Networks.** KEEP. Correctly scoped for a beginner
  ("you do not need the maths yet"), all three objectives directly assessed. Considered and
  rejected mentioning non-transformer architectures as out of scope for this day's level — a
  correct scoping decision, not a gap.
- **Day 15 — Generative AI.** KEEP. Accurate, deliberately product/vendor-agnostic (ages well),
  directly serves this app's own instructional-design audience via its MCQ-generation hands-on
  activity, all three objectives directly assessed.
- **Day 16 — LLM Fundamentals: Tokens and Context Window.** **ENHANCE, P2, IMPLEMENTED.** The
  existing "position matters" claim about long-context reliability was verified accurate and
  current against one official Anthropic source, then enhanced by naming the phenomenon
  ("context rot") in the existing sentence. Full detail below.

## Research Sources Opened

**One**, for Day 16 only:

| Source | Org | Type | Credibility | Claim type |
|---|---|---|---|---|
| "Context windows" — `platform.claude.com/docs/en/build-with-claude/context-windows` | Anthropic | Official primary docs | A | FACT (quoted directly) |

Days 13–15 required zero external research — each was resolved to KEEP by direct pedagogical
inspection, with candidate research angles (Day 14's architecture currency, Day 15's modality
specificity) considered and resolved by reading the lesson's own scoping choices, not by
external fetch. Documented explicitly in `M17.7-RESEARCH-SOURCES.md` rather than left implicit,
continuing the honesty standard M17.6 set at zero sources for its batch.

## Decision Counts

KEEP 3, ENHANCE 1, CLARIFY 0, UPDATE 0, VERIFY BEFORE CHANGE 0, REPLACE 0.

## Priority Counts

P0 0, P1 0, P2 1, P3 0.

## Implementation: Day 16 "Context Rot"

**IMPLEMENTED**, under the owner's pre-authorized autonomous-implementation rule for P2 changes
that clear all 10 conditions. Full accounting (evidence, exact wording, why-safe reasoning) is
in `GEMINI RESEARCH/M17/M17-IMPLEMENTATION-LOG.md` and `M17.7-DAYS-13-16-AUDIT.md` — summarized:

- **What:** one clause appended to the existing Core material sentence on positional context
  reliability, naming the pattern "context rot" and attributing it to Anthropic. Nothing removed,
  no new sentence-level concept, no other segment/recap/resource/quiz touched.
- **Why it cleared the bar:** strong single-source official evidence; directly supports
  objective 3 (diagnosing context-related problems); no architecture, progression, resource, or
  quiz change required; negligible time impact (under 15 seconds of reading); implemented as a
  single conservative addition.
- **Why this is smaller in scope than M17.2's Day 1 change:** Day 1 introduced a previously-
  absent *concept* (the NPU); Day 16 only adds the *name* for an effect the lesson already
  taught correctly — a narrower, lower-risk class of enhancement.

## Assessment Backlog

**No new items.** All four days' assessments were checked against their objectives and found
adequate — Day 16's enhancement did not require or trigger a quiz change. The two carried-forward
P3 items from M17.4/§48 (Day 7 API-rationale, Day 8 document-database coverage) remain open and
unchanged in `GEMINI RESEARCH/M17/M17-ASSESSMENT-BACKLOG.md`.

## Resource Recommendations

None. No resource was added, removed, or flagged for replacement this batch.

## QA

- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → the freshness guard
  correctly failed 1 of 6,701 assertions in the interval between editing Day 16's source and
  running `node QA/build.mjs` — expected, working-as-designed, not a regression (the same
  behavior M14.1 established this guard to produce). After the rebuild: **PASSED, all 6,701
  assertions**, identical count before and after the content edit (this enhancement added no
  recap glossary term, so no new content-driven assertions were triggered, unlike M17.2's +5).
  28 days / 169 questions / 58 resources / 56 verified — all unchanged.
- `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**, unchanged.
- `QA/qa-build.html` rebuilt (506.1 KB) via `node QA/build.mjs` to reflect the Day 16 change.

**No STOP condition was triggered this batch.**

## Owner Browser Review Status

**REQUIRED for Day 16, NOT YET PERFORMED.** This is now the second implemented M17 change
awaiting visual confirmation — Day 1's NPU addition already has an owner-attested PASS (§47, via
M17.3); Day 16's "context rot" addition does not yet have any review, attested or otherwise. No
assistant session can render pixels; this entry does not claim one.

## Files Created / Changed

- `GEMINI RESEARCH/M17/M17.7-DAYS-13-16-AUDIT.md` (new)
- `GEMINI RESEARCH/M17/M17.7-ENHANCEMENT-MATRIX.md` (new)
- `GEMINI RESEARCH/M17/M17.7-RESEARCH-SOURCES.md` (new)
- `GEMINI RESEARCH/M17/M17.7-ENHANCEMENT-PLAN.json` (new, validated: 4 entries, 16 fields each)
- `GEMINI RESEARCH/M17/M17-ASSESSMENT-BACKLOG.md` (appended — a "Batch 4 additions: none" note)
- `GEMINI RESEARCH/M17/M17-IMPLEMENTATION-LOG.md` (appended — the Day 16 entry)
- `APPLICATION/ai-digital-learning-dashboard.jsx` (Day 16 object only, 1 edit location)
- `QA/qa-build.html` (rebuilt)
- `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` (this entry, §50, plus the §14 checkpoint)

## Confirmation

No curriculum content outside Day 16 was modified. No quiz question, objective, resource, or
progression-logic line was touched anywhere in this batch. No file under `GEMINI RESEARCH/`
other than the ones listed above was modified.

## NEXT ACTION

**M17.8 (Batch 5, Days 17–20) may proceed autonomously**, per standing owner authorization —
this batch completed cleanly with no STOP condition. Two implemented changes (Day 1, Day 16) now
await owner browser review; that review does not block continuing the autonomous research run
per the owner's instruction, but should happen before either change is treated as fully closed.

---

# 51. M17.8 (BATCH 5) — CURRENT CURRICULUM ENHANCEMENT — DAYS 17–20

## Scope

Days 17–20 only, per the resolved M17 batch numbering (M17.6 = Days 9–12, M17.7 = Days 13–16,
**M17.8 = Days 17–20**, M17.9 = Days 21–24, M17.10 = Days 25–28 — see §49 for why this
numbering was adopted instead of the owner instruction's illustrative "M17.3" example). No
other days touched. Batch 6 not started. Final M17 report not written.

## Days Audited

All four days read directly from `APPLICATION/ai-digital-learning-dashboard.jsx` (lines
1221–1500, `CUR_D`), not from memory or the closed Gemini corpus:

| Day | Title | Decision | Priority | Finding |
|---|---|---|---|---|
| 17 | Prompting, System Instructions and Structured Output | KEEP | N/A | None — structured-output guidance is a durable, vendor-agnostic principle, not a stale vendor-specific claim (considered and rejected as an enhancement angle, not silently skipped) |
| 18 | Embeddings and Vector Search | KEEP | N/A | None — core mechanics (embeddings, cosine distance, chunking) are stable. Minor, non-escalated observation: Hugging Face `/learn` root URL shared with Day 19 (pre-existing) |
| 19 | RAG: Retrieval-Augmented Generation | KEEP | N/A | None — pipeline description and RAG-vs-fine-tuning distinction remain standard framing. Same shared-URL observation as Day 18 |
| 20 | Tool Calling and AI Agents | KEEP | N/A | None — the five safety controls taught are architecture-level and vendor-agnostic, not tied to a specific stale product feature. This topic area was deliberately checked given how fast it moves, not assumed clean by default |

## Research Sources Opened

**Zero.** Full reasoning in `GEMINI RESEARCH/M17/M17.8-RESEARCH-SOURCES.md`, including the two
candidate angles that were explicitly considered and rejected (Day 17's structured-output
currency, Day 20's agent-safety currency) rather than left unexamined. This mirrors M17.6's
(§49) all-KEEP, zero-source outcome — not every batch produces a finding, and this session did
not manufacture one to avoid that result.

## Decision Counts

KEEP 4, ENHANCE 0, CLARIFY 0, UPDATE 0, VERIFY BEFORE CHANGE 0, REPLACE 0.

## Priority Counts

P0 0, P1 0, P2 0, P3 0.

## Implemented Changes

**None.** Every day landed on KEEP, so no enhancement existed to run through the 10-condition
autonomous-implementation checklist. `APPLICATION/ai-digital-learning-dashboard.jsx` was not
edited this batch.

## Assessment Backlog

**No additions.** Unlike M17.4/Batch 2 (§48), which found two assessment-alignment gaps (Day 7,
Day 8), full assessment-alignment review of Days 17–20 found every objective directly covered
by at least one quiz question — see the per-day "Assessment Impact" sections in
`M17.8-DAYS-17-20-AUDIT.md`. `GEMINI RESEARCH/M17/M17-ASSESSMENT-BACKLOG.md` was **not**
appended to; it still holds exactly the two carried-forward Day 7/Day 8 items.

## Resource Recommendations

None proposed for implementation. Two non-escalated observations recorded (Days 18 and 19 share
a generic Hugging Face `/learn` root URL) — noted for completeness, not flagged as a finding,
since the resource rule requires strong evidence before recommending a change and a shared root
URL across two related, already-`verified: true` days does not meet that bar.

## QA Result

- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,701
  assertions**, held exactly at the pre-batch baseline (confirmed unchanged, not just
  re-passing — no accidental drift from anything touched during the audit).
- `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**, unchanged.
- `QA/qa-build.html` was correctly **not** rebuilt — nothing in `APPLICATION/` changed this
  batch, so a rebuild would have been a no-op.

## No STOP Condition Triggered

None of the 13 STOP conditions in the owner's M17-autonomous instruction applied this batch:
no QA/TypeScript failure, no architectural change required, no P0, no replacement, no
objective/post-test rewrite needed, no progression-logic implication, no learner-state
implication, no uncertainty about safety, no conflicting research claim (none was opened), no
resource replacement, no duration increase (nothing was added).

## Files Created

- `GEMINI RESEARCH/M17/M17.8-DAYS-17-20-AUDIT.md`
- `GEMINI RESEARCH/M17/M17.8-ENHANCEMENT-MATRIX.md`
- `GEMINI RESEARCH/M17/M17.8-RESEARCH-SOURCES.md`
- `GEMINI RESEARCH/M17/M17.8-ENHANCEMENT-PLAN.json` (validated: 4 entries, 16 fields each)

Neither `GEMINI RESEARCH/M17/M17-ASSESSMENT-BACKLOG.md` nor
`GEMINI RESEARCH/M17/M17-IMPLEMENTATION-LOG.md` was appended to — both remain exactly as
Batches 3 and 4 left them (two Day 7/Day 8 backlog items; Day 1 and Day 16 implementation-log
entries).

## Confirmation Nothing Else Was Touched

`APPLICATION/ai-digital-learning-dashboard.jsx`, `QA/verify.mjs`, and `QA/qa-build.html` were
not modified. Only the four new files above plus this state-file entry (§51) and the §14
checkpoint update were changed this session.

## Owner Browser Review Status

Unchanged by this batch, since nothing was implemented here. Still exactly **two** implemented
changes await review: Day 1 (NPU addition, §47, already owner-attested PASS per the M17.3
note) and Day 16 ("context rot" addition, §50, still outstanding — no session has reviewed it
rendered).

## Next Batch

**M17.9 (Batch 6, Days 21–24) is authorized to proceed autonomously**, per the owner's standing
instruction — this batch completed cleanly with no blocker. Days 21–24 are, per project
history, Phase 6 "Trust: Evaluation and Security" — but that recollection must be re-confirmed
by reading the source directly in the next batch, exactly as this batch and all prior M17
batches have done, not assumed.

---

# 52. M17.9 (BATCH 6) — CURRENT CURRICULUM ENHANCEMENT — DAYS 21–24

## Scope

Days 21–24 only (Phase 6 "Trust: Evaluation and Security" — Days 21 eval, 22 ai-security; Phase
7 "Applied AI for Learning" — Days 23 elearning, 24 lms), read directly from
`APPLICATION/ai-digital-learning-dashboard.jsx` lines 1505–1793, not assumed from project
history or the closed M16 Gemini corpus. Batch 7 (Days 25–28, M17.10) not started. No day outside
21–24 touched.

## Days Audited

| Day | Title | Decision | Priority | Finding |
|---|---|---|---|---|
| 21 | Evaluating AI Systems | KEEP | — | No gap; methodological content, ages slowly, both resources already the strongest available primary sources |
| 22 | AI Security: Injection, Data and Keys | KEEP | — | One claim checked externally (see below); not contradicted, transparency note only |
| 23 | AI in Instructional Design | KEEP | — | No gap; already audited in M2, M8, M15 Batch 2, M16 with no issue surfacing at any pass |
| 24 | AI, the LMS and Learning Data | KEEP | — | No gap; SCORM/xAPI are stable standards, one resource caveat already investigated and disclosed in M15/§40 |

**Decision counts:** KEEP 4, ENHANCE 0, CLARIFY 0, UPDATE 0, VERIFY BEFORE CHANGE 0, REPLACE 0.
**Priority counts:** P0 0, P1 0, P2 0, P3 0.

## Research: the one targeted check this batch

Day 22 states prompt injection "has been number one in every edition" of the OWASP LLM Top 10.
The 2026 edition's own publication date (2026-08-03 — this same month, per the day's own
resource `hubungan` field) made this the one claim worth a real fetch rather than accepting on
the existing text. Two official OWASP pages were opened directly:

- `https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/` (quality A) — confirmed the
  2026 edition's publish date as FACT; the actual ranked list sits behind a gated download that
  was not opened.
- `https://genai.owasp.org/llm-top-10/` (quality A, a real link found on the first page, not
  guessed) — as fetched this session, serves the 2025 edition in full, with Prompt Injection
  ranked #1. This corroborates the lesson's claim through the 2025 edition (consistent with
  §10/M9's prior finding on the 2023/24 edition too) but does **not** independently confirm the
  2026 edition's specific ranking.

**Decision: no change.** The evidence neither meets the UPDATE bar (no evidence of inaccuracy)
nor identifies an actual discrepancy to flag as VERIFY BEFORE CHANGE — only an unreached data
point. Recorded transparently in `M17.9-DAYS-21-24-AUDIT.md` and `M17.9-RESEARCH-SOURCES.md`
rather than silently treated as fully checked. A future session with access to the gated 2026
PDF could close this; not logged as a backlog item since there is no actionable gap today.

Days 21, 23, and 24 needed no external research — each was resolved by direct inspection against
the pedagogical-audit dimensions, with the "no gap found" reasoning documented per day rather
than left as a bare KEEP with no explanation.

## Decision Counts / P0–P3

KEEP 4, ENHANCE 0, CLARIFY 0, UPDATE 0, VERIFY BEFORE CHANGE 0, REPLACE 0. P0 0, P1 0, P2 0,
P3 0. No P0 was found on Day 22 despite the topic (AI security) being exactly the kind where the
instruction called for real scrutiny — the scrutiny was applied (a genuine primary-source check
was run, not skipped because the topic "felt urgent") and came back clean.

## Changes Implemented

**None.** No day cleared the enhancement bar because no day had a gap to enhance.

## Assessment Backlog

**No additions this batch.** All three objectives on each of Days 21, 22, 23, and 24 are
directly assessed by the existing quiz (verified by explicit objective-to-question mapping
during the pedagogical audit, not assumed) — unlike M17.4's Days 7/8, no orphaned objective was
found. `GEMINI RESEARCH/M17/M17-ASSESSMENT-BACKLOG.md` unchanged from M17.4/§48 (still exactly
the two Day 7/Day 8 P3 items).

## Resource Recommendations

None. All resources on Days 21–24 remain appropriate and verified; the two existing
already-disclosed resource caveats (Day 22's NIST-RMF-under-revision note; Day 24's ADL-repo
version-currency note, both pre-dating this session) are unchanged and were not re-litigated.

## Files Created

- `GEMINI RESEARCH/M17/M17.9-DAYS-21-24-AUDIT.md`
- `GEMINI RESEARCH/M17/M17.9-ENHANCEMENT-MATRIX.md`
- `GEMINI RESEARCH/M17/M17.9-RESEARCH-SOURCES.md`
- `GEMINI RESEARCH/M17/M17.9-ENHANCEMENT-PLAN.json` (validated: 4 entries, 16 fields each)

`GEMINI RESEARCH/M17/M17-ASSESSMENT-BACKLOG.md` and `M17-IMPLEMENTATION-LOG.md` were **not**
appended to this batch — nothing new to add.

## QA

- `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx` → **PASSED, all 6,701
  assertions**, identical before and after this batch (confirms no accidental drift from an
  audit-only pass). 28 days / 169 questions / 58 resources / 56 verified all unchanged.
- `tsc --noEmit --allowJs --jsx react --target es2020` → **0 diagnostics**, unchanged.
- `QA/qa-build.html` correctly **not** rebuilt — nothing in `APPLICATION/` changed this batch.

## Owner Browser Review

Not applicable to this batch — nothing was implemented, so there is nothing new requiring
review. The two outstanding items from earlier batches are unchanged: Day 1's NPU addition
(§47, owner-attested PASS per the M17.3 note) and Day 16's "context rot" addition (§50, still
outstanding, unreviewed by anyone).

## Confirmation: No Curriculum/Application File Modified

`APPLICATION/ai-digital-learning-dashboard.jsx` was read (not edited) this batch.
`QA/verify.mjs` was not touched. `QA/qa-build.html` was not rebuilt (nothing to reflect). Only
the four files listed above plus this state-file entry (§52) and the §14 checkpoint update were
changed.

## NEXT ACTION

**M17.10 (Batch 7, Days 25–28 — the final content batch) may proceed autonomously**, per
standing owner authorization. This batch completed cleanly with no STOP condition. After Batch
7, the cumulative `M17-FINAL-REPORT.md` and the closing M17 state-file update are the only
remaining steps — do not start those before Batch 7 is done and independently verified.

> **This NEXT ACTION never happened and is now superseded.** M17.10 (old Days 25–28) was not
> run. Instead, sometime before 2026-08-15 22:27, the whole file was replaced by the V2
> rewrite. See §53.

---

# 53. V2 REWRITE — STATE RECONCILIATION (2026-08-16, read-only audit)

## Why this section exists

A read-only repository audit on 2026-08-16 found that `ai-digital-learning-dashboard.jsx` no
longer matches §§1–14 of this file at all. This section reconciles the state file with the code
as it actually stands. **No source file was modified to produce this section** — everything
below comes from reading `APPLICATION/ai-digital-learning-dashboard.jsx` directly, reading the
`CLAUDE-CODE-V2-CONTEXT/` and `CLAUDE-CODE-V2-CONTEXT/M19/` documents, and comparing file
modification timestamps. Verification-tool results are in §54, not here.

## What changed

The entire Layer 1 content model was replaced:

| | Old (§§1–14, through M17.9) | Current (code as of 2026-08-15 22:27) |
|---|---|---|
| Unit of content | 28 days (`CUR_A..CUR_E`, `DOMAINS`, `SUB_INDEX`) | 25 modules → micro-learnings (`MODULES`) |
| Phases | 9 (P1–P9) | 4 (`PHASES`, per `V2-ARCHITECTURE-SOURCE-OF-TRUTH.md`) |
| State shape | `{ version:1, lessons, tests }` | `{ version:2, micros, postTests }` — see `STATE_VERSION`/`EMPTY_STATE`, line ~1239 |
| Storage key | `ai-learning-os-v1` | unchanged (`ai-learning-os-v1`) — only the `version` field inside the record changed |
| Migration | — | **None.** A `version:1` record is deliberately routed into the existing "unknown version" quarantine path (backup + blocked save + explicit "start fresh"). Comment at line 1239 states this is intentional: "the underlying content taxonomy changed completely... there is no honest 1:1 mapping." |
| File size | 2,571 lines (§1) | 3,825 lines |
| Views | Dashboard/Learning path/Progress/Resources/Review/History/Lesson/Post-test (§9) | `EntryView`, `IntroductionView`, `JourneyView`, `ModuleListView`, `ModuleView`, `MicroView`, `ProgressView`, `ResourcesView`, `ReviewView`, `HistoryView`, `PostTestView` |

No trace of `CUR_A`, `DOMAINS`, `CURRICULUM`, or `SUB_INDEX` remains in the file (`grep` returned
zero matches). This was not an incremental edit; the old curriculum was removed, not deprecated
in place.

## Content actually in the code today (by direct inspection, cross-checked against §54's verify.mjs run)

- **25 modules**, matching `V2-ARCHITECTURE-SOURCE-OF-TRUTH.md` §6 module inventory exactly
  (titles, numbering, phase groupings 1–8/9–13/14–18/19–25 all match).
- **84 micro-learnings**, not 85. `CLAUDE-CODE-V2-CONTEXT/M19/M19-FINAL-MICROLEARNING-COUNT.md`
  states the locked M19 output is 85, but also documents (in its "M19.1 Audit Addendum") a
  *proposed, explicitly-not-applied* merge of Module 14's objectives 14.1+14.2 into one
  micro-learning titled "The AI Landscape: Automation, AI, ML & Generative AI", which the
  addendum itself frames as "a recommendation for the owner/next content pass, not a correction
  applied in M19.1."
  **That exact merge is present in the code**: Module 14 (`APPLICATION/...jsx` line ~753) has
  micro `14-01` titled verbatim "The AI Landscape: Automation, AI, ML & Generative AI", and
  Module 14 has 3 micros, not 4. This means a change the M19 documentation explicitly marked as
  "not applied, awaiting owner/next content pass" **was applied in the code rewrite**, and
  `M19-FINAL-MICROLEARNING-COUNT.md` was never updated to say so — the two documents (M19 count
  doc vs. running code) now disagree about the count (85 vs. 84) and neither was corrected to
  match the other.
- **Only 6 of 25 modules carry a `resources:` array** (grep for `resources:` under `MODULES`
  found matches at 6 locations). The other 19 modules have no external resources at all. This is
  a content gap, not a bug — the M19 docs never claimed resources were authored yet — but it
  means the resource layer is far from complete for a 25-module course.
- `QA/qa-build.html` was rebuilt at 2026-08-15 22:28, one minute after the source file's last
  edit (22:27) — consistent with `node QA/build.mjs` having been run once after the rewrite, so
  the static QA artifact is not stale relative to source as of that moment. Whether it has been
  rebuilt since cannot be determined from timestamps alone.

## The authorization question — RESOLVED 2026-08-16, see §55 item 1

*(Section title as originally written, 2026-08-16 read-only audit: "The authorization question
this section does NOT resolve." At that point in the session it genuinely didn't — the owner
had not yet been asked. It has since been asked and answered; kept as history below.)*

`CLAUDE-CODE-V2-CONTEXT/CLAUDE-CODE-V2-CONTEXT.md` (M19 phase instructions) states explicitly:
"The next task is NOT application implementation" and "STOP after producing the M19
architecture/consolidation output. Do not implement. Wait for owner approval before application
changes." `CLAUDE-CODE-V2-CONTEXT/M19/M19-FINAL-MICROLEARNING-COUNT.md` closes with "**M19 Level-2
Curriculum Consolidation: architecture complete. No application changes made. Awaiting owner
review and approval before any implementation phase begins.**"

File timestamps establish a plain sequence, nothing more:

| File | Last modified |
|---|---|
| `CLAUDE-CODE-V2-CONTEXT/M19-LEVEL-2-CONSOLIDATION.md` | 2026-08-14 23:04 |
| `CLAUDE-CODE-V2-CONTEXT/M19/M19-FINAL-MICROLEARNING-COUNT.md` (contains the "awaiting approval" line above) | 2026-08-14 23:30 |
| `APPLICATION/ai-digital-learning-dashboard.jsx` (V2 rewrite) | **2026-08-15 22:27** |

The rewrite postdates the "awaiting owner review and approval" statement by roughly 23 hours.
At the time this section was first written, it was not known whether owner approval had been
obtained out-of-band (a conversation not captured in any repo file) between those two
timestamps, and no repository file recorded such an approval — so this was logged as an open
question, not as a finding that the rewrite was unauthorized, and not as an assumption that it
was authorized.

**RESOLVED — APPROVED, 2026-08-16.** The owner has since directly confirmed the V2 rewrite as
the approved application baseline. See **§55 item 1** for the closure record. The gap in the
paper trail described above (no recorded approval between 2026-08-14 23:30 and 2026-08-15
22:27) is now moot — approval has been given directly, regardless of that earlier gap.

## Old curriculum disposition — RESOLVED 2026-08-16, see §55 item 3

*(Section title as originally written: "Old curriculum disposition — unresolved." True when
written; resolved since. Kept as history below.)*

`M19-FINAL-MICROLEARNING-COUNT.md` §"Modules Requiring Owner Review Before Content Authoring"
item 4 states: "Old Days 1–11 and 25–28 (19 of 28 existing days) fall entirely outside the V2
architecture; **owner must decide their fate (archive / separate track / retire) before any
future application change**." That decision was not recorded anywhere in the repository at the
time this section was written. The old 28-day content is not present in the current
`ai-digital-learning-dashboard.jsx` at all — so the content itself exists only in this state
file's **§§0–52** historical record (ARCHIVED/HISTORICAL, per the banner at the top of this file
and at the start of §0) and in the `PROJECT KNOWLEDGE/` and `GEMINI RESEARCH/` trees (which
describe the same archived curriculum but were not themselves marked during this
synchronization pass), not in a recoverable code form.

**RESOLVED — ARCHIVE, 2026-08-16.** The owner decided: archive. Not a separate track, not
retired — archived and preserved for reference only, not part of the current V2 application,
and not to be reintroduced. See **§55 item 3** for the closure record.

## What is verified vs. unverified for the current V2 code

This section states only what was true **before** the read-only verification run described in
§54. See §54 for actual tool output.

- **Not verified by any prior session for the V2 rewrite specifically**: no entry anywhere in
  this file (§§0–52) or in `CLAUDE-CODE-V2-CONTEXT/` records a `verify.mjs` or `tsc` run against
  the post-rewrite file. The rigorous per-batch verification discipline visible throughout
  M0–M17.9 (§10, §14: every content change paired with a `verify.mjs` run and a `tsc` run,
  recorded with exact assertion counts) has no counterpart for the V2 rewrite anywhere in the
  repository prior to 2026-08-16.
- `QA/verify.mjs` (file dated 2026-08-15 01:01, i.e. already adapted to reference `MODULES`,
  `PHASES`, `phaseOfModule` before the final rewrite landed) is confirmed by direct reading to
  target the V2 shape, not the old one — so it is at least the *correct* tool for the current
  code, independent of whether it has been run and passed.
- Nothing about JSX rendering, `window.storage` round-trip under `version:2`, responsive layout,
  or the new views (`EntryView`'s cursor-repel animation, `IntroductionView`'s 3-step flow,
  `ModuleView`/`MicroView`) has ever been observed running in a browser, by any session, per any
  document in this repository.

## Design-system status

**RESOLVED 2026-08-16 — see §55 item 2.** This was originally addressed by adding
REQUIRES-OWNER-CONFIRMATION notices to root `DESIGN.md`, `DESIGN-REFERENCES/STITCH/
MASTER-DESIGN-DECISION.md`, and `DESIGN-REFERENCES/STITCH/README.md`, since those two documents
disagreed on which of "Guided Editorial" vs. "Aetheris Narrative" was current and no repository
file recorded an owner approval for either. **The owner has since confirmed Aetheris Narrative
explicitly.** Root `DESIGN.md` has been synchronized to carry the Aetheris token set verbatim and
both design documents now state APPROVED. This remains a documentation-only decision: no
application code was touched, and the live app's Tailwind classes (slate/blue palette) still
match neither document's token set — applying Aetheris Narrative to the JSX is a distinct,
not-yet-authorized future task.

---

# 54. VERIFICATION RUN (2026-08-16, read-only)

Both commands were run directly against the current `APPLICATION/ai-digital-learning-dashboard.jsx`
(the V2 file described in §53). Neither command, nor any other file, was modified to make these
pass — this is a report of actual output, not a claim manufactured to look clean.

## `node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx`

```
verify.mjs — APPLICATION/ai-digital-learning-dashboard.jsx
==========================================================
PASSED  all 5368 assertions
        25 modules · 84 micro-learnings · 84 recall questions · 25 post-tests (120 pool questions) · 6 resources (6 verified)
==========================================================
        short-answer strictness: need 1 × 5 — check this line when reviewing a content change
==========================================================
Not covered here: JSX syntax, React rendering, window.storage round-trip,
layout, and whether any resource URL actually resolves.
Also NOT enforced: the `need` threshold on a short answer. Lowering one is a
content decision, so no assertion can flag it — every heuristic tried also
failed legitimate single-idea questions. Watch the strictness line above.
```

**Result: PASSED, 5368/5368 assertions.** This confirms content-integrity, progression, grading,
and structural invariants hold for the V2 shape as written. It does **not** confirm anything the
tool's own footer disclaims: JSX syntax validity, React rendering, `window.storage` round-trip,
layout, or resource URL liveness (only 6 resources exist to check at all — see §53).

Confirms the §53 count discrepancy from direct code reading: the tool independently reports
**84** micro-learnings, matching the code, not the **85** locked in
`M19-FINAL-MICROLEARNING-COUNT.md`.

## `npx tsc --noEmit --allowJs --jsx react --target es2020 APPLICATION/ai-digital-learning-dashboard.jsx`

Output: **empty**. Exit code: **0**. Zero diagnostics.

**Result: PASSED — the file is syntactically valid JSX/JS under this compiler configuration.**

**Negative control performed** (per the §15 resume-protocol instruction to never trust a silent
pass without one): a scratch copy of the file (outside the repo, deleted immediately after) had
one line replaced with an intentionally malformed expression. The same `tsc` command against
that copy reported `error TS1135: Argument expression expected` at the injected line. This
confirms the checker is actually running and would have caught a real syntax defect, not
silently no-op'ing. The repository file itself was never touched for this control.

## What these two results do and do not establish

**Established:** the current V2 file is syntactically valid TypeScript-parseable JSX, and its
content/logic layer is internally consistent per `verify.mjs`'s 5368 assertions (which cover
content shape, progression rules, grading, and the same categories of checks §10 describes for
the old curriculum).

**Not established by these two commands, and not established by any other record in this
repository:** that the app renders correctly in a browser, that `window.storage` persistence
round-trips under `version:2`, that any of the new views (`EntryView`, `IntroductionView`,
`ModuleView`, `MicroView`) behave as intended when actually clicked through, that the responsive
layout works, or that the 6 existing resource URLs resolve. This matches the "IMPLEMENTED — NOT
VERIFIED" / "NOT STARTED" pattern §10 used for the old curriculum — the same category of gap
exists here, just not yet itemized in a table the way §10 did.

## Exact next decision required from the owner

**ALL FOUR ITEMS BELOW WERE CLOSED BY THE OWNER ON 2026-08-16 — see §55 for the full record.**
Kept verbatim (not deleted) as the historical record of what was open and for how long:

1. ~~**Was the V2 rewrite of `ai-digital-learning-dashboard.jsx` (2026-08-15 22:27) approved?**
   M19's own documents said to wait; no repository file records that approval was given. Until
   answered, no further content authoring or UI work on top of the V2 file should be treated as
   building on approved ground.~~ → **APPROVED. Treated as current application baseline and
   source of truth.** (§55 item 1)
2. ~~**Which design direction is current — "Guided Editorial" (root `DESIGN.md`) or "Aetheris
   Narrative" (`MASTER-DESIGN-DECISION.md`)?** Both are now marked REQUIRES OWNER CONFIRMATION
   in-place (§ above).~~ → **Aetheris Narrative APPROVED as Master Design Direction. Not yet
   implemented in JSX.** (§55 item 2)
3. ~~**What happens to the old 28-day curriculum** (Old Days 1–11 and 25–28, 19 of 28 days, per
   `M19-FINAL-MICROLEARNING-COUNT.md`'s own open item) — archive, separate track, or retire? It
   currently exists nowhere except this file's historical §§1–14 and the `GEMINI RESEARCH/` /
   `PROJECT KNOWLEDGE/` trees.~~ → **ARCHIVE. §§0–52 of this file marked ARCHIVED/HISTORICAL.
   Not to be reintroduced.** (§55 item 3)
4. ~~**Is the Module 14 micro-merge (85→84) — applied in code but only "recommended, not
   applied" in `M19-FINAL-MICROLEARNING-COUNT.md`'s M19.1 addendum — the owner's intended
   final count?** If yes, `M19-FINAL-MICROLEARNING-COUNT.md` needs updating to match (a
   documentation task, not a code task). If no, the code and the M19 documents disagree on
   content, not just bookkeeping.~~ → **YES, 84 is APPROVED as final. All five M19 documents
   synced to match (`M19-FINAL-MICROLEARNING-COUNT.md`, `M19-LEARNING-OBJECTIVE-MAP.md`,
   `M19-MICROLEARNING-MAP.md`, `M19-ASSESSMENT-MAP.md`, `M19-CONSOLIDATION-LOG.md`).** (§55
   item 4)

*(Original closing line, now superseded: "Nothing in this section was resolved unilaterally;
all four items are posed as open questions." That was true when written — resolution came
later, from the owner, not from this session's own judgment.)*

---

# 55. OWNER DECISIONS — CLOSED (2026-08-16, documentation synchronization)

## Why this section exists

§54 closed with four open questions for the owner. The owner has reviewed and answered all four
directly. This section is the closure record and the synchronization log for the documentation
changes made as a result. **No source code was touched to produce this section or the related
edits below** — `APPLICATION/ai-digital-learning-dashboard.jsx` was not modified; see
"Application integrity check" below for the before/after proof.

## The four decisions

1. **V2 rewrite authorization — APPROVED.** The V2 implementation in
   `APPLICATION/ai-digital-learning-dashboard.jsx` (25 modules, 4 phases, micro-learnings —
   described in §53) is the approved baseline and current application source of truth. It is not
   to be questioned or rolled back. The open authorization question §53 raised (rewrite postdated
   M19's "awaiting owner approval" status by ~23 hours with no recorded approval trail) is now
   moot — approval has been given directly, regardless of the earlier gap in the paper trail.

2. **Design direction — Aetheris Narrative APPROVED as Master Design Direction.**
   `DESIGN-REFERENCES/STITCH/MASTER-DESIGN-DECISION.md` is the authoritative design decision
   record. Root `DESIGN.md` has been synchronized (in a separate, prior documentation pass) to
   carry the Aetheris Narrative token set and prose verbatim, with an explicit source-of-truth
   hierarchy. **This is a design-direction approval, not a UI-implementation instruction.**
   `APPLICATION/ai-digital-learning-dashboard.jsx` still renders plain Tailwind slate/blue
   utility classes, unrelated to the Aetheris token system — applying the approved direction to
   the actual interface remains a distinct, not-yet-authorized future task.

3. **Old 28-day curriculum — ARCHIVE.** The pre-V2 curriculum (28 days, 9 phases, `DOMAINS`/
   `CURRICULUM`/`CUR_A`–`CUR_G`) is no longer part of the V2 application and must not be
   reintroduced. It is preserved as historical documentation only, in §§0–52 of this file (now
   explicitly marked ARCHIVED/HISTORICAL at the top of this file and at the start of §0), and in
   the `GEMINI RESEARCH/` and `PROJECT KNOWLEDGE/` trees (neither of which was touched by this
   synchronization pass — both remain implicitly historical by the same logic, since they
   describe the same archived curriculum, but were out of scope for this session's edits).
   `M19-CONSOLIDATION-LOG.md` §4 item 4 and `M19-FINAL-MICROLEARNING-COUNT.md`'s "Modules
   Requiring Owner Review" item 4 have both been marked RESOLVED/CLOSED to match.

4. **Final micro-learning count — 84 APPROVED.** The Module 14 merge (former objectives/micros
   14.1 "AI vs. automation" + 14.2 "AI/ML/GenAI taxonomy" → single merged 14.1, "The AI
   Landscape: Automation, AI, ML & Generative AI") that `M19-FINAL-MICROLEARNING-COUNT.md`'s
   M19.1 addendum had flagged as "a recommendation for the owner... not applied" is now approved
   **and confirmed already applied in code** — `APPLICATION/ai-digital-learning-dashboard.jsx`
   module 14 has exactly this merged micro at ID `14-01`, and `node QA/verify.mjs` independently
   reports 84 micro-learnings against the current file (see "Verification" below). No curriculum
   content was changed to produce this match — the code already had it; only the documentation
   was out of date.

## Documentation files synchronized this session

All edits below are documentation-only. None touched
`APPLICATION/ai-digital-learning-dashboard.jsx`, curriculum runtime, question banks, or
application behavior in any way.

| File | What changed |
|---|---|
| `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` (this file) | Top banner and §0 marked §§0–52 ARCHIVED/HISTORICAL; §53 "Design-system status" and §54 "Exact next decision" updated to point to this closure; this §55 added. |
| `CLAUDE-CODE-V2-CONTEXT/M19/M19-FINAL-MICROLEARNING-COUNT.md` | Module 14 row (4→3), phase table and grand total (85→84, with historical pre-merge table preserved and struck through), sanity-check percentages recomputed, "Modules Requiring Owner Review" items 4 and 7 marked RESOLVED, M19.1 addendum's merge paragraph marked APPROVED AND APPLIED, closing Status section rewritten to record all four owner decisions. |
| `CLAUDE-CODE-V2-CONTEXT/M19/M19-LEARNING-OBJECTIVE-MAP.md` | Module 14 objective rows merged/renumbered (14.1+14.2→14.1, old 14.3→14.2, old 14.4→14.3); Phase 3 count 18→17, total 85→84; historical pre-merge figures preserved with a superseded note. |
| `CLAUDE-CODE-V2-CONTEXT/M19/M19-MICROLEARNING-MAP.md` | Module 14 micro rows merged/renumbered to match the code exactly (`14-01` title copied verbatim from the JSX); Phase 3 count and total updated; historical note added. |
| `CLAUDE-CODE-V2-CONTEXT/M19/M19-ASSESSMENT-MAP.md` | Module 14 recall-question rows merged/renumbered; added a note explaining the dropped `ai-ml-genai` recall row is still assessed at the post-test-pool level (confirmed present in the code's Module 14 `postTest.pool`). |
| `CLAUDE-CODE-V2-CONTEXT/M19/M19-CONSOLIDATION-LOG.md` | §1 rows for old Days 12/13/14/15 updated to the new M14 numbering; §4 item 4 (old-curriculum disposition) marked RESOLVED — ARCHIVE; status banner added at top. |

Not modified (out of scope for this pass, per the owner's file list): `DESIGN.md`,
`DESIGN-REFERENCES/STITCH/MASTER-DESIGN-DECISION.md`, `DESIGN-REFERENCES/STITCH/README.md`
(already synchronized in an earlier session), `CLAUDE-CODE-V2-CONTEXT/M19/M19-DEPENDENCY-MAP.md`
(checked — contains no references to the old M14 objective/micro numbering, so no update was
needed), `GEMINI RESEARCH/`, `PROJECT KNOWLEDGE/`, and
`APPLICATION/ai-digital-learning-dashboard.jsx`.

## Verification (read-only, run after the documentation edits above)

```
$ node QA/verify.mjs APPLICATION/ai-digital-learning-dashboard.jsx
verify.mjs — APPLICATION/ai-digital-learning-dashboard.jsx
==========================================================
PASSED  all 5368 assertions
        25 modules · 84 micro-learnings · 84 recall questions · 25 post-tests (120 pool questions) · 6 resources (6 verified)
==========================================================
```

```
$ npx tsc --noEmit --allowJs --jsx react --target es2020 APPLICATION/ai-digital-learning-dashboard.jsx
(no output — 0 diagnostics, exit code 0)
```

Both results are identical to the prior verification run recorded in §54, because the source
file has not changed between the two runs (see integrity check below) — these commands verify
the *application*, and this session's edits were all to *documentation*, so an unchanged result
is the expected and correct outcome, not a no-op check.

## Application integrity check

```
$ md5sum APPLICATION/ai-digital-learning-dashboard.jsx
06185edbab98bd4e9cc6eaadb2ce89c2  APPLICATION/ai-digital-learning-dashboard.jsx
```

Hash and mtime (2026-08-15 22:27:45) both confirmed identical before this documentation
synchronization pass began and after it ended. `ai-digital-learning-dashboard.jsx` was not
modified, UI was not implemented, no UI components were added, and curriculum runtime/question
banks/application behavior were not changed — consistent with every constraint the owner set for
this task.

## What is still genuinely open

- **Applying Aetheris Narrative to the actual UI** is approved *as a direction*, not
  authorized as an implementation task. A future session needs an explicit go-ahead before
  touching `APPLICATION/ai-digital-learning-dashboard.jsx` for this purpose.
- **`GEMINI RESEARCH/` and `PROJECT KNOWLEDGE/`** were not updated with archived/historical
  markers in this pass (out of scope — not in the owner's approved file list for this task).
  They describe the same archived old curriculum as §§0–52 of this file, so the same "do not
  treat as current" caveat applies to them by inference, but they don't yet say so themselves.
- **Only 6 of 25 V2 modules have a `resources:` array** (unchanged fact from §53) — content
  authoring for the other 19 modules' resources remains undone. Not part of this
  synchronization task.
- **Items 5 and 6 in `M19-FINAL-MICROLEARNING-COUNT.md`'s "Modules Requiring Owner Review"
  list** (Old Day 24's four-way content split; the M13→M25 dependency) were left open — the
  owner's four decisions this session did not address them, and this synchronization pass did
  not invent a resolution for them.

---
