"use client";

import React from "react";

export function Learning() {
  const topics = [
    {
      code: "FRONTIER // 01",
      title: "3D Drosophila Brain Scans & Connectomics",
      status: "Currently learning",
    },
    {
      code: "FRONTIER // 02",
      title: "Agentic AI Systems & Automation",
      status: "Currently learning",
    },
    {
      code: "FRONTIER // 03",
      title: "Multimedia Systems & Interface Design",
      status: "Minor coursework",
    },
  ];

  return (
    <section id="frontiers" className="py-16 md:py-20 border-b border-rule/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cyber Section Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Research Frontiers
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Active exploratory domains alongside software engineering
          </span>
        </div>

        {/* 3-Column Cyber Grid of Research Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0B0D16]/95 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-cyan-400/80 block mb-3">
                  {item.code}
                </span>
                <h3 className="text-base sm:text-lg font-normal text-white leading-snug mb-6">
                  {item.title}
                </h3>
              </div>

              <div>
                <span className="inline-block text-xs font-mono text-amber-400 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
