"use client";

import React from "react";

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
      status: "Minor coursework",
    },
  ];

  return (
    <section id="learning" className="py-16 md:py-20 border-b border-rule/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Minimal 2-Column Academic Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-white/10">
          <h2 className="text-2xl sm:text-3xl font-light text-ink tracking-tight">
            Active Explorations
          </h2>
          <span className="text-xs text-muted font-normal">
            Frontiers of study and formal coursework
          </span>
        </div>

        {/* Playful Rounded Frosted Container */}
        <div className="rounded-3xl bg-surface/60 backdrop-blur-xl border border-white/10 p-2 sm:p-3 shadow-xl space-y-1">
          {topics.map((item, idx) => (
            <div
              key={idx}
              className="px-5 py-4 sm:px-6 sm:py-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white/5 transition-all"
            >
              <h3 className="text-sm sm:text-base font-normal text-ink">
                {item.title}
              </h3>
              <span className="text-xs text-accent font-medium px-3.5 py-1 rounded-full bg-accent/15 border border-accent/30 shrink-0">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
