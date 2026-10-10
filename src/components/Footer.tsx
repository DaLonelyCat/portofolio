"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="py-12 border-t border-rule bg-page text-muted text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-ink font-normal">Christian Emanuel Ikajaya</span>
            <span className="mx-2">•</span>
            <span>2026</span>
          </div>

          <div className="text-muted/80">
            Typeset in IBM Plex Sans. Deployed via Cloudflare Pages edge.
          </div>

          <div className="flex items-center gap-1.5 text-muted">
            <span>Terminal:</span>
            <kbd className="px-1.5 py-0.5 border border-rule bg-surface text-ink text-[11px] font-mono">
              Ctrl+K
            </kbd>
            <span>/</span>
            <kbd className="px-1.5 py-0.5 border border-rule bg-surface text-ink text-[11px] font-mono">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>
    </footer>
  );
}
