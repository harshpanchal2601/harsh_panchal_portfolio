# Current UI System

## Purpose

This document is the corrected source of truth for the currently implemented portfolio UI.

It reflects the actual UI found in:

- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/layout/site-header.tsx`
- `src/components/layout/mobile-navigation.tsx`
- `src/components/layout/site-footer.tsx`
- `src/sections/home/*`
- `src/app/(site)/projects/*`
- `src/app/(site)/contact/page.tsx`
- `UI_AUDIT.md`

This document intentionally does not follow the older dark-first direction in `DESIGN_SYSTEM.md` where that conflicts with the current product.

## 1. Current Design Direction

The current portfolio is a soft-light portfolio system, not a dark cinematic one.

Current visual identity:

- Warm cream page background
- White and translucent white surfaces
- Purple and indigo accent color system
- Soft grid texture and light radial glow backgrounds
- Rounded cards, rounded pill buttons, and soft shadows
- Clean modern portfolio layout with light SaaS influence
- Product-builder and full-stack engineer personality

The site reads as:

- approachable
- technical
- modern
- polished
- calm
- product-focused

What it is not anymore:

- not dark-first
- not cinematic luxury
- not editorial drama
- not monochrome minimal

Recommended direction going forward:

- keep the soft-light theme
- keep the warm cream foundation
- keep the current purple/indigo accent language
- refine consistency rather than changing visual direction again

## 2. Corrected Color System

### Design Intent

The actual implementation uses a warm light base, dark neutral text, white surfaces, and cool purple accents with soft beige support tones.

### Corrected Semantic Tokens

These names match the implemented palette more clearly than the current legacy token names:

| Corrected Token | Current Value | Current Source Token(s) | Usage |
| --- | --- | --- | --- |
| `--background-cream` | `#f7f4ef` | `--background`, `--void` | Main page background |
| `--background-cream-deep` | `#f5f2ec` | hardcoded / `.mesh-gradient` | Section gradient base, Career Journey band |
| `--surface-white` | `#ffffff` | `--card`, `--popover`, `--charcoal` | Cards, buttons, panels, nav sheet items |
| `--surface-soft` | `#eee9df` | `--muted` | Soft muted backgrounds and supporting surfaces |
| `--surface-glass` | `rgba(255,255,255,0.72-0.82)` | utility usage | Glass cards, translucent panels |
| `--text-primary` | `#171717` | `--foreground`, `--ink`, `--mist` | Headlines, logo, primary copy |
| `--text-muted` | `#5f5a52` | `--muted-foreground`, `--smoke` | Body copy, metadata, nav links |
| `--text-subtle` | `#817a70` | `--ash` | Optional muted secondary text |
| `--accent-primary` | `#6d5ef6` | `--primary`, `--champagne`, `--ring` | Primary buttons, icons, links, labels |
| `--accent-secondary` | `#5b6cff` | `--accent`, `--bronze` | Primary button hover, secondary accent states |
| `--accent-warm` | `#d7c7a3` | `--secondary`, `--copper` | Warm glow, secondary radial accent |
| `--accent-cool-soft` | `#dbe3ff` | `--steel` | Reserved cool support accent |
| `--accent-neutral-soft` | `#ece6d8` | `--sage` | Reserved soft neutral accent |
| `--border-soft` | `rgba(23,23,23,0.1)` | `--border` | Borders and dividers |
| `--input-soft` | `rgba(23,23,23,0.12)` | `--input` | Inputs |
| `--shadow-soft` | `rgba(23,23,23,0.05-0.08)` | component shadows | Cards and panels |
| `--shadow-medium` | `rgba(23,23,23,0.08-0.14)` | component shadows | Hero cards, feature cards, dark CTA panels |
| `--shadow-accent` | `rgba(109,94,246,0.12-0.28)` | hover/CTA shadows | Accent glow and hover elevation |

### Color Mapping Notes

Current legacy names that do not match reality:

- `--champagne` is actually purple
- `--bronze` is actually indigo-blue
- `--copper` is actually warm beige
- `--sage` is actually soft cream-neutral
- `--charcoal` is actually white

These should be treated as legacy implementation names, not design-language names.

### Colors To Keep

- `#f7f4ef` as the main background
- `#ffffff` for primary surfaces
- `#171717` for core text
- `#5f5a52` for body and supporting text
- `#6d5ef6` as the main accent
- `#5b6cff` as the accent hover/state color
- `#d7c7a3` as the warm support accent
- soft translucent white surfaces
- thin dark-neutral borders

### Colors To Avoid

- returning to dark charcoal page backgrounds as the primary system
- adding strong new hue families that fight the current palette
- saturated reds/oranges as general UI accents
- heavy purple gradients across large areas
- pure gray flat backgrounds that break the warm tone

### Hardcoded Colors To Replace Later

These are acceptable now but should be tokenized in a later refinement pass:

- `#f5f2ec`
  - used in `.mesh-gradient`
  - used in `src/sections/home/career-journey-section.tsx`
  - used in project placeholder gradients

- `rgba(109, 94, 246, ...)`
  - repeated across shadows, glows, and radial treatments

- `rgba(215, 199, 163, ...)`
  - repeated across warm radial backgrounds

- `rgba(23, 23, 23, ...)`
  - repeated across shadows and grid lines

## 3. Typography System

### Current Fonts

- Display and heading font: `DM Sans`
  - configured in `src/app/layout.tsx`
  - mapped to `--font-display` and `--font-heading`

- Body font: `Inter`
  - configured in `src/app/layout.tsx`
  - mapped to `--font-sans`

- Mono font:
  - currently also `Inter`
  - there is no distinct mono face in the current implementation

### Current Typography Usage

Hero heading:

- homepage hero: `34px` mobile, `42px` small, `64px` medium, `72px` large
- contact hero: `42px`, `56px`, `72px`
- large case-study hero titles: `42px`, `56px`, `68-72px`

Page and section headings:

- most sections: `32px` mobile, `44px` medium, `48px` large
- smaller project sections: `32px` mobile, `44px` medium

Card titles:

- `22px`
- `24px`
- `26px`
- `28px`
- `30px`
- `32px`

Body text:

- standard copy: `16px`
- larger supporting copy: `18px`
- some lead copy: `20px`
- common line-height: around `1.75`

Labels:

- generally `12px`
- uppercase
- `tracking-[0.18em]`
- semibold

Buttons:

- header buttons: `14px`, semibold
- main page buttons: base body size, semibold
- rounded full-pill styling

### Current Typography Issues

- card title sizes are close but not standardized
- case-study pages repeat the same heading pattern inline instead of through one shared system
- the marquee typography is visually stronger than some content sections
- mobile hero copy is constrained by `max-w-[340px]`, which can make line breaks feel tighter than necessary
- labels are used frequently enough that the uppercase metadata pattern can lose emphasis

### Corrected Typography Scale For Refinement

This scale keeps the current look while making future refinement cleaner:

| Role | Mobile | Desktop | Notes |
| --- | --- | --- | --- |
| Hero heading | `40px` | `72px` | Keep current visual impact, slightly cleaner mobile base |
| Page heading | `36px` | `64px` | Contact and case-study entry pages |
| Section heading | `30px` | `48px` | Main section titles |
| Card title large | `24px` | `32px` | Featured project and major cards |
| Card title standard | `22px` | `28px` | Feature cards and section cards |
| Body large | `18px` | `20px` | Lead copy |
| Body | `16px` | `16px` | Standard paragraphs |
| Small text | `14px` | `14px` | Secondary support text |
| Label | `12px` | `12px` | Uppercase metadata only |

Typography guidance:

- keep `DM Sans` for display and section titles
- keep `Inter` for body and UI text
- avoid introducing another display style unless the whole system changes
- keep body text readable and calm rather than oversized

## 4. Layout System

### Page Container Pattern

Current containers:

- `max-w-7xl` for hero and large project rows
- `max-w-6xl` for standard sections and contact/case-study page content
- `max-w-4xl` for narrower centered content sections
- horizontal page padding is usually `px-[5vw]`

This creates a broad, modern portfolio frame with generous outer breathing room.

### Section Padding

Common section padding:

- homepage: `py-18 md:py-24 lg:py-28`
- hero sections: `pt-16 pb-12 md:pt-24 md:pb-20`
- case-study and contact inner pages: `py-14 md:py-20`

### Grid Patterns

Current layout patterns:

- hero split grid
- about image/text split
- 3-column card grids for technical focus and philosophy
- experience mixed text/list/sidebar grid
- alternating career timeline
- asymmetric featured project rows
- long-form case-study layout with optional sticky table of contents

### Card Patterns

Standard card language:

- `rounded-xl`
- `border border-border`
- white or translucent white fill
- soft dark shadow
- hover lift and accent border on interactive cards

Common variants:

- standard white card
- glass card with blur
- dark CTA card
- project placeholder visual card

### Responsive Breakpoints

The site follows Tailwind defaults:

- `sm`: `640px`
- `md`: `768px`
- `lg`: `1024px`
- `xl`: `1280px`
- `2xl`: `1536px`

### Spacing Rhythm

Actual spacing is based on a loose 8px rhythm with some custom steps.

Current strengths:

- sections generally feel spacious
- large surfaces breathe well on desktop
- major blocks are separated clearly

Current inconsistencies:

- custom spacing values like `py-18`, `space-y-18`, `space-y-22`, `md:py-22`
- some sections are very card-dense while others are sparse
- some bands are transparent, some white, some hardcoded cream

### Recommended Spacing Standard

Use this as the future cleanup target while preserving current layout character:

- section x-padding: `px-[5vw]`
- default section y-padding desktop: `96px`
- default section y-padding mobile: `72px`
- large section gap: `64px`
- standard card gap: `20px` or `24px`
- large card padding: `24px` to `32px`
- standard card padding: `20px` to `24px`

## 5. Component Style System

### Navbar

Current style:

- fixed translucent header
- warm cream background tint
- blur backdrop
- understated nav links
- one or two pill CTAs depending on viewport and implementation state

What should stay:

- fixed header
- clean logo
- subtle blur
- underline hover for text links
- pill CTA language

What should improve later:

- CTA hierarchy and crowding at medium widths
- active route state
- consistent CTA count and wording

### Hero

Current style:

- split layout
- oversized product-builder headline
- light technical visual made from floating UI nodes and rings
- stacked CTAs on mobile
- pill technology badges
- marquee strip below

What should stay:

- strong statement headline
- technical visual identity
- product-builder positioning
- badge row

What should improve later:

- CTA count
- mobile width handling
- marquee prominence
- hero visual size on smaller screens

### Section Heading

Current style:

- mostly inline section headings
- `DM Sans`
- large bold section title
- frequent uppercase eyebrow labels

What should stay:

- clean editorial heading style
- eyebrow metadata pattern where it adds structure

What should improve later:

- standardize heading implementation
- reduce repeated inline heading code
- clarify when a section needs an eyebrow and when it does not

### Cards

Current style:

- white or translucent white surfaces
- thin border
- rounded-xl radius
- soft shadow
- small hover lift on interactive cards

What should stay:

- white surface language
- thin borders
- gentle elevation

What should improve later:

- normalize shadow strength
- normalize hover patterns
- reduce repeated one-off card classes

### Pills And Badges

Current style:

- rounded-full
- thin border
- white background
- muted text by default
- accent tint on hover

What should stay:

- lightweight pill shape
- consistent white surface

What should improve later:

- standardize sizes and padding
- define one badge pattern for metadata and one for technology tags

### Buttons

Current style:

- primary button: purple fill, white text, accent shadow
- secondary button: white fill, dark text, thin border
- all buttons use pill radius
- hover uses lift, slight scale, and stronger shadow

What should stay:

- strong primary/secondary distinction
- pill silhouette
- subtle movement

What should improve later:

- reduce CTA duplication
- create clearer placement rules for resume actions
- standardize button copy

### Project Cards

Current style:

- large featured project rows
- abstract gradient placeholder visuals
- text summary alongside visuals
- hover overlay on visual card
- technology pills and role/problem summaries

What should stay:

- asymmetrical hero-project layout
- strong project storytelling
- visual and text pairing

What should improve later:

- replace placeholders with real screenshots
- make project action visible on touch devices
- add a stronger section intro to the projects block

### Case Study Pages

Current style:

- mesh-gradient hero
- back link at top
- large headline and role/live CTA pairing
- card-heavy long-form structure
- optional sticky table of contents on large screens

What should stay:

- long-form engineering case-study format
- sticky desktop TOC for large pages
- back and next/previous navigation

What should improve later:

- reuse shared section primitives
- normalize content depth across projects
- improve mobile section navigation

### Footer

Current style:

- quiet, lightly translucent footer band
- oversized `HP.` brand mark
- simple external links
- understated close to the site

What should stay:

- calm ending
- compact social navigation

What should improve later:

- footer visual balance
- optional project/contact reinforcement
- external link implementation cleanup

## 6. Animation System

### Current Motion Usage

Framer Motion is the primary motion layer for reveals and staggered entrances.

Current implemented patterns:

- reveal animation in `src/components/motion/reveal.tsx`
  - opacity in
  - `y` translate
  - blur reduction
  - duration `0.72s`

- staggered hero content in `src/components/motion/stagger-container.tsx`
  - stagger children `0.09s`
  - delay children `0.12s`

- hero visual ambient motion
  - floating y movement
  - rotating rings
  - drifting UI nodes and cards

- CSS marquee animation
  - continuous horizontal movement

- hover interactions
  - slight lift
  - slight scale
  - border accent
  - shadow increase

- mobile navigation sheet
  - shadcn/Radix motion classes

### Reduced Motion Support

Current implementation already supports reduced motion:

- `useReducedMotion` in motion components
- global `prefers-reduced-motion` CSS override

### Future Motion Rules

- keep motion subtle and lightweight
- use motion to support hierarchy, not decorate everything
- avoid layout shift
- animate opacity, transform, blur, and shadow only when needed
- keep hover effects small and responsive
- avoid hover-only meaning on mobile
- make mobile motion simpler than desktop motion where needed
- always respect `prefers-reduced-motion`
- keep one dominant animation idea per section

## 7. UX Rules

### Primary CTA Strategy

Recommended source-of-truth behavior:

- each major page should have one clear primary CTA
- each major page may have one secondary CTA
- resume should not compete equally with the primary contact/work action everywhere

### Resume CTA Placement

Current implementation uses resume in multiple places.

Future rule:

- keep resume accessible
- avoid placing it as a top-tier CTA in every high-attention area
- preferred placement is header, contact page, or one secondary supporting location

### Project Navigation

Current behavior:

- homepage projects link into case studies
- case studies have back and next/previous navigation
- `/projects` redirects to `/#work`

Future rule:

- project navigation should remain obvious and low-friction
- project actions should be visible on mobile without hover
- project-to-project navigation should stay consistent across case studies

### Back To Projects Behavior

Current behavior:

- case-study back actions return to the homepage projects anchor

Future rule:

- keep current behavior unless a real project index page is introduced
- if kept, label it consistently as returning to the portfolio project section

### External Link Behavior

Current behavior:

- external links generally open in a new tab

Future rule:

- external project, GitHub, LinkedIn, and resume links should continue to open in a new tab
- all external links should include clear external-link affordance where appropriate

### Mobile CTA Behavior

Future rule:

- mobile CTAs should stack cleanly
- no more than two high-emphasis CTAs should appear in one hero block
- CTA labels should stay short enough to avoid awkward wrapping

## 8. Mobile Rules

### Baseline Rules

- no horizontal overflow
- no clipped hero content
- no hover-only essential actions
- no oversized decorative visual that overwhelms content

### Heading Rules

- hero headings should stay readable without collapsing into too many forced lines
- section headings should not exceed the current visual scale of about `30-32px` on small screens
- card titles should remain compact and scannable

### CTA Stacking Rules

- mobile hero CTAs should stack vertically
- each CTA should remain full-width only when the stack is short and deliberate
- avoid more than two dominant stacked buttons in one mobile hero area

### Project Card Rules

- project actions must remain visible without hover
- project text should stay readable before any decorative visual
- placeholder visuals must not obscure the call to action

### Footer Rules

- footer links should wrap cleanly
- footer brand should not visually overpower the links on small screens

### Mobile Navigation Rules

- keep sheet navigation simple
- primary links first
- resume action can be present, but should not crowd navigation
- mobile nav should remain the clearest fallback CTA/navigation surface

## 9. Current Issues To Fix Later

### Phase 1: Must Fix

- Replace the outdated design-system source of truth with this soft-light system.
- Stop treating the portfolio as dark cinematic in planning or refinement decisions.
- Correct the mental model for color tokens because the current legacy names are misleading.
- Reduce CTA overload in hero, header, and contact flows.
- Remove hover-only dependency for project-card primary actions.
- Audit and either use or remove currently empty unused files:
  - `src/components/forms/contact-form.tsx`
  - `src/components/shared/project-card.tsx`
  - `src/components/shared/section-heading.tsx`
  - `src/sections/projects/*`

### Phase 2: Should Improve

- Replace placeholder project visuals with real screenshots or meaningful product visuals.
- Standardize section heading implementation across homepage and case-study pages.
- Normalize repeated card styles, shadows, and surface opacities.
- Tokenize hardcoded colors like `#f5f2ec` and repeated RGBA shadow/glow values.
- Improve CTA hierarchy and reduce repeated resume emphasis.
- Add active route and active section states where useful.

### Phase 3: Nice To Have

- Improve mobile case-study navigation patterns.
- Reduce marquee dominance if it competes too much with content hierarchy.
- Add a distinct mono font only if technical metadata needs a stronger identity.
- Introduce light analytics or UX validation for CTA behavior if needed.
- Further refine section-to-section pacing and transition consistency.

## 10. Final Recommendation

Do not change the theme again.

The portfolio should remain a soft-light portfolio with:

- warm cream background
- white surfaces
- purple/indigo accent language
- clean full-stack engineer positioning
- modern product-builder presentation

The next refinement direction should focus on:

- consistency
- stronger project visuals
- clearer CTA hierarchy
- cleaner mobile behavior
- better reuse of shared heading and case-study patterns

The right next move is not a new visual reinvention.
The right next move is to make the current soft-light system more intentional, more consistent, and more complete.

## Top 10 Recommended Fixes

1. Treat this soft-light system as the official source of truth instead of the old dark cinematic document.
2. Rename or remap legacy color tokens in future cleanup so semantic names match actual colors.
3. Reduce CTA overload across header, hero, and contact.
4. Make project actions clearly visible on mobile without hover.
5. Replace abstract placeholder project visuals with real screenshots or stronger product imagery.
6. Standardize section heading structure across homepage and case studies.
7. Normalize card shadows, surface opacities, and repeated white-panel variants.
8. Tokenize hardcoded cream and RGBA glow/shadow values.
9. Resolve or remove empty unused shared component and project section files.
10. Improve medium-width and mobile polish, especially hero width, CTA stacking, and nav crowding.

