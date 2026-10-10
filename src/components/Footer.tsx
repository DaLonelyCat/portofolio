"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-white/10 text-slate-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-white font-normal">Christian Emanuel Ikajaya</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-cyan-400">
              STATION 2026
            </span>
          </div>

          <div className="text-slate-400">
            Typeset in IBM Plex Sans. Space Cyberpunk • Cloudflare Pages edge.
          </div>
        </div>
      </div>
    </footer>
  );
}
