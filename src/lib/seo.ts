import type { Metadata } from "next";
import { SITE_METADATA } from "@/constants/site";

export const seoTitle = SITE_METADATA.title;
export const seoDescription = SITE_METADATA.description;

export const OG_IMAGE_PATH = "/og/harsh-panchal-portfolio.jpg";
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_ALT =
  "Harsh Panchal — Full-Stack Developer & Software Engineer";

export function createSeoMetadata(path: string = "/"): Metadata {
  const canonicalUrl = `${SITE_METADATA.url}${path === "/" ? "" : path}`;
  const ogImageUrl = `${SITE_METADATA.url}${OG_IMAGE_PATH}`;

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
      locale: "en_US",
      images: [
        {
          url: ogImageUrl,
          secureUrl: ogImageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: OG_IMAGE_ALT,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      site: SITE_METADATA.twitterHandle,
      creator: SITE_METADATA.twitterHandle,
      images: [
        {
          url: ogImageUrl,
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
  };
}
