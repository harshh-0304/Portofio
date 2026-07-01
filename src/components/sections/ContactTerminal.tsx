"use client";

import { motion } from "framer-motion";
import {
  GitBranch,
  Link2,
  Mail,
  Download,
  Terminal,
  Send,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { profile } from "@/lib/data";

const links = [
  {
    icon: GitBranch,
    label: "GitHub",
    sub: "View open source work",
    href: profile.github,
    color: "#00D4FF",
    command: "open github",
  },
  {
    icon: Link2,
    label: "LinkedIn",
    sub: "Professional network",
    href: profile.linkedin,
    color: "#0ea5e9",
    command: "open linkedin",
  },
  {
    icon: Mail,
    label: "Email",
    sub: profile.email,
    href: `mailto:${profile.email}`,
    color: "#00FF88",
    command: "send email",
  },
  {
    icon: Download,
    label: "Resume",
    sub: "Download PDF",
    href: profile.resumeUrl,
    color: "#7B61FF",
    command: "download resume",
    download: true,
  },
];

export default function ContactTerminal() {
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> JARVIS COMMUNICATION TERMINAL v4.2",
    "> CONNECTION ESTABLISHED",
    "> AWAITING INPUT...",
  ]);
  const [input, setInput] = useState("");
  const [hovered, setHovered] = useState<string | null>(null);

  const handleCommand = (cmd: string) => {
    const line = `> $ ${cmd}`;
    const responses: Record<string, string> = {
      "open github": "> LAUNCHING GITHUB PROFILE...",
      "open linkedin": "> OPENING LINKEDIN CONNECTION...",
      "send email": "> INITIATING EMAIL CLIENT...",
      "download resume": "> DOWNLOADING ENGINEER PROFILE PDF...",
      help: "> COMMANDS: open github | open linkedin | send email | download resume",
      clear: "__CLEAR__",
    };

    if (cmd === "clear") {
      setTerminalLines(["> TERMINAL CLEARED", "> AWAITING INPUT..."]);
      return;
    }

    const response = responses[cmd.toLowerCase()] ?? `> ERROR: Unknown command '${cmd}'. Type 'help' for commands.`;
    setTerminalLines((prev) => [...prev.slice(-8), line, response]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    handleCommand(input.trim());
    setInput("");
  };

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
            <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">SECTION 06</span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <p className="mobile-section-label md:hidden mb-2">Contact</p>
          <h2 className="text-2xl md:text-4xl font-bold font-mono neon-cyan">
            <span className="md:hidden">Get in Touch</span>
            <span className="hidden md:inline">CONTACT TERMINAL</span>
          </h2>
          <p className="hidden md:block text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            ESTABLISH SECURE COMMUNICATION CHANNEL
          </p>
          <p className="md:hidden text-sm text-white/35 mt-1">Open to full-time and contract roles</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* ── MOBILE: clean touch-friendly links ── */}
          <div className="md:hidden space-y-2.5">
            {links.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.download ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  download={link.download ? "Harsh_Jadav_Resume.pdf" : undefined}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.07 }}
                  className="flex items-center gap-4 p-4 rounded-xl w-full active:scale-[0.98] transition-transform"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${link.color}12`, border: `1px solid ${link.color}20` }}
                  >
                    <Icon size={20} style={{ color: link.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-sans font-semibold text-white/80">{link.label}</div>
                    <div className="text-xs text-white/35 mt-0.5 truncate font-sans">{link.sub}</div>
                  </div>
                  <ChevronRight size={16} className="text-white/20 shrink-0" />
                </motion.a>
              );
            })}

            {/* Availability — static, no pulse */}
            <motion.div
              className="flex items-center gap-3 p-4 rounded-xl mt-2"
              style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.14)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
              <div>
                <div className="text-sm font-sans font-semibold text-green-400">Available for opportunities</div>
                <div className="text-xs text-green-400/45 mt-0.5 font-sans">Open to full-time & contract roles</div>
              </div>
            </motion.div>
          </div>

          {/* ── DESKTOP: contact cards ── */}
          <motion.div
            className="hidden md:block space-y-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {links.map((link, i) => {
              const Icon = link.icon;
              const isHov = hovered === link.label;

              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.download ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  download={link.download}
                  onClick={() => handleCommand(link.command)}
                  onHoverStart={() => setHovered(link.label)}
                  onHoverEnd={() => setHovered(null)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl relative overflow-hidden group"
                  style={{
                    background: isHov ? `${link.color}08` : "rgba(0,212,255,0.02)",
                    border: isHov ? `1px solid ${link.color}40` : "1px solid rgba(0,212,255,0.1)",
                    boxShadow: isHov ? `0 0 20px ${link.color}15` : "none",
                    transition: "all 0.3s ease",
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all"
                    style={{ background: `${link.color}15`, border: `1px solid ${link.color}25` }}
                  >
                    <Icon size={22} style={{ color: link.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-mono font-bold text-sm tracking-wider" style={{ color: link.color }}>
                      {link.label.toUpperCase()}
                    </div>
                    <div className="text-xs font-mono text-cyan-500/40 mt-0.5 truncate">{link.sub}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-cyan-500/20 hidden sm:block tracking-widest">
                      {link.command}
                    </span>
                    <ChevronRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                      style={{ color: `${link.color}50` }}
                    />
                  </div>

                  {/* Scan on hover — desktop only */}
                  {isHov && (
                    <motion.div
                      className="absolute top-0 bottom-0 w-0.5"
                      style={{ background: `${link.color}60` }}
                      animate={{ left: ["-1%", "102%"] }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                    />
                  )}
                </motion.a>
              );
            })}

            {/* Availability banner */}
            <motion.div
              className="p-4 rounded-xl"
              style={{ background: "rgba(0,255,136,0.04)", border: "1px solid rgba(0,255,136,0.2)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-3 h-3 rounded-full bg-green-400"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <div>
                  <div className="text-sm font-mono font-bold text-green-400 tracking-wider">
                    AVAILABLE FOR OPPORTUNITIES
                  </div>
                  <div className="text-xs font-mono text-green-400/40 mt-0.5 tracking-widest">
                    OPEN TO FULL-TIME / CONTRACT ROLES
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Terminal — desktop only */}
          <motion.div
            className="hidden md:block rounded-xl overflow-hidden"
            style={{ background: "rgba(0,0,0,0.7)", border: "1px solid rgba(0,212,255,0.2)" }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 px-4 py-3 border-b"
              style={{ borderColor: "rgba(0,212,255,0.15)" }}
            >
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex items-center gap-2 ml-2 text-xs font-mono text-cyan-500/40 tracking-widest">
                <Terminal size={12} />
                JARVIS.TERMINAL
              </div>
            </div>

            {/* Output */}
            <div className="p-4 font-mono text-xs space-y-1 min-h-[200px] max-h-[280px] overflow-y-auto">
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={
                    line.includes("ERROR")
                      ? "text-red-400"
                      : line.includes("$ ")
                      ? "text-white/70"
                      : "text-cyan-400/70"
                  }
                >
                  {line}
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-4 py-3 border-t"
              style={{ borderColor: "rgba(0,212,255,0.15)" }}
            >
              <Send size={12} className="text-cyan-500/40 shrink-0" />
              <span className="text-cyan-500/40 font-mono text-xs">$</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type 'help' for available commands..."
                className="flex-1 bg-transparent font-mono text-xs text-cyan-300/80 outline-none placeholder:text-cyan-500/20 tracking-wider"
              />
            </form>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          className="mt-16 pt-8 border-t border-white/5 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="text-xs text-white/20">© 2025 Harsh Jadav</div>
          <div className="text-[11px] text-white/12 mt-1">
            Built with Next.js · TypeScript · Framer Motion
          </div>
        </motion.div>
      </div>
    </section>
  );
}
