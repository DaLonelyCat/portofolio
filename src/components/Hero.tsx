"use client";

import React from "react";
import { PersonalInfo } from "../types/portfolio";

interface HeroProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
}

export function Hero({ personal, onPrintCV }: HeroProps) {
  return (
    <section id="hero" className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-rule/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flight Deck 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Mission Narrative & Actions */}
          <div className="lg:col-span-7">
            {/* Cyber Profile Identity Header */}
            <div className="flex items-center gap-5 mb-6">
              <div className="relative group shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-[0_0_25px_rgba(0,240,255,0.3)] bg-[#0B0D16]">
                  <img
                    src={personal.avatar || "/avatar.jpg"}
                    alt={personal.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 border-2 border-[#05060A] shadow-[0_0_8px_#00F0FF] animate-pulse" />
              </div>

              <div>
                {/* Cyber Status Beacon */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-[11px] mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00F0FF]" />
                  <span>ORBITAL UPLINK // SYSTEM ONLINE</span>
                </div>
                <div className="text-xs font-mono text-slate-400">
                  {personal.role} • {personal.location.split("(")[0].trim()}
                </div>
              </div>
            </div>

            {/* Display Headline in Pure High-Contrast White */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.12] mb-4">
              Hello, I&rsquo;m Christian
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl font-light text-cyan-400/90 tracking-tight leading-relaxed mb-6">
              Builder and problem solver turning cool ideas into working software.
            </p>

            {/* Bio in High-Contrast Slate */}
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed mb-8">
              {personal.bio}
            </p>

            {/* Cyber Action Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono font-medium text-black bg-cyan-400 hover:bg-cyan-300 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
              >
                View Projects
              </a>

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono text-cyan-400 bg-[#0B0D16]/90 border border-cyan-500/30 hover:border-cyan-400 rounded-full transition-all duration-300"
              >
                Read CV
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] text-xs sm:text-sm font-mono text-white bg-[#0B0D16]/90 border border-white/10 hover:border-white/30 rounded-full transition-all duration-300"
              >
                Direct Comms
              </a>
            </div>
          </div>

          {/* Right Column: Station Telemetry HUD Module (100% Solid Dark Backing) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#0B0D16]/95 border border-cyan-500/25 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            <div className="flex items-center justify-between pb-3 mb-5 border-b border-white/10">
              <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Station Telemetry</span>
              </h2>
              <span className="text-[11px] font-mono text-slate-400">ID: CK-2026</span>
            </div>

            <dl className="space-y-4 text-sm font-sans">
              <div>
                <dt className="text-xs font-mono text-slate-400">Academic Trajectory</dt>
                <dd className="text-white font-normal mt-0.5">
                  Bina Nusantara University, Computer Science
                </dd>
                <dd className="text-xs text-slate-400 mt-0.5">
                  Minor in Multimedia (UI/UX, Game Design) • GPA: 3.30 / 4.00
                </dd>
              </div>

              <div className="pt-3 border-t border-white/10">
                <dt className="text-xs font-mono text-slate-400">Ventures & Operational Roles</dt>
                <dd className="text-white font-normal mt-0.5">
                  CFO & Lead Developer at Fruqita
                </dd>
                <dd className="text-xs text-slate-400 mt-0.5">
                  Former Founder & CEO at MyBeans
                </dd>
              </div>

              <div className="pt-3 border-t border-white/10">
                <dt className="text-xs font-mono text-slate-400">Core Systems Stack</dt>
                <dd className="text-white font-normal mt-0.5">
                  React, Electron, Next.js, Java, Python, Android, Unity
                </dd>
                <dd className="text-xs text-slate-400 mt-0.5">
                  Desktop POS architecture, offline-first utilities, multi-platform software
                </dd>
              </div>

              <div className="pt-3 border-t border-white/10">
                <dt className="text-xs font-mono text-slate-400">Coordinates & Availability</dt>
                <dd className="text-white font-normal mt-0.5">
                  Indonesia • Open for remote software engineering roles
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
