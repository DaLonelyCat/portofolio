"use client";

import React from "react";
import { SkillCategory } from "../types/portfolio";

interface SkillsProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsProps) {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Direct Architectural Heading */}
        <div className="mb-10 pb-6 border-b border-rule flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <h2 className="text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Technical Competencies
          </h2>
          <span className="text-xs text-muted">
            Languages, systems architecture, and venture operations
          </span>
        </div>

        {/* 4-Column Technical Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-5 border border-rule bg-surface/85 backdrop-blur-sm flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-normal text-ink mb-1 pb-2 border-b border-rule">
                  {cat.title}
                </h3>
                <p className="text-xs text-muted leading-relaxed mb-4">
                  {cat.description}
                </p>

                <dl className="space-y-3">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="border-t border-rule/40 pt-2 first:border-0 first:pt-0">
                      <dt className="text-xs font-normal text-ink">
                        {skill.name}
                      </dt>
                      <dd className="text-[11px] text-muted mt-0.5 leading-snug">
                        {skill.context}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
