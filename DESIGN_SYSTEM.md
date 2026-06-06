# Design System

## Direction

The portfolio should feel cinematic, technical, and quietly premium. The Stitch direction is soft dark luxury: deep neutral surfaces, subtle contrast, warm metallic accents, precise spacing, restrained motion, and immersive visual depth without decorative clutter.

The interface should prioritize the work, the engineering story, and the project case studies. Visual effects should support hierarchy and pacing, not compete with content.

## Color Palette

Use a dark-first palette with soft contrast and warm accent tones.

### Core

| Token | Value | Usage |
| --- | --- | --- |
| `--color-void` | `#070707` | Primary page background |
| `--color-ink` | `#0D0D0F` | Elevated dark surfaces |
| `--color-charcoal` | `#151518` | Section bands and cards |
| `--color-graphite` | `#232329` | Borders, dividers, subtle UI |
| `--color-mist` | `#E8E4DC` | Primary text |
| `--color-smoke` | `#B8B2A8` | Secondary text |
| `--color-ash` | `#7E786F` | Muted text |

### Accent

| Token | Value | Usage |
| --- | --- | --- |
| `--color-champagne` | `#D6B982` | Primary luxury accent |
| `--color-bronze` | `#A8733A` | Hover states and highlights |
| `--color-copper` | `#C46A45` | Selective callouts |
| `--color-steel` | `#8FA3B0` | Technical diagrams and secondary accent |
| `--color-sage` | `#8C9B7A` | Success/availability state |

### Rules

- Keep backgrounds mostly neutral and dark.
- Use accent colors sparingly for focus, progress, active states, and important metadata.
- Avoid large purple, blue, orange, beige, or gradient-dominant themes.
- Prefer thin borders and soft surface shifts over heavy shadows.
- Gradients may be used as subtle material lighting, not as the primary visual identity.

## Typography

Use a restrained editorial scale with strong hierarchy and high readability.

### Font Roles

| Role | Usage |
| --- | --- |
| Display | Hero headline, project title |
| Heading | Section headings and major content groups |
| Body | Paragraphs, case study copy, form text |
| Mono | Metrics, labels, technical metadata, code-like details |

### Scale

| Token | Desktop | Mobile | Usage |
| --- | --- | --- | --- |
| `text-display` | `72px / 0.95` | `44px / 1` | Homepage hero |
| `text-title` | `56px / 1` | `36px / 1.05` | Project titles |
| `text-h1` | `44px / 1.05` | `32px / 1.1` | Page headings |
| `text-h2` | `32px / 1.15` | `26px / 1.2` | Section headings |
| `text-h3` | `24px / 1.25` | `21px / 1.3` | Cards and subsections |
| `text-body-lg` | `20px / 1.7` | `18px / 1.65` | Lead copy |
| `text-body` | `16px / 1.7` | `16px / 1.65` | Body copy |
| `text-small` | `14px / 1.5` | `14px / 1.5` | Supporting text |
| `text-label` | `12px / 1.2` | `12px / 1.2` | Labels and metadata |

### Rules

- Do not scale font sizes with viewport width.
- Letter spacing should stay at `0` unless a label intentionally uses uppercase, where `0.08em` is acceptable.
- Avoid oversized text inside cards, panels, buttons, and dense UI.
- Keep line lengths between `60ch` and `75ch` for long-form copy.

## Spacing System

Use an 8px spacing rhythm.

| Token | Value |
| --- | --- |
| `space-1` | `4px` |
| `space-2` | `8px` |
| `space-3` | `12px` |
| `space-4` | `16px` |
| `space-5` | `20px` |
| `space-6` | `24px` |
| `space-8` | `32px` |
| `space-10` | `40px` |
| `space-12` | `48px` |
| `space-16` | `64px` |
| `space-20` | `80px` |
| `space-24` | `96px` |
| `space-32` | `128px` |

### Layout Rules

- Use full-width sections with constrained inner containers.
- Default container width: `min(100% - 32px, 1200px)`.
- Wide project containers may extend to `1440px`.
- Section padding should be `96px` to `160px` on desktop and `64px` to `96px` on mobile.
- Avoid cards inside cards.
- Fixed-format UI elements need stable dimensions to prevent layout shift.

## Motion Rules

Motion should feel deliberate, cinematic, and functional.

### Durations

| Type | Duration |
| --- | --- |
| Micro interaction | `120ms` to `180ms` |
| Component transition | `220ms` to `360ms` |
| Section reveal | `500ms` to `800ms` |
| Cinematic scene motion | `900ms` to `1600ms` |

### Easing

| Token | Value | Usage |
| --- | --- | --- |
| `ease-out-soft` | `[0.16, 1, 0.3, 1]` | Reveals and entrances |
| `ease-in-out-luxury` | `[0.65, 0, 0.35, 1]` | Scene transitions |
| `ease-snap` | `[0.2, 0.8, 0.2, 1]` | Buttons and controls |

### Rules

- Animate opacity, transform, filter, and material values.
- Avoid animating layout properties such as width, height, top, or left.
- Respect `prefers-reduced-motion`.
- Do not chain many competing animations in the same viewport.
- Scroll-driven motion must preserve readability.

## Animation Conventions

### Framer Motion

- Use Framer Motion for component reveals, page-level transitions, staggered lists, and hover/tap states.
- Store shared variants in `src/animations/framer/variants.ts`.
- Store reusable transitions in `src/animations/framer/transitions.ts`.
- Keep motion wrappers small and explicit.

### GSAP

- Use GSAP for timeline-heavy scroll sequences, text choreography, and cinematic section transitions.
- Register plugins in `src/animations/gsap/register-plugins.ts`.
- Keep timelines in hooks or small client components.
- Always clean up GSAP contexts on unmount.

### Three.js / React Three Fiber

- Use Three/R3F for immersive hero and project scenes.
- Keep canvas components isolated under `src/components/three`.
- Provide fallbacks for reduced motion and low-power devices.
- Avoid blocking content rendering on 3D scene readiness.

## Responsive Breakpoints

Use Tailwind defaults unless project requirements justify custom tokens.

| Token | Width | Intent |
| --- | --- | --- |
| `sm` | `640px` | Large phones |
| `md` | `768px` | Tablets |
| `lg` | `1024px` | Small laptops |
| `xl` | `1280px` | Desktops |
| `2xl` | `1536px` | Wide screens |

### Rules

- Design mobile layouts first for content order and readability.
- Avoid hiding essential content on small screens.
- Replace complex horizontal motion with simpler stacked reveals on mobile.
- Keep tap targets at least `44px`.

## Component Naming Conventions

Use production-grade, descriptive names.

### Files

- Components: `kebab-case.tsx`
- Hooks: `use-feature-name.ts`
- Data files: `domain-name.ts`
- Types: `domain-name.ts`
- Constants: `domain-name.ts`
- Route files: Next.js conventions only, such as `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`

### Components

- React component names use `PascalCase`.
- Section components end with `Section`.
- Layout components use the `Site` prefix when global, such as `SiteHeader`.
- Project-specific components use the `Project` prefix.
- Animation wrappers should describe behavior, such as `Reveal`, `StaggerContainer`, or `ScrollProgress`.

### Boundaries

- `src/components/ui`: shadcn/ui primitives only.
- `src/components/layout`: global layout shell and navigation.
- `src/components/motion`: reusable motion wrappers.
- `src/components/three`: reusable 3D scene infrastructure.
- `src/sections`: page and route composition sections.
- `src/data`: typed content and portfolio data.

## Server and Client Component Rules

Next.js App Router components are Server Components by default. Keep them server-side unless browser functionality is required.

### Server Components

Use Server Components for:

- Pages and layouts.
- Static section composition.
- Reading typed content from `src/data`.
- Metadata generation.
- Project detail rendering.
- SEO-focused content.

### Client Components

Use `"use client"` only for:

- State and event handlers.
- Framer Motion interactive wrappers.
- GSAP timelines.
- Lenis or smooth scrolling setup.
- Three/R3F canvas components.
- Form interactivity.
- Browser APIs such as `window`, `document`, `matchMedia`, and `IntersectionObserver`.

### Rules

- Do not mark route pages as client components unless unavoidable.
- Do not import server-only utilities into client components.
- Pass only serializable props from Server Components to Client Components.
- Keep client boundaries as small as possible.
- Providers that use browser APIs must live in `src/providers` and be mounted intentionally.

## Accessibility Rules

- Maintain visible keyboard focus states for all interactive elements.
- Use semantic HTML before ARIA.
- All icon-only buttons need accessible labels.
- Text contrast should meet WCAG AA minimums.
- Motion-heavy sections must support reduced motion.
- Do not trap focus except inside modals, sheets, and menus.
- Ensure modals, dialogs, and sheets use Radix/shadcn primitives where possible.
- Images need meaningful `alt` text unless decorative.
- 3D/canvas scenes must not be the only way to understand content.
- Forms need labels, error messages, and success states.
- Navigation must be keyboard accessible on desktop and mobile.
- Avoid text overlapping media, 3D scenes, or animated elements.

## Implementation Guardrails

- Build the actual portfolio experience first, not a marketing landing page.
- Use visual assets for project and cinematic sections.
- Keep page sections unframed; use cards only for repeated items or contained tools.
- Prefer lucide icons for common actions.
- Keep UI copy concise and direct.
- Verify desktop and mobile layouts before considering a section complete.
