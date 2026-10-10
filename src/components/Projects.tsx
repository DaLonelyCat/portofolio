"use client";

import React, { useState } from "react";
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

  // Group filtered projects by year
  const years = Array.from(new Set(filteredProjects.map((p) => p.year))).sort(
    (a, b) => b.localeCompare(a)
  );

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-rule/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Integrated Cyber Directory Header */}
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                Engineering Projects
              </h2>
              <span className="text-xs font-mono text-cyan-400">
                ({filteredProjects.length} {filteredProjects.length === 1 ? "entry" : "entries"})
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-lg">
              Shipped desktop applications, web platforms, and mobile utilities.
            </p>
          </div>

          {/* Cyber Filter Rail */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-1.5 min-w-max p-1.5 rounded-full bg-[#0B0D16]/95 border border-white/10 shadow-lg">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs font-mono px-4 py-2 rounded-full min-h-[38px] transition-all ${
                      isActive
                        ? "bg-cyan-400 text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                    aria-pressed={isActive}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Year-Grouped Project Index */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#0B0D16]/95">
            <p className="text-sm text-slate-400">
              No archive entries match the selected category.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {years.map((year) => {
              const yearProjects = filteredProjects.filter((p) => p.year === year);
              return (
                <div
                  key={year}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start border-t border-white/10 pt-8"
                >
                  {/* Left Column: Bold Year Marker */}
                  <div className="lg:col-span-2">
                    <span className="text-2xl sm:text-4xl font-mono text-cyan-400/80 tracking-tight">
                      {year}
                    </span>
                    <span className="block text-xs font-mono text-slate-400 mt-1">
                      {yearProjects.length} {yearProjects.length === 1 ? "project" : "projects"}
                    </span>
                  </div>

                  {/* Right Column: Cyber Project Cards */}
                  <div className="lg:col-span-10 space-y-4">
                    {yearProjects.map((project) => {
                      const isUniCash = project.id === "unicash-pos";
                      return (
                        <article
                          key={project.id}
                          onClick={() => setActiveProject(project)}
                          className={`group rounded-2xl border bg-[#0B0D16]/95 p-6 hover:bg-[#111422] transition-all duration-300 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${
                            isUniCash
                              ? "border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]"
                              : "border-white/10 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]"
                          }`}
                        >
                          <div className="md:w-5/12">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                                {project.category}
                              </span>
                              {isUniCash && (
                                <span className="text-xs font-mono text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/30">
                                  PRODUCTION CORE
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-normal text-white group-hover:text-cyan-400 transition-colors">
                              {project.title}
                            </h3>
                          </div>

                          <div className="md:w-5/12">
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                              {project.tagline}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {project.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-300"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="text-[11px] font-mono px-2 py-0.5 text-slate-400">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="md:w-2/12 md:text-right shrink-0">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveProject(project);
                              }}
                              className="inline-flex items-center gap-1.5 text-xs font-mono text-white px-4 py-2 rounded-full border border-white/10 bg-white/5 group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 transition-all min-h-[38px]"
                              aria-label={`View details for ${project.title}`}
                            >
                              <span>Dossier</span>
                              <svg
                                className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
