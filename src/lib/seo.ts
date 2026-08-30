import type { Metadata } from "next";
import { SITE_METADATA } from "@/constants/site";

export const seoTitle = SITE_METADATA.title;
export const seoDescription = SITE_METADATA.description;

const ogImage = {
  url: `${SITE_METADATA.url}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: "Harsh Panchal — Full-Stack Developer & Software Engineer",
} as const;

export function createSeoMetadata(path: string = "/"): Metadata {
  const canonicalUrl = `${SITE_METADATA.url}${path === "/" ? "" : path}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: canonicalUrl,
      type: "website",
      siteName: SITE_METADATA.name,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      creator: SITE_METADATA.twitterHandle,
      images: [ogImage.url],
    },
  };
}
