---
name: Harsh Panchal Portfolio
colors:
  surface: '#fbf9fb'
  surface-dim: '#dbd9dc'
  surface-bright: '#fbf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#efedf0'
  surface-container-high: '#e9e7ea'
  surface-container-highest: '#e4e2e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#44474d'
  inverse-surface: '#303033'
  inverse-on-surface: '#f2f0f3'
  outline: '#75777e'
  outline-variant: '#c4c6ce'
  surface-tint: '#4d5f7d'
  primary: '#000615'
  on-primary: '#ffffff'
  primary-container: '#0b1f3a'
  on-primary-container: '#7587a7'
  inverse-primary: '#b5c7ea'
  secondary: '#405f8d'
  on-secondary: '#ffffff'
  secondary-container: '#abcbfe'
  on-secondary-container: '#355582'
  tertiary: '#000714'
  on-tertiary: '#ffffff'
  tertiary-container: '#112032'
  on-tertiary-container: '#79889e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d6e3ff'
  primary-fixed-dim: '#b5c7ea'
  on-primary-fixed: '#071c36'
  on-primary-fixed-variant: '#364764'
  secondary-fixed: '#d5e3ff'
  secondary-fixed-dim: '#a9c8fb'
  on-secondary-fixed: '#001c3b'
  on-secondary-fixed-variant: '#274773'
  tertiary-fixed: '#d5e3fc'
  tertiary-fixed-dim: '#b9c7df'
  on-tertiary-fixed: '#0d1c2e'
  on-tertiary-fixed-variant: '#3a485b'
  background: '#fbf9fb'
  on-background: '#1b1b1e'
  surface-variant: '#e4e2e5'
typography:
  display:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 40px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 128px
---

## Brand & Style
The brand personality is rooted in high-end craft, intellectual rigor, and editorial clarity. It targets sophisticated tech recruiters, startup founders, and design-conscious engineering teams. The emotional response should be one of immediate trust, "quiet luxury," and technical competence.

This design system utilizes a **Minimalist-Corporate hybrid** style. It draws heavily from the Apple and Vercel aesthetic: maximum whitespace, a disciplined color palette, and a focus on "the work" rather than the UI itself. The interface acts as a silent gallery frame—stable, high-quality, and intentional. Every element is justified; nothing is purely decorative.

## Colors
The palette is built on a "Warm Studio" foundation. By using an off-white champagne background instead of pure white, the design feels more like a physical portfolio or a high-end publication.

- **Background**: #F7F4EE (The canvas, providing a soft, non-clinical feel).
- **Surface**: #FFFFFF (Used for elevated cards and modal containers to create distinct layers).
- **Primary Text**: #0B1F3A (Deep Navy, used for headers to provide a more sophisticated contrast than pure black).
- **Secondary Text**: #475569 (Cool slate for body copy and metadata).
- **Accent**: #183B66 (Deep Indigo, reserved for interactive states and primary actions).
- **Border**: #E7E5E4 (A low-contrast stone color for subtle structure).

## Typography
This design system uses **Geist** exclusively for its technical precision and wide tracking options. The hierarchy relies on extreme scale differences rather than color changes.

- **Headlines**: Set at weight 500 with tight letter-spacing to create a "dense" and professional look. 
- **Body**: Set at weight 400 with generous line-height (1.6) to ensure maximum readability against the warm background.
- **Labels**: Used for tags and categories; these should occasionally use uppercase with light tracking (+0.02em) to distinguish them from body prose.

## Layout & Spacing
The layout follows a **Fixed-Fluid hybrid** model. Content is centered within a 1200px container on desktop, but margins are generous (64px) to create an editorial feel.

- **Grid**: A 12-column grid is used for project showcases, while a 1-column centered layout is used for deep-dive case studies.
- **Rhythm**: All spacing is a multiple of 4px. Use extreme vertical padding (128px+) between major sections to allow the design to "breathe."
- **Mobile**: On mobile devices, margins shrink to 20px, and section gaps reduce to 64px. All multi-column grids collapse to a single stack.

## Elevation & Depth
Depth is created through **Warm Ambient Shadows** and **Tonal Layering** rather than traditional heavy dropshadows.

- **Level 1 (Background)**: #F7F4EE.
- **Level 2 (Cards/Containers)**: #FFFFFF with a 1px border (#E7E5E4) and a very soft, diffused shadow: `0 4px 24px -2px rgba(11, 31, 58, 0.04)`.
- **Level 3 (Hover States)**: Shadows should tighten and become slightly darker: `0 12px 32px -4px rgba(11, 31, 58, 0.08)`.

Avoid any blurs or glassmorphism that might compromise the "paper-like" quality of the UI.

## Shapes
The shape language is disciplined and "Soft-Formal." 

- **Standard Elements**: Buttons and inputs use a 0.25rem (4px) radius. This sharp-but-not-jagged look communicates precision.
- **Large Elements**: Project cards and image containers use a 0.75rem (12px) radius to feel approachable and modern.
- **Interactive Indicators**: Small elements like tags or "status dots" remain sharp or slightly rounded to maintain the technical aesthetic.

## Components

### Buttons
- **Primary**: Solid #0B1F3A background, #FFFFFF text. No border. Micro-interaction: Magnetic pull effect on hover.
- **Secondary**: Transparent background, 1px border #E7E5E4, #0B1F3A text. Subtle shift to #FFFFFF background on hover.

### Cards (Project Showcases)
- **Style**: White surface, 1px #E7E5E4 border, soft shadow.
- **Imagery**: Product-focused screenshots should have a "natural" drop shadow within the card to feel like a physical object resting on the surface.
- **Interaction**: Subtle 3D tilt effect on mouse-move.

### Inputs
- **Style**: Subtle #F7F4EE fill with a 1px #E7E5E4 border. Focus state should change the border color to #183B66 with no "glow."

### Lists & Navigation
- **Navigation**: Minimalist text links. Active state indicated by a small 4px navy dot beneath the text rather than an underline.
- **Lists**: Bullet points replaced with horizontal lines (dash) to reinforce the linear, technical feel.

### Status Chips
- **Style**: Small, uppercase text. Background should be a very pale tint of the accent color (e.g., #183B66 at 5% opacity).