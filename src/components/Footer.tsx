"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="py-12 text-slate-400 text-xs font-mono">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-white font-normal">Christian Emanuel Ikajaya</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-cyan-400">
              © 2026
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
