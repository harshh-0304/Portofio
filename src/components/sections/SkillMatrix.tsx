"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Server, Monitor, Database, Brain, Wrench, Code2, LucideIcon, ChevronRight } from "lucide-react";
import { skills } from "@/lib/data";

const iconMap: Record<string, LucideIcon> = { Server, Monitor, Database, Brain, Wrench, Code2 };

/* ─── Mobile accordion item ─── */
function MobileSkillGroup({ skill, defaultOpen }: { skill: (typeof skills)[0]; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = iconMap[skill.icon] ?? Server;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 min-h-[56px]"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: open ? "rgba(0,212,255,0.12)" : "rgba(0,212,255,0.04)" }}
          >
            <Icon size={15} className={open ? "text-cyan-400" : "text-white/30"} />
          </div>
          <div className="text-left">
            <div className={`text-sm font-mono font-semibold ${open ? "text-cyan-300" : "text-white/50"}`}>
              {skill.category}
            </div>
            <div className="text-[10px] text-white/25 font-sans">{skill.items.length} skills</div>
          </div>
        </div>
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.18 }}>
          <ChevronRight size={14} className="text-white/25" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div
              className="px-4 pb-4 pt-2 space-y-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
            >
              {skill.items.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-white/70 font-sans">{item.name}</span>
                  </div>
                  <div
                    className="h-1 rounded-full relative overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{ background: "rgba(0,212,255,0.55)" }}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.level}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Desktop tab panel (original) ─── */
export default function SkillMatrix() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) setTimeout(() => setAnimated(true), 200);
  }, [isInView]);

  const activeSkills = skills[activeCategory];

  return (
    <section ref={ref} className="py-12 md:py-24 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-7 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="hidden md:flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">SECTION 04</span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <p className="mobile-section-label md:hidden mb-2">Skills</p>
          <h2 className="text-2xl md:text-4xl font-bold font-mono neon-cyan">
            <span className="md:hidden">Skills</span>
            <span className="hidden md:inline">SKILL MATRIX</span>
          </h2>
          <p className="hidden md:block text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            RUNNING SYSTEM ANALYSIS — SELECT CATEGORY
          </p>
          <p className="md:hidden text-sm text-white/30 mt-1">Tap a category to expand</p>
        </motion.div>

        {/* ── MOBILE: accordion ── */}
        <div className="lg:hidden space-y-2">
          {skills.map((skill, i) => (
            <MobileSkillGroup key={skill.category} skill={skill} defaultOpen={i <= 1} />
          ))}
        </div>

        {/* ── DESKTOP: sidebar tabs + bars ── */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
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
                  onClick={() => { setActiveCategory(i); setAnimated(false); setTimeout(() => setAnimated(true), 50); }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all"
                  style={{
                    background: isActive ? "rgba(0,212,255,0.1)" : "rgba(0,212,255,0.02)",
                    border: isActive ? "1px solid rgba(0,212,255,0.4)" : "1px solid rgba(0,212,255,0.08)",
                    boxShadow: isActive ? "0 0 20px rgba(0,212,255,0.1)" : "none",
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-8 h-8 rounded flex items-center justify-center shrink-0"
                    style={{ background: isActive ? "rgba(0,212,255,0.15)" : "rgba(0,212,255,0.05)" }}
                  >
                    <Icon size={16} className={isActive ? "text-cyan-400" : "text-cyan-500/40"} />
                  </div>
                  <div>
                    <div className={`text-sm font-mono font-bold tracking-wider ${isActive ? "text-cyan-300" : "text-cyan-500/50"}`}>
                      {skill.category.toUpperCase()}
                    </div>
                    <div className="text-xs font-mono text-cyan-500/30">{skill.items.length} MODULES</div>
                  </div>
                  {isActive && (
                    <motion.div
                      className="ml-auto w-1 h-6 rounded-full bg-cyan-400"
                      layoutId="active-tab"
                      style={{ boxShadow: "0 0 8px rgba(0,212,255,0.6)" }}
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
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-500/10">
              <div className="w-8 h-8 rounded flex items-center justify-center bg-cyan-500/10">
                {(() => { const Icon = iconMap[activeSkills.icon] ?? Server; return <Icon size={16} className="text-cyan-400" />; })()}
              </div>
              <div>
                <div className="text-sm font-mono font-bold text-cyan-300 tracking-wider">{activeSkills.category.toUpperCase()} MODULE</div>
                <div className="text-xs font-mono text-cyan-500/40 tracking-widest">SCANNING {activeSkills.items.length} CAPABILITIES</div>
              </div>
              <div className="ml-auto text-xs font-mono text-cyan-500/30 tracking-widest">PROFICIENCY ANALYSIS</div>
            </div>
            <div className="space-y-5">
              {activeSkills.items.map((item, i) => (
                <motion.div
                  key={`${activeSkills.category}-${item.name}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-mono text-cyan-200/80 tracking-wider">{item.name}</span>
                    <span className="text-xs font-mono text-cyan-500/60 tabular-nums">{item.level}%</span>
                  </div>
                  <div className="h-1.5 rounded-full skill-bar-track relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 h-full rounded-full"
                      style={{
                        background: item.level >= 90
                          ? "linear-gradient(90deg, #00FF88, #00D4FF)"
                          : item.level >= 80
                          ? "linear-gradient(90deg, #00D4FF, #0ea5e9)"
                          : "linear-gradient(90deg, rgba(0,212,255,0.7), rgba(0,212,255,0.4))",
                        boxShadow: item.level >= 90 ? "0 0 8px rgba(0,255,136,0.5)" : "0 0 8px rgba(0,212,255,0.4)",
                      }}
                      initial={{ width: 0 }}
                      animate={{ width: animated ? `${item.level}%` : 0 }}
                      transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
