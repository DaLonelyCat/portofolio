"use client";

import React, { useState } from "react";
import { PersonalInfo } from "../types/portfolio";
import { SectionHeader } from "./SectionHeader";

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
    <section id="contact" className="py-16 md:py-24 border-b border-rule">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          number="06"
          category="Inquiries & Transmission"
          title="Direct Contact"
          description="Available for software engineering opportunities, builder roles, and collaborations."
        />

        <div className="border border-rule p-6 sm:p-10 bg-surface">
          <div className="max-w-2xl">
            <h4 className="text-xl sm:text-3xl font-light text-ink tracking-tight mb-4">
              Let&rsquo;s talk about building software together.
            </h4>
            <p className="text-sm text-muted leading-relaxed mb-8">
              Whether you are discussing engineering roles, product development, or new technology ventures, feel free to reach out directly by email.
            </p>

            {/* Email Box */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-3 border border-rule bg-page mb-8">
              <span className="text-sm sm:text-base text-ink font-normal px-2 truncate select-all">
                {personal.socials.email}
              </span>

              <div className="flex items-center gap-2 sm:ml-auto">
                <button
                  onClick={handleCopy}
                  type="button"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-normal border border-rule text-ink hover:border-accent hover:text-accent transition-colors min-h-[44px]"
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
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-normal text-page bg-accent hover:bg-accentHover transition-colors min-h-[44px]"
                >
                  <span>Send email</span>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Social Channels & Links */}
            <div className="flex flex-wrap items-center gap-5 text-xs text-muted pt-4 border-t border-rule/50">
              {personal.socials.github && (
                <a
                  href={personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors underline underline-offset-4"
                >
                  GitHub (dalonelycat)
                </a>
              )}

              {personal.socials.linkedin && (
                <a
                  href={personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink transition-colors underline underline-offset-4"
                >
                  LinkedIn
                </a>
              )}

              <a
                href="/cv"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onPrintCV}
                className="hover:text-ink transition-colors underline underline-offset-4"
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
