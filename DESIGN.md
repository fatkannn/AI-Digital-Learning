---
name: Aetheris Narrative
colors:
  surface: '#faf8fe'
  surface-dim: '#dbd9df'
  surface-bright: '#faf8fe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f8'
  surface-container: '#efedf3'
  surface-container-high: '#e9e7ed'
  surface-container-highest: '#e3e2e7'
  on-surface: '#1a1b1f'
  on-surface-variant: '#414755'
  inverse-surface: '#2f3034'
  inverse-on-surface: '#f1f0f6'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc1'
  primary: '#0058bc'
  on-primary: '#ffffff'
  primary-container: '#0070eb'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc6ff'
  secondary: '#5e5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e2'
  on-secondary-container: '#646464'
  tertiary: '#5a5c5e'
  on-tertiary: '#ffffff'
  tertiary-container: '#737576'
  on-tertiary-container: '#fcfcfe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1b1b1b'
  on-secondary-fixed-variant: '#474747'
  tertiary-fixed: '#e2e2e4'
  tertiary-fixed-dim: '#c6c6c8'
  on-tertiary-fixed: '#1a1c1d'
  on-tertiary-fixed-variant: '#454749'
  background: '#faf8fe'
  on-background: '#1a1b1f'
  surface-variant: '#e3e2e7'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

> ## STATUS: APPROVED (owner-confirmed 2026-08-16, documentation-only, no code changed)
>
> **Aetheris Narrative is the approved design direction.** This file was previously out of sync
> — it carried a different, older direction ("Guided Editorial") while
> `DESIGN-REFERENCES/STITCH/MASTER-DESIGN-DECISION.md` already named Aetheris Narrative as
> selected. The owner has now confirmed Aetheris Narrative explicitly, resolving that conflict.
> This file's tokens and prose below are copied verbatim from
> `DESIGN-REFERENCES/STITCH/01-MASTER-DIRECTION/AETHERIS-NARRATIVE/DESIGN.md` — nothing here was
> invented; this file exists to make that same decision available at the repository root without
> requiring a detour into `DESIGN-REFERENCES/`.
>
> **Source-of-truth hierarchy for design decisions, in order:**
> 1. Explicit owner instruction in the current conversation.
> 2. This file (`DESIGN.md`) — root-level, kept in sync with #3 below.
> 3. `DESIGN-REFERENCES/STITCH/MASTER-DESIGN-DECISION.md` — the canonical record of *which*
>    direction is selected and why.
> 4. `DESIGN-REFERENCES/STITCH/01-MASTER-DIRECTION/AETHERIS-NARRATIVE/DESIGN.md` — the full
>    design-system detail for the selected direction (this file mirrors its tokens/prose).
> 5. The approved Entry Experience (`EntryView` in `APPLICATION/ai-digital-learning-dashboard.jsx`)
>    and other existing working behavior — preserved as-is; adapt the visual language to it,
>    not the reverse.
> 6. `DESIGN-REFERENCES/STITCH/02-ALTERNATIVE-DIRECTIONS/` (includes the retired "Guided
>    Editorial" exploration) — retained only for selective comparison or pattern reuse, per
>    `DESIGN-REFERENCES/STITCH/README.md`.
>
> **Application code has not yet been updated to these tokens.**
> `APPLICATION/ai-digital-learning-dashboard.jsx` currently renders plain Tailwind utility
> classes (slate/blue, e.g. `bg-slate-50`, `bg-blue-700`) that are not tied to this token system.
> This file records the *approved direction*, not a claim that the application already
> implements it. Applying these tokens to the application is a future UI task requiring its own
> explicit go-ahead — see `DEVELOPMENT STATE/CLAUDE-WORK-STATE.md` §55.

## Brand & Style

The brand personality is **sophisticated, guided, and modern**. It functions as a premium "Learning Space" for high-level digital and AI skills, necessitating an environment that feels both intellectually stimulating and technically approachable.

The design style is a blend of **Minimalism** and **Modern Editorial**. It prioritizes a "calm and intelligent" rhythm through generous whitespace, high-contrast typography, and a reduced color palette. The visual language conveys authority and clarity, ensuring that complex AI concepts are framed within a structured, easy-to-digest interface. 

Visual interest is maintained through vibrant, high-quality accents and a rigid adherence to a "content-first" hierarchy, where UI chrome recedes to let information lead.

## Colors

The palette is rooted in a high-contrast foundation of pure white backgrounds and deep black text to ensure maximum legibility and an editorial feel.

- **Primary:** A vibrant, electric blue reserved exclusively for call-to-action elements, indicating the "path forward" in the learning journey.
- **Secondary:** Deep Black is used for primary headings and prominent UI borders, establishing a strong structural anchor.
- **Surface:** Off-white and light gray (`#F5F5F7`) are used for secondary containers, subtle grouping, and background offsets to prevent visual fatigue.
- **Status:** Subtle use of semantic colors (success green, warning amber) should be secondary to the primary blue/black/white core.

## Typography

The system utilizes **Hanken Grotesk** across all roles to maintain a cohesive, precise, and contemporary feel. The hierarchy is strictly enforced:

- **Headlines:** Use tight letter-spacing and heavy weights to create "editorial" impact. Headline-xl is intended for hero sections and major module starts.
- **Body Text:** Ample line-height (1.5x minimum) ensures long-form learning content remains readable.
- **Labels:** Used for metadata, small buttons, and navigation items. These may use slightly increased letter-spacing for clarity at small scales.
- **Mobile Scaling:** Large display type scales down aggressively on mobile to maintain the "one-screen, one-thought" philosophy without excessive scrolling.

## Layout & Spacing

The design system employs a **fluid grid** with strict max-widths to preserve the premium editorial feel. 

- **Rhythm:** A base-8 spacing system is used. Large vertical gaps (120px+) between major sections create a sense of "breathing room" and intellectual calm.
- **Margins:** Desktop views use wide horizontal margins (64px) to center content and focus the eye. On mobile, margins reduce to 20px.
- **Alignment:** Content is generally center-aligned for hero and introductory states, shifting to left-aligned for dense learning modules and dashboards.
- **Hierarchy:** Spacing is used as a primary tool for grouping; elements within a card are tightly bound (8-16px), while cards themselves are separated by larger intervals (24-32px).

## Elevation & Depth

Hierarchy is established through **tonal layers** and **low-contrast outlines** rather than heavy shadows.

- **Flat Foundation:** The primary background is flat white. 
- **Containers:** Secondary content lives on light gray surfaces (`#F5F5F7`) or within containers defined by thin, 1px borders in a soft neutral tone.
- **Modals & Overlays:** Use a subtle "floating" effect with high-radius ambient shadows (0px 20px 40px rgba(0,0,0,0.05)). 
- **Active States:** Subtle depth can be hinted at with a 1px inner border or a very slight tonal shift to indicate "pressed" or "active" states.

## Shapes

The shape language is consistently **Rounded**, leaning towards **Pill-shaped** for interactive elements.

- **Primary Buttons:** Should always be pill-shaped (full radius) to contrast against the sharp, structured grid of the text.
- **Cards & Modules:** Use a `rounded-lg` (16px) or `rounded-xl` (24px) corner radius to soften the technical nature of the content.
- **Input Fields:** Utilize a 12px radius to sit comfortably between the card style and the button style.
- **Icons:** Use a consistent 2px stroke weight with rounded caps and joins to match the friendly yet sophisticated aesthetic.

## Components

- **Buttons:** 
  - *Primary:* Pill-shaped, vibrant blue background, white text. No border.
  - *Secondary:* Pill-shaped, light gray background, black text.
  - *Ghost:* Pill-shaped, transparent background, black border (1px).
- **Input Fields:** Minimal design. Soft gray background (`#F5F5F7`), no border in default state, 1px black border on focus.
- **Cards:** White or very light gray background. Minimal 1px border. No shadows except for hover states which may lift slightly.
- **Chips/Labels:** Small, pill-shaped tags used for categorizing skills (e.g., "AI Basics", "Intermediate"). Uses subtle background tints.
- **Progress Indicators:** Thin, horizontal lines using the primary blue to show course completion, maintaining the minimal aesthetic without cluttering the UI.
- **Navigation:** Top-bar navigation is clean with high-contrast text and significant spacing between items. Active states are indicated by a bold weight rather than underlines.
