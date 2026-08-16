# GEMINI-CURRICULUM-ENHANCEMENT-MATRIX.md

M16.1 — analysis only. All 28 days below were read directly from `APPLICATION/ai-digital-learning-dashboard.jsx` for this session (title, `sub`, `objectives`, and — for the days discussed in the Notes column — the relevant resource entries). No curriculum content was changed to produce this table. "Gemini Finding" cites the specific Gemini source file/entry where one exists; "no day-numbered Gemini entry" means the research package has nothing filed under that day number, which is expected for most days given the day-mismatch problem documented in `GEMINI-RESEARCH-AUDIT.md`.

| Day | Existing Topic | Gemini Finding | Classification | Priority | Enhancement | Evidence | Est. Time Impact |
|---|---|---|---|---|---|---|---|
| 1 | How Computers Work (CPU/RAM/storage/GPU, bottlenecks) | `CURRICULUM-RESOURCE-MAPPING.json` day-1 entry recommends adding cloud computing + APIs — but its own "Current State" ("basic computer hardware and internet structure") is not this day's content | KEEP | — | None. `DIG-FUND-001` (CS50 Understanding Technology) was already added to this day in an earlier milestone (§17.3); the "add cloud/APIs" suggestion misapplies because both topics already have their own dedicated days (7, 25) | Gemini's stated `existing_objectives` do not match Day 1's real objectives (CPU/RAM/storage/GPU vs. "internet structure") | none |
| 2 | Operating Systems | No day-numbered Gemini entry | KEEP | — | None | — | none |
| 3 | Files, Data & Storage | No day-numbered Gemini entry | KEEP | — | None | — | none |
| 4 | Internet Fundamentals (URL→page trace, IP/DNS/HTTP, URL parts) | Gemini's "Day 1" `post_test.concepts` (IP Addresses, HTTP Basics) content-matches this day almost exactly, despite being filed under Day 1 | KEEP | — | None needed — the content Gemini wants is already the entire subject of this day, just misfiled by Gemini under a different day number | Day 4 objectives cover IP/DNS/HTTP/URL parts directly; nothing in Gemini's list is missing | none |
| 5 | Client and Server | Gemini's "Day 5" claims Python/programming content — wrong topic entirely for this day | KEEP | — | None | Real Day 5 has no overlap with Gemini's Day-5 entry | none |
| 6 | Web Fundamentals | No day-numbered Gemini entry | KEEP | — | None | — | none |
| 7 | APIs | Gemini's "Day 1" `add`: "Introduction to APIs as a concept" | KEEP | — | None — this is already a full 60-minute day on APIs, stronger than a bolt-on addition to Day 1 would be | Reconfirms §17.3's original KEEP decision | none |
| 8 | Databases | No day-numbered Gemini entry | KEEP | — | None | — | none |
| 9 | Programming Logic, Variables, Control Flow | Gemini's "Day 5" entry partially covers this ground (loops/conditionals) under the wrong day number | KEEP | — | None | Content already present; no gap | none |
| 10 | Functions, Data Structures and JSON in Practice | Gemini's "Day 5" `add`: "JSON parsing in Python"; `expand`: "Dictionaries and Lists" | KEEP | — | None — objectives already say "Load and navigate JSON in Python" and "Choose between list and dictionary." Reconfirms §17.3 | Day 10 objectives match Gemini's Day-5 wishlist word for word, just under the correct day number | none |
| 11 | Git and GitHub | No day-numbered Gemini entry | KEEP | — | None | — | none |
| 12 | What AI Actually Is | Gemini's "Day 10" `add`: "Difference between AI, ML, and Generative AI" | KEEP | — | None — objectives already say "Place AI, machine learning and deep learning in the correct relationship." Reconfirms §17.3 | `AI-FUND-001` (Coursera "AI for Everyone") was already decided ADD (unverified) in §17.3; not touched by M15's resource-verification batches, so its `verified` status (if the resource was in fact added) has not been re-checked this session — noted here, not acted on | none |
| 13 | Machine Learning: Data, Training, Evaluation | No day-numbered Gemini entry | KEEP | — | None | SkillsBuild resource here was checked in M15 Batch 1 (unresolved for tooling reasons, unrelated to this audit) | none |
| 14 | Deep Learning and Neural Networks | No day-numbered Gemini entry | KEEP | — | None | — | none |
| 15 | Generative AI | Gemini's "Day 15" claims tokens/context-window content — that is real Day 16's subject, not this day's | KEEP | — | None. `GENAI-001` (960-minute Coursera/AWS course) was already correctly deferred in §17.3 as too long and duplicative | Real Day 15 objectives (generative vs. discriminative, modalities) do not match Gemini's Day-15 entry | none |
| 16 | LLM Fundamentals: Tokens and Context Window | Gemini's "Day 15" `add`: tokens, context window; `replace`: swap to Hugging Face-specific concepts | VERIFY BEFORE CHANGE | P3 | No content change proposed — content is already correct and matches the objectives exactly. One narrow, still-open question from §17.3: whether to swap the resource URL from the verified `huggingface.co/learn` root to Gemini's more precise (but unverified) `/learn/llm-course/` path | §17.3 explicitly declined to swap a verified URL for an unverified one ("a downgrade in honesty"); the `replace` recommendation itself was already REJECTed in §17.3 as based on the false baseline in §17.1 and is not reopened here | none (resource-link precision only, no lesson content affected) |
| 17 | Prompting, System Instructions and Structured Output | Gemini's "Day 20" `add`: XML structuring, few-shot/zero-shot, chain-of-thought | KEEP | — | None — already implemented in an earlier milestone: two paragraphs and two questions on few-shot/zero-shot/CoT/XML delimiters were added, confirmed still present | §17.3 "EXPAND — done"; M15 Batch 4 separately verified and corrected this day's Anthropic resource URL (unrelated to content) | none (already done) |
| 18 | Embeddings and Vector Search | Gemini's `EMBED-001` (Pinecone vector-embeddings guide) | KEEP | — | None — Day 18 already carries a Pinecone resource on this exact topic, verified `true` as of M15 Batch 1 | Near-duplicate per §17.3; confirmed still true this session | none |
| 19 | RAG: Retrieval-Augmented Generation | Gemini's "Day 25" `clarify`: "RAG architecture is context retrieval + prompt injection, not model retraining" | KEEP | — | None — already implemented: one paragraph explicitly contrasting RAG with fine-tuning, plus a scenario question, confirmed still present | §17.3 "CLARIFY — done" | none (already done) |
| 20 | Tool Calling and AI Agents | Gemini's "Day 20" entry is mislabeled Prompt Engineering (real Day 17's topic) — no genuine content-level match found for this day | KEEP | — | None | `AGENT-001`/`AGENT-SUP1` were deferred to "Days 21+" in §17.3 as candidate anchors, not assigned here | none |
| 21 | Evaluating AI Systems | No Gemini entry at any level — this day postdates the research package | KEEP | — | None | Day did not exist when the research was produced | none |
| 22 | AI Security: Injection, Data and Keys | No Gemini entry at any level | KEEP | — | None | Day did not exist when the research was produced | none |
| 23 | AI in Instructional Design | `EDTECH-001` (Microsoft Learn "AI in Education") — deferred as a candidate anchor in §17.3, never acted on | ENHANCE | P2 | Add `EDTECH-001` as a second/alternative resource alongside the existing UNESCO guidance + UNESDOC PDF. See enhancement-value writeup below | Topic match is exact (AI + instructional design / educator AI use); source is Microsoft Learn, an official vendor-neutral learning platform (Tier 1 per Gemini's own tagging) — but the URL was not opened this session, so this is a candidate, not a verified addition | +0 min to existing content; the resource itself would need its own time budget if added as required reading, or none if added as optional further-reading |
| 24 | AI, the LMS and Learning Data | `RESOURCE-GAP-ANALYSIS.md` §4: "AI + LMS Integration (SCORM parsing via code) requires custom coding exercises built internally, not external docs" | KEEP | — | None — this is Gemini's own admission that no external resource fits, and the current day already does exactly what Gemini's own gap analysis recommends (a design exercise, not a bolted-on resource) | Confirmed against Day 24's actual content: SCORM vs. xAPI taught conceptually with a "design the instrumentation" practice exercise, no external LMS-coding resource cited | none |
| 25 | Cloud Computing | Gemini's "Day 25" entry is mislabeled RAG (real Day 19's topic). No cloud-computing resource exists anywhere in the package | KEEP | — | None — Gemini's Day-1 entry originally suggested folding cloud basics into Day 1, which §17.3 explicitly DEFERred in favor of "writing the day it deserves." Day 25 is that deferred day, written later (M9) | The deferral was followed through, independent of this research package, which never itself proposed a dedicated cloud day | none |
| 26 | Cybersecurity Fundamentals | No day-numbered or topic-level Gemini entry | KEEP | — | None | OWASP resource here was verified in M15 Batch 3, unrelated to this audit | none |
| 27 | Workflow Automation and n8n | `AUTO-001` (Zapier AI Automation) — topic match (workflow automation), different specific tool | KEEP | — | None — the curriculum's own lesson text explains the n8n choice deliberately ("visual, self-hostable, and shows you the data at every step... even if you end up using something else"), which is a stronger pedagogical fit than a proprietary SaaS tool for a learner who may not want a Zapier account | Considered and not adopted; documented here so the comparison isn't silently dropped | none |
| 28 | MCP: The Model Context Protocol | Gemini's "Day 30" (does not exist as a real day) `MCP-001` — `https://modelcontextprotocol.io/` | KEEP | — | None — Day 28 already cites `https://modelcontextprotocol.io/specification/2025-06-18`, the exact domain Gemini names, at a more specific and current path, `verified: true` | Confirmed by direct inspection this session | none (already done, more precisely than Gemini's own root-level link) |

## Classification tally

| Classification | Count |
|---|---|
| KEEP | 26 |
| ENHANCE | 1 (Day 23) |
| CLARIFY | 0 |
| UPDATE | 0 |
| VERIFY BEFORE CHANGE | 1 (Day 16) |
| REPLACE | 0 |
| **Total** | **28** |

## Priority tally

| Priority | Count | Days |
|---|---|---|
| P0 — Critical | 0 | — |
| P1 — High value | 0 | — |
| P2 — Useful | 1 | 23 |
| P3 — Nice to have | 1 | 16 |
| No action (KEEP) | 26 | all others |

## Enhancement-value detail (Day 23 — the only ENHANCE row)

1. **What exists now?** Two resources: UNESCO's official generative-AI-in-education guidance (verified) and its full UNESDOC PDF (unverified — bot-blocked, per M15 §40). Both are policy-level, not classroom-practice-level.
2. **What does Gemini add?** `EDTECH-001`, Microsoft Learn's educator-facing AI-in-education module — practitioner/tool-level rather than policy-level.
3. **Why is the addition useful?** It would sit at a different altitude than the two existing resources (institutional policy vs. day-to-day educator practice), which is a genuine gap in resource *type*, not resource *quantity*.
4. **Which learning objective does it support?** "Use AI for first drafts while keeping a human-owned source of truth" — Day 23's second objective, currently supported only by the lesson's own worked examples, not by an external resource.
5. **Where should it be inserted?** As a second "further reading" resource alongside the existing two, not a replacement for either.
6. **Does it increase learning value without unnecessary length?** Yes, if added as optional further-reading rather than required — it does not need its own lesson segment.
7. **Does it fit within the 60-minute daily constraint?** Yes — resources listed as further-reading are not part of the timed 60-minute segment structure in this app's design (confirmed: the existing two resources are already outside the 60-minute segment budget).
8. **Does it require a new resource?** Yes — this is the addition itself.
9. **Does it require a new activity?** No.
10. **Does it affect the post-test?** No — no new post-test question is proposed; the existing quiz already covers Day 23's objectives.

**Not implemented this session.** The URL (`https://learn.microsoft.com/en-us/training/educator-center/` per the Gemini database) was not opened; per M15's established standard (open before labeling `verified: true`), this would need its own verification pass before any addition, which is explicitly out of scope for M16.1.
