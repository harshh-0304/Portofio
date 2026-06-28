"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, ArrowRight, Search, X } from "lucide-react";

interface Command {
  id: string;
  label: string;
  description: string;
  shortcut?: string;
  action: () => void;
  category: string;
}

interface Props {
  onNavigate: (section: string) => void;
}

export default function CommandPalette({ onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: "profile",
      label: "Show Profile",
      description: "Navigate to engineer profile",
      shortcut: "P",
      action: () => onNavigate("profile"),
      category: "NAVIGATION",
    },
    {
      id: "overview",
      label: "Show System Overview",
      description: "View metrics and statistics",
      shortcut: "O",
      action: () => onNavigate("overview"),
      category: "NAVIGATION",
    },
    {
      id: "experience",
      label: "Show Experience",
      description: "View mission records and work history",
      shortcut: "E",
      action: () => onNavigate("experience"),
      category: "NAVIGATION",
    },
    {
      id: "projects",
      label: "Show Projects",
      description: "Browse the project archive",
      shortcut: "J",
      action: () => onNavigate("projects"),
      category: "NAVIGATION",
    },
    {
      id: "skills",
      label: "Show Skills",
      description: "View skill matrix and capabilities",
      shortcut: "S",
      action: () => onNavigate("skills"),
      category: "NAVIGATION",
    },
    {
      id: "contact",
      label: "Contact",
      description: "Open communication terminal",
      shortcut: "C",
      action: () => onNavigate("contact"),
      category: "NAVIGATION",
    },
    {
      id: "education",
      label: "Show Education",
      description: "View academic background",
      shortcut: "D",
      action: () => onNavigate("education"),
      category: "NAVIGATION",
    },
    {
      id: "github-section",
      label: "Show GitHub Stats",
      description: "View GitHub repository analysis",
      shortcut: "G",
      action: () => onNavigate("github"),
      category: "NAVIGATION",
    },
    {
      id: "resume",
      label: "Download Resume",
      description: "Download engineer profile PDF",
      shortcut: "R",
      action: () => {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Harsh_Jadav_Resume.pdf";
        a.click();
      },
      category: "ACTION",
    },
    {
      id: "github",
      label: "Open GitHub",
      description: "View open source contributions",
      action: () => window.open("https://github.com/harshh-0304", "_blank"),
      category: "EXTERNAL",
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      description: "Connect on LinkedIn",
      action: () => window.open("https://www.linkedin.com/in/harshh33/", "_blank"),
      category: "EXTERNAL",
    },
    {
      id: "email",
      label: "Send Email",
      description: "Compose email to Harsh Jadav",
      action: () => (window.location.href = "mailto:bakasakuta33@gmail.com"),
      category: "ACTION",
    },
  ];

  const filtered = commands.filter(
    (cmd) =>
      !query ||
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase()) ||
      cmd.category.toLowerCase().includes(query.toLowerCase())
  );

  const execute = useCallback((cmd: Command) => {
    cmd.action();
    setOpen(false);
    setQuery("");
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        setQuery("");
        setActiveIndex(0);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === "Enter" && filtered[activeIndex]) {
      execute(filtered[activeIndex]);
    }
  };

  // Group by category
  const grouped = filtered.reduce(
    (acc, cmd) => {
      if (!acc[cmd.category]) acc[cmd.category] = [];
      acc[cmd.category].push(cmd);
      return acc;
    },
    {} as Record<string, Command[]>
  );

  return (
    <>
      {/* Keyboard hint (fixed bottom) */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg font-mono text-xs tracking-widest"
          style={{
            background: "rgba(0,212,255,0.06)",
            border: "1px solid rgba(0,212,255,0.2)",
            color: "rgba(0,212,255,0.5)",
          }}
          whileHover={{
            background: "rgba(0,212,255,0.12)",
            borderColor: "rgba(0,212,255,0.4)",
            color: "#00D4FF",
          }}
          whileTap={{ scale: 0.97 }}
        >
          <Terminal size={12} />
          COMMAND PALETTE
          <span
            className="px-1.5 py-0.5 rounded text-xs"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.2)",
            }}
          >
            ⌘K
          </span>
        </motion.button>
      </motion.div>

      {/* Palette modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 cmd-overlay"
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
            />

            {/* Palette */}
            <motion.div
              className="relative w-full max-w-2xl rounded-xl overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,20,35,0.98) 0%, rgba(3,10,14,0.98) 100%)",
                border: "1px solid rgba(0,212,255,0.3)",
                boxShadow:
                  "0 0 80px rgba(0,212,255,0.12), 0 20px 60px rgba(0,0,0,0.5)",
              }}
              initial={{ scale: 0.95, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: -20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 400 }}
            >
              {/* Top glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(0,212,255,0.8) 50%, transparent)",
                }}
              />

              {/* Search input */}
              <div
                className="flex items-center gap-3 px-4 py-4 border-b"
                style={{ borderColor: "rgba(0,212,255,0.1)" }}
              >
                <Search size={16} className="text-cyan-500/50 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent font-mono text-sm text-cyan-100 outline-none placeholder:text-cyan-500/25 tracking-wider"
                />
                {query && (
                  <button
                    onClick={() => setQuery("")}
                    className="text-cyan-500/40 hover:text-cyan-400 transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
                <kbd
                  className="text-xs font-mono px-1.5 py-0.5 rounded text-cyan-500/30 shrink-0"
                  style={{ border: "1px solid rgba(0,212,255,0.15)" }}
                >
                  ESC
                </kbd>
              </div>

              {/* Commands */}
              <div className="max-h-[420px] overflow-y-auto p-2">
                {Object.keys(grouped).length === 0 ? (
                  <div className="text-center py-8 text-cyan-500/30 font-mono text-sm">
                    No commands found for &ldquo;{query}&rdquo;
                  </div>
                ) : (
                  Object.entries(grouped).map(([category, cmds]) => (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-1.5 text-xs font-mono text-cyan-500/30 tracking-[0.3em]">
                        {category}
                      </div>
                      {cmds.map((cmd) => {
                        const globalIndex = filtered.indexOf(cmd);
                        const isActive = globalIndex === activeIndex;

                        return (
                          <motion.button
                            key={cmd.id}
                            onClick={() => execute(cmd)}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all"
                            style={{
                              background: isActive
                                ? "rgba(0,212,255,0.08)"
                                : "transparent",
                              border: isActive
                                ? "1px solid rgba(0,212,255,0.2)"
                                : "1px solid transparent",
                            }}
                          >
                            <div
                              className="w-7 h-7 rounded flex items-center justify-center shrink-0"
                              style={{
                                background: isActive
                                  ? "rgba(0,212,255,0.15)"
                                  : "rgba(0,212,255,0.05)",
                              }}
                            >
                              <Terminal
                                size={13}
                                className={
                                  isActive
                                    ? "text-cyan-400"
                                    : "text-cyan-500/30"
                                }
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div
                                className={`text-sm font-mono font-medium ${
                                  isActive
                                    ? "text-cyan-200"
                                    : "text-cyan-400/60"
                                }`}
                              >
                                {cmd.label}
                              </div>
                              <div className="text-xs font-mono text-cyan-500/30 truncate mt-0.5">
                                {cmd.description}
                              </div>
                            </div>

                            {cmd.shortcut && (
                              <kbd
                                className="text-xs font-mono px-1.5 py-0.5 rounded text-cyan-500/30 shrink-0"
                                style={{
                                  border: "1px solid rgba(0,212,255,0.1)",
                                }}
                              >
                                {cmd.shortcut}
                              </kbd>
                            )}

                            {isActive && (
                              <ArrowRight
                                size={14}
                                className="text-cyan-400/50 shrink-0"
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              <div
                className="flex items-center justify-between px-4 py-2 border-t"
                style={{ borderColor: "rgba(0,212,255,0.08)" }}
              >
                <div className="flex items-center gap-4 text-xs font-mono text-cyan-500/25 tracking-wider">
                  <span>↑↓ navigate</span>
                  <span>↵ execute</span>
                  <span>ESC close</span>
                </div>
                <div className="text-xs font-mono text-cyan-500/20 tracking-widest">
                  JARVIS v4.2
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
