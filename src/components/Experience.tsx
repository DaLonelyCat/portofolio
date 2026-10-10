"use client";

import React from "react";
import { Experience, EducationItem } from "../types/portfolio";

interface ExperienceProps {
  experiences: Experience[];
  education: EducationItem[];
}

export function ExperienceSection({ experiences, education }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-rule/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetric Section Header */}
        <div className="mb-10 pb-6 border-b border-white/10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-ink tracking-tight">
              Operational History
            </h2>
          </div>
          <span className="text-xs text-muted max-w-md sm:text-right">
            Leadership, financial oversight, and software engineering across ventures.
          </span>
        </div>

        {/* Roles List (Playful Rounded Frosted Cards) */}
        <div className="space-y-4 mb-16">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-surface/50 backdrop-blur-xl shadow-md hover:border-white/20 transition-all grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              {/* Left Column (4 cols) */}
              <div className="lg:col-span-4">
                <span className="text-xs text-muted block mb-1.5 font-mono">
                  {exp.period} • {exp.location}
                </span>
                <h3 className="text-lg font-normal text-ink">
                  {exp.role}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-accent font-medium">{exp.company}</span>
                  {exp.current && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full border border-accent/40 bg-accent/15 text-accent font-medium">
                      Current
                    </span>
                  )}
                </div>
              </div>

              {/* Right Column (8 cols) */}
              <div className="lg:col-span-8">
                <p className="text-sm text-ink leading-relaxed mb-4">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-5 text-sm text-muted">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-accent mt-1 text-xs">•</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-3 border-t border-white/10">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-3 py-0.5 rounded-full border border-white/10 bg-white/5 text-muted"
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
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted mb-6 pb-2 border-b border-white/10">
            Formal Academic Background
          </h3>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-surface/40 backdrop-blur-md shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-4 items-start"
              >
                <div className="lg:col-span-4">
                  <span className="text-xs text-muted block mb-1 font-mono">{edu.period}</span>
                  <h4 className="text-base font-normal text-ink">{edu.institution}</h4>
                </div>
                <div className="lg:col-span-8">
                  <p className="text-sm text-ink font-medium">{edu.degree}</p>
                  {edu.notes && (
                    <p className="text-xs sm:text-sm text-muted mt-1.5 leading-relaxed">
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
