"use client";

import React, { useState } from "react";
import { PersonalInfo } from "../types/portfolio";

interface NavbarProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
  onOpenCLI?: () => void;
}

export function Navbar({ personal, onPrintCV }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Learning", href: "#learning" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-paper border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#"
          className="text-sm font-normal tracking-tight text-ink hover:text-accent transition-colors py-2"
          aria-label="Home"
        >
          {personal.name}
        </a>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-6"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-xs font-normal text-muted hover:text-ink transition-colors py-2"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onPrintCV}
            className="text-xs font-normal text-ink px-3 py-1.5 border border-rule hover:border-ink transition-colors"
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
            className="text-xs font-normal text-ink px-2.5 py-1.5 border border-rule min-h-[44px] flex items-center"
          >
            CV
          </a>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="p-2.5 text-ink border border-rule hover:bg-rule/30 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isMobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-rule bg-paper px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm text-ink hover:text-accent py-2 min-h-[44px] flex items-center border-b border-rule/40 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
