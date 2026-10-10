"use client";

import React from "react";

export default function CVViewerPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-page text-ink flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 bg-page/95 border-b border-rule px-4 sm:px-6 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Return */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rule hover:border-ink text-ink transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Return to portfolio</span>
            </a>

            <span className="hidden sm:inline text-muted">
              Christian Emanuel Ikajaya • Curriculum Vitae
            </span>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 text-xs">
            <a
              href="/Christian_Emanuel_Ikajaya_CV.pdf"
              download="Christian_Emanuel_Ikajaya_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-accent hover:bg-accentHover text-page transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-rule hover:border-ink text-ink transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Print</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main PDF Viewer Frame */}
      <main className="flex-1 w-full max-w-6xl mx-auto p-3 sm:p-6 flex flex-col">
        <div className="flex-1 w-full border border-rule overflow-hidden bg-surface shadow-sm min-h-[calc(100vh-100px)]">
          <iframe
            src="/Christian_Emanuel_Ikajaya_CV.pdf#toolbar=1"
            className="w-full h-full min-h-[calc(100vh-120px)] border-0"
            title="Christian Emanuel Ikajaya Curriculum Vitae"
          />
        </div>
      </main>
    </div>
  );
}
