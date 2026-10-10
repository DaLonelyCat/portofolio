"use client";

import React, { useState, useEffect, useRef } from "react";
import { Terminal, X, CornerDownLeft, Sparkles, Crosshair, ChevronRight } from "lucide-react";
import { portfolioData } from "../data/portfolio";

interface TacticalTerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProject: (projectId: string) => void;
  onShowToast: (msg: string) => void;
}

interface LogEntry {
  id: string;
  type: "system" | "input" | "output" | "error" | "ascii";
  text: string;
}

export function TacticalTerminal({
  isOpen,
  onClose,
  onOpenProject,
  onShowToast,
}: TacticalTerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "init-1",
      type: "system",
      text: "SYS://TACTICAL_CLI v4.2 [ONLINE] • SECURE_CHANNEL_READY",
    },
    {
      id: "init-2",
      type: "system",
      text: "Type 'help' for instructions, 'dossiers' to list projects, or 'connectomics' / 'agentic' for R&D telemetry.",
    },
  ]);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Focus on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen]);

  // Auto-scroll logs
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Global shortcut listeners (Cmd+K, Ctrl+K, Escape)
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

    // Record history
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIdx(-1);

    const newLogs: LogEntry[] = [
      ...logs,
      { id: `in-${Date.now()}`, type: "input", text: `>_ ${trimmed}` },
    ];

    const [cmd, ...args] = trimmed.toLowerCase().split(/\s+/);
    const argStr = args.join(" ");

    switch (cmd) {
      case "help":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `AVAILABLE TACTICAL INSTRUCTIONS:
  dossiers / projects   - Enumerate all software dossiers & case studies
  open <id | num>       - Launch case study dossier modal (e.g., 'open 1' or 'open unicash-pos')
  connectomics / fly    - Inspect 3D fruit fly brain scan research telemetry
  agentic / ai          - Inspect autonomous multi-agent trading & task engine
  multimedia            - Display Minor in Multimedia specializations (UI/UX, Game Dev)
  skills                - Output technical cyberware capabilities
  cv                    - Open verified Curriculum Vitae dossier
  contact               - Copy direct comms frequency & transmit uplink
  clear                 - Flush terminal buffer
  exit                  - Terminate CLI session`,
        });
        break;

      case "dossiers":
      case "projects": {
        const listText = portfolioData.projects
          .map((p, i) => `  [${i + 1}] ${p.id.padEnd(26)} [${p.category.toUpperCase()}] // ${p.title}`)
          .join("\n");
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `REGISTERED DOSSIERS (${portfolioData.projects.length} CASE FILES):\n${listText}\n\n-> Type 'open <number>' or 'open <id>' to launch full inspection modal.`,
        });
        break;
      }

      case "open": {
        if (!argStr) {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: "error",
            text: "ERROR: Specify project number or ID. Example: 'open 1' or 'open unicash-pos'",
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
            text: `LAUNCHING DOSSIER // [${project.id.toUpperCase()}] ...`,
          });
          onClose();
          onOpenProject(project.id);
        } else {
          newLogs.push({
            id: `err-${Date.now()}`,
            type: "error",
            text: `ERROR: No dossier found with identifier '${argStr}'. Type 'dossiers' to list all.`,
          });
        }
        break;
      }

      case "connectomics":
      case "fly":
      case "brain":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "ascii",
          text: `===========================================================
[ R&D TELEMETRY // 3D DROSOPHILA CONNECTOMICS ]
===========================================================
TARGET:       Drosophila melanogaster (Fruit Fly Whole Brain)
MODALITY:     High-Throughput 3D Volumetric Electron Microscopy
NETWORK:      ~140,000 Neurons • ~50,000,000 Synaptic Junctions
OBJECTIVE:    Decipher biological circuit graphs, synaptic plasticity,
              and translate structural connectomes into next-gen
              bio-inspired artificial intelligence paradigms.
STATUS:       Active Exploration & Graph Analysis (2026)
===========================================================`,
        });
        break;

      case "agentic":
      case "ai":
      case "trading":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "ascii",
          text: `===========================================================
[ SYSTEM ARCHITECTURE // AGENTIC AI ENGINE ]
===========================================================
  [Market Telemetry Ingestion] ----> [Quantitative Strategy Agent]
                                                 |
  [User Task Stream / Calendar] ---> [Task Orchestration Agent]
                                                 |
  [Enterprise Ledger / Fruqita] ---> [Operations Dispatcher]
                                                 |
                                     v
                       [Self-Correcting LLM Loop]
                                     |
                       v                           v
              [Automated Execution]      [Real-time Alert Uplink]

DOMAINS:  • Quantitative Algorithmic Stock Trading
          • Daily Task Scheduling & Workflow Automation
          • Autonomous Venture Operations Management
STATUS:   Active Architecture & Tool-Calling Pipeline (2026)
===========================================================`,
        });
        break;

      case "multimedia":
      case "minor":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `ACADEMIC ACCREDITATION: Minor in Multimedia (Bina Nusantara University)
SPECIALIZATIONS:
  1. UI/UX Architecture & Ergonomics (Tactical Cyber HUD, WCAG AA, Design Systems)
  2. Game Design & Programming (Unity C#, 2D/3D physics, collision controllers)
  3. Multimedia Understanding & Perception (Computer graphics, sensory WebXR)
  4. Rapid Interactive Prototyping (Figma tokens, 60fps canvas engines)`,
        });
        break;

      case "skills": {
        const skillsText = portfolioData.skillCategories
          .map(
            (c) =>
              `[ ${c.title.toUpperCase()} ]\n` +
              c.skills.map((s) => `  • ${s.name.padEnd(30)} -> ${s.context}`).join("\n")
          )
          .join("\n\n");
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: `CYBERWARE COMPETENCY MATRIX:\n\n${skillsText}`,
        });
        break;
      }

      case "cv":
      case "resume":
        newLogs.push({
          id: `out-${Date.now()}`,
          type: "output",
          text: "TRANSMITTING CV DOSSIER... Opening viewer in new tab.",
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
          text: `DIRECT TRANSMISSION UPLINK:
  Email:    ${portfolioData.personal.socials.email} (Copied to clipboard!)
  GitHub:   ${portfolioData.personal.socials.github}
  LinkedIn: ${portfolioData.personal.socials.linkedin}`,
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
          text: `UNKNOWN INSTRUCTION: '${trimmed}'. Type 'help' to review valid commands.`,
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
      aria-label="Tactical Command Palette"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#090b14]/98 border-2 border-cyber-yellow/60 clip-corner shadow-[0_0_50px_rgba(255,230,0,0.25)] flex flex-col max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-black/90 border-b border-yellow-500/25 font-mono text-xs select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyber-yellow" />
            <span className="text-white font-bold tracking-wider">TACTICAL_CLI // SYS_SHELL</span>
            <span className="hidden sm:inline text-slate-500">//</span>
            <span className="hidden sm:inline text-cyber-cyan text-[11px]">[ESC to Exit]</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:flex items-center gap-1 text-[10px] text-teal-400 font-bold bg-teal-500/10 px-2 py-0.5 border border-teal-500/30 clip-corner-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              SESSION: ROOT
            </span>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-cyber-yellow hover:bg-white/5 clip-corner-sm transition-colors"
              aria-label="Close terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Output Terminal */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2 font-mono text-xs text-slate-200 select-text min-h-[280px]">
          {logs.map((log) => {
            if (log.type === "system") {
              return (
                <div key={log.id} className="text-cyber-yellow/80 leading-relaxed">
                  {log.text}
                </div>
              );
            }
            if (log.type === "input") {
              return (
                <div key={log.id} className="text-cyber-cyan font-bold leading-relaxed">
                  {log.text}
                </div>
              );
            }
            if (log.type === "error") {
              return (
                <div key={log.id} className="text-cyber-magenta font-semibold leading-relaxed">
                  {log.text}
                </div>
              );
            }
            if (log.type === "ascii") {
              return (
                <pre
                  key={log.id}
                  className="text-teal-300 bg-black/60 p-2.5 border border-teal-500/20 clip-corner-sm overflow-x-auto whitespace-pre font-mono text-[11px] leading-tight"
                >
                  {log.text}
                </pre>
              );
            }
            return (
              <pre
                key={log.id}
                className="text-slate-300 whitespace-pre-wrap leading-relaxed font-mono"
              >
                {log.text}
              </pre>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Interactive Command Input Line */}
        <div className="p-3 bg-black/95 border-t border-yellow-500/30 flex items-center gap-2">
          <div className="flex items-center gap-1 text-cyber-yellow font-mono text-xs font-bold shrink-0">
            <span>user@dalonelycat:~$</span>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'dossiers', 'connectomics', or 'agentic'..."
            className="flex-1 bg-transparent text-slate-100 font-mono text-xs focus:outline-none placeholder:text-slate-600 caret-cyber-yellow"
            autoComplete="off"
            spellCheck={false}
          />

          <button
            onClick={() => handleCommand(input)}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1 bg-cyber-yellow hover:bg-cyber-yellowHover text-black font-mono text-[11px] font-bold clip-corner-sm transition-colors"
          >
            <span>EXEC</span>
            <CornerDownLeft className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
