"use client";

import React from "react";
import { Experience, EducationItem } from "../types/portfolio";
import { SectionHeader } from "./SectionHeader";

interface ExperienceProps {
  experiences: Experience[];
  education: EducationItem[];
}

export function ExperienceSection({ experiences, education }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 md:py-24 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="04"
          category="Work & Roles"
          title="Operational History"
          description="Leadership, financial planning, and direct software engineering across ventures."
        />

        {/* Roles List */}
        <div className="divide-y divide-rule border-b border-rule mb-16">
          {experiences.map((exp) => (
            <div key={exp.id} className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column (4 cols) */}
              <div className="lg:col-span-4">
                <span className="text-xs text-muted block mb-1">
                  {exp.period} • {exp.location}
                </span>
                <h4 className="text-lg font-normal text-ink">
                  {exp.role}
                </h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-accent font-medium">{exp.company}</span>
                  {exp.current && (
                    <span className="text-[11px] px-2 py-0.5 border border-accent/40 bg-accent/10 text-accent font-normal">
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

                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-rule/50">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-0.5 border border-rule bg-surface text-muted"
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
          <h4 className="text-xs font-normal uppercase tracking-wider text-muted mb-6 pb-2 border-b border-rule">
            Formal Academic Background
          </h4>
          <div className="divide-y divide-rule border-b border-rule">
            {education.map((edu, idx) => (
              <div key={idx} className="py-6 grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                <div className="lg:col-span-4">
                  <span className="text-xs text-muted block mb-1">{edu.period}</span>
                  <h5 className="text-base font-normal text-ink">{edu.institution}</h5>
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
