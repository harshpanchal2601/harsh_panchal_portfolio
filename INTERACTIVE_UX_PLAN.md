# Interactive UX Redesign Plan

## Goal

Evolve the portfolio from a long, linear resume-style homepage into an interactive exploration experience that feels premium, playful, and professional.

This plan keeps the current visual foundation from `CURRENT_UI_SYSTEM.md`:

- soft-light theme
- warm cream background
- white surfaces
- purple/indigo accents
- modern product-builder personality

This plan does not change routes, does not delete existing content, and does not recommend a return to dark UI.

## 1. New UX Concept

### Chosen Concept

`Harsh OS`

### Why This Fits Best

`Harsh OS` is the strongest concept because it turns a developer portfolio into something that feels like a system you can explore rather than a document you read.

It fits a full-stack engineer portfolio especially well because:

- full-stack work naturally spans systems, modules, pipelines, and environments
- it supports projects, skills, cloud, and career progression inside one mental model
- it feels product-oriented rather than purely personal-brand oriented
- it can be interactive without becoming childish or overly game-like
- it matches the current hero visual language, which already hints at technical nodes, infrastructure, and product systems

### Core Experience Framing

The homepage should feel like entering a lightweight operating environment for Harsh’s work.

The visitor should feel like they are:

- launching into a builder workspace
- choosing what subsystem to inspect
- opening project missions
- exploring skill clusters
- tracing a progression path
- reaching a contact portal when ready

This is not a fake terminal.
This is not cyberpunk.
This is not heavy 3D.

It should feel like a polished product dashboard crossed with a portfolio map.

## 2. New Homepage Flow

### Current Problem

The current homepage is:

- too long
- too linear
- too section-by-section
- too close to a resume scroll

### Proposed New Flow

1. Start Screen
2. Explore Hub
3. Project Missions
4. Skills System
5. Career Path
6. Contact Portal

### New Flow Description

#### 1. Start Screen

This replaces the current hero as a more intentional launch point.

Purpose:

- establish identity immediately
- communicate value fast
- give the user a reason to begin exploring

Outputs:

- headline
- short value proposition
- animated system visual
- primary CTA: `Explore Harsh OS`
- secondary CTA: `View Projects` or `Contact`

#### 2. Explore Hub

This becomes the homepage’s main navigation center.

Purpose:

- compress the long page into clear pathways
- let visitors choose what they care about
- make the site feel interactive early

Outputs:

- a grid or map of modules
- clear labels and lightweight motion
- jump or scroll into focused sections

#### 3. Project Missions

This becomes the most important content area for recruiters and clients.

Purpose:

- make projects feel discoverable and rewarding
- turn case studies into destinations
- create curiosity and momentum

Outputs:

- interactive mission cards
- stronger preview behavior
- always-visible mobile actions

#### 4. Skills System

This replaces a flat skills section with an explorable capability map.

Purpose:

- show breadth without dumping static cards
- connect technical categories to real project proof

Outputs:

- skill constellation or system map
- filtered project relationships

#### 5. Career Path

This merges education, journey, and role progression into one clear arc.

Purpose:

- show progression without another long timeline block
- make growth feel like unlocks, milestones, or environments traversed

Outputs:

- progression path
- milestone cards
- visible movement from learning to delivery to leadership

#### 6. Contact Portal

This becomes the closing action surface.

Purpose:

- convert curiosity into contact
- avoid ending on passive footer-only behavior

Outputs:

- clear invitation
- one primary CTA
- supporting secondary actions

### Why This Flow Is Better

- shorter top-level structure
- more interactive choice earlier
- stronger project-first hierarchy
- less resume-like
- better fit for the current product-builder tone

## 3. Interactive Hero Plan

### Hero Role

The hero should behave like a start screen for `Harsh OS`.

### Content Structure

- eyebrow: `Harsh OS`
- role signal: `Full Stack Developer`
- strong headline
- concise value proposition
- animated system visual
- primary CTA: `Start Exploring`
- secondary CTA: `View Projects` or `Open Contact`

### Recommended Headline Direction

The headline should stay product-builder focused, not generic developer-brand copy.

Examples of direction:

- build products that connect interface, backend, and cloud
- turn ideas into production-ready systems
- design and ship systems people actually use

### Hero Interaction Plan

- ambient animated technical visual stays on the right or below depending on breakpoint
- the visual reacts subtly to pointer movement
- module hotspots can pulse gently
- primary CTA gets mild magnetic behavior
- one lightweight “wake the system” interaction can happen on load or first hover

### What To Avoid

- static stack of boring summary cards
- giant 3D scene
- fake terminal UI
- dark cyberpunk styling
- generic gradient-dev-template composition

## 4. Explore Hub Plan

### Purpose

The Explore Hub is the homepage’s core interaction layer.

It should appear directly after the start screen and act as a guided choice system.

### Module Structure

#### Projects

- title: `Project Missions`
- description: explore real product builds, engineering decisions, and outcomes
- hover behavior: card glow, subtle tilt, preview chip for featured projects
- click behavior: scroll to project missions section or open focused project panel
- mobile behavior: tap expands quick summary and exposes CTA immediately

#### Skills

- title: `Skill System`
- description: inspect frontend, backend, cloud, DevOps, database, and AI capability clusters
- hover behavior: surrounding skill nodes brighten and related project chips appear
- click behavior: scroll to skills constellation and activate the selected category
- mobile behavior: tap opens one category drawer or stacked panel

#### Experience

- title: `Career Path`
- description: trace progression from fundamentals to production delivery and team responsibility
- hover behavior: path segment highlights and milestone preview appears
- click behavior: scroll to career path with selected milestone emphasized
- mobile behavior: tap opens milestone strip or stacked milestone sheet

#### Cloud/DevOps

- title: `Cloud Ops`
- description: explore deployment, AWS, release workflows, and production thinking
- hover behavior: infrastructure lines animate softly and service tags appear
- click behavior: jump to skills or project content filtered to cloud/devops proof
- mobile behavior: tap opens cloud capability summary card with linked projects

#### About

- title: `About Harsh`
- description: see work style, engineering philosophy, and builder mindset
- hover behavior: soft portrait/identity panel preview appears
- click behavior: scroll to a compact about panel or open profile drawer
- mobile behavior: tap reveals a compact expanded panel

#### Contact

- title: `Contact Portal`
- description: move from exploration into conversation
- hover behavior: CTA edge glow and quick action chips appear
- click behavior: jump to contact portal or route to `/contact`
- mobile behavior: tap opens clear action list with primary contact CTA

### Explore Hub Interaction Model

- desktop: module grid with light map behavior
- tablet: 2-column interactive panel layout
- mobile: horizontally swipeable cards or stacked expandable cards

## 5. Project Missions Plan

### Core Idea

Projects should feel like missions inside `Harsh OS`, not just resume entries.

### Mission Structure

Each project card should include:

- mission number
- project name
- role
- challenge
- stack
- impact
- CTA to case study

### Mission Framing

#### Mission 01

- project: `Wikipoint AI`
- role: `Full Stack + AWS/DevOps`
- challenge focus: connected AI platform for digital presence

#### Mission 02

- project: `Beige`
- role: `Main Developer / Full Stack`
- challenge focus: booking, CRM, payments, role-based platform complexity

#### Mission 03

- project: `ERP System`
- role: `Junior Full Stack Developer`
- challenge focus: operational workflow centralization

#### Mission 04

- project: `HR Management System`
- role: `Junior Full Stack Developer`
- challenge focus: internal HR workflow management

### Hover And Tap Interactions

- card tilt: very subtle perspective tilt tied to pointer position
- glow: accent glow intensifies near pointer
- preview reveal: image or visual preview expands slightly
- stack chips animation: technology chips drift in or fade upward on hover
- progress line: mission status line fills slightly on hover
- CTA visibility: always visible on mobile, not dependent on hover

### Content Hierarchy Rules

- primary two missions can feel larger and more premium
- supporting missions can still feel explorable, not secondary throwaways
- project challenge and impact should be visible before click
- case study CTA should remain obvious and low-friction

## 6. Interactive Skills Plan

### Core Idea

Replace a flat “skills” section with a `Skill System` or `Skill Constellation`.

This should feel like a network of capabilities connected to real work.

### Skill Categories

- Frontend
- Backend
- Cloud
- DevOps
- Database
- AI

### Category Behavior

#### Frontend

- visual: bright interface node with layout and component signals
- hover/click: highlight UI-focused projects and interface contributions
- related projects: Beige, Wikipoint AI, ERP, HR
- mobile fallback: expandable category card with linked projects

#### Backend

- visual: service node with API rails or routing lines
- hover/click: show API, workflow, and product logic proof
- related projects: all four projects
- mobile fallback: accordion-style detail card

#### Cloud

- visual: orbit or cluster with deployment/service tags
- hover/click: reveal AWS-relevant project links and production notes
- related projects: Wikipoint AI, Beige, current role experience
- mobile fallback: stacked capability sheet

#### DevOps

- visual: release pipeline lane or motion track
- hover/click: show CI/CD, deployment, release automation proof
- related projects: Wikipoint AI, current role experience
- mobile fallback: tap opens compact ops panel

#### Database

- visual: storage node with linked data hubs
- hover/click: surface MongoDB, RDS, operational data systems
- related projects: all four projects
- mobile fallback: expandable relationship list

#### AI

- visual: highlighted intelligence node with signal halo
- hover/click: show RAG, assistant behavior, context retrieval, platform automation
- related projects: Wikipoint AI, Beige AI matchmaking
- mobile fallback: featured AI capability card

### Related Project Behavior

When a skill is active:

- related project chips appear
- one or two project missions brighten
- short proof statements appear near the active node

### Why This Works

- shows breadth without dumping text
- connects skills to evidence
- gives recruiters a faster mental model of capability

## 7. Career Path Plan

### Core Idea

Turn career history into a progression path rather than a traditional timeline.

### Narrative Stages

1. Foundation
2. Junior Full Stack
3. Product Delivery
4. Cloud And AWS Ownership
5. Team Lead Capacity

### Included Milestones

- education
- junior full stack work
- full stack developer role
- AWS/cloud work
- team lead capacity

### Visual Pattern

Recommended structure:

- a horizontal or diagonal path on desktop
- milestone stations
- small unlock cards or stage panels
- subtle path line with active progress state

### Stage Framing

#### Stage 01: Foundation

- education
- fundamentals
- early web development base

#### Stage 02: Junior Full Stack

- ERP System
- HR Management System
- internal workflow products

#### Stage 03: Product Delivery

- bigger product responsibility
- more complex user and business flows

#### Stage 04: Cloud Systems

- AWS infrastructure
- deployment ownership
- CI/CD and operational reliability

#### Stage 05: Team Lead Capacity

- planning
- coordination
- broader delivery responsibility

### Mobile Fallback

- vertical stage cards connected by a visible progress rail
- each stage expands on tap
- maintain progression feel, not plain stacked text

## 8. Motion And Interaction Rules

### Core Interaction Ideas

- mouse-follow glow on premium cards
- subtle card tilt on desktop
- hover preview reveal for modules and projects
- magnetic buttons for primary CTAs
- directional scroll reveal for section entry
- active section indicator in the homepage shell
- mobile tap states that mirror hover meaning

### Motion Principles

- use Framer Motion as the primary interaction layer
- avoid heavy 3D unless extremely lightweight and optional
- respect `prefers-reduced-motion`
- prevent layout shift
- prevent horizontal overflow
- keep motion supporting discovery, not competing with content

### Performance Rules

- prefer transforms and opacity over layout properties
- keep pointer-based motion shallow and inexpensive
- avoid giant canvas scenes
- do not block content on animation readiness
- reduce or disable complex effects on lower-power/mobile conditions

### Interaction Meaning Rules

- every hover effect must have a mobile tap equivalent when it contains meaning
- hover should enhance, not reveal essential content exclusively
- the active state should always be obvious

## 9. Mobile UX Plan

### 360px

Goal:

- compact but still interactive

Plan:

- hero becomes a crisp launch card plus reduced technical visual
- explore hub becomes swipeable or stacked expandable modules
- project missions use always-visible CTA and compact summary blocks
- skills become tap-to-expand system cards
- career path becomes vertical progress rail

### 390px

Goal:

- slightly roomier version of the same interaction model

Plan:

- preserve two-CTA max in hero
- allow more comfortable label and chip wrapping
- maintain preview cards without forcing hover assumptions

### 768px

Goal:

- transition from stacked to panel-based exploration

Plan:

- hero can reintroduce split layout
- explore hub becomes 2-column module system
- project missions become denser and more visual
- skills system can shift from accordion to network-lite layout

### Desktop

Goal:

- fully expressive interactive exploration experience

Plan:

- hero gets stronger ambient motion
- explore hub becomes the central navigation canvas
- project missions use richer previews and hover states
- skills constellation and career path become spatial and playful

### Mobile Interaction Rule

Mobile should still feel interactive through:

- expandable states
- active chips
- swipeable module groups where useful
- tap-based reveal patterns
- visible action hierarchy

It must not collapse into a plain long stack of static cards.

## 10. Implementation Phases

### Phase 1: Homepage Flow Restructure

Likely files involved:

- `src/app/(site)/page.tsx`
- `src/components/layout/site-shell.tsx`
- `src/sections/home/*`

Risk level:

- medium

Expected result:

- homepage reorganized around a shorter, clearer exploration flow

Validation checklist:

- homepage is shorter at the top level
- no route changes
- all existing content still has a place
- section order feels intentional, not resume-like
- no broken anchor behavior

### Phase 2: Interactive Hero And Explore Hub

Likely files involved:

- `src/sections/home/hero-section.tsx`
- new or updated explore hub section under `src/sections/home/*`
- `src/components/motion/*`

Risk level:

- medium

Expected result:

- homepage opens like a product experience
- users can choose what to explore quickly

Validation checklist:

- hero has one clear primary CTA
- hero has no more than two major CTA actions
- explore hub is understandable in under five seconds
- mobile hub remains tappable and readable
- reduced-motion behavior remains intact

### Phase 3: Project Missions

Likely files involved:

- `src/sections/home/featured-projects-section.tsx`
- `src/data/projects/*`
- possibly `src/components/shared/project-card.tsx`

Risk level:

- medium

Expected result:

- projects feel like interactive missions, not static case-study teasers

Validation checklist:

- mission numbers are visible
- CTA is always visible on mobile
- hover states add value but do not hide core action
- project hierarchy remains clear
- placeholder visuals do not dominate content

### Phase 4: Skill Constellation

Likely files involved:

- `src/sections/home/technical-expertise-section.tsx`
- `src/data/technical-expertise.ts`
- new shared skill system component if needed

Risk level:

- medium-high

Expected result:

- skill exploration becomes interactive and connected to project proof

Validation checklist:

- all six categories are discoverable
- related projects are visible when a skill is active
- mobile fallback is clear and performant
- no heavy rendering cost

### Phase 5: Career Path

Likely files involved:

- `src/sections/home/experience-timeline-section.tsx`
- `src/sections/home/career-journey-section.tsx`
- `src/sections/home/education-section.tsx`
- related data files under `src/data/*`

Risk level:

- medium

Expected result:

- experience, journey, and education feel like one progression system

Validation checklist:

- progression is understandable at a glance
- education still appears in the path
- leadership and AWS growth are clearly visible
- mobile keeps the progression feeling

### Phase 6: Motion Polish And Mobile QA

Likely files involved:

- `src/components/motion/*`
- `src/app/globals.css`
- all updated homepage sections

Risk level:

- medium

Expected result:

- interactive polish feels intentional, fast, and stable

Validation checklist:

- no layout shift
- no horizontal overflow
- hover interactions have mobile equivalents where needed
- `prefers-reduced-motion` is respected
- 360px, 390px, 768px, and desktop all feel designed, not merely adapted

## Top 10 Interaction Ideas

1. A `Start Exploring` hero CTA with subtle magnetic pull.
2. An Explore Hub that behaves like a portfolio control center.
3. Pointer-reactive module cards with soft glow and depth.
4. Project cards framed as mission panels with mission numbers.
5. Hover preview reveals that surface project visuals or proof snippets.
6. Skill nodes that illuminate related projects when activated.
7. A career path with milestone stations instead of a plain timeline.
8. An active section indicator that helps users track where they are in the experience.
9. Tap-to-expand mobile modules so mobile still feels exploratory.
10. Lightweight ambient system motion in the hero that makes the page feel alive without heavy 3D.

## Final Recommendation

The portfolio should evolve into `Harsh OS`: a soft-light interactive portfolio system that feels like a product to explore rather than a resume to scroll.

Keep the current visual foundation.
Do not change the theme.
Do not add heavy 3D.

The redesign should focus on:

- shorter homepage structure
- stronger interactive choice architecture
- project-first exploration
- skill-to-project relationships
- progression-based career storytelling
- mobile interaction quality

The target feeling is simple:

A recruiter should feel curious within seconds, want to click around, and come away feeling that the portfolio reflects how Harsh actually thinks about building systems.

