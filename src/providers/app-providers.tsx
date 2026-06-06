"use client";

import { SmoothScrollProvider } from "@/providers/smooth-scroll-provider";

type AppProvidersProps = Readonly<{
  children: React.ReactNode;
}>;

export function AppProviders({ children }: AppProvidersProps) {
  return <SmoothScrollProvider>{children}</SmoothScrollProvider>;
}
