# UI/UX Design Audit

## Current UI System Summary

The current portfolio is a soft-light, modern portfolio UI with SaaS-like cards, rounded pill CTAs, subtle glass surfaces, warm off-white backgrounds, a visible grid texture, and purple/indigo accents. The personality is approachable, polished, technical, and product-oriented rather than dark cinematic or editorial luxury.

Important mismatch: `DESIGN_SYSTEM.md` describes a dark-first cinematic luxury direction, but the implemented UI in `src/app/globals.css` is light-first with warm cream surfaces and purple accents. The saved screenshots (`desktop-home.png`, `mobile-home.png`) also show the light direction.

Primary implementation files:

- Global tokens and utilities: `src/app/globals.css`
- Fonts and root layout: `src/app/layout.tsx`
- Header/navigation: `src/components/layout/site-header.tsx`, `src/components/layout/mobile-navigation.tsx`
- Footer: `src/components/layout/site-footer.tsx`
- Homepage sections: `src/sections/home/*.tsx`
- Project case studies: `src/app/(site)/projects/*/page.tsx`
- Contact page: `src/app/(site)/contact/page.tsx`
- Motion primitives: `src/components/motion/reveal.tsx`, `src/components/motion/stagger-container.tsx`

## 1. Overall Visual Direction

Current style:

- Soft-light technical portfolio
- Warm neutral background with subtle grid texture
- Modern SaaS influence through cards, badges, pills, shadows, and dashboard-like visuals
- Portfolio storytelling structure with hero, about, skills, experience, journey, philosophy, projects, education, and footer
- Light glassmorphism in panels and navigation
- Friendly developer-brand tone, not minimal brutalist and not dark luxury

Visual personality:

- Clean, optimistic, calm, and accessible
- Technical but not overly dense
- More product-builder portfolio than editorial personal site
- The purple accent gives it a contemporary SaaS feel
- The beige/warm surfaces soften the technical theme

Main concern:

- The implementation and documented design system disagree. The current UI has drifted away from the intended dark cinematic palette in `DESIGN_SYSTEM.md`.

## 2. Color System

### Main Background Colors

- `#f7f4ef`
  - Token: `--void`, `--background`
  - Used as the page background in `src/app/globals.css`.
  - Creates the warm cream base.

- `#ffffff`
  - Token: `--charcoal`, `--card`, `--popover`
  - Used for cards, buttons, mobile sheet items, project cards, and footer panels.

- `#f5f2ec`
  - Used in `.mesh-gradient`, `CareerJourneySection`, and project visual gradients.
  - Slightly darker warm section band.

- `rgba(255, 255, 255, 0.55-0.92)`
  - Used for glass panels, hero nodes, footer, section bands, cards, and case-study panels.

- `bg-foreground` / `#171717`
  - Used sparingly for dark CTA panels inside case-study pages.

### Text Colors

- `#171717`
  - Tokens: `--ink`, `--mist`, `--foreground`, `--card-foreground`
  - Used for primary headings, body foreground, dark CTA panels, logo text.

- `#5f5a52`
  - Tokens: `--smoke`, `--muted-foreground`
  - Used for body copy, navigation links, secondary metadata, project summaries.

- `#817a70`
  - Token: `--ash`
  - Defined but not heavily used directly.

- `#ffffff`
  - Used for primary button text and dark panel text.

### Accent Colors

- `#6d5ef6`
  - Tokens: `--champagne`, `--primary`, `--ring`
  - Used as the dominant accent for links, CTA buttons, icons, section labels, timeline markers, focus rings, and hover states.
  - Naming is inconsistent: token name `champagne` suggests warm metallic, but value is purple.

- `#5b6cff`
  - Tokens: `--bronze`, `--accent`
  - Used as primary CTA hover background.
  - Naming is inconsistent: token name `bronze` suggests brown/gold, but value is blue-indigo.

- `#d7c7a3`
  - Tokens: `--copper`, `--secondary`
  - Used for warm glow gradients and soft background accents.

- `#dbe3ff`
  - Token: `--steel`
  - Mostly reserved/chart token, not a visible main accent.

- `#ece6d8`
  - Token: `--sage`
  - Defined as a warm neutral rather than green sage.

### Border And Shadow Colors

- `rgba(23, 23, 23, 0.1)`
  - Token: `--border`
  - Used site-wide for borders.

- `rgba(23, 23, 23, 0.08-0.14)`
  - Used in shadows across hero cards, project cards, contact cards, and case-study panels.

- `rgba(109, 94, 246, 0.1-0.28)`
  - Used for accent shadows, hover glows, radial gradients, and CTA shadows.

- `rgba(215, 199, 163, 0.20-0.32)`
  - Used in warm radial background treatments.

### Inconsistent Color Usage

- Token names do not match values: `champagne` is purple, `bronze` is blue, `copper` is beige, `sage` is cream.
- `DESIGN_SYSTEM.md` defines a dark palette, while `globals.css` implements a light palette.
- Some backgrounds use tokens (`bg-background`, `bg-white/55`) while others use hard-coded values like `bg-[#f5f2ec]`.
- The visual system leans heavily on purple, even though the design rules say to avoid purple-dominant themes.
- Case-study dark CTA panels use `bg-foreground`, which works visually but introduces a sudden dark block language not used elsewhere on the homepage.

## 3. Typography System

### Fonts

- Display/heading: `DM Sans`
  - Defined in `src/app/layout.tsx` and mapped to `--font-display`, `--font-heading`.

- Body/sans: `Inter`
  - Defined in `src/app/layout.tsx` and mapped to `--font-sans`.

- Mono:
  - `--font-mono` maps to Inter in `src/app/globals.css`; there is no distinct mono font.

### Current Font Sizes

- Hero heading:
  - Homepage: `34px` mobile, `42px` small, `64px` medium, `72px` large in `src/sections/home/hero-section.tsx`
  - Contact/case-study hero: `42px`, `56px`, `68-72px`

- Section headings:
  - Common homepage sections: `32px` mobile, `44px` medium, `48px` large
  - Project pages: `32px` mobile, `44px` medium, sometimes `48px` large

- Body text:
  - Standard paragraphs: `16px`, line-height around `1.75`
  - Lead paragraphs: `18px` to `20px` on larger screens

- Labels:
  - Usually `12px`, uppercase, `tracking-[0.18em]`
  - Some role labels use `14px`

- Buttons:
  - Mostly default `16px` or `14px` depending on context
  - Header buttons use `14px`
  - Hero/contact buttons use default base size with `font-semibold`

### Oversized Or Inconsistent Typography

- Hero text is strong on desktop, but mobile depends on manual line breaks and `max-w-[340px]`, which can feel cramped on 360px screens.
- Section heading sizes are mostly consistent, but project card titles use several nearby values: `22px`, `24px`, `28px`, `30px`, `32px`, `42px`.
- The marquee text uses `34px` mobile and `64px` desktop with outlined transparent text, making it visually dominant compared with some content sections.
- Case-study pages repeat their own `SectionIntro` components with slight size variations.
- Label tracking is consistently uppercase but may feel overused across every section, reducing hierarchy.

### Cleaner Typography Scale

Recommended scale for future refinement:

- Display: `64/72px` desktop, `38/44px` mobile
- Page title: `56/64px` desktop, `40/46px` mobile
- Section heading: `40/48px` desktop, `30/36px` mobile
- Card heading: `22/28px`
- Body large: `18/30px`
- Body: `16/27px`
- Small: `14/21px`
- Label: `12/16px`, uppercase only for metadata

## 4. Layout Pattern

### Page Structure

Homepage order in `src/app/(site)/page.tsx`:

1. Hero
2. About
3. Technical Focus
4. Experience
5. Career Journey
6. Engineering Philosophy
7. Featured Projects
8. Education

The contact section file exists as `src/sections/home/contact-section.tsx` but is not currently used on the homepage. The footer is global.

### Section Spacing

- Homepage sections generally use `px-[5vw] py-18 md:py-24 lg:py-28`.
- Hero uses `pt-16 pb-12 md:pt-24 md:pb-20` plus `min-h-[calc(100svh-6rem)]`.
- Contact and project pages use `py-16 md:py-24` hero spacing and inner content spacing of `py-14 md:py-20`.

Concern:

- `py-18`, `space-y-18`, `space-y-22`, and `md:py-22` rely on Tailwind spacing availability. If valid in this Tailwind version, they create nonstandard spacing steps; if not, they silently fail. This should be verified before implementation changes.

### Container Widths

- Common homepage sections: `max-w-6xl`
- Hero and primary project sections: `max-w-7xl`
- Education/philosophy: `max-w-4xl`
- Contact: `max-w-6xl`
- Full-width padding: usually `px-[5vw]`

The container system is clear but not formalized as a reusable layout primitive.

### Grid Usage

- Hero: two-column grid `md:grid-cols-[1.05fr_0.95fr]`
- About: `md:grid-cols-12`
- Technical Focus and Philosophy: three-column card grids
- Experience: `md:grid-cols-12`
- Career Journey: alternating timeline with center line on desktop
- Featured Projects: large asymmetric project rows plus two-column secondary grid
- Case studies: optional left sticky table of contents plus content column on large pages

### Card Layouts

- Main card pattern: `rounded-xl border border-border bg-white p-5/6/7 shadow-[...]`
- Glass pattern: `bg-white/72-82`, `backdrop-blur`, soft shadow
- Pills: `rounded-full border border-border bg-white px-* py-*`
- Dark CTA cards: `rounded-xl bg-foreground text-white`

### Inconsistent Sections

- Career Journey uses `bg-[#f5f2ec]`; other bands use `bg-white/55` or transparent.
- Experience uses list rows without cards plus one glass panel, while surrounding sections use card grids.
- Projects are much more visually complex than Technical Focus/Philosophy.
- Education is sparse and quiet compared with the visual density before it.

## 5. Component And Section Audit

### Navbar

Files:

- `src/components/layout/site-header.tsx`
- `src/components/layout/mobile-navigation.tsx`

Current pattern:

- Fixed top header
- Warm translucent background with blur
- HP logo left
- Desktop nav links with underline hover
- Pill CTA buttons
- Mobile sheet menu using shadcn/Radix sheet

Strengths:

- Clear persistent navigation
- Good focus-visible handling through global styles and component classes
- Mobile menu uses accessible primitives
- Simple brand mark works well

Weaknesses:

- Screenshot and current code appear inconsistent: screenshot header shows only one CTA, while code includes `Download Resume` and `Lets Connect`.
- Header CTAs can become crowded on medium widths.
- “Lets Connect” lacks apostrophe.
- Resume CTA repeats in header, hero, contact, and mobile nav, which may dilute the primary action.

Refinement suggestions:

- Decide whether header should contain one or two CTAs.
- Standardize CTA label spelling as “Let's Connect.”
- Keep desktop nav spacing stable around 768-1024px.
- Add active route state for project/contact pages.

### Hero

File:

- `src/sections/home/hero-section.tsx`

Current pattern:

- Split hero with text/CTA left and animated technical system visual right
- Warm mesh background
- Staggered text reveal
- Three CTAs in current code: View Work, Lets Connect, Download Resume
- Skill badges under CTAs
- Marquee strip below hero

Strengths:

- Strong value proposition
- Clear visual identity
- Good CTA visibility
- Technical visual communicates full-stack/cloud focus without relying on screenshots

Weaknesses:

- Current code has three hero CTAs; saved mobile screenshot shows two. Three full-width mobile buttons may make the hero feel CTA-heavy.
- `max-w-[340px]` constraints can make 390px screens feel artificially narrow.
- Hero visual appears below the fold on mobile and may feel decorative after the CTAs.
- Animated floating cards and marquee create many moving elements near the first viewport.

Refinement suggestions:

- Keep one primary CTA and one secondary action in the hero; move resume to header/contact or make it a tertiary link.
- Relax mobile text container width to use available viewport.
- Make the hero visual slightly more compact on 360px/390px screens.
- Reduce animation density for mobile or reduced-motion contexts.

### About

File:

- `src/sections/home/about-section.tsx`

Current pattern:

- Two-column image/text layout
- Profile image card with warm glow
- Eyebrow label, large heading, paragraphs

Strengths:

- Personalizes the portfolio quickly after the technical hero.
- Good image-to-copy balance on desktop.
- Copy is direct and credible.

Weaknesses:

- Profile image shadow/glow is visually heavier than nearby text.
- Heading is large and line-length dependent.
- Section does not reuse a shared heading component.

Refinement suggestions:

- Standardize the section heading pattern.
- Slightly reduce image glow intensity.
- Keep paragraph width near `60-70ch`.

### Technical Focus

File:

- `src/sections/home/technical-expertise-section.tsx`

Current pattern:

- Centered heading and intro
- Three equal cards: Frontend, Backend, Cloud
- Text icons represented by strings such as `"layers"` and `"database"`

Strengths:

- Scannable and balanced
- Strong alignment with developer positioning
- Card grid works well on desktop and mobile

Weaknesses:

- Icon strings are not lucide icons and may render as plain text unless an icon font is loaded.
- Cards use the same visual treatment as many later sections, which can become repetitive.
- Heading label is absent, unlike About/Experience.

Refinement suggestions:

- Replace text icon strings with lucide icons in a future code pass.
- Decide whether every section needs an eyebrow label or only major narrative transitions.
- Keep card height consistent if copy changes.

### Experience

File:

- `src/sections/home/experience-timeline-section.tsx`

Current pattern:

- Company title and date split across top row
- Large role summary
- Vertical responsibility list
- Side glass panel for stack focus

Strengths:

- Clear and specific
- The responsibility list avoids over-carded design
- Good hierarchy between company, role, and responsibilities

Weaknesses:

- Date text uses accent color and large display size, competing with company name.
- The list pattern differs strongly from the surrounding card grids.
- Side panel feels visually detached from the responsibility list.

Refinement suggestions:

- Reduce date emphasis slightly.
- Align the list marker style with the site’s pill/card visual language.
- Consider more consistent spacing between responsibility items and side panel.

### Career Journey

File:

- `src/sections/home/career-journey-section.tsx`

Current pattern:

- Alternating desktop timeline
- Center vertical gradient line
- Large year labels
- Stacked mobile layout

Strengths:

- Clear narrative timeline
- Good desktop pacing
- Hover marker feedback is subtle

Weaknesses:

- Background is hard-coded `#f5f2ec`.
- Mobile timeline loses the center-line structure and becomes plain stacked text.
- Large year labels can compete with section title.

Refinement suggestions:

- Tokenize the section band color.
- Add a simple mobile timeline indicator if desired.
- Bring year sizing closer to section/card scale.

### Philosophy

File:

- `src/sections/home/engineering-philosophy-section.tsx`

Current pattern:

- Centered “How I Work” heading
- Three cards with value headings and paragraphs
- Warm top gradient

Strengths:

- Humanizes the portfolio
- Strong fit for hiring/employer evaluation
- Compact and readable

Weaknesses:

- Card pattern duplicates Technical Focus closely.
- Body text is `md:text-lg` inside cards, which can make cards feel text-heavy.
- Section heading lacks eyebrow and may feel disconnected from previous sections.

Refinement suggestions:

- Use `16px` body text inside cards consistently.
- Differentiate this section with layout or typography rather than another equal card grid.
- Standardize heading treatment.

### Projects

File:

- `src/sections/home/featured-projects-section.tsx`

Current pattern:

- Two large primary project rows with abstract visual cards
- Two secondary project cards
- Hover reveal overlay on visual cards
- Tech pills and problem summaries

Strengths:

- Most visually engaging homepage section
- Project summaries are specific and useful
- Large primary cards create portfolio weight
- Hover states make project discovery feel interactive

Weaknesses:

- No section heading introduces the work section; users arrive directly at project rows.
- Project visuals are abstract placeholders rather than real screenshots.
- Overlay “View Work” appears only on hover, which is unavailable on touch devices.
- Large visual cards may dominate the copy on desktop.

Refinement suggestions:

- Add/standardize a visible section intro in a future redesign pass, if allowed.
- Replace abstract placeholders with real project imagery when available.
- Ensure mobile has an always-visible project action.
- Normalize primary and secondary card hierarchy.

### Education

File:

- `src/sections/home/education-section.tsx`

Current pattern:

- Centered eyebrow
- Sparse two-column degree/year layout
- Supporting paragraph

Strengths:

- Clean and restrained
- Good closing content before footer
- Avoids unnecessary card clutter

Weaknesses:

- Feels quieter and less structured than preceding sections.
- The year hover effect depends on hovering the whole group, which is subtle.
- The section lacks a strong closing CTA to contact or projects.

Refinement suggestions:

- Align heading hierarchy with other sections.
- Consider a modest CTA after Education in a future content-flow pass.
- Keep the sparse style but match spacing rhythm.

### Footer

File:

- `src/components/layout/site-footer.tsx`

Current pattern:

- Large HP mark
- Social/email links
- Copyright and “Built with care”
- Light translucent background

Strengths:

- Simple and uncluttered
- Social links are easy to find
- Works well as a quiet ending

Weaknesses:

- No project/contact reinforcement beyond social links.
- Footer brand scale is large relative to content.
- External links use `Link` instead of plain anchors for external URLs.

Refinement suggestions:

- Use anchors for external links in a future code cleanup.
- Add route links only if the footer needs stronger navigation.
- Keep visual weight lower than the hero brand.

### Project Case Study Pages

Files:

- `src/app/(site)/projects/wikipoint-ai/page.tsx`
- `src/app/(site)/projects/beige/page.tsx`
- `src/app/(site)/projects/erp-system/page.tsx`
- `src/app/(site)/projects/hr-management-system/page.tsx`
- Empty placeholders: `src/sections/projects/*.tsx`

Current pattern:

- Mesh hero with back navigation
- Case-study label and large title
- Lead paragraph
- Optional live project CTA
- Metrics or role card
- Long-form content with card grids, stack groups, role/responsibility cards, impact lists
- Large case studies include sticky table of contents on desktop
- Gallery placeholders for some projects

Strengths:

- Content-rich and specific
- Good “Back to Projects” navigation
- Strong case-study structure for larger projects
- Sticky table of contents improves long-page scanning

Weaknesses:

- Section patterns are duplicated directly in route files.
- `src/sections/projects/*` section files are empty, suggesting unfinished abstraction or abandoned structure.
- Visual placeholders reduce credibility compared with real screenshots.
- Case studies vary in depth: Wikipoint/Beige are much richer than ERP/HR, which may make projects feel uneven.
- Mobile lacks sticky/summary navigation for long case studies.

Refinement suggestions:

- Extract shared case-study section components later.
- Replace placeholders with screenshots or meaningful visuals.
- Normalize minimum content structure across all project pages.
- Add consistent next/previous/back navigation patterns.

### Contact Page

Files:

- `src/app/(site)/contact/page.tsx`
- `src/components/forms/contact-form.tsx` exists but is empty

Current pattern:

- Hero-style contact page with CTAs
- Availability card grid
- Contact method cards
- Closing statement card
- No visible contact form despite empty `contact-form.tsx`

Strengths:

- Clear direct contact options
- Email, LinkedIn, GitHub are immediately available
- Availability section sets context

Weaknesses:

- No form flow, even though form component and API/action files exist elsewhere.
- Four hero CTAs can feel crowded.
- Contact conversion depends on external mail/social actions.
- The empty form file indicates incomplete implementation.

Refinement suggestions:

- Decide whether contact is link-only or form-based.
- If link-only, remove dead form scaffolding in a future cleanup.
- If form-based, implement and place it in the contact page in a future feature pass.
- Reduce hero CTA count or group secondary links lower on the page.

## 6. Animation And Interaction System

### Animations Currently Used

- Framer Motion reveal:
  - `src/components/motion/reveal.tsx`
  - Initial: opacity `0`, `y: 28`, blur `8px`
  - While in view: opacity `1`, `y: 0`, blur `0`
  - Duration: `0.72s`
  - Easing: `[0.16, 1, 0.3, 1]`

- Framer Motion stagger:
  - `src/components/motion/stagger-container.tsx`
  - Used in hero
  - Stagger children: `0.09s`
  - Delay children: `0.12s`

- Hero visual floating:
  - Main visual y animation loops over 8s
  - Cards/nodes float independently
  - Rings rotate over 42s and 58s

- CSS marquee:
  - `@keyframes marquee`
  - `.animate-marquee`
  - 30s linear infinite

- Mobile sheet animation:
  - From shadcn/Radix classes in `src/components/ui/sheet.tsx`

### Hover Effects

- Buttons:
  - Slight translate up, scale, color shift, and shadow increase

- Cards:
  - Translate up, accent border, accent shadow

- Project cards:
  - Visual scale, overlay reveal, “View Work” appears on hover

- Navigation:
  - Link color shift and underline scale

- Career timeline:
  - Timeline marker glow and small movement

### Reduced Motion

- `Reveal`, `StaggerContainer`, and `HeroVisual` use `useReducedMotion`.
- Global CSS also disables animation and transition duration under `prefers-reduced-motion`.

### Missing Or Weak Interactions

- No active nav state.
- Project overlay action is hover-dependent and weaker on touch devices.
- Case-study table of contents does not show active section.
- Contact page lacks form interaction despite form scaffolding.
- Resume download is repeated but not tracked or visually differentiated.
- Mobile hero has many sequential elements but little interaction beyond CTAs.

## 7. Mobile Responsiveness

### 360px

Expected behavior from code and screenshot:

- Hero heading fits, but line breaks are tight.
- Hero text/CTA container uses `max-w-[340px]`, leaving limited breathing room.
- CTA buttons stack full-width; three CTAs in current code may push content down significantly.
- Skill badges wrap cleanly but take vertical space.
- Hero visual appears below the initial content and may feel oversized.
- Header logo is visible; mobile menu button should appear in current code.

Risks:

- Long button labels like “Download Resume” can add CTA stack height.
- Case-study role pills may wrap awkwardly because they are styled like buttons.
- Long project titles can create dense cards.

### 390px

Expected behavior:

- Similar to 360px, with slightly more comfortable text wrapping.
- Current `max-w-[340px]` still prevents full use of the viewport.
- Project cards and case-study cards stack cleanly.

Risks:

- The hero visual plus CTAs can make first-section scrolling feel long.
- Contact page with four CTAs may feel crowded.

### 768px

Expected behavior:

- `md` breakpoint activates desktop nav and multi-column grids.
- Hero switches to two columns at `md`, which may be tight on tablets.
- Header with nav plus two CTAs can be crowded.
- About and project sections become multi-column.

Risks:

- 768px is the most likely breakpoint for header crowding.
- Hero text plus visual may compete for horizontal space.
- Project primary rows may feel compressed.

### Desktop

Expected behavior:

- Layout is spacious and polished.
- Hero and project sections benefit from `max-w-7xl`.
- Sticky case-study TOC works on large screens.
- Card grids are clear.

Risks:

- Some sections feel visually lighter or denser than others.
- Abstract project visuals may feel less credible on large screens than real screenshots.
- Section transitions rely mostly on borders/background bands, creating mild repetition.

## 8. UI Consistency

The sections mostly feel like one website because they share:

- Warm cream background
- Purple primary accent
- White cards
- Rounded-xl cards and rounded-full pills
- Soft shadows
- `DM Sans` headings and `Inter` body
- Reveal animations
- `px-[5vw]` layout rhythm

Consistency issues:

- Intended dark design system conflicts with implemented light UI.
- Token names conflict with actual colors.
- Some section backgrounds are tokenized, while others are hard-coded.
- Headings are implemented inline and repeated instead of through a shared component.
- Case-study `SectionIntro` is duplicated across route files.
- Project section uses highly visual placeholder cards; other sections are simpler text/card systems.
- Contact page uses no actual form despite form-related files.
- Empty `src/sections/projects/*` files imply unfinished component organization.
- Header/hero screenshots do not fully match current code.

Disconnected-feeling sections:

- Career Journey due to hard-coded section color and unique timeline layout.
- Education due to sparse layout after visually dense project cards.
- Case-study dark CTA panels due to sudden dark block styling.
- Projects due to abstract visual panels and missing section intro.

## 9. UX Flow

### Homepage To Projects

Current flow:

- Primary hero CTA links to `/#work`.
- Header has `Work` link.
- `/projects` route redirects to `/#work`.

Strengths:

- Work is easy to reach.
- Project cards link to case studies.

Weaknesses:

- There is no standalone projects index page.
- Redirecting `/projects` to a homepage anchor may feel unexpected.
- Projects section lacks a clear heading/introduction.

### Projects To Case Study

Current flow:

- Primary project visuals and text links go to case-study routes.
- Secondary cards also link to case-study routes.

Strengths:

- Case studies are detailed.
- Next/previous navigation exists.

Weaknesses:

- Hover-only overlay action is weak on mobile.
- Case-study visuals are placeholders.
- Case-study depth differs by project.

### Case Study To Contact

Current flow:

- Case studies include live project CTAs and next/back navigation.
- They do not consistently push users toward contact.

Strengths:

- Back and next navigation keep browsing smooth.

Weaknesses:

- Contact conversion is not strongly integrated after case-study proof.
- Live project CTAs may take users away from the portfolio.

### Resume Download

Current flow:

- Resume appears in header code, hero code, mobile nav, and contact page.

Strengths:

- Easy to find.

Weaknesses:

- Repetition can create CTA overload.
- Header screenshot and code appear inconsistent.

### Contact Conversion

Current flow:

- Header and hero link to `/contact`.
- Contact page provides email/social actions.
- No form currently renders.

Strengths:

- Direct email and social links are clear.

Weaknesses:

- Link-only contact creates friction for users who prefer inline forms.
- Empty form component suggests incomplete contact UX.

### Back Navigation

Strengths:

- Case studies include “Back to Projects.”
- Contact page includes “Back Home.”
- Project pages include next/previous navigation.

Weaknesses:

- “Back to Projects” returns to a homepage anchor rather than a project index.
- Sticky TOC has no active-section feedback.

## 10. Design Refinement Roadmap

### Phase 1: Must Fix

- Resolve the design-system mismatch between `DESIGN_SYSTEM.md` and `src/app/globals.css`.
- Rename or remap color tokens so names match actual colors.
- Decide whether the site is intentionally light-first or should return to dark-first.
- Standardize CTA strategy: primary, secondary, resume.
- Fix “Lets Connect” to “Let's Connect” across header, hero, and contact.
- Verify Tailwind spacing classes such as `py-18`, `space-y-18`, `space-y-22`, and `md:py-22`.
- Address empty files:
  - `src/components/forms/contact-form.tsx`
  - `src/components/shared/project-card.tsx`
  - `src/components/shared/section-heading.tsx`
  - `src/sections/projects/*.tsx`
- Replace string-based icons in `technical-expertise-section.tsx` with real icon components later.
- Ensure mobile project CTAs are visible without hover.

### Phase 2: Should Improve

- Create reusable section heading and case-study section primitives.
- Normalize card styles, shadows, and border opacity.
- Tokenize hard-coded backgrounds such as `bg-[#f5f2ec]`.
- Reduce CTA crowding on mobile hero and contact page.
- Add active route state to navigation.
- Add active section state or clearer affordance to case-study TOC.
- Normalize project-page depth so all case studies feel equally intentional.
- Replace abstract project placeholders with screenshots or meaningful product visuals.
- Reconsider `/projects` redirect and whether a dedicated projects page is needed.

### Phase 3: Nice To Have

- Add subtle mobile timeline indicators in Career Journey.
- Add more purposeful section transitions beyond border/background alternation.
- Add contact conversion after case studies.
- Refine marquee prominence or make it less visually dominant.
- Add lightweight interaction analytics for resume/contact/project clicks if useful.
- Add a distinct mono font if technical metadata should feel more code-like.

## Priority Issue List

1. Design direction conflict between `DESIGN_SYSTEM.md` and `src/app/globals.css`.
2. Color token names do not describe their values.
3. CTA overload and inconsistent screenshot/code state in header and hero.
4. Empty component/section files indicate unfinished or unused architecture.
5. Project case-study components are duplicated across route files.
6. Contact page has no form despite contact form scaffolding.
7. Project visuals are placeholders rather than actual product evidence.
8. Mobile project interactions rely too much on hover patterns.
9. Section heading and spacing patterns are manually repeated.
10. Some hard-coded colors and nonstandard spacing utilities weaken consistency.

