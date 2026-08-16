# M19 — ASSESSMENT MAP

Output E of M19 Level-2 Curriculum Consolidation. This maps assessment **coverage and focus** only — it does not write the question bank (see `M19-LEVEL-2-CONSOLIDATION.md` §18: "Do NOT write the full question bank yet").

Item-type codes reuse the existing app's proven quiz schema (`APPLICATION/ai-digital-learning-dashboard.jsx`: `t: "mc"|"tf"|"sc"|"sa"`) so the eventual question bank can slot into the existing data shape without a format migration: **mc** = multiple choice, **tf** = true/false, **sc** = single choice (short list), **sa** = short answer.

---

## PART 1 — MICRO-LEARNING RECALL QUESTIONS

Rule (locked): exactly 1 recall/retrieval question per micro-learning, testing only what was explicitly taught, non-gated, with brief WHY feedback on both correct and incorrect paths.

### Phase 1 — Digital Learning Core

| Micro ID | Recall Focus | Suggested Type | Concept Tag |
|---|---|---|---|
| 1-01 | Why overloading working memory hurts learning | mc | cognitive-load |
| 1-02 | Why spaced retrieval beats re-reading | tf | spacing-effect |
| 1-03 | Identify which multimedia principle a design choice reflects | sc | multimedia-principles |
| 1-04 | Distinguish accurate content from an effective experience | mc | lx-quality |
| 2-01 | What a TNA is meant to determine before design starts | mc | tna |
| 2-02 | Distinguish a training gap from a non-training gap | sc | performance-gap |
| 2-03 | What learner-analysis data should inform | mc | learner-analysis |
| 2-04 | A key practice for productive SME interviews | mc | sme-interview |
| 3-01 | What ADDIE's phases are for | sc | id-models |
| 3-02 | Identify a measurable vs. unmeasurable objective | mc | blooms |
| 3-03 | What backward design starts from | tf | backward-design |
| 4-01 | Match an assessment type to its purpose | sc | assessment-types |
| 4-02 | What makes an assessment task authentic | mc | authentic-assessment |
| 4-03 | Identify a flawed item and why | mc | item-writing |
| 4-04 | What effective feedback includes beyond correct/incorrect | mc | feedback |
| 5-01 | Why UX applies to learning design | tf | lxd-ux |
| 5-02 | What good course IA does for the learner | mc | information-architecture |
| 5-03 | When a job aid beats a full course | sc | performance-support |
| 6-01 | What a storyboard must capture beyond narration text | mc | storyboarding |
| 6-02 | A core principle of writing for the ear | mc | scriptwriting |
| 6-03 | Apply a multimedia principle to a scenario | sc | multimedia-design |
| 6-04 | Why prototypes are tested before full production | tf | prototyping |
| 7-01 | What POUR stands for and why | mc | wcag |
| 7-02 | UDL's core premise about learner variability | mc | udl |
| 7-03 | Identify an accessibility pattern from a scenario | sc | accessible-design |
| 7-04 | What an accessibility QA pass checks for | mc | accessibility-qa |
| 8-01 | Match an example to its Kirkpatrick level | sc | kirkpatrick |
| 8-02 | What learning transfer depends on | mc | learning-transfer |
| 8-03 | Why completion data alone doesn't prove learning | tf | completion-vs-learning |

### Phase 2 — E-Learning Technology

| Micro ID | Recall Focus | Suggested Type | Concept Tag |
|---|---|---|---|
| 9-01 | Core function an LMS serves | mc | lms-basics |
| 9-02 | Difference between a resource and an activity | tf | lms-structure |
| 9-03 | What completion tracks vs. what a grade tracks | mc | lms-tracking |
| 9-04 | An LMS metric that does NOT prove learning | sc | lms-reporting |
| 10-01 | Where course structure is configured in Moodle | mc | moodle-structure |
| 10-02 | Correct resource type for a content need | sc | moodle-resources |
| 10-03 | Resource vs. activity in Moodle | tf | moodle-activities |
| 10-04 | What triggers activity completion in Moodle | mc | moodle-completion |
| 10-05 | A key quiz setting and what it controls | mc | moodle-quiz |
| 10-06 | Where to check learner progress in Moodle | sc | moodle-reporting |
| 10-07 | What to check before publishing a Moodle course | mc | moodle-qa |
| 11-01 | Match an objective to the right H5P interaction | sc | h5p-mapping |
| 11-02 | What Interactive Video adds beyond passive playback | mc | h5p-interactive-video |
| 11-03 | What a Branching Scenario is best suited to teach | mc | h5p-branching |
| 11-04 | Course Presentation vs. standalone quiz — when each fits | sc | h5p-presentation |
| 11-05 | What makes H5P feedback useful | mc | h5p-feedback |
| 11-06 | What to test before publishing an H5P activity | mc | h5p-qa |
| 12-01 | The interoperability problem SCORM solves | mc | scorm-basics |
| 12-02 | What happens when a SCORM package loads into an LMS | sc | scorm-workflow |
| 12-03 | A practical difference between SCORM 1.2 and 2004 | mc | scorm-versions |
| 13-01 | Structure of an xAPI statement | mc | xapi-basics |
| 13-02 | What an LRS does with xAPI statements | tf | lrs |
| 13-03 | A scenario xAPI captures that SCORM cannot | sc | xapi-vs-scorm |
| 13-04 | What LTI lets an LMS do with an external tool | mc | lti |

### Phase 3 — AI Fundamentals

| Micro ID | Recall Focus | Suggested Type | Concept Tag |
|---|---|---|---|
| 14-01 *(APPROVED MERGE of former 14-01+14-02 — closed 2026-08-16)* | A key distinction between AI and rule-based automation | mc | ai-vs-automation |
| 14-02 *(renumbered from former 14-03)* | A limitation of Generative AI output | mc | genai-limits |
| 14-03 *(renumbered from former 14-04)* | A scenario where AI use would be inappropriate | sc | appropriate-use |
| 15-01 | What determines an LLM's next output token | mc | token-generation |
| 15-02 | What happens when input exceeds the context window | tf | context-window |
| 15-03 | Why confident, fluent text can still be wrong | mc | fluency-vs-fact |
| 16-01 | An element missing from a weak prompt example | mc | prompt-anatomy |
| 16-02 | What adding examples to a prompt changes | tf | few-shot |
| 16-03 | Why breaking a task into steps improves output | mc | decomposition |
| 16-04 | What to do when the first AI output misses the mark | sc | iterative-refinement |
| 17-01 | What a hallucination is (and isn't) | mc | hallucination |
| 17-02 | The correct way to confirm an AI claim is accurate | sc | verification |
| 17-03 | What automation bias leads people to do | mc | automation-bias |
| 17-04 | Data that should never go into a public AI tool | mc | privacy |
| 17-05 | Why AI-generated content carries IP risk | tf | copyright-ip |
| 18-01 | What an embedding represents, in plain terms | mc | embeddings |
| 18-02 | What problem RAG solves for an AI system | mc | rag |

*Note on the Module 14 merge (approved 2026-08-16):* former micro-recall row 14-02 ("Where
Generative AI sits relative to ML and AI" / `ai-ml-genai`) is no longer a separate
micro-learning recall question — that concept is folded into merged micro 14-01's content. It
is **not dropped from assessment**: the `ai-ml-genai` concept tag is confirmed present in
Module 14's post-test pool in `APPLICATION/ai-digital-learning-dashboard.jsx` (post-test
question "Where does Machine Learning sit relative to AI in the landscape taught in this
module?"), so the competency is still tested, just at the module level rather than the
micro-recall level.

### Phase 4 — AI-Enhanced Digital Learning

| Micro ID | Recall Focus | Suggested Type | Concept Tag |
|---|---|---|---|
| 19-01 | What still requires human judgment after AI drafts questions | mc | ai-needs-analysis |
| 19-02 | Why an AI synthesis must be checked against source notes | tf | ai-sme-synthesis |
| 20-01 | Why an AI-drafted objective still needs designer review | mc | ai-id-drafting |
| 20-02 | What "human-owned source of truth" means in practice | sc | ai-id-critique |
| 21-01 | A risk of using AI-drafted items without review | mc | ai-assessment-drafting |
| 21-02 | What to check before using an AI-drafted item | sc | ai-assessment-critique |
| 22-01 | What an AI-drafted storyboard is missing without SME input | mc | ai-storyboard-drafting |
| 22-02 | How to judge an AI multimedia idea against instructional intent | sc | ai-multimedia-critique |
| 23-01 | Why AI-drafted alt text still needs a human check | mc | ai-accessibility-drafting |
| 23-02 | An accessibility issue AI checking tools commonly miss | sc | ai-accessibility-limits |
| 24-01 | Why AI-drafted H5P/Moodle content still needs QA | mc | ai-content-qa |
| 24-02 | A caution when asking AI to interpret LMS/xAPI data | tf | ai-data-interpretation |
| 25-01 | What an AI summary of evaluation data can miss | mc | ai-analytics-summary |
| 25-02 | How to test an AI analytics claim before acting on it | sc | ai-analytics-critique |

---

## PART 2 — MODULE POST-TESTS

Rule (locked): post-test occurs after all micro-learnings in a module, evaluates the module as a whole, may use application/scenario items, is the completion gate at **≥70%**, and must use a question pool and/or meaningful randomization (no identical static test per attempt).

| Module | Competencies Covered | Recommended Assessment Type | Recommended Pool Size* | Key Application/Scenario Areas |
|---|---|---|---|---|
| 1 | Cognitive load, retrieval/spacing, multimedia principles, LX quality | Mixed mc/sc + 1 applied scenario | 10–12 (4 micro-derived + 6–8 pool) | Given a flawed e-learning screen, identify which principle it violates |
| 2 | TNA, performance-gap analysis, learner analysis, SME interviewing | Mixed + 1 scenario | 10–12 | Given a request for "a course," decide whether training is the right solution |
| 3 | ID models, Bloom's/objectives, backward design | Mixed + 1 scenario | 8–10 | Rewrite a vague objective into a measurable one |
| 4 | Assessment types, authentic assessment, item-writing, feedback | Mixed + 1 scenario | 10–12 | Critique a sample assessment item for bias/flaws |
| 5 | UX/LXD, IA, performance support | Mixed + 1 scenario | 8–10 | Choose between a course and a job aid for a given need |
| 6 | Storyboarding, scriptwriting, multimedia principles, prototyping | Mixed + 1 scenario | 10–12 | Identify a storyboard element missing from a sample |
| 7 | WCAG, UDL, accessible patterns, accessibility QA | Mixed + 1 scenario | 10–12 | Spot the accessibility violation in a sample screen |
| 8 | Kirkpatrick levels, transfer, completion vs. learning | Mixed + 1 scenario | 8–10 | Classify a real evaluation example by Kirkpatrick level |
| 9 | LMS core concepts, structure, tracking, reporting | Mixed | 8–10 | Interpret what an LMS report does/doesn't prove |
| 10 | Moodle course build, resources/activities, completion, quiz, reporting, QA | Mixed + applied (screenshots/scenario) | 12–14 | Walk through a Moodle course-build checklist |
| 11 | H5P interaction selection, activity types, feedback, QA | Mixed + applied scenario | 10–12 | Choose the right H5P activity type for a given objective |
| 12 | SCORM concept, packaging/LMS workflow, versions, limitations | Mixed | 8–10 | Explain what a SCORM package reports back to the LMS |
| 13 | xAPI statements, LRS, xAPI vs. SCORM, LTI | Mixed | 8–10 | Decide whether a learning event needs xAPI or fits SCORM |
| 14 | AI vs. automation, AI/ML/GenAI relationships, appropriate use | Mixed | 8–10 | Classify a tool as AI, automation, or Generative AI |
| 15 | Tokens/inference, context window, fluency vs. factuality | Mixed | 8–10 | Predict the effect of exceeding a context window |
| 16 | Prompt anatomy, few-shot, formatting, decomposition, iteration | Mixed + applied (write/improve a prompt) | 10–12 | Improve a weak prompt against a checklist |
| 17 | Hallucination, verification, bias, privacy, copyright, oversight | Mixed + applied scenario | 12–14 | Identify what's wrong with a risky AI-use scenario (privacy or hallucination) |
| 18 | Embeddings (conceptual), RAG (conceptual) | Mixed | 6–8 | Explain in plain language why a RAG-based tool cites sources |
| 19 | AI-assisted needs-analysis drafting + verification | Applied scenario + mixed | 8–10 | Critique an AI-drafted interview guide |
| 20 | AI-assisted ID drafting + alignment critique | Applied scenario + mixed | 8–10 | Critique an AI-drafted objective against Bloom's/alignment |
| 21 | AI-assisted item drafting + quality/bias critique | Applied scenario + mixed | 8–10 | Find the flaw in an AI-drafted assessment item |
| 22 | AI-assisted storyboard/script + multimedia critique | Applied scenario + mixed | 8–10 | Critique an AI-drafted storyboard against instructional intent |
| 23 | AI-assisted accessibility drafting + limits awareness | Applied scenario + mixed | 8–10 | Identify what an AI accessibility check missed |
| 24 | AI-assisted Moodle/H5P drafting + data interpretation | Applied scenario + mixed | 10–12 | Critique an AI's interpretation of xAPI/completion data |
| 25 | AI-assisted analytics summarization + evidence critique | Applied scenario + mixed | 8–10 | Test an AI-generated analytics claim against Kirkpatrick evidence |

\* Pool size = enough distinct items to support meaningful randomization across retakes without repeating the same item set (Rule 6 / Decision Rules Rule 6). Final counts should be confirmed with the owner once item-writing begins — this is a planning estimate, not a locked number.

---

## Note on Best-Score/Retake Logic

The existing app already implements a pass-threshold and attempt-tracking mechanism (`CONFIG.passThreshold`, `DEMO_ATTEMPTS`, per fork research). Per `V2-ARCHITECTURE-SOURCE-OF-TRUTH.md` §5, best-score-across-attempts logic may be **retained only if** paired with the pool sizes above (or larger) and real randomization — carrying forward the current single static per-day test as a "post-test" would violate Rule 6. This is an implementation-time decision, flagged here for the owner, not something M19 resolves.
