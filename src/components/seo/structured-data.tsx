import { SITE_METADATA } from "@/constants/site";
import type { V2CaseStudyProject } from "@/data/projects";

export function HomepageJsonLd() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_METADATA.name,
    jobTitle: "Full-Stack Developer & Software Engineer",
    url: SITE_METADATA.url,
    sameAs: [
      "https://github.com/harshpanchal2601",
      "https://www.linkedin.com/in/harshpanchal2601/",
    ],
    knowsAbout: [
      "Full-Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "AWS",
      "System Design",
      "AI Integration",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Harsh Panchal Portfolio",
    url: SITE_METADATA.url,
    description: SITE_METADATA.description,
    author: {
      "@type": "Person",
      name: SITE_METADATA.name,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export function ProjectJsonLd({ project }: { project: V2CaseStudyProject }) {
  const projectUrl = `${SITE_METADATA.url}/projects/${project.slug}`;

  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.summary,
    description: project.summary,
    url: projectUrl,
    creator: {
      "@type": "Person",
      name: SITE_METADATA.name,
      url: SITE_METADATA.url,
    },
    keywords: project.tech.join(", "),
  };

  const breadcrumbsSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Harsh Panchal",
        item: SITE_METADATA.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Work",
        item: `${SITE_METADATA.url}#work`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: projectUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
    </>
  );
}
