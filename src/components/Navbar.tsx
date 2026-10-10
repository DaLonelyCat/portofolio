"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, Printer, ArrowUpRight, Radio, Terminal, Zap } from "lucide-react";
import { PersonalInfo } from "../types/portfolio";

interface NavbarProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
}

export function Navbar({ personal, onPrintCV }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "FRONTIERS_R&D", href: "#frontiers" },
    { label: "CASE_FILES", href: "#projects" },
    { label: "OPERATIONAL_LOG", href: "#experience" },
    { label: "CYBERWARE", href: "#skills" },
    { label: "UPLINK", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 xl:px-10 py-2.5 transition-all duration-200">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between">
        {/* Brand / Logo with Yellow & Cyan Accents */}
        <a
          href="#"
          className="flex items-center gap-2.5 px-3 py-1.5 cyber-nav clip-corner-sm transition-all hover:border-cyber-yellow group hover:shadow-neon-yellow-sm"
          aria-label="Home"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-cyber-yellow shadow-[0_0_8px_#ffe600] animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-cyber-yellow relative" />
          </div>
          <span className="font-mono font-bold text-xs tracking-wider text-white group-hover:text-cyber-yellow transition-colors">
            {personal.name.toUpperCase()}
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-cyber-yellow/80 border-l border-yellow-500/30 pl-2">
            SYS://PORTFOLIO
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 px-3 py-1 cyber-nav clip-corner-sm"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs text-slate-300 hover:text-cyber-yellow px-2.5 py-1 rounded transition-all hover:bg-yellow-500/10 focus-visible:ring-1 focus-visible:ring-cyber-yellow"
            >
              <span className="text-cyber-yellow/60 mr-1">//</span>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Quick Telemetry Pill */}
          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-black/60 border border-yellow-500/30 text-[10px] font-mono text-cyber-yellow clip-corner-sm">
            <Zap className="w-3 h-3 text-cyber-yellow animate-pulse" />
            <span>PWR: 100%</span>
          </div>

          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrintCV}
            className="flex items-center gap-1.5 font-mono text-xs text-slate-300 hover:text-white px-3 py-1.5 cyber-nav clip-corner-sm hover:border-cyber-cyan transition-colors focus-visible:ring-1 focus-visible:ring-cyber-cyan"
            title="Open CV (in new tab)"
          >
            <Printer className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>EXPORT_CV</span>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 font-mono text-xs font-bold bg-cyber-yellow hover:bg-cyber-yellowHover text-black px-3.5 py-1.5 clip-corner-sm shadow-neon-yellow transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Radio className="w-3.5 h-3.5" />
            <span>CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrintCV}
            className="p-1.5 cyber-nav clip-corner-sm text-slate-300 hover:text-white"
            aria-label="Open CV (in new tab)"
            title="Open CV"
          >
            <Printer className="w-4 h-4 text-cyber-cyan" />
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            className="p-1.5 cyber-nav clip-corner-sm text-slate-300 hover:text-cyber-yellow transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-cyber-magenta" /> : <Menu className="w-5 h-5 text-cyber-yellow" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 p-3.5 cyber-nav clip-corner border-cyber-yellow/40 shadow-2xl animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-yellow-500/20 text-[11px] font-mono text-cyber-yellow">
            <span>[ SYSTEM_MENU ]</span>
            <span className="text-emerald-400">STATUS: ACTIVE</span>
          </div>
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="font-mono text-xs text-slate-200 hover:text-cyber-yellow px-3 py-2 rounded bg-black/40 hover:bg-yellow-500/10 transition-colors"
              >
                <span className="text-cyber-yellow/60 mr-1.5">//</span>
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-yellow-500/20 flex flex-col gap-2">
              <a
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 font-mono text-xs font-bold bg-cyber-yellow text-black py-2 clip-corner-sm text-center shadow-neon-yellow"
              >
                <Radio className="w-4 h-4" />
                <span>INITIATE_UPLINK</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
