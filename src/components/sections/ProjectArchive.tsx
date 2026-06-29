"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, X, ExternalLink, ChevronRight, Star, Globe } from "lucide-react";
import { projects } from "@/lib/data";

const colorMap: Record<
  string,
  { accent: string; bg: string; border: string; glow: string }
> = {
  cyan: {
    accent: "#00D4FF",
    bg: "rgba(0,212,255,0.05)",
    border: "rgba(0,212,255,0.2)",
    glow: "rgba(0,212,255,0.15)",
  },
  emerald: {
    accent: "#00FF88",
    bg: "rgba(0,255,136,0.05)",
    border: "rgba(0,255,136,0.2)",
    glow: "rgba(0,255,136,0.15)",
  },
  violet: {
    accent: "#7B61FF",
    bg: "rgba(123,97,255,0.05)",
    border: "rgba(123,97,255,0.2)",
    glow: "rgba(123,97,255,0.15)",
  },
  amber: {
    accent: "#FFB800",
    bg: "rgba(255,184,0,0.05)",
    border: "rgba(255,184,0,0.2)",
    glow: "rgba(255,184,0,0.15)",
  },
};

const statusBadge: Record<string, string> = {
  LIVE: "text-green-400 bg-green-400/10 border-green-400/30",
  BUILT: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
};

const tagBadge: Record<string, string> = {
  Professional: "text-amber-400 border-amber-400/30 bg-amber-400/5",
  "Flagship Project": "text-emerald-400 border-emerald-400/30 bg-emerald-400/5",
  "AI Project": "text-violet-400 border-violet-400/30 bg-violet-400/5",
  "ML Project": "text-cyan-400 border-cyan-400/30 bg-cyan-400/5",
  Enterprise: "text-blue-400 border-blue-400/30 bg-blue-400/5",
  Academic: "text-slate-400 border-slate-400/30 bg-slate-400/5",
};

export default function ProjectArchive() {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);
  const visibleOthers = showAll ? others : others.slice(0, 2);

  return (
    <section className="py-16 md:py-24 px-4">
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
              SECTION 03
            </span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono neon-cyan">
            PROJECTS
          </h2>
          <p className="text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            PORTFOLIO — CLICK ANY PROJECT FOR DETAILS
          </p>
        </motion.div>

        {/* Featured label */}
        <div className="flex items-center gap-3 mb-4">
          <Star size={12} className="text-cyan-500/40" />
          <span className="text-xs font-mono text-cyan-500/40 tracking-widest">FEATURED</span>
          <div className="h-px flex-1 bg-cyan-500/10" />
        </div>

        {/* Featured projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {featured.map((project, i) => {
            const colors = colorMap[project.color] ?? colorMap.cyan;
            const isHovered = hovered === project.id;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                colors={colors}
                isHovered={isHovered}
                onHoverStart={() => setHovered(project.id)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => setSelected(project)}
                delay={i * 0.12}
              />
            );
          })}
        </div>

        {/* Other projects label */}
        <div className="flex items-center gap-3 mb-4">
          <Folder size={12} className="text-cyan-500/40" />
          <span className="text-xs font-mono text-cyan-500/40 tracking-widest">OTHER PROJECTS</span>
          <div className="h-px flex-1 bg-cyan-500/10" />
        </div>

        {/* Other projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleOthers.map((project, i) => {
            const colors = colorMap[project.color] ?? colorMap.cyan;
            const isHovered = hovered === project.id;

            return (
              <ProjectCard
                key={project.id}
                project={project}
                colors={colors}
                isHovered={isHovered}
                onHoverStart={() => setHovered(project.id)}
                onHoverEnd={() => setHovered(null)}
                onClick={() => setSelected(project)}
                delay={i * 0.1}
                compact
              />
            );
          })}
        </div>

        {/* Show more / less */}
        {others.length > 2 && (
          <motion.div
            className="mt-6 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-mono text-cyan-500/40 hover:text-cyan-400 transition-colors tracking-widest border border-cyan-500/15 hover:border-cyan-500/30 px-4 py-2 rounded"
            >
              {showAll ? "[ SHOW LESS ]" : `[ SHOW ALL ${others.length} PROJECTS ]`}
            </button>
          </motion.div>
        )}
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
                background:
                  "linear-gradient(135deg, rgba(0,20,40,0.98) 0%, rgba(3,10,14,0.98) 100%)",
                border: `1px solid ${colorMap[selected.color]?.accent ?? "#00D4FF"}40`,
                boxShadow: `0 0 60px ${colorMap[selected.color]?.glow ?? "rgba(0,212,255,0.1)"}`,
              }}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Top accent */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5"
                style={{
                  background: colorMap[selected.color]?.accent ?? "#00D4FF",
                }}
              />

              <div className="p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-2">
                      {selected.category}
                    </div>
                    <h3
                      className="text-2xl font-bold font-mono mb-2"
                      style={{ color: colorMap[selected.color]?.accent }}
                    >
                      {selected.name}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${statusBadge[selected.status]}`}
                      >
                        {selected.status}
                      </span>
                      <span
                        className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${
                          tagBadge[selected.tag] ?? "text-cyan-400 border-cyan-400/30"
                        }`}
                      >
                        {selected.tag}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelected(null)}
                    className="p-2 rounded-lg hover:bg-cyan-500/10 text-cyan-500/50 hover:text-cyan-400 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Live link */}
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
                    whileHover={{
                      scale: 1.02,
                      boxShadow: `0 0 20px ${colorMap[selected.color]?.glow}`,
                    }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Globe size={14} />
                    VISIT LIVE SITE
                    <ExternalLink size={12} />
                  </motion.a>
                )}

                {/* Description */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-2">
                    OVERVIEW
                  </div>
                  <p className="text-sm text-cyan-100/70 leading-relaxed">
                    {selected.description}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-3">
                    KEY FEATURES
                  </div>
                  <div className="space-y-2">
                    {selected.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 text-sm text-cyan-100/70"
                      >
                        <div
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{
                            background: colorMap[selected.color]?.accent,
                          }}
                        />
                        {f}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Tech stack */}
                <div className="mb-6">
                  <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-3">
                    TECH STACK
                  </div>
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

                {/* Highlight */}
                <div
                  className="rounded-lg p-4"
                  style={{
                    background: `${colorMap[selected.color]?.accent}08`,
                    border: `1px solid ${colorMap[selected.color]?.accent}20`,
                  }}
                >
                  <div
                    className="text-xs font-mono tracking-widest mb-1"
                    style={{ color: `${colorMap[selected.color]?.accent}70` }}
                  >
                    HIGHLIGHT
                  </div>
                  <div
                    className="text-sm font-mono font-bold"
                    style={{ color: colorMap[selected.color]?.accent }}
                  >
                    {selected.highlight}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProjectCard({
  project,
  colors,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onClick,
  delay,
  compact = false,
}: {
  project: (typeof projects)[0];
  colors: { accent: string; bg: string; border: string; glow: string };
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
  delay: number;
  compact?: boolean;
}) {
  const statusBadge: Record<string, string> = {
    LIVE: "text-green-400 bg-green-400/10 border-green-400/30",
    BUILT: "text-cyan-400 bg-cyan-400/10 border-cyan-400/30",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      onClick={onClick}
      className="relative rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: colors.bg,
        border: `1px solid ${isHovered ? colors.accent + "60" : colors.border}`,
        boxShadow: isHovered ? `0 0 30px ${colors.glow}` : "none",
        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
      whileHover={{ y: -4 }}
    >
      {/* Top accent bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5"
        style={{ background: colors.accent }}
        initial={{ scaleX: 0, originX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: delay + 0.3 }}
      />

      <div className={compact ? "p-4" : "p-6"}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: `${colors.accent}15`,
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <Folder size={18} style={{ color: colors.accent }} />
            </div>
            <div>
              <h3
                className="text-base font-bold font-mono leading-tight"
                style={{ color: colors.accent }}
              >
                {project.name}
              </h3>
              <div className="text-xs font-mono text-cyan-500/50 mt-0.5">
                {project.category}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0 ml-2">
            <span
              className={`text-xs font-mono px-2 py-0.5 rounded-sm border ${statusBadge[project.status]}`}
            >
              {project.status}
            </span>
            {project.url && (
              <div className="flex items-center gap-1 text-xs font-mono" style={{ color: `${colors.accent}50` }}>
                <Globe size={10} />
                <span>live</span>
              </div>
            )}
          </div>
        </div>

        {!compact && (
          <p className="text-sm text-cyan-100/60 leading-relaxed mb-3 md:line-clamp-2">
            {project.description}
          </p>
        )}

        {/* Tech stack */}
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

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono" style={{ color: `${colors.accent}50` }}>
            <Star size={10} style={{ color: colors.accent }} />
            <span>{project.highlight}</span>
          </div>
          <ChevronRight
            size={12}
            className={`transition-transform ${isHovered ? "translate-x-1" : ""}`}
            style={{ color: `${colors.accent}50` }}
          />
        </div>
      </div>

      {/* Hover scan effect */}
      {isHovered && (
        <motion.div
          className="absolute left-0 right-0 h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${colors.accent}60, transparent)`,
          }}
          animate={{ top: ["0%", "100%"] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
      )}
    </motion.div>
  );
}
