"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Project } from "../types/portfolio";
import { SectionHeader } from "./SectionHeader";

interface FeaturedCaseStudyProps {
  project: Project;
}

export function FeaturedCaseStudy({ project }: FeaturedCaseStudyProps) {
  const [activeTab, setActiveTab] = useState(0);
  const screenshots = project.screenshots || [];

  return (
    <section id="case-study" className="py-16 md:py-24 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="02"
          category="Featured Production Case Study"
          title={project.title}
          description="A custom point of sale and financial accounting system built from scratch to streamline daily operations at Fruqita."
        />

        {/* Screenshot Showcase Container */}
        <div className="border border-rule bg-surface overflow-hidden mb-10">
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
          <div className="p-5 border border-rule bg-surface">
            <h4 className="text-xs font-normal uppercase tracking-wider text-accent mb-2">
              Operational Problem
            </h4>
            <p className="text-sm text-muted leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div className="p-5 border border-rule bg-surface">
            <h4 className="text-xs font-normal uppercase tracking-wider text-accent mb-2">
              Software Solution
            </h4>
            <p className="text-sm text-muted leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="p-5 border border-rule bg-surface">
            <h4 className="text-xs font-normal uppercase tracking-wider text-accent mb-2">
              Business Outcome
            </h4>
            <p className="text-sm text-muted leading-relaxed">
              {project.impact}
            </p>
          </div>
        </div>

        {/* Stack Highlights */}
        <div className="mt-6 p-4 border border-rule bg-surface/60 flex flex-wrap items-center justify-between gap-4">
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
