"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, X, Globe, ChevronRight } from "lucide-react";
import { projects } from "@/lib/data";

const colorMap: Record<string, { accent: string; bg: string; border: string; glow: string }> = {
  cyan:   { accent: "#00D4FF", bg: "rgba(0,212,255,0.05)",   border: "rgba(0,212,255,0.2)",   glow: "rgba(0,212,255,0.15)" },
  emerald:{ accent: "#00FF88", bg: "rgba(0,255,136,0.05)",   border: "rgba(0,255,136,0.2)",   glow: "rgba(0,255,136,0.15)" },
  violet: { accent: "#7B61FF", bg: "rgba(123,97,255,0.05)",  border: "rgba(123,97,255,0.2)",  glow: "rgba(123,97,255,0.15)" },
  amber:  { accent: "#FFB800", bg: "rgba(255,184,0,0.05)",   border: "rgba(255,184,0,0.2)",   glow: "rgba(255,184,0,0.15)" },
};

const statusBadge: Record<string, string> = {
  LIVE:  "text-green-400 bg-green-400/10 border-green-400/30",
  BUILT: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
};

export default function ProjectArchive() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  const featured = projects.filter((p) => p.featured);
  const others   = projects.filter((p) => !p.featured);

  return (
    <section className="py-12 md:py-24 px-5">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          className="mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="hidden md:flex items-center gap-3 mb-3">
            <div className="h-px flex-1 max-w-[60px] bg-gradient-to-r from-transparent to-cyan-500/50" />
            <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">SECTION 03</span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <p className="mobile-section-label md:hidden mb-2">Projects</p>
          <h2 className="text-2xl md:text-4xl font-bold font-mono neon-cyan">
            <span className="md:hidden">Featured Work</span>
            <span className="hidden md:inline">PROJECTS</span>
          </h2>
          <p className="hidden md:block text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            PORTFOLIO — CLICK ANY PROJECT FOR DETAILS
          </p>
        </motion.div>

        {/* ── MOBILE: Featured projects as dominant cards ── */}
        <div className="lg:hidden space-y-4 mb-6">
          {featured.map((project, i) => {
            const colors = colorMap[project.color] ?? colorMap.cyan;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                onClick={() => setSelected(project)}
                className="relative rounded-2xl overflow-hidden cursor-pointer active:scale-[0.99] transition-transform"
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  borderLeft: `3px solid ${colors.accent}`,
                }}
              >
                <div className="p-5">
                  {/* Header row */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-base font-bold font-mono leading-tight mb-1"
                        style={{ color: colors.accent }}
                      >
                        {project.name}
                      </h3>
                      <div className="text-xs text-white/40 font-sans">{project.category}</div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 ml-3 shrink-0">
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusBadge[project.status]}`}>
                        {project.status}
                      </span>
                      {project.url && (
                        <div className="flex items-center gap-1 text-[10px] font-mono" style={{ color: `${colors.accent}60` }}>
                          <Globe size={9} /><span>live</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description — always shown for featured */}
                  <p className="text-sm text-white/55 leading-relaxed mb-3">
                    {project.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-2 py-0.5 rounded"
                        style={{
                          background: `${colors.accent}0d`,
                          border: `1px solid ${colors.accent}25`,
                          color: `${colors.accent}90`,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] font-mono text-white/25">+{project.tech.length - 4}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono" style={{ color: `${colors.accent}60` }}>
                      {project.highlight}
                    </span>
                    <ChevronRight size={14} style={{ color: `${colors.accent}50` }} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── MOBILE: Other projects as minimal chip list ── */}
        <div className="lg:hidden mb-2">
          <p className="mobile-section-label mb-3">Other Projects</p>
          <div className="space-y-2">
            {others.map((project, i) => {
              const colors = colorMap[project.color] ?? colorMap.cyan;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => setSelected(project)}
                  className="flex items-center justify-between px-4 py-3 rounded-xl cursor-pointer active:scale-[0.99] transition-transform"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colors.accent }} />
                    <div>
                      <div className="text-sm font-mono text-white/75">{project.name}</div>
                      <div className="text-[10px] text-white/30 font-sans">{project.category}</div>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${statusBadge[project.status]}`}>
                    {project.status}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ── DESKTOP: Original grid layout ── */}
        <div className="hidden lg:block">
          {/* Featured label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-cyan-500/40 tracking-widest">FEATURED</span>
            <div className="h-px flex-1 bg-cyan-500/10" />
          </div>

          {/* Featured projects grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {featured.map((project, i) => {
              const colors = colorMap[project.color] ?? colorMap.cyan;
              return (
                <DesktopProjectCard
                  key={project.id}
                  project={project}
                  colors={colors}
                  onClick={() => setSelected(project)}
                  delay={i * 0.12}
                />
              );
            })}
          </div>

          {/* Other projects label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-cyan-500/40 tracking-widest">OTHER PROJECTS</span>
            <div className="h-px flex-1 bg-cyan-500/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {others.map((project, i) => {
              const colors = colorMap[project.color] ?? colorMap.cyan;
              return (
                <DesktopProjectCard
                  key={project.id}
                  project={project}
                  colors={colors}
                  onClick={() => setSelected(project)}
                  delay={i * 0.1}
                  compact
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Detail Modal — shared mobile + desktop */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 cmd-overlay" onClick={() => setSelected(null)} />

            <motion.div
              className="relative w-full max-w-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-xl"
              style={{
                background: "linear-gradient(135deg, rgba(0,20,40,0.98) 0%, rgba(3,10,14,0.98) 100%)",
                border: `1px solid ${colorMap[selected.color]?.accent ?? "#00D4FF"}40`,
                boxShadow: `0 0 60px ${colorMap[selected.color]?.glow ?? "rgba(0,212,255,0.1)"}`,
              }}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{ background: colorMap[selected.color]?.accent ?? "#00D4FF" }}
              />

              <div className="p-7">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-2">{selected.category}</div>
                    <h3 className="text-2xl font-bold font-mono mb-2" style={{ color: colorMap[selected.color]?.accent }}>
                      {selected.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${statusBadge[selected.status]}`}>{selected.status}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-lg hover:bg-cyan-500/10 text-cyan-500/50 hover:text-cyan-400 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {selected.url && (
                  <motion.a
                    href={selected.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-lg mb-6 text-sm font-mono font-medium w-fit"
                    style={{
                      background: `${colorMap[selected.color]?.accent}12`,
                      border: `1px solid ${colorMap[selected.color]?.accent}35`,
                      color: colorMap[selected.color]?.accent,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Globe size={14} />VISIT LIVE SITE<ExternalLink size={12} />
                  </motion.a>
                )}

                <div className="mb-6">
                  <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-2">OVERVIEW</div>
                  <p className="text-sm text-cyan-100/70 leading-relaxed">{selected.description}</p>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-3">KEY FEATURES</div>
                  <div className="space-y-2">
                    {selected.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 text-sm text-cyan-100/70"
                      >
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: colorMap[selected.color]?.accent }} />
                        {f}
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-3">TECH STACK</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.tech.map((t) => (
                      <span
                        key={t}
                        className="text-sm font-mono px-3 py-1.5 rounded"
                        style={{
                          background: `${colorMap[selected.color]?.accent}10`,
                          border: `1px solid ${colorMap[selected.color]?.accent}30`,
                          color: colorMap[selected.color]?.accent,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  className="rounded-lg p-4"
                  style={{
                    background: `${colorMap[selected.color]?.accent}08`,
                    border: `1px solid ${colorMap[selected.color]?.accent}20`,
                  }}
                >
                  <div className="text-xs font-mono tracking-widest mb-1" style={{ color: `${colorMap[selected.color]?.accent}70` }}>HIGHLIGHT</div>
                  <div className="text-sm font-mono font-bold" style={{ color: colorMap[selected.color]?.accent }}>{selected.highlight}</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* Desktop-only card (original design) */
function DesktopProjectCard({
  project,
  colors,
  onClick,
  delay,
  compact = false,
}: {
  project: (typeof projects)[0];
  colors: { accent: string; bg: string; border: string; glow: string };
  onClick: () => void;
  delay: number;
  compact?: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  const statusBadgeLocal: Record<string, string> = {
    LIVE:  "text-green-400 bg-green-400/10 border-green-400/30",
    BUILT: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={onClick}
      className="relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: colors.bg,
        border: `1px solid ${hovered ? colors.accent + "60" : colors.border}`,
        boxShadow: hovered ? `0 0 30px ${colors.glow}` : "none",
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      whileHover={{ y: -4 }}
    >
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: colors.accent }} />

      <div className={compact ? "p-4" : "p-6"}>
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold font-mono leading-tight mb-0.5" style={{ color: colors.accent }}>
              {project.name}
            </h3>
            <div className="text-xs font-mono text-cyan-500/50">{project.category}</div>
          </div>
          <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
            <span className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${statusBadgeLocal[project.status]}`}>
              {project.status}
            </span>
          </div>
        </div>

        {!compact && (
          <p className="text-sm text-cyan-100/60 leading-relaxed mb-3 md:line-clamp-2">
            {project.description}
          </p>
        )}

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, compact ? 3 : 4).map((t) => (
            <span
              key={t}
              className="text-xs font-mono px-2 py-0.5 rounded"
              style={{
                background: `${colors.accent}10`,
                border: `1px solid ${colors.accent}20`,
                color: `${colors.accent}80`,
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > (compact ? 3 : 4) && (
            <span className="text-xs font-mono text-cyan-500/30">
              +{project.tech.length - (compact ? 3 : 4)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: `${colors.accent}50` }}>
            <span>{project.highlight}</span>
          </div>
          <ChevronRight
            size={12}
            className={`transition-transform ${hovered ? "translate-x-1" : ""}`}
            style={{ color: `${colors.accent}50` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
