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
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border border-rule p-8 sm:p-12 bg-paper">
          <div className="max-w-2xl">
            <h2 className="text-xs font-normal uppercase tracking-wider text-muted mb-2">
              Contact
            </h2>
            <h3 className="text-2xl sm:text-4xl font-light text-ink tracking-tight mb-4">
              Get in touch
            </h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed mb-8">
              I am open to software engineering positions, builder roles, and technical collaborations. Feel free to reach out directly by email.
            </p>

            {/* Email Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 border border-rule bg-paper mb-8">
              <span className="text-sm sm:text-base text-ink font-normal px-2 truncate select-all">
                {personal.socials.email}
              </span>

              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-normal border border-rule text-ink hover:border-ink transition-colors min-h-[44px]"
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? (
                    <>
                      <svg className="w-3.5 h-3.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personal.socials.email}`}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-normal text-paper bg-accent hover:bg-accentHover transition-colors min-h-[44px]"
                >
                  <span>Send email</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted pt-4 border-t border-rule">
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors underline"
                >
                  GitHub (dalonelycat)
                </a>
              )}

              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors underline"
                >
                  LinkedIn
                </a>
              )}

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="hover:text-ink transition-colors underline"
              >
                Curriculum Vitae (PDF)
              </a>
            </div>

            {/* Quiet Easter Egg Hint */}
            <div className="mt-8 text-xs text-muted/80">
              <span>Terminal easter egg available anytime: press </span>
              <kbd className="px-1.5 py-0.5 border border-rule text-ink bg-paper text-[11px]">Ctrl+K</kbd>
              <span> or </span>
              <kbd className="px-1.5 py-0.5 border border-rule text-ink bg-paper text-[11px]">⌘K</kbd>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
