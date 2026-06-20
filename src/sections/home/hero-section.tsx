"use client";

import Link from "next/link";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useReducedMotion, useMotionValue, useSpring } from "framer-motion";
import { 
  ArrowRight, 
  Terminal, 
  Check, 
  Activity, 
  Cloud, 
  GitBranch, 
  GitCommit,
  Layers
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/stagger-container";

const marqueeItems = [
  "MERN",
  "MEAN",
  "NEXT.JS",
  "AWS",
  "CI/CD",
] as const;

const badges = ["MERN", "MEAN", "Next.js", "AWS", "CI/CD"] as const;

// ─────────────────────────────────────────────────────────────────────────────
// PARTICLE DUST EXPLOSION CANVAS
// ─────────────────────────────────────────────────────────────────────────────

interface DustParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  alpha: number;
  decay: number;
}

function ParticleExplosion({ trigger }: { trigger: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!trigger) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = (canvas.width = canvas.offsetWidth);
    const H = (canvas.height = canvas.offsetHeight);

    const colors = ["#6d5ef6", "#5b6cff", "#d7c7a3", "#a78bfa", "#ffffff"];
    const particles: DustParticle[] = [];

    // 3 Impact points along the text width
    const spawnPoints = [
      { x: W * 0.25, y: H * 0.5 },
      { x: W * 0.5,  y: H * 0.55 },
      { x: W * 0.75, y: H * 0.6 }
    ];

    spawnPoints.forEach(pt => {
      // Spawn 20 particles per impact point
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 2.5;
        particles.push({
          x: pt.x,
          y: pt.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - Math.random() * 1.5, // bias upward
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 2.8 + 1,
          alpha: 1.0,
          decay: Math.random() * 0.025 + 0.02
        });
      }
    });

    let rafId: number;

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      let active = false;

      particles.forEach(p => {
        if (p.alpha <= 0) return;
        active = true;

        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy += 0.05; // Gravity pull
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (active) {
        rafId = requestAnimationFrame(tick);
      }
    };

    tick();

    return () => cancelAnimationFrame(rafId);
  }, [trigger]);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10 w-full h-full" />;
}

// ─────────────────────────────────────────────────────────────────────────────
// INTERACTIVE SPLIT-TEXT IMPACT HEADING
// ─────────────────────────────────────────────────────────────────────────────

interface InteractiveHeadingProps {
  onImpact: () => void;
}

function InteractiveHeading({ onImpact }: InteractiveHeadingProps) {
  const words = "I build web products that move from idea to production.".split(" ");
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    const mountTimer = window.setTimeout(() => setHasMounted(true), 0);

    return () => window.clearTimeout(mountTimer);
  }, []);

  // Track total characters to find the last index deterministically
  const totalChars = words.reduce((acc, word) => acc + word.length, 0);
  let globalCharIdx = 0;

  return (
    <h1
      className="font-display text-[38px] font-black leading-[1.05] tracking-tight text-foreground sm:text-[54px] md:text-[68px] lg:text-[76px] relative"
      id="hero-heading"
    >
      {words.map((word, wIdx) => {
        const letters = word.split("");
        const isHighlight = ["idea", "to", "production.", "production"].includes(word.toLowerCase());
        
        return (
          <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
            {letters.map((char, cIdx) => {
              const charIdx = globalCharIdx++;
              
              // Hydration-safe deterministic coordinates for fly-in start
              const angleRad = ((wIdx * 37 + charIdx * 19) % 360) * (Math.PI / 180);
              const dist = 500 + ((charIdx * 23) % 4) * 150;
              const startX = Math.cos(angleRad) * dist;
              const startY = Math.sin(angleRad) * dist;
              const startRotate = ((charIdx * 73) % 270) - 135;
              const startScale = 2 + (charIdx % 3) * 0.5;
              const className = `inline-block cursor-default select-none ${isHighlight ? "bg-gradient-to-r from-[#6d5ef6] via-[#5b6cff] to-[#a78bfa] bg-clip-text text-transparent" : "text-foreground"}`;

              if (!hasMounted) {
                return (
                  <span className={className} key={cIdx}>
                    {char}
                  </span>
                );
              }

              return (
                <motion.span
                  key={cIdx}
                  className={className}
                  initial={{
                    x: startX,
                    y: startY,
                    rotate: startRotate,
                    scale: startScale,
                    opacity: 0,
                    filter: "blur(12px)"
                  }}
                  animate={{
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)"
                  }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 240,
                    damping: 18,
                    delay: charIdx * 0.008,
                  }}
                  onAnimationComplete={() => {
                    if (charIdx === totalChars - 1) {
                      onImpact();
                    }
                  }}
                  whileHover={{ 
                    scale: 1.25, 
                    rotate: (wIdx + cIdx) % 2 === 0 ? 8 : -8,
                    y: -5,
                    textShadow: "0px 8px 20px rgba(109, 94, 246, 0.25)"
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEVELOPER HUD WIDGET COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function TerminalCard() {
  return (
    <div className="rounded-xl border border-primary/15 bg-white/85 p-4 shadow-[0_12px_40px_rgba(109,94,246,0.06)] backdrop-blur-md">
      {/* Window Controls */}
      <div className="flex items-center justify-between border-b border-foreground/5 pb-2 mb-3">
        <div className="flex gap-1.5">
          <span className="size-2 rounded-full bg-red-400" />
          <span className="size-2 rounded-full bg-yellow-400" />
          <span className="size-2 rounded-full bg-green-400" />
        </div>
        <div className="flex items-center gap-1 text-[8px] font-bold uppercase tracking-wider text-muted-foreground/60">
          <Terminal className="size-2.5 text-primary/60" />
          <span>terminal.sh</span>
        </div>
      </div>
      
      <div className="space-y-1 font-mono text-[9px] leading-relaxed text-slate-700 sm:text-[10px]">
        <div className="flex items-center gap-1 text-primary/80 font-semibold">
          <span>~</span>
          <span className="text-foreground">npm run deploy</span>
        </div>
        <div className="text-emerald-600 font-semibold flex items-center gap-0.5">
          <Check className="size-2.5" />
          <span>Build successful in 4.2s</span>
        </div>
        <div className="text-slate-400 truncate">➜ Deploying containers to AWS ECS...</div>
        <div className="flex items-center gap-1 text-primary font-bold animate-pulse">
          <span className="size-1 rounded-full bg-primary" />
          <span>Status: Live [us-east-1]</span>
        </div>
      </div>
    </div>
  );
}

function AWSStatusCard() {
  return (
    <div className="rounded-xl border border-[#d7c7a3]/30 bg-white/90 p-4 shadow-[0_12px_36px_rgba(215,199,163,0.08)] backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
            <Cloud className="size-3.5" />
          </div>
          <div>
            <span className="block text-[7px] font-bold uppercase tracking-wider text-muted-foreground/50 leading-none">Cloud Console</span>
            <span className="text-[10px] font-bold text-foreground">AWS Status</span>
          </div>
        </div>
        <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-emerald-600 animate-pulse">
          Active
        </span>
      </div>
      
      <div className="space-y-1.5 text-[9px] sm:text-[10px]">
        <div className="flex items-center justify-between border-b border-foreground/5 pb-1">
          <span className="text-slate-500">ECS Services</span>
          <span className="font-bold text-slate-800 flex items-center gap-1">
            <span className="size-1 rounded-full bg-emerald-500" />
            Running
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Region</span>
          <span className="font-mono text-slate-600 font-bold uppercase">ap-south-1</span>
        </div>
      </div>
    </div>
  );
}

function PerformanceCard() {
  return (
    <div className="rounded-xl border border-primary/15 bg-white/90 p-4 shadow-[0_12px_38px_rgba(109,94,246,0.06)] backdrop-blur-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Activity className="size-3.5" />
          </div>
          <div>
            <span className="block text-[7px] font-bold uppercase tracking-wider text-muted-foreground/50 leading-none">System Vitals</span>
            <span className="text-[10px] font-bold text-foreground">Metrics</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mt-1">
        <div className="rounded-lg bg-foreground/3 p-1.5 text-center">
          <span className="block text-[6px] font-semibold uppercase tracking-wider text-slate-400">Response</span>
          <span className="font-display text-xs font-black text-primary leading-none">42ms</span>
        </div>
        <div className="rounded-lg bg-foreground/3 p-1.5 text-center">
          <span className="block text-[6px] font-semibold uppercase tracking-wider text-slate-400">Uptime</span>
          <span className="font-display text-xs font-black text-emerald-600 leading-none">99.9%</span>
        </div>
      </div>
    </div>
  );
}

function GitCommitCard() {
  return (
    <div className="rounded-xl border border-foreground/10 bg-white/85 p-4 shadow-[0_12px_36px_rgba(23,23,23,0.04)] backdrop-blur-md">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
            <GitBranch className="size-3.5" />
          </div>
          <div>
            <span className="block text-[7px] font-bold uppercase tracking-wider text-muted-foreground/50 leading-none">Git Activity</span>
            <span className="text-[10px] font-bold text-foreground">Logs</span>
          </div>
        </div>
      </div>

      <div className="rounded-lg bg-foreground/3 p-2 font-mono text-[8px] text-slate-600 sm:text-[9px] space-y-1">
        <div className="flex items-center gap-1 text-slate-800 font-bold">
          <GitCommit className="size-3 text-emerald-600 shrink-0" />
          <span className="truncate">feat: live metrics</span>
        </div>
        <div className="flex justify-between items-center text-[7px] text-slate-400">
          <span>Branch: main</span>
          <span>Active</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAGNETIC BUTTON WRAPPER
// ─────────────────────────────────────────────────────────────────────────────

interface MagneticProps {
  children: React.ReactElement;
  isDesktop: boolean;
}

function MagneticButton({ children, isDesktop }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDesktop || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    x.set(distanceX * 0.28);
    y.set(distanceY * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const springConfig = { stiffness: 120, damping: 15 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: smoothX, y: smoothY }}
      className="w-full sm:w-auto"
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HERO SECTION COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function HeroSection() {
  const reduceMotion = useReducedMotion();
  const isMotionReduced = reduceMotion === true;
  
  const [isDesktop, setIsDesktop] = useState(false);
  const [explosionTriggered, setExplosionTriggered] = useState(false);
  
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const smoothGlowX = useSpring(glowX, { stiffness: 50, damping: 20 });
  const smoothGlowY = useSpring(glowY, { stiffness: 50, damping: 20 });
  
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Backup timer to guarantee the dust explosion fires
    const t = setTimeout(() => {
      setExplosionTriggered(true);
    }, 850);
    return () => clearTimeout(t);
  }, []);

  const handleImpact = useCallback(() => {
    setExplosionTriggered(true);
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (isMotionReduced || !isDesktop) return;
    glowX.set(event.clientX);
    glowY.set(event.clientY);
  }, [isDesktop, isMotionReduced, glowX, glowY]);

  // Entrance variants for the draggable HUD cards
  const cardEntrance = {
    hidden: { scale: 0.2, opacity: 0, y: 50 },
    visible: (customDelay: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 140,
        damping: 15,
        delay: customDelay,
      }
    })
  };

  return (
    <>
      <section
        aria-labelledby="hero-heading"
        className="mesh-gradient relative isolate max-w-full overflow-hidden px-[5vw] pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36"
        onMouseMove={handleMouseMove}
      >
        {/* Soft interactive mouse trail glow */}
        {isDesktop && !isMotionReduced && (
          <motion.div
            className="pointer-events-none fixed z-0 rounded-full bg-primary/3 blur-[140px] size-[560px] -translate-x-1/2 -translate-y-1/2"
            style={{
              left: smoothGlowX,
              top: smoothGlowY,
            }}
          />
        )}

        <div className="mx-auto grid min-h-[calc(100svh-8rem)] w-full max-w-7xl items-center gap-12 overflow-hidden lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:overflow-visible">
          
          {/* Left Text Column */}
          <StaggerContainer className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left">
            
            {/* Status pill badge */}
            <StaggerItem>
              <div className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-md shadow-[0_8px_30px_rgba(109,94,246,0.04)] mb-6 transition-all duration-300 hover:border-primary/45">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span>Available for Opportunities</span>
                <span className="text-primary/30">|</span>
                <span className="text-muted-foreground/80 font-semibold normal-case">Ahmedabad, IN</span>
              </div>
            </StaggerItem>

            {/* Sub-label */}
            <StaggerItem>
              <p className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-primary/70">
                Full Stack Developer
              </p>
            </StaggerItem>

            {/* Interactive Spring Heading & Particle Canvas */}
            <StaggerItem className="relative w-full">
              <InteractiveHeading onImpact={handleImpact} />
              <ParticleExplosion trigger={explosionTriggered} />
            </StaggerItem>

            {/* Description */}
            <StaggerItem>
              <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground sm:text-lg md:max-w-2xl">
                Focused on building clean, stable, and highly-performant web applications. 
                I design responsive user interfaces, engineer reliable server architectures, and automate cloud infrastructure deployments.
              </p>
            </StaggerItem>

            {/* Magnetic CTAs */}
            <StaggerItem className="mt-10 flex w-full max-w-md flex-col gap-3.5 sm:flex-row sm:max-w-none">
              
              <MagneticButton isDesktop={isDesktop}>
                <Link
                  className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary px-8 py-4 font-bold text-white shadow-[0_18px_44px_rgba(109,94,246,0.22)] transition-all duration-300 hover:bg-accent hover:shadow-[0_22px_54px_rgba(109,94,246,0.28)] hover:scale-102 active:scale-98"
                  href="/#work"
                >
                  View Work
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </MagneticButton>

              <MagneticButton isDesktop={isDesktop}>
                <Link
                  className="inline-flex w-full items-center justify-center rounded-full border border-border bg-white px-8 py-4 font-bold text-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-[0_16px_40px_rgba(23,23,23,0.08)] hover:scale-102 active:scale-98"
                  href="/contact"
                >
                  Let&apos;s Connect
                </Link>
              </MagneticButton>

              <MagneticButton isDesktop={isDesktop}>
                <a
                  className="inline-flex w-full items-center justify-center rounded-full border border-border bg-white px-8 py-4 font-bold text-foreground transition-all duration-300 hover:border-primary/40 hover:text-primary hover:shadow-[0_16px_40px_rgba(23,23,23,0.08)] hover:scale-102 active:scale-98"
                  href="/Harsh-Panchal-Resume.pdf"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Download Resume
                </a>
              </MagneticButton>

            </StaggerItem>

            {/* Badges */}
            <StaggerItem className="mt-10 flex flex-wrap justify-center gap-2.5 lg:justify-start">
              {badges.map((badge, index) => (
                <span
                  className="rounded-full border border-border bg-white px-3.5 py-2 text-xs font-semibold text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-primary/8 hover:text-primary"
                  style={{ transitionDelay: `${index * 18}ms` }}
                  key={badge}
                >
                  {badge}
                </span>
              ))}
            </StaggerItem>
          </StaggerContainer>
 
          {/* Right Visual Column - Drag-and-Drop HUD */}
          <div ref={containerRef} className="relative z-10 w-full min-h-[460px] select-none overflow-visible flex items-center justify-center">
            
            {!isDesktop ? (
              // Mobile Viewport: Structured Static Layout (prevents touch scroll block)
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 mt-8 max-w-lg mx-auto">
                <TerminalCard />
                <AWSStatusCard />
                <PerformanceCard />
                <GitCommitCard />
              </div>
            ) : (
              // Desktop Viewport: 3D Interactive Draggable HUD Card Sandbox
              <div className="relative w-full h-full min-h-[460px] overflow-visible">
                {/* Drag instruction tag */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.6, y: 0 }}
                  transition={{ delay: 1.8 }}
                  className="absolute top-0 right-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary"
                >
                  <Layers className="size-3" />
                  <span>Interactive Sandbox (Drag Cards)</span>
                </motion.div>

                {/* Draggable Terminal */}
                <motion.div
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.4}
                  dragMomentum={true}
                  dragTransition={{ bounceStiffness: 150, bounceDamping: 14 }}
                  variants={cardEntrance}
                  initial="hidden"
                  animate="visible"
                  custom={0.8}
                  className="absolute left-[2%] top-[18%] w-[68%] z-20 cursor-grab active:cursor-grabbing hover:z-50"
                  whileDrag={{ scale: 1.04, boxShadow: "0px 24px 60px rgba(109, 94, 246, 0.15)" }}
                >
                  <TerminalCard />
                </motion.div>

                {/* Draggable AWS Console */}
                <motion.div
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.4}
                  dragMomentum={true}
                  dragTransition={{ bounceStiffness: 150, bounceDamping: 14 }}
                  variants={cardEntrance}
                  initial="hidden"
                  animate="visible"
                  custom={1.0}
                  className="absolute right-[1%] top-[5%] w-[48%] z-35 cursor-grab active:cursor-grabbing hover:z-50"
                  whileDrag={{ scale: 1.04, boxShadow: "0px 24px 60px rgba(109, 94, 246, 0.15)" }}
                >
                  <AWSStatusCard />
                </motion.div>

                {/* Draggable Performance Metrics */}
                <motion.div
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.4}
                  dragMomentum={true}
                  dragTransition={{ bounceStiffness: 150, bounceDamping: 14 }}
                  variants={cardEntrance}
                  initial="hidden"
                  animate="visible"
                  custom={1.2}
                  className="absolute left-[5%] bottom-[5%] w-[42%] z-30 cursor-grab active:cursor-grabbing hover:z-50"
                  whileDrag={{ scale: 1.04, boxShadow: "0px 24px 60px rgba(109, 94, 246, 0.15)" }}
                >
                  <PerformanceCard />
                </motion.div>

                {/* Draggable Git Commits */}
                <motion.div
                  drag
                  dragConstraints={containerRef}
                  dragElastic={0.4}
                  dragMomentum={true}
                  dragTransition={{ bounceStiffness: 150, bounceDamping: 14 }}
                  variants={cardEntrance}
                  initial="hidden"
                  animate="visible"
                  custom={1.4}
                  className="absolute right-[2%] bottom-[12%] w-[50%] z-25 cursor-grab active:cursor-grabbing hover:z-50"
                  whileDrag={{ scale: 1.04, boxShadow: "0px 24px 60px rgba(109, 94, 246, 0.15)" }}
                >
                  <GitCommitCard />
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </section>
 
      {/* Marquee Row */}
      <div className="w-full overflow-hidden border-y border-border bg-white/50 py-7 whitespace-nowrap select-none md:py-10">
        <div className="animate-marquee flex gap-8 md:gap-10">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              className="kinetic-text font-display text-[34px] font-bold leading-[1.1] md:text-[64px]"
              key={`${item}-${index}`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
