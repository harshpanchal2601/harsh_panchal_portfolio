import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { AppProviders } from "@/providers/app-providers";
import { SITE_METADATA } from "@/constants/site";
import { createSeoMetadata } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
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
        {/*
          Inline script runs BEFORE React hydrates.
          Creates a cream guard div that blocks the page from showing.
          PortfolioEntryIntro removes it in useLayoutEffect (synchronously before paint).
          This prevents the flash of page content before the intro appears.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
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
