import React, { useState, useEffect, useLayoutEffect, useMemo, useCallback, useRef } from "react";
import {
  Flame, CalendarDays, Clock, Target, CheckCircle2, Circle, Lock,
  ChevronRight, ChevronLeft, ExternalLink, AlertTriangle, GraduationCap,
  Library, RotateCcw, LayoutDashboard, Menu, X, Award,
  ShieldQuestion, Sparkles, ArrowRight, RefreshCw, FileText
} from "lucide-react";
import { LEARNING_ICONS } from "./learning-icons.js";

/* ============================================================================
   LAYER 1 — CONTENT (V2)
   4 phases -> 25 modules -> 84 microlearnings -> 84 recall questions -> 25 post-tests.
   Source of truth: CLAUDE-CODE-V2-CONTEXT/V2-FINAL-CURRICULUM-SOURCE-OF-TRUTH.md
   Nothing in this layer knows about React state or the UI.
   ========================================================================== */

const PHASES = [
  { id: "p1", number: 1, label: "Digital Learning Core", modules: [1, 8] },
  { id: "p2", number: 2, label: "E-Learning Technology", modules: [9, 13] },
  { id: "p3", number: 3, label: "AI Fundamentals", modules: [14, 18] },
  { id: "p4", number: 4, label: "AI-Enhanced Digital Learning", modules: [19, 25] },
];

const CONFIG = {
  passThreshold: 70,      // module post-test pass mark, %
  microMinutes: 5,        // target, not a timer — see individual micro `m` fields
  reviewThreshold: 70,    // concept accuracy below this is flagged for review
  reviewMinQuestions: 1,
};

/* --- Modules ----------------------------------------------------------------
   Each module: { id, phase, title, purpose, competencies, prereq, practical,
     micros: [ { id, title, objective, concepts, m, content: [...], recall: {t,c,q,opts,a,e} } ],
     postTest: { pool: [ {t,c,q,opts,a,e} ], draw }, resources: [...] }
   `prereq` lists module ids whose competencies are assumed (see M19-DEPENDENCY-MAP.md).
   `recall` is exactly one non-gated retrieval question per microlearning.
   `postTest.pool` is drawn from at random (size = postTest.draw) each attempt.        */

const MODULES = [
  {
    id: 1, phase: "p1", title: "Learning Science & Learning Experience",
    purpose: "Build the cognitive-science foundation that justifies later design decisions.",
    competencies: ["Cognitive load theory", "Working memory", "Multimedia learning", "Retrieval practice", "Spacing", "Feedback", "Learning experience principles", "Segmenting/microlearning"],
    prereq: [], practical: "CONCEPTUAL",
    micros: [
      {
        id: "1-01", title: "Cognitive Load & Working Memory", objective: "Explain how cognitive load and working-memory limits affect learning design decisions.",
        concepts: ["Cognitive load theory", "intrinsic/extraneous/germane load", "working memory"], m: 5,
        content: [
          "Working memory is small and temporary — most people can hold only a handful of new items in mind at once before something drops out. Cognitive load theory describes three demands competing for that space: intrinsic load (the inherent difficulty of the material itself), extraneous load (difficulty added by poor presentation — clutter, irrelevant detail, confusing navigation), and germane load (the effortful processing that actually builds understanding).",
          "Good learning design cannot change intrinsic load much, but it can strip out extraneous load so more working-memory capacity is left for germane processing. This is the practical reason behind almost every multimedia and interface decision later in this course: not decoration, but capacity management.",
        ],
        recall: { t: "mc", c: "cognitive-load", q: "Which type of cognitive load should instructional design try hardest to reduce?", opts: ["Intrinsic load", "Extraneous load", "Germane load", "All load equally, regardless of source"], a: 1, e: "Extraneous load comes from poor presentation, not the material's real difficulty — it's the load design can actually remove, freeing capacity for the germane processing that builds understanding." },
      },
      {
        id: "1-02", title: "Retrieval Practice & the Spacing Effect", objective: "Apply retrieval practice and spacing to reduce forgetting in a learning design.",
        concepts: ["Retrieval practice", "spacing effect", "testing effect", "feedback"], m: 5,
        content: [
          "Re-reading material feels productive but produces weak, short-lived memory. Actively recalling information — retrieval practice — strengthens memory far more effectively, which is why this course places a short recall question after every microlearning rather than a summary to re-read.",
          "Spacing compounds the effect: reviewing material after a delay (rather than immediately, back-to-back) produces better long-term retention than the same amount of study massed together. Timely, specific feedback on a retrieval attempt closes the loop — it tells the learner what they actually know versus what merely felt familiar.",
        ],
        recall: { t: "tf", c: "spacing-effect", q: "Reviewing material once, immediately after learning it, produces better long-term retention than reviewing it again after a delay.", a: false, e: "This is backwards. Spaced review — revisiting material after a delay — produces stronger long-term retention than massing all the review together right after first exposure." },
      },
      {
        id: "1-03", title: "Multimedia Learning Principles", objective: "Apply Mayer's multimedia learning principles to reduce extraneous load in e-learning content.",
        concepts: ["coherence", "signaling", "redundancy", "segmenting principles"], m: 6,
        content: [
          "Multimedia learning research gives design guidance as evidence-informed principles, not absolute laws. Coherence: excluding interesting-but-irrelevant material improves learning, because every extra element competes for working memory. Signaling: cues (arrows, highlighting, headings) that point attention at what matters reduce wasted search effort.",
          "Redundancy is the one most often over-applied: identical narration and on-screen text read simultaneously generally adds load rather than reinforcing the message. But this is not an absolute rule — on-screen text alongside narration is legitimate for technical terminology, for learners who need it, when learners control their own pacing, or for accessibility. Treat these as defaults to justify departing from, not laws that never bend.",
        ],
        recall: { t: "sc", c: "multimedia-principles", q: "A course narrates a slide word-for-word while showing the identical text on screen, for a general audience with no stated accessibility need. What does the coherence/redundancy research suggest?", opts: ["This is always correct instructional design", "It likely adds extraneous load without a compensating benefit, though exceptions exist for terminology, accessibility, or learner-paced reading", "Text and narration must never appear together under any circumstances", "Redundancy only matters for video, not slides"], a: 1, e: "Simultaneous identical narration and text usually adds load without benefit for a general audience — but the principle is evidence-informed, not absolute; accessibility, terminology, and self-paced reading are legitimate exceptions." },
      },
      {
        id: "1-04", title: "Learning Experience Design: Coherence, Engagement & Segmenting", objective: "Evaluate what makes a learning experience effective, including the role of segmenting content into short units.",
        concepts: ["engagement", "coherence", "learner experience (LX)", "segmenting/microlearning", "motivation"], m: 4,
        content: [
          "An accurate lesson can still be a poor learning experience if it is disorganized, demotivating, or hard to navigate. LX quality includes coherence (does it hang together as one clear path), friction (how much effort it takes just to use the course), and whether feedback and pacing support motivation and self-monitoring (metacognition) rather than working against them.",
          "This course itself is segmented into short microlearnings. The justification is cognitive-load management, not a claim that learners today have shorter attention spans than before — that popular claim is not well supported by evidence. Segmenting helps because it matches content to working-memory limits and enables spaced retrieval practice between units; it is a design strategy suited to many contexts, not a universally superior format for every kind of learning.",
        ],
        recall: { t: "mc", c: "lx-quality", q: "What is the evidence-based justification for splitting this course into short microlearnings?", opts: ["Modern learners have measurably shorter attention spans than in the past", "Short units better match working-memory limits and enable spaced retrieval practice", "Short content is always better than long-form content, in every context", "It reduces the total amount of material a learner must know"], a: 1, e: "The justification is cognitive load and spacing, not a shorter-attention-span myth. Microlearning is a design strategy fit for many contexts — not an inherently superior format for all learning." },
      },
    ],
    postTest: {
      draw: 5,
      pool: [
        { t: "mc", c: "cognitive-load", q: "A slide is cluttered with decorative animations unrelated to the content. What kind of load does this most likely add?", opts: ["Intrinsic", "Extraneous", "Germane", "None — decoration never affects load"], a: 1, e: "Unrelated decoration adds extraneous load: effort spent processing the material's presentation rather than its substance." },
        { t: "tf", c: "spacing-effect", q: "Cramming all review into one session right after first learning something is generally as effective for long-term retention as spacing that review out over time.", a: false, e: "Spaced review outperforms massed review for long-term retention — this is one of the most replicated findings in learning science." },
        { t: "sc", c: "multimedia-principles", q: "A technical course narrates a slide and also displays the same text, because the terminology is unfamiliar and learners are non-native readers of the narration language. Is this a defensible use of on-screen text alongside narration?", opts: ["No, redundancy is always wrong", "Yes — unfamiliar terminology and learner needs are recognized legitimate exceptions to the general redundancy caution", "Only if the video is under one minute", "Only for accessibility-certified courses"], a: 1, e: "The redundancy principle is a default, not an absolute law. Technical terminology and learner needs are explicitly legitimate exceptions." },
        { t: "mc", c: "lx-quality", q: "Which best describes why this course uses short microlearnings rather than long sessions?", opts: ["Because shorter is always better regardless of context", "Because it manages cognitive load and enables spaced retrieval, not because of an attention-span myth", "Because learners cannot read for more than five minutes", "Because it reduces the amount learners need to know"], a: 1, e: "The design rationale is load management and spacing — an evidence-based strategy, not a claim about universally shrinking attention spans." },
        { t: "mc", c: "cognitive-load", q: "Which of the three cognitive load types reflects the genuine, unavoidable difficulty of the subject matter itself?", opts: ["Extraneous load", "Germane load", "Intrinsic load", "Ambient load"], a: 2, e: "Intrinsic load is inherent to the material's complexity; design can manage extraneous load and support germane processing, but cannot eliminate intrinsic load." },
        { t: "sa", c: "spacing-effect", q: "In one sentence, why does this course place a recall question after every microlearning instead of a summary paragraph?", a: { groups: [["retriev", "recall", "remember", "test"], ["memor", "retention", "ingat"], ["passiv", "re-read", "pasif"]], need: 1, model: "Actively retrieving information strengthens memory more than passively re-reading a summary." }, e: "Retrieval practice — actively recalling — builds stronger memory than passive re-reading, which is why the question replaces a re-read summary." },
        { t: "tf", c: "multimedia-principles", q: "Coherence, signaling, and redundancy are described in this course as absolute rules that never have exceptions.", a: false, e: "They are explicitly framed as evidence-informed principles with legitimate exceptions, not absolute laws." },
      ],
    },
  },
  {
    id: 2, phase: "p1", title: "Needs Analysis, Learners & Performance",
    purpose: "Diagnose whether a training solution is warranted and characterize learners/performance gaps before designing anything.",
    competencies: ["Training needs analysis (TNA)", "Learner analysis", "Performance-gap analysis", "Training vs. non-training problems", "SME collaboration", "Stakeholder communication", "Performance support", "Job aids"],
    prereq: [1], practical: "PRACTICAL",
    micros: [
      {
        id: "2-01", title: "Training Needs Analysis: Purpose & Process", objective: "Explain the purpose and process of a Training Needs Analysis (TNA).",
        concepts: ["TNA", "front-end analysis"], m: 5,
        content: [
          "A Training Needs Analysis asks a question before any content exists: is there actually a gap that training can close, and if so, what exactly must the learner be able to do afterward that they cannot do now? Skipping this step is how organizations end up building courses nobody needed.",
          "A front-end TNA typically gathers evidence from several angles — performance data, stakeholder interviews, observation, existing documentation — rather than relying on a single manager's opinion of what training is 'obviously' needed. The output is a defensible statement of the gap, not a course outline.",
        ],
        recall: { t: "mc", c: "tna", q: "What is the main purpose of a Training Needs Analysis before designing a course?", opts: ["To decide what colors and fonts the course should use", "To confirm there is a real performance gap that training can close, and define it precisely", "To count how many employees are available to attend training", "To choose which LMS to deliver the course on"], a: 1, e: "A TNA exists to establish whether training is actually the right response to a real, defined gap — before any content is built." },
      },
      {
        id: "2-02", title: "Identifying Performance Gaps", objective: "Distinguish training-solvable performance gaps from non-training gaps.",
        concepts: ["performance-gap analysis", "root-cause"], m: 5,
        content: [
          "Not every performance problem is a knowledge or skill problem. A salesperson who knows the process but is missing the right tools, working under a broken incentive structure, or lacking timely feedback will not improve just because they attend a course.",
          "The practical test: if the person could do the task correctly right now for a large cash reward, would they? If yes, it's very likely not a training problem — it's an environment, tools, motivation, or process problem, and training will not fix it.",
        ],
        recall: { t: "sc", c: "performance-gap", q: "A team consistently misses a deadline. Interviews reveal they know exactly what to do, but the required software is broken half the time. What kind of gap is this?", opts: ["A training gap — build a course on time management", "A non-training gap — the environment/tools are the problem, not knowledge or skill", "A motivation gap requiring an incentive redesign only", "Impossible to know without a TNA"], a: 1, e: "They already know what to do; the barrier is broken tooling. This is an environment/process gap, not something a training course can fix." },
      },
      {
        id: "2-03", title: "Learner Analysis: Audience Profiling", objective: "Profile a learner audience to inform design decisions.",
        concepts: ["learner analysis", "audience profiling"], m: 5,
        content: [
          "Learner analysis gathers what actually shapes design decisions: prior knowledge, role/context, motivation, constraints (time, device, language), and what a typical day already looks like for this audience. A course designed for confident experts and one designed for anxious novices should look different even if the topic is identical.",
          "The goal is not an exhaustive demographic survey — it's collecting exactly the facts that change a design decision, such as reading level, available study time, or whether learners have reliable internet access.",
        ],
        recall: { t: "mc", c: "learner-analysis", q: "What should learner-analysis findings primarily be used for?", opts: ["Filling out a template for its own sake", "Informing specific design decisions such as reading level, pacing, and format", "Deciding the color scheme of the course", "Replacing the need for a TNA"], a: 1, e: "Learner analysis is only useful insofar as it changes a real design decision — pacing, format, reading level, delivery constraints." },
      },
      {
        id: "2-04", title: "Working with SMEs & Stakeholders", objective: "Conduct an SME interview and synthesize input into design-usable form.",
        concepts: ["SME/stakeholder management", "interview synthesis", "expertise communication"], m: 6,
        content: [
          "Subject matter experts have often automated their own foundational knowledge — they perform a skill fluently without consciously narrating the steps a novice would need. This can create a real communication gap when an expert tries to explain their own expertise to a beginner, though it is not accurate to assume every SME has this problem equally; some communicate very clearly.",
          "The Digital Learning practitioner's job in an SME interview is to translate expert knowledge into learner-appropriate instruction: ask for concrete examples and edge cases rather than abstractions, probe for the steps an expert skips because they're 'obvious,' and always play back a synthesis for the SME to correct before it becomes course content.",
        ],
        recall: { t: "sa", c: "sme-interview", q: "In one sentence, why should an interviewer ask an SME for concrete examples rather than accepting a high-level abstract explanation?", a: { groups: [["automat", "skip", "obvious", "unconscious"], ["novice", "beginner", "learner"], ["concrete", "specific", "example", "detail"]], need: 1, model: "Experts often automate and skip steps that feel obvious to them but are exactly what a novice needs made explicit." }, e: "Experts frequently skip steps that feel automatic to them but are precisely what a novice learner needs spelled out — concrete examples surface those hidden steps." },
      },
    ],
    postTest: {
      draw: 5,
      pool: [
        { t: "mc", c: "tna", q: "Which of these is the correct first step before designing a course?", opts: ["Pick an authoring tool", "Confirm a real performance gap exists and define it precisely (TNA)", "Draft the storyboard", "Write the module post-test"], a: 1, e: "Design should follow from a confirmed, well-defined gap — that confirmation is the TNA's job." },
        { t: "sc", c: "performance-gap", q: "A call-center agent knows the correct script but the CRM system takes 40 seconds to load each call, causing agents to skip steps under time pressure. What kind of gap is this?", opts: ["Knowledge gap — train them on the script again", "Skill gap — give them more practice", "Environment/tooling gap — training will not fix a slow system", "Motivation gap"], a: 2, e: "The bottleneck is the tool's performance, not the agent's knowledge or skill. No amount of training fixes a slow CRM." },
        { t: "mc", c: "learner-analysis", q: "Two audiences will take the same compliance course: confident senior staff and anxious new hires. What does learner analysis suggest?", opts: ["Build one identical version — the content is the same so the experience should be too", "Consider adjusting pacing, tone, or support even though the underlying content is the same", "Skip learner analysis since the topic is fixed by law", "Only anxious learners need a needs analysis"], a: 1, e: "Same content, different audience needs — pacing, tone, and support can reasonably differ even when the required content doesn't." },
        { t: "tf", c: "sme-interview", q: "Every subject matter expert suffers equally from an inability to explain their own expertise to novices.", a: false, e: "This course explicitly avoids that universal claim — expert blind spot is a real, common risk, not a guaranteed trait of every SME." },
        { t: "mc", c: "performance-gap", q: "What is a practical test for whether a performance problem is a training problem?", opts: ["Ask whether the employee has a college degree", "Ask: if given a strong incentive, could they already do it correctly right now?", "Ask whether the company has an LMS", "Ask how long the employee has worked there"], a: 1, e: "If a strong incentive would fix it instantly, the barrier isn't knowledge or skill — it's something training cannot solve." },
        { t: "sc", c: "tna", q: "A manager says 'everyone needs a course on time management' with no supporting data. What should a Digital Learning practitioner do first?", opts: ["Build the course as requested — the manager knows their team", "Conduct a TNA to establish whether a real, defined gap exists before designing anything", "Decline the request outright", "Ask IT to pick an LMS"], a: 1, e: "An unverified assumption is exactly what a TNA is for — establishing evidence before committing to a training solution." },
        { t: "mc", c: "sme-interview", q: "An SME gives a very abstract, high-level answer to 'how do you handle this task?' What is the best next move?", opts: ["Accept the answer and move on", "Ask for a concrete recent example, walked through step by step", "Assume the SME doesn't know the material", "Write the course content based on the abstract answer"], a: 1, e: "Concrete, specific examples surface the steps an expert has automated and would otherwise skip in an abstract answer." },
      ],
    },
  },
  {
    id: 3, phase: "p1", title: "Instructional Design & Alignment",
    purpose: "Translate needs-analysis findings into aligned learning objectives and an ID structure.",
    competencies: ["Instructional design", "Learning objectives", "Bloom's taxonomy", "Backward design", "Alignment", "ADDIE", "Iterative design"],
    prereq: [1, 2], practical: "PRACTICAL",
    micros: [
      {
        id: "3-01", title: "Instructional Design Models Overview", objective: "Compare instructional design models and select one fit for a given project.",
        concepts: ["ADDIE", "iterative design"], m: 5,
        content: [
          "ADDIE — Analyze, Design, Develop, Implement, Evaluate — is the most widely known instructional design model. Treated as a strict waterfall it can be slow; treated as an iterative cycle (design, get feedback, revise, repeat) it becomes a practical working method rather than a rigid checklist.",
          "Other models (SAM, Agile-influenced approaches) exist mainly to make the iteration explicit. The choice of model matters less than the underlying discipline: analyze before designing, and revise based on real feedback rather than assuming the first draft is right.",
        ],
        recall: { t: "mc", c: "id-models", q: "What is the main practical benefit of treating ADDIE iteratively rather than as a strict one-pass waterfall?", opts: ["It removes the need for a needs analysis", "It allows feedback and revision to improve the design instead of locking in first-draft assumptions", "It guarantees the course will need no post-test", "It replaces the need for learning objectives"], a: 1, e: "Iteration lets real feedback correct first-draft assumptions — the core value of any ID model, ADDIE included." },
      },
      {
        id: "3-02", title: "Writing Measurable Learning Objectives", objective: "Write measurable learning objectives using Bloom's Taxonomy.",
        concepts: ["Bloom's taxonomy", "measurable verbs"], m: 6,
        content: [
          "A learning objective states what the learner will be able to do, observably, after instruction — not what the course will 'cover.' Bloom's taxonomy offers a ladder of measurable verbs by cognitive level: remember (list, define), understand (explain, summarize), apply (use, demonstrate), analyze (compare, differentiate), evaluate (critique, justify), create (design, produce).",
          "\"Understand the sales process\" is not measurable — nothing observable proves it happened. \"Given a customer scenario, select the correct next step in the sales process\" is measurable: it names a verb, a condition, and an observable action.",
        ],
        recall: { t: "sc", c: "blooms", q: "Which of these is a measurable learning objective?", opts: ["Learners will understand accessibility", "Learners will appreciate the importance of accessibility", "Given a sample screen, learners will identify three WCAG violations", "The course will cover accessibility basics"], a: 2, e: "Only the third option names an observable action (identify) tied to a specific condition (given a sample screen) — that's what makes it measurable." },
      },
      {
        id: "3-03", title: "Backward Design: Aligning Objectives, Assessment & Content", objective: "Apply backward design to align objectives, assessment, and content.",
        concepts: ["backward design", "alignment"], m: 5,
        content: [
          "Backward design reverses the intuitive order: start from the objective, design the assessment that would prove the objective was met, and only then build the instruction that prepares learners to succeed at that assessment. Building content first and bolting on a quiz afterward is how misalignment happens.",
          "The alignment chain is Objective → Evidence/Assessment → Instruction/Interaction. If a quiz question tests something the objective never promised, or the objective promises something the content never taught, the chain is broken — and it's broken regardless of how polished the content looks.",
        ],
        recall: { t: "tf", c: "backward-design", q: "In backward design, the assessment should be designed before the instructional content.", a: true, e: "Backward design deliberately designs the assessment right after the objective, then builds content to prepare learners for that assessment — reversing the intuitive content-first order." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "id-models", q: "What does the 'E' in ADDIE stand for?", opts: ["Execute", "Evaluate", "Engage", "Estimate"], a: 1, e: "ADDIE = Analyze, Design, Develop, Implement, Evaluate." },
        { t: "sc", c: "blooms", q: "\"Learners will be able to critique a sample storyboard against the multimedia principles taught in this module\" targets which Bloom's level?", opts: ["Remember", "Apply", "Evaluate", "Create"], a: 2, e: "Critique is an evaluate-level verb: judging quality against criteria." },
        { t: "mc", c: "backward-design", q: "A team builds an entire course, then writes a quiz afterward that happens to ask about a topic the content never actually covered. What went wrong?", opts: ["Nothing — quizzes are always written last", "The alignment chain broke: assessment should trace back to the same objective the content was built for", "The course is too short", "ADDIE was not used"], a: 1, e: "This is a textbook alignment failure — exactly what backward design (objective → assessment → content) is designed to prevent." },
        { t: "sa", c: "id-models", q: "In one sentence, what is the main risk of treating ADDIE as a strict one-pass waterfall instead of an iterative cycle?", a: { groups: [["iterat", "revis", "feedback", "cycle"], ["lock", "rigid", "assum", "first draft"]], need: 1, model: "Locking in first-draft assumptions without revising based on real feedback." }, e: "A strict waterfall skips the revise-based-on-feedback step that keeps first-draft assumptions from becoming the final design." },
        { t: "mc", c: "blooms", q: "Which verb best fits the 'apply' level of Bloom's taxonomy?", opts: ["Define", "Summarize", "Demonstrate", "Design"], a: 2, e: "Demonstrate/use are classic apply-level verbs — using knowledge in a new but structured situation." },
      ],
    },
  },
  {
    id: 4, phase: "p1", title: "Assessment & Feedback",
    purpose: "Design assessment that validly measures Module 3's objectives and gives learners useful feedback.",
    competencies: ["Diagnostic/formative/summative assessment", "Retrieval/knowledge checks", "Scenario-based & authentic assessment", "Feedback", "Distractor quality", "Assessment validity"],
    prereq: [3], practical: "PRACTICAL",
    micros: [
      {
        id: "4-01", title: "Types of Assessment", objective: "Distinguish assessment types and select an appropriate one for a given objective.",
        concepts: ["diagnostic/formative/summative", "knowledge vs. performance assessment"], m: 5,
        content: [
          "Diagnostic assessment happens before instruction, to find out what learners already know. Formative assessment happens during learning — low-stakes checks (like this course's recall questions) that support retrieval practice, not judgment. Summative assessment happens after, to certify that a standard was met (like a module post-test).",
          "A related distinction: a knowledge check ('what is the correct term?') and a performance/scenario assessment ('given this situation, what would you do?') test different things. Recall ≠ application ≠ transfer — a learner can recall a fact perfectly and still fail to apply it under real conditions.",
        ],
        recall: { t: "mc", c: "assessment-types", q: "What is the main purpose of a formative, low-stakes recall question during a lesson?", opts: ["To certify mastery for a certificate", "To support retrieval practice and give the learner quick feedback, not to judge them", "To rank learners against each other", "To replace the need for a post-test"], a: 1, e: "Formative checks like recall questions exist to reinforce memory through retrieval, not to serve as a high-stakes judgment — that's the post-test's role." },
      },
      {
        id: "4-02", title: "Designing Authentic Assessment", objective: "Design an authentic assessment task for a real-world objective.",
        concepts: ["authentic assessment"], m: 5,
        content: [
          "An authentic assessment mirrors a real task the learner will actually face, rather than testing an abstracted, easier-to-grade proxy for it. Instead of 'define active listening,' an authentic version might present a difficult customer scenario and ask what the learner would say next.",
          "Authenticity matters most when the objective is about judgment or application, not simple recall — the closer the assessment resembles the real situation, the more confidently a pass predicts real-world performance.",
        ],
        recall: { t: "mc", c: "authentic-assessment", q: "Which assessment item is most authentic for the objective \"apply de-escalation techniques with an angry customer\"?", opts: ["Define de-escalation in one sentence", "List three de-escalation techniques from memory", "Given a transcript of an angry customer, select the best next response", "Match de-escalation terms to their definitions"], a: 2, e: "The scenario-based item most closely mirrors the real task the objective describes — that's what makes it authentic rather than a recall proxy." },
      },
      {
        id: "4-03", title: "Writing Quality Assessment Items", objective: "Write assessment items that avoid bias and construct-irrelevant difficulty.",
        concepts: ["item-writing", "distractor quality", "item bias"], m: 6,
        content: [
          "A good multiple-choice item has one clearly correct answer and distractors (wrong options) that are each plausible — a distractor nobody would ever pick tests nothing. A poor item can also be construct-irrelevantly hard: confusing wording, trick phrasing, or requiring outside knowledge the objective never promised to teach.",
          "Bias shows up when an item unintentionally advantages one group over another for reasons unrelated to the objective — for example, a scenario that assumes cultural knowledge the content never covered. Reviewing items for this is a normal, expected part of quality item-writing.",
        ],
        recall: { t: "mc", c: "item-writing", q: "What makes a multiple-choice distractor (wrong answer option) 'good'?", opts: ["It is obviously silly so nobody picks it", "It is plausible enough that a learner with a real misunderstanding might choose it", "It is exactly the same length as the correct answer", "It uses more complex vocabulary than the correct answer"], a: 1, e: "A plausible distractor actually tests whether the learner holds the specific misunderstanding it represents — an obviously wrong option tests nothing." },
      },
      {
        id: "4-04", title: "Giving Effective Feedback", objective: "Give feedback that improves future performance, not just marks correctness.",
        concepts: ["feedback design"], m: 4,
        content: [
          "Feedback that only says 'correct' or 'incorrect' wastes an opportunity. Effective feedback briefly explains WHY an answer is right or wrong, tied to the underlying concept — which is exactly the pattern this course's own recall questions use.",
          "For formative checks, feedback should be immediate and low-stakes. For summative assessment, feedback can be more detailed but should still explain reasoning, not just deliver a score — a bare percentage tells a learner nothing about what to do differently.",
        ],
        recall: { t: "mc", c: "feedback", q: "Which is the strongest feedback for a wrong answer on a recall question?", opts: ["\"Incorrect.\"", "\"Incorrect — try again.\"", "\"Incorrect. The right answer is X, because...\" with a brief reason", "No feedback, to avoid discouraging the learner"], a: 2, e: "Feedback that shows the correct answer and briefly explains why is what actually helps correct the underlying misunderstanding." },
      },
    ],
    postTest: {
      draw: 5,
      pool: [
        { t: "mc", c: "assessment-types", q: "Which best distinguishes recall, application, and transfer?", opts: ["They are three names for the same thing", "Recall is remembering a fact; application is using it in a structured task; transfer is using it in a new, real context", "Recall only applies to multiple-choice items", "Transfer means passing the post-test"], a: 1, e: "These are progressively deeper: knowing a fact, using it on cue, and using it unprompted in a genuinely new situation." },
        { t: "sc", c: "authentic-assessment", q: "A course objective is \"give constructive feedback to a peer.\" Which item is most authentic?", opts: ["Define constructive feedback", "Given a peer's weak first draft, write the feedback you would actually give them", "List three qualities of good feedback", "True/false: feedback should be specific"], a: 1, e: "Only this item requires performing the actual real-world task, not just describing it." },
        { t: "mc", c: "item-writing", q: "A quiz item can only be answered correctly by someone who has read an unrelated article never mentioned in the course. What is the problem?", opts: ["The item is testing construct-irrelevant knowledge outside what the objective promised", "The item is too easy", "The item has too many distractors", "This is not a problem — extra challenge is good"], a: 0, e: "An item should only test what the objective and content actually taught — requiring outside knowledge is construct-irrelevant difficulty." },
        { t: "tf", c: "feedback", q: "A percentage score alone, with no explanation, is sufficient feedback for a summative assessment.", a: false, e: "A bare score doesn't tell the learner what to do differently — effective feedback explains the reasoning behind right and wrong answers." },
        { t: "mc", c: "assessment-types", q: "This course's per-microlearning recall question is best described as which type of assessment?", opts: ["Summative, high-stakes", "Formative, low-stakes retrieval practice", "Diagnostic, pre-instruction", "Authentic, real-world simulation"], a: 1, e: "It's explicitly non-gated, immediate-feedback retrieval practice during learning — the definition of formative assessment." },
        { t: "sa", c: "item-writing", q: "In one sentence, why should distractors in a multiple-choice item be plausible rather than obviously wrong?", a: { groups: [["misconcept", "wrong belief", "confus"], ["test", "reveal", "diagnos"], ["plausib", "believ"]], need: 1, model: "Plausible distractors actually test whether a learner holds a specific misconception; obviously wrong ones test nothing." }, e: "A plausible wrong answer diagnoses a real misunderstanding — an obviously silly one gives no information." },
      ],
    },
  },
  {
    id: 5, phase: "p1", title: "Learning Experience, UX & Performance Support",
    purpose: "Apply UX/IA thinking to the learning experience and design support that works outside formal courses.",
    competencies: ["LXD/UX principles", "Information architecture", "Navigation & interaction design", "Friction reduction", "Performance support", "Job aids"],
    prereq: [1, 3], practical: "PRACTICAL",
    micros: [
      {
        id: "5-01", title: "UX Principles for Learning Experiences", objective: "Apply UX principles to a learning experience's structure and flow.",
        concepts: ["LXD/UX principles", "friction", "engagement"], m: 5,
        content: [
          "Learning experience design treats the course itself as a product a learner has to use, not just content they read. Every extra click, confusing label, or unclear next-step is friction — and friction competes with the learning objective for the learner's limited attention and patience.",
          "Good LXD makes the path obvious: what to do next is never in doubt, progress is visible, and the interface gets out of the way of the content rather than adding its own cognitive load on top of it.",
        ],
        recall: { t: "mc", c: "lxd-ux", q: "Why does 'friction' in a course interface matter for learning, not just usability?", opts: ["It doesn't — usability and learning are unrelated", "Friction consumes attention and working-memory capacity that could otherwise go toward the content", "Friction only matters on mobile devices", "Friction is the same thing as intrinsic cognitive load"], a: 1, e: "Confusing navigation or unclear next steps consume the same limited attention/working-memory budget the content needs — friction is extraneous load in disguise." },
      },
      {
        id: "5-02", title: "Information Architecture for Courses", objective: "Design the information architecture of a course.",
        concepts: ["information architecture", "navigation"], m: 5,
        content: [
          "Information architecture is how content is organized, labeled, and connected so a learner can find what they need and understand where they are. A flat list of forty identically-named lessons is a navigation problem regardless of how good each lesson is.",
          "Good course IA groups related content, uses clear and distinct labels, and makes progress and location visible — a learner should always be able to answer 'where am I, and what's next' without guessing.",
        ],
        recall: { t: "mc", c: "information-architecture", q: "What does good course information architecture primarily give the learner?", opts: ["Better graphics", "A clear sense of where they are, what's next, and how content relates", "A shorter total course", "Fewer assessment items"], a: 1, e: "IA is about findability and orientation — clear structure, labels, and progress visibility, not visual polish or content length." },
      },
      {
        id: "5-03", title: "Performance Support: Job Aids", objective: "Design a performance-support job aid for in-the-moment use.",
        concepts: ["performance support", "job aids"], m: 5,
        content: [
          "Not every performance need should become a course. A job aid — a checklist, quick-reference card, or decision tree — supports someone in the moment they need it, without requiring them to have memorized anything in advance.",
          "Job aids fit tasks that are complex, infrequent, or high-stakes-if-forgotten (like a pre-flight checklist), where recall from memory is unreliable but access to a reference at the point of need is fast. Courses build durable understanding; job aids support performance of a specific task right now.",
        ],
        recall: { t: "sc", c: "performance-support", q: "A task is performed once every few months, has many steps, and an error is costly. What is usually the better solution — a full course, or a job aid?", opts: ["A full course, since accuracy matters", "A job aid, since infrequent complex tasks are exactly where in-the-moment reference beats relying on memory", "Neither — the task should be automated instead", "It doesn't matter which is chosen"], a: 1, e: "Infrequent, complex, high-stakes tasks are the classic case for a job aid: memory is unreliable at that frequency, but a good reference used at the point of need is fast and accurate." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "lxd-ux", q: "A course requires five clicks and two logins to reach the actual lesson content. What is this an example of?", opts: ["Good information architecture", "Friction that adds extraneous load before learning even starts", "Intrinsic cognitive load", "A necessary security feature that should never be simplified"], a: 1, e: "Unnecessary steps before content is reached are pure friction — extraneous load with no learning benefit." },
        { t: "tf", c: "information-architecture", q: "A learner should always be able to tell where they are in a course and what to do next without guessing.", a: true, e: "That orientation is a core goal of course information architecture." },
        { t: "sc", c: "performance-support", q: "Which task is the best candidate for a job aid rather than a full course?", opts: ["Building foundational conceptual understanding of a new discipline", "A rarely-performed, multi-step technical procedure where an error is costly", "Learning a company's core values", "Building long-term fluency in a new language"], a: 1, e: "Rare, complex, high-stakes-error tasks are exactly where a point-of-need reference beats reliance on memory built through a course." },
        { t: "mc", c: "lxd-ux", q: "What is the relationship between LXD friction and cognitive load theory (Module 1)?", opts: ["They are unrelated fields", "Interface friction functions as a form of extraneous load, competing with the content for attention", "Friction only affects motivation, never cognition", "Friction is a synonym for germane load"], a: 1, e: "Friction is effectively extraneous load delivered through the interface rather than the content — the same capacity-competition problem from Module 1." },
      ],
    },
  },
  {
    id: 6, phase: "p1", title: "Multimedia & E-Learning Design",
    purpose: "Turn an aligned design into a storyboard, script, and prototype ready for production.",
    competencies: ["Storyboarding", "Scriptwriting", "Multimedia design principles", "Visual hierarchy", "Wireframing/prototyping"],
    prereq: [3, 5], practical: "PRACTICAL",
    micros: [
      {
        id: "6-01", title: "Storyboarding for E-Learning", objective: "Produce a storyboard that translates learning objectives into screen-level content.",
        concepts: ["storyboarding"], m: 6,
        content: [
          "A storyboard maps each screen or scene: what's on screen, what narration/text says, what interaction (if any) the learner performs, and which objective this screen serves. It is the point where an aligned outline becomes concrete enough for a reviewer — or an AI drafting tool in Phase 4 — to critique before expensive production begins.",
          "A storyboard that cannot name which objective a screen serves is a sign the screen may not need to exist. This traceability back to Module 3's alignment chain is the storyboard's real job, not just describing visuals.",
        ],
        recall: { t: "mc", c: "storyboarding", q: "Besides visuals and narration text, what must a good storyboard capture for each screen?", opts: ["The exact font size", "Which learning objective that screen serves", "The name of the voice actor", "The file format of the final video"], a: 1, e: "Traceability to an objective is what makes a storyboard a design tool rather than just a visual sketch — it's the same alignment discipline from Module 3." },
      },
      {
        id: "6-02", title: "Scriptwriting for Narration & Video", objective: "Write a script for narration or video that matches the storyboard.",
        concepts: ["scriptwriting"], m: 5,
        content: [
          "Scripts for narration are written for the ear, not the eye: shorter sentences, conversational phrasing, and one idea per sentence read far better aloud than dense written prose does. A sentence that reads fine silently can be exhausting to listen to.",
          "A script should match pacing to the visual: narration should not race ahead of or lag behind what's on screen, and pauses should exist where a learner needs a moment to look before the next point begins.",
        ],
        recall: { t: "mc", c: "scriptwriting", q: "Why do scripts written for narration need shorter sentences than a script written for silent reading?", opts: ["Shorter sentences are always better writing", "Listening comprehension in real time cannot re-read a dense sentence the way silent reading can", "Voice actors charge by the sentence", "It reduces file size"], a: 1, e: "A listener can't glance back at a dense sentence the way a reader can — narration needs to be parseable in a single pass through the ear." },
      },
      {
        id: "6-03", title: "Multimedia Design Principles in Practice", objective: "Apply multimedia design principles to visuals, audio, and video choices.",
        concepts: ["visual hierarchy", "modality", "coherence in production"], m: 6,
        content: [
          "Visual hierarchy directs the eye to what matters most first, using size, contrast, and position — a screen where every element competes for attention equally helps the learner find nothing. The modality principle (from Module 1) favors spoken narration alongside visuals over on-screen text alongside the same visuals, when the goal is to use both the visual and auditory channels rather than overloading one.",
          "These are the same evidence-informed principles from Module 1, now applied at production time: exclude decorative elements that don't serve the objective (coherence), and use signaling (highlighting, arrows) to direct attention at the screen's most important element.",
        ],
        recall: { t: "sc", c: "multimedia-principles", q: "A slide shows a complex diagram with narration explaining it, and no on-screen text duplicating the narration. What principle does this follow?", opts: ["Redundancy", "Modality — using both the visual and auditory channels rather than overloading one with duplicated text", "Signaling", "Segmenting"], a: 1, e: "Splitting explanation (audio) from visual (diagram) rather than duplicating text on top of the diagram is the modality principle in action." },
      },
      {
        id: "6-04", title: "Wireframing & Iterative Prototyping", objective: "Produce a wireframe/prototype and iterate on it.",
        concepts: ["wireframing", "iterative prototyping"], m: 5,
        content: [
          "A wireframe is a low-fidelity sketch of layout and flow, deliberately stripped of visual polish so reviewers focus on structure and usability rather than color choices. It is far cheaper to change a box on a wireframe than to re-edit a finished video.",
          "Prototypes should be tested with real or representative users before full production, and revised based on what actually confuses them — not based on the designer's own assumption of what will be clear.",
        ],
        recall: { t: "tf", c: "prototyping", q: "A wireframe is deliberately low-fidelity so that reviewers focus on structure and flow rather than visual polish.", a: true, e: "Low fidelity is intentional — it keeps early feedback focused on structure, which is far cheaper to change than finished visuals." },
      },
    ],
    postTest: {
      draw: 5,
      pool: [
        { t: "mc", c: "storyboarding", q: "A storyboard screen exists but the designer cannot say which objective it supports. What should happen?", opts: ["Keep it — more content is always better", "Question whether the screen is needed at all, per the alignment chain from Module 3", "Add narration to make it feel more complete", "Move it to the post-test instead"], a: 1, e: "A screen with no traceable objective is a signal it may not belong — the same alignment discipline as Module 3." },
        { t: "sc", c: "scriptwriting", q: "Which sentence is better suited to narration than dense written prose?", opts: ["A single 40-word sentence with three embedded clauses", "Several short, conversational sentences, one idea each", "A sentence written exactly as it would appear in a legal document", "A sentence with no punctuation for smoother flow"], a: 1, e: "Short, single-idea sentences are far easier to follow by ear than dense multi-clause prose." },
        { t: "mc", c: "multimedia-principles", q: "Which combination best reflects the modality principle?", opts: ["On-screen text duplicating the narration word-for-word", "Spoken narration explaining a visual, without duplicating text on screen", "Silent video with no narration or text", "Text-only slides with no visuals"], a: 1, e: "Modality favors splitting explanation across the visual and auditory channels rather than loading text and audio with the same content." },
        { t: "tf", c: "prototyping", q: "Prototypes should be revised based on the designer's best guess about what will confuse users, without testing.", a: false, e: "Prototypes should be tested with real or representative users and revised based on what actually confuses them, not assumption alone." },
        { t: "mc", c: "storyboarding", q: "What makes a storyboard more useful than a finished script alone at the review stage?", opts: ["It's shorter to read", "It shows visuals, narration, interaction, and objective together, making misalignment visible before production", "It requires no writing skill", "It replaces the need for a script entirely"], a: 1, e: "Seeing all four elements together — visual, narration, interaction, objective — is what surfaces misalignment cheaply, before expensive production." },
      ],
    },
  },
  {
    id: 7, phase: "p1", title: "Accessibility & UDL",
    purpose: "Make learning design and multimedia usable by the widest range of learners, by design, not afterthought.",
    competencies: ["WCAG/POUR", "Captions/transcripts/alt text", "Keyboard accessibility", "Contrast", "UDL", "Learner variability"],
    prereq: [5, 6], practical: "PRACTICAL",
    micros: [
      {
        id: "7-01", title: "Why Accessibility Matters & WCAG Basics", objective: "Explain why accessibility matters and summarize core WCAG principles.",
        concepts: ["WCAG", "POUR"], m: 5,
        content: [
          "WCAG (Web Content Accessibility Guidelines) is a technical accessibility standard organized around four principles, POUR: content must be Perceivable (available to the senses, e.g. captions for audio), Operable (usable via keyboard, not just mouse), Understandable (clear language and predictable behavior), and Robust (works with assistive technology).",
          "Accessibility is not a niche concern — captions help a noisy commute as much as a deaf learner, and clear structure helps everyone navigate faster. Treating it as a late compliance checklist rather than a design input from the start is the most common and costly mistake.",
        ],
        recall: { t: "mc", c: "wcag", q: "What does the 'O' in POUR stand for?", opts: ["Optional", "Operable — usable via keyboard and other input methods, not just a mouse", "Original", "Ordered"], a: 1, e: "Operable means every interaction must be usable without a mouse, among other things — a core WCAG principle." },
      },
      {
        id: "7-02", title: "Universal Design for Learning (UDL)", objective: "Apply UDL principles to a learning design.",
        concepts: ["UDL", "learner variability"], m: 5,
        content: [
          "UDL is an instructional design framework, distinct from WCAG's technical standard: it addresses variability in how learners perceive, engage with, and express understanding of the same content — offering multiple means of representation, engagement, and action/expression rather than one fixed path for everyone.",
          "WCAG asks 'can assistive technology access this content correctly?' UDL asks 'does this design work for learners who differ in how they process, stay motivated, and demonstrate what they know?' Both matter, and they are not the same question.",
        ],
        recall: { t: "sc", c: "udl", q: "How does UDL differ from WCAG?", opts: ["They are the same thing under different names", "WCAG is a technical accessibility standard; UDL is an instructional design framework addressing learner variability", "UDL only applies to video content", "WCAG only applies to instructional design, not technical content"], a: 1, e: "WCAG is a technical standard for content/interface accessibility; UDL is a design framework for accommodating how differently learners process and engage with material." },
      },
      {
        id: "7-03", title: "Designing Accessible E-Learning Content", objective: "Design accessible e-learning content using established patterns.",
        concepts: ["accessible design patterns"], m: 6,
        content: [
          "Practical patterns carry most of the weight: sufficient color contrast, meaningful alt text on images (describing purpose, not just appearance), captions for video and transcripts for audio, full keyboard operability, and a logical reading/tab order that matches the visual layout.",
          "A common failure: an interaction that only works by dragging with a mouse, with no keyboard-operable alternative. This silently excludes keyboard and switch-device users — it is exactly the kind of gap a design-time accessibility review is meant to catch before launch.",
        ],
        recall: { t: "mc", c: "accessible-design", q: "A drag-and-drop interaction has no keyboard-operable alternative. What accessibility principle does this violate?", opts: ["Perceivable", "Operable", "Understandable", "Robust"], a: 1, e: "An interaction that requires a mouse with no keyboard path fails the Operable principle of WCAG." },
      },
      {
        id: "7-04", title: "Accessibility QA Checklist & Testing", objective: "Run an accessibility QA pass against a checklist.",
        concepts: ["accessibility QA"], m: 5,
        content: [
          "Accessibility QA is part of ordinary quality assurance, not a separate final-stage compliance gate. A practical pass checks: can every interaction be completed by keyboard alone, does every image have appropriate alt text, is contrast sufficient, do videos have captions, and does content make sense when read by a screen reader in order.",
          "Catching accessibility gaps during design and storyboard review (Module 6) is far cheaper than catching them after full production — the same logic as catching a misaligned objective early rather than after content is built.",
        ],
        recall: { t: "tf", c: "accessibility-qa", q: "Accessibility should be checked only at the very end of production, as a final compliance gate.", a: false, e: "Accessibility is meant to be part of design and QA throughout — checking it only at the end is expensive and treats it as cosmetic rather than design." },
      },
    ],
    postTest: {
      draw: 5,
      pool: [
        { t: "mc", c: "wcag", q: "Which WCAG principle does a video with no captions fail?", opts: ["Operable", "Perceivable", "Robust", "Understandable"], a: 1, e: "Content that isn't available to the senses of a deaf or hard-of-hearing learner fails Perceivable." },
        { t: "sc", c: "udl", q: "A course offers the same fixed video-only format to every learner regardless of how they best process information. What does UDL suggest?", opts: ["This is fine as long as it's WCAG-compliant", "Offer multiple means of representation so learners who process information differently are still supported", "Add more video content", "UDL doesn't apply to video-only courses"], a: 1, e: "UDL's core premise is accommodating variability — offering more than one way to access and engage with the same content." },
        { t: "mc", c: "accessible-design", q: "What does meaningful alt text describe?", opts: ["The file name of the image", "The purpose/meaning of the image in context, not just its literal appearance", "The image's dimensions in pixels", "Nothing — alt text is optional if the image is decorative and non-essential"], a: 1, e: "Good alt text conveys what the image communicates in context, which is often different from a literal visual description." },
        { t: "tf", c: "accessibility-qa", q: "Catching an accessibility problem during storyboard review is generally cheaper than catching it after full video production.", a: true, e: "The earlier a design gap is caught, the less expensive it is to fix — the same principle that applies to alignment errors caught early versus late." },
        { t: "mc", c: "wcag", q: "What does WCAG's 'Understandable' principle mainly concern?", opts: ["Color contrast ratios", "Clear language and predictable interface behavior", "Video file compression", "Server response time"], a: 1, e: "Understandable is about clarity and predictability of language and behavior — not a technical/visual concern like contrast." },
        { t: "sc", c: "udl", q: "Which question is a UDL question rather than a WCAG question?", opts: ["Can a screen reader parse this page correctly?", "Does this interaction have sufficient color contrast?", "Does this design offer more than one way for learners to demonstrate what they've learned?", "Is every image tagged with alt text?"], a: 2, e: "Offering multiple means of expression/assessment is a UDL design question; the others are technical WCAG accessibility checks." },
      ],
    },
  },
  {
    id: 8, phase: "p1", title: "Evaluation, Kirkpatrick & Learning Transfer",
    purpose: "Evaluate whether learning solutions change behavior/performance, not just completion.",
    competencies: ["Kirkpatrick's 4 levels", "LTEM (complementary lens)", "Learning transfer", "Completion vs. learning", "Learning analytics caution"],
    prereq: [2, 4], practical: "CONCEPTUAL",
    micros: [
      {
        id: "8-01", title: "Kirkpatrick's Four Levels of Evaluation", objective: "Explain Kirkpatrick's four levels of evaluation.",
        concepts: ["Reaction", "learning", "behavior", "results", "LTEM"], m: 5,
        content: [
          "Kirkpatrick's model evaluates training at four levels: Reaction (did learners like it), Learning (did knowledge/skill increase), Behavior (did on-the-job behavior actually change), Results (did it affect a business/organizational outcome). Most organizations measure heavily at Level 1 and rarely reach Level 3 or 4, which is where the real evidence of impact lives.",
          "LTEM (the Learning-Transfer Evaluation Model) is a complementary, more granular lens developed after Kirkpatrick — it is not a replacement, and Kirkpatrick is not obsolete. LTEM helps distinguish finer categories of evidence (such as knowledge, decision-making, and task competence) that a four-level model can compress together.",
        ],
        recall: { t: "mc", c: "kirkpatrick", q: "A post-course survey asks 'did you enjoy this training?' Which Kirkpatrick level does this measure?", opts: ["Level 1 — Reaction", "Level 2 — Learning", "Level 3 — Behavior", "Level 4 — Results"], a: 0, e: "Satisfaction/enjoyment ratings are the classic Level 1, Reaction — the shallowest and most commonly collected evidence." },
      },
      {
        id: "8-02", title: "Learning Transfer: From Course to Job", objective: "Evaluate whether a learning solution is likely to transfer to job performance.",
        concepts: ["learning transfer"], m: 5,
        content: [
          "Learning transfer is whether what was learned actually gets used back on the job, under real conditions, without a facilitator prompting it. Passing a course post-test is evidence of learning (Kirkpatrick Level 2); it is not evidence of transfer (Level 3).",
          "Transfer is more likely when practice conditions resemble real conditions (authentic assessment, Module 4), when there's opportunity and support to apply the skill soon after training, and when the workplace environment doesn't actively work against the new behavior.",
        ],
        recall: { t: "mc", c: "learning-transfer", q: "A learner scores 95% on a post-test but never applies the skill differently at work afterward. What does this indicate?", opts: ["Learning transfer clearly occurred", "Learning (Level 2) may have occurred, but transfer to behavior (Level 3) did not — these are different things", "The post-test was invalid", "The course objectives were wrong"], a: 1, e: "A high post-test score is evidence of learning, not proof of transfer — behavior change on the job is a separate, later question." },
      },
      {
        id: "8-03", title: "Completion vs. Learning: Reading Analytics Correctly", objective: "Distinguish completion/activity data from evidence of learning or performance change.",
        concepts: ["completion vs. learning", "learning analytics caution"], m: 5,
        content: [
          "An LMS can report that a learner completed a module, spent 12 minutes on it, and clicked every page. None of that is evidence that learning occurred — it's activity data. It's tempting to treat a 100% completion rate as proof a program worked, but completion measures engagement with the delivery mechanism, not the outcome.",
          "Reading analytics correctly means asking which Kirkpatrick/LTEM level the data actually speaks to: completion and time-on-page sit below even Level 1 in evidentiary strength. Real evidence of learning requires an assessment; evidence of transfer requires observing behavior after the fact.",
        ],
        recall: { t: "tf", c: "completion-vs-learning", q: "A 100% course completion rate is, by itself, evidence that learning occurred.", a: false, e: "Completion is activity data — finishing the material. It says nothing about whether knowledge, skill, or behavior actually changed." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "kirkpatrick", q: "Which Kirkpatrick level corresponds to a measured change in a business outcome, such as reduced customer complaints?", opts: ["Level 1", "Level 2", "Level 3", "Level 4"], a: 3, e: "Level 4, Results, is organizational/business-level impact — the hardest evidence to obtain and the rarest measured." },
        { t: "tf", c: "kirkpatrick", q: "LTEM is presented in this course as a replacement for Kirkpatrick, since Kirkpatrick is considered obsolete.", a: false, e: "LTEM is explicitly a complementary, more granular lens — Kirkpatrick is not treated as obsolete." },
        { t: "sc", c: "learning-transfer", q: "Which factor most increases the likelihood that training transfers to real job behavior?", opts: ["A longer course", "Practice conditions that resemble real job conditions, plus early opportunity to apply the skill", "A higher post-test pass threshold", "More slides per module"], a: 1, e: "Authentic practice conditions and prompt real-world application opportunity are the strongest known transfer levers." },
        { t: "mc", c: "completion-vs-learning", q: "Why is time-on-page a weak signal of learning by itself?", opts: ["It cannot be measured accurately", "It reflects engagement with the delivery mechanism, not whether knowledge or behavior actually changed", "It only applies to video content", "LMS platforms don't track it"], a: 1, e: "Time-on-page is activity data, several evidentiary steps below actual assessed learning or observed behavior change." },
      ],
    },
  },
  {
    id: 9, phase: "p2", title: "LMS Fundamentals",
    purpose: "Understand how an LMS structures, delivers, tracks, and reports learning, as the foundation for Moodle.",
    competencies: ["LMS role", "Course structure/resources/activities", "Access & completion", "Grades & tracking", "Reporting"],
    prereq: [], practical: "CONCEPTUAL+WORKFLOW",
    micros: [
      {
        id: "9-01", title: "What an LMS Does", objective: "Explain what an LMS is and the core components it manages.",
        concepts: ["LMS role", "system of record"], m: 5,
        content: [
          "A Learning Management System is a system of record for learning: it hosts course content, controls who can access it, and records enrolments, completions, scores, and dates. That authority — being the trusted record — is the reason it exists, and also the reason its data is narrower than it might seem.",
          "An LMS is not automatically the right tool for every learning problem (Module 5's job-aid distinction still applies) — it is specifically the tool for structured, trackable courses with a defined audience and a completion record.",
        ],
        recall: { t: "mc", c: "lms-basics", q: "What is the core function an LMS serves?", opts: ["Generating course content automatically", "Acting as the system of record for course access, completion, and scores", "Replacing the need for instructional design", "Hosting video files only"], a: 1, e: "An LMS's defining role is authoritative record-keeping — access control plus tracked completion/scores/dates." },
      },
      {
        id: "9-02", title: "Course Structure: Resources & Activities", objective: "Explain how course structure, resources, and activities relate in an LMS.",
        concepts: ["course structure", "resources", "activities"], m: 5,
        content: [
          "A course in an LMS is organized into sections containing resources (static content the learner views — a page, a file, a video) and activities (things the learner does that produce a trackable result — a quiz, an assignment, a forum post). The distinction matters because only activities typically generate the completion/score data the LMS can report on.",
          "Good structure groups resources and activities around a coherent unit of learning, mirroring the course's information architecture (Module 5) rather than dumping everything into one long list.",
        ],
        recall: { t: "tf", c: "lms-structure", q: "In an LMS, a static PDF file and an interactive quiz are both examples of 'activities'.", a: false, e: "The PDF is a resource (viewed, not tracked for a result); the quiz is an activity (produces a trackable outcome). The distinction is whether it generates trackable data." },
      },
      {
        id: "9-03", title: "Completion, Tracking & Grades", objective: "Explain how completion, tracking, and grades work in an LMS.",
        concepts: ["completion", "tracking", "grades"], m: 5,
        content: [
          "Completion tracking marks whether a learner finished a resource or activity, based on rules the course designer sets (viewed the page, scored above X%, submitted an assignment). Grades are a separate concept — a score on a specific gradable activity, which may or may not be what determines completion.",
          "It's a common design mistake to conflate the two: a learner can complete a module (met the viewing/participation rule) without necessarily passing a graded assessment, unless completion is explicitly configured to require the passing grade.",
        ],
        recall: { t: "mc", c: "lms-tracking", q: "What is the difference between 'completion' and a 'grade' in an LMS?", opts: ["They are the same thing", "Completion tracks whether a rule was met (e.g. viewed, submitted); a grade is a score on a specific activity, and the two must be explicitly linked if one should require the other", "Grades only exist for video content", "Completion always requires a passing grade automatically"], a: 1, e: "Completion and grading are separate mechanisms — a course must deliberately configure completion to require a passing grade if that's the intent." },
      },
      {
        id: "9-04", title: "LMS Reporting: What It Can and Can't Tell You", objective: "Evaluate what LMS reporting can and cannot tell you about learning.",
        concepts: ["reporting", "data limitations"], m: 5,
        content: [
          "An LMS report can tell you who enrolled, who completed, and what score they got. It structurally cannot tell you what a learner actually understood, where they hesitated, or whether the skill transferred to their job — that gap is exactly Module 8's completion-vs-learning distinction, now applied to the tool that produces the numbers.",
          "A common failure mode: wanting an ambitious analytics or AI feature, but discovering the LMS never recorded the granular event data needed to power it. Instrumentation — deciding what to record — has to happen before any model or dashboard can use it.",
        ],
        recall: { t: "sc", c: "lms-reporting", q: "Which of these can a typical LMS completion report NOT tell you?", opts: ["Whether a learner enrolled", "Whether a learner's post-test score met the pass mark", "Whether the learner's on-the-job behavior actually changed afterward", "The date a learner completed a module"], a: 2, e: "Behavior change is Kirkpatrick Level 3 — an LMS's completion/score data structurally cannot capture what happens back on the job." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "lms-basics", q: "Why is an LMS's authority as a 'system of record' also a limitation?", opts: ["It isn't a limitation", "Its data is only as rich as what was deliberately recorded — narrow by design", "It means the LMS is always the wrong tool", "It means LMS data cannot be trusted at all"], a: 1, e: "Being authoritative for a narrow set of tracked events is precisely why LMS data can't answer questions it was never designed to record." },
        { t: "sc", c: "lms-structure", q: "A course lists twelve items with no grouping, mixing PDFs, videos, and quizzes in one flat list. What is the likely problem?", opts: ["Nothing — flat lists are best practice", "Poor course structure/information architecture, per Module 5", "The LMS is broken", "Quizzes cannot be mixed with resources"], a: 1, e: "This is an IA problem, not a technical one — the same navigation/orientation issue from Module 5 applied inside the LMS." },
        { t: "mc", c: "lms-tracking", q: "A module is set to 'complete on view' rather than 'complete on passing grade'. What does this mean for a learner who viewed the content but failed the quiz?", opts: ["They cannot be marked complete under any configuration", "Under this configuration, they would be marked complete despite failing the quiz", "The LMS will automatically switch the rule", "Grades are irrelevant to completion configuration"], a: 1, e: "Completion rules are configured deliberately — 'complete on view' will mark completion regardless of quiz outcome unless the rule is changed to require the passing grade." },
        { t: "tf", c: "lms-reporting", q: "A 100% LMS completion rate for a course is sufficient evidence that the training achieved its business goal.", a: false, e: "Completion is activity data (Module 8) — it says nothing about learning, behavior change, or business results." },
      ],
    },
  },
  {
    id: 10, phase: "p2", title: "Moodle for Digital Learning",
    purpose: "Build and manage a basic Moodle course from a Course Creator/Teacher perspective.",
    competencies: ["Course structure", "Resources", "Activities", "Completion settings", "Quiz workflow", "Progress monitoring", "Basic QA/reporting"],
    prereq: [9], practical: "PRACTICAL",
    micros: [
      {
        id: "10-01", title: "Setting Up a Moodle Course Structure", objective: "Set up a basic Moodle course structure.",
        concepts: ["Moodle course structure"], m: 6,
        content: [
          "A Moodle course is organized into sections (by topic or by week), configured from the course's settings and edited with 'Turn editing on.' As Course Creator/Teacher, this is the level of access this course assumes — server/infrastructure administration is a different role and out of scope here.",
          "Plan section structure before building: it should mirror the course's information architecture (Module 5) — clear, distinct groupings the learner can navigate without guessing. Keep interface instructions general (menu names shift between Moodle versions) and focus on the underlying structure.",
        ],
        recall: { t: "mc", c: "moodle-structure", q: "From which perspective does this course teach Moodle?", opts: ["Server administrator", "Course Creator / Teacher", "Plugin developer", "Database administrator"], a: 1, e: "The scope is deliberately the practitioner role of building and running a course, not administering the Moodle server or writing plugins." },
      },
      {
        id: "10-02", title: "Adding Resources in Moodle", objective: "Add resources to a Moodle course.",
        concepts: ["Moodle resources"], m: 5,
        content: [
          "Moodle resource types include Page (text/media directly in Moodle), File (an uploaded document), URL (a link out), and Book (a multi-page structured resource). Choosing the right type is a design decision, not a default: a Page is easier to update and more accessible than a downloaded file for most text content.",
          "As in Module 9, resources are viewed, not scored — pick a resource type instead of an activity type when the goal is exposing content rather than producing a trackable result.",
        ],
        recall: { t: "sc", c: "moodle-resources", q: "You want learners to read a short article directly in the course, easy to keep updated. Which Moodle resource type generally fits best?", opts: ["A downloadable Word file", "A Page", "A Forum", "A Quiz"], a: 1, e: "A Page is edited directly in Moodle and stays easy to update — better suited than a static downloadable file for content you'll revise." },
      },
      {
        id: "10-03", title: "Adding Activities in Moodle", objective: "Add activities to a Moodle course.",
        concepts: ["Moodle activities"], m: 5,
        content: [
          "Common Moodle activities include Quiz (graded/ungraded assessment), Assignment (learner submits work for review), Forum (discussion), and H5P activity (interactive content, covered in Module 11). Each activity type generates a different kind of trackable data — a quiz produces a score, a forum produces participation counts.",
          "Choosing an activity should start from the learning objective (Module 3), not the other way around — pick the activity type that can actually produce evidence the objective was met.",
        ],
        recall: { t: "mc", c: "moodle-activities", q: "What should determine which Moodle activity type you choose for a given part of a course?", opts: ["Whichever activity is fastest to set up", "The learning objective — which activity can actually produce evidence it was met", "Always use a Quiz for consistency", "Whichever activity the previous course used"], a: 1, e: "Activity choice should follow from the objective and what evidence would demonstrate it — the same alignment logic as Module 3." },
      },
      {
        id: "10-04", title: "Configuring Completion Tracking", objective: "Configure basic completion tracking in Moodle.",
        concepts: ["completion settings"], m: 5,
        content: [
          "Moodle's activity completion settings let a course require a view, a submission, or a specific grade before an item counts as 'complete' — and course completion can in turn require specific activities to be complete. This is the concrete Moodle version of Module 9's completion-vs-grade distinction.",
          "A frequent misconfiguration: leaving completion set to 'view only' on a graded quiz, so learners are marked complete whether or not they passed — silently breaking the intended 70% gate.",
        ],
        recall: { t: "tf", c: "moodle-completion", q: "If a Moodle quiz's completion setting is left at 'student must view this activity' rather than 'require passing grade', a learner who fails the quiz will still be marked complete.", a: true, e: "This is exactly the completion-vs-grade gap from Module 9 — 'view only' completion doesn't check the grade at all, so failing does not prevent completion under that setting." },
      },
      {
        id: "10-05", title: "Moodle Quiz Workflow", objective: "Build and configure a Moodle quiz activity.",
        concepts: ["quiz setup"], m: 6,
        content: [
          "Building a Moodle quiz involves creating a question bank (reusable question items, tagged by category), then assembling a quiz from that bank — optionally with random selection per attempt, a key mechanism for the pooled/randomized post-tests this course itself uses (Module 4).",
          "Key settings include the number of attempts allowed, grading method (highest, average, first, last attempt), and time limits. These settings should be chosen deliberately to match the assessment's purpose — formative checks and summative post-tests warrant different settings.",
        ],
        recall: { t: "mc", c: "moodle-quiz", q: "Which Moodle quiz mechanism directly supports building a randomized post-test from a larger pool of questions?", opts: ["File resource uploads", "The question bank, with random question selection per attempt", "Forum subscriptions", "Course completion badges"], a: 1, e: "Moodle's question bank plus random-question-per-quiz settings is exactly the mechanism for pooled, randomized assessment (Module 4's assessment-pool requirement)." },
      },
      {
        id: "10-06", title: "Monitoring Learner Progress & Reporting", objective: "Monitor learner progress and produce a basic report in Moodle.",
        concepts: ["progress monitoring", "reporting"], m: 5,
        content: [
          "Moodle's course reports (activity completion report, gradebook, participation logs) show who has done what, similarly to Module 9's general LMS reporting — with the same limitation: these are activity and score records, not direct evidence of learning or transfer.",
          "Regularly checking these reports lets a course creator catch problems early — a section nobody is completing, or a quiz question everybody fails — much like conceptStats/reviewItems in this course's own app flag weak concepts for review.",
        ],
        recall: { t: "mc", c: "moodle-reporting", q: "Where in Moodle would you look to see which learners have completed which activities?", opts: ["The course's activity completion report / gradebook", "The site's plugin list", "The Moodle version number page", "The theme settings"], a: 0, e: "Completion and grade reports are the tools for monitoring learner progress in Moodle." },
      },
      {
        id: "10-07", title: "Basic Course QA in Moodle", objective: "Run a basic course QA pass in Moodle before publishing.",
        concepts: ["course QA"], m: 5,
        content: [
          "Before publishing, a basic QA pass should check: does the course structure make sense to someone seeing it for the first time, do all resources and activities open correctly, are completion rules actually configured as intended (Module 10-04), and does the course meet the accessibility patterns from Module 7 (contrast, alt text, keyboard access, captions).",
          "Testing as a student, not just as the editor, catches problems the editor's own privileged view can hide — a broken link or a mis-set completion rule often only shows up from the learner's seat.",
        ],
        recall: { t: "mc", c: "moodle-qa", q: "Why is testing a Moodle course as a student role useful, even after checking it as the editor?", opts: ["It isn't useful — editor view shows everything", "The editor's privileged view can hide problems (broken links, wrong completion rules) that only appear from the learner's actual perspective", "Student accounts load faster", "It's required by Moodle licensing"], a: 1, e: "The editor role often bypasses restrictions a real learner would hit — testing as a student surfaces those gaps." },
      },
    ],
    postTest: {
      draw: 6,
      pool: [
        { t: "mc", c: "moodle-structure", q: "What is out of scope for this course's Moodle coverage?", opts: ["Adding resources and activities", "Server administration and plugin development", "Configuring completion settings", "Building a quiz"], a: 1, e: "The course scope is the Course Creator/Teacher role, not server administration or plugin development." },
        { t: "sc", c: "moodle-resources", q: "Which is a resource, not an activity, in Moodle?", opts: ["Quiz", "Assignment", "Page", "Forum"], a: 2, e: "A Page is static content the learner views — a resource. The others produce a trackable learner action/result — activities." },
        { t: "mc", c: "moodle-activities", q: "A course wants evidence that learners can apply a skill in a realistic scenario. Which activity type best supports authentic assessment (Module 4)?", opts: ["A static Page describing the skill", "An Assignment where learners submit a worked scenario response", "A Forum icebreaker post", "A File download"], a: 1, e: "An Assignment that requires producing real work most closely matches the authentic-assessment principle from Module 4." },
        { t: "tf", c: "moodle-completion", q: "Course completion in Moodle can be configured to require specific activities be marked complete first.", a: true, e: "Moodle supports course-level completion rules that depend on specific activity completions." },
        { t: "mc", c: "moodle-quiz", q: "Which quiz setting most affects whether retakes are simple memorization (Rule from Module 4's assessment design)?", opts: ["Quiz name", "Random question selection from a larger question bank per attempt", "Font size", "Course category"], a: 1, e: "Randomized selection from a pool is exactly what prevents retakes from being simple memorization of a fixed set." },
        { t: "sc", c: "moodle-qa", q: "A course looks correct when previewed as the editor, but a student reports a broken link. What does this suggest?", opts: ["The student is mistaken", "QA should include testing as an actual student role, not only the editor view", "The course should be unpublished permanently", "Broken links are unavoidable in Moodle"], a: 1, e: "Editor-view QA can miss issues that only surface from a real student's restricted perspective — hence testing as a student." },
      ],
    },
  },
  {
    id: 11, phase: "p2", title: "H5P Interactive Learning",
    purpose: "Design and QA H5P interactive activities chosen for their learning value, not novelty.",
    competencies: ["Objective→interaction mapping", "Interactive Video", "Branching Scenario", "Course Presentation/quizzes", "Feedback design", "QA"],
    prereq: [3, 9], practical: "PRACTICAL",
    micros: [
      {
        id: "11-01", title: "From Learning Objective to Interaction Choice", objective: "Match a learning objective to an appropriate H5P interaction type.", concepts: ["objective→interaction mapping"], m: 5,
        content: [
          "H5P offers many interactive content types, and the temptation is to pick whichever looks impressive. The correct starting point is the workflow: Learning Objective → Interaction Choice → Learner Action → Feedback → QA. The interaction should be the one that requires the learner to actually do the thing the objective describes.",
          "Choosing H5P as a feature catalog — using Branching Scenario because it's novel, not because the objective calls for a decision — produces busywork, not learning. Every H5P activity in a course should trace back to a specific objective, the same alignment discipline from Module 3.",
        ],
        recall: { t: "mc", c: "h5p-mapping", q: "What should drive the choice of an H5P interaction type?", opts: ["Whichever type looks most visually impressive", "The learning objective — choosing whichever interaction requires the learner to do what the objective describes", "Whichever type is fastest to build", "Always use the same interaction type for consistency"], a: 1, e: "H5P should not be treated as a feature catalog — interaction choice follows the objective, the same alignment principle as Module 3." },
      },
      {
        id: "11-02", title: "Interactive Video in H5P", objective: "Build an Interactive Video activity in H5P.", concepts: ["Interactive Video"], m: 6,
        content: [
          "H5P's Interactive Video lets you embed questions, pop-up text, and navigation points directly into a video timeline, so a learner must engage rather than passively watch. This suits objectives where checking in-the-moment understanding of a video's specific segments matters.",
          "It adds real value only when the embedded interactions test something the video is actually teaching at that moment — inserted quiz questions unrelated to the surrounding content undermine the coherence principle from Module 6.",
        ],
        recall: { t: "mc", c: "h5p-interactive-video", q: "What does Interactive Video add beyond a plain video player?", opts: ["Faster streaming speed", "Embedded questions and interaction points tied to specific moments in the video, requiring active engagement", "Automatic captions in every language", "A shorter runtime"], a: 1, e: "The value is turning passive viewing into active engagement by embedding interaction directly at relevant points in the timeline." },
      },
      {
        id: "11-03", title: "Branching Scenarios in H5P", objective: "Build a Branching Scenario activity in H5P.", concepts: ["Branching Scenario"], m: 6,
        content: [
          "A Branching Scenario presents a situation and lets the learner choose a path, with different branches leading to different consequences. It's well suited to objectives about judgment and decision-making under realistic conditions — exactly the authentic-assessment territory from Module 4.",
          "It is poorly suited to simple factual recall, where a Branching Scenario adds production overhead without adding assessment value over a straightforward question.",
        ],
        recall: { t: "mc", c: "h5p-branching", q: "A Branching Scenario is best suited to teaching which kind of objective?", opts: ["Memorizing a list of terms", "Making a judgment call and experiencing the consequences of different choices in a realistic situation", "Reading comprehension of a static article", "Typing speed"], a: 1, e: "Branching Scenarios shine for decision-making/judgment objectives with realistic consequences — not simple recall, which a Branching Scenario would over-engineer." },
      },
      {
        id: "11-04", title: "Course Presentation & Quiz Activities in H5P", objective: "Build a Course Presentation or quiz-style activity in H5P.", concepts: ["Course Presentation", "H5P quizzes"], m: 5,
        content: [
          "Course Presentation is a slide-based format that can mix content slides with embedded interactive questions, suited to a structured walk-through of material with periodic checks — similar in spirit to this course's own microlearning-plus-recall pattern.",
          "Standalone H5P quiz types (e.g. Multiple Choice, Fill in the Blanks, Drag the Words) fit focused knowledge checks. Choosing between Course Presentation and a standalone quiz type is a scope decision: does the interaction need to carry content too, or is it purely a check on content taught elsewhere.",
        ],
        recall: { t: "sc", c: "h5p-presentation", q: "When does a standalone H5P quiz type fit better than a full Course Presentation?", opts: ["When the interaction needs to deliver new content slides as well as check understanding", "When the goal is purely a focused knowledge check on content already taught elsewhere", "Never — Course Presentation should always be used", "Only for accessibility compliance"], a: 1, e: "A standalone quiz type is the lighter-weight choice when you only need a check, not a content-delivery vehicle." },
      },
      {
        id: "11-05", title: "Designing Feedback in H5P Activities", objective: "Design feedback within an H5P activity.", concepts: ["feedback design"], m: 5,
        content: [
          "H5P activities support custom feedback text for correct and incorrect responses, and even feedback ranges tied to overall score. This is the same feedback-design principle from Module 4 applied inside the tool: a bare 'incorrect' wastes the opportunity, while a brief explanation of why closes the loop.",
          "Because H5P feedback can be authored per-answer, it's possible (and worthwhile) to write feedback that addresses the specific misconception a particular wrong answer represents, not just a single generic 'try again' message.",
        ],
        recall: { t: "mc", c: "h5p-feedback", q: "What makes H5P feedback more useful than a generic 'incorrect, try again' message?", opts: ["Nothing — generic messages are equally effective", "Feedback tailored to the specific wrong answer, explaining the misconception it represents", "Longer feedback text is always better", "Feedback should only appear for correct answers"], a: 1, e: "Feedback tied to the specific answer given — addressing the actual misconception — is more useful than a one-size-fits-all message, per Module 4's feedback principles." },
      },
      {
        id: "11-06", title: "H5P QA: Testing the Learner Experience", objective: "Run a QA pass on an H5P activity from the learner's perspective.", concepts: ["H5P QA"], m: 5,
        content: [
          "H5P QA should check the same fundamentals as any interactive content: does every interaction work by keyboard (Module 7), is feedback accurate for every answer path (not just the 'happy path'), and does the activity actually test what its objective claims.",
          "Testing every branch of a Branching Scenario, and every distractor of a quiz, is tedious but necessary — an untested branch or a mis-keyed correct answer silently breaks the activity for whoever encounters it.",
        ],
        recall: { t: "tf", c: "h5p-qa", q: "It is sufficient to test only the 'happy path' (all-correct-answers route) of an H5P activity before publishing.", a: false, e: "Every path/branch and every answer option should be tested — an untested wrong-answer path or mis-keyed correct answer can silently break the activity." },
      },
    ],
    postTest: {
      draw: 5,
      pool: [
        { t: "mc", c: "h5p-mapping", q: "A designer picks Branching Scenario for a course purely because it looks modern, with no specific objective in mind. What is the problem?", opts: ["There is no problem", "H5P is being treated as a feature catalog rather than chosen from the objective — the workflow Objective→Interaction should drive the choice", "Branching Scenario is deprecated", "This is only a problem for accessibility"], a: 1, e: "Choosing an interaction for its novelty rather than the objective is exactly the feature-catalog mistake this module warns against." },
        { t: "sc", c: "h5p-interactive-video", q: "An Interactive Video inserts a quiz question about a completely unrelated topic mid-video. What principle does this violate?", opts: ["Modality", "Coherence — the interaction should relate to what's being taught at that moment", "Operability", "Spacing"], a: 1, e: "An interruption unrelated to the surrounding content breaks coherence, adding load without a matching benefit." },
        { t: "mc", c: "h5p-branching", q: "Which objective type is a poor fit for Branching Scenario?", opts: ["Practicing a difficult customer conversation with several possible approaches", "Memorizing the definition of a single term", "Deciding the right next step in an ambiguous situation", "Exploring consequences of different professional choices"], a: 1, e: "Simple term memorization doesn't need branching complexity — it's over-engineering for a recall-level objective." },
        { t: "mc", c: "h5p-feedback", q: "Why might different wrong answers in an H5P quiz deserve different feedback text?", opts: ["They shouldn't — one generic message is best", "Different wrong answers often represent different misconceptions, and feedback is more useful when it addresses the specific one", "H5P doesn't support per-answer feedback", "It's a legal requirement"], a: 1, e: "Per-answer feedback lets you address the actual misconception behind each specific wrong choice, rather than one catch-all message." },
        { t: "tf", c: "h5p-qa", q: "An H5P activity that works correctly with a mouse but has no keyboard-operable path fails the same accessibility principle discussed in Module 7.", a: true, e: "Mouse-only interaction fails WCAG's Operable principle — the same check applies inside H5P as anywhere else." },
      ],
    },
  },
  {
    id: 12, phase: "p2", title: "SCORM",
    purpose: "Understand SCORM well enough to work with SCORM packages in an LMS workflow and explain its role/limits.",
    competencies: ["Package concept", "LMS integration workflow", "Completion/score/status tracking", "1.2 vs 2004 awareness", "Limitations"],
    prereq: [9], practical: "CONCEPTUAL+WORKFLOW",
    micros: [
      {
        id: "12-01", title: "What SCORM Is & Why It Exists", objective: "Explain what SCORM is and the interoperability problem it solves.", concepts: ["SCORM package concept", "interoperability"], m: 5,
        content: [
          "SCORM is an older, well-supported standard that defines a small, fixed vocabulary a course package reports back to whatever LMS loads it: completed, passed, a score, time spent. That fixed vocabulary is exactly what makes it interoperable — a SCORM package built once can run in many different LMS platforms and report the same basic outcomes consistently.",
          "The trade-off for that interoperability is expressive narrowness: SCORM can answer 'did this person finish this thing and how did they score' — and essentially only that.",
        ],
        recall: { t: "mc", c: "scorm-basics", q: "What interoperability problem does SCORM's fixed reporting vocabulary solve?", opts: ["It makes videos load faster", "It lets a course package report consistent basic outcomes (completed, score) across many different LMS platforms", "It replaces the need for an LMS entirely", "It automatically translates courses into other languages"], a: 1, e: "A shared, fixed vocabulary is what lets the same SCORM package run and report consistently across different LMS platforms." },
      },
      {
        id: "12-02", title: "SCORM Packaging & LMS Integration Workflow", objective: "Walk through the conceptual workflow of packaging and loading SCORM content into an LMS.", concepts: ["packaging", "LMS integration workflow"], m: 5,
        content: [
          "At a workflow level: authoring tools export course content as a SCORM package (a zip file with a manifest describing its structure), which a course creator then uploads into the LMS as an activity. The LMS interprets the manifest, launches the content in a player, and receives the tracked completion/score/status data back through the SCORM API as the learner progresses.",
          "This course treats that workflow conceptually — writing the manifest by hand or engineering the SCORM communication layer is out of scope; what matters practically is knowing what happens at each step so problems (a package that won't launch, a score that never reports) can be diagnosed.",
        ],
        recall: { t: "sc", c: "scorm-workflow", q: "What happens when a SCORM package is loaded into an LMS?", opts: ["The LMS rewrites the package's content automatically", "The LMS reads the manifest, launches the content in a player, and receives completion/score/status data back as the learner progresses", "The package is converted permanently into xAPI statements", "Nothing is tracked unless a plugin is separately installed"], a: 1, e: "The manifest tells the LMS how to launch the package; tracked data (completion, score, status) flows back through the SCORM API during the session." },
      },
      {
        id: "12-03", title: "SCORM 1.2 vs. 2004 & Practical Limitations", objective: "Explain SCORM 1.2 vs. 2004 differences and SCORM's practical limitations.", concepts: ["version differences", "limitations"], m: 5,
        content: [
          "SCORM 1.2 is older, simpler, and extremely widely supported; SCORM 2004 adds more granular tracking (including sequencing rules between content) but is less universally supported and more complex to author correctly. In practice, many organizations still default to 1.2 for its broad compatibility unless 2004's extra sequencing features are specifically needed.",
          "SCORM's core limitation, regardless of version, is that its fixed vocabulary cannot describe experiences beyond a single trackable package — it cannot represent learning that happens outside a course (coaching, on-the-job practice, simulations), which is exactly the gap Module 13's xAPI addresses.",
        ],
        recall: { t: "mc", c: "scorm-versions", q: "What is a practical difference between SCORM 1.2 and SCORM 2004?", opts: ["1.2 is entirely obsolete and unsupported", "2004 adds more granular tracking and sequencing but is less universally supported and more complex to author", "2004 removed the need for an LMS", "1.2 only works with video content"], a: 1, e: "2004 extends tracking/sequencing capability at the cost of broader compatibility and simpler authoring — which is why many organizations still default to 1.2." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "SCORM vs xAPI", q: "What is the essential difference between SCORM and xAPI?", opts: ["xAPI is faster to load in a browser", "SCORM reports a small fixed set of outcomes to the LMS, while xAPI records open-vocabulary statements about experiences", "SCORM is proprietary and xAPI is not", "xAPI replaces the need for an LMS"], a: 1, e: "The difference is expressive scope: a fixed vocabulary answers 'did they finish'; an open one can describe what happened, at the cost of agreeing that vocabulary yourself." },
        { t: "tf", c: "scorm-basics", q: "SCORM can natively describe learning experiences that happen outside of a trackable course package, such as on-the-job coaching.", a: false, e: "This is exactly SCORM's core limitation — its fixed vocabulary is scoped to a single trackable package, not experiences beyond it." },
        { t: "sc", c: "scorm-workflow", q: "A SCORM package uploads successfully but never reports a completion status to the LMS gradebook. Where would you look first, conceptually?", opts: ["The learner's internet browser history", "Whether the manifest/API communication between the package and LMS is actually reporting status back correctly", "The course's color scheme", "The LMS server's physical location"], a: 1, e: "Since status/score flows back through the SCORM API described by the manifest, a missing report points to that communication path first." },
        { t: "mc", c: "scorm-versions", q: "Why might an organization deliberately choose SCORM 1.2 over 2004 despite 2004 being newer?", opts: ["1.2 is required by law", "1.2's simplicity and near-universal LMS support outweigh 2004's extra sequencing features for their needs", "2004 cannot report scores at all", "There is no reason to ever choose 1.2"], a: 1, e: "Broad compatibility and simplicity are real practical advantages that often outweigh 2004's extra (and rarely-needed) sequencing capability." },
      ],
    },
    resources: [
      { title: "xAPI (Experience API) explained", source: "xAPI.com (Rustici Software)", url: "https://xapi.com/", verified: true },
    ],
  },
  {
    id: 13, phase: "p2", title: "xAPI, LRS & Interoperability",
    purpose: "Understand event-based learning data beyond the LMS and how it relates to SCORM.",
    competencies: ["Event-based learning data", "Actor→Verb→Object", "LRS", "xAPI vs. analytics", "LTI awareness"],
    prereq: [9, 12], practical: "CONCEPTUAL",
    micros: [
      {
        id: "13-01", title: "xAPI Basics: Actor, Verb, Object", objective: "Explain an xAPI statement using Actor-Verb-Object.", concepts: ["Actor-Verb-Object"], m: 5,
        content: [
          "An xAPI statement takes the shape actor, verb, object — for example 'Rina attempted question 4' or 'Dimas completed the coaching session.' Because the vocabulary is open rather than fixed like SCORM, xAPI can describe simulations, VR sessions, coaching conversations, and on-the-job actions — anything that can be phrased as someone doing something to or with something.",
          "That openness is also a cost: with no vocabulary agreed inside an organization, two teams will record the same real-world event differently, and the resulting data will not aggregate cleanly. Choosing xAPI means taking on design work that SCORM's fixed vocabulary did for you automatically.",
        ],
        recall: { t: "mc", c: "xapi-basics", q: "What is the basic structure of an xAPI statement?", opts: ["Question, answer, score", "Actor, verb, object — e.g. 'Rina attempted question 4'", "Course, module, lesson", "Date, time, duration"], a: 1, e: "Actor-verb-object is the core shape: who did what to/with what." },
      },
      {
        id: "13-02", title: "The Learning Record Store (LRS)", objective: "Explain the role of a Learning Record Store (LRS).", concepts: ["LRS role"], m: 5,
        content: [
          "xAPI statements are sent to a Learning Record Store, an LRS — a system deliberately separate from the LMS. Because the LRS doesn't have to receive statements only from course packages, it can also collect data from simulations, mobile apps, or manually logged real-world events.",
          "This separation is what lets xAPI describe learning experiences that happen entirely outside any LMS, while still centralizing that data somewhere queryable for analytics (Module 25 picks this up from the AI-assisted side).",
        ],
        recall: { t: "tf", c: "lrs", q: "A Learning Record Store (LRS) is simply another name for the LMS.", a: false, e: "The LRS is a deliberately separate system from the LMS — that separation is what lets it record experiences beyond any single course." },
      },
      {
        id: "13-03", title: "xAPI vs. SCORM: When Each Fits", objective: "Distinguish when xAPI fits a use case better than SCORM.", concepts: ["xAPI vs. SCORM"], m: 5,
        content: [
          "Choose SCORM when the need is simple, standardized reporting of a single trackable course package across LMS platforms — most conventional e-learning fits this. Choose xAPI when the learning experience happens outside a single package, or across multiple systems, and needs a richer, custom vocabulary of events.",
          "The two are not strictly exclusive — cmi5 is a profile that bridges xAPI's richer data model with SCORM-like LMS launch/completion workflows, for organizations that want both.",
        ],
        recall: { t: "sc", c: "xapi-vs-scorm", q: "Which scenario is a better fit for xAPI than plain SCORM?", opts: ["A single self-contained e-learning module with a simple pass/fail quiz", "Tracking a blended program spanning an in-person workshop, a mobile app, and on-the-job practice", "A short video with no interactivity", "A PDF resource with no tracking needed"], a: 1, e: "Multi-system, beyond-the-course experiences are exactly what SCORM's fixed single-package vocabulary cannot capture, and xAPI's open statements can." },
      },
      {
        id: "13-04", title: "LTI & Tool Interoperability", objective: "Explain LTI's role in tool interoperability at a conceptual level.", concepts: ["LTI awareness"], m: 4,
        content: [
          "LTI (Learning Tools Interoperability) is a standard that lets an LMS launch an external tool — a publisher's content, an H5P host, an assessment platform — while passing along context like the learner's identity and the course, without the LMS needing custom integration code for every possible tool.",
          "This course treats LTI conceptually: understanding that it exists and what problem it solves (plug-and-play external tools) is the practitioner-level need; building or configuring an LTI integration is outside this scope.",
        ],
        recall: { t: "mc", c: "lti", q: "What problem does LTI solve for an LMS?", opts: ["It replaces the need for course content", "It lets an LMS launch external tools with shared context (like learner identity) without custom integration for each one", "It encrypts all course data", "It is a video compression standard"], a: 1, e: "LTI is the standard that enables plug-and-play external tool integration with shared context, avoiding bespoke integration work per tool." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "xapi-basics", q: "Which of these is correctly structured as an xAPI-style statement?", opts: ["Module 4, 82%, passed", "Dimas, completed, the coaching session", "2026-08-14, 14:00, 20 minutes", "Course A, Section 2, Page 5"], a: 1, e: "Actor (Dimas), verb (completed), object (the coaching session) — the actor-verb-object shape." },
        { t: "sc", c: "lrs", q: "Why is the LRS kept separate from the LMS rather than built into it?", opts: ["For no particular reason — it's a historical accident", "Separation lets the LRS collect data from sources beyond any single course package or LMS", "The LRS is a legally required separate entity", "It makes the system slower on purpose"], a: 1, e: "Separation is what enables the LRS to aggregate data from multiple sources, not just one course/LMS." },
        { t: "mc", c: "xapi-vs-scorm", q: "Which caution does this course raise about choosing xAPI over SCORM?", opts: ["xAPI is illegal in some countries", "xAPI's open vocabulary requires your own organization to agree on consistent terms, or data won't aggregate cleanly", "xAPI cannot be used with any LMS", "xAPI is always slower to implement"], a: 1, e: "Open vocabulary is a design responsibility — without agreed terms across teams, the same event gets recorded inconsistently." },
        { t: "tf", c: "lti", q: "LTI requires the LMS to write custom integration code separately for every external tool it wants to connect to.", a: false, e: "LTI's whole purpose is to avoid that — it's a shared standard so tools can be launched without bespoke per-tool integration." },
      ],
    },
    resources: [
      { title: "xAPI Specification (ADL Initiative)", source: "ADL Initiative", url: "https://github.com/adlnet/xAPI-Spec", verified: true },
    ],
  },
  {
    id: 14, phase: "p3", title: "AI & Generative AI Foundations",
    purpose: "Establish a correct mental model of what AI/ML/Generative AI are (and aren't), and when AI use is appropriate.",
    competencies: ["AI vs. automation", "AI/ML/GenAI relationships", "Appropriate vs. inappropriate use"],
    prereq: [], practical: "CONCEPTUAL",
    micros: [
      {
        id: "14-01", title: "The AI Landscape: Automation, AI, ML & Generative AI", objective: "Explain how automation, AI, machine learning, and Generative AI relate to each other.",
        concepts: ["AI vs. automation", "AI/ML/GenAI taxonomy"], m: 5,
        content: [
          "Automation follows fixed, explicitly programmed rules — the same input always produces the same output through logic a person wrote. AI is broader: systems that perform tasks which would normally require human judgment, often by learning patterns from data rather than following hand-written rules. Machine Learning is the dominant modern approach to AI — training a system on examples rather than programming every rule directly.",
          "Generative AI is a category of ML systems trained to produce new content (text, images, audio) rather than only classify or predict a number. So the relationship nests: automation is not necessarily AI; ML is one way of building AI; Generative AI is a kind of ML. Understanding where a tool sits in this landscape helps you reason about what it can plausibly do — and where its limits are.",
        ],
        recall: { t: "mc", c: "ai-vs-automation", q: "What is the key distinction between simple automation and AI?", opts: ["Automation is newer technology than AI", "Automation follows fixed, explicitly programmed rules; AI performs tasks requiring judgment, often learned from data", "AI always requires the internet and automation never does", "There is no real distinction — the terms are interchangeable"], a: 1, e: "Automation executes fixed logic a person wrote; AI (especially ML-based AI) learns patterns from data to handle tasks that would otherwise require human judgment." },
      },
      {
        id: "14-02", title: "Generative AI: What It Is and How It Differs", objective: "Explain what Generative AI is and identify its core strengths and limitations.",
        concepts: ["Generative AI definition", "strengths/limitations"], m: 5,
        content: [
          "Generative AI produces new, original-looking content by learning statistical patterns from huge amounts of training data, then generating output that plausibly continues a given input. This differs from traditional automation, which cannot produce content it wasn't explicitly told to produce, and from earlier predictive ML, which typically outputs a classification or number rather than free-form content.",
          "Its core strength is fluent, flexible content generation across many tasks without task-specific programming. Its core limitation, covered in depth in Module 15 and 17, is that fluent output is a byproduct of pattern-matching, not a guarantee of factual correctness — which is why generated content always needs human review before being trusted.",
        ],
        recall: { t: "mc", c: "genai-limits", q: "What is a core limitation of Generative AI output, regardless of how fluent it sounds?", opts: ["It can never produce text longer than a paragraph", "Fluency is a byproduct of pattern-matching, not a guarantee that the content is factually correct", "It only works for image generation, not text", "It cannot be used for any professional purpose"], a: 1, e: "Generative AI is optimized to produce plausible, fluent continuations — that process does not itself guarantee factual accuracy." },
      },
      {
        id: "14-03", title: "Appropriate vs. Inappropriate AI Use", objective: "Evaluate when AI use is appropriate vs. inappropriate for a given task.",
        concepts: ["appropriate/inappropriate AI use"], m: 5,
        content: [
          "AI use is generally appropriate for drafting, brainstorming, summarizing, and other tasks where a human will review and can catch errors before anything consequential happens. It becomes questionable when the AI's output is treated as a final decision with no human review, when the task requires information the AI cannot verify, or when confidential/sensitive data would need to be shared with it (Module 17 covers this in depth).",
          "A simple practical test: could a wrong or biased AI output cause real harm before a human would catch it? If yes, that task needs a human decision point built in, not just AI assistance.",
        ],
        recall: { t: "sc", c: "appropriate-use", q: "An AI tool is used to draft a first-pass summary of a meeting, which a person then reviews and edits before sharing. Is this appropriate use?", opts: ["No — AI should never be used for anything involving real information", "Yes — a human reviews before anything consequential happens, catching errors before they cause harm", "Only if the AI is 100% accurate", "Only for meetings under 10 minutes"], a: 1, e: "Human review before consequential use is exactly the pattern that makes AI-assisted drafting appropriate." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "ai-vs-automation", q: "A thermostat that turns on heating below a fixed temperature is best described as which of these?", opts: ["Generative AI", "Simple automation — fixed rule, no learning from data", "Machine Learning", "Artificial General Intelligence"], a: 1, e: "A fixed threshold rule with no learning is classic automation, not AI." },
        { t: "sc", c: "ai-ml-genai", q: "Where does Machine Learning sit relative to AI in the landscape taught in this module?", opts: ["ML is a broader category that contains AI", "ML is one common approach used to build AI systems, by learning from data rather than hand-written rules", "ML and AI are unrelated fields", "ML only refers to Generative AI specifically"], a: 1, e: "ML is a (dominant) approach within the broader AI category — learning from examples rather than following explicitly programmed rules." },
        { t: "mc", c: "genai-limits", q: "Why can't fluent, confident-sounding AI text be assumed accurate?", opts: ["Because AI models are always malicious", "Because fluency comes from pattern-matching learned during training, which is a separate thing from factual verification", "Because AI text is always shorter than it should be", "Fluent text actually is always accurate"], a: 1, e: "Pattern-based fluency and factual grounding are different properties — one does not guarantee the other." },
        { t: "tf", c: "appropriate-use", q: "It is appropriate to submit an AI-generated recommendation as a final decision with no human review, as long as the AI seems confident.", a: false, e: "Confidence is not evidence of correctness (Module 17). Consequential decisions need a human review point, not just AI assistance." },
      ],
    },
  },
  {
    id: 15, phase: "p3", title: "Generative AI & LLM Fundamentals",
    purpose: "Explain how LLMs generate output, so fluency is never mistaken for correctness.",
    competencies: ["Tokens", "Context window", "Inference", "Next-token/probabilistic generation", "Fluency vs. factuality"],
    prereq: [14], practical: "CONCEPTUAL",
    micros: [
      {
        id: "15-01", title: "How an LLM Generates Text", objective: "Explain how an LLM generates text using tokens and next-token probability.",
        concepts: ["tokens", "probabilistic generation", "next-token prediction"], m: 6,
        content: [
          "A language model does not read characters or whole words. Text is split into tokens — frequent chunks, often word pieces — and the model processes each token as a number. Generation works one token at a time: given everything so far, the model calculates a probability for what token is most likely to come next, picks one, and repeats.",
          "This is why LLM output can feel eerily fluent while still being wrong: fluency is a direct product of predicting statistically likely next tokens, which is a different thing from verifying that a claim is true. Nothing in the generation process itself checks facts against reality — that verification step has to come from elsewhere, which is exactly why Module 17 exists.",
        ],
        recall: { t: "mc", c: "token-generation", q: "What determines an LLM's next output token?", opts: ["A lookup in a fixed dictionary of pre-written answers", "A calculated probability, given everything generated so far, of which token is most likely to come next", "A random number with no relationship to prior text", "A direct database query"], a: 1, e: "Generation is sequential probability-based prediction of the next token, conditioned on everything generated so far." },
      },
      {
        id: "15-02", title: "Context Windows: What They Are & Why They Matter", objective: "Explain what a context window is and why its limits matter.",
        concepts: ["context window", "context limitations", "inference"], m: 5,
        content: [
          "The context window is the total amount of text (measured in tokens) a model can consider at once during inference — instructions, conversation history, any documents provided, and the response being generated all share this one finite budget. When a conversation or document exceeds it, older content is dropped or summarized to make room.",
          "A model that stops following an instruction given much earlier in a long conversation is very often not 'forgetting' in a humanlike sense — the instruction has simply fallen out of the context window and is no longer part of what the model can see. This is a practical, checkable cause, not a mysterious one.",
        ],
        recall: { t: "tf", c: "context-window", q: "When a conversation exceeds a model's context window, earlier content may be dropped or summarized to make room for new content.", a: true, e: "The context window is a finite budget; once it's full, something has to give — typically the oldest content." },
      },
      {
        id: "15-03", title: "Why Fluent Output Isn't Necessarily Factual", objective: "Explain why fluent AI output is not necessarily factual.",
        concepts: ["fluency vs. factuality"], m: 5,
        content: [
          "Because generation is fundamentally about predicting plausible next tokens, an LLM can produce a confident, well-written, completely wrong sentence with the same fluency as a correct one — there is no internal 'I'm not sure' signal built into the generation process itself. This is the conceptual foundation for hallucination, covered fully in Module 17.",
          "The practical implication: fluency, confidence of tone, and detail are not evidence of accuracy. Only checking a claim against a real source is evidence of accuracy.",
        ],
        recall: { t: "mc", c: "fluency-vs-fact", q: "Why can a confident, detailed, well-written AI sentence still be factually wrong?", opts: ["Because the model is deliberately trying to deceive the user", "Because fluent generation is a byproduct of next-token prediction, which has no built-in fact-checking step", "Because only short sentences can be accurate", "This never actually happens with modern models"], a: 1, e: "Nothing in the token-prediction process itself verifies truth — fluency and factual accuracy are separate properties." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "Tokens", q: "What is a token in the context of an LLM?", opts: ["A single character", "A frequent chunk of text, often a word piece, that the model processes as one unit", "An authentication key for the API", "A full sentence"], a: 1, e: "Tokens are sub-word text units — the model's actual unit of processing, distinct from characters or full words." },
        { t: "sc", c: "context-window", q: "An assistant stops following formatting rules given at the very start of a long conversation. What is the most likely explanation covered in this module?", opts: ["The model is intentionally disobeying", "The early instruction has fallen out of the context window", "The user's internet connection is unstable", "The model has a personal preference against those rules"], a: 1, e: "This is a checkable, mechanical cause — content aging out of the finite context window — not a behavioral or intentional one." },
        { t: "mc", c: "token-generation", q: "Which best describes how an LLM decides what word/token to output next?", opts: ["It retrieves the exact next word from its training data verbatim every time", "It calculates a probability distribution over possible next tokens and selects one", "It asks a human reviewer in real time", "It generates the entire response at once with no sequential process"], a: 1, e: "Generation is a sequential, probability-based next-token process, not verbatim retrieval or all-at-once generation." },
        { t: "tf", c: "fluency-vs-fact", q: "A model's confident tone and fluent writing style are reliable evidence that its claims are factually accurate.", a: false, e: "Confidence and fluency come from the generation process itself and say nothing about factual accuracy — only checking against a real source does." },
      ],
    },
  },
  {
    id: 16, phase: "p3", title: "Prompting & Context Management",
    purpose: "Build practical, iterative prompting skill that produces usable drafts for Digital Learning work.",
    competencies: ["Instructions/context/task/constraints", "Examples/few-shot prompting", "Output formats", "Decomposition", "Iterative refinement"],
    prereq: [15], practical: "PRACTICAL",
    micros: [
      {
        id: "16-01", title: "Anatomy of a Good Prompt", objective: "Construct a prompt using instructions, context, constraints, and task.", concepts: ["prompt anatomy"], m: 6,
        content: [
          "A prompt is a specification of a task, not a magic phrase. Most weak prompts fail because they're ambiguous, not because of missing 'trick' wording — the model resolves the ambiguity differently than the person intended. Five elements do most of the work: the goal, relevant context, constraints, the specific input, and the desired output format.",
          "Stating explicit evaluation criteria — how the result will be judged — often improves output more than any phrasing trick. \"Write a good quiz question\" is vague; \"write one multiple-choice question with exactly four options, one clearly correct, no 'all of the above'\" is a specification.",
        ],
        recall: { t: "mc", c: "prompt-anatomy", q: "\"Make it better\" is a weak prompt mainly because:", opts: ["It is too short", "It does not specify criteria for what 'better' means, so the model resolves the ambiguity on its own", "It uses the wrong verb", "AI cannot process short prompts"], a: 1, e: "The core problem is unspecified criteria — the model has to guess what 'better' means, and that guess may not match what you wanted." },
      },
      {
        id: "16-02", title: "Few-Shot Prompting & Examples", objective: "Use few-shot examples to steer AI output format and quality.", concepts: ["few-shot prompting"], m: 5,
        content: [
          "Zero-shot means describing a task with no examples; few-shot means including one or more worked examples of input and desired output alongside the instructions. Examples often beat lengthy adjective-filled descriptions — showing one well-formed quiz item usually communicates the target more precisely than a paragraph describing what 'good' looks like.",
          "The cost is context: every example included is content the model has to process on every call, which is why few-shot is a deliberate trade-off (clarity for cost/length), not a default to reach for automatically.",
        ],
        recall: { t: "tf", c: "few-shot", q: "Including a worked example in a prompt is always free — it has no cost or trade-off.", a: false, e: "Examples consume context space on every call, so few-shot prompting is a deliberate trade-off between output clarity and prompt length/cost." },
      },
      {
        id: "16-03", title: "Structuring Output & Decomposing Tasks", objective: "Structure a prompt's output format and decompose a complex task into sub-prompts.", concepts: ["output formatting", "task decomposition"], m: 5,
        content: [
          "Asking for a specific output format (a bulleted list, a table, JSON matching a described shape) makes the result easier to use downstream, but it is a request, not a guarantee — output should still be checked, not blindly trusted to match the requested shape every time.",
          "A complex task (draft a full storyboard) is often better handled as several smaller prompts (draft objectives, then a scene list, then narration per scene) rather than one giant request — decomposition lets you check and correct each piece before it compounds into the next.",
        ],
        recall: { t: "mc", c: "decomposition", q: "Why might breaking a complex request into several smaller prompts improve the result?", opts: ["It always uses fewer total tokens", "Each piece can be checked and corrected before errors compound into the next step", "AI cannot handle long instructions at all", "It removes the need for human review"], a: 1, e: "Decomposition creates checkpoints — catching a problem early prevents it from propagating through the rest of a complex output." },
      },
      {
        id: "16-04", title: "Iterative Refinement: Prompting as a Conversation", objective: "Iteratively refine a prompt based on critique of the AI's output.", concepts: ["iterative refinement"], m: 5,
        content: [
          "Prompting is an iterative communication and design skill, not a one-shot magic formula. The first response is a draft to critique, not a final answer: read it against your actual criteria, identify specifically what's missing or wrong, and refine the prompt (add a missing constraint, correct a misunderstanding, add an example) rather than starting over from nothing.",
          "This CRITIQUE-then-refine loop is the same Human-in-Command discipline (DEFINE → PROMPT → GENERATE → CRITIQUE → VERIFY → DECIDE) that runs through every AI-Enhanced module in Phase 4 — prompting well is inseparable from critiquing well.",
        ],
        recall: { t: "sc", c: "iterative-refinement", q: "An AI's first draft response is close but missing a required constraint. What is the best next step?", opts: ["Discard everything and start over with an unrelated prompt", "Refine the prompt to add the missing constraint explicitly, building on what's already close", "Accept the draft as final since it's mostly right", "Give up on using AI for this task"], a: 1, e: "Iterative refinement — adding the specific missing piece — is more effective than discarding a near-miss or accepting an incomplete result." },
      },
    ],
    postTest: {
      draw: 6,
      pool: [
        { t: "mc", c: "Prompt structure", q: "Which set of elements most reliably improves prompt results?", opts: ["Politeness, urgency, repetition", "Goal, context, constraints, input, output format", "Longer sentences and more adjectives", "Asking the model to be confident"], a: 1, e: "Specification beats phrasing — ambiguity is the main cause of unusable output." },
        { t: "mc", c: "few-shot", q: "When is few-shot prompting (including worked examples) most worth its context cost?", opts: ["Never — always use zero-shot", "When the desired output format/quality is hard to specify precisely in words alone", "Only for very short prompts", "Only when using a paid API"], a: 1, e: "Examples earn their context cost when they communicate a target that's hard to fully specify through description alone." },
        { t: "tf", c: "Structured output", q: "Asking a model to output JSON guarantees the response will always be valid, parseable JSON.", a: false, e: "It's a request, not a guarantee — output should be validated, not blindly trusted to match the requested format every time." },
        { t: "sc", c: "decomposition", q: "A single giant prompt asking for a full course outline, all objectives, and every quiz question at once produces a tangled, hard-to-fix result. What does this module suggest?", opts: ["Add more adjectives to the prompt", "Decompose the task into smaller sequential prompts that can each be checked", "Increase the model's response length limit", "This is unavoidable and there's no better approach"], a: 1, e: "Breaking a complex task into checkable sub-steps is exactly the decomposition strategy this module teaches." },
        { t: "mc", c: "iterative-refinement", q: "What does this course mean by treating prompting as 'a conversation, not a magic formula'?", opts: ["You should only ever prompt once and accept the result", "Prompting typically requires reading the output, critiquing it against your criteria, and refining — an iterative loop", "Every prompt must contain the exact same wording template", "Refining a prompt is a sign of failure"], a: 1, e: "Prompting is explicitly framed as an iterative critique-and-refine skill, mirroring the Human-in-Command CRITIQUE step." },
        { t: "sa", c: "Prompt structure", q: "In one sentence, why does stating explicit evaluation criteria in a prompt often improve output more than adjectives like 'high quality'?", a: { groups: [["specific", "spesifik", "concrete", "measur"], ["ambigu", "vague", "kabur", "interpret"], ["criteri", "kriteria", "rubric"]], need: 1, model: "Explicit criteria remove ambiguity, giving the model a concrete target instead of leaving 'quality' open to its own interpretation." }, e: "Adjectives like 'high quality' are ambiguous; explicit criteria give the model something concrete to satisfy." },
      ],
    },
    resources: [
      { title: "Prompting best practices", source: "Anthropic", url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices", verified: true },
    ],
  },
  {
    id: 17, phase: "p3", title: "AI Reliability, Privacy & Responsible Use",
    purpose: "Build the judgment to catch unreliable AI output and use AI tools without privacy, IP, or over-reliance risk.",
    competencies: ["Hallucination", "Source verification", "Bias & automation bias", "Privacy/data security", "Copyright/IP", "Risk-based oversight"],
    prereq: [15, 16], practical: "PRACTICAL",
    micros: [
      {
        id: "17-01", title: "Hallucination: Why AI Sounds Confident When It's Wrong", objective: "Identify signs of AI hallucination in generated output.", concepts: ["hallucination"], m: 6,
        content: [
          "A hallucination is fluent, confident-sounding AI output that is factually wrong or entirely fabricated — an invented citation, a plausible-sounding but nonexistent statistic, a confidently wrong technical detail. As Module 15 covered, this follows directly from how generation works: the model predicts plausible text, and plausible is not the same as true.",
          "Common warning signs: very specific-sounding details (exact numbers, named sources) that you cannot independently verify, claims that don't match what you know from elsewhere, and content on topics at the edge of or beyond what the model would plausibly have reliable training data about. None of these signs are proof of a hallucination — they're a prompt to go check.",
        ],
        recall: { t: "mc", c: "hallucination", q: "What is a hallucination in the context of AI-generated content?", opts: ["A deliberate lie told by the AI", "Fluent, confident-sounding output that is factually wrong or fabricated, produced without intent to deceive", "A technical error message", "Any output the user disagrees with"], a: 1, e: "Hallucination describes plausible-but-false output arising from how generation works — not an intentional deception, and not simply disagreement with the content." },
      },
      {
        id: "17-02", title: "Verifying AI Output Against Source Material", objective: "Verify AI-generated claims against source material.", concepts: ["source verification"], m: 5,
        content: [
          "Verification means checking a specific claim against a real, independent source — not re-asking the same AI system, which can confidently repeat or even compound the same error. For factual claims, this means finding the actual reference; for a generated summary, this means comparing it line by line against the source document it was supposed to summarize.",
          "The level of verification effort should scale with the stakes: a brainstorming list of ideas needs light review, while a claim that will go into a compliance document or influence a real decision needs the underlying source checked directly.",
        ],
        recall: { t: "mc", c: "verification", q: "What is the correct way to verify a specific factual claim an AI system generated?", opts: ["Ask the same AI system again and see if it repeats the claim", "Check the claim against an independent, real source", "Assume it's correct if it sounds detailed and confident", "Ask a different AI system the same question"], a: 1, e: "Re-asking the same (or another) AI system doesn't verify anything — it can repeat or compound the same error. Only an independent real source verifies a claim." },
      },
      {
        id: "17-03", title: "Bias & Automation Bias", objective: "Recognize bias and automation bias/over-reliance in AI-assisted work.", concepts: ["bias", "automation bias", "over-reliance"], m: 5,
        content: [
          "AI systems can reproduce or amplify biases present in their training data — for example, generating examples or scenarios that default to one demographic, or handling some names/contexts less accurately than others. This is a real, checkable pattern to review for, not a guaranteed property of every output.",
          "Automation bias is a separate, human-side risk: the tendency to over-trust a system's output simply because it came from a computer and looks polished, skipping the scrutiny you'd apply to a human colleague's first draft. Over-reliance compounds this — leaning on AI output as a substitute for professional judgment rather than an input to it.",
        ],
        recall: { t: "mc", c: "automation-bias", q: "What does 'automation bias' refer to?", opts: ["A bias built into every AI model's training data", "The human tendency to over-trust a system's output simply because it's automated and looks polished", "A bug that makes AI systems slower over time", "A bias that only affects image-generation models"], a: 1, e: "Automation bias is the human-side risk of over-trusting automated/AI output without applying normal scrutiny — distinct from bias present in training data itself." },
      },
      {
        id: "17-04", title: "Privacy & Data Security: What Not to Put in Public AI Tools", objective: "Identify what should never be entered into a public AI tool.", concepts: ["privacy", "data security", "confidential/proprietary data"], m: 5,
        content: [
          "Anything typed into a hosted AI assistant leaves your machine, and the provider's retention/training settings — not your assumptions — determine what happens to it afterward. Learner records, employee data, and any personally identifiable information are personal data; sending them to a public AI tool without a deliberate, informed decision about retention and processing is a real risk, not a theoretical one.",
          "The same caution applies to confidential or proprietary organizational content — internal strategy documents, unreleased material, trade secrets. A practical rule: if you wouldn't paste it into a public forum, don't paste it into a public AI tool without first checking what that specific tool's data handling actually guarantees.",
        ],
        recall: { t: "mc", c: "privacy", q: "Which of these should generally NOT be entered into a public AI tool without a deliberate, checked decision about data handling?", opts: ["A general question about instructional design theory", "A learner's personally identifiable information", "A publicly published article you're summarizing", "A hypothetical, fictional scenario with no real names"], a: 1, e: "Personally identifiable learner data is personal data — sending it to a public tool needs a deliberate decision about that tool's retention/processing, not an assumption." },
      },
      {
        id: "17-05", title: "Copyright, IP & Responsible AI Use", objective: "Explain copyright/IP risk and apply risk-based oversight to AI use.", concepts: ["copyright/IP", "responsible AI", "risk-based oversight"], m: 5,
        content: [
          "Copyright law around AI-generated content is jurisdiction-specific and still evolving — treat any general claim as needing a date and a jurisdiction attached. As of current U.S. Copyright Office guidance: AI-generated material is not automatically protected by copyright merely because a person prompted an AI system to produce it; human authorship and a sufficient human creative contribution are important factors, and significant human modification or creative arrangement of AI-assisted output may qualify for protection depending on the specific circumstances. This is U.S. guidance specifically and should not be generalized to every jurisdiction.",
          "Responsible AI use scales oversight to risk: a low-stakes brainstorm needs light review; content that will be published, used in a compliance context, or attributed to a real person needs deliberate human review of both accuracy and IP standing before use. The human — not the AI — remains accountable for the final decision.",
        ],
        recall: { t: "tf", c: "copyright-ip", q: "Under current U.S. Copyright Office guidance, AI-generated content is automatically copyright-protected the moment a person writes the prompt that produced it.", a: false, e: "Current U.S. guidance holds the opposite: mere prompting does not automatically confer protection — sufficient human authorship/creative contribution matters, and this is U.S.-specific, not universal." },
      },
    ],
    postTest: {
      draw: 6,
      pool: [
        { t: "mc", c: "hallucination", q: "Which is a warning sign that an AI-generated claim may need verification?", opts: ["It is written in complete sentences", "It cites a very specific statistic or source you cannot independently confirm", "It is under 100 words", "It uses professional-sounding vocabulary"], a: 1, e: "Specific, unverifiable details are exactly the kind of confident-but-unconfirmed content that warrants a verification check." },
        { t: "sc", c: "verification", q: "You need to confirm a statistic an AI tool generated for a report. What is the correct verification step?", opts: ["Ask the same AI tool to double-check its own answer", "Locate the claim in an independent, real source", "Assume it's correct since it sounded confident", "Check whether the sentence is grammatically correct"], a: 1, e: "Only an independent real source constitutes verification — asking the same system again doesn't test the claim against reality." },
        { t: "mc", c: "automation-bias", q: "A team accepts an AI-drafted policy summary without review because 'the AI is usually right.' What does this illustrate?", opts: ["Good practice — trusting reliable tools saves time", "Automation bias — over-trusting automated output without the scrutiny a human draft would receive", "A hallucination", "A privacy violation"], a: 1, e: "Skipping normal scrutiny specifically because the output is automated is the definition of automation bias." },
        { t: "tf", c: "privacy", q: "Data sent to a hosted AI tool over an encrypted connection (HTTPS) is automatically safe from any privacy or retention concern.", a: false, e: "Encryption protects data in transit, not what the provider does with it afterward — retention and processing are separate decisions, as covered in this module." },
        { t: "mc", c: "copyright-ip", q: "Per current U.S. guidance discussed in this module, what factor matters most for whether AI-assisted content can be copyright-protected?", opts: ["How long the prompt was", "The presence of sufficient human authorship / creative contribution, not merely having prompted the system", "Which AI vendor was used", "Whether the content is text or an image"], a: 1, e: "Human authorship and creative contribution are the stated factors — not simply the act of prompting." },
        { t: "sc", c: "bias", q: "An AI tool is asked to generate example customer names for a training scenario and consistently defaults to one narrow demographic pattern. What should a practitioner do?", opts: ["Nothing — this is not worth reviewing", "Recognize this as a potential bias pattern and diversify/review the examples before use", "Assume the AI is being deliberately malicious", "Stop using AI tools entirely"], a: 1, e: "This is a checkable, correctable bias pattern — the appropriate response is review and adjustment, not blanket rejection or blind acceptance." },
      ],
    },
  },
  {
    id: 18, phase: "p3", title: "RAG & Modern AI Concepts",
    purpose: "Give conceptual literacy in embeddings/RAG so learners understand modern AI-ecosystem claims without building them.",
    competencies: ["Embeddings (conceptual)", "RAG (conceptual)", "Practitioner implications"],
    prereq: [15], practical: "CONCEPTUAL",
    micros: [
      {
        id: "18-01", title: "Embeddings: What They Are & Why They Matter", objective: "Explain what embeddings are and why they matter, at a conceptual level.", concepts: ["embeddings (conceptual)"], m: 5,
        content: [
          "An embedding is a way of representing a piece of text as a list of numbers, positioned so that text with similar meaning ends up numerically close together. That turns 'find related content' into a calculation — a computer can measure distance between two embeddings rather than only matching exact keywords.",
          "This is why a search for 'employee onboarding' can find a document titled 'new starter induction': keyword search would miss it (no shared words), but their meanings are close, so their embeddings are close. Building or tuning embedding models is out of scope here — the practitioner-level need is knowing why an AI tool can 'understand' related phrasing at all.",
        ],
        recall: { t: "mc", c: "embeddings", q: "In plain terms, what does an embedding represent?", opts: ["An encrypted version of a document", "A numeric representation of text positioned so that similar meanings are close together", "A compressed backup copy of the text", "The exact word count of a passage"], a: 1, e: "Embeddings turn meaning into something numerically comparable — similar meanings end up close together in that number space." },
      },
      {
        id: "18-02", title: "RAG: Grounding AI Answers in Your Content", objective: "Explain how RAG grounds AI answers in specific content, at a conceptual level.", concepts: ["RAG (conceptual)"], m: 5,
        content: [
          "Retrieval-Augmented Generation (RAG) is a pattern where, before generating an answer, an AI system first retrieves relevant passages from a specific set of documents (using embeddings to find what's related) and includes those passages in what it uses to generate the response. This grounds the answer in your actual content rather than relying only on the model's general training.",
          "RAG improves relevance and lets an answer point back to a specific source, but it does not eliminate hallucination — a model can still misread or misuse a retrieved passage, and retrieval itself can fetch the wrong passage. RAG is a conceptual awareness item here, not an implementation skill: what matters for a Digital Learning practitioner is knowing what RAG changes (answers grounded in specific content, often with citations) and what it doesn't guarantee (perfect accuracy).",
        ],
        recall: { t: "mc", c: "rag", q: "What problem does RAG (Retrieval-Augmented Generation) address for an AI system?", opts: ["It makes the model generate text faster", "It grounds answers in specific retrieved content instead of relying only on general training data", "It eliminates the need for human review entirely", "It removes all risk of hallucination"], a: 1, e: "RAG's core value is grounding — pulling in specific relevant content before generating an answer — though it reduces rather than eliminates hallucination risk." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "embeddings", q: "Why can a semantic search find a document with no words in common with the search query?", opts: ["It guesses randomly", "Their embeddings are numerically close because their meanings are similar, even though the exact words differ", "It translates the query into every language first", "It is not actually possible"], a: 1, e: "Embedding-based similarity is about meaning proximity, not exact word overlap — that's what lets it succeed where keyword search fails." },
        { t: "tf", c: "rag", q: "RAG (Retrieval-Augmented Generation) completely eliminates the risk of AI hallucination.", a: false, e: "RAG reduces hallucination risk by grounding answers in retrieved content, but does not eliminate it — retrieval can fetch the wrong passage, or the model can still misuse what it retrieved." },
        { t: "mc", c: "rag", q: "At the conceptual level taught in this module, what should a Digital Learning practitioner take away about RAG?", opts: ["How to build a vector database from scratch", "What RAG changes (grounding in specific content) and what it doesn't guarantee (perfect accuracy) — not implementation engineering", "The exact mathematical formula behind embedding similarity", "How to fine-tune a language model"], a: 1, e: "This module is explicitly conceptual — WHAT/WHY/WHAT-IT-CHANGES for a practitioner, not implementation engineering, which is out of scope." },
        { t: "sc", c: "embeddings", q: "Which task is out of scope for this module's treatment of embeddings?", opts: ["Understanding that embeddings represent meaning numerically", "Explaining why semantic search can find conceptually related content", "Implementing or tuning an embedding model", "Understanding why this matters for AI tools a practitioner might use"], a: 2, e: "Implementation/tuning of embedding models is explicitly out of scope — this module stays at conceptual awareness." },
      ],
    },
    resources: [
      { title: "What is a vector database?", source: "Pinecone", url: "https://www.pinecone.io/learn/vector-database/", verified: true },
    ],
  },
  {
    id: 19, phase: "p4", title: "AI for Needs Analysis & SME Work",
    purpose: "Apply AI as a drafting aid in needs analysis and SME synthesis, under human verification.",
    competencies: ["AI-assisted question drafting", "AI-assisted SME synthesis with verification"],
    prereq: [2, 16, 17], practical: "APPLIED",
    micros: [
      {
        id: "19-01", title: "Using AI to Draft Needs-Analysis Questions", objective: "Use AI to draft needs-analysis questions and interview guides, then verify fit for purpose.", concepts: ["AI-assisted question drafting"], m: 5,
        content: [
          "AI can quickly draft a first-pass set of TNA interview questions or a stakeholder discussion guide, given the context of the suspected gap (Module 2). This is a strong DEFINE → PROMPT → GENERATE use: you define the problem and audience, prompt for a draft, and get a starting point faster than writing from a blank page.",
          "The human step that must follow (CRITIQUE → VERIFY → DECIDE) is checking the draft questions against your actual TNA goals: are they neutral and non-leading, do they actually probe for root cause rather than assuming a training solution, and are they appropriate for this specific audience's context — an AI draft has no knowledge of organizational politics or history that might make a question land badly.",
        ],
        recall: { t: "mc", c: "ai-needs-analysis", q: "What must a Digital Learning practitioner still verify after AI drafts TNA interview questions?", opts: ["Nothing — AI-drafted questions are ready to use as-is", "Whether the questions are neutral, actually probe root cause, and fit this specific audience's real context", "Only the spelling", "Whether the questions are long enough"], a: 1, e: "AI has no knowledge of this specific organization's politics, history, or audience nuance — verifying fit-for-purpose is the human's job." },
      },
      {
        id: "19-02", title: "Using AI to Synthesize SME Input — with Verification", objective: "Use AI to synthesize SME input and verify the synthesis against source notes.", concepts: ["AI-assisted synthesis", "verification"], m: 6,
        content: [
          "AI is genuinely useful for clustering and summarizing large volumes of interview notes or SME transcripts into themes — compressing evidence you already have, which Module 14 identified as a strength, distinct from inventing what you don't have.",
          "The verification step: read the synthesis back against your actual notes and check that no theme was invented, that nuance or disagreement between sources wasn't flattened into false consensus, and that the SME gets a chance to correct the synthesis before it becomes design input — the same play-it-back discipline from Module 2.",
        ],
        recall: { t: "tf", c: "ai-sme-synthesis", q: "An AI-generated synthesis of SME interview notes should be treated as final and design-ready without checking it against the original notes.", a: false, e: "The synthesis must be verified against the original notes — checking for invented themes or flattened disagreement — and ideally played back to the SME before becoming design input." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "ai-needs-analysis", q: "AI drafts a TNA question that assumes the solution is training before any gap has been confirmed. What is the correct response?", opts: ["Use it as-is — AI questions are neutral by default", "Revise it, since it presupposes the answer the TNA is supposed to determine", "Discard AI drafting entirely going forward", "Ask the AI if the question is good"], a: 1, e: "A leading question that assumes training is the answer defeats the purpose of the TNA — this is exactly the kind of fit-for-purpose check a human must apply." },
        { t: "sc", c: "ai-sme-synthesis", q: "An AI synthesis of five SME interviews presents one unified 'consensus' view. Two SMEs actually disagreed on a key point. What went wrong?", opts: ["Nothing — consensus is always more useful", "The synthesis flattened real disagreement, which the human reviewer must catch by checking against source notes", "The AI cannot process more than one interview at a time", "Disagreement between SMEs is not something synthesis should ever surface"], a: 1, e: "Flattening real disagreement into false consensus is exactly the kind of distortion verification against source notes should catch." },
        { t: "mc", c: "ai-needs-analysis", q: "Which task is AI best suited for in needs analysis, per this module?", opts: ["Deciding definitively what learners need", "Drafting a first-pass interview guide for a human to review and refine", "Replacing stakeholder interviews entirely", "Approving the final TNA report"], a: 1, e: "Drafting assistance under human review — not autonomous decision-making — is the appropriate role, consistent with Human-in-Command." },
        { t: "tf", c: "ai-sme-synthesis", q: "Playing an AI-generated synthesis back to the original SME for correction is a recommended practice before using it as design input.", a: true, e: "This mirrors Module 2's SME-interview discipline — always let the SME correct a synthesis of their own input before it becomes design content." },
      ],
    },
  },
  {
    id: 20, phase: "p4", title: "AI for Instructional Design",
    purpose: "Apply AI to draft ID artifacts while the designer stays the accountable source of truth.",
    competencies: ["AI-assisted objective/outline drafting", "Critique against alignment criteria"],
    prereq: [3, 16, 17], practical: "APPLIED",
    micros: [
      {
        id: "20-01", title: "Using AI to Draft Objectives & Course Outlines", objective: "Use AI to draft learning objectives or a course outline from source input.", concepts: ["AI-assisted drafting"], m: 5,
        content: [
          "AI can draft candidate learning objectives or a course outline quickly from a topic and audience description, and — as with Module 19 — grounding beats instructing: supplying real source material (a policy document, existing SME notes) and asking the draft to work from it produces far better results than a vague topic description alone, because it moves the task from invention toward compression of material you already trust.",
          "Generative AI has not changed what makes learning effective — clear objectives, aligned assessment, practice with feedback (Modules 1–4) still decide that. What AI changes is the cost of producing a first draft, which is real, but also creates a risk: when drafting is cheap, organizations can produce more material without producing more learning, unless quality review keeps pace.",
        ],
        recall: { t: "mc", c: "ai-id-drafting", q: "Why does supplying real source material to an AI drafting a course outline usually work better than a vague topic description alone?", opts: ["It makes the AI respond faster", "It shifts the task from invention toward compression/reading of trusted material, which AI is more reliable at", "It removes the need for any human review", "It is required by the AI tool's terms of service"], a: 1, e: "Grounding the request in real source material turns a task prone to invention into one closer to reading and compressing — the same 'grounding beats instructing' principle from needs analysis." },
      },
      {
        id: "20-02", title: "Critiquing AI-Generated Instructional Content", objective: "Critique AI-generated instructional content against Bloom's/alignment criteria, keeping the designer as source of truth.", concepts: ["critique against alignment", "human-owned source of truth"], m: 6,
        content: [
          "The safe working pattern: a human-owned source of truth, AI-assisted drafting, human review before publication, and traceability for anything that will be assessed. Reversing any part of this doesn't usually fail dramatically — it produces a course that's subtly misaligned in ways nobody notices until a learner is assessed on something they were never actually taught.",
          "Critiquing an AI-drafted objective means checking it against Module 3's standard: is the verb measurable, does it match the actual cognitive level intended, and does it trace forward to an assessment item that could prove it was met? An AI draft can produce something that reads well but fails this alignment check — that check is the designer's job, not the AI's.",
        ],
        recall: { t: "mc", c: "ai-id-critique", q: "What does 'human-owned source of truth' mean in the context of AI-assisted instructional design?", opts: ["AI should never be used to draft anything", "The designer remains accountable for reviewing, correcting, and approving content before it's used — AI drafts, the human owns the outcome", "Only senior instructional designers may use AI tools", "The AI's first draft is automatically the final version"], a: 1, e: "AI can draft; the human remains the accountable reviewer and decision-maker — that division of responsibility is what 'human-owned source of truth' means." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "AI in the design workflow", q: "Which task is a poor fit for AI in the analysis/design phase?", opts: ["Drafting variations of a scenario a designer already wrote", "Deciding what learners actually need, without evidence", "Clustering interview notes into themes", "Producing a first-draft outline from source material"], a: 1, e: "Deciding what matters from nothing is invention, not the compression-of-existing-evidence task AI is well suited for." },
        { t: "sc", c: "Human review", q: "AI-drafted quiz items keep describing a generic version of your organization's policy rather than the real one. What is the most effective fix?", opts: ["Write a longer prompt description of the policy", "Supply the actual policy document and require each item to cite the specific clause it tests", "Switch to a different AI tool", "Generate many more items and hope some are accurate"], a: 1, e: "Grounding the draft in the real source document turns invention into reading, and citations make the human review step fast and checkable." },
        { t: "mc", c: "ai-id-critique", q: "An AI-drafted learning objective uses the verb 'understand.' What should the reviewer do?", opts: ["Accept it since AI wrote it", "Revise it to a measurable verb, per Module 3's Bloom's-based standard, since 'understand' isn't observable", "Delete the objective entirely", "Ask the AI if 'understand' is a good word"], a: 1, e: "This is exactly the alignment critique a human must apply — an unmeasurable verb fails Module 3's objective-writing standard regardless of its source." },
        { t: "tf", c: "ai-id-drafting", q: "Because AI can now draft content quickly and cheaply, producing more course material automatically improves learning outcomes.", a: false, e: "Production cost was never the binding constraint on learning — objectives, alignment, and feedback quality are. Cheaper drafting without matching review can even reduce quality." },
      ],
    },
    resources: [
      { title: "Guidance for generative AI in education and research", source: "UNESCO", url: "https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research", verified: true },
    ],
  },
  {
    id: 21, phase: "p4", title: "AI for Assessment",
    purpose: "Apply AI to draft assessment items while ensuring quality, validity, and freedom from bias.",
    competencies: ["AI-assisted item drafting", "Critique for quality/bias"],
    prereq: [4, 16, 17], practical: "APPLIED",
    micros: [
      {
        id: "21-01", title: "Using AI to Draft Assessment Items", objective: "Use AI to draft assessment items for a given objective.", concepts: ["AI-assisted item drafting"], m: 5,
        content: [
          "AI can draft candidate quiz questions, distractors, and scenario prompts quickly from a stated objective — and, exactly as with needs analysis and instructional design, grounding the request in real source content (the actual policy, the actual procedure) produces far more usable distractors than an abstract description of the topic.",
          "A generated distractor is only useful if it's plausible: something a partially-informed learner could genuinely believe, not eliminable by its length or grammar alone, and unambiguously wrong to someone who actually knows the material — Module 4's item-writing standard, now applied to AI-drafted candidates rather than human-drafted ones.",
        ],
        recall: { t: "mc", c: "ai-assessment-drafting", q: "What is a risk of using AI-drafted assessment items without applying Module 4's item-writing standard?", opts: ["AI cannot generate multiple-choice questions at all", "Weak or implausible distractors may pass through unreviewed, undermining what the item actually measures", "AI-drafted items are always too short", "There is no risk once AI is used"], a: 1, e: "AI can produce distractors that are too obviously wrong or otherwise flawed — the same quality bar from Module 4 must still be applied to AI-drafted items." },
      },
      {
        id: "21-02", title: "Critiquing AI-Generated Questions for Quality & Bias", objective: "Critique AI-generated assessment items for quality, validity, and bias.", concepts: ["critique for quality/bias"], m: 6,
        content: [
          "If an assessment can be fully completed by pasting the question into a chatbot, it was probably only measuring retrievable facts to begin with — banning AI tools or relying on detection software is a weak, adversarial answer; redesigning the task toward application, critique of a flawed example, or defense of a decision is the durable fix.",
          "Reviewing AI-drafted items for bias means checking whether a scenario assumes cultural or contextual knowledge the course never taught, or whether names/examples default to one narrow pattern — the same bias-awareness discipline from Module 17, applied specifically to assessment content.",
        ],
        recall: { t: "sc", c: "ai-assessment-critique", q: "A course discovers learners can pass its assessment just by pasting the question into a chatbot. What is the recommended response?", opts: ["Ban AI tools and add detection software", "Redesign the assessment task so it requires application/judgment beyond retrievable facts", "Lower the pass threshold", "Remove the assessment entirely"], a: 1, e: "Detection is unreliable and adversarial; if a task is completable by an AI tool, it was measuring retrievable facts — redesigning the task toward genuine application is the durable fix." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "ai-assessment-drafting", q: "Which produces better AI-drafted distractors: an abstract topic description, or the actual source policy document?", opts: ["They produce identical quality", "The actual source document, since it shifts the task from invention toward grounded reading", "The abstract description, since it gives the AI more creative freedom", "Neither — distractors should never be AI-drafted"], a: 1, e: "Grounding in real source content consistently produces more accurate, checkable output than an abstract description, per the pattern established across Modules 19–21." },
        { t: "tf", c: "ai-assessment-critique", q: "An assessment that can be fully answered by pasting the question into a chatbot is a sign the AI tool should be banned from the course.", a: false, e: "The recommended fix is redesigning the task to require judgment/application, not banning tools — banning is weak and hard to enforce." },
        { t: "mc", c: "ai-assessment-drafting", q: "What makes an AI-drafted distractor 'good' by Module 4's standard?", opts: ["It is obviously wrong so no one picks it", "It is plausible to a partially-informed learner but unambiguously wrong to someone who knows the material", "It is the same length as the correct answer, nothing else matters", "It uses complex vocabulary"], a: 1, e: "The same plausibility standard from Module 4 applies regardless of whether a human or an AI drafted the distractor." },
        { t: "sc", c: "ai-assessment-critique", q: "An AI-drafted scenario question assumes a level of cultural context the course never taught. What should a reviewer do?", opts: ["Use it anyway since AI wrote it", "Recognize this as a potential bias/validity problem and revise or replace it before use", "Assume all learners share that context", "Add more items instead of fixing this one"], a: 1, e: "An item requiring untaught contextual knowledge is a validity/bias problem regardless of its source — it must be caught in review." },
      ],
    },
  },
  {
    id: 22, phase: "p4", title: "AI for Storyboarding & Multimedia",
    purpose: "Apply AI to draft storyboards/scripts/multimedia ideas while preserving instructional intent.",
    competencies: ["AI-assisted storyboard/script drafting", "AI-assisted multimedia ideation", "Instructional critique"],
    prereq: [6, 16, 17], practical: "APPLIED",
    micros: [
      {
        id: "22-01", title: "Using AI to Draft Storyboards & Scripts", objective: "Use AI to draft a storyboard or script from source content.", concepts: ["AI-assisted storyboard/script drafting"], m: 5,
        content: [
          "AI can quickly draft a first-pass storyboard scene list or narration script from an outline, which is useful for overcoming a blank page — but it has no access to the SME knowledge, brand voice, or specific learner context that make a storyboard actually work for its audience.",
          "As with earlier Phase 4 modules, providing the AI with real source material (the actual content to be taught, existing style guides) produces a far more usable draft than a general topic prompt, and still requires a human pass to ensure every scene traces back to an objective (Module 6's storyboarding standard).",
        ],
        recall: { t: "mc", c: "ai-storyboard-drafting", q: "What is typically missing from an AI-drafted storyboard without further human/SME input?", opts: ["Nothing — it's ready to produce as-is", "Knowledge of the specific SME content, brand voice, and learner context needed to make it actually work for this audience", "The correct file format", "A title"], a: 1, e: "AI drafting is a starting point — it lacks the specific organizational/SME/audience context that makes a storyboard genuinely fit for purpose." },
      },
      {
        id: "22-02", title: "Using AI for Multimedia Ideation — with Critique", objective: "Use AI for multimedia ideation and critique the result against instructional intent.", concepts: ["AI-assisted ideation", "instructional critique"], m: 5,
        content: [
          "AI can generate multiple visual, video, or interaction ideas quickly for a given scene, which is genuinely useful for breaking creative block. Each idea still needs to be critiqued against Module 6's multimedia principles: does it serve the objective (coherence), does it direct attention appropriately (signaling), and does it avoid adding load without benefit (redundancy).",
          "An AI-suggested visual can look impressive and still be the wrong choice pedagogically — critique against instructional intent, not visual polish, is what determines whether an idea should be produced.",
        ],
        recall: { t: "sc", c: "ai-multimedia-critique", q: "An AI suggests an elaborate animated visual for a slide. How should this idea be judged?", opts: ["By how visually impressive it looks", "Against the multimedia principles (Module 6) — does it serve the objective without adding unnecessary load", "By how quickly it can be produced", "AI suggestions should never be used regardless of merit"], a: 1, e: "Instructional fit against Module 6's principles — not visual polish alone — is the correct judgment standard for any multimedia idea, AI-suggested or not." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "ai-storyboard-drafting", q: "Why does supplying real source content improve an AI-drafted storyboard?", opts: ["It doesn't make any difference", "It grounds the draft in accurate material rather than the AI inventing plausible-sounding but generic content", "It makes the storyboard shorter", "It removes the need for a human review pass"], a: 1, e: "Grounding in real content is the same pattern seen throughout Phase 4 — it shifts the task toward reliable compression rather than invention." },
        { t: "tf", c: "ai-multimedia-critique", q: "A visually impressive AI-suggested animation is automatically the right instructional choice for a slide.", a: false, e: "Visual polish is not the same as instructional fit — every multimedia idea must be critiqued against Module 6's principles regardless of how impressive it looks." },
        { t: "mc", c: "ai-storyboard-drafting", q: "What must still happen to every scene in an AI-drafted storyboard before production?", opts: ["Nothing further is needed", "A human check that it traces back to a specific learning objective, per Module 6", "Converting it to a different file format", "Removing all narration text"], a: 1, e: "Traceability to an objective is the storyboard discipline from Module 6, and it applies regardless of who or what drafted the scene." },
        { t: "sc", c: "ai-multimedia-critique", q: "An AI-generated slide idea duplicates the narration as identical on-screen text with no accessibility justification. What should the reviewer flag?", opts: ["Nothing, this is fine", "A likely redundancy-principle violation from Module 1/6, unless a legitimate exception applies", "That AI should never suggest text", "That the slide is too short"], a: 1, e: "This is the same redundancy caution from Modules 1 and 6 — it applies to AI-suggested content exactly as it would to human-drafted content." },
      ],
    },
  },
  {
    id: 23, phase: "p4", title: "AI for Accessibility",
    purpose: "Apply AI to accelerate accessibility work without treating AI as a compliance guarantee.",
    competencies: ["AI-assisted alt text/readability drafting", "Limits of AI accessibility checking"],
    prereq: [7, 16, 17], practical: "APPLIED",
    micros: [
      {
        id: "23-01", title: "Using AI to Draft Alt Text & Improve Readability", objective: "Use AI to draft alt text and improve content readability.", concepts: ["AI-assisted drafting"], m: 5,
        content: [
          "AI can quickly draft alt text for images and suggest plain-language rewrites of dense text, both genuinely time-consuming tasks to do manually at scale. Good alt text describes purpose in context (Module 7), not just literal visual content — so the draft prompt should include what the image is meant to communicate, not just what it shows.",
          "As with every Phase 4 module, the draft is a starting point: a human must confirm the alt text actually conveys the image's instructional purpose, and that a plain-language rewrite hasn't accidentally dropped necessary precision from the original.",
        ],
        recall: { t: "mc", c: "ai-accessibility-drafting", q: "Why should the prompt for AI-drafted alt text include what the image is meant to communicate, not just a description of what it shows?", opts: ["It doesn't matter what's included", "Good alt text describes purpose in context, per Module 7, not merely literal visual appearance", "AI cannot process images at all", "Alt text length is regulated by law"], a: 1, e: "Module 7 establishes that meaningful alt text conveys purpose in context — the AI needs that context to draft it well, not just a visual description request." },
      },
      {
        id: "23-02", title: "Limits of AI Accessibility Checking", objective: "Evaluate the limits of AI accessibility checking and identify what still requires human verification.", concepts: ["limits of AI checking"], m: 5,
        content: [
          "Automated accessibility checkers (AI-assisted or otherwise) are good at catching mechanical issues — missing alt attributes, insufficient contrast ratios, missing form labels. They are poor at judging whether alt text is actually meaningful in context, whether a keyboard tab order makes logical sense, or whether an interaction is genuinely usable by someone using a screen reader — these require a human check, ideally with real assistive technology or a real user.",
          "Treating a passed automated accessibility scan as proof of accessibility is the same mistake as treating LMS completion as proof of learning (Module 8) — it's evidence of one narrow thing, not the outcome itself.",
        ],
        recall: { t: "mc", c: "ai-accessibility-limits", q: "What is an accessibility issue that automated/AI checking tools commonly miss?", opts: ["Missing alt attributes on images", "Whether alt text is actually meaningful in context, or whether a screen-reader experience genuinely makes sense", "Low color contrast", "Missing form field labels"], a: 1, e: "Mechanical checks (missing attributes, contrast ratios) are exactly what automated tools catch well; contextual meaningfulness and genuine usability need human/assistive-technology verification." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "tf", c: "ai-accessibility-limits", q: "A course passing an automated accessibility scan with zero errors is proof that the course is fully accessible.", a: false, e: "A passed automated scan is evidence of mechanical compliance, not proof of genuine usability — the same completion-vs-outcome gap from Module 8." },
        { t: "mc", c: "ai-accessibility-drafting", q: "An AI-drafted alt text describes an image's colors and shapes accurately but never mentions why the image is on the page. What is missing?", opts: ["Nothing, this is complete alt text", "The purpose/meaning in context, which Module 7 identifies as what actually matters", "A longer description", "A caption instead of alt text"], a: 1, e: "Literal visual description without conveying purpose is exactly the alt-text gap Module 7 warns against." },
        { t: "sc", c: "ai-accessibility-limits", q: "Which task is best verified by a human, or with real assistive technology, rather than an automated checker alone?", opts: ["Whether an image has an alt attribute present", "Whether a screen-reader user can actually make sense of the reading order and content", "Whether text meets a minimum contrast ratio", "Whether a form field has a label attribute"], a: 1, e: "Genuine usability and sense-making for an assistive-technology user requires human/real-AT verification — mechanical presence checks are what automated tools do well." },
        { t: "mc", c: "ai-accessibility-drafting", q: "Why is manually writing alt text for every image at scale time-consuming, making AI assistance genuinely useful here?", opts: ["It isn't time-consuming", "Large courses can have many images, and AI can draft a starting point quickly for human review, similar to other Phase 4 drafting tasks", "Alt text is legally required to be AI-generated", "Alt text doesn't need review once drafted"], a: 1, e: "Scale is exactly why AI drafting assistance is valuable here — as always in Phase 4, paired with mandatory human review, not as a replacement for it." },
      ],
    },
  },
  {
    id: 24, phase: "p4", title: "AI + Moodle / H5P",
    purpose: "Apply AI to draft Moodle/H5P content and interpret LMS/SCORM/xAPI data without over-trusting either.",
    competencies: ["AI-assisted content drafting with QA", "AI-assisted learning-data interpretation"],
    prereq: [10, 11, 12, 13, 16, 17], practical: "APPLIED",
    micros: [
      {
        id: "24-01", title: "Using AI to Draft Moodle/H5P Content — with QA", objective: "Use AI to draft Moodle/H5P content and QA it before publishing.", concepts: ["AI-assisted drafting", "QA"], m: 5,
        content: [
          "AI can draft H5P activity text (branching scenario dialogue, quiz question sets) or Moodle page content from source material, following the same grounding pattern from earlier Phase 4 modules. AI should not be given responsibility for final LMS configuration or quality assurance — it can suggest content, but a human must configure completion rules, activity settings, and run the QA pass (Modules 10 and 11) before publishing.",
          "The specific risk of skipping this: an AI-drafted H5P branching scenario might have a dead-end branch, or AI-suggested Moodle completion text might not match how the completion rule is actually configured — exactly the kind of gap that only surfaces when tested as a real student (Module 10's QA discipline).",
        ],
        recall: { t: "mc", c: "ai-content-qa", q: "Why should AI-drafted H5P/Moodle content still go through a full QA pass before publishing?", opts: ["It shouldn't — AI drafts are ready to publish", "AI can produce content with structural issues (dead-end branches, mismatched completion text) that only surface through testing", "QA is only needed for human-written content", "AI-drafted content cannot be tested"], a: 1, e: "AI drafting doesn't replace the need for the same QA discipline from Modules 10–11 — structural issues in AI-drafted interactive content still need to be caught by testing." },
      },
      {
        id: "24-02", title: "Using AI to Interpret Learning Data Without Over-Trusting It", objective: "Use AI to help interpret LMS/SCORM/xAPI learning data without over-trusting the output.", concepts: ["AI-assisted data interpretation"], m: 6,
        content: [
          "AI can assist by clustering LRS/xAPI data into behavior patterns worth a human's attention, or drafting a plain-language summary of a completion/gradebook report — genuinely useful for surfacing patterns in large datasets a person might not notice.",
          "What AI must not do is become the unreviewed decision-maker about a person — an automated 'at-risk' label attached to a learner is a consequential decision needing the same controls as any consequential automation: evidence, a chance to appeal, and human sign-off. And the underlying data limitation from Module 9 still applies: AI analysis of what an LMS recorded cannot see what the LMS never recorded — a compelling-looking AI-generated insight can still be built on too narrow a data foundation to support it.",
        ],
        recall: { t: "sc", c: "ai-data-interpretation", q: "An AI tool analyzes LMS completion data and flags several learners as 'at risk of dropping out.' What is the correct next step?", opts: ["Automatically unenroll the flagged learners", "Treat the flag as a pattern worth human review, evidence-checking, and sign-off before any consequential action", "Trust the AI's label completely since it's data-driven", "Ignore the flag entirely"], a: 1, e: "A consequential, person-affecting label needs human evidence review and sign-off — it should never be treated as an unreviewed automated decision." },
      },
    ],
    postTest: {
      draw: 5,
      pool: [
        { t: "mc", c: "SCORM vs xAPI", q: "What is the essential difference between SCORM and xAPI?", opts: ["xAPI is faster to load in a browser", "SCORM reports a small fixed set of outcomes to the LMS, while xAPI records open-vocabulary statements about experiences", "SCORM is proprietary and xAPI is not", "xAPI replaces the need for an LMS"], a: 1, e: "The difference is expressive scope — a fixed vocabulary answers 'did they finish'; an open one can describe what happened." },
        { t: "tf", c: "ai-data-interpretation", q: "Because a model can help analyze open-response data, it is reasonable to let AI hold the official grade or at-risk status in the LMS unreviewed.", a: false, e: "Assistance and authority are different roles — a consequential decision about a person needs evidence, appeal, and human sign-off, not autonomous AI authority." },
        { t: "sc", c: "ai-data-interpretation", q: "A team wants an AI-powered at-risk learner model but only has SCORM completion percentages available. What is the correct first move?", opts: ["Choose a more capable AI model", "Instrument the events that would actually carry the needed signal, then revisit modeling", "Lower the threshold at which learners are flagged", "Proceed anyway using only completion data"], a: 1, e: "This is a data problem, not a model problem — no AI model recovers a signal that was never recorded (Module 9's LMS-limitations principle)." },
        { t: "mc", c: "ai-content-qa", q: "An AI-drafted H5P Branching Scenario has a path where a learner reaches a dead end with no way to complete the activity. When should this be caught?", opts: ["It doesn't need to be caught — dead ends are acceptable", "During the QA pass, testing every branch as a real student would (Module 11)", "Only if a learner complains after launch", "AI-drafted branches don't need testing"], a: 1, e: "This is exactly the kind of structural defect the QA discipline from Module 11 (test every branch) is meant to catch before publication." },
        { t: "mc", c: "ai-data-interpretation", q: "What underlying limitation from Module 9 still applies when AI analyzes LMS/LRS data?", opts: ["None — AI analysis overcomes all prior data limitations", "AI cannot analyze data that was never recorded in the first place", "AI can only analyze video content", "LMS data is always sufficient for any AI analysis"], a: 1, e: "AI analysis is still bounded by what was actually instrumented and recorded — it cannot conjure signal from data that was never captured." },
      ],
    },
    resources: [
      { title: "xAPI (Experience API) explained", source: "xAPI.com (Rustici Software)", url: "https://xapi.com/", verified: true },
    ],
  },
  {
    id: 25, phase: "p4", title: "AI + Learning Analytics & Evaluation",
    purpose: "Apply AI to summarize evaluation/analytics data while critically testing AI-generated claims against evidence.",
    competencies: ["AI-assisted evaluation-data summarization", "Critique of AI analytics claims", "Kirkpatrick-informed judgment"],
    prereq: [8, 13, 16, 17], practical: "APPLIED",
    micros: [
      {
        id: "25-01", title: "Using AI to Summarize Evaluation & Analytics Data", objective: "Use AI to summarize evaluation/analytics data from a learning program.", concepts: ["AI-assisted summarization"], m: 5,
        content: [
          "AI can draft a readable summary of evaluation data — survey free-text responses clustered into themes, an LRS dataset described in plain language — saving significant time over manual review of large datasets, and following the model: Activity Data → Pattern Detection → Human Interpretation → Intervention.",
          "AI's role in that model is Pattern Detection: surfacing patterns, anomalies, or hypotheses worth a human's attention. It is not the Human Interpretation or Intervention steps — those require the evaluator's judgment about what the pattern actually means and what, if anything, should be done about it.",
        ],
        recall: { t: "mc", c: "ai-analytics-summary", q: "In the model Activity Data → Pattern Detection → Human Interpretation → Intervention, which step is AI best suited to assist with?", opts: ["Intervention — deciding and taking action", "Pattern Detection — surfacing patterns or anomalies worth attention", "None — AI should not touch analytics data", "All four steps autonomously"], a: 1, e: "AI's role is pattern/anomaly detection; interpreting what a pattern means and deciding on intervention remain human responsibilities." },
      },
      {
        id: "25-02", title: "Critiquing AI-Generated Analytics Claims", objective: "Critique an AI-generated analytics claim against Kirkpatrick-level evidence before deciding.", concepts: ["critique of AI analytics claims"], m: 6,
        content: [
          "An AI summary might claim 'engagement dropped in Module 3, suggesting a design problem' — this is a hypothesis, not a proven cause. Testing it against Kirkpatrick/LTEM discipline (Module 8) means asking what level of evidence actually supports the claim: is 'engagement' measured as completion/time-on-page (weak, Level-below-1 evidence), or as an actual assessed learning or behavior outcome (stronger evidence)?",
          "AI must not independently determine whether learning occurred, why a learner failed, or what intervention is appropriate — those require human interpretation grounded in real evidence, exactly the completion-vs-learning discipline from Module 8, now applied to AI-generated analytics narratives specifically.",
        ],
        recall: { t: "sc", c: "ai-analytics-critique", q: "An AI tool claims 'Module 3 has a design problem' based only on a drop in time-on-page. How should this claim be handled?", opts: ["Accept it and immediately redesign Module 3", "Recognize it as a weak-evidence hypothesis (activity data, not proven learning/behavior impact) that needs further investigation before acting", "Ignore all AI-generated analytics claims", "Ask the AI to confirm its own claim again"], a: 1, e: "Time-on-page is activity data — a hypothesis worth investigating, not proof of a design problem. Module 8's completion-vs-learning discipline applies directly to AI-generated claims too." },
      },
    ],
    postTest: {
      draw: 4,
      pool: [
        { t: "mc", c: "ai-analytics-summary", q: "What is AI's appropriate role in the Activity Data → Pattern Detection → Human Interpretation → Intervention model?", opts: ["Handling all four steps autonomously", "Assisting with pattern detection, while humans handle interpretation and intervention", "Only handling intervention", "AI should not be involved in analytics at all"], a: 1, e: "Pattern detection assistance, with interpretation and intervention remaining human responsibilities, is the model this module teaches." },
        { t: "tf", c: "ai-analytics-critique", q: "An AI-generated claim about why a learner failed should be treated as sufficient grounds for an intervention decision without further human evidence-gathering.", a: false, e: "AI must not independently determine why a learner failed or what intervention fits — that requires human interpretation grounded in real evidence." },
        { t: "mc", c: "ai-analytics-critique", q: "Which piece of evidence would most strengthen a claim that a module 'improved learning,' per Kirkpatrick (Module 8)?", opts: ["Higher completion rate alone", "More time spent on the page alone", "A measured increase in post-test / assessed performance", "More forum posts"], a: 2, e: "Assessed performance is closer to actual Kirkpatrick Level 2 (Learning) evidence; completion and time-on-page are weaker activity-level signals." },
        { t: "sc", c: "ai-analytics-summary", q: "Why is AI genuinely useful for summarizing large evaluation datasets, even though it can't make the final call?", opts: ["It isn't useful for this at all", "It can surface patterns and themes across large volumes of data faster than manual review, giving humans a starting point for interpretation", "It replaces the need for any human evaluator", "It only works on numerical data, not free text"], a: 1, e: "Speed and pattern-surfacing across large datasets is the genuine value-add — interpretation and decisions still require human judgment." },
      ],
    },
  },
];

/* ============================================================================
   LAYER 2 — LOGIC
   Pure functions. Given the saved state, they derive everything the UI shows.
   No component reads raw state directly; it reads what these return.
   ========================================================================== */

const DAY_MS = 86400000;
const dstr = (d = new Date()) => {
  const x = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  return x.toISOString().slice(0, 10);
};
const diffDays = (a, b) => Math.round((Date.parse(b) - Date.parse(a)) / DAY_MS);
const shiftDate = (iso, n) => dstr(new Date(Date.parse(iso) + n * DAY_MS));
const prettyDate = (iso) =>
  new Date(iso + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short" });

const STATE_VERSION = 2; // V2 curriculum: module/microlearning shape. v1 (day-based) records are
// intentionally NOT migrated — the underlying content taxonomy changed completely (25 modules
// replace 28 unrelated days), so there is no honest 1:1 mapping. A v1 record hits the existing
// "unknown version" path below: saving is blocked, the old record is backed up, and the learner
// is offered an explicit "start fresh" — the same safety net already built for this scenario.

const EMPTY_STATE = {
  version: STATE_VERSION,
  startDate: dstr(),
  micros: {},     // microId -> { completedAt, given, correct }
  postTests: {},  // moduleId -> { attempts: [ { date, correct, total, pct, passed, detail, questionIds } ] }
};

/* --- Indexes --------------------------------------------------------------- */
const MODULE_INDEX = {};
MODULES.forEach((m) => { MODULE_INDEX[m.id] = m; });
const MICRO_INDEX = {};
MODULES.forEach((m) => m.micros.forEach((mc) => { MICRO_INDEX[mc.id] = { module: m, micro: mc }; }));
const TOTAL_MICROS = MODULES.reduce((s, m) => s + m.micros.length, 0);

const moduleById = (n) => MODULE_INDEX[n];
const microById = (id) => MICRO_INDEX[id]?.micro;
const moduleForMicro = (id) => MICRO_INDEX[id]?.module;
const phaseOfModule = (moduleId) => PHASES.find((p) => moduleId >= p.modules[0] && moduleId <= p.modules[1]);
const modulesForPhase = (phaseId) => MODULES.filter((m) => m.phase === phaseId);

/** Coerce a loaded record into the shape the rest of the app assumes.
    Anything unrecognisable is dropped rather than allowed to crash a render.
    Returns { state, dropped } so the caller can tell the user something was lost. */
function normalizeState(raw) {
  const dropped = [];
  if (!raw || typeof raw !== "object") return { state: { ...EMPTY_STATE }, dropped: ["whole record"] };

  const startDate = /^\d{4}-\d{2}-\d{2}$/.test(raw.startDate) ? raw.startDate : dstr();
  if (startDate !== raw.startDate) dropped.push("startDate");
  const isDate = (v) => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);

  const micros = {};
  Object.entries(raw.micros && typeof raw.micros === "object" ? raw.micros : {}).forEach(([k, v]) => {
    const micro = microById(k);
    if (!micro || !v || typeof v !== "object" || !isDate(v.completedAt)) { dropped.push("micro " + k); return; }
    micros[k] = { completedAt: v.completedAt, given: v.given ?? null, correct: Boolean(v.correct) };
  });

  const postTests = {};
  Object.entries(raw.postTests && typeof raw.postTests === "object" ? raw.postTests : {}).forEach(([k, v]) => {
    const mod = moduleById(Number(k));
    if (!mod || !v || typeof v !== "object" || !Array.isArray(v.attempts)) { dropped.push("postTest " + k); return; }
    const attempts = v.attempts.filter((a) => {
      const ok = a && typeof a === "object" && isDate(a.date) && typeof a.pct === "number" && Array.isArray(a.detail);
      if (!ok) dropped.push("postTest " + k + " attempt");
      return ok;
    }).map((a) => ({
      date: a.date,
      pct: Math.max(0, Math.min(100, Math.round(a.pct))),
      correct: typeof a.correct === "number" ? a.correct : 0,
      total: typeof a.total === "number" ? a.total : mod.postTest.draw,
      passed: Boolean(a.passed),
      questionIds: Array.isArray(a.questionIds) ? a.questionIds.filter((i) => Number.isInteger(i) && mod.postTest.pool[i]) : [],
      detail: a.detail
        .filter((d) => d && typeof d === "object" && d.concept)
        .map((d, i) => ({ index: typeof d.index === "number" ? d.index : i, concept: String(d.concept), correct: Boolean(d.correct), given: d.given ?? null })),
    }));
    if (attempts.length) postTests[mod.id] = { attempts };
    else dropped.push("postTest " + k + " (no usable attempts)");
  });

  return { state: { version: STATE_VERSION, startDate, micros, postTests }, dropped };
}

/* --- Micro-learning progress ------------------------------------------------ */
function microDone(state, microId) {
  return Boolean(state.micros[microId]?.completedAt);
}
function microCorrect(state, microId) {
  return Boolean(state.micros[microId]?.correct);
}
function allMicrosDone(state, moduleId) {
  const mod = moduleById(moduleId);
  return mod.micros.every((mc) => microDone(state, mc.id));
}
function microsDoneCount(state, moduleId) {
  const mod = moduleById(moduleId);
  return mod.micros.filter((mc) => microDone(state, mc.id)).length;
}
/** The first not-yet-done micro in a module, or null if all are done (post-test is next). */
function nextMicro(state, moduleId) {
  const mod = moduleById(moduleId);
  return mod.micros.find((mc) => !microDone(state, mc.id)) || null;
}
/** Sequential-progression gate for one micro-learning: reviewable if already done,
    otherwise only unlocked once every micro before it in the module is done. This is
    the actual enforcement point (used by openMicro itself, not just row styling) — a
    locked id passed in here returns false regardless of how it was requested. */
function microUnlocked(state, moduleId, microId) {
  const mod = moduleById(moduleId);
  const idx = mod.micros.findIndex((mc) => mc.id === microId);
  if (idx === -1) return false;
  if (microDone(state, microId)) return true;
  return mod.micros.slice(0, idx).every((mc) => microDone(state, mc.id));
}

/* --- Module post-test -------------------------------------------------------- */
function postTestAttempts(state, moduleId) {
  return state.postTests[moduleId]?.attempts || [];
}
function postTestBestPct(state, moduleId) {
  const a = postTestAttempts(state, moduleId);
  if (!a.length) return null;
  return Math.max(...a.map((x) => x.pct));
}
/** An attempt exists — "has sat the post-test", not "has passed it". UI copy that says
    "submitted" / "retake" reads this; anything that gates progression reads postTestPassed. */
function postTestDone(state, moduleId) {
  return postTestAttempts(state, moduleId).length > 0;
}
/** The qualifying pass, measured on the best attempt (not the latest), so a later weak
    retake cannot take away a module the learner already earned. */
function postTestPassed(state, moduleId) {
  const pct = postTestBestPct(state, moduleId);
  return pct !== null && pct >= CONFIG.passThreshold;
}
/** A module needs every micro done AND a post-test score at or above the pass mark. */
function moduleCompleted(state, moduleId) {
  return allMicrosDone(state, moduleId) && postTestPassed(state, moduleId);
}
/** All prerequisite modules must be completed — prerequisites form a DAG (see
    M19-DEPENDENCY-MAP.md), not simply "the previous module". */
function prerequisitesMet(state, moduleId) {
  const mod = moduleById(moduleId);
  return mod.prereq.every((p) => moduleCompleted(state, p));
}
/** Concise, single-target lock explanation — never lists more than one name.
    Escalates to the smallest unit that still identifies exactly what's missing:
    one unmet prereq module with exactly one micro -> name the micro;
    one unmet prereq module otherwise -> name the module;
    more than one unmet prereq module -> name the phase of the earliest one
    (module ids are already in phase order, so the lowest id is the earliest). */
function lockReason(state, moduleId) {
  const mod = moduleById(moduleId);
  const unmet = mod.prereq.filter((p) => !moduleCompleted(state, p));
  if (unmet.length === 0) return null;
  if (unmet.length === 1) {
    const u = moduleById(unmet[0]);
    return "Complete " + (u.micros.length === 1 ? u.micros[0].title : u.title) + " first.";
  }
  const ph = phaseOfModule(Math.min(...unmet));
  return "Complete Phase " + ph.number + " · " + ph.label + " first.";
}
/** locked / not-started / in-progress / completed. */
function moduleStatus(state, moduleId) {
  if (moduleCompleted(state, moduleId)) return "completed";
  if (!prerequisitesMet(state, moduleId)) return "locked";
  const doneMicros = microsDoneCount(state, moduleId);
  if (doneMicros > 0 || postTestDone(state, moduleId)) return "in-progress";
  return "not-started";
}
/** The first unlocked, not-yet-completed module, in id order. Module ids are already a
    valid topological order of the prerequisite DAG (every prereq id < its module id). */
function activeModuleId(state) {
  const next = MODULES.find((m) => !moduleCompleted(state, m.id));
  return next ? next.id : MODULES[MODULES.length - 1].id;
}
/** The date a module became fully complete (all micros + a passing post-test).
    The qualifying event is the FIRST attempt that reached the pass mark, not attempts[0]:
    fail-then-pass must date completion to the pass, or an unearned module would back-date
    into the streak. Pass-then-fail keeps the original date — a weak retake does not un-earn it. */
function moduleCompletionDate(state, moduleId) {
  if (!moduleCompleted(state, moduleId)) return null;
  const mod = moduleById(moduleId);
  const lastMicroDate = mod.micros.reduce((latest, mc) => {
    const d = state.micros[mc.id]?.completedAt;
    return d && (!latest || d > latest) ? d : latest;
  }, null);
  const attempts = postTestAttempts(state, moduleId);
  const qualifying = attempts.find((a) => a.pct >= CONFIG.passThreshold) || attempts[0];
  const t = qualifying.date;
  return lastMicroDate && lastMicroDate > t ? lastMicroDate : t;
}
function completionDates(state) {
  return MODULES.map((m) => moduleCompletionDate(state, m.id)).filter(Boolean);
}

function streakStats(state) {
  const all = [...new Set(completionDates(state))].sort();
  const today = dstr();
  // A completion cannot legitimately be dated in the future (bad device clock or a
  // hand-edited record). It still counts as completed, but must not prop up a streak.
  const future = all.filter((d) => d > today);
  const dates = all.filter((d) => d <= today);
  if (!dates.length) return { current: 0, longest: 0, total: all.length, todayDone: false, future: future.length };
  let longest = 1, run = 1;
  for (let i = 1; i < dates.length; i++) {
    run = diffDays(dates[i - 1], dates[i]) === 1 ? run + 1 : 1;
    if (run > longest) longest = run;
  }
  const gap = diffDays(dates[dates.length - 1], today);
  let current = 0;
  if (gap >= 0 && gap <= 1) {
    current = 1;
    for (let i = dates.length - 1; i > 0; i--) {
      if (diffDays(dates[i - 1], dates[i]) === 1) current++;
      else break;
    }
  }
  return { current, longest, total: all.length, todayDone: dates.includes(today), future: future.length };
}

/** Minutes studied per calendar date, from completed microlearnings. */
function minutesByDate(state) {
  const map = {};
  Object.entries(state.micros).forEach(([microId, rec]) => {
    if (!rec.completedAt) return;
    const micro = microById(microId);
    if (!micro) return;
    map[rec.completedAt] = (map[rec.completedAt] || 0) + micro.m;
  });
  return map;
}
const minutesToday = (state) => minutesByDate(state)[dstr()] || 0;

/** Knowledge credit earned for one module: share for finished micros + post-test share
    scaled by best score. */
function moduleCredit(state, moduleId) {
  const mod = moduleById(moduleId);
  const microWeight = 0.5, postTestWeight = 0.5;
  const microShare = mod.micros.length ? microsDoneCount(state, moduleId) / mod.micros.length : 0;
  let credit = microShare * microWeight;
  const pct = postTestBestPct(state, moduleId);
  if (pct !== null) credit += postTestWeight * (pct / 100);
  return credit;
}

/** Progress per module, then per phase, then overall — all derived, never stored. */
function knowledgeProgress(state) {
  const modules = MODULES.map((m) => {
    const pct = postTestBestPct(state, m.id);
    return {
      id: m.id, title: m.title, phase: m.phase,
      pct: Math.round(moduleCredit(state, m.id) * 100),
      microsDone: microsDoneCount(state, m.id),
      microsTotal: m.micros.length,
      postTestScore: pct,
      completed: moduleCompleted(state, m.id),
      status: moduleStatus(state, m.id),
    };
  });
  const phases = PHASES.map((p) => {
    const mods = modules.filter((m) => m.phase === p.id);
    return { ...p, modules: mods, pct: Math.round(mods.reduce((s, m) => s + m.pct, 0) / mods.length) };
  });
  const overall = Math.round(phases.reduce((s, p) => s + p.pct, 0) / phases.length);
  const modulesCompleted = modules.filter((m) => m.completed).length;
  const microsCompleted = Object.values(state.micros).filter((m) => m.completedAt).length;
  return { modules, phases, overall, modulesCompleted, modulesTotal: MODULES.length, microsCompleted, microsTotal: TOTAL_MICROS };
}

/** Concept-level accuracy across recall answers and post-test attempts (most recent
    post-test attempt per module, plus every recorded recall — recall is single-shot by
    design, so there is only ever one to count). Mirrors the "most recent" choice from the
    V1 app: credit rewards best-ever mastery, review reflects where the learner stands now. */
function conceptStats(state) {
  const map = {};
  const bump = (concept, correct, date) => {
    if (!map[concept]) map[concept] = { concept, attempted: 0, correct: 0, lastSeen: date };
    map[concept].attempted++;
    if (correct) map[concept].correct++;
    if (date > map[concept].lastSeen) map[concept].lastSeen = date;
  };
  Object.entries(state.micros).forEach(([microId, rec]) => {
    if (!rec.completedAt) return;
    const micro = microById(microId);
    if (!micro) return;
    bump(micro.recall.c, rec.correct, rec.completedAt);
  });
  Object.entries(state.postTests).forEach(([moduleId, t]) => {
    const a = t.attempts[t.attempts.length - 1];
    if (!a) return;
    a.detail.forEach((q) => bump(q.concept, q.correct, a.date));
  });
  return Object.values(map).map((c) => ({ ...c, accuracy: Math.round((c.correct / c.attempted) * 100) }));
}
function reviewItems(state) {
  return conceptStats(state)
    .filter((c) => c.attempted >= CONFIG.reviewMinQuestions && c.accuracy < CONFIG.reviewThreshold)
    .sort((a, b) => a.accuracy - b.accuracy);
}

/** Grading. Short answers are keyword-matched — imperfect, and labelled as such in the UI.
    { groups: [[synonym, ...], ...], need: n } — each group is ONE idea. Matching several
    synonyms inside a group still counts once, so restating a single idea three ways cannot
    satisfy need: 2. Synonyms may be in any language. Matching is case-insensitive substring,
    so entries should be stems and must not occur inside unrelated words. */
function gradeQuestion(q, given) {
  if (given === undefined || given === null || given === "") return false;
  if (q.t === "tf") return given === q.a;
  if (q.t === "sa") {
    const text = String(given).toLowerCase();
    const ideas = q.a.groups.filter((g) => g.some((k) => text.includes(String(k).toLowerCase()))).length;
    return ideas >= q.a.need;
  }
  return given === q.a;
}

/** Grade a microlearning's single recall question. Non-gated: this never blocks
    progression — it only records what was answered, for feedback and review purposes. */
function gradeRecall(micro, given) {
  const correct = gradeQuestion(micro.recall, given);
  return { completedAt: dstr(), given: given ?? null, correct };
}

/** Pick `draw` distinct random questions from a module's post-test pool. Not a pure
    function of state (uses Math.random by design — a fresh draw each attempt is the
    randomization requirement) — called once when a post-test attempt starts, and the
    resulting indices are stored with the attempt so history stays reconstructable. */
function drawPostTestQuestions(mod) {
  const n = mod.postTest.pool.length;
  const draw = Math.min(mod.postTest.draw, n);
  const idx = [...Array(n).keys()];
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx.slice(0, draw);
}
/** Grade a module post-test attempt. `questionIds` are pool indices (from
    drawPostTestQuestions); `answers` is keyed by pool index. */
function gradePostTest(mod, questionIds, answers) {
  const detail = questionIds.map((qi) => {
    const q = mod.postTest.pool[qi];
    const correct = gradeQuestion(q, answers[qi]);
    return { index: qi, concept: q.c, correct, given: answers[qi] ?? null };
  });
  const correct = detail.filter((d) => d.correct).length;
  const total = questionIds.length;
  const pct = Math.round((correct / total) * 100);
  return { date: dstr(), correct, total, pct, passed: pct >= CONFIG.passThreshold, detail, questionIds };
}

/* ============================================================================
   LAYER 3 — UI
   Presentational pieces first, then one view per navigation item.
   ========================================================================== */

// Deliberately the SAME key as V1 (not "...-v2"): the storage key is how a returning
// learner's old record is found at all. Keeping it unchanged means STATE_VERSION's mismatch
// check (below) actually runs against their real data — surfacing the "written by a
// different version" banner and backup — instead of silently missing the old key and loading
// a blank state with no explanation.
const STORAGE_KEY = "ai-learning-os-v1";
const BACKUP_KEY_PREFIX = "ai-learning-os-backup-";

/** Picks a working persistence backend for the runtime this app is actually opened in.
    `window.storage` (the Artifact host's async key-value API) is the primary backend when it's
    present and looks real (both methods are actually functions, not just a truthy stub).
    Browser `localStorage` is the fallback — the app previously had no fallback at all, so any
    runtime without `window.storage` (e.g. opened directly in a browser rather than inside an
    Artifact) silently persisted nothing and showed "Not saved — this session only" every time,
    which is functionally indistinguishable from "resets after reload". Both backends are wrapped
    in the same { get(key) -> Promise<string|null>, set(key, value) -> Promise<void> } shape so
    the load/save effects below don't need to know which one is active — only the persistence
    status copy does (see `persistNote`). Returns null when neither backend actually works (e.g.
    localStorage exists but throws on write — Safari private mode, disabled storage, full quota),
    so the app can honestly fall back to session-only rather than claim a backend that doesn't work. */
function detectStorageBackend() {
  if (typeof window === "undefined") return null;
  if (window.storage && typeof window.storage.get === "function" && typeof window.storage.set === "function") {
    return {
      backend: "artifact",
      get: async (key) => {
        const res = await window.storage.get(key);
        return res && res.value ? res.value : null;
      },
      set: async (key, value) => { await window.storage.set(key, value); },
    };
  }
  try {
    if (typeof window.localStorage === "undefined" || window.localStorage === null) return null;
    const probeKey = "__ai-learning-os-storage-probe__";
    window.localStorage.setItem(probeKey, "1");
    window.localStorage.removeItem(probeKey);
    return {
      backend: "browser",
      get: async (key) => window.localStorage.getItem(key),
      set: async (key, value) => { window.localStorage.setItem(key, value); },
    };
  } catch (e) {
    return null;
  }
}

const TONE = {
  blue: { bar: "bg-[#0058bc]", soft: "bg-blue-50", text: "text-[#0058bc]", ring: "ring-blue-200" },
  emerald: { bar: "bg-emerald-600", soft: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  orange: { bar: "bg-orange-500", soft: "bg-orange-50", text: "text-orange-700", ring: "ring-orange-200" },
  rose: { bar: "bg-[#ba1a1a]", soft: "bg-[#ffdad6]", text: "text-[#ba1a1a]", ring: "ring-rose-200" },
  slate: { bar: "bg-[#c1c6d7]", soft: "bg-[#efedf3]", text: "text-[#414755]", ring: "ring-slate-200" },
};

// tone="dark" is for the slate-900 cards: slate-500 reaches only 3.75:1 there, while
// slate-300 reaches 12:1. On white, slate-500 is 4.76:1 and slate-400 was only 2.56:1,
// which failed WCAG AA for section labels, question-type labels and the footer.
function Eyebrow({ children, className = "", tone = "light" }) {
  const colour = tone === "dark" ? "text-slate-300" : "text-[#414755]";
  return <p className={"text-xs font-semibold uppercase tracking-widest " + colour + " " + className}>{children}</p>;
}

/** `threshold` (0-100, optional) marks a required-score line, e.g. the post-test pass mark. */
function Bar({ pct, tone = "blue", height = "h-2", threshold }) {
  return (
    <div className={"relative w-full rounded-full bg-[#e3e2e7] " + height} role="presentation">
      <div className={"rounded-full motion-safe:transition-all motion-safe:duration-500 " + TONE[tone].bar + " " + height} style={{ width: Math.max(pct, 0) + "%" }} />
      {threshold != null && (
        <span aria-hidden="true" className="absolute inset-y-0 w-0.5 bg-[#717786]/70" style={{ left: threshold + "%" }} />
      )}
    </div>
  );
}

function Pill({ children, tone = "slate", icon: Icon }) {
  return (
    <span className={"inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium " + TONE[tone].soft + " " + TONE[tone].text}>
      {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
      {children}
    </span>
  );
}

function Button({ children, onClick, variant = "primary", size = "md", disabled, icon: Icon, className = "" }) {
  const base = "inline-flex items-center justify-center gap-2 font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40";
  const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-4 py-2.5 text-sm", lg: "px-5 py-3 text-base" };
  const variants = {
    // Aetheris primary CTA: pill-shaped, primary blue, no border.
    primary: "rounded-full bg-[#0058bc] text-white hover:bg-[#004493]",
    // Pill-shaped, per DESIGN-SYSTEM-MASTER.md §6 — a visible-but-not-dominant action
    // alongside a primary CTA (distinct from `outline`, which is for inline recovery
    // actions like MicroView's "Try again", not CTA-adjacent choices).
    secondary: "rounded-full bg-[#efedf3] text-[#1a1b1f] hover:bg-[#e3e2e7]",
    ghost: "rounded-lg text-[#414755] hover:bg-[#efedf3] hover:text-[#1a1b1f]",
    outline: "rounded-lg border border-[#c1c6d7] bg-white text-[#414755] hover:bg-[#f4f3f8] hover:text-[#1a1b1f]",
    danger: "rounded-lg border border-[#ffdad6] bg-white text-[#ba1a1a] hover:bg-[#ffdad6]/40",
  };
  return (
    <button type="button" onClick={onClick} disabled={disabled} className={[base, sizes[size], variants[variant], className].join(" ")}>
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {children}
    </button>
  );
}

/** Systemized back navigation (DESIGN-SYSTEM-MASTER.md §6/§15).
    The circular ghost treatment keeps Back secondary to the page's primary action while
    remaining discoverable through the accessible label and native tooltip. `tone="muted"`
    is for placement on a large hero (Introduction) where the control should recede further
    than it does inline atop a working screen. */
function BackButton({ children = "Back", onClick, tone = "default", className = "" }) {
  const label = typeof children === "string" ? children : "Back";
  const toneClass = tone === "muted" ? "text-[#717786] hover:border-[#717786] hover:text-[#1a1b1f]" : "text-[#414755] hover:border-[#717786] hover:text-[#1a1b1f]";
  return (
    <button type="button" onClick={onClick} aria-label={label} title={label}
      className={"inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c1c6d7] bg-transparent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 " + toneClass + " " + className}>
      <ChevronLeft className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </button>
  );
}

function Card({ children, className = "" }) {
  return <div className={"rounded-xl border border-[#c1c6d7] bg-white " + className}>{children}</div>;
}

/* The signature element, adapted for V2: one block per microlearning in a module, sized
   by its target duration, coloured by completion. Same visual language as the V1 hour
   ribbon, now representing a module's micro-learnings instead of one day's timed segments. */
function MicroRibbon({ module, state, onOpenMicro, activeId = null, compact = false }) {
  return (
    <div className="w-full">
      <div className={"flex w-full gap-1 " + (compact ? "h-2.5" : "h-3")}>
        {module.micros.map((mc) => {
          const done = microDone(state, mc.id);
          const active = mc.id === activeId && !done;
          return (
            <button
              key={mc.id}
              type="button"
              disabled={!onOpenMicro}
              onClick={() => onOpenMicro && onOpenMicro(mc.id)}
              title={mc.title + " · ~" + mc.m + " min"}
              aria-label={mc.title + (done ? ", done" : active ? ", current" : onOpenMicro ? ", not done" : "")}
              className={
                "h-full rounded-full transition-colors " +
                (done ? "bg-[#0058bc]" : active ? "bg-[#efedf3] ring-1 ring-inset ring-[#0058bc]" : "bg-[#e3e2e7]") +
                (onOpenMicro ? " hover:bg-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" : "")
              }
              style={{ flexGrow: mc.m, flexBasis: 0 }}
            />
          );
        })}
      </div>
      {!compact && (
        <div className="mt-2 flex w-full gap-1">
          {module.micros.map((mc) => (
            <div key={mc.id} className="min-w-0" style={{ flexGrow: mc.m, flexBasis: 0 }}>
              <p className="truncate text-xs font-medium text-[#414755]">{mc.title}</p>
              <p className="text-xs tabular-nums text-[#717786]">~{mc.m} min</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const STATUS_META = {
  completed: { label: "Completed", tone: "emerald", icon: CheckCircle2 },
  "in-progress": { label: "In progress", tone: "blue", icon: Circle },
  "not-started": { label: "Not started", tone: "slate", icon: Circle },
  locked: { label: "Locked", tone: "slate", icon: Lock },
};

function StatTile({ icon: Icon, label, value, sub, tone = "slate" }) {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2">
        <Icon className={"h-4 w-4 " + TONE[tone].text} />
        <p className="text-xs font-medium uppercase tracking-wide text-[#717786]">{label}</p>
      </div>
      <p className={"mt-2 font-semibold tabular-nums tracking-tight text-[#1a1b1f] " + (String(value).length > 11 ? "text-lg" : "text-2xl")}>{value}</p>
      {sub ? <p className="mt-0.5 text-xs text-[#717786]">{sub}</p> : null}
    </Card>
  );
}

function ResourceList({ resources }) {
  if (!resources || !resources.length) return null;
  return (
    <div className="mt-2 divide-y divide-[#e9e7ed]">
      {resources.map((r, i) => (
        <a key={i} href={r.url} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 py-2.5 text-sm hover:bg-[#f4f3f8]">
          <span className="min-w-0">
            <span className="font-medium text-[#1a1b1f]">{r.title}</span>
            <span className="ml-2 text-[#717786]">{r.source}</span>
          </span>
          <span className="flex shrink-0 items-center gap-2">
            {r.verified ? <Pill tone="emerald">Verified</Pill> : <Pill tone="orange" icon={AlertTriangle}>Unverified</Pill>}
            <ExternalLink className="h-3.5 w-3.5 text-[#717786]" />
          </span>
        </a>
      ))}
    </div>
  );
}

/* --- Answer input, shared by MicroView's recall and PostTestView's items ------------- */
function QuestionInput({ q, given, onChange, idx }) {
  return (
    <>
      {/* No left padding/inset on the option row: the radio (and the answer text that
          follows it via gap-3) starts flush at the same left edge as the lesson content
          and the question above it — the row's own left boundary IS the shared content
          column, not a padded box sitting inside it. */}
      {(q.t === "mc" || q.t === "sc") && (
        <div className="mt-3 space-y-0.5" role="radiogroup" aria-labelledby={"q" + idx + "-label"}>
          {q.opts.map((o, oi) => (
            <label key={oi} className={"flex cursor-pointer items-start gap-3 rounded-md py-2 pr-2.5 text-sm transition-colors " + (given === oi ? "bg-blue-50" : "hover:bg-[#f4f3f8]")}>
              <input type="radio" name={"q" + idx} checked={given === oi} onChange={() => onChange(oi)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#0058bc]" />
              <span className={given === oi ? "text-[#0058bc]" : "text-[#414755]"}>{o}</span>
            </label>
          ))}
        </div>
      )}
      {q.t === "tf" && (
        <div className="mt-3 flex gap-2" role="group" aria-labelledby={"q" + idx + "-label"}>
          {[true, false].map((v) => (
            <button key={String(v)} type="button" onClick={() => onChange(v)} aria-pressed={given === v}
              className={"rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0058bc] focus-visible:ring-offset-2 " + (given === v ? "bg-blue-50 text-[#0058bc]" : "text-[#414755] hover:bg-[#f4f3f8]")}>
              {v ? "True" : "False"}
            </button>
          ))}
        </div>
      )}
      {q.t === "sa" && (
        <textarea rows={3} value={given || ""} onChange={(e) => onChange(e.target.value)}
          aria-labelledby={"q" + idx + "-label"}
          placeholder="Your own words — English or Bahasa Indonesia..."
          className="mt-3 w-full rounded-lg border border-[#c1c6d7] p-3 text-sm text-[#1a1b1f] focus:border-[#0058bc] focus:outline-none focus:ring-1 focus:ring-[#0058bc]" />
      )}
    </>
  );
}

/* --- Micro-learning view ---------------------------------------------------- */

function MicroView({ module, micro, state, onSubmitRecall, onContinue, onBack }) {
  const already = microDone(state, micro.id);
  const [given, setGiven] = useState(already ? state.micros[micro.id].given : null);
  const [checked, setChecked] = useState(already);
  const idx = module.micros.findIndex((m) => m.id === micro.id);
  const isLast = idx === module.micros.length - 1;
  const answered = given !== null && given !== undefined && given !== "";

  const check = () => {
    setChecked(true);
    onSubmitRecall(given);
  };
  const retry = () => {
    setChecked(false);
    setGiven(null);
  };
  const correct = checked ? gradeQuestion(micro.recall, given) : false;
  const answerText = micro.recall.t === "tf" ? (micro.recall.a ? "True" : "False")
    : micro.recall.t === "sa" ? micro.recall.a.model
    : micro.recall.opts[micro.recall.a];

  return (
    <div className="mx-auto max-w-2xl">
      <BackButton onClick={onBack} className="mb-4">Back to module</BackButton>

      {/* Persistent but subtle position-in-module indicator — reuses the signature ribbon. */}
      <MicroRibbon module={module} state={state} activeId={micro.id} compact />
      <p className="mt-2 text-xs text-[#414755]">Micro {idx + 1} of {module.micros.length} · ~{micro.m} min{already ? " · done" : ""}</p>

      <Eyebrow className="mt-6">Module {module.id} · {module.title}</Eyebrow>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a1b1f] sm:text-3xl">{micro.title}</h1>
      <p className="mt-3 flex gap-2 text-sm leading-relaxed text-[#414755]">
        <Target className="mt-0.5 h-4 w-4 shrink-0 text-[#0058bc]" /><span>{micro.objective}</span>
      </p>

      {/* Lesson content is the focal point: continuous reading, not stacked cards. */}
      <div className="mt-6 space-y-4">
        {micro.content.map((p, i) => (
          <p key={i} className="text-[15px] leading-relaxed text-[#1a1b1f]">{p}</p>
        ))}
      </div>

      {/* Recall check — a checkpoint in the reading flow, not a separate quiz widget:
          a hairline (not a filled box) marks the transition, the question reads like the
          next line of content, and QuestionInput no longer renders each option as its own
          bordered card (see below) — the content stays the primary experience throughout. */}
      <div className="mt-10 border-t border-[#c1c6d7] pt-6">
        <Eyebrow>Recall check</Eyebrow>
        <p className="mt-1 text-sm text-[#414755]">One question to reinforce what you just learned — not a gate, just practice.</p>
        <p id="recall-label" className="mt-4 text-base font-medium leading-relaxed text-[#1a1b1f]">{micro.recall.q}</p>
        <fieldset disabled={checked}>
          <QuestionInput q={micro.recall} given={given} onChange={setGiven} idx="recall" />
        </fieldset>

        {!checked ? (
          <Button className="mt-4" onClick={check} disabled={!answered}>Check answer</Button>
        ) : (
          <div className={"mt-4 rounded-lg p-4 " + (correct ? "bg-emerald-50" : "bg-rose-50")} role="status" aria-live="polite">
            <p className={"flex items-center gap-2 text-sm font-semibold " + (correct ? "text-emerald-800" : "text-rose-800")}>
              {correct ? <CheckCircle2 className="h-4 w-4" /> : <X className="h-4 w-4" />}
              {correct ? "Correct" : "Not quite"}
            </p>
            {!correct && <p className="mt-2 text-sm text-[#414755]">{micro.recall.t === "sa" ? "Model answer" : "Correct answer"}: <span className="font-medium text-[#1a1b1f]">{answerText}</span></p>}
            <p className="mt-2 text-sm leading-relaxed text-[#414755]">{micro.recall.e}</p>
            {!correct && (
              <Button className="mt-3" size="sm" variant="outline" onClick={retry}>Try again</Button>
            )}
          </div>
        )}
      </div>

      {checked && correct && (
        <div className="mt-6">
          <Button size="lg" icon={isLast ? Award : ArrowRight} onClick={onContinue}>
            {isLast ? "Continue to module post-test" : "Continue"}
          </Button>
        </div>
      )}
    </div>
  );
}

/* --- Module view (list of micro-learnings + post-test entry) ---------------- */

/** Same mount-then-flip-a-frame entrance as Entry/Introduction's own local copies —
    a fresh instance of the same small pattern, not a shared import, so this screen's
    motion can evolve independently of theirs (and vice versa). */
function useModuleEnter(reducedMotion) {
  const [entered, setEntered] = useState(reducedMotion);
  useEffect(() => {
    if (reducedMotion) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);
  return entered;
}

/** Module Overview — the focused landing scene for "this module": where am I, what am
    I about to learn, how far in, what's next. The main canvas answers only that (no
    path, no post-test detail, no resources); the full learning path lives in an
    optional drawer the learner opens on demand (see ModuleLearningPathDrawer below),
    so orientation is available without being mandatory reading. */
function ModuleView({ module, state, onOpenMicro, onOpenPostTest, onOpenModule, onBack }) {
  const reducedMotion = useReducedMotionPref();
  const entered = useModuleEnter(reducedMotion);
  const [pathOpen, setPathOpen] = useState(false);
  const pathTriggerRef = useRef(null);
  const pathDrawerRef = useRef(null);

  const done = microsDoneCount(state, module.id);
  const total = module.micros.length;
  const attempts = postTestAttempts(state, module.id);
  const passed = postTestPassed(state, module.id);
  const phase = phaseOfModule(module.id);
  const status = moduleStatus(state, module.id);
  const next = nextMicro(state, module.id);
  const started = done > 0 || postTestDone(state, module.id);

  // Exactly one primary action, and only for the current module's own micro-learning
  // progression — no post-test detail and no "next module" branch here (that context
  // now lives in the drawer). Once every micro is done and the post-test is passed,
  // there is genuinely nothing left to do in *this* module — the completed-state block
  // below takes over instead of this CTA (see `completedNextModule`/`journeyComplete`).
  let ctaLabel = null, ctaAction = null;
  if (next) {
    ctaLabel = started ? "Continue Learning" : "Start Learning";
    ctaAction = () => onOpenMicro(next.id);
  } else if (!passed) {
    ctaLabel = attempts.length ? "Retake Post-Test" : "Start Post-Test";
    ctaAction = onOpenPostTest;
  }

  // Module completion moment (approved UX decision — see DESIGN-SYSTEM-MASTER.md §9/§14).
  // Reads only existing derived state (activeModuleId, postTestBestPct, moduleCompletionDate)
  // — no new Layer 2 logic. activeModuleId(state) is "the first not-yet-completed module in id
  // order"; since module ids are already a valid topological order of the prerequisite DAG
  // (every prereq id < its own id — enforced by verify.mjs), the module it returns right after
  // *this* one completes is guaranteed unlocked: everything up to and including this module is
  // now done, and that next module's prereqs can only point at modules ≤ this one. Falls back to
  // this module's own id only when it's the last one and the whole journey is complete.
  const completed = status === "completed";
  const globalNextId = completed ? activeModuleId(state) : null;
  const completedNextModule = completed && globalNextId !== module.id ? moduleById(globalNextId) : null;
  const journeyComplete = completed && globalNextId === module.id;

  const fx = (delayMs) => reducedMotion ? undefined : {
    transition: "opacity 350ms ease-out " + delayMs + "ms, transform 350ms ease-out " + delayMs + "ms",
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(8px)",
  };

  // Focus trap + Escape-to-close + focus restoration, the same convention the app's
  // existing mobile nav drawer already uses — a fresh local copy since this drawer's
  // lifetime belongs to ModuleView, not the app shell.
  useEffect(() => {
    if (!pathOpen) return;
    const panel = pathDrawerRef.current;
    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const items = () => (panel ? panel.querySelectorAll(focusableSelector) : []);
    (items()[0] || panel)?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") { setPathOpen(false); return; }
      if (e.key !== "Tab" || !panel) return;
      const list = items();
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      pathTriggerRef.current?.focus();
    };
  }, [pathOpen]);

  return (
    // Back stays pinned near the top, in normal flow — only the content cluster below
    // it (flex-1 + justify-center) gets the "chapter opening" vertical centering, the
    // same split Introduction uses for its own Back control. min-h-[70vh] approximates
    // the viewport without fighting <main>'s own padding the way min-h-screen would —
    // comfortably clear of overflow even at the shortest target viewport.
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col">
      <BackButton onClick={onBack} className="mb-4">Back</BackButton>

      {/* Keep the chapter-opening cluster slightly above center, but let the progress block
          below give the screen a real visual anchor instead of leaving the learner with a
          headline and a floating CTA in a mostly empty canvas. */}
      <div className="flex flex-1 -translate-y-4 flex-col justify-center">
        {/* WHERE AM I / WHAT AM I LEARNING — greeting, then phase/module position (tertiary),
            then the current focus as the strongest text on the screen, then its module/
            category context (secondary). Title+subtitle read as one block (tight mt-2/mt-3
            rhythm); the gap before the action block below is the one clear seam in the
            scene. */}
        <div style={fx(0)}>
          {completed ? (
            <div className="flex max-w-xl items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/60 px-4 py-3 text-emerald-800">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide">Module complete</p>
                <p className="mt-0.5 text-xs text-[#414755]">You’ve completed this module. Your next step is below.</p>
              </div>
            </div>
          ) : (
            <p className="text-xs font-semibold uppercase tracking-wide text-[#414755]">{greeting()}</p>
          )}
          <p className="mt-1.5 text-xs text-[#414755]">
            Phase {phase?.number} · {phase?.label} · Module {module.id} of {MODULES.length}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#1a1b1f] sm:text-5xl">
            {next ? next.title : module.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#414755]">
            {next ? "Next in " + module.title : module.purpose}
          </p>
          {/* A restrained, editorial reward: the earned score and when it was earned — reads
              existing derived data only, no new state. No badge, no confetti, no modal. */}
          {completed && (
            <p className="mt-4 flex items-center gap-1.5 text-xs text-[#414755]">
              <Award className="h-3.5 w-3.5 text-emerald-700" />
              Best score {postTestBestPct(state, module.id)}% · completed {prettyDate(moduleCompletionDate(state, module.id))}
            </p>
          )}
        </div>

        <div style={fx(80)} className="mt-8 max-w-2xl border-y border-[#c1c6d7] py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Eyebrow>Module progress</Eyebrow>
            <p className="text-xs tabular-nums text-[#414755]">{done} of {total} completed</p>
          </div>
          <div className="mt-4">
            <MicroRibbon module={module} state={state} onOpenMicro={onOpenMicro} activeId={next?.id} />
          </div>
          {next && (
            <p className="mt-3 text-xs text-[#414755]">Next up · {next.title} · ~{next.m} min</p>
          )}
        </div>

        {/* WHAT SHOULD I DO NEXT — compact progress as a count, then the one primary action.
            Completed state swaps this for the module-completion moment: a direct path to
            whatever module is next in the learner's journey (or, on the very last module, a
            calm closing line — no CTA, since there is genuinely nothing left to continue to). */}
        <div style={fx(160)} className="mt-10 flex flex-col items-start gap-3">
          {completed ? (
            completedNextModule ? (
              <>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#414755]">Next module</p>
                  <p className="mt-1 text-sm text-[#414755]">{completedNextModule.title}</p>
                </div>
                <Button size="lg" icon={ArrowRight} onClick={() => onOpenModule(completedNextModule.id)}>
                  Continue to Module {completedNextModule.id}
                </Button>
              </>
            ) : journeyComplete ? (
              <>
                <p className="text-sm leading-relaxed text-[#414755]">You've completed every module in the journey.</p>
                <Button variant="secondary" onClick={onBack}>Back to Journey</Button>
              </>
            ) : null
          ) : (
            <>
              {ctaLabel && <Button size="lg" icon={ArrowRight} onClick={ctaAction}>{ctaLabel}</Button>}
            </>
          )}
        </div>
      </div>

      {/* Learning-path rail trigger — a small, non-intrusive tab pinned to the viewport
          edge rather than a permanently allocated column. Opens the full path only when
          the learner explicitly wants orientation. */}
      <button ref={pathTriggerRef} onClick={() => setPathOpen((o) => !o)}
        aria-expanded={pathOpen} aria-controls="module-learning-path-drawer"
        className="fixed right-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-1.5 rounded-l-lg border border-r-0 border-[#c1c6d7] bg-white py-3 pl-2 pr-1.5 text-[#414755] shadow-sm transition-colors hover:bg-[#f4f3f8] hover:text-[#1a1b1f] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
        <ChevronLeft className={"h-3.5 w-3.5 transition-transform " + (pathOpen ? "rotate-180" : "")} />
        <span className="text-[11px] font-semibold uppercase tracking-wide [writing-mode:vertical-rl]">Learning Path</span>
      </button>

      <ModuleLearningPathDrawer module={module} state={state} open={pathOpen} onClose={() => setPathOpen(false)}
        onOpenMicro={onOpenMicro} onOpenPostTest={onOpenPostTest} next={next} phase={phase}
        reducedMotion={reducedMotion} drawerRef={pathDrawerRef} />
    </div>
  );
}

/** The learning path, moved out of the main canvas into an optional overlay drawer.
    Always mounted (so open/close can transition smoothly) but visually and functionally
    inert — zero opacity, translated off to the side, pointer-events none — while closed,
    so it never consumes viewport space or intercepts input when the learner hasn't asked
    for it. Locked rows are real disabled <button>s, not just muted styling: the actual
    enforcement lives in onOpenMicro/onOpenPostTest (see LearningDashboard), but a
    disabled control is a second, independent guarantee that a locked row cannot fire a
    click at all. */
function ModuleLearningPathDrawer({ module, state, open, onClose, onOpenMicro, onOpenPostTest, next, phase, reducedMotion, drawerRef }) {
  const done = microsDoneCount(state, module.id);
  const allDone = allMicrosDone(state, module.id);
  const attempts = postTestAttempts(state, module.id);
  const best = postTestBestPct(state, module.id);
  const passed = postTestPassed(state, module.id);

  const panelStyle = {
    ...(reducedMotion ? {} : { transition: "transform 200ms ease-out, opacity 200ms ease-out" }),
    transform: open ? "translateX(0)" : "translateX(16px)",
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
  };
  const backdropStyle = {
    ...(reducedMotion ? {} : { transition: "opacity 200ms ease-out" }),
    opacity: open ? 1 : 0,
    pointerEvents: open ? "auto" : "none",
  };

  return (
    <>
      <div aria-hidden="true" onClick={onClose} style={backdropStyle} className="fixed inset-0 z-30 bg-[#1a1b1f]/20" />
      <div ref={drawerRef} id="module-learning-path-drawer" role="dialog" aria-modal="true" aria-label="Learning path"
        style={panelStyle} onClick={(e) => e.stopPropagation()}
        className="fixed right-0 top-0 z-40 h-full w-full max-w-sm overflow-y-auto border-l border-[#c1c6d7] bg-[#f4f3f8] p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#414755]">Learning Path</p>
            <p className="mt-1 text-sm font-medium text-[#414755]">Phase {phase?.number} · {phase?.label}</p>
          </div>
          <button onClick={onClose} aria-label="Close learning path" className="shrink-0 rounded p-1 text-[#414755] hover:bg-[#e9e7ed] hover:text-[#1a1b1f] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-6">
          {module.micros.map((mc, i) => {
            const mdone = microDone(state, mc.id);
            const mcorrect = microCorrect(state, mc.id);
            const unlocked = microUnlocked(state, module.id, mc.id);
            const isNext = !mdone && next?.id === mc.id;
            return (
              <div key={mc.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
                    (mdone && mcorrect ? "bg-emerald-600 text-white"
                      : mdone ? "bg-orange-500 text-white"
                      : isNext ? "bg-[#0058bc] text-white ring-4 ring-blue-100"
                      : !unlocked ? "border-2 border-[#e3e2e7] text-[#c1c6d7]"
                      : "border-2 border-[#c1c6d7] text-[#414755]")}>
                    {mdone ? (mcorrect ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />)
                      : !unlocked ? <Lock className="h-3.5 w-3.5" /> : i + 1}
                  </span>
                  <span className="mt-1 w-px flex-1 bg-[#c1c6d7]" />
                </div>
                <button disabled={!unlocked} onClick={() => unlocked && onOpenMicro(mc.id)}
                  className={"grid min-w-0 flex-1 grid-cols-[1fr_auto] items-start gap-x-3 gap-y-1 rounded-lg px-3 py-2.5 pb-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed " +
                    (isNext ? "bg-blue-50/70 hover:bg-blue-50" : unlocked ? "hover:bg-white" : "")}>
                  <p className={"col-span-2 text-sm " + (isNext ? "font-semibold text-[#1a1b1f]" : mdone ? "font-medium text-[#414755]" : unlocked ? "font-medium text-[#1a1b1f]" : "font-medium text-[#717786]")}>{mc.title}</p>
                  <p className="text-xs text-[#414755]">
                    {!unlocked ? "Locked" : "~" + mc.m + " min" + (mdone ? (mcorrect ? " · answered correctly" : " · reviewed") : "")}
                  </p>
                  {isNext && <span className="shrink-0 self-center text-xs font-medium text-[#0058bc]">{done === 0 ? "Start" : "Continue"}</span>}
                </button>
              </div>
            );
          })}

          {/* Post-test — visually distinct from a micro-learning (Award/GraduationCap or
              Lock, never a number), same locked/disabled treatment as the micros above. */}
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
                (passed ? "bg-emerald-600 text-white" : allDone ? "bg-[#0058bc] text-white ring-4 ring-blue-100" : "border-2 border-[#e3e2e7] text-[#c1c6d7]")}>
                {passed ? <Award className="h-4 w-4" /> : allDone ? <GraduationCap className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
              </span>
            </div>
            <div className="min-w-0 flex-1 px-3 py-2.5">
              <p className={"text-sm font-semibold " + (allDone ? "text-[#1a1b1f]" : "text-[#717786]")}>Module post-test</p>
              <p className="mt-1 text-xs text-[#414755]">
                {!allDone
                  ? "Locked — unlocks once all micro-learnings above are done"
                  : !attempts.length
                  ? module.postTest.draw + " questions from a " + module.postTest.pool.length + "-question pool · pass mark " + CONFIG.passThreshold + "%"
                  : passed
                  ? "Best score " + best + "% — complete. Retaking is optional and can never cost you a module you've already earned."
                  : "Best score " + best + "%, below the " + CONFIG.passThreshold + "% pass mark — retake when ready, each attempt draws a fresh set."}
              </p>
              {allDone && (
                <button onClick={onOpenPostTest} className="mt-2 text-xs font-medium text-[#0058bc] hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded">
                  {!attempts.length ? "Start post-test" : "Retake post-test"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* --- Dashboard home ------------------------------------------------------- */

/* A module as one step on the path, not a database-record card: a status node connected
   to the next step by a line, active module weighted, locked ones subdued. Every row —
   active, completed, locked — is the SAME grid ([title|status] over [ribbon|status]), so
   the title, ribbon and status/action word share one structural axis regardless of state:
   nothing shifts because a row happens to be locked or has no ribbon to show. */
function ModuleCard({ module, state, onOpenModule, isActive, isLast }) {
  const status = moduleStatus(state, module.id);
  const done = microsDoneCount(state, module.id);
  const total = module.micros.length;
  const locked = status === "locked";
  const completed = status === "completed";
  const [showLockHint, setShowLockHint] = useState(false);
  const statusWord = locked ? "Locked" : isActive ? (done === 0 ? "Start" : "Continue") : STATUS_META[status].label;

  return (
    <div className="flex gap-4">
      {/* pt-2.5 here is not a cosmetic nudge — it equals the button's own py-2.5, so the
          node column and the button start from the exact same top edge. That equal top
          offset, plus the title's own min-h-8 (matching the node's h-8) with its text
          vertically centered, is what makes the node's center land on the title's center
          for every state — not a per-row pixel correction. */}
      <div className="flex flex-col items-center pt-2.5">
        <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
          (completed ? "bg-emerald-600 text-white"
            : isActive ? "bg-[#0058bc] text-white ring-4 ring-blue-100"
            : locked ? "bg-[#efedf3] text-[#717786]"
            : "border-2 border-[#c1c6d7] text-[#414755]")}>
          {completed ? <CheckCircle2 className="h-4 w-4" /> : locked ? <Lock className="h-3.5 w-3.5" /> : module.id}
        </span>
        {!isLast && <span className={"mt-1 w-px flex-1 " + (completed ? "bg-emerald-200" : "bg-[#c1c6d7]")} />}
      </div>
      <div className="min-w-0 flex-1 pb-6">
        <button
          onClick={() => (locked ? setShowLockHint((v) => !v) : onOpenModule(module.id))}
          aria-describedby={locked ? "lock-hint-" + module.id : undefined}
          className={"grid w-full grid-cols-[1fr_auto] items-start gap-x-3 gap-y-1.5 rounded-lg px-3 py-2.5 text-left transition-colors " +
            (isActive ? "bg-blue-50/70 hover:bg-blue-50" : locked ? "cursor-default" : "hover:bg-[#f4f3f8]")}>
          <p className={"col-span-2 flex min-h-8 items-center text-sm " +
            (isActive ? "font-semibold text-[#1a1b1f]" : locked ? "font-medium text-[#717786]" : completed ? "font-medium text-[#414755]" : "font-medium text-[#1a1b1f]")}>
            {module.title}
          </p>
          <div className="min-w-0"><MicroRibbon module={module} state={state} compact /></div>
          <span className={"shrink-0 self-center text-xs font-medium " +
            (isActive ? "text-[#0058bc]" : locked ? "text-[#717786]" : completed ? "text-emerald-700" : "text-[#414755]")}>
            {statusWord}
          </span>
        </button>
        {locked && showLockHint && (
          <p id={"lock-hint-" + module.id} role="status" className="mt-1 flex items-center gap-1 px-3 text-xs text-[#717786]">
            <Lock className="h-3 w-3 shrink-0" /> {lockReason(state, module.id)}
          </p>
        )}
      </div>
    </div>
  );
}

/** Most recent learning events for the Dashboard's activity strip. A display-only read
    of existing state (micro completions + post-test attempts) — not a new progress
    calculation; moduleCredit/streakStats/knowledgeProgress are untouched and remain the
    only source of truth for scoring and completion. */
function recentActivity(state, limit = 4) {
  const events = [];
  Object.entries(state.micros).forEach(([id, rec]) => {
    if (rec.completedAt) {
      const mc = microById(id);
      if (mc) events.push({ date: rec.completedAt, kind: "micro", title: mc.title, correct: rec.correct });
    }
  });
  Object.entries(state.postTests).forEach(([moduleId, rec]) => {
    (rec.attempts || []).forEach((a) => {
      const mod = moduleById(Number(moduleId));
      if (mod) events.push({ date: a.date, kind: "posttest", title: mod.title, passed: a.passed, pct: a.pct });
    });
  });
  return events.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)).slice(0, limit);
}

/** Time-of-day label for the dashboard hero — presentational only, not persisted state. */
function greeting(now = new Date()) {
  const h = now.getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

/* Journey is the learner's home: WHERE AM I / WHAT AM I DOING NOW / WHAT HAVE I
   COMPLETED / WHAT COMES NEXT, in that priority order. It absorbs what used to be three
   separate destinations (Dashboard, Modules, Progress) — the current phase's module path
   renders inline (reusing ModuleCard, unchanged) instead of requiring a click to another
   page, and the other phases collapse to one line each so the page stays a journey, not
   a 25-module browse list. Nothing here computes anything new: every value comes from
   the same derived.* / Layer 2 functions the old Dashboard and ModuleListView already used. */
function JourneyView({ state, derived, onOpenModule, onOpenMicro, onGo }) {
  const active = moduleById(derived.activeId);
  const activeStatus = moduleStatus(state, active.id);
  const activePhase = phaseOfModule(active.id);
  const activeDone = microsDoneCount(state, active.id);
  const activeStarted = activeDone > 0 || postTestDone(state, active.id);
  const next = nextMicro(state, active.id);
  const recent = recentActivity(state);

  const phases = derived.progress.phases;
  const currentPhaseIndex = phases.findIndex((p) => p.id === activePhase?.id);
  const segment = 100 / phases.length;
  const journeyFillPct = currentPhaseIndex < 0 ? 0
    : currentPhaseIndex * segment + segment * (phases[currentPhaseIndex].pct / 100);

  // Which phases the learner has manually toggled away from the default (current phase
  // open, everything else closed). Not app state, not persisted — purely a UI expansion
  // preference that resets whenever Journey remounts (e.g. after finishing a module).
  const [toggled, setToggled] = useState(() => new Set());
  const isExpanded = (phaseId) => {
    const manual = toggled.has(phaseId);
    return phaseId === activePhase?.id ? !manual : manual;
  };
  const togglePhase = (phaseId) => setToggled((s) => {
    const next = new Set(s);
    if (next.has(phaseId)) next.delete(phaseId); else next.add(phaseId);
    return next;
  });

  return (
    <div className="mx-auto max-w-5xl">
      {/* WHAT AM I DOING NOW — the one dominant action on the page. A large pale module
          numeral anchors the horizontal composition (desktop-only); breadcrumb states
          WHERE, headline + CTA state WHAT NOW. No card: a hairline below is the only
          separation. The signature MicroRibbon ties this to the module's own progress. */}
      <div className="grid grid-cols-[auto_1fr] items-start gap-x-6 border-b border-[#c1c6d7] pb-10 sm:gap-x-10">
        <p aria-hidden="true" className="hidden select-none pt-1 text-7xl font-bold leading-none tabular-nums text-[#efedf3] sm:block sm:text-8xl">
          {String(active.id).padStart(2, "0")}
        </p>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#414755]">
            {activeStatus === "completed" ? "All modules complete" : greeting()}
          </p>
          <p className="mt-1.5 text-xs text-[#414755]">
            Phase {activePhase?.number} · {activePhase?.label} · Module {active.id} of {MODULES.length}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#1a1b1f] sm:text-4xl">
            {next ? next.title : active.title}
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#414755]">
            {next ? "Next in " + active.title : active.purpose}
          </p>

          <div className="mt-5 max-w-md"><MicroRibbon module={active} state={state} compact /></div>

          <div className="mt-6 flex flex-wrap items-center gap-5">
            <Button size="lg" icon={ArrowRight} onClick={() => (next ? onOpenMicro(next.id) : onOpenModule(active.id))}>
              {next ? (activeStarted ? "Continue learning" : "Start learning") : activeStatus === "completed" ? "Review a module" : "Go to post-test"}
            </Button>
            <span className="text-xs tabular-nums text-[#414755]">
              {activeDone}/{active.micros.length} micro-learnings done{next ? " · ~" + next.m + " min next" : ""}
            </span>
          </div>
        </div>
      </div>

      {/* WHERE AM I — the phase path, one continuous line, not four equal cards. The
          line fills to the current position; phases behind recede to a filled check,
          phases ahead stay in outline (immediate-next quiet, further-out shown locked).
          Clicking a node expands that phase in the list directly below — same toggle
          the collapsed rows use, so the map and the detail list are one interaction. */}
      <div className="mt-8 border-b border-[#c1c6d7] pb-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#414755]">Your learning journey</p>
        <div className="relative mt-6 px-2">
          <div className="absolute left-2 right-2 top-4 h-px bg-[#c1c6d7]" aria-hidden="true" />
          <div className="absolute left-2 top-4 h-px bg-[#0058bc] motion-safe:transition-all motion-safe:duration-500"
            style={{ width: "calc(" + journeyFillPct + "% - 1rem)" }} aria-hidden="true" />
          <div className="relative grid grid-cols-4">
            {phases.map((p, i) => {
              const isCurrent = i === currentPhaseIndex;
              const isDone = p.modules.every((m) => m.completed);
              const distance = i - currentPhaseIndex;
              return (
                <button key={p.id} onClick={() => togglePhase(p.id)} className="flex flex-col items-center gap-2 px-1 text-center">
                  <span className={"flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
                    (isCurrent ? "bg-[#0058bc] text-white ring-4 ring-blue-100"
                      : isDone ? "bg-emerald-600 text-white"
                      : "border-2 border-[#c1c6d7] text-[#c1c6d7]")}>
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : distance > 1 ? <Lock className="h-3 w-3" /> : p.number}
                  </span>
                  <span className={"leading-tight " + (isCurrent ? "text-sm font-semibold text-[#1a1b1f]" : isDone ? "text-xs text-[#414755]" : "text-xs text-[#717786]")}>
                    {p.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* WHAT HAVE I COMPLETED / WHAT COMES NEXT — the same 4 phases as detail rows.
          Only the current phase is open, showing its module path (ModuleCard, reused
          unchanged — same status/title/progress/action columns as before, same locked-
          module click-to-reveal behavior, same prerequisite logic). Completed and future
          phases are one line each; clicking any row toggles it open without navigating
          away, so inspecting a phase never leaves Journey. */}
      <div className="mt-8">
        {phases.map((p, i) => {
          const isCurrent = i === currentPhaseIndex;
          const isDone = p.modules.every((m) => m.completed);
          const distance = i - currentPhaseIndex;
          const expanded = isExpanded(p.id);
          const modsComplete = p.modules.filter((m) => m.completed).length;
          return (
            <div key={p.id} className={i > 0 ? "border-t border-[#e9e7ed]" : ""}>
              <button onClick={() => togglePhase(p.id)} className="flex w-full items-center justify-between gap-3 rounded-lg py-3 text-left hover:bg-[#f4f3f8]">
                <span className="flex min-w-0 items-center gap-3">
                  <span className={"flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold " +
                    (isDone ? "bg-emerald-600 text-white" : isCurrent ? "bg-[#0058bc] text-white ring-4 ring-blue-100" : "border-2 border-[#c1c6d7] text-[#c1c6d7]")}>
                    {isDone ? <CheckCircle2 className="h-3.5 w-3.5" /> : distance > 1 ? <Lock className="h-3 w-3" /> : p.number}
                  </span>
                  <span className="min-w-0">
                    <span className={"block truncate text-sm " + (isCurrent ? "font-semibold text-[#1a1b1f]" : isDone ? "font-medium text-[#414755]" : "font-medium text-[#717786]")}>
                      Phase {p.number} · {p.label}
                    </span>
                    <span className="block text-xs text-[#414755]">
                      {isDone || isCurrent ? modsComplete + "/" + p.modules.length + " modules complete" : "Locked"}
                    </span>
                  </span>
                </span>
                <ChevronRight className={"h-4 w-4 shrink-0 text-[#717786] transition-transform " + (expanded ? "rotate-90" : "")} />
              </button>
              {expanded && (
                <div className="pb-4 pl-10">
                  {p.modules.map((m, mi) => (
                    <ModuleCard key={m.id} module={moduleById(m.id)} state={state} onOpenModule={onOpenModule}
                      isActive={m.id === active.id} isLast={mi === p.modules.length - 1} />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {derived.review.length > 0 && (
        <button onClick={() => onGo("review")} className="mt-6 text-xs font-medium text-rose-600 hover:underline">
          {derived.review.length} concept{derived.review.length === 1 ? "" : "s"} to review
        </button>
      )}

      {/* Recent activity — lowest-priority section, present for continuity only. */}
      {recent.length > 0 && (
        <>
          <p className="mt-8 text-xs font-semibold text-[#717786]">Recent activity</p>
          <div className="mt-3 divide-y divide-[#e9e7ed]">
            {recent.map((e, i) => (
              <div key={i} className="flex items-center justify-between gap-3 py-2 text-sm">
                <span className="flex min-w-0 items-center gap-2 text-[#414755]">
                  {e.kind === "posttest"
                    ? (e.passed ? <Award className="h-4 w-4 shrink-0 text-emerald-600" /> : <GraduationCap className="h-4 w-4 shrink-0 text-[#717786]" />)
                    : (e.correct ? <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" /> : <Circle className="h-4 w-4 shrink-0 text-[#717786]" />)}
                  <span className="truncate">{e.kind === "posttest" ? "Post-test — " + e.title : e.title}</span>
                </span>
                <span className="shrink-0 text-xs tabular-nums text-[#414755]">
                  {e.kind === "posttest" ? e.pct + "% · " : ""}{prettyDate(e.date)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

/* --- Module list (browse by phase) — retained but no longer routed from primary nav;
   its content now renders inline inside JourneyView (see above, reusing ModuleCard).
   Not deleted per the "don't remove functionality unless intentionally merged" rule —
   Phase 3/4 of the redesign decide its final disposition. --------------------------- */

function ModuleListView({ state, onOpenModule }) {
  const activeId = activeModuleId(state);
  return (
    <div className="mx-auto max-w-3xl">
      <Eyebrow>Curriculum</Eyebrow>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">All modules</h1>
      <p className="mt-2 text-sm text-slate-600">4 phases · 25 modules · {TOTAL_MICROS} micro-learnings · 25 module post-tests. Digital Learning first; AI is a separate literacy competency and an enhancement layer on top of it.</p>

      <nav aria-label="Jump to phase" className="mt-4 flex flex-wrap gap-2">
        {PHASES.map((p) => (
          <a key={p.id} href={"#phase-" + p.id}
            className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50">
            Phase {p.number}
          </a>
        ))}
      </nav>

      {/* Phase number, phase title, and the module path below it are grid siblings in the
          SAME [number|content] column pair — the module list is not a separate block that
          happens to start near the phase title, its column position is literally derived
          from the same grid track the title uses. The number stays in column 1 alone, so it
          reads as a quiet marker beside the hierarchy rather than the hierarchy's anchor. */}
      {PHASES.map((p, pi) => {
        const mods = modulesForPhase(p.id);
        return (
          <div key={p.id} id={"phase-" + p.id} className={"scroll-mt-20 grid grid-cols-[auto_1fr] gap-x-3 " + (pi === 0 ? "mt-10" : "mt-14")}>
            <span aria-hidden="true" className="text-4xl font-semibold leading-none tabular-nums text-slate-200">{String(p.number).padStart(2, "0")}</span>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-900">{p.label}</h2>
              <p className="text-xs text-slate-500">{mods.length} module{mods.length === 1 ? "" : "s"}</p>
              <div className="mt-5">
                {mods.map((m, i) => (
                  <ModuleCard key={m.id} module={m} state={state} onOpenModule={onOpenModule}
                    isActive={m.id === activeId} isLast={i === mods.length - 1} />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* --- Progress detail --------------------------------------------------------- */

/* Row layout stacks on narrow screens (no fixed-width columns below sm) and, when the
   module is locked, reuses the same click-to-reveal lockReason pattern as ModuleCard so
   the explanation is consistent wherever a locked module appears.
   The status slot (h-6 w-6) always renders — number, check, or lock — so its width never
   depends on which state a row is in. That fixed slot, not a per-row margin, is what keeps
   every title starting at the same x position and every progress bar starting right after
   the same fixed-width [slot+title] column, regardless of state. Same convention ModuleCard
   uses for its own node circle. */
function ProgressModuleRow({ state, m }) {
  const locked = m.status === "locked";
  const [showLockHint, setShowLockHint] = useState(false);
  const content = (
    <>
      <span className="flex min-w-0 items-center gap-2 sm:w-44 sm:shrink-0">
        <span className={"flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold " +
          (m.completed ? "bg-emerald-600 text-white" : locked ? "bg-slate-100 text-slate-400" : "border-2 border-slate-300 text-slate-500")}>
          {m.completed ? <CheckCircle2 className="h-3.5 w-3.5" /> : locked ? <Lock className="h-3 w-3" /> : m.id}
        </span>
        <span className="min-w-0 truncate text-sm font-medium text-slate-800">M{m.id} · {m.title}</span>
      </span>
      <div className="min-w-0 flex-1"><Bar pct={m.pct} tone={m.completed ? "emerald" : "blue"} /></div>
      <span className="shrink-0 text-xs tabular-nums text-slate-500 sm:text-right">
        {locked ? "Locked" : m.microsDone + "/" + m.microsTotal + " micros" + (m.postTestScore !== null ? " · " + m.postTestScore + "%" : "")}
      </span>
    </>
  );
  return (
    <div>
      {locked ? (
        <button type="button" onClick={() => setShowLockHint((v) => !v)} aria-describedby={"progress-lock-hint-" + m.id}
          className="flex w-full flex-col gap-2 py-3 text-left sm:flex-row sm:items-center sm:gap-3">
          {content}
        </button>
      ) : (
        <div className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:gap-3">
          {content}
        </div>
      )}
      {locked && showLockHint && (
        <p id={"progress-lock-hint-" + m.id} role="status" className="flex items-center gap-1 pb-2 text-xs text-slate-500">
          <Lock className="h-3 w-3 shrink-0" /> {lockReason(state, m.id)}
        </p>
      )}
    </div>
  );
}

function ProgressView({ state, derived }) {
  const active = moduleById(derived.activeId);
  const activePhase = phaseOfModule(active.id);
  const activeDone = microsDoneCount(state, active.id);
  const next = nextMicro(state, active.id);
  const nextLabel = next ? next.title : !postTestPassed(state, active.id) ? "Take the module post-test" : "All modules complete";

  return (
    <div className="mx-auto max-w-3xl">
      <Eyebrow>Progress</Eyebrow>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Your learning journey</h1>
      <p className="mt-2 text-sm text-slate-600">Overall {derived.progress.overall}% — module credit is half finished micro-learnings, half best post-test score. Completion alone is not treated as proof of learning; only a passed post-test completes a module.</p>

      {/* Where you are right now — the dominant element on this page. */}
      <div className="mt-6 grid grid-cols-1 gap-6 border-y border-slate-200 py-6 sm:grid-cols-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current phase</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">Phase {activePhase?.number} · {activePhase?.label}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Current module</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">M{active.id} · {active.title}</p>
          <p className="mt-0.5 text-xs tabular-nums text-slate-500">{activeDone}/{active.micros.length} micro-learnings</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Next step</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{nextLabel}</p>
        </div>
      </div>

      {/* Full detail — available, but deliberately not the dominant element. */}
      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-slate-500">Full breakdown</h2>
      <div className="mt-3">
        {derived.progress.phases.map((p, pi) => (
          <div key={p.id} className={pi === 0 ? "mt-4" : "mt-8"}>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">Phase {p.number} · {p.label}</h3>
              <p className="text-xs tabular-nums text-slate-500">{p.pct}%</p>
            </div>
            <div className="mt-1 divide-y divide-slate-100">
              {p.modules.map((m) => <ProgressModuleRow key={m.id} state={state} m={m} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Resources --------------------------------------------------------------- */

function ResourcesView({ state }) {
  const withResources = MODULES.filter((m) => m.resources && m.resources.length);
  return (
    <div className="mx-auto max-w-3xl">
      <Eyebrow>Resources</Eyebrow>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a1b1f] sm:text-3xl">Verified resources</h1>
      <p className="mt-2 text-sm text-[#414755]">Curated, verified sources reused from prior curriculum research where a module's content draws on them. Newer V2-only modules are not yet paired with an externally verified resource — see M19-CONSOLIDATION-LOG.md.</p>
      <div className="mt-8 divide-y divide-[#c1c6d7]">
        {withResources.map((m) => (
          <div key={m.id} className="py-5 first:pt-0">
            <p className="text-sm font-semibold text-[#1a1b1f]">Module {m.id} · {m.title}</p>
            <ResourceList resources={m.resources} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* --- Review (weak concepts) --------------------------------------------------- */

function ReviewView({ state, derived, onOpenModule }) {
  return (
    <div className="mx-auto max-w-3xl">
      <Eyebrow>Review</Eyebrow>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a1b1f] sm:text-3xl">Concepts to review</h1>
      <p className="mt-2 text-sm text-[#414755]">Concepts below {CONFIG.reviewThreshold}% accuracy on your most recent attempt, from recall checks and post-test answers.</p>
      {derived.review.length === 0 ? (
        <div className="mt-10 text-center">
          <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-600" />
          <p className="mt-2 text-sm text-[#414755]">No weak concepts flagged right now.</p>
        </div>
      ) : (
        <div className="mt-6 space-y-2">
          {derived.review.map((c) => {
            const owner = MODULES.find((m) => m.micros.some((mc) => mc.recall.c === c.concept) || m.postTest.pool.some((q) => q.c === c.concept));
            return (
              <button key={c.concept} onClick={() => owner && onOpenModule(owner.id)}
                className="flex w-full items-center justify-between gap-3 rounded-lg border border-rose-200 bg-rose-50 p-4 text-left hover:bg-rose-100">
                <span>
                  <span className="block text-sm font-medium text-[#1a1b1f]">{c.concept}</span>
                  <span className="block text-xs text-[#717786]">{owner ? "Module " + owner.id + " · " + owner.title : "Concept"} · {c.correct}/{c.attempted} correct</span>
                </span>
                <span className="shrink-0 text-sm font-semibold tabular-nums text-rose-700">{c.accuracy}%</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* --- History ------------------------------------------------------------------ */

function HistoryView({ state, derived }) {
  const attempted = MODULES.filter((m) => postTestAttempts(state, m.id).length > 0);
  return (
    <div className="mx-auto max-w-3xl">
      <Eyebrow>History</Eyebrow>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Post-test history</h1>
      <p className="mt-2 text-sm text-slate-600">{derived.streak.total} module{derived.streak.total === 1 ? "" : "s"} completed. Current streak {derived.streak.current} day{derived.streak.current === 1 ? "" : "s"}, longest {derived.streak.longest}.</p>
      {attempted.length === 0 ? (
        <div className="mt-10 text-center"><p className="text-sm text-slate-600">No post-test attempts yet.</p></div>
      ) : (
        <div className="mt-8 divide-y divide-slate-200">
          {attempted.map((m) => (
            <div key={m.id} className="py-5 first:pt-0">
              <p className="text-sm font-semibold text-slate-900">Module {m.id} · {m.title}</p>
              <div className="mt-2 space-y-1">
                {postTestAttempts(state, m.id).map((a, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-slate-500">{prettyDate(a.date)}</span>
                    <span className={"tabular-nums font-medium " + (a.passed ? "text-emerald-700" : "text-slate-600")}>{a.pct}% ({a.correct}/{a.total}){a.passed ? " · passed" : ""}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function buildDemoState() {
  let s = { ...EMPTY_STATE, startDate: shiftDate(dstr(), -10) };
  for (let id = 1; id <= 6; id++) {
    const mod = moduleById(id);
    const date = shiftDate(dstr(), -(7 - id));
    mod.micros.forEach((mc) => {
      s = { ...s, micros: { ...s.micros, [mc.id]: { completedAt: date, given: mc.recall.a, correct: true } } };
    });
    const qids = drawPostTestQuestions(mod);
    const answers = {};
    qids.forEach((qi) => { const q = mod.postTest.pool[qi]; answers[qi] = q.t === "sa" ? "n/a" : q.a; });
    const result = { ...gradePostTest(mod, qids, answers), date };
    s = { ...s, postTests: { ...s.postTests, [id]: { attempts: [result] } } };
  }
  return s;
}

/* --- Entry: the first-visit landing experience ------------------------------
   Not a dashboard, not a nav destination — a single full-bleed screen with one
   job: TITLE, one line of explanation, ONE CTA into the real Journey view. The
   floating icons are a lowest-priority discovery layer (content-driven trivia,
   see LEARNING_TRIVIA below), never required to understand or use the page. */

const LEARNING_TRIVIA = [
  { id: "learning", label: "Learning", icon: LEARNING_ICONS.learning,
    trivia: "Working memory can only hold a limited number of new elements at once. That's one reason microlearning works best when it reduces unnecessary cognitive load." },
  { id: "cognition", label: "Cognition", icon: LEARNING_ICONS.cognition,
    trivia: "Not all cognitive load is bad. Instructional design mainly tries to reduce extraneous load." },
  { id: "instructionalDesign", label: "Instructional Design", icon: LEARNING_ICONS.instructionalDesign,
    trivia: "A learning objective that says learners will “understand” something isn't measurable — pairing it with an observable verb (explain, apply, critique) is what makes it checkable." },
  { id: "learnerAudience", label: "Learner Audience", icon: LEARNING_ICONS.learnerAudience,
    trivia: "Learner analysis isn't a demographic survey — it only matters when a fact actually changes a design decision, like pacing, reading level, or format." },
  { id: "assessment", label: "Assessment", icon: LEARNING_ICONS.assessment,
    trivia: "A good assessment measures the capability you actually want the learner to develop, not simply whether they remember the content." },
  { id: "multimedia", label: "Multimedia", icon: LEARNING_ICONS.multimedia,
    trivia: "Video isn't automatically better than text. Its value depends on what the learner needs to understand or perform." },
  { id: "accessibility", label: "Accessibility", icon: LEARNING_ICONS.accessibility,
    trivia: "Accessibility is not only about compliance — it can improve usability for everyone." },
  { id: "collaboration", label: "Collaboration", icon: LEARNING_ICONS.collaboration,
    trivia: "Subject matter experts often automate their own expertise — the steps that feel “obvious” to them are usually exactly what a novice needs spelled out." },
  { id: "ai", label: "AI", icon: LEARNING_ICONS.ai,
    trivia: "AI is most useful in learning design when it improves a real workflow or learning outcome — not simply because AI was added." },
  { id: "performance", label: "Performance", icon: LEARNING_ICONS.performance,
    trivia: "If someone could already do a task correctly for a large reward, the problem probably isn't a training gap — training can't fix a broken tool or a missing incentive." },
  { id: "microlearning", label: "Microlearning", icon: LEARNING_ICONS.microlearning,
    trivia: "Splitting a course into short units isn't about shrinking attention spans — it matches content to working-memory limits and enables spaced retrieval practice." },
  { id: "prompting", label: "Prompting", icon: LEARNING_ICONS.prompting,
    trivia: "Prompting an AI well starts before you type anything — defining exactly what you need is the step most people skip." },
  { id: "ux", label: "UX", icon: LEARNING_ICONS.ux,
    trivia: "Every unnecessary interface decision consumes some of the learner's attention." },
];

// Scattered field positions (percent of the entry container). Constraints:
// (1) a safe-area margin (tuned for the larger 58px tile — see ENTRY_TILE_SIZE
// — so the tile's own footprint, not just its anchor point, clears the
// viewport edge); (2) a central keep-out zone around the title/subtitle/CTA
// column (the runtime popup-placement logic in usePopupPlacement is the hard
// guarantee against a popup ever covering it; these positions are the softer,
// visual guarantee that the icons themselves don't crowd it either).
// Deliberately NOT two rows: Y values are spread continuously from 9 to 81
// rather than clustered into an upper band and a lower band, specifically to
// avoid the "icons above hero, icons below hero" read this round called out.
// learnerAudience moved from (22,58) — which read as attached to the CTA
// cluster — out to the far-left margin (10,52), clearly part of the
// surrounding field instead. floatVariant picks one of three CSS keyframe
// timings so the 13 icons never bob in visible unison.
const ICON_FIELD = [
  { id: "learning", left: 18, top: 9, floatVariant: 0 },
  { id: "ai", left: 68, top: 13, floatVariant: 2 },
  { id: "performance", left: 50, top: 5, floatVariant: 0 },
  { id: "assessment", left: 38, top: 12, floatVariant: 1 },
  { id: "cognition", left: 4, top: 17, floatVariant: 2 },
  { id: "ux", left: 30, top: 21, floatVariant: 1 },
  { id: "accessibility", left: 88, top: 20, floatVariant: 0 },
  { id: "multimedia", left: 40, top: 86, floatVariant: 2 },
  { id: "instructionalDesign", left: 24, top: 75, floatVariant: 0 },
  { id: "microlearning", left: 67, top: 83, floatVariant: 2 },
  { id: "prompting", left: 58, top: 74, floatVariant: 0 },
  { id: "collaboration", left: 87, top: 76, floatVariant: 1 },
  { id: "learnerAudience", left: 6, top: 80, floatVariant: 1 },
];
const ENTRY_TILE_SIZE = 58;

function useReducedMotionPref() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

const POPUP_TARGET_WIDTH = 360;
const POPUP_GAP = 12; // matches ml-3/mr-3

/** Which side of the icon has more room for its popup, and how wide the popup
    is actually allowed to be there — measured against the real viewport, not
    assumed from the icon's nominal left%, so it's correct at any tested width
    (1024/1280/1440) without per-breakpoint logic. `contentRef` (the title/
    subtitle/CTA column) is a second boundary alongside the viewport edge: if
    the icon's row overlaps the content block, whichever side FACES the
    content is capped at the content's own edge instead of the viewport edge.
    maxWidth never exceeds the room that's actually there — that IS the
    overlap/overflow guarantee, so it must never be inflated past `available`
    for the sake of a nicer-looking minimum. ICON_FIELD keeps every position
    comfortably clear of both edges precisely so this clamp rarely has to bite;
    when it does, a handful of icons show a narrower popup instead of ever
    covering the CTA or running off the viewport. */
function usePopupPlacement(anchorRef, contentRef, isOpen) {
  const [placement, setPlacement] = useState({ side: "right", maxWidth: POPUP_TARGET_WIDTH });
  useLayoutEffect(() => {
    if (!isOpen || !anchorRef.current) return;
    const rect = anchorRef.current.getBoundingClientRect();
    const content = contentRef.current ? contentRef.current.getBoundingClientRect() : null;
    const overlapsContentRow = content && rect.top < content.bottom && rect.bottom > content.top;

    let spaceRight = window.innerWidth - rect.right;
    let spaceLeft = rect.left;
    if (overlapsContentRow) {
      const iconIsLeftOfContent = rect.left + rect.width / 2 < (content.left + content.right) / 2;
      if (iconIsLeftOfContent) spaceRight = content.left - rect.right;
      else spaceLeft = rect.left - content.right;
    }
    const side = spaceRight >= spaceLeft ? "right" : "left";
    const available = (side === "right" ? spaceRight : spaceLeft) - POPUP_GAP;
    const maxWidth = Math.min(POPUP_TARGET_WIDTH, Math.max(0, available));
    setPlacement({ side, maxWidth });
  }, [isOpen]);
  return placement;
}

/** The contextual trivia card, anchored to (a child of) its icon rather than
    centered on the page. Enter animation slides in from the icon's own edge —
    "expanding outward from the icon" — via a two-frame render (start offset,
    then flip to resting state so the CSS transition actually animates) rather
    than a CSS animation, since the direction depends on runtime-computed
    `side`. Reduced motion skips straight to the resting state, no transition. */
function TriviaPopup({ trivia, side, maxWidth, reducedMotion, onClose }) {
  const [entered, setEntered] = useState(reducedMotion);
  useEffect(() => {
    if (reducedMotion) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  const fromX = side === "right" ? -8 : 8;
  const style = reducedMotion
    ? { transform: "translateY(-50%)", width: maxWidth }
    : {
        width: maxWidth,
        opacity: entered ? 1 : 0,
        transform: "translateY(-50%) " + (entered ? "translateX(0) scale(1)" : "translateX(" + fromX + "px) scale(0.96)"),
        transition: "opacity 200ms ease-out, transform 200ms ease-out",
      };

  return (
    <div style={style} role="status" aria-live="polite"
      className={"absolute top-1/2 z-30 max-w-[90vw] " + (side === "right" ? "left-full ml-3" : "right-full mr-3")}>
      <Card className="p-3.5 text-left shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#717786]">{trivia.label}</p>
          <button onClick={onClose} aria-label="Close trivia" className="shrink-0 text-[#717786] hover:text-[#1a1b1f]">
            <X className="h-4 w-4" />
          </button>
        </div>
        {/* Wider card + leading-snug (vs. the previous leading-relaxed) is what
            gets most trivia strings to ~2 lines at the full 360px width — a
            handful of icons get a narrower maxWidth (see usePopupPlacement)
            when the content column leaves less room on their side, and will
            naturally show more lines there rather than overlap the CTA. */}
        <p className="mt-1.5 text-sm leading-snug text-[#414755]">{trivia.trivia}</p>
      </Card>
    </div>
  );
}

/** One floating tile. Three independent transform layers, each on its own
    element, so none of them clobber each other:
      outer span  — JS-driven cursor-repel offset (EntryView's rAF loop)
      middle span — CSS idle float animation (bob)
      button      — CSS hover wiggle (rotate only; see .entry-icon-tile in
                    EntryView's <style> block — reduced-motion-safe there too)
    The trivia popup is a sibling of the bobbing middle span (child of the
    outer span only): it inherits repel movement if the tile is nudged, but
    never the idle bob or the hover wiggle, since neither of those live on an
    ancestor of the popup — it stays still and readable while open regardless
    of what the tile itself is doing. */
function FloatingIcon({ spec, trivia, reducedMotion, isLeaving, isOpen, onToggle, contentRef, registerNode }) {
  const anchorRef = useRef(null);
  const { side, maxWidth } = usePopupPlacement(anchorRef, contentRef, isOpen);
  return (
    <span ref={(node) => { anchorRef.current = node; registerNode(spec.id, node); }} data-float-id={spec.id} className="absolute block"
      style={{ left: spec.left + "%", top: spec.top + "%", width: ENTRY_TILE_SIZE, height: ENTRY_TILE_SIZE, zIndex: isOpen ? 30 : 1 }}>
      <span className={(reducedMotion || isLeaving) ? "block h-full w-full" : "block h-full w-full entry-float-" + spec.floatVariant}>
        <button type="button" onClick={() => onToggle(spec.id)} aria-expanded={isOpen}
          aria-label={trivia.label + " — reveal a short trivia"}
          className={"flex h-full w-full items-center justify-center rounded-xl bg-white shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" +
            ((reducedMotion || isLeaving) ? "" : " entry-icon-tile")}>
          <img src={trivia.icon} alt="" aria-hidden="true" draggable="false"
            className="h-[68%] w-[68%] select-none object-contain" />
        </button>
      </span>
      {isOpen && !isLeaving && <TriviaPopup trivia={trivia} side={side} maxWidth={maxWidth} reducedMotion={reducedMotion} onClose={() => onToggle(spec.id)} />}
    </span>
  );
}

function EntryView({ onStart }) {
  const reducedMotion = useReducedMotionPref();
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const ctaWrapRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const iconNodesRef = useRef(new Map());
  const leavingRef = useRef(false);
  const [activeTriviaId, setActiveTriviaId] = useState(null);
  const [isLeaving, setIsLeaving] = useState(false);

  const registerIconNode = (id, node) => {
    if (node) iconNodesRef.current.set(id, node);
    else iconNodesRef.current.delete(id);
  };

  // Cursor-repel field. Skipped entirely under reduced motion — icons then sit
  // at their static base position with no JS transform applied at all. Also
  // skipped (and torn down, via this same early return re-running the effect)
  // the moment departure starts, so it can never fight the gravity transition
  // for control of the outer span's transform.
  useEffect(() => {
    if (reducedMotion || isLeaving) return;
    const container = containerRef.current;
    if (!container) return;
    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    container.addEventListener("mousemove", onMove);
    container.addEventListener("mouseleave", onLeave);

    const RADIUS = 130, MAX_OFFSET = 20;
    let raf;
    const tick = () => {
      const crect = container.getBoundingClientRect();
      const { x: mx, y: my } = mouseRef.current;
      container.querySelectorAll("[data-float-id]").forEach((node) => {
        // Anchor from the node's own left/top% (set once by React, untouched by
        // this effect) and its rendered size — NOT from getBoundingClientRect(),
        // which would include THIS SAME transform from the previous frame and
        // create a feedback loop (the icon drifting/flickering instead of
        // settling into a stable repelled position).
        const bx = (parseFloat(node.style.left) / 100) * crect.width + node.offsetWidth / 2;
        const by = (parseFloat(node.style.top) / 100) * crect.height + node.offsetHeight / 2;
        const dx = bx - mx, dy = by - my;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS && dist > 0.5) {
          const factor = ((RADIUS - dist) / RADIUS) * (MAX_OFFSET / dist);
          node.style.transform = "translate(" + (dx * factor).toFixed(1) + "px, " + (dy * factor).toFixed(1) + "px)";
        } else {
          node.style.transform = "";
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion, isLeaving]);

  const toggleTrivia = (id) => {
    if (leavingRef.current) return;
    setActiveTriviaId((cur) => (cur === id ? null : id));
  };

  // Departure transition: "Start Your Journey" — the 13 concepts converge on
  // the CTA and are absorbed before we hand off to the existing router.
  // leavingRef is the synchronous guard (React state hasn't committed yet on
  // a rapid second click/Enter/Space); isLeaving drives the render-time
  // suppression of idle float / hover wiggle / popups / pointer-events.
  // Per-icon convergence deltas are computed imperatively from each icon's
  // actual current rendered position (not the static left/top% authored in
  // ICON_FIELD), same philosophy as the repel effect: measure the real DOM,
  // then drive it with a plain inline transform via CSS custom properties —
  // no new state per icon, no re-render per icon.
  const handleStart = () => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setActiveTriviaId(null);
    setIsLeaving(true);

    if (reducedMotion) {
      window.setTimeout(onStart, 60);
      return;
    }

    const cta = ctaWrapRef.current ? ctaWrapRef.current.getBoundingClientRect() : null;
    const focalX = cta ? cta.left + cta.width / 2 : window.innerWidth / 2;
    const focalY = cta ? cta.top + cta.height / 2 : window.innerHeight / 2;

    iconNodesRef.current.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const dx = focalX - (rect.left + rect.width / 2);
      const dy = focalY - (rect.top + rect.height / 2);
      const rot = (Math.random() < 0.5 ? -1 : 1) * (8 + Math.random() * 7);
      node.style.setProperty("--exit-x", dx.toFixed(1) + "px");
      node.style.setProperty("--exit-y", dy.toFixed(1) + "px");
      node.style.setProperty("--exit-rot", rot.toFixed(1) + "deg");
      node.style.transform = ""; // release the repel offset so the class below owns transform cleanly
      node.classList.add("entry-departing");
    });

    window.setTimeout(onStart, 800);
  };

  // Escape and click-outside both close whichever popup is open. "Outside"
  // means outside every [data-float-id] tile — clicking a different icon is
  // NOT outside (it's inside that icon's own tile), so this never fights with
  // the button's own onClick when switching the popup from one icon to another.
  useEffect(() => {
    if (!activeTriviaId) return;
    const onKey = (e) => { if (e.key === "Escape") setActiveTriviaId(null); };
    const onDocDown = (e) => { if (!e.target.closest("[data-float-id]")) setActiveTriviaId(null); };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDocDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDocDown);
    };
  }, [activeTriviaId]);

  return (
    <div className="min-h-screen overflow-hidden bg-[#faf8fe] text-[#1a1b1f]">
      <style>{`
        @keyframes entry-float-0 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-10px) } }
        @keyframes entry-float-1 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(9px) } }
        @keyframes entry-float-2 { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-7px) } }
        .entry-float-0 { animation: entry-float-0 5.5s ease-in-out infinite; }
        .entry-float-1 { animation: entry-float-1 6.5s ease-in-out infinite; }
        .entry-float-2 { animation: entry-float-2 7.5s ease-in-out infinite; }

        /* "Hey, I'm interactive" — a short rotate-only wiggle, not a scale/lift.
           Runs once per hover/focus (not looping), on the button/tile itself —
           a leaf element with no other transform, so it never fights the idle
           float (middle span) or the repel offset (outer span). */
        @keyframes entry-icon-wiggle {
          0% { transform: rotate(0deg); }
          20% { transform: rotate(-6deg); }
          40% { transform: rotate(5deg); }
          60% { transform: rotate(-3deg); }
          80% { transform: rotate(2deg); }
          100% { transform: rotate(0deg); }
        }
        .entry-icon-tile:hover, .entry-icon-tile:focus-visible {
          animation: entry-icon-wiggle 750ms ease-in-out 1;
        }

        /* "Start Your Journey" departure — the 13 concepts converge on the CTA
           and are absorbed. --exit-x/--exit-y/--exit-rot are computed per icon
           at click time from real getBoundingClientRect() positions (see
           handleStart). Strong ease-in: slow start, accelerating pull, so the
           shrink/rotate reads as gravity rather than a mechanical tween.
           Opacity is a separate, later transition so the icon is clearly seen
           moving before it fades — never an instant vanish. Reduced motion
           never adds this class at all (handleStart short-circuits before
           computing anything), so there is nothing to override here. */
        .entry-departing {
          transition: transform 570ms cubic-bezier(0.55,0,0.95,0.45) 80ms,
                      opacity 350ms linear 350ms;
          transform: translate(var(--exit-x, 0px), var(--exit-y, 0px)) scale(0.3) rotate(var(--exit-rot, 0deg));
          opacity: 0;
        }

        @media (prefers-reduced-motion: reduce) {
          .entry-float-0, .entry-float-1, .entry-float-2 { animation: none; }
          .entry-icon-tile:hover, .entry-icon-tile:focus-visible { animation: none; }
        }
      `}</style>

      <main ref={containerRef} className="relative mx-auto flex min-h-screen max-w-[1440px] flex-col items-center justify-center px-6 py-24">
        {/* Central content FIRST in document order, so keyboard tab order reaches
            the primary CTA before any of the 13 optional trivia icons. */}
        <div ref={contentRef} className="relative z-10 mx-auto max-w-xl text-center"
          style={(isLeaving && !reducedMotion) ? {
            transition: "opacity 400ms ease-out 250ms, transform 400ms ease-out 250ms",
            opacity: 0,
            transform: "scale(0.97)",
          } : undefined}>
          <h1 className="text-4xl font-bold tracking-tight text-[#1a1b1f] sm:text-5xl">
            Your Digital Learning Journey
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#414755] sm:text-lg">
            Build practical digital learning skills, then discover how AI can make your learning experiences smarter, faster, and more effective.
          </p>
          <div ref={ctaWrapRef} className="mt-10">
            <Button size="lg" icon={ArrowRight} onClick={handleStart} disabled={isLeaving}>Start Your Journey</Button>
          </div>
        </div>

        {/* Floating field — desktop/tablet only. Purely decorative/optional,
            so it comes after the CTA in document order and is simply absent
            (not just hidden) below sm: rather than cluttering a narrow screen.
            Each trivia popup now lives inside its own icon's span (see
            FloatingIcon) — there is no page-level trivia panel anymore.
            pointer-events-auto is dropped during departure so the converging
            icons can't be clicked/refocused mid-transition. */}
        <div className="pointer-events-none absolute inset-0 hidden sm:block" aria-hidden="false">
          {ICON_FIELD.map((spec) => {
            const trivia = LEARNING_TRIVIA.find((t) => t.id === spec.id);
            if (!trivia) return null;
            return (
              <span key={spec.id} className={isLeaving ? "" : "pointer-events-auto"}>
                <FloatingIcon spec={spec} trivia={trivia} reducedMotion={reducedMotion} isLeaving={isLeaving} contentRef={contentRef}
                  isOpen={activeTriviaId === spec.id} onToggle={toggleTrivia} registerNode={registerIconNode} />
              </span>
            );
          })}
        </div>
      </main>
    </div>
  );
}

/** Same mount-then-flip-a-frame trick as TriviaPopup's entrance (kept as its
    own small copy rather than a shared import — Entry Experience's animation
    code is locked, and this hook has different callers/lifetime): render at
    the resting state under reduced motion, otherwise start one frame offset
    and let the CSS transition animate to resting. Steps use a fresh instance
    per step (each step component only mounts while it's the active step), so
    "fires once per mount" is exactly "fires once per step arrival". */
function useIntroEnter(reducedMotion) {
  const [entered, setEntered] = useState(reducedMotion);
  useEffect(() => {
    if (reducedMotion) return;
    const raf = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);
  return entered;
}

const INTRO_JOURNEY_STAGES = [
  { label: "Learn", description: "Understand one concept.", icon: GraduationCap },
  { label: "Recall", description: "Check your understanding.", icon: RefreshCw },
  { label: "Complete", description: "Finish the learning activities.", icon: CheckCircle2 },
  { label: "Assess", description: "Test your understanding.", icon: ShieldQuestion },
  { label: "Continue", description: "Move forward in your journey.", icon: ArrowRight },
];

const INTRO_CAPABILITIES = [
  { label: "Guided Learning", description: "Follow a structured learning path from foundational concepts to more advanced topics.", icon: LayoutDashboard },
  { label: "Micro-Learning", description: "Learn through short, focused lessons designed to fit into your day.", icon: Clock },
  { label: "Recall Checks", description: "Pause and check what you actually remember.", icon: RefreshCw },
  { label: "AI Exploration", description: "Discover practical ways AI can support learning and digital work.", icon: Sparkles },
  { label: "Interactive Experiences", description: "Explore selected concepts through interactive learning experiences.", icon: Target },
];

function IntroStepWelcome({ reducedMotion }) {
  const entered = useIntroEnter(reducedMotion);
  const fx = (delayMs) => reducedMotion ? undefined : {
    transition: "opacity 400ms ease-out " + delayMs + "ms, transform 400ms ease-out " + delayMs + "ms",
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(10px)",
  };
  return (
    <div className="text-center">
      <p style={fx(0)} className="text-xs font-semibold uppercase tracking-wide text-[#0058bc]">Welcome</p>
      <h1 style={fx(60)} className="mt-3 text-3xl font-semibold tracking-tight text-[#1a1b1f] sm:text-4xl">
        A Learning Space for Digital &amp; AI Skills
      </h1>
      <p style={fx(120)} className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#414755] sm:text-lg">
        Build practical digital learning skills through focused learning experiences, then discover how AI can make the way you learn and work smarter.
      </p>

      {/* Three-node relationship diagram: foundation → enhancement → outcome. It gives this
          orientation step one clear visual story instead of leaving the relationship as a
          small typographic lockup above two unrelated text rows. */}
      <div style={fx(180)} className="mx-auto mt-10 flex max-w-2xl flex-col items-stretch gap-3 text-left sm:flex-row sm:items-stretch sm:gap-2">
        <div className="flex-1 border-t border-[#c1c6d7] pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#414755]">Digital Learning</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#717786]">The foundation</p>
          <p className="mt-2 text-sm leading-relaxed text-[#414755]">Practical, hands-on skills, built one focused concept at a time.</p>
        </div>
        <div className="flex shrink-0 items-center justify-center text-[#717786] sm:px-1" aria-hidden="true">
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#c1c6d7] text-xs">+</span>
        </div>
        <div className="flex-1 border-t border-[#c1c6d7] pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#0058bc]">AI</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#717786]">The enhancement layer</p>
          <p className="mt-2 text-sm leading-relaxed text-[#414755]">Discover practical ways AI can make learning and work smarter.</p>
        </div>
        <div className="flex shrink-0 items-center justify-center text-[#717786] sm:px-1" aria-hidden="true">
          <ChevronRight className="h-4 w-4" />
        </div>
        <div className="flex-1 border-t border-[#c1c6d7] pt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#414755]">Smarter learning &amp; work</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#717786]">The outcome</p>
          <p className="mt-2 text-sm leading-relaxed text-[#414755]">Build skills that compound through focused learning and practical AI exploration.</p>
        </div>
      </div>
    </div>
  );
}

function IntroStepJourney({ reducedMotion }) {
  const entered = useIntroEnter(reducedMotion);
  const fx = (delayMs) => reducedMotion ? undefined : {
    transition: "opacity 400ms ease-out " + delayMs + "ms, transform 400ms ease-out " + delayMs + "ms",
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(10px)",
  };
  // The nodes get their own, faster, horizontally-directed entrance —
  // distinct from the vertical fade used for the eyebrow/headline and for
  // Steps 1/3 — so the sequence itself reads as "unfolding left to right",
  // not just "fading in". 65ms stagger x 5 nodes + a 240ms transition keeps
  // the whole reveal inside the ~300–500ms target.
  const nodeFx = (i) => reducedMotion ? undefined : {
    transition: "opacity 240ms ease-out " + (i * 65) + "ms, transform 240ms ease-out " + (i * 65) + "ms",
    opacity: entered ? 1 : 0,
    transform: entered ? "translateX(0)" : "translateX(-8px)",
  };
  const connectorFx = (i) => reducedMotion ? undefined : {
    transition: "opacity 200ms ease-out " + (i * 65 + 40) + "ms",
    opacity: entered ? 1 : 0,
  };
  return (
    <div className="text-center">
      <p style={fx(0)} className="text-xs font-semibold uppercase tracking-wide text-[#0058bc]">Your Journey</p>
      <h1 style={fx(60)} className="mt-3 text-3xl font-semibold tracking-tight text-[#1a1b1f] sm:text-4xl">How Your Journey Works</h1>

      <div className="mx-auto mt-14 flex max-w-3xl flex-col gap-8 sm:flex-row sm:items-start sm:justify-between sm:gap-2">
        {INTRO_JOURNEY_STAGES.map((stage, i) => (
          <React.Fragment key={stage.label}>
            <div style={nodeFx(i)} className="flex flex-1 flex-col items-center gap-3 text-center">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c1c6d7] bg-white text-[#0058bc]">
                <stage.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#1a1b1f]">{stage.label}</p>
                <p className="mt-1 text-xs leading-snug text-[#414755]">{stage.description}</p>
              </div>
            </div>
            {i < INTRO_JOURNEY_STAGES.length - 1 && (
              <div style={connectorFx(i)} className="hidden shrink-0 items-center pt-3 text-[#c1c6d7] sm:flex" aria-hidden="true">
                <ChevronRight className="h-4 w-4" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function IntroStepCapabilities({ reducedMotion }) {
  const entered = useIntroEnter(reducedMotion);
  const fx = (delayMs) => reducedMotion ? undefined : {
    transition: "opacity 400ms ease-out " + delayMs + "ms, transform 400ms ease-out " + delayMs + "ms",
    opacity: entered ? 1 : 0,
    transform: entered ? "translateY(0)" : "translateY(10px)",
  };
  return (
    <div className="text-center">
      <p style={fx(0)} className="text-xs font-semibold uppercase tracking-wide text-[#0058bc]">Your Learning Space</p>
      <h1 style={fx(60)} className="mt-3 text-3xl font-semibold tracking-tight text-[#1a1b1f] sm:text-4xl">Everything You Need to Keep Learning</h1>

      {/* Two-column editorial grid, not a card grid — each cell is still just
          a border-t rule + icon + text (the same minimal treatment as the
          original single-column list), just arranged 2-up so five items read
          as a compact block instead of a tall scroll. Grid auto-placement on
          5 items in 2 columns naturally lands the 5th item alone in the
          bottom-left, matching the balanced arrangement asked for. Falls
          back to one column below sm, where a 2-up grid would cramp text. */}
      <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-x-10 text-left sm:grid-cols-6">
        {INTRO_CAPABILITIES.map((cap, i) => (
          <div key={cap.label} style={fx(140 + i * 70)} className={"flex items-start gap-4 border-t border-[#c1c6d7] py-4 sm:col-span-3 " + (i === INTRO_CAPABILITIES.length - 1 ? "sm:col-start-2" : "")}>
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#c1c6d7] bg-white text-[#0058bc]">
              <cap.icon className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1a1b1f]">{cap.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#414755]">{cap.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p style={fx(600)} className="mx-auto mt-8 max-w-md border-t border-[#c1c6d7] pt-6 text-base font-medium leading-relaxed text-[#1a1b1f]">
        Learn one concept at a time.<br />Build skills that compound.
      </p>
    </div>
  );
}

/** Orientation between the Entry Experience and Module Overview. One
    component, one local `step` (0/1/2) — no sub-routes, nothing persisted
    (first-time/returning-user behavior is a later decision; `step` resets to
    0 every mount exactly like the app's existing top-level `view` state
    already does). Bypasses the sidebar/header/footer chrome the same way
    EntryView does, for the same reason: this isn't the app shell, it's the
    continuation of arrival. */
function IntroductionView({ onComplete }) {
  const reducedMotion = useReducedMotionPref();
  const [step, setStep] = useState(0);

  const goNext = () => {
    if (step < 2) { setStep((s) => s + 1); window.scrollTo({ top: 0 }); return; }
    onComplete();
  };
  const goBack = () => { setStep((s) => Math.max(0, s - 1)); window.scrollTo({ top: 0 }); };

  // Layout is two regions, not one centered block: a flexible content region
  // (flex-1, scrolls internally if a step's content genuinely can't fit) and
  // a shrink-0 action region below it. Because the action region's size never
  // changes between steps, its distance from the bottom of the (fixed-height)
  // viewport never changes either — the CTA/counter simply cannot drift with
  // content height, without resorting to `position: fixed`.
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#faf8fe] text-[#1a1b1f]">
      <main className="relative mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
        {step > 0 && (
          <BackButton onClick={goBack} tone="muted" className="absolute left-6 top-8 sm:left-10 sm:top-10">Back</BackButton>
        )}

        <div className="w-full">
          <div key={step} className="w-full">
            {step === 0 && <IntroStepWelcome reducedMotion={reducedMotion} />}
            {step === 1 && <IntroStepJourney reducedMotion={reducedMotion} />}
            {step === 2 && <IntroStepCapabilities reducedMotion={reducedMotion} />}
          </div>
        </div>

        <div className="mt-12 flex shrink-0 flex-col items-center gap-3">
          <p className="text-xs font-medium uppercase tracking-wide text-[#717786]">
            <span className="font-semibold text-[#0058bc]">{String(step + 1).padStart(2, "0")}</span> / 03
          </p>
          <Button size="lg" icon={ArrowRight} onClick={goNext}>
            {step === 2 ? "Begin My Learning Journey" : "Continue"}
          </Button>
        </div>
      </main>
    </div>
  );
}

const NAV = [
  { id: "journey", label: "Journey", icon: LayoutDashboard },
  { id: "review", label: "Review", icon: ShieldQuestion },
  { id: "resources", label: "Resources", icon: Library },
];

export default function LearningDashboard() {
  const [state, setState] = useState(EMPTY_STATE);
  const [loaded, setLoaded] = useState(false);
  const [persist, setPersist] = useState("checking"); // checking | on | off | blocked
  const [loadIssue, setLoadIssue] = useState(null);   // { kind, backup, version?, dropped? }
  const [view, setView] = useState("entry");
  const [mode, setMode] = useState(null);      // { type: "module" | "micro" | "posttest", id }
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const menuButtonRef = useRef(null);
  const desktopMenuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const reducedMotion = useReducedMotionPref();
  // Serializes every storage.set() call for STORAGE_KEY through one promise chain, so a
  // save started for an older `state` can never be still in flight when a newer one starts and
  // finish AFTER it — which would otherwise let a stale write clobber newer progress if the
  // backend doesn't itself guarantee writes to the same key resolve in call order.
  const saveQueueRef = useRef(Promise.resolve());
  // Set once, synchronously, before any async work — { backend: "artifact" | "browser", get, set }
  // or null if nothing usable was found. See detectStorageBackend() above.
  const storageRef = useRef(null);

  // Load saved state once. If no backend is usable at all, say so rather than pretend.
  useEffect(() => {
    let cancelled = false;
    storageRef.current = detectStorageBackend();
    (async () => {
      const storage = storageRef.current;
      if (!storage) {
        if (!cancelled) { setPersist("off"); setLoaded(true); }
        return;
      }
      // A record we cannot read is never overwritten. It is copied to a backup key and
      // saving is blocked, so a parse error or an unknown version cannot erase progress.
      let raw = null;
      try {
        raw = await storage.get(STORAGE_KEY);
      } catch (e) {
        // storage.get() THROWING is a real read failure, not "no record yet" — it must
        // be treated exactly like the unreadable/newer-version cases below: leave `state` at
        // EMPTY_STATE for display, but do NOT set persist("on"), because that would let the
        // save effect (guarded only by `loaded && persist === "on"`) fire on the very next
        // render and overwrite whatever real record is sitting in storage with EMPTY_STATE.
        // This was the root cause of progress being wiped on reload: a failed read was
        // previously indistinguishable from "the key doesn't exist yet".
        if (!cancelled) {
          setPersist("blocked");
          setLoadIssue({ kind: "read-error", backup: null, version: null });
          setLoaded(true);
        }
        return;
      }
      if (raw === null) {
        if (!cancelled) { setPersist("on"); setLoaded(true); }
        return;
      }

      let parsed = null, failure = null;
      try {
        parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object") failure = "unreadable";
        else if (parsed.version > STATE_VERSION) failure = "newer";
        else if (parsed.version !== STATE_VERSION) failure = "unknown";
      } catch (e) {
        failure = "unreadable";
      }

      if (failure) {
        let backup = null;
        try {
          backup = BACKUP_KEY_PREFIX + dstr();
          await storage.set(backup, raw);
        } catch (e) { backup = null; }
        if (!cancelled) {
          setPersist("blocked");
          setLoadIssue({ kind: failure, backup, version: parsed?.version ?? null });
          setLoaded(true);
        }
        return;
      }

      const { state: clean, dropped } = normalizeState(parsed);
      if (!cancelled) {
        setState(clean);
        if (dropped.length) {
          let backup = null;
          try {
            backup = BACKUP_KEY_PREFIX + dstr();
            await storage.set(backup, raw);
          } catch (e) { backup = null; }
          if (!cancelled) setLoadIssue({ kind: "repaired", backup, dropped });
        }
        setPersist("on");
        setLoaded(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // Save on every change once loading has finished. Each save is appended to saveQueueRef
  // rather than fired independently, so writes for successive states reach the active backend's
  // set() strictly one at a time, in the same order the states occurred — the previous write
  // always settles before the next one starts, regardless of the backend's own latency.
  useEffect(() => {
    if (!loaded || persist !== "on") return;
    const storage = storageRef.current;
    if (!storage) return; // persist only becomes "on" once storageRef.current is set — defensive only
    let cancelled = false;
    const payload = JSON.stringify(state);
    saveQueueRef.current = saveQueueRef.current.then(
      () => storage.set(STORAGE_KEY, payload),
      () => storage.set(STORAGE_KEY, payload) // previous save in the chain failed — still attempt this one
    ).catch((e) => {
      if (!cancelled) setPersist("off");
    });
    return () => { cancelled = true; };
  }, [state, loaded, persist]);

  const derived = useMemo(() => ({
    streak: streakStats(state),
    progress: knowledgeProgress(state),
    review: reviewItems(state),
    activeId: activeModuleId(state),
  }), [state]);

  const submitRecall = useCallback((microId, given) => {
    setState((s) => {
      const micro = microById(microId);
      const rec = gradeRecall(micro, given);
      return { ...s, micros: { ...s.micros, [microId]: rec } };
    });
  }, []);

  const submitPostTest = useCallback((moduleId, result) => {
    setState((s) => {
      const prev = s.postTests[moduleId]?.attempts || [];
      return { ...s, postTests: { ...s.postTests, [moduleId]: { attempts: [...prev, result] } } };
    });
  }, []);

  const openModule = (id) => { setMode({ type: "module", id }); setMenuOpen(false); window.scrollTo({ top: 0 }); };
  // The actual sequential-progression enforcement: every caller (module row, sidebar
  // drawer, MicroView's own "Continue") goes through this one function, so a locked
  // micro can never open regardless of how the request got triggered — not just a
  // disabled-looking button that a direct call could still bypass.
  const openMicro = (id) => {
    const mod = moduleForMicro(id);
    if (mod && !microUnlocked(state, mod.id, id)) return;
    setMode({ type: "micro", id }); setMenuOpen(false); window.scrollTo({ top: 0 });
  };
  const openPostTest = (id) => {
    if (!allMicrosDone(state, id)) return;
    setMode({ type: "posttest", id }); setMenuOpen(false); window.scrollTo({ top: 0 });
  };
  const goto = (v) => { setView(v); setMode(null); setMenuOpen(false); window.scrollTo({ top: 0 }); };

  // Mobile drawer focus management: move focus in on open, trap Tab/Shift+Tab inside
  // the panel while open, Escape closes it, and focus always returns to the toggle
  // button that opened it — whether closed via Escape, backdrop click, or a nav action.
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';
  useEffect(() => {
    if (!menuOpen) return;
    const panel = drawerRef.current;
    const items = () => (panel ? panel.querySelectorAll(focusableSelector) : []);
    (items()[0] || panel)?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { setMenuOpen(false); return; }
      if (e.key !== "Tab" || !panel) return;
      const list = items();
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      // Two triggers now open this same drawer (mobile header hamburger, desktop edge
      // rail) and only one is ever actually visible at a given width — restore focus to
      // whichever one the learner could actually see/use. Both triggers are
      // position:fixed, and offsetParent is always null for fixed elements regardless
      // of visibility, so getClientRects().length (empty only for display:none) is the
      // check that actually works here.
      const visibleTrigger = (desktopMenuButtonRef.current && desktopMenuButtonRef.current.getClientRects().length > 0)
        ? desktopMenuButtonRef.current : menuButtonRef.current;
      visibleTrigger?.focus();
    };
  }, [menuOpen]);

  // "Saved on this device" only when the Artifact host's own storage is the active backend;
  // the localStorage fallback gets its own, honest label rather than reusing that copy, per
  // the persistence-adapter requirement that a fallback backend must say so, not pretend to be
  // the primary one.
  const persistNote =
    persist === "on" ? (storageRef.current?.backend === "browser" ? "Saved in this browser" : "Saved on this device")
    : persist === "off" ? "Not saved — this session only"
    : persist === "blocked" ? "Saving paused — existing record protected"
    : "Checking storage...";

  const startFresh = () => {
    setState({ ...EMPTY_STATE, startDate: dstr() });
    setLoadIssue(null);
    setPersist("on");
    goto("journey");
  };

  const issueBanner = loadIssue && (
    <div role="alert" className={"mb-6 rounded-xl border p-4 " + (loadIssue.kind === "repaired" ? "border-amber-200 bg-amber-50" : "border-rose-200 bg-rose-50")}>
      <div className="flex items-start gap-3">
        <AlertTriangle className={"mt-0.5 h-5 w-5 shrink-0 " + (loadIssue.kind === "repaired" ? "text-amber-700" : "text-rose-700")} />
        <div className="min-w-0">
          <p className={"text-sm font-semibold " + (loadIssue.kind === "repaired" ? "text-amber-900" : "text-rose-900")}>
            {loadIssue.kind === "repaired" ? "Saved progress was loaded with repairs"
              : loadIssue.kind === "newer" ? "Saved progress was written by a newer version"
              : "Saved progress could not be read"}
          </p>
          <p className="mt-1 text-sm text-[#414755]">
            {loadIssue.kind === "repaired"
              ? "Some entries did not match the expected shape and were left out: " + loadIssue.dropped.slice(0, 6).join(", ") +
                (loadIssue.dropped.length > 6 ? ", and " + (loadIssue.dropped.length - 6) + " more." : ".")
              : loadIssue.kind === "unknown"
              ? "This record was written by the previous (V1, day-based) curriculum, which has been replaced by the V2 module/micro-learning structure — there is no meaningful way to convert one into the other. Nothing has been overwritten; your old record is safely backed up below."
              : "Nothing has been overwritten. Saving is paused so the existing record stays intact — anything you do in this session will be lost on reload until you choose an option below."}
          </p>
          <p className="mt-1 text-xs text-[#717786]">
            {loadIssue.backup
              ? "A verbatim copy was stored under the key " + loadIssue.backup + "."
              : loadIssue.kind === "read-error"
              ? "The existing record could not be read at all, so no backup could be made — it has not been touched. Reloading may succeed if this was temporary."
              : "The backup copy could not be written, so the original record is the only copy — do not reset."}
            {loadIssue.version !== null && loadIssue.version !== undefined ? " Record version: " + loadIssue.version + "; this build reads version " + STATE_VERSION + "." : ""}
          </p>
          {loadIssue.kind === "repaired" ? (
            <Button className="mt-3" size="sm" variant="outline" onClick={() => setLoadIssue(null)}>Understood</Button>
          ) : (
            <Button className="mt-3" size="sm" variant="danger" onClick={startFresh}>Start fresh with the V2 curriculum</Button>
          )}
        </div>
      </div>
    </div>
  );

  const Sidebar = (
    <nav aria-label="Primary" className="flex h-full flex-col">
      <div className="px-4 py-5">
        <p className="text-sm font-semibold tracking-tight text-[#1a1b1f]">AI &amp; Digital Learning</p>
        <p className="mt-0.5 text-xs text-[#717786]">25 modules · micro-learnings, self-paced</p>
      </div>
      <div className="flex-1 space-y-1 px-2">
        {NAV.map((n) => {
          const Icon = n.icon;
          const activeItem = view === n.id && !mode;
          return (
            <button key={n.id} onClick={() => goto(n.id)}
              className={"flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                (activeItem ? "bg-[#0058bc] text-white" : "text-[#414755] hover:bg-[#efedf3] hover:text-[#1a1b1f]")}>
              <Icon className="h-4 w-4" />
              {n.label}
              {n.id === "review" && derived.review.length > 0 && (
                <span className="ml-auto rounded-full bg-[#ffdad6] px-2 py-0.5 text-xs font-semibold text-[#ba1a1a]">{derived.review.length}</span>
              )}
            </button>
          );
        })}
      </div>
      <div className="space-y-2 border-t border-[#c1c6d7] p-4">
        <p className="text-xs text-[#717786]">{persistNote}</p>
        {streakStats(state).total === 0 && (
          <Button size="sm" variant="outline" className="w-full" onClick={() => { setState(buildDemoState()); setMenuOpen(false); }}>Load demo history</Button>
        )}
        <Button size="sm" variant={confirmReset ? "danger" : "ghost"} className="w-full"
          onClick={() => { if (confirmReset) { setState({ ...EMPTY_STATE, startDate: dstr() }); setConfirmReset(false); goto("journey"); } else setConfirmReset(true); }}>
          {confirmReset ? "Confirm — erase all progress" : "Reset progress"}
        </Button>
      </div>
    </nav>
  );

  // Collapsed icon-only rail for tablet widths (md–lg): same nav targets as Sidebar,
  // always visible (no toggle/trap needed since nothing here is modal).
  const TabletRail = (
    <nav aria-label="Primary" className="flex h-full flex-col items-center gap-1 py-4">
      <div className="flex flex-1 flex-col items-center gap-1">
        {NAV.map((n) => {
          const Icon = n.icon;
          const activeItem = view === n.id && !mode;
          return (
            <button key={n.id} onClick={() => goto(n.id)} title={n.label} aria-label={n.label} aria-current={activeItem ? "page" : undefined}
              className={"relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors " +
                (activeItem ? "bg-[#0058bc] text-white" : "text-[#414755] hover:bg-[#efedf3] hover:text-[#1a1b1f]")}>
              <Icon className="h-5 w-5" />
              {n.id === "review" && derived.review.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ffdad6] text-[10px] font-semibold text-[#ba1a1a]">
                  {derived.review.length > 9 ? "9+" : derived.review.length}
                </span>
              )}
            </button>
          );
        })}
      </div>
      {/* Icon-only equivalents of the Sidebar's bottom utilities — the rail must not be the
          one breakpoint where these become unreachable. */}
      {streakStats(state).total === 0 && (
        <button onClick={() => setState(buildDemoState())} title="Load demo history" aria-label="Load demo history"
          className="flex h-10 w-10 items-center justify-center rounded-lg text-[#717786] transition-colors hover:bg-[#efedf3] hover:text-[#414755]">
          <Sparkles className="h-4 w-4" />
        </button>
      )}
      <button
        onClick={() => { if (confirmReset) { setState({ ...EMPTY_STATE, startDate: dstr() }); setConfirmReset(false); goto("journey"); } else setConfirmReset(true); }}
        title={confirmReset ? "Confirm — erase all progress" : "Reset progress"}
        aria-label={confirmReset ? "Confirm — erase all progress" : "Reset progress"}
        className={"flex h-10 w-10 items-center justify-center rounded-lg transition-colors " +
          (confirmReset ? "bg-[#ffdad6] text-[#ba1a1a]" : "text-[#717786] hover:bg-[#efedf3] hover:text-[#414755]")}>
        <RotateCcw className="h-4 w-4" />
      </button>
    </nav>
  );

  // Entry bypasses the sidebar/header/footer chrome entirely rather than hiding
  // it with CSS — "no sidebar on the entry page" is structural here, not visual.
  // Renders immediately regardless of storage-load state (it has no dependency
  // on `state` at all); Journey's own !loaded branch below still covers the
  // case where storage is still resolving by the time "Start Your Journey" /
  // "Begin My Learning Journey" fires. Entry hands off to the Introduction
  // (orientation) rather than straight to Journey now; Introduction hands off
  // to Journey exactly as Entry used to.
  if (view === "entry" && !mode) {
    return <EntryView onStart={() => goto("intro")} />;
  }
  if (view === "intro" && !mode) {
    // "Begin My Learning Journey" hands off straight into Module Overview for the
    // learner's active module (goto keeps the sidebar's Journey tab as the ambient
    // context, exactly as it already is when opening a module from Journey itself —
    // this is the same view+mode combination that path already produces).
    return <IntroductionView onComplete={() => { goto("journey"); openModule(activeModuleId(state)); }} />;
  }

  let main;
  if (!loaded) {
    main = <div className="py-24 text-center text-sm text-[#717786]">Loading your progress...</div>;
  } else if (mode?.type === "module") {
    main = <ModuleView module={moduleById(mode.id)} state={state}
      onOpenMicro={openMicro}
      onOpenPostTest={() => openPostTest(mode.id)}
      onOpenModule={openModule}
      onBack={() => goto("journey")} />;
  } else if (mode?.type === "micro") {
    const mod = moduleForMicro(mode.id);
    const micro = microById(mode.id);
    const idx = mod.micros.findIndex((m) => m.id === mode.id);
    const isLast = idx === mod.micros.length - 1;
    main = <MicroView key={micro.id} module={mod} micro={micro} state={state}
      onSubmitRecall={(given) => submitRecall(mode.id, given)}
      onContinue={() => { if (isLast) openModule(mod.id); else openMicro(mod.micros[idx + 1].id); }}
      onBack={() => openModule(mod.id)} />;
  } else if (mode?.type === "posttest") {
    main = <PostTestView module={moduleById(mode.id)} state={state}
      onSubmit={(r) => submitPostTest(mode.id, r)}
      onOpenModule={openModule}
      onBack={() => openModule(mode.id)} />;
  } else if (view === "resources") {
    main = <ResourcesView state={state} />;
  } else if (view === "review") {
    main = <ReviewView state={state} derived={derived} onOpenModule={openModule} />;
  } else {
    main = <JourneyView state={state} derived={derived} onOpenModule={openModule} onOpenMicro={openMicro} onGo={goto} />;
  }

  return (
    <div className="min-h-screen bg-[#faf8fe] text-[#1a1b1f]">
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-blue-700 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:shadow-lg">
        Skip to content
      </a>

      {/* Mobile bar — true mobile only; tablet gets the persistent icon rail below */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-[#c1c6d7] bg-white px-4 py-3 md:hidden">
        <div className="flex items-center gap-2">
          <button ref={menuButtonRef} onClick={() => setMenuOpen((v) => !v)} className="rounded-lg p-2 text-[#414755] hover:bg-[#efedf3]"
            aria-label="Toggle navigation" aria-expanded={menuOpen} aria-controls="mobile-nav">
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <p className="text-sm font-semibold tracking-tight">AI &amp; Digital Learning</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
          <Flame className="h-3.5 w-3.5" />{derived.streak.current}
        </span>
      </header>

      {/* Desktop edge trigger — the app navigation's equivalent of Module Overview's
          Learning Path rail: same shape/spacing language (fixed, edge-anchored, vertical
          label), mirrored to the left and using Menu rather than a chevron so its meaning
          reads as "app navigation", not "orientation for the thing I'm looking at". Only
          shown lg+ — mobile already has the header hamburger, tablet keeps its permanent
          icon rail (a compromise that was already collapsed-by-default in spirit). */}
      <button ref={desktopMenuButtonRef} onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen} aria-controls="mobile-nav"
        className="fixed left-0 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-1.5 rounded-r-lg border border-l-0 border-[#c1c6d7] bg-white py-3 pl-1.5 pr-2 text-[#717786] shadow-sm transition-colors hover:bg-[#f4f3f8] hover:text-[#1a1b1f] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 lg:flex">
        <Menu className="h-3.5 w-3.5" />
        <span className="text-[11px] font-semibold uppercase tracking-wide [writing-mode:vertical-rl]">Menu</span>
      </button>

      {/* Always mounted (not conditionally rendered) so open/close can transition — same
          convention as the Learning Path drawer: invisible + non-interactive while closed,
          so it never occupies space or intercepts input, and the main canvas never reflows
          when this opens. Same 200ms ease-out timing, same backdrop opacity, same
          reduced-motion opt-out as the right drawer. */}
      <div aria-hidden="true" onClick={() => setMenuOpen(false)}
        style={{
          ...(reducedMotion ? {} : { transition: "opacity 200ms ease-out" }),
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        className="fixed inset-0 z-20 bg-[#1a1b1f]/30" />
      <div ref={drawerRef} id="mobile-nav" role="dialog" aria-modal="true" aria-label="Navigation" tabIndex={-1}
        style={{
          ...(reducedMotion ? {} : { transition: "transform 200ms ease-out, opacity 200ms ease-out" }),
          transform: menuOpen ? "translateX(0)" : "translateX(-16px)",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        className="fixed inset-y-0 left-0 z-20 w-64 overflow-y-auto border-r border-[#c1c6d7] bg-white pt-16 focus:outline-none md:pt-0">
        {/* The mobile header already has its own X (the hamburger swaps to X while open),
            so this explicit close control — matching the Learning Path drawer's — only
            needs to appear for the desktop/tablet-drawer case. */}
        <button onClick={() => setMenuOpen(false)} aria-label="Close navigation"
          className="absolute right-3 top-3 hidden rounded p-1 text-[#717786] hover:bg-[#efedf3] hover:text-[#1a1b1f] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:block">
          <X className="h-4 w-4" />
        </button>
        {Sidebar}
      </div>

      <div className="mx-auto flex max-w-7xl">
        <aside aria-label="Primary" className="sticky top-0 hidden h-screen w-16 shrink-0 border-r border-[#c1c6d7] bg-white md:block lg:hidden">{TabletRail}</aside>
        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 px-4 py-6 focus:outline-none sm:px-6 lg:px-8 lg:py-8">
          {loaded && issueBanner}
          {main}
          {/* Module Overview is meant to feel like a calm chapter opening, not an app
              settings screen — this app-wide disclaimer stays exactly as-is everywhere
              else, just not appended under the module landing scene. */}
          {mode?.type !== "module" && (
            <footer className="mt-12 border-t border-[#c1c6d7] pt-6 text-xs leading-relaxed text-[#717786]">
              <p>Progress, streaks and review flags are calculated from your completions and answers — none of them are hard-coded. A module is complete when every micro-learning is done and your best post-test score reaches {CONFIG.passThreshold}%; failed post-test attempts are kept in history and still feed the review list, but they do not complete a module or unlock the next one. Recall checks after each micro-learning are non-gated retrieval practice, not a mastery gate. Short answers are graded by keyword matching in both English and Bahasa Indonesia, so treat borderline results as a prompt to re-read rather than a verdict.</p>
              <p className="mt-2">{persistNote}. Curriculum content is written for study, not as a certified reference; verify implementation details against the linked official documentation.</p>
            </footer>
          )}
        </main>
      </div>
    </div>
  );
}

/* --- Module post-test view --------------------------------------------------- */

function PostTestView({ module, state, onSubmit, onOpenModule, onBack }) {
  const [questionIds] = useState(() => drawPostTestQuestions(module));
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const answered = questionIds.filter((qi) => answers[qi] !== "" && answers[qi] !== undefined).length;

  const submit = () => {
    const r = gradePostTest(module, questionIds, answers);
    setResult(r);
    onSubmit(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const set = (qi, v) => setAnswers((a) => ({ ...a, [qi]: v }));

  if (result) {
    const weak = [...new Set(result.detail.filter((d) => !d.correct).map((d) => d.concept))];
    const earnedBest = postTestBestPct(state, module.id);
    const alreadyEarned = postTestPassed(state, module.id);
    const nextId = activeModuleId(state);
    const hasNext = result.passed && nextId !== module.id;
    return (
      <div className="mx-auto max-w-3xl">
        <Eyebrow>Module {module.id} · assessment result</Eyebrow>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a1b1f]">{module.title}</h1>

        <div className="mt-5 rounded-xl border border-[#c1c6d7] p-6" role="status" aria-live="polite">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-4xl font-semibold tabular-nums tracking-tight text-[#1a1b1f]">{result.correct}<span className="text-[#414755]">/{result.total}</span></p>
              <p className="mt-1 text-sm text-[#414755]">{result.pct}% · {result.total - result.correct} incorrect</p>
            </div>
            {result.passed
              ? <Pill tone="emerald" icon={Award}>Passed · threshold {CONFIG.passThreshold}%</Pill>
              : <Pill tone="orange" icon={AlertTriangle}>Not passed · needs {CONFIG.passThreshold}%</Pill>}
          </div>
          <div className="mt-4"><Bar pct={result.pct} tone={result.passed ? "emerald" : "orange"} height="h-2.5" threshold={CONFIG.passThreshold} /></div>
          <p className={"mt-4 flex items-start gap-2 text-sm leading-relaxed " + (result.passed ? "text-emerald-800" : "text-[#414755]")}>
            {result.passed ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /> : null}
            <span>
            {alreadyEarned && !result.passed
              ? "This retake is below " + CONFIG.passThreshold + "%, but the module stays complete — your best score of " + earnedBest + "% already counted, and a weaker retake can never cost you a module you've earned."
              : result.passed
              ? "Module complete — your progress has been updated."
              : "The module is not complete yet. Retake when you're ready — this pool has " + module.postTest.pool.length + " questions, so a retake draws a fresh random set, not the same test again."}
            </span>
          </p>
          {weak.length > 0 && (
            <div className="mt-4 rounded-lg bg-orange-50 p-4">
              <p className="text-sm font-semibold text-orange-800">You need more practice with:</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {weak.map((w) => <li key={w}><Pill tone="orange">{w}</Pill></li>)}
              </ul>
            </div>
          )}
        </div>

        {/* Passing makes the next step of the journey the primary action. */}
        <div className="mt-8 flex flex-col items-start gap-3 border-t border-[#c1c6d7] pt-6 sm:flex-row sm:items-center">
          {hasNext ? (
            <>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#414755]">Next module</p>
                <p className="mt-1 text-sm text-[#414755]">{moduleById(nextId).title}</p>
              </div>
              <Button size="lg" icon={ArrowRight} onClick={() => onOpenModule(nextId)}>Continue to Module {nextId}</Button>
              <Button variant="outline" onClick={onBack}>Back to module</Button>
            </>
          ) : (
            <Button icon={ArrowRight} onClick={onBack}>Back to module</Button>
          )}
        </div>

        <h2 className="mt-14 text-lg font-semibold tracking-tight text-[#1a1b1f]">Answer review</h2>
        <div className="mt-3 space-y-3">
          {questionIds.map((qi, i) => {
            const q = module.postTest.pool[qi];
            const d = result.detail[i];
            const answerText = q.t === "tf" ? (q.a ? "True" : "False") : q.t === "sa" ? q.a.model : q.opts[q.a];
            return (
              <Card key={qi} className={"p-5 " + (d.correct ? "border-emerald-200" : "border-rose-200")}>
                <div className="flex items-start gap-3">
                  {d.correct ? <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" /> : <X className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" />}
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#1a1b1f]">{q.q}</p>
                    <p className="mt-2 text-sm text-[#414755]">Your answer: <span className="text-[#414755]">{
                      d.given === null || d.given === "" ? "—"
                      : q.t === "tf" ? (d.given ? "True" : "False")
                      : q.t === "sa" ? String(d.given)
                      : q.opts[d.given]
                    }</span></p>
                    <p className="mt-1 text-sm text-[#414755]">{q.t === "sa" ? "Model answer" : "Correct answer"}: <span className="font-medium text-[#1a1b1f]">{answerText}</span></p>
                    <p className="mt-2 text-sm leading-relaxed text-[#414755]">{q.e}</p>
                    <p className="mt-2 text-xs text-[#414755]">Concept: {q.c}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <BackButton onClick={onBack} className="mb-4">Leave post-test</BackButton>
      <Eyebrow>Module {module.id} · post-test</Eyebrow>
      <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#1a1b1f]">{module.title}</h1>
      <p className="mt-2 text-sm text-[#414755]">{questionIds.length} questions, drawn at random from a {module.postTest.pool.length}-question pool. Pass mark {CONFIG.passThreshold}% — <span className="font-medium text-[#1a1b1f]">the module is only complete once you reach it</span>, and you can retake as often as you like. Short answers are checked for key ideas — English or Bahasa Indonesia, both are marked the same.</p>

      <div className="mt-6 space-y-4">
        {questionIds.map((qi, i) => {
          const q = module.postTest.pool[qi];
          return (
            <Card key={qi} className="p-5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0058bc] text-xs font-semibold tabular-nums text-white">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p id={"q" + i + "-label"} className="text-sm font-medium leading-relaxed text-[#1a1b1f]">{q.q}</p>
                  <p className="mt-1 text-xs uppercase tracking-wide text-[#414755]">
                    {q.t === "mc" ? "Multiple choice" : q.t === "tf" ? "True or false" : q.t === "sc" ? "Scenario" : "Short answer"}
                  </p>
                  <QuestionInput q={q} given={answers[qi]} onChange={(v) => set(qi, v)} idx={i} />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="sticky bottom-0 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#c1c6d7] bg-white p-4 backdrop-blur">
        <p className="text-sm text-[#414755] tabular-nums">{answered} of {questionIds.length} answered</p>
        <Button size="lg" icon={GraduationCap} onClick={submit} disabled={answered === 0}>Submit post-test</Button>
      </div>
    </div>
  );
}
