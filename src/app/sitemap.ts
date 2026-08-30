import type { MetadataRoute } from "next";
import { SITE_METADATA } from "@/constants/site";
import { v2CaseStudySlugs } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectEntries = v2CaseStudySlugs.map((slug) => ({
    url: `${SITE_METADATA.url}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    {
      url: `${SITE_METADATA.url}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    ...projectEntries,
  ];
}
