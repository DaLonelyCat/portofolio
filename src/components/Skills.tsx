"use client";

import React from "react";
import { SkillCategory } from "../types/portfolio";

interface SkillsProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsProps) {
  return (
    <section id="skills" className="py-16 md:py-20 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-rule">
          <h2 className="text-xs font-normal uppercase tracking-wider text-muted mb-2">
            Competencies
          </h2>
          <h3 className="text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Skills & Technical Focus
          </h3>
          <p className="text-sm text-muted mt-1 max-w-xl">
            Software development, systems architecture, and business operations.
          </p>
        </div>

        {/* 2-Column Grouped Definition Lists */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {categories.map((cat, idx) => (
            <div key={idx} className="pb-4">
              <h4 className="text-base font-normal text-ink mb-1 pb-2 border-b border-rule">
                {cat.title}
              </h4>
              <p className="text-xs text-muted leading-relaxed mb-4">
                {cat.description}
              </p>

              <dl className="divide-y divide-rule/60">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="py-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <dt className="text-sm font-normal text-ink">
                      {skill.name}
                    </dt>
                    <dd className="text-xs text-muted sm:text-right">
                      {skill.context}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
