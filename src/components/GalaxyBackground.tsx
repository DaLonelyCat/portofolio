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

    // Dense Galaxy parameters
    const totalCount = isMobile ? 2500 : 6000;
    const coreCount = Math.floor(totalCount * 0.28); // Dense luminous core bulge
    const armCount = totalCount - coreCount; // Spiral arms & cosmic dust

    const radius = isMobile ? 20 : 30;
    const branches = 4;
    const spin = 1.35;
    const randomness = 0.4;
    const power = 3.2;

    // Colors
    const colorCore = new THREE.Color("#FFFDF0"); // Radiant starlight core
    const colorBulge = new THREE.Color("#FFE5B4"); // Warm luminous amber starlight
    const colorArmPrimary = new THREE.Color("#7F5AF0"); // Deep cosmic violet
    const colorArmSecondary = new THREE.Color("#38BDF8"); // Starlight cyan
    const colorFlare = new THREE.Color("#E07A5F"); // Solar flare copper

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      150
    );
    // Stable, calm camera elevation with no dizzying parallax
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

    // Create a high-intensity blooming star sprite texture
    const starCanvas = document.createElement("canvas");
    starCanvas.width = 64;
    starCanvas.height = 64;
    const ctx = starCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.15, "rgba(255, 250, 240, 0.95)");
      gradient.addColorStop(0.4, "rgba(220, 230, 255, 0.45)");
      gradient.addColorStop(0.75, "rgba(120, 140, 200, 0.12)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    // Geometry Generation
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(totalCount * 3);
    const colors = new Float32Array(totalCount * 3);

    // 1. Generate dense core bulge particles
    for (let i = 0; i < coreCount; i++) {
      const i3 = i * 3;
      const coreR = Math.pow(Math.random(), 2.5) * (radius * 0.22);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = coreR * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = coreR * Math.cos(phi) * 0.45; // slightly flattened bulge
      positions[i3 + 2] = coreR * Math.sin(phi) * Math.sin(theta);

      // Core color: luminous white to warm gold
      const c = colorCore.clone().lerp(colorBulge, Math.random() * 0.6);
      colors[i3] = c.r;
      colors[i3 + 1] = c.g;
      colors[i3 + 2] = c.b;
    }

    // 2. Generate spiral arms and cosmic dust
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

      // Color gradation along arms
      const fraction = r / radius;
      const armColor = colorBulge.clone();

      if (fraction < 0.35) {
        armColor.lerp(colorCore, 0.4);
      } else if (fraction < 0.75) {
        armColor.lerp(colorArmPrimary, (fraction - 0.35) / 0.4);
      } else {
        armColor.lerp(colorArmSecondary, (fraction - 0.75) / 0.25);
      }

      // ~18% solar flare copper stars
      if (Math.random() < 0.18) {
        armColor.lerp(colorFlare, 0.75);
      }

      colors[i3] = armColor.r;
      colors[i3 + 1] = armColor.g;
      colors[i3 + 2] = armColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    // Particle Material with Additive Blending for radiant optical bloom
    const material = new THREE.PointsMaterial({
      size: isMobile ? 3.5 : 4.8,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      map: starTexture,
      transparent: true,
      opacity: 0.88,
    });

    const points = new THREE.Points(geometry, material);
    // 38-degree cosmic perspective tilt
    points.rotation.x = 0.62;
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

    // Tab visibility handling to pause RAF
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

      // Slow, majestic continuous orbital rotation
      if (!prefersReducedMotion) {
        points.rotation.y = elapsed * 0.018;
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
      {/* 3D Dense Galaxy Canvas */}
      <div ref={containerRef} className="absolute inset-0 opacity-90" />

      {/* Layered Frosted Glass Background Diffusion Wash */}
      <div className="absolute inset-0 backdrop-blur-md bg-page/35" />

      {/* Soft Vignette Depth */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40" />
    </div>
  );
}
