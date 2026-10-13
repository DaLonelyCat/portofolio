"use client";

import React, { useState, useEffect } from "react";
import { PersonalInfo } from "../types/portfolio";

interface NavbarProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
}

export function Navbar({ personal, onPrintCV }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  const navLinks = [
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Learning", href: "#learning", id: "learning" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Section tracking for active pill highlight
      const scrollPosition = window.scrollY + 250;
      const sectionIds = ["projects", "learning", "experience", "skills", "contact"];
      
      let current = "";
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          current = sectionIds[i];
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none transition-all duration-500 ease-in-out motion-reduce:transition-none ${
        isScrolled
          ? "pt-3 sm:pt-4 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] px-3 sm:px-6"
          : "pt-0 pt-[env(safe-area-inset-top,0px)] px-0"
      }`}
    >
      <div
        className={`mx-auto pointer-events-auto transition-all duration-500 ease-in-out motion-reduce:transition-none flex items-center justify-between ${
          isScrolled
            ? "w-full max-w-5xl h-14 px-4 sm:px-6 rounded-full border border-cyan-500/30 bg-[#0B0D16]/85 backdrop-blur-md md:backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.7),_inset_0_1px_0_0_rgba(255,255,255,0.15)]"
            : "w-full max-w-full h-16 px-4 sm:px-8 lg:px-12 rounded-none border-b border-white/10 border-t-0 border-x-0 bg-[#05060A]/80 backdrop-blur-md md:backdrop-blur-xl shadow-none"
        }`}
      >
        {/* Brand (Clean, no /station tag) */}
        <a
          href="#"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-tight text-white hover:text-cyan-400 transition-colors py-1.5 px-2 rounded-full min-h-[44px]"
          aria-label="Home"
        >
          <span className="font-medium text-white">{personal.name.toLowerCase()}</span>
        </a>

        {/* Desktop Navigation Links (Frosted Glass Pill Rail with Active Highlight) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-white/[0.04] backdrop-blur-md px-2 py-1 rounded-full border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`text-xs font-mono transition-all px-3.5 py-1 rounded-full ${
                  isActive
                    ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_10px_rgba(0,240,255,0.2)]"
                    : "text-slate-300 hover:text-cyan-400 hover:bg-cyan-950/40"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrintCV}
            className="text-xs font-mono text-cyan-400 px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-950/30 hover:border-cyan-400 hover:bg-cyan-950/60 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] backdrop-blur-md transition-all min-h-[44px] flex items-center"
          >
            Read CV
          </a>
        </div>

        {/* Mobile Actions & Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrintCV}
            className="text-xs font-mono text-cyan-400 px-3.5 py-1.5 rounded-full border border-cyan-500/40 bg-cyan-950/30 min-h-[44px] flex items-center"
          >
            CV
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            className="p-2.5 text-white rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-label="Mobile Navigation"
          className="md:hidden mt-2 max-w-sm mx-auto rounded-2xl border border-cyan-500/30 bg-[#0B0D16]/95 backdrop-blur-md p-4 space-y-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.8),_inset_0_1px_0_0_rgba(255,255,255,0.1)] pointer-events-auto max-h-[calc(100vh-5rem-env(safe-area-inset-top,0px))] overflow-y-auto"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-sm font-mono px-4 py-3 rounded-xl transition-all min-h-[44px] flex items-center ${
                  isActive
                    ? "text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 font-medium"
                    : "text-white hover:text-cyan-400 hover:bg-cyan-950/30"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
