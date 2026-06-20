"use client";

import { LayoutGroup } from "framer-motion";

export function FramerLayoutProvider({ children }: { children: React.ReactNode }) {
  return <LayoutGroup>{children}</LayoutGroup>;
}
