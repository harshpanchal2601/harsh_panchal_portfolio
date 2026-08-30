"use client";

import {
  type PointerEvent,
  type ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";

import { useV2ScrollRuntime } from "@/animations/gsap/scroll-runtime";
import { playProjectCaseStudy } from "@/components/portfolio-v2/project-detail/project-case-study-motion";
import type { V2CaseStudyProject } from "@/data/projects";
import type { ProjectCaseStudySectionId } from "@/types/project";

import "@/components/portfolio-v2/foundation/portfolio-v2.css";
import "@/components/portfolio-v2/project-detail/project-case-study.css";

type ProjectCaseStudyProps = Readonly<{
  project: V2CaseStudyProject;
  projectNumber: number;
  nextProject?: Pick<V2CaseStudyProject, "slug" | "title">;
}>;

type CaseStudySection = Readonly<{
  id: ProjectCaseStudySectionId;
  index: string;
  title: string;
  content: ReactNode;
}>;

function ProjectStoryAccordion({
  sections,
}: Readonly<{ sections: readonly CaseStudySection[] }>) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const activateOnHover = (
    event: PointerEvent<HTMLButtonElement>,
    sectionId: ProjectCaseStudySectionId,
  ) => {
    if (
      event.pointerType === "mouse" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      setActiveId(sectionId);
    }
  };

  return (
    <div className="v2-project-accordion" data-project-reveal="">
      {sections.map((section) => {
        const isActive = activeId === section.id;
        const triggerId = `v2-project-${section.id}-trigger`;
        const panelId = `v2-project-${section.id}-panel`;

        return (
          <section
            className="v2-project-accordion-row"
            data-active={isActive ? "true" : "false"}
            key={section.id}
          >
            <h2 className="v2-project-accordion-heading">
              <button
                aria-controls={panelId}
                aria-expanded={isActive}
                className="v2-project-accordion-trigger"
                id={triggerId}
                onClick={() => setActiveId(section.id)}
                onPointerEnter={(event) =>
                  activateOnHover(event, section.id)
                }
                type="button"
              >
                <span className="v2-project-accordion-number">
                  {section.index}
                </span>
                <span className="v2-project-accordion-title">
                  {section.title}
                </span>
                <span
                  aria-hidden="true"
                  className="v2-project-accordion-marker"
                >
                  <span />
                  <span />
                </span>
              </button>
            </h2>

            <div
              aria-hidden={!isActive}
              aria-labelledby={triggerId}
              className="v2-project-accordion-panel"
              id={panelId}
              role="region"
            >
              <div className="v2-project-accordion-panel-inner">
                <div className="v2-project-accordion-content">
                  {section.content}
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function ProjectCaseStudy({
  project,
  projectNumber,
  nextProject,
}: ProjectCaseStudyProps) {
  const rootRef = useRef<HTMLElement>(null);

  useV2ScrollRuntime(rootRef);

  useLayoutEffect(() => {
    const root = rootRef.current;

    if (!root) {
      return;
    }

    const context = playProjectCaseStudy(root);

    return () => context.revert();
  }, []);

  const projectIndex = String(projectNumber).padStart(2, "0");
  const { caseStudy, presentation } = project;
  const allWorkHref = `/?work=${encodeURIComponent(project.slug)}#work`;
  const sections: CaseStudySection[] = [];
  const sectionNumber = (section: ProjectCaseStudySectionId) =>
    caseStudy.sectionNumbers?.[section] ??
    String(sections.length + 1).padStart(2, "0");

  if (caseStudy.overview) {
    sections.push({
      id: "overview",
      index: sectionNumber("overview"),
      title: "Overview",
      content: (
        <div className="v2-project-section-copy">
          <p>{caseStudy.overview}</p>
          <dl className="v2-project-facts">
            <div>
              <dt>Role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Built With</dt>
              <dd>{project.tech.join(" / ")}</dd>
            </div>
          </dl>
        </div>
      ),
    });
  }

  if (project.challenge) {
    sections.push({
      id: "challenge",
      index: sectionNumber("challenge"),
      title: "Challenge",
      content: (
        <div className="v2-project-section-copy">
          <p>{project.challenge}</p>
        </div>
      ),
    });
  }

  if (caseStudy.approach) {
    sections.push({
      id: "approach",
      index: sectionNumber("approach"),
      title: "Approach",
      content: (
        <div className="v2-project-section-copy">
          <p>{caseStudy.approach}</p>
        </div>
      ),
    });
  }

  if (caseStudy.engineering?.length) {
    sections.push({
      id: "engineering",
      index: sectionNumber("engineering"),
      title: "Engineering",
      content: (
        <div className="v2-project-engineering">
          {caseStudy.engineering.map((group) => (
            <div key={group.label}>
              <h3>{group.label}</h3>
              <p>{group.items.join(" / ")}</p>
            </div>
          ))}
        </div>
      ),
    });
  }

  if (caseStudy.outcome?.length) {
    sections.push({
      id: "outcome",
      index: sectionNumber("outcome"),
      title: "Outcome",
      content: (
        <ol className="v2-project-outcomes">
          {caseStudy.outcome.map((outcome) => (
            <li key={outcome}>{outcome}</li>
          ))}
        </ol>
      ),
    });
  }

  return (
    <main
      className="portfolio-v2 v2-project"
      data-portfolio-v2=""
      ref={rootRef}
      style={{
        ["--project-surface" as string]: presentation.surface,
        ["--project-ink" as string]: presentation.ink,
        ["--project-muted" as string]: presentation.muted,
        ["--project-faint" as string]: presentation.faint,
        ["--project-media" as string]: presentation.media,
      }}
    >
      <header className="v2-project-header">
        <Link className="v2-project-wordmark" href="/">
          Harsh Panchal
        </Link>
        <a className="v2-project-back" href={allWorkHref}>
          ← All Work
        </a>
      </header>

      <section className="v2-project-hero" aria-labelledby="v2-project-title">
        <p className="v2-project-eyebrow" data-project-eyebrow="">
          Project {projectIndex} / Case Study
        </p>

        <h1 id="v2-project-title" data-project-title="">
          {project.title}
        </h1>

        <p className="v2-project-summary" data-project-summary="">
          {project.summary}
        </p>

        <div className="v2-project-meta" data-project-meta="">
          <div>
            <span>Role</span>
            <p>{project.role}</p>
          </div>
          <div>
            <span>Technology</span>
            <p>{project.tech.join(" / ")}</p>
          </div>
          {project.liveUrl ? (
            <a href={project.liveUrl} rel="noopener noreferrer" target="_blank">
              Live Project ↗
            </a>
          ) : null}
        </div>

        {project.liveUrl ? (
          <figure className="v2-project-media" data-project-media="">
            <div className="v2-project-media-fallback" aria-hidden="true">
              <span>{project.title}</span>
              <span>Live product view</span>
            </div>
            <iframe
              loading="eager"
              sandbox="allow-scripts allow-same-origin"
              src={project.liveUrl}
              tabIndex={-1}
              title={`${project.title} live product preview`}
            />
          </figure>
        ) : null}
      </section>

      <div className="v2-project-story">
        <ProjectStoryAccordion key={project.slug} sections={sections} />
      </div>

      <footer className="v2-project-footer" data-project-reveal="">
        <a href={allWorkHref}>← All Work</a>
        {nextProject ? (
          <Link
            className="v2-project-next"
            href={`/projects/${nextProject.slug}`}
          >
            <span>Next Project</span>
            <strong>{nextProject.title} →</strong>
          </Link>
        ) : (
          <a className="v2-project-next" href={allWorkHref}>
            <span>View All Work</span>
            <strong>All Projects →</strong>
          </a>
        )}
      </footer>
    </main>
  );
}
