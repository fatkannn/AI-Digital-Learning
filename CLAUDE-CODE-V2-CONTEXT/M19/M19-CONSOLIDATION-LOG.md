# M19 — CONSOLIDATION LOG

> **Synced 2026-08-16 (documentation-only, no application file touched).** Owner decisions
> closed this session: V2 rewrite approved as current baseline; old 28-day curriculum
> ARCHIVED/HISTORICAL (§4 item 4, below); Module 14's 14.1+14.2 merge approved and confirmed
> already applied in code. See `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §55 for the full
> synchronization record.

Output F of M19 Level-2 Curriculum Consolidation.

**ARCHIVED / HISTORICAL source description.** Source: at the time this log was written
(2026-08-14), the existing app content was the 28-day curriculum in
`APPLICATION/ai-digital-learning-dashboard.jsx` (`CUR_A`–`CUR_G`, old Phases P1–P9). That was
audited read-only; no application file was modified *by that audit*. **This is no longer the
current application.** `APPLICATION/ai-digital-learning-dashboard.jsx` was subsequently rewritten
to the V2 architecture (25 modules, 4 phases, 84 micro-learnings) on 2026-08-15, and that rewrite
has since been owner-approved as the current baseline (see
`DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §55 item 1). The 28-day/`CUR_A`–`CUR_G` content
described throughout this log is ARCHIVED/HISTORICAL — it is the source material this
consolidation was performed *against*, not a description of today's application.

---

## §0 — Evidence Discipline Note

Per Decision Rule 16 and M19 §15, source evidence, inference, and recommendation are kept separate throughout this log:
- **Source evidence**: what the existing app content and Gemini research documents literally contain.
- **Inference**: the Gemini-research fork's finding that the old 28-day curriculum is largely a general computer-science/AI-engineering course (its own confirmed target audience label was "instructional designers," but its actual content teaches general computing, programming, and AI engineering, not instructional design) — see `GEMINI RESEARCH/ANALYSIS/GEMINI-RESEARCH-AUDIT.md`, which states the day-numbered claims in Gemini's own prior audits didn't match real content ("the imagined-curriculum problem is total").
- **Recommendation**: the KEEP/ENHANCE/MERGE/MOVE/REMOVE/ADD calls below, which follow directly from that evidence plus the locked V2 scope documents.

**Flagged evidence gap:** Gemini research has zero coverage of Phase 1 (Digital Learning Core) and most of Phase 2 (E-Learning Technology) — those competencies were never researched because the old curriculum never taught them. All Phase 1/2 ADD decisions below rely on `V2-ARCHITECTURE-SOURCE-OF-TRUTH.md`, `E-LEARNING-TECHNOLOGY-SCOPE.md`, and standard instructional-design/LMS practice rather than external verified research, not silently presented as evidence-backed. **HISTORICAL, as of 2026-08-14 (planning phase):** this gap was flagged for owner review before content authoring began. V2 content authoring has since been completed for all 25 modules (confirmed in the 2026-08-15 rewrite of `APPLICATION/ai-digital-learning-dashboard.jsx` — see `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §53/§55); this note records that the Phase 1/2 evidence gap existed at planning time, not a current pending-review status.

---

> **§§1–3 below: PLANNING/CONSOLIDATION BASELINE — HISTORICAL (as of 2026-08-14).** These three
> sections describe the content-disposition and content-authoring picture *at planning time*,
> before any V2 content had been written — §2 in particular frames all 25 modules as needing
> authorship ("pure ADD," "must be authored from scratch"), and §3 frames the quiz bank as raw
> material still to be drawn from. **That planning state has since been overtaken by events:**
> `APPLICATION/ai-digital-learning-dashboard.jsx` was rewritten to V2 on 2026-08-15 with full
> content already authored for all 25 modules (84 micro-learnings, 25 module post-tests),
> confirmed by `node QA/verify.mjs` — see `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §53/§55.
> §§1–3 remain useful as the *audit trail* for where each module's content originated and what
> was deliberately excluded (REMOVE decisions, scope rationale) — read them as history, not as a
> current "not yet written" status.

## §1 — Existing Content Disposition (Old Days 1–28)

| Old Day | Old Title | Old Phase | Disposition | Destination (V2) | Reason |
|---|---|---|---|---|---|
| 1 | How Computers Work | P1 Digital Foundations | REMOVE (from V2 architecture) | none — no V2 module covers general computer literacy | General computing literacy has no home in the 25-module Digital-Learning-first architecture; V2 assumes basic computer literacy as a prerequisite rather than teaching it. Not a quality judgment — flagged for owner to decide whether to archive, spin off separately, or retire. |
| 2 | Operating Systems | P1 | REMOVE (from V2 architecture) | none | Same as Day 1. |
| 3 | Files, Data & Storage | P1 | REMOVE (from V2 architecture) | none | Same as Day 1. |
| 4 | Internet Fundamentals | P1 | REMOVE (from V2 architecture) | none | Same as Day 1. |
| 5 | Client & Server | P1 | REMOVE (from V2 architecture) | none | Same as Day 1. |
| 6 | Web Fundamentals | P1 | REMOVE (from V2 architecture) | none | General web-dev content; its accessibility angle is a side effect of semantic HTML, not UDL/WCAG-as-practiced-by-designers — not reusable as M7 evidence (confirmed by research fork). |
| 7 | APIs | P1 | REMOVE (from V2 architecture) | none | General API development is explicitly out-of-core (`AI-FUNDAMENTALS-SCOPE.md`: "API development"); no V2 module teaches API engineering. |
| 8 | Databases | P1 | REMOVE (from V2 architecture) | none | General database engineering has no V2 home; distinct from the conceptual LRS/xAPI data model taught in M13. |
| 9 | Programming Logic, Variables, Control Flow | P2 Programming Foundations | REMOVE (from V2 architecture) | none | Programming instruction is out of scope for a Digital Learning practitioner curriculum; not listed anywhere in the 25-module inventory. |
| 10 | Functions, Data Structures & JSON | P2 | REMOVE (from V2 architecture) | none | Same as Day 9; also overlaps "API development" exclusion. |
| 11 | Git & GitHub | P2 | REMOVE (from V2 architecture) | none | Developer-tooling skill, not a Digital Learning or AI-literacy competency in V2. |
| 12 | What AI Actually Is | P3 AI Foundations | **KEEP/ENHANCE** | M14 (14.1) *(former 14.1+14.2, merged — approved 2026-08-16)* | Already teaches AI-vs-automation and AI/ML/GenAI taxonomy well; verified resource (`AI-FUND-001`). Enhance only to add the appropriate-vs-inappropriate-use framing (now 14.3), which is new. |
| 13 | Machine Learning (Data, Training, Evaluation) | P3 | **MERGE** (trim) | M14 (14.1) *(former 14.2, merged into 14.1 — approved 2026-08-16)* | Keep the conceptual "what ML is" framing that supports the AI/ML/GenAI relationship; strip training/evaluation mechanics — model training is explicitly out-of-core. |
| 14 | Deep Learning & Neural Networks | P3 | **REMOVE** | none | Neural-network mechanics is explicitly listed as OUT OF CORE in `AI-FUNDAMENTALS-SCOPE.md`. No V2 module at this depth exists; at most, DL is mentioned in one sentence inside merged 14.1's taxonomy, not taught as its own unit. |
| 15 | Generative AI | P3 | **MERGE/ENHANCE** | M14 (14.2) *(renumbered from former 14.3 — approved 2026-08-16)* | Good definitional content; merge with Day 12 content and strip any neural-network-dependent explanation carried over from Day 14's framing. |
| 16 | Tokens & Context Window | P4 LLM Foundations | **KEEP/ENHANCE** | M15 (15.1, 15.2) | Strong existing content with a verified resource (Hugging Face LLM Course). Enhance by adding the "fluency ≠ factuality" bridge (15.3), which is new and connects directly to M17. |
| 17 | Prompting, System Instructions, Structured Output | P4 | **KEEP/ENHANCE** | M16 (16.1–16.3) | Strong existing content with a verified resource (Anthropic Prompt Engineering Docs); few-shot/decomposition/structured-output already implemented. Enhance by adding iterative-refinement-as-critique-loop (16.4), which is new and ties to Human-in-Command. |
| 18 | Embeddings & Vector Search | P4 | **MERGE** (trim) | M18 (18.1) | Keep the conceptual embeddings explanation (verified Pinecone resource); strip vector-search/vector-DB implementation depth — explicitly out-of-core. |
| 19 | RAG | P5 AI App Building Blocks | **MERGE** (trim) | M18 (18.2) | Keep the RAG-vs-fine-tuning conceptual clarification already added; strip retrieval-system engineering depth. RAG is explicitly "conceptual awareness only" in V2 scope. |
| 20 | Tool Calling and AI Agents | P5 | **REMOVE** | none | Agent framework engineering is explicitly OUT OF CORE. No V2 module covers agent-building; Gemini's own supporting citations for this content were flagged low-quality (catalogue-root links, not specific resources). |
| 21 | Evaluating AI Systems | P6 Trust | **MERGE** (trim) | M17 (17.1) | Reframe from ML-evaluation mechanics (precision/recall/confusion matrix) to practical hallucination-recognition for a practitioner, which is what M17.1 needs. No Gemini evidence existed for this day (it postdates the research); flagged as an evidence gap. |
| 22 | AI Security (Prompt Injection, Data, Keys) | P6 | **MERGE** (trim) | M17 (17.4) | Reframe from security-engineering mechanics (injection attacks, API-key handling) to the privacy/confidential-data-risk framing M17.4 needs. Same evidence-gap flag as Day 21. |
| 23 | AI in Instructional Design | P7 Applied AI for Learning | **ENHANCE** | M20 (20.1, 20.2) | Strong precedent: "use AI for first drafts while keeping a human-owned source of truth" maps directly onto 20.2's Human-in-Command framing. Candidate external resource (`EDTECH-001`) was independently verified and found NOT to match its claimed focus — do not add it; keep existing UNESCO-sourced material. |
| 24 | AI, the LMS and Learning Data | P7 | **MERGE + split** | M9 (9.4), M12 (12.1), M13 (13.3), M24 (24.1, 24.2) | This single day currently bundles four distinct V2 competencies (LMS reporting limits, SCORM concept, xAPI-vs-SCORM, AI-assisted data interpretation) that the 25-module architecture deliberately separates. Preserve all of its substance, but distribute it — do not force it into one module. Gemini's own gap analysis (`RESOURCE-GAP-ANALYSIS.md` §4) confirms this content requires in-house design, not an external resource swap. |
| 25 | Cloud Computing | P8 Infrastructure & Security | **REMOVE** (from V2 architecture) | none | Infrastructure engineering is explicitly excluded ("Do not turn the learner into ... infrastructure engineer," `E-LEARNING-TECHNOLOGY-SCOPE.md`). No V2 module covers this. |
| 26 | Cybersecurity Fundamentals | P8 | **REMOVE** (from V2 architecture) | none | General cybersecurity has no V2 home; the narrow AI-specific privacy/data-risk angle is already carried by M17.4, so nothing of substance is lost. |
| 27 | Workflow Automation and n8n | P9 Automation & Integration | **REMOVE** (from V2 architecture) | none | Automation-engineering with a single-vendor tool dependency (n8n), which directly conflicts with Decision Rule 14 ("Tool UI is not the competency"). Not in the 25-module inventory. |
| 28 | MCP (Model Context Protocol) | P9 | **REMOVE** (from V2 architecture) | none | Protocol/agent-engineering content with no equivalent anywhere in the 25-module V2 list. Explicitly the kind of "agent framework engineering" the AI Fundamentals scope excludes. |

**Note on "REMOVE (from V2 architecture)":** this tag means the topic does not fit any of the 25 locked V2 modules — it is a scope-fit call, not a quality judgment on the existing content. *(HISTORICAL, true as of 2026-08-14: no files were deleted or modified; the existing [pre-V2] app was untouched by this audit. This does not describe the app's later state — `APPLICATION/ai-digital-learning-dashboard.jsx` was rewritten to V2 the next day, 2026-08-15.)*

~~The owner should decide separately whether Days 1–11 and 25–28 become a separate non-V2 "general technical literacy" track, are archived, or are retired — that decision is outside M19's authority.~~
**RESOLVED — CLOSED 2026-08-16, matching §4 item 4 below.** Owner decision: **ARCHIVE.** The
old 28-day curriculum (Days 1–11 and 25–28, and in fact the entire old-curriculum content model)
is archived/historical only, is not part of the current V2 application, and must not be
reintroduced. See `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §55 item 3 for the full record.

---

## §2 — New Content Required (ADD) — No Existing App Content

The following modules have **no corresponding existing content** and are pure ADD, to be authored against the objectives in `M19-LEARNING-OBJECTIVE-MAP.md`:

- **Phase 1 — Digital Learning Core, all 8 modules (M1–M8):** entirely new. Zero existing app content and zero Gemini research evidence (flagged in §0).
- **Phase 2 — E-Learning Technology:** M9 (LMS Fundamentals), M10 (Moodle), M11 (H5P) are entirely new. M12 (SCORM) and M13 (xAPI/LRS) partially inherit from old Day 24 (see §1) but require substantial new material (M12.2/12.3, M13.1/13.2/13.4).
- **Phase 4 — AI-Enhanced Digital Learning:** M19, M21, M22, M23, M25 are entirely new (5 of 7 Phase 4 modules). M20 and M24 partially inherit from old Days 23–24 (see §1) but each needs new CRITIQUE/VERIFY-depth material to meet Human-in-Command requirements.

This confirms the earlier module-count read: **Digital Learning Core and most of E-Learning Technology must be authored from scratch**, which is consistent with the project's stated philosophy shift — the old curriculum was a general tech/AI-engineering course; V2 is a Digital-Learning-practice course with AI as a secondary, integrated literacy.

---

## §3 — Quiz/Question Bank Handling

The existing quiz schema (`quiz: [{ t, c, q, opts, a, e }]` — type, concept tag, question, options, answer, explanation) is **structurally reusable** for both micro-learning recall items and module post-test pools; no format migration is needed. However, its current *usage pattern* — one large multi-question bank attached to each day, used as a per-day test — does not match the V2 assessment architecture (1 recall question per micro-learning + a separately pooled module post-test). Existing quiz items tagged to Days 12, 15, 16, 17, 18, 19, 21, 22, 23, 24 are **candidate raw material** for M14, M14, M15, M16, M18, M18, M17, M17, M20, M24 post-test pools respectively (ENHANCE/reuse), not for direct 1:1 reuse as micro-learning recall items, since most existing items test more than one concept at once. Actual item rewriting is out of scope for M19 (§18: no final quiz bank yet).

---

## §4 — Items Flagged for Owner Review

1. All Phase 1 (Digital Learning Core) objectives — no external research evidence base; recommend a lightweight SME/owner source-check before authoring (§0).
2. Moodle (M10) and H5P (M11) — zero research evidence; recommend confirming against current Moodle/H5P versions before authoring, since UI-dependent steps age quickly (Rule 14).
3. M17 (AI Reliability, Privacy & Responsible Use) — the two richest source days (21, 22) postdate the Gemini research entirely, so this module's content is independently authored rather than externally verified. Recommend a light fact-check pass given this is a risk-and-compliance-adjacent topic.
4. ~~Days 1–11 and 25–28 (19 of 28 existing days) fall completely outside the V2 25-module architecture. Recommend an explicit owner decision on their fate (archive / separate track / retire) before any application changes are made in a future phase.~~
   **RESOLVED — CLOSED 2026-08-16.** Owner decision: **ARCHIVE.** The old 28-day curriculum
   (Days 1–11, 25–28, and in fact the entire old-curriculum content model — see
   `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §55) is archived/historical only. It is **not** part
   of the current V2 application and must not be reintroduced. It is preserved for reference in
   `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §§0–52 (marked ARCHIVED/HISTORICAL there) and in the
   `GEMINI RESEARCH/` and `PROJECT KNOWLEDGE/` trees, not in application code.
5. Old Day 24's four-way content split (§1) should be reviewed by the owner to confirm no substance is lost in the redistribution across M9/M12/M13/M24.
6. M13→M25 dependency (xAPI/LRS feeding AI+Learning Analytics) is the thinnest cross-phase link in the architecture (see `M19-DEPENDENCY-MAP.md` §4.4) — confirm M13 is taught with enough weight to support it.
