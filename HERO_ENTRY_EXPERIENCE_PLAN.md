# Hero Entry Experience Plan

## 1. Hero Concept Name

**HP Softlight Gateway**

A premium digital entrance built around a white/glass system core that feels closed, calm, and ready on arrival. The visitor does not open a literal door. They activate a soft-light product gate: a central HP core blooms open, orbit nodes drift outward, and the page carries that motion into the Explore Hub.

## 2. First Viewport Layout

- Keep the hero as the first screen, but shift the feeling from "landing page pitch" to "arrival lobby."
- Use a two-column desktop layout:
  - Left: short welcome copy, a strong one-line intro, and two CTAs.
  - Right/center: the HP Softlight Gateway visual, large enough to feel like the main object.
- Primary CTA: **Enter Portfolio**.
- Secondary CTA: **View Projects**.
- The hero should leave a subtle hint of the next section below the fold on common desktop and mobile sizes so the journey feels continuous.
- Replace the current marquee emphasis with a quieter transition band or reduce it significantly. The current marquee makes the hero feel more like a normal landing page and less like an entry moment.
- Suggested hero copy direction:
  - Eyebrow: `Welcome to Harsh OS`
  - Heading: `Enter the portfolio system.`
  - Body: `A guided look through product builds, AI platforms, cloud systems, and full-stack engineering work.`

## 3. Entry Visual Design

The visual should be a soft, premium digital portal rather than a door, game menu, or heavy 3D object.

- Core object:
  - A rounded glass square or circular-square hybrid with an HP/system mark at the center.
  - White/glass surface with subtle inner glow.
  - Purple/indigo accent ring.
  - Warm beige support glow behind and below the core.
- Portal states:
  - **Idle/Ready:** core is closed, ring slowly breathes, orbit nodes are close to the center.
  - **Opening:** center expands, inner panel brightens, ring splits or scales outward.
  - **Entered:** nodes settle into a path that visually points toward the Explore Hub.
- Supporting elements:
  - 4 to 6 small orbit nodes representing Projects, Skills, Cloud, AI, Career, Contact.
  - Fine connector lines with very low opacity.
  - Soft radial glow, glass highlights, and restrained shadows.
- Avoid:
  - Literal wooden door shapes.
  - Dark sci-fi tunnels.
  - Cyberpunk neon.
  - Cartoon/game UI.
  - Large Three.js/heavy 3D unless later proven necessary.

## 4. Click Interaction Sequence

Triggered by clicking **Enter Portfolio**.

1. CTA enters a brief pressed/loading state for tactile feedback.
2. Hero copy fades and slides upward slightly.
3. HP core brightens from the center.
4. Outer accent ring expands outward and softens.
5. Orbit nodes move outward into a wider constellation.
6. A warm beige glow sweeps downward from the hero visual toward the next section.
7. Page smoothly scrolls to `#explore`.
8. As the Explore Hub arrives, the visual state resolves into a small continuation element near the top of the section if feasible.

Timing target:

- 0-150ms: button feedback.
- 150-650ms: core opens and nodes expand.
- 450-950ms: copy fades/slides and glow bridge starts.
- 700-1200ms: smooth scroll begins or completes depending on viewport distance.
- 1200ms onward: Explore Hub content is active and readable.

## 5. Scroll Transition Sequence

The scroll should make the hero and Explore Hub feel connected, not like separate blocks.

- On initial scroll:
  - Gateway scales down slightly.
  - Core shifts downward or toward the center path.
  - Orbit nodes loosen and align with the next section's module cards.
- Near the end of the hero:
  - The portal glow becomes a soft top glow for the Explore Hub.
  - Connector lines fade before they become visually busy.
  - The hero copy fully exits or becomes backgrounded.
- At Explore Hub:
  - The first row of module cards can feel like the opened system destinations.
  - A small "activated core" motif can remain near the Explore Hub heading or background, but it should not compete with content.
- Avoid hard cuts:
  - Use overlapping background colors.
  - Use a shared warm cream/white gradient between sections.
  - Replace or soften the current hard `border-t` transition above Explore Hub.

## 6. Desktop Behavior

- Hero should use a composed two-column layout at `md` and above.
- Gateway visual should be the dominant object, roughly 420-560px wide depending on viewport.
- Copy should stay concise and vertically centered.
- Mouse hover on the gateway can create tiny parallax or ring response, but only if it remains premium and subtle.
- The **Enter Portfolio** click should run the full opening sequence before or during the smooth scroll.
- The **View Projects** CTA should bypass the entry animation and scroll/navigate directly to `#work`, unless a lighter version of the glow bridge is trivial.
- The hero should not trap the user. Normal wheel/touch scrolling should still work.

## 7. Mobile Behavior

- Use a stacked layout:
  - Welcome copy first.
  - Gateway visual second, centered and slightly smaller.
  - CTAs immediately reachable without excessive vertical travel.
- Keep the hero height flexible with `min-h` rather than forcing a full cinematic screen that hides the next section.
- On **Enter Portfolio**:
  - Shorten the animation.
  - Core opens with a scale/glow change.
  - Orbit nodes move less distance to avoid clipping.
  - Scroll to `#explore` quickly and smoothly.
- The continuation object should be optional on mobile. If it causes clutter, use only a soft glow bridge into the Explore Hub.
- Ensure long text does not overlap the visual at small widths.

## 8. Reduced-Motion Fallback

For `prefers-reduced-motion: reduce`:

- Disable orbit rotation, breathing loops, parallax, and scroll-tied transforms.
- On **Enter Portfolio**, skip the opening choreography and scroll directly to `#explore`.
- Use instant or very short opacity changes only if they do not create motion discomfort.
- Keep all CTAs as normal links/buttons.
- Make the entry visual readable in a static "ready/open" state.

## 9. Files Likely Involved

- `src/sections/home/hero-section.tsx`
  - Main hero copy, CTAs, click state, and visual composition.
- `src/sections/home/explore-hub-section.tsx`
  - Destination section, possible continuation motif, softened top transition.
- `src/app/(site)/page.tsx`
  - Section ordering is already correct: Hero then Explore Hub then Projects.
- `src/providers/smooth-scroll-provider.tsx`
  - Current Lenis setup can support the journey, but click-triggered scroll may need to coordinate with it.
- `src/hooks/use-reduced-motion.ts`
  - Prefer the local hook if it fits the existing code style, otherwise the current Framer hook pattern is already in use.
- `src/animations/gsap/scroll-timeline.ts`
  - Candidate location if scroll-tied choreography becomes complex.
- `src/animations/framer/variants.ts`
  - Candidate location for reusable hero animation variants.
- `src/app/globals.css`
  - Shared background, glow, or transition-band utility styles if Tailwind classes become too dense.
- `src/components/three/hero-scene.tsx`
  - Probably avoid for the first implementation unless a later phase chooses a lightweight canvas/Three visual.

## 10. Implementation Risk

- **Medium interaction risk:** Coordinating a click animation with smooth scrolling can feel awkward if scroll begins too early or too late.
- **Medium visual risk:** Too many orbit nodes, rings, and glows could become busy or game-like. Keep the visual restrained.
- **Low technical risk:** The existing stack already includes Framer Motion, Lenis, and reduced-motion handling.
- **Medium responsive risk:** The current hero visual is aspect-square and animated; expanded node positions may clip on mobile unless the visual has clear bounds.
- **Low content risk:** The current portfolio language already supports a "system/journey" concept.
- **Potential simplification:** Avoid Three.js in phase one. CSS and Framer Motion should be enough for a premium soft-light gateway.

## 11. Step-by-Step Implementation Phases

### Phase 1: Structure and Copy

1. Rename the primary CTA to **Enter Portfolio**.
2. Keep **View Projects** as the secondary CTA.
3. Tighten hero copy around arrival and entry rather than broad landing-page positioning.
4. Add a click state for the hero entry experience.
5. Keep existing anchors: `#explore` and `#work`.

### Phase 2: Gateway Visual

1. Refactor the current `HeroVisual` into a named gateway visual component inside `hero-section.tsx` or a nearby component if it grows.
2. Replace the "Cloud/System" center label with an HP/system core identity.
3. Rework visual layers into:
   - warm ambient glow,
   - glass core,
   - indigo accent ring,
   - orbit nodes,
   - subtle connector lines.
4. Add visual variants for idle and entered states.

### Phase 3: Enter Interaction

1. Convert **Enter Portfolio** from a plain hash link into a controlled button/link behavior.
2. On click, prevent default only when motion is allowed.
3. Set `isEntering` state.
4. Run the opening animation.
5. Scroll to `#explore`.
6. Reset or settle the hero state after scroll completes.
7. For reduced motion, skip state choreography and navigate/scroll directly.

### Phase 4: Scroll Continuity

1. Add a soft transition band between hero and Explore Hub.
2. Soften the Explore Hub top border/background so it receives the hero glow.
3. Add optional scroll-progress transforms to the gateway:
   - slight scale down,
   - glow drift downward,
   - connector fade.
4. Avoid scroll-jacking. The user should always remain in control.

### Phase 5: Explore Hub Integration

1. Make the Explore Hub feel like the opened destination screen.
2. Add a subtle continuation motif only if it improves continuity:
   - small HP core marker,
   - soft top glow,
   - faint connector line from hero direction.
3. Ensure module cards remain the primary content and do not become decorative clutter.

### Phase 6: Responsive and Accessibility Pass

1. Tune mobile spacing and gateway size.
2. Verify CTAs remain reachable in the first viewport.
3. Test keyboard activation of **Enter Portfolio**.
4. Confirm focus is handled after scroll, ideally by moving focus to the Explore Hub heading or preserving natural browser behavior.
5. Verify `prefers-reduced-motion` removes choreography.

### Phase 7: Verification

1. Run lint/type checks.
2. Open the local app in desktop and mobile viewports.
3. Test:
   - initial hero composition,
   - Enter Portfolio interaction,
   - View Projects behavior,
   - manual scroll continuity,
   - reduced-motion fallback.
4. Capture screenshots if a visual review is needed.

## Recommended Implementation Approach

Start with a CSS/Framer Motion implementation inside the existing hero rather than introducing heavier 3D. The current visual already has orbit nodes, glass surfaces, soft glows, and reduced-motion awareness; the highest-value change is to make those elements behave like an entry system with clear states.

Use one piece of local state, such as `isEntering`, to drive the click choreography. Use Framer Motion variants for the hero copy, gateway rings, core, and nodes. Use the existing `#explore` anchor as the destination, coordinating the scroll with the current Lenis provider where possible.

The first implementation should prioritize feel over complexity: a beautiful opening core, outward node motion, softened section transition, and a smooth arrival into Explore Hub. Add scroll-tied transformation only after the click interaction feels polished.
