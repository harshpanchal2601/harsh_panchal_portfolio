import { PROJECT_ROUTES } from "@/constants/routes";
import type { ProjectPreview } from "@/types/project";

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
      "MEAN Stack", "RAG", "LLM", "AWS Lambda", "EC2", "S3",
      "Secrets Manager", "CloudWatch",
    ],
    presentation: {
      surface: "#17130f", ink: "#f3e4d0",
      muted: "rgba(243, 228, 208, 0.72)",
      faint: "rgba(243, 228, 208, 0.58)", media: "#241c16",
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
      "Next.js", "Node.js", "SendGrid", "AWS", "Stripe", "EC2", "S3",
      "RDS", "MongoDB Atlas",
    ],
    presentation: {
      surface: "#e4d3bc", ink: "#17130f",
      muted: "rgba(23, 19, 15, 0.68)",
      faint: "rgba(23, 19, 15, 0.58)", media: "#f3eee7",
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
      surface: "#c9a36a", ink: "#17130f",
      muted: "rgba(23, 19, 15, 0.72)",
      faint: "rgba(23, 19, 15, 0.62)", media: "#efe4d2",
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
      surface: "#3a4454", ink: "#f3eee7",
      muted: "rgba(243, 238, 231, 0.75)",
      faint: "rgba(243, 238, 231, 0.60)", media: "#2c3441",
    },
  },
] as const satisfies readonly ProjectPreview[];

export const primaryProjectPreviews = featuredProjectPreviews.slice(0, 2);
export const secondaryProjectPreviews = featuredProjectPreviews.slice(2);
