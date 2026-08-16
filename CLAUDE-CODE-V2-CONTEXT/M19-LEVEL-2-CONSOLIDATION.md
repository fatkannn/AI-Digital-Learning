# M19 — LEVEL-2 CURRICULUM CONSOLIDATION

## STATUS

**CURRENT ACTIVE CURRICULUM TASK**

M19 is the next curriculum-architecture step after Gemini validation and V2 module consolidation.

The V2 architecture is already validated with revisions and consolidated into 25 modules.

M19 must convert the 25-module architecture into a defensible **learning-objective and micro-learning map**.

M19 is an architecture/content-structure task.

**DO NOT implement application changes yet.**

---

# 1. OBJECTIVE

Transform:

25 CONSOLIDATED MODULES
→ LEARNING OBJECTIVES
→ CONCEPT GROUPING
→ MICRO-LEARNING UNITS
→ RECALL QUIZ MAPPING
→ MODULE POST-TEST MAPPING
→ FINAL MICRO-LEARNING COUNT

The goal is NOT to maximize lesson count.

The goal is to create the smallest coherent set of micro-learnings that fully covers the required competencies.

---

# 2. AUTHORITATIVE CONTEXT

Before doing M19, read:

1. `V2-ARCHITECTURE-SOURCE-OF-TRUTH.md`
2. `CURRICULUM-DECISION-RULES.md`
3. `AI-FUNDAMENTALS-SCOPE.md`
4. `E-LEARNING-TECHNOLOGY-SCOPE.md`
5. `CLAUDE-CODE-V2-CONTEXT.md`
6. Relevant Gemini research under `GEMINI RESEARCH/`
7. Existing curriculum/content in the project

Historical M18 material is under:

`HISTORY/M18-CURRICULUM-ARCHITECTURE-AUDIT.md`

M18 is historical context, NOT the active task.

---

# 3. LOCKED V2 ARCHITECTURE

## PHASE 1 — DIGITAL LEARNING CORE

1. Learning Science & Learning Experience
2. Needs Analysis, Learners & Performance
3. Instructional Design & Alignment
4. Assessment & Feedback
5. Learning Experience, UX & Performance Support
6. Multimedia & E-Learning Design
7. Accessibility & UDL
8. Evaluation, Kirkpatrick & Learning Transfer

## PHASE 2 — E-LEARNING TECHNOLOGY

9. LMS Fundamentals
10. Moodle for Digital Learning
11. H5P Interactive Learning
12. SCORM
13. xAPI, LRS & Interoperability

## PHASE 3 — AI FUNDAMENTALS

14. AI & Generative AI Foundations
15. Generative AI & LLM Fundamentals
16. Prompting & Context Management
17. AI Reliability, Privacy & Responsible Use
18. RAG & Modern AI Concepts

## PHASE 4 — AI-ENHANCED DIGITAL LEARNING

19. AI for Needs Analysis & SME Work
20. AI for Instructional Design
21. AI for Assessment
22. AI for Storyboarding & Multimedia
23. AI for Accessibility
24. AI + Moodle / H5P
25. AI + Learning Analytics & Evaluation

Human-in-Command is cross-cutting:

`DEFINE → PROMPT → GENERATE → CRITIQUE → VERIFY → DECIDE`

---

# 4. MICRO-LEARNING DEFINITION

Target duration:

**approximately 5 minutes**

This is NOT a rigid timer.

A valid micro-learning should have:

- one coherent learning objective
- focused content
- one clear takeaway
- one recall opportunity

Do not split concepts unnaturally just to create more lessons.

Do not merge concepts when doing so creates excessive cognitive load or destroys conceptual coherence.

A micro-learning may be shorter or longer than five minutes when pedagogically justified.

---

# 5. MICRO-LEARNING CONSOLIDATION TEST

For every candidate micro-learning, ask:

### A. Objective
Can the learning objective be expressed clearly in one sentence?

### B. Coherence
Do all included concepts directly support that objective?

### C. Scope
Is the amount of content reasonable for a short learning unit?

### D. Dependency
Does the learner need a concept that should be taught earlier?

### E. Assessment
Can one recall question meaningfully test the key takeaway?

If the answer to E is no, reconsider the grouping.

---

# 6. MERGE RULE

Merge related topics when they serve the same learning objective.

Example:

Instead of:

- Tokens
- Probability
- Next-token prediction

as three separate micro-learnings, consider:

**How an LLM Generates Text**
- tokens
- probability
- next-token prediction

provided the combined lesson remains coherent.

---

# 7. SPLIT RULE

Split a topic when:

- it contains multiple distinct learning objectives
- cognitive load becomes excessive
- prerequisite relationships become unclear
- one recall question cannot reasonably represent the key learning
- the topic requires substantially different practice/application

Do NOT split simply because the topic contains multiple terms.

---

# 8. CONTENT DEPTH RULE

For every learning objective, identify:

- KNOW — what the learner should understand
- APPLY — what the learner should be able to do
- EVALUATE — what judgment the learner should be able to make

Not every objective requires all three.

Digital Learning professional competencies should receive practical/application depth where appropriate.

AI Fundamentals should generally remain conceptual-to-intermediate.

---

# 9. DIGITAL LEARNING PRIORITY

The curriculum must preserve:

**Digital Learning / E-Learning as the primary professional competency.**

AI is:

1. a separate literacy competency
2. a professional enhancement capability

Do not allow AI breadth to displace core Digital Learning competencies.

---

# 10. AI SCOPE BOUNDARY

AI Fundamentals should cover:

- AI / ML / Generative AI relationships
- Generative AI
- LLMs
- tokens
- context
- inference
- prompting
- hallucination
- verification
- bias
- automation bias
- over-reliance
- privacy
- data security
- enterprise/proprietary data
- copyright/IP
- responsible AI
- risk-based oversight
- conceptual RAG / embeddings

Do NOT expand the curriculum into:

- neural-network mechanics
- transformer architecture
- attention mechanics
- advanced model training
- advanced fine-tuning
- API development
- vector database engineering
- agent framework engineering
- Python AI development

If these appear in existing material, consolidate them into brief conceptual awareness or mark them for removal where appropriate.

---

# 11. E-LEARNING TECHNOLOGY DEPTH

### Practical priority
- LMS fundamentals
- Moodle
- H5P

### Conceptual + workflow
- SCORM

### Conceptual
- xAPI
- LRS
- LTI

Do not turn the curriculum into:

- server administration
- infrastructure engineering
- plugin development
- SCORM engineering

Technology must always connect to a learning problem or professional workflow.

---

# 12. ASSESSMENT ARCHITECTURE

## Micro-learning

Every micro-learning gets exactly:

**1 recall / retrieval question**

The question must:

- test only content explicitly taught in that micro-learning
- focus on the key takeaway
- avoid trick wording
- avoid external knowledge requirements
- be non-gated

### Feedback

Correct:
- brief explanation of WHY the answer is correct

Incorrect:
- show the correct answer
- brief explanation of WHY it is correct

---

## Module Post-Test

At the end of each module:

`MICRO-LEARNINGS → MODULE POST-TEST`

Post-test:

- assesses the module as a whole
- may use application/scenario questions
- is the module completion gate
- pass threshold = **70%**

Use a question pool and/or meaningful randomization.

Do not rely on an identical static test for every attempt.

Best-score logic may only be retained when the assessment pool and retake design are sufficiently robust.

---

# 13. HUMAN-IN-COMMAND

AI-related micro-learnings and applied AI modules should reinforce:

`DEFINE → PROMPT → GENERATE → CRITIQUE → VERIFY → DECIDE`

The learner remains responsible for:

- defining the problem
- establishing quality criteria
- evaluating outputs
- verifying evidence
- making the final decision
- professional accountability

AI output is not authority.

---

# 14. REQUIRED OUTPUTS

M19 must produce the following artifacts.

## OUTPUT A — MODULE ARCHITECTURE

Create:

`M19-MODULE-ARCHITECTURE.md`

Table:

| Module | Purpose | Competencies | Prerequisites | Practical Requirement |

---

## OUTPUT B — LEARNING OBJECTIVE MAP

Create:

`M19-LEARNING-OBJECTIVE-MAP.md`

Table:

| Module | Objective ID | Learning Objective | Concepts | Depth | Evidence/Source |

Use clear objective language.

Prefer measurable verbs.

---

## OUTPUT C — MICRO-LEARNING MAP

Create:

`M19-MICROLEARNING-MAP.md`

Table:

| Module | Micro ID | Micro-Learning Title | Objective | Included Concepts | Approx. Duration | Recall Focus |

This is the most important M19 artifact.

---

## OUTPUT D — DEPENDENCY MAP

Create:

`M19-DEPENDENCY-MAP.md`

Document:

- module prerequisites
- concept dependencies
- important sequencing decisions
- cross-module dependencies

---

## OUTPUT E — ASSESSMENT MAP

Create:

`M19-ASSESSMENT-MAP.md`

For each micro-learning:

- recall question focus

For each module:

- post-test competency coverage
- recommended assessment type
- important application/scenario areas

Do NOT write the full question bank yet unless specifically required.

---

## OUTPUT F — CONSOLIDATION LOG

Create:

`M19-CONSOLIDATION-LOG.md`

For each existing topic/content unit:

- KEEP
- ENHANCE
- MERGE
- MOVE
- REMOVE
- ADD

Include a short reason.

Prioritize evidence and current project requirements.

---

## OUTPUT G — FINAL COUNT

Create:

`M19-FINAL-MICROLEARNING-COUNT.md`

Report:

- total modules
- micro-learning count per module
- count per phase
- grand total
- approximate learning time
- any modules that require owner review

Do NOT force the count toward a predetermined number.

The final count must emerge from learning-objective coherence.

---

# 15. EVIDENCE DISCIPLINE

Separate:

### SOURCE EVIDENCE
What the research/source explicitly supports.

### INFERENCE
What can reasonably be concluded from the evidence.

### CURRICULUM RECOMMENDATION
What M19 recommends based on the evidence and project goals.

Do not present inference as direct evidence.

Do not invent citations.

Use existing Gemini research where relevant.

If a major curriculum decision lacks sufficient evidence, flag it for review instead of silently inventing certainty.

---

# 16. EXISTING CONTENT HANDLING

The existing curriculum is valuable source material.

For every existing lesson/topic:

1. identify what it currently teaches
2. map it to the V2 competency
3. decide KEEP / ENHANCE / MERGE / MOVE / REMOVE
4. preserve strong material
5. avoid rewriting merely for novelty

Do not assume old content is wrong simply because the architecture changed.

---

# 17. NO APPLICATION CHANGES

M19 MUST NOT:

- modify JSX
- modify React components
- modify application logic
- modify styling/UI
- modify routing
- modify question-bank implementation
- modify database/schema
- implement the new curriculum in the web app
- delete existing application content

M19 is planning and architecture only.

---

# 18. NO FINAL CONTENT WRITING YET

Do not write all final lesson prose.

Do not create polished learner-facing lessons.

Do not create the complete final quiz bank.

M19 determines:

**WHAT SHOULD EXIST**

not:

**THE FINAL LEARNER-FACING COPY**

---

# 19. NO FIXED DAY COUNT

Previous estimates such as 202 or 216 are obsolete working estimates.

Do not use them as targets.

The final number must emerge from consolidation.

Success is:

**minimum coherent micro-learning structure that fully covers the required competencies.**

---

# 20. QA CHECK BEFORE REPORTING COMPLETE

Before finishing M19, verify:

- [ ] all 25 modules were reviewed
- [ ] every module has learning objectives
- [ ] every learning objective has a clear scope
- [ ] related concepts were considered for merging
- [ ] over-large objectives were considered for splitting
- [ ] prerequisites are documented
- [ ] every micro-learning has exactly one recall focus
- [ ] every micro-learning can plausibly support one recall question
- [ ] module post-test coverage exists
- [ ] AI engineering creep is controlled
- [ ] Moodle/H5P/SCORM scope remains appropriate
- [ ] Human-in-Command is preserved
- [ ] Digital Learning remains the dominant competency
- [ ] no application files were changed
- [ ] no final learner-facing lesson content was generated
- [ ] final count is evidence/architecture-driven rather than target-driven

---

# 21. STOP CONDITION

When all M19 artifacts and QA checks are complete:

**STOP.**

Do not implement the curriculum.

Do not modify the web application.

Wait for owner review and approval.

The next phase will only begin after the owner approves the M19 architecture.
