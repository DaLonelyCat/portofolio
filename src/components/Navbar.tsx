"use client";

import React, { useState, useEffect, useRef } from "react";
import { PersonalInfo } from "../types/portfolio";

interface NavbarProps {
  personal: PersonalInfo;
  onPrintCV: () => void;
}

export function Navbar({ personal, onPrintCV }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [bubbleStyle, setBubbleStyle] = useState<{
    left: number;
    width: number;
    height: number;
    opacity: number;
  }>({ left: 0, width: 0, height: 0, opacity: 0 });
  const [popKey, setPopKey] = useState<number>(0);

  const linkRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const isManualNavRef = useRef(false);
  const manualNavTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const navLinks = [
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Learning", href: "#learning", id: "learning" },
    { label: "Experience", href: "#experience", id: "experience" },
    { label: "Skills", href: "#skills", id: "skills" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  // Update bacteria bubble geometry whenever activeSection changes
  useEffect(() => {
    if (activeSection && linkRefs.current[activeSection]) {
      const el = linkRefs.current[activeSection];
      if (el) {
        setBubbleStyle({
          left: el.offsetLeft,
          width: el.offsetWidth,
          height: el.offsetHeight,
          opacity: 1,
        });
        setPopKey((k) => k + 1);
      }
    } else {
      setBubbleStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Handle window resize to keep bubble aligned
  useEffect(() => {
    const handleResize = () => {
      if (activeSection && linkRefs.current[activeSection]) {
        const el = linkRefs.current[activeSection];
        if (el) {
          setBubbleStyle({
            left: el.offsetLeft,
            width: el.offsetWidth,
            height: el.offsetHeight,
            opacity: 1,
          });
        }
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection]);

  // Robust, throttled section tracking with hysteresis
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = window.requestAnimationFrame(() => {
        rafId = null;

        setIsScrolled(window.scrollY > 20);

        if (isManualNavRef.current) return;

        // Top of page (Hero section)
        if (window.scrollY < 160) {
          setActiveSection("");
          return;
        }

        // Bottom of page lock to Contact
        const scrollBottom = window.innerHeight + window.scrollY;
        const docHeight = document.documentElement.scrollHeight;
        if (scrollBottom >= docHeight - 90) {
          setActiveSection("contact");
          return;
        }

        const sectionIds = ["projects", "learning", "experience", "skills", "contact"];
        let matched = "";

        for (const id of sectionIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 120) {
            matched = id;
            break;
          }
        }

        if (matched) {
          setActiveSection(matched);
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (manualNavTimeoutRef.current) clearTimeout(manualNavTimeoutRef.current);
    };
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

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    isManualNavRef.current = true;
    if (manualNavTimeoutRef.current) {
      clearTimeout(manualNavTimeoutRef.current);
    }
    manualNavTimeoutRef.current = setTimeout(() => {
      isManualNavRef.current = false;
    }, 800);
  };

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
        {/* Brand */}
        <a
          href="#"
          className="flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-tight text-white hover:text-cyan-400 transition-colors py-1.5 px-2 rounded-full min-h-[44px]"
          aria-label="Home"
        >
          <span className="font-medium text-white">{personal.name.toLowerCase()}</span>
        </a>

        {/* Desktop Navigation Links (Frosted Glass Pill Rail with Bacteria Bubble Indicator) */}
        <nav
          aria-label="Main Navigation"
          className="relative hidden md:flex items-center gap-1 bg-white/[0.04] backdrop-blur-md px-2 py-1 rounded-full border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)]"
        >
          {/* Sliding Bacteria Bubble Indicator with Spring Pop Physics */}
          <span
            key={popKey}
            aria-hidden="true"
            className="pointer-events-none absolute rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] motion-reduce:transition-none animate-bacteria-pop"
            style={{
              left: `${bubbleStyle.left}px`,
              width: `${bubbleStyle.width}px`,
              height: `${bubbleStyle.height}px`,
              opacity: bubbleStyle.opacity,
              transform: bubbleStyle.opacity > 0 ? "scale(1)" : "scale(0.5)",
            }}
          >
            {/* Bioluminescent bacteria bubble membrane and cyan glow */}
            <span className="absolute inset-0 rounded-full bg-cyan-950/80 border border-cyan-400/60 shadow-[0_0_14px_rgba(0,240,255,0.35),_inset_0_0_10px_rgba(0,240,255,0.25)]" />
            {/* Cellular surface tension highlight */}
            <span className="absolute inset-x-2 top-0.5 h-[1.5px] rounded-full bg-gradient-to-r from-transparent via-cyan-200/80 to-transparent" />
          </span>

          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                ref={(el) => {
                  linkRefs.current[link.id] = el;
                }}
                href={link.href}
                onClick={() => handleNavClick(link.id)}
                className={`relative z-10 text-xs font-mono px-3.5 py-1 rounded-full select-none transition-colors duration-200 border border-transparent ${
                  isActive
                    ? "text-cyan-300 font-medium drop-shadow-[0_0_8px_rgba(0,240,255,0.7)]"
                    : "text-slate-300 hover:text-cyan-300"
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
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setActiveSection(link.id);
                }}
                className={`block text-sm font-mono px-4 py-3 rounded-xl transition-all min-h-[44px] flex items-center border ${
                  isActive
                    ? "text-cyan-400 bg-cyan-950/60 border-cyan-500/30 font-medium"
                    : "text-white border-transparent hover:text-cyan-400 hover:bg-cyan-950/30"
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
