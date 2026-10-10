"use client";

import React, { useState, useEffect } from "react";
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
import { TacticalTerminal } from "@/components/TacticalTerminal";
import { ProjectModal } from "@/components/ProjectModal";

export default function Home() {
  const [toastMessage, setToastMessage] = useState("");
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [cliSelectedProject, setCliSelectedProject] = useState<Project | null>(null);

  // Global Cmd+K / Ctrl+K listener for the quiet terminal easter egg
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
    showToast("Opening CV in new tab");
  };

  const featuredProject =
    portfolioData.projects.find((p) => p.id === "unicash-pos") ||
    portfolioData.projects[0];

  return (
    <div className="min-h-screen bg-page text-ink selection:bg-rule selection:text-ink font-sans">
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
          onOpenCLI={() => setIsTerminalOpen(true)}
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

      {/* Interactive Terminal (Cmd+K Easter Egg) */}
      <TacticalTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenProject={handleOpenProjectFromCli}
        onShowToast={showToast}
      />

      {/* Project Modal Triggered From Terminal */}
      <ProjectModal
        project={cliSelectedProject}
        onClose={() => setCliSelectedProject(null)}
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
