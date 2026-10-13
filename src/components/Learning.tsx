"use client";

import React from "react";

export function Learning() {
  const topics = [
    {
      category: "Artificial Intelligence",
      title: "Autonomous Multi-Agent AI Systems",
      status: "Currently learning",
      categoryColor: "text-violet-400",
      badgeColor: "text-violet-300 bg-violet-950/40 border-violet-500/30",
      hoverBorder: "hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(167,139,250,0.12)]",
    },
    {
      category: "3D Graphics & Spatial Computing",
      title: "WebXR & Real-Time Three.js Shaders",
      status: "Currently learning",
      categoryColor: "text-cyan-400",
      badgeColor: "text-cyan-300 bg-cyan-950/40 border-cyan-500/30",
      hoverBorder: "hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.12)]",
    },
    {
      category: "Systems & Architecture",
      title: "Offline-First Distributed POS Architecture",
      status: "Currently learning",
      categoryColor: "text-emerald-400",
      badgeColor: "text-emerald-300 bg-emerald-950/40 border-emerald-500/30",
      hoverBorder: "hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(52,211,153,0.12)]",
    },
  ];

  return (
    <section id="learning" className="py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
              Currently Learning
            </h2>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Active exploratory domains alongside software engineering
          </span>
        </div>

        {/* 3-Column Domain Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topics.map((item, idx) => (
            <div
              key={idx}
              className={`p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0B0D16]/95 shadow-[0_4px_20px_rgba(0,0,0,0.6)] ${item.hoverBorder} transition-all flex flex-col justify-between`}
            >
              <div>
                <span className={`text-xs font-mono ${item.categoryColor} block mb-3`}>
                  {item.category}
                </span>
                <h3 className="text-base sm:text-lg font-normal text-white leading-snug mb-6">
                  {item.title}
                </h3>
              </div>

              <div>
                <span className={`inline-block text-xs font-mono px-3.5 py-1 rounded-full border ${item.badgeColor}`}>
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
