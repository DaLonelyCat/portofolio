"use client";

import React from "react";

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Toast({ message, isOpen, onClose }: ToastProps) {
  if (!isOpen) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className="fixed bottom-20 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-surface text-ink border border-rule text-xs shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150"
    >
      <span className="font-normal">{message}</span>
      <button
        onClick={onClose}
        type="button"
        aria-label="Close notification"
        className="ml-2 text-muted hover:text-ink transition-colors p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
