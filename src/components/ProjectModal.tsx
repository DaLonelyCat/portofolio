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

  // Guard: Only display repository button if it points to an actual repository, not just the user's root profile
  const isValidRepo = Boolean(
    project.repoUrl &&
    !/^https?:\/\/(www\.)?github\.com\/[^/]+\/?$/i.test(project.repoUrl)
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-[95vw] max-w-6xl bg-[#0B0D16]/98 backdrop-blur-2xl border border-cyan-500/25 rounded-3xl p-6 sm:p-8 lg:p-10 text-left my-4 max-h-[92vh] overflow-y-auto shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-white/10 mb-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
              <span className="text-cyan-400 font-mono px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30">
                {project.category}
              </span>
              <span className="text-slate-500">•</span>
              <span className="font-mono text-slate-400">{project.year}</span>
              {project.id === "unicash-pos" && (
                <>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-400 font-mono px-3 py-0.5 rounded-full bg-amber-950/40 border border-amber-500/30">
                    PRODUCTION CORE
                  </span>
                </>
              )}
            </div>
            <h2 id="modal-title" className="text-2xl sm:text-3xl lg:text-4xl font-light text-white tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 mt-1.5 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close dialog"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Semi-Fullscreen Responsive Content Canvas */}
        {screenshots.length > 0 ? (
          /* Layout with Screenshots (e.g. UniCash POS) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: High-Res Screenshot Viewer & Actions */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative w-full aspect-video sm:aspect-[16/10] min-h-[340px] sm:min-h-[420px] rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-inner flex items-center justify-center">
                <Image
                  src={screenshots[activeShot].src}
                  alt={screenshots[activeShot].caption}
                  fill
                  className="object-contain p-2"
                  sizes="(max-width: 1024px) 100vw, 680px"
                  priority
                />
              </div>

              <p className="text-xs font-mono text-slate-400 text-center">
                {screenshots[activeShot].caption}
              </p>

              {/* Thumbnail Selector Tabs */}
              {screenshots.length > 1 && (
                <div className="flex flex-wrap gap-2 justify-center pt-1">
                  {screenshots.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveShot(idx)}
                      className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all ${
                        activeShot === idx
                          ? "border-cyan-400 bg-cyan-400 text-black font-medium shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                          : "border-white/10 bg-white/5 text-slate-400 hover:text-white"
                      }`}
                    >
                      <span>0{idx + 1}</span>
                      {s.label && <span className="ml-1.5">{s.label}</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* Action Toolbar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] min-h-[44px]"
                  >
                    <span>View Live / Download</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

                {isValidRepo && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-white border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 transition-all min-h-[44px]"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Source Repository</span>
                  </a>
                )}

                <button
                  onClick={onClose}
                  type="button"
                  className="ml-auto px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Right Column: Narrative Details & Systems Matrix */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                  Overview
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {project.problem && (
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                    The Problem
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                    The Solution
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.impact && (
                <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                    Measurable Impact
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.impact}
                  </p>
                </div>
              )}

              <div className="p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Technologies & Architecture
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Layout without Screenshots (e.g. KOYA, GymBuddy, CNN, AR Planetarium) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column (5 cols): Overview Narrative, Tags & Actions */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2.5">
                  Overview
                </h3>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                  {project.overview}
                </p>
              </div>

              <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                  Technologies & Architecture
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1 rounded-full border border-white/10 bg-white/5 text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] min-h-[44px]"
                  >
                    <span>View Live / Download</span>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

                {isValidRepo && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono text-white border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 transition-all min-h-[44px]"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                    <span>Source Repository</span>
                  </a>
                )}

                <button
                  onClick={onClose}
                  type="button"
                  className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Right Column (7 cols): Problem, Solution & Impact Cards */}
            <div className="lg:col-span-7 space-y-4">
              {project.problem && (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-amber-400 mb-2">
                    The Problem
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {project.problem}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                    The Solution
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {project.solution}
                  </p>
                </div>
              )}

              {project.impact && (
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02]">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
                    Measurable Impact
                  </h3>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {project.impact}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
