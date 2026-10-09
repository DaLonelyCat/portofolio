"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Github, Figma, CheckCircle, Terminal, Crosshair } from "lucide-react";
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#090b14] border-2 border-cyber-yellow/40 clip-corner p-5 sm:p-7 shadow-[0_0_40px_rgba(255,230,0,0.18)] text-left my-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HUD Corner Accents */}
        <div className="absolute top-2 left-2 text-[10px] font-mono text-yellow-500/40 select-none">
          +--[ HUD.DOSSIER_VIEW ]
        </div>
        <div className="absolute bottom-2 right-2 text-[10px] font-mono text-yellow-500/40 select-none">
          [ AUTH: VERIFIED ]--+
        </div>

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-yellow-500/20 pt-1">
          <div>
            <div className="flex items-center gap-2 mb-1.5 font-mono text-xs">
              <span className="px-2 py-0.5 bg-cyber-yellow/15 text-cyber-yellow font-bold border border-cyber-yellow/40 clip-corner-sm">
                {project.category.toUpperCase()}
              </span>
              <span className="text-cyber-yellow font-bold">YEAR: {project.year}</span>
              <span className="text-slate-500">// ID: {project.id}</span>
            </div>
            <h2 id="modal-title" className="text-xl sm:text-2xl font-black tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-0.5">{project.tagline}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close case study dialog"
            className="p-1.5 text-slate-400 hover:text-cyber-yellow hover:bg-white/5 transition-colors clip-corner-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content sections with compact spacing */}
        <div className="py-4 space-y-4">
          {/* Overview */}
          <div>
            <div className="flex items-center gap-1.5 font-mono text-xs text-cyber-yellow uppercase tracking-wider mb-1.5">
              <Terminal className="w-3.5 h-3.5" />
              <span>// SYSTEM_OVERVIEW</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-black/40 p-3 border border-yellow-500/15 clip-corner-sm">
              {project.overview}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.problem && (
                <div className="p-3 bg-black/60 border border-cyber-magenta/30 clip-corner-sm">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyber-magenta mb-1">
                    [ CHALLENGE_VECTOR ]
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{project.problem}</p>
                </div>
              )}
              {project.solution && (
                <div className="p-3 bg-black/60 border border-cyber-cyan/30 clip-corner-sm">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyber-cyan mb-1">
                    [ IMPLEMENTED_ARCHITECTURE ]
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{project.solution}</p>
                </div>
              )}
            </div>
          )}

          {/* Impact in Yellow */}
          {project.impact && (
            <div className="p-3 bg-cyber-yellow/10 border border-cyber-yellow/30 clip-corner-sm">
              <div className="flex items-start gap-2">
                <Crosshair className="w-4 h-4 text-cyber-yellow shrink-0 mt-0.5" />
                <div>
                  <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-cyber-yellow mb-0.5">
                    // QUANTIFIABLE_IMPACT
                  </div>
                  <p className="text-xs text-slate-100 leading-relaxed">{project.impact}</p>
                </div>
              </div>
            </div>
          )}

          {/* Technology stack */}
          <div>
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              // TELEMETRY_STACK
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] px-2 py-0.5 bg-black/80 border border-yellow-500/25 text-cyber-yellow clip-corner-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer / Links */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-yellow-500/20">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-black bg-cyber-yellow hover:bg-cyber-yellowHover px-3.5 py-1.5 clip-corner-sm transition-all shadow-neon-yellow-sm"
              >
                <span>LAUNCH_INTERFACE</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-300 hover:text-white bg-black/80 hover:bg-zinc-800 px-3 py-1.5 clip-corner-sm border border-yellow-500/20 transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                <span>SOURCE</span>
              </a>
            )}
            {project.figmaUrl && (
              <a
                href={project.figmaUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-xs text-slate-300 hover:text-white bg-black/80 hover:bg-zinc-800 px-3 py-1.5 clip-corner-sm border border-yellow-500/20 transition-colors"
              >
                <Figma className="w-3.5 h-3.5" />
                <span>FIGMA_TOKENS</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="font-mono text-xs text-slate-400 hover:text-cyber-yellow px-2 py-1 transition-colors"
          >
            DISMISS [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
