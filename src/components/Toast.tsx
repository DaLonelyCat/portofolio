"use client";

import React from "react";
import { X, Terminal } from "lucide-react";

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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 bg-[#0a0d18]/95 border-2 border-cyber-yellow clip-corner-sm shadow-neon-yellow text-white animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="w-6 h-6 bg-cyber-yellow/20 flex items-center justify-center text-cyber-yellow clip-corner-sm">
        <Terminal className="w-3.5 h-3.5" />
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[10px] text-cyber-yellow font-bold tracking-wider">
          [ SYSTEM_ALERT ]
        </span>
        <span className="font-mono text-xs text-slate-100">{message.toUpperCase()}</span>
      </div>
      <button
        onClick={onClose}
        aria-label="Close notification"
        className="ml-2 text-slate-400 hover:text-cyber-yellow transition-colors p-1"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
