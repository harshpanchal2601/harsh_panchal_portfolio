export const V2_NAV_ITEMS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#process", label: "Process" },
] as const;

export const HERO_COPY_STATEMENT =
  "I build web products that move from idea to production.";

export const HERO_IMAGE_SRC = "/images/portfolio-v2/harsh-hero-cinematic.png";
export const HERO_IMAGE_WIDTH = 1536;
export const HERO_IMAGE_HEIGHT = 1024;

export const HERO_HEADLINE_DESKTOP = [
  [
    { id: "d0", text: "I BUILD" },
    { id: "d1", text: "WEB PRODUCTS" },
  ],
  [
    { id: "d2", text: "THAT MOVE" },
    { id: "d3", text: "FROM IDEA" },
  ],
  [
    { id: "d4", text: "TO" },
    { id: "d5", text: "PRODUCTION." },
  ],
] as const;

export const HERO_HEADLINE_MOBILE = [
  [{ id: "m0", text: "I BUILD WEB", offset: false }],
  [{ id: "m1", text: "PRODUCTS THAT", offset: true }],
  [{ id: "m2", text: "MOVE FROM IDEA", offset: false }],
  [{ id: "m3", text: "TO PRODUCTION.", offset: true }],
] as const;

export const HERO_FRAGMENT_MOTION_DESKTOP = {
  d0: { xPercent: -16, y: -56, rotation: -1.1, at: 0 },
  d1: { xPercent: 18, y: -28, rotation: 1.2, at: 0.05 },
  d2: { xPercent: -14, y: 58, rotation: -0.7, at: 0.08 },
  d3: { xPercent: 16, y: -48, rotation: 1.0, at: 0.06 },
  d4: { xPercent: -6, y: 72, rotation: -0.4, at: 0.11 },
  d5: { xPercent: 20, y: 62, rotation: 1.4, at: 0.09 },
} as const;

export const HERO_FRAGMENT_MOTION_MOBILE = {
  m0: { xPercent: -8, y: -28, rotation: -0.8, at: 0 },
  m1: { xPercent: 8, y: -16, rotation: 0.6, at: 0.04 },
  m2: { xPercent: -7, y: 18, rotation: -0.5, at: 0.07 },
  m3: { xPercent: 9, y: 28, rotation: 0.9, at: 0.09 },
} as const;
