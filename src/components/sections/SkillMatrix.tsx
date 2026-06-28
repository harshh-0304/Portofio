"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Server,
  Monitor,
  Database,
  Brain,
  Wrench,
  Code2,
  LucideIcon,
} from "lucide-react";
import { skills } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = {
  Server,
  Monitor,
  Database,
  Brain,
  Wrench,
  Code2,
};

export default function SkillMatrix() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setAnimated(true), 200);
    }
  }, [isInView]);

  const activeSkills = skills[activeCategory];

  return (
    <section ref={ref} className="py-24 px-4">
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
              SECTION 04
            </span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono neon-cyan">
            SKILL MATRIX
          </h2>
          <p className="text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            RUNNING SYSTEM ANALYSIS — SELECT CATEGORY
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Category tabs */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {skills.map((skill, i) => {
              const Icon = iconMap[skill.icon] ?? Server;
              const isActive = i === activeCategory;

              return (
                <motion.button
                  key={skill.category}
                  onClick={() => {
                    setActiveCategory(i);
                    setAnimated(false);
                    setTimeout(() => setAnimated(true), 50);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all"
                  style={{
                    background: isActive
                      ? "rgba(0,212,255,0.1)"
                      : "rgba(0,212,255,0.02)",
                    border: isActive
                      ? "1px solid rgba(0,212,255,0.4)"
                      : "1px solid rgba(0,212,255,0.08)",
                    boxShadow: isActive
                      ? "0 0 20px rgba(0,212,255,0.1)"
                      : "none",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                    style={{
                      background: isActive
                        ? "rgba(0,212,255,0.15)"
                        : "rgba(0,212,255,0.05)",
                    }}
                  >
                    <Icon
                      size={16}
                      className={isActive ? "text-cyan-400" : "text-cyan-500/40"}
                    />
                  </div>
                  <div>
                    <div
                      className={`text-sm font-mono font-bold tracking-wider ${
                        isActive ? "text-cyan-300" : "text-cyan-500/50"
                      }`}
                    >
                      {skill.category.toUpperCase()}
                    </div>
                    <div className="text-xs font-mono text-cyan-500/30">
                      {skill.items.length} MODULES
                    </div>
                  </div>

                  {isActive && (
                    <motion.div
                      className="ml-auto w-1 h-6 rounded-full bg-cyan-400"
                      layoutId="active-tab"
                      style={{
                        boxShadow: "0 0 8px rgba(0,212,255,0.6)",
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          {/* Skill bars */}
          <motion.div
            className="lg:col-span-2 jarvis-panel rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/10">
              <div className="w-8 h-8 rounded flex items-center justify-center bg-cyan-500/10">
                {(() => {
                  const Icon = iconMap[activeSkills.icon] ?? Server;
                  return <Icon size={16} className="text-cyan-400" />;
                })()}
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-cyan-300 tracking-wider">
                  {activeSkills.category.toUpperCase()} MODULE
                </div>
                <div className="text-xs font-mono text-cyan-500/40 tracking-widest">
                  SCANNING {activeSkills.items.length} CAPABILITIES
                </div>
              </div>
              <div className="ml-auto text-xs font-mono text-cyan-500/30 tracking-widest">
                PROFICIENCY ANALYSIS
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-5">
              {activeSkills.items.map((item, i) => (
                <motion.div
                  key={`${activeSkills.category}-${item.name}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-cyan-200/80 tracking-wider">
                      {item.name}
                    </span>
                    <span className="text-xs font-mono text-cyan-500/60 tabular-nums">
                      {item.level}%
                    </span>
                  </div>

                  {/* Bar track */}
                  <div className="h-1.5 rounded-full skill-bar-track relative overflow-hidden">
                    {/* Animated fill */}
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        background:
                          item.level >= 90
                            ? "linear-gradient(90deg, #00FF88, #00D4FF)"
                            : item.level >= 80
                            ? "linear-gradient(90deg, #00D4FF, #0ea5e9)"
                            : "linear-gradient(90deg, rgba(0,212,255,0.7), rgba(0,212,255,0.4))",
                        boxShadow:
                          item.level >= 90
                            ? "0 0 8px rgba(0,255,136,0.5)"
                            : "0 0 8px rgba(0,212,255,0.4)",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: animated ? `${item.level}%` : 0 }}
                      transition={{
                        duration: 1.2,
                        delay: i * 0.1,
                        ease: "easeOut",
                      }}
                    />

                    {/* Shimmer */}
                    <motion.div
                      className="absolute top-0 h-full w-8 rounded-full opacity-60"
                      style={{
                        background:
                          "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                      }}
                      animate={{
                        left: ["-10%", `${item.level + 5}%`],
                      }}
                      transition={{
                        duration: 1.5,
                        delay: i * 0.1 + 0.8,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-4 border-t border-cyan-500/10 flex items-center gap-6">
              {[
                { color: "from-green-400 to-cyan-400", label: "Expert (90%+)" },
                { color: "from-cyan-400 to-blue-400", label: "Advanced (80%+)" },
                { color: "from-cyan-400/70 to-cyan-400/40", label: "Proficient" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <div className={`w-6 h-1 rounded-full bg-gradient-to-r ${l.color}`} />
                  <span className="text-xs font-mono text-cyan-500/40">{l.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
