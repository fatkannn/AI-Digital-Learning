# M17 — Cumulative Implementation Log

Every actual change made to `APPLICATION/ai-digital-learning-dashboard.jsx` under the M17
curriculum-enhancement effort, in session order. This log exists so a later reader can see the
complete list of real content changes without re-deriving it from the state file's narrative
sections.

---

## M17.2 — Day 1 NPU Enhancement

- **Date/session:** M17.2 (owner-approved, following M17.1's audit).
- **Day:** 1 — "How Computers Work."
- **Original issue:** the four-component hardware model (CPU/RAM/storage/GPU) omitted the NPU
  (Neural Processing Unit), now a mainstream AI-inference chip shipping in most new Windows
  laptops and every Apple Silicon Mac — directly relevant to this day's own "predict the AI
  bottleneck" activity and its own Task Manager hands-on exercise, which now shows a dedicated
  NPU meter on that hardware.
- **Research evidence:** two official Microsoft sources, both source-quality A, opened directly
  in M17.1 and reused for wording accuracy in M17.2 — Microsoft Learn's "Copilot+ PCs developer
  guide" (`https://learn.microsoft.com/en-us/windows/ai/npu-devices/`) and Microsoft Support's
  "All about neural processing units (NPUs)."
- **Decision:** ENHANCE, P2.
- **Exact enhancement:** one new sentence pair in the Core material segment (naming the NPU, its
  purpose, where it ships, and the Task Manager meter); one new sentence in Hands-on (check the
  NPU meter if present); one new sentence in the timed Practice segment (note whether NPU changes
  the local-model bottleneck answer); one clause added to the boxed "Profile your own machine"
  activity's first step ("and NPU, if present"); the Indonesian recap `inti` extended with the
  same facts, and one new `istilah` glossary entry (`NPU`) added.
- **Why safe to implement autonomously:** cleared every relevant bar — evidence was strong (two
  official sources), directly relevant to the day's own bottleneck-prediction objective, additive
  only (nothing removed or rewritten), no architecture/progression/quiz/resource change, and
  estimated at ~1 minute of added reading time, well inside the existing 20-minute Core material
  budget and the day's 60-minute total.
- **Files changed:** `APPLICATION/ai-digital-learning-dashboard.jsx` (Day 1 object only, 5 edit
  locations); `QA/qa-build.html` (rebuilt via `node QA/build.mjs`).
- **QA result:** `verify.mjs` 6,696 → **6,701 assertions PASS** (+5, all from the one new recap
  glossary term's five per-term checks — content-driven, not a new test group). 28 days / 169
  questions / 58 resources / 56 verified — all unchanged.
- **TypeScript result:** 0 diagnostics, unchanged.
- **Owner browser review:** PASS, per M17.3 (owner-attested; see the state file's owner-attestation
  note — no assistant session independently witnessed the render).

---

## Batch 3 (Days 9–12, M17.6)

No implementation this batch. All four days (9–12) were judged KEEP — nothing cleared the
enhancement bar because no gap was found to enhance. See `M17.6-DAYS-09-12-AUDIT.md` and
`M17.6-ENHANCEMENT-PLAN.json` for the full audit record.

---

## Batch 4 (Days 13–16, M17.7) — Day 16 "context rot" terminology

- **Date/session:** M17.7 (autonomous, within the P2 conditions the owner pre-authorized for this
  batch — see the M17 instruction message's autonomous-implementation rule).
- **Day:** 16 — "LLM Fundamentals: Tokens and Context Window."
- **Original issue:** the Core material segment already correctly teaches that information in the
  middle of a long context is used less reliably than material at the start or end, but does not
  name this pattern — a learner who later encounters the term "context rot" in official AI
  documentation would have no link back to a concept they already know.
- **Research evidence:** one official Anthropic source, quality A —
  `https://platform.claude.com/docs/en/build-with-claude/context-windows` — opened directly this
  session. FACT, quoted from the source: "As token count grows, accuracy and recall degrade, a
  phenomenon known as *context rot*." This corroborates the lesson's existing claim rather than
  correcting it — the underlying content was already accurate; only the current, official name for
  the phenomenon was missing.
- **Decision:** ENHANCE, P2.
- **Exact enhancement:** one clause appended to the existing "position matters" sentence in Core
  material, naming the pattern "context rot" and attributing the broader (position-independent)
  degradation claim to Anthropic. No other segment, the recap, the resources, or the quiz were
  touched — deliberately more minimal than the Day 1 NPU change, since this is a vocabulary
  precision addition to an already-complete explanation, not a new concept.
- **Why safe to implement autonomously:** cleared all 10 conditions — strong evidence (one official
  primary source, quoted exactly), directly relevant to and supports objective 3 ("diagnose
  problems caused by context loss or truncation"), no architecture/progression/resource change, no
  quiz change needed (the existing position/truncation questions remain valid without a
  term-recognition item), negligible time impact (one clause, not a new sentence-level concept),
  and implemented conservatively as a single addition with nothing removed.
- **Files changed:** `APPLICATION/ai-digital-learning-dashboard.jsx` (Day 16 object only, 1 edit
  location — Core material segment); `QA/qa-build.html` (rebuilt via `node QA/build.mjs`).
- **QA result:** `verify.mjs` held at **6,701 assertions PASS** before and after (no new assertion
  — unlike M17.2's Day 1 change, no recap glossary term was added, so the content-driven assertion
  count did not move). 28 days / 169 questions / 58 resources / 56 verified — all unchanged.
- **TypeScript result:** 0 diagnostics, unchanged.
- **Owner browser review:** **REQUIRED, not yet performed.** No assistant session can render pixels;
  this entry does not and must not claim a visual PASS.

---

*This file is maintained cumulatively across M17 batches. Only actual, applied changes are
recorded here — proposed-but-not-implemented enhancements live in the per-batch audit files and,
where they are assessment-related, in `M17-ASSESSMENT-BACKLOG.md`.*
