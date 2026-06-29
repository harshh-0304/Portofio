"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Zap, ChevronRight, ExternalLink, Download, Mail } from "lucide-react";
import { profile, experiences, projects, skills } from "@/lib/data";

export default function HeroProfile() {
  const activeRoles = experiences.filter((e) => e.status === "ACTIVE").length;
  const totalTech = skills.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <section className="relative">

      {/* ══════════════════════════════════════════════
          MOBILE HERO — lg:hidden
          Premium native-app feel, recruiter-optimised
          Target: 390×844 (iPhone 13/14/15)
      ══════════════════════════════════════════════ */}
      <div className="lg:hidden min-h-screen flex flex-col px-5 pt-20 pb-28">

        {/* Status badge */}
        <motion.div
          className="flex items-center gap-2 mb-7 self-center px-3 py-1.5 rounded-full font-mono text-xs tracking-widest"
          style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.18)", color: "#00D4FF" }}
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          ENGINEER PROFILE · ACTIVE
        </motion.div>

        {/* Photo */}
        <motion.div
          className="flex flex-col items-center mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full scale-110"
              style={{ border: "1px solid rgba(0,212,255,0.3)", boxShadow: "0 0 24px rgba(0,212,255,0.15)" }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative w-24 h-24 rounded-full overflow-hidden" style={{ border: "2px solid rgba(0,212,255,0.4)" }}>
              <Image src={profile.avatar} alt="Harsh Jadav" fill className="object-cover" priority />
              <div className="absolute inset-0" style={{ background: "rgba(0,212,255,0.04)" }} />
            </div>
            <motion.div
              className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-green-400 border-2 border-[#030A0E]"
              style={{ boxShadow: "0 0 8px rgba(0,255,136,0.8)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>

        {/* Name + Role + Location */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-[2rem] font-bold font-mono neon-cyan tracking-tight leading-none mb-2">
            {profile.name}
          </h1>
          <div className="text-base font-mono text-cyan-400/70 mb-2">
            <span className="text-cyan-500/30">// </span>{profile.role}
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-mono text-cyan-500/40">
            <MapPin size={11} />{profile.location}
          </div>
        </motion.div>

        {/* Availability pill */}
        <motion.div
          className="self-center flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-7"
          style={{ background: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.28)" }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            boxShadow: ["0 0 0 rgba(0,255,136,0)", "0 0 18px rgba(0,255,136,0.15)", "0 0 0 rgba(0,255,136,0)"],
          }}
          transition={{ delay: 0.4, boxShadow: { duration: 2.5, repeat: Infinity } }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-sm font-mono font-bold text-green-400 tracking-widest">
            AVAILABLE FOR OPPORTUNITIES
          </span>
        </motion.div>

        {/* 2×2 Stats */}
        <motion.div
          className="grid grid-cols-2 gap-3 mb-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {[
            { label: "EXPERIENCE", value: "1+ YR", sub: "Production" },
            { label: "PROJECTS",   value: `${projects.length}+`, sub: "Live & Built" },
            { label: "TECH STACK", value: `${totalTech}+`, sub: "Core Tools" },
            { label: "ACTIVE ROLES", value: `${activeRoles}`, sub: "Current" },
          ].map((s) => (
            <div key={s.label} className="jarvis-panel rounded-2xl p-4 text-center">
              <div className="text-[10px] font-mono text-cyan-500/35 tracking-widest mb-1">{s.label}</div>
              <div className="text-2xl font-bold font-mono neon-cyan leading-none">{s.value}</div>
              <div className="text-[10px] font-mono text-cyan-500/40 mt-1">{s.sub}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons 2×2 */}
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.a href={profile.github} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl font-mono text-sm font-bold tracking-wider min-h-[56px]"
            style={{ background: "rgba(0,212,255,0.09)", border: "1px solid rgba(0,212,255,0.28)", color: "#00D4FF" }}
            whileTap={{ scale: 0.96 }}>
            <ChevronRight size={15} />GITHUB
          </motion.a>
          <motion.a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl font-mono text-sm font-bold tracking-wider min-h-[56px]"
            style={{ background: "rgba(14,165,233,0.07)", border: "1px solid rgba(14,165,233,0.22)", color: "#38bdf8" }}
            whileTap={{ scale: 0.96 }}>
            <ExternalLink size={14} />LINKEDIN
          </motion.a>
          <motion.a href={profile.resumeUrl} download="Harsh_Jadav_Resume.pdf"
            className="flex items-center justify-center gap-2 py-4 rounded-2xl font-mono text-sm font-bold tracking-wider min-h-[56px]"
            style={{ background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.25)", color: "#00FF88" }}
            whileTap={{ scale: 0.96 }}>
            <Download size={14} />RESUME
          </motion.a>
          <motion.a href={`mailto:${profile.email}`}
            className="flex items-center justify-center gap-2 py-4 rounded-2xl font-mono text-sm font-bold tracking-wider min-h-[56px]"
            style={{ background: "rgba(123,97,255,0.07)", border: "1px solid rgba(123,97,255,0.25)", color: "#7B61FF" }}
            whileTap={{ scale: 0.96 }}>
            <Mail size={14} />CONTACT
          </motion.a>
        </motion.div>

        {/* About snippet */}
        <motion.div
          className="mt-5 jarvis-panel rounded-2xl p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
        >
          <div className="flex items-center gap-2 mb-2 text-[10px] font-mono text-cyan-500/35 tracking-widest">
            <Zap size={10} className="text-cyan-500" />ABOUT
          </div>
          <p className="text-xs text-cyan-100/65 leading-relaxed">
            Backend Engineer with production experience building scalable REST APIs, transaction processing systems, and multi-provider integrations. NestJS · TypeScript · PostgreSQL · AWS.
          </p>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          className="mt-8 flex flex-col items-center gap-1.5 self-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="text-[9px] font-mono text-cyan-500/20 tracking-widest">SCROLL TO EXPLORE</div>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-cyan-500/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP HERO — hidden lg:flex (original layout)
      ══════════════════════════════════════════════ */}
      <div className="hidden lg:flex relative min-h-screen items-center px-4 pt-20 pb-10">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[280px_1fr_260px] gap-8 items-center">

          {/* LEFT: Photo + status */}
          <motion.div className="flex flex-col items-center gap-6" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="relative">
              <motion.div className="absolute rounded-full" style={{ inset: "-28px", border: "1px solid rgba(0,212,255,0.12)" }} animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute rounded-full" style={{ inset: "-16px", border: "1px dashed rgba(0,212,255,0.28)" }} animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }} />
              <motion.div className="absolute rounded-full overflow-hidden pointer-events-none" style={{ inset: "-6px" }} animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <div className="absolute inset-0 rounded-full" style={{ background: "conic-gradient(from 0deg, transparent 65%, rgba(0,212,255,0.2) 82%, rgba(0,212,255,0.5) 100%)" }} />
              </motion.div>
              <motion.div className="absolute rounded-full" style={{ inset: "-4px", border: "1.5px solid rgba(0,212,255,0.45)", boxShadow: "0 0 20px rgba(0,212,255,0.15)" }} animate={{ boxShadow: ["0 0 15px rgba(0,212,255,0.1)", "0 0 28px rgba(0,212,255,0.25)", "0 0 15px rgba(0,212,255,0.1)"] }} transition={{ duration: 3, repeat: Infinity }} />
              <div className="relative w-44 h-44 rounded-full overflow-hidden" style={{ border: "2px solid rgba(0,212,255,0.35)" }}>
                <Image src={profile.avatar} alt="Harsh Jadav" fill className="object-cover" priority />
                <div className="absolute inset-0" style={{ background: "rgba(0,212,255,0.04)" }} />
                <motion.div className="absolute left-0 right-0 h-px pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)" }} animate={{ top: ["0%", "100%", "0%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
              </div>
              {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls, i) => (
                <div key={i} className={`absolute w-3.5 h-3.5 ${cls} border-cyan-400/60`} style={{ margin: "-1px" }} />
              ))}
              <motion.div className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#030A0E]" style={{ boxShadow: "0 0 8px rgba(0,255,136,0.7)" }} animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </div>
            <div className="grid grid-cols-2 gap-2 w-full max-w-[220px]">
              {[{ label: "STATUS", value: "ACTIVE", green: true }, { label: "LOCATION", value: "INDIA" }, { label: "EXPERIENCE", value: "1+ YR" }, { label: "OPEN TO", value: "WORK" }].map((item) => (
                <motion.div key={item.label} className="jarvis-panel rounded-lg p-2 text-center" whileHover={{ scale: 1.04 }}>
                  <div className="text-[10px] font-mono text-cyan-500/35 tracking-wider mb-0.5">{item.label}</div>
                  <div className={`text-xs font-mono font-bold tracking-widest ${item.green ? "text-green-400" : "text-cyan-400"}`}>{item.value}</div>
                </motion.div>
              ))}
            </div>
            <motion.div className="w-full max-w-[220px] rounded-lg px-3 py-2 flex items-center gap-2" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.18)" }} animate={{ boxShadow: ["0 0 0px rgba(0,255,136,0)", "0 0 16px rgba(0,255,136,0.08)", "0 0 0px rgba(0,255,136,0)"] }} transition={{ duration: 3, repeat: Infinity }}>
              <motion.div className="w-2 h-2 rounded-full bg-green-400 shrink-0" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              <div>
                <div className="text-[10px] font-mono text-green-400 tracking-widest font-bold leading-tight">AVAILABLE</div>
                <div className="text-[9px] font-mono text-green-400/40 tracking-wider leading-tight">FOR OPPORTUNITIES</div>
              </div>
            </motion.div>
          </motion.div>

          {/* CENTER: Main info */}
          <motion.div className="flex flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}>
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm mb-5 w-fit font-mono text-xs tracking-widest" style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "#00D4FF" }} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
              <motion.span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
              ENGINEER PROFILE · ACTIVE
            </motion.div>
            <motion.h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[0.95] mb-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
              <span className="neon-cyan font-mono tracking-tight">{profile.name}</span>
            </motion.h1>
            <motion.div className="text-lg md:text-xl font-mono text-cyan-400/65 mb-1 tracking-wide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
              <span className="text-cyan-500/30">// </span>{profile.role}
            </motion.div>
            <motion.div className="text-sm font-mono text-cyan-500/35 mb-6 tracking-widest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.72 }}>{profile.tagline}</motion.div>
            <motion.div className="flex items-center gap-2 text-xs font-mono text-cyan-500/40 mb-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.78 }}>
              <MapPin size={12} />{profile.location}
            </motion.div>
            <motion.div className="jarvis-panel rounded-xl p-5 mb-7" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
              <div className="flex items-center gap-2 mb-2.5 text-xs font-mono text-cyan-500/35 tracking-widest"><Zap size={11} className="text-cyan-500" />ABOUT ME</div>
              <p className="text-cyan-100/70 leading-relaxed text-sm">{profile.summary}</p>
            </motion.div>
            <motion.div className="flex flex-wrap gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.95 }}>
              <motion.a href={profile.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-medium tracking-wider" style={{ background: "rgba(0,212,255,0.09)", border: "1px solid rgba(0,212,255,0.28)", color: "#00D4FF" }} whileHover={{ scale: 1.03, boxShadow: "0 0 20px rgba(0,212,255,0.25)" }} whileTap={{ scale: 0.97 }}><ChevronRight size={14} />GITHUB</motion.a>
              <motion.a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-medium tracking-wider" style={{ background: "rgba(0,212,255,0.05)", border: "1px solid rgba(0,212,255,0.15)", color: "rgba(0,212,255,0.7)" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><ExternalLink size={13} />LINKEDIN</motion.a>
              <motion.a href={profile.resumeUrl} download="Harsh_Jadav_Resume.pdf" className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-medium tracking-wider" style={{ background: "rgba(0,255,136,0.07)", border: "1px solid rgba(0,255,136,0.22)", color: "#00FF88" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><Download size={13} />RESUME</motion.a>
              <motion.a href={`mailto:${profile.email}`} className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm font-medium tracking-wider" style={{ background: "rgba(123,97,255,0.07)", border: "1px solid rgba(123,97,255,0.22)", color: "#7B61FF" }} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}><ChevronRight size={14} />CONTACT</motion.a>
            </motion.div>
          </motion.div>

          {/* RIGHT: Live system stats */}
          <motion.div className="hidden lg:flex flex-col gap-3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.35 }}>
            <div className="text-xs font-mono text-cyan-500/35 tracking-[0.25em] mb-1">SYSTEM STATUS</div>
            {[
              { label: "EXPERIENCE", val: "1+ YR", sub: "Production" },
              { label: "PROJECTS", val: `${projects.length}+`, sub: "Live & Built" },
              { label: "TECH STACK", val: `${totalTech}+`, sub: "Core Tools" },
              { label: "ACTIVE ROLES", val: `${activeRoles}`, sub: "Current" },
            ].map((stat, i) => (
              <motion.div key={stat.label} className="jarvis-panel rounded-xl px-4 py-3 relative overflow-hidden" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }} whileHover={{ scale: 1.02 }}>
                <div className="text-[10px] font-mono text-cyan-500/35 tracking-widest mb-0.5">{stat.label}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono neon-cyan">{stat.val}</span>
                  <span className="text-xs font-mono text-cyan-500/40">{stat.sub}</span>
                </div>
                <motion.div className="absolute bottom-0 left-0 h-px" style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.5), transparent)" }} initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 1, delay: 0.6 + i * 0.08 }} />
              </motion.div>
            ))}
            <div className="jarvis-panel rounded-xl px-4 py-4 mt-1">
              <div className="text-[10px] font-mono text-cyan-500/35 tracking-widest mb-3">CORE STACK</div>
              <div className="flex flex-wrap gap-1.5">
                {["NestJS", "TypeScript", "PostgreSQL", "React", "Python", "AWS"].map((t) => (
                  <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded" style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.15)", color: "rgba(0,212,255,0.65)" }}>{t}</span>
                ))}
              </div>
            </div>
            <motion.div className="rounded-xl px-4 py-3" style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.15)" }} animate={{ borderColor: ["rgba(0,255,136,0.1)", "rgba(0,255,136,0.25)", "rgba(0,255,136,0.1)"] }} transition={{ duration: 3, repeat: Infinity }}>
              <div className="text-[10px] font-mono text-green-400/40 tracking-widest mb-1">CURRENTLY AT</div>
              <div className="text-sm font-mono font-bold text-green-400">Betorra</div>
              <div className="text-[10px] font-mono text-green-400/40 mt-0.5">Backend Engineer · Jan 2026</div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator — desktop only */}
      <motion.div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }}>
        <div className="text-[10px] font-mono text-cyan-500/25 tracking-widest">SCROLL TO EXPLORE</div>
        <motion.div className="w-px h-10 bg-gradient-to-b from-cyan-500/40 to-transparent" animate={{ scaleY: [1, 0.5, 1], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 2, repeat: Infinity }} />
      </motion.div>
    </section>
  );
}
