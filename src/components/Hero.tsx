"use client";

import React from "react";
import { PersonalInfo } from "../types/portfolio";

interface HeroProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
}

export function Hero({ personal, onPrintCV }: HeroProps) {
  return (
    <section id="hero" className="pt-24 pb-16 md:pt-32 md:pb-20 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Editorial Presentation */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-normal text-muted mb-4 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Available for software engineering and builder roles</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-ink mb-6 leading-[1.12]">
              Builder and problem solver turning cool ideas into working projects.
            </h1>

            <p className="text-base sm:text-lg text-muted font-normal leading-relaxed mb-8 max-w-2xl">
              {personal.bio}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-sm font-normal text-paper bg-accent hover:bg-accentHover transition-colors focus-visible:outline-accent"
              >
                See projects
              </a>

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-sm font-normal text-ink bg-transparent border border-rule hover:border-ink transition-colors focus-visible:outline-accent"
              >
                Read CV
              </a>

              <a
                href="#contact"
                className="inline-flex items-center justify-center px-5 py-2.5 min-h-[44px] text-sm font-normal text-ink bg-transparent border border-rule hover:border-ink transition-colors focus-visible:outline-accent"
              >
                Email me
              </a>
            </div>
          </div>

          {/* Right Column: Background & Snapshot Facts */}
          <div className="lg:col-span-5 bg-paper border border-rule p-6 lg:p-7">
            <h2 className="text-xs font-normal uppercase tracking-wider text-muted mb-4 pb-2 border-b border-rule">
              Background at a glance
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

              <div className="pt-3 border-t border-rule">
                <dt className="text-xs text-muted">Ventures & Roles</dt>
                <dd className="text-ink font-normal mt-0.5">
                  CFO & Software Developer at Fruqita
                </dd>
                <dd className="text-xs text-muted mt-0.5">
                  Former Founder & CEO at MyBeans
                </dd>
              </div>

              <div className="pt-3 border-t border-rule">
                <dt className="text-xs text-muted">Core Capabilities</dt>
                <dd className="text-ink font-normal mt-0.5">
                  React, Electron, Next.js, Java, Python, Android, Unity
                </dd>
                <dd className="text-xs text-muted mt-0.5">
                  Desktop POS systems, offline-first mobile apps, web applications
                </dd>
              </div>

              <div className="pt-3 border-t border-rule">
                <dt className="text-xs text-muted">Location</dt>
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
