"use client";

import React from "react";
import { Experience, EducationItem } from "../types/portfolio";

interface ExperienceProps {
  experiences: Experience[];
  education: EducationItem[];
}

export function ExperienceSection({ experiences, education }: ExperienceProps) {
  return (
    <section id="experience" className="py-16 md:py-20 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 pb-6 border-b border-rule">
          <h2 className="text-xs font-normal uppercase tracking-wider text-muted mb-2">
            History
          </h2>
          <h3 className="text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Experience & Ventures
          </h3>
          <p className="text-sm text-muted mt-1 max-w-xl">
            Direct operational roles and software development across ventures.
          </p>
        </div>

        {/* Roles List */}
        <div className="divide-y divide-rule border-b border-rule mb-16">
          {experiences.map((exp) => (
            <div key={exp.id} className="py-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Column (4 cols): Metadata */}
              <div className="md:col-span-4">
                <span className="text-xs text-muted block mb-1">
                  {exp.period} • {exp.location}
                </span>
                <h4 className="text-lg font-normal text-ink">
                  {exp.role}
                </h4>
                <div className="text-sm text-accent font-normal mt-0.5">
                  {exp.company}
                </div>
              </div>

              {/* Right Column (8 cols): Description & Details */}
              <div className="md:col-span-8">
                <p className="text-sm text-ink leading-relaxed mb-4">
                  {exp.description}
                </p>

                <ul className="space-y-2 mb-4 text-sm text-muted">
                  {exp.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-accent mt-1 text-xs">•</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 border border-rule text-muted"
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
          <h4 className="text-xs font-normal uppercase tracking-wider text-muted mb-4 pb-2 border-b border-rule">
            Formal Education
          </h4>
          <div className="divide-y divide-rule">
            {education.map((edu, idx) => (
              <div key={idx} className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <div className="md:col-span-4">
                  <span className="text-xs text-muted block mb-1">{edu.period}</span>
                  <h5 className="text-base font-normal text-ink">{edu.institution}</h5>
                </div>
                <div className="md:col-span-8">
                  <p className="text-sm text-ink font-normal">{edu.degree}</p>
                  {edu.notes && (
                    <p className="text-xs sm:text-sm text-muted mt-1 leading-relaxed">
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
