import type { Metadata } from "next";

export const seoTitle = "Harsh Panchal | Full Stack Developer";

export const seoDescription =
  "Full Stack Developer building scalable web applications, cloud-ready systems, REST APIs, and production products using MERN, MEAN, Next.js, Node.js, and AWS.";

export const seoKeywords = [
  "Full Stack Developer",
  "MERN Developer",
  "MEAN Developer",
  "Next.js Developer",
  "Node.js Developer",
  "AWS Developer",
  "React Developer",
  "Angular Developer",
  "Portfolio",
] as const;

const ogImage = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Harsh Panchal | Full Stack Developer",
} as const;

export function createSeoMetadata(path: string): Metadata {
  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [...seoKeywords],
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: path,
      type: "website",
      siteName: "Harsh Panchal",
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [ogImage.url],
    },
  };
}
