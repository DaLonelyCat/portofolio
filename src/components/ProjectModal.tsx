"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "../types/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeShot, setActiveShot] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setActiveShot(0);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const screenshots = project.screenshots || [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface/95 backdrop-blur-md border border-rule p-5 sm:p-8 text-left my-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-rule">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5 text-xs text-muted">
              <span className="text-accent">{project.category}</span>
              <span>•</span>
              <span>{project.year}</span>
            </div>
            <h2 id="modal-title" className="text-xl sm:text-2xl font-light text-ink tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">{project.tagline}</p>
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

        {/* Optional Screenshot Preview */}
        {screenshots.length > 0 && (
          <div className="pt-4 pb-2 border-b border-rule">
            <div className="relative w-full aspect-[16/10] border border-rule overflow-hidden bg-page">
              <Image
                src={screenshots[activeShot].src}
                alt={screenshots[activeShot].caption}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            {screenshots.length > 1 && (
              <div className="flex gap-2 mt-2.5 overflow-x-auto pb-1">
                {screenshots.map((shot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveShot(idx)}
                    className={`text-xs px-2.5 py-1 border transition-colors shrink-0 ${
                      activeShot === idx
                        ? "border-accent text-ink bg-page"
                        : "border-rule text-muted hover:text-ink"
                    }`}
                  >
                    {shot.label || `View ${idx + 1}`}
                  </button>
                ))}
              </div>
            )}
            <p className="text-xs text-muted mt-2">
              {screenshots[activeShot].caption}
            </p>
          </div>
        )}

        {/* Content */}
        <div className="py-5 space-y-5">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-muted mb-1.5 font-normal">
              Overview
            </h3>
            <p className="text-sm text-ink leading-relaxed">
              {project.overview}
            </p>
          </div>

          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.problem && (
                <div className="p-3.5 border border-rule bg-page">
                  <h4 className="text-xs uppercase tracking-wider text-accent mb-1 font-normal">
                    Problem
                  </h4>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-3.5 border border-rule bg-page">
                  <h4 className="text-xs uppercase tracking-wider text-accent mb-1 font-normal">
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
            <div className="p-3.5 border border-rule bg-page">
              <h4 className="text-xs uppercase tracking-wider text-accent mb-1 font-normal">
                Outcome
              </h4>
              <p className="text-xs sm:text-sm text-ink leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}

          <div>
            <h4 className="text-xs uppercase tracking-wider text-muted mb-2 font-normal">
              Technologies & Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-0.5 border border-rule bg-page text-muted"
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-normal text-page bg-accent hover:bg-accentHover transition-colors focus-visible:outline-accent"
              >
                <span>View on GitHub</span>
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
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-normal text-ink border border-rule hover:border-ink transition-colors focus-visible:outline-accent"
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
            className="px-3 py-1.5 text-xs text-muted hover:text-ink transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
