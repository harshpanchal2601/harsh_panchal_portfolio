"use client";

import { useEffect, useRef } from "react";

// Cream-and-purple palette — matches the site theme perfectly
const COLORS = [
  "rgba(109,94,246,VAL)",   // primary purple
  "rgba(91,108,255,VAL)",   // accent blue-purple
  "rgba(167,139,250,VAL)",  // soft lavender
  "rgba(215,199,163,VAL)",  // warm beige
  "rgba(196,181,253,VAL)",  // pale purple
];

interface Dot {
  x: number; y: number;
  vx: number; vy: number;
  r: number; opacity: number;
  color: string; phase: number; speed: number;
}

export function PageParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0;
    let dots: Dot[] = [];
    let mouse = { x: -1000, y: -1000 };
    let raf: number;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = document.documentElement.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create ~60 ambient floating dots
    const init = () => {
      dots = Array.from({ length: 60 }, () => {
        const col = COLORS[Math.floor(Math.random() * COLORS.length)];
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.18,
          vy: -(Math.random() * 0.2 + 0.06), // gentle upward drift
          r: Math.random() * 2.2 + 0.8,
          opacity: Math.random() * 0.22 + 0.06,
          color: col,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.006 + 0.003,
        };
      });
    };
    init();

    // Track mouse for gentle parallax
    const onMove = (e: MouseEvent) => {
      mouse = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", onMove);

    let t = 0;
    const draw = () => {
      t += 0.016;
      ctx.clearRect(0, 0, width, height);

      for (const d of dots) {
        // Gentle sinusoidal wander
        d.x += d.vx + Math.sin(t * d.speed + d.phase) * 0.12;
        d.y += d.vy;

        // Subtle mouse repulsion (soft, elegant)
        const scrollY = window.scrollY;
        const dx = d.x - mouse.x;
        const dy = d.y - (mouse.y);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (1 - dist / 120) * 0.4;
          d.x += (dx / dist) * force;
          d.y += (dy / dist) * force;
        }

        // Wrap around edges
        if (d.y < -10) { d.y = height + 10; d.x = Math.random() * width; }
        if (d.x < -10) d.x = width + 10;
        if (d.x > width + 10) d.x = -10;

        // Draw dot — soft filled circle with gentle pulse
        const pulse = 1 + Math.sin(t * 1.2 + d.phase) * 0.15;
        const finalR = d.r * pulse;
        const finalOp = d.opacity * (0.85 + Math.sin(t * 0.8 + d.phase) * 0.15);

        ctx.beginPath();
        ctx.arc(d.x, d.y, finalR, 0, Math.PI * 2);
        ctx.fillStyle = d.color.replace("VAL", String(finalOp));
        ctx.fill();
      }

      // Draw faint connection lines between nearby dots (like a constellation)
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.04;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(109,94,246,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}
