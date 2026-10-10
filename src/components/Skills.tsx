"use client";

import React from "react";
import { SkillCategory } from "../types/portfolio";

interface SkillsProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsProps) {
  return (
    <section id="skills" className="py-16 md:py-24 border-b border-rule/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Skills
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Languages, architecture patterns, and venture operations
          </span>
        </div>

        {/* 4-Column Capability Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-white/10 bg-[#0B0D16]/95 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-base font-medium text-white mb-2">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-6 pb-4 border-b border-white/10">
                  {cat.description}
                </p>

                <dl className="space-y-3.5">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="border-t border-white/5 pt-2.5 first:border-0 first:pt-0">
                      <dt className="text-xs font-normal text-white">
                        {skill.name}
                      </dt>
                      <dd className="text-[11px] text-slate-400 mt-0.5 leading-snug">
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
