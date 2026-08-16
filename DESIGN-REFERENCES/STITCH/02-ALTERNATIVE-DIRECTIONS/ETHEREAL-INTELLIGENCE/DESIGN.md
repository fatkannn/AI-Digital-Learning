---
name: Ethereal Intelligence
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#434655'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#737686'
  outline-variant: '#c3c6d7'
  surface-tint: '#0053db'
  primary: '#004ac6'
  on-primary: '#ffffff'
  primary-container: '#2563eb'
  on-primary-container: '#eeefff'
  inverse-primary: '#b4c5ff'
  secondary: '#712ae2'
  on-secondary: '#ffffff'
  secondary-container: '#8a4cfc'
  on-secondary-container: '#fffbff'
  tertiary: '#54545d'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c6c76'
  on-tertiary-container: '#f0eefa'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dbe1ff'
  primary-fixed-dim: '#b4c5ff'
  on-primary-fixed: '#00174b'
  on-primary-fixed-variant: '#003ea8'
  secondary-fixed: '#eaddff'
  secondary-fixed-dim: '#d2bbff'
  on-secondary-fixed: '#25005a'
  on-secondary-fixed-variant: '#5a00c6'
  tertiary-fixed: '#e3e1ed'
  tertiary-fixed-dim: '#c7c5d1'
  on-tertiary-fixed: '#1a1b23'
  on-tertiary-fixed-variant: '#46464f'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
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
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  button-text:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap: 80px
  content-gap: 32px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 120px
---

## Brand & Style

This design system is built for a "Learning Space"—an environment that prioritizes focus, cognitive clarity, and a sense of progression. The visual narrative combines **Minimalism** with an **Editorial** layout, utilizing heavy whitespace to reduce cognitive load while employing precise, technical accents that suggest AI-driven sophistication.

The tone is premium and calm. It avoids the cluttered "utility" of a traditional dashboard in favor of an immersive, intentional interface. Every element is designed to feel light yet authoritative, guiding the user through their digital learning journey with a sense of rhythm and purpose.

## Colors

The palette is anchored in a sophisticated "Professional Calm." It uses a clean white base with subtle light-gray transitions to define surfaces without the need for heavy borders. 

- **Primary (Electric Blue):** Reserved for the most important calls to action and primary progress indicators.
- **Secondary (Deep Violet):** Used for AI-driven insights, special highlights, and "Powered by AI" elements.
- **Surface & Background:** Utilizes a wash of extremely light purples and grays to differentiate "the stage" from "the content."
- **Typography:** High-contrast slate and navy are used for maximum legibility, ensuring an accessible and premium reading experience.

## Typography

The typography system is engineered for long-form reading and clear navigation. 

- **Manrope** provides a modern, geometric foundation for headlines that feels structural and intelligent. 
- **Hanken Grotesk** is used for body text; its generous x-height and open apertures make it exceptionally readable for educational content. 
- **JetBrains Mono** is used sparingly for labels, metadata, and "AI Status" indicators to provide a subtle nod to the technical, data-driven nature of the platform.

## Layout & Spacing

The layout follows an **Editorial Fluid Grid**. It is designed to feel like a high-end digital publication rather than a software tool.

- **Editorial Rhythm:** Use generous vertical spacing (`section-gap`) between different learning modules to allow the user to "breathe" between concepts.
- **Alignment:** Content is typically center-aligned or offset with large margins to create a focused reading column (max-width: 800px for text content).
- **Grid:** A 12-column grid is used for dashboard-style views, but content-heavy pages should prioritize a single-column flow with "break-out" elements for imagery or data visualizations.

## Elevation & Depth

This system avoids heavy drop shadows in favor of **Tonal Layers** and **Soft Ambient Occlusion**.

- **Surface Tiers:** Use subtle shifts in background color (White to #F8FAFC) to indicate hierarchy. 
- **The "Floating Card":** For primary content containers, use an extremely diffused, low-opacity shadow (Color: Primary mixed with 5% Black, Blur: 40px, Y-Offset: 10px) to give the impression of elements resting on a bed of light.
- **Glassmorphism:** Use backdrop blurs (20px) and 80% opacity on navigation bars and floating AI assistance panels to maintain a sense of place and depth.

## Shapes

The shape language is "Soft-Modern." Elements use a consistent `0.5rem` (8px) base radius to feel approachable and friendly, while avoiding the overly "bubbly" look of a consumer social app.

- **Primary Buttons:** Use `rounded-lg` (16px) to match the prominent CTA style.
- **Input Fields:** Use the base `rounded` (8px) for a more structured, functional feel.
- **Learning Cards:** Use `rounded-xl` (24px) for large containers to signal they are significant, distinct areas of the journey.

## Components

### Buttons
- **Primary:** Solid blue (#2563EB), white text, bold weight. Minimal hover state (slight darken).
- **Secondary/Outline:** Transparent background with a subtle gray border (#E2E8F0) and slate text.
- **AI Action:** Gradient border (Blue to Purple) with a soft violet glow.

### Input Fields
Clean, minimal lines. Only the bottom border is visible in "focused" mode to mimic a notebook or ledger, or a subtle light-gray stroke for "boxed" inputs in data-heavy views.

### Learning Chips
Small, pill-shaped tags used for "Module Category" or "Time to Complete." Use low-saturation background tints (e.g., light blue background with dark blue text).

### Progress Indicators
Use a "Liquid" progress bar style—thin, high-contrast lines that fill with a subtle gradient as the user progresses.

### Icons
Line-based, 2px stroke width, with slightly rounded terminal ends. Icons should be monochrome (Slate) unless they are specifically signaling an AI feature, in which case they use the Purple-to-Blue gradient.