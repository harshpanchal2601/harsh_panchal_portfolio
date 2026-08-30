import type { Metadata, Viewport } from "next";
import { DM_Sans, Inter } from "next/font/google";
import { SITE_METADATA } from "@/constants/site";
import { createSeoMetadata } from "@/lib/seo";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.url),
  ...createSeoMetadata("/"),
  applicationName: SITE_METADATA.name,
  authors: [{ name: SITE_METADATA.author }],
  creator: SITE_METADATA.author,
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
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
      className={`${dmSans.variable} ${inter.variable}`}
    >
      <body>
        {/* Route boot behavior that must run before React hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
  var p=location.pathname;

  if(p==='/'){
    window.__portfolioV2PreviousScrollRestoration=history.scrollRestoration;
    history.scrollRestoration='manual';
    var hasWorkReturn=false;
    try{
      var raw=sessionStorage.getItem('portfolio-v2:work-return');
      if(raw){
        var intent=JSON.parse(raw);
        var age=Date.now()-intent.createdAt;
        hasWorkReturn=typeof intent.slug==='string'&&intent.slug.length>0&&typeof intent.createdAt==='number'&&age>=0&&age<=20000;
      }
    }catch(e){}
    if(location.search||location.hash){
      history.replaceState(history.state,'','/');
    }
    if(!hasWorkReturn){
      scrollTo(0,0);
    }
  }

  if(p!=='/legacy') return;
  var g=document.createElement('div');
  g.id='hp-intro-guard';
  g.style.cssText='position:fixed;inset:0;background:#f7f4ef;z-index:99998;';
  document.body.appendChild(g);
})();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
