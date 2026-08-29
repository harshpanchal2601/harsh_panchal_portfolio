import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import { SITE_METADATA } from "@/constants/site";
import { createSeoMetadata } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  ...createSeoMetadata("/"),
  applicationName: SITE_METADATA.name,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.png",
    apple: "/apple-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        {/* Route boot behavior that must run before React hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var p=location.pathname;
  var entries=performance.getEntriesByType&&performance.getEntriesByType('navigation');
  var isReload=entries&&entries[0]
    ? entries[0].type==='reload'
    : performance.navigation&&performance.navigation.type===1;

  if(p==='/'&&!location.hash&&isReload){
    var previousRestoration=history.scrollRestoration;
    history.scrollRestoration='manual';
    scrollTo(0,0);
    addEventListener('load',function(){
      requestAnimationFrame(function(){
        scrollTo(0,0);
        history.scrollRestoration=previousRestoration;
      });
    },{once:true});
  }

  if(p!=='/legacy') return;
  var g=document.createElement('div');
  g.id='hp-intro-guard';
  g.style.cssText='position:fixed;inset:0;background:#f7f4ef;z-index:99998;';
  document.body.appendChild(g);
})();`,
          }}
        />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
