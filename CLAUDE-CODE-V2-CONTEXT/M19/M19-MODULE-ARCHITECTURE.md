# M19 — MODULE ARCHITECTURE

Output A of M19 Level-2 Curriculum Consolidation. Covers all 25 consolidated V2 modules.

Legend — **Practical Requirement**:
- `PRACTICAL` = learner performs a hands-on task/artifact
- `CONCEPTUAL` = understanding/explanation only, no build requirement
- `CONCEPTUAL+WORKFLOW` = understands and is exposed to/walks through a real workflow, but does not engineer it
- `APPLIED (critique/verify)` = learner uses AI to generate a draft and must critique/verify/decide (Human-in-Command)

---

## PHASE 1 — DIGITAL LEARNING CORE

| Module | Purpose | Competencies | Prerequisites | Practical Requirement |
|---|---|---|---|---|
| 1. Learning Science & Learning Experience | Build the cognitive-science foundation that justifies later design decisions. | Cognitive load theory, working memory limits, retrieval practice, spacing effect, multimedia learning principles, LX fundamentals | None (entry module) | CONCEPTUAL (applied via worked examples) |
| 2. Needs Analysis, Learners & Performance | Diagnose whether a training solution is warranted and characterize learners/performance gaps before designing anything. | Training needs analysis (TNA), performance-gap analysis, learner/audience analysis, SME & stakeholder interviewing | M1 | PRACTICAL |
| 3. Instructional Design & Alignment | Translate needs-analysis findings into aligned learning objectives and an ID structure. | ID models (ADDIE et al.), Bloom's taxonomy, measurable objectives, backward design, alignment | M1, M2 | PRACTICAL |
| 4. Assessment & Feedback | Design assessment that validly measures Module 3's objectives and gives learners useful feedback. | Assessment types, authentic assessment, item-writing, feedback design | M3 | PRACTICAL |
| 5. Learning Experience, UX & Performance Support | Apply UX/IA thinking to the learning experience and design support that works outside formal courses. | LXD/UX principles, information architecture, performance support/job aids | M1, M3 | PRACTICAL |
| 6. Multimedia & E-Learning Design | Turn an aligned design into a storyboard, script, and prototype ready for production. | Storyboarding, scriptwriting, multimedia design principles, wireframing/prototyping | M3, M5 | PRACTICAL |
| 7. Accessibility & UDL | Make learning design and multimedia usable by the widest range of learners, by design, not afterthought. | WCAG basics, UDL, accessible design patterns, accessibility QA | M5, M6 | PRACTICAL |
| 8. Evaluation, Kirkpatrick & Learning Transfer | Evaluate whether learning solutions change behavior/performance, not just completion. | Kirkpatrick's 4 levels, learning transfer, completion vs. learning | M2, M4 | CONCEPTUAL (applied via case analysis) |

## PHASE 2 — E-LEARNING TECHNOLOGY

| Module | Purpose | Competencies | Prerequisites | Practical Requirement |
|---|---|---|---|---|
| 9. LMS Fundamentals | Understand how an LMS structures, delivers, tracks, and reports learning, as the foundation for Moodle. | LMS core concepts, course structure/resources/activities, completion/tracking/grades, reporting | (logically after Phase 1) | CONCEPTUAL+WORKFLOW |
| 10. Moodle for Digital Learning | Build and manage a basic Moodle course from a Course Creator/Teacher perspective. | Course structure, resources, activities, completion settings, quiz workflow, progress monitoring, basic QA/reporting | M9 | PRACTICAL |
| 11. H5P Interactive Learning | Design and QA H5P interactive activities chosen for learning value, not novelty. | Objective→interaction mapping, Interactive Video, Branching Scenario, Course Presentation/quizzes, feedback design, QA | M3, M9 | PRACTICAL |
| 12. SCORM | Understand SCORM well enough to work with SCORM packages in an LMS workflow and explain its role/limits. | Package concept, LMS integration workflow, completion/score/status tracking, 1.2 vs 2004 awareness, limitations | M9 | CONCEPTUAL+WORKFLOW |
| 13. xAPI, LRS & Interoperability | Understand event-based learning data beyond the LMS and how it relates to SCORM. | Actor-Verb-Object, LRS role, xAPI vs. SCORM, link to learning analytics, LTI awareness | M9, M12 | CONCEPTUAL |

## PHASE 3 — AI FUNDAMENTALS

| Module | Purpose | Competencies | Prerequisites | Practical Requirement |
|---|---|---|---|---|
| 14. AI & Generative AI Foundations | Establish a correct mental model of what AI/ML/Generative AI are (and aren't), and when AI use is appropriate. | AI vs. automation, AI/ML/GenAI relationships, appropriate vs. inappropriate use | None (Phase 3 entry) | CONCEPTUAL |
| 15. Generative AI & LLM Fundamentals | Explain how LLMs generate output, so fluency is never mistaken for correctness. | Tokens, context window, inference, next-token/probabilistic generation, fluency vs. factuality | M14 | CONCEPTUAL |
| 16. Prompting & Context Management | Build practical, iterative prompting skill that produces usable drafts for Digital Learning work. | Prompt components, few-shot prompting, output formatting, decomposition, iterative refinement | M15 | PRACTICAL |
| 17. AI Reliability, Privacy & Responsible Use | Build the judgment to catch unreliable AI output and use AI tools without privacy, IP, or over-reliance risk. | Hallucination, verification, bias, automation bias, privacy/data security, copyright/IP, risk-based oversight | M15, M16 | PRACTICAL (critique/verify exercises) |
| 18. RAG & Modern AI Concepts | Give conceptual literacy in embeddings/RAG so learners understand modern AI-ecosystem claims without building them. | Embeddings (conceptual), RAG (conceptual), practitioner implications | M15 | CONCEPTUAL |

## PHASE 4 — AI-ENHANCED DIGITAL LEARNING

| Module | Purpose | Competencies | Prerequisites | Practical Requirement |
|---|---|---|---|---|
| 19. AI for Needs Analysis & SME Work | Apply AI as a drafting aid in needs analysis and SME synthesis, under human verification. | AI-assisted interview/question drafting, AI-assisted SME synthesis with verification | M2, M16, M17 | APPLIED (critique/verify) |
| 20. AI for Instructional Design | Apply AI to draft ID artifacts while the designer stays the accountable source of truth. | AI-assisted objective/outline drafting, critique against alignment criteria | M3, M16, M17 | APPLIED (critique/verify) |
| 21. AI for Assessment | Apply AI to draft assessment items while ensuring quality, validity, and freedom from bias. | AI-assisted item drafting, critique for quality/bias | M4, M16, M17 | APPLIED (critique/verify) |
| 22. AI for Storyboarding & Multimedia | Apply AI to draft storyboards/scripts/multimedia ideas while preserving instructional intent. | AI-assisted storyboard/script drafting, AI-assisted multimedia ideation, instructional critique | M6, M16, M17 | APPLIED (critique/verify) |
| 23. AI for Accessibility | Apply AI to accelerate accessibility work without treating AI as a compliance guarantee. | AI-assisted alt text/readability drafting, limits of AI accessibility checking | M7, M16, M17 | APPLIED (critique/verify) |
| 24. AI + Moodle / H5P | Apply AI to draft Moodle/H5P content and interpret LMS/SCORM/xAPI data without over-trusting either. | AI-assisted Moodle/H5P content drafting with QA, AI-assisted learning-data interpretation | M10, M11, M12, M13, M16, M17 | APPLIED (critique/verify) |
| 25. AI + Learning Analytics & Evaluation | Apply AI to summarize evaluation/analytics data while critically testing AI-generated claims against evidence. | AI-assisted evaluation-data summarization, critique of AI analytics claims, Kirkpatrick-informed judgment | M8, M13, M16, M17 | APPLIED (critique/verify) |

---

## Notes on Prerequisites

Prerequisites listed are the modules whose **concepts** are assumed, not necessarily a hard sequential lock. See `M19-DEPENDENCY-MAP.md` for concept-level dependencies and sequencing rationale. Phase 4 modules deliberately depend on both a Phase 1/2 "home" competency module and the two cross-cutting AI-skill modules (M16 prompting, M17 reliability/responsible use), because every AI-Enhanced module requires both the professional skill being enhanced and the AI literacy to use it responsibly (Human-in-Command).
