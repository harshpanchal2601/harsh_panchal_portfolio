import { featuredProjectPreviews } from "@/data/projects/previews";
import type { ProjectCaseStudy } from "@/types/project";

type ProjectSlug = (typeof featuredProjectPreviews)[number]["slug"];

export const projectCaseStudies = {
  "wikipoint-ai": {
    overview:
      "Wikipoint AI creates and maintains the channels a business needs to be visible online: a website, an AI assistant, social content, and an immersive customer experience.",
    approach:
      "Wikipoint AI centralizes business information and uses it to power generated websites, AI assistants, social content, and 3D spaces. Updating the source content updates the connected channels around it.",
    engineering: [
      { label: "Frontend", items: ["Angular"] },
      { label: "Backend", items: ["Node.js", "Express"] },
      { label: "Database", items: ["MongoDB"] },
      { label: "AI", items: ["RAG", "LLMs"] },
      { label: "Cloud", items: ["AWS", "EC2", "Lambda", "S3", "CloudWatch", "Secrets Manager"] },
      { label: "DevOps", items: ["CI/CD", "GitHub Actions"] },
    ],
    outcome: [
      "Created an end-to-end digital presence platform for business onboarding and management.",
      "Centralized management across websites, AI assistants, social content, and immersive spaces.",
      "Established a production-ready deployment architecture across AWS and CI/CD workflows.",
    ],
    sectionNumbers: {
      overview: "01", challenge: "02", approach: "03", engineering: "05", outcome: "06",
    },
  },
  beige: {
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
  "erp-system": {
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
  "hr-management-system": {
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
} as const satisfies Record<ProjectSlug, ProjectCaseStudy>;
