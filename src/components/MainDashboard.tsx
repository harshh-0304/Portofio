"use client";

import { motion } from "framer-motion";
import HUDBackground from "./HUDBackground";
import HeroProfile from "./sections/HeroProfile";
import SystemOverview from "./sections/SystemOverview";
import ExperienceDatabase from "./sections/ExperienceDatabase";
import ProjectArchive from "./sections/ProjectArchive";
import SkillMatrix from "./sections/SkillMatrix";
import Education from "./sections/Education";
import CurrentOperations from "./sections/CurrentOperations";
import GitHubStats from "./sections/GitHubStats";
import ContactTerminal from "./sections/ContactTerminal";
import CommandPalette from "./CommandPalette";

const sections: Record<string, string> = {
  profile: "section-profile",
  overview: "section-overview",
  experience: "section-experience",
  projects: "section-projects",
  skills: "section-skills",
  education: "section-education",
  operations: "section-operations",
  github: "section-github",
  contact: "section-contact",
};

export default function MainDashboard() {
  const scrollTo = (sectionId: string) => {
    const id = sections[sectionId];
    if (id) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <HUDBackground />

      {/* Nav bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(3,10,14,0.97) 0%, rgba(3,10,14,0) 100%)",
          borderBottom: "1px solid rgba(0,212,255,0.06)",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-bold text-cyan-400"
            style={{
              background: "rgba(0,212,255,0.1)",
              border: "1px solid rgba(0,212,255,0.28)",
            }}
          >
            H
          </div>
          <span className="font-mono text-sm text-cyan-400/60 tracking-widest hidden sm:block">
            HARSH.OS
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {[
            { label: "PROFILE", key: "profile" },
            { label: "EXPERIENCE", key: "experience" },
            { label: "PROJECTS", key: "projects" },
            { label: "SKILLS", key: "skills" },
            { label: "GITHUB", key: "github" },
            { label: "CONTACT", key: "contact" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => scrollTo(item.key)}
              className="px-3 py-1.5 rounded font-mono text-xs text-cyan-500/35 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all tracking-widest"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Online indicator */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-mono text-green-400/55 tracking-widest hidden sm:block">
            ONLINE
          </span>
        </div>
      </motion.nav>

      {/* Main content */}
      <main className="relative z-10">
        <div id="section-profile">
          <HeroProfile />
        </div>
        <div id="section-overview">
          <SystemOverview />
        </div>
        <div id="section-experience">
          <ExperienceDatabase />
        </div>
        <div id="section-projects">
          <ProjectArchive />
        </div>
        <div id="section-skills">
          <SkillMatrix />
        </div>
        <div id="section-education">
          <Education />
        </div>
        <div id="section-operations">
          <CurrentOperations />
        </div>
        <div id="section-github">
          <GitHubStats />
        </div>
        <div id="section-contact">
          <ContactTerminal />
        </div>
      </main>

      {/* Command palette */}
      <CommandPalette onNavigate={scrollTo} />
    </motion.div>
  );
}
