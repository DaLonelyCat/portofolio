"use client";

import React, { useState } from "react";
import { ConnectomicsViewer } from "./ConnectomicsViewer";
import { useLiteMode } from "../lib/liteMode";

export function Learning() {
  const lite = useLiteMode();
  const [forceLoad, setForceLoad] = useState(false);
  const topics = [
    {
      category: "Neuroscience & 3D Visualization",
      title: "3D Drosophila Brain Scans & Connectomics",
      status: "Currently learning",
    },
    {
      category: "Artificial Intelligence",
      title: "Agentic AI Systems & Automation",
      status: "Currently learning",
    },
    {
      category: "3D Graphics & Spatial Computing",
      title: "WebXR & Real-Time Three.js Shaders",
      status: "Currently learning",
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
              className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0B0D16]/95 shadow-[0_4px_20px_rgba(0,0,0,0.6)] hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-xs font-mono text-cyan-400/90 block mb-3">
                  {item.category}
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

        {/* Live Interactive 3D Drosophila Connectomics Neural Graph (lite mode: opt-in) */}
        {lite === false || forceLoad ? (
          <ConnectomicsViewer />
        ) : lite === true ? (
          <div
            data-testid="connectome-lite-placeholder"
            className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0B0D16]/95 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-base font-normal text-white mb-1">
                3D Drosophila brain connectome
              </h3>
              <p className="text-xs text-slate-400 max-w-xl">
                The interactive 3D viewer is paused to keep this page light on your device.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setForceLoad(true)}
              className="text-xs font-mono px-5 py-2.5 rounded-full border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 hover:text-white hover:border-cyan-400 transition-all min-h-[44px] shrink-0"
            >
              Load 3D viewer anyway
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
