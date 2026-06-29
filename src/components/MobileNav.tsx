"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Briefcase, Folder, Code2, Mail } from "lucide-react";

const navItems = [
  { id: "profile",    label: "Profile",  Icon: User,     sectionId: "section-profile" },
  { id: "experience", label: "Work",     Icon: Briefcase,sectionId: "section-experience" },
  { id: "projects",   label: "Projects", Icon: Folder,   sectionId: "section-projects" },
  { id: "skills",     label: "Skills",   Icon: Code2,    sectionId: "section-skills" },
  { id: "contact",    label: "Contact",  Icon: Mail,     sectionId: "section-contact" },
];

export default function MobileNav() {
  const [active, setActive] = useState("profile");

  useEffect(() => {
    const observers = navItems.map(({ id, sectionId }) => {
      const el = document.getElementById(sectionId);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach(o => o?.disconnect());
  }, []);

  const scrollTo = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{
        background: "rgba(3,10,14,0.94)",
        borderTop: "1px solid rgba(0,212,255,0.12)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ id, label, Icon, sectionId }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(sectionId)}
              aria-label={label}
              className="flex flex-col items-center justify-center gap-1 flex-1 h-full relative"
            >
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-pill"
                  className="absolute top-0 inset-x-3 h-[2px] rounded-full"
                  style={{
                    background: "linear-gradient(90deg, transparent, #00D4FF 40%, #00D4FF 60%, transparent)",
                    boxShadow: "0 0 10px rgba(0,212,255,0.9)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              <Icon
                size={22}
                className="transition-colors duration-200"
                style={{
                  color: isActive ? "#00D4FF" : "rgba(0,212,255,0.28)",
                  filter: isActive ? "drop-shadow(0 0 5px rgba(0,212,255,0.7))" : "none",
                }}
              />
              <span
                className="text-[9px] font-mono tracking-widest uppercase"
                style={{ color: isActive ? "#00D4FF" : "rgba(0,212,255,0.22)" }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
