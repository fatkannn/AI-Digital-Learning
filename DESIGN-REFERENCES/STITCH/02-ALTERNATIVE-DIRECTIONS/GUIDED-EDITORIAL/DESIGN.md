---
name: Guided Editorial
colors:
  surface: '#fbf8ff'
  surface-dim: '#dad9e3'
  surface-bright: '#fbf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f2fd'
  surface-container: '#eeedf7'
  surface-container-high: '#e8e7f1'
  surface-container-highest: '#e3e1ec'
  on-surface: '#1a1b22'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3038'
  inverse-on-surface: '#f1effa'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#705d00'
  on-secondary: '#ffffff'
  secondary-container: '#fcd400'
  on-secondary-container: '#6e5c00'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1a1c1c'
  on-tertiary-container: '#838484'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#ffe16d'
  secondary-fixed-dim: '#e9c400'
  on-secondary-fixed: '#221b00'
  on-secondary-fixed-variant: '#544600'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf8ff'
  on-background: '#1a1b22'
  surface-variant: '#e3e1ec'
typography:
  display-lg:
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
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
  label-md:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-sm:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  edge-margin-desktop: 40px
  edge-margin-mobile: 20px
  gutter-grid: 24px
  section-gap: 48px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 24px
---

## Brand & Style

This design system is built upon a **Modern Corporate** aesthetic with strong **Editorial** influences. It prioritizes clarity, intelligence, and a premium "guided" experience. The personality is sophisticated yet accessible, utilizing generous white space and a structured typographic hierarchy to reduce cognitive load. 

The visual language balances the authority of deep blacks and soft grays with a vibrant, high-energy action color that signals intent and progress. The system focuses on a "containerized" layout where information is organized into distinct, soft-edged modules, creating a sense of order and calm within complex data environments.

## Colors

The palette is anchored by a high-contrast foundation to ensure legibility and a premium feel.

- **Primary (Deep Black):** Used for primary text, sidebars, and high-emphasis backgrounds. It provides the "ink" for the editorial feel.
- **Secondary (Action Gold):** A vibrant, saturated yellow/gold reserved exclusively for calls-to-action (CTAs) and active states. It acts as a beacon within the neutral interface.
- **Surface & Backgrounds:** A range of soft grays (`#F4F4F4`, `#FAFAFA`) are used to create subtle separation between layout sections without the harshness of pure white.
- **Accents:** Functional grays are used for secondary information and borders to maintain a low-noise environment.

## Typography

The typography system employs **Hanken Grotesk** for headings and labels to provide a sharp, contemporary character, paired with **Inter** for body copy to ensure maximum readability in data-dense areas.

- **Editorial Headings:** Use tight letter-spacing and bold weights to create impact.
- **Body Copy:** Maintains a generous line-height to foster the "calm" breathing room requested.
- **Hierarchical Contrast:** Large size differentials between headlines and body text are used to guide the user's eye through the content sections effectively.

## Layout & Spacing

This design system utilizes a **Fixed-Fluid Hybrid Grid**. On desktop, the sidebar remains fixed at 280px, while the main content area occupies a fluid container with a maximum width of 1440px.

- **Grid:** A 12-column system with 24px gutters. Elements typically span 3, 4, 6, or 12 columns.
- **Vertical Rhythm:** Spacing is based on an 8px base unit. Section headers are separated from their content by 24px (stack-lg), while internal card elements use 16px (stack-md).
- **Safe Areas:** Generous 40px outer margins on desktop ensure the content feels framed and premium, rather than cramped against the edge of the viewport.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and extremely **Soft Ambient Shadows**. 

1. **Base:** The main background is a very soft gray (#F8F8F8).
2. **Surface:** White cards sit on top of the base with a subtle border (1px #EEEEEE) and a soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)).
3. **Emphasis:** Dark surfaces (Deep Black) are used for high-contrast modules or sidebars to anchor the layout.
4. **Interactive:** On hover, cards may lift slightly by increasing shadow opacity or shifting Y-offset by 2px, but should never feel "floating" excessively.

## Shapes

The shape language is defined by "Soft-Rounded" geometry. 

- **Standard Containers:** Cards and primary layout modules use a 16px (1rem) corner radius.
- **Interactive Elements:** Buttons and small chips use a "Pill" shape or a minimum of 12px radius to maintain a friendly, modern feel.
- **Imagery:** Photos and thumbnails must always follow the container's corner radius to ensure a cohesive, "nested" appearance.

## Components

### Buttons & CTAs
- **Primary CTA:** Background: Action Gold (#FFD700); Text: Deep Black (#121212); Weight: Bold; Shape: Rounded-Rect (12px) or Pill.
- **Secondary CTA:** Background: White; Border: 1px #EEEEEE; Text: Deep Black; Shape: Same as primary.
- **Ghost Button:** No background; Text: Deep Black with a leading icon.

### Cards
- **Editorial Cards:** Minimalist white containers with 16px padding. Titles are `headline-md`. Features a subtle 1px border.
- **Image Cards:** Overlaid text should use a dark gradient scrim at the bottom (40% opacity to 0%) to ensure legibility of white `label-md` text.

### Input Fields
- **Search Bar:** Large, pill-shaped, with a light gray background (#F0F0F0). Placeholder text in `neutral_color`.
- **Form Inputs:** Soft-gray backgrounds with 12px rounded corners. Focus state indicated by a 2px Action Gold border.

### Navigation
- **Sidebar:** Deep Black background. Active items use the Action Gold for the icon or a small vertical indicator bar. Text remains high-contrast white or light gray.
- **Breadcrumbs / Tabs:** Simple text-based navigation with a bold weight for active states and a subtle underline.