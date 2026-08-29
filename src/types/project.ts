export type ProjectPresentation = {
  surface: string;
  ink: string;
  muted: string;
  faint: string;
  media: string;
};

export type ProjectEngineeringGroup = {
  label: string;
  items: readonly string[];
};

export type ProjectCaseStudySectionId =
  | "overview"
  | "challenge"
  | "approach"
  | "engineering"
  | "outcome";

export type ProjectCaseStudy = {
  overview?: string;
  approach?: string;
  engineering?: readonly ProjectEngineeringGroup[];
  outcome?: readonly string[];
  sectionNumbers?: Partial<Record<ProjectCaseStudySectionId, string>>;
};

export type ProjectPreview = {
  slug: string;
  title: string;
  role: string;
  summary: string;
  challenge?: string;
  tech: readonly string[];
  href: string;
  liveUrl?: string;
  presentation: ProjectPresentation;
  caseStudy?: ProjectCaseStudy;
};
