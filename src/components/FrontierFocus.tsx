"use client";

import React from "react";
import { Brain, Bot, Gamepad2, Sparkles, TrendingUp, Cpu, Network, Layers, ArrowUpRight } from "lucide-react";

export function FrontierFocus() {
  const tracks = [
    {
      id: "fly-connectomics",
      badge: "ACTIVE_RESEARCH // CONNECTOMICS",
      icon: Brain,
      color: "teal",
      borderColor: "border-teal-500/40 hover:border-teal-400",
      accentBg: "bg-teal-500/10",
      textColor: "text-teal-300",
      title: "3D Drosophila Brain Scans & Connectomics",
      subtitle: "Synaptic circuit tracing and whole-brain electron microscopy volumetric analysis",
      description:
        "Investigating 3D whole-brain EM scans of fruit flies (Drosophila melanogaster) to decipher synaptic connectivity graphs, neural circuit topology, and the biological foundations of computational intelligence.",
      telemetry: [
        { label: "Target Model", val: "Drosophila Connectome" },
        { label: "Modality", val: "3D Volumetric EM Scans" },
        { label: "Objective", val: "Synaptic Graph Topologies" },
      ],
      tags: ["3D Brain Scans", "Connectomics", "Neurobiology", "Graph Analysis", "Bio-Computing"],
    },
    {
      id: "agentic-ai",
      badge: "ACTIVE_ENGINEERING // AGENTIC_SYSTEMS",
      icon: Bot,
      color: "yellow",
      borderColor: "border-cyber-yellow/40 hover:border-cyber-yellow",
      accentBg: "bg-yellow-500/10",
      textColor: "text-cyber-yellow",
      title: "Autonomous Agentic AI & Automation",
      subtitle: "Multi-agent orchestration for stock trading, daily tasks & business operations",
      description:
        "Architecting autonomous agent networks equipped with real-time tool calling, market telemetry analysis, and self-correcting feedback loops to automate quantitative stock trading, daily task management, and business operations.",
      telemetry: [
        { label: "Finance Track", val: "Algorithmic Trading Agents" },
        { label: "Personal Track", val: "Task & Schedule Orchestration" },
        { label: "Business Track", val: "Autonomous Venture Ops" },
      ],
      tags: ["Agentic AI", "Stock Trading", "Task Automation", "Business Ops", "Multi-Agent"],
    },
    {
      id: "multimedia-minor",
      badge: "ACADEMIC_SPECIALIZATION // MINOR",
      icon: Gamepad2,
      color: "magenta",
      borderColor: "border-cyber-magenta/40 hover:border-cyber-magenta",
      accentBg: "bg-magenta-500/10",
      textColor: "text-cyber-magenta",
      title: "Multimedia Minor: UI/UX & Game Computing",
      subtitle: "Human-computer interaction, interactive perception, and game engine mechanics",
      description:
        "Formal academic minor at BINUS University specializing in UI/UX design architectures, Unity C# game programming, computer graphics perception, and interactive multimedia systems that bridge technical engines with human intuition.",
      telemetry: [
        { label: "Interaction", val: "UI/UX & Design Systems" },
        { label: "Simulation", val: "Game Design & C# Unity" },
        { label: "Perception", val: "Multimedia Understanding" },
      ],
      tags: ["Multimedia Minor", "UI/UX Design", "Game Programming", "Interactive Systems", "Unity C#"],
    },
  ];

  return (
    <section id="frontiers" className="py-8 md:py-12 relative overflow-hidden">
      {/* Background ambient accent */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-yellow-500/20 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyber-yellow font-mono text-xs font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyber-yellow animate-pulse" />
              <span>// ACTIVE_FRONTIERS // CURRENT_FOCUS_AREAS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              ACTIVE R&D & SPECIALIZATIONS
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-2xl">
              Current research frontiers spanning biological neural connectomes, autonomous multi-agent pipelines for finance & operations, and an academic minor in Multimedia.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-400 bg-black/60 px-3 py-1.5 border border-yellow-500/20 clip-corner-sm">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse shadow-[0_0_8px_#2dd4bf]" />
            <span className="text-slate-200">LAB_STATUS: ACTIVE_EXECUTION</span>
          </div>
        </div>

        {/* 3-Column Tactical Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {tracks.map((track) => {
            const Icon = track.icon;
            return (
              <div
                key={track.id}
                className={`flex flex-col justify-between p-5 sm:p-6 bg-[#080911]/90 border clip-corner relative group transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,0,0,0.8)] ${track.borderColor}`}
              >
                {/* Header Tag */}
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 font-mono text-xs">
                    <div className="flex items-center gap-2">
                      <div className={`p-1.5 clip-corner-sm ${track.accentBg}`}>
                        <Icon className={`w-4 h-4 ${track.textColor}`} />
                      </div>
                      <span className={`font-bold tracking-wider text-[11px] ${track.textColor}`}>
                        {track.badge}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white mb-1 group-hover:text-slate-100 transition-colors">
                    {track.title}
                  </h3>
                  <p className="font-mono text-xs text-cyber-cyan mb-3">
                    {track.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {track.description}
                  </p>

                  {/* Telemetry Matrix */}
                  <div className="space-y-1.5 p-3 bg-black/70 border border-slate-800/80 clip-corner-sm font-mono text-xs mb-5">
                    {track.telemetry.map((t, idx) => (
                      <div key={idx} className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">{t.label}:</span>
                        <span className={`font-bold ${track.textColor}`}>{t.val}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tag Pills */}
                <div className="pt-3 border-t border-slate-800/80">
                  <div className="flex flex-wrap gap-1.5 font-mono">
                    {track.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] px-2 py-0.5 bg-black border border-slate-800 text-slate-400 clip-corner-sm hover:border-slate-600 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
