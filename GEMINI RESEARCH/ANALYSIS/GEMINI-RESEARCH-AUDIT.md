# GEMINI-RESEARCH-AUDIT.md

M16.1 — analysis only. No file under `APPLICATION/` or `QA/` was read for the purpose of editing, and none was modified. This document audits the five files in `GEMINI RESEARCH/` against the current 28-day curriculum in `APPLICATION/ai-digital-learning-dashboard.jsx`, read directly for this session (all 28 `day`/`title`/`sub`/`objectives` blocks, the `PHASES` array, and the specific resource entries named below).

---

## 1. Inventory

Five files, all at the top level of `GEMINI RESEARCH/`. No subfolders, no additional files found.

| File | Type | Lines | Purpose | Version marker | Raw or processed | Structured data | Source URLs | Day-specific recommendations |
|---|---|---|---|---|---|---|---|---|
| `LEARNING-RESOURCE-DATABASE.json` | JSON | 553 | The canonical resource catalogue — 22 resource records (15 marked `"status": "Verified"`, 7 marked `"Needs Verification"`) | none (no date/version field on the file itself) | Processed (structured, consistent schema) | Yes — array of objects, one per resource | Yes for the 15 "Verified" entries; empty string for all 7 "Needs Verification" entries | No — this file is resource-level, not day-level |
| `CURRICULUM-RESOURCE-MAPPING.json` | JSON | 292 | Maps resources onto a curriculum by day number, with content-upgrade instructions, lesson-slot placement, and post-test guidance | `"version": "1.1"` (only version marker in the whole package) | Processed | Yes — array of day objects | No (references resource IDs, not URLs directly) | Yes — 7 entries, days 1, 5, 10, 15, 20, 25, 30 |
| `CURRICULUM-UPGRADE-PLAN.md` | Markdown | 65 | Narrative version of the same 7 days in `CURRICULUM-RESOURCE-MAPPING.json` — "Current State / What to Change / Why / Resource to Use / What NOT to Change / Post-Test Impact / Priority" per day | none | Processed, narrative | No (prose) | No | Yes — same 7 days, same day numbers |
| `LEARNING-RESOURCE-RESEARCH.md` | Markdown | 66 | Phase-level summary of the resource catalogue, organized by an assumed 15-phase structure | none | Processed, narrative | No | No | No — phase-level only, not day-level |
| `RESOURCE-GAP-ANALYSIS.md` | Markdown | 26 | Six short sections: strong-resource topics, weak-resource topics, no-resource topics, topics needing more research, possibly-outdated resources, prerequisite risks | none | Processed, narrative | No | No | Partial — names phases/topics, not day numbers |

**No file is a superset or later revision of another.** They are five different views over the same underlying research: `LEARNING-RESOURCE-DATABASE.json` is the resource-level source of truth; `CURRICULUM-RESOURCE-MAPPING.json` is its day-level application; `CURRICULUM-UPGRADE-PLAN.md` is prose restating the mapping file's 7 entries with no new information; `LEARNING-RESOURCE-RESEARCH.md` is a phase-level rollup of the same 22 resources; `RESOURCE-GAP-ANALYSIS.md` is qualitative commentary on the same catalogue. None was silently discarded — all five are used below.

## 2. Duplicates and overlap

- `CURRICULUM-UPGRADE-PLAN.md` and the `content_upgrade`/`priority` fields of `CURRICULUM-RESOURCE-MAPPING.json` are the same 7 recommendations in two formats (Markdown prose vs. JSON). Neither supersedes the other; the JSON is more complete (it additionally carries `lesson_mapping`, `post_test.question_types`, `post_test.misconceptions`, and `knowledge_mapping`, none of which appear in the Markdown version).
- `LEARNING-RESOURCE-RESEARCH.md`'s "Phase 1–15" summary and `LEARNING-RESOURCE-DATABASE.json`'s `phase` field describe the same phase assignments. No conflict found between them.
- No file contradicts another on a resource's URL, status, or recommended day. The five files are internally consistent with each other — the inconsistency is entirely between all five of them and the actual application.

## 3. Source-of-truth determination

| File | Classification | Reason |
|---|---|---|
| `LEARNING-RESOURCE-DATABASE.json` | **PRIMARY** | The only file with per-resource metadata (URL, cost, tier, quality score, prerequisites). Every other file derives from it. |
| `CURRICULUM-RESOURCE-MAPPING.json` | **PRIMARY** (structured) | The most complete day-level application of the research — richer than its own Markdown counterpart. Treated as primary for day-mapping purposes below. |
| `CURRICULUM-UPGRADE-PLAN.md` | **DUPLICATE** (of the 7 day entries in `CURRICULUM-RESOURCE-MAPPING.json`, narrative form) | Adds no information beyond the JSON version. Kept as-is per instruction (no file deleted or renamed); flagged here as redundant rather than acted on. |
| `LEARNING-RESOURCE-RESEARCH.md` | **SECONDARY / SUPPORTING** | Useful phase-level orientation and the "major learning gaps" line (AI+VR/360), which does not appear elsewhere in the package. |
| `RESOURCE-GAP-ANALYSIS.md` | **SECONDARY / SUPPORTING** | The only file that admits Gemini's own research limits (§4: "requires custom coding exercises built internally, not external docs" for LMS/SCORM; §5: framework deprecation risk for LangChain/MCP). This self-critical content is genuinely useful and is used in the Gap Analysis document. |

No file is **SUPERSEDED** — there is no earlier/later version pair in this package, only different formats of the same research pass. No file is **UNRESOLVED** in the sense of being unreadable or ambiguous; every file was fully readable and internally coherent. "Unresolved" in this audit applies to specific *claims* (flagged VERIFY BEFORE CHANGE below), not to whole files.

## 4. The finding that governs this audit — reconfirmed and extended

§17.1 of `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` (written at M2, when the curriculum had 20 days and 5 phases) found that the Gemini package audited a curriculum that does not exist: none of its per-day "Current State" descriptions matched the real day at that number. **This audit reconfirms that finding against the current 28-day, 9-phase curriculum, and the mismatch is unchanged in kind** — it is a fixed property of the research package, not something the curriculum grew out of:

| Gemini's claim | Gemini's day # | What is actually at that day # today |
|---|---|---|
| "Day 1... basic computer hardware and internet structure" | 1 | **How Computers Work** — CPU/RAM/storage/GPU, no internet content (internet is Day 4) |
| "Day 5... generic Python syntax" | 5 | **Client and Server** — the client-server model, frontend/backend/API boundary. No Python. Python starts Day 9 |
| "Day 10... AI as a monolithic block" | 10 | **Functions, Data Structures and JSON in Practice** — the real AI-taxonomy day is 12 |
| "Day 15... high-level text summaries" (LLM Fundamentals) | 15 | **Generative AI** — generative vs. discriminative models, modalities. Tokens/context window is Day 16 |
| "Day 20... informal phrasing tips" (Prompt Engineering) | 20 | **Tool Calling and AI Agents** — prompting is Day 17 |
| "Day 25... brief external data mention" (RAG) | 25 | **Cloud Computing** — RAG is Day 19 |
| "Day 30... lacks tool interaction standards" (MCP) | 30 | **Does not exist.** The curriculum ends at Day 28. MCP is Day 28 |

Every one of the 7 day-specific entries in `CURRICULUM-RESOURCE-MAPPING.json` and `CURRICULUM-UPGRADE-PLAN.md` is wrong about what currently occupies that day number. This is not new information — it restates §17.1 — but it was re-verified line by line against the file as it stands today, not assumed to still hold from an 8-milestone-old note.

**Extension to Days 21–28 (new since M2):** Days 21–28 (Phases 6–9: Evaluating AI Systems, AI Security, AI in Instructional Design, AI/LMS Data, Cloud Computing, Cybersecurity Fundamentals, Workflow Automation, MCP) were written in M8/M9, **after** the Gemini research was produced. The research package has **zero day-numbered entries** for these days — its highest referenced day number is 30, and even that maps to a topic (MCP) this curriculum reached by a different, correctly-derived number (28). So the "imagined curriculum" finding does not so much extend to Days 21–28 as **fail to reach them at all**: there is nothing in the day-mapping files to be wrong about for these 8 days. What *does* reach them is the topic-level content in `LEARNING-RESOURCE-DATABASE.json` and `RESOURCE-GAP-ANALYSIS.md`, which is phase/topic-scoped rather than day-numbered and was checked separately — see the Enhancement Matrix and Gap Analysis documents for the two genuine hits found this way (Day 23's `EDTECH-001` candidate, Day 27's `AUTO-001` alternative-tool comparison).

**Consequence for this audit, same as §17.1:** the day-numbered "what to change" claims in `CURRICULUM-RESOURCE-MAPPING.json` / `CURRICULUM-UPGRADE-PLAN.md` are not usable as-is — applying them by day number would mean, for example, rewriting Day 5 (Client and Server) with Python content, or Day 25 (Cloud Computing) with RAG content. Every one of the 7 was instead re-evaluated by **topic**, matched to whichever real day actually teaches that topic (found in §17.3 of the prior audit and reconfirmed here), and re-classified in the Enhancement Matrix against the real day.

## 5. Resource-level quality, independent of the day-mismatch problem

Separate from the wrong-day problem, the resource catalogue itself has quality issues:

- **7 of 22 resources have no URL and no Indonesian summary** (`DIG-FUND-SUP1`, `PROG-SUP1`, `PROG-SUP2`, `AI-FUND-SUP1`, `AI-FUND-SUP2`, `LLM-FUND-SUP1`, `PROMPT-SUP1`, `AGENT-SUP1` — that is 8, not 7; `LEARNING-RESOURCE-RESEARCH.md`'s own count of "8 supporting resources (Needs Verification)" is correct, the file's opening summary line undercounts by one against its own data). Every one of these carries `"status": "Needs Verification"`, `"url": ""`, and `"indonesian_summary": ""` in the JSON — there is nothing to integrate for these eight; inventing URLs would be fabrication, consistent with §17.3's original REJECT decision.
- **Two of the "Verified" entries are catalogue roots, not specific resources**: `AGENT-001` → `deeplearning.ai/courses/` (a course listing page, not a specific course) and `APPDEV-001` → `docs.langchain.com/` (a docs root). Both carry `"status": "Verified"` and `"confidence": "High"` in the database despite being link-list pages rather than the actual named resource ("Agentic AI", "LangChain Introduction"). This is the same weak-citation pattern `RESOURCE-GAP-ANALYSIS.md` itself criticizes for LangChain/MCP deprecation risk (§5) without noticing it applies to its own citations.
- **Cost mischaracterization**: `AI-FUND-001` and `GENAI-001` are both Coursera courses marked `"cost": "Free Audit"` inside the JSON (accurate there), but `LEARNING-RESOURCE-RESEARCH.md`'s summary line claims "**Free resources:** 100% of primary resources (Free or Free Audit)" — technically true by that file's own definition, but a reader skimming only the summary line would reasonably read "100% free" as "no cost," which is not so for the certificate.
- **Every `"status": "Verified"` label in this package predates any network-connected session that could have opened the URLs.** This project's own M8–M10 sessions (the first with working network access) found real problems when they finally opened comparable third-party-sourced URLs: a resource retired since 2024 (§10 M10, CS50 Understanding Technology), a resource whose canonical URL had moved (§10 M10, Postman), and one resource whose `verified: true` had been set with zero network access and had to be downgraded on discovery (§10 M10, Day 17 Anthropic entry — since re-verified and corrected in M15 §42). Gemini's "Verified" status in this package is the same kind of claim these sessions learned not to trust at face value, and this audit does **not** treat it as equivalent to this project's own `verified: true` flag, which since M8 means a human or assistant session with network access actually opened the URL.

## 6. Overall findings

1. **The imagined-curriculum problem is total, not partial.** All 7 day-numbered recommendations in the package are misfiled by day number. None can be applied as written.
2. **Content-level matching (ignoring the day number, matching by topic) recovers real value from some entries** — this is exactly what the M2 session did for Days 17 and 19, and what this session's re-check confirms is still correctly in place, plus two new topic-level matches found for Days 23 and 27 that were not acted on in M2 (see the Enhancement Matrix).
3. **Most of what the research recommends is already present in the curriculum**, arrived at independently rather than because of this research package — e.g. Day 10 already teaches JSON/dict/list exactly as Gemini's "Day 5" entry recommends; Day 12 already separates AI/ML/GenAI taxonomy exactly as Gemini's "Day 10" entry recommends; Day 16 already covers tokens and context window in depth, matching Gemini's "Day 15" entry; Day 28 already cites the exact MCP specification domain Gemini's "Day 30"/`MCP-001` entry names.
4. **Two genuinely new, unimplemented, topically-correct candidates were found** by matching on topic rather than day number: `EDTECH-001` (Microsoft Learn AI-in-education module) for Day 23, and a documented alternative-tool comparison (`AUTO-001`/Zapier vs. the curriculum's own choice of n8n) for Day 27. Both are addressed in the Enhancement Matrix; neither rises above P2/P3.
5. **No claim in the package materially contradicts anything currently taught.** No REPLACE recommendation is made anywhere in this audit — see the Enhancement Matrix and JSON plan.
6. **Nothing in `APPLICATION/`, `QA/verify.mjs`, or `QA/qa-build.html` was modified this session.** Only the four new files under `GEMINI RESEARCH/ANALYSIS/` and `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` were written.
