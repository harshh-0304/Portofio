"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Star, GitFork, Eye, Code2, ExternalLink } from "lucide-react";
import { profile } from "@/lib/data";

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  public_gists: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}

const langColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  "C#": "#178600",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

export default function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const username = "harshh-0304";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`, {
            headers: { Accept: "application/vnd.github.v3+json" },
          }),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
            headers: { Accept: "application/vnd.github.v3+json" },
          }),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("API error");

        const userData: GitHubUser = await userRes.json();
        const reposData: GitHubRepo[] = await reposRes.json();

        setUser(userData);
        setRepos(reposData.filter((r) => !r.fork).slice(0, 6));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Collect language usage
  const langMap: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      langMap[r.language] = (langMap[r.language] ?? 0) + 1;
    }
  });
  const topLangs = Object.entries(langMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

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
            <span className="text-xs font-mono text-cyan-500/50 tracking-[0.3em]">SECTION 07</span>
            <div className="h-px flex-1 bg-cyan-500/20" />
          </div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl md:text-4xl font-bold font-mono neon-cyan">GITHUB</h2>
            <motion.a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-mono text-cyan-500/40 hover:text-cyan-400 transition-colors tracking-widest"
              whileHover={{ x: 2 }}
            >
              <ExternalLink size={12} />
              {username}
            </motion.a>
          </div>
          <p className="text-cyan-500/40 font-mono text-sm mt-2 tracking-widest">
            REPOSITORY ANALYSIS — LIVE DATA
          </p>
        </motion.div>

        {loading && (
          <div className="flex items-center gap-3 font-mono text-sm text-cyan-500/40 tracking-widest">
            <motion.div
              className="w-2 h-2 rounded-full bg-cyan-500/50"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            FETCHING GITHUB DATA...
          </div>
        )}

        {error && (
          <div className="font-mono text-sm text-red-400/60 tracking-widest">
            {">"} GITHUB API RATE LIMIT — DATA UNAVAILABLE
          </div>
        )}

        {!loading && !error && user && (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {[
                { label: "REPOSITORIES", value: user.public_repos, icon: GitBranch },
                { label: "FOLLOWERS", value: user.followers, icon: Eye },
                { label: "FOLLOWING", value: user.following, icon: Eye },
                { label: "LANGUAGES", value: topLangs.length, icon: Code2 },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="jarvis-panel rounded-xl p-5 relative overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                  >
                    <Icon size={14} className="text-cyan-500/40 mb-3" />
                    <div className="text-3xl font-bold font-mono neon-cyan mb-1">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-cyan-500/40 tracking-widest">
                      {stat.label}
                    </div>
                    <motion.div
                      className="absolute bottom-0 left-0 h-px"
                      style={{ background: "linear-gradient(90deg, rgba(0,212,255,0.5), transparent)" }}
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                    />
                  </motion.div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Language breakdown */}
              <motion.div
                className="jarvis-panel rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-4">
                  LANGUAGE DISTRIBUTION
                </div>
                <div className="space-y-3">
                  {topLangs.map(([lang, count], i) => {
                    const pct = Math.round((count / repos.length) * 100);
                    const color = langColors[lang] ?? "#00D4FF";
                    return (
                      <div key={lang}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ background: color }}
                            />
                            <span className="text-xs font-mono text-cyan-200/70">{lang}</span>
                          </div>
                          <span className="text-xs font-mono text-cyan-500/40">{pct}%</span>
                        </div>
                        <div
                          className="h-1 rounded-full overflow-hidden"
                          style={{ background: "rgba(0,212,255,0.06)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: color, opacity: 0.7 }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${pct}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Recent repos */}
              <motion.div
                className="lg:col-span-2 space-y-3"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-xs font-mono text-cyan-500/40 tracking-widest mb-4">
                  RECENT REPOSITORIES
                </div>
                {repos.slice(0, 5).map((repo, i) => {
                  const color = langColors[repo.language ?? ""] ?? "#00D4FF";
                  return (
                    <motion.a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08 }}
                      className="flex items-center justify-between p-3.5 rounded-xl group"
                      style={{
                        background: "rgba(0,212,255,0.03)",
                        border: "1px solid rgba(0,212,255,0.1)",
                        transition: "all 0.25s ease",
                      }}
                      whileHover={{
                        borderColor: "rgba(0,212,255,0.3)",
                        background: "rgba(0,212,255,0.06)",
                        x: 3,
                      }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <GitBranch size={13} className="text-cyan-500/40 shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm font-mono text-cyan-300/80 font-medium truncate group-hover:text-cyan-200 transition-colors">
                            {repo.name}
                          </div>
                          {repo.description && (
                            <div className="text-xs font-mono text-cyan-500/35 truncate mt-0.5">
                              {repo.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-4 shrink-0 ml-3">
                        {repo.language && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                            <span className="text-xs font-mono text-cyan-500/40 hidden sm:block">
                              {repo.language}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center gap-1 text-xs font-mono text-cyan-500/35">
                          <Star size={10} />
                          {repo.stargazers_count}
                        </div>
                        <div className="flex items-center gap-1 text-xs font-mono text-cyan-500/35">
                          <GitFork size={10} />
                          {repo.forks_count}
                        </div>
                        <ExternalLink size={11} className="text-cyan-500/25 group-hover:text-cyan-400/60 transition-colors" />
                      </div>
                    </motion.a>
                  );
                })}

                <motion.a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-xs font-mono tracking-widest transition-all"
                  style={{
                    border: "1px solid rgba(0,212,255,0.12)",
                    color: "rgba(0,212,255,0.4)",
                  }}
                  whileHover={{
                    borderColor: "rgba(0,212,255,0.3)",
                    color: "#00D4FF",
                    background: "rgba(0,212,255,0.04)",
                  }}
                >
                  <ExternalLink size={11} />
                  VIEW ALL REPOSITORIES ON GITHUB
                </motion.a>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
