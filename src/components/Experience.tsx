"use client";

import React from "react";
import { Experience, EducationItem } from "../types/portfolio";

interface ExperienceProps {
  experiences: Experience[];
  education: EducationItem[];
}

export function ExperienceSection({ experiences, education }: ExperienceProps) {
  return (
    <section id="log" className="py-16 md:py-24 border-b border-rule/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cyber Section Header */}
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Operational Flight Log
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400 max-w-md sm:text-right">
            Executive leadership, financial oversight, and software engineering across ventures
          </span>
        </div>

        {/* Roles List (Cyber Timeline Cards) */}
        <div className="space-y-5 mb-16">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-[#0B0D16]/95 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-cyan-500/30 transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Left Column (4 cols) */}
              <div className="lg:col-span-4">
                <span className="text-xs font-mono text-cyan-400 block mb-1.5">
                  {exp.period} • {exp.location}
                </span>
                <h3 className="text-lg font-normal text-white">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-slate-300 font-medium">{exp.company}</span>
                  {exp.current && (
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-cyan-500/40 bg-cyan-950/40 text-cyan-400">
                      CURRENT
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column (8 cols) */}
              <div className="lg:col-span-8">
                <p className="text-sm text-slate-200 leading-relaxed mb-4">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-5 text-sm text-slate-300">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-cyan-400 mt-1 text-xs">•</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono px-3 py-0.5 rounded-full border border-white/10 bg-white/5 text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Education Subsection */}
        <div>
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-6 pb-2 border-b border-white/10 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>Formal Academic Background</span>
          </h3>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-[#0B0D16]/95 shadow-[0_4px_15px_rgba(0,0,0,0.5)] grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
              >
                <div className="lg:col-span-4">
                  <span className="text-xs font-mono text-slate-400 block mb-1">{edu.period}</span>
                  <h4 className="text-base font-normal text-white">{edu.institution}</h4>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-sm text-white font-medium">{edu.degree}</p>
                  {edu.notes && (
                    <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                      {edu.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
