"use client";

import React, { useEffect } from "react";
import { Project } from "../types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-paper border border-rule p-6 sm:p-8 text-left my-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-rule">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-muted">
              <span className="text-accent font-normal">{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
            <h2 id="modal-title" className="text-2xl font-light text-ink tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-muted mt-1 leading-relaxed">{project.tagline}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close project details"
            className="p-2 text-muted hover:text-ink border border-transparent hover:border-rule transition-colors shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-muted mb-2 font-normal">
              Overview
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              {project.overview}
            </p>
          </div>

          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.problem && (
                <div className="p-4 border border-rule bg-paper">
                  <h4 className="text-xs uppercase tracking-wider text-muted mb-1.5 font-normal">
                    Challenge
                  </h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-4 border border-rule bg-paper">
                  <h4 className="text-xs uppercase tracking-wider text-muted mb-1.5 font-normal">
                    Solution
                  </h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>
          )}

          {project.impact && (
            <div className="p-4 border border-rule">
              <h4 className="text-xs uppercase tracking-wider text-muted mb-1 font-normal">
                Outcome
              </h4>
              <p className="text-sm text-ink leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}

          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted mb-2 font-normal">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 border border-rule text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-rule flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-normal text-paper bg-accent hover:bg-accentHover transition-colors focus-visible:outline-accent"
              >
                <span>View source on GitHub</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-normal text-ink border border-rule hover:border-ink transition-colors focus-visible:outline-accent"
              >
                <span>Download / Live release</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-muted hover:text-ink transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
