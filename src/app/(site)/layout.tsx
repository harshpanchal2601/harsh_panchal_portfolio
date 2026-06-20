import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SplashProvider } from "@/context/splash-context";
import { SplashScreen } from "@/components/layout/splash-screen";
import { FramerLayoutProvider } from "@/components/providers/framer-layout-provider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SplashProvider>
      <FramerLayoutProvider>
        <SplashScreen />
        <SiteHeader />
        <div className="flex min-h-dvh flex-col">
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </FramerLayoutProvider>
    </SplashProvider>
  );
}
