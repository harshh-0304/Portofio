"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HUDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip canvas animation entirely on mobile — too expensive
    if (window.innerWidth < 1024) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Fewer particles on desktop too (40 → was 60)
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
    }[] = [];

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.08,
      });
    }

    let animId: number;
    let lastTime = 0;
    const FPS = 30; // cap to 30fps — halves GPU load
    const interval = 1000 / FPS;

    const draw = (timestamp: number) => {
      animId = requestAnimationFrame(draw);
      if (timestamp - lastTime < interval) return;
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();
      });

      // Connection lines — reduced distance threshold
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach((b) => {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      {/* Particle canvas — desktop only */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 hidden lg:block"
        style={{ opacity: 0.6 }}
      />

      {/* Grid background — desktop only (animated, expensive on mobile) */}
      <div className="fixed inset-0 pointer-events-none z-0 hud-grid hidden lg:block" />

      {/* Radial vignette — always, cheap */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(3, 10, 14, 0.8) 100%)",
        }}
      />

      {/* Top glow bar — always, 1px element */}
      <div
        className="fixed top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(0,212,255,0.5) 30%, rgba(0,212,255,0.8) 50%, rgba(0,212,255,0.5) 70%, transparent)",
          boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
        }}
      />

      {/* Scan line — desktop only (continuous animation) */}
      <div className="scan-line hidden lg:block" />

      {/* Corner HUD elements — desktop only */}
      <motion.div
        className="fixed top-20 left-4 pointer-events-none z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="corner-tl w-8 h-8 absolute top-0 left-0" />
        <div className="font-mono text-xs text-cyan-500/30 mt-10 ml-1 tracking-widest">
          <div>SYS.ONLINE</div>
          <div className="mt-0.5">NODE.ALPHA</div>
        </div>
      </motion.div>

      <motion.div
        className="fixed top-20 right-4 pointer-events-none z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="corner-tr w-8 h-8 absolute top-0 right-0" />
        <div className="font-mono text-xs text-cyan-500/30 mt-10 mr-1 text-right tracking-widest">
          <div>JARVIS v4.2</div>
          <div className="mt-0.5">SECURE</div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-20 left-4 pointer-events-none z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="corner-bl w-8 h-8 absolute bottom-0 left-0" />
        <div className="font-mono text-xs text-cyan-500/30 mb-10 ml-1 tracking-widest">
          <div>LOCATION: INDIA</div>
          <div className="mt-0.5">STATUS: AVAILABLE FOR HIRE</div>
        </div>
      </motion.div>

      <motion.div
        className="fixed bottom-20 right-4 pointer-events-none z-10 hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <div className="corner-br w-8 h-8 absolute bottom-0 right-0" />
        <div className="font-mono text-xs text-cyan-500/30 mb-10 mr-1 text-right tracking-widest">
          <div>GUJARAT.IN</div>
          <div className="mt-0.5">AVAILABLE</div>
        </div>
      </motion.div>
    </>
  );
}
