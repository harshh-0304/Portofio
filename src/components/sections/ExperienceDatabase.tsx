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
  INTERNSHIP: {
    text: "text-cyan-400",
    border: "border-cyan-400/30",
    bg: "bg-cyan-400/5",
  },
  CONTRACT: {
    text: "text-violet-400",
    border: "border-violet-400/30",
    bg: "bg-violet-400/5",
  },
  "AI ENGINEERING": {
    text: "text-amber-400",
    border: "border-amber-400/30",
    bg: "bg-amber-400/5",
  },
  BACKEND: {
    text: "text-emerald-400",
    border: "border-emerald-400/30",
    bg: "bg-emerald-400/5",
  },
};

export default function ExperienceDatabase() {
  const [selected, setSelected] = useState<(typeof experiences)[0] | null>(null);

  return (
    <section className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">SECTION 02</span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono neon-cyan">EXPERIENCE</h2>
          <p className="text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            WORK HISTORY — CLICK ANY ENTRY FOR FULL DETAILS
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[19px] top-0 bottom-0 w-px"
            style={{ background: "linear-gradient(180deg, rgba(0,212,255,0.4) 0%, rgba(0,212,255,0.05) 100%)" }}
          />

          <div className="space-y-6">
            {experiences.map((exp, i) => {
              const bs = badgeStyle[exp.badge] ?? badgeStyle.INTERNSHIP;
              const isActive = exp.status === "ACTIVE";

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative pl-14"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-5 flex items-center justify-center">
                    <motion.div
                      className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{
                        background: isActive
                          ? "rgba(0,255,136,0.1)"
                          : "rgba(0,212,255,0.08)",
                        border: isActive
                          ? "1.5px solid rgba(0,255,136,0.4)"
                          : "1.5px solid rgba(0,212,255,0.25)",
                      }}
                    >
                      <Briefcase
                        size={14}
                        className={isActive ? "text-green-400" : "text-cyan-500/60"}
                      />
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-full"
                          style={{ border: "1px solid rgba(0,255,136,0.3)" }}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0, 0.6] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    onClick={() => setSelected(exp)}
                    className="jarvis-panel rounded-xl p-5 cursor-pointer group relative overflow-hidden"
                    whileHover={{ y: -2, borderColor: "rgba(0,212,255,0.35)" }}
                    style={{ transition: "all 0.25s ease" }}
                  >
                    {/* Active glow */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-xl pointer-events-none"
                        animate={{
                          boxShadow: [
                            "inset 0 0 0px rgba(0,255,136,0)",
                            "inset 0 0 18px rgba(0,255,136,0.04)",
                            "inset 0 0 0px rgba(0,255,136,0)",
                          ],
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                    )}

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Code */}
                        <div className="text-xs font-mono text-cyan-500/35 tracking-widest mb-1">
                          {exp.code}
                        </div>

                        {/* Title + Company */}
                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 mb-1">
                          <h3 className="text-base font-bold font-mono text-cyan-100 group-hover:text-cyan-300 transition-colors">
                            {exp.title}
                          </h3>
                          <span className="text-sm font-mono text-cyan-400/60">
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
                              <ExternalLink size={11} />
                            </a>
                          )}
                        </div>

                        {/* Period + type */}
                        <div className="flex items-center gap-3 text-xs font-mono text-cyan-500/35 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar size={10} />
                            {exp.period}
                          </span>
                          <span>·</span>
                          <span>{exp.type}</span>
                        </div>

                        {/* Summary */}
                        <p className="text-xs font-mono text-cyan-400/50 leading-relaxed mb-3">
                          {exp.summary}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {exp.stack.slice(0, 5).map((tech) => (
                            <span
                              key={tech}
                              className="text-xs font-mono px-2 py-0.5 rounded"
                              style={{
                                background: "rgba(0,212,255,0.06)",
                                border: "1px solid rgba(0,212,255,0.14)",
                                color: "rgba(0,212,255,0.65)",
                              }}
                            >
                              {tech}
                            </span>
                          ))}
                          {exp.stack.length > 5 && (
                            <span className="text-xs font-mono text-cyan-500/30">
                              +{exp.stack.length - 5}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Right: badge + status */}
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span
                          className={`text-xs font-mono px-2 py-0.5 rounded-sm border tracking-wider ${bs.text} ${bs.border} ${bs.bg}`}
                        >
                          {exp.badge}
                        </span>
                        <span
                          className={`text-xs font-mono flex items-center gap-1 ${
                            isActive ? "text-green-400" : "text-cyan-400/60"
                          }`}
                        >
                          <motion.span
                            className="w-1.5 h-1.5 rounded-full inline-block"
                            style={{ background: isActive ? "#00FF88" : "#00D4FF" }}
                            animate={isActive ? { opacity: [1, 0.3, 1] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                          {exp.status}
                        </span>
                        <span className="text-[10px] font-mono text-cyan-500/25 flex items-center gap-1">
                          VIEW DETAILS
                          <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>

                    {/* Bottom line */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-cyan-500/35 to-transparent"
                      initial={{ width: "0%" }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.4 }}
                    />
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 cmd-overlay"
              onClick={() => setSelected(null)}
            />

            <motion.div
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl"
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
                      {selected.code} · {selected.type}
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
                      <div className="text-xs font-mono text-cyan-500/35 tracking-wider mb-1">
                        {m.label}
                      </div>
                      <div className="text-sm font-mono text-cyan-300 font-bold">
                        {m.value}
                      </div>
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
                  <div className="text-xs font-mono text-cyan-500/45 tracking-widest mb-3">
                    TECH STACK
                  </div>
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
                  style={{
                    background: "rgba(0,255,136,0.04)",
                    border: "1px solid rgba(0,255,136,0.13)",
                  }}
                >
                  <div className="text-xs font-mono text-green-400/45 tracking-widest mb-1.5">
                    SUMMARY
                  </div>
                  <div className="text-sm font-mono text-green-400/75">{selected.summary}</div>
                </div>
              </div>

              <div className="absolute bottom-4 right-4 w-5 h-5 corner-br" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
