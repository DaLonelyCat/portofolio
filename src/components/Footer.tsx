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
        </div>
      </div>
    </footer>
  );
}
