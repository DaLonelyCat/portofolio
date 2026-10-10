"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Github, Linkedin, Figma, ArrowUpRight, Printer, Radio, Terminal, Zap, Phone } from "lucide-react";
import { PersonalInfo } from "../types/portfolio";

interface ContactSectionProps {
  personal: PersonalInfo;
  onCopyEmail: (email: string) => void;
  onPrintCV: () => void;
}

export function ContactSection({ personal, onCopyEmail, onPrintCV }: ContactSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(personal.socials.email);
    setCopied(true);
    onCopyEmail(personal.socials.email);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-8 md:py-12 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 xl:px-12">
        {/* Contact Terminal Card with 2-Column Wide Layout to Maximize Space */}
        <div className="relative p-5 sm:p-7 cyber-panel-yellow clip-corner border-cyber-yellow/40 bg-[#090b14]/90 overflow-hidden shadow-[0_0_35px_rgba(255,230,0,0.12)]">
          {/* Subtle dual neon background glow */}
          <div className="absolute -top-24 left-1/3 w-96 h-48 bg-cyber-yellow/12 blur-3xl rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 right-1/3 w-96 h-48 bg-cyber-cyan/12 blur-3xl rounded-full pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Column (7 cols): Heading & Transmission Box */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Terminal frequency status */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/80 border border-yellow-500/40 clip-corner-sm text-xs font-mono text-cyber-yellow mb-3 shadow-neon-yellow-sm">
                <Radio className="w-3.5 h-3.5 animate-pulse text-cyber-yellow" />
                <span>// FREQ: 433.92 MHz // ENCRYPTED_UPLINK</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
                INITIATE SECURE TRANSMISSION
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mb-5 font-sans leading-relaxed">
                Available for design system architectures, frontend engineering missions, and full-time product roles. Transmit your brief directly.
              </p>

              {/* Email Terminal Box with Responsive Copy & Send */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 p-2.5 bg-black/90 border border-yellow-500/30 clip-corner-sm max-w-lg w-full">
                <span className="text-xs sm:text-sm font-mono text-cyber-yellow px-2 truncate w-full sm:w-auto text-center sm:text-left font-bold select-all">
                  {personal.socials.email}
                </span>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:ml-auto">
                  <button
                    onClick={handleCopy}
                    type="button"
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 sm:py-1.5 font-mono text-xs font-bold bg-zinc-900 hover:bg-zinc-800 border border-yellow-500/30 text-slate-200 hover:text-cyber-yellow clip-corner-sm transition-colors min-h-[40px] sm:min-h-0"
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-cyber-green" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 text-cyber-yellow" />
                    )}
                    <span>{copied ? "COPIED" : "COPY"}</span>
                  </button>

                  <a
                    href={`mailto:${personal.socials.email}`}
                    className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 sm:py-1.5 font-mono text-xs font-bold bg-cyber-yellow hover:bg-cyber-yellowHover text-black clip-corner-sm shadow-neon-yellow transition-all min-h-[40px] sm:min-h-0"
                  >
                    <span>TRANSMIT</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Grid of Comms Channels (Fills horizontal space!) */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-2.5 font-mono text-xs">
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-black/80 hover:bg-yellow-500/10 border border-yellow-500/20 hover:border-cyber-yellow text-slate-300 hover:text-cyber-yellow clip-corner-sm transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Github className="w-4 h-4 text-cyber-yellow" />
                    <span>GITHUB</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              )}

              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 bg-black/80 hover:bg-cyan-500/10 border border-cyan-500/20 hover:border-cyber-cyan text-slate-300 hover:text-cyber-cyan clip-corner-sm transition-all"
                >
                  <div className="flex items-center gap-2">
                    <Linkedin className="w-4 h-4 text-cyber-cyan" />
                    <span>LINKEDIN</span>
                  </div>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              )}

              <a
                href={`mailto:${personal.socials.email}`}
                className="flex items-center justify-between p-3 bg-black/80 hover:bg-magenta-500/10 border border-magenta-500/20 hover:border-cyber-magenta text-slate-300 hover:text-cyber-magenta clip-corner-sm transition-all"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-cyber-magenta" />
                  <span>DIRECT_EMAIL</span>
                </div>
                <ArrowUpRight className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="flex items-center justify-between p-3 bg-black/80 hover:bg-yellow-500/10 border border-cyber-yellow/40 hover:border-cyber-yellow text-cyber-yellow hover:text-white clip-corner-sm transition-all text-left"
              >
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-cyber-yellow" />
                  <span>EXPORT_CV</span>
                </div>
                <span className="text-[10px] text-cyber-yellow font-bold">[PDF_TAB]</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer with Compact Spacing */}
        <footer className="mt-8 pt-4 border-t border-yellow-500/15 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {personal.name.toUpperCase()} // PROTOCOL_V3
          </div>
          <div className="flex items-center gap-3 text-cyber-yellow text-[11px]">
            <span>[HOSTED_ON_CLOUDFLARE]</span>
            <span>//</span>
            <span>[LOC: {personal.location.toUpperCase()}]</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
