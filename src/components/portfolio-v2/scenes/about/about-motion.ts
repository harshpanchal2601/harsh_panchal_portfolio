import {
  gsap,
  ScrollTrigger,
} from "@/animations/gsap/register-plugins";

import { createSceneContext } from "@/components/portfolio-v2/motion/scene-context";

const WORD_MUTED = "rgba(23, 19, 15, 0.48)";
const WORD_ACCENT = "#B96143";
const WORD_INK = "#17130F";

const CLIP_TILE_HIDDEN = "inset(100% 0% 0% 0%)";
const CLIP_TILE_OPEN = "inset(0% 0% 0% 0%)";

const ABOUT_TRIGGER_ID = "v2-about-copy";

function cssPx(scope: HTMLElement, name: string, fallback: number): number {
  const parsed = Number.parseFloat(
    getComputedStyle(scope).getPropertyValue(name).trim(),
  );

  return Number.isFinite(parsed) ? parsed : fallback;
}

function killAboutTrigger(): void {
  ScrollTrigger.getById(ABOUT_TRIGGER_ID)?.kill();
}

function syncPinnedSceneRange(
  self: ScrollTrigger,
  scope: HTMLElement,
): void {
  const start = scope.getBoundingClientRect().top + window.scrollY;
  const end = start + scope.offsetHeight;

  if (self.start === start && self.end === end) {
    return;
  }

  self.setPositions(start, Math.max(end, start + 1));
}

function tileCoverScale(tile: HTMLElement, stage: HTMLElement): number {
  const tileRect = tile.getBoundingClientRect();
  const stageRect = stage.getBoundingClientRect();

  if (tileRect.width < 1 || tileRect.height < 1) {
    return 1;
  }

  const originX = tileRect.left - stageRect.left + tileRect.width / 2;
  const originY = tileRect.top - stageRect.top + tileRect.height / 2;
  const coverX = Math.max(originX, stageRect.width - originX) / (tileRect.width / 2);
  const coverY = Math.max(originY, stageRect.height - originY) / (tileRect.height / 2);

  return Math.max(coverX, coverY, 1) * 1.08;
}

function settleAbout(scope: HTMLElement): void {
  const select = gsap.utils.selector(scope);

  gsap.set(select("[data-word]"), {
    color: WORD_INK,
  });

  gsap.set(select(".v2-about-proof, .v2-about-copy"), {
    autoAlpha: 1,
    y: 0,
  });

  gsap.set(select("[data-about-tile]"), {
    clipPath: CLIP_TILE_OPEN,
    y: 0,
    scale: 1,
  });

  gsap.set(select(".v2-about-tile-inner"), {
    autoAlpha: 1,
  });

  gsap.set(select("[data-about-chip]"), {
    y: 0,
  });
}

function revealWords(
  timeline: gsap.core.Timeline,
  words: HTMLElement[],
  start: number,
  end: number,
  activeWindow = 2.6,
): void {
  const count = words.length;

  if (!count) {
    return;
  }

  const span = end - start;
  const step = span / (count + activeWindow);

  words.forEach((word, index) => {
    const at = start + index * step;
    const toAccent = step * activeWindow * 0.42;
    const toInk = step * activeWindow * 0.58;

    timeline.fromTo(
      word,
      {
        color: WORD_MUTED,
      },
      {
        color: WORD_ACCENT,
        duration: toAccent,
        ease: "none",
      },
      at,
    );

    timeline.to(
      word,
      {
        color: WORD_INK,
        duration: toInk,
        ease: "none",
      },
      at + toAccent,
    );
  });
}

function buildAboutTimeline(scope: HTMLElement): () => void {
  killAboutTrigger();

  const select = gsap.utils.selector(scope);
  const proof = select(".v2-about-proof");
  const copy = select(".v2-about-copy");
  const stage = select(".v2-about-stage")[0] as HTMLElement | undefined;
  const tile = select("[data-about-tile]")[0] as HTMLElement | undefined;
  const tileInner = select(".v2-about-tile-inner");
  const chips = gsap.utils.toArray<HTMLElement>(
    select("[data-about-chip]"),
  );
  const leadWords = gsap.utils.toArray<HTMLElement>(
    select(".v2-about-lead [data-word]"),
  );
  const fastWords = gsap.utils.toArray<HTMLElement>(
    select('.v2-about-follow [data-word-pace="fast"]'),
  );
  const restWords = gsap.utils.toArray<HTMLElement>(
    select(".v2-about-follow [data-word]:not([data-word-pace])"),
  );

  const proofEntryY = cssPx(scope, "--about-proof-entry-y", 10);
  const tileEntryY = cssPx(scope, "--about-tile-entry-y", 28);

  gsap.set([...leadWords, ...fastWords, ...restWords], {
    color: WORD_MUTED,
  });

  gsap.set(proof, {
    autoAlpha: 0.28,
    y: proofEntryY,
  });

  gsap.set(copy, {
    autoAlpha: 1,
  });

  if (tile) {
    gsap.set(tile, {
      clipPath: CLIP_TILE_HIDDEN,
      y: tileEntryY,
      scale: 1,
    });
  }

  gsap.set(tileInner, {
    autoAlpha: 1,
  });

  gsap.set(chips, {
    y: 0,
  });

  const timeline = gsap.timeline({
    defaults: {
      ease: "none",
    },
    scrollTrigger: {
      id: ABOUT_TRIGGER_ID,
      trigger: scope,
      start: "top top",
      end: "bottom bottom",
      pin: false,
      scrub: true,
      invalidateOnRefresh: true,
      onRefresh(self) {
        syncPinnedSceneRange(self, scope);
      },
    },
  });

  timeline.to(
    proof,
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.1,
    },
    0,
  );

  revealWords(timeline, leadWords, 0.03, 0.36, 2.8);

  revealWords(timeline, fastWords, 0.37, 0.43, 1.15);

  revealWords(timeline, restWords, 0.41, 0.52, 2.4);

  if (tile) {
    timeline.to(
      tile,
      {
        clipPath: CLIP_TILE_OPEN,
        y: 0,
        duration: 0.1,
      },
      0.46,
    );
  }

  chips.forEach((chip, index) => {
    timeline.to(
      chip,
      {
        y: index === 1 ? 5 : -6,
        duration: 0.08,
      },
      0.48,
    );
  });

  timeline.set(
    proof,
    {
      autoAlpha: 1,
      y: 0,
    },
    0.56,
  );

  timeline.set(
    [...leadWords, ...fastWords, ...restWords],
    {
      color: WORD_INK,
    },
    0.56,
  );

  if (tile) {
    timeline.set(
      tile,
      {
        clipPath: CLIP_TILE_OPEN,
        y: 0,
        scale: 1,
      },
      0.56,
    );
  }

  timeline.to(
    proof,
    {
      autoAlpha: 0.16,
      duration: 0.06,
    },
    0.62,
  );

  timeline.to(
    copy,
    {
      autoAlpha: 0.12,
      duration: 0.06,
    },
    0.62,
  );

  timeline.to(
    tileInner,
    {
      autoAlpha: 0,
      duration: 0.04,
    },
    0.68,
  );

  if (tile && stage) {
    timeline.to(
      tile,
      {
        scale: () => tileCoverScale(tile, stage),
        duration: 0.28,
      },
      0.72,
    );
  }

  return () => {
    timeline.scrollTrigger?.kill();
    timeline.kill();
    killAboutTrigger();
  };
}

export function playAboutScene(
  scope: HTMLElement,
): gsap.Context {
  return createSceneContext(scope, () => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reducedMotion) {
      settleAbout(scope);
      return;
    }

    return buildAboutTimeline(scope);
  });
}
