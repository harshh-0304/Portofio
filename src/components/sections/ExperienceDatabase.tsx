"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  X,
  ChevronRight,
  CheckCircle,
  Code2,
  ExternalLink,
  Calendar,
} from "lucide-react";
import { experiences } from "@/lib/data";

const badgeStyle: Record<string, { text: string; border: string; bg: string }> = {
  INTERNSHIP: { text: "text-cyan-400", border: "border-cyan-400/30", bg: "bg-cyan-400/5" },
  CONTRACT: { text: "text-violet-400", border: "border-violet-400/30", bg: "bg-violet-400/5" },
  "AI ENGINEERING": { text: "text-amber-400", border: "border-amber-400/30", bg: "bg-amber-400/5" },
  BACKEND: { text: "text-emerald-400", border: "border-emerald-400/30", bg: "bg-emerald-400/5" },
};

export default function ExperienceDatabase() {
  const [selected, setSelected] = useState<(typeof experiences)[0] | null>(null);

  return (
    <section className="py-12 md:py-24 px-5">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-8 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Desktop section label */}
          <div className="hidden md:flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">SECTION 02</span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          {/* Mobile: plain label */}
          <p className="mobile-section-label md:hidden mb-2">Work Experience</p>
          <h2 className="text-2xl md:text-4xl font-bold font-mono neon-cyan">
            <span className="md:hidden">Experience</span>
            <span className="hidden md:inline">EXPERIENCE</span>
          </h2>
          <p className="hidden md:block text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            WORK HISTORY — CLICK ANY ENTRY FOR FULL DETAILS
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, rgba(0,212,255,0.3) 0%, rgba(0,212,255,0.03) 100%)" }}
          />

          <div className="space-y-4 md:space-y-6">
            {experiences.map((exp, i) => {
              const bs = badgeStyle[exp.badge] ?? badgeStyle.INTERNSHIP;
              const isActive = exp.status === "ACTIVE";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative pl-10 md:pl-14"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-4 flex items-center justify-center">
                    <div
                      className="w-7 h-7 md:w-9 md:h-9 rounded-full flex items-center justify-center"
                      style={{
                        background: isActive ? "rgba(0,255,136,0.08)" : "rgba(0,212,255,0.06)",
                        border: isActive ? "1px solid rgba(0,255,136,0.3)" : "1px solid rgba(0,212,255,0.18)",
                      }}
                    >
                      <Briefcase
                        size={12}
                        className={isActive ? "text-green-400" : "text-cyan-500/50"}
                      />
                    </div>
                  </div>

                  {/* Card — Betorra gets left accent */}
                  <motion.div
                    onClick={() => setSelected(exp)}
                    className="jarvis-panel rounded-xl p-4 md:p-5 cursor-pointer group relative overflow-hidden"
                    style={{
                      borderLeft: isActive ? "2px solid rgba(0,255,136,0.35)" : undefined,
                    }}
                    whileHover={{ y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Title + Company */}
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                          <h3 className="text-sm md:text-base font-bold font-mono text-white/90 group-hover:text-cyan-300 transition-colors">
                            {exp.title}
                          </h3>
                          <span className="text-xs font-mono text-white/40">
                            · {exp.company}
                          </span>
                          {exp.url && (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-cyan-500/30 hover:text-cyan-400/70 transition-colors"
                            >
                              <ExternalLink size={10} />
                            </a>
                          )}
                        </div>

                        {/* Period */}
                        <div className="flex items-center gap-2 text-[11px] font-mono text-white/30 mb-2.5">
                          <Calendar size={9} />
                          {exp.period} · {exp.type}
                        </div>

                        {/* Summary — more readable on mobile */}
                        <p className="text-xs md:text-xs text-white/50 leading-relaxed mb-3">
                          {exp.summary}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {exp.stack.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] font-mono px-2 py-0.5 rounded"
                              style={{
                                background: "rgba(0,212,255,0.05)",
                                border: "1px solid rgba(0,212,255,0.12)",
                                color: "rgba(0,212,255,0.6)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                          {exp.stack.length > 4 && (
                            <span className="text-[10px] font-mono text-white/25">
                              +{exp.stack.length - 4}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: status + badge */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded border tracking-wide ${bs.text} ${bs.border} ${bs.bg}`}
                        >
                          {exp.badge}
                        </span>
                        <span
                          className={`text-[10px] font-mono flex items-center gap-1 ${
                            isActive ? "text-green-400" : "text-white/30"
                          }`}
                        >
                          <span
                            className="w-1 h-1 rounded-full inline-block"
                            style={{ background: isActive ? "#00FF88" : "rgba(255,255,255,0.3)" }}
                          />
                          {exp.status}
                        </span>
                        <ChevronRight
                          size={12}
                          className="text-white/20 group-hover:text-cyan-400/60 transition-colors mt-1"
                        />
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 cmd-overlay"
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(0,20,40,0.98) 0%, rgba(3,10,14,0.98) 100%)",
                border: "1px solid rgba(0,212,255,0.25)",
                boxShadow: "0 0 60px rgba(0,212,255,0.08)",
              }}
              initial={{ scale: 0.92, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 16, opacity: 0 }}
              transition={{ type: "spring", damping: 22, stiffness: 320 }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.6) 50%, transparent)",
                }}
              />

              <div className="p-7">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-xs font-mono text-cyan-500/40 tracking-[0.3em] mb-2">
                      {selected.type}
                    </div>
                    <h3 className="text-2xl font-bold font-mono neon-cyan mb-0.5">
                      {selected.title}
                    </h3>
                    <div className="flex items-center gap-2 font-mono text-cyan-400/65 text-base">
                      {selected.company}
                      {selected.url && (
                        <a
                          href={selected.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-500/40 hover:text-cyan-400 transition-colors"
                        >
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-lg hover:bg-cyan-500/10 text-cyan-500/50 hover:text-cyan-400 transition-all"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: "PERIOD", value: selected.period },
                    { label: "TYPE", value: selected.type },
                    { label: "STATUS", value: selected.status },
                  ].map((m) => (
                    <div key={m.label} className="jarvis-panel rounded-lg p-3 text-center">
                      <div className="text-xs font-mono text-cyan-500/35 tracking-wider mb-1">{m.label}</div>
                      <div className="text-sm font-mono text-cyan-300 font-bold">{m.value}</div>
                    </div>
                  ))}
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3 text-xs font-mono text-cyan-500/45 tracking-widest">
                    <Code2 size={11} />
                    RESPONSIBILITIES
                  </div>
                  <div className="space-y-2">
                    {selected.responsibilities.map((r, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-start gap-3 text-sm text-cyan-100/65"
                      >
                        <ChevronRight size={13} className="text-cyan-500/40 mt-0.5 shrink-0" />
                        {r}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3 text-xs font-mono text-cyan-500/45 tracking-widest">
                    <CheckCircle size={11} className="text-green-400/60" />
                    HIGHLIGHTS
                  </div>
                  <div className="space-y-2">
                    {selected.highlights.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 + i * 0.06 }}
                        className="flex items-start gap-3 text-sm text-green-400/75"
                      >
                        <CheckCircle size={13} className="text-green-400/50 mt-0.5 shrink-0" />
                        {h}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div className="mb-5">
                  <div className="text-xs font-mono text-cyan-500/45 tracking-widest mb-3">TECH STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.stack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-3 py-1 rounded"
                        style={{
                          background: "rgba(0,212,255,0.07)",
                          border: "1px solid rgba(0,212,255,0.18)",
                          color: "#00D4FF",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                <div
                  className="rounded-lg p-4"
                  style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.13)" }}
                >
                  <div className="text-xs font-mono text-green-400/45 tracking-widest mb-1.5">SUMMARY</div>
                  <div className="text-sm font-mono text-green-400/75">{selected.summary}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
