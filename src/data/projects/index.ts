import type { ProjectPreview } from "@/types/project";
import { PROJECT_ROUTES } from "@/constants/routes";

export const featuredProjectPreviews = [
  {
    slug: "wikipoint-ai",
    title: "Wikipoint AI",
    href: PROJECT_ROUTES.wikipointAi,
    liveUrl: "https://wikipoint.ai",
    role: "Full Stack Engineer & AWS/DevOps",
    summary:
      "An AI platform that builds and manages complete digital presence in around 90 seconds, including dynamic websites, AI assistants, social content, and immersive 3D spaces.",
    challenge:
      "Turning a complex multi-product AI workflow into fast, reliable infrastructure that can generate, deploy, and manage digital presence at speed.",
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
  },
  {
    slug: "beige",
    title: "Beige",
    href: PROJECT_ROUTES.beige,
    liveUrl: "https://beige.app",
    role: "Full Stack Developer / Main Developer",
    summary:
      "A photography and videography booking platform for Beige Studio with AI matchmaking, CRM workflows, end-to-end payments, and multiple role-based panels for sales, CPs, users, clients, admins, and super admins.",
    challenge:
      "Unifying booking, operations, CRM workflows, payments, and role-based access into one polished product experience.",
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
  },
  {
    slug: "erp-system",
    title: "ERP System",
    href: PROJECT_ROUTES.erpSystem,
    liveUrl: undefined,
    role: "Junior Full Stack Developer",
    summary:
      "An enterprise ERP system for electronics inventory and operations management, covering stock tracking, product workflows, reporting, and role-based access.",
    challenge:
      "Supporting inventory-heavy operational workflows with clear data flow, reporting, and controlled access.",
    tech: ["React/Angular", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
  {
    slug: "hr-management-system",
    title: "HR Management System",
    href: PROJECT_ROUTES.hrManagementSystem,
    liveUrl: undefined,
    role: "Junior Full Stack Developer",
    summary:
      "An HR platform for employee lifecycle management, attendance, leave tracking, role management, and administrative workflows.",
    challenge:
      "Streamlining internal HR operations while keeping employee data, permissions, and admin workflows manageable.",
    tech: ["React/Angular", "Node.js", "Express.js", "MongoDB", "REST APIs"],
  },
] as const satisfies readonly ProjectPreview[];

export const primaryProjectPreviews = featuredProjectPreviews.slice(0, 2);

export const secondaryProjectPreviews = featuredProjectPreviews.slice(2);
