"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { bootLines, profile } from "@/lib/data";

interface Props {
  onComplete: () => void;
}

export default function BootSequence({ onComplete }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"scanning" | "booting" | "complete">("scanning");
  const [scanComplete, setScanComplete] = useState(false);
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (skipped) return;

    // Phase 1: scan photo for 1.8s, then start booting
    const scanTimer = setTimeout(() => {
      setScanComplete(true);
      setPhase("booting");
    }, 1800);

    return () => clearTimeout(scanTimer);
  }, [skipped]);

  useEffect(() => {
    if (phase !== "booting" || skipped) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i]);
          setProgress(Math.round(((i + 1) / bootLines.length) * 100));
        }, line.delay)
      );
    });

    // Complete after last line + 0.6s pause
    timers.push(
      setTimeout(() => {
        setPhase("complete");
      }, bootLines[bootLines.length - 1].delay + 600)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase, skipped]);

  useEffect(() => {
    if (phase !== "complete" || skipped) return;

    const timer = setTimeout(() => {
      onComplete();
    }, 800);

    return () => clearTimeout(timer);
  }, [phase, onComplete, skipped]);


  const handleSkip = () => {
    setSkipped(true);
    onComplete();
  };

  return (
    <AnimatePresence>
      {!skipped && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center boot-terminal"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.015 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          {/* CRT scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,212,255,0.012) 2px, rgba(0,212,255,0.012) 4px)",
              zIndex: 1,
            }}
          />

          <div className="relative z-10 w-full max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

            {/* LEFT — Photo scanner */}
            <div className="flex flex-col items-center">
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Outer slow ring */}
                <motion.div
                  className="absolute rounded-full border border-cyan-500/20"
                  style={{ inset: "-36px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />

                {/* Dashed fast ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    inset: "-20px",
                    border: "1px dashed rgba(0,212,255,0.35)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Glow ring */}
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    inset: "-8px",
                    border: "1px solid rgba(0,212,255,0.5)",
                    boxShadow: "0 0 20px rgba(0,212,255,0.2), inset 0 0 20px rgba(0,212,255,0.05)",
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Conic sweep */}
                <motion.div
                  className="absolute rounded-full overflow-hidden pointer-events-none"
                  style={{ inset: "-8px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "conic-gradient(from 0deg, transparent 60%, rgba(0,212,255,0.25) 80%, rgba(0,212,255,0.6) 100%)",
                    }}
                  />
                </motion.div>

                {/* Photo container */}
                <div
                  className="relative w-48 h-48 rounded-full overflow-hidden"
                  style={{
                    border: "2px solid rgba(0,212,255,0.4)",
                    boxShadow: "0 0 30px rgba(0,212,255,0.15)",
                  }}
                >
                  <Image
                    src={profile.avatar}
                    alt="Harsh Jadav"
                    fill
                    className="object-cover"
                    priority
                  />

                  {/* Scanning line over photo */}
                  {!scanComplete && (
                    <motion.div
                      className="absolute left-0 right-0 h-0.5 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(0,212,255,0.8) 50%, transparent)",
                        boxShadow: "0 0 8px rgba(0,212,255,0.6)",
                      }}
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                    />
                  )}

                  {/* Cyan overlay tint */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: scanComplete
                        ? "rgba(0,212,255,0.03)"
                        : "rgba(0,212,255,0.08)",
                      transition: "background 0.8s ease",
                    }}
                  />
                </div>

                {/* Corner HUD marks around photo */}
                {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(
                  (pos, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-4 h-4 ${pos}`}
                      style={{
                        borderTop: i < 2 ? "2px solid rgba(0,212,255,0.7)" : "none",
                        borderBottom: i >= 2 ? "2px solid rgba(0,212,255,0.7)" : "none",
                        borderLeft: i % 2 === 0 ? "2px solid rgba(0,212,255,0.7)" : "none",
                        borderRight: i % 2 === 1 ? "2px solid rgba(0,212,255,0.7)" : "none",
                        margin: "-2px",
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    />
                  )
                )}
              </motion.div>

              {/* Identity status below photo */}
              <div className="mt-8 space-y-2 text-center font-mono text-xs">
                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      background: scanComplete ? "#00FF88" : "#00D4FF",
                    }}
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-cyan-400/60 tracking-widest">
                    {scanComplete ? "IDENTITY CONFIRMED" : "SCANNING IDENTITY..."}
                  </span>
                </motion.div>

                <AnimatePresence>
                  {scanComplete && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-1"
                    >
                      <div className="text-green-400/70 tracking-widest">✓ HARSH JADAV</div>
                      <div className="text-cyan-500/40 tracking-wider">BACKEND ENGINEER</div>
                      <div className="text-cyan-500/30 tracking-wider">AHMEDABAD, INDIA</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* RIGHT — Terminal */}
            <div className="w-full">
              {/* Terminal window */}
              <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(0,212,255,0.2)" }}>
                {/* Title bar */}
                <div
                  className="flex items-center gap-2 px-4 py-3"
                  style={{ borderBottom: "1px solid rgba(0,212,255,0.12)", background: "rgba(0,212,255,0.04)" }}
                >
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="ml-2 text-xs font-mono text-cyan-500/40 tracking-widest">
                    HARSH.OS // SECURE.TERMINAL
                  </span>
                </div>

                {/* Log output */}
                <div className="p-5 min-h-[260px] font-mono text-sm space-y-1.5">
                  <AnimatePresence>
                    {!scanComplete && (
                      <motion.div
                        className="text-cyan-400/50 text-xs tracking-widest"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        {">"} VERIFYING ENGINEER IDENTITY...
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {bootLines.map((line, i) =>
                    visibleLines.includes(i) ? (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2 }}
                        className={
                          i === bootLines.length - 1
                            ? "neon-green font-bold text-base tracking-widest mt-3"
                            : i === bootLines.length - 2
                            ? "text-cyan-300 tracking-widest"
                            : "text-cyan-500/60"
                        }
                      >
                        {i < bootLines.length - 2 && (
                          <span className="text-cyan-500/30 mr-2">{">"}</span>
                        )}
                        {i === bootLines.length - 2 && (
                          <span className="text-cyan-400/50 mr-2">{"✓"}</span>
                        )}
                        {i === bootLines.length - 1 && (
                          <span className="text-green-400 mr-2">{"✓"}</span>
                        )}
                        {line.text}
                        {i === visibleLines[visibleLines.length - 1] &&
                          phase === "booting" && (
                            <span className="inline-block w-2 h-[1em] bg-cyan-400 ml-1 align-middle animate-pulse" />
                          )}
                      </motion.div>
                    ) : null
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-mono text-cyan-500/40 mb-1.5 tracking-widest">
                  <span>SYSTEM LOAD</span>
                  <span className="tabular-nums">{progress}%</span>
                </div>
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.1)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #00D4FF, #00FF88)",
                      boxShadow: "0 0 10px rgba(0,212,255,0.5)",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* System diagnostics */}
              <motion.div
                className="mt-4 grid grid-cols-3 gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                {[
                  { label: "CPU", value: "OK" },
                  { label: "MEM", value: "OK" },
                  { label: "NET", value: "OK" },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="text-center py-1.5 rounded font-mono text-xs"
                    style={{
                      background: "rgba(0,255,136,0.04)",
                      border: "1px solid rgba(0,255,136,0.12)",
                    }}
                  >
                    <div className="text-green-400/40 tracking-wider">{d.label}</div>
                    <div className="text-green-400/70 font-bold tracking-widest">{d.value}</div>
                  </div>
                ))}
              </motion.div>

              {/* Skip */}
              <motion.button
                onClick={handleSkip}
                className="mt-5 block w-full text-xs font-mono text-cyan-500/25 hover:text-cyan-500/60 transition-colors tracking-widest text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                [ CLICK TO SKIP ]
              </motion.button>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-5 left-5 w-8 h-8 corner-tl pointer-events-none" />
          <div className="absolute top-5 right-5 w-8 h-8 corner-tr pointer-events-none" />
          <div className="absolute bottom-5 left-5 w-8 h-8 corner-bl pointer-events-none" />
          <div className="absolute bottom-5 right-5 w-8 h-8 corner-br pointer-events-none" />

          {/* Bottom info strip */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-xs font-mono text-cyan-500/20 tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>HARSH.OS v1.0</span>
            <span>AES-256 ENCRYPTED</span>
            <span>AHMEDABAD · INDIA</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
