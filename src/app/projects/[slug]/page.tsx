import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectCaseStudy } from "@/components/portfolio-v2/project-detail/project-case-study";
import { ProjectJsonLd } from "@/components/seo/structured-data";
import { SITE_METADATA } from "@/constants/site";
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

  const title = `${project.title} Case Study — Harsh Panchal`;
  const description = `${project.summary} Built with ${project.tech.slice(0, 4).join(" / ")} by ${SITE_METADATA.name}.`;
  const canonicalUrl = `${SITE_METADATA.url}/projects/${project.slug}`;
  const ogImageUrl = `${SITE_METADATA.url}/projects/${project.slug}/opengraph-image`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: SITE_METADATA.name,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${project.title} Case Study — Harsh Panchal`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: SITE_METADATA.twitterHandle,
      images: [ogImageUrl],
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
    <>
      <ProjectJsonLd project={project} />
      <ProjectCaseStudy
        key={project.slug}
        nextProject={nextProject}
        project={project}
        projectNumber={projectNumber}
      />
    </>
  );
}
