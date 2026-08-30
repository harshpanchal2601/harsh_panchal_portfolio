"use client";

import {
  type MouseEvent,
  useId,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  clearV2WorkReturnIntent,
  pauseV2Scroll,
  readV2WorkReturnIntent,
  V2_HERO_READY_EVENT,
  V2_WORK_READY_EVENT,
} from "@/animations/gsap/scroll-runtime";
import { gsap } from "@/animations/gsap/register-plugins";
import { featuredProjectPreviews } from "@/data/projects/previews";
import { bindNearViewportActivation } from "@/components/portfolio-v2/motion/near-viewport-motion";

import "@/components/portfolio-v2/scenes/work/work-scene.css";

/* ── Copy ────────────────────────────────────────────────── */

const ENTRY_KINETIC_COPY =
  "SYSTEMS ARE IDEAS UNTIL THEY SHIP. HERE'S THE PROOF.";

const EXIT_KINETIC_COPY =
  "THE RESULT IS VISIBLE. THE PROCESS IS WHAT MAKES IT REPEATABLE.";

/* ── Project data ────────────────────────────────────────── */

const WORK_PROJECTS = featuredProjectPreviews;
type WorkProject = (typeof WORK_PROJECTS)[number];

let workMotionPromise:
  | Promise<typeof import("@/components/portfolio-v2/scenes/work/work-motion")>
  | undefined;

function preloadWorkMotion() {
  workMotionPromise ??= import(
    "@/components/portfolio-v2/scenes/work/work-motion"
  );
  return workMotionPromise;
}

function formatProjectNumber(index: number): string {
  return `(${String(index + 1).padStart(2, "0")})`;
}

/* ── Project media (iframe embed with fallback) ──────────── */

function ProjectMedia({
  previewEnabled,
  project,
}: {
  previewEnabled: boolean;
  project: (typeof WORK_PROJECTS)[number];
}) {
  if (project.liveUrl) {
    return (
      <figure className="v2-work-media" data-work-media="">
        {previewEnabled ? (
          <iframe
            className="v2-work-media-frame"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
            src={project.liveUrl}
            tabIndex={-1}
            title={`${project.title} live product`}
          />
        ) : null}
      </figure>
    );
  }

  return (
    <figure className="v2-work-media" data-work-media="">
      <p className="v2-work-media-title">{project.title}</p>
      <p className="v2-work-media-tech">{project.tech.slice(0, 4).join(" / ")}</p>
    </figure>
  );
}

/* ── Project panel ───────────────────────────────────────── */

function ProjectPanel({
  project,
  index,
  onOpen,
  previewEnabled,
}: {
  project: WorkProject;
  index: number;
  onOpen: (
    event: MouseEvent<HTMLAnchorElement>,
    project: WorkProject,
    index: number,
  ) => void;
  previewEnabled: boolean;
}) {
  const presentation = project.presentation;

  return (
    <article
      className="v2-work-panel"
      data-scene-header-tone={presentation.ink === "#17130f" ? "dark" : "light"}
      data-work-panel=""
      data-work-project={project.slug}
      style={{
        zIndex: 10 + index,
        background: presentation.surface,
        color: presentation.ink,
        ["--work-panel-muted" as string]: presentation.muted,
        ["--work-panel-faint" as string]: presentation.faint,
        ["--work-panel-media" as string]: presentation.media,
      }}
    >
      <header className="v2-work-panel-head">
        <h3 className="v2-work-panel-title">{project.title}</h3>
        <p className="v2-work-panel-number">{formatProjectNumber(index)}</p>
        <Link
          aria-label={`View ${project.title} case study`}
          className="v2-work-panel-link"
          href={`/projects/${project.slug}`}
          onClick={(event) => onOpen(event, project, index)}
        >
          <span>View Case Study</span>
          <span aria-hidden="true" className="v2-work-panel-link-arrow">
            ↗
          </span>
        </Link>
      </header>

      <div className="v2-work-panel-body">
        <div className="v2-work-panel-copy">
          <p className="v2-work-panel-summary">{project.summary}</p>
          <p className="v2-work-panel-meta">{project.role}</p>
          <p className="v2-work-panel-tech">
            {project.tech.slice(0, 5).join(" / ")}
          </p>
        </div>

        <ProjectMedia previewEnabled={previewEnabled} project={project} />
      </div>
    </article>
  );
}

/* ── Work Scene ──────────────────────────────────────────── */

export function WorkScene() {
  const router = useRouter();
  const rootRef = useRef<HTMLElement>(null);
  const transitioningRef = useRef(false);
  const [previewsEnabled, setPreviewsEnabled] = useState(false);
  const entryPathId = `v2-work-arc${useId().replace(/:/g, "")}`;
  const exitPathId = `v2-work-exit-arc${useId().replace(/:/g, "")}`;

  useEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    let returnSlug = readV2WorkReturnIntent();
    let scrollToProject:
      | typeof import("@/components/portfolio-v2/scenes/work/work-motion")["scrollToWorkProject"]
      | undefined;
    let revertMotion: (() => void) | undefined;
    let cancelled = false;
    let heroReady = Boolean(
      document.querySelector('[data-hero-state="ready"]'),
    );
    let workReady = false;

    const restoreProject = () => {
      if (!returnSlug || !heroReady || !workReady) {
        return;
      }

      if (scrollToProject?.(root, returnSlug, { immediate: true })) {
        clearV2WorkReturnIntent();
        returnSlug = null;
      }
    };

    const onHeroReady = () => {
      heroReady = true;
      restoreProject();
    };

    const onWorkReady = () => {
      workReady = true;
      restoreProject();
    };

    window.addEventListener(V2_HERO_READY_EVENT, onHeroReady);
    window.addEventListener(V2_WORK_READY_EVENT, onWorkReady);

    const unbindActivation = bindNearViewportActivation(
      root,
      "work",
      preloadWorkMotion,
      () => {
        setPreviewsEnabled(true);
        void preloadWorkMotion().then((motion) => {
          if (cancelled) {
            return;
          }

          scrollToProject = motion.scrollToWorkProject;
          const context = motion.playWorkScene(root);
          revertMotion = () => context.revert();
        });
      },
      Boolean(returnSlug),
    );

    return () => {
      cancelled = true;
      unbindActivation();
      window.removeEventListener(V2_HERO_READY_EVENT, onHeroReady);
      window.removeEventListener(V2_WORK_READY_EVENT, onWorkReady);
      revertMotion?.();
    };
  }, []);

  const openProject = (
    event: MouseEvent<HTMLAnchorElement>,
    project: WorkProject,
    projectIndex: number,
  ) => {
    const href = `/projects/${project.slug}`;

    if (transitioningRef.current) {
      event.preventDefault();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      event.preventDefault();
      router.push(href);
      return;
    }

    const panel = event.currentTarget.closest<HTMLElement>("[data-work-panel]");
    const media = panel?.querySelector<HTMLElement>("[data-work-media]");

    if (!panel || !media) {
      return;
    }

    event.preventDefault();
    transitioningRef.current = true;
    pauseV2Scroll();

    const panelRect = panel.getBoundingClientRect();
    const mediaRect = media.getBoundingClientRect();
    const overlay = document.createElement("div");
    const title = document.createElement("p");
    const number = document.createElement("p");
    const mediaClone = media.cloneNode(true) as HTMLElement;
    const targetMediaWidth = window.innerWidth * 0.9;
    const targetMediaX = window.innerWidth * 0.05;
    const targetMediaY = Math.max(180, window.innerHeight * 0.31);
    const mediaScale = targetMediaWidth / Math.max(mediaRect.width, 1);

    overlay.id = "v2-project-transition";
    overlay.className = "v2-project-transition";
    overlay.dataset.projectSlug = project.slug;
    overlay.setAttribute("aria-hidden", "true");
    overlay.style.setProperty("--transition-surface", project.presentation.surface);
    overlay.style.setProperty("--transition-ink", project.presentation.ink);

    title.className = "v2-project-transition-title";
    title.textContent = project.title;
    number.className = "v2-project-transition-number";
    number.textContent = formatProjectNumber(projectIndex);
    mediaClone.classList.add("v2-project-transition-media");
    mediaClone.querySelectorAll<HTMLElement>("a, button, input, iframe").forEach(
      (element) => {
        element.tabIndex = -1;
      },
    );

    overlay.append(title, number, mediaClone);
    document.body.append(overlay);

    gsap.set(overlay, {
      clipPath: `inset(${panelRect.top}px ${window.innerWidth - panelRect.right}px ${window.innerHeight - panelRect.bottom}px ${panelRect.left}px)`,
    });
    gsap.set(title, {
      left: panelRect.left + 42,
      top: panelRect.top + 34,
    });
    gsap.set(number, {
      right: window.innerWidth - panelRect.right + 42,
      top: panelRect.top + 34,
    });
    gsap.set(mediaClone, {
      height: mediaRect.height,
      left: mediaRect.left,
      top: mediaRect.top,
      width: mediaRect.width,
    });

    gsap
      .timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => router.push(href),
      })
      .to([title, number], { autoAlpha: 0, duration: 0.28, y: -10 }, 0)
      .to(overlay, { clipPath: "inset(0px 0px 0px 0px)", duration: 0.72 }, 0.05)
      .to(
        mediaClone,
        {
          duration: 0.68,
          scale: mediaScale,
          transformOrigin: "0 0",
          x: targetMediaX - mediaRect.left,
          y: targetMediaY - mediaRect.top,
        },
        0.08,
      );
  };

  return (
    <section
      aria-labelledby="v2-work-heading"
      className="v2-work"
      data-scene-header-tone="dark"
      data-v2-scene="work"
      id="work"
      ref={rootRef}
    >
      <h2 className="v2-work-sr-only" id="v2-work-heading">
        Selected Work
      </h2>
      <p className="v2-work-sr-only">{ENTRY_KINETIC_COPY}</p>
      <p className="v2-work-sr-only">{EXIT_KINETIC_COPY}</p>

      <div className="v2-work-stage">
        {/* ── Phase A: Entry kinetic typography ─────────── */}
        <div className="v2-work-kinetic" data-work-kinetic="">
          <div className="v2-work-rail" data-work-entry-rail="">
            <span>04 / Selected Work</span>
            <span aria-hidden="true" className="v2-work-rail-mark" />
            <span>Projects / Production</span>
          </div>

          <svg
            aria-hidden="true"
            className="v2-work-kinetic-svg"
            data-work-kinetic-svg=""
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1600 900"
          >
            <path
              d="M -180 790 Q 800 70 1780 790"
              fill="none"
              id={entryPathId}
            />
            <text className="v2-work-kinetic-text">
              <textPath
                data-work-text-path=""
                href={`#${entryPathId}`}
                method="align"
                startOffset="1600"
              >
                {ENTRY_KINETIC_COPY}
              </textPath>
            </text>
          </svg>
        </div>

        {/* ── Phase C: Exit kinetic typography ──────────── */}
        <div className="v2-work-exit-kinetic" data-work-exit-kinetic="">
          <div className="v2-work-exit-rail" data-work-exit-rail="">
            <span>Next Chapter</span>
            <span aria-hidden="true" className="v2-work-exit-rail-mark" />
            <span>05 / Process</span>
          </div>

          <svg
            aria-hidden="true"
            className="v2-work-exit-kinetic-svg"
            data-work-exit-kinetic-svg=""
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1600 900"
          >
            <path
              d="M -180 110 Q 800 930 1780 110"
              fill="none"
              id={exitPathId}
            />
            <text className="v2-work-exit-kinetic-text">
              <textPath
                data-work-exit-text-path=""
                href={`#${exitPathId}`}
                method="align"
                startOffset="1600"
              >
                {EXIT_KINETIC_COPY}
              </textPath>
            </text>
          </svg>
        </div>

        {/* ── Phase B: Project card deck ────────────────── */}
        <div className="v2-work-deck" data-work-deck="">
          {WORK_PROJECTS.map((project, index) => (
            <ProjectPanel
              index={index}
              key={project.slug}
              onOpen={openProject}
              previewEnabled={previewsEnabled}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
