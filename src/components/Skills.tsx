"use client";

import React from "react";
import { Cpu, Zap, Activity } from "lucide-react";
import { SkillCategory } from "../types/portfolio";

interface SkillsProps {
  categories: SkillCategory[];
}

export function SkillsSection({ categories }: SkillsProps) {
  return (
    <section id="skills" className="py-8 md:py-12 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-cyber-yellow font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Cpu className="w-3.5 h-3.5 text-cyber-yellow" />
            <span>// CYBERWARE // TECHNICAL_CAPABILITIES</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            NEURAL MODULES & STACK
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Multi-domain proficiencies spanning systemic interface architecture, high-performance web engineering, and automated developer operations.
          </p>
        </div>

        {/* Responsive 4-Column Grid for all 4 Competency Domains */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, idx) => {
            const moduleCode = `SYS_MOD_0${idx + 1}`;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-4 sm:p-5 cyber-panel clip-corner border-yellow-500/20 hover:border-cyber-yellow"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-yellow-500/15">
                    <span className="font-mono text-xs font-bold text-cyber-yellow tracking-wider">
                      [{moduleCode}]
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[10px] text-cyber-yellow font-bold">
                      <Zap className="w-3 h-3 text-cyber-yellow animate-pulse" />
                      <span>LVL: MAX</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-white mb-1">{cat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">{cat.description}</p>

                  <div className="space-y-2">
                    {cat.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-2.5 bg-black/60 border border-yellow-500/15 clip-corner-sm hover:border-cyber-yellow/60 hover:bg-yellow-500/5 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-mono text-xs font-bold text-slate-100">
                            {skill.name}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-yellow shadow-[0_0_6px_#ffe600]" />
                        </div>
                        <p className="font-mono text-[10px] text-slate-400 mt-0.5">
                          {skill.context}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
