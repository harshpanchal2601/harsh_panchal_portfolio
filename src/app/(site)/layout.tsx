import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      <div className="flex min-h-dvh flex-col">
        <main className="flex-1 pt-16 md:pt-20">{children}</main>
        <SiteFooter />
      </div>
    </>
  );
}
