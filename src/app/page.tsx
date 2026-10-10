"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { portfolioData } from "@/data/portfolio";
import { Project } from "@/types/portfolio";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Learning } from "@/components/Learning";
import { FeaturedCaseStudy } from "@/components/FeaturedCaseStudy";
import { Projects } from "@/components/Projects";
import { ExperienceSection } from "@/components/Experience";
import { SkillsSection } from "@/components/Skills";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Toast } from "@/components/Toast";
import { CommandPalette } from "@/components/CommandPalette";
import { ProjectModal } from "@/components/ProjectModal";

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
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null);

  // Global Cmd+K / Ctrl+K listener for the quick command palette
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const handleOpenProjectFromPalette = (projectId: string) => {
    const found = portfolioData.projects.find((p) => p.id === projectId);
    if (found) {
      setSelectedModalProject(found);
    }
  };

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

  const featuredProject =
    portfolioData.projects.find((p) => p.id === "unicash-pos") ||
    portfolioData.projects[0];

  return (
    <div className="relative min-h-screen bg-page text-ink selection:bg-rule selection:text-ink font-sans">
      {/* Interactive Three.js Galaxy Background Canvas */}
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

        {/* Navigation */}
        <div className="no-print">
          <Navbar
            personal={portfolioData.personal}
            onPrintCV={handleExportCV}
            onOpenPalette={() => setIsPaletteOpen(true)}
          />
        </div>

        {/* Main Content Sections */}
        <main>
          <Hero personal={portfolioData.personal} onPrintCV={handleExportCV} />
          <Learning />
          <FeaturedCaseStudy project={featuredProject} />
          <Projects projects={portfolioData.projects} categories={portfolioData.categories} />
          <ExperienceSection
            experiences={portfolioData.experiences}
            education={portfolioData.education}
          />
          <SkillsSection categories={portfolioData.skillCategories} />
          <ContactSection
            personal={portfolioData.personal}
            onCopyEmail={(email) => showToast(`Copied ${email} to clipboard`)}
            onPrintCV={handleExportCV}
          />
        </main>

        {/* Colophon Footer */}
        <Footer />
      </div>

      {/* Interactive Command Palette (Cmd+K Easter Egg) */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenProject={handleOpenProjectFromPalette}
        onShowToast={showToast}
      />

      {/* Project Modal Triggered From Command Palette */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />

      {/* Notification Toast */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
