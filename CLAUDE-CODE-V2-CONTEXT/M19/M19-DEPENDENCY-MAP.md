# M19 — DEPENDENCY MAP

Output D of M19 Level-2 Curriculum Consolidation.

---

## 1. Module-Level Prerequisite Graph

```
PHASE 1 — DIGITAL LEARNING CORE
M1 (Learning Science & LX)
 └─▶ M2 (Needs Analysis, Learners & Performance)
      └─▶ M3 (Instructional Design & Alignment) ◀── M1
           ├─▶ M4 (Assessment & Feedback)
           ├─▶ M5 (LX, UX & Performance Support) ◀── M1
           │    └─▶ M6 (Multimedia & E-Learning Design) ◀── M3
           │         └─▶ M7 (Accessibility & UDL) ◀── M5
           └─▶ M8 (Evaluation, Kirkpatrick & Transfer) ◀── M2, M4

PHASE 2 — E-LEARNING TECHNOLOGY
M9 (LMS Fundamentals)
 ├─▶ M10 (Moodle)
 ├─▶ M11 (H5P) ◀── M3 (needs objective-writing skill)
 └─▶ M12 (SCORM)
      └─▶ M13 (xAPI, LRS & Interoperability)

PHASE 3 — AI FUNDAMENTALS
M14 (AI & GenAI Foundations)
 └─▶ M15 (Generative AI & LLM Fundamentals)
      ├─▶ M16 (Prompting & Context Management)
      │    └─▶ M17 (AI Reliability, Privacy & Responsible Use) ◀── M15
      └─▶ M18 (RAG & Modern AI Concepts)

PHASE 4 — AI-ENHANCED DIGITAL LEARNING
(each module needs its Phase 1/2 "home" competency + M16 + M17)
M2 + M16 + M17  ─▶ M19 (AI for Needs Analysis & SME Work)
M3 + M16 + M17  ─▶ M20 (AI for Instructional Design)
M4 + M16 + M17  ─▶ M21 (AI for Assessment)
M6 + M16 + M17  ─▶ M22 (AI for Storyboarding & Multimedia)
M7 + M16 + M17  ─▶ M23 (AI for Accessibility)
M10 + M11 + M12 + M13 + M16 + M17 ─▶ M24 (AI + Moodle / H5P)
M8 + M13 + M16 + M17 ─▶ M25 (AI + Learning Analytics & Evaluation)
```

---

## 2. Why This Shape

- **Phase 1 is a single spine, not independent modules.** Digital Learning Core is deliberately sequential (M1→M2→M3→{M4,M5}→M6→M7, M8 closes the loop) because each stage's output is the next stage's input in real instructional design practice: you can't write aligned objectives (M3) before you know the performance gap (M2); you can't storyboard (M6) before you have objectives (M3) and IA (M5); you can't do meaningful accessibility QA (M7) before there's a design/prototype to check (M5, M6).
- **Phase 2 fans out from a shared foundation (M9), then SCORM/xAPI form their own short chain.** Moodle (M10) and H5P (M11) are independent practical tracks once LMS fundamentals are understood; H5P additionally depends on M3 because you cannot choose a good interaction type without already knowing how to write a learning objective. SCORM (M12) must precede xAPI (M13) because xAPI is most clearly understood by contrast with SCORM's constraints.
- **Phase 3 is a tight linear chain by design.** You cannot prompt effectively (M16) without first understanding what a model is actually doing with tokens/context (M15), and you cannot evaluate reliability (M17) without knowing both how generation works (M15) and how to elicit better output through prompting (M16) — reliability judgment is partly a prompting-quality problem, not only a model-limitation problem. M18 (RAG/embeddings) branches off M15 alone since it doesn't depend on prompting skill.
- **Phase 4 is where Digital Learning and AI literacy converge.** Every AI-Enhanced module requires two independent prerequisite chains: (a) the underlying Digital Learning or E-Learning Tech competency being enhanced, and (b) the AI-skill pair M16 (how to prompt) + M17 (how to verify/stay responsible). This is a direct architectural expression of the locked philosophy: *"Understand AI deeply enough to use it intelligently. Use AI to augment the craft. Keep humans in control."* No Phase 4 module should be reachable by a learner who has not completed its Phase 1/2 counterpart — that would produce AI-tool-use without professional judgment, which `V2-ARCHITECTURE-SOURCE-OF-TRUTH.md` explicitly rejects.
- **M24 has the widest fan-in** (M10+M11+M12+M13) because it is the only Phase 4 module that touches technology delivery/data rather than a single design discipline — it needs Moodle, H5P, and the SCORM/xAPI data model all in place before AI-assisted interpretation of learning data makes sense.

---

## 3. Key Concept-Level Dependencies (not just module-level)

| Downstream concept | Depends on upstream concept | Where taught upstream |
|---|---|---|
| Measurable learning objectives (3.2) | Bloom's taxonomy verbs | 3.2 itself (foundational — no earlier dependency) |
| Backward design (3.3) | Measurable objectives | 3.2 |
| Storyboarding (6.1) | Alignment / backward design | 3.3 |
| Accessible design patterns (7.3) | Course IA and multimedia design choices to apply patterns to | 5.2, 6.3 |
| H5P interaction choice (11.1) | Writing a learning objective | 3.2 |
| SCORM completion/score/status (12.3) | What "completion/tracking" means in an LMS | 9.3 |
| xAPI vs. SCORM (13.3) | SCORM's constraints | 12.1–12.3 |
| Prompt anatomy (16.1) | Tokens/context/inference basics | 15.1, 15.2 |
| Iterative refinement (16.4) | Few-shot / output structuring | 16.2, 16.3 |
| Hallucination detection (17.1) | Fluency ≠ factuality | 15.3 |
| Source verification (17.2) | Hallucination awareness | 17.1 |
| Privacy in AI tools (17.4) | none upstream in AI chain — independent risk topic | — |
| RAG (18.2) | Embeddings | 18.1 |
| Every Phase 4 "critique" objective (20.2, 21.2, 22.2, 23.2, 24.2, 25.2) | Hallucination + verification + bias awareness | 17.1, 17.2, 17.3 |
| AI for Assessment critique (21.2) | Item-writing / bias-in-items (Digital Learning side) | 4.3 |
| AI + Learning Analytics critique (25.2) | Kirkpatrick levels / completion≠learning | 8.1, 8.3 |

---

## 4. Cross-Module Dependencies Worth Flagging for Sequencing

1. **M17 (AI Reliability/Privacy) is a hard gate before any Phase 4 module.** Every Phase 4 module's EVALUATE-depth objective assumes hallucination/bias/verification literacy from M17. Do not allow Phase 4 access before M17 is complete, even if the corresponding Phase 1/2 module is done.
2. **M16 (Prompting) is a hard gate before any Phase 4 module**, for the same reason in reverse — Phase 4's APPLY-depth objectives assume the learner can already construct a usable prompt.
3. **M3 is a double-dependency hub in Phase 1**, feeding M4, M5→M6→M7, and — cross-phase — M11 (H5P) and M20 (AI for ID). Any future change to M3's objectives should be checked against all four downstream modules.
4. **M13 (xAPI/LRS) is the only Phase 2 module with a Phase 4 dependent (M25)** via the learning-analytics link — this is a thinner justification than M24's, and is flagged in `M19-CONSOLIDATION-LOG.md` as a place where the SME/owner should confirm the xAPI→analytics link is taught with enough weight in M13 to support M25.
5. **No module in Phase 3 or Phase 4 depends on Phase 2.** AI Fundamentals and most AI-Enhanced modules are LMS-agnostic by design (Rule: "Do not make curriculum dependent on rapidly changing vendor UI"). Only M24 crosses into Phase 2 territory, and it does so at the conceptual/data level (SCORM/xAPI data shape), not at the level of a specific vendor UI.
