"use client";

import React, { useState } from "react";
import { Project } from "../types/portfolio";
import { ProjectModal } from "./ProjectModal";

interface ProjectsProps {
  projects: Project[];
  categories: string[];
}

const POPULAR_TAGS = [
  "All Tags",
  "React",
  "TypeScript",
  "Java",
  "Python",
  "Unity",
  "Tailwind CSS",
  "Offline-first",
  "Electron",
];

export function Projects({ projects, categories }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All Tags");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    // 1. Category filter
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;

    // 2. Tag filter
    const matchesTag =
      selectedTag === "All Tags" ||
      project.tags.some((t) => t.toLowerCase().includes(selectedTag.toLowerCase()));

    // 3. Search query filter
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      project.title.toLowerCase().includes(query) ||
      project.tagline.toLowerCase().includes(query) ||
      project.overview.toLowerCase().includes(query) ||
      project.tags.some((t) => t.toLowerCase().includes(query)) ||
      (project.problem && project.problem.toLowerCase().includes(query)) ||
      (project.solution && project.solution.toLowerCase().includes(query));

    return matchesCategory && matchesTag && matchesSearch;
  });

  // Separate featured UniCash POS when no active search query is filtering results
  const isSearching = Boolean(searchQuery.trim() || selectedTag !== "All Tags");
  const featuredProject = !isSearching ? filteredProjects.find((p) => p.id === "unicash-pos") : undefined;
  const regularProjects = !isSearching
    ? filteredProjects.filter((p) => p.id !== "unicash-pos")
    : filteredProjects;

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Directory Header */}
        <div className="mb-8">
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

        {/* Layout Split: Left Project Showcase & Right-Side Vertical Filter Rail */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Left Column: Projects Catalog */}
          <div className="flex-1 min-w-0 w-full">
            {/* Search Input Bar & Technology Filter Chips */}
            <div className="mb-6 space-y-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects by keyword, tech, or feature (e.g. React, Java, POS, Offline)..."
                  className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-[#0B0D16]/95 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-inner transition-all font-mono"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                    aria-label="Clear project search query"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Quick Tag Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider shrink-0 mr-1">
                  Stack:
                </span>
                {POPULAR_TAGS.map((tag) => {
                  const isTagActive = selectedTag === tag;
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setSelectedTag(tag)}
                      className={`text-[11px] font-mono px-3 py-1 rounded-full whitespace-nowrap transition-all ${
                        isTagActive
                          ? "bg-cyan-950/80 text-cyan-300 border border-cyan-400 shadow-[0_0_10px_rgba(0,240,255,0.3)] font-semibold"
                          : "border border-white/5 bg-white/5 text-slate-400 hover:text-slate-200 hover:border-white/15"
                      }`}
                    >
                      {tag}
                    </button>
                  );
                })}
                {(searchQuery || selectedTag !== "All Tags" || selectedCategory !== "All") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedTag("All Tags");
                      setSelectedCategory("All");
                    }}
                    className="text-[10px] font-mono text-rose-400 hover:text-rose-300 px-2.5 py-1 rounded-full border border-rose-500/20 bg-rose-950/20 whitespace-nowrap transition-colors ml-auto"
                  >
                    Reset Filters
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Category Filter Rail (< lg screens) */}
            <div className="lg:hidden mb-6 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
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

            {/* Empty State */}
            {filteredProjects.length === 0 ? (
              <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#0B0D16]/95">
                <p className="text-sm text-slate-400 mb-3">
                  No archive entries match the current search filters.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedTag("All Tags");
                    setSelectedCategory("All");
                  }}
                  className="text-xs font-mono text-cyan-300 hover:text-white px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/40"
                >
                  Clear Search & Filters
                </button>
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
                                className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300"
                              >
                                {tag}
                              </span>
                            ))}
                            {featuredProject.tags.length > 5 && (
                              <span className="text-xs font-mono px-2 py-1 text-slate-400">
                                +{featuredProject.tags.length - 5}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveProject(featuredProject);
                            }}
                            className="inline-flex items-center gap-2 text-xs font-mono px-5 py-2.5 rounded-full bg-cyan-400 text-black font-semibold shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.6)] transition-all min-h-[42px]"
                            aria-label={`View details for ${featuredProject.title}`}
                          >
                            <span>View Details</span>
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Right Column: High Resolution Screenshot Preview */}
                      <div className="lg:col-span-6">
                        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40 group-hover:border-cyan-500/50 transition-colors">
                          <img
                            src={featuredProject.screenshots?.[0]?.src || "/projects/unicash-cashier.png"}
                            alt={featuredProject.screenshots?.[0]?.caption || "UniCash POS interface"}
                            className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D16] via-transparent to-transparent opacity-40 pointer-events-none" />
                          <div className="absolute bottom-3 left-3 text-[11px] font-mono text-cyan-300/90 bg-black/75 px-3 py-1 rounded-full backdrop-blur-md border border-cyan-500/30">
                            Cashier Checkout Interface
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )}

                {/* Remaining 2-Column Responsive Grid */}
                {regularProjects.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {regularProjects.map((project) => (
                      <article
                        key={project.id}
                        onClick={() => setActiveProject(project)}
                        className="group relative rounded-3xl border border-white/10 bg-[#0B0D16]/95 p-6 sm:p-7 hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all duration-300 cursor-pointer flex flex-col justify-between shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                                {project.category}
                              </span>
                              {project.screenshots && project.screenshots.length > 0 && (
                                <span className="text-[10px] font-mono text-cyan-300/80 px-2 py-0.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 flex items-center gap-1">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  {project.screenshots.length} Screens
                                </span>
                              )}
                            </div>
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
          </div>

          {/* Right Column: Desktop Vertical Filter Bar */}
          <aside className="hidden lg:block w-64 shrink-0 sticky top-28">
            <div className="p-3 rounded-2xl bg-[#0B0D16]/95 border border-white/10 shadow-xl backdrop-blur-xl space-y-1.5">
              <div className="px-3 py-2 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 border-b border-white/10 mb-1">
                <span>Filter by Domain</span>
                <span className="text-cyan-400 font-mono">({projects.length})</span>
              </div>

              {categories.map((category) => {
                const isActive = selectedCategory === category;
                const count =
                  category === "All"
                    ? projects.length
                    : projects.filter((p) => p.category === category).length;

                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-xs font-mono px-3.5 py-2.5 rounded-xl transition-all flex items-center justify-between text-left ${
                      isActive
                        ? "bg-cyan-400 text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="truncate pr-2">{category}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 ${
                        isActive
                          ? "bg-black/20 text-black font-semibold"
                          : "bg-white/5 text-slate-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>

        {/* Semi-Fullscreen Project Detail Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
