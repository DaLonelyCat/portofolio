"use client";

import React from "react";
import { ArrowDown, Mail, Printer, Terminal, Cpu, Crosshair, Zap, Shield, Activity, Layers } from "lucide-react";
import { PersonalInfo } from "../types/portfolio";

interface HeroProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
}

export function Hero({ personal, onPrintCV }: HeroProps) {
  return (
    <section id="hero" className="relative pt-20 pb-8 md:pt-24 md:pb-12 overflow-hidden">
      {/* Background ambient cyberpunk multi-color glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1600px] h-[450px] hero-cyber-glow pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12 relative z-10">
        {/* Main 2-Column High-Density Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column (Main Pitch) */}
          <div className="lg:col-span-7 text-center md:text-left">
            {/* Tactical Status Tag with Cyberpunk Yellow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/80 border border-cyber-yellow/40 clip-corner-sm text-xs font-mono mb-4 shadow-neon-yellow-sm">
              <span className="w-2 h-2 rounded-full bg-cyber-yellow animate-pulse shadow-[0_0_8px_#ffe600]" />
              <span className="text-cyber-yellow font-bold">STATUS:</span>
              <span className="text-slate-100">{personal.status.toUpperCase()}</span>
              <span className="text-slate-500">//</span>
              <span className="text-cyber-cyan text-[11px] hidden sm:inline">PROBLEM_SOLVER_AT_CORE</span>
            </div>

            {/* Headline with Cyberpunk Yellow & Cyan Treatment */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight text-white mb-4 leading-[0.98]">
              <span className="text-slate-100">TURNING RAW </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-yellow via-cyber-cyan to-cyber-magenta neon-text-yellow">
                IDEAS INTO
              </span>
              <br />
              <span className="text-slate-200">EXECUTABLE </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-cyan to-teal-200 neon-text-cyan">
                REALITY.
              </span>
            </h1>

            {/* Bio / Value proposition */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl leading-relaxed mb-6">
              {personal.bio}
            </p>

            {/* Telemetry metadata chips */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 font-mono text-xs text-slate-400 mb-6">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 border border-cyan-500/30 text-cyber-cyan clip-corner-sm">
                <Crosshair className="w-3.5 h-3.5" />
                <span>BINUS_UNIVERSITY // CS</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 border border-yellow-500/30 text-cyber-yellow clip-corner-sm">
                <Cpu className="w-3.5 h-3.5" />
                <span>GPA: 3.30 / 4.00</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/70 border border-magenta-500/30 text-cyber-magenta clip-corner-sm">
                <Zap className="w-3.5 h-3.5" />
                <span>CFO_FRUQITA (ACTIVE) // EX_FOUNDER_MYBEANS</span>
              </div>
            </div>

            {/* Call to Actions with High-Voltage Yellow */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-mono font-bold text-xs uppercase bg-cyber-yellow hover:bg-cyber-yellowHover text-black clip-corner shadow-neon-yellow transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>ACCESS_DOSSIERS</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="inline-flex items-center gap-2 px-4 py-2.5 font-mono font-medium text-xs uppercase cyber-panel text-slate-200 hover:text-cyber-cyan clip-corner hover:border-cyber-cyan transition-all duration-200"
              >
                <Printer className="w-3.5 h-3.5 text-cyber-cyan" />
                <span>EXPORT_CV (PDF)</span>
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-4 py-2.5 font-mono font-medium text-xs uppercase cyber-panel text-slate-200 hover:text-cyber-yellow clip-corner hover:border-cyber-yellow transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-cyber-yellow" />
                <span>OPEN_COMMS</span>
              </a>
            </div>
          </div>

          {/* Right Column: Tactical Telemetry HUD Console (Fills horizontal space!) */}
          <div className="lg:col-span-5">
            <div className="cyber-panel-yellow clip-corner p-4 sm:p-5 relative border-cyber-yellow/40 bg-[#090b14]/90 shadow-[0_0_30px_rgba(255,230,0,0.12)]">
              {/* Header Telemetry Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-yellow-500/20 font-mono text-[11px]">
                <div className="flex items-center gap-1.5 text-cyber-yellow font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>[ TELEMETRY_CONSOLE // v3.2 ]</span>
                </div>
                <span className="text-cyber-green flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* Real-time Diagnostics Grid */}
              <div className="space-y-3 font-mono">
                {/* Metric 1 */}
                <div className="p-2.5 bg-black/60 border border-cyan-500/20 clip-corner-sm">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">FULLSTACK_&_POS_SYSTEMS</span>
                    <span className="text-cyber-cyan font-bold">8_SHIPPED // ACTIVE</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-none overflow-hidden">
                    <div className="h-full bg-cyber-cyan w-[96%]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Java POS • Next.js • Android Studio</span>
                    <span>CNN & Unity</span>
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-2.5 bg-black/60 border border-yellow-500/30 clip-corner-sm">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">ACADEMIC_CREDENTIALS</span>
                    <span className="text-cyber-yellow font-bold">GPA: 3.30 / 4.00</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-none overflow-hidden">
                    <div className="h-full bg-cyber-yellow w-[83%]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Bina Nusantara University</span>
                    <span>Class of 2027</span>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-2.5 bg-black/60 border border-magenta-500/20 clip-corner-sm">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-300">VENTURE_LEADERSHIP</span>
                    <span className="text-cyber-magenta font-bold">CEO_&_CFO</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-none overflow-hidden">
                    <div className="h-full bg-cyber-magenta w-[92%]" />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>Fruqita (CFO, Active) • MyBeans (Founder)</span>
                    <span>Operations & POS Dev</span>
                  </div>
                </div>

                {/* Quick Diagnostics Footnote */}
                <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-cyber-yellow font-bold">[BUILDER_READY]</span>
                  <span>GITHUB: DALONELYCAT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
