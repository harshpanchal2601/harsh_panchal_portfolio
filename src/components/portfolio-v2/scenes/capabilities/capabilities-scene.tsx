"use client";

import { useRef } from "react";

import { useNearViewportMotion } from "@/components/portfolio-v2/motion/near-viewport-motion";

import "@/components/portfolio-v2/scenes/capabilities/capabilities-scene.css";

const CAPABILITIES = [
  {
    number: "01",
    title: "Frontend Engineering",
    description:
      "Responsive product interfaces built for clarity, performance, and maintainability.",
    technologies: "NEXT.JS / REACT / ANGULAR / TYPESCRIPT",
    visual: ["VIEW", "COMPONENT", "STATE", "INTERACTION"],
    core: "INTERFACE",
  },
  {
    number: "02",
    title: "Backend Systems",
    description:
      "APIs, services, data flows, authentication, and business logic designed to scale cleanly.",
    technologies: "NODE.JS / REST / MYSQL / MONGODB",
    visual: ["CLIENT", "API", "SERVICE", "DATA"],
    core: "SYSTEM",
  },
  {
    number: "03",
    title: "Product Engineering",
    description:
      "Turning product requirements into complete working systems, not isolated screens.",
    technologies: "PRODUCT FLOWS / SYSTEM DESIGN / INTEGRATIONS / DELIVERY",
    visual: ["IDEA", "FLOW", "BUILD", "SHIP"],
    core: "PRODUCT",
  },
  {
    number: "04",
    title: "Cloud & Delivery",
    description:
      "Deployment, infrastructure, CI/CD, integrations, and production readiness from build to live.",
    technologies: "AWS / CI-CD / DEPLOYMENT / PRODUCTION",
    visual: ["CODE", "BUILD", "DEPLOY", "LIVE"],
    core: "DELIVERY",
  },
  {
    number: "05",
    title: "AI Integration",
    description:
      "Practical AI features using LLMs, retrieval, automation, and product-aware workflows.",
    technologies: "LLM / RAG / RETRIEVAL / AUTOMATION",
    visual: ["USER", "CONTEXT", "MODEL", "RESPONSE"],
    core: "INTELLIGENCE",
  },
] as const;

let capabilitiesMotionPromise:
  | Promise<typeof import("@/components/portfolio-v2/scenes/capabilities/capabilities-motion")>
  | undefined;

function preloadCapabilitiesMotion() {
  capabilitiesMotionPromise ??= import(
    "@/components/portfolio-v2/scenes/capabilities/capabilities-motion"
  );
  return capabilitiesMotionPromise;
}

async function initializeCapabilitiesMotion(root: HTMLElement) {
  const { playCapabilitiesScene } = await preloadCapabilitiesMotion();
  const context = playCapabilitiesScene(root);
  return () => context.revert();
}

function CapabilityRow({
  capability,
  index,
}: {
  capability: (typeof CAPABILITIES)[number];
  index: number;
}) {
  return (
    <article className="v2-cap-row" data-cap-row={index}>
      <span aria-hidden="true" className="v2-cap-row-number">
        {capability.number}
      </span>

      <div className="v2-cap-row-body">
        <h3 className="v2-cap-row-title">{capability.title}</h3>
        <p className="v2-cap-row-description">{capability.description}</p>
        <p className="v2-cap-row-technologies">{capability.technologies}</p>
      </div>

      <button
        aria-label={`Show ${capability.title}`}
        className="v2-cap-row-hit"
        data-cap-select={index}
        type="button"
      />
    </article>
  );
}

function EngineeringSystem() {
  return (
    <div aria-hidden="true" className="v2-cap-system" data-cap-system="">
      <svg className="v2-cap-connectors" focusable="false" viewBox="0 0 100 100">
        {[0, 1, 2, 3].map((nodeIndex) => (
          <line
            data-cap-connector={nodeIndex}
            key={nodeIndex}
            x1="50"
            x2="50"
            y1="50"
            y2="50"
          />
        ))}
      </svg>

      <div className="v2-cap-core">
        {CAPABILITIES.map((capability, stateIndex) => (
          <span data-cap-core-label={stateIndex} key={capability.core}>
            {capability.core}
          </span>
        ))}
      </div>

      {[0, 1, 2, 3].map((nodeIndex) => (
        <div className="v2-cap-node" data-cap-node={nodeIndex} key={nodeIndex}>
          <span className="v2-cap-node-index">0{nodeIndex + 1}</span>

          {CAPABILITIES.map((capability, stateIndex) => (
            <span data-cap-node-label={stateIndex} key={capability.visual[nodeIndex]}>
              {capability.visual[nodeIndex]}
            </span>
          ))}
        </div>
      ))}

      <span className="v2-cap-system-axis v2-cap-system-axis--x" />
      <span className="v2-cap-system-axis v2-cap-system-axis--y" />
    </div>
  );
}

export function CapabilitiesScene() {
  const rootRef = useRef<HTMLElement>(null);

  useNearViewportMotion(
    rootRef,
    "capabilities",
    preloadCapabilitiesMotion,
    initializeCapabilitiesMotion,
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="v2-capabilities-heading"
      className="v2-capabilities"
      data-scene-header-tone="light"
      id="capabilities"
    >
      <h2 className="v2-cap-sr-only" id="v2-capabilities-heading">
        Capabilities
      </h2>

      <div className="v2-cap-stage">
        <header className="v2-cap-chapter">
          <p className="v2-cap-chapter-kicker">
            <span className="v2-cap-mask">
              <span data-cap-chapter-kicker="">03 / Capabilities</span>
            </span>
          </p>

          <p aria-hidden="true" className="v2-cap-chapter-title">
            <span className="v2-cap-mask">
              <span data-cap-chapter-line="">What</span>
            </span>
            <span className="v2-cap-mask v2-cap-mask--offset">
              <span data-cap-chapter-line="">I Build.</span>
            </span>
          </p>
        </header>

        <div className="v2-cap-workspace" data-cap-workspace="">
          <div className="v2-cap-list">
            {CAPABILITIES.map((capability, index) => (
              <CapabilityRow capability={capability} index={index} key={capability.number} />
            ))}
          </div>

          <EngineeringSystem />
        </div>
      </div>
    </section>
  );
}
