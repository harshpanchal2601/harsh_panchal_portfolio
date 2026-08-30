import {
  gsap,
  ScrollTrigger,
} from "@/animations/gsap/register-plugins";

import { createSceneContext } from "@/components/portfolio-v2/motion/scene-context";
import { scrollV2To } from "@/animations/gsap/scroll-runtime";

const CAPABILITIES_TRIGGER_ID = "v2-capabilities-master";

const COLOR_TEXT = "#F3E4D0";
const COLOR_ACCENT = "#B96143";
const COLOR_INACTIVE = "rgba(243, 228, 208, 0.45)";
const COLOR_COMPLETED = "rgba(243, 228, 208, 0.65)";
const COLOR_FAINT = "rgba(243, 228, 208, 0.55)";
const COLOR_MUTED = "rgba(243, 228, 208, 0.68)";
const COLOR_LINE = "rgba(243, 228, 208, 0.14)";
const COLOR_LINE_ACTIVE = "rgba(243, 228, 208, 0.32)";

const CAPABILITY_STATES = [
  { id: "cap:frontend", at: 0.08 },
  { id: "cap:backend", at: 0.26 },
  { id: "cap:product", at: 0.44 },
  { id: "cap:cloud", at: 0.62 },
  { id: "cap:ai", at: 0.8 },
] as const;

const STATE_MORPH = 0.1;
const LABEL_FADE = STATE_MORPH * 0.3;
const ROW_TWEEN = 0.045;

function killCapabilitiesTrigger(): void {
  ScrollTrigger.getById(CAPABILITIES_TRIGGER_ID)?.kill();
}

function readCoordinate(
  scope: HTMLElement,
  stateIndex: number,
  nodeIndex: number,
  axis: "x" | "y",
): number {
  const value = getComputedStyle(scope).getPropertyValue(
    `--cap-s${stateIndex}-n${nodeIndex}-${axis}`,
  );

  return Number.parseFloat(value) || 50;
}

function rowParts(row: HTMLElement) {
  return {
    number: row.querySelector(".v2-cap-row-number"),
    title: row.querySelector(".v2-cap-row-title"),
    description: row.querySelector(".v2-cap-row-description"),
    technologies: row.querySelector(".v2-cap-row-technologies"),
  };
}

function applyRowLook(
  row: HTMLElement,
  look: "inactive" | "active" | "completed",
): void {
  const parts = rowParts(row);

  if (look === "active") {
    gsap.set(parts.number, { color: COLOR_ACCENT });
    gsap.set(parts.title, { color: COLOR_TEXT });
    gsap.set(parts.description, { color: COLOR_TEXT, opacity: 0.82 });
    gsap.set(parts.technologies, { color: COLOR_MUTED, opacity: 1 });
    return;
  }

  if (look === "completed") {
    gsap.set(parts.number, { color: COLOR_COMPLETED });
    gsap.set(parts.title, { color: COLOR_COMPLETED });
    gsap.set(parts.description, { color: COLOR_MUTED, opacity: 0.65 });
    gsap.set(parts.technologies, { color: COLOR_FAINT, opacity: 0.8 });
    return;
  }

  gsap.set(parts.number, { color: COLOR_FAINT });
  gsap.set(parts.title, { color: COLOR_INACTIVE });
  gsap.set(parts.description, { color: COLOR_MUTED, opacity: 0.35 });
  gsap.set(parts.technologies, { color: COLOR_FAINT, opacity: 0.45 });
}

function setCapabilityState(
  scope: HTMLElement,
  stateIndex: number,
): void {
  const select = gsap.utils.selector(scope);
  const system = select("[data-cap-system]")[0] as HTMLElement | undefined;
  const nodes = gsap.utils.toArray<HTMLElement>(select("[data-cap-node]"));
  const connectors = gsap.utils.toArray<SVGLineElement>(
    select("[data-cap-connector]"),
  );
  const rows = gsap.utils.toArray<HTMLElement>(select("[data-cap-row]"));

  if (!system) {
    return;
  }

  const systemWidth = system.clientWidth;
  const systemHeight = system.clientHeight;

  rows.forEach((row, index) => {
    applyRowLook(
      row,
      index === stateIndex
        ? "active"
        : index < stateIndex
          ? "completed"
          : "inactive",
    );
  });

  nodes.forEach((node, nodeIndex) => {
    const xPct = readCoordinate(scope, stateIndex, nodeIndex, "x");
    const yPct = readCoordinate(scope, stateIndex, nodeIndex, "y");
    gsap.set(node, {
      x: ((xPct - 50) / 100) * systemWidth,
      y: ((yPct - 50) / 100) * systemHeight,
    });
  });

  connectors.forEach((connector, nodeIndex) => {
    gsap.set(connector, {
      attr: {
        x2: readCoordinate(scope, stateIndex, nodeIndex, "x"),
        y2: readCoordinate(scope, stateIndex, nodeIndex, "y"),
      },
      stroke:
        stateIndex === 4 && nodeIndex === 3 ? COLOR_ACCENT : COLOR_LINE_ACTIVE,
    });
  });

  gsap.set(select("[data-cap-node-label], [data-cap-core-label]"), {
    autoAlpha: 0,
  });

  gsap.set(
    select(
      `[data-cap-node-label="${stateIndex}"], [data-cap-core-label="${stateIndex}"]`,
    ),
    {
      autoAlpha: 1,
    },
  );
}

function settleCapabilities(scope: HTMLElement): void {
  const select = gsap.utils.selector(scope);

  gsap.set(select("[data-cap-chapter-kicker], [data-cap-chapter-line]"), {
    autoAlpha: 1,
    yPercent: 0,
  });

  gsap.set(select("[data-cap-workspace]"), {
    autoAlpha: 1,
  });

  setCapabilityState(scope, 4);
}

function tweenRow(
  timeline: gsap.core.Timeline,
  row: HTMLElement | undefined,
  look: "active" | "completed",
  at: number,
): void {
  if (!row) {
    return;
  }

  const parts = rowParts(row);

  if (look === "active") {
    timeline.to(parts.number, { color: COLOR_ACCENT, duration: ROW_TWEEN }, at);
    timeline.to(parts.title, { color: COLOR_TEXT, duration: ROW_TWEEN }, at);
    timeline.to(
      parts.description,
      { color: COLOR_TEXT, opacity: 0.82, duration: ROW_TWEEN },
      at,
    );
    timeline.to(
      parts.technologies,
      { color: COLOR_MUTED, opacity: 1, duration: ROW_TWEEN },
      at,
    );
    return;
  }

  timeline.to(parts.number, { color: COLOR_COMPLETED, duration: ROW_TWEEN }, at);
  timeline.to(parts.title, { color: COLOR_COMPLETED, duration: ROW_TWEEN }, at);
  timeline.to(
    parts.description,
    { color: COLOR_MUTED, opacity: 0.65, duration: ROW_TWEEN },
    at,
  );
  timeline.to(
    parts.technologies,
    { color: COLOR_FAINT, opacity: 0.8, duration: ROW_TWEEN },
    at,
  );
}

function buildCapabilitiesTimeline(scope: HTMLElement): () => void {
  killCapabilitiesTrigger();

  const select = gsap.utils.selector(scope);
  const chapter = select(".v2-cap-chapter");
  const chapterKicker = select("[data-cap-chapter-kicker]");
  const chapterLines = select("[data-cap-chapter-line]");
  const workspace = select("[data-cap-workspace]");
  const system = select("[data-cap-system]")[0] as HTMLElement | undefined;
  const rows = gsap.utils.toArray<HTMLElement>(select("[data-cap-row]"));
  const nodes = gsap.utils.toArray<HTMLElement>(select("[data-cap-node]"));
  const connectors = gsap.utils.toArray<SVGLineElement>(
    select("[data-cap-connector]"),
  );

  if (!system) {
    settleCapabilities(scope);
    return () => {};
  }

  let systemWidth = system.clientWidth;
  let systemHeight = system.clientHeight;

  const cachedCoords: Array<Array<{ x: number; y: number }>> = CAPABILITY_STATES.map(
    (_, sIdx) =>
      [0, 1, 2, 3].map((nIdx) => ({
        x: readCoordinate(scope, sIdx, nIdx, "x"),
        y: readCoordinate(scope, sIdx, nIdx, "y"),
      })),
  );

  gsap.set(chapterKicker, {
    autoAlpha: 0,
    yPercent: 120,
  });

  gsap.set(chapterLines, {
    autoAlpha: 0,
    yPercent: 120,
  });

  gsap.set(chapter, {
    xPercent: 0,
    yPercent: 0,
    scale: 1,
  });

  gsap.set(workspace, {
    autoAlpha: 0,
  });

  rows.forEach((row) => {
    applyRowLook(row, "inactive");
  });

  gsap.set(connectors, {
    stroke: COLOR_LINE,
  });

  gsap.set(select("[data-cap-node-label], [data-cap-core-label]"), {
    autoAlpha: 0,
  });

  nodes.forEach((node, nodeIndex) => {
    const coord = cachedCoords[0][nodeIndex];
    gsap.set(node, {
      x: ((coord.x - 50) / 100) * systemWidth,
      y: ((coord.y - 50) / 100) * systemHeight,
    });
  });

  connectors.forEach((connector, nodeIndex) => {
    const coord = cachedCoords[0][nodeIndex];
    gsap.set(connector, {
      attr: {
        x2: coord.x,
        y2: coord.y,
      },
    });
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      id: CAPABILITIES_TRIGGER_ID,
      trigger: scope,
      start: "top top",
      end: "bottom bottom",
      pin: false,
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh(self) {
        systemWidth = system.clientWidth;
        systemHeight = system.clientHeight;

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
    chapterKicker,
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.03,
    },
    0,
  );

  timeline.to(
    chapterLines,
    {
      autoAlpha: 1,
      yPercent: 0,
      duration: 0.04,
      stagger: 0.012,
    },
    0.018,
  );

  timeline.to(
    chapter,
    {
      xPercent: 1.5,
      yPercent: -3,
      scale: 0.34,
      duration: 0.05,
    },
    0.068,
  );

  timeline.to(
    workspace,
    {
      autoAlpha: 1,
      duration: 0.055,
    },
    CAPABILITY_STATES[0].at,
  );

  CAPABILITY_STATES.forEach((state, stateIndex) => {
    const at = state.at;
    const previous = CAPABILITY_STATES[stateIndex - 1];

    timeline.addLabel(state.id, at);

    tweenRow(timeline, rows[stateIndex - 1], "completed", at);
    tweenRow(timeline, rows[stateIndex], "active", at);

    if (previous) {
      timeline.to(
        select(
          `[data-cap-node-label="${stateIndex - 1}"], [data-cap-core-label="${stateIndex - 1}"]`,
        ),
        {
          autoAlpha: 0,
          duration: LABEL_FADE,
        },
        at,
      );
    }

    nodes.forEach((node, nodeIndex) => {
      const coord = cachedCoords[stateIndex][nodeIndex];
      timeline.to(
        node,
        {
          x: () => ((coord.x - 50) / 100) * systemWidth,
          y: () => ((coord.y - 50) / 100) * systemHeight,
          duration: STATE_MORPH,
        },
        at,
      );
    });

    connectors.forEach((connector, nodeIndex) => {
      const coord = cachedCoords[stateIndex][nodeIndex];
      timeline.to(
        connector,
        {
          attr: {
            x2: coord.x,
            y2: coord.y,
          },
          stroke:
            stateIndex === 4 && nodeIndex === 3
              ? COLOR_ACCENT
              : COLOR_LINE_ACTIVE,
          duration: STATE_MORPH,
        },
        at,
      );
    });

    timeline.to(
      select(
        `[data-cap-node-label="${stateIndex}"], [data-cap-core-label="${stateIndex}"]`,
      ),
      {
        autoAlpha: 1,
        duration: LABEL_FADE,
      },
      stateIndex === 0 ? at : at + STATE_MORPH - LABEL_FADE,
    );
  });

  timeline.to(
    {},
    {
      duration: 0.1,
    },
    0.9,
  );

  const removeCapabilityInteractions = gsap.utils
    .toArray<HTMLButtonElement>(select("[data-cap-select]"))
    .map((button) => {
      const stateIndex = Number.parseInt(button.dataset.capSelect ?? "", 10);

      const onClick = () => {
        const trigger = timeline.scrollTrigger;
        const state = CAPABILITY_STATES[stateIndex];

        if (!trigger || !state) {
          return;
        }

        const targetProgress = Math.min(0.9, state.at + STATE_MORPH);
        const targetScroll =
          trigger.start + (trigger.end - trigger.start) * targetProgress;

        button.blur();
        scrollV2To(targetScroll);
      };

      const onMouseDown = (event: MouseEvent) => {
        event.preventDefault();
      };

      button.addEventListener("mousedown", onMouseDown);
      button.addEventListener("click", onClick);

      return () => {
        button.removeEventListener("mousedown", onMouseDown);
        button.removeEventListener("click", onClick);
      };
    });

  ScrollTrigger.refresh();

  return () => {
    removeCapabilityInteractions.forEach((removeInteraction) => {
      removeInteraction();
    });
    timeline.scrollTrigger?.kill();
    timeline.kill();
    killCapabilitiesTrigger();
  };
}

export function playCapabilitiesScene(scope: HTMLElement): gsap.Context {
  return createSceneContext(scope, () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      settleCapabilities(scope);
      return;
    }

    return buildCapabilitiesTimeline(scope);
  });
}
