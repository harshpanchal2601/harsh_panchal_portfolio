import {
  gsap,
  ScrollTrigger,
} from "@/animations/gsap/register-plugins";
import { scrollV2To } from "@/animations/gsap/scroll-runtime";

import { createSceneContext } from "@/components/portfolio-v2/motion/scene-context";

/* ============================================================
   SCENE 04 / WORK — Master scroll-scrubbed timeline
   ============================================================
   Phase A : Entry kinetic text  (R→L on downward arc)
   Phase B : Physical project card deck (pairwise stacking)
   Phase C : Exit kinetic text   (R→L on upward arc)
   ============================================================ */

const WORK_TRIGGER_ID = "v2-work-master";
const WORK_PROJECT_LABEL_PREFIX = "work:project:";

export const V2_WORK_READY_EVENT = "portfolio-v2:work-ready";

function signalWorkReady(): void {
  window.dispatchEvent(new Event(V2_WORK_READY_EVENT));
}

/* ── Timeline proportions (normalized 0–1) ──────────────── */

const ENTRY_TEXT_DUR = 0.22;       // Phase A: kinetic sweep
const ENTRY_FADE_DUR = 0.04;      // Entry layer fade-out after projects arrive
const PROJECT_ENTER_DUR = 0.055;   // Each project enter animation
const PROJECT_HOLD_DUR = 0.045;    // Reading moment per project
const PROJECT_EXIT_RECEDE = 0.08;  // Last project leaves fully
const EXIT_TEXT_DUR = 0.20;       // Phase C: kinetic sweep
const EXIT_HOLD_DUR = 0.04;      // Final readable state

/* ── Helpers ────────────────────────────────────────────── */

function killWorkTrigger(): void {
  ScrollTrigger.getById(WORK_TRIGGER_ID)?.kill();
}

function entryKineticOffsets(scope: HTMLElement): { start: number; end: number } {
  const path = scope.querySelector<SVGPathElement>(".v2-work-kinetic-svg path");
  const textPath = scope.querySelector<SVGTextPathElement>(
    "[data-work-text-path]",
  );

  const pathLength = path?.getTotalLength() ?? 3000;
  const textLength = textPath?.getComputedTextLength() ?? 2400;

  return {
    start: pathLength * 0.9,
    end: -textLength * 0.95,
  };
}

function exitKineticOffsets(scope: HTMLElement): { start: number; end: number } {
  const path = scope.querySelector<SVGPathElement>(".v2-work-exit-kinetic-svg path");
  const textPath = scope.querySelector<SVGTextPathElement>(
    "[data-work-exit-text-path]",
  );

  const pathLength = path?.getTotalLength() ?? 3000;
  const textLength = textPath?.getComputedTextLength() ?? 2800;

  // R→L on scroll down — same travel as entry, opposite arc
  return {
    start: pathLength * 0.9,
    end: -textLength * 0.95,
  };
}

/* ── Settle (reduced motion / fallback) ─────────────────── */

function settleWorkScene(scope: HTMLElement): void {
  const select = gsap.utils.selector(scope);
  const entryTextPath = select("[data-work-text-path]")[0];
  const exitTextPath = select("[data-work-exit-text-path]")[0];
  const entryKinetic = select("[data-work-kinetic-svg]");
  const exitKinetic = select("[data-work-exit-kinetic]");
  const exitRail = select("[data-work-exit-rail]");
  const panels = gsap.utils.toArray<HTMLElement>(select("[data-work-panel]"));
  const media = gsap.utils.toArray<HTMLElement>(select("[data-work-media]"));
  const entryOffsets = entryKineticOffsets(scope);

  if (entryTextPath) {
    gsap.set(entryTextPath, { attr: { startOffset: entryOffsets.start * 0.35 } });
  }

  if (exitTextPath) {
    const exitOffsets = exitKineticOffsets(scope);
    gsap.set(exitTextPath, { attr: { startOffset: exitOffsets.end } });
  }

  gsap.set(entryKinetic, { rotate: 0 });
  gsap.set(exitKinetic, { opacity: 1, rotate: 0 });
  gsap.set(exitRail, { opacity: 1 });
  gsap.set(panels, { yPercent: 0, scale: 1, rotate: 0, autoAlpha: 1 });
  gsap.set(media, { clipPath: "inset(0% 0% 0% 0%)" });
}

/* ── Master timeline ────────────────────────────────────── */

function buildWorkTimeline(scope: HTMLElement): () => void {
  killWorkTrigger();

  const select = gsap.utils.selector(scope);

  // Entry kinetic elements
  const entryTextPath = select("[data-work-text-path]")[0];
  const entryKineticLayer = select("[data-work-kinetic]")[0];
  const entryKineticSvg = select("[data-work-kinetic-svg]");
  const entryRail = select("[data-work-entry-rail]")[0];

  // Exit kinetic elements
  const exitTextPath = select("[data-work-exit-text-path]")[0];
  const exitKineticLayer = select("[data-work-exit-kinetic]")[0];
  const exitKineticSvg = select("[data-work-exit-kinetic-svg]");
  const exitRail = select("[data-work-exit-rail]")[0];

  // Project elements
  const panels = gsap.utils.toArray<HTMLElement>(select("[data-work-panel]"));
  const media = gsap.utils.toArray<HTMLElement>(select("[data-work-media]"));

  if (!entryTextPath || !exitTextPath || panels.length === 0) {
    settleWorkScene(scope);
    signalWorkReady();
    return () => {};
  }

  const entryOffsets = entryKineticOffsets(scope);
  const exitOffsets = exitKineticOffsets(scope);
  const numProjects = panels.length;

  /* ── Initial states ────────────────────────────────────── */

  // Entry kinetic: text offscreen right
  gsap.set(entryTextPath, {
    attr: { startOffset: entryOffsets.start },
  });
  gsap.set(entryKineticSvg, {
    rotate: 0,
    transformOrigin: "50% 50%",
  });
  gsap.set(entryKineticLayer, {
    autoAlpha: 1,
  });
  if (entryRail) {
    gsap.set(entryRail, { autoAlpha: 1 });
  }

  // Exit kinetic: hidden, text offscreen right
  gsap.set(exitKineticLayer, {
    opacity: 0,
  });
  gsap.set(exitTextPath, {
    attr: { startOffset: exitOffsets.start },
  });
  gsap.set(exitKineticSvg, {
    rotate: 0,
    transformOrigin: "50% 50%",
  });
  if (exitRail) {
    gsap.set(exitRail, { opacity: 0 });
  }

  // Project panels: all below viewport
  panels.forEach((panel) => {
    gsap.set(panel, {
      yPercent: 100,
      scale: 1,
      rotate: 0,
      autoAlpha: 1,
      transformOrigin: "50% 0%",
    });
  });

  // Media: slit closed
  gsap.set(media, {
    clipPath: "inset(43% 0% 43% 0%)",
  });

  /* ── Calculate timeline positions ─────────────────────── */

  // Total project deck duration
  const projectTotalDur =
    numProjects * (PROJECT_ENTER_DUR + PROJECT_HOLD_DUR);

  // Normalize everything to 1.0
  const totalRaw =
    ENTRY_TEXT_DUR +
    ENTRY_FADE_DUR +
    projectTotalDur +
    PROJECT_EXIT_RECEDE +
    EXIT_TEXT_DUR +
    EXIT_HOLD_DUR;

  const norm = (v: number) => v / totalRaw;

  const entryTextDur = norm(ENTRY_TEXT_DUR);
  const entryFadeDur = norm(ENTRY_FADE_DUR);
  const projEnterDur = norm(PROJECT_ENTER_DUR);
  const projHoldDur = norm(PROJECT_HOLD_DUR);
  const projBlockDur = projEnterDur + projHoldDur;
  const lastRecedeDur = norm(PROJECT_EXIT_RECEDE);
  const exitTextDur = norm(EXIT_TEXT_DUR);
  const exitHoldDur = norm(EXIT_HOLD_DUR);

  // First project overlaps with trailing entry text
  const entryOverlapAt = entryTextDur * 0.82;

  /* ── Build timeline ────────────────────────────────────── */

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      id: WORK_TRIGGER_ID,
      trigger: scope,
      start: "top top",
      end: "bottom bottom",
      pin: false,
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh(self) {
        const start = scope.getBoundingClientRect().top + window.scrollY;
        const end = start + scope.offsetHeight - window.innerHeight;

        if (self.start === start && self.end === end) {
          return;
        }

        self.setPositions(start, Math.max(end, start + 1));
      },
    },
  });

  /* ─── Phase A: Entry kinetic text ────────────────────── */

  // Text sweeps R→L along curved baseline
  timeline.to(
    entryTextPath,
    {
      attr: { startOffset: entryOffsets.end },
      duration: entryTextDur,
    },
    0,
  );

  // Subtle rotation on SVG during sweep
  timeline.to(
    entryKineticSvg,
    {
      rotate: -1.5,
      duration: entryTextDur,
      ease: "power1.inOut",
    },
    0,
  );

  /* ─── Phase A→B: First project enters (overlaps) ─────── */

  // Project 01 rises from below
  timeline.to(
    panels[0],
    {
      yPercent: 0,
      duration: projEnterDur,
    },
    entryOverlapAt,
  );

  // Media slit → full reveal
  timeline.to(
    media[0],
    {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: projEnterDur,
    },
    entryOverlapAt,
  );

  // Entry kinetic layer fades out after project 01 settles
  const entryFadeAt = entryOverlapAt + projEnterDur;
  timeline.to(
    entryKineticLayer,
    {
      autoAlpha: 0,
      duration: entryFadeDur,
    },
    entryFadeAt,
  );

  // Entry rail fades with kinetic layer
  if (entryRail) {
    timeline.to(
      entryRail,
      {
        autoAlpha: 0,
        duration: entryFadeDur * 0.7,
      },
      entryOverlapAt,
    );
  }

  /* ─── Phase B: Project card deck ─────────────────────── */

  const firstProjectStart = entryOverlapAt;

  panels.forEach((panel, index) => {
    const slug = panel.dataset.workProject;

    if (slug) {
      const settledHoldOffset =
        index === 0 ? entryFadeDur : projHoldDur * 0.5;

      timeline.addLabel(
        `${WORK_PROJECT_LABEL_PREFIX}${slug}`,
        firstProjectStart +
          index * projBlockDur +
          projEnterDur +
          settledHoldOffset,
      );
    }
  });

  for (let i = 1; i < numProjects; i += 1) {
    const at = firstProjectStart + i * projBlockDur;
    const outgoing = panels[i - 1];
    const incoming = panels[i];
    const outgoingRotation = i % 2 === 0 ? 0.9 : -1.05;

    // Recede cards 2+ behind (pairwise: only current + next visible)
    if (i >= 2) {
      timeline.to(
        panels[i - 2],
        {
          yPercent: -22,
          autoAlpha: 0,
          duration: projEnterDur * 0.85,
        },
        at,
      );
    }

    // Outgoing panel: scale down, slight rotate, shift up
    timeline.to(
      outgoing,
      {
        yPercent: -7,
        scale: 0.955,
        rotate: outgoingRotation,
        duration: projEnterDur,
      },
      at,
    );

    // Incoming panel rises from below
    timeline.to(
      incoming,
      {
        yPercent: 0,
        duration: projEnterDur,
      },
      at,
    );

    // Media slit → full reveal
    timeline.to(
      media[i],
      {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: projEnterDur,
      },
      at,
    );
  }

  /* ─── Phase B→C: Last project recedes, exit text enters ─ */

  const lastProjectStart =
    firstProjectStart + (numProjects - 1) * projBlockDur;
  const lastProjectSettled = lastProjectStart + projEnterDur;
  const recedeStart = lastProjectSettled + projHoldDur;

  const lastPanel = panels[numProjects - 1];

  // Hide second-to-last panel
  if (numProjects >= 2) {
    timeline.to(
      panels[numProjects - 2],
      {
        yPercent: -22,
        autoAlpha: 0,
        duration: lastRecedeDur * 0.5,
      },
      recedeStart,
    );
  }

  // Last project leaves completely before exit type takes the stage
  timeline.to(
    lastPanel,
    {
      scale: 0.96,
      rotate: 0.5,
      yPercent: -8,
      duration: lastRecedeDur * 0.55,
    },
    recedeStart,
  );

  timeline.to(
    lastPanel,
    {
      autoAlpha: 0,
      duration: lastRecedeDur * 0.7,
    },
    recedeStart + lastRecedeDur * 0.25,
  );

  const exitFadeInAt = recedeStart + lastRecedeDur;
  timeline.to(
    exitKineticLayer,
    {
      opacity: 1,
      duration: lastRecedeDur * 0.55,
    },
    exitFadeInAt,
  );

  /* ─── Phase C: Exit kinetic text ─────────────────────── */

  const exitTextStart = recedeStart + lastRecedeDur;

  // Text sweeps R→L along upward arc (same direction as entry)
  timeline.to(
    exitTextPath,
    {
      attr: { startOffset: exitOffsets.end },
      duration: exitTextDur,
    },
    exitTextStart,
  );

  // Subtle rotation on SVG — opposite direction from entry (+1.2 vs -1.5)
  timeline.to(
    exitKineticSvg,
    {
      rotate: 1.2,
      duration: exitTextDur,
      ease: "power1.inOut",
    },
    exitTextStart,
  );

  // Last project is already gone before this phase
  if (exitRail) {
    timeline.to(
      exitRail,
      {
        opacity: 1,
        duration: exitTextDur * 0.35,
      },
      exitTextStart + exitTextDur * 0.15,
    );
  }

  /* ─── Exit hold: text settles in final readable state ── */

  const exitEndAt = exitTextStart + exitTextDur;
  timeline.to(
    {},
    {
      duration: exitHoldDur,
    },
    exitEndAt,
  );

  /* ── Refresh ───────────────────────────────────────────── */

  ScrollTrigger.refresh();
  signalWorkReady();

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    killWorkTrigger();
  };
}

/* ── Public API ──────────────────────────────────────────── */

export function playWorkScene(scope: HTMLElement): gsap.Context {
  return createSceneContext(scope, () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      settleWorkScene(scope);
      signalWorkReady();
      return;
    }

    return buildWorkTimeline(scope);
  });
}

export function scrollToWorkProject(
  scope: HTMLElement,
  slug: string,
  options?: { immediate?: boolean },
): boolean {
  const panel = Array.from(
    scope.querySelectorAll<HTMLElement>("[data-work-project]"),
  ).find((candidate) => candidate.dataset.workProject === slug);

  if (!panel) {
    return false;
  }

  const trigger = ScrollTrigger.getById(WORK_TRIGGER_ID);
  const timeline = trigger?.animation as gsap.core.Timeline | undefined;
  const labelTime = timeline?.labels[`${WORK_PROJECT_LABEL_PREFIX}${slug}`];
  const duration = timeline?.duration() ?? 0;

  if (!trigger || labelTime === undefined || duration <= 0) {
    scrollV2To(panel, options);
    return true;
  }

  ScrollTrigger.refresh();

  const progress = gsap.utils.clamp(0, 1, labelTime / duration);
  const scrollPosition =
    trigger.start + (trigger.end - trigger.start) * progress;

  scrollV2To(scrollPosition, options);
  return true;
}
