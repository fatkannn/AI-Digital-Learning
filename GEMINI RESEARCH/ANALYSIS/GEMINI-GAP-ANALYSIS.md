# GEMINI-GAP-ANALYSIS.md

M16.1 — analysis only. This document covers only *meaningful* gaps between the current curriculum and the Gemini research package — not every difference. Given the finding in `GEMINI-RESEARCH-AUDIT.md` (the research audits an imagined curriculum that does not match this app on a single day number), most apparent "differences" are artifacts of the mismatch, not real gaps, and are not listed here. Only two items cleared that bar.

## Gap 1 — Day 23 lacks a practitioner-level AI-in-education resource

**Current state:** Day 23 ("AI in Instructional Design") carries two resources, both institutional/policy-level: UNESCO's generative-AI-in-education guidance and its full UNESDOC PDF.

**What Gemini research offers:** `EDTECH-001`, a Microsoft Learn educator-facing module on AI in education — practitioner/tool level, not policy level.

**Why this is a real gap, not an artifact of the day-mismatch problem:** Unlike the other six day-numbered entries in the research package, this one was never assigned a (wrong) day number by Gemini at all — it was explicitly deferred as a "candidate anchor" for a curriculum extension in the M2 audit (`CLAUDE-WORK-STATE.md` §17.3), because at that time Day 23 did not exist. Day 23 was subsequently written (M8) on exactly the topic this resource targets, but the resource itself was never revisited and added. This is a genuine miss, not a mismatch.

**Severity:** Low-to-moderate. The existing UNESCO resources are strong and sufficient to meet the day's stated objectives on their own; this would add breadth (a different resource type) rather than fix a deficiency. Classified P2 in the Enhancement Matrix.

**Not closed this session** — the specific URL was not opened, consistent with M16.1's analysis-only scope.

## Gap 2 — Day 27 (automation) uses a different specific tool than Gemini recommends

**Current state:** Day 27 teaches workflow automation using n8n, and explains the choice explicitly in the lesson text (visual, self-hostable, transparent about data at each step).

**What Gemini research offers:** `AUTO-001`, Zapier's AI automation documentation — same general topic (workflow automation), different specific product (proprietary SaaS vs. self-hostable open tool).

**Why this is worth recording, even though nothing is recommended:** This is the one place in the whole package where a Gemini-recommended resource and the curriculum's independently-made choice genuinely compete on the same topic rather than simply missing each other. Recording it here, rather than letting it disappear as a silently-considered-and-dropped difference, satisfies the audit requirement that no research finding is silently discarded.

**Severity:** None — this is a documented, reasoned decision (n8n's self-hostability and transparency fit a learning context better than a tool requiring a third-party account), not a deficiency. No action proposed.

## What is explicitly *not* treated as a gap

- **The seven day-numbered mismatches themselves** (Days 1, 5, 10, 15, 20, 25, "30") are not gaps — they are errors in the research's own baseline, already fully accounted for in the Enhancement Matrix, and re-applying them by day number would introduce content into the wrong days.
- **Content already implemented from this same research package in an earlier milestone** (Day 17's few-shot/zero-shot/CoT/XML additions; Day 19's RAG-vs-fine-tuning clarification) is not re-flagged as a gap — it is closed, and is recorded as KEEP with "already done" evidence in the Enhancement Matrix.
- **Days 21, 22, 25, 26** have no Gemini research at any level (three postdate the package entirely; Day 25's real topic, cloud computing, was never covered by Gemini even though its *creation* followed a deferral this research indirectly prompted). Absence of research is not a gap in the curriculum — it is an absence of *research*, and the curriculum content for these days was independently written and is not shown to be deficient by anything in this package.
- **The 8 `SUP` resources with no URL** and the 2 catalogue-root "Verified" entries (`AGENT-001`, `APPDEV-001`) are quality problems with the research package itself (documented in `GEMINI-RESEARCH-AUDIT.md` §5), not gaps in the curriculum.
- **Day 16's resource-URL precision question** (verified root vs. unverified more-specific path) is a resource-honesty question, not a content gap — the lesson content itself is already correct and complete. It appears in the Enhancement Matrix as VERIFY BEFORE CHANGE, not here.

## Summary

Two gaps found across 28 days and five research files. Neither is urgent (P2 and "no action," respectively). This is consistent with the audit's central finding: the research package's day-level diagnosis does not apply to this curriculum, and by the time content is matched by topic rather than by day number, the overlap between what Gemini recommends and what the curriculum already teaches is close to total.
