import type { ProjectCaseStudy, ProjectPreview } from "@/types/project";
import { PROJECT_ROUTES } from "@/constants/routes";

export const featuredProjectPreviews = [
  {
    slug: "wikipoint-ai",
    title: "Wikipoint AI",
    href: PROJECT_ROUTES.wikipointAi,
    liveUrl: "https://wikipoint.ai",
    role: "Full Stack Engineer & AWS/DevOps",
    summary:
      "AI platform for building and managing digital presence, including websites, AI assistants, content workflows, and deployment support.",
    challenge:
      "Making a multi-part AI workflow feel reliable, fast, and manageable in production.",
    tech: [
      "MEAN Stack",
      "RAG",
      "LLM",
      "AWS Lambda",
      "EC2",
      "S3",
      "Secrets Manager",
      "CloudWatch",
    ],
    presentation: {
      surface: "#17130f",
      ink: "#f3e4d0",
      muted: "rgba(243, 228, 208, 0.72)",
      faint: "rgba(243, 228, 208, 0.58)",
      media: "#241c16",
    },
    caseStudy: {
      overview:
        "Wikipoint AI creates and maintains the channels a business needs to be visible online: a website, an AI assistant, social content, and an immersive customer experience.",
      approach:
        "Wikipoint AI centralizes business information and uses it to power generated websites, AI assistants, social content, and 3D spaces. Updating the source content updates the connected channels around it.",
      engineering: [
        { label: "Frontend", items: ["Angular"] },
        { label: "Backend", items: ["Node.js", "Express"] },
        { label: "Database", items: ["MongoDB"] },
        { label: "AI", items: ["RAG", "LLMs"] },
        {
          label: "Cloud",
          items: [
            "AWS",
            "EC2",
            "Lambda",
            "S3",
            "CloudWatch",
            "Secrets Manager",
          ],
        },
        { label: "DevOps", items: ["CI/CD", "GitHub Actions"] },
      ],
      outcome: [
        "Created an end-to-end digital presence platform for business onboarding and management.",
        "Centralized management across websites, AI assistants, social content, and immersive spaces.",
        "Established a production-ready deployment architecture across AWS and CI/CD workflows.",
      ],
      sectionNumbers: {
        overview: "01",
        challenge: "02",
        approach: "03",
        engineering: "05",
        outcome: "06",
      },
    },
  },
  {
    slug: "beige",
    title: "Beige",
    href: PROJECT_ROUTES.beige,
    liveUrl: "https://beige.app",
    role: "Full Stack Developer / Main Developer",
    summary:
      "Photography and videography booking and CRM platform with AI matchmaking, payments, and role-based dashboards.",
    challenge:
      "Bringing bookings, CRM workflows, payments, and different user roles into one product.",
    tech: [
      "Next.js",
      "Node.js",
      "SendGrid",
      "AWS",
      "Stripe",
      "EC2",
      "S3",
      "RDS",
      "MongoDB Atlas",
    ],
    presentation: {
      surface: "#e4d3bc",
      ink: "#17130f",
      muted: "rgba(23, 19, 15, 0.68)",
      faint: "rgba(23, 19, 15, 0.58)",
      media: "#f3eee7",
    },
    caseStudy: {
      overview:
        "Beige helps end users find nearby creative professionals for shoots and gives the business the internal tools needed to manage the full booking lifecycle.",
      approach:
        "Beige connects customer booking, professional matching, CRM operations, payment status, and role-based panels so each team member works from the same booking context.",
      engineering: [
        { label: "Frontend", items: ["Next.js"] },
        { label: "Backend", items: ["Node.js"] },
        { label: "Database", items: ["MongoDB Atlas", "AWS RDS"] },
        { label: "Cloud", items: ["AWS EC2", "AWS S3"] },
        { label: "Payments", items: ["Stripe"] },
        { label: "Email", items: ["SendGrid"] },
        { label: "DevOps", items: ["AWS Deployment", "CI/CD"] },
      ],
      outcome: [
        "Delivered a connected booking platform for photography and videography workflows.",
        "Created role-specific panels for sales, creatives, customers, clients, and administrators.",
        "Connected CRM activity with booking operations instead of treating them as separate systems.",
        "Integrated payments and communication into the booking lifecycle.",
        "Established a stronger production foundation for ongoing platform development.",
      ],
    },
  },
  {
    slug: "erp-system",
    title: "ERP System",
    href: PROJECT_ROUTES.erpSystem,
    liveUrl: undefined,
    role: "Junior Full Stack Developer",
    summary:
      "Inventory and operations system for electronics management, including stock workflows, reporting, and role-based access.",
    challenge:
      "Keeping inventory-heavy workflows clear, trackable, and easy to manage.",
    tech: ["React/Angular", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    presentation: {
      surface: "#c9a36a",
      ink: "#17130f",
      muted: "rgba(23, 19, 15, 0.72)",
      faint: "rgba(23, 19, 15, 0.62)",
      media: "#efe4d2",
    },
    caseStudy: {
      overview:
        "The ERP system brought inventory tracking, procurement, stock management, reporting, and access control into a single internal platform.",
      approach:
        "The platform connected inventory, purchase, vendor, sales, and reporting workflows through REST APIs, MongoDB, and role-based access controls.",
      engineering: [
        { label: "Frontend", items: ["React / Angular"] },
        { label: "Backend", items: ["Node.js", "Express.js"] },
        { label: "Database", items: ["MongoDB"] },
        { label: "Architecture", items: ["REST APIs"] },
      ],
      outcome: [
        "Centralized inventory and stock visibility for an electronics management company.",
        "Improved tracking across procurement, sales, and vendor-related operations.",
        "Gave internal users a clearer reporting and operational management workflow.",
      ],
    },
  },
  {
    slug: "hr-management-system",
    title: "HR Management System",
    href: PROJECT_ROUTES.hrManagementSystem,
    liveUrl: undefined,
    role: "Junior Full Stack Developer",
    summary:
      "Employee, attendance, and HR operations platform for internal team management.",
    challenge:
      "Making employee data, attendance, leave, permissions, and admin workflows easier to handle.",
    tech: ["React/Angular", "Node.js", "Express.js", "MongoDB", "REST APIs"],
    presentation: {
      surface: "#3a4454",
      ink: "#f3eee7",
      muted: "rgba(243, 238, 231, 0.75)",
      faint: "rgba(243, 238, 231, 0.60)",
      media: "#2c3441",
    },
    caseStudy: {
      overview:
        "The system helped bring employee records, attendance, leave, departments, recruitment, reporting, and access control into one administrative workflow.",
      approach:
        "The platform connected HR modules through REST APIs, MongoDB, and authentication workflows so internal users could manage employee operations from a single system.",
      engineering: [
        { label: "Frontend", items: ["React / Angular"] },
        { label: "Backend", items: ["Node.js", "Express.js"] },
        { label: "Database", items: ["MongoDB"] },
        { label: "Architecture", items: ["REST APIs"] },
      ],
      outcome: [
        "Centralized HR operations into a single internal platform.",
        "Reduced manual administrative work across employee and leave workflows.",
        "Improved visibility across employee data, attendance, departments, and reporting.",
      ],
    },
  },
] as const satisfies readonly ProjectPreview[];

export const primaryProjectPreviews = featuredProjectPreviews.slice(0, 2);

export const secondaryProjectPreviews = featuredProjectPreviews.slice(2);

export type V2CaseStudyProject = ProjectPreview & {
  caseStudy: ProjectCaseStudy;
};

export const v2CaseStudyProjects: readonly V2CaseStudyProject[] =
  featuredProjectPreviews;

export function getV2CaseStudyProject(
  slug: string,
): V2CaseStudyProject | undefined {
  return v2CaseStudyProjects.find((candidate) => candidate.slug === slug);
}

export function getNextV2CaseStudyProject(
  slug: string,
): V2CaseStudyProject | undefined {
  const currentIndex = v2CaseStudyProjects.findIndex(
    (project) => project.slug === slug,
  );

  return currentIndex >= 0
    ? v2CaseStudyProjects[currentIndex + 1]
    : undefined;
}

export const v2CaseStudySlugs = v2CaseStudyProjects.map(
  (project) => project.slug,
);
