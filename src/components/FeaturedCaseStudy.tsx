"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "../types/portfolio";

interface FeaturedCaseStudyProps {
  project: Project;
}

export function FeaturedCaseStudy({ project }: FeaturedCaseStudyProps) {
  const [activeTab, setActiveTab] = useState(0);
  const screenshots = project.screenshots || [];

  return (
    <section id="case-study" className="py-16 md:py-24 border-b border-rule/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Dossier Header Banner */}
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-xs text-accent font-mono uppercase tracking-wider block mb-1">
              Production Core Case Study
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-ink tracking-tight">
              {project.title}
            </h2>
            <p className="text-sm text-muted mt-2 max-w-2xl leading-relaxed">
              Custom point-of-sale and financial transaction tracking system built from scratch to streamline cashier workflows and operational accounting at Fruqita.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-muted bg-surface/80 px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
            <span className="text-accent font-medium">2026</span>
            <span>•</span>
            <span>Fruqita Operations</span>
          </div>
        </div>

        {/* Screenshot Showcase Container (Playful Rounded-3xl Glass Frame) */}
        <div className="rounded-3xl border border-white/10 bg-surface/60 backdrop-blur-xl shadow-2xl p-3 sm:p-6 mb-10">
          {/* Screenshot Navigation Tabs (Pill Rail) */}
          <div className="overflow-x-auto no-scrollbar mb-4">
            <div className="flex items-center gap-1.5 min-w-max p-1.5 rounded-full bg-black/40 border border-white/10">
              {screenshots.map((shot, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveTab(idx)}
                    className={`px-4 py-2 text-xs font-medium rounded-full transition-all min-h-[38px] flex items-center gap-2 ${
                      isActive
                        ? "bg-accent text-page shadow-md shadow-accent/25"
                        : "text-muted hover:text-ink hover:bg-white/5"
                    }`}
                    aria-pressed={isActive}
                  >
                    <span className="font-mono opacity-80">0{idx + 1}</span>
                    <span>{shot.label || shot.caption}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Screenshot Display (Rounded-2xl Frame) */}
          <div className="rounded-2xl p-2 sm:p-4 bg-black/30 border border-white/5 flex flex-col items-center">
            {screenshots[activeTab] && (
              <div className="relative w-full aspect-[16/10] max-h-[560px] rounded-xl overflow-hidden border border-white/10 bg-black/50 shadow-inner">
                <Image
                  src={screenshots[activeTab].src}
                  alt={screenshots[activeTab].caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1200px) 100vw, 1152px"
                  priority={activeTab === 0}
                />
              </div>
            )}
            <p className="text-xs text-muted text-center mt-3 font-normal px-4">
              {screenshots[activeTab]?.caption}
            </p>
          </div>
        </div>

        {/* Deep Dive Breakdown Columns (Rounded-2xl Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="p-6 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md shadow-md hover:border-white/20 hover:scale-[1.01] transition-all">
            <h3 className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
              Operational Problem
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md shadow-md hover:border-white/20 hover:scale-[1.01] transition-all">
            <h3 className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
              Software Solution
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md shadow-md hover:border-white/20 hover:scale-[1.01] transition-all">
            <h3 className="text-xs font-medium uppercase tracking-wider text-accent mb-2">
              Business Outcome
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {project.impact}
            </p>
          </div>
        </div>

        {/* Stack Highlights (Rounded Pill Chips) */}
        <div className="mt-6 p-5 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-muted font-medium">Architecture & Tech Stack:</span>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3.5 py-1 rounded-full border border-white/10 bg-white/5 text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
