import {
  gsap,
  ScrollTrigger,
} from "@/animations/gsap/register-plugins";

import { scrollV2To } from "@/animations/gsap/scroll-runtime";
import { createSceneContext } from "@/components/portfolio-v2/motion/scene-context";

const PROCESS_TRIGGER_ID = "v2-process-master";

const REST = {
  frame: 0.22,
  build: 0.58,
  ship: 0.9,
} as const;

const HOLDS: Array<{ start: number; end: number; rest: number }> = [
  { start: 0.12, end: 0.34, rest: REST.frame },
  { start: 0.52, end: 0.72, rest: REST.build },
  { start: 0.86, end: 1, rest: REST.ship },
];

function fitProcessWord(scope: HTMLElement): void {
  const stage = scope.querySelector(".v2-process-stage");
  const words = gsap.utils.toArray<HTMLElement>(
    scope.querySelectorAll(".v2-process-giant"),
  );

  if (!(stage instanceof HTMLElement) || words.length === 0) {
    return;
  }

  words.forEach((word) => {
    word.style.fontSize = "";
  });

  gsap.set(words, { scaleX: 1, x: 0, y: 0 });

  const widest = words.reduce(
    (max, word) => Math.max(max, word.scrollWidth),
    0,
  );
  const limit = stage.clientWidth * 0.92;
  const scaleX = widest > limit ? limit / widest : 1;

  gsap.set(words, {
    scaleX,
    force3D: true,
    transformOrigin: "50% 50%",
  });
}

function prepareProcessType(scope: HTMLElement): void {
  fitProcessWord(scope);
}

function killProcessTrigger(): void {
  ScrollTrigger.getById(PROCESS_TRIGGER_ID)?.kill();
}

function readShift(scope: HTMLElement, name: string): number {
  const value = Number.parseFloat(
    getComputedStyle(scope).getPropertyValue(name).trim(),
  );

  return Number.isFinite(value) ? value : 0;
}

function bandShifts(
  scope: HTMLElement,
  prefix: "frame" | "apart-a" | "build" | "apart-b" | "ship",
): [number, number, number] {
  return [
    readShift(scope, `--process-${prefix}-top`),
    readShift(scope, `--process-${prefix}-mid`),
    readShift(scope, `--process-${prefix}-bot`),
  ];
}

function restProgress(progress: number, direction: number): number | null {
  if (progress >= 0.987) {
    return null;
  }

  if (direction < 0 && progress < HOLDS[0].start) {
    return null;
  }

  if (progress < HOLDS[0].start) {
    return REST.frame;
  }

  for (const hold of HOLDS) {
    if (progress >= hold.start && progress <= hold.end) {
      return null;
    }
  }

  let nearest: number = REST.frame;
  let distance = Math.abs(progress - REST.frame);

  for (const rest of [REST.build, REST.ship]) {
    const next = Math.abs(progress - rest);

    if (next < distance) {
      nearest = rest;
      distance = next;
    }
  }

  return nearest;
}

function settleProcessScene(scope: HTMLElement): void {
  const select = gsap.utils.selector(scope);

  gsap.set(select("[data-process-kicker]"), { autoAlpha: 1, yPercent: 0 });
  gsap.set(select("[data-process-slice]"), { xPercent: 0 });
  gsap.set(select('[data-process-word="frame"], [data-process-word="build"]'), {
    autoAlpha: 0,
  });
  gsap.set(select('[data-process-word="ship"]'), { autoAlpha: 1 });
  gsap.set(select("[data-process-support]"), { autoAlpha: 0, y: 0 });
  gsap.set(select('[data-process-support="ship"]'), { autoAlpha: 1 });
  gsap.set(select("[data-process-rule]"), { scaleX: 0.84, opacity: 0.45 });
  prepareProcessType(scope);
}

function buildProcessTimeline(scope: HTMLElement): () => void {
  killProcessTrigger();

  const select = gsap.utils.selector(scope);
  const kicker = select("[data-process-kicker]");
  const slices = gsap.utils.toArray<HTMLElement>(select("[data-process-slice]"));
  const frameWords = select('[data-process-word="frame"]');
  const buildWords = select('[data-process-word="build"]');
  const shipWords = select('[data-process-word="ship"]');
  const frameSupport = select('[data-process-support="frame"]');
  const buildSupport = select('[data-process-support="build"]');
  const shipSupport = select('[data-process-support="ship"]');
  const rules = select("[data-process-rule]");

  if (slices.length !== 3) {
    settleProcessScene(scope);
    return () => {};
  }

  prepareProcessType(scope);

  const frameFrom = bandShifts(scope, "frame");
  const apartA = bandShifts(scope, "apart-a");
  const buildFrom = bandShifts(scope, "build");
  const apartB = bandShifts(scope, "apart-b");
  const shipFrom = bandShifts(scope, "ship");

  gsap.set(kicker, { autoAlpha: 0, yPercent: 80 });

  slices.forEach((slice, index) => {
    gsap.set(slice, { xPercent: frameFrom[index], force3D: true });
  });

  gsap.set(frameWords, { autoAlpha: 1 });
  gsap.set(buildWords, { autoAlpha: 0 });
  gsap.set(shipWords, { autoAlpha: 0 });
  gsap.set(frameSupport, { autoAlpha: 0, y: 16 });
  gsap.set(buildSupport, { autoAlpha: 0, y: 16 });
  gsap.set(shipSupport, { autoAlpha: 0, y: 16 });
  gsap.set(rules, { scaleX: 1, opacity: 0.9 });

  let snapTimer = 0;
  let snapping = false;

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      id: PROCESS_TRIGGER_ID,
      trigger: scope,
      start: "top top",
      end: "bottom bottom",
      pin: false,
      scrub: true,
      invalidateOnRefresh: true,
      onUpdate(self) {
        if (snapping || !self.isActive) {
          return;
        }

        window.clearTimeout(snapTimer);
        snapTimer = window.setTimeout(() => {
          const target = restProgress(self.progress, self.direction);

          if (target === null) {
            return;
          }

          snapping = true;
          const scroll = self.start + (self.end - self.start) * target;
          scrollV2To(scroll);
          window.setTimeout(() => {
            snapping = false;
          }, 850);
        }, 280);
      },
      onRefresh(self) {
        prepareProcessType(scope);

        const start = scope.getBoundingClientRect().top + window.scrollY;
        const end = start + scope.offsetHeight - window.innerHeight;

        if (self.start === start && self.end === end) {
          return;
        }

        self.setPositions(start, Math.max(end, start + 1));
      },
    },
  });

  timeline.to(
    kicker,
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.08,
    },
    0,
  );

  slices.forEach((slice) => {
    timeline.to(
      slice,
      {
        xPercent: 0,
        x: 0,
        duration: 0.12,
      },
      0,
    );
  });

  timeline.to(
    rules,
    {
      scaleX: 0.84,
      opacity: 0.42,
      duration: 0.12,
    },
    0,
  );

  timeline.to(
    frameSupport,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.06,
    },
    0.1,
  );

  timeline.to({}, { duration: 0.22 }, 0.12);

  slices.forEach((slice, index) => {
    timeline.to(
      slice,
      {
        xPercent: apartA[index],
        duration: 0.08,
      },
      0.34,
    );
  });

  timeline.to(
    frameSupport,
    {
      autoAlpha: 0,
      y: -10,
      duration: 0.06,
    },
    0.34,
  );

  timeline.to(
    rules,
    {
      scaleX: 1,
      opacity: 0.92,
      duration: 0.08,
    },
    0.34,
  );

  timeline.to(frameWords, { autoAlpha: 0, duration: 0.04 }, 0.4);
  timeline.to(buildWords, { autoAlpha: 1, duration: 0.04 }, 0.4);

  slices.forEach((slice, index) => {
    timeline.to(
      slice,
      {
        xPercent: buildFrom[index],
        duration: 0.04,
      },
      0.42,
    );
    timeline.to(
      slice,
      {
        xPercent: 0,
        x: 0,
        duration: 0.1,
      },
      0.46,
    );
  });

  timeline.to(
    rules,
    {
      scaleX: 0.84,
      opacity: 0.42,
      duration: 0.1,
    },
    0.46,
  );

  timeline.to(
    buildSupport,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.06,
    },
    0.52,
  );

  timeline.to({}, { duration: 0.2 }, 0.52);

  slices.forEach((slice, index) => {
    timeline.to(
      slice,
      {
        xPercent: apartB[index],
        duration: 0.08,
      },
      0.72,
    );
  });

  timeline.to(
    buildSupport,
    {
      autoAlpha: 0,
      y: -10,
      duration: 0.06,
    },
    0.72,
  );

  timeline.to(
    rules,
    {
      scaleX: 1,
      opacity: 0.92,
      duration: 0.08,
    },
    0.72,
  );

  timeline.to(buildWords, { autoAlpha: 0, duration: 0.04 }, 0.78);
  timeline.to(shipWords, { autoAlpha: 1, duration: 0.04 }, 0.78);

  slices.forEach((slice, index) => {
    timeline.to(
      slice,
      {
        xPercent: shipFrom[index],
        duration: 0.04,
      },
      0.8,
    );
    timeline.to(
      slice,
      {
        xPercent: 0,
        x: 0,
        duration: 0.08,
      },
      0.84,
    );
  });

  timeline.to(
    rules,
    {
      scaleX: 0.8,
      opacity: 0.36,
      duration: 0.08,
    },
    0.84,
  );

  timeline.to(
    shipSupport,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.06,
    },
    0.86,
  );

  timeline.to({}, { duration: 0.14 }, 0.86);

  ScrollTrigger.refresh();

  return () => {
    window.clearTimeout(snapTimer);
    timeline.scrollTrigger?.kill();
    timeline.kill();
    killProcessTrigger();
  };
}

export function playProcessScene(scope: HTMLElement): gsap.Context {
  return createSceneContext(scope, () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      settleProcessScene(scope);
      return;
    }

    return buildProcessTimeline(scope);
  });
}
