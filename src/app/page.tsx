"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { portfolioData } from "@/data/portfolio";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { Learning } from "@/components/Learning";
import { ExperienceSection } from "@/components/Experience";
import { SkillsSection } from "@/components/Skills";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { BackToTop } from "@/components/BackToTop";
import { RocketCursor } from "@/components/RocketCursor";
import { OrreryHUD } from "@/components/OrreryHUD";
import { useLiteMode } from "@/lib/liteMode";

const SolarSystemBackground = dynamic(
  () =>
    import("@/components/SolarSystemBackground").then(
      (mod) => mod.SolarSystemBackground
    ),
  { ssr: false }
);

export default function Home() {
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  // null until the client has checked, so WebGL scenes never mount then unmount.
  // true on low-power devices or reduced-motion users (see lib/liteMode.ts).
  const lite = useLiteMode();

  const showToast = (message: string) => {
    setToastMessage(message);
    setIsToastOpen(true);
    setTimeout(() => {
      setIsToastOpen(false);
    }, 3000);
  };

  const handleExportCV = () => {
    showToast("Opening CV in new tab");
  };

  return (
    <div className="relative min-h-screen bg-page text-ink selection:bg-cyan-500/30 selection:text-white font-sans">
      {/* Custom Cyberpunk Rocket Ship Mouse Pointer (skipped in lite mode) */}
      {lite === false && <RocketCursor />}

      {/* Interactive 3D Solar System Background with Deep Space Scrim (lite mode: static starfield) */}
      {lite === false && <SolarSystemBackground />}
      {lite === true && <div className="static-starfield" aria-hidden="true" />}

      <div className="relative z-10">
        {/* Printable Resume Header (visible only when printing) */}
        <div className="hidden print:block p-8 border-b border-rule mb-6">
          <h1 className="text-3xl font-normal text-black">{portfolioData.personal.name}</h1>
          <p className="text-lg text-black/70 mt-1">{portfolioData.personal.role}</p>
          <p className="text-sm text-black/70 mt-2">{portfolioData.personal.bio}</p>
          <div className="flex flex-wrap gap-4 text-xs text-black/70 mt-3">
            <span>Email: {portfolioData.personal.socials.email}</span>
            <span>•</span>
            <span>GitHub: github.com/dalonelycat</span>
            <span>•</span>
            <span>Location: {portfolioData.personal.location}</span>
          </div>
        </div>

        {/* Floating Cyber HUD Pill Navigation */}
        <div className="no-print">
          <Navbar
            personal={portfolioData.personal}
            onPrintCV={handleExportCV}
          />
        </div>

        {/* Main Content Sections: Space & Cyberpunk Layout Flow */}
        <main>
          {/* 1. Hero Flight Deck & Station Telemetry */}
          <Hero personal={portfolioData.personal} onPrintCV={handleExportCV} />

          {/* 2. Core Engineering Showcase */}
          <Projects projects={portfolioData.projects} categories={portfolioData.categories} />

          {/* 3. Research Frontiers */}
          <Learning />

          {/* 4. Operational Flight Log */}
          <ExperienceSection
            experiences={portfolioData.experiences}
            education={portfolioData.education}
          />

          {/* 5. Systems Competencies */}
          <SkillsSection categories={portfolioData.skillCategories} />

          {/* 6. Comms Uplink */}
          <ContactSection
            personal={portfolioData.personal}
            onCopyEmail={(email) => showToast(`Copied ${email} to clipboard`)}
            onPrintCV={handleExportCV}
          />
        </main>

        {/* Colophon Footer */}
        <Footer />

        {/* Back to Top Floating Button */}
        <BackToTop />

        {/* 3D Solar System Orrery Observatory HUD (needs the 3D scene, so hidden in lite mode) */}
        {lite === false && <OrreryHUD />}
      </div>

      {/* Notification Toast */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
