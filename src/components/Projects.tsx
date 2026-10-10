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
    <section id="projects" className="py-16 md:py-24 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Integrated Directory Toolbar */}
        <div className="mb-10 pb-6 border-b border-rule flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-baseline gap-3 mb-1">
              <h2 className="text-2xl sm:text-3xl font-light text-ink tracking-tight">
                Project Index
              </h2>
              <span className="text-xs text-muted font-mono">
                ({filteredProjects.length} {filteredProjects.length === 1 ? "entry" : "entries"})
              </span>
            </div>
            <p className="text-xs text-muted max-w-lg">
              Chronological ledger of shipped desktop applications, web platforms, and utilities.
            </p>
          </div>

          {/* Integrated Filter Pills */}
          <div className="overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center gap-1.5 min-w-max bg-surface/85 backdrop-blur-sm p-1 border border-rule">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs px-3 py-1.5 min-h-[38px] transition-colors ${
                      isActive
                        ? "bg-accent text-page font-medium"
                        : "text-muted hover:text-ink hover:bg-surfaceHover/50"
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
          <div className="p-12 text-center border border-rule bg-surface/80 backdrop-blur-sm">
            <p className="text-sm text-muted">
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
                  className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start border-t border-rule pt-8"
                >
                  {/* Left Column: Bold Year Marker */}
                  <div className="lg:col-span-2">
                    <span className="text-2xl sm:text-4xl font-light text-muted font-mono tracking-tight">
                      {year}
                    </span>
                    <span className="block text-xs text-muted/60 mt-1">
                      {yearProjects.length} {yearProjects.length === 1 ? "project" : "projects"}
                    </span>
                  </div>

                  {/* Right Column: Project Rows for this Year */}
                  <div className="lg:col-span-10 divide-y divide-rule/60 border-b border-rule/60">
                    {yearProjects.map((project) => (
                      <article
                        key={project.id}
                        onClick={() => setActiveProject(project)}
                        className="group py-5 flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer hover:bg-surface/60 transition-colors px-3 -mx-3"
                      >
                        <div className="md:w-5/12">
                          <span className="text-xs text-accent block mb-1">
                            {project.category}
                          </span>
                          <h3 className="text-base sm:text-lg font-normal text-ink group-hover:text-accent transition-colors">
                            {project.title}
                          </h3>
                        </div>

                        <div className="md:w-5/12">
                          <p className="text-xs sm:text-sm text-muted leading-relaxed mb-2.5">
                            {project.tagline}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="text-[11px] px-2 py-0.5 border border-rule/60 bg-page text-muted"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-[11px] px-1.5 py-0.5 text-muted/70">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="md:w-2/12 md:text-right shrink-0 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveProject(project);
                            }}
                            className="inline-flex items-center gap-1 text-xs text-ink group-hover:text-accent transition-colors min-h-[44px]"
                            aria-label={`View details for ${project.title}`}
                          >
                            <span>Details</span>
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
                    ))}
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
