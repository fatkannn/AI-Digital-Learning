/* verify.mjs — regression suite for ai-digital-learning-dashboard.jsx (V2: modules/micro-learnings)
 *
 *   node verify.mjs [path-to-jsx]      default: ./ai-digital-learning-dashboard.jsx
 *
 * Exits 0 when every assertion passes, 1 otherwise.
 *
 * How it works: Layers 1 and 2 of the dashboard (content + pure logic) contain no imports
 * and no JSX, so this script slices everything above the "LAYER 3" banner and evaluates it
 * in a sandboxed function, then asserts against the real functions. Layer 3 (UI) is not
 * covered — nothing here renders React.
 *
 * This script cannot check JSX syntax. For that, run:
 *   tsc --noEmit --allowJs --jsx react --target es2020 ai-digital-learning-dashboard.jsx
 * A clean run means the file parses. Validate that check itself occasionally by injecting an
 * unclosed tag into a copy and confirming the error appears.
 *
 * No dependencies. Node 18+.
 */

import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const path = process.argv[2] || "./ai-digital-learning-dashboard.jsx";
const src = readFileSync(path, "utf8");
const __dirname = dirname(fileURLToPath(import.meta.url));

const marker = src.indexOf("LAYER 3");
if (marker === -1) throw new Error("Could not find the LAYER 3 banner — has the file been restructured?");
const head = src.slice(0, marker);
// Start at the first top-level declaration, so multi-line import statements (lucide's icon
// list spans many lines) are excluded without having to parse them.
const firstDecl = head.search(/^(?:const|function|let|var)\s/m);
if (firstDecl === -1) throw new Error("Could not locate the start of the content layer.");
const layers = src.slice(firstDecl, head.lastIndexOf("/*"));

const EXPORTS = [
  "PHASES", "CONFIG", "MODULES", "STATE_VERSION", "EMPTY_STATE", "TOTAL_MICROS",
  "moduleById", "microById", "moduleForMicro", "phaseOfModule", "modulesForPhase",
  "normalizeState",
  "microDone", "microCorrect", "allMicrosDone", "microsDoneCount", "nextMicro",
  "postTestAttempts", "postTestBestPct", "postTestDone", "postTestPassed",
  "moduleCompleted", "prerequisitesMet", "moduleStatus", "activeModuleId", "lockReason", "MODULE_INDEX",
  "moduleCompletionDate", "completionDates", "streakStats",
  "minutesByDate", "minutesToday", "moduleCredit", "knowledgeProgress",
  "conceptStats", "reviewItems",
  "gradeQuestion", "gradeRecall", "drawPostTestQuestions", "gradePostTest",
  "dstr", "diffDays", "shiftDate", "prettyDate",
];
const L = new Function(`${layers}\nreturn { ${EXPORTS.join(", ")} };`)();

/* ---------- tiny assertion harness ---------- */
let pass = 0;
const fails = [];
const groups = [];
const group = (name) => groups.push(name) && void 0;
const ok = (cond, msg) => { if (cond) pass++; else fails.push(`[${groups[groups.length - 1]}] ${msg}`); };
const eq = (actual, expected, msg) =>
  ok(JSON.stringify(actual) === JSON.stringify(expected), `${msg} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);

const PASS = L.CONFIG.passThreshold;
const EMPTY = () => ({ ...L.EMPTY_STATE, micros: {}, postTests: {} });

/* ---------- state builders --------------------------------------------------
   `microSpec` marks a set of a module's micros as done, correct or not, on a given date.
   `postTestSpec` records a post-test attempt at an exact percentage (constructing the
   attempt shape directly, since not every pool size can express every percentage exactly —
   the same technique the V1 suite used for attemptAt()). */
function markMicros(state, moduleId, { correct = true, date = L.dstr(), only } = {}) {
  const mod = L.moduleById(moduleId);
  const micros = only ? mod.micros.filter((m) => only.includes(m.id)) : mod.micros;
  const next = { ...state, micros: { ...state.micros } };
  micros.forEach((mc) => {
    const given = correct ? mc.recall.a : (mc.recall.t === "tf" ? !mc.recall.a : mc.recall.t === "sa" ? "zzz" : (mc.recall.a + 1) % (mc.recall.opts?.length || 2));
    next.micros[mc.id] = L.gradeRecall(mc, given);
    next.micros[mc.id].completedAt = date; // gradeRecall stamps today; override for date-controlled tests
  });
  return next;
}
function attemptAt(mod, pct, date) {
  const drawn = mod.postTest.draw <= mod.postTest.pool.length ? mod.postTest.draw : mod.postTest.pool.length;
  const questionIds = [...Array(mod.postTest.pool.length).keys()].slice(0, drawn);
  const correctCount = Math.round((pct / 100) * drawn);
  const detail = questionIds.map((qi, i) => ({ index: qi, concept: mod.postTest.pool[qi].c, correct: i < correctCount, given: null }));
  return { date, correct: correctCount, total: drawn, pct, passed: pct >= PASS, detail, questionIds };
}
function withPostTest(state, moduleId, pcts /* number | {pct,date} | array of those */) {
  const mod = L.moduleById(moduleId);
  const list = Array.isArray(pcts) ? pcts : [pcts];
  const attempts = list.map((p) => (typeof p === "number" ? attemptAt(mod, p, L.dstr()) : attemptAt(mod, p.pct, p.date || L.dstr())));
  return { ...state, postTests: { ...state.postTests, [moduleId]: { attempts } } };
}
/** Fully complete a module: every micro correct + a passing post-test, dated. */
function completeModule(state, moduleId, { date = L.dstr(), pct = 100 } = {}) {
  let s = markMicros(state, moduleId, { correct: true, date });
  s = withPostTest(s, moduleId, { pct, date });
  return s;
}
/** Complete modules 1..n in numeric order (a valid topological order — every prereq id is
    lower than its module id), each dated `endOffset` days before today, earliest first. */
function completeThrough(n, endOffset = 0) {
  let s = EMPTY();
  for (let id = 1; id <= n; id++) s = completeModule(s, id, { date: L.shiftDate(L.dstr(), -(n - id) - endOffset) });
  return s;
}

/* An assertion that throws is itself a finding — record it and still print the report,
   rather than dying with a stack trace and no summary. */
try {

/* ---------- 1. content integrity ---------- */
group("content");
const M = L.MODULES;
eq(M.length, 25, "there must be exactly 25 modules");
eq(M.map((m) => m.id), Array.from({ length: 25 }, (_, i) => i + 1), "module ids must be 1..25 in order");
const allMicros = M.flatMap((m) => m.micros);
eq(allMicros.length, 84, "there must be exactly 84 micro-learnings");
eq(allMicros.length, new Set(allMicros.map((mc) => mc.id)).size, "micro ids must be unique");
eq(L.TOTAL_MICROS, 84, "TOTAL_MICROS constant must equal the actual micro count");

let recallCount = 0, postTestCount = 0;
M.forEach((m) => {
  ok(!!m.title && !!m.purpose, `module ${m.id}: missing title/purpose`);
  ok(Array.isArray(m.competencies) && m.competencies.length > 0, `module ${m.id}: needs competencies`);
  ok(!!L.phaseOfModule(m.id), `module ${m.id}: must fall inside a phase`);
  ok(Array.isArray(m.prereq), `module ${m.id}: prereq must be an array (possibly empty)`);
  m.prereq.forEach((p) => {
    ok(!!L.moduleById(p), `module ${m.id}: prereq ${p} does not exist`);
    ok(p < m.id, `module ${m.id}: prereq ${p} must be a lower module id (DAG must stay a valid topological order by id)`);
  });
  ok(m.micros.length >= 2, `module ${m.id}: needs at least 2 micro-learnings`);
  m.micros.forEach((mc) => {
    recallCount++;
    ok(!!mc.title && !!mc.objective, `micro ${mc.id}: missing title/objective`);
    ok(Array.isArray(mc.content) && mc.content.length > 0, `micro ${mc.id}: needs content`);
    ok(typeof mc.m === "number" && mc.m > 0, `micro ${mc.id}: needs a positive duration`);
    const q = mc.recall;
    ok(!!q, `micro ${mc.id}: missing recall question (exactly 1 required)`);
    if (!q) return;
    ok(!!q.c, `micro ${mc.id}: recall missing concept tag`);
    ok(!!q.e, `micro ${mc.id}: recall missing WHY explanation`);
    ok(["mc", "tf", "sc", "sa"].includes(q.t), `micro ${mc.id}: unknown recall type ${q.t}`);
    if (q.t === "mc" || q.t === "sc") {
      ok(Array.isArray(q.opts) && q.opts.length >= 2, `micro ${mc.id}: recall needs options`);
      ok(typeof q.a === "number" && q.a >= 0 && q.a < (q.opts || []).length, `micro ${mc.id}: recall answer index out of range`);
    }
    if (q.t === "tf") ok(typeof q.a === "boolean", `micro ${mc.id}: tf recall answer must be boolean`);
    if (q.t === "sa") {
      ok(Array.isArray(q.a?.groups) && q.a.groups.length > 0, `micro ${mc.id}: sa recall needs groups`);
      ok(typeof q.a?.need === "number" && q.a.need >= 1 && q.a.need <= q.a.groups.length, `micro ${mc.id}: sa recall need out of range`);
      ok(!!q.a?.model, `micro ${mc.id}: sa recall needs a model answer`);
    }
  });
  ok(!!m.postTest, `module ${m.id}: missing post-test`);
  if (m.postTest) {
    postTestCount++;
    ok(Array.isArray(m.postTest.pool) && m.postTest.pool.length >= 3, `module ${m.id}: post-test pool too small`);
    ok(typeof m.postTest.draw === "number" && m.postTest.draw >= 1, `module ${m.id}: post-test draw must be >= 1`);
    ok(m.postTest.draw <= m.postTest.pool.length, `module ${m.id}: post-test draw (${m.postTest.draw}) exceeds pool size (${m.postTest.pool.length})`);
    m.postTest.pool.forEach((q, i) => {
      ok(!!q.c, `module ${m.id} pool q${i}: missing concept tag`);
      ok(!!q.e, `module ${m.id} pool q${i}: missing explanation`);
      ok(["mc", "tf", "sc", "sa"].includes(q.t), `module ${m.id} pool q${i}: unknown type ${q.t}`);
      if (q.t === "mc" || q.t === "sc") {
        ok(Array.isArray(q.opts) && q.opts.length >= 2, `module ${m.id} pool q${i}: needs options`);
        ok(typeof q.a === "number" && q.a >= 0 && q.a < (q.opts || []).length, `module ${m.id} pool q${i}: answer index out of range`);
      }
      if (q.t === "tf") ok(typeof q.a === "boolean", `module ${m.id} pool q${i}: tf answer must be boolean`);
      if (q.t === "sa") {
        ok(Array.isArray(q.a?.groups) && q.a.groups.length > 0, `module ${m.id} pool q${i}: sa needs groups`);
        ok(typeof q.a?.need === "number" && q.a.need >= 1 && q.a.need <= q.a.groups.length, `module ${m.id} pool q${i}: sa need out of range`);
        ok(!!q.a?.model, `module ${m.id} pool q${i}: sa needs a model answer`);
      }
    });
  }
  (m.resources || []).forEach((r, i) => {
    ok(!!r.url && r.url.startsWith("http"), `module ${m.id} resource ${i}: needs an http url`);
    ok(typeof r.verified === "boolean", `module ${m.id} resource ${i}: verified flag must be explicit`);
  });
});
eq(recallCount, 84, "exactly 84 recall questions must exist (one per micro-learning)");
eq(postTestCount, 25, "exactly 25 module post-tests must exist");

/* ---------- 2. progression ---------- */
group("progression");
eq(L.moduleStatus(EMPTY(), 1), "not-started", "module 1 (no prereq) starts unlocked");
L.moduleById(2).prereq.forEach((p) => ok(p < 2, "sanity: module 2's prereqs precede it"));
eq(L.moduleStatus(EMPTY(), 2), "locked", "module 2 starts locked (prereq: module 1)");
eq(L.activeModuleId(EMPTY()), 1, "active module on a fresh state is 1");

const microsOnly = markMicros(EMPTY(), 1, { correct: true });
eq(L.moduleStatus(microsOnly, 1), "in-progress", "micros done without a passing post-test is in-progress");
eq(L.moduleStatus(microsOnly, 2), "locked", "next module stays locked until module 1's post-test passes");

const mod1Done = completeModule(EMPTY(), 1);
eq(L.moduleStatus(mod1Done, 1), "completed", "all micros + passing post-test completes the module");
eq(L.moduleStatus(mod1Done, 2), "not-started", "completing module 1 unlocks module 2 (its only prereq)");

const failedPT = withPostTest(markMicros(EMPTY(), 1, { correct: true }), 1, 0);
ok(!L.moduleCompleted(failedPT, 1), "a failed post-test does NOT complete the module");
eq(L.moduleStatus(failedPT, 1), "in-progress", "a failed-post-test module is in-progress, not completed");
eq(L.moduleStatus(failedPT, 2), "locked", "a failed post-test leaves the next module locked");

/* ---------- 2a-2. lock reason messages (M19.2) — concise, single-target, state-derived ---------- */
group("lock reason");

eq(L.lockReason(EMPTY(), 1), null, "module 1 has no prerequisites — lockReason is null");

// Exactly 1 unmet prereq module, with more than 1 micro -> name the module (real data:
// module 2's only prereq is module 1, which has 4 micros).
eq(L.lockReason(EMPTY(), 2), "Complete " + L.moduleById(1).title + " first.",
   "single-module prereq names the module — module 2 needs module 1");

// More than 1 unmet prereq module, all in the same phase -> name that phase (real data:
// module 3's prereqs [1, 2] are both phase 1).
eq(L.lockReason(EMPTY(), 3), "Complete Phase 1 · " + L.PHASES[0].label + " first.",
   "multi-module prereq within one phase names that phase — module 3 needs modules 1 & 2");

// More than 1 unmet prereq module spanning phases -> names the phase of the EARLIEST unmet
// one (lowest module id), not a list (real data: module 19's prereqs [2, 16, 17] span
// phase 1 and phase 3 — module 2 is earliest).
eq(L.lockReason(EMPTY(), 19), "Complete Phase 1 · " + L.PHASES[0].label + " first.",
   "multi-module prereq spanning phases names only the earliest prereq's phase — module 19");

// The prereq set narrows as progress is made: module 24 needs 6 modules; complete all but
// one and the message must collapse to naming that one remaining module, not the phase.
let s24 = EMPTY();
[10, 11, 12, 16, 17].forEach((id) => { s24 = completeModule(s24, id); });
eq(L.lockReason(s24, 24), "Complete " + L.moduleById(13).title + " first.",
   "prereq set narrowed to a single unmet module is named directly, not its phase — module 24");
eq(L.lockReason(completeModule(s24, 13), 24), null,
   "completing the last unmet prereq clears the lock reason — module 24");

// Exactly 1 unmet prereq module with exactly 1 micro -> name the micro, not the module.
// No real V2 module has exactly 1 micro-learning (minimum is 2), so this branch is
// exercised with fixture modules injected into the real MODULE_INDEX — same lockReason
// function under test, synthetic data, to cover a real (if currently unreachable) rule.
{
  const FAKE_PREREQ = 9001, FAKE_TARGET = 9002;
  L.MODULE_INDEX[FAKE_PREREQ] = { id: FAKE_PREREQ, phase: "p1", title: "Fixture prereq module", prereq: [],
    micros: [{ id: "fx-only", title: "Fixture Micro Title" }] };
  L.MODULE_INDEX[FAKE_TARGET] = { id: FAKE_TARGET, phase: "p1", title: "Fixture target module", prereq: [FAKE_PREREQ],
    micros: [{ id: "fx-t", title: "irrelevant" }] };
  eq(L.lockReason(EMPTY(), FAKE_TARGET), "Complete Fixture Micro Title first.",
     "single-micro prereq module names the micro, not the module (fixture — unreachable with real data)");
  delete L.MODULE_INDEX[FAKE_PREREQ];
  delete L.MODULE_INDEX[FAKE_TARGET];
}

// No unlock bypass: computing/reading a lock reason must never change lock status itself.
{
  const before = L.moduleStatus(EMPTY(), 2);
  L.lockReason(EMPTY(), 2);
  L.lockReason(EMPTY(), 19);
  eq(L.moduleStatus(EMPTY(), 2), before, "requesting a lock reason does not change module status");
  eq(L.moduleStatus(EMPTY(), 2), "locked", "module 2 is still locked after requesting its lock reason");
  eq(L.prerequisitesMet(EMPTY(), 2), false, "prerequisitesMet is unaffected by lockReason — no bypass");
}

/* ---------- 2b. post-test pass requirement, threshold boundaries ---------- */
group("pass requirement");
[0, 50, PASS - 1].forEach((p) => {
  const s = withPostTest(markMicros(EMPTY(), 1, { correct: true }), 1, p);
  eq(L.moduleCompleted(s, 1), false, `${p}% does not complete the module`);
  eq(L.postTestPassed(s, 1), false, `postTestPassed is false at ${p}%`);
});
[PASS, 100].forEach((p) => {
  const s = withPostTest(markMicros(EMPTY(), 1, { correct: true }), 1, p);
  eq(L.moduleCompleted(s, 1), true, `${p}% completes the module — threshold is inclusive`);
  eq(L.postTestPassed(s, 1), true, `postTestPassed is true at ${p}%`);
});
eq(L.postTestPassed(EMPTY(), 1), false, "postTestPassed is false with no attempt");
// postTestDone must mean "attempt exists", independent of score — the non-gated-recall UI
// and the "retake" label both depend on this staying true even at 0%.
eq(L.postTestDone(withPostTest(EMPTY(), 1, 0), 1), true, "postTestDone means an attempt exists, whatever the score");
eq(L.postTestDone(EMPTY(), 1), false, "postTestDone is false with no attempt");

// Micros incomplete + passed post-test must still NOT complete the module (both halves required).
const onlyPT = withPostTest(EMPTY(), 1, 100);
eq(L.moduleCompleted(onlyPT, 1), false, "a passed post-test without finished micro-learnings does NOT complete the module");
eq(L.moduleStatus(onlyPT, 2), "locked", "a passed post-test alone does not unlock the next module");

// Pass then a weaker retake: completion must survive, and keep its original date.
const t2 = L.shiftDate(L.dstr(), -2);
const passedThenFailed = withPostTest(markMicros(EMPTY(), 1, { correct: true, date: t2 }), 1, [{ pct: 85, date: t2 }, { pct: 40, date: L.dstr() }]);
const passedOnly = withPostTest(markMicros(EMPTY(), 1, { correct: true, date: t2 }), 1, { pct: 85, date: t2 });
eq(L.moduleCompleted(passedThenFailed, 1), true, "a failed retake does NOT revoke a completed module");
eq(L.moduleStatus(passedThenFailed, 2), "not-started", "a failed retake does NOT re-lock the next module");
eq(L.moduleCompletionDate(passedThenFailed, 1), L.moduleCompletionDate(passedOnly, 1), "a failed retake leaves the completion date untouched");
eq(L.postTestBestPct(passedThenFailed, 1), 85, "postTestBestPct keeps the best attempt after a weaker retake");

// Fail then pass: completes, and dates to the pass — not to the first attempt.
const failedThenPassed = withPostTest(markMicros(EMPTY(), 1, { correct: true, date: t2 }), 1, [{ pct: 40, date: t2 }, { pct: 80, date: L.dstr() }]);
eq(L.moduleCompleted(failedThenPassed, 1), true, "a passing retake completes the module");
eq(L.moduleStatus(failedThenPassed, 2), "not-started", "a passing retake unlocks the next module");
eq(L.moduleCompletionDate(failedThenPassed, 1), L.dstr(), "completion dates to the first PASSING attempt, not attempts[0]");

// postTestBestPct across attempts.
eq(L.postTestBestPct(withPostTest(EMPTY(), 1, [80, 50]), 1), 80, "postTestBestPct after pass-then-fail is 80");
eq(L.postTestBestPct(withPostTest(EMPTY(), 1, [40, 80]), 1), 80, "postTestBestPct after fail-then-pass is 80");
eq(L.postTestBestPct(EMPTY(), 1), null, "postTestBestPct is null with no attempts");

/* ---------- 3. grading ---------- */
group("grading");
M.forEach((m) => {
  m.micros.forEach((mc) => {
    const given = mc.recall.t === "sa" ? mc.recall.a.model : mc.recall.a;
    const rec = L.gradeRecall(mc, given);
    ok(rec.correct, `micro ${mc.id}: the recall's own model/correct answer must score correct`);
  });
  const questionIds = [...Array(m.postTest.pool.length).keys()];
  const allRight = Object.fromEntries(questionIds.map((qi) => {
    const q = m.postTest.pool[qi];
    return [qi, q.t === "sa" ? q.a.model : q.a];
  }));
  const r = L.gradePostTest(m, questionIds, allRight);
  eq(r.pct, 100, `module ${m.id}: own model answers across the whole pool must score 100`);
});
const anyMc = allMicros.find((mc) => mc.recall.t === "tf");
if (anyMc) eq(L.gradeQuestion(anyMc.recall, undefined), false, "unanswered true/false is wrong");

group("short answers");
const saMicros = allMicros.filter((mc) => mc.recall.t === "sa").map((mc) => ({ where: `micro ${mc.id}`, q: mc.recall }));
const saPool = M.flatMap((m) => m.postTest.pool.map((q, i) => ({ where: `module ${m.id} pool q${i}`, q })).filter((x) => x.q.t === "sa"));
const saAll = [...saMicros, ...saPool];
const JUNK = ["", "   ", "tidak tahu", "idk", "asdf qwerty", "saya belum paham materi ini",
              "ya", "benar", "penting sekali untuk dipahami", "-"];
saAll.forEach(({ where, q }) => JUNK.forEach((j) =>
  eq(L.gradeQuestion(q, j), false, `${where}: junk answer "${j}" must be rejected`)));
saAll.forEach(({ where, q }) => {
  if (q.a.need < 2) return;
  q.a.groups.forEach((g, gi) => {
    const restated = "menurut saya " + g.join(", ");
    eq(L.gradeQuestion(q, restated), false, `${where}: restating idea ${gi} alone must not pass a need-${q.a.need} question`);
  });
});
saAll.forEach(({ where, q }) => {
  const first = q.a.groups.slice(0, q.a.need).map((g) => g[0]).join(" dan ");
  const last = q.a.groups.slice(0, q.a.need).map((g) => g[g.length - 1]).join(" dan ");
  ok(L.gradeQuestion(q, "jawaban: " + first), `${where}: first-listed synonyms must pass`);
  ok(L.gradeQuestion(q, "jawaban: " + last), `${where}: last-listed synonyms must pass`);
});
// No stem may appear in two different groups of the same question — substring matching would
// let one phrase satisfy two ideas and defeat the `need` threshold.
saAll.forEach(({ where, q }) => {
  q.a.groups.forEach((g, gi) => q.a.groups.forEach((h, hj) => {
    if (gi >= hj) return;
    g.forEach((a) => h.forEach((b) => {
      const x = String(a).toLowerCase(), y = String(b).toLowerCase();
      ok(!x.includes(y) && !y.includes(x), `${where}: stem "${a}" (group ${gi}) overlaps "${b}" (group ${hj})`);
    }));
  }));
});

/* ---------- 4. post-test randomization / pool draw ---------- */
group("post-test pool");
M.forEach((m) => {
  const draws = Array.from({ length: 20 }, () => L.drawPostTestQuestions(m));
  draws.forEach((d, i) => {
    eq(d.length, Math.min(m.postTest.draw, m.postTest.pool.length), `module ${m.id} draw ${i}: wrong question count`);
    eq(d.length, new Set(d).size, `module ${m.id} draw ${i}: drawn questions must be distinct`);
    d.forEach((qi) => ok(qi >= 0 && qi < m.postTest.pool.length, `module ${m.id} draw ${i}: index out of range`));
  });
  if (m.postTest.pool.length > m.postTest.draw) {
    const signatures = new Set(draws.map((d) => [...d].sort().join(",")));
    ok(signatures.size > 1, `module ${m.id}: 20 draws from a pool larger than the draw size produced identical question sets every time — randomization is not working`);
  }
});

/* ---------- 5. streak ---------- */
group("streak");
eq(L.streakStats(EMPTY()), { current: 0, longest: 0, total: 0, todayDone: false, future: 0 }, "empty streak");
const s3 = completeThrough(3);
eq(L.streakStats(s3).current, 3, "three consecutive completed modules ending today");
ok(L.streakStats(s3).todayDone, "todayDone true when the last completion is today");
const yesterday = (() => {
  let s = completeModule(EMPTY(), 1, { date: L.shiftDate(L.dstr(), -2) });
  s = completeModule(s, 2, { date: L.shiftDate(L.dstr(), -1) });
  return s;
})();
eq(L.streakStats(yesterday).current, 2, "streak survives one grace day");
ok(!L.streakStats(yesterday).todayDone, "todayDone false when nothing completed today");
const stale = completeModule(EMPTY(), 1, { date: L.shiftDate(L.dstr(), -5) });
eq(L.streakStats(stale).current, 0, "streak breaks after a gap of two or more days");
const futureState = completeModule(EMPTY(), 1, { date: L.shiftDate(L.dstr(), 3) });
eq(L.streakStats(futureState).current, 0, "future-dated completion must not create a streak");
eq(L.streakStats(futureState).future, 1, "future-dated completion is reported");
eq(L.streakStats(futureState).total, 1, "future-dated completion still counts as a completed module");

/* ---------- 6. progress ---------- */
group("progress");
const kpEmpty = L.knowledgeProgress(EMPTY());
eq(kpEmpty.overall, 0, "empty progress is 0");
eq(kpEmpty.modulesCompleted, 0, "empty state has 0 completed modules");
eq(kpEmpty.microsCompleted, 0, "empty state has 0 completed micros");
const kpOne = L.knowledgeProgress(mod1Done);
ok(kpOne.overall > 0 && kpOne.overall <= 100, "progress stays in range");
eq(kpOne.modulesCompleted, 1, "completing module 1 counts exactly one completed module");
eq(kpOne.microsCompleted, L.moduleById(1).micros.length, "microsCompleted matches module 1's micro count");
kpOne.phases.forEach((p) => ok(p.pct >= 0 && p.pct <= 100, `phase ${p.id}: pct in range`));
// credit weighting: half for finished micros, half for best post-test score.
ok(Math.abs(L.moduleCredit(microsOnly, 1) - 0.5) < 1e-9, "all micros done, no post-test yet, earns exactly the micro half of credit");
ok(Math.abs(L.moduleCredit(mod1Done, 1) - 1) < 1e-9, "all micros + a perfect post-test earns full credit");
ok(L.knowledgeProgress(EMPTY()).phases.every((p) => p.pct === 0), "no phase shows progress on an empty state");

/* ---------- 7. review recency ---------- */
group("review");
eq(L.reviewItems(EMPTY()).length, 0, "nothing flagged on an empty state");
const wrongMicros = markMicros(EMPTY(), 1, { correct: false, only: [L.moduleById(1).micros[0].id] });
ok(L.reviewItems(wrongMicros).length > 0, "a wrong recall answer produces a review flag");
L.conceptStats(wrongMicros).forEach((c) => ok(c.attempted > 0 && c.accuracy >= 0 && c.accuracy <= 100, `concept ${c.concept}: sane stats`));
ok(L.conceptStats(wrongMicros).every((c) => !!c.lastSeen), "concept stats carry the date of the attempt they came from");

/* ---------- 8. persistence shape ---------- */
group("normalize");
const clean = completeThrough(3);
eq(L.normalizeState(JSON.parse(JSON.stringify(clean))).dropped, [], "a clean state survives normalisation untouched");
eq(L.knowledgeProgress(L.normalizeState(JSON.parse(JSON.stringify(clean))).state).overall,
   L.knowledgeProgress(clean).overall, "normalisation does not change a clean state's progress");
ok(L.normalizeState(null).dropped.length > 0, "null is reported, not crashed on");
eq(L.normalizeState(null).state?.micros, {}, "null yields an empty but usable state");

const someMicroId = L.moduleById(1).micros[0].id;
const messy = {
  version: L.STATE_VERSION, startDate: "not-a-date",
  micros: { "99-99": { completedAt: L.dstr(), given: 0, correct: true }, [someMicroId]: { completedAt: "nope", given: 0, correct: true } },
  postTests: { 1: { attempts: null }, 2: { attempts: [{ date: L.dstr(), pct: 80, correct: 4, total: 5, questionIds: [0, 1, 2, 3, 4], detail: [{ concept: "X", correct: true }] }, { date: "bad", pct: 1, detail: [] }] } },
};
const rep = L.normalizeState(messy);
eq(rep.state?.micros?.["99-99"], undefined, "unknown micro ids are dropped");
eq(rep.state?.micros?.[someMicroId], undefined, "a micro with an invalid completion date is dropped");
eq(rep.state?.postTests?.[1], undefined, "a post-test record without an attempts array is dropped");
eq(rep.state?.postTests?.[2]?.attempts?.length, 1, "only well-formed post-test attempts survive");
eq(rep.state?.startDate, L.dstr(), "an invalid startDate falls back to today");
ok(rep.dropped.length > 0, "drops are reported to the caller");
eq(L.normalizeState(rep.state).dropped, [], "normalisation is idempotent");
["streakStats", "knowledgeProgress", "reviewItems", "conceptStats", "minutesByDate"].forEach((fn) => {
  let threw = null;
  try { L[fn](rep.state); } catch (e) { threw = e.message; }
  eq(threw, null, `${fn} must not throw on a repaired state`);
});
M.forEach((m) => {
  let threw = null;
  try { L.moduleStatus(rep.state, m.id); L.moduleCredit(rep.state, m.id); L.moduleCompletionDate(rep.state, m.id); } catch (e) { threw = e.message; }
  eq(threw, null, `per-module functions must not throw on a repaired state (module ${m.id})`);
});

/* ---------- 9. progression path integrity (non-gated recall vs. gated post-test) ---------- */
/* The load-bearing distinction in the whole V2 assessment architecture: a micro-learning's
   recall question must NEVER gate progress (it only records what was answered), while a
   module's post-test MUST gate progress at the pass threshold. This group asserts both
   halves directly against the live functions, mirroring the V1 suite's M14.1 regression
   guard for the analogous day-level rule. */
group("progression path integrity");
const wrongRecallModule = markMicros(EMPTY(), 1, { correct: false });
eq(L.allMicrosDone(wrongRecallModule, 1), true, "every recall answered WRONG still counts every micro as done — recall is non-gated");
eq(L.moduleStatus(wrongRecallModule, 1), "in-progress", "a module with all-wrong recall answers is in-progress (not blocked), awaiting only the post-test");

const submittedNotPassed = withPostTest(markMicros(EMPTY(), 1, { correct: true }), 1, PASS - 1);
eq(L.postTestDone(submittedNotPassed, 1), true, "an attempt exists — postTestDone alone is satisfied");
eq(L.postTestPassed(submittedNotPassed, 1), false, "but the score does not clear the pass mark");
eq(L.moduleCompleted(submittedNotPassed, 1), false,
   "postTestDone being true must NOT be usable as a stand-in for moduleCompleted — the module stays incomplete");
eq(L.moduleStatus(submittedNotPassed, 2), "locked",
   "a submitted-but-failed post-test (postTestDone true, postTestPassed false) must leave module 2 locked");

// The generated QA build is a second, independently-produced copy of this same logic (bundled
// by QA/build.mjs from this very file). It can silently keep serving stale behaviour if never
// rebuilt after a logic change — this check catches that failure mode by freshness, not content.
const qaBuildPath = join(__dirname, "qa-build.html");
if (existsSync(qaBuildPath)) {
  const srcMtime = statSync(path).mtimeMs;
  const buildMtime = statSync(qaBuildPath).mtimeMs;
  ok(buildMtime >= srcMtime,
     "QA/qa-build.html must be rebuilt at or after the last change to the source file (run: node QA/build.mjs)");
} else {
  console.log("        (QA/qa-build.html not found next to verify.mjs — build-freshness check skipped)");
}

} catch (e) {
  fails.push(`[${groups[groups.length - 1] || "startup"}] unexpected throw — ${e.message}. ` +
             `Assertions after this point did not run.`);
}

/* ---------- report ---------- */
const width = 58;
console.log("\n" + "verify.mjs — " + path);
console.log("=".repeat(width));
if (fails.length) {
  console.log(`FAILED  ${fails.length} of ${pass + fails.length} assertions\n`);
  fails.forEach((f) => console.log("  ✗ " + f));
  console.log("\n" + "=".repeat(width));
  console.log(`${pass} passed, ${fails.length} failed`);
  process.exit(1);
}
console.log(`PASSED  all ${pass} assertions`);
const reportModules = L.MODULES;
const reportMicros = reportModules.flatMap((m) => m.micros);
const totalPoolQs = reportModules.reduce((n, m) => n + m.postTest.pool.length, 0);
const totalResources = reportModules.reduce((n, m) => n + (m.resources || []).length, 0);
const verifiedResources = reportModules.reduce((n, m) => n + (m.resources || []).filter((r) => r.verified).length, 0);
console.log(`        25 modules · 84 micro-learnings · 84 recall questions · 25 post-tests (${totalPoolQs} pool questions) · ` +
            `${totalResources} resources (${verifiedResources} verified)`);
console.log("=".repeat(width));
const needs = {};
[...reportMicros.map((mc) => mc.recall), ...reportModules.flatMap((m) => m.postTest.pool)].forEach((q) => {
  if (q.t === "sa") needs[q.a.need] = (needs[q.a.need] || 0) + 1;
});
console.log(`        short-answer strictness: ` +
            Object.keys(needs).sort().map((k) => `need ${k} × ${needs[k]}`).join(", ") +
            ` — check this line when reviewing a content change`);
console.log("=".repeat(width));
console.log("Not covered here: JSX syntax, React rendering, window.storage round-trip,");
console.log("layout, and whether any resource URL actually resolves.");
console.log("Also NOT enforced: the `need` threshold on a short answer. Lowering one is a");
console.log("content decision, so no assertion can flag it — every heuristic tried also");
console.log("failed legitimate single-idea questions. Watch the strictness line above.");
process.exit(0);
