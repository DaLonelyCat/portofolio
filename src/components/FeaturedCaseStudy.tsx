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
    <section id="case-study" className="py-16 md:py-24 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Dossier Header Banner */}
        <div className="mb-10 pb-6 border-b border-rule flex flex-col md:flex-row md:items-end justify-between gap-4">
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

          <div className="shrink-0 flex items-center gap-2 text-xs font-mono text-muted bg-surface/80 px-3 py-1.5 border border-rule">
            <span className="text-accent">2026</span>
            <span>•</span>
            <span>Fruqita Operations</span>
          </div>
        </div>

        {/* Screenshot Showcase Container */}
        <div className="border border-rule bg-surface/85 backdrop-blur-sm overflow-hidden mb-10">
          {/* Screenshot Navigation Tabs */}
          <div className="flex flex-wrap items-center border-b border-rule bg-page/60">
            {screenshots.map((shot, idx) => {
              const isActive = activeTab === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-3.5 sm:px-4 py-3 text-xs font-normal transition-colors border-b-2 sm:border-b-0 sm:border-r border-rule min-h-[44px] flex items-center gap-2 ${
                    isActive
                      ? "bg-surface text-ink border-b-accent font-medium"
                      : "text-muted hover:text-ink hover:bg-surface/50 border-b-transparent"
                  }`}
                  aria-pressed={isActive}
                >
                  <span className="text-accent font-mono">0{idx + 1}</span>
                  <span>{shot.label || shot.caption}</span>
                </button>
              );
            })}
          </div>

          {/* Active Screenshot Display */}
          <div className="p-3 sm:p-6 bg-page/90 flex flex-col items-center">
            {screenshots[activeTab] && (
              <div className="relative w-full aspect-[16/10] max-h-[580px] border border-rule overflow-hidden bg-black/40">
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
            <p className="text-xs text-muted text-center mt-3 font-normal">
              {screenshots[activeTab]?.caption}
            </p>
          </div>
        </div>

        {/* Deep Dive Breakdown Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-5 border border-rule bg-surface/85 backdrop-blur-sm">
            <h3 className="text-xs font-normal uppercase tracking-wider text-accent mb-2">
              Operational Problem
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-5 border border-rule bg-surface/85 backdrop-blur-sm">
            <h3 className="text-xs font-normal uppercase tracking-wider text-accent mb-2">
              Software Solution
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="p-5 border border-rule bg-surface/85 backdrop-blur-sm">
            <h3 className="text-xs font-normal uppercase tracking-wider text-accent mb-2">
              Business Outcome
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              {project.impact}
            </p>
          </div>
        </div>

        {/* Stack Highlights */}
        <div className="mt-6 p-4 border border-rule bg-surface/70 backdrop-blur-sm flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs text-muted">Architecture & Tech Stack:</span>
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
    </section>
  );
}
