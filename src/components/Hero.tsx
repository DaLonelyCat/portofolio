"use client";

import React from "react";
import { PersonalInfo } from "../types/portfolio";

interface HeroProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
}

export function Hero({ personal, onPrintCV }: HeroProps) {
  return (
    <section id="hero" className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-rule/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Full-Width Large Display Headline */}
        <div className="mb-8 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-ink leading-[1.08]">
            Builder and problem solver turning cool ideas into working software.
          </h1>
        </div>

        {/* Builder Statement Banner (Playful Rounded Card) */}
        <div className="rounded-2xl bg-surface/50 backdrop-blur-md border border-white/10 p-5 sm:p-6 mb-10 max-w-3xl shadow-sm">
          <p className="text-base sm:text-xl font-normal text-ink leading-relaxed">
            &ldquo;{personal.philosophy || personal.tagline}&rdquo;
          </p>
        </div>

        {/* 2-Column Split: Bio/Actions Left, Snapshot Facts Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <p className="text-sm sm:text-base text-muted font-normal leading-relaxed mb-8">
              {personal.bio}
            </p>

            {/* CTAs (Playful Pill Buttons) */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <a
                href="#case-study"
                className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] text-xs sm:text-sm font-medium text-page bg-accent hover:bg-accentHover rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-md shadow-accent/20"
              >
                Explore case study
              </a>

              <a
                href="#projects"
                className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] text-xs sm:text-sm font-normal text-ink bg-surface/70 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                View project archive
              </a>

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] text-xs sm:text-sm font-normal text-ink bg-surface/70 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Read CV
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 py-2.5 min-h-[44px] text-xs sm:text-sm font-normal text-ink bg-surface/70 backdrop-blur-md border border-white/10 hover:border-white/30 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
              >
                Email me
              </a>
            </div>
          </div>

          {/* Right Column: Background Snapshot (Playful Frosted Card) */}
          <div className="lg:col-span-5 rounded-3xl bg-surface/60 backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-xl">
            <h2 className="text-xs font-medium uppercase tracking-wider text-muted mb-4 pb-2 border-b border-white/10">
              Background Overview
            </h2>

            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-xs text-muted">Education</dt>
                <dd className="text-ink font-normal mt-0.5">
                  Bina Nusantara University, Computer Science
                </dd>
                <dd className="text-xs text-muted mt-0.5">
                  Minor in Multimedia (UI/UX, Game Design) • GPA: 3.30 / 4.00
                </dd>
              </div>

              <div className="pt-3 border-t border-white/10">
                <dt className="text-xs text-muted">Ventures & Operational Roles</dt>
                <dd className="text-ink font-normal mt-0.5">
                  CFO & Software Developer at Fruqita
                </dd>
                <dd className="text-xs text-muted mt-0.5">
                  Former Founder & CEO at MyBeans
                </dd>
              </div>

              <div className="pt-3 border-t border-white/10">
                <dt className="text-xs text-muted">Core Capabilities</dt>
                <dd className="text-ink font-normal mt-0.5">
                  React, Electron, Next.js, Java, Python, Android, Unity
                </dd>
                <dd className="text-xs text-muted mt-0.5">
                  Desktop POS architecture, offline-first mobile utilities, full-stack systems
                </dd>
              </div>

              <div className="pt-3 border-t border-white/10">
                <dt className="text-xs text-muted">Location & Work Mode</dt>
                <dd className="text-ink font-normal mt-0.5">
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
