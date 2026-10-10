"use client";

import React, { useState, useEffect } from "react";
import { portfolioData } from "@/data/portfolio";
import { Project } from "@/types/portfolio";
import { Navbar } from "@/components/Navbar";
import { CyberHudRail } from "@/components/CyberHudRail";
import { Hero } from "@/components/Hero";
import { FrontierFocus } from "@/components/FrontierFocus";
import { Projects } from "@/components/Projects";
import { ExperienceSection } from "@/components/Experience";
import { SkillsSection } from "@/components/Skills";
import { ContactSection } from "@/components/ContactSection";
import { Toast } from "@/components/Toast";
import { TacticalTerminal } from "@/components/TacticalTerminal";
import { ProjectModal } from "@/components/ProjectModal";

export default function Home() {
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [cliSelectedProject, setCliSelectedProject] = useState<Project | null>(null);

  // Global Cmd+K / Ctrl+K listener
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const handleOpenProjectFromCli = (projectId: string) => {
    const found = portfolioData.projects.find((p) => p.id === projectId);
    if (found) {
      setCliSelectedProject(found);
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
    showToast("Opening CV Dossier in new tab...");
  };

  return (
    <div className="relative min-h-screen bg-cyber-void text-slate-100 cyber-grid">
      {/* CRT Scanline Overlay Texture */}
      <div className="fixed inset-0 scanlines pointer-events-none z-30 opacity-35" />

      {/* Printable Resume Header (visible only when printing) */}
      <div className="hidden print:block p-8 border-b border-gray-300 mb-6">
        <h1 className="text-3xl font-bold text-black">{portfolioData.personal.name}</h1>
        <p className="text-lg font-semibold text-gray-700 mt-1">{portfolioData.personal.role}</p>
        <p className="text-sm text-gray-600 mt-2">{portfolioData.personal.bio}</p>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-3">
          <span>Email: {portfolioData.personal.socials.email}</span>
          <span>•</span>
          <span>GitHub: github.com/dalonelycat</span>
          <span>•</span>
          <span>Location: {portfolioData.personal.location}</span>
        </div>
      </div>

      {/* Floating Glass Navigation */}
      <div className="no-print">
        <Navbar
          personal={portfolioData.personal}
          onPrintCV={handleExportCV}
          onOpenCLI={() => setIsTerminalOpen(true)}
        />
        <CyberHudRail />
      </div>

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero personal={portfolioData.personal} onPrintCV={handleExportCV} />
        <FrontierFocus />
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

      {/* Tactical CLI Terminal (Cmd+K) */}
      <TacticalTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenProject={handleOpenProjectFromCli}
        onShowToast={showToast}
      />

      {/* Project Modal Triggered From CLI */}
      <ProjectModal
        project={cliSelectedProject}
        onClose={() => setCliSelectedProject(null)}
      />

      {/* Feedback Toast */}
      <Toast
        isOpen={isToastOpen}
        message={toastMessage}
        onClose={() => setIsToastOpen(false)}
      />
    </div>
  );
}
