"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "../types/portfolio";
import { DumbbellPlayground } from "./DumbbellPlayground";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeShot, setActiveShot] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"gallery" | "playground">("gallery");
  const [aspectRatios, setAspectRatios] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };

    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      setActiveShot(0);
      setActiveTab("gallery");
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose, isLightboxOpen]);

  if (!project) return null;

  const screenshots = project.screenshots || [];
  const currentSrc = screenshots[activeShot]?.src || "";
  const detectedRatio = aspectRatios[currentSrc] ?? (project.id === "nestfit-workout" ? 0.49 : 1.78);
  const isPortrait = detectedRatio < 1.0;

  // Guard: Only display repository button if it points to an actual repository, not just the user's root profile
  const isValidRepo = Boolean(
    project.repoUrl &&
    !/^https?:\/\/(www\.)?github\.com\/[^/]+\/?$/i.test(project.repoUrl)
  );

  return (
    <>
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

          {/* NestFit Interactive Companion Switcher Tabs */}
          {project.id === "nestfit-workout" && (
            <div className="flex items-center gap-2 mb-6 p-1.5 rounded-full bg-white/5 border border-white/10 w-fit">
              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className={`text-xs font-mono px-4 py-1.5 rounded-full transition-all ${
                  activeTab === "gallery"
                    ? "bg-cyan-400 text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Screenshot Gallery (4)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("playground")}
                className={`text-xs font-mono px-4 py-1.5 rounded-full transition-all ${
                  activeTab === "playground"
                    ? "bg-emerald-400 text-black font-semibold shadow-[0_0_12px_rgba(16,185,129,0.4)]"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Try Live Plate Calculator
              </button>
            </div>
          )}

          {/* Conditional Playground View for NestFit */}
          {project.id === "nestfit-workout" && activeTab === "playground" ? (
            <div className="space-y-6">
              <DumbbellPlayground />
              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("gallery")}
                  className="text-xs font-mono text-cyan-300 hover:text-white px-4 py-2 rounded-full border border-white/10 bg-white/5"
                >
                  Return to Screenshots
                </button>
              </div>
            </div>
          ) : screenshots.length > 0 ? (
            /* Layout with Screenshots */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: High-Res Screenshot Viewer & Actions */}
              <div className="lg:col-span-7 space-y-4">
                {/* Auto-Resizing Adaptive Container with Lightbox Click */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className={`relative overflow-hidden cursor-zoom-in group transition-all duration-300 ${
                    isPortrait
                      ? "w-full max-w-[280px] sm:max-w-[320px] aspect-[9/18.5] max-h-[560px] mx-auto rounded-3xl border-2 border-white/20 bg-black/90 p-1.5 shadow-[0_15px_50px_rgba(0,0,0,0.9)]"
                      : "w-full aspect-video sm:aspect-[16/10] max-h-[460px] rounded-2xl border border-white/15 bg-black/60 shadow-inner flex items-center justify-center p-2"
                  }`}
                  title="Click to view full-size image"
                >
                  <Image
                    src={screenshots[activeShot].src}
                    alt={screenshots[activeShot].caption}
                    fill
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 680px"
                    priority
                    onLoad={(e) => {
                      const img = e.currentTarget;
                      if (img.naturalWidth && img.naturalHeight) {
                        setAspectRatios((prev) => ({
                          ...prev,
                          [screenshots[activeShot].src]: img.naturalWidth / img.naturalHeight,
                        }));
                      }
                    }}
                  />

                  {/* Hover Zoom Pill */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 pointer-events-none">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                    <span>Click to Zoom</span>
                  </div>
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
                    <span>View Live</span>
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
                    <span>View Live</span>
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

    {/* Fullscreen Lightbox Zoom Overlay */}
    {isLightboxOpen && screenshots.length > 0 && (
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Image Fullscreen Lightbox"
        className="fixed inset-0 z-[60] flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-200"
        onClick={() => setIsLightboxOpen(false)}
      >
        <div
          className="relative max-w-6xl max-h-[92vh] flex flex-col items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Lightbox Button */}
          <button
            type="button"
            onClick={() => setIsLightboxOpen(false)}
            className="absolute -top-12 right-0 p-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            aria-label="Close Lightbox Zoom View"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Full Resolution Image Container */}
          <div className="relative max-h-[80vh] max-w-[92vw] flex items-center justify-center overflow-hidden rounded-2xl border border-white/20 shadow-2xl bg-black/90 p-2">
            <img
              src={screenshots[activeShot].src}
              alt={screenshots[activeShot].caption}
              className="max-h-[76vh] max-w-[90vw] w-auto h-auto object-contain rounded-lg"
            />
          </div>

          <div className="mt-3 flex items-center justify-between w-full max-w-2xl px-3 text-xs font-mono text-slate-300">
            <span>{screenshots[activeShot].caption}</span>
            <span className="text-cyan-400">
              {activeShot + 1} / {screenshots.length}
            </span>
          </div>
        </div>
      </div>
    )}
  </>
  );
}
