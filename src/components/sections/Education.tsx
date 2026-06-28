"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award, ChevronRight } from "lucide-react";
import { education, concepts } from "@/lib/data";

export default function Education() {
  const edu = education[0];

  return (
    <section className="py-24 px-4">
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
            <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">SECTION 05</span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono neon-cyan">EDUCATION</h2>
          <p className="text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            ACADEMIC PROFILE
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Degree card */}
          <motion.div
            className="jarvis-panel rounded-xl p-7 relative overflow-hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Top accent */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: "linear-gradient(90deg, #00D4FF, rgba(0,212,255,0.1))" }}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />

            {/* Icon */}
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <GraduationCap size={22} className="text-cyan-400" />
            </div>

            <div className="text-xs font-mono text-cyan-500/35 tracking-widest mb-2">
              DEGREE
            </div>
            <h3 className="text-xl font-bold font-mono text-cyan-200 mb-1">{edu.degree}</h3>
            <div className="text-base font-mono text-cyan-400/65 mb-1">{edu.institution}</div>
            <div className="text-sm font-mono text-cyan-500/40 mb-5">{edu.location}</div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mb-5">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-500/40">
                <Calendar size={11} />
                {edu.period}
              </div>
              <div className="flex items-center gap-2 text-xs font-mono">
                <Award size={11} className="text-amber-400/60" />
                <span className="text-amber-400/80 font-bold">CGPA: {edu.cgpa}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              {edu.highlights.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-start gap-2 text-sm text-cyan-100/55"
                >
                  <ChevronRight size={13} className="text-cyan-500/35 mt-0.5 shrink-0" />
                  {h}
                </motion.div>
              ))}
            </div>

            {/* Corner decoration */}
            <div className="absolute bottom-4 right-4 w-5 h-5 corner-br" />
          </motion.div>

          {/* Concepts / Knowledge map */}
          <motion.div
            className="jarvis-panel rounded-xl p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="text-xs font-mono text-cyan-500/35 tracking-widest mb-2">
              CORE CONCEPTS
            </div>
            <h3 className="text-lg font-bold font-mono text-cyan-200 mb-5">
              Engineering Knowledge Map
            </h3>

            <div className="flex flex-wrap gap-2">
              {concepts.map((concept, i) => (
                <motion.span
                  key={concept}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.04 }}
                  whileHover={{ scale: 1.05 }}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg cursor-default"
                  style={{
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.15)",
                    color: "rgba(0,212,255,0.7)",
                  }}
                >
                  {concept}
                </motion.span>
              ))}
            </div>

            {/* Focus areas */}
            <div className="mt-7 pt-5" style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}>
              <div className="text-xs font-mono text-cyan-500/35 tracking-widest mb-3">
                CURRENT FOCUS
              </div>
              <div className="space-y-2">
                {[
                  "Production-grade backend systems with NestJS & PostgreSQL",
                  "AI/ML integration and LLM-powered product development",
                  "System design, scalability, and distributed architectures",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-cyan-100/50">
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                      style={{ background: "rgba(0,255,136,0.6)" }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
