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

const GalaxyBackground = dynamic(
  () =>
    import("@/components/GalaxyBackground").then(
      (mod) => mod.GalaxyBackground
    ),
  { ssr: false }
);

export default function Home() {
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);

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
      {/* Interactive Galaxy Background with Deep Space Scrim */}
      <GalaxyBackground />

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
