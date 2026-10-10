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

  // Separate featured UniCash POS when present in the filtered view
  const featuredProject = filteredProjects.find((p) => p.id === "unicash-pos");
  const regularProjects = filteredProjects.filter((p) => p.id !== "unicash-pos");

  return (
    <section id="projects" className="py-16 md:py-24 border-b border-rule/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Directory Header (No cyan dot) */}
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-1.5">
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

          {/* Category Filter Rail */}
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

        {/* Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#0B0D16]/95">
            <p className="text-sm text-slate-400">
              No archive entries match the selected category.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Hero Showcase: UniCash POS */}
            {featuredProject && (
              <article
                onClick={() => setActiveProject(featuredProject)}
                className="group relative rounded-3xl border border-cyan-500/40 bg-[#0B0D16]/95 p-6 sm:p-8 lg:p-10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,240,255,0.15)] transition-all duration-300 cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.7)]"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Details & Narrative */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="text-xs font-mono text-amber-400 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30">
                          PRODUCTION CORE
                        </span>
                        <span className="text-xs font-mono text-cyan-400 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                          {featuredProject.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400 px-2 py-0.5">
                          {featuredProject.year}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-normal text-white group-hover:text-cyan-400 transition-colors mb-3">
                        {featuredProject.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed mb-4">
                        {featuredProject.tagline}
                      </p>

                      <p className="text-xs text-slate-400 leading-relaxed mb-6">
                        {featuredProject.problem}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featuredProject.tags.slice(0, 5).map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProject(featuredProject);
                        }}
                        className="inline-flex items-center gap-2 text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 px-5 py-2.5 rounded-full transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] min-h-[40px]"
                        aria-label={`View details for ${featuredProject.title}`}
                      >
                        <span>View Details</span>
                        <svg
                          className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Screenshot Visual */}
                  <div className="lg:col-span-6">
                    <div className="relative rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl bg-black/60 aspect-[16/10]">
                      <img
                        src="/projects/unicash-cashier.png"
                        alt="UniCash POS Cashier Interface"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-3 left-4 text-[11px] font-mono text-cyan-400 bg-black/80 px-2.5 py-1 rounded-md border border-cyan-500/20 backdrop-blur-sm">
                        Cashier Checkout Interface
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* 2-Column Responsive Card Grid for Other Projects */}
            {regularProjects.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {regularProjects.map((project) => (
                  <article
                    key={project.id}
                    onClick={() => setActiveProject(project)}
                    className="group rounded-2xl border border-white/10 bg-[#0B0D16]/95 p-6 hover:border-cyan-500/40 hover:bg-[#111422] hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                          {project.category}
                        </span>
                        <span className="text-xs font-mono text-slate-400">
                          {project.year}
                        </span>
                      </div>

                      <h3 className="text-lg font-normal text-white group-hover:text-cyan-400 transition-colors mb-2">
                        {project.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                        {project.tagline}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 mb-5 pt-3 border-t border-white/10">
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

                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveProject(project);
                          }}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-white px-4 py-2 rounded-full border border-white/10 bg-white/5 group-hover:bg-cyan-400 group-hover:text-black group-hover:border-cyan-400 transition-all min-h-[38px]"
                          aria-label={`View details for ${project.title}`}
                        >
                          <span>View Details</span>
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
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Semi-Fullscreen Project Detail Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
