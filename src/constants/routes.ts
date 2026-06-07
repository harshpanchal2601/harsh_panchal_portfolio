export const SITE_ROUTES = {
  home: "/",
  about: "/#about",
  work: "/#work",
  journey: "/#journey",
  contact: "/contact",
  projects: "/projects",
} as const;

export const MAIN_NAVIGATION = [
  {
    label: "About",
    href: SITE_ROUTES.about,
  },
  {
    label: "Work",
    href: SITE_ROUTES.work,
  },
  {
    label: "Journey",
    href: SITE_ROUTES.journey,
  },
  {
    label: "Contact",
    href: SITE_ROUTES.contact,
  },
] as const;

export const PROJECT_ROUTES = {
  wikipointAi: "/projects/wikipoint-ai",
  beige: "/projects/beige",
  erpSystem: "/projects/erp-system",
  hrManagementSystem: "/projects/hr-management-system",
} as const;
