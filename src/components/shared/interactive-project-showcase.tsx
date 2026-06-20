"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface ProjectData {
  slug: string;
  title: string;
  liveUrl?: string;
  role: string;
  summary: string;
}

interface InteractiveProjectShowcaseProps {
  project: ProjectData;
}

// Auto-scrolling iframe preview — pointer-events none so it's view-only
// Click overlay opens site in new tab
function LiveSitePreview({ url, title }: { url: string; title: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative h-full w-full overflow-hidden rounded-b-xl bg-white">
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#fbfaf8]">
          <div className="h-7 w-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <span className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Loading preview…
          </span>
        </div>
      )}

      {/* The actual site in an iframe — pointer-events:none = view only */}
      <iframe
        src={url}
        title={`${title} live preview`}
        onLoad={() => setLoaded(true)}
        className="border-0"
        sandbox="allow-scripts allow-same-origin"
        style={{
          width: "160%",           // render at 160% width
          height: "160%",          // render at 160% height
          transform: "scale(0.625)", // scale back down so it fits
          transformOrigin: "top left",
          pointerEvents: "none",   // no interaction with iframe
        }}
      />

      {/* Subtle shimmer overlay to suggest it's auto-scrolling */}
      {loaded && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(247,244,239,0) 60%, rgba(247,244,239,0.6) 100%)",
          }}
        />
      )}

      {/* Click-to-open overlay */}
      {loaded && url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/0 transition-all duration-300 hover:bg-black/12 group/overlay"
          aria-label={`Open ${title} in new tab`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 rounded-full border border-white bg-white/90 px-5 py-2.5 text-xs font-bold text-foreground opacity-100 shadow-[0_8px_30px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-opacity duration-300 md:opacity-0 md:group-hover/overlay:opacity-100"
          >
            <ExternalLink className="size-3.5 text-primary" />
            Open Site
          </motion.div>
        </a>
      )}
    </div>
  );
}

// Static mock for when no live URL or mobile
function StaticMockOverlay({ slug, liveUrl }: { slug: string; liveUrl?: string }) {
  return (
    <div className="relative h-full w-full">
      {/* Placeholder gradient background */}
      <div
        className="absolute inset-0 rounded-b-xl"
        style={{
          background:
            slug === "wikipoint-ai"
              ? "linear-gradient(135deg,#0f1729 0%,#1a2744 50%,#0d1b38 100%)"
              : "linear-gradient(135deg,#fafafa 0%,#f0ede8 50%,#f7f4ef 100%)",
        }}
      />

      {/* Browser mock content */}
      <div className="absolute inset-0 flex flex-col p-5 gap-3 overflow-hidden">
        {/* Fake UI skeleton */}
        {slug === "wikipoint-ai" ? (
          <>
            <div className="h-2 w-2/3 rounded bg-slate-700/60 animate-pulse" />
            <div className="h-2 w-1/2 rounded bg-slate-700/40 animate-pulse delay-75" />
            <div className="mt-2 grid grid-cols-3 gap-2 flex-1">
              {[1,2,3,4,5,6].map(i => (
                <div key={i} className="rounded-lg bg-slate-700/30 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
              ))}
            </div>
            <div className="h-2 w-1/3 rounded bg-emerald-500/40 animate-pulse" />
          </>
        ) : (
          <>
            <div className="h-2 w-1/3 rounded bg-slate-300/60 animate-pulse" />
            <div className="h-2 w-1/2 rounded bg-slate-200/60 animate-pulse delay-75" />
            <div className="mt-2 grid grid-cols-2 gap-3 flex-1">
              {[1,2,3,4].map(i => (
                <div key={i} className="rounded-xl bg-white/50 animate-pulse shadow-sm" style={{ animationDelay: `${i * 120}ms` }} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Open site button if has URL */}
      {liveUrl && (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 flex items-end justify-center pb-8 bg-black/5 hover:bg-black/15 transition-all duration-300 group/open"
        >
          <span className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-white shadow-[0_8px_30px_rgba(109,94,246,0.3)] opacity-0 group-hover/open:opacity-100 translate-y-2 group-hover/open:translate-y-0 transition-all duration-300">
            <ExternalLink className="size-4" />
            View Live Site
          </span>
        </a>
      )}
    </div>
  );
}

export function InteractiveProjectShowcase({ project }: InteractiveProjectShowcaseProps) {
  return (
    <div className="relative w-full md:col-span-7 h-[360px] md:h-[480px]">
      {/* macOS browser shell */}
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-white shadow-[0_24px_70px_rgba(23,23,23,0.08)] transition duration-500 hover:border-primary/25 hover:shadow-[0_30px_86px_rgba(109,94,246,0.12)]">

        {/* macOS chrome top bar */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-border bg-white/80 px-4 backdrop-blur-md">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="size-3 rounded-full bg-[#ff5f56]" />
            <div className="size-3 rounded-full bg-[#ffbd2e]" />
            <div className="size-3 rounded-full bg-[#27c93f]" />
          </div>

          {/* Address bar */}
          <div className="flex h-7 w-2/3 max-w-[360px] items-center gap-2 rounded-lg border border-border bg-slate-50/80 px-3 text-[11px] text-slate-500 select-none">
            <div className="size-2.5 rounded-full bg-[#27c93f] shrink-0" />
            <span className="truncate">{project.liveUrl || `https://${project.slug}.app`}</span>
          </div>

          {/* Open external link */}
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-7 items-center justify-center rounded-md border border-border bg-white text-slate-400 transition hover:border-primary/30 hover:text-primary"
              aria-label="Open in new tab"
            >
              <ExternalLink className="size-3.5" />
            </a>
          ) : (
            <div className="size-7" />
          )}
        </div>

        {/* Viewport — live iframe on desktop, static mock on mobile */}
        <div className="relative flex-1 overflow-hidden">
          {project.liveUrl ? (
            <LiveSitePreview url={project.liveUrl} title={project.title} />
          ) : (
            <StaticMockOverlay slug={project.slug} liveUrl={project.liveUrl} />
          )}
        </div>
      </div>
    </div>
  );
}
