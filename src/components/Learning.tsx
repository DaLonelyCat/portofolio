"use client";

import React from "react";
import { SectionHeader } from "./SectionHeader";

export function Learning() {
  const topics = [
    {
      title: "3D Drosophila Brain Scans & Connectomics",
      status: "Currently learning",
      note: "Studying 3D electron microscopy whole-brain datasets.",
    },
    {
      title: "Agentic AI Systems & Automation",
      status: "Currently learning",
      note: "Investigating autonomous agent coordination and tool-calling loops.",
    },
    {
      title: "Multimedia Systems & Interface Design",
      status: "Academic minor at Bina Nusantara University",
      note: "Formal minor coursework spanning UI/UX architecture, Unity C# game development, and multimedia perception.",
    },
  ];

  return (
    <section id="learning" className="py-16 md:py-20 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="01"
          category="Research & Academic Focus"
          title="Active Explorations"
          description="Areas of study and formal academic coursework pursued alongside software engineering."
        />

        <div className="divide-y divide-rule border-t border-b border-rule">
          {topics.map((item, idx) => (
            <div
              key={idx}
              className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2"
            >
              <div>
                <h4 className="text-base font-normal text-ink">
                  {item.title}
                </h4>
                <p className="text-xs text-muted mt-0.5">
                  {item.note}
                </p>
              </div>
              <span className="text-xs text-accent font-normal shrink-0">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
