"use client";

import React, { useState, useEffect, useRef } from "react";
import { portfolioData } from "../data/portfolio";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (projectId: string) => void;
  onShowToast: (msg: string) => void;
}

interface LogEntry {
  id: string;
  type: "system" | "input" | "output" | "error";
  text: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  onOpenProject,
  onShowToast,
}: CommandPaletteProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "init-1",
      type: "system",
      text: "Command Palette [Cmd+K]",
    },
    {
      id: "init-2",
      type: "system",
      text: "Type 'help' for available commands, or 'projects' to view projects.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const newLogs: LogEntry[] = [
      ...logs,
      { id: `in-${Date.now()}`, type: "input", text: `> ${trimmed}` },
    ];

    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    const argStr = args.join(" ");

    switch (cmd) {
      case "help":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `Available commands:
  projects              List all projects
  open <id | number>    Open project overview modal (e.g. 'open 1' or 'open unicash-pos')
  connectomics          View research notes on 3D fruit fly brain scans
  agentic               View notes on agentic AI
  skills                List skills and competencies
  cv                    Open Curriculum Vitae
  contact               Copy email to clipboard
  clear                 Clear output history
  exit                  Close palette`,
        });
        break;

      case "projects": {
        const listText = portfolioData.projects
          .map((p, i) => `  [${i + 1}] ${p.id.padEnd(22)} (${p.category}) - ${p.title}`)
          .join("\n");
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `Projects (${portfolioData.projects.length} entries):\n${listText}\n\nType 'open <number>' or 'open <id>' to inspect details.`,
        });
        break;
      }

      case "open": {
        if (!argStr) {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: "error",
            text: "Usage: open <project-number> or open <project-id>",
          });
          break;
        }

        let targetId = argStr;
        const num = parseInt(argStr, 10);
        if (!isNaN(num) && num >= 1 && num <= portfolioData.projects.length) {
          targetId = portfolioData.projects[num - 1].id;
        }

        const project = portfolioData.projects.find(
          (p) => p.id.toLowerCase() === targetId.toLowerCase()
        );

        if (project) {
          newLogs.push({
            id: `out-${Date.now()}`,
            type: "output",
            text: `Opening overview for ${project.title}...`,
          });
          onClose();
          onOpenProject(project.id);
        } else {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: "error",
            text: `No project found matching '${argStr}'. Type 'projects' to list all.`,
          });
        }
        break;
      }

      case "connectomics":
      case "fly":
      case "brain":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `Connectomics Research Notes:
Topic:   3D electron microscopy scans and synaptic circuits of Drosophila melanogaster.
Status:  Currently learning.
Focus:   Studying whole-brain datasets to understand biological neural wiring and synaptic connectivity graphs.`,
        });
        break;

      case "agentic":
      case "ai":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `Agentic AI Systems Notes:
Topic:   Autonomous multi-agent architectures and tool-calling loops.
Status:  Currently learning.
Focus:   Investigating coordination patterns, state management, and workflow automation for practical tasks.`,
        });
        break;

      case "skills": {
        const skillsText = portfolioData.skillCategories
          .map(
            (c) =>
              `${c.title}:\n` +
              c.skills.map((s) => `  • ${s.name} (${s.context})`).join("\n")
          )
          .join("\n\n");
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `Competencies:\n\n${skillsText}`,
        });
        break;
      }

      case "cv":
      case "resume":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: "Opening Curriculum Vitae in a new tab...",
        });
        window.open("/cv", "_blank");
        break;

      case "contact":
      case "email":
        navigator.clipboard.writeText(portfolioData.personal.socials.email);
        onShowToast(`Copied ${portfolioData.personal.socials.email} to clipboard`);
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `Email: ${portfolioData.personal.socials.email} (Copied to clipboard)`,
        });
        break;

      case "clear":
      case "cls":
        setLogs([]);
        setInput("");
        return;

      case "exit":
      case "quit":
        onClose();
        return;

      default:
        newLogs.push({
          id: `err-${Date.now()}`,
          type: "error",
          text: `Command not recognized: '${trimmed}'. Type 'help' to see valid commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx === -1 ? history.length - 1 : Math.max(0, historyIdx - 1);
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx !== -1) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < history.length) {
          setHistoryIdx(nextIdx);
          setInput(history[nextIdx]);
        } else {
          setHistoryIdx(-1);
          setInput("");
        }
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-surface/95 backdrop-blur-md text-ink border border-rule font-mono text-xs flex flex-col max-h-[80vh] overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-rule bg-page/80 text-muted">
          <div className="flex items-center gap-2">
            <span className="text-ink font-medium">palette</span>
            <span>•</span>
            <span className="text-muted">press ESC to exit</span>
          </div>

          <button
            onClick={onClose}
            className="text-muted hover:text-ink p-1 transition-colors"
            aria-label="Close palette"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Output */}
        <div className="flex-1 p-4 overflow-y-auto space-y-1.5 min-h-[260px] select-text">
          {logs.map((log) => {
            if (log.type === "system") {
              return (
                <div key={log.id} className="text-muted">
                  {log.text}
                </div>
              );
            }
            if (log.type === "input") {
              return (
                <div key={log.id} className="text-accent font-bold">
                  {log.text}
                </div>
              );
            }
            if (log.type === "error") {
              return (
                <div key={log.id} className="text-accent">
                  {log.text}
                </div>
              );
            }
            return (
              <pre
                key={log.id}
                className="whitespace-pre-wrap font-mono text-ink/90 leading-relaxed"
              >
                {log.text}
              </pre>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-rule bg-page/90 flex items-center gap-2">
          <span className="text-accent select-none">&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help' or 'projects'..."
            className="flex-1 bg-transparent text-ink font-mono text-xs focus:outline-none placeholder:text-muted/60"
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
