"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function GalaxyBackground() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isMobile = window.innerWidth < 768;

    // Galaxy parameters - tuned for deep space atmosphere with zero text glare
    const totalCount = isMobile ? 1800 : 4200;
    const coreCount = Math.floor(totalCount * 0.22);

    const radius = isMobile ? 18 : 28;
    const branches = 4;
    const spin = 1.3;
    const randomness = 0.42;
    const power = 3.3;

    // Cyberpunk-Space Palette
    const colorCore = new THREE.Color("#00F0FF"); // Electric cyan starlight core
    const colorBulge = new THREE.Color("#E2E8F0"); // Pale starlight
    const colorArmPrimary = new THREE.Color("#7F5AF0"); // Deep cosmic violet
    const colorArmSecondary = new THREE.Color("#0284C7"); // Sky cyan
    const colorFlare = new THREE.Color("#F59E0B"); // Cyber amber

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    // Fixed, calm camera elevation with no parallax jumps
    camera.position.set(0, 8, 28);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Create a gentle star sprite texture
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 32;
    starCanvas.height = 32;
    const ctx = starCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.9)");
      gradient.addColorStop(0.2, "rgba(220, 245, 255, 0.6)");
      gradient.addColorStop(0.5, "rgba(0, 240, 255, 0.2)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    // Geometry Generation
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(totalCount * 3);
    const colors = new Float32Array(totalCount * 3);

    // 1. Core bulge particles
    for (let i = 0; i < coreCount; i++) {
      const i3 = i * 3;
      const coreR = Math.pow(Math.random(), 2.5) * (radius * 0.2);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = coreR * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = coreR * Math.cos(phi) * 0.45;
      positions[i3 + 2] = coreR * Math.sin(phi) * Math.sin(theta);

      const c = colorCore.clone().lerp(colorBulge, Math.random() * 0.7);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    // 2. Spiral arms & cosmic dust
    for (let i = coreCount; i < totalCount; i++) {
      const i3 = i * 3;
      const r = Math.pow(Math.random(), power) * radius;
      const spinAngle = r * spin;
      const branchAngle = ((i % branches) * 2 * Math.PI) / branches;

      const randomX =
        Math.pow(Math.random(), power) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;
      const randomY =
        Math.pow(Math.random(), power) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        (r * 0.35);
      const randomZ =
        Math.pow(Math.random(), power) *
        (Math.random() < 0.5 ? 1 : -1) *
        randomness *
        r;

      positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
      positions[i3 + 1] = randomY;
      positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

      const fraction = r / radius;
      const armColor = colorBulge.clone();

      if (fraction < 0.35) {
        armColor.lerp(colorCore, 0.4);
      } else if (fraction < 0.75) {
        armColor.lerp(colorArmPrimary, (fraction - 0.35) / 0.4);
      } else {
        armColor.lerp(colorArmSecondary, (fraction - 0.75) / 0.25);
      }

      if (Math.random() < 0.15) {
        armColor.lerp(colorFlare, 0.6);
      }

      colors[i3] = armColor.r;
      colors[i3 + 1] = armColor.g;
      colors[i3 + 2] = armColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material - subtle, non-glaring opacity
    const material = new THREE.PointsMaterial({
      size: isMobile ? 3.0 : 3.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.35, // Dimmed down to guarantee 100% text readability
    });

    const points = new THREE.Points(geometry, material);
    points.rotation.x = 0.60;
    scene.add(points);

    // Window Resize Handler
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // Tab visibility handling
    let isVisible = true;
    const handleVisibility = () => {
      isVisible = document.visibilityState === "visible";
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Animation Loop: Calm, steady rotation with NO dizzying parallax
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        points.rotation.y = elapsed * 0.015;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      starTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden no-print"
    >
      {/* 3D Galaxy Canvas (dimmed for high text contrast) */}
      <div ref={containerRef} className="absolute inset-0 opacity-40" />

      {/* Deep Space Dark Scrim to guarantee 100% pure contrast for foreground text */}
      <div className="absolute inset-0 bg-[#05060A]/80 pointer-events-none" />
    </div>
  );
}
