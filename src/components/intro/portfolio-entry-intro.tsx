"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

let _introShownThisLoad = false;

// ─────────────────────────────────────────────────────────────────────────────
// CINEMATIC CANVAS  — Aurora + Spotlight + Particles + Rings
// ─────────────────────────────────────────────────────────────────────────────
function CinematicCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let W = (cv.width = innerWidth);
    let H = (cv.height = innerHeight);
    let raf: number;
    let t = 0;
    let mx = W / 2, my = H / 2;
    let smx = W / 2, smy = H / 2; // smoothed mouse

    // ── Particles ──────────────────────────────────────────────
    interface P { x: number; y: number; vx: number; vy: number; r: number; op: number; ph: number; col: number[] }
    const COLS: number[][] = [
      [109,94,246],[91,108,255],[167,139,250],[215,199,163],[196,181,253],[129,140,248]
    ];
    const particles: P[] = Array.from({ length: 90 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.3, vy: -(Math.random() * 0.4 + 0.1),
      r: Math.random() * 2.5 + 0.8,
      op: Math.random() * 0.4 + 0.1,
      ph: Math.random() * Math.PI * 2,
      col: COLS[Math.floor(Math.random() * COLS.length)],
    }));

    // ── Rings ───────────────────────────────────────────────────
    const rings = [0, 0.6, 1.2].map(ph => ({ ph, r: 0, maxR: Math.max(W, H) * 0.7 }));

    // ── Aurora centers ──────────────────────────────────────────
    const auras = [
      { x: W * 0.2, y: H * 0.3, col: [109,94,246], ph: 0 },
      { x: W * 0.8, y: H * 0.6, col: [167,139,250], ph: 2.1 },
      { x: W * 0.5, y: H * 0.8, col: [215,199,163], ph: 4.2 },
      { x: W * 0.7, y: H * 0.2, col: [91,108,255],  ph: 1.4 },
    ];

    const onResize = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; };
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    addEventListener("resize", onResize);
    addEventListener("mousemove", onMouse);

    const draw = () => {
      t += 0.013;

      // Smooth mouse
      smx += (mx - smx) * 0.06;
      smy += (my - smy) * 0.06;

      // Clear cream
      ctx.fillStyle = "#f7f4ef";
      ctx.fillRect(0, 0, W, H);

      // ── AURORA BLOBS ─────────────────────────────────────────
      for (const a of auras) {
        const px = a.x + Math.sin(t * 0.4 + a.ph) * W * 0.12 + (smx - W/2) * 0.03;
        const py = a.y + Math.cos(t * 0.3 + a.ph) * H * 0.10 + (smy - H/2) * 0.02;
        const radius = Math.min(W, H) * (0.35 + Math.sin(t * 0.5 + a.ph) * 0.06);
        const g = ctx.createRadialGradient(px, py, 0, px, py, radius);
        g.addColorStop(0,   `rgba(${a.col},0.22)`);
        g.addColorStop(0.45,`rgba(${a.col},0.10)`);
        g.addColorStop(1,   `rgba(${a.col},0.00)`);
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(px, py, radius, 0, Math.PI*2); ctx.fill();
      }

      // ── MOUSE SPOTLIGHT ──────────────────────────────────────
      const sg = ctx.createRadialGradient(smx, smy, 0, smx, smy, 220);
      sg.addColorStop(0,   "rgba(255,255,255,0.28)");
      sg.addColorStop(0.4, "rgba(109,94,246,0.08)");
      sg.addColorStop(1,   "rgba(109,94,246,0.00)");
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(smx, smy, 220, 0, Math.PI*2); ctx.fill();

      // ── MESH GRID ────────────────────────────────────────────
      const COLS2 = 18, ROWS2 = 12;
      ctx.strokeStyle = "rgba(109,94,246,0.12)";
      ctx.lineWidth = 0.9;
      for (let r = 0; r <= ROWS2; r++) {
        for (let c = 0; c <= COLS2 - 1; c++) {
          const x1 = (c / COLS2) * W;  const y1 = (r / ROWS2) * H;
          const x2 = ((c+1)/COLS2)*W; const y2 = (r / ROWS2) * H;
          const wave1 = Math.sin(t + x1*0.007) * 14;
          const wave2 = Math.sin(t + x2*0.007) * 14;
          ctx.beginPath();
          ctx.moveTo(x1, y1 + wave1);
          ctx.lineTo(x2, y2 + wave2);
          ctx.stroke();
        }
      }
      for (let c = 0; c <= COLS2; c++) {
        for (let r = 0; r <= ROWS2 - 1; r++) {
          const x = (c / COLS2) * W;
          const y1 = (r / ROWS2) * H;   const y2 = ((r+1)/ROWS2)*H;
          const w1 = Math.sin(t + x*0.007) * 14;
          const w2 = Math.sin(t + x*0.007) * 14;
          ctx.beginPath();
          ctx.moveTo(x, y1 + w1);
          ctx.lineTo(x, y2 + w2);
          ctx.stroke();
        }
      }

      // ── PULSING RINGS from center ─────────────────────────────
      for (const ring of rings) {
        ring.r += 1.4;
        if (ring.r > ring.maxR) ring.r = 0;
        const alpha = Math.max(0, (1 - ring.r / ring.maxR) * 0.16);
        ctx.strokeStyle = `rgba(109,94,246,${alpha})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, ring.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ── PARTICLES ────────────────────────────────────────────
      for (const p of particles) {
        // Mouse repulsion
        const dx = p.x - smx, dy = p.y - smy;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 140) {
          const f = (1 - dist/140) * 0.9;
          p.vx += (dx/dist) * f * 0.08;
          p.vy += (dy/dist) * f * 0.08;
        }
        p.vx *= 0.97; p.vy *= 0.97;
        p.x += p.vx + Math.sin(t*0.4 + p.ph) * 0.15;
        p.y += p.vy - 0.12;
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10;
        if (p.x > W+10) p.x = -10;

        const pulse = 0.7 + Math.sin(t + p.ph) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * pulse, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${p.col},${p.op * pulse})`;
        ctx.fill();
      }

      // ── GLOW lines from mouse ─────────────────────────────────
      for (let i = 0; i < 3; i++) {
        const angle = (t * 0.3 + (i * Math.PI * 2) / 3);
        const ex = smx + Math.cos(angle) * 300;
        const ey = smy + Math.sin(angle) * 300;
        const lg = ctx.createLinearGradient(smx, smy, ex, ey);
        lg.addColorStop(0,   `rgba(109,94,246,0.12)`);
        lg.addColorStop(1,   `rgba(109,94,246,0.00)`);
        ctx.strokeStyle = lg;
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(smx, smy); ctx.lineTo(ex, ey); ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      removeEventListener("resize", onResize);
      removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}

// ─────────────────────────────────────────────────────────────────────────────
// STAGGERED LETTER REVEAL
// ─────────────────────────────────────────────────────────────────────────────
function SplitText({ text, delay = 0, className = "", gradient = false }: {
  text: string; delay?: number; className?: string; gradient?: boolean;
}) {
  const letters = useMemo(() => text.split(""), [text]);
  return (
    <span className={`inline-flex flex-wrap justify-center ${className}`} aria-label={text}>
      {letters.map((l, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ opacity: 0, y: 60, rotateX: -90, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0,  rotateX: 0,   filter: "blur(0px)" }}
          transition={{
            delay: delay + i * 0.055,
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={gradient ? {
            background: "linear-gradient(135deg,#6d5ef6 0%,#5b6cff 45%,#a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          } : undefined}
        >
          {l === " " ? "\u00A0" : l}
        </motion.span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPEWRITER
// ─────────────────────────────────────────────────────────────────────────────
function Typewriter({ text, delay = 0, onDone }: { text: string; delay?: number; onDone?: () => void }) {
  const [shown, setShown] = useState("");
  const [blink, setBlink] = useState(true);
  const [go, setGo] = useState(false);

  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  useEffect(() => {
    if (!go) return;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(iv);
        onDoneRef.current?.();
      }
    }, 44);
    const bv = setInterval(() => setBlink(b => !b), 530);
    return () => {
      clearInterval(iv);
      clearInterval(bv);
    };
  }, [go, text]);

  if (!go) return null;
  return <span>{shown}<span className={blink ? "opacity-100" : "opacity-0"} style={{ transition:"opacity 0.1s" }}>|</span></span>;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN INTRO COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function PortfolioEntryIntro() {
  const reduceMotion = useReducedMotion();
  const mr = reduceMotion === true;
  const [shouldRender, setShouldRender] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [textDone, setTextDone] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  const handleTypewriterDone = useCallback(() => {
    setTextDone(true);
  }, []);

  const handleEnter = useCallback((scrollToWork = false) => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      setShouldRender(false);
      if (scrollToWork) document.getElementById("work")?.scrollIntoView({ behavior: mr ? "auto" : "smooth" });
    }, mr ? 80 : 920);
  }, [isExiting, mr]);

  // ── Guard removal + intro trigger
  // useLayoutEffect fires synchronously BEFORE the browser paints.
  // This means:
  //   1. The cream guard div is removed without user ever seeing the page
  //   2. If first load → intro appears immediately (no flash)
  //   3. If SPA navigation back → guard removed instantly, page visible
  useEffect(() => {
    const mountTimer = setTimeout(() => {
      // Always clean old storage keys
      localStorage.removeItem("hp_intro_v3");
      localStorage.removeItem("hp_intro_v4");
      sessionStorage.removeItem("hp_intro_v4");

      if (!_introShownThisLoad) {
        _introShownThisLoad = true;
        setShouldRender(true);
        // Guard will be removed by the intro's own mount effect below
      } else {
        // Not showing intro — remove guard immediately so page is visible
        document.getElementById("hp-intro-guard")?.remove();
      }

      setHasMounted(true);
    }, 0);

    return () => clearTimeout(mountTimer);
  }, []);

  useEffect(() => {
    if (shouldRender) {
      // Intro is mounting — quickly fade out and remove the guard
      const g = document.getElementById("hp-intro-guard");
      if (g) {
        g.style.transition = "opacity 0.12s";
        g.style.opacity = "0";
        setTimeout(() => g.remove(), 130);
      }
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      // Also remove guard on any other path (navigation back etc.)
      document.getElementById("hp-intro-guard")?.remove();
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [shouldRender]);

  useEffect(() => {
    if (!shouldRender) return;
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") handleEnter(); };
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldRender]);

  useEffect(() => {
    if (!textDone) return;
    const t = setTimeout(() => setShowCTA(true), 200);
    return () => clearTimeout(t);
  }, [textDone]);

  if (!hasMounted || !shouldRender) return null;

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          key="intro"
          className="fixed inset-0 overflow-hidden"
          style={{ zIndex: 99999 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Animated canvas background */}
          <CinematicCanvas />

          {/* Grain texture overlay for premium feel */}
          <div
            className="pointer-events-none absolute inset-0 z-[101] opacity-[0.025]"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }}
          />

          {/* 8-slice shutter exit */}
          <AnimatePresence>
            {isExiting && !mr && (
              <div className="pointer-events-none fixed inset-0 z-[110] flex">
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div key={i} className="flex-1 bg-[#f7f4ef]"
                    initial={{ scaleY: 0, originY: i % 2 === 0 ? "0%" : "100%" }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1], delay: i * 0.04 }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Content */}
          <div className="relative z-[105] flex h-full flex-col items-center justify-center px-6 text-center" style={{ perspective: "900px" }}>

            {/* HP. monogram */}
            <motion.div
              initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="mb-3 font-display text-[13px] font-black tracking-[0.45em] text-primary/40 uppercase"
            >
              HP.
            </motion.div>

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.6, ease: [0.34,1.56,0.64,1] }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-white/60 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-primary backdrop-blur-md shadow-[0_4px_20px_rgba(109,94,246,0.12)]"
            >
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="inline-flex size-1.5 rounded-full bg-primary" />
              </span>
              Full Stack Developer · 2025
            </motion.div>

            {/* Main name — split letter animation */}
            <h1
              className="mb-0 font-display font-black leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(64px, 11vw, 130px)", transformStyle: "preserve-3d" }}
            >
              <SplitText text="Harsh" delay={0.15} className="block text-foreground" />
              <SplitText text="Panchal." delay={0.35} className="block" gradient />
            </h1>

            {/* Glowing underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 1.1, duration: 1.0, ease: [0.16,1,0.3,1] }}
              className="mt-4 mb-7 h-[3px] w-56 origin-left rounded-full"
              style={{ background: "linear-gradient(90deg,#6d5ef6,#a78bfa,transparent)" }}
            />

            {/* Typewriter tagline */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mb-10 min-h-[26px] text-sm font-semibold tracking-[0.12em] text-muted-foreground uppercase sm:text-base"
            >
              <Typewriter text="Building scalable products · AWS · CI/CD · AI" delay={1300} onDone={handleTypewriterDone} />
            </motion.p>

            {/* CTA buttons */}
            <AnimatePresence>
              {showCTA && (
                <motion.div
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.16,1,0.3,1] }}
                  className="flex flex-col items-center gap-3 sm:flex-row"
                >
                  {/* Primary CTA */}
                  <button
                    onClick={() => handleEnter(false)} type="button"
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-primary px-10 py-4 text-sm font-bold text-white shadow-[0_20px_60px_rgba(109,94,246,0.4)] transition-all duration-300 hover:shadow-[0_28px_70px_rgba(109,94,246,0.55)] hover:scale-105 active:scale-98"
                  >
                    {/* Shimmer sweep */}
                    <motion.span
                      className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                      animate={{ x: ["−100%", "200%"] }}
                      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
                    />
                    {/* Ping ring */}
                    <span className="absolute -inset-[3px] rounded-full border-2 border-primary/30 animate-ping opacity-60 pointer-events-none" />
                    Enter Portfolio
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>

                  {/* Secondary CTA */}
                  <button
                    onClick={() => handleEnter(true)} type="button"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-10 py-4 text-sm font-bold text-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/40 hover:text-primary hover:bg-white hover:shadow-[0_12px_36px_rgba(109,94,246,0.14)] hover:scale-103 active:scale-98"
                  >
                    View My Work
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ESC hint */}
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }}
              className="absolute bottom-8 text-[9px] font-bold uppercase tracking-[0.3em] text-muted-foreground/35"
            >
              Press ESC to skip
            </motion.p>
          </div>

          {/* Skip X button */}
          <button
            onClick={() => handleEnter()} aria-label="Skip intro" type="button"
            className="absolute right-5 top-5 z-[106] inline-flex size-9 items-center justify-center rounded-full border border-border bg-white/70 text-muted-foreground backdrop-blur-md transition duration-300 hover:border-primary/30 hover:text-primary active:scale-95"
          >
            <X className="size-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
