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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 text-left my-4 max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/10">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs text-muted">
              <span className="text-accent font-medium px-2.5 py-0.5 rounded-full bg-accent/15 border border-accent/20">
                {project.category}
              </span>
              <span>•</span>
              <span className="font-mono">{project.year}</span>
            </div>
            <h2 id="modal-title" className="text-xl sm:text-2xl font-light text-ink tracking-tight">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-muted hover:text-ink transition-colors shrink-0 min-h-[40px] min-w-[40px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Screenshots Showcase (if available) */}
        {screenshots.length > 0 && (
          <div className="py-5 border-b border-white/10">
            {/* Main Image Frame */}
            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-inner mb-3">
              <Image
                src={screenshots[activeShot].src}
                alt={screenshots[activeShot].caption}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
            <p className="text-xs text-muted text-center mb-3">
              {screenshots[activeShot].caption}
            </p>

            {/* Thumbnail Navigation */}
            {screenshots.length > 1 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {screenshots.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveShot(idx)}
                    className={`text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      activeShot === idx
                        ? "border-accent bg-accent text-page font-medium shadow-md shadow-accent/20"
                        : "border-white/10 bg-white/5 text-muted hover:text-ink"
                    }`}
                  >
                    <span>0{idx + 1}</span>
                    {s.label && <span className="ml-1.5">{s.label}</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Content Body */}
        <div className="py-5 space-y-5 text-sm">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted mb-1.5">
              Overview
            </h3>
            <p className="text-ink leading-relaxed">
              {project.overview}
            </p>
          </div>

          {project.problem && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-accent mb-1.5">
                The Problem
              </h3>
              <p className="text-muted leading-relaxed">
                {project.problem}
              </p>
            </div>
          )}

          {project.solution && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-accent mb-1.5">
                The Solution
              </h3>
              <p className="text-muted leading-relaxed">
                {project.solution}
              </p>
            </div>
          )}

          {project.impact && (
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-accent mb-1.5">
                Measurable Impact
              </h3>
              <p className="text-muted leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}

          {/* Tags */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted mb-2">
              Technologies & Architecture
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/5 text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-5 border-t border-white/10 flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-medium text-page bg-accent hover:bg-accentHover transition-all shadow-md shadow-accent/20 min-h-[44px]"
            >
              <span>View Live / Download</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}

          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-normal text-ink border border-white/10 bg-white/5 hover:border-white/30 transition-all min-h-[44px]"
            >
              <span>Source Repository</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}

          <button
            onClick={onClose}
            type="button"
            className="ml-auto px-5 py-2.5 rounded-full text-xs text-muted hover:text-ink transition-colors min-h-[44px]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
