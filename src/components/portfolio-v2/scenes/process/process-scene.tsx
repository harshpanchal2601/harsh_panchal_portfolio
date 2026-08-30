"use client";

import { useLayoutEffect, useRef } from "react";

import { playProcessScene } from "@/components/portfolio-v2/scenes/process/process-motion";

import "@/components/portfolio-v2/scenes/process/process-scene.css";

const ACTS = [
  {
    id: "frame",
    number: "01 / Frame",
    word: "FRAME",
    copy: "Turn ambiguity into a clear product and technical direction.",
    annotation: "Requirements / Users / Flows / Architecture",
  },
  {
    id: "build",
    number: "02 / Build",
    word: "BUILD",
    copy: "Connect interface, services, data, and integrations into one working system.",
    annotation: "UI / Services / Data / Integrations",
  },
  {
    id: "ship",
    number: "03 / Ship",
    word: "SHIP",
    copy: "Validate, deploy, observe, and improve what is running in production.",
    annotation: "Test / Deploy / Observe / Iterate",
  },
] as const;

const BANDS = [
  { id: "top", index: 0 },
  { id: "mid", index: 1 },
  { id: "bot", index: 2 },
] as const;

function GiantWordStack() {
  return (
    <div className="v2-process-slice" data-process-slice="">
      {ACTS.map((act) => (
        <div
          className="v2-process-word-fit"
          data-process-word-fit=""
          key={act.id}
        >
          <p
            aria-hidden="true"
            className="v2-process-giant"
            data-process-word={act.id}
          >
            {act.word}
          </p>
        </div>
      ))}
    </div>
  );
}

export function ProcessScene() {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const context = playProcessScene(root);
    return () => {
      context.revert();
    };
  }, []);

  return (
    <section
      aria-labelledby="v2-process-heading"
      className="v2-process"
      data-scene-header-tone="dark"
      data-v2-scene="process"
      id="process"
      ref={rootRef}
    >
      <div className="v2-process-sr-only">
        <h2 id="v2-process-heading">Process</h2>
        {ACTS.map((act) => (
          <p key={act.id}>
            {act.number}. {act.copy} {act.annotation}.
          </p>
        ))}
      </div>

      <div className="v2-process-stage">
        <p className="v2-process-kicker" data-process-kicker="">
          05 / Process
        </p>

        <div className="v2-process-bands" aria-hidden="true">
          {BANDS.map((band) => (
            <div
              className="v2-process-band"
              data-process-band={band.id}
              key={band.id}
              style={{ ["--process-band-index" as string]: band.index }}
            >
              <GiantWordStack />
            </div>
          ))}

          <span className="v2-process-rule" data-process-rule="" />
          <span className="v2-process-rule v2-process-rule--lower" data-process-rule="" />
        </div>

        <div className="v2-process-support" aria-hidden="true">
          {ACTS.map((act) => (
            <div
              className="v2-process-support-act"
              data-process-support={act.id}
              key={act.id}
            >
              <p className="v2-process-support-number">{act.number}</p>
              <p className="v2-process-support-copy">{act.copy}</p>
              <p className="v2-process-support-annotation">{act.annotation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
