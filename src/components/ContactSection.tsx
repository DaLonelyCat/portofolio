"use client";

import React, { useState } from "react";
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
    <section id="contact" className="py-16 md:py-24 border-b border-rule/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dedicated Cyber Comms Uplink Module */}
        <div className="rounded-3xl border border-cyan-500/30 bg-[#0B0D16]/95 p-8 sm:p-12 shadow-[0_0_35px_rgba(0,0,0,0.8)]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-[11px] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#00F0FF]" />
              <span>COMMS UPLINK // CHANNEL OPEN</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-light text-white tracking-tight mb-4">
              Let&rsquo;s talk about building software together.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Whether you are discussing engineering opportunities, product architecture, or new technology ventures, feel free to reach out directly by email.
            </p>

            {/* Email Pill Console */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2 sm:pl-5 rounded-2xl sm:rounded-full border border-white/10 bg-[#121626]/80 mb-8 shadow-inner">
              <span className="text-sm sm:text-base text-white font-mono px-2 truncate select-all py-1">
                {personal.socials.email}
              </span>

              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-mono font-medium rounded-full border border-white/10 bg-white/5 text-slate-200 hover:border-cyan-400 hover:text-cyan-400 transition-all min-h-[44px]"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-cyan-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personal.socials.email}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2 text-xs font-mono font-medium rounded-full text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)] min-h-[44px]"
                >
                  <span>Send email</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Social Channels & Links */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-400 pt-4 border-t border-white/10">
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 hover:scale-[1.02] transition-all min-h-[38px] flex items-center"
                >
                  GitHub (dalonelycat)
                </a>
              )}

              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 hover:scale-[1.02] transition-all min-h-[38px] flex items-center"
                >
                  LinkedIn
                </a>
              )}

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 hover:scale-[1.02] transition-all min-h-[38px] flex items-center"
              >
                Curriculum Vitae (PDF)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
