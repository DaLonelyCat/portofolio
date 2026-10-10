"use client";

import React, { useState } from "react";
import { PersonalInfo } from "../types/portfolio";

interface NavbarProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
}

export function Navbar({ personal, onPrintCV }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Learning", href: "#learning" },
    { label: "Case Study", href: "#case-study" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-5xl mx-auto h-14 px-4 sm:px-6 rounded-full border border-white/10 bg-surface/80 backdrop-blur-xl shadow-lg shadow-black/30 flex items-center justify-between pointer-events-auto transition-all">
        {/* Brand */}
        <a
          href="#"
          className="text-sm font-medium tracking-tight text-ink hover:text-accent transition-colors py-1.5 px-2 rounded-full"
          aria-label="Home"
        >
          {personal.name}
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-white/5 px-2 py-1 rounded-full border border-white/5"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-normal text-muted hover:text-ink hover:bg-white/10 transition-all px-3 py-1 rounded-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrintCV}
            className="text-xs font-normal text-ink px-4 py-1.5 rounded-full border border-white/10 bg-white/5 hover:border-accent hover:text-accent hover:scale-[1.02] transition-all"
          >
            Read CV
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrintCV}
            className="text-xs font-normal text-ink px-3 py-1 rounded-full border border-white/10 bg-white/5 min-h-[38px] flex items-center"
          >
            CV
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="p-2 text-ink rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-all min-h-[38px] min-w-[38px] flex items-center justify-center"
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

      {/* Mobile Drawer (Playful Rounded Card) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-sm mx-auto rounded-2xl border border-white/10 bg-surface/95 backdrop-blur-2xl p-4 space-y-1.5 shadow-2xl pointer-events-auto">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm text-ink hover:text-accent hover:bg-white/5 px-4 py-2.5 rounded-xl transition-all"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
