"use client";

import React from "react";
import { ArrowLeft, Download, Printer, Terminal, Shield, ExternalLink } from "lucide-react";

export default function CVViewerPage() {
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-cyber-void text-slate-100 flex flex-col font-sans selection:bg-cyber-yellow selection:text-black">
      {/* Top Tactical Control Bar */}
      <header className="sticky top-0 z-30 bg-[#090b14]/95 border-b border-yellow-500/30 backdrop-blur-md px-4 sm:px-6 py-3">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Left: Return & Breadcrumb */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <a
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-yellow-500/10 border border-slate-700 hover:border-cyber-yellow text-slate-300 hover:text-cyber-yellow clip-corner-sm transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>RETURN_TO_PORTFOLIO</span>
            </a>

            <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
              <span className="text-cyber-yellow/60">//</span>
              <Terminal className="w-3.5 h-3.5 text-cyber-yellow" />
              <span className="text-white font-bold">CHRISTIAN_EMANUEL_IKAJAYA_CV.PDF</span>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 font-mono text-xs">
            <a
              href="/Christian_Emanuel_Ikajaya_CV.pdf"
              download="Christian_Emanuel_Ikajaya_CV.pdf"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-cyber-yellow hover:bg-cyber-yellowHover text-black font-bold clip-corner-sm shadow-neon-yellow transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>DOWNLOAD_RAW_PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/80 hover:bg-cyan-500/10 border border-cyan-500/40 text-cyber-cyan hover:text-white clip-corner-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>PRINT</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main PDF Viewer Frame */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-2 sm:p-4 flex flex-col">
        <div className="flex-1 w-full bg-[#0d101d] border border-yellow-500/20 clip-corner overflow-hidden relative min-h-[calc(100vh-80px)] flex flex-col shadow-2xl">
          {/* Subtle Cyber Status Bar */}
          <div className="bg-black/90 border-b border-yellow-500/20 px-4 py-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-pulse" />
              <span className="text-cyber-green font-bold">PDF_SECURE_CHANNEL: ACTIVE</span>
            </div>
            <div className="hidden md:flex items-center gap-4 text-slate-500">
              <span>AUTHENTIC_CREDENTIALS</span>
              <span>•</span>
              <span>BINUS UNIVERSITY CS</span>
              <span>•</span>
              <span>FRUQITA CFO</span>
            </div>
          </div>

          {/* Embedded PDF iframe (IDM will NOT intercept this since the tab URL is /cv) */}
          <iframe
            src="/Christian_Emanuel_Ikajaya_CV.pdf#toolbar=1"
            className="w-full flex-1 border-0 min-h-[calc(100vh-120px)]"
            title="Christian Emanuel Ikajaya Curriculum Vitae"
          />
        </div>
      </main>
    </div>
  );
}
