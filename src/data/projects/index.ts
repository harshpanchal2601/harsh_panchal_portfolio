import { projectCaseStudies } from "@/data/projects/case-studies";
import {
  featuredProjectPreviews,
  primaryProjectPreviews,
  secondaryProjectPreviews,
} from "@/data/projects/previews";
import type { ProjectCaseStudy, ProjectPreview } from "@/types/project";

export {
  featuredProjectPreviews,
  primaryProjectPreviews,
  secondaryProjectPreviews,
};

export type V2CaseStudyProject = ProjectPreview & {
  caseStudy: ProjectCaseStudy;
};

export const v2CaseStudyProjects: readonly V2CaseStudyProject[] =
  featuredProjectPreviews.map((project) => ({
    ...project,
    caseStudy: projectCaseStudies[project.slug],
  }));

export function getV2CaseStudyProject(
  slug: string,
): V2CaseStudyProject | undefined {
  return v2CaseStudyProjects.find((candidate) => candidate.slug === slug);
}

export function getNextV2CaseStudyProject(
  slug: string,
): V2CaseStudyProject | undefined {
  const currentIndex = v2CaseStudyProjects.findIndex(
    (project) => project.slug === slug,
  );

  return currentIndex >= 0
    ? v2CaseStudyProjects[currentIndex + 1]
    : undefined;
}

export const v2CaseStudySlugs = v2CaseStudyProjects.map(
  (project) => project.slug,
);
