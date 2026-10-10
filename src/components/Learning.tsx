"use client";

import React from "react";

export function Learning() {
  const learningTopics = [
    {
      title: "3D Drosophila Brain Scans & Connectomics",
      status: "Currently learning",
      summary:
        "Studying whole-brain electron microscopy scans of fruit flies (Drosophila melanogaster) to understand biological neural wiring, synaptic circuit mapping, and graph structures.",
    },
    {
      title: "Agentic AI Systems & Automation",
      status: "Currently learning",
      summary:
        "Exploring autonomous agent architectures, tool-calling loops, and workflow automation to understand how multi-agent coordination can handle analytical tasks and everyday software routines.",
    },
    {
      title: "Multimedia Systems & Interface Design",
      status: "Academic minor at Bina Nusantara University",
      summary:
        "Formal minor coursework combining user experience architecture, 2D and 3D game mechanics in Unity C#, and multimedia computing principles that connect software logic with human interaction.",
    },
  ];

  return (
    <section id="learning" className="py-16 md:py-20 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4">
            <h2 className="text-xs font-normal uppercase tracking-wider text-muted mb-2">
              Focus & Research
            </h2>
            <h3 className="text-2xl sm:text-3xl font-light text-ink tracking-tight mb-3">
              Areas I am currently exploring
            </h3>
            <p className="text-sm text-muted leading-relaxed">
              Alongside building full-stack and desktop applications, these are the conceptual and academic topics I am actively studying.
            </p>
          </div>

          <div className="lg:col-span-8 divide-y divide-rule border-t border-b border-rule lg:border-t-0">
            {learningTopics.map((item, idx) => (
              <div key={idx} className="py-6 first:pt-0 lg:first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h4 className="text-base sm:text-lg font-normal text-ink">
                    {item.title}
                  </h4>
                  <span className="text-xs text-accent font-normal">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {item.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
