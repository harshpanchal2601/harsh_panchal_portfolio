export type ProjectPreview = {
  slug: string;
  title: string;
  role: string;
  summary: string;
  challenge: string;
  tech: readonly string[];
  href: string;
  liveUrl?: string;
};
