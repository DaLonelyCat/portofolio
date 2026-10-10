"use client";

import React, { useState } from "react";
import { ArrowUpRight, FolderGit2, Terminal, Zap } from "lucide-react";
import { Project, ProjectCategory } from "../types/portfolio";
import { ProjectModal } from "./ProjectModal";

interface ProjectsProps {
  projects: Project[];
  categories: ProjectCategory[];
}

export function Projects({ projects, categories }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-8 md:py-12 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12">
        {/* Section Header with Tighter Spacing */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-cyber-yellow font-mono text-xs font-semibold uppercase tracking-wider mb-1">
              <Terminal className="w-3.5 h-3.5 text-cyber-yellow" />
              <span>// ARCHIVE_DATABASE // SECTOR_WORKS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              FEATURED CASE DOSSIERS
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Engineered design systems, interactive telemetry interfaces, and experimental web architectures.
            </p>
          </div>

          {/* Tactical Category Filter Protocols (Horizontal Scroll on Mobile, Wrapped on Desktop) */}
          <div className="w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <div className="inline-flex flex-nowrap md:flex-wrap gap-1 p-1 bg-black/70 border border-yellow-500/25 clip-corner-sm backdrop-blur-md min-w-full md:min-w-0">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                const label =
                  category === "All"
                    ? "ALL_SYSTEMS"
                    : category.toUpperCase().replace(/\s+/g, "_");
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`font-mono text-[11px] px-3 py-1.5 whitespace-nowrap transition-all clip-corner-sm shrink-0 ${
                      isActive
                        ? "bg-cyber-yellow text-black font-bold shadow-neon-yellow-sm"
                        : "text-slate-400 hover:text-cyber-yellow hover:bg-yellow-500/10"
                    }`}
                    aria-pressed={isActive}
                  >
                    [{label}]
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Grid: 4-column on ultra-wide screens to maximize space! */}
        {filteredProjects.length === 0 ? (
          <div className="p-8 text-center cyber-panel clip-corner">
            <FolderGit2 className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <h3 className="font-mono text-sm font-semibold text-slate-300">
              QUERY_RESULT: ZERO_ENTRIES
            </h3>
            <p className="font-mono text-xs text-slate-500 mt-1">
              No matching archive dossiers located under current protocol filter.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filteredProjects.map((project, index) => {
              const fileNumber = String(index + 1).padStart(2, "0");
              return (
                <article
                  key={project.id}
                  className="group relative flex flex-col justify-between p-4 sm:p-5 cyber-panel clip-corner border-cyan-500/20 hover:border-cyber-yellow"
                >
                  {/* Subtle Corner HUD markers in Yellow */}
                  <div className="flex items-center justify-between mb-3 font-mono text-[11px]">
                    <span className="px-2 py-0.5 bg-yellow-500/10 border border-yellow-500/30 text-cyber-yellow font-bold clip-corner-sm">
                      {project.category.toUpperCase()}
                    </span>
                    <span className="text-cyber-yellow font-mono font-bold">
                      // DOSSIER_{fileNumber}
                    </span>
                  </div>

                  <div>
                    {/* Title & Tagline */}
                    <h3 className="text-lg font-bold text-white group-hover:text-cyber-yellow transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                      {project.tagline}
                    </p>

                    {/* Impact preview chip with Yellow accent */}
                    {project.impact && (
                      <div className="mt-3 p-2.5 bg-black/60 border border-yellow-500/25 clip-corner-sm">
                        <div className="font-mono text-[11px] leading-tight">
                          <span className="text-cyber-yellow font-bold">[METRIC]: </span>
                          <span className="text-slate-200">{project.impact}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tags & Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-cyan-500/15 flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1 font-mono">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-1.5 py-0.5 bg-black/80 border border-slate-800 text-slate-400 clip-corner-sm"
                        >
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 2 && (
                        <span className="text-[10px] px-1 text-slate-500">
                          +{project.tags.length - 2}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setActiveProject(project)}
                      className="inline-flex items-center justify-center gap-1 font-mono text-[11px] font-bold text-cyber-yellow hover:text-black bg-black hover:bg-cyber-yellow border border-cyber-yellow/40 hover:border-transparent px-3 py-1.5 clip-corner-sm transition-all shadow-sm hover:shadow-neon-yellow-sm"
                    >
                      <span>INSPECT</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </section>
  );
}
