DESIGN-SYSTEM-MASTER

# DESIGN SYSTEM MASTER — AI & Digital Learning Journey

> STATUS: DRAFT — specification only. No application code has been changed to produce this
> document. This is the Layer 3 (UI) implementation source of truth for the upcoming redesign
> pass. It does not authorize implementation by itself — applying it to
> `APPLICATION/ai-digital-learning-dashboard.jsx` is a separate, future task requiring its own
> explicit go-ahead, per the same rule already established for the Aetheris Narrative direction
> (`DESIGN.md`, `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §55).

**Source-of-truth hierarchy used to write this document** (same order the project already uses):
explicit owner instruction → root `DESIGN.md` (Aetheris Narrative tokens) →
`DESIGN-REFERENCES/STITCH/MASTER-DESIGN-DECISION.md` → the Aetheris Stitch screens
(`DESIGN-REFERENCES/STITCH/01-MASTER-DIRECTION/AETHERIS-NARRATIVE/`) → the approved Entry
Experience and other existing working behavior in the live JSX → the alternative Stitch
directions and generic `UIREF*`/`Refference*` mood images, used only for pattern comparison.

**A note on current implementation state**, because it shapes several decisions below: the live
JSX is **not** uniformly un-styled Tailwind slate/blue. Grep evidence: Aetheris hex values
(`#0058bc`, `#1a1b1f`, `#414755`, `#717786`, `#c1c6d7`, `#faf8fe`, `#f4f3f8`, `#ba1a1a`,
`#ffdad6`) already appear ~150 times across the newer/currently-routed screens — `EntryView`,
`IntroductionView` and its three steps, `ModuleView`, `MicroView`, `PostTestView`,
`ModuleLearningPathDrawer`, the app shell (`LearningDashboard`) chrome, and `JourneyView`. Plain
Tailwind `slate-*`/`blue-*`/`emerald-*` utilities (~200 occurrences) remain concentrated in the
**orphaned-from-nav** views (`ModuleListView`, `ProgressView`, `ResourcesView`, `ReviewView`,
`HistoryView`, `StatTile`) and in parts of the shared `TONE` lookup (`emerald`, `orange`, `slate`
entries are still plain Tailwind; `blue` and `rose` are already hex). Treat this as a
**partial migration already in progress**, not a blank canvas — the token system below formalizes
and completes a direction the code has already started moving toward on its own.

---

## 1. Design Principles

1. **Content leads, chrome recedes.** The learner's current focus (a headline, a question, a
   paragraph of lesson content) is always the visually dominant element on screen. Navigation,
   drawers, and status chrome are quiet by default and only assert themselves when opened.
2. **One primary action per screen.** Every screen answers WHERE AM I / WHAT AM I LEARNING /
   WHAT DO I DO NEXT with exactly one dominant next step — never a grid of equally-weighted
   options. This is already the rule `ModuleView` documents in its own comments; it governs the
   whole product, not just that screen.
3. **Structure over decoration.** Hierarchy comes from typography scale, whitespace, and hairline
   rules — not from boxes, shadows, or color-blocking. Cards are the exception, not the default
   (see §11).
4. **Calm, not sparse.** Generous whitespace and restraint communicate confidence, not emptiness.
   Every element that remains earns its place; nothing is added merely to fill space.
5. **Guided, not gated.** The interface always shows the learner what's next and why something is
   locked (see §10) — locking is explained, never just enforced silently.
6. **Motion clarifies, it doesn't decorate.** Every transition either shows *where something came
   from* (entrance), *what changed* (progress/completion), or *what's about to happen*
   (drawer/hover). No motion exists purely for flourish, and everything degrades cleanly for
   `prefers-reduced-motion`.
7. **One accent, used deliberately.** Blue (`primary`, `#0058bc`) marks the path forward — CTAs,
   the active/current state, links. It is not used decoratively; if a color isn't communicating
   "this is the way forward" or a semantic learning state, it should be ink, muted text, or a
   neutral surface.
8. **Never a dashboard.** No stat-wall, no widget grid, no admin-panel density. Progress and
   history are available (Review, Resources, the Learning Path drawer, post-test history) but are
   secondary destinations the learner opts into — not the default view.

---

## 2. Color System

All values are the existing Aetheris Narrative tokens from root `DESIGN.md` — nothing here is a
new hex invention except where explicitly marked "not in Aetheris" below.

| Role | Token | Hex | Notes |
|---|---|---|---|
| Page background | `surface` / `background` | `#faf8fe` | Already the app shell's `bg-[#faf8fe]`. |
| Primary text | `on-surface` | `#1a1b1f` | Headlines, body copy, primary labels. |
| Secondary text | `on-surface-variant` | `#414755` | Sub-headlines, descriptions, eyebrow (light tone), body copy on drawers. |
| Muted text | `outline` | `#717786` | Timestamps, placeholder-weight metadata, back-link idle state. |
| Primary accent | `primary` | `#0058bc` | CTAs, active nav item accent, current-state rings, links. |
| Accent hover | `on-primary-fixed-variant` | `#004493` | Already the Button primary hover — keep as-is. |
| Borders | `outline-variant` | `#c1c6d7` | Card borders, hairline rules, input borders (default state). |
| Surface (raised, e.g. cards) | `surface-container-lowest` | `#ffffff` | `Card` background. |
| Surface (recessed, e.g. drawers/rails) | `surface-container-low` | `#f4f3f8` | Right drawer bg, tablet rail bg candidate. |
| Surface (grouped/hover) | `surface-container` / `surface-container-high` | `#efedf3` / `#e9e7ed` | Row hover states, subtle groupings (replaces `hover:bg-slate-50/100`). |
| Success | *(not in Aetheris — retained)* | `emerald-600` / `emerald-50` | Aetheris has no green. The existing emerald pairing is already load-bearing (completed modules/micros, `STATUS_META`) and is desaturated enough to sit quietly beside Aetheris's restrained palette. Keep it as the system's success color rather than inventing a new one. |
| Warning / attention | *(not in Aetheris — retained)* | `orange-500` / `orange-50` | Used for "answered, not verified/unverified resource" and "done but incorrect" states. Same reasoning as success. |
| Locked / disabled | `outline` on `surface-container` | `#717786` text on `#efedf3`, or `outline-variant` `#c1c6d7` for disabled borders/icons | Replaces `text-slate-400` / `bg-slate-100`. |
| Error / assessment-failed | `error` / `error-container` | `#ba1a1a` / `#ffdad6` | Already the app's `TONE.rose`. Used for failed recall/post-test feedback, danger button. |

**Do not add new hues.** Every screen's palette should reduce to: ink (`on-surface` /
`on-surface-variant` / `outline`), one accent (`primary`), neutral surfaces
(`surface*` / `outline-variant`), and the three semantic states (success/warning/error) used only
where they mean something (never decoratively).

---

## 3. Typography

**Family:** Hanken Grotesk, all roles (per `DESIGN.md`). Falls back to the existing system
sans-serif stack until the font is actually loaded — loading it is an implementation-phase task,
not a decision this document needs to make.

| Role | Desktop | Mobile | Weight | Tracking | Existing equivalent |
|---|---|---|---|---|---|
| Eyebrow | 12px / 16px | same | 600 | +0.05em, uppercase | `Eyebrow` component — keep as-is |
| Display / hero (Entry only) | 48px / 56px | 32–36px | 700 | −0.02em | `EntryView` h1 (`text-4xl sm:text-5xl`) |
| H1 (screen headline) | 32px / 40px | 28px / 34px | 600 | −0.01em | Journey/Module `text-3xl sm:text-4xl` / `text-4xl sm:text-5xl` |
| H2 (section) | 20–24px | 18–20px | 600 | normal | `ModuleListView`/`ProgressView` `text-lg`/`text-2xl` headers |
| H3 (card/row title) | 16px | 15–16px | 600 | normal | `ModuleCard` title, `StatTile` label row |
| Body | 15–16px / 24–28px line-height | 15px | 400 | normal | `MicroView` lesson paragraphs (`text-[15px] leading-relaxed`) |
| Small / meta | 12–13px | 12px | 400–500 | normal | timestamps, "~5 min", micro counts |
| Button | 14–15px | 14px | 500 | normal | existing `Button` `sm`/`md`/`lg` sizes — keep |
| Progress labels | 11–12px | 11–12px | 600 | +0.05em, uppercase | "Learning Path" rail label, phase labels |

Line-height minimum 1.5× for body copy (per `DESIGN.md`); headlines may run tighter
(1.1–1.2×) for editorial impact, matching what's already implemented.

---

## 4. Spacing System

Base unit **8px**, matching `DESIGN.md`'s `spacing.unit`. Scale:

| Token | px | Typical use |
|---|---|---|
| `space-1` | 4 | icon-to-label gap, tight inline spacing |
| `space-2` | 8 | within a control (e.g. button icon gap) |
| `space-3` | 12 | list-row internal padding |
| `space-4` | 16 | card padding, form field gaps |
| `space-6` | 24 | between related elements in a content block |
| `space-8` | 32 | between a heading and its content |
| `space-10` | 40 | between major blocks within a screen |
| `space-14` | 56 | screen-section separation (e.g. Journey's hero → phase path) |
| `space-16`+ (up to `section-gap` 120px) | 64–120 | top-level section breaks on long/marketing-style screens (Entry, Intro) only — not dense learning screens |

Rule from `DESIGN.md`, already followed in the code: tight grouping *within* a unit (8–16px),
looser separation *between* units (24–40px), and reserve the largest gaps (64px+) for
hero/orientation screens (Entry, Introduction) rather than the working screens (Module,
Micro-learning, Post-test), which should stay information-dense-but-calm, not airy for its own
sake.

---

## 5. Layout System

- **Max content width:** `max-w-3xl` (≈768px) for reading/working screens (Micro-learning,
  Module Overview, Post-test, Progress/Review/Resources/History detail); `max-w-5xl` (≈1024px)
  for Journey (it carries a hero + phase map); no screen should exceed `max-w-5xl` — this product
  is never full-bleed-dashboard-wide except Entry/Introduction, which are intentionally centered
  within `max-w-xl`/`max-w-3xl` regardless of viewport.
- **Page margins:** desktop 64px (`DESIGN.md` `margin-desktop`), mobile 20px
  (`margin-mobile`) — already approximated by the existing `px-4 py-6 sm:px-6 lg:px-8` scale on
  `<main>`; align these to the token values during implementation rather than inventing new ones.
- **1440×900 is a reference viewport only** — it is where screens were designed/reviewed, not a
  fixed canvas. Nothing should be pinned to 1440px; content centers within its max-width and the
  surrounding space is margin, at any viewport ≥ the content's max-width.
- **Desktop behavior (lg+, ≥1024px):** content centers in its max-width; left app nav is a
  drawer-on-demand via an edge trigger tab (never a persistent sidebar — see §8); right Learning
  Path drawer likewise edge-triggered.
- **Tablet behavior (md–lg, 768–1023px):** left nav becomes a permanent icon-only rail
  (`TabletRail`) rather than a drawer — the one deliberate exception to "nav is always a
  drawer," justified because a hamburger-only nav at this width tests poorly for discoverability;
  keep this exception, don't remove it during the redesign.
- **Mobile behavior (<640px):** header bar with hamburger + streak chip; nav is a full-overlay
  drawer; decorative-only elements (Entry's floating icon field) are absent, not just hidden —
  don't render 13 icons behind a `display:none` on a phone.
- **Vertical rhythm:** one dominant heading block per screen, `space-8`–`space-10` before the
  first content block, `space-10`–`space-14` before a secondary section (e.g. Journey's phase
  path, or a footer disclaimer).
- **Centering rules:** Entry and Introduction center content both horizontally and vertically
  (chapter-opening feel); Module/Micro/Journey/Post-test center horizontally only (via
  `mx-auto` + max-width) and read top-down like a document, not a modal.

---

## 6. Button System

The Entry Experience CTA (`Start Your Journey`) is the reference implementation for **Primary**:
pill-shaped (`rounded-full`), solid `primary` (`#0058bc`) fill, white text, no border, hover to
`#004493`, focus ring `focus-visible:ring-2 ring-blue-500 ring-offset-2`. The existing `Button`
component's `variant="primary"` already matches this exactly — no change needed there.

| Variant | Shape | Fill | Text | Border | Use |
|---|---|---|---|---|---|
| Primary | pill (`rounded-full`) | `primary` solid | white | none | The one dominant action per screen (existing `Button variant="primary"` — keep) |
| Secondary | pill (`rounded-full`) | `surface-container` (`#efedf3`) | `on-surface` | none | A visible but non-dominant action alongside a primary one. **New** — `DESIGN.md` specifies this pill-shaped secondary; the current `Button` component has no pill-shaped neutral variant (its `outline` is `rounded-lg` with a border, its `ghost` has no pill either). Add this variant; do not repurpose `outline`/`ghost` for it. |
| Ghost / Back | pill icon-button, transparent | none | `on-surface-variant`, `on-surface` on hover | none (or 1px `outline-variant` if standing alone off any content) | Back navigation. **Change from current implementation**: today's back controls (`MicroView`, `ModuleView`, `IntroductionView`) are plain text links with a `ChevronLeft` icon, not a button — the Stitch reference (`introduction_what_is_this/screen.png`) shows a circular icon-only back button top-left. Recommend converging on a circular ghost icon-button as the systemized `BackButton`; flagged in §17 as an implementation-time change, not a Layer-1/2 risk. |
| Outline | `rounded-lg` | transparent | `on-surface-variant` | 1px `outline-variant` | Lower-emphasis secondary actions inside dense content (e.g. "Try again" in `MicroView`) — keep the existing `outline` variant for this use; it is distinct from the new pill Secondary above, which is for CTA-adjacent actions, not inline recovery actions. |
| Disabled | same shape as its variant | 40% opacity, no hover | inherits | inherits | Already implemented via `disabled:opacity-40 disabled:cursor-not-allowed` — keep. |
| Icon button | circle, 40–44px hit area | transparent, hover → `surface-container` | `on-surface-variant` | none | Drawer triggers, close (`X`) controls, hamburger — already implemented this way; formalize as one component instead of ad hoc `<button>` markup per screen. |
| Danger | `rounded-lg` | white | `error` | 1px `error-container`-tinted | "Confirm — erase all progress" — keep existing `danger` variant as-is. |

---

## 7. Icon System

Two distinct, non-interchangeable icon families already exist in the codebase — the system must
keep them separate, not merge them:

1. **UI / navigation / learning-state icons** — `lucide-react`, line-style, 2px stroke (matches
   `DESIGN.md`'s icon guidance), rounded caps/joins. Sizes: `h-3.5 w-3.5` (inline/status-badge),
   `h-4 w-4` (default — buttons, nav, drawer rows), `h-5 w-5` (nav rail, larger status glyphs).
   Used for: navigation (`LayoutDashboard`, `ShieldQuestion`, `Library`), learning states
   (`CheckCircle2`, `Circle`, `Lock`, `AlertTriangle`, `Award`, `GraduationCap`), and chrome
   (`Menu`, `X`, `ChevronLeft`/`Right`, `ArrowRight`).
2. **Concept icons** — the 13 full-color custom illustrations in `LEARNING_ICONS`
   (`APPLICATION/learning-icons.js`, sourced from `DESIGN-REFERENCES/ICON/*.png`): Learning,
   Cognition, Instructional Design, Learner/Audience, Assessment, Multimedia, Accessibility/UDL,
   SME/Collaboration, AI, Performance, Microlearning, Prompting/AI Interaction, UX. **Entry
   Experience only** — do not reuse these elsewhere as generic decoration; they are the Entry
   field's specific vocabulary.

**Icon containers** (already established by the implemented Introduction steps — codify, don't
reinvent): a circular badge, `border border-outline-variant`, white/`surface-container-lowest`
fill, `primary`-colored icon inside, at two sizes — 44px (`h-11 w-11`, journey-stage nodes) and
36px (`h-9 w-9`, feature-list rows). This is the one icon-container pattern the whole system
should reuse for "an icon introducing a labeled concept" (journey stages, capability list,
drawer's post-test node) — as opposed to the plain unbordered icon-in-circle used for numbered
progress nodes (see §9), which is a different, status-driven pattern, not decorative.

---

## 8. Drawer System

Both drawers already implement the correct behavioral contract; this section formalizes it as a
shared spec rather than changing it.

**Shared behavior (both drawers):**
- Always mounted, never conditionally rendered — visibility is `opacity` + `transform` +
  `pointer-events`, so open/close can transition and the closed drawer never occupies layout
  space or intercepts input.
- 200ms `ease-out` on transform + opacity (`transition-transform`/`transition-opacity`), skipped
  entirely under `prefers-reduced-motion`.
- Backdrop: `surface` at ~20–30% opacity (`bg-slate-900/20`–`/30` currently; retarget to an
  `on-surface`-tinted scrim), click-to-close.
- Full focus trap while open (Tab/Shift+Tab cycles inside), Escape closes, focus returns to
  whichever trigger opened it. **Do not weaken this during restyling** — it's real a11y work, not
  decoration.
- Closed by default on every screen that has one; opening is always an explicit learner action
  (edge tab or hamburger), never automatic.

**Left application drawer** (Journey / Review / Resources):
- Trigger: hamburger (mobile header) or a left-edge vertical tab labeled "Menu" (desktop `lg+`);
  tablet substitutes a permanent icon rail instead of a drawer (§5 exception).
- Panel: `w-64`, `surface-container-lowest` (white) background, slides from the left
  (`translateX`), border on its trailing edge (`outline-variant`).
- Content: app name/mark, the 3 nav destinations (Journey/Review/Resources) with active-state
  weight (not underline — matches `DESIGN.md`'s nav guidance), a review-count badge, persistence
  note, reset control at the bottom.

**Right Learning Path drawer** (per-module: current / completed / locked):
- Trigger: right-edge vertical tab labeled "Learning Path", visible only inside Module Overview.
- Panel: `max-w-sm`, `surface-container-low` (`#f4f3f8`) background — deliberately a step
  recessed from the left drawer's white, so the two drawers don't read as identical chrome.
- Content: one row per micro-learning (numbered/checked/locked node + title + duration/status),
  terminating in a post-test node using `Award`/`GraduationCap`/`Lock` (never a plain number —
  it's categorically different from a micro-learning). Locked rows are real `disabled` buttons,
  not just muted styling — keep this double-enforcement (visual + functional) intact.
- Both drawers' "current" row gets the same visual treatment: `primary`-tinted background wash
  (`bg-blue-50/70`), never a border or shadow, so "this is where you are" reads as a color/weight
  shift, not a box.

---

## 9. Progress System

- **Micro-learning progress within a module — `MicroRibbon`.** A row of variable-width segments,
  one per micro, width proportional to that micro's duration (`flex-grow: mc.m`), filled
  (`primary`) once done, neutral (`outline-variant`) otherwise. This is the product's signature
  progress element — reused at four sizes/contexts (compact in `ModuleCard`/`ModuleView` header,
  full with labels in `MicroView`). Keep it structurally as-is; only its fill/neutral colors move
  to the token system.
- **Module/phase progress — `Bar`.** A single horizontal track, `surface-container-high`
  background, `primary` (or semantic-state color) fill, optional threshold tick (used for the
  post-test pass mark) as a vertical hairline at the threshold %. Used for phase completion %,
  post-test score bars.
- **Introduction progress** — a plain numeric counter (`01 / 03`), not a bar or dots, styled as a
  progress label (§3). Matches the Stitch reference exactly (`01/03` top-right) and the current
  implementation — keep as text, resist the urge to turn it into a dot-stepper; the product's
  progress language elsewhere (Journey phase path, MicroRibbon) is already segment-based, and a
  third progress idiom (dots) would fragment that vocabulary rather than reinforce it.
- **Journey phase path** — one continuous horizontal line across 4 phase nodes, filled proportion
  = phases completed + current phase's own fractional progress. This is the single "WHERE AM I"
  answer at the top level of the product; keep it singular — don't duplicate this idea elsewhere.
- **Completion** — currently a status label change only ("Module complete") plus disappearance of
  the CTA; no distinct celebratory moment exists. Flagged as an **open decision** in §14/§18 — a
  redesign may want to give module completion (and by extension, the next-module unlock) an
  explicit beat, but that is a new pattern, not an existing one to preserve.
- **Locked / Next** — locked = `Lock` icon in place of a number, muted (`outline`) text, no
  hover/press affordance beyond a click-to-reveal reason (`lockReason`, §10). Next = `primary`
  ring around the node (`ring-4 ring-blue-100` today), used consistently in `ModuleCard`,
  `ModuleLearningPathDrawer`, and Journey's phase nodes — keep this "ring = you are here /
  this is next" convention as the one way the system marks "next," rather than inventing a second
  visual language for it.

---

## 10. Learning States

The product's actual state model (Layer 2) only computes **locked / not-started / in-progress /
completed** at the module level, plus **done+correct / done+incorrect / not-done** at the micro
level, and **attempted+passed / attempted+failed / not-attempted** at the post-test level. The
brief's 7-state list is a **presentation-layer vocabulary** that must map onto this existing data
without inventing new Layer 2 fields:

| Brief state | Derived from (existing, unchanged) | Visual treatment |
|---|---|---|
| **Locked** | `moduleStatus === "locked"` / `!microUnlocked(...)` | `Lock` icon, `outline`-muted text/node, click-to-reveal `lockReason` |
| **Available** | unlocked, not the active module (`!isActive`, `status !== "completed"`) | outlined node (`outline-variant` border), `on-surface` text, no ring |
| **Current** | `isActive` (module) / `nextMicro` match (micro) | `primary` filled node + `ring-4 ring-blue-100`, dominant weight on the screen |
| **In progress** | `moduleStatus === "in-progress"` | `primary` outline/fill mix (already: filled node once post-test-eligible, outline before), status word "In progress" |
| **Completed** | `moduleCompleted` / `microDone && microCorrect` | `emerald` fill, `CheckCircle2` |
| **Failed / Retry** | micro: `microDone && !microCorrect`; module: `postTestDone && !postTestPassed` | `orange` fill, `AlertTriangle` — **already implemented** at the micro level in `ModuleLearningPathDrawer` (`bg-orange-500` + `AlertTriangle` for a done-but-incorrect micro); extend the same treatment to a failed-post-test module row, which today only gets generic "in-progress" styling with no distinct "you tried and didn't pass yet" glyph. |
| **Mastered** | **not derivable from existing state as a separate boolean** | Proposed: a presentation-only threshold read off `postTestBestPct` (e.g. ≥ 90%) layered on top of the existing `completed` treatment — a subtle upgrade (richer fill or a small accent mark), never a different icon family. **This needs an owner decision** (exact threshold, and whether it's wanted at all) — see §18. |

Locked-state explanation (`lockReason`) must remain click-to-reveal, single-target, and
non-blocking — this is existing, tested Layer 2 behavior; Layer 3 only needs to keep rendering
whatever string it returns.

---

## 11. Card / Surface System

**Use a card when:** the content is a discrete, self-contained data unit that could stand alone
if moved — a stat (`StatTile`), a resource link row, a trivia popup, a feature-summary tile
(Intro-03's 5-item grid). Cards get `surface-container-lowest` (white) fill, 1px
`outline-variant` border, no shadow at rest (`DESIGN.md`: "no shadows except hover states, which
may lift slightly").

**Do NOT use a card when:** the content is the primary narrative of the screen — the Journey
hero, Module Overview's greeting/headline/CTA cluster, the Introduction steps, the Micro-learning
lesson content. These already deliberately avoid cards in the current implementation (see the
in-code comment on `ModuleCard`: "a status node connected... not a database-record card"; and
`ModuleView`'s comment about feeling like "a calm chapter opening, not an app settings screen").
Hierarchy on these screens comes from typography scale + hairline `border-b` rules only.

**Rule of thumb:** if removing the card's border/background would make the content harder to
scan as a *list*, it's a card (resources, stats, features). If removing it would make no
difference because the content was never competing with siblings for attention, it's not a card
(hero sections, lesson content, the module path's rows — which use a connector line, not
boxes).

---

## 12. Motion System

| Moment | Spec | Status |
|---|---|---|
| **Entry transition** | Cursor-repel float field, per-tile hover wiggle, "converge on CTA" departure (imperative `getBoundingClientRect`-based, ease-in cubic-bezier, opacity trails transform). | **Locked — document only, do not touch.** Everything else in this system should be understood as building *around* this, not replacing it. |
| **Content enter** | Mount-then-flip-a-frame: render one frame at `opacity:0, translateY(8–10px)`, then flip to resting state so the CSS transition actually animates; 350–400ms `ease-out`, optionally staggered by a `delayMs` per element. | Already the shared idiom across `ModuleView`, the three Intro steps, `TriviaPopup`. Codify as the one "a screen/section has just appeared" primitive — don't introduce a second entrance style. |
| **Page/route transition** | None today beyond the per-section content-enter above (view changes are instant, then content fades in). | Keep instant view-swap; do not add a full-screen crossfade/slide between `view`/`mode` changes — it would fight the per-section stagger already doing this job and add latency to the "one primary action" flow. |
| **Drawer transitions** | 200ms `ease-out`, `translateX(16px)` closed → `translateX(0)` open, paired opacity fade; backdrop opacity-only. | Shared by both drawers already — keep identical timing so they read as one system. |
| **Hover** | Color/background transitions only (`transition-colors`), ~150ms implicit Tailwind default. No movement/scale on hover except the Entry icon wiggle (which is Entry-only, locked). | Keep restrained — this is part of "motion clarifies, not decorates." |
| **Focus** | `focus-visible:ring-2 ring-blue-500 ring-offset-2`, instant (no transition needed/wanted on focus rings — they must appear immediately for a11y). | Non-negotiable baseline, already applied nearly everywhere — audit for gaps during implementation, don't add a transition to it. |
| **Progress transitions** | `Bar` fill: `transition-all duration-500`. `MicroRibbon` segment fill: instant color swap (no transition currently) — consider adding a brief (200–300ms) fill transition for consistency with `Bar`, but this is a minor implementation-phase polish item, not a structural decision. | Mostly already implemented. |
| **Completion transitions** | **None exist today.** | **Open decision** — see §9/§14/§18. If added, it must respect `prefers-reduced-motion` exactly like every other motion in the system, and should not block the learner from proceeding (no forced-watch animation). |

All motion above `reducedMotion` must have a no-motion fallback that lands directly on the resting
state — this is already the pattern for every animated element in the codebase
(`useReducedMotionPref`); continue it for anything new.

---

## 13. Responsive System

Not "scale the desktop design down" — three structurally different layouts, matching what's
already implemented:

| Breakpoint | Width | Nav | Notable differences |
|---|---|---|---|
| Mobile | < 640px (`base`) | Sticky header (hamburger + streak chip) + full-overlay drawer | Entry's floating icon field absent entirely (not hidden); Intro capability grid single-column; phase path may need its own review at very narrow widths (currently a fixed 4-column grid — acceptable down to ~360px per existing `px-1` per-node padding, but not designed narrower). |
| Small tablet | 640–767px (`sm`) | Same as mobile nav | Entry icon field appears; Intro capability grid becomes 2-column. |
| Tablet | 768–1023px (`md`–`lg`) | Permanent icon-only rail (`TabletRail`), no drawer | The one place chrome is persistent rather than contextual — deliberate exception (§5). |
| Small desktop | 1024px (`lg` boundary) | Edge-tab-triggered drawer returns; tablet rail disappears | This is also where the right Learning Path drawer's edge tab and the desktop menu edge tab both become available. |
| Desktop | 1280–1440px+ (reference) | Same as small desktop | No bespoke "1440-only" layout — content simply centers within its max-width (§5) with more surrounding margin as viewport grows. 1280 and 1440 should look identical apart from margin. |

Design and review at 1440×900 as the primary reference canvas (per the brief), but every screen
must be checked at 1024 (the nav-mode changeover point) and at a narrow mobile width (~375px) —
those are the two points where the layout genuinely restructures, not just reflows.

---

## 14. Screen-Level Visual Structure

Structural relationships only — not a redesign, and largely a description of what's already
implemented plus explicit notes where the brief's flow introduces something not yet present.

- **Entry Experience** — full-bleed, no chrome. Centered content column (eyebrow-less headline +
  subhead + single CTA) in document order *before* the decorative floating field, so keyboard
  tab order is sane. **Locked** (§12) — structure and animation both, this entry only documents
  it.
- **Introduction 01 — "What is this?"** — centered column: eyebrow → H1 → a 3-node
  relationship diagram (Digital Foundation → AI layer → outcome, per the Aetheris Stitch
  reference) → supporting line → primary CTA. Back control top-left, step counter top-right.
- **Introduction 02 — "How does the journey work?"** — centered column: eyebrow → H1 → a
  5-node horizontal stage sequence (Learn/Recall/Complete/Assess/Continue — already
  `INTRO_JOURNEY_STAGES`), each node = icon badge (§7) + label + one-line description, connected
  by chevrons, not a continuous line (distinct from the Journey phase path in §9 — this is a
  process explanation, not a live progress indicator).
- **Introduction 03 — "What will I find?"** — centered column: eyebrow → H1 → subhead → a
  2-column feature grid (5 items, icon badge + title + description per `INTRO_CAPABILITIES`) →
  closing line → primary CTA ("Begin My Learning Journey"). This is the one Introduction step
  that uses cards (§11) — justified because each capability genuinely is a standalone,
  scannable unit, unlike steps 01/02's single narrative thread.
- **Module Overview** — no card. Back (top). Centered content cluster: status/greeting line →
  phase/module breadcrumb → current-focus headline → supporting line → compact `MicroRibbon` →
  progress count + one primary CTA. Learning Path is entirely in the right drawer (§8), never
  inline.
- **Micro-learning** — no card, continuous document flow: back link → compact ribbon + position
  indicator → module/title context → objective line → lesson content (plain paragraphs) → a
  hairline-separated Recall section (see next item) → continue CTA once correct.
- **Recall** — **not a separate screen**; it is the terminal section of the Micro-learning
  screen, separated by a hairline rule, not a card or a route change. This is intentional
  (per existing in-code comment: "a checkpoint in the reading flow, not a separate quiz widget")
  and should stay that way — the brief's flow diagram lists it as a conceptual stage, not a
  literal screen boundary.
- **Post-test** — its own screen/route (`mode.type === "posttest"`), structured as a linear
  question list (reusing `QuestionInput`) ending in a submit action, then an inline result state
  (score, pass/fail, per-question detail) on the same screen rather than a route change.
- **Module Completion** — **currently not a distinct visual moment** (§9/§12). Today, reaching
  this state just re-renders Module Overview with a "Module complete" status line and no CTA.
  The brief's flow diagram treats MODULE COMPLETION as its own stage between Post-test and Next
  Module Unlock. **This is the single largest open structural decision in this document** — see
  §18. Two directions to choose between: (a) keep it as a state of Module Overview (cheapest,
  most consistent with "no unnecessary new screens") with a richer completion-specific visual
  treatment layered on; or (b) introduce a genuinely new transitional moment (e.g., a brief
  full-screen celebratory state before returning to Journey with the next module now unlocked).
  Do not decide this silently during implementation — it changes the screen graph.

---

## 15. Master Component Inventory (proposed)

Only components actually justified by the existing application (per instruction — no speculative
abstractions):

- `AppShell` — the persistent frame: skip-link, header/edge-triggers, both drawers, `<main>`,
  footer disclaimer.
- `PrimaryButton` / `SecondaryButton` / `OutlineButton` / `DangerButton` / `IconButton` — the
  button family (§6).
- `BackButton` — systemized circular ghost icon-button (§6), replacing the current ad hoc
  text+chevron links.
- `Drawer` — shared shell (backdrop + panel + focus trap + Escape) parameterized by side
  (left/right), width, and background token (§8).
- `DrawerTrigger` — the edge-tab button pattern, parameterized by side/label/icon.
- `Eyebrow` — existing, no structural change needed.
- `ProgressBar` — existing `Bar`, renamed for clarity; supports optional threshold tick.
- `MicroRibbon` — existing, keep name and structure.
- `PhasePath` — new name for Journey's phase-node line (currently inline JSX in `JourneyView`,
  not its own component) — worth extracting since it's a distinct, describable unit (§9).
- `LearningStateIcon` / `LearningStateBadge` — a small helper centralizing the
  locked/available/current/in-progress/completed/failed/mastered → icon+color mapping (§10),
  replacing the current pattern of re-deriving this inline in `ModuleCard`,
  `ModuleLearningPathDrawer`, and `ProgressModuleRow` separately.
- `ModuleHeader` — the greeting/breadcrumb/headline/subline cluster shared by `ModuleView` and
  `JourneyView`'s hero (currently duplicated between the two, not shared).
- `LearningPathItem` — one row of the right drawer (micro node or post-test node) — currently
  inline JSX in `ModuleLearningPathDrawer`, worth extracting given it repeats per-micro.
- `ConceptIconBadge` — the circular bordered icon container (§7), currently duplicated inline in
  `IntroStepJourney` and `IntroStepCapabilities`.
- `QuestionInput` — existing, no structural change needed.
- `FeedbackState` — new name for the correct/incorrect result block currently inline in
  `MicroView` (and structurally duplicated, differently, in `PostTestView`'s result view) —
  worth unifying into one component with a compact/full mode.
- `StatTile`, `ResourceList`, `Pill`, `Card` — existing, keep as-is structurally; only their color
  classes move to tokens.

---

## 16. Mapping to Existing Components

| Proposed | Existing | Status |
|---|---|---|
| `AppShell` | `LearningDashboard` (shell portion) | exists — extract, not new |
| `PrimaryButton`/`OutlineButton`/`DangerButton`/`IconButton` | `Button` variants `primary`/`outline`/`danger`, ad hoc icon `<button>`s | exists / needs consolidation |
| `SecondaryButton` | — | **new** (§6) |
| `BackButton` | ad hoc text+chevron `<button>`s in `MicroView`/`ModuleView`/`IntroductionView` | **new component, changed pattern** |
| `Drawer` + `DrawerTrigger` | mobile-nav drawer markup + `ModuleLearningPathDrawer`'s markup (duplicated) | exists ×2 — needs unification into one shared implementation |
| `Eyebrow` | `Eyebrow` | exists, unchanged |
| `ProgressBar` | `Bar` | exists, rename only |
| `MicroRibbon` | `MicroRibbon` | exists, unchanged |
| `PhasePath` | inline in `JourneyView` | needs extraction |
| `LearningStateIcon`/`Badge` | inline `STATUS_META` + repeated conditionals in `ModuleCard`/`ModuleLearningPathDrawer`/`ProgressModuleRow` | needs extraction/unification |
| `ModuleHeader` | duplicated hero JSX in `ModuleView` and `JourneyView` | needs extraction |
| `LearningPathItem` | inline per-micro row in `ModuleLearningPathDrawer` | needs extraction |
| `ConceptIconBadge` | duplicated inline in `IntroStepJourney`/`IntroStepCapabilities` | needs extraction |
| `QuestionInput` | `QuestionInput` | exists, unchanged |
| `FeedbackState` | inline result block in `MicroView`, separate inline result view in `PostTestView` | needs unification |
| `StatTile`, `ResourceList`, `Pill`, `Card` | same names | exist, unchanged structurally |
| Entry field (`FloatingIcon`, `TriviaPopup`, `usePopupPlacement`) | same | exists — **locked**, not part of this inventory's scope to touch |

---

## 17. Implementation Boundaries

- **Layer 1 (Content) and Layer 2 (Logic/Progression) are out of scope entirely.** Nothing in
  this document changes `MODULES`, `PHASES`, `CONFIG`, or any pure function in the Logic layer
  (`moduleStatus`, `lockReason`, `microUnlocked`, grading, streaks, progress math). The 5368
  `verify.mjs` assertions must continue passing unchanged after this system is eventually
  implemented, because none of them touch Layer 3.
- **This document is Layer 3 only**: color classes, typography classes, spacing, component
  extraction/consolidation, and the two flagged structural additions (Module Completion moment,
  Mastered state) — both of which read *existing* derived data and add no new stored state.
- **Entry Experience animation code is out of scope** — document it (§12/§14), never modify it in
  this phase or without separate explicit sign-off, per its own in-code "locked" comment.
- **Orphaned components stay orphaned** (`ModuleListView`, `ProgressView`, `HistoryView`) — they
  still get retokenized (they're real, reachable-by-URL-state code that must not visually break),
  but their nav-routing disposition is an explicitly separate decision this document does not
  make.
- **Accessibility behavior already implemented (focus traps, Escape handling, focus restoration,
  disabled-button double-enforcement on locked content, `aria-*` attributes) must be preserved
  exactly** through any restyling — this document changes appearance, not interaction
  correctness.
- **No new persisted state.** Both open decisions (§10 Mastered, §14 Module Completion) must be
  resolvable from data already in `EMPTY_STATE`'s shape (`micros`, `postTests`) — if a future
  proposal needs new fields, that's a Layer 1/2 change requiring its own separate process, not
  something this design system authorizes.

---

## 18. Explicit DO / DON'T

**DO**
- Use Aetheris tokens (§2) as the only source of color values; retain emerald/orange/rose as the
  system's semantic (non-Aetheris) success/warning/error hues, per §2's reasoning.
- Preserve every existing drawer/focus/keyboard behavior while retokenizing its appearance.
- Reuse `MicroRibbon`, the phase path, and the drawer node-numbering as the system's *only*
  progress idioms — don't introduce a second visual language (e.g., dots, percentage rings) for
  the same concept.
- Extract the duplicated inline patterns identified in §15/§16 (concept icon badge, module
  header, learning-path row, feedback state) into shared components before restyling them, so a
  color/spacing fix only has to happen once.
- Keep Recall as a section of Micro-learning, not a new route (§14).
- Keep the tablet icon-rail exception (§5/§13) — it's deliberate, not an inconsistency to "fix."
- Validate any new pattern against `verify.mjs` (still passes, since it's Layer 1/2 only) and a
  real render in `QA/qa-build.html` before considering it final.

**DON'T**
- Don't touch `EntryView`'s animation logic, `ICON_FIELD`, `LEARNING_TRIVIA`, or their timing —
  document, never modify, in this phase.
- Don't change `MODULES`/`PHASES`/`CONFIG` or any Layer 2 function's signature or behavior.
- Don't delete `ModuleListView`/`ProgressView`/`HistoryView` — they're orphaned from nav, not
  dead.
- Don't invent a card-heavy dashboard layout for Journey or Module Overview — no stat-wall, no
  widget grid; that is explicitly the pattern this product is defined against (per the brief and
  per `ModuleView`'s own in-code philosophy comment).
- Don't copy any Stitch or `UIREF*`/`Refference*` screen verbatim — they're pattern references,
  and several (the generic dashboard/marketing mockups in `DESIGN-REFERENCES/*.png` outside the
  Stitch folder) actively contradict this product's "not a SaaS dashboard" principle and should
  only inform isolated patterns (e.g., streak-chip treatment), never page composition.
- Don't add a new progress idiom (dot-steppers, percentage rings) alongside the ribbon/path/node
  system already established — pick one vocabulary and keep it.
- Don't implement anything from this document yet — it is a specification, pending its own
  separate implementation go-ahead.

**Unresolved — needs an explicit owner decision before implementation:**
1. **Module Completion** — stays a state of Module Overview, or becomes its own transitional
   moment/screen? (§14)
2. **Mastered state** — wanted at all, and if so, what `postTestBestPct` threshold defines it?
   (§10)
3. **BackButton shape** — converge on the Stitch reference's circular icon button (a visible
   change from every current back control), or keep the existing text+chevron link pattern and
   drop this from the button system? (§6)
4. **Secondary button's real-world usage** — `DESIGN.md` specifies a pill-shaped secondary, but
   no current screen has an obvious "two roughly-equal actions" moment that needs it yet
   (post-test retake, maybe?) — worth confirming a concrete first use before adding the variant.
