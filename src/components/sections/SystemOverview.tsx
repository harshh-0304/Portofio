"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { metrics } from "@/lib/data";

function AnimatedCounter({
  target,
  suffix,
  started,
}: {
  target: number;
  suffix: string;
  started: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), target));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span>
      {current}
      {suffix}
    </span>
  );
}

export default function SystemOverview() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Hidden on mobile — stats already shown in HeroProfile
  return (
    <div className="hidden lg:block">
      <section ref={ref} className="py-16 md:py-24 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan-500/50" />
              <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">
                SECTION 01
              </span>
              <div className="h-px flex-1 bg-cyan-500/20" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-mono neon-cyan">
              SYSTEM OVERVIEW
            </h2>
            <p className="text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
              ANALYZING ENGINEER PARAMETERS...
            </p>
          </motion.div>

          {/* Metrics grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, i) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ scale: 1.03 }}
                className="jarvis-panel rounded-xl p-6 relative overflow-hidden group hud-card cursor-default"
              >
                {/* Background number */}
                <div
                  className="absolute -right-4 -bottom-4 text-8xl font-bold font-mono opacity-5 text-cyan-400 select-none"
                  style={{ lineHeight: 1 }}
                >
                  {metric.value}
                </div>

                {/* Corner decoration */}
                <div
                  className="absolute top-0 right-0 w-6 h-6"
                  style={{
                    borderTop: "1px solid rgba(0,212,255,0.4)",
                    borderRight: "1px solid rgba(0,212,255,0.4)",
                  }}
                />

                {/* Index */}
                <div className="text-xs font-mono text-cyan-500/30 tracking-widest mb-4">
                  SYS.{String(i + 1).padStart(2, "0")}
                </div>

                {/* Value */}
                <div className="text-4xl md:text-5xl font-bold font-mono neon-cyan mb-2">
                  <AnimatedCounter
                    target={metric.value}
                    suffix={metric.suffix}
                    started={isInView}
                  />
                </div>

                {/* Label */}
                <div className="text-xs font-mono text-cyan-400/60 tracking-widest uppercase">
                  {metric.label}
                </div>

                {/* Progress line */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(0,212,255,0.6), transparent)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: i * 0.15 + 0.5 }}
                />
              </motion.div>
            ))}
          </div>

          {/* Additional info bar */}
          <motion.div
            className="mt-8 jarvis-panel rounded-lg p-4 flex flex-wrap justify-between gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {[
              { label: "AVAILABILITY", value: "IMMEDIATE", color: "text-green-400" },
              { label: "TIMEZONE", value: "IST (UTC+5:30)", color: "text-cyan-400" },
              { label: "WORK MODE", value: "REMOTE / HYBRID / ONSITE", color: "text-cyan-400" },
              { label: "EXPERTISE", value: "FULL STACK + AI", color: "text-cyan-400" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-xs font-mono text-cyan-500/30 tracking-widest mb-1">
                  {item.label}
                </div>
                <div className={`text-sm font-mono font-bold ${item.color} tracking-wider`}>
                  {item.value}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
