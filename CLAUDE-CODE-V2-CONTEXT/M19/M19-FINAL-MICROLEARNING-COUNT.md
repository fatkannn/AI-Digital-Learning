# M19 — FINAL MICRO-LEARNING COUNT

> **Synced 2026-08-16 (documentation-only, no application file touched).** The owner has
> approved the Module 14 merge this document's own M19.1 addendum recommended (see below) and
> confirmed the resulting count. **The current, owner-approved final count is 84**, not 85 — the
> tables below have been updated to match, and are corroborated by `node QA/verify.mjs` run
> against the current `APPLICATION/ai-digital-learning-dashboard.jsx`, which reports 84
> micro-learnings. Original 85-based figures are struck through / annotated rather than deleted,
> per the instruction to preserve historical record. See
> `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §55 for the full synchronization record.

Output G of M19 Level-2 Curriculum Consolidation. Produced only after the objective/micro-learning/dependency/assessment/consolidation work in Outputs A–F was complete, per M19 §7 ("only after consolidation").

**This count emerged from learning-objective coherence, not from a target.** It is neither of the obsolete working estimates (202 or 216) referenced in the source-of-truth documents, and it is not itself a number to defend in future work — if authoring reveals an objective needs splitting or two objectives naturally merge, the count should move.

---

## Micro-Learning Count Per Module

| Module | Micro-Learnings |
|---|---|
| 1. Learning Science & Learning Experience | 4 |
| 2. Needs Analysis, Learners & Performance | 4 |
| 3. Instructional Design & Alignment | 3 |
| 4. Assessment & Feedback | 4 |
| 5. Learning Experience, UX & Performance Support | 3 |
| 6. Multimedia & E-Learning Design | 4 |
| 7. Accessibility & UDL | 4 |
| 8. Evaluation, Kirkpatrick & Learning Transfer | 3 |
| 9. LMS Fundamentals | 4 |
| 10. Moodle for Digital Learning | 7 |
| 11. H5P Interactive Learning | 6 |
| 12. SCORM | 3 |
| 13. xAPI, LRS & Interoperability | 4 |
| 14. AI & Generative AI Foundations | ~~4~~ **3** *(14.1+14.2 merged — approved 2026-08-16, see M19.1 addendum below)* |
| 15. Generative AI & LLM Fundamentals | 3 |
| 16. Prompting & Context Management | 4 |
| 17. AI Reliability, Privacy & Responsible Use | 5 |
| 18. RAG & Modern AI Concepts | 2 |
| 19. AI for Needs Analysis & SME Work | 2 |
| 20. AI for Instructional Design | 2 |
| 21. AI for Assessment | 2 |
| 22. AI for Storyboarding & Multimedia | 2 |
| 23. AI for Accessibility | 2 |
| 24. AI + Moodle / H5P | 2 |
| 25. AI + Learning Analytics & Evaluation | 2 |

## Count Per Phase

**CURRENT (owner-approved 2026-08-16):**

| Phase | Modules | Micro-Learnings | % of Total |
|---|---|---|---|
| Phase 1 — Digital Learning Core | 8 | 29 | 35% |
| Phase 2 — E-Learning Technology | 5 | 24 | 29% |
| Phase 3 — AI Fundamentals | 5 | 17 | 20% |
| Phase 4 — AI-Enhanced Digital Learning | 7 | 14 | 17% |
| **Total** | **25** | **84** | **100%** *(rounded independently per row; does not sum to exactly 100%, same rounding behavior as the pre-merge table below)* |

*Historical, superseded 2026-08-16 — the pre-merge table, kept for record:*

| Phase | Modules | Micro-Learnings | % of Total |
|---|---|---|---|
| Phase 1 — Digital Learning Core | 8 | 29 | 34% |
| Phase 2 — E-Learning Technology | 5 | 24 | 28% |
| Phase 3 — AI Fundamentals | 5 | ~~18~~ | 21% |
| Phase 4 — AI-Enhanced Digital Learning | 7 | 14 | 16% |
| **Total** | **25** | ~~**85**~~ | **100%** |

## Grand Total

**CURRENT (owner-approved 2026-08-16): 25 modules · 84 learning objectives · 84 micro-learnings · 25 module post-tests**

(84 objectives map to 84 micro-learnings at an exact 1:1 ratio, confirmed by `node QA/verify.mjs`
against the current `APPLICATION/ai-digital-learning-dashboard.jsx` — see `M19-MICROLEARNING-MAP.md`
and `M19-LEARNING-OBJECTIVE-MAP.md` for the updated module-14 rows.)

*Historical, superseded 2026-08-16 — the pre-merge total was 25 modules · 85 learning objectives ·
85 micro-learnings · 25 module post-tests. (85 objectives mapped to 85 micro-learnings at an
exact 1:1 ratio. *Corrected in M19.1 audit:* the objective total was previously misreported as
84 due to an addition error in `M19-LEARNING-OBJECTIVE-MAP.md`'s Phase 1 subtotal — the
underlying table always had 29 Phase 1 rows, not 28. No table content changed; only the summary
arithmetic was wrong. Note this pre-merge "84" was a miscount being corrected to 85 — it is not
the same 84 as the current, correctly-derived post-merge total above; the two arriving at the
same number is coincidental.)*

---

## Approximate Learning Time

- **Micro-learning content:** 84 units *(was 85 — see Module 14 merge, approved 2026-08-16)* × ~5 minutes average (range 4–6 min) ≈ **7–7.5 hours** *(unchanged at this precision; one unit fewer is within the estimate's own range)*
- **Module post-tests:** 25 modules × ~8–12 minutes average (scenario-inclusive items take longer than pure recall) ≈ **3.5–5 hours**
- **Estimated total learner time: roughly 10.5–12.5 hours**, self-paced, non-gated at the micro level.

This is substantially less than the old structure's nominal 28 days × 60 minutes (~28 hours), for two compounding reasons, not because content was cut for its own sake:
1. **19 of the old 28 days fall outside the V2 25-module architecture entirely** (general computing, programming, cloud, cybersecurity, automation/n8n, MCP — see `M19-CONSOLIDATION-LOG.md` §1) and are not part of this count at all.
2. **Micro-learning is inherently more time-efficient than 60-minute days** — five-segment, hour-long lessons carried significant repetition and pacing overhead that a focused 5-minute unit with one recall question does not.

This time estimate is descriptive, not a target — Rule 4/§4 of the M19 brief explicitly forbids treating 5 minutes as a rigid timer.

---

## Sanity Check Against Locked Principles

- **Not 202 or 216.** ✅ 84 is independently derived and nowhere near either obsolete estimate. *(Was stated as 85 before the Module 14 merge; the merge was a coherence-driven consolidation, not a move toward either obsolete estimate — see M19.1 addendum below.)*
- **Digital Learning remains the dominant competency.** Phase 1 + Phase 2 (Digital Learning Core + E-Learning Technology) = 53 of 84 micro-learnings (63%, was 53 of 85 = 62%). Phase 3 + Phase 4 (all AI-related) = 31 of 84 (37%, was 32 of 85 = 38%). This is directionally consistent with the locked ~70/30 non-AI/AI emphasis at the *module* level (13 of 25 modules are non-AI-Enhanced-adjacent... more precisely: 8 Digital Learning Core + 5 E-Learning Tech = 13 non-AI modules vs. 5 AI Fundamentals + 7 AI-Enhanced = 12 AI-adjacent modules — module counts are unaffected by the Module 14 micro-merge), without having been mechanically forced to hit 45/25/10/20 (Decision Rule 13 explicitly prohibits mechanical forcing).
- **No topic was split merely to inflate count**, and no topic was merged merely to shrink it — every micro-learning traces to one objective written at natural micro-learning scope (see Consolidation Test in `M19-LEVEL-2-CONSOLIDATION.md` §5, applied during objective-writing in `M19-LEARNING-OBJECTIVE-MAP.md`). The one exception — the Module 14 merge — is exactly the kind of coherence-driven consolidation this rule anticipates, not a violation of it: two objectives testing the same underlying knowledge were combined, not split apart to hit a number.
- **AI Fundamentals stayed conceptual-to-intermediate.** Phase 3 has only 17 micro-learnings across 5 modules (was 18) despite being the most "researchable" area — deliberately did not expand into transformer/training/agent-engineering depth even though old app content and Gemini research touched those areas (all flagged REMOVE in the Consolidation Log).

---

## Modules Requiring Owner Review Before Content Authoring

(Full detail in `M19-CONSOLIDATION-LOG.md` §4)

1. **All of Phase 1 (M1–M8)** — no external research evidence base; recommend an SME/owner source-check.
2. **M10 (Moodle) and M11 (H5P)** — zero research evidence; recommend confirming against current product versions before authoring.
3. **M17 (AI Reliability, Privacy & Responsible Use)** — richest source days (old 21, 22) postdate the Gemini research; content is independently authored, recommend a fact-check pass given the compliance-adjacent subject matter.
4. ~~**Old Days 1–11 and 25–28** (19 of 28 existing days) — fall entirely outside the V2 architecture; owner must decide their fate (archive / separate track / retire) before any future application change.~~
   **RESOLVED — CLOSED 2026-08-16.** Owner decision: **ARCHIVE**. The entire old 28-day
   curriculum (not just Days 1–11/25–28) is archived/historical, preserved in
   `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §§0–52 and not part of the current V2 application.
   See `M19-CONSOLIDATION-LOG.md` §4 item 4 for the matching closure.
5. **Old Day 24's four-way content split** (across M9, M12, M13, M24) — confirm no substance is lost in the redistribution. *(Still open — unaffected by the archive decision above, which concerns the old application's undistributed days, not this already-redistributed content.)*
6. **M13 → M25 dependency** — the thinnest cross-phase link in the dependency map; confirm M13 carries enough weight to support M25's analytics-critique objective. *(Still open.)*
7. ~~**(M19.1)** M14 objectives 14.1 ("AI vs. automation") and 14.2 ("How AI, ML & Generative AI relate") were reviewed for a possible merge — see M19.1 Audit Addendum below. Not applied; flagged for owner decision before content authoring.~~
   **RESOLVED — APPROVED AND APPLIED 2026-08-16.** Owner approved the merge. It is already
   implemented in `APPLICATION/ai-digital-learning-dashboard.jsx` (micro `14-01`) and confirmed
   by `node QA/verify.mjs`. See the updated M19.1 Audit Addendum below and
   `M19-LEARNING-OBJECTIVE-MAP.md` / `M19-MICROLEARNING-MAP.md` for the synced tables.

---

## M19.1 Audit Addendum — Distribution Review

M19.1 re-examined the 62% Digital Learning / 38% AI split against the locked ~70/30 instructional-emphasis target (`V2-ARCHITECTURE-SOURCE-OF-TRUTH.md`: ~45% DL Core + ~25% E-Learning Tech vs. ~10% AI Fundamentals + ~20% AI-Enhanced). Per-phase actuals: Phase 1 = 34% (target ~45%, under), Phase 2 = 28% (target ~25%, close), Phase 3 = 21% (target ~10%, over by more than 2×), Phase 4 = 16% (target ~20%, under). The gap is concentrated in Phase 3 (AI Fundamentals) running heavier than its target share.

**Conclusion: the distribution is substantially defensible, not mechanically forced.** Per-module review found the weight is explainable by genuine content needs, not padding:
- M16 (Prompting, 4 micros) and M17 (AI Reliability/Privacy, 5 micros) are the two heaviest Phase 3 modules, and both are explicitly called out for **practical depth** in `CURRICULUM-DECISION-RULES.md` Rule 10 ("prompting," "AI critique/verification"). Their weight reflects genuinely distinct, individually recall-testable competencies (e.g., M17's hallucination/verification/bias/privacy/copyright are five separate risk categories, not one topic split five ways), not inflation.
- Similarly, Phase 2's Moodle (7 micros) and H5P (6 micros) modules are heavy because they cover genuinely distinct hands-on steps in a practical workflow — also not inflation, and part of why Phase 2 already tracks close to its target.

**One specific, coherence-driven consolidation candidate was identified.** M14's objectives 14.1 ("AI vs. automation") and 14.2 ("How AI, ML & Generative AI relate") both test the same underlying "AI landscape/taxonomy" knowledge and could plausibly merge into one KNOW-depth micro-learning ("The AI Landscape: Automation, AI, ML & Generative AI"), still supportable by one recall question (e.g., a match-term-to-definition item). This would reduce M14 from 4→3 micros, Phase 3 from 18→17, and the grand total from 85→84, nudging Phase 3's share from 21% toward ~20%.

**RESOLVED — APPROVED AND APPLIED 2026-08-16.** *(Historical note: at the time M19.1 was written, this paragraph read "not applied, per audit scope... this is a recommendation for the owner/next content pass, not a correction applied in M19.1," reasoning that merging live objective/micro IDs would ripple into the Dependency Map, Assessment Map, and Consolidation Log — too large an edit for a count-reconciliation audit to make unilaterally. The owner has since reviewed and approved the merge explicitly.)* The merge is confirmed already implemented in `APPLICATION/ai-digital-learning-dashboard.jsx` (micro `14-01`, titled exactly as proposed above) and independently corroborated by `node QA/verify.mjs` reporting 84 micro-learnings against the current file. The downstream ripple this paragraph anticipated has now been carried out: `M19-LEARNING-OBJECTIVE-MAP.md`, `M19-MICROLEARNING-MAP.md`, `M19-ASSESSMENT-MAP.md`, and `M19-CONSOLIDATION-LOG.md` were all synced to the merged numbering on 2026-08-16. `M19-DEPENDENCY-MAP.md` was checked for old M14 objective/micro numbering (`grep` for `14.1`/`14.2`/`14.3`/`14.4`/`14-01`/`14-02`/`14-03`/`14-04`) and contains **no such references** — it discusses Module 14 only at the module level, never citing individual old objective/micro IDs — so it required no update and is already consistent with the merged numbering.

No other rebalancing was found to be justified. Phase 1 running under its 45% target was considered but not corrected — the V2-ARCHITECTURE-SOURCE-OF-TRUTH.md priority list for Digital Learning Core was checked topic-by-topic against M1–M8's objectives and all listed competencies are present at a coherent grain; adding micro-learnings there would be padding to hit a ratio, which Decision Rule 13 explicitly prohibits.

---

## Status

**CURRENT (2026-08-16): M19 Level-2 Curriculum Consolidation: architecture complete and
owner-approved.** The owner has reviewed and closed all four items this document's original
"Awaiting owner review" status was blocking on:
1. **V2 rewrite of `APPLICATION/ai-digital-learning-dashboard.jsx` — APPROVED**, treated as the
   current application baseline and source of truth. Not to be questioned or rolled back absent
   a new explicit instruction.
2. **Design direction — Aetheris Narrative APPROVED** as the Master Design Direction (see root
   `DESIGN.md` and `DESIGN-REFERENCES/STITCH/MASTER-DESIGN-DECISION.md`). **Not yet implemented
   in JSX** — the application still renders plain Tailwind slate/blue utility classes unrelated
   to the Aetheris token system. Applying it is a distinct future UI task.
3. **Final micro-learning count — 84 APPROVED**, per the Module 14 merge above.
4. **Old 28-day curriculum — ARCHIVED.** Historical only; not part of the current V2
   application; must not be reintroduced.

*Historical, superseded 2026-08-16: this line originally read "No application changes made.
Awaiting owner review and approval before any implementation phase begins." That was accurate
when M19 was written (2026-08-14). It stopped being accurate once
`APPLICATION/ai-digital-learning-dashboard.jsx` was rewritten to the V2 shape on 2026-08-15,
which happened without a documented approval trail at the time — see
`DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §53 for that audit finding. The owner has since
approved that rewrite retroactively as item 1 above, closing the gap.*

**What remains open:** applying the Aetheris Narrative direction to the actual UI (item 2 above)
is explicitly not yet authorized — this synchronization pass is documentation-only and did not
touch, and was not asked to touch, `APPLICATION/ai-digital-learning-dashboard.jsx`.
