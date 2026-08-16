---
name: Lumina Intellect
colors:
  surface: '#fbf9f3'
  surface-dim: '#dbdad4'
  surface-bright: '#fbf9f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f4ee'
  surface-container: '#efeee8'
  surface-container-high: '#eae8e2'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#41493a'
  inverse-surface: '#30312d'
  inverse-on-surface: '#f2f1eb'
  outline: '#717a68'
  outline-variant: '#c1cab5'
  surface-tint: '#2f6c00'
  primary: '#2f6c00'
  on-primary: '#ffffff'
  primary-container: '#9fe870'
  on-primary-container: '#2e6900'
  inverse-primary: '#91d963'
  secondary: '#47672d'
  on-secondary: '#ffffff'
  secondary-container: '#c5eba3'
  on-secondary-container: '#4b6c31'
  tertiary: '#5d5f5f'
  on-tertiary: '#ffffff'
  tertiary-container: '#d4d5d5'
  on-tertiary-container: '#5a5c5c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#acf67c'
  primary-fixed-dim: '#91d963'
  on-primary-fixed: '#092100'
  on-primary-fixed-variant: '#225100'
  secondary-fixed: '#c8eea5'
  secondary-fixed-dim: '#acd28c'
  on-secondary-fixed: '#0c2000'
  on-secondary-fixed-variant: '#304f18'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f3'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
typography:
  display-lg:
    fontFamily: Anton
    fontSize: 80px
    fontWeight: '400'
    lineHeight: '1.0'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Anton
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Anton
    fontSize: 36px
    fontWeight: '400'
    lineHeight: '1.1'
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 30px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  section-gap: 120px
---

## Brand & Style
The design system is built on a foundation of **Modern Minimalism** with an **Editorial** flair. It is designed to facilitate a premium "Digital & AI Learning Journey," where the interface acts as a silent, intelligent guide rather than a distraction. 

The brand personality is authoritative yet accessible—combining the high-impact confidence of modern fintech with the clarity of high-end educational platforms. It evokes a sense of "intellectual momentum" through:
- **Bold Intentionality:** High-contrast typography that commands attention for key concepts.
- **Airy Sophistication:** Massive whitespace to reduce cognitive load during complex AI learning.
- **Vibrant Precision:** A singular "Wise-inspired" accent color that signals action and progress against a neutral, high-end backdrop.

## Colors
The palette centers on the high-energy **Wise Green** (#9FE870), used strategically for primary actions and progress indicators. 

- **Primary:** The signature lime green represents growth and digital fluency. It should be paired with dark text for accessibility.
- **Neutral/Text:** We use a deep, "off-black" (#0E0F0C) for headings to ensure maximum contrast without the harshness of pure black.
- **Surface:** A pure white (#FFFFFF) base is supplemented by a very subtle greenish-grey (#F2F5F0) for secondary containers and background sections to maintain the premium, clean feel.

## Typography
The typographic system creates a stark hierarchy. **Anton** is used for high-impact headlines, mimicking the "Wise" editorial style—bold, condensed, and powerful. **Inter** provides a highly legible, neutral balance for complex educational content.

- **Headlines:** Always uppercase when using Anton to maintain the "monumental" look.
- **Body Text:** Generous line-heights (1.6x) are required to ensure readability during long-form learning sessions.
- **Scale:** Use the `display-lg` sparingly for hero sections; `headline-lg` should be the standard for chapter starts.

## Layout & Spacing
This design system utilizes a **12-column fluid grid** with exceptionally wide margins to create an "editorial" feel. 

- **Breathing Room:** Sections are separated by large vertical gaps (`section-gap`) to allow the user to digest AI concepts one at a time.
- **Alignment:** All content is centered within a 1200px max-width container. 
- **Mobile:** On mobile, margins shrink to 20px, and the 12-column grid collapses to a single column, but the generous vertical padding remains to preserve the "premium" sense of space.

## Elevation & Depth
In keeping with the minimal aesthetic, this design system avoids traditional shadows. 

- **Flat Layering:** Hierarchy is achieved through color blocking and high-contrast outlines rather than depth. 
- **Subtle Borders:** Use 1px solid borders in the `secondary_color` at low opacity (10-15%) for card definitions.
- **Overlays:** When modals are necessary, use a solid white background with a clean, 100% black backdrop at 40% opacity to maintain the high-contrast theme without using blurs.

## Shapes
The shape language is **distinctly pill-shaped and friendly**. This softens the "industrial" feel of the bold typography and the "technical" nature of AI.

- **Primary Radius:** Components like buttons and input chips use a full pill radius.
- **Secondary Radius:** Cards and large containers use `rounded-xl` (1.5rem/24px) to maintain a modern, "app-like" feel while remaining approachable.

## Components
- **Primary Buttons:** Large, pill-shaped, using `primary_color_hex` with `neutral_color_hex` text. Text must be bold/heavy weight.
- **Input Fields:** Clean, minimal bottom-border only or very light rounded containers. Focus states should use a 2px `primary_color_hex` border.
- **Learning Cards:** Large white surfaces with `rounded-xl` corners. Use `body-lg` for card descriptions to keep text prominent.
- **Progress Bars:** Thin, 4px lines using the Wise Green against a light grey track.
- **Icons:** 2px stroke width, monochrome (neutral_color), with no fills. Icons should be functional and geometric.
- **AI "Insights" Chips:** Small pill-shaped tags with a subtle green tint background and dark green text to highlight AI-generated suggestions.