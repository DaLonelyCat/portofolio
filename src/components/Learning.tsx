"use client";

import React from "react";
import { SectionHeader } from "./SectionHeader";

export function Learning() {
  const topics = [
    {
      title: "3D Drosophila Brain Scans & Connectomics",
      status: "Currently learning",
    },
    {
      title: "Agentic AI Systems & Automation",
      status: "Currently learning",
    },
    {
      title: "Multimedia Systems & Interface Design",
      status: "Minor coursework at Bina Nusantara University",
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
              <h4 className="text-base font-normal text-ink">
                {item.title}
              </h4>
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
