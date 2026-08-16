---
name: Lumina Editorial
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
  on-surface-variant: '#414754'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#717785'
  outline-variant: '#c1c6d6'
  surface-tint: '#005db7'
  primary: '#005bb3'
  on-primary: '#ffffff'
  primary-container: '#0073e0'
  on-primary-container: '#fefcff'
  inverse-primary: '#a9c7ff'
  secondary: '#8c5000'
  on-secondary: '#ffffff'
  secondary-container: '#fe9400'
  on-secondary-container: '#633700'
  tertiary: '#006b27'
  on-tertiary: '#ffffff'
  tertiary-container: '#008733'
  on-tertiary-container: '#f7fff2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#a9c7ff'
  on-primary-fixed: '#001b3d'
  on-primary-fixed-variant: '#00468c'
  secondary-fixed: '#ffdcbf'
  secondary-fixed-dim: '#ffb874'
  on-secondary-fixed: '#2d1600'
  on-secondary-fixed-variant: '#6a3b00'
  tertiary-fixed: '#72fe88'
  tertiary-fixed-dim: '#53e16f'
  on-tertiary-fixed: '#002107'
  on-tertiary-fixed-variant: '#00531c'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 26px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
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
  container-margin: 32px
  gutter: 24px
  card-padding: 24px
  section-gap: 48px
---

## Brand & Style

This design system is built for a premium, guided learning experience that prioritizes cognitive clarity over typical dashboard density. It draws inspiration from modern editorial design and minimalist digital interfaces to create an environment that feels both intelligent and calm.

The brand personality is **academic yet accessible**. It avoids the aggressive "productivity" aesthetic of typical SaaS in favor of an **editorial minimalism** style. This is achieved through generous white space, a light-filled color palette, and a focus on high-quality typography that guides the learner's eye naturally through their educational journey. The visual tone should evoke a sense of focused tranquility, similar to a high-end physical workspace.

## Colors

The palette is anchored in a clean, expansive base of whites and cool grays to maximize perceived space. 

- **Primary Blue:** Used for critical actions, active navigation states, and progress indicators. It is vibrant but professional.
- **Secondary Orange:** A purposeful accent for "focus" elements, urgent deadlines, or highlighting specific achievements.
- **Tertiary Green:** Reserved for success states and completed milestones.
- **Neutrals:** A range of soft grays (from #F4F7F9 to #6C757D) is used to create subtle depth and hierarchy without the harshness of pure black or heavy borders.

## Typography

The system utilizes **Hanken Grotesk** for headlines to provide a sharp, contemporary, and premium feel. Its clean geometry excels at larger scales, providing the "editorial" character required. **Inter** is used for all body text and UI labels to ensure maximum legibility and a systematic, functional feel in dense information areas.

Hierarchy is established through weight and size rather than color shifts. Large headlines should use tight letter-spacing to maintain a sophisticated look. For mobile views, headline sizes are significantly reduced to prevent awkward line breaks while maintaining their relative visual weight.

## Layout & Spacing

This design system employs a **fixed-fluid hybrid grid**. On desktop, the layout utilizes a three-column structure: 
1. **Left Rail:** 240px fixed width for primary navigation.
2. **Main Feed:** Fluid width for core learning content and data visualizations.
3. **Right Profile Sidebar:** 320px fixed width for personalized metrics and calendar.

The spacing rhythm is based on an **8px base unit**. Generous internal card padding (24px) and large gaps between sections (48px) are mandatory to prevent the "dashboard clutter" mentioned in the brief. Elements should breathe; if in doubt, increase the whitespace.

## Elevation & Depth

Depth is conveyed through **tonal layering** and **ambient shadows** rather than hard lines.

- **Level 0 (Background):** The base canvas (#F4F7F9).
- **Level 1 (Cards/Sidebar):** Pure white (#FFFFFF) surfaces with a very soft, diffused shadow (0px 4px 20px rgba(0,0,0,0.04)).
- **Level 2 (Active/Hover):** Enhanced shadow (0px 10px 30px rgba(0,0,0,0.08)) to indicate interactivity.
- **Glow Effects:** Primary CTA buttons should feature a subtle colored drop shadow (a "glow") using a low-opacity version of the button's background color to make them feel "light-emitting" and premium.

## Shapes

The shape language is defined by **expansive, soft corners**. 
- Standard UI components (buttons, inputs) use a **12px - 16px radius**.
- Large containers and cards use a **24px radius** to create a friendly, modern silhouette.
- Interaction states should never use sharp corners; the "softness" of the interface is a key differentiator from clinical enterprise software.

## Components

### Buttons
Primary buttons are pill-shaped or highly rounded (16px+), featuring a solid primary color background and a subtle glow shadow. Secondary buttons should use a soft gray background (#F1F3F5) with no border.

### Input Fields
Inputs should be minimal, utilizing a subtle light-gray background and no border until focused. On focus, a 2px primary-colored border or a soft outer glow is applied.

### Progress Visualizations
Progress bars and charts (like the "Time Spends" chart in the reference) should use highly rounded caps and vibrant, solid fills. Avoid thin lines; use bold, structural shapes for data.

### Cards
Cards are the primary container unit. They must always have a white background, the Level 1 shadow, and a 24px corner radius. Content within cards should be grouped using 16px internal spacing.

### Navigation Links
Navigation items in the sidebar should use a "ghost" style when inactive, and a soft tinted background with a high-contrast label when active.