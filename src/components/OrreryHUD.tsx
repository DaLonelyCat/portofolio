"use client";

import React, { useEffect, useState } from "react";

export interface CelestialBodyInfo {
  name: string;
  type: string;
  distance: string;
  speed: string;
  milestoneTitle: string;
  milestoneDesc: string;
  sectionLink: string;
  sectionLabel: string;
  color: string;
}

export const CELESTIAL_BODIES: CelestialBodyInfo[] = [
  {
    name: "Sun",
    type: "Central Star (Yellow Dwarf)",
    distance: "0.0 AU (Core)",
    speed: "0.0 km/s",
    milestoneTitle: "Builder Core & Central Command",
    milestoneDesc:
      "Christian Emanuel Ikajaya: Software engineer and systems builder, turning cool ideas into real working software with high agency and curiosity.",
    sectionLink: "#hero",
    sectionLabel: "View Overview",
    color: "#FFBA08",
  },
  {
    name: "Mercury",
    type: "Terrestrial Planet",
    distance: "0.39 AU (57.9M km)",
    speed: "47.4 km/s",
    milestoneTitle: "Algorithmic Velocity & Prototyping",
    milestoneDesc:
      "Fast iterations, zero-dependency 60fps HTML5 Canvas engines, collision physics, and core system architectures.",
    sectionLink: "#skills",
    sectionLabel: "Inspect Skills",
    color: "#A8A29E",
  },
  {
    name: "Venus",
    type: "Terrestrial Planet",
    distance: "0.72 AU (108.2M km)",
    speed: "35.0 km/s",
    milestoneTitle: "Human-Computer Interaction & UX",
    milestoneDesc:
      "Completed Minor in Multimedia at Bina Nusantara University with GPA 3.30, bridging core computer systems with user experience design.",
    sectionLink: "#experience",
    sectionLabel: "View Education",
    color: "#E0B368",
  },
  {
    name: "Earth",
    type: "Habitable Terrestrial Planet",
    distance: "1.00 AU (149.6M km)",
    speed: "29.8 km/s",
    milestoneTitle: "Active Production Deployments",
    milestoneDesc:
      "Shipped applications: UniCash POS retail system, NestFit smart dumbbell workout companion, and Fruqita fruit chips storefront.",
    sectionLink: "#projects",
    sectionLabel: "Explore Projects",
    color: "#0284C7",
  },
  {
    name: "Mars",
    type: "Terrestrial Planet",
    distance: "1.52 AU (227.9M km)",
    speed: "24.1 km/s",
    milestoneTitle: "Entrepreneurship & Business Systems",
    milestoneDesc:
      "CFO and software developer at Fruqita: company budgeting, financial forecasting, and proprietary POS cashier architecture.",
    sectionLink: "#experience",
    sectionLabel: "View Experience",
    color: "#E11D48",
  },
  {
    name: "Jupiter",
    type: "Gas Giant",
    distance: "5.20 AU (778.5M km)",
    speed: "13.1 km/s",
    milestoneTitle: "Connectomics Research & Agentic AI",
    milestoneDesc:
      "Exploring 3D Drosophila brain connectomics, high-dimensional synaptic wiring analysis, and autonomous multi-agent software workflows.",
    sectionLink: "#learning",
    sectionLabel: "View Research",
    color: "#D97706",
  },
  {
    name: "Saturn",
    type: "Ringed Gas Giant",
    distance: "9.58 AU (1.43B km)",
    speed: "9.7 km/s",
    milestoneTitle: "Multimedia Systems & Computer Graphics",
    milestoneDesc:
      "Real-time 3D Three.js shaders, WebXR augmented reality planetariums, Unity 2D physics loops, and interactive graphics programming.",
    sectionLink: "#skills",
    sectionLabel: "View Capabilities",
    color: "#FBBF24",
  },
  {
    name: "Uranus",
    type: "Ice Giant",
    distance: "19.2 AU (2.87B km)",
    speed: "6.8 km/s",
    milestoneTitle: "Offline-First Mobile Engineering",
    milestoneDesc:
      "Offline-first SQLite local persistence, native Android application development, and hardware-independent reliability.",
    sectionLink: "#projects",
    sectionLabel: "View Mobile Apps",
    color: "#06B6D4",
  },
  {
    name: "Neptune",
    type: "Ice Giant",
    distance: "30.0 AU (4.50B km)",
    speed: "5.4 km/s",
    milestoneTitle: "Frontier Systems & Local AI Agents",
    milestoneDesc:
      "Local offline LLM agents powered by Ollama, edge network deployments, and future system architectures.",
    sectionLink: "#learning",
    sectionLabel: "Explore Frontiers",
    color: "#3B82F6",
  },
];

export function OrreryHUD() {
  const [selectedBody, setSelectedBody] = useState<CelestialBodyInfo | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ name: string }>;
      const found = CELESTIAL_BODIES.find(
        (b) => b.name.toLowerCase() === customEvent.detail?.name?.toLowerCase()
      );
      if (found) {
        setSelectedBody(found);
      }
    };

    window.addEventListener("celestial-select", handleSelect);
    return () => {
      window.removeEventListener("celestial-select", handleSelect);
    };
  }, []);

  const selectBody = (body: CelestialBodyInfo) => {
    setSelectedBody(body);
    setIsMenuOpen(false);
    window.dispatchEvent(
      new CustomEvent("celestial-camera-fly", { detail: { name: body.name } })
    );
  };

  const resetOrbit = () => {
    setSelectedBody(null);
    window.dispatchEvent(new CustomEvent("celestial-camera-reset"));
  };

  return (
    <>
      {/* Floating Orrery Controller Pill (Bottom Left) */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3 no-print">
        {/* Active Celestial Telemetry Drawer / Card */}
        {selectedBody && (
          <div
            role="region"
            aria-label="Celestial Body Telemetry"
            className="w-80 sm:w-96 rounded-3xl border border-cyan-500/30 bg-[#0B0D16]/95 backdrop-blur-2xl p-5 shadow-[0_10px_40px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-bottom-4 duration-300"
          >
            <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-3.5 h-3.5 rounded-full shadow-[0_0_10px_currentColor] shrink-0"
                  style={{ backgroundColor: selectedBody.color, color: selectedBody.color }}
                />
                <div>
                  <h3 className="text-base font-medium text-white leading-tight">
                    {selectedBody.name}
                  </h3>
                  <span className="text-[11px] font-mono text-slate-400">
                    {selectedBody.type}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={resetOrbit}
                className="text-xs font-mono text-slate-400 hover:text-white px-2.5 py-1 rounded-full border border-white/10 hover:border-white/20 bg-white/5 transition-colors"
                aria-label="Reset Solar System camera view"
              >
                Reset Orbit
              </button>
            </div>

            {/* Astronomical Telemetry Grid */}
            <div className="grid grid-cols-2 gap-2 mb-4 text-[11px] font-mono">
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block mb-0.5">Orbital Distance</span>
                <span className="text-cyan-300 font-semibold">{selectedBody.distance}</span>
              </div>
              <div className="p-2 rounded-xl bg-white/5 border border-white/5">
                <span className="text-slate-400 block mb-0.5">Velocity</span>
                <span className="text-cyan-300 font-semibold">{selectedBody.speed}</span>
              </div>
            </div>

            {/* Engineering Journey Milestone */}
            <div className="mb-4">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
                Engineering Dimension //
              </span>
              <h4 className="text-sm font-normal text-white mb-1.5">
                {selectedBody.milestoneTitle}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {selectedBody.milestoneDesc}
              </p>
            </div>

            {/* Quick Navigation Jump */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-white/10">
              <a
                href={selectedBody.sectionLink}
                onClick={() => resetOrbit()}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-black font-semibold bg-cyan-400 hover:bg-cyan-300 px-3.5 py-1.5 rounded-full transition-all shadow-[0_0_12px_rgba(0,240,255,0.4)]"
              >
                <span>{selectedBody.sectionLabel}</span>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>

              <span className="text-[10px] font-mono text-slate-500">
                Left-click & drag to spin
              </span>
            </div>
          </div>
        )}

        {/* Celestial Body Selector Menu */}
        {isMenuOpen && (
          <div className="w-72 max-h-80 overflow-y-auto no-scrollbar rounded-2xl border border-white/15 bg-[#0B0D16]/95 backdrop-blur-2xl p-2 shadow-2xl space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-mono text-slate-400 border-b border-white/10 flex items-center justify-between">
              <span>Inspect Celestial Body</span>
              <span className="text-cyan-400">({CELESTIAL_BODIES.length})</span>
            </div>
            {CELESTIAL_BODIES.map((body) => {
              const isSelected = selectedBody?.name === body.name;
              return (
                <button
                  key={body.name}
                  type="button"
                  onClick={() => selectBody(body)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                    isSelected
                      ? "bg-cyan-400 text-black font-semibold shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: body.color }}
                    />
                    <span>{body.name}</span>
                  </div>
                  <span className={`text-[10px] ${isSelected ? "text-black/80" : "text-slate-500"}`}>
                    {body.distance}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Orrery Observatory Toggle Button */}
        <div className="flex items-center gap-2">
          {selectedBody && (
            <button
              type="button"
              onClick={resetOrbit}
              className="text-xs font-mono px-3.5 py-2 rounded-full border border-white/15 bg-[#0B0D16]/90 text-slate-300 hover:text-white hover:border-cyan-400/50 backdrop-blur-xl transition-all shadow-lg"
            >
              Reset Camera
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 text-xs font-mono px-4 py-2.5 rounded-full border border-cyan-500/40 bg-[#0B0D16]/95 text-cyan-300 hover:text-cyan-200 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] backdrop-blur-2xl transition-all shadow-xl"
            aria-expanded={isMenuOpen}
            aria-label="Toggle Solar System Orrery Observatory HUD"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{selectedBody ? selectedBody.name : "Orrery Observatory"}</span>
            <svg
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                isMenuOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}
