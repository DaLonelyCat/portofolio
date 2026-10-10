"use client";

import React from "react";
import { Experience, EducationItem } from "../types/portfolio";

interface ExperienceProps {
  experiences: Experience[];
  education: EducationItem[];
}

export function ExperienceSection({ experiences, education }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-rule/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Experience
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 max-w-md sm:text-right">
            Executive leadership, financial oversight, and software engineering
          </span>
        </div>

        {/* Compact 2-Column Split: Work Roles Left, Education Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (7 cols): Work Roles */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 pb-2 border-b border-white/10">
              Work & Leadership
            </h3>

            <div className="space-y-5">
              {experiences.map((exp) => (
                <article
                  key={exp.id}
                  className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0B0D16]/95 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-cyan-400">
                      {exp.period} • {exp.location}
                    </span>
                    {exp.current && (
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-400">
                        CURRENT
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-medium text-white">
                    {exp.role}
                  </h4>
                  <div className="text-sm text-slate-300 font-normal mb-3">
                    {exp.company}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-1.5 mb-5 text-xs sm:text-sm text-slate-300">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <span className="text-cyan-400 mt-1 text-xs">•</span>
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Education & Academics */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 pb-2 border-b border-white/10">
              Education & Academics
            </h3>

            <div className="space-y-5">
              {education.map((edu, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0B0D16]/95 shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
                >
                  <span className="text-xs font-mono text-slate-400 block mb-1">
                    {edu.period}
                  </span>
                  <h4 className="text-base sm:text-lg font-medium text-white mb-1">
                    {edu.institution}
                  </h4>
                  <p className="text-sm text-cyan-400/90 font-mono mb-3">
                    {edu.degree}
                  </p>

                  {edu.notes && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-3 border-t border-white/10">
                      {edu.notes}
                    </p>
                  )}
                </div>
              ))}

              {/* Academic Highlights Summary */}
              <div className="p-6 rounded-2xl border border-cyan-500/20 bg-[#0B0D16]/80 text-xs font-sans space-y-3">
                <span className="text-xs font-mono text-cyan-400 block uppercase tracking-wider">
                  Academic Focus
                </span>
                <p className="text-slate-300 leading-relaxed">
                  Specializing in software engineering, multi-platform system architecture, and interactive multimedia interfaces.
                </p>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                    UI/UX Design
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                    Game Architecture
                  </span>
                  <span className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400">
                    Full-Stack Systems
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
