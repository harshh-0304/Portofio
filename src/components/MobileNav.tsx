"use client";

import { useState, useEffect } from "react";
import { User, Briefcase, Folder, Code2, Mail } from "lucide-react";

const navItems = [
  { id: "profile",    label: "Profile",  Icon: User,      sectionId: "section-profile" },
  { id: "experience", label: "Work",     Icon: Briefcase, sectionId: "section-experience" },
  { id: "projects",   label: "Projects", Icon: Folder,    sectionId: "section-projects" },
  { id: "skills",     label: "Skills",   Icon: Code2,     sectionId: "section-skills" },
  { id: "contact",    label: "Contact",  Icon: Mail,      sectionId: "section-contact" },
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
        background: "rgba(3,10,14,0.97)",
        borderTop: "1px solid rgba(0,212,255,0.08)",
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
                <div
                  className="absolute top-0 inset-x-4 h-[1.5px] rounded-full bg-cyan-400"
                  style={{ opacity: 1, transition: "opacity 0.15s ease" }}
                />)}
              <Icon
                size={20}
                style={{
                  color: isActive ? "#00D4FF" : "rgba(255,255,255,0.22)",
                  transition: "color 0.2s ease",
                }}
              />
              <span
                className="text-[10px] font-sans"
                style={{
                  color: isActive ? "#00D4FF" : "rgba(255,255,255,0.28)",
                  fontWeight: isActive ? 500 : 400,
                  transition: "color 0.2s ease",
                }}
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
