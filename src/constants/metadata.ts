import { SITE_METADATA } from "@/constants/site";

export const DEFAULT_METADATA = {
  title: SITE_METADATA.title,
  description: SITE_METADATA.description,
  url: SITE_METADATA.url,
} as const;
