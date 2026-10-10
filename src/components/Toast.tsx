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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 bg-ink text-paper border border-rule/40 text-xs shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150"
    >
      <span className="font-normal">{message}</span>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 text-muted hover:text-paper transition-colors p-1"
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
