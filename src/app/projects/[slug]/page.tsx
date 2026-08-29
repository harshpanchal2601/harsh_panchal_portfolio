import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/portfolio-v2/project-detail/project-case-study";
import {
  featuredProjectPreviews,
  getNextV2CaseStudyProject,
  getV2CaseStudyProject,
  v2CaseStudySlugs,
} from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return v2CaseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getV2CaseStudyProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Harsh Panchal",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${project.title} | Harsh Panchal`,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Harsh Panchal`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getV2CaseStudyProject(slug);

  if (!project) {
    notFound();
  }

  const projectNumber =
    featuredProjectPreviews.findIndex((candidate) => candidate.slug === slug) + 1;
  const nextProject = getNextV2CaseStudyProject(slug);

  return (
    <ProjectCaseStudy
      key={project.slug}
      nextProject={nextProject}
      project={project}
      projectNumber={projectNumber}
    />
  );
}
