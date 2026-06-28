"use client";

import { motion } from "framer-motion";
import { BookOpen, Hammer, Target, Wifi } from "lucide-react";
import { currentOperations } from "@/lib/data";

export default function CurrentOperations() {
  const cards = [
    {
      icon: BookOpen,
      label: "CURRENTLY LEARNING",
      items: currentOperations.learning,
      color: "#00D4FF",
      bg: "rgba(0,212,255,0.05)",
      border: "rgba(0,212,255,0.15)",
      status: "ACTIVE",
    },
    {
      icon: Hammer,
      label: "CURRENTLY BUILDING",
      items: currentOperations.building,
      color: "#7B61FF",
      bg: "rgba(123,97,255,0.05)",
      border: "rgba(123,97,255,0.15)",
      status: "IN PROGRESS",
    },
    {
      icon: Target,
      label: "CURRENT OBJECTIVE",
      items: [currentOperations.objective],
      color: "#00FF88",
      bg: "rgba(0,255,136,0.05)",
      border: "rgba(0,255,136,0.15)",
      status: "PRIORITY",
    },
  ];

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
            <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">
              SECTION 06
            </span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono neon-cyan">
            CURRENT OPERATIONS
          </h2>
          <p className="text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            LIVE STATUS — REAL-TIME ACTIVITY FEED
          </p>
        </motion.div>

        {/* Status cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative rounded-xl overflow-hidden"
                style={{
                  background: card.bg,
                  border: `1px solid ${card.border}`,
                }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 0 30px ${card.color}20`,
                  borderColor: `${card.color}40`,
                }}
              >
                {/* Animated border top */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-0.5"
                  style={{ background: card.color }}
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    boxShadow: [
                      `0 0 4px ${card.color}40`,
                      `0 0 12px ${card.color}80`,
                      `0 0 4px ${card.color}40`,
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                />

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${card.color}15`,
                        border: `1px solid ${card.color}25`,
                      }}
                    >
                      <Icon size={20} style={{ color: card.color }} />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <motion.div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: card.color }}
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                      />
                      <span
                        className="text-xs font-mono tracking-widest"
                        style={{ color: `${card.color}80` }}
                      >
                        {card.status}
                      </span>
                    </div>
                  </div>

                  <div
                    className="text-xs font-mono tracking-widest mb-4"
                    style={{ color: `${card.color}60` }}
                  >
                    {card.label}
                  </div>

                  {/* Items */}
                  <div className="space-y-3">
                    {card.items.map((item, j) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.15 + j * 0.1 + 0.3 }}
                        className="flex items-center gap-3"
                      >
                        <div
                          className="w-1 h-6 rounded-full shrink-0"
                          style={{ background: `${card.color}50` }}
                        />
                        <span
                          className="text-sm font-mono font-medium"
                          style={{ color: `${card.color}90` }}
                        >
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Live indicator */}
                  <div className="mt-6 pt-4 border-t flex items-center gap-2" style={{ borderColor: `${card.color}10` }}>
                    <Wifi size={10} style={{ color: `${card.color}40` }} />
                    <span
                      className="text-xs font-mono tracking-widest"
                      style={{ color: `${card.color}30` }}
                    >
                      LIVE DATA STREAM
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Activity timeline */}
        <motion.div
          className="mt-8 jarvis-panel rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-4">
            SYSTEM ACTIVITY LOG // RECENT
          </div>
          <div className="space-y-3">
            {[
              { time: "NOW", action: "Building AI agents with LangGraph", type: "BUILD" },
              { time: "TODAY", action: "Researching Advanced System Design patterns", type: "LEARN" },
              { time: "THIS WEEK", action: "Deployed backend microservices to AWS", type: "DEPLOY" },
              { time: "ONGOING", action: "Seeking Software Engineering opportunities", type: "SEEK" },
            ].map((log, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="flex items-center gap-4 text-sm"
              >
                <span className="text-xs font-mono text-cyan-500/30 w-24 shrink-0 tracking-wider">
                  {log.time}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 shrink-0" />
                <span className="text-cyan-100/60 font-mono">{log.action}</span>
                <span
                  className="ml-auto text-xs font-mono px-2 py-0.5 rounded shrink-0"
                  style={{
                    background: "rgba(0,212,255,0.06)",
                    border: "1px solid rgba(0,212,255,0.15)",
                    color: "rgba(0,212,255,0.5)",
                  }}
                >
                  {log.type}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
