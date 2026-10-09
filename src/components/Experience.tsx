"use client";

import React from "react";
import { Briefcase, GraduationCap, Calendar, MapPin, Crosshair, Terminal, Award, Zap } from "lucide-react";
import { Experience, EducationItem } from "../types/portfolio";

interface ExperienceProps {
  experiences: Experience[];
  education: EducationItem[];
}

export function ExperienceSection({ experiences, education }: ExperienceProps) {
  return (
    <section id="experience" className="py-8 md:py-12 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12">
        {/* Section Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-cyber-yellow font-mono text-xs font-semibold uppercase tracking-wider mb-1">
            <Terminal className="w-3.5 h-3.5" />
            <span>// OPERATIONAL_LOG // CAREER_CHRONOLOGY</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            MISSION HISTORY & ROLES
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Leadership and direct engineering across design systems, reactive architectures, and product squads.
          </p>
        </div>

        {/* 2-Column Wide Screen Layout to maximize space! */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Main Timeline */}
          <div className="lg:col-span-8">
            <div className="relative border-l-2 border-yellow-500/30 ml-2 sm:ml-3 space-y-5 pb-2">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="relative pl-5 sm:pl-6 group">
                  {/* Timeline Marker Node in Yellow & Cyan */}
                  <div
                    className={`absolute -left-[9px] top-1.5 w-3.5 h-3.5 border-2 clip-corner-sm transition-all ${
                      exp.current
                        ? "bg-cyber-yellow border-cyber-yellow shadow-[0_0_10px_#ffe600]"
                        : "bg-black border-yellow-500/50 group-hover:border-cyber-yellow group-hover:bg-yellow-500/20"
                    }`}
                  />

                  {/* Experience Card with Compact Padding */}
                  <div className="p-4 sm:p-5 cyber-panel clip-corner border-cyan-500/20 hover:border-cyber-yellow">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                      <div>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-cyber-yellow uppercase tracking-wider">
                          <span>LOG_0{index + 1}</span>
                          {exp.current && (
                            <span className="px-1.5 py-0.2 bg-yellow-500/20 text-cyber-yellow border border-yellow-500/40 clip-corner-sm font-bold">
                              ACTIVE_OPERATIVE
                            </span>
                          )}
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyber-yellow transition-colors">
                          {exp.role}
                        </h3>
                        <div className="font-mono text-xs font-semibold text-cyber-yellow">
                          @{exp.company.toUpperCase()}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-slate-400">
                        <span className="flex items-center gap-1 text-cyber-yellow font-bold">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                        <span className="text-slate-600">//</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <MapPin className="w-3 h-3 text-cyber-cyan" />
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {exp.description}
                    </p>

                    {/* Key Accomplishments with Yellow Crosshairs */}
                    <div className="space-y-1.5 mb-3">
                      {exp.highlights.map((highlight, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-200 leading-normal">
                          <Crosshair className="w-3.5 h-3.5 text-cyber-yellow shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tech Pills */}
                    <div className="flex flex-wrap gap-1 pt-2.5 border-t border-cyan-500/15 font-mono">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] px-2 py-0.5 bg-black/80 border border-slate-800 text-slate-300 clip-corner-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (4 cols): Academic Record & Operational Clearances (Fills space!) */}
          <div className="lg:col-span-4 space-y-4">
            {/* Academic Record Card */}
            <div className="p-4 sm:p-5 cyber-panel-yellow clip-corner">
              <div className="flex items-center gap-2 text-cyber-yellow font-mono text-xs font-semibold uppercase tracking-wider mb-3 pb-2 border-b border-yellow-500/20">
                <GraduationCap className="w-4 h-4 text-cyber-yellow" />
                <span>// ACCREDITATION // DEGREES</span>
              </div>

              {education.map((edu, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="font-mono text-[10px] text-cyber-yellow font-bold">
                    [{edu.period}]
                  </div>
                  <h4 className="text-sm font-bold text-white font-mono">{edu.degree}</h4>
                  <div className="text-xs text-cyber-cyan font-mono">{edu.institution.toUpperCase()}</div>
                  {edu.notes && (
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed bg-black/40 p-2.5 border border-yellow-500/15 clip-corner-sm">
                      {edu.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Operational Directives Card */}
            <div className="p-4 sm:p-5 cyber-panel clip-corner border-cyan-500/25">
              <div className="flex items-center gap-2 text-cyber-cyan font-mono text-xs font-semibold uppercase tracking-wider mb-3 pb-2 border-b border-cyan-500/20">
                <Award className="w-4 h-4 text-cyber-cyan" />
                <span>// OPERATIONAL_DIRECTIVES</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 bg-black/60 border border-yellow-500/20 clip-corner-sm flex items-center justify-between">
                  <span className="text-slate-300">VENTURE_OPS</span>
                  <span className="text-cyber-yellow font-bold">MYBEANS FOUNDER & CEO</span>
                </div>
                <div className="p-2 bg-black/60 border border-cyan-500/20 clip-corner-sm flex items-center justify-between">
                  <span className="text-slate-300">FINANCIAL_SYS</span>
                  <span className="text-cyber-cyan font-bold">FRUQITA CFO & POS DEV</span>
                </div>
                <div className="p-2 bg-black/60 border border-magenta-500/20 clip-corner-sm flex items-center justify-between">
                  <span className="text-slate-300">CORE_PHILOSOPHY</span>
                  <span className="text-cyber-magenta font-bold">SIMPLE, FAST & EFFICIENT</span>
                </div>
                <div className="p-2 bg-black/60 border border-yellow-500/20 clip-corner-sm flex items-center justify-between">
                  <span className="text-slate-300">TECH_EXPERTISE</span>
                  <span className="text-cyber-yellow font-bold">JAVA, NEXT.JS, CNN & UNITY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
