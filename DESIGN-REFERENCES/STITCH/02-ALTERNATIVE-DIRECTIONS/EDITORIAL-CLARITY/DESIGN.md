---
name: Editorial Clarity
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#444748'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#595f66'
  on-secondary: '#ffffff'
  secondary-container: '#dde3eb'
  on-secondary-container: '#5f656c'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#410004'
  on-tertiary-container: '#f04244'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#dde3eb'
  secondary-fixed-dim: '#c1c7cf'
  on-secondary-fixed: '#161c22'
  on-secondary-fixed-variant: '#41474e'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930014'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 56px
    fontWeight: '700'
    lineHeight: 64px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  section-gap: 80px
---

## Brand & Style

This design system is built on the principles of high-end editorial design: clarity, intent, and an uncompromising focus on content. It targets an audience that values sophistication and effortless utility, evoking a sense of calm intelligence.

The visual style is a fusion of **Corporate Modern** and **Minimalism**, elevated by soft, atmospheric **Glassmorphism**. It utilizes expansive white space to let typography breathe, punctuated by precise, high-contrast interactive elements. The aesthetic is professional yet approachable, leaning into a "premium tool" feel rather than a rigid enterprise application.

## Colors

The palette is rooted in a "Ink on Paper" philosophy. The primary color is a deep, nearly-black gray used for primary text and high-action CTAs, ensuring maximum legibility and authority. 

A soft background gradient is employed to create a sense of environmental depth, moving from pure white to a very light, desaturated blue-gray. The secondary color is used for borders and subtle hairlines, while the tertiary color—a vibrant, warm red—is reserved for high-visibility highlights, status indicators, or specific brand accents. Neutral tones handle the heavy lifting of UI containers and surface layering.

## Typography

The typography system uses a pairing of **Hanken Grotesk** for headlines and **Inter** for body and UI labels. This combination balances the sharp, contemporary character of a display face with the industry-standard legibility of a functional grotesque.

Headlines should use tight letter-spacing and generous line-height to maintain an editorial feel. `Label-sm` is specifically designed for metadata and overlines, often utilizing uppercase styling to create a clear visual distinction from body text. Use `display-lg` sparingly for landing moments and high-impact headers.

## Layout & Spacing

The system follows a **Fluid Grid** model with a hard cap on container width to maintain readability. We use an 8px base unit for all spatial relationships. 

- **Desktop:** 12-column grid with 24px gutters and 48px side margins.
- **Tablet:** 8-column grid with 20px gutters and 32px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Horizontal rhythm is vital; ensure that text blocks never exceed a comfortable reading width (approx. 650px) regardless of the container size. Use "Section Gaps" (80px+) to clearly demarcate different content areas, reinforcing the premium, spacious feel.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and **Backdrop Blurs** rather than traditional heavy shadows.

- **Level 0 (Base):** The canvas, using the background gradient.
- **Level 1 (Cards/Containers):** Pure white backgrounds with a 1px solid border (#F1F4F9) or an extremely subtle 4% black shadow with a 20px blur.
- **Level 2 (Overlays/Modals):** Glassmorphic surfaces with a 12px backdrop blur and 80% white opacity.
- **Level 3 (Popovers):** Sharp 8% black shadow with 30px blur and 0px spread to indicate float without visual clutter.

## Shapes

The design system uses a **Rounded** (Level 2) shape language. Standard UI components like input fields and small cards use a 0.5rem (8px) radius. Larger cards and primary containers transition to `rounded-lg` (16px) or `rounded-xl` (24px) to emphasize their role as distinct content modules. CTAs and secondary buttons use a slightly higher radius to feel more tactile and approachable.

## Components

- **Buttons:** Primary CTAs are high-contrast (Dark Gray/Black background with White text), featuring bold Hanken Grotesk labels. Secondary buttons use a light gray ghost style or subtle borders.
- **Input Fields:** Minimalist design with a 1px #E2E8F0 border that shifts to #1A1A1A on focus. Labels sit clearly above the field in `label-md`.
- **Cards:** Used as the primary content vessel. Cards should have generous internal padding (min 24px) and use `headline-sm` for titles.
- **Chips/Badges:** Used for status (e.g., "Live", "Upcoming"). These should have a slightly more rounded radius (pill-style) and use `label-sm` for high-density information.
- **Timeline Indicators:** For event lists, use a vertical hairline with small nodes to create a sense of chronological flow, keeping the nodes visually light.