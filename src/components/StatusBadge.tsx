import React from "react";
import { ProjectStatus } from "../types/portfolio";

const STATUS_META: Record<ProjectStatus, { label: string; classes: string }> = {
  live: {
    label: "Live",
    classes: "text-emerald-400 bg-emerald-950/40 border-emerald-500/30",
  },
  personal: {
    label: "Personal use",
    classes: "text-violet-300 bg-violet-950/40 border-violet-500/30",
  },
};

export function StatusBadge({ status }: { status?: ProjectStatus }) {
  if (!status) return null;
  const meta = STATUS_META[status];
  return (
    <span
      data-status={status}
      className={`text-xs font-mono px-2 py-0.5 rounded-full border ${meta.classes}`}
    >
      {meta.label}
    </span>
  );
}

export function getCategoryBadgeClasses(category: string): string {
  switch (category) {
    case "Web App":
      return "text-emerald-300 bg-emerald-950/40 border-emerald-500/30";
    case "Android App":
      return "text-violet-300 bg-violet-950/40 border-violet-500/30";
    case "Desktop Application":
      return "text-cyan-300 bg-cyan-950/40 border-cyan-500/30";
    case "Game Development":
      return "text-rose-300 bg-rose-950/40 border-rose-500/30";
    case "AI & Machine Learning":
      return "text-indigo-300 bg-indigo-950/40 border-indigo-500/30";
    case "Augmented Reality":
      return "text-amber-300 bg-amber-950/40 border-amber-500/30";
    default:
      return "text-cyan-300 bg-cyan-950/40 border-cyan-500/30";
  }
}
