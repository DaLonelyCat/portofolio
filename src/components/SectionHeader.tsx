"use client";

import React from "react";

interface SectionHeaderProps {
  number: string;
  category: string;
  title: string;
  description?: string;
}

export function SectionHeader({ number, category, title, description }: SectionHeaderProps) {
  return (
    <div className="mb-10 pb-6 border-b border-rule">
      <div className="flex items-baseline gap-3 mb-2">
        <span className="text-xs font-mono text-accent tabular-nums">{number}</span>
        <span className="text-xs text-muted uppercase tracking-wider">{category}</span>
      </div>
      <h3 className="text-2xl sm:text-3xl font-light text-ink tracking-tight">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted mt-1.5 max-w-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
