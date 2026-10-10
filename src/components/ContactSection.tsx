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
            {/* Comms Uplink Beacon (Static dot, no flashing animation) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-950/20 text-cyan-400 font-mono text-[11px] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
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
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2 text-xs font-mono font-medium rounded-full text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-[0_0_12px_rgba(0,240,255,0.3)] min-h-[44px]"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth={1.75}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span>Send email</span>
                </a>
              </div>
            </div>

            {/* Connection Platform Links with Official Logos */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300 pt-4 border-t border-white/10">
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 hover:scale-[1.02] transition-all min-h-[38px]"
                  aria-label="GitHub profile"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                  <span>GitHub (dalonelycat)</span>
                </a>
              )}

              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 hover:scale-[1.02] transition-all min-h-[38px]"
                  aria-label="LinkedIn profile"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                  <span>LinkedIn</span>
                </a>
              )}

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 hover:border-cyan-400 hover:text-cyan-400 hover:scale-[1.02] transition-all min-h-[38px]"
                aria-label="Curriculum Vitae PDF"
              >
                <svg className="w-4 h-4 fill-none stroke-current shrink-0" viewBox="0 0 24 24" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                <span>Curriculum Vitae (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
