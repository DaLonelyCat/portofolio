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
      className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${meta.classes}`}
    >
      {meta.label}
    </span>
  );
}
