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

  return (
    <section id="projects" className="py-16 md:py-20 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-rule">
          <div>
            <h2 className="text-xs font-normal uppercase tracking-wider text-muted mb-2">
              Work & Builds
            </h2>
            <h3 className="text-2xl sm:text-3xl font-light text-ink tracking-tight">
              Selected Projects
            </h3>
            <p className="text-sm text-muted mt-1 max-w-xl">
              Software built for business operations, mobile utilities, machine learning evaluation, and games.
            </p>
          </div>

          {/* Category Filter */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
            <div className="flex items-center gap-1.5 min-w-max">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`text-xs px-3 py-1.5 min-h-[36px] transition-colors border ${
                      isActive
                        ? "bg-ink text-paper border-ink font-normal"
                        : "bg-transparent text-muted border-rule hover:border-ink hover:text-ink"
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

        {/* Index List Rows */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 text-center border border-rule">
            <p className="text-sm text-muted">
              No projects found under this category filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-rule border-t border-b border-rule">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="group py-6 flex flex-col md:flex-row md:items-start justify-between gap-4 cursor-pointer hover:bg-rule/20 transition-colors px-2 sm:px-3 -mx-2 sm:-mx-3"
              >
                <div className="md:w-1/3">
                  <div className="flex items-center gap-2 text-xs text-muted mb-1">
                    <span className="text-accent">{project.category}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                  </div>
                  <h4 className="text-lg font-normal text-ink group-hover:text-accent transition-colors">
                    {project.title}
                  </h4>
                </div>

                <div className="md:w-1/2">
                  <p className="text-sm text-muted leading-relaxed mb-3">
                    {project.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 border border-rule text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="text-xs px-2 py-0.5 text-muted">
                        +{project.tags.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="md:w-auto md:text-right shrink-0 pt-2 md:pt-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProject(project);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs text-ink font-normal group-hover:text-accent transition-colors min-h-[44px]"
                    aria-label={`View details for ${project.title}`}
                  >
                    <span>Read overview</span>
                    <svg
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
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
        )}

        {/* Modal */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
