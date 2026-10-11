"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  color: string;
  decay?: number;
  alphaMultiplier?: number;
  glow?: boolean;
}

export function RocketCursor() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isWarping, setIsWarping] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTextInput, setIsTextInput] = useState(false);

  const cursorRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const posRef = useRef({ x: -100, y: -100, lastX: -100, lastY: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const prefersReducedMotionRef = useRef(false);

  // Sync canvas bitmap dimensions to real viewport and device pixel ratio
  const syncCanvasSize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
    }
  };

  useEffect(() => {
    // Only enable on desktop devices with fine pointer and hover support
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const isMobileViewport = window.innerWidth < 768;
    if (!mediaQuery.matches || isMobileViewport) return;

    setIsEnabled(true);
    document.body.classList.add("rocket-cursor-enabled");

    prefersReducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const triggerHyperdrive = () => {
      if (prefersReducedMotionRef.current) return;
      setIsWarping(true);
      window.dispatchEvent(new CustomEvent("rocket-hyperdrive-start"));

      // Spawn immediate burst of warp sparks
      const nozzleX = posRef.current.x + 18;
      const nozzleY = posRef.current.y + 18;
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        particlesRef.current.push({
          x: nozzleX,
          y: nozzleY,
          vx: Math.cos(angle) * speed + 1.2,
          vy: Math.sin(angle) * speed + 1.2,
          life: 1.0,
          size: 2.5 + Math.random() * 2.5,
          color: i % 2 === 0 ? "#00F0FF" : "#FFFFFF",
          decay: 0.02,
          alphaMultiplier: 1.0,
          glow: true,
        });
      }

      setTimeout(() => {
        setIsWarping(false);
        window.dispatchEvent(new CustomEvent("rocket-hyperdrive-end"));
      }, 1800);
    };

    const handlePointerMove = (e: PointerEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Detect interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = !!target.closest(
          'a, button, [role="button"], [data-interactive], summary, .cursor-pointer'
        );
        const isText = !!target.closest('input, textarea, [contenteditable="true"]');

        setIsHovering(isInteractive);
        setIsTextInput(isText);
      }

      // Spawn continuous interpolated exhaust particle trail across full screen
      if (!prefersReducedMotionRef.current && !isTextInput) {
        const lastX = posRef.current.lastX;
        const lastY = posRef.current.lastY;
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const dist = Math.hypot(dx, dy);

        if (dist > 3 && lastX !== -100 && lastY !== -100) {
          const steps = Math.min(3, Math.max(1, Math.floor(dist / 14)));
          for (let s = 1; s <= steps; s++) {
            if (particlesRef.current.length >= 36) break;
            const frac = s / steps;
            const px = lastX + dx * frac;
            const py = lastY + dy * frac;

            // Tail nozzle position
            const nozzleX = px + 18;
            const nozzleY = py + 18;

            const colors = isWarping
              ? ["#FFFFFF", "#00F0FF", "#38BDF8", "#818CF8"]
              : isHovering
              ? ["#00F0FF", "#38BDF8", "#FFFFFF", "#F59E0B"]
              : ["#00F0FF", "#38BDF8", "#F59E0B", "#FFFFFF"];
            const color = colors[Math.floor(Math.random() * colors.length)];

            const spread = isWarping ? 1.6 : 0.8;
            const speedMult = isWarping ? 0.22 : 0.08;

            particlesRef.current.push({
              x: nozzleX,
              y: nozzleY,
              vx: (Math.random() - 0.2) * spread + 0.3 - (dx * speedMult),
              vy: (Math.random() - 0.2) * spread + 0.3 - (dy * speedMult),
              life: 1.0,
              size: isWarping ? 3.0 + Math.random() * 2.5 : 2.0 + Math.random() * 1.8,
              color,
              decay: isWarping ? 0.025 : 0.035,
              alphaMultiplier: isWarping ? 1.0 : 0.85,
              glow: isWarping,
            });
          }
        }
      }

      posRef.current.lastX = e.clientX;
      posRef.current.lastY = e.clientY;
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.button === 0) {
        setIsClicking(true);
        if (e.shiftKey) {
          triggerHyperdrive();
        } else if (!prefersReducedMotionRef.current) {
          // Click impulse feedback sparks
          const nozzleX = posRef.current.x + 18;
          const nozzleY = posRef.current.y + 18;
          for (let i = 0; i < 4; i++) {
            particlesRef.current.push({
              x: nozzleX,
              y: nozzleY,
              vx: (Math.random() - 0.5) * 1.5 + 0.6,
              vy: (Math.random() - 0.5) * 1.5 + 0.6,
              life: 1.0,
              size: 2.2 + Math.random() * 1.5,
              color: "#00F0FF",
              decay: 0.045,
              alphaMultiplier: 0.9,
              glow: true,
            });
          }
        }
      }
    };

    const handlePointerUp = () => {
      setIsClicking(false);
    };

    const handleDblClick = () => {
      triggerHyperdrive();
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("dblclick", handleDblClick);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleResize = () => {
      syncCanvasSize();
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop: Render rocket position and exhaust particles
    const render = () => {
      // 1. Update Rocket DOM position
      if (cursorRef.current) {
        const { x, y } = posRef.current;
        cursorRef.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      }

      // 2. Render Canvas exhaust particles across synchronized viewport buffer
      if (canvasRef.current) {
        syncCanvasSize();
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) {
          const dpr = Math.min(window.devicePixelRatio || 1, 2);
          ctx.save();
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

          const particles = particlesRef.current;
          for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay || 0.035;

            if (p.life <= 0) {
              particles.splice(i, 1);
            } else {
              ctx.save();
              ctx.globalAlpha = p.life * (p.alphaMultiplier || 0.85);
              ctx.fillStyle = p.color;
              if (p.glow) {
                ctx.shadowBlur = 8;
                ctx.shadowColor = p.color;
              }
              ctx.beginPath();
              ctx.arc(p.x, p.y, Math.max(0.5, p.size * p.life), 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
          ctx.restore();
        }
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      document.body.classList.remove("rocket-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("dblclick", handleDblClick);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("resize", handleResize);
    };
  }, [isWarping]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Background Particle Canvas for Starlight Exhaust Trail */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-50 no-print"
      />

      {/* Vector Rocket Ship Mouse Pointer */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-50 transition-opacity duration-150 no-print ${
          isVisible && !isTextInput ? "opacity-100" : "opacity-0"
        }`}
        style={{ willChange: "transform" }}
      >
        <div
          className={`relative transition-transform duration-150 ${
            isWarping
              ? "scale-125"
              : isClicking
              ? "scale-90"
              : isHovering
              ? "scale-115"
              : "scale-100"
          }`}
        >
          {/* Cyberpunk Vector Rocket SVG (32x32) */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_8px_rgba(0,240,255,0.4)]"
          >
            {/* Dynamic Plasma Thruster Flame */}
            <path
              d={
                isWarping
                  ? "M 18,20 C 22,26 28,32 36,36 C 32,28 26,22 20,18 Z"
                  : isHovering
                  ? "M 18,20 C 20,24 24,28 31,31 C 28,24 24,20 20,18 Z"
                  : isClicking
                  ? "M 18,20 C 20,23 23,26 29,29 C 26,23 23,20 20,18 Z"
                  : "M 18,20 C 19.5,22 22,24.5 26,26 C 24.5,22 22,19.5 20,18 Z"
              }
              fill={isWarping ? "url(#hyperdriveFlame)" : isHovering ? "url(#plasmaFlame)" : "url(#idleFlame)"}
              className="transition-all duration-150 animate-pulse"
            />

            {/* Inner Core Flame */}
            <path
              d={
                isHovering
                  ? "M 18.5,19.5 C 20,22 22,24 26,26 C 24,22 22,20 19.5,18.5 Z"
                  : "M 18.5,19.5 C 19.5,21 21,22.5 23.5,23.5 C 22.5,21 21,19.5 19.5,18.5 Z"
              }
              fill="#FFFFFF"
              opacity="0.85"
            />

            {/* Swept Delta Stabilizer Wings */}
            <path
              d="M 17,7 L 24,6 L 20,14 Z"
              fill="#0F172A"
              stroke="#00F0FF"
              strokeWidth="0.8"
            />
            <path
              d="M 7,17 L 6,24 L 14,20 Z"
              fill="#0F172A"
              stroke="#00F0FF"
              strokeWidth="0.8"
            />

            {/* Main Aerodynamic Hull */}
            <path
              d="M 3,3 C 8,5 13,6 17,7 L 20,14 L 20,18 L 18,18 L 18,20 L 14,20 L 7,17 C 6,13 5,8 3,3 Z"
              fill="url(#hullGradient)"
              stroke="#00F0FF"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />

            {/* Aerospace Canopy / Cockpit Visor */}
            <path
              d="M 7,7 C 10.5,8 12.5,10 13,13 C 10,12.5 8,10.5 7,7 Z"
              fill="#00F0FF"
              className="drop-shadow-[0_0_6px_rgba(0,240,255,0.8)]"
            />
            <circle cx="8.5" cy="8.5" r="0.8" fill="#FFFFFF" />

            {/* Engine Nozzle Cowling */}
            <rect
              x="18"
              y="18"
              width="2.5"
              height="2.5"
              fill="#334155"
              stroke="#00F0FF"
              strokeWidth="0.6"
            />

            {/* Gradients */}
            <defs>
              {/* Hull Metallic Gradient */}
              <linearGradient id="hullGradient" x1="3" y1="3" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#E2E8F0" />
                <stop offset="100%" stopColor="#94A3B8" />
              </linearGradient>

              {/* Cruising Idle Flame (Amber to Starlight Cyan) */}
              <linearGradient id="idleFlame" x1="19" y1="19" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="40%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>

              {/* Boost Plasma Flame (High Energy Electric Cyan) */}
              <linearGradient id="plasmaFlame" x1="19" y1="19" x2="31" y2="31" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="35%" stopColor="#00F0FF" />
                <stop offset="75%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="rgba(0,240,255,0)" />
              </linearGradient>

              {/* Hyperdrive Warp Flame (Supernova Violet to Starlight Cyan) */}
              <linearGradient id="hyperdriveFlame" x1="19" y1="19" x2="36" y2="36" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="30%" stopColor="#00F0FF" />
                <stop offset="65%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="rgba(129,140,248,0)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}
