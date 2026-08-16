# M18 — CURRICULUM ARCHITECTURE AUDIT

## Phase

M18 is a READ-ONLY architecture audit before curriculum implementation.

## Primary Question

Does the existing 28-day curriculum actually represent:

**70% Digital Learning / E-Learning + 30% AI**

with:

- Digital Learning as the primary discipline
- AI Fundamentals as a separate competency
- AI Enhancement as an applied capability
- Human agency as a cross-cutting principle

## Inputs

Read:

1. Existing 28-day curriculum
2. Current development state
3. `GEMINI RESEARCH/V2 MASTER RESEARCH/`
4. This V2 operational context directory

## DO NOT

- modify JSX
- modify application logic
- rewrite lesson content
- change question banks
- change UI
- rebuild QA
- silently change curriculum

This phase produces an architecture recommendation only.

## Audit Every Existing Day

For each day, determine:

### 1. Primary Discipline
DIGITAL LEARNING / E-LEARNING TECHNOLOGY / AI FUNDAMENTALS / AI ENHANCEMENT / MIXED

### 2. Competency
Which V2 competency does it teach?

### 3. Depth
CONCEPTUAL / PRACTICAL / INTERMEDIATE / ADVANCED

### 4. Evidence
Which V2 research finding supports it?

### 5. Current Value
HIGH / MEDIUM / LOW

### 6. Decision
KEEP / ENHANCE / MERGE / MOVE / REMOVE

### 7. Missing Competencies
Does another V2 MUST competency need to be added?

## Required Output

### A. Executive Verdict

Choose:

- Architecture already aligned
- Aligned with revisions
- Major restructuring required

### B. 28-Day Mapping

Create:

| Day | Existing Focus | V2 Layer | Competency | Depth | Priority | Decision | Reason |
|---|---|---|---|---|---|---|---|

### C. Balance Audit

Calculate approximate distribution across:

- Digital Learning
- E-Learning Technology
- AI Fundamentals
- AI Enhancement

Do not force exact percentages.

Explain whether the current curriculum is materially AI-heavy.

### D. Competency Gap Matrix

Create:

| V2 Competency | Existing Coverage | Depth | Gap | Recommendation |
|---|---|---|---|---|

### E. AI Fundamentals Audit

Specifically check whether the current AI material:

- explains AI clearly
- explains LLMs
- explains tokens/context
- teaches prompting
- teaches hallucination/bias/evaluation
- introduces modern concepts without unnecessary engineering depth

### F. E-Learning Technology Audit

Specifically check:

- LMS
- Moodle
- H5P
- SCORM
- xAPI
- LRS
- LTI
- Analytics

### G. Human Agency Audit

Check whether the current curriculum teaches:

DEFINE → PROMPT → GENERATE → CRITIQUE → VERIFY → DECIDE

and whether assessment actually measures critique/verification.

### H. Assessment Audit

Identify whether learners are tested on:

- Digital Learning judgment
- instructional alignment
- assessment quality
- accessibility
- technology selection
- AI critique/verification

Do not change questions yet.

### I. Proposed V2 Architecture

Do NOT assign final day-by-day content yet.

Instead propose the ideal architecture as blocks/modules, showing:

- block purpose
- competencies
- approximate weight
- hands-on requirements
- prerequisites
- dependencies

### J. Change Budget

List:

- MUST CHANGE
- SHOULD CHANGE
- NICE TO CHANGE
- KEEP AS-IS

### K. Owner Decisions Required

Only list decisions that cannot be safely made from the research.

## Stop Condition

STOP after producing the architecture audit.

Do not implement.

Do not modify application files.

Do not create new lesson content.

Do not regenerate the QA suite.

Wait for owner approval before M18 implementation.
