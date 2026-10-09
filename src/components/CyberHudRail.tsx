"use client";

import React, { useEffect, useState } from "react";
import { ChevronUp, Crosshair, Terminal } from "lucide-react";

interface SectorNav {
  id: string;
  code: string;
  label: string;
}

const SECTORS: SectorNav[] = [
  { id: "hero", code: "01", label: "APEX" },
  { id: "projects", code: "02", label: "DOSSIERS" },
  { id: "experience", code: "03", label: "MISSIONS" },
  { id: "skills", code: "04", label: "CYBERWARE" },
  { id: "contact", code: "05", label: "UPLINK" },
];

export function CyberHudRail() {
  const [activeSector, setActiveSector] = useState<string>("hero");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sectorElements = SECTORS.map((s) => ({
        id: s.id,
        el: document.getElementById(s.id),
      }));

      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = sectorElements.length - 1; i >= 0; i--) {
        const item = sectorElements[i];
        if (item.el) {
          const top = item.el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSector(item.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSector = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <aside
      aria-label="Tactical Navigation HUD"
      className="hidden xl:flex fixed right-4 2xl:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-2 pointer-events-none select-none"
    >
      {/* Tactical HUD Header */}
      <div className="pointer-events-auto px-2.5 py-1 bg-black/85 border border-yellow-500/30 clip-corner-sm backdrop-blur-md flex items-center gap-1.5 font-mono text-[9px] text-cyber-yellow mb-1 shadow-neon-yellow-sm">
        <Crosshair className="w-2.5 h-2.5 animate-spin" style={{ animationDuration: "12s" }} />
        <span>NAV://HUD</span>
      </div>

      {/* Vertical Navigation Track */}
      <nav className="pointer-events-auto flex flex-col items-end gap-1.5 p-2 bg-black/80 border border-slate-800 clip-corner backdrop-blur-md shadow-2xl">
        {SECTORS.map((sector) => {
          const isActive = activeSector === sector.id;
          return (
            <button
              key={sector.id}
              onClick={() => scrollToSector(sector.id)}
              className={`group flex items-center gap-2 px-2.5 py-1.5 font-mono text-[10px] clip-corner-sm transition-all duration-200 text-right ${
                isActive
                  ? "bg-cyber-yellow/15 text-cyber-yellow border border-cyber-yellow/60 shadow-neon-yellow-sm"
                  : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
              }`}
            >
              <span
                className={`text-[9px] transition-colors ${
                  isActive ? "text-cyber-yellow font-bold" : "text-slate-500 group-hover:text-cyber-yellow"
                }`}
              >
                {sector.code}
              </span>
              <span className="font-semibold tracking-wider">{sector.label}</span>
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  isActive
                    ? "bg-cyber-yellow shadow-[0_0_8px_#ffe600] scale-125"
                    : "bg-slate-700 group-hover:bg-cyber-yellow"
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* Quick Jump to Apex / Top Trigger */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto mt-1 flex items-center gap-1 px-2.5 py-1 bg-black/85 border border-cyan-500/40 clip-corner-sm font-mono text-[9px] text-cyber-cyan hover:text-white hover:border-cyber-yellow hover:bg-yellow-500/10 transition-all backdrop-blur-md shadow-neon-cyan-sm"
          title="Return to Apex"
        >
          <ChevronUp className="w-3 h-3 text-cyber-cyan" />
          <span>APEX</span>
        </button>
      )}
    </aside>
  );
}
